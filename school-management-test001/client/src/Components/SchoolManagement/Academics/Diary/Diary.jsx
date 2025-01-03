import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, InputElements, InputContainerSearch, SearchIcon, InputSearch,
    InputContainer, InputName, InputName1, Input, SearchContainer,
    UnderContainer
} from "./StyledComponents"


import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections } from "../../DummyData";

import TableComponent from "../../../../shared/UIElements/table";
import TopContainer from "../../../../shared/UIElements/topcontainer";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
import { FaSearch } from "../../../../shared/icons"




import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';


const Diary = () => {

    const navigate = useNavigate()

    const Options = Grades.map(option => ({
        value: option.value,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.name}</span>
                <span >{option.label}</span>
            </div>
        )
    }))

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`

    const columns = ['Diary ID', 'Date', 'class','Section', 'Subject', 'Teacher', 'Diary']
    const rows=["diary_id","date","student_class","section","subject","staff_name","diary"]


    const [formData, setFormData] = useState({
        class: '', section: '', date: dates
    });

    const [alldiary, setAlldiary] = useState([])

    useEffect(() => {
        getDiarydata()
    }, [])

    const getDiarydata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/diary"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            // console.log(responseData)
            const diaries = responseData.diaries || []; // Default empty array
            if (diaries.length > 0) {
                const filterdata = diaries.filter(diary => (diary.student_name !== "" && diary.student_name !== "1"))
                setAlldiary(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }


    // const filteredDiaries = alldiary.filter(transport =>
    //     transport.student_name.toLowerCase().includes(search.toLowerCase()) ||
    //     transport.student_id.toLowerCase().includes(search.toLowerCase()) ||
    //     transport.student_contact.toLowerCase().includes(search.toLowerCase()) ||
    //     transport.transport_status.toLowerCase().includes(search.toLowerCase()) ||
    //     transport.transport_pickup.toLowerCase().includes(search.toLowerCase()) ||
    //     transport.student_class.toLowerCase().includes(search.toLowerCase()) ||
    //     transport.transport_busfee.toLowerCase().includes(search.toLowerCase())
    // );


    const onAdd = () => {
        navigate('/createDiary')
    }
    const onClose = () => {
        navigate('/academics')
    }
    const toDetailView = () => {
        navigate(`/diaryView`)
    }
    const handleChange = (e) => {
        const { name, value } = e.target

        // console.log(name, value)
        setFormData(prevData => ({
            ...prevData,
            [name]: value,

        }))
    }
    const handleSelect = (e, key) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            [key]: value,

        }))
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Diary' fun={onClose} />

                        <Forms>
                            <InputElements>
                                <InputContainer style={{ margin: "0.3rem 0" }}>
                                    <InputName1 >Class/Grade</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="class"
                                        options={Options}
                                        value={Options.find(each => (formData.status === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'class')}
                                    />
                                </InputContainer >

                                <InputContainer style={{ margin: "0.3rem 0" }}>
                                    <InputName1 >Section</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="section"
                                        options={Sections}
                                        value={Sections.find(each => (formData.status === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'section')}
                                    />
                                </InputContainer>

                                <InputContainer style={{ margin: "0.3rem 0" }}>
                                    <Input name="date"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.date}
                                        type="date"
                                        id="dob"
                                    />
                                    <InputName htmlFor="dob" >Date</InputName>
                                </InputContainer>
                            </InputElements>

                            <UnderContainer>
                                <SearchContainer>
                                    <InputContainerSearch>
                                        <SearchIcon><FaSearch size={18} /></SearchIcon>
                                        <InputSearch placeholder="Enter Details" />
                                    </InputContainerSearch>
                                    <AddButton addfun={onAdd} buttonname='ADD' />
                                </SearchContainer>
                                <TableComponent headings={columns}
                                    rows={rows} pass='diary_id' datas={alldiary} 
                                    editfun={toDetailView} />

                            </UnderContainer>
                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default Diary