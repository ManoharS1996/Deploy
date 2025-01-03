import {
    MainContainer, BottomContainer, SideContainer, FormContainer,
    ResultContainer,
    ResultCard,
    StudentCard,
    StudentDetails,
    StudentImage,
    StudentDetail,
    StudentLabel,
    Exam,
    ExamName,
    ResultView,
    ResultTable, ResultTableHeading, TableHead, Rows, ResultTableBody, TableData, ResultRow
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";

// import { CustomStyles } from "../../CustomStyles"
// import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
// import Select from 'react-select';
// import { useState } from "react";
// import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';




// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const ResultDetailView = () => {
    const location = useLocation();
    const example = location.state
    console.log(example);

    // console.log(props)

    const columns = ['Subject', 'Marks', 'Grade', 'Remarks', 'Updated by', 'Updated on']
    const Marks = [{ subject: "Telugu", marks: '85', grade: 'B', remarks: "Revise More Concepts", updatedBy: "Sailaja", updatedOn: '14-10-2024' },
    { subject: "Hindi", marks: '70', grade: 'C', remarks: "Revise More Concepts", updatedBy: "Rehman", updatedOn: '15-10-2024' },
    { subject: "English", marks: '95', grade: 'A', remarks: "Very Good", updatedBy: "Lakshmi", updatedOn: '10-10-2024' },
    { subject: "Maths", marks: '91', grade: 'A', remarks: "Excellent", updatedBy: "Sri ram", updatedOn: '17-10-2024' },
    { subject: "Science", marks: '89', grade: 'B', remarks: "Revise More Concepts", updatedBy: "Illai Raja", updatedOn: '14-10-2024' },
    { subject: "Social", marks: '82', grade: 'B', remarks: "Revise More Concepts", updatedBy: "Geetha Madhuri", updatedOn: '14-10-2024' },

    ]
    //  const {name}=props

    // const [formData, setFormData] = useState({
    //     grade: '', section: '', subject: '', examName: '', selectedOption: ''
    // });
    const navigate = useNavigate()

    const onClose = () => {
        navigate(`/examResults`)
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
                    <TopContainer formname='Result View' fun={onClose}/>

                        <ResultContainer>
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
                            <ResultCard>
                                <Exam>
                                    <ExamName>{example.examName} </ExamName>
                                    <ExamName style={{fontSize:"0.8rem",alignSelf:"flex-end",paddingLeft:"0.5rem"}}> {example.examDate}</ExamName>
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
                                                <Rows key={each.id}>
                                                    <TableData >{each.subject}</TableData>
                                                    <TableData >{each.marks} </TableData>
                                                    <TableData >{each.grade} </TableData>
                                                    <TableData >{each.remarks} </TableData>
                                                    <TableData >{each.updatedBy} </TableData>
                                                    <TableData >{each.updatedOn} </TableData>
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
export default ResultDetailView