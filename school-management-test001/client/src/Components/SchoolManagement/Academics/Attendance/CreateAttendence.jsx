import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, InputElements, Input, InputName,
    InputContainer, InputName1, SearchContainer, InputContainerSearch, SearchIcon, InputSearch, TableContainer, Table, TableHeading, TableHead, TableBody, TableData, Rows,
    UnderContainer, RadioContainer, Radio, RadioName, Both,
    // RadioButtonContainer, RadioButton, RadioButtonInput, RadioButtonLabel, RadioButtonCustom

} from "./StyledComponents"

import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";
import { GrFormNextLink } from "react-icons/gr";

// import { FaEdit } from "react-icons/fa";




import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from 'react-select';


const CreateAttendence = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    let today = `${year}-${month}-${day}`
    // let dates = `${day}-${month}-${year}`

    function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    }

    const [search, setSearch] = useState("")
    const [allstudents, setAllstudents] = useState([])
    const [allattendence, setAllattendence] = useState([])
    const [formData, setFormData] = useState({
        class: '', section: '', date: today
    });

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

    useEffect(() => {
        getAttendencedata()
    }, [formData.date])

    const getAttendencedata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = `http://localhost:5000/api/attendence/${formData.date}`

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData.attendence)
            const attendences = responseData.attendence || []; // Default empty array
            if (attendences.length > 0) {
                const filterdataAttend = attendences.filter(attendence => (attendence.student_name !== "" && attendence.student_name !== "1"))
                setAllattendence(filterdataAttend)

            }
            // setFormData((prev)=>({...prev,
            //     date:
            // }))
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

    const navigate = useNavigate()

    const Options = Grades.map(option => ({
        value: option.value,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.name}</span>
                <span >{option.label}</span>
            </div>
        )
    }))

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const columns = ['Id', 'Roll No', 'Name', 'Class', 'Section', 'Working', 'Present', 'Date', 'Status']

    // const onAdd = () => {
    //     navigate('/createAssignment')
    // }

    const onClose = () => {
        navigate('/academics')
    }
    const toDetailView = () => {
        navigate(`/attendenceDetailView`)
    }

    // const RadioButtons = () => {
    //     return (
    //         <RadioButtonContainer>
    //         <RadioButton>
    //           <RadioButtonInput type="radio" id="radio1" name="radio-group" />
    //           <RadioButtonLabel htmlFor="radio1">
    //             <RadioButtonCustom />
    //             P
    //           </RadioButtonLabel>
    //         </RadioButton>
    //         <RadioButton>
    //           <RadioButtonInput type="radio" id="radio2" name="radio-group" />
    //           <RadioButtonLabel htmlFor="radio2">
    //             <RadioButtonCustom />
    //             H
    //           </RadioButtonLabel>
    //         </RadioButton>
    //         <RadioButton>
    //           <RadioButtonInput type="radio" id="radio3" name="radio-group" />
    //           <RadioButtonLabel htmlFor="radio3">
    //             <RadioButtonCustom />
    //             A
    //           </RadioButtonLabel>
    //         </RadioButton>
    //       </RadioButtonContainer>
    //     )
    // }

    const handleAttendanceChange = async (studentId, status) => {
        // Check if attendance data for this student already exists
        const existingAttendance = allattendence.find((attendence) => attendence.attendence_id === `${studentId}-${formData.date}`);
        const existingStudent = allstudents.find((student) => student.student_id === studentId);
        // console.log(existingAttendance)
        
        const attendanceData = {
            attendence_id: `${studentId}-${formData.date}`,
            student_id: existingStudent ? existingStudent.student_id : studentId,
            student_roll: existingStudent ? existingStudent.student_roll : "1",
            student_name: existingStudent ? existingStudent.student_name : "1",
            student_class: existingStudent ? existingStudent.student_class : "1",
            student_section: existingStudent ? existingStudent.student_section : "1",
            attendence_date: formData.date,
            attendence_status: status,
            attendence_created_at: new Date().toISOString(),
            attendence_modified_date: new Date().toISOString()
        };
        const attendenceId=existingAttendance?.attendence_id

        if (existingAttendance) {
            // PATCH request to update attendance
            try {
                const response = await fetch(
                    `http://localhost:5000/api/attendence/${attendenceId}`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(
                            {
                                attendence_status: status,
                                attendence_modified_date: new Date().toISOString(),
                            }
                        ),
                    }
                );

                if (response.ok) {
                    console.log("Attendance updated successfully");


                    // const responseData = await response.json()
                    // setAllattendence((prev) =>
                    //     [...prev, responseData]
                    // );
                    // console.log(allattendence.length,allattendence)

                } else {
                    console.error("Failed to update attendance");
                }
            } catch (error) {
                console.error("Error updating attendance:", error);
            }
        } else {
            // POST request to create new attendance record
            try {
                const response = await fetch("http://localhost:5000/api/attendence", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(attendanceData),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Attendance created successfully:", data);
                    // Update local state with the new attendance ID
                    setAllattendence((prev) => [...prev, data.Attendence]);
                } else {
                    console.error("Failed to create attendance");
                }
            } catch (error) {
                console.error("Error creating attendance:", error);
            }
        }
    };

    const Attend = (id) => {
        
        return (<Both>
            <RadioContainer>
                <Radio><Input id="p" type="radio" name={id} value='p'  onChange={(e) => { handleChange(e), handleAttendanceChange(id, e.target.value) }}
                /></Radio>
                <RadioName><label htmlFor="p" >P</label></RadioName>
            </RadioContainer>
            <RadioContainer>
                <Radio><Input id="h" type="radio" name={id} value='h' onChange={(e) => { handleChange(e), handleAttendanceChange(id, e.target.value) }} /></Radio>
                <RadioName><label htmlFor="h" > H</label></RadioName>
            </RadioContainer>
            <RadioContainer>
                <Radio><Input id="a" type="radio" name={id} value='a' onChange={(e) => { handleChange(e), handleAttendanceChange(id, e.target.value) }} /></Radio>
                <RadioName><label htmlFor="a" > A</label></RadioName>
            </RadioContainer>
        </Both>)
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
                        <TopContainer formname='Attendence' fun={onClose} />

                        <Forms>
                            <InputElements>
                                <InputContainer style={{ width: "20%" }}>
                                    <Input name="date"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.date}
                                        type="date"
                                        id="date"
                                    />
                                    <InputName htmlFor="date" >Date</InputName>
                                </InputContainer>
                                <InputContainer style={{ width: "20%" }}>
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

                                <InputContainer style={{ width: "20%" }}>
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

                                <SearchContainer>
                                    <InputContainerSearch>
                                        <SearchIcon><FaSearch size={18} /></SearchIcon>
                                        <InputSearch onChange={(e) => { setSearch(e.target.value) }} placeholder="Enter Details" />
                                    </InputContainerSearch>
                                    {/* <Button onClick={onAdd}>
                                        <IoIosAddCircleOutline style={{ margin: " 2px 8px 2px 0" }} size={25} /> 
                                        Add</Button> */}
                                </SearchContainer>

                            </InputElements>

                            <UnderContainer>
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
                                                    <TableData >0 </TableData>
                                                    <TableData >0 </TableData>
                                                    <TableData>{convertDateFormat(formData.date)}</TableData>
                                                    <TableData >{Attend(each.student_id)} </TableData>

                                                    {/* <TableData >{each.marks} </TableData>
                                                    <TableData >{each.grade} </TableData>
                                                    <TableData >{each.remarks} </TableData> */}
                                                    {/* <TableData ><button style={{ padding: "0", outline: "none", background: "#eef0ee" }} onClick={toDetailView}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData> */}
                                                    <TableData >
                                                        <button style={{ padding: "0", background: "transparent", border: "0" }} onClick={toDetailView} >
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
export default CreateAttendence