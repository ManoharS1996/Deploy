import {
    MainContainer, BottomContainer, StudentListContainer, FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, InputName1, Input, InputContainerDiff, DescriptionInput,
} from "./StyledComponents"

// import { CountrySelect, StateSelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

import { CustomStyles } from "../CustomStyles"
import { InventoryCategory } from "../DummyData";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { useParams } from "react-router-dom";


import TopContainer from "../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../shared/UIElements/submitButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const InventoryDetailView = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    let dates = `${year}-${month}-${day}`


    const [formData, setFormData] = useState({
        itemId: '', itemName: '', category: '', brand: '', quantity: '', unitPrice: '', totalPrice: '', purchaseDate: dates, unitOfMeasure: '', location: '', status: 'Active', description: ''
    });

    const { itemId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getItemDetail()
    }, [])

    const getItemDetail = async () => {
        const url = `http://localhost:5000/api/inventory/${itemId}`
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const data = responseData.item[0]
            console.log(data)
            setFormData((prev) => ({
                ...prev,
                itemId: itemId,
                itemName: data.item_name,
                category: data.item_category,
                brand: data.item_brand,
                quantity: data.item_quantity,
                unitPrice: data.item_unitprice,
                totalPrice: data.item_totalprice,
                purchaseDate: data.item_purchasedate,
                unitOfMeasure: data.item_unitmeasure,
                location: data.item_place,
                status: data.item_status,
                description: data.item_description


            })
            )

        } catch (err) {
            console.log(err)
        }

    }

    const onClose = () => {
        navigate('/inventory')
    }
    const handleChange = (value, key) => {
        console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSubmit =async (e) => {
        e.preventDefault()
        // console.log(formData)
        const url = `http://localhost:5000/api/inventory/${itemId}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_name: formData.itemName,
                item_category: formData.category,
                item_quantity: formData.quantity,
                item_unitprice: formData.unitPrice,
                item_totalprice:formData.totalPrice,
                item_purchasedate: formData.purchaseDate,
                item_brand: formData.brand,
                item_unitmeasure: formData.unitOfMeasure,
                item_place: formData.location,
                item_status: formData.status,
                item_description: formData.description,

            })
        }
        console.log({
            item_name: formData.itemName,
            item_category: formData.category,
            item_quantity: formData.quantity,
            item_unitprice: formData.unitPrice,
            item_totalprice:formData.totalPrice,
            item_purchasedate: formData.purchaseDate,
            item_brand: formData.brand,
            item_unitmeasure: formData.unitOfMeasure,
            item_place: formData.location,
            item_status: formData.status,
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
                        <TopContainer formname='Inventory Detail View' fun={onClose} />

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
                                        name="InventoryCategory"
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


                                <InputContainerDiff>
                                    <DescriptionInput name="Description"
                                        value={formData.description}
                                        type="text" onChange={(e) => handleChange(e.target.value, e.target.id)} id="description" />
                                    <InputName1 htmlFor="description" >Description</InputName1>
                                </InputContainerDiff>

                            </InputElements>
                            <SubmitButton type="submit" buttonname='Update' />

                        </Forms>
                    </FormContainer>
                </StudentListContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default InventoryDetailView