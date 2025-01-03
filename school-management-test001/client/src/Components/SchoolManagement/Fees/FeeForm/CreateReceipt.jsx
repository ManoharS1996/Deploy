import {
    MainContainer, BottomContainer, StudentFormContainer,FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, InputNameForDetail, Input,  FormTop,InputName1
} from "./StyledComponents"

import { HiOutlineInformationCircle } from "react-icons/hi2";
// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import Select from 'react-select';
import { useState } from "react";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import { CustomStyles,CareCustomStyles } from "../../CustomStyles"
import { FeeType,PaymentMode,PaymentStatus } from "../../DummyData";

import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

const CreateReceipt = () => {

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    let dates = `${year}-${month}-${day}`


    const navigate = useNavigate()

    const Information = `
    Student Id: S0027
    Student Name: Sruthika
    Gender: Female
    City: Vijayawada
    Guardian Name: Siva
    Contact: 1234567890
    `;

    const [formData, setFormData] = useState({
        studentId: '', studentName: '', gender: '', dateOfBirth: dates, nationality: '', state: '', city: '', street: '', pinCode: '', status: 'active', class: '', section: '',
        parentName: '', relationshipToStudent: '', contactNumber: '+91', email: '', occupation: '',
        medical: '', specify: '', feeType: '', totalFee: '', feePaid: '', dueAmount: '', dueDate: dates, paymentStatus: '', dateOfPayment: dates, transactionId: '', bankName: '', paymentMode: '',
    });
    // const ParentForm = [{ name: "Parent Name", value: 'parent_name', inputType: 'text', Placeholder: "Enter Parent Name", required: true },
    // { name: "Relationship to Student", value: 'relation', inputType: 'text', Placeholder: "Enter Relation", required: true },
    // { name: "Contact Number", value: 'contact_number', inputType: 'number', Placeholder: "Enter Contact Number", required: true },
    // { name: "Email", value: 'email', inputType: 'email', Placeholder: "Enter Email Address", required: true },
    // ]

    const FeesDetails = [
        { name: "Total Fee", value: 'totalFee', inputType: 'text', Placeholder: "", required: true },
        { name: "Fee Paid", value: 'feePaid', inputType: 'text', Placeholder: "", required: true },
        { name: "Due Amount", value: 'dueAmount', inputType: 'text', Placeholder: "", required: true },
        { name: "Due Date", value: 'dueDate', inputType: 'date', Placeholder: "", required: true },
    ]

    const PaymentInformation = [{ name: "Date of Payment", value: 'dateOfPayment', inputType: 'date', Placeholder: "", required: true },
    { name: "Transaction ID", value: 'transactionId', inputType: 'text', Placeholder: "Enter Transaction ID", required: true },
    { name: "Bank Name", value: 'bankName', inputType: 'text', Placeholder: "Enter Bank Number", required: true },

    ]

    const handleChange = (value, key) => {
        console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSelect = (e, key) => {
        console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            [key]: value,

        }))
    }

    const onClose = () => {
        navigate('/feeTable')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        navigate('/feeTable')
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentFormContainer>
                    <FormContainer>
                    <TopContainer formname='Add Receipt' fun={onClose}/>

                        <Forms onSubmit={handleSubmit}>
                            <FormTop>
                                <FormName>Student Information</FormName>
                                <HiOutlineInformationCircle data-tooltip-id="my-tooltip"
                                    data-tooltip-content={Information}
                                    style={{ marginTop: "-5px", cursor: "pointer" }} size={20} />
                                <Tooltip arrow
                                    id="my-tooltip"
                                    place="right-end"       // Position the tooltip at the top
                                    effect="solid"    // Solid background for the tooltip
                                    delayHide={300}   // Delay before the tooltip hides
                                    style={{
                                        backgroundColor: '#f3f3f3', // Green background
                                        color: '#000',             // White text
                                        borderRadius: '10px', // Optional: rounded corners
                                        zIndex: "100",
                                        whiteSpace: "pre-wrap",
                                        height: "fit-content",
                                        width: "fit-content",
                                        padding: "0.2rem",
                                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                                    }}
                                />
                            </FormTop>
                            <InputElements>
                                <InputContainer>
                                    <Input id="studentId" value={formData.studentId} type="text" onChange={(e) => handleChange(e.target.value, e.target.id)} required />
                                    <InputName htmlfor="studentId">Student Id</InputName>

                                </InputContainer>
                                <InputContainer>
                                    <Input id="studentName" value={formData.studentName} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required />
                                    <InputName htmlFor="studentName">Student Name</InputName>

                                </InputContainer>
                            </InputElements>


                            {/* <FormName>Parent/Guardian Information</FormName>
                            <InputElements>
                                {ParentForm.map(each => (
                                    <InputContainer key={each.value}>
                                        <Input type={each.inputType} id={each.value} required />
                                        <InputName htmlFor={each.value} >{each.name}</InputName>

                                    </InputContainer>
                                ))}
                            </InputElements> */}

                            <FormName>Fee Details </FormName>
                            <InputElements>
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Type of Fees</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="feeType"
                                        options={FeeType}
                                        value={FeeType.find(each => (formData.feeType === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'feeType')}
                                    />
                                </InputContainer>
                                {FeesDetails.map(each => (each.inputType !== "date" ?
                                    (<InputContainer key={each.value}>
                                        <Input type={each.inputType} id={each.value} placeholder={each.Placeholder} value={formData[each.value]} onChange={(e) => { handleChange(e.target.value, e.target.id) }} required />
                                        <InputName htmlFor={each.value} >{each.name}</InputName>
                                    </InputContainer>)
                                    :
                                    (<InputContainer key={each.value}>
                                        <Input type={each.inputType} id={each.value} value={formData[each.value]} onChange={(e) => { handleChange(e.target.value, e.target.id) }} placeholder={each.Placeholder} required />
                                        <InputNameForDetail htmlFor={each.value} >{each.name}</InputNameForDetail>
                                    </InputContainer>)
                                ))}
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Payment Status</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="paymentStatus"
                                        options={PaymentStatus}
                                        value={PaymentStatus.find(each => (formData.paymentStatus === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'paymentStatus')}
                                    // onChange={handleSelect}
                                    />
                                </InputContainer>
                            </InputElements>


                            <FormName>Payment Information</FormName>
                            <InputElements>
                                {PaymentInformation.map(each => (each.inputType !== "date" ?
                                    (<InputContainer key={each.value}>
                                        <Input type={each.inputType} id={each.value} value={formData[each.value]} onChange={(e) => { handleChange(e.target.value, e.target.id) }} required />
                                        <InputName htmlFor={each.value} >{each.name}</InputName>
                                    </InputContainer>)
                                    :
                                    (<InputContainer key={each.value}>
                                        <Input type={each.inputType} id={each.value} value={formData[each.value]} onChange={(e) => { handleChange(e.target.value, e.target.id) }} required />
                                        <InputNameForDetail htmlFor={each.value} >{each.name}</InputNameForDetail>
                                    </InputContainer>)
                                ))}
                                 <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Payment Mode</InputName1>
                                    <Select
                                        styles={CareCustomStyles}
                                        name="paymentMode"
                                        options={PaymentMode}
                                        value={PaymentMode.find(each => (formData.paymentMode === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'paymentMode')}
                                    // onChange={handleSelect}
                                    />
                                </InputContainer>
                            </InputElements>

                            <SubmitButton type="submit" buttonname='Create'/>

                        </Forms>
                    </FormContainer>
                </StudentFormContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default CreateReceipt