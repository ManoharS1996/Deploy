import {
    MainContainer, BottomContainer, SideContainer, CloseIcon, FormHeading, FormContainer, Forms, InputElements,
    InputContainer, InputName, Input, UnderContainer, SearchContainer, TableHeading, Rows, TableHead,
    TableContainer,
    Table,
    TableBody,
    TableData,
    InputMarks,
} from "./StyledComponents"

// import { CountrySelect, StateSelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

// import { CustomStyles } from "../../CustomStyles"
// import { InventoryCategory } from "../../DummyData";

// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import Select from 'react-select';

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

const AddExam = () => {

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    let dates = `${year}-${month}-${day}`

    const location = useLocation()
    const { autoid } = location.state || {};
    // console.log(autoid)

    const [rows, setRows] = useState([
        { date: '', day: '', subject: '', timings: '', syllabus: '' },
    ]);

    const [formData, setFormData] = useState({
        examId: autoid, examName: "", startDate: dates, endDate: dates, timetable: rows, status: "Active"
    });

    // RETURN THE FORMATTED DATE IN 'YYYY-MM-DD' FORMAT
    const Columns = ["Date", "Day", "Subject", "Timings", "Syllabus"]


    const onAddRow = () => {
        setRows(prevRows => [
            ...prevRows,
            { date: '', day: '', subject: '', timings: '', syllabus: '' },
        ]);
        // console.log(rows)
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };
    const deleteRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };
    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            timetable: rows
        }));
    }, [rows])
    // const [countryid, setCountryid] = useState(null);
    // const [stateid, setstateid] = useState(null);
    // console.log(stateid)
    const navigate = useNavigate()

    const onClose = async () => {
        const url = `http://localhost:5000/api/exam/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const item = responseData.exams || []
            console.log(item)


        } catch (err) {
            console.log(err)
        }
        navigate('/exams')
    }
    const handleChange = (value, key) => {
        console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/exam/${autoid}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                exam_id: autoid,
                exam_name: formData.examName,
                start_date:formData.startDate,
                end_date:formData.endDate,
                exam_status:formData.status,
                timetable:JSON.stringify(formData.timetable)

            })
        }
        console.log({
            exam_id: autoid,
            exam_name: formData.examName,
            start_date:formData.startDate,
            end_date:formData.endDate,
            exam_status:formData.status,
            timetable:JSON.stringify(formData.timetable)
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/exams')
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Add Exam' fun={onClose} />

                        <Forms onSubmit={handleSubmit} >
                            <InputElements>
                                <InputContainer style={{ width: "20%" }}>
                                    <Input name="Exam ID" id="examId" value={formData.examId} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        type="text"
                                        required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="examId">Exam ID</InputName>
                                </InputContainer>
                                <InputContainer style={{ width: "26%" }}>
                                    <Input name="Exam Name" id="examName" value={formData.examName} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text"
                                        required
                                    // placeholder="Enter Admission Number"
                                    />
                                    <InputName htmlFor="examName">Examination Name</InputName>
                                </InputContainer>
                                {/* <InputContainer>
                                    <Input name="Brand" id="brand" value={formData.brand} onChange={(e) => handleChange(e.target.value, e.target.id)} type="text" required
                                    // placeholder="Enter Full Name" 
                                    />
                                    <InputName htmlFor="brand">Category</InputName>
                                </InputContainer> */}

                                <InputContainer style={{ width: "23%" }}>
                                    <Input name="startDate"
                                        placeholder=""
                                        onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        value={formData.startDate}
                                        type="date"
                                        id="startDate"
                                    />
                                    <InputName htmlFor="purchaseDate" >Start Date</InputName>
                                </InputContainer>
                                <InputContainer style={{ width: "23%" }}>
                                    <Input name="endDate"
                                        placeholder=""
                                        onChange={(e) => handleChange(e.target.value, e.target.id)}
                                        value={formData.endDate}
                                        type="date"
                                        id="endDate"
                                    />
                                    <InputName htmlFor="endDate" >End Date</InputName>
                                </InputContainer>
                            </InputElements>
                            {/* <InputContainerDiff>
                                    <DescriptionInput name="Description"
                                        value={formData.description}
                                        type="text" onChange={(e) => handleChange(e.target.value, e.target.id)} id="description" />
                                    <InputName1 htmlFor="description" >Description</InputName1>
                                </InputContainerDiff> */}

                            <UnderContainer>
                                <SearchContainer>
                                    <FormHeading style={{ fontSize: "1.2rem", padding: "0" }}>Time Table</FormHeading>
                                    <AddButton addfun={onAddRow} buttonname='subject' />

                                </SearchContainer>

                                <TableContainer>
                                    <Table>
                                        <TableHeading>
                                            <Rows>
                                                {Columns.map(each => (
                                                    <TableHead key={each}>{each}</TableHead>
                                                ))}
                                                <thead></thead>
                                            </Rows>
                                        </TableHeading>

                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <Rows key={index}>

                                                    <TableData>
                                                        <InputMarks
                                                            type="date"
                                                            name="date"
                                                            value={row.date}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="day"
                                                            value={row.day}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            placeholder="Enter Day"
                                                        />
                                                    </TableData>

                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="subject"
                                                            value={row.subject}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            placeholder="Enter Subject"
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="timings"
                                                            value={row.timings}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            placeholder="Enter Timings"
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <InputMarks
                                                            type="text"
                                                            name="syllabus"
                                                            value={row.syllabus}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            placeholder="Enter Syllabus"
                                                        />
                                                    </TableData>
                                                    <TableData>
                                                        <CloseIcon type="button" onClick={() => deleteRow(index)}><IoIosCloseCircle style={{ color: "#de0404" }} size={25} /></CloseIcon>

                                                    </TableData>
                                                </Rows>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <SubmitButton type="submit" buttonname='add' />
                            </UnderContainer>








                        </Forms>
                    </FormContainer>
                </SideContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default AddExam