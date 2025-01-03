import {
    MainContainer, BottomContainer, SideContainer,  FormContainer,FormName, Forms, InputElements,
    InputContainer, InputContainerDiff, InputName, InputName1, Input,
    DescriptionInput,
    TopContainer
} from "./StyledComponents"

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections, Subjects, AssignmentType,AssignmentStatus } from "../../DummyData";

// import { IoMdCloseCircleOutline } from "react-icons/io";


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';


const AssignmentDetailView = () => {

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
    console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`


    const [formData, setFormData] = useState({
        staffId: 'S00427', grade: '', section: '', date: dates, subject: '', diary: ''
    });


    const onClose = () => {
        navigate('/assignments')
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleSubmit = () => {
        navigate('/assignments')
    }
    const handleSelect = (e) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            selectedOption: value[value],

        }))
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                    <TopContainer formname='Assignment Detail View' fun={onClose}/>


                        <Forms onSubmit={handleSubmit}>
                        <FormName>Student Information</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Input id="studentId" type="text" required />
                                    <InputName htmlfor="studentId">Student Id</InputName>

                                </InputContainer>
                                <InputContainer>
                                    <Input id="fullname" type="text" required />
                                    <InputName htmlFor="fullname">Student Name</InputName>

                                </InputContainer>
                                <InputContainer>
                                    <Input id="rollNo" type="number" required />
                                    <InputName htmlFor="rollNo">Roll No</InputName>

                                </InputContainer>
                                <InputContainer>
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

                                <InputContainer>
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
                            <FormName>Assignment Details</FormName>

                            <InputElements>
                                <InputContainer>
                                    <Input name="subject" value={formData.subject} type="text" onChange={handleChange} id="subject" required />
                                    <InputName htmlFor="subject" >Assignment Name</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <InputName1 >Assignment Type</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="selectedOption"
                                        options={AssignmentType}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Input name="subject" value={formData.subject} type="text" onChange={handleChange} id="subject" required />
                                    <InputName htmlFor="subject" >Assignment Given By</InputName>
                                </InputContainer>
                                <InputContainer>
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

                                <InputContainer>
                                    <Input name="date"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.date}
                                        type="date"
                                        id="date"
                                    />
                                    <InputName htmlFor="date" >Submit By</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="date"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.date}
                                        type="date"
                                        id="date"
                                    />
                                    <InputName htmlFor="date" >Submitted On</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="diary" value={formData.diary} onChange={handleChange} type="text" id="diary" required />
                                    <InputName htmlFor="diary" >Score</InputName>
                                </InputContainer>
                                <InputContainer>
                                <InputName1 >Status</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="selectedOption"
                                        options={AssignmentStatus}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>
                                <InputContainerDiff>
                                    <DescriptionInput name="subject"
                                        //  value={formData.subject} 
                                        type="text" onChange={handleChange} id="subject" />
                                    <InputName1 htmlFor="subject" >Assignment Description</InputName1>
                                </InputContainerDiff>
                            </InputElements>

                            <SubmitButton type="submit" buttonname='Update'/>
                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default AssignmentDetailView