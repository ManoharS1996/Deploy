import {
    MainContainer, BottomContainer, SideContainer, FormContainer, TopContainer, FormHeading,
    ResultContainer,
    ResultCard,
    Exam,
    ExamName,
    ResultView,
    ResultTable, ResultTableHeading, TableHead, Rows, ResultTableBody, TableData, ResultRow
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";

// import { CustomStyles } from "../../CustomStyles"
// import { Grades, Sections } from "../../DummyData";

import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
// import Select from 'react-select';
// import { useState } from "react";
// import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CloseButton from "../../../../shared/UIElements/closeButton";




// import { IoMdCloseCircleOutline } from "react-icons/io";

// import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const ExamDetailView = () => {
    const location = useLocation();
    const example = location.state
    console.log(example);

    // console.log(props)

    const columns = ['Date', 'Day', 'Subject', 'Timings','Syllabus']
    const Marks = [{ date: '12-11-2024', day: 'Monday', subject: "Telugu", timings: '10:00 AM to 12:00 PM',syllabus:'Chapter: 1,2,3' },
    { date: '13-11-2024', day: 'Tuesday', subject: "Hindi", timings: '10:00 AM to 12:00 PM' ,syllabus:'Chapter: 1,2,3'},
    { date: '14-11-2024', day: 'Wednesday', subject: "English", timings: '10:00 AM to 12:00 PM',syllabus:'Chapter: 1,2,3' },
    { date: '15-11-2024', day: 'Thursday', subject: "Maths", timings: '10:00 AM to 12:00 PM',syllabus:'Chapter: 1,2,3' },
    {date:'16-11-2024',day:'Friday', subject: "Science",timings:'10:00 AM to 12:00 PM',syllabus:'Chapter: 1,2,3'},
    {date:'17-11-2024',day:'Saturday', subject: "Social",timings:'10:00 AM to 12:00 PM',syllabus:'Chapter: 1,2,3'},
    ]
    //  const {name}=props

    // const [formData, setFormData] = useState({
    //     grade: '', section: '', subject: '', examName: '', selectedOption: ''
    // });
    const navigate = useNavigate()

   

    const onClose = () => {
        navigate(`/exams`)
    }

    // const StudentInformation=[{name:"Sruthika Vedhala"},{class:'5'},{section:'A'},{rollNo:'21'}]
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


    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer>
                            <FormHeading>Examinations Dates</FormHeading>
                            <CloseButton fun={onClose}/>
                        </TopContainer>
                       
                        <ResultContainer>

                            <ResultCard>
                                <Exam>
                                    <ExamName>{example.examName} </ExamName>
                                    <ExamName style={{ fontSize: "0.8rem", alignSelf: "flex-end", paddingLeft: "0.5rem" }}> {example.examDate}</ExamName>
                                </Exam>

                                <ResultView>
                                    <ResultTable>
                                        <ResultTableHeading>
                                            <ResultRow>
                                                {columns.map(each => (
                                                    <TableHead key={each}>{each}</TableHead>
                                                ))}
                                            </ResultRow>
                                        </ResultTableHeading>
                                        <ResultTableBody>
                                            {Marks.map(each => (
                                                <Rows key={each.date}>
                                                    <TableData >{each.date}</TableData>
                                                    <TableData >{each.day} </TableData>
                                                    <TableData >{each.subject} </TableData>
                                                    <TableData >{each.timings} </TableData>
                                                    <TableData >{each.syllabus} </TableData>
                                                    {/* <TableData ><button style={{ padding: "0", outline: "none", background: "#eef0ee" }} onClick={toDetailView}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData> */}
                                                </Rows>
                                            ))}
                                        </ResultTableBody>
                                    </ResultTable>

                                </ResultView>
                            </ResultCard>
                        </ResultContainer>

                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default ExamDetailView