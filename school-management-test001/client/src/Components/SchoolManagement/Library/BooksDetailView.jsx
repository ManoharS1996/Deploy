import {
    MainContainer, BottomContainer, SideContainer, FormHeading, FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, Input, InputName1, InputContainerDiff, DescriptionInput, BooksContainer,
    UnderContainer,
    BookTableContainer,
    BookIcon,
    BookName,

} from "./StyledComponents"

import { CustomStyles } from "../CustomStyles"
import { Status } from "../DummyData";

import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from 'react-select';

import TopContainer from "../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../shared/UIElements/submitButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const BooksDetailView = () => {
    const { bookId } = useParams()

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    let dates = `${year}-${month}-${day}`

    const [formData, setFormData] = useState({
        bookId: "", bookName: '', author: '', publishers: '', category: '', price: '', copies: '', purchaseDate: dates, status: 'Active', description: '',
    });

    useEffect(() => {
        getBookDetail()
    }, [])

    const getBookDetail = async () => {
        const url = `http://localhost:5000/api/book/${bookId}`
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const data = responseData.book[0]
            console.log(data)
            setFormData((prev) => ({
                ...prev,
                bookId: bookId,
                bookName: data.book_name,
                author: data.book_author,
                publishers: data.book_publishers,
                category: data.book_category,
                price: data.book_price,
                copies: data.copies,
                purchaseDate: data.book_purchase_date,
                status: data.book_status,
                description: data.book_description,
            })
            )

        } catch (err) {
            console.log(err)
        }

    }

    const Books = [
        { bookId: "B005A", status: "Available", icon: <FaBook size={30} /> },
        { bookId: "B005B", status: "UnAvailable", icon: <FaBook size={30} /> },
        { bookId: "B005C", status: "Available", icon: <FaBook size={30} /> },
        { bookId: "B005D", status: "Available", icon: <FaBook size={30} /> },
        { bookId: "B005E", status: "Available", icon: <FaBook size={30} /> },
        { bookId: "B005F", status: "UnAvailable", icon: <FaBook size={30} /> },
        { bookId: "B005G", status: "UnAvailable", icon: <FaBook size={30} /> },
        { bookId: "B005H", status: "Available", icon: <FaBook size={30} /> },
        { bookId: "B005I", status: "UnAvailable", icon: <FaBook size={30} /> },


    ];
    const navigate = useNavigate()

    const onHistory = () => {
        navigate('/bookHistory')
    }

    const onClose = () => {
        navigate('/library')
    }
    const handleChange = (value, key) => {
        // console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSubmit =async (e) => {
        e.preventDefault()
        // console.log(formData)
        const url = `http://localhost:5000/api/book/${bookId}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_name: formData.bookName,
                book_description: formData.description,
                copies: formData.copies,
                book_author: formData.author,
                book_category: formData.category,
                book_publishers: formData.publishers,
                book_purchase_date: formData.purchaseDate,
                book_price: formData.price,
                book_status: formData.status,
            })
        }
        console.log({
            book_name: formData.bookName,
                book_description: formData.description,
                copies: formData.copies,
                book_author: formData.author,
                book_category: formData.category,
                book_publishers: formData.publishers,
                book_purchase_date: formData.purchaseDate,
                book_price: formData.price,
                book_status: formData.status,
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/library')
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
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Book Detail View' fun={onClose} />
                        <Forms onSubmit={handleSubmit} >
                            <FormName>Book Details</FormName>
                            <InputElements>
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
                                    <Input name="Publishers" id="publishers" value={formData.publishers} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="publishers">Publishers</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Category" id="category" value={formData.category} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="category">Category</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="Price" id="price" value={formData.price} onChange={(e) => handleChange(e.target.value, e.target.id)} type="number" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="price">Price</InputName>
                                </InputContainer>
                                <InputContainer>
                                    <Input name="No of Copies" id="copies" value={formData.copies} onChange={(e) => handleChange(e.target.value, e.target.id)} type="number" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="copies">No of Copies</InputName>
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
                            <UnderContainer>
                                <FormHeading style={{ fontSize: "1.2rem", margin: "1rem", marginBottom: "1rem" }}>Copies</FormHeading>
                                <BookTableContainer>
                                    {Books.map(each => (
                                        <BooksContainer key={each.bookId} onClick={onHistory}>
                                            <BookIcon status={each.status}>{each.icon}</BookIcon>
                                            <BookName>{each.bookId}</BookName>
                                        </BooksContainer>
                                    ))}
                                </BookTableContainer>

                                {/* <BookTableContainer>
                                    <BookTable>
                                        <BookTableHeading>
                                            <Rows>
                                                {columns.map(each => (
                                                    <TableHead key={each}>{each}</TableHead>
                                                ))}
                                                <thead></thead>
                                            </Rows>
                                        </BookTableHeading>
                                        <TableBody>
                                            {diaries.map(each => (
                                                <Rows key={each.bookId}>
                                                    <TableData >{each.bookId}</TableData>
                                                    <TableData >{each.status} </TableData>
                                                    <TableData  onClick={toDetailView}>{each.icon} </TableData>
                                                    <TableData ><button style={{ padding: "0", outline: "none", background: "#eef0ee" }}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData>
                                                </Rows>
                                            ))}
                                        </TableBody>
                                    </BookTable>
                                </BookTableContainer> */}


                            </UnderContainer>


                            <SubmitButton type="submit" buttonname='Update' />

                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default BooksDetailView