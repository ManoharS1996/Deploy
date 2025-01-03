import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms, InputElements,
    InputContainer, InputName1,SearchContainer,InputContainerSearch,SearchIcon,InputSearch, 
    UnderContainer
} from "./StyledComponents"
import {CustomStyles} from "../../CustomStyles"
import { Grades,Sections } from "../../DummyData";

import TableComponent from "../../../../shared/UIElements/table";
import TopContainer from "../../../../shared/UIElements/topcontainer";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

// import { FaEdit } from "react-icons/fa";




import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Select from 'react-select';


const Assignments = () => {

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

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`

    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");

    const columns = ['Id','Assignment Name', 'Assignment Type', 'Class','Section',"Subject",'Submission Date','Status' ]
    const rows = ["assignment_id","assignment_name","assignment_type","student_class","student_section","subject","submission_date","assignment_status"];

    const [formData, setFormData] = useState({
        class: '', section: ''
    });

    const [allassignments, setAllassignments] = useState([])

    useEffect(() => {
        getAssignmentdata()
    }, [])

    const getAssignmentdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/assignment"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setAutoid(responseData.newId)

            const assignments = responseData.assignments || []; // Default empty array
            if (assignments.length > 0) {
                const filterdata = assignments.filter(assignment => (assignment.assignment_name !== "" && assignment.assignment_name !== "1"))
                setAllassignments(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }

    const filteredAssignments = allassignments.filter(assignment =>(
        (assignment.assignment_id.toLowerCase().includes(search.toLowerCase()) ||
        assignment.assignment_name.toLowerCase().includes(search.toLowerCase()) ||
        assignment.assignment_type.toLowerCase().includes(search.toLowerCase()) ||
        assignment.assignment_status.toLowerCase().includes(search.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(search.toLowerCase()) ||
        assignment.submission_date.toLowerCase().includes(search.toLowerCase()) ||
        assignment.student_class.toLowerCase().includes(search.toLowerCase()) ||
        assignment.student_section.toLowerCase().includes(search.toLowerCase()))
        &&
        (
            assignment.student_class.toLowerCase().includes(formData.class.toLowerCase()) &&
            assignment.student_section.toLowerCase().includes(formData.section.toLowerCase()))
        )
    );


    const onAdd = async() => {
        const url = "http://localhost:5000/api/assignment"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assignment_id: autoid,
                staff_id:"1",
                staff_name:"1",
                student_class:"1",
                student_section:"1",
                subject:"1",
                assignment_name:"1",
                assignment_type:"1",
                assignment_description:"1",
                submission_date:"1",
                marks:"1",
                assignment_status:"Active",
                assignment_created_at: dates
            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }
        navigate('/createAssignment', { state: { autoid } })
    }
    
    const onClose = () => {
        navigate('/academics')
    }
    const toDetailView = (e) => {
        navigate(`/assignmentDetailView/${e}`)
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     // console.log(name, value)
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value,

    //     }))
    // }

    const handleSelect = (e,key) => {
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
                    <TopContainer formname='Assignments' fun={onClose}/>

                        <Forms>
                            <InputElements>
                            <InputContainer style={{ margin: "0.3rem 0" }}>
                                    <InputName1 >Class/Grade</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="class"
                                        options={Options}
                                        value={Options.find(each => (formData.status === each.value))}
                                        placeholder="Select"
                                        onChange={(e) => handleSelect(e, 'class')}
                                    />
                                </InputContainer >

                                <InputContainer style={{ margin: "0.3rem 0" }}>
                                    <InputName1 >Section</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="section"
                                        options={Sections}
                                        value={Sections.find(each => (formData.status === each.value))}
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
                                    <AddButton addfun={onAdd} buttonname='ADD'/>

                                </SearchContainer>
                               <TableComponent headings={columns}
                                    rows={rows} pass='assignment_id' datas={filteredAssignments}
                                    editfun={toDetailView} />

                            </UnderContainer>
                        </Forms>
                    </FormContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}
export default Assignments