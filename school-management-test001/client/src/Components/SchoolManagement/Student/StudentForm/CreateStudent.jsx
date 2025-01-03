import {
    MainContainer, BottomContainer, StudentFormContainer, FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, Input, Radio, Both, RadioContainer, RadioName, Normal,
    InputNameForDetail,
    InputName1,
} from "./StyledComponents"

import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';
import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections, Status } from "../../DummyData";



import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

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


const CreateStudent = () => {

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

    const [countryid, setCountryid] = useState(101);
    const [stateid, setstateid] = useState(null);
    // console.log(stateid)

    const [formData, setFormData] = useState({
        fullName: '', studentId: autoid, gender: '', dateOfBirth: dates, nationality: { id: "101", emoji: "🇮🇳", name: 'India' }, state: { id: '', name: '', state_code: '' }, city: '', street: '', pinCode: '', status: 'Active',
        parentName: '', relationshipToStudent: '', contactNumber: '+91', email: '', occupation: '',
        nameOfPreviousSchool: '', lastGrade: '',
        class: '', section: '', roll: '', prefferedDate: dates,
        medical: '', specify: '',
    });


    const navigate = useNavigate()

    const ParentForm = [{ name: "Parent Name", values: 'parentName', inputType: 'text', Placeholder: "Enter Parent Name", required: true },
    { name: "Relationship to Student", values: 'relationshipToStudent', inputType: 'text', Placeholder: "Enter Relation", required: true },
    { name: "Contact Number", values: 'contactNumber', inputType: 'number', Placeholder: "Enter Contact Number", required: true },
    { name: "Email", values: 'email', inputType: 'email', Placeholder: "Enter Email Address", required: true },
    { name: "Occupation", values: 'occupation', inputType: 'text', Placeholder: "Enter Occupation", required: true }]

    const PreviousSchool = [{ name: "Name of Previous School", values: 'nameOfPreviousSchool', inputType: 'text', Placeholder: "Enter Previous School Name", required: true },
    ]

    const Academic = [
        { name: "Preffered Start Date", values: 'prefferedDate', inputType: 'date', Placeholder: "Select Date", required: false }
    ]

    const EmergencyDetails = [{ name: "Full Name", values: 'parentName', inputType: 'text', Placeholder: "Enter Full Name", required: true },
    { name: "Relationship to Student", values: 'relationshipToStudent', inputType: 'text', Placeholder: "Enter Relation", required: true },
    { name: "Contact Number", values: 'contactNumber', inputType: 'number', Placeholder: "Enter Contact Number", required: true },
    ]

    const onClose = async () => {
        const url = `http://localhost:5000/api/students/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const student = responseData.students || []
            console.log(student)


        } catch (err) {
            console.log(err)
        }
        navigate('/studentsList')
    }

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


        const url = `http://localhost:5000/api/students/${autoid}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_name: formData.fullName,
                student_gender: formData.gender,
                student_date_of_birth: formData.dateOfBirth,
                student_nationality: {
                    student_nationality_id: formData.nationality.id,
                    student_nationality_emoji: formData.nationality.emoji,
                    student_nationality_name: formData.nationality.name
                },
                student_state: {
                    student_state_id: formData.state.id,
                    student_state_name: formData.state.name,
                    student_state_code: formData.state.state_code

                },
                student_city: formData.city,
                student_street: formData.street,
                student_pincode: formData.pinCode,
                student_status: formData.status,

                student_guardian_name: formData.parentName,
                relation_to_student: formData.relationshipToStudent,
                student_contact: formData.contactNumber,
                student_email: formData.email,
                parent_occupation: formData.occupation,

                student_previous_school: formData.nameOfPreviousSchool,
                student_last_grade: formData.lastGrade,

                student_class: formData.class,
                student_section: formData.section,
                student_roll: formData.roll,
                student_preffered_date: formData.prefferedDate,

                student_emergency_gurdian: formData.parentName,
                student_emergency_relation: formData.relationshipToStudent,
                student_emergency_contact: formData.contactNumber,

                student_medical: formData.medical,
                student_specify: formData.specify,
            })
        }
        console.log({
            student_name: formData.fullName,
            student_gender: formData.gender,
            student_date_of_birth: formData.dateOfBirth,
            student_nationality: {
                student_nationality_id: formData.nationality.id,
                student_nationality_emoji: formData.nationality.emoji,
                student_nationality_name: formData.nationality.name
            },
            student_state: {
                student_state_id: formData.state.id,
                student_state_name: formData.state.name,
                student_state_code: formData.state.state_code

            },
            student_city: formData.city,
            student_street: formData.street,
            student_pincode: formData.pinCode,
            student_status: formData.status,

            student_guardian_name: formData.parentName,
            relation_to_student: formData.relationshipToStudent,
            student_contact: formData.contactNumber,
            student_email: formData.email,
            parent_occupation: formData.occupation,

            student_previous_school: formData.nameOfPreviousSchool,
            student_last_grade: formData.lastGrade,

            student_class: formData.class,
            student_section: formData.section,
            student_roll: formData.roll,
            student_preffered_date: formData.prefferedDate,

            student_emergency_gurdian: formData.parentName,
            student_emergency_relation: formData.relationshipToStudent,
            student_emergency_contact: formData.contactNumber,

            student_medical: formData.medical,
            student_specify: formData.specify,
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }


        navigate('/studentsList')
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
    // console.log(formData)


    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentFormContainer>
                    <FormContainer>
                        <TopContainer formname='Student Registration Form' fun={onClose} />

                        <Forms onSubmit={handleSubmit} >
                            <FormName>Student Details</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Input name="studentId" id="studentId" value={formData.studentId} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text"
                                        required
                                    // placeholder="Enter Admission Number"
                                    />
                                    <InputName htmlFor="studentId">Student Id</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="fullName" id="fullName" value={formData.fullName} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="fullname">Full Name</InputName>
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
                                    <Input name="dateOfBirth"
                                        placeholder=""
                                        onChange={(e) => handleChange(e.target.value, e.target.name)}
                                        value={formData.dateOfBirth}
                                        type="date"
                                        id="dob"
                                    />
                                    <InputName htmlFor="dob" >Date of Birth</InputName>
                                </InputContainer>

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
                                    <Input name="street" value={formData.street} type="text" onChange={(e) => handleChange(e.target.value, e.target.id)} id="street" required />
                                    <InputName htmlFor="street" >Street</InputName>
                                </InputContainer>


                                <InputContainer>
                                    <Input name="pinCode" value={formData.pinCode} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" id="pinCode" maxLength="6" required />
                                    <InputName htmlFor="pinCode" >Pin Code</InputName>
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


                            <FormName>Parent / Guardian Information</FormName>
                            <InputElements>
                                {ParentForm.map(each => (each.inputType !== "number" ?
                                    (<InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values}
                                            // placeholder={each.Placeholder}
                                            required={each.required}
                                            value={formData[each.values]} onChange={(e) => handleChange(e.target.value, e.target.id)} />
                                        <InputName htmlFor={each.values} >{each.name}</InputName>
                                    </InputContainer>)
                                    :
                                    (<InputContainer key={each.values}>
                                        <PhoneInput name='schoolContact'
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
                                            value={formData.contactNumber} placeholder='Contact Number' onChange={(e) => { handleChange(e, 'contactNumber') }} />
                                    </InputContainer>)
                                ))}
                            </InputElements>

                            <FormName>Previous School Information </FormName>
                            <InputElements>

                                {PreviousSchool.map(each => (
                                    <InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values} onChange={(e) => handleChange(e.target.value, e.target.id)} value={formData[each.values]}
                                            required={each.required}
                                        //  placeholder={each.Placeholder} 
                                        />
                                        <InputName htmlFor={each.values} >{each.name}</InputName>

                                    </InputContainer>
                                ))}
                                <InputContainer>
                                    <InputName1 >Last Grade/Class Attended</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="class"
                                        options={Options}
                                        value={Options.find(each => (formData.class === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'lastGrade')}
                                    />
                                </InputContainer>
                            </InputElements>

                            <FormName>Academic Information</FormName>
                            <InputElements>
                                <InputContainer>
                                    <InputName1 >Grade/Class for Enrollment</InputName1>
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
                                    <Input name="roll" value={formData.roll} type="text" onChange={(e) => handleChange(e.target.value, e.target.id)} id="roll" required />
                                    <InputName htmlFor="street" >Roll Number</InputName>
                                </InputContainer>
                                {Academic.map(each => (
                                    <InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values} onChange={(e) => handleChange(e.target.value, e.target.id)} value={formData[each.values]}
                                            //  placeholder={each.Placeholder}
                                            required={each.required}
                                        />
                                        <InputName htmlFor={each.values} >{each.name}</InputName>

                                    </InputContainer>
                                ))}
                            </InputElements>

                            <FormName>Emergency Contact Details</FormName>
                            <InputElements>
                                {EmergencyDetails.map(each => (each.inputType !== "number" ?
                                    (<InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values}
                                            // placeholder={each.Placeholder}
                                            required={each.required}
                                            value={formData[each.values]} onChange={(e) => handleChange(e.target.value, e.target.id)} />
                                        <InputName htmlFor={each.values} >{each.name}</InputName>
                                    </InputContainer>)
                                    :
                                    (<InputContainer key={each.values}>
                                        <PhoneInput name={each.values}
                                            defaultCountry="IN"
                                            // style={{ height:"100%"}}
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
                                            value={formData[each.values]} placeholder='Contact Number' onChange={(e) => { handleChange(e.target.value, e.target.name) }} />
                                    </InputContainer>)
                                ))}
                            </InputElements>
                            <FormName>Medical Information</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Normal htmlFor="check" >Does the student have any medical conditions?</Normal>
                                    <RadioContainer>
                                            <Radio><Input id="yes" type="radio" name="medical" value="yes" checked={formData.medical === "yes"}  onChange={(e) => handleChange(e.target.value, e.target.name)} /></Radio>
                                            <RadioName><label htmlFor="yes" >YES</label></RadioName>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="no" type="radio" name="medical" value="no" checked={formData.medical === "no"} onChange={(e) => handleChange(e.target.value, e.target.name)} /></Radio>
                                            <RadioName><label htmlFor="no" >NO</label></RadioName>
                                        </RadioContainer>

                                </InputContainer>
                                <InputContainer>
                                    <InputNameForDetail htmlFor="if" >If Yes, please specify :</InputNameForDetail>
                                    <Input name="specify" type="text" id="if" onChange={(e) => handleChange(e.target.value, e.target.name)} value={formData.specify} required />
                                </InputContainer>
                            </InputElements>
                            <SubmitButton type="submit" buttonname='submit' />

                        </Forms>
                    </FormContainer>
                </StudentFormContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default CreateStudent