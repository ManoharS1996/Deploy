import {
  MainContainer,
  BottomContainer,
  SideContainer,
  TopContainer,
  FormHeading,
  FormContainer,
  CalendarContainer,
  ActivityContainer,
  Calendars,TabContainer,Tabs,TabNames,TabName,TabDate
} from "./StyledComponents";
// import {CustomStyles} from "../CustomStyles"
// import { Grades,Sections } from "../DummyData";

import dayjs from 'dayjs';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { GrFormNextLink } from "react-icons/gr";

// import { FaEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import CloseButton from "../../../shared/UIElements/closeButton";
// import { useState } from "react";
// import Select from 'react-select';

const Calendar = () => {

  const navigate = useNavigate();

  const Exams = [
    { exam: "1", examName: 'Unit Test 1', examDate: "( 02-01-2025 to 09-01-2025 )" },
    { exam: "2", examName: 'Save Trees Program', examDate: "( 26-11-2024 )" },
    { exam: "3", examName: 'Half Day ', examDate: "Due to Bharat Bandh today will be holiday..........." },
    { exam: "4", examName: 'Book Fair', examDate: "( 26-11-2024 )" },
    { exam: "5", examName: 'Book Fair', examDate: "( 26-11-2024 )" },
]
  // const Options = Grades.map(option => ({
  //     value: option.value,
  //     label: (
  //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  //             <span>{option.name}</span>
  //             <span >{option.label}</span>
  //         </div>
  //     )
  // }))

  // const date = new Date()
  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
  // const day = String(date.getDate()).padStart(2, "0");
  // // console.log(`${year}-${month}-${day}`);
  // let dates = `${year}-${month}-${day}`

  // const columns = ['Id','Roll No','Name', 'Class', 'Section', 'Class Teacher','Gurdian Number' ]
  // const Students = [
  //     { id: "S0027", rollNo:'21', name:'Sruthika Vedhala', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '9848386828'},
  //     { id: "S001", rollNo:'1', name:'A. Dheeraj', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890'},
  //     { id: "S002", rollNo:'2', name:'B. Jaya Lakshmi', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890'},
  //     { id: "S003", rollNo:'3', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890' },
  //     { id: "S004", rollNo:'4', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890' },
  //     { id: "S005", rollNo:'5', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890'},
  //     { id: "S006", rollNo:'6', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890' },
  //     { id: "S007", rollNo:'7', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890' },
  //     { id: "S008", rollNo:'8', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari',phone: '123-456-7890'  },
  //     { id: "S009", rollNo:'9', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890'},
  //     { id: "S010", rollNo:'10', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890'},

  // ];

  // const [formData, setFormData] = useState({
  //     grade: '', section: '', subject:'',examName:'', selectedOption: ''
  // });
  // const onAdd = () => {
  //     navigate('/createResult')
  // }

  const onClose = () => {
    navigate("/dashboard");
  };
  // const toDetailView = () => {
  //     navigate(`/careDetailView`)
  // }

  // // const handleChange = (e) => {
  // //     const { name, value } = e.target
  // //     // console.log(name, value)
  // //     setFormData(prevData => ({
  // //         ...prevData,
  // //         [name]: value,

  // //     }))
  // // }
  // const handleSelect = (e) => {
  //     // console.log(e)
  //     const { value } = e
  //     setFormData(prevData => ({
  //         ...prevData,
  //         selectedOption: value[value],

  //     }))
  // }

  return (
    <MainContainer>
      <Header />
      <BottomContainer>
        <SideNavbar />
        <SideContainer>
          <FormContainer>
            <TopContainer>
              <FormHeading>Calendar</FormHeading>
              <CloseButton fun={onClose}/>
             
            </TopContainer>
            <Calendars>
              <CalendarContainer style={{width:'50%'}}>

                <LocalizationProvider dateAdapter={AdapterDayjs} style={{ border: '1px solid red' }}>
                  <DateCalendar defaultValue={dayjs()}
                    views={['year', 'month', 'day']}
                    sx={{
                      width: '50%',
                      minHeight: '95% !important',
                      maxheight: '95% !important',
                      display: 'flex', // Ensure the component behaves like a flex container
                      flexDirection: 'column', // Stack child elements vertically
                      flexGrow: 1,
                      // border: '1px solid red',
                      // backgroundColor:'#eeeeee',
                      overflow: 'visible',
                      boxShadow: '5',
                      borderRadius: '1rem',
                      margin: '10px',
                      marginTop: '20px',

                      // Fix internal scroll issue
                      '& .MuiDayCalendar-root': {
                        maxheight: '100% !important', // Ensure it fills its parent height
                        display: 'flex', // Use flexbox to manage child elements
                        flexDirection: 'column', // Stack the calendar's internal elements vertically
                        overflow: 'visible',

                      },
                      '& .MuiPickersCalendarHeader-root': {
                        flexShrink: 0, // Prevent the header from collapsing
                      },
                      '& .MuiDayCalendar-weekContainer': {
                        flexGrow: 1, // Ensure the week container stretches properly

                      },
                      '& .MuiDayCalendar-day': {
                        minWidth: 0, // Ensure no extra space is added to days
                      },

                      // Styling the Calendar Header (Month Name and Navigation Icons)

                      '& .MuiPickersCalendarHeader-label': {
                        fontSize: '1.3rem', // Adjust the font size for the month name
                        fontWeight: 'bold', // Optionally, make the month name bold
                      },
                      '& .MuiPickersCalendarHeader-iconButton': {
                        padding: '4px', // Adjust padding for the navigation icons (previous/next buttons)
                        minWidth: '40px', // Control the size of navigation buttons
                      },
                      '& .MuiPickersCalendarHeader-iconButton.Mui-disabled': {
                        opacity: 0.6, // Reduce opacity of disabled navigation buttons
                      },
                      '& .MuiDayCalendar-header': {
                        backgroundColor: 'white',  // example style
                        color: 'darkblue',
                        fontWeight: 'bold',
                        padding: '10px',
                        fontSize: '1rem',
                        margin: '10px'
                      },

                      // Styling the Days (Spacing and Appearance)
                      '& .MuiPickersDay-root': {
                        margin: '8px', // Reduce space between day cells
                        padding: '6px', // Adjust the padding inside each day cell
                        fontSize: '1rem'
                      },
                      '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: '#2dac05 !important', // Highlight the selected day
                        color: '#fff', // Text color of the selected day
                      },
                      '& .MuiPickersDay-root:hover': {
                        backgroundColor: '#c0fb8d', // Background color for hovered day
                      },
                      '& .MuiPickersDay-day': {
                        fontSize: '1.2rem', // Adjust font size for the days
                        color: '#000', // Default color for day text
                      },

                      '& .MuiPickersYear-yearButton.Mui-selected': {
                        backgroundColor: '#2dac05 !important', // Green for year selection
                        color: '#fff', // White text for year
                      },
                      '& .MuiPickersMonth-monthButton.Mui-selected': {
                        backgroundColor: '#2dac05 !important', // Green for month selection
                        color: '#fff', // White text for month
                      },

                      // Styling for Weekdays (Sun, Mon, Tue, etc.)
                      '& .MuiPickersCalendarHeader-weekdayLabel': {
                        fontSize: '1rem', // Set the font size for the weekday labels
                        color: '#1976d2', // Optional: Change the text color
                        fontWeight: 'bold', // Optional: Make the text bold
                      },

                      // Styling the Calendar Grid
                      '& .MuiPickersCalendar-week': {
                        marginBottom: '8px', // Adjust spacing between weeks
                      },

                      '& .MuiTypography-root': {
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '18px',
                      },
                      '& .MuiTypography-caption': {
                        fontStyle: 'italic',
                        color: 'gray',
                      },
                      '& .MuiDayCalendar-weekDayLabel': {
                        color: 'darkgreen',
                        fontWeight: '540',
                        margin: '8px'
                      },
                      '& .MuiPickersSlideTransition-root': {
                        backgroundColor: 'transparent',  // Example background color
                        padding: '16px',
                        borderRadius: '8px',
                        height: '50vh',
                        // overflow: 'visible',
                      },
                      '& .MuiPickersSlideTransition-slideEnter': {
                        transition: 'none !important', // Disable enter transition
                      },
                      '& .MuiPickersSlideTransition-slideEnterActive': {
                        transition: 'none !important', // Disable active enter transition
                      },
                      '& .MuiPickersSlideTransition-slideExit': {
                        transition: 'none !important', // Disable exit transition
                      },
                    }}
                  />
                </LocalizationProvider>
              </CalendarContainer>
              <ActivityContainer>
                <TabName style={{color:'black'}}>Activities</TabName>
                <TabContainer>
                  {Exams.map((each) => (
                    <Tabs key={each.exam} name={each.examName} 
                    // onClick={() => toDetailView(each.examName, each.examDate)}
                    >
                      <TabNames>
                        <TabName>{each.examName}</TabName>
                        <TabDate>{each.examDate}</TabDate>
                      </TabNames>
                    </Tabs>
                  ))}
                </TabContainer>
              </ActivityContainer>
            </Calendars>


          </FormContainer>
        </SideContainer>
      </BottomContainer>
    </MainContainer>
  );
};
export default Calendar;

// // **Day Picker Styles**
// '& .MuiDayPicker-day': {
//   fontSize: '40px', // Increase or decrease this value to adjust the font size
//   padding: '26px', // Padding inside each day cell
//   borderRadius: '50%', // Rounded corners for day cells
//   transition: 'background-color 0.1s', // Smooth hover effect
//   '&:hover': {
//     backgroundColor: '#b0fe94', // Hover background color
//     color: 'white', // White text on hover
//   },
// },

// // **Selected Day Styles**
// '& .Mui-selected': {
//   backgroundColor: '#2dac05 !important', // Ensure selected day stays green
//   color: 'white', // White text for selected date
// },











// sx={{
//   width: '50%', // Customize width
//   height: '100%',
//   backgroundColor: 'white', // Set background color
//   borderRadius: '8px', // Rounded corners
//   boxShadow: 3, // Apply box shadow

//   // Styling the Calendar Header (Month Name and Navigation Icons)
//   '& .MuiPickersCalendarHeader-root': {
//     marginBottom: '5px', // Reduce space between month name and navigation icons
//   },
//   '& .MuiPickersCalendarHeader-label': {
//     fontSize: '1.5rem', // Adjust the font size for the month name
//     fontWeight: '600', // Optionally, make the month name bold
//   },
//   '& .MuiPickersCalendarHeader-iconButton': {
//     padding: '6px', // Adjust padding for the navigation icons (previous/next buttons)
//     minWidth: '50px', // Control the size of navigation buttons
//   },
//   '& .MuiPickersCalendarHeader-iconButton.Mui-disabled': {
//     opacity: 0.6, // Reduce opacity of disabled navigation buttons
//   },

//   // Styling for Weekdays (Sun, Mon, Tue, etc.)
//   '& .MuiPickersCalendarHeader-weekdayLabel': {
//     fontSize: '1.2rem', // Adjust font size for weekdays
//     color: '#393838', // Weekday text color
//     fontWeight: 'bold', // Optional: make weekdays bold
//     marginBottom: '8px', // Adjust margin below the weekday labels
//   },


//   '& .MuiPickersMonth-root': {
//     color: 'black',
//     '&:hover': {
//       backgroundColor: '#ebebeb',
//       color: 'black',
//     },
//     '&.Mui-selected': {
//       backgroundColor: '#2dac05',
//       color: '#fff',
//     },
//   },
//   '& .MuiPickersYear-root': {
//     color: 'black',
//     '&:hover': {
//       backgroundColor: '#ebebeb',
//       color: 'black',
//     },
//     '&.Mui-selected': {
//       backgroundColor: '#2dac05',
//       color: '#fff',
//     },
//   },
// }}



