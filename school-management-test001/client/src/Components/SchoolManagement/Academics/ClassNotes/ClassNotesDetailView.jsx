import {
    MainContainer, BottomContainer, SideContainer, FormContainer, FormHeading,
    Forms, InputElements, InputName1, InputContainer, UnderContainer, SearchContainer, InputContainerSearch, SearchIcon, InputSearch, 
    TabContainer, TabNames, TabName,
    NoteTabs,
    TabDate,
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";



import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections, Subjects } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
import Select from 'react-select';
import { useState } from "react";
// import { useLocation } from "react-router-dom";




// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
// import { PiMathOperationsBold } from "react-icons/pi";
// import { GiAtom } from "react-icons/gi";
// import { MdHistoryEdu } from "react-icons/md";

// import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const ClassNotesDetailView = () => {

    // const Subjects = [
    //     { subject: "1", subjectName: 'తెలుగు', icon: "", color: "#cd001a" },
    //     { subject: "2", subjectName: 'हिन्दी', icon: "", color: "#b5b736" },
    //     { subject: "3", subjectName: 'English', icon: "", color: "#1961ae" },
    //     { subject: "4", subjectName: 'Maths', icon: <PiMathOperationsBold size={40} />, color: "#619c00" },
    //     { subject: "5", subjectName: 'Science', icon: <GiAtom size={40} />, color: "#ef6a00" },
    //     { subject: "6", subjectName: 'Social', icon: <MdHistoryEdu size={40} />, color: "#61007d" },
    // ]


    // const location=useLocation()

    const [formData, setFormData] = useState({
        grade: '', section: '', subject: '', examName: '', selectedOption: ''
    });
    const navigate = useNavigate()

    const onClose = () => {
        navigate('/classNotes')
    }
    const onAdd=()=>{
        navigate('/addClassNotes')
    }

    const Notes = [{ id: "1", notes: 'అక్షరాలు', date: '12-11-2024' },
    { id: "2", notes: 'అచ్చులు', date: '13-11-2024' },
    { id: "3", notes: 'హల్లులు', date: '14-11-2024' },
    { id: "4", notes: 'సంధులు ', date: '15-11-2024' },
    { id: "5", notes: 'సమాసాలు', date: '16-11-2024' },
    { id: "1", notes: 'అక్షరాలు', date: '12-11-2024' },
    { id: "2", notes: 'అచ్చులు', date: '12-11-2024' },
    { id: "3", notes: 'హల్లులు', date: '12-11-2024' },
    { id: "4", notes: 'సంధులు ', date: '12-11-2024' },
    { id: "5", notes: 'సమాసాలు', date: '12-11-2024' },
    ]

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

    // const toDetailView = () => {
    //     navigate(`/resultDetailView/`)
    //     // console.log(name)
    // }

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
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Subject</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="selectedOption"
                                        options={Subjects}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>
                            </InputElements>
                        </Forms>
                        <FormHeading style={{ paddingLeft: "1rem" }}></FormHeading>
                        <UnderContainer>
                            <SearchContainer>
                                <InputContainerSearch>
                                    <SearchIcon><FaSearch size={18} /></SearchIcon>
                                    <InputSearch placeholder="Enter Details" />
                                </InputContainerSearch>
                                <AddButton addfun={onAdd} buttonname='ADD'/>

                            </SearchContainer>
                            <TabContainer>
                                {Notes.map((each) => (
                                    <NoteTabs key={each.id} name={each.notes}
                                    // onClick={() => toDetailView(each.examName, each.examDate)}
                                    >
                                        <TabNames>
                                            <TabName>{each.notes}</TabName>
                                            <TabDate>{each.date}</TabDate>
                                        </TabNames>
                                    </NoteTabs>
                                ))}
                            </TabContainer>


                        </UnderContainer>

                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default ClassNotesDetailView