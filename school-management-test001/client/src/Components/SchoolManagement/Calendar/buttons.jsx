// import { useState } from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
// import { format, startOfWeek, endOfWeek } from "date-fns";
import {
  MainContainer,
  BottomContainer,
  // SideContainer,
  // TopContainer,
  // FormHeading,
  // FormContainer,
  // CalendarContainer,
  // InputContainer,
  // Input,
  // InputTextArea,
  // ButtonContainer,

} from "./StyledComponents"; // Assuming you have styled components

// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";
//import CloseButton from "../../../shared/UIElements/closeButton";
import ListView from "../../../shared/UIElements/listview";
// const Button = styled.button`
//   background-color: darkgreen;
//   border: 0;
//   border-radius: 0.5rem;
//   color: white;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 0.2rem 0.5rem;
//   margin: 0.2rem;
//   font-size: 1rem;
//   align-self: right;
// `;

// Localizer using moment.js
// const localizer = momentLocalizer(moment);

// const CustomToolbar = ({ label, onNavigate, onView, view, date }) => {

//   let formattedLabel = label;

//   if (view === "agenda") {
//     // Calculate the range of the agenda
//     const startDate = format(startOfWeek(date), "dd/MM/yyyy");
//     const endDate = format(endOfWeek(date), "dd/MM/yyyy");
//     formattedLabel = `${startDate} – ${endDate}`;
//   }
//   const handleTodayClick = () => {
//     onNavigate("TODAY"); // Navigate to today
//     onView("month");     // Set view to "month"
//   };

//   return (
//     <div style={{ marginBottom: "1rem", display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center", width: '75vw' }}>
//       <div style={{ display: "flex", flexDirection: 'row', }}>
//         <Button onClick={() => onNavigate("PREV")}>
//           <FaArrowLeft />
//         </Button>
//         <Button onClick={handleTodayClick}>Today</Button>
//         <Button onClick={() => onNavigate("NEXT")}>
//           <FaArrowRight />
//         </Button>
//       </div>
//       <h1 style={{ fontSize: '1.5rem', margin: '0 6rem' }}>{formattedLabel}</h1>
//       <div style={{ display: "flex", flexDirection: 'row', }}>
//         {/* <Button onClick={() => onView("month")}>Month</Button> */}
//         <Button onClick={() => onView("week")}>Week</Button>
//         <Button onClick={() => onView("day")}>Day</Button>
//         <Button onClick={() => onView("agenda")}>Agenda</Button>
//       </div>
//     </div>
//   )

// };


// const HeaderCellContent = ({ label, date }) => {
//   const isWeekend = date.getDay() === 0;
//   return (
//     <span
//       style={{
//         fontWeight: isWeekend ? "bold" : "normal",
//         color: isWeekend ? "red" : "black",
//         fontSize: '1rem',
//         // backgroundColor:'',
//       }}
//     >
//       {label}
//     </span>
//   );
// };

// // Custom DateCellContent Component
// const DateCellContent = ({ label, date }) => {
//   const isToday = new Date().toDateString() === date.toDateString();
//   const isWeekend = (date.getDay() === 0)
//   // const isMonth=date.getMonth()

//   // console.log(isMonth)
//   return (
//     <div
//       style={{
//         color: isToday ? "darkgreen" : (isWeekend ? 'red' : 'black'),
//         padding: "5px",
//         borderRadius: "4px",
//       }}
//     >
//       {label}
//     </div>
//   );
// };



