import {
    MainContainer, BottomContainer, SideContainer, FormContainer, 
    Forms,StudentCard,StudentDetails,StudentDetail,StudentLabel,StudentImage,  TabContainer, Tabs, TabIcon, TabNames, TabName, TabDate
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";

// import { CustomStyles } from "../../CustomStyles"
// import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
// import Select from 'react-select';
// import { useState } from "react";
// import { useLocation } from "react-router-dom";



// import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const ExamResults = () => {

    const Exams = [
        { exam: "1", examName: 'Unit Test 1', examDate: "( 15-07-2024 to 19-07-2024 )" },
        { exam: "2", examName: 'Unit Test 2', examDate: "( 27-08-2024 to 31-08-2024 )" },
        { exam: "3", examName: 'Quaterly Examinations', examDate: "( 30-09-2024 to 08-10-2024 )" },
        { exam: "4", examName: 'Unit Test 3', examDate: "( 15-07-2024 to 19-07-2024 )" },
        { exam: "5", examName: 'Half-yearly Examinations', examDate: "( 02-01-2025 to 09-01-2025 )" },
    ]

    // const location=useLocation()

    // const [formData, setFormData] = useState({
    //     grade: '', section: '', subject: '', examName: '', selectedOption: ''
    // });
    const navigate = useNavigate()

    const onClose = () => {
        navigate('/result')
    }

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

    const toDetailView = (name, date) => {
        navigate(`/resultDetailView/`, { state: { examName: name, examDate: date } })
        // console.log(name)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                    <TopContainer formname='Student Results' fun={onClose}/>

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
                        <TabContainer>
                            {Exams.map((each) => (
                                <Tabs key={each.exam} name={each.examName} onClick={() => toDetailView(each.examName, each.examDate)}>
                                    <TabIcon><MdOutlineAssignment size={30} /></TabIcon>
                                    <TabNames>
                                        <TabName>{each.examName}</TabName>
                                        <TabDate>{each.examDate}</TabDate>
                                    </TabNames>
                                </Tabs>
                            ))}
                        </TabContainer>
                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default ExamResults