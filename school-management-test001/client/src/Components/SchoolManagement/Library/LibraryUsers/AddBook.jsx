import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, Input, 
} from "./StyledComponents"

// import { CountrySelect, StateSelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

// import { CustomStyles } from "../../CustomStyles"
// import { InventoryCategory } from "../../DummyData";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import Select from 'react-select';

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

const AddBook = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    let dates = `${year}-${month}-${day}`

    // RETURN THE FORMATTED DATE IN 'YYYY-MM-DD' FORMAT




    // const [countryid, setCountryid] = useState(null);
    // const [stateid, setstateid] = useState(null);
    // console.log(stateid)

    const [formData, setFormData] = useState({
        userId: '', userName: '', bookId:'', bookName: '', author: '', category: '', startDate: dates, endDate: dates, 
    });


    const navigate = useNavigate()

    const onClose = () => {
        navigate('/users')
    }
    const handleChange = (value, key) => {
        console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        navigate('/users')
    }

    // const handleSelect = (e) => {
    //     // console.log(e)
    //     const { value } = e
    //     setFormData(prevData => ({
    //         ...prevData,
    //         selectedOption: value[value],

    //     }))
    // }

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
                <SideContainer>
                    <FormContainer>
                    <TopContainer formname='Add Book' fun={onClose}/>


                        <Forms onSubmit={handleSubmit} >
                            <FormName>Details</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Input name="User ID" id="userId" value={formData.userId} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="userId">User ID</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="User Name" id="userName" value={formData.userName} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text"
                                        required
                                    // placeholder="Enter Admission Number"
                                    />
                                    <InputName htmlFor="userName">User Name</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Book ID" id="bookId" value={formData.bookId} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="bookId">Book ID</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Book Name" id="bookName" value={formData.bookName} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="bookName">Book Name</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Author" id="author" value={formData.author} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="author">Author</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Category" id="category" value={formData.category} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="category">Category</InputName>
                                </InputContainer>
                               
                                <InputContainer >
                                    <Input name="Start Date"
                                        placeholder=""
                                        onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        value={formData.startDate}
                                        type="date"
                                        id="startDate"
                                    />
                                    <InputName htmlFor="startDate" >Start Date</InputName>
                                </InputContainer>
                                <InputContainer >
                                    <Input name="End Date"
                                        placeholder=""
                                        onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        value={formData.endDate}
                                        type="date"
                                        id="endDate"
                                    />
                                    <InputName htmlFor="endDate" >End Date</InputName>
                                </InputContainer>
                                
                                {/* <InputContainerDiff>
                                    <DescriptionInput name="Description"
                                        value={formData.description}
                                        type="text" onChange={(e) => handleChange(e.target.value, e.target.id)} id="description" />
                                    <InputName1 htmlFor="description" >Description</InputName1>
                                </InputContainerDiff> */}

                            </InputElements>
                            <SubmitButton type="submit" buttonname='Add'/>

                        </Forms>
                    </FormContainer>
                </SideContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default AddBook