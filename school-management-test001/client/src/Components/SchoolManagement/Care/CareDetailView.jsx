import {
    MainContainer, BottomContainer, SideContainer, FormContainer,
    UnderContainer, SearchContainer, InputContainerSearch, SearchIcon, InputSearch, StudentNameContainer, StudentDetail,
    CareContainer, TabContainer, Tabs, TabNames, TabName, TabDate, ToggleSwitchContainer, ToggleInput, ToggleLabel,
    MessagingContainer, SendContainer,
    MessageInput, AddButton, InputContainer,
    //  TabContainer, Tabs, TabIcon, TabNames, TabName, TabDate
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";

import { CareCustomStyles } from "../CustomStyles"
import { Care } from "../DummyData";

import TopContainer from "../../../shared/UIElements/topcontainer";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";
import Select from 'react-select';
// import { useState } from "react";
// import { useLocation } from "react-router-dom";



// import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const CareDetailView = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`

    const { studentId } = useParams()

    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [care, setCare] = useState([])
    const [autoid, setAutoid] = useState("");


    useEffect(() => {
        getStudentDetail()
    }, [])

    const getStudentDetail = async () => {

        const url = `http://localhost:5000/api/students/${studentId}`
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setData(responseData.student[0])
            // console.log(responseData)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCareDetail()
    }, [()=>{onAdd}])

    const getCareDetail = async () => {
        const url = `http://localhost:5000/api/care/${studentId}`
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const data = responseData.cares || {}
            // console.log(responseData)
            setAutoid(responseData.newId)
            setCare(data)

        } catch (err) {
            console.log(err)
        }

    }
    const filteredCares = care.filter(care => (
        care.care_name.toLowerCase().includes(search.toLowerCase()) ||
        care.care_id.toLowerCase().includes(search.toLowerCase()) ||
        care.care_status.toLowerCase().includes(search.toLowerCase())

    )
    );

    const [card, setCard] = useState({ heading: '', para: '' })

    const [Notify, setNotify] = useState([
        { id: "1", name: 'Emotional and Behavior Support', text: "Set personal goals for your behavior and celebrate small wins when you achieve them. Rewards like extra time for activities or recognition can motivate you to stay on track.", isChecked: false },
        { id: "2", name: 'Health and Wellness', text: "If you're feeling stressed, anxious, or overwhelmed, don't hesitate to talk to a counselor or trusted adult. They can help you manage your emotions and offer coping strategies.", isChecked: false },
        { id: "3", name: 'Social Development', text: "Join a club or group that interests you (art, drama, sports, music). This will help you make new friends, learn new skills, and expand your interests.", isChecked: false },
        { id: "4", name: 'Emotional and Behavior Support', text: "Set personal goals for your behavior and celebrate small wins when you achieve them. Rewards like extra time for activities or recognition can motivate you to stay on track.", isChecked: false },
        { id: "5", name: 'Emotional and Behavior Support', text: "Set personal goals for your behavior and celebrate small wins when you achieve them. Rewards like extra time for activities or recognition can motivate you to stay on track.", isChecked: false },
    ])

    const handleToggle = (id) => {
        const updatedNotify = Notify.map((notification) =>
            notification.id === id
                ? { ...notification, isChecked: !notification.isChecked }  // Toggle the isChecked value
                : notification
        );
        setNotify(updatedNotify);
    };

    const navigate = useNavigate()

    const onAdd = async () => {
        const url = "http://localhost:5000/api/care"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id: studentId,
                student_name: data.student_name,
                student_class:data.student_class ,
                student_section: data.student_section,
                care_id: autoid,
                care_name:card.heading ,
                care_description:card.para ,
                care_status:"Active",

                care_created_at: dates
            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }
        setCard((prev) => ({ ...prev, heading: '', para: '' }))
    }

    // const onAdd = () => {
    //     setNotify(prev => ([{ id: (prev.length) + 1, name: card.selectedOption, text: card.para, isChecked: true },
    //     ...prev,
    //     ]))
    //     //    console.log(Notify)
    //     setCard(prev => ({ ...prev, selectedOption: '', para: '' }))
    // }

    const onClose = () => {
        navigate('/care')
    }
    const handleSelect = (e) => {
        // const { value } = e
        // console.log(e)
        setCard(prevData => ({
            ...prevData,
            heading: e,

        }))
    }
    const handleChange = (e, name) => {
        const { value } = e.target
        // console.log(name, value)
        setCard(prevData => ({
            ...prevData,
            [name]: value,

        }))
        // console.log(card)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Care' fun={onClose} />

                        <UnderContainer style={{ width: "95%" }}>
                            <StudentNameContainer>
                                <StudentDetail style={{ color: "black" }}>{`Name : ${data.student_name} (${data.student_id})`}</StudentDetail>
                                <StudentDetail style={{ color: "black" }}>{`Class : ${data.student_class} / ${data.student_section}`}</StudentDetail>
                            </StudentNameContainer>
                            <CareContainer>
                                <SearchContainer style={{ padding: '0.4rem', display: "flex", width: "100%" }}>
                                    <InputContainerSearch style={{ alignSelf: "left" }}>
                                        <SearchIcon><FaSearch size={18} /></SearchIcon>
                                        <InputSearch placeholder="Enter Details" onChange={(e) => { setSearch(e.target.value) }} />
                                    </InputContainerSearch>
                                    {/* <Button onClick={onAdd}>
                                        <IoIosAddCircleOutline style={{ margin: " 2px 8px 2px 0" }} size={25} /> 
                                        Add</Button> */}
                                </SearchContainer>
                                <TabContainer>
                                    {filteredCares.map((each) => (
                                        <Tabs key={each.care_id} name={each.care_name}
                                        // onClick={() => toDetailView(each.examName, each.examDate)}
                                        >
                                            <TabNames>
                                                <TabName>{each.care_name}</TabName>
                                                <TabDate>{each.care_description}</TabDate>
                                                <TabDate>URL comes Here</TabDate>
                                            </TabNames>
                                            <ToggleSwitchContainer>
                                                <ToggleInput
                                                    id={each.care_id}
                                                    type="checkbox"
                                                    checked={each.care_status}
                                                    onChange={() => handleToggle(each.care_id)}
                                                />
                                                <ToggleLabel
                                                    htmlFor={each.care_id}
                                                    checked={each.care_status}
                                                // theme={theme} // Pass theme prop here
                                                />
                                            </ToggleSwitchContainer>
                                        </Tabs>
                                    ))}
                                </TabContainer>
                                <SendContainer style={{ alignSelf: "flex-end" }}>
                                    <MessagingContainer >
                                        <MessageInput value={card.para} onChange={(e) => { handleChange(e, 'para') }} style={{ width: "60%" }} />
                                        <InputContainer style={{ width: "25%" }}>
                                            {/* <InputName1 >Class/Grade</InputName1> */}
                                            <Select
                                                styles={CareCustomStyles}
                                                name="heading"
                                                options={Care}
                                                // value={card.selectedOption}
                                                value={Care.filter(each => (
                                                    each.value === card.heading
                                                ))}
                                                placeholder="Category"
                                                onChange={(e) => handleSelect(e.value)}
                                            />
                                        </InputContainer>
                                        <AddButton onClick={onAdd}> Send <IoIosSend size={26} /></AddButton>
                                    </MessagingContainer>
                                </SendContainer>

                            </CareContainer>

                        </UnderContainer>
                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default CareDetailView