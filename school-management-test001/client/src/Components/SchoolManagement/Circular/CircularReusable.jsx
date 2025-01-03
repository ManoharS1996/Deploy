import {
    MainContainer, BottomContainer, SideContainer, FormContainer, TopContainer, FormHeading, SearchContainer, InputContainerSearch, SearchIcon,
    TabContainer, Tab, Tabs, TabIcon, TabNames, TabName, TabDate, Side, ToggleSwitchContainer, ToggleInput, ToggleLabel,
    InputSearch,
} from "./styledComponents"

import { useNavigate } from "react-router-dom";

// import { CustomStyles } from "../../CustomStyles"
// import { Circulars } from "../../DummyData";

import AddButton from "../../../shared/UIElements/addButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";
// import Select from 'react-select';
// import { useState } from "react";
// import { useLocation } from "react-router-dom";



// import { IoMdCloseCircleOutline } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
// import { MdOutlineAssignment } from "react-icons/md";
// import { IoIosAddCircle } from "react-icons/io";




//fc8e03,04b40f,d4b806,8005a2,dc0677

const CircularReusable = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    let dates = `${day}-${month}-${year}`

    // const editorValue =JSON.stringify(
    //     [
    //         { insert: 'Dear Parents/Guardians,\n\n' },
    //         { insert: 'This is to inform you that the school will remain closed for the upcoming public holidays from [Date] to [Date]. Regular classes will resume on [Date].\n\n' },
    //         { insert: 'Please ensure that your child is informed of these dates and prepares accordingly for the following school days.\n\n' },
    //         { insert: 'Thank you for your cooperation.\n\n' },
    //         {
    //             insert: 'Sincerely,\n[Your Name]\nPrincipal\n[School Name]',
    //             // attributes: { bold: true }
    //         }
    //     ]
    // ) 
    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");

    const [allcirculars, setAllcirculars] = useState([])

    useEffect(() => {
        getCircularsdata()
    }, [])

    const getCircularsdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/circular"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setAutoid(responseData.newId)
            console.log(responseData)
            const circulars = responseData.circulars || []; // Default empty array
            if (circulars.length > 0) {
                const filterdata = circulars.filter(circular => (circular.circular_title !== "" && circular.circular_title !== "1"))
                setAllcirculars(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }


    const filteredCirculars = allcirculars.filter(circular =>
        circular.circular_id.toLowerCase().includes(search.toLowerCase()) ||
        circular.circular_title.toLowerCase().includes(search.toLowerCase()) ||
        circular.circular_subject.toLowerCase().includes(search.toLowerCase()) ||
        circular.circular_date.toLowerCase().includes(search.toLowerCase()) ||
        circular.circular_status.toLowerCase().includes(search.toLowerCase())
    );

    const [Notify, setNotify] = useState([
        { id: "1", text: 'Holiday Notification Circular', subject: 'Notification of School Holidays', date: "18-11-2024", isChecked: false },
        { id: "2", text: 'Examination Schedule Circular', subject: 'Examination Schedule for [Class/Grade] – [Month/Year]', date: "18-11-2024", isChecked: false },
        { id: "3", text: 'Uniform Guidelines Circular', subject: 'School Uniform Guidelines', date: "18-11-2024", isChecked: false },
        { id: "4", text: 'Parent-Teacher Meeting Circular', subject: 'Parent-Teacher Meeting Notification', date: "18-11-2024", isChecked: false },
        { id: "5", text: 'School Event Circular', subject: 'Invitation to Annual Sports Day', date: "18-11-2024", isChecked: false },
        { id: "6", text: 'Fee Payment Reminder Circular', subject: 'Reminder for Fee Payment', date: "18-11-2024", isChecked: false },
        { id: "7", text: 'New Admission Circular', subject: 'Admission Open for [Grade/Class] for [Academic Year]', date: "18-11-2024", isChecked: false },
        { id: "8", text: 'Health and Safety Circular', subject: 'Health and Safety Guidelines for Students', date: "18-11-2024", isChecked: false },
        { id: "9", text: 'Late Arrival/Leave Policy Circular', subject: 'Late Arrival and Leave Policy', date: "18-11-2024", isChecked: false },
        { id: "10", text: 'Cultural Program Circular', subject: 'Invitation to [Event Name] Cultural Program', date: "18-11-2024", isChecked: false },
    ])

    const handleToggle = (id) => {
        const updatedNotify = Notify.map((notification) =>
            notification.id === id
                ? { ...notification, isChecked: !notification.isChecked }  // Toggle the isChecked value
                : notification
        );
        setNotify(updatedNotify);
    };



    // const location=useLocation()

    // const [formData, setFormData] = useState({
    //     grade: '', section: '', subject: '', examName: '', selectedOption: ''
    // });
    const navigate = useNavigate()

    const onAdd = async() => {
        const url = "http://localhost:5000/api/circular"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                circular_id: autoid,
                circular_title:"1",
                circular_subject:"1",
                circular_receiver:"1",
                circular_status:"Active",
                circular_date:dates,
               circular_description:"1",

                circular_created_at: dates
            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        } 

        navigate('/addCircular', { state: { autoid } })
    }

    const toDetailView = (e, id) => {
        // console.log(e,id)
        navigate(`/circularDetailView/${id}`)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer>
                            <FormHeading>Circulars</FormHeading>
                            {/* <CloseIcon type="button" onClick={onClose}><IoMdCloseCircleOutline style={{ color: "#de0404" }} size={25} /></CloseIcon> */}
                        </TopContainer>
                        <SearchContainer>
                            <InputContainerSearch>
                                <SearchIcon><FaSearch size={18} /></SearchIcon>
                                <InputSearch onChange={(e) => { setSearch(e.target.value) }} placeholder="Enter Details" />
                            </InputContainerSearch>
                            <AddButton addfun={onAdd} buttonname='ADD' />
                        </SearchContainer>
                        <TabContainer>
                            {filteredCirculars.map((each) => (
                                <Tabs key={each.circular_id} name={each.circular_title}
                                >
                                    <Tab>
                                        <Side onClick={(e) => toDetailView(e, each.circular_id)}>
                                            <TabIcon><GrAnnounce size={30} /></TabIcon>
                                            <TabNames>
                                                <TabName>{each.circular_title}</TabName>
                                                <TabDate>{each.circular_subject}</TabDate>
                                                {/* <TabDate style={{alignSelf:"flex-end"}}>See More......</TabDate> */}
                                            </TabNames>
                                        </Side>
                                        <TabNames style={{ flexDirection: "row", alignItems: "center" }}>
                                            <TabDate style={{ justifyContent: "flex-end", fontSize: '1rem' }}>{each.circular_date}</TabDate>
                                            <ToggleSwitchContainer>
                                                <ToggleInput
                                                    id={each.circular_id}
                                                    type="checkbox"
                                                    checked={each.circular_status}
                                                    onChange={() => handleToggle(each.circular_id)}
                                                />
                                                <ToggleLabel
                                                    htmlFor={each.circular_id}
                                                    checked={each.circular_status}
                                                // theme={theme} // Pass theme prop here
                                                />
                                            </ToggleSwitchContainer>
                                        </TabNames>
                                    </Tab>
                                </Tabs>
                            ))}
                        </TabContainer>
                        {/* <Button onClick={onAdd}> <IoIosAddCircle style={{ margin: " 2px 8px 2px 0" }} size={50} /></Button> */}
                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default CircularReusable