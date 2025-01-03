import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, InputElements,
    InputContainer, InputName, Input,
    InputName1,
} from "./StyledComponents"

import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections, Subjects, Status } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { useLocation } from "react-router-dom";


const CreateDiary = () => {

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`


    const location = useLocation()
    const { autoid } = location.state || {};
    // console.log(autoid)

    const [formData, setFormData] = useState({
        diaryId: autoid, staffId: '', staffName: '', date: dates, class: '', section: '', subject: '', diary: '', status: 'Active'
    });

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


    useEffect(() => {
        getStaffDetail()
    }, [formData.staffId])

    const getStaffDetail = async () => {
        if (formData.staffId.length === 8) {
            const url = `http://localhost:5000/api/staff/${formData.staffId}`
            const options = {
                method: "GET",
            }

            try {
                const response = await fetch(url, options)
                const responseData = await response.json()
                const data = responseData.staff[0]
                console.log(data)
                if (data) {
                    setFormData((prev) => ({
                        ...prev,
                        staffId: data.staff_id,
                        staffName: data.staff_name
                    })
                    )
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const onClose = async () => {
        const url = `http://localhost:5000/api/diary/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const item = responseData.diaries || []
            console.log(item)


        } catch (err) {
            console.log(err)
        }
        navigate('/diary')
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log(name,value)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/diary/${autoid}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                staff_id: formData.staffId,
                staff_name: formData.staffName,
                date: formData.date,
                student_class: formData.class,
                section: formData.section,
                subject: formData.subject,
                diarys: formData.diary,
                diary_status: formData.status,
            })
        }
        console.log({
            staff_id: formData.staffId,
            staff_name: formData.staffName,
            date: formData.date,
            student_class: formData.class,
            section: formData.section,
            subject: formData.subject,
            diarys: formData.diary,
            diary_status: formData.status,
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/diary')
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Create Diary' fun={onClose} />

                        <Forms onSubmit={handleSubmit}>
                            <InputElements>
                                <InputContainer>
                                    <Input name="diaryId" id="diaryId" value={formData.diaryId} onChange={handleChange} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="staffId">Diary Id</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="staffId" id="staffId" value={formData.staffId} onChange={handleChange} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="staffId">Staff Id</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Staff Name" id="staffName" value={formData.staffName} onChange={handleChange} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="staffName">Staff Name</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="date"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.date}
                                        type="date"
                                        id="date"
                                    />
                                    <InputName htmlFor="date" >Date</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <InputName1 >Class/Grade</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="class"
                                        options={Options}
                                        value={Options.find(each => (formData.class === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'class')}
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <InputName1 >Section</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="section"
                                        options={Sections}
                                        value={Sections.find(each => (formData.section === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'section')}
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <InputName1 >Subject</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="subject"
                                        options={Subjects}
                                        value={Subjects.find(each => (formData.subject === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'subject')}
                                    />
                                </InputContainer>
                                <InputContainer style={{ width: '64%' }}>
                                    <Input name="diary" value={formData.diary} onChange={handleChange} type="text" id="diary" required />
                                    <InputName htmlFor="diary" >Diary</InputName>
                                </InputContainer>
                                <InputContainer >
                                    <InputName1 >Status</InputName1>
                                    <Select
                                        // style={{width:"50%"}}
                                        styles={CustomStyles}
                                        name="status"
                                        options={Status}
                                        value={Status.find(each => (formData.status === each.value))}
                                        // value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'status')}
                                    />
                                </InputContainer>
                            </InputElements>
                            <SubmitButton type="submit" buttonname='Add' />
                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default CreateDiary