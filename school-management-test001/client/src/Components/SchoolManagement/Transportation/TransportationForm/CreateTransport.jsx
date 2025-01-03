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


// import { CustomStyles} from "../../CustomStyles";
// import styled from 'styled-components';
import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

// const inputStyle = {
//     fontSize: "100%",
//     height: "1.8rem",
//     width: "100%",
//     padding: "0.2rem",
//     outline: "none",
//     border: "0",
//     backgroundColor: "transparent",
//     borderRadius: "2rem",

// };

// const StyledCountrySelect = styled(CountrySelect)`
//   font-size: 100%;
//   height: 2.0rem;
//   width: 100%;
//   padding: 0.2rem;
//   outline: none;
//   border: 0;
//   background-color: transparent;
//   border-radius: 2rem;

//   /* Style the first option to simulate a placeholder */
//   option:disabled {
//     color: #888;  /* Placeholder color */
//     font-style: italic;  /* Optional: make the placeholder text italic */
//   }

//   &:focus {
//     border: 1px solid #ccc;
//     background-color: #f9f9f9;
//   }
// `;

const CreateTransport = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`



    const [formData, setFormData] = useState({
        userId: '', userName: '', gender: '', roll: '', class: '', section: '', city: '', pinCode: '',
        pickUp: '', busFee: '', paidAmount: '', dueAmount: '', status: 'Active',
        parentName: '', relationshipToStudent: '', contactNumber: '',
        medical: '', specify: ''
    });
    useEffect(() => {
        getTransportDetail()
    }, [formData.userId])

    const [isStaff,setStaff]=useState(false)

    const getTransportDetail = async () => {
        if (formData.studentId.length === 8) {
            let prefix = formData.studentId.slice(0, 2)
            if (prefix == "ST") {
                const url = `http://localhost:5000/api/students/${formData.studentId}`
                const options = {
                    method: "GET",
                }

                try {
                    const response = await fetch(url, options)
                    const responseData = await response.json()
                    const data = responseData.student[0]
                    console.log(data)
                    if (data) {
                        setFormData((prev) => ({
                            ...prev,
                            studentName: data.student_name,
                            gender: data.student_gender,
                            class: data.student_class,
                            section: data.student_section,
                            roll: data.student_roll,
                            city: data.student_city,
                            pinCode: data.student_pincode,
                            parentName: data.student_guardian_name,
                            relationshipToStudent: data.relation_to_student,
                            contactNumber: data.student_contact,
                            medical: data.student_medical,
                            specify: data.student_specify

                        })
                        )
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            else if (prefix=="SF"){
                setStaff((prev)=>!prev)
                const url = `http://localhost:5000/api/staff/${formData.studentId}`
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
                            studentName: data.staff_name,
                            gender: data.staff_gender,
                            class: data.staff_class,
                            section: data.staff_section,
                           roll:"",
                            city: data.staff_city,
                            pinCode: data.staff_pincode,
                            parentName: "",
                            relationshipToStudent: "",
                            contactNumber: data.staff_contact,
                            medical: data.staff_medical,
                            specify: data.staff_specify

                        })
                        )
                    }
                } catch (err) {
                    console.log(err)
                }
            }
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
Staff Id               : ${formData.studentId}
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
        console.log(formData)
        const url = "http://localhost:5000/api/transport"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id: formData.userId,
                student_name: formData.userName,
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

                transport_created_at: dates
            })
        }
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

    // const changeData = (e, key) => {
    //     // console.log(e)

    //     if (key === 'nationality') {
    //         setCountryid(e.id)
    //     }
    //     else if (key === 'state') {
    //         setstateid(e.id)
    //     }

    //     handleChange(e.name, key)
    // }
    // console.log(formData)


    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentFormContainer>
                    <FormContainer>
                        <TopContainer formname='Transportation Form' fun={onClose} />

                        <Forms onSubmit={handleSubmit} >
                            <FormTop>
                                <FormName>User Details</FormName>
                                <HiOutlineInformationCircle data-tooltip-id="my-tooltip"
                                    data-tooltip-content={isStaff ? InformationOfStaff:InformationOfStudent }
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
                                    <Input name="userId" id="userId" value={formData.userId} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text"
                                        required
                                    // placeholder="Enter Admission Number"
                                    />
                                    <InputName htmlFor="userId">User ID</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="userName" id="userName" value={formData.userName} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="userName">User Name</InputName>
                                </InputContainer>

                                {/* <InputContainer>
                                    <Normal htmlFor="gender" >Gender</Normal>
                                    <Both>
                                        <RadioContainer>
                                            <Radio><Input id="male" type="radio" name="gender" value='male' onChange={handleChange} /></Radio>
                                            <RadioName><label htmlFor="male" >Male</label></RadioName>
                                        </RadioContainer>
                                        <RadioContainer>
                                            <Radio><Input id="female" type="radio" name="gender" value='female' onChange={handleChange} /></Radio>
                                            <RadioName><label htmlFor="female" > Female</label></RadioName>
                                        </RadioContainer>
                                    </Both>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="city" value={formData.city} type="text" onChange={(e) => handleChange(e.target.value, 'city')} id="city" required />
                                    <InputName htmlFor="city" >City</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="pinCode" value={formData.pinCode} onChange={handleChange} type="text" id="pincode" maxLength="6" required />
                                    <InputName htmlFor="pincode" >Pin Code</InputName>
                                </InputContainer> */}

                            </InputElements>

                            <FormName>Transportation Information</FormName>
                            <InputElements>
                                {Transport.map(each => (each.inputType !== "select" ?
                                    (<InputContainer key={each.values}>
                                        <Input name={each.values} type={each.inputType} id={each.values}
                                            // placeholder={each.Placeholder}
                                            required={each.required}
                                            value={formData[each.values]} onChange={(e) => handleChange(e.target.value, e.target.id)} />
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

                            <SubmitButton type="submit" buttonname='Submit' />

                        </Forms>
                    </FormContainer>
                </StudentFormContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default CreateTransport