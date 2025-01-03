import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, InputElements,
    InputContainer, InputContainerDiff, InputName, InputName1, Input,
    DescriptionInput
} from "./StyledComponents"
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections, Subjects, AssignmentType, Status } from "../../DummyData";

// import { IoMdCloseCircleOutline } from "react-icons/io";


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { useLocation } from "react-router-dom";


const CreateAssignment = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const { autoid } = location.state || {};
    // console.log(autoid)

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


    const [formData, setFormData] = useState({
        assignmentId: autoid, staffId: "", staffName: "", assignmentName: '', assignmentType: '', subject: '', class: '', section: '', dueDate: dates, description: '', points: '', status: "Active"
    });

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
        const url = `http://localhost:5000/api/assignment/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const item = responseData.assignments || []
            console.log(item)


        } catch (err) {
            console.log(err)
        }
        navigate('/assignments')
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/assignment/${autoid}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assignment_id: formData.assignmentId,
                staff_id: formData.staffId,
                staff_name: formData.staffName,
                student_class: formData.class,
                student_section: formData.section,
                subject: formData.subject,
                assignment_name: formData.assignmentName,
                assignment_type: formData.assignmentType,
                assignment_description: formData.description,
                submission_date: formData.dueDate,
                marks: formData.points,
                assignment_status: formData.status,

            })
        }
        console.log({
            assignment_id: formData.assignmentId,
            staff_id: formData.staffId,
            staff_name: formData.staffName,
            student_class: formData.class,
            student_section: formData.section,
            subject: formData.subject,
            assignment_name: formData.assignmentName,
            assignment_type: formData.assignmentType,
            assignment_description: formData.description,
            submission_date: formData.dueDate,
            marks: formData.points,
            assignment_status: formData.status,
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }
        navigate('/assignments')
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
                        <TopContainer formname='Create Assignment' fun={onClose} />

                        <Forms onSubmit={handleSubmit}>
                            <InputElements>
                                <InputContainer>
                                    <Input name="assignmentId" value={formData.assignmentId} type="text" onChange={handleChange} id="assignmentId" required />
                                    <InputName htmlFor="assignmentId" >Assignment Id</InputName>
                                </InputContainer><InputContainer>
                                    <Input name="staffId" value={formData.staffId} type="text" onChange={handleChange} id="staffId" required />
                                    <InputName htmlFor="staffId" >Staff Id</InputName>
                                </InputContainer><InputContainer>
                                    <Input name="staffName" value={formData.staffName} type="text" onChange={handleChange} id="staffName" required />
                                    <InputName htmlFor="staffName" >Staff Name</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="assignmentName" value={formData.assignmentName} type="text" onChange={handleChange} id="assignmentName" required />
                                    <InputName htmlFor="assignmentName" >Assignment Name</InputName>
                                </InputContainer>


                                <InputContainer>
                                    <InputName1 >Assignment Type</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="assignmentType"
                                        options={AssignmentType}
                                        value={AssignmentType.find(each => (formData.assignmentType === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'assignmentType')}
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
                                    <Input name="dueDate"
                                        placeholder=""
                                        onChange={handleChange} value={formData.dueDate}
                                        type="date"
                                        id="dueDate"
                                    />
                                    <InputName htmlFor="dueDate" >Due Date</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="points" value={formData.points} onChange={handleChange}
                                        type="text" id="points" required />
                                    <InputName htmlFor="points" >Marks/Points</InputName>
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


                                <InputContainerDiff>
                                    <DescriptionInput name="description"
                                        value={formData.description}
                                        type="text" onChange={handleChange} id="description" />
                                    <InputName1 htmlFor="description" >Assignment Description</InputName1>
                                </InputContainerDiff>
                            </InputElements>

                            <SubmitButton type="submit" buttonname='Add' />
                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default CreateAssignment