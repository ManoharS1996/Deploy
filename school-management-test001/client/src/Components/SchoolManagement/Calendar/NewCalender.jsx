import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {format, startOfMonth, endOfMonth } from "date-fns";



import {
  MainContainer,
  BottomContainer,
  SideContainer,
  FormContainer,
  CalendarContainer,
  InputContainer,
  Input,
  InputTextArea,
  ButtonContainer,

} from "./StyledComponents"; // Assuming you have styled components

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";
import TopContainer from "../../../shared/UIElements/topcontainer";
import CloseButton from "../../../shared/UIElements/closeButton";
import { MdNavigateBefore, MdNavigateNext } from "../../../shared/icons";

const Button = styled.button`
  background-color: darkgreen;
  border: 0;
  border-radius:0.4rem;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.5rem;
  margin: 0.2rem;
  font-size: 1rem;
  align-self: right;

  &:hover {
    background-color: darkgreen; 
    cursor: pointer;       
    transform: scale(1.02);   
    transition: all 0.3s ease; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;

// Localizer using moment.js
const localizer = momentLocalizer(moment);

const formats = {
  timeGutterFormat: (date, culture, localizer) =>
    localizer.format(date, "h:mm A", culture), // 12-hour format in the time gutter
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, "h:mm A", culture)} – ${localizer.format(end, "h:mm A", culture)}`, // Events' time range in 12-hour format
  agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, "h:mm A", culture)} – ${localizer.format(end, "h:mm A", culture)}`, // Agenda view
};

const CustomToolbar = ({ label, onNavigate, onView, view, date }) => {

  if (view === "agenda") {
    // Ensure date is valid and calculate the range of the agenda
    const startDate = format(startOfMonth(new Date(date)), "dd/MM/yyyy"); // Adjusted for safety
    const endDate = format(endOfMonth(new Date(date)), "dd/MM/yyyy");
    label = `${startDate} – ${endDate}`;
   
  }
  const handleTodayClick = () => {
    onNavigate("TODAY"); // Navigate to today
    onView("month");     // Set view to "month"
  };
  // const handleAgendaClick = () => {
  //   const currentDate = new Date();  // Current date
  //   const startDate = startOfMonth(currentDate); // Start of the current month
  //   const endDate = endOfMonth(currentDate); // End of the current month
  
  //   onNavigate(startDate);  // Navigate to the first day of the current month
  //   setCustomDates({ startDate, endDate }); // Update custom date state
  // };


  return (
    <div style={{ marginBottom: "0.1rem", display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center", width: '100%' }}>
      <div style={{ display: "flex", flexDirection: 'row', }}>
        <Button style={{ padding: '0.2rem', borderRadius: '30%' }} onClick={() => onNavigate("PREV")}>
          <MdNavigateBefore size={25} />
        </Button>
        <Button onClick={handleTodayClick}>Today</Button>
        <Button style={{ padding: '0.2rem', borderRadius: '30%' }} onClick={() => onNavigate("NEXT")}>
          <MdNavigateNext size={25} />
        </Button>
      </div>
      <h1 style={{ fontSize: '1.5rem', }}>{label}</h1>
      <div style={{ display: "flex", flexDirection: 'row', }}>
        {/* <Button onClick={() => onView("month")}>Month</Button> */}
        <Button onClick={() => onView("week")}>Week</Button>
        <Button onClick={() => onView("day")}>Day</Button>
        <Button onClick={() => {onView("agenda")}}>Agenda</Button>
      </div>
    </div>
  )

};


const HeaderCellContent = ({ label, date }) => {
  const isWeekend = date.getDay() === 0;
  return (
    <span
      style={{
        fontWeight: "550",
        color: isWeekend ? "red" : "black",
        fontSize: '1rem',

      }}
    >
      {label}
    </span>
  );
};

// Custom DateCellContent Component
const DateCellContent = ({ label, date }) => {
  const isToday = new Date().toDateString() === date.toDateString();
  const isWeekend = (date.getDay() === 0)
  // const isMonth=date.getMonth()

  // console.log(isMonth)
  return (
    <div
      style={{
        color: isToday ? "darkgreen" : (isWeekend ? 'red' : 'black'),
        padding: "2px",
        borderRadius: "4px",
        fontWeight: isWeekend ? "500" : '',
        fontSize: '1rem'
      }}
    >
      {label}
    </div>
  );
};



const NewCalendar = () => {
  const navigate = useNavigate();
  const [autoid, setAutoid] = useState("");  // Stores the generated ID
  const today = new Date();
  const [allevents, setAllevents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", start: new Date(), end:new Date() });
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [currentView, setCurrentView] = useState(""); // Track the current view
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1)); // Track the currently selected date

  useEffect(() => {
    if (currentView === "agenda") {
      filterEventsForAgenda(currentDate);
    } else {
      setFilteredEvents(allevents); // Show all events for other views
    }
  }, [currentView, currentDate, allevents]);
  useEffect(() => {
    getEventsdata()
  }, [newEvent,showNewEventForm])

  const getEventsdata = async () => {
    // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
    const url = "http://localhost:5000/api/calendar"

    const options = {
      method: "GET",
    }

    try {
      const response = await fetch(url, options)
      const responseData = await response.json()
      setAutoid(responseData.newId)
      // console.log(autoid)
      const events = responseData.events || []; // Default empty array
      if (events.length > 0) {
        const filterdata = events.filter(event => (event.event_title !== "" && event.event_title !== "1"))
        const formattedEvents = filterdata.map(event => ({
          title: event.event_title,
          start: new Date(event.event_start_date), // Convert string to Date
          end: new Date(event.event_end_date), // Convert string to Date
          description: event.event_description,
          id: event.event_id, // Optional: Include an identifier
        }));

        setAllevents(formattedEvents)
        setFilteredEvents(formattedEvents); // Set initially

      }
    } catch (err) {
      console.log(err)
    }
  }
  const filterEventsForAgenda = (date) => {
    const selectedDate = new Date(date);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
  
    const filtered = allevents.filter((event) => {
      const eventMonthStart = event.start.getMonth();
      const eventYearStart = event.start.getFullYear();
      const eventMonthEnd = event.start.getMonth();
      const eventYearEnd = event.start.getFullYear();
  
      return (eventMonthStart === selectedMonth && eventYearStart === selectedYear) || (eventMonthEnd === selectedMonth && eventYearEnd === selectedYear)  ;
    });
  
    setFilteredEvents(filtered);
    // console.log(filtered)
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    handleNavigate
  }, [currentView, currentDate,])
  const handleNavigate = newDate  => {
    const d = new Date(newDate.getFullYear(), newDate.getMonth(),newDate.getDay());
    setCurrentDate(d)  
  }

  // const [events, setEvents] = useState([
  //   {
  //     title: "Christmas",
  //     start: new Date(2024, 11, 25, 10, 0),
  //     end: new Date(2024, 11, 25, 12, 0),
  //     description: "Discussing social development goals for the community.",
  //   },
  //   {
  //     title: "Meeting for L.K.G",
  //     start: new Date(2024, 11, 10, 14, 0),
  //     end: new Date(2024, 11, 10, 15, 0),
  //     description: "Parent-teacher meeting for L.K.G students.",
  //   },
  // ]);

  const getDayStyle = (date) => {
    const isSunday = date.getDay() === 0; // Check if it's Sunday
    if (isSunday) {
      return {
        style: {
          backgroundColor: 'white', // White background for Sundays
          color: 'red', // Red text color for Sundays
          fontWeight: 'bold', // Optional bold text
        },
      };
    }
    return {};
  };

  const onClose = () => {
    navigate("/dashboard");
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent || !selectedEvent.id) {
      alert("No event selected or missing event ID.");
      return;
    }
    setSelectedEvent(null);

    const url = `http://localhost:5000/api/calendar/${selectedEvent.id}`;

    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        // Remove the deleted event from the state
        setAllevents(allevents.filter((event) => event.id !== selectedEvent.id));
        setSelectedEvent(null);
        alert("Event deleted successfully.");
      } else {
        alert("Failed to delete the event. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("An error occurred while deleting the event. Please try again.");
    }

  };


  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: "", description: "", start, end });
    setShowNewEventForm(true);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (newEvent.title.trim() && newEvent.start && newEvent.end) {
      const formattedEvent = {
        event_id: autoid,
        event_title: newEvent.title,
        event_description: newEvent.description,
        event_start_date: newEvent.start.toISOString(),
        event_end_date: newEvent.end.toISOString(),
        event_created_at: new Date().toISOString(),
      };
      setShowNewEventForm(false);
      try {
        const response = await fetch("http://localhost:5000/api/calendar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedEvent),
        });

        if (response.ok) {
          const savedEvent = await response.json();
          setAllevents([
            ...allevents,
            {
              id: savedEvent.event_id,
              title: savedEvent.event_title,
              start: new Date(savedEvent.event_start_date),
              end: new Date(savedEvent.event_end_date),
              description: savedEvent.event_description,
            },
          ]);
          alert("Event Added successfully.");
        } else {
          alert("Failed to save the event. Please Enter both Title and description.");
        }
      } catch (err) {
        console.error("Error adding event:", err);
        alert("Error occurred while adding the event. Please try again.");
      }
    } else {
      alert("Event title, start time, and end time are required.");
    }
  };

  return (
    <MainContainer>
      <Header />
      <BottomContainer>
        <SideNavbar />
        <SideContainer>
          <FormContainer>
            <TopContainer formname='Calendar' fun={onClose} />


            <CalendarContainer style={{ justifyContent: "center", filter: (showNewEventForm || selectedEvent) ? "blur(1.2px)" : "none", transition: "filter 0.3s ease", }}>
              <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                style={{ height: "100%", width: '90%' }}
                selectable={true}
                formats={formats}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                onNavigate={handleNavigate} // Update current date on navigation
                onView={handleViewChange}
                dayPropGetter={getDayStyle}
                eventPropGetter={() => ({
                  style: {
                    backgroundColor: "#378c05",
                    color: "white",
                    borderRadius: "5px",
                    padding: "5px",
                  },
                })}
                components={{
                  toolbar: CustomToolbar,
                  month: {
                    header: HeaderCellContent,
                    dateHeader: DateCellContent,
                  },
                }}
              />
            </CalendarContainer>

            {/* Event Details Modal */}
            {selectedEvent && (
              <div style={modalStyle}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", }}>
                  <h3 style={{ fontSize: '1.6rem', padding: "10px 0", textTransform: 'capitalize', fontWeight: "bold" }}>{selectedEvent.title}</h3>

                  <span>
                    <CloseButton fun={closeEventDetails} style={{ color: "#de0404" }} size={25} />
                  </span>
                </div>
                <p style={{ fontSize: '1rem' }}>
                  <strong >
                    <span style={{ fontSize: '1.1rem' }}>
                      <span>Start&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
                    </span>
                  </strong>
                  {selectedEvent.start.toLocaleString()}
                </p>
                <p style={{ fontSize: '1rem' }}><strong><span style={{ fontSize: '1.1rem' }}>End&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span></strong> {selectedEvent.end.toLocaleString()}</p>
                <p style={{ fontSize: '1rem', textTransform: 'capitalize' }}><strong>Description &nbsp;:&nbsp;</strong> {selectedEvent.description || "No description available."}</p>
                <ButtonContainer>
                  <button onClick={handleDeleteEvent} style={deleteButtonStyle}>
                    Delete Event
                  </button>
                </ButtonContainer>

              </div>
            )}

            {/* New Event Form */}
            {showNewEventForm && (
              <div style={modalStyle}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.5rem', padding: "10px 0" }}>Add New Event</h3>

                  <span>
                    <CloseButton fun={() => setShowNewEventForm(false)} style={{ color: "#de0404" }} size={25} />
                  </span>

                </div>
                <form style={{ padding: '0' }} onSubmit={handleAddEvent}>
                  <InputContainer>
                    <label style={{ fontSize: '1rem', fontWeight: '500' }} htmlFor="title">Title</label>
                    <Input id='title' type="text" style={{ backgroundColor: 'white', width: '30vw' }}
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      required></Input>
                  </InputContainer>

                  <InputContainer>
                    <label style={{ fontSize: '1rem', fontWeight: '500' }} htmlFor="description">Description</label>
                    <InputTextArea style={{ backgroundColor: 'white', width: '30vw' }}
                      id='description'
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    ></InputTextArea>
                  </InputContainer>

                  <InputContainer>
                    <label style={{ fontSize: '1rem', fontWeight: '500', width: '30vw' }} htmlFor="start">Start Time:
                    </label>
                    <Input style={{ backgroundColor: 'white', width: '30vw', textTransform: 'uppercase' }}
                      id='start'
                      type="datetime-local"
                      onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                    ></Input>
                  </InputContainer>

                  <InputContainer>
                    <label style={{ fontSize: '1rem', fontWeight: '500', width: '30vw' }} htmlFor="end">End Time:</label>
                    <Input style={{ backgroundColor: 'white', width: '30vw', textTransform: 'uppercase' }}
                      id='end'
                      type="datetime-local"
                      onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                    ></Input>
                  </InputContainer>
                  <ButtonContainer>
                    <button type="submit" style={buttonStyle}>Add</button>
                  </ButtonContainer>

                </form>
              </div>
            )}
          </FormContainer>
        </SideContainer>
      </BottomContainer>
    </MainContainer>
  );
};

CustomToolbar.propTypes = {
  label: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

HeaderCellContent.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

DateCellContent.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};
// Styles for modal
const modalStyle = {
  height: "fit-content",
  width: '40%',
  position: "fixed",
  border: "1.5px solid grey",
  top: "55%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#dcfaad",
  padding: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  borderRadius: "8px",
};

const buttonStyle = {
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "0.8rem",
  padding: "5px 15px",
  cursor: "pointer",
  margin: '1rem 0 0 0',
};

const deleteButtonStyle = {
  backgroundColor: "#de0404",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "0.8rem",
  padding: "5px 15px",
  margin: '1rem 0 0 0',
};

export default NewCalendar;
