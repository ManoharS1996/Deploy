import {
    MainContainer, BottomContainer, SideContainer, FormContainer, Forms,
    TableContainer, InputContainerSearch, SearchContainer, SearchIcon, Table, TableHeading, TableHead, TableBody, TableData, Rows,
    UnderContainer,
    InputSearch
} from "./StyledComponents"
// import { CustomStyles } from "../../CustomStyles"
// import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";




import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Select from 'react-select';


const NewDiary = () => {

    const navigate = useNavigate()

    // const Options = Grades.map(option => ({
    //     value: option.value,
    //     label: (
    //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //             <span>{option.name}</span>
    //             <span >{option.label}</span>
    //         </div>
    //     )
    // }))

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`

    const columns = ['Date', 'Class', 'Section', 'Subject', 'Teacher', 'Diary']
    const diaries = [
        { id: 1, date: dates, grade: '5', section: 'A', subject: "Telugu", teacher: "Sujatha", diary: "Read first lesson" },
        { id: 2, date: dates, grade: '5', section: 'A', subject: "Hindi", teacher: "Mohan lal", diary: "Read and Write first poem" },
        { id: 3, date: dates, grade: '5', section: 'A', subject: "English", teacher: "Shakesphere", diary: "Write letter to principal" },
        { id: 4, date: dates, grade: '5', section: 'A', subject: "Maths", teacher: "Arya Bhatta", diary: "Practice first lesson" },
        { id: 5, date: dates, grade: '5', section: 'A', subject: "Science", teacher: "Einsten", diary: "Read first lesson" },
        { id: 6, date: dates, grade: '5', section: 'A', subject: "Social", teacher: "Gandhi", diary: "Read first lesson" },
        { id: 7, date: dates, grade: '5', section: 'A', subject: "G.K", teacher: "Sravani", diary: "Read first lesson" },
        { id: 8, date: dates, grade: '5', section: 'A', subject: "Drawing", teacher: "ravi varma", diary: "Read first lesson" },
        // { id: 8, date: dates, subject: "Drawing", teacher: "ravi verma", diary: "Read first lesson" },
        // { id: 8, date: dates, subject: "Drawing", teacher: "ravi verma", diary: "Read first lesson" },

    ];



    // const [formData, setFormData] = useState({
    //     grade: '', section: '', date: dates, selectedOption: ''
    // });

    const onAdd = () => {
        navigate('/createDiary')
    }
    const onClose = () => {
        navigate('/academics')
    }
    const toDetailView = () => {
        navigate(`/diaryView`)
    }
    // const handleChange = (e) => {
    //     const { name, value } = e.target

    //     // console.log(name, value)
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value,

    //     }))
    // }
    // const handleSelect = (e) => {
    //     console.log(e)
    //     const { value } = e
    //     setFormData(prevData => ({
    //         ...prevData,
    //         selectedOption: value[value],

    //     }))
    // }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Diary' fun={onClose} />

                        <Forms>

                            <UnderContainer>
                                <SearchContainer>
                                    <InputContainerSearch>
                                        <SearchIcon><FaSearch size={18} /></SearchIcon>
                                        <InputSearch placeholder="Enter Details" />
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
                                                <thead></thead>
                                            </Rows>
                                        </TableHeading>
                                        <TableBody>
                                            {diaries.map(each => (
                                                <Rows key={each.id}>
                                                    <TableData >{each.date}</TableData>
                                                    <TableData >{each.grade} </TableData>
                                                    <TableData >{each.section} </TableData>
                                                    <TableData >{each.subject} </TableData>
                                                    <TableData >{each.teacher} </TableData>
                                                    <TableData >{each.diary} </TableData>
                                                    <TableData ><button style={{ padding: "0", outline: "none", background: "#eef0ee" }} onClick={toDetailView}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData>
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
export default NewDiary