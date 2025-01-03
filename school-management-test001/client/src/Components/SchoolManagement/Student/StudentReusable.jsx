import MainPage from "../../../shared/UIElements/mainpage"
import ListView from "../../../shared/UIElements/listview"

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentReusable = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    let dates = `${day}-${month}-${year}`



    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");  // Stores the generated ID

    const columns = ['Student Id', 'Roll No', 'Student Name', 'Class', 'Section', 'Contact', 'Status', 'Actions',]
    const rows = ["student_id", "student_roll", 'student_name', "student_class", "student_section", "student_contact", "student_status",]

    const [allstudents, setAllstudents] = useState([])

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
            setAutoid(responseData.newId)
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


    const filteredStudents =search.trim()
    ? allstudents.filter(student => {
        // Split the search string by commas, trim whitespace, and filter out empty terms
        const searchTerms = search
            .split(',')
            .map(term => term.trim().toLowerCase())
            .filter(term => term); // Remove empty terms

        // Check if all valid search terms match at least one field in the institute object
        return searchTerms.every(term => 
            student.student_name.toLowerCase().includes(term) ||
            student.student_id.toLowerCase().includes(term) ||
            student.student_roll.toLowerCase().includes(term) ||
            student.student_class.toLowerCase().includes(term) ||
            student.student_section.toLowerCase().includes(term) ||
            student.student_contact.toLowerCase().includes(term) ||
            student.student_status.toLowerCase().includes(term)
        );
    })
    : allstudents;
    
    const navigate = useNavigate();

    //   const onClose = () => {
    //     navigate("/dashboard");
    //   };

    const onAdd = async () => {
        const url = "http://localhost:5000/api/students"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id: autoid,
                student_name: "1",
                student_gender: "1",
                student_date_of_birth: dates,
                student_nationality: {
                    student_nationality_id: "1",
                    student_nationality_emoji: "1",
                    student_nationality_name: "1"
                },
                student_state: {
                    student_state_id: "1",
                    student_state_name: "1",
                    student_state_code: "1"

                },
                student_city: "1",
                student_street: "1",
                student_pincode: "1",
                student_status: "Active",

                student_guardian_name: "1",
                relation_to_student: "1",
                student_contact: "+91",
                student_email: "1",
                parent_occupation: "1",

                student_previous_school: "1",
                student_last_grade: "1",

                student_class: "1",
                student_section: "1",
                student_roll: "1",
                student_preffered_date: dates,

                student_emergency_gurdian: "1",
                student_emergency_relation: "1",
                student_emergency_contact: "+91",

                student_medical: "1",
                student_specify: "1",

                student_created_at: dates,

            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/createStudent', { state: { autoid } })
    }
    const toDetailView = (e) => {
        navigate(`/studentDetailView/${e}`)
    }
    return (
        <MainPage work={<ListView name='Students Details' search={search} setSearch={setSearch} pass='student_id' buttonname='add' addfun={onAdd} headings={columns} rows={rows} datas={filteredStudents} editfun={toDetailView} />} />
    )
}

export default StudentReusable