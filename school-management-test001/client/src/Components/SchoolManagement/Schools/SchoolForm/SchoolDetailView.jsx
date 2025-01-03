import {
    MainContainer, BottomContainer, StudentFormContainer, FormContainer, Forms, FormName, InputElements, CloseIcon,
    InputContainer, InputName, Input, Country, InputName1,
} from "./StyledComponents"

import { useParams } from "react-router-dom";

import { StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';

import { CustomStyles } from "../../CustomStyles"
import { SchoolType, InstituteType, Board, Status } from "../../DummyData";

import SubmitButton from "../../../../shared/UIElements/submitButton";
import TopContainer from "../../../../shared/UIElements/topcontainer";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
import { IoMdDownload } from "../../../../shared/icons"


const SchoolDetailView = () => {
    // const date = new Date()
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    // const day = String(date.getDate()).padStart(2, "0");
    // // console.log(`${year}-${month}-${day}`);1
    // let dates = `${year}-${month}-${day}`

    // RETURN THE FORMATTED DATE IN 'YYYY-MM-DD' FORMAT


    // const year=currentDate.getFullYear()
    // const month=currentDate.getMonth()+1
    // const day=currentDate.getDate()
    // // console.log(currentDate.TOlOCAL())
    // let dates=`${year}-${month}-${day}`
    // console.log(dates)

    const { instituteId } = useParams()

    const [formData, setFormData] = useState({
        schoolName: '', schoolId: '', year: '', schoolType: '', instituteType: '', board: '', schoolContact: '+91', schoolEmail: '', status: 'active',
        nationality: { id: '', emoji: '', name: '' }, state: { id: '', name: '', state_code: '' }, city: '', street: '', pinCode: '',
        principalName: '', principalContact: '+91', principalEmail: ''
    });

    useEffect(() => {
        getInstituteDetail()
    }, [])

    const getInstituteDetail = async () => {
        const url = `http://localhost:5000/api/schools/${instituteId}`
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const data = responseData.institute[0]
            console.log(data)
            setFormData((prev) => ({
                ...prev,
                schoolId: data.institute_id,
                schoolName: data.institute_name,
                year: data.est_year,
                schoolType: data.institute_category,
                instituteType: data.institute_type,
                board: data.board_of_education,
                schoolContact: data.institute_contact,
                schoolEmail: data.institute_email,
                status: data.institute_status,
                nationality: {
                    id: data.institute_nationality.institute_nationality_id,
                    emoji: data.institute_nationality.institute_nationality_emoji,
                    name: data.institute_nationality.institute_nationality_name
                },
                state: {
                    id: data.institute_state.institute_state_id,
                    name: data.institute_state.institute_state_name,
                    state_code: data.institute_state.institute_state_code
                },
                city: data.institute_city,
                street: data.institute_street,
                pinCode: data.institute_pincode,
                principalName: data.institute_principal_name,
                principalContact: data.institute_principal_contact,
                principalEmail: data.institute_principal_email

            })
            )



        } catch (err) {
            console.log(err)
        }

    }


    const [countryid, setCountryid] = useState(formData.nationality);
    const [stateid, setstateid] = useState(null);
    // console.log(stateid)



    const inputStyle = {
        fontSize: "100%",
        height: "1.8rem",
        width: "90%",
        padding: "0.2rem",
        outline: "none",
        border: '0',
        backgroundColor: "transparent",
        borderRadius: "1rem",

    };

    const navigate = useNavigate()


    // console.log(formData)


    const onClose = () => {
        navigate('/schoolList')
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
        const url = `http://localhost:5000/api/schools/${instituteId}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                institute_name: formData.schoolName,
                est_year: formData.year,
                institute_category: formData.schoolType,
                institute_type: formData.instituteType,
                board_of_education: formData.board,
                institute_contact: formData.schoolContact,
                institute_email: formData.schoolEmail,
                institute_status: formData.status,
                institute_nationality: {
                    institute_nationality_id: formData.nationality.id,
                    institute_nationality_emoji:formData.nationality.emoji,
                    institute_nationality_name: formData.nationality.name,
                },
                institute_state: {
                    institute_state_id: formData.state.id,
                    institute_state_name: formData.state.name,
                    institute_state_code: formData.state.state_code,
                },
                institute_city: formData.city,
                institute_street: formData.street,
                institute_pincode: formData.pinCode,
                institute_principal_name: formData.principalName,
                institute_principal_contact: formData.principalContact,
                institute_principal_email: formData.principalEmail
            })
        }
        console.log({
            institute_name: formData.schoolName,
            est_year: formData.year,
            institute_category: formData.schoolType,
            institute_type: formData.instituteType,
            board_of_education: formData.board,
            institute_contact: formData.schoolContact,
            institute_email: formData.schoolEmail,
            institute_status: formData.status,
            institute_nationality: {
                institute_nationality_emoji: formData.nationality.emoji,
                institute_nationality_name: formData.nationality.name
            },
            institute_state: {
                institute_state_id: formData.state.id,
                institute_state_name: formData.state.name,
                institute_state_code: formData.state.code,

            },
            institute_city: formData.city,
            institute_street: formData.street,
            institute_pincode: formData.pinCode,
            institute_principal_name: formData.principalName,
            institute_principal_contact: formData.principalContact,
            institute_principal_email: formData.principalEmail
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/schoolList')
    }

    const handleSelect = (e, key) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            [key]: value,

        }))
    }

    const changeData = (e, key) => {
        console.log(e)

        if (key === 'nationality') {
            setCountryid(e.id)
            setFormData((prev) => ({
                ...prev,
                nationality: {
                    id: e.id,
                    emoji: e.emoji,
                    name: e.name,
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
                        <TopContainer formname='School Detail View' fun={onClose} />

                        {/* <TopContainer style={{ height: '6vh' }}>
                            <FormHeading>School Detail view</FormHeading>
                            <CloseButton fun={onClose} />
                            <div style={{display:'flex',flexDirection:"row",alignItems:'center',alignSelf:'flex-end'}}>
                                <CloseIcon type="button" ><IoMdDownload style={{ color: "darkgreen", marginRight:'1rem' }} size={20} /></CloseIcon>
                                <CloseButton fun={onClose} />

                            </div>
                        </TopContainer> */}

                        <Forms onSubmit={handleSubmit} >
                            <FormName>School Details</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Input name="schoolId" id="schoolId" value={formData.schoolId} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text"
                                        required
                                    // placeholder="Enter Admission Number"
                                    />
                                    <InputName htmlFor="schoolId">School ID</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="schoolName" id="schoolName" value={formData.schoolName} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="schoolName">School Name</InputName>
                                </InputContainer>


                                <InputContainer>
                                    <Input name="year"
                                        placeholder=""
                                        onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        value={formData.year}
                                        type="number"
                                        id="year"
                                        min="1900" max="2030" step="1" required
                                    />
                                    <InputName htmlFor="year" >Year of Establishment</InputName>
                                </InputContainer>
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >School Type</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="SchoolType"
                                        options={SchoolType}
                                        value={SchoolType.find(each => (formData.schoolType === each.value))} placeholder="Select"
                                        onChange={(e) => { handleSelect(e, 'schoolType') }}
                                    />
                                </InputContainer>
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Institute Type</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="InstituteType"
                                        options={InstituteType}
                                        value={InstituteType.find(each => (formData.instituteType === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'instituteType')}
                                    />
                                </InputContainer>
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Board of Education</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="board"
                                        options={Board}
                                        value={Board.find(each => (formData.board === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'board')}
                                        required
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <PhoneInput name='schoolContact'
                                        defaultCountry="IN"
                                        inputProps={{ minLength: 12 }}
                                        // style={{ height: "100%" }}
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

                                        value={formData.schoolContact} placeholder='Contact Number' onChange={(e) => { handleChange(e, 'schoolContact') }} />
                                </InputContainer>
                                <InputContainer>
                                    <Input name="email" id="schoolEmail" value={formData.schoolEmail} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="email"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="email">Email</InputName>
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

                            <FormName>School Address</FormName>
                            <InputElements>
                                <InputContainer>
                                    {/* <div className="stdropdown-container" style={{ borderRadius: '1rem' }}> */}
                                    <Country style={inputStyle}
                                        defaultValue={{
                                            emoji: formData.nationality.emoji,
                                            name: formData.nationality.name
                                        }}
                                        onChange={(e) => changeData(e, "nationality")}
                                        placeHolder="Nationality" type="text" id="nationality" />
                                    {/* </div> */}
                                </InputContainer>

                                <InputContainer>
                                    <StateSelect style={inputStyle} name="state" countryid={countryid} defaultValue={{ id: formData.state.id, name: formData.state.name }}
                                        onChange={(e) => changeData(e, 'state')}
                                        placeHolder="State" required type="text" id="state" />
                                </InputContainer>

                                <InputContainer>
                                    <Input name="city" value={formData.city} type="text" stateid={stateid} onChange={(e) => handleChange(e.target.value, e.target.id)} id="city" required />
                                    <InputName htmlFor="city" >City</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="street" value={formData.street} type="text" stateid={stateid} onChange={(e) => handleChange(e.target.value, e.target.id)} id="street" required />
                                    <InputName htmlFor="street" >Street</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="pinCode" id='pinCode' value={formData.pinCode} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" maxLength="6" required />
                                    <InputName htmlFor="pinCode" >Pin Code</InputName>
                                </InputContainer>
                            </InputElements>
                            <FormName>Administrative Information</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Input name="principalName" id="principalName" value={formData.principalName} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="principalName">Principal Name</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <PhoneInput name='principalContact'
                                        defaultCountry="IN"
                                        inputProps={{ minLength: 12 }}
                                        inputStyle={{ width: '100%', borderRadius: '1rem', height: '2.5rem' }}
                                        containerStyle={{
                                            width: '100%',

                                        }}

                                        buttonClass="custom-dropdown-button"
                                        dropdownStyle={{
                                            height: '8rem',
                                            borderRadius: '1rem',
                                            overflow: 'auto'
                                        }}

                                        value={formData.principalContact} placeholder='Contact Number' onChange={(e) => { handleChange(e, 'principalContact') }} />
                                </InputContainer>
                                <InputContainer>
                                    <Input name="principalEmail" id="principalEmail" value={formData.principalEmail} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="email"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="principalEmail">Email</InputName>
                                </InputContainer>
                            </InputElements>
                            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', alignSelf: 'flex-end' }}>
                                <CloseIcon type="button" ><IoMdDownload style={{ color: "darkgreen", marginRight: '1rem' }} size={20} /></CloseIcon>
                                <SubmitButton type="submit" buttonname='Update' />

                            </div>


                        </Forms>
                    </FormContainer>
                </StudentFormContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default SchoolDetailView