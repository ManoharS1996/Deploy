import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, InputElements,
    InputContainer, InputName1, SearchContainer, InputContainerSearch, SearchIcon, InputSearch, TableContainer, Table, TableHeading, TableHead, TableBody, TableData, Rows,
    UnderContainer
} from "./StyledComponents"
import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";

// import { FaEdit } from "react-icons/fa";




import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';


const Result = () => {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [allstudents, setAllstudents] = useState([])

    const [formData, setFormData] = useState({
        class: '', section: '',
    });

    const Options = Grades.map(option => ({
        value: option.value,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.name}</span>
                <span >{option.label}</span>
            </div>
        )
    }))

    // const date = new Date()
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    // const day = String(date.getDate()).padStart(2, "0");
    // // console.log(`${year}-${month}-${day}`);
    // let dates = `${year}-${month}-${day}`

    useEffect(() => {
        getStudentsdata()
    }, [])

    const getStudentsdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/students"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            // console.log(autoid)
            const students = responseData.students || []; // Default empty array
            if (students.length > 0) {
                const filterdata = students.filter(student => (student.student_name !== "" && student.student_name !== "1"))
                setAllstudents(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }


    const filteredStudents = allstudents.filter(student =>
        (student.student_name.toLowerCase().includes(search.toLowerCase()) ||
            student.student_id.toLowerCase().includes(search.toLowerCase()) ||
            student.student_roll.toLowerCase().includes(search.toLowerCase()) ||
            student.student_class.toLowerCase().includes(search.toLowerCase()) ||
            student.student_section.toLowerCase().includes(search.toLowerCase()) ||
            student.student_contact.toLowerCase().includes(search.toLowerCase()) ||
            student.student_status.toLowerCase().includes(search.toLowerCase()))
        &&
        (
            student.student_class.toLowerCase().includes(formData.class.toLowerCase()) &&
            student.student_section.toLowerCase().includes(formData.section.toLowerCase()))

    );


    const columns = ['Id', 'Roll No', 'Name', 'Class', 'Section', 'Gurdian Number', "Status"]

    const onAdd = () => {
        navigate('/createResult')
    }

    const onClose = () => {
        navigate('/academics')
    }
    const toDetailView = () => {
        navigate(`/examResults`)
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
                        <TopContainer formname='Results' fun={onClose} />

                        <Forms>
                            <InputElements>
                                <InputContainer style={{ width: "25%" }}>
                                    <InputName1 >Class/Grade</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="class"
                                        options={Options}
                                        value={Options.find(each => (formData.class === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'class')}
                                    />
                                </InputContainer >

                                <InputContainer style={{ width: "25%" }}>
                                    <InputName1 >Section</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="section"
                                        options={Sections}
                                        value={Sections.find(each => (formData.section === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'section')}
                                    />
                                </InputContainer>


                            </InputElements>
                            <UnderContainer>
                                <SearchContainer>
                                    <InputContainerSearch>
                                        <SearchIcon><FaSearch size={18} /></SearchIcon>
                                        <InputSearch onChange={(e) => { setSearch(e.target.value) }} placeholder="Enter Details" />
                                    </InputContainerSearch>
                                    <AddButton addfun={onAdd} buttonname='ADD' />

                                </SearchContainer>
                                <TableContainer>
                                    <Table>
                                        <TableHeading>
                                            <Rows>
                                                {columns.map(each => (
                                                    <TableHead key={each}>{each}</TableHead>
                                                ))}
                                                <th></th>
                                            </Rows>
                                        </TableHeading>
                                        <TableBody>
                                            {filteredStudents.map(each => (
                                                <Rows key={each.student_id}>
                                                    <TableData >{each.student_id}</TableData>
                                                    <TableData >{each.student_roll} </TableData>
                                                    <TableData >{each.student_name} </TableData>
                                                    <TableData >{each.student_class} </TableData>
                                                    <TableData >{each.student_section} </TableData>
                                                    <TableData >{each.student_contact} </TableData>
                                                    <TableData >{each.student_status} </TableData>

                                                    {/* <TableData >{each.marks} </TableData>
                                                    <TableData >{each.grade} </TableData>
                                                    <TableData >{each.remarks} </TableData> */}
                                                    {/* <TableData ><button style={{ padding: "0", outline: "none", background: "#eef0ee" }} onClick={toDetailView}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData> */}
                                                    <TableData >
                                                        <button style={{ padding: "0", background: "transparent", border: "0" }} onClick={() => toDetailView(each.id, each.class, each.section)} >
                                                            <GrFormNextLink style={{ color: "#027f19", background: "transparent", border: "0" }} size={25} />
                                                        </button></TableData>
                                                </Rows>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </UnderContainer>
                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default Result