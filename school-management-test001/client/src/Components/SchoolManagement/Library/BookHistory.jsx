import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, BookNames, BookTitle, BookAuthor,
    UnderContainer,
    BookTableContainer, BookTable, BookTableHeading, Rows, TableHead, TableBody, TableData

    // BookTable,
    // BookTableHeading,
    // Rows,
    // TableHead,
    // TableBody,
    // TableData,
    // BookTableContainer
} from "./StyledComponents"

// import { CountrySelect, StateSelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

// import { CustomStyles } from "../CustomStyles"
// import { Status } from "../DummyData";

// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { FaEdit } from "react-icons/fa";
// import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Select from 'react-select';

import TopContainer from "../../../shared/UIElements/topcontainer";
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

const BookHistory = () => {
    const navigate = useNavigate()
    // const date = new Date()
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    // const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    // let dates = `${year}-${month}-${day}`

    // RETURN THE FORMATTED DATE IN 'YYYY-MM-DD' FORMAT

    const columns = ['Book ID', 'User ID', 'User Name', 'Start Date', 'End Date']
    const History = [
        { bookId: "B001A", userId: "S0027", userName: "Ch.Rama Lakshmi", start: '14-11-2024', end: '20-11-2024' },
        { bookId: "B001A", userId: "S0053", userName: "B.Aruna", start: '01-11-2024', end: '10-11-2024' },
        { bookId: "B001A", userId: "S0046", userName: "S.Ramesh", start: '14-11-2024', end: '20-11-2024' },
        { bookId: "B001A", userId: "S0017", userName: "W.Jagan", start: '14-11-2024', end: '20-11-2024' },
        { bookId: "B001A", userId: "S0023", userName: "p.Satya", start: '14-11-2024', end: '20-11-2024' },
        { bookId: "B001A", userId: "S0033", userName: "Y.Rajesh", start: '14-11-2024', end: '20-11-2024' },
    ]
    // const Books = [
    //     { bookId: "B005A", status: "Available", icon: <FaBook size={30} /> },
    //     { bookId: "B005B", status: "UnAvailable", icon: <FaBook size={30} /> },
    //     { bookId: "B005C", status: "Available", icon: <FaBook size={30} /> },
    //     { bookId: "B005D", status: "Available", icon: <FaBook size={30} /> },
    //     { bookId: "B005E", status: "Available", icon: <FaBook size={30} /> },
    //     { bookId: "B005F", status: "UnAvailable", icon: <FaBook size={30} /> },
    //     { bookId: "B005G", status: "UnAvailable", icon: <FaBook size={30} /> },
    //     { bookId: "B005H", status: "Available", icon: <FaBook size={30} /> },
    //     { bookId: "B005I", status: "UnAvailable", icon: <FaBook size={30} /> },
    //     // { id: 8, date: dates, subject: "Drawing", teacher: "ravi verma", diary: "Read first lesson" },
    //     // { id: 8, date: dates, subject: "Drawing", teacher: "ravi verma", diary: "Read first lesson" },

    // ];
    // const toDetailView = () => {
    //     navigate(`/diaryView`)
    // }


    // const [countryid, setCountryid] = useState(null);
    // const [stateid, setstateid] = useState(null);
    // console.log(stateid)

    // const [formData, setFormData] = useState({
    //     userId: '', userName: '', bookId: '', brand: '', quantity: '', unitPrice: '', totalPrice: '', purchaseDate: dates, unitOfMeasure: '', location: '', selectedOption: 'active'
    // });




    // const onHistory=()=>{
    //     navigate('/bookHistory')
    // }

    const onClose = () => {
        navigate('/booksDetailView')
    }
    // const handleChange = (value, key) => {
    //     console.log(value, key)
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [key]: value,
    //     }))
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     // console.log(formData)
    //     navigate('/library')
    // }

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
                    <TopContainer formname='Book History' fun={onClose}/>

                        <Forms>
                            <BookNames>
                                <BookTitle>A Breif History of Science</BookTitle>
                                <BookAuthor>(Stephen Hacking)</BookAuthor>
                            </BookNames>

                            <UnderContainer>
                                {/* <FormHeading style={{ fontSize: "1.2rem", margin: "1rem",marginBottom:"1rem" }}>Copies</FormHeading>
                                <BookTableContainer>
                                {Books.map(each => (
                                    <BooksContainer key={each.bookId} >
                                        <BookIcon status={each.status}>{each.icon}</BookIcon>
                                        <BookName>{each.bookId}</BookName>
                                    </BooksContainer>
                                ))}
                                </BookTableContainer> */}

                                <BookTableContainer style={{ width: "98%", border: "1.5px solid green", borderRadius: "1rem" }}>
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
                                            {History.map(each => (
                                                <Rows key={each.userId}>
                                                    <TableData >{each.bookId}</TableData>
                                                    <TableData >{each.userId} </TableData>
                                                    <TableData  >{each.userName} </TableData>
                                                    <TableData  >{each.start} </TableData>
                                                    <TableData  >{each.end} </TableData>

                                                    {/* <TableData ><button style={{ padding: "0", outline: "none", background: "#eef0ee" }}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData> */}
                                                </Rows>
                                            ))}
                                        </TableBody>
                                    </BookTable>
                                </BookTableContainer>


                            </UnderContainer>

                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default BookHistory