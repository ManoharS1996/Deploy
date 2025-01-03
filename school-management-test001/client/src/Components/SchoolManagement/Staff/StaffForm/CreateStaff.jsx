import {
    MainContainer, BottomContainer, StudentFormContainer, FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, Input, Both, Radio, RadioContainer, RadioName, Normal,
    InputName1
} from "./StyledComponents"

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';
import { useLocation } from "react-router-dom";


import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections, JobTitle, Department, Status } from "../../DummyData";

const CreateStaff = () => {

    const location = useLocation()
    const { autoid } = location.state || {};


    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    let dates = `${year}-${month}-${day}`

    const Options = Grades.map(option => ({
        value: option.value,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.name}</span>
                <span >{option.label}</span>
            </div>
        )
    }))

    const navigate = useNavigate()

    const [countryid, setCountryid] = useState(101);
    const [stateid, setstateid] = useState(null);

    const [formData, setFormData] = useState({
        employeeId: autoid, employeeName: '', gender: '', dateOfBirth: dates, nationality: { id: "101", emoji: "🇮🇳", name: 'India' }, state: { id: '', name: '', state_code: '' }, city: '', street: '', pinCode: '', status: 'Active',
        employeeContact: '+91', employeeEmail: '', jobTitle: '', department: '', highestDegree: '', previousWork: '', certifications: '', class: '', section: '',
        medical: '', specify: ''
    });

    const inputStyle = {
        fontSize: "100%",
        height: "1.8rem",
        width: "100%",
        padding: "0.2rem",
        outline: "none",
        border: "0",
        backgroundColor: "transparent",
        borderRadius: "2rem",

    };

    const JobDetails = [
        { name: "Highest Degree", values: 'highestDegree', inputType: 'text', Placeholder: "Select Degree", required: 'ture' },
        { name: "Previous Work Experience", values: 'previousWork', inputType: 'text', Placeholder: "", required: 'ture' },
        { name: "Certifications", values: 'certifications', inputType: 'text', Placeholder: "", required: 'ture' },
    ]
    const handleChange = (value, key) => {
        // console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
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
        console.log(formData)

        const url = `http://localhost:5000/api/staff/${autoid}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                staff_name: formData.employeeName,
                staff_gender: formData.gender,
                staff_date_of_birth: formData.dateOfBirth,
                staff_contact: formData.employeeContact,
                staff_email: formData.employeeEmail,
                staff_status: formData.status,
                staff_nationality: {
                    staff_nationality_id: formData.nationality.id,
                    staff_nationality_emoji: formData.nationality.emoji,
                    staff_nationality_name: formData.nationality.name
                },
                staff_state: {
                    staff_state_id: formData.state.id,
                    staff_state_name: formData.state.name,
                    staff_state_code: formData.state.state_code

                },
                staff_city: formData.city,
                staff_street: formData.street,
                staff_pincode: formData.pinCode,

                staff_title: formData.jobTitle,
                staff_department: formData.department,
                staff_degree: formData.highestDegree,
                staff_work: formData.previousWork,
                staff_certificates: formData.certifications,

                staff_class: formData.class,
                staff_section: formData.section,

                staff_medical: formData.medical,
                staff_specify: formData.specify,
            })
        }
        console.log({
            staff_name: formData.employeeName,
            staff_gender: formData.gender,
            staff_date_of_birth: formData.dateOfBirth,
            staff_contact: formData.employeeContact,
            staff_email: formData.employeeEmail,
            staff_status: formData.status,
            staff_nationality: {
                staff_nationality_id: formData.nationality.id,
                staff_nationality_emoji: formData.nationality.emoji,
                staff_nationality_name: formData.nationality.name
            },
            staff_state: {
                staff_state_id: formData.state.id,
                staff_state_name: formData.state.name,
                staff_state_code: formData.state.state_code

            },
            staff_city: formData.city,
            staff_street: formData.street,
            staff_pincode: formData.pinCode,

            staff_title: formData.jobTitle,
            staff_department: formData.department,
            staff_degree: formData.highestDegree,
            staff_work: formData.previousWork,
            staff_certificates: formData.certifications,

            staff_class: formData.class,
            staff_section: formData.section,

            staff_medical: formData.medical,
            staff_specify: formData.specify,
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }


        navigate('/staffList')
    }

    const changeData = (e, key) => {
        // console.log(e)
        if (key === 'nationality') {
            setCountryid(e.id)
            setFormData((prev) => ({
                ...prev,
                nationality: {
                    id: e.id,
                    emoji: e.emoji,
                    name: e.name
                }
            }))
        }
        else if (key === 'state') {
            setstateid(e.id)
            setFormData((prev) => ({
                ...prev,
                state: {
                    id: e.id,
                    name: e.name,
                    state_code: e.state_code
                }
            }))

        }
    }



    const onClose = async () => {
        const url = `http://localhost:5000/api/staff/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const staff = responseData.staffs || []
            console.log(staff)


        } catch (err) {
            console.log(err)
        }

        navigate('/staffList')
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentFormContainer>
                    <FormContainer>
                        <TopContainer formname='Staff Registration Form' fun={onClose} />


                        <Forms onSubmit={handleSubmit}>
                            <FormName>Staff Details</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Input id="employeeId" type="text" value={formData.employeeId} onChange={(e) => handleChange(e.target.value, e.target.id)} required />
                                    <InputName htmlFor="employeeId">Employee Id</InputName>

                                </InputContainer>
                                <InputContainer>
                                    <Input id="employeeName" type="text" value={formData.employeeName} onChange={(e) => handleChange(e.target.value, e.target.id)} required />
                                    <InputName htmlFor="employeeName">Employee Name</InputName>

                                </InputContainer>

                                <InputContainer>
                                    <Normal htmlFor="gender" >Gender</Normal>

                                    <Both>
                                        <RadioContainer>
                                            <Radio><Input id="male" type="radio" name="gender" value='male' checked={formData.gender === "male"} onChange={(e) => handleChange(e.target.value, e.target.name)} /></Radio>
                                            <RadioName><label htmlFor="male" >Male</label></RadioName>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="female" type="radio" name="gender" value='female' checked={formData.gender === "female"} onChange={(e) => handleChange(e.target.value, e.target.name)} /></Radio>
                                            <RadioName><label htmlFor="female" > Female</label></RadioName>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="others" type="radio" name="gender" value='others' checked={formData.gender === "others"} onChange={(e) => handleChange(e.target.value, e.target.name)} /></Radio>
                                            <RadioName><label htmlFor="others" > Others</label></RadioName>
                                        </RadioContainer>
                                    </Both>
                                </InputContainer>
                                <InputContainer>
                                    <Input style={{ textTransform: "uppercase", color: "black", size: "0.8rem" }} value={formData.dateOfBirth} type="date" id="dateOfBirth"
                                        onChange={(e) => handleChange(e.target.value, e.target.id)} />
                                    <InputName htmlFor="dateOfBirth" >Date of Birth</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <PhoneInput name="employeeContact"
                                        defaultCountry="IN"
                                        inputProps={{ minLength: 12 }}
                                        inputStyle={{
                                            width: '100%', borderRadius: '1rem', height: '2.5rem',
                                            ':hover': {
                                                borderColor: 'transparent',
                                                // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            }
                                        }}
                                        containerStyle={{
                                            width: '100%',
                                        }}
                                        buttonClass="custom-dropdown-button"
                                        dropdownStyle={{
                                            height: '8rem',
                                            borderRadius: '1rem',
                                            overflow: 'auto'
                                        }}
                                        value={formData.employeeContact} placeholder='Contact Number' onChange={(e) => { handleChange(e, "employeeContact") }} />
                                </InputContainer>


                                <InputContainer>
                                    <Input type="email" id="employeeEmail" value={formData.employeeEmail} onChange={(e) => handleChange(e.target.value, e.target.id)} required />
                                    <InputName htmlFor="employeeEmail" >Email</InputName>
                                </InputContainer>

                                <InputContainer style={{ width: "30%", }}>
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

                            <FormName>Address</FormName>
                            <InputElements>
                                <InputContainer>
                                    {/* <div className="stdropdown-container" style={{ borderRadius: '1rem' }}> */}
                                    <CountrySelect style={inputStyle} name="nationality"
                                        defaultValue={{ emoji: formData.nationality.emoji, name: formData.nationality.name }}
                                        onChange={(e) => changeData(e, "nationality")}
                                        placeHolder="Nationality" type="text" id="nationality" />
                                    {/* </div> */}
                                </InputContainer>

                                <InputContainer>
                                    <StateSelect style={inputStyle} name="state" countryid={countryid}
                                        onChange={(e) => changeData(e, 'state')}
                                        placeHolder="State" required type="text" id="state" />
                                </InputContainer>

                                <InputContainer>
                                    <Input name="city" value={formData.city} type="text" stateid={stateid} onChange={(e) => handleChange(e.target.value, 'city')} id="city" required />
                                    <InputName htmlFor="city" >City</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="street" value={formData.street} type="text" stateid={stateid} onChange={(e) => handleChange(e.target.value, e.target.id)} id="street" required />
                                    <InputName htmlFor="street" >Street</InputName>
                                </InputContainer>


                                <InputContainer>
                                    <Input name="pinCode" value={formData.pinCode} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" id="pinCode" maxLength="6" required />
                                    <InputName htmlFor="pinCode" >Pin Code</InputName>
                                </InputContainer>
                            </InputElements>

                            <FormName>Job Details </FormName>
                            <InputElements>
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Job Title</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="jobTitle"
                                        options={JobTitle}
                                        value={JobTitle.find(each => (formData.jobTitle === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'jobTitle')}
                                    />
                                </InputContainer>
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Department</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="department"
                                        options={Department}
                                        value={Department.find(each => (formData.department === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'department')}
                                    />
                                </InputContainer>
                                {JobDetails.map(each => (
                                    <InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values}
                                            // placeholder={each.Placeholder}
                                            required={each.required}
                                            value={formData[each.values]} onChange={(e) => handleChange(e.target.value, e.target.id)} />
                                        <InputName htmlFor={each.values} >{each.name}</InputName>
                                    </InputContainer>)

                                )}
                            </InputElements>
                            <FormName>Class Information</FormName>
                            <InputElements>
                                <InputContainer>
                                    <InputName1 >Class Teacher </InputName1>
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
                            </InputElements>

                            <FormName>Medical Information</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Normal htmlFor="check" >Does the staff have any medical conditions?</Normal>
                                    <RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="yes" type="radio" name="medical" value="yes" checked={formData.medical === "yes"} onChange={(e) => handleChange(e.target.value, e.target.name)} /></Radio>
                                            <RadioName><label htmlFor="yes" >YES</label></RadioName>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="no" type="radio" name="medical" value="no" checked={formData.medical === "no"} onChange={(e) => handleChange(e.target.value, e.target.name)} /></Radio>
                                            <RadioName><label htmlFor="no" >NO</label></RadioName>
                                        </RadioContainer>
                                    </RadioContainer>

                                </InputContainer>
                                <InputContainer>
                                    <Input type="text" id="specify" required value={formData.specify} onChange={(e) => handleChange(e.target.value, e.target.id)} />
                                    <InputName1 htmlFor="specify" >If Yes, please specify :</InputName1>

                                </InputContainer>
                            </InputElements>
                            <SubmitButton type="submit" buttonname='Submit' />

                        </Forms>
                    </FormContainer>
                </StudentFormContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default CreateStaff