const MyCalendar = () => {
  const columns = ['Id', 'School Name', 'School Type', 'Affiliation Board', 'Est. Year', 'Contact', 'Status', 'Actions']
  const Schools = [
    { schoolId: "SC001", schoolName: 'Sri Chaitanya School', institutionType: 'Higher Secondary', board: "State Board", year: "2016", phone: '123-456-7890', state: "Active" },
    { schoolId: "SC002", schoolName: 'Global International School', institutionType: 'Primary', board: "CBSE", year: "2010", phone: '987-654-3210', state: "Active" },
    { schoolId: "SC003", schoolName: 'Sunshine Academy', institutionType: 'Secondary', board: "ICSE", year: "2005", phone: '555-123-4567', state: "Active" },
    { schoolId: "SC004", schoolName: 'Blue Ridge High School', institutionType: 'Higher Secondary', board: "State Board", year: "2012", phone: '321-654-9870', state: "Inactive" },
    { schoolId: "SC005", schoolName: 'Greenfield School', institutionType: 'Primary', board: "IB", year: "2018", phone: '212-345-6789', state: "Active" },
    { schoolId: "SC006", schoolName: 'St. Xavier\'s School', institutionType: 'Secondary', board: "ICSE", year: "2000", phone: '403-567-8901', state: "Active" },
    { schoolId: "SC007", schoolName: 'Mountain View Academy', institutionType: 'Higher Secondary', board: "CBSE", year: "2015", phone: '765-432-1098', state: "Active" },
    { schoolId: "SC008", schoolName: 'Royal Global School', institutionType: 'Secondary', board: "State Board", year: "2017", phone: '432-678-9012', state: "Active" },
    { schoolId: "SC009", schoolName: 'Wisdom International School', institutionType: 'Primary', board: "IB", year: "2020", phone: '678-890-1234', state: "Active" },
    { schoolId: "SC010", schoolName: 'Sri Chaitanya School', institutionType: 'Higher Secondary', board: "State Board", year: "2016", phone: '555-555-5555', state: "InActive" },
    { schoolId: "SC011", schoolName: 'Sri Chaitanya School', institutionType: 'Higher Secondary', board: "State Board", year: "2016", phone: '123-456-7890', state: "InActive" },
  ];
  const navigate = useNavigate();

  // const onClose = () => {
  //   navigate("/dashboard");
  // };

  const onAdd = () => {
    navigate('/createSchool')
  }
  const toDetailView = () => {
    navigate(`/schoolDetailView`)
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

  // const getDayStyle = (date) => {
  //   const isSunday = date.getDay() === 0; // Check if it's Sunday
  //   if (isSunday) {
  //     return {
  //       style: {
  //         backgroundColor: 'white', // White background for Sundays
  //         color: 'red', // Red text color for Sundays
  //         fontWeight: 'bold', // Optional bold text
  //       },
  //     };
  //   }
  //   return {};
  // };


  // const [selectedEvent, setSelectedEvent] = useState(null);
  // const [newEvent, setNewEvent] = useState({ title: "", description: "", start: null, end: null });
  // const [showNewEventForm, setShowNewEventForm] = useState(false);


  // const handleSelectEvent = (event) => {
  //   setSelectedEvent(event);
  // };

  // const closeEventDetails = () => {
  //   setSelectedEvent(null);
  // };

  // const handleDeleteEvent = () => {
  //   setEvents(events.filter((event) => event !== selectedEvent));
  //   setSelectedEvent(null);
  // };

  // const handleSelectSlot = ({ start, end }) => {
  //   setNewEvent({ title: "", description: "", start, end });
  //   setShowNewEventForm(true);
  // };

  // const handleAddEvent = (e) => {
  //   e.preventDefault();
  //   if (newEvent.title.trim() && newEvent.start && newEvent.end) {
  //     setEvents([...events, newEvent]);
  //     setShowNewEventForm(false);
  //   } else {
  //     alert("Event title, start time, and end time are required.");
  //   }
  // };

  return (
    <MainContainer>
      <Header />
      <BottomContainer>
        <SideNavbar />
        <ListView name='School Details' buttonname='add' addfun={onAdd} headings={columns} datas={Schools} editfun={toDetailView} />
      </BottomContainer>
    </MainContainer>
  );
};

// CustomToolbar.propTypes = {
//   label: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
//   onView: PropTypes.func.isRequired,
//   view: PropTypes.func.isRequired,
//   date: PropTypes.func.isRequired,
// };

// HeaderCellContent.propTypes = {
//   label: PropTypes.string.isRequired,
//   date: PropTypes.instanceOf(Date).isRequired,
// };

// DateCellContent.propTypes = {
//   label: PropTypes.string.isRequired,
//   date: PropTypes.instanceOf(Date).isRequired,
// };
// // Styles for modal
// const modalStyle = {
//   height: "fit-content",
//   width: '40%',
//   position: "fixed",
//   border: "1.5px solid grey",
//   top: "55%",
//   left: "60%",
//   transform: "translate(-50%, -50%)",
//   backgroundColor: "#c2fc98",
//   padding: "20px",
//   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//   zIndex: 1000,
//   borderRadius: "8px",
// };

// const buttonStyle = {
//   backgroundColor: "green",
//   color: "white",
//   border: "none",
//   borderRadius: "0.8rem",
//   padding: "5px 15px",
//   cursor: "pointer",
//   margin: '1rem 0 0 0',
// };

// const deleteButtonStyle = {
//   backgroundColor: "#de0404",
//   color: "white",
//   border: "none",
//   cursor: "pointer",
//   borderRadius: "0.8rem",
//   padding: "5px 15px",
//   margin: '1rem 0 0 0',
// };

export default MyCalendar;
