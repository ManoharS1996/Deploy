import {
    MainContainer, BottomContainer, SideContainer, FormContainer, FormHeading,
    Forms, InputElements, InputName1, InputContainer, TabContainer, Tabs, TabIcon,TabName
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";



import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
import Select from 'react-select';
import { useState } from "react";
// import { useLocation } from "react-router-dom";




// import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiMathOperationsBold } from "react-icons/pi";
import { GiAtom } from "react-icons/gi";
import { MdHistoryEdu } from "react-icons/md";

// import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const ClassNotes = () => {

    const Subjects = [
        { subject: "1", subjectName: 'తెలుగు', icon: "", color: "#cd001a" },
        { subject: "2", subjectName: 'हिन्दी', icon: "", color: "#b5b736" },
        { subject: "3", subjectName: 'English', icon: "", color: "#1961ae" },
        { subject: "4", subjectName: 'Maths', icon: <PiMathOperationsBold size={40} />, color: "#619c00" },
        { subject: "5", subjectName: 'Science', icon: <GiAtom size={40} />, color: "#ef6a00" },
        { subject: "6", subjectName: 'Social', icon: <MdHistoryEdu size={40} />, color: "#61007d" },
    ]


    // const location=useLocation()

    const [formData, setFormData] = useState({
        grade: '', section: '', subject: '', examName: '', selectedOption: ''
    });
    const navigate = useNavigate()

    const onClose = () => {
        navigate('/academics')
    }

    const Options = Grades.map(option => ({
        value: option.value,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.name}</span>
                <span >{option.label}</span>
            </div>
        )
    }))
    // const onClickTab=(id)=>{
    //     console.log(id)
    //     navigate(`/${id}`)
    // }

    const handleSelect = (e) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            selectedOption: value[value],

        }))
    }

    const toDetailView = () => {
        navigate(`/classNotesDetailView/`)
        // console.log(name)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                    <TopContainer formname='Class Notes' fun={onClose}/>

                        <Forms>
                            <InputElements>
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Class/Grade</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="selectedOption"
                                        options={Options}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>

                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Section</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="selectedOption"
                                        options={Sections}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>
                            </InputElements>
                        </Forms>
                        <FormHeading style={{paddingLeft:"1rem"}}>Subjects</FormHeading>

                        <TabContainer>
                            {Subjects.map((each) => (
                                <Tabs key={each.subject} name={each.subjectName} style={{ background: each.color }}
                                onClick={toDetailView}
                                >
                                    <TabIcon>{each.icon}</TabIcon>
                                    <TabName style={{fontWeight:"400",fontSize:'1.5rem'}}>{each.subjectName}</TabName>
                                </Tabs>
                            ))}
                        </TabContainer>
                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default ClassNotes