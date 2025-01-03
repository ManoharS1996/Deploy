import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, FormName, InputElements,
    InputContainer, InputName, Input, InputName1,
    InputContainerDiff, DescriptionInput,

} from "./StyledComponents"

import { CustomStyles } from "../CustomStyles"
import { Status } from "../DummyData";


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';
import { useLocation } from "react-router-dom";


import TopContainer from "../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../shared/UIElements/submitButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const CreateBook = () => {
    const location = useLocation()
    const { autoid } = location.state || {};

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    let dates = `${year}-${month}-${day}`

    // RETURN THE FORMATTED DATE IN 'YYYY-MM-DD' FORMAT

    // const [countryid, setCountryid] = useState(null);
    // const [stateid, setstateid] = useState(null);
    // console.log(stateid)
    // const Columns = ["Book ID", "Book Name", "Author",  "Publisher","Price",]

    // const [rows, setRows] = useState([
    //     { bookId: '', bookname: '', author: '', publisher: '', price: '' },
    // ]);

    // const onAddRow = () => {
    //     setRows([
    //         ...rows,
    //         { bookId: '', bookname: '', author: '', publisher: '', price: '' },
    //     ]);
    //     console.log(rows)
    // };

    // const handleInputChange = (index, e) => {
    //     const { name, value } = e.target;
    //     const updatedRows = [...rows];
    //     updatedRows[index][name] = value;
    //     setRows(updatedRows);
    // };
    // const deleteRow = (index) => {
    //     const updatedRows = rows.filter((_, i) => i !== index);
    //     setRows(updatedRows);
    // };


    const [formData, setFormData] = useState({
        bookId: autoid, bookName: '', author: '', publishers: '', category: '', price: '', copies: '', purchaseDate: dates, status: 'Active', description: '',
    });


    const navigate = useNavigate()

    const onClose = async () => {
        navigate('/library')
        const url = `http://localhost:5000/api/book/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const book = responseData.books || []
            console.log(book)


        } catch (err) {
            console.log(err)
        }
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
        const url = `http://localhost:5000/api/book/${autoid}`
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
        } navigate('/library')
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
                        <TopContainer formname='Create Book' fun={onClose} />
                        <Forms onSubmit={handleSubmit}>
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

                            <SubmitButton type="submit" buttonname='Add Book' />


                            {/* { <UnderContainer>
                                <SearchContainer>
                                    <FormHeading style={{ fontSize: "1.2rem" }}>Books</FormHeading>
                                    <BookButton type="button" style={{ fontSize: "0.9rem" }} onClick={onAddRow}><IoIosAdd style={{ margin: " 2px 4px 2px 0" }} size={25} />Book</BookButton>
                                </SearchContainer>

                                <BookTableContainer>
                                    <BookTable>
                                        <BookTableHeading>
                                            <Rows>
                                                {Columns.map(each => (
                                                    <TableHead key={each}>{each}</TableHead>
                                                ))}
                                                <thead></thead>
                                            </Rows>
                                        </BookTableHeading>

                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <Rows key={index}>

                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="date"
                                                            value={row.date}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            placeholder="Enter BookID"
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="day"
                                                            value={row.day}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            // placeholder="Enter Book Name"
                                                        />
                                                    </TableData>

                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="subject"
                                                            value={row.subject}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            // placeholder="Enter Author"
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="timings"
                                                            value={row.timings}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            // placeholder="Enter Timings"
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="syllabus"
                                                            value={row.syllabus}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            // placeholder="Enter Syllabus"
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <CloseIcon type="button" onClick={() => deleteRow(index)}><IoIosCloseCircle style={{ color: "#de0404" }} size={25} /></CloseIcon>
                                                    </TableData>
                                                </Rows>
                                            ))}
                                        </TableBody>
                                    </BookTable>
                                </BookTableContainer>

                               
                                <AddButton onSubmit={handleSubmit} type="submit">Add</AddButton>
                            </UnderContainer> } */}


                        </Forms>
                    </FormContainer>
                </SideContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default CreateBook