import {
  MainContainer, BottomContainer, SideContainer, FormContainer, 
  Forms, StudentCard, StudentDetails, StudentDetail, StudentLabel, StudentImage,
  SubContainers, AttendenceContainer, CalendarContainer,
  GaugeBox,
  GaugeNames, GaugeName,
  Box,
  NameContainer,
  // GaugeContainer,GaugeWrapper,PercentageDisplay
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";
import GaugeChart from 'react-gauge-chart'
import dayjs from 'dayjs';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { GaugeContainer, GaugeValueArc, GaugeReferenceArc, useGaugeState } from '@mui/x-charts/Gauge';


// import { CustomStyles } from "../../CustomStyles"
// import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
// import Select from 'react-select';
// import { useState } from "react";
// import { useLocation } from "react-router-dom";



// import { IoMdCloseCircleOutline } from "react-icons/io";
// import Calendar from "react-calendar";
// import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const AttendenceDetailView = () => {


 
  const navigate = useNavigate()

  const onClose = () => {
    navigate('/createAttendence')

  }
  // const GaugePointer = () => {
  //     const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  //     if (valueAngle === null) {
  //         // No value to display
  //         return null;
  //     }

  //     const target = {
  //         x: cx + outerRadius * Math.sin(valueAngle),
  //         y: cy - outerRadius * Math.cos(valueAngle),
  //     };

  //     return (
  //         <g>
  //             <circle cx={cx} cy={cy} r={5} fill="black" />
  //             <path
  //                 d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
  //                 stroke="red"
  //                 strokeWidth={3}
  //             />
  //         </g>
  //     );
  // }


  // const Options = Grades.map(option => ({
  //     value: option.value,
  //     label: (
  //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  //             <span>{option.name}</span>
  //             <span >{option.label}</span>
  //         </div>
  //     )
  // }))
  // const onClickTab=(id)=>{
  //     console.log(id)
  //     navigate(`/${id}`)
  // }

  // const handleSelect = (e) => {
  //     // console.log(e)
  //     const { value } = e
  //     setFormData(prevData => ({
  //         ...prevData,
  //         selectedOption: value[value],

  //     }))
  // }

  // const toDetailView = (name, date) => {
  //     navigate(`/resultDetailView/`, { state: { examName: name, examDate: date } })
  //     // console.log(name)
  // }

  return (
    <MainContainer>
      <Header />
      <BottomContainer>
        <SideNavbar />
        <SideContainer>
          <FormContainer>
          <TopContainer formname='Student Attendence' fun={onClose}/>

            <Forms>
              <StudentCard>
                <StudentDetails>
                  <StudentDetail><StudentLabel> Name</StudentLabel> : Sruthika Vedhala</StudentDetail>
                  <StudentDetail><StudentLabel> Class</StudentLabel> :  5</StudentDetail>
                  <StudentDetail><StudentLabel> Section</StudentLabel> : A</StudentDetail>
                  <StudentDetail><StudentLabel> Roll No</StudentLabel> : 21</StudentDetail>
                  <StudentDetail><StudentLabel> Contact</StudentLabel> : 9848386828</StudentDetail>

                  {/* <StudentDetail><StudentLabel> School Name</StudentLabel> : NowIt school</StudentDetail> */}

                </StudentDetails>
                <StudentImage src='https://t3.ftcdn.net/jpg/06/97/15/00/360_F_697150011_sWqST1MIBL8PfNbElPUE1pQ1SknKJnVE.jpg' alt='image'></StudentImage>
              </StudentCard>
            </Forms>
            <AttendenceContainer >
              <SubContainers style={{ paddingTop: "1rem", }}>
                <GaugeBox >
                  <GaugeChart
                    id="gauge-chart"
                    nrOfLevels={1} // Number of levels in the gauge (smoothness)
                    arcsLength={[75 / 100, 25 / 100]} // Split the arc based on percentages
                    colors={['#2dac05', '#fa4545']} // Green for Present, Red for Absent
                    arcPadding={0.02} // Padding between arcs
                    percent={75 / 100} // Value of the gauge
                    textColor="transparent" // Color for the center text
                    needleColor="gray" // Color for the needle
                    style={{ width: 400, height: 200, alignSelf: 'center', padding: '0', }} // Size of the chart
                  />
                  <GaugeNames>
                    <NameContainer><Box style={{ backgroundColor: '#2dac05' }}></Box>
                      <GaugeName>Present</GaugeName>
                    </NameContainer>
                    <NameContainer><Box style={{ backgroundColor: '#fa4545' }}></Box>
                      <GaugeName>Absent</GaugeName>
                    </NameContainer>
                  </GaugeNames>
                </GaugeBox>


                <GaugeName style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '600', marginRight: '3rem' }}>75 / 100 <span style={{ fontSize: '1rem', fontWeight: '500' }}>Days</span></GaugeName>
              </SubContainers>

              <SubContainers >
                <CalendarContainer style={{ width: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} style={{ border: '1px solid red' }}>
                    <DateCalendar defaultValue={dayjs()}
                      views={['year', 'month', 'day']}
                      sx={{
                        width: '80%',
                        minHeight: '50% !important',
                        maxheight: '50% !important',
                        display: 'flex', // Ensure the component behaves like a flex container
                        flexDirection: 'column', // Stack child elements vertically
                        flexGrow: 1,
                        // border: '1px solid red',
                        // backgroundColor:'#eeeeee',
                        overflow: 'visible',
                        boxShadow: '5',
                        borderRadius: '1rem',
                        // margin: '10px',
                        // marginTop: '20px',

                        // Fix internal scroll issue
                        '& .MuiDayCalendar-root': {
                          maxheight: '50% !important', // Ensure it fills its parent height
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
                          fontSize: '1rem', // Adjust the font size for the month name
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
                          fontSize: '0.5rem',
                          margin: '1px'
                        },

                        // Styling the Days (Spacing and Appearance)
                        '& .MuiPickersDay-root': {
                          margin: '2px', // Reduce space between day cells
                          padding: '5px', // Adjust the padding inside each day cell
                          fontSize: '0.8rem'
                        },
                        '& .MuiPickersDay-root.Mui-selected': {
                          backgroundColor: '#2dac05 !important', // Highlight the selected day
                          color: '#fff', // Text color of the selected day
                        },
                        '& .MuiPickersDay-root:hover': {
                          backgroundColor: '#cffac0', // Background color for hovered day
                        },
                        '& .MuiPickersDay-day': {
                          fontSize: '1rem', // Adjust font size for the days
                          color: '#000', // Default color for day text
                        },

                        '& .MuiPickersYear-yearButton.Mui-selected': {
                          backgroundColor: '#2dac05', // Green for year selection
                          color: '#fff', // White text for year
                        },
                        '& .MuiPickersMonth-monthButton.Mui-selected': {
                          backgroundColor: '#2dac05', // Green for month selection
                          color: '#fff', // White text for month
                        },

                        // Styling for Weekdays (Sun, Mon, Tue, etc.)
                        '& .MuiPickersCalendarHeader-weekdayLabel': {
                          fontSize: '0.6rem', // Set the font size for the weekday labels
                          color: '#1976d2', // Optional: Change the text color
                          fontWeight: 'bold', // Optional: Make the text bold
                        },

                        // Styling the Calendar Grid
                        '& .MuiPickersCalendar-week': {
                          marginBottom: '4px', // Adjust spacing between weeks
                        },

                        '& .MuiTypography-root': {
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '14px',
                        },
                        '& .MuiTypography-caption': {
                          fontStyle: 'italic',
                          color: 'gray',
                        },
                        '& .MuiDayCalendar-weekDayLabel': {
                          color: 'darkgreen',
                          fontWeight: '600',
                          margin: '1px'
                        },
                        '& .MuiPickersSlideTransition-root': {
                          backgroundColor: 'transparent',  // Example background color
                          padding: '16px',
                          borderRadius: '8px',
                          height: '40vh',
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
              </SubContainers>
            </AttendenceContainer>

            {/* <TabContainer>
                            {Exams.map((each) => (
                                <Tabs key={each.exam} name={each.examName} onClick={() => toDetailView(each.examName, each.examDate)}>
                                    <TabIcon><MdOutlineAssignment size={30} /></TabIcon>
                                    <TabNames>
                                        <TabName>{each.examName}</TabName>
                                        <TabDate>{each.examDate}</TabDate>
                                    </TabNames>
                                </Tabs>
                            ))}
                        </TabContainer> */}
          </FormContainer>


        </SideContainer>
      </BottomContainer>
    </MainContainer>
  )

}
export default AttendenceDetailView