import {
    MainContainer, BottomContainer, StudentFormContainer, FormContainer, Forms, FormName, FormTop, InputElements,
    InputContainer, InputName, Input, InputName1,
} from "./StyledComponents"

// import { CountrySelect, StateSelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
import { CustomStyles } from "../../CustomStyles"
import { Status } from "../../DummyData";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'



// import { IoMdCloseCircleOutline } from "react-icons/io";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { Tooltip } from 'react-tooltip'
import { useParams } from "react-router-dom";



// import { CustomStyles} from "../../CustomStyles";
// import styled from 'styled-components';
import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

const TransportDetailView = () => {

    const [formData, setFormData] = useState({
        studentId: '', studentName: '', gender: '', roll: '', class: '', section: '', city: '', pinCode: '',
        pickUp: '', busFee: '', paidAmount: '', dueAmount: '', status: 'Active',
        parentName: '', relationshipToStudent: '', contactNumber: '',
        medical: '', specify: ''
    });

    const { studentId } = useParams()

    useEffect(() => {
        getTransportDetail()
    }, [])

    const getTransportDetail = async () => {
        const url = `http://localhost:5000/api/transport/${studentId}`
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const data = responseData.transport[0]
            console.log(data)
            setFormData((prev) => ({
                ...prev,
                studentId: data.student_id,
                studentName: data.student_name,
                gender: data.student_gender,
                roll: data.student_roll,
                class: data.student_class,
                section: data.student_section,
                city: data.student_city,
                pinCode: data.student_pincode,
                pickUp: data.transport_pickup,
                busFee: data.transport_busfee,
                paidAmount: data.transport_paid,
                dueAmount: data.transport_due,
                status: data.transport_status,
                parentName: data.student_guardian_name,
                relationshipToStudent: data.relation_to_student,
                contactNumber: data.student_contact,
                medical: data.student_medical,
                specify: data.student_specify
            })
            )

        } catch (err) {
            console.log(err)
        }

    }

    const navigate = useNavigate()

    const InformationOfStudent = `
    Student Id          : ${formData.studentId}
    Student Name   : ${formData.studentName}
    Gender              : ${(formData.gender).toUpperCase()}
    Class                  :  ${formData.class} / ${formData.section}
    Roll                    :  ${formData.roll}
    City                    : ${(formData.city).toUpperCase()}
    Guardian Name : ${formData.parentName}
    Contact              : ${formData.contactNumber}
    Medical Issues   : ${formData.specify}
   `;
   
   const InformationOfStaff = `
Staff Id                : ${formData.studentId}
Staff Name         : ${formData.studentName}
Gender               : ${(formData.gender).toUpperCase()}
Class Teacher     :  ${formData.class} / ${formData.section}
City                    : ${(formData.city).toUpperCase()}
Contact              : ${formData.contactNumber}
Medical Issues   : ${formData.specify}
   `;

    const Transport = [{ name: 'PickUp/Drop point', values: 'pickUp', inputType: 'text', Placeholder: "Select PickUp Point", required: true },
    { name: 'Bus Fee', values: 'busFee', inputType: 'number', Placeholder: "", required: true },
    { name: 'Paid Amount', values: 'paidAmount', inputType: 'number', Placeholder: "", required: true },
    { name: 'Due Amount', values: 'dueAmount', inputType: 'number', Placeholder: "", required: true },
    { name: 'Status', values: 'status', inputType: 'select', Placeholder: "", required: true },

    ]

    // const EmergencyDetails = [{ name: "Guardian Name", values: 'parentName', inputType: 'text', Placeholder: "Enter Full Name", required: true },
    // { name: "Relationship to Student", values: 'relationshipToStudent', inputType: 'text', Placeholder: "Enter Relation", required: true },
    // { name: "Contact Number", values: 'contactNumber', inputType: 'tel', Placeholder: "Enter Contact Number", required: true },
    // ]

    const onClose = () => {
        navigate('/transportList')
    }
    const handleChange = (value, key) => {
        // console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData)
        const url = `http://localhost:5000/api/transport/${studentId}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_name: formData.studentName,
                student_gender: formData.gender,
                student_roll: formData.roll,
                student_class: formData.class,
                student_section: formData.section,
                student_city: formData.city,
                student_pincode: formData.pinCode,
                student_guardian_name: formData.parentName,
                relation_to_student: formData.relationshipToStudent,
                student_contact: formData.contactNumber,
                student_medical: formData.medical,
                student_specify: formData.specify,

                transport_pickup: formData.pickUp,
                transport_busfee: formData.busFee,
                transport_paid: formData.paidAmount,
                transport_due: formData.dueAmount,
                transport_status: formData.status,

            })
        }
        console.log({

            transport_pickup: formData.pickUp,
            transport_busfee: formData.busFee,
            transport_paid: formData.paidAmount,
            transport_due: formData.dueAmount,
            transport_status: formData.status,
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }


        navigate('/transportList')
    }

    const handleSelect = (e, name) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }


    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentFormContainer>
                    <FormContainer>
                        <TopContainer formname='Transportation Detail View' fun={onClose} />

                        <Forms onSubmit={handleSubmit} >
                            <FormTop>
                                <FormName>Student Details</FormName>
                                <HiOutlineInformationCircle data-tooltip-id="my-tooltip"
                                    data-tooltip-content={formData.studentId.slice(0,2)==="ST"? InformationOfStudent : InformationOfStaff}
                                    style={{ marginTop: "6px", cursor: "pointer" }} size={20} />
                                <Tooltip arrow
                                    id="my-tooltip"
                                    place="right-end"       // Position the tooltip at the top
                                    effect="solid"    // Solid background for the tooltip
                                    delayHide={400}   // Delay before the tooltip hides
                                    style={{
                                        backgroundColor: '#f3f3f3', // Green background
                                        color: '#000',             // White text
                                        borderRadius: '10px', // Optional: rounded corners
                                        zIndex: "100",
                                        whiteSpace: "pre-wrap",
                                        height: "auto",
                                        width: "auto",
                                        padding: "0.8rem",
                                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                                        border: "1px solid black",
                                    }}
                                />
                            </FormTop>

                            <InputElements>
                                <InputContainer>
                                    <Input name="Student ID" id="admission" value={formData.studentId} onChange={handleChange} type="text"
                                        required
                                    // placeholder="Enter Admission Number"
                                    />
                                    <InputName htmlFor="admission">Student ID</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="fullName" id="fullname" value={formData.studentName} onChange={handleChange}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="fullname">Student Name</InputName>
                                </InputContainer>

                            </InputElements>

                            <FormName>Transportation Information</FormName>
                            <InputElements>
                                {Transport.map(each => (each.inputType !== "select" ?
                                    (<InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values}
                                            // placeholder={each.Placeholder}
                                            required={each.required}
                                            value={formData[each.values]} onChange={handleChange} />
                                        <InputName htmlFor={each.values} >{each.name}</InputName>
                                    </InputContainer>)
                                    :
                                    (<InputContainer key={each.values} style={{ width: "30%", }}>
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
                                    </InputContainer>)
                                ))}
                            </InputElements>

                            {/* <div>
                            <FormName>Emergency Contact Details</FormName>
                            <InputElements>
                                {EmergencyDetails.map(each => (each.inputType !== "tel" ?
                                    (<InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values}
                                            // placeholder={each.Placeholder}
                                            required={each.required}
                                            value={formData[each.values]} onChange={handleChange} />
                                        <InputName htmlFor={each.values} >{each.name}</InputName>
                                    </InputContainer>)
                                    :
                                    (<InputContainer key={each.values}>
                                        <PhoneInput name='contactNumber'
                                            styles={inputStyle}
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
                            <FormName>Medical Information</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Normal htmlFor="check" >Does the student have any medical conditions?</Normal>
                                    <RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="yes" type="radio" name="medical" value="yes" onChange={handleChange} /></Radio>
                                            <RadioName><label htmlFor="yes" >YES</label></RadioName>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="no" type="radio" name="medical" value="no" onChange={handleChange} /></Radio>
                                            <RadioName><label htmlFor="no" >NO</label></RadioName>
                                        </RadioContainer>
                                    </RadioContainer>

                                </InputContainer>
                                <InputContainer>
                                    <Input name="specify" type="text" id="if" onChange={handleChange} value={formData.specify} required />
                                    <InputName htmlFor="if" >If Yes, please specify :</InputName>

                                </InputContainer>
                            </InputElements>
                            </div> */}
                            <SubmitButton type="submit" buttonname='Update' />

                        </Forms>
                    </FormContainer>
                </StudentFormContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default TransportDetailView