import {
    MainContainer, BottomContainer, StudentListContainer, FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, InputName1, Input, InputContainerDiff, DescriptionInput,
} from "./StyledComponents"


import { CustomStyles } from "../CustomStyles"
import { InventoryCategory, Status } from "../DummyData";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';
import { useLocation } from "react-router-dom";

import TopContainer from "../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../shared/UIElements/submitButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";

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

const CreateInventory = () => {
    const location = useLocation()
    const { autoid } = location.state || {};

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    let dates = `${year}-${month}-${day}`

    const [formData, setFormData] = useState({
        itemId:autoid, itemName: '', category: '', brand: '', quantity: '', unitPrice: '', totalPrice: '', purchaseDate: dates, unitOfMeasure: '', location: '', status: 'Active', description: ''
    });


    const navigate = useNavigate()

    const onClose = async() => {
        navigate('/inventory')
        const url = `http://localhost:5000/api/inventory/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const item = responseData.items || []
            console.log(item)


        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (value, key) => {
        console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.log(formData)

        const url = `http://localhost:5000/api/inventory/${autoid}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_name:formData.itemName,
                item_category:formData.category ,
                item_quantity:formData.quantity,
                item_unitprice:formData.unitPrice ,
                item_totalprice:formData.totalPrice ,
                item_purchasedate:formData.purchaseDate,
                item_brand:formData.brand,
                item_unitmeasure: formData.unitOfMeasure,
                item_place:formData.location,
                item_status:formData.status ,
                item_description: formData.description,
            })
        }
        console.log({
            item_name:formData.itemName,
                item_category:formData.category ,
                item_quantity:formData.quantity,
                item_unitprice:formData.unitPrice ,
                item_totalprice:formData.totalPrice ,
                item_purchasedate:formData.purchaseDate,
                item_brand:formData.brand,
                item_unitmeasure: formData.unitOfMeasure,
                item_place:formData.location,
                item_status:formData.status ,
                item_description: formData.description,
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/inventory')
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
                <StudentListContainer>
                    <FormContainer>
                        <TopContainer formname='Inventory Form' fun={onClose} />

                        <Forms onSubmit={handleSubmit} >
                            <FormName>Inventory Details</FormName>
                            <InputElements>
                                <InputContainer>
                                    <Input name="Item ID" id="itemId" value={formData.itemId} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="itemId">Item ID</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Item Name" id="itemName" value={formData.itemName} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text"
                                        required
                                    // placeholder="Enter Admission Number"
                                    />
                                    <InputName htmlFor="itemName">Item Name</InputName>
                                </InputContainer>

                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Category</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="category"
                                        options={InventoryCategory}
                                        value={InventoryCategory.find(each => (formData.category === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'category')}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Quantity" id="quantity" value={formData.quantity} onChange={(e) => handleChange(e.target.value, e.target.id)} type="number" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="quantity">Quantity</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Unit Price" id="unitPrice" value={formData.unitPrice} onChange={(e) => handleChange(e.target.value, e.target.id)} type="number" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="unitPrice">Unit Price</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Total Price" id="totalPrice" value={formData.totalPrice} onChange={(e) => handleChange(e.target.value, e.target.id)} type="number" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="totalPrice">Total Price</InputName>
                                </InputContainer>
                                <InputContainer >
                                    <Input name="Purchase Date"
                                        placeholder=""
                                        onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        value={formData.purchaseDate}
                                        type="date"
                                        id="purchaseDate"
                                    />
                                    <InputName htmlFor="purchaseDate" >Purchase Date</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Brand" id="brand" value={formData.brand} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="brand">Brand</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Unit of Measure" id="unitOfMeasure" value={formData.unitOfMeasure} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="unitOfMeasure">Supplier Name</InputName>
                                </InputContainer>

                                <InputContainer>
                                    <Input name="Location" id="location"
                                        value={formData.location}
                                        onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="location">Place</InputName>
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

                                <InputContainerDiff>
                                    <DescriptionInput name="Description"
                                        value={formData.description}
                                        type="text" onChange={(e) => handleChange(e.target.value, e.target.id)} id="description" />
                                    <InputName1 htmlFor="description" >Description</InputName1>
                                </InputContainerDiff>

                            </InputElements>
                            <SubmitButton type="submit" buttonname='Add' />

                        </Forms>
                    </FormContainer>
                </StudentListContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default CreateInventory