import {
    MainContainer, BottomContainer, SideContainer, FormContainer, SearchContainer, InputContainerSearch, SearchIcon, InputSearch,
    TabContainer, Tabs, TabIcon, TabNames, TabName, ExamContainer, ResultContainer, ResultCard, Exam, ExamName, ResultView, ResultTable, ResultTableHeading, ResultRow, TableHead,
    ResultTableBody, Rows, TableData, ToggleSwitchContainer, ToggleInput, ToggleLabel
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";

// import { CustomStyles } from "../../CustomStyles"
// import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
// import Select from 'react-select';
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";



import { MdOutlineAssignment } from "react-icons/md";
import { FaSearch } from "react-icons/fa";




//fc8e03,04b40f,d4b806,8005a2,dc0677

const Exams = () => {

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    let dates = `${year}-${month}-${day}`

    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");
    const [allexams, setAllexams] = useState([])
    const [exam, setExams] = useState(0)
    const [name, setName] = useState("")
    const [to, setTo] = useState("")
    const [some, setSome] = useState([])

    useEffect(() => {
        getExamsdata()
    }, [])

    const getExamsdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/exam"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setAutoid(responseData.newId)
            console.log(responseData)
            const exams = responseData.exams || []; // Default empty array
            if (exams.length > 0) {
                const filterdata = exams.filter(exam => (exam.exam_name !== "" && exam.exam_name !== "1"))
                setAllexams(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }

    const filteredExams = search.trim()
    ? allexams.filter(exam => {
        // Split the search string by commas, trim whitespace, and filter out empty terms
        const searchTerms = search
            .split(',')
            .map(term => term.trim().toLowerCase())
            .filter(term => term); // Remove empty terms

        // Check if all search terms match at least one field in the exam object
        return searchTerms.every(term =>
            exam.exam_name.toLowerCase().includes(term) ||
            exam.exam_id.toLowerCase().includes(term) ||
            exam.start_date.toLowerCase().includes(term) ||
            exam.end_date.toLowerCase().includes(term) ||
            exam.timetable.toLowerCase().includes(term) ||
            exam.exam_status.toLowerCase().includes(term)
        );
    })
    : allexams; 


    useEffect(() => {
        if (allexams) {
            try {
                const parsedArray = JSON.parse(filteredExams[exam].timetable);
                setName(filteredExams[exam].exam_name)
                setTo(`( ${filteredExams[exam].start_date} TO ${filteredExams[exam].end_date} )`)
                setSome(parsedArray)
                console.log(some)
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [allexams, exam])

    const columns = ['Date', 'Day', 'Subject', 'Timings', 'Syllabus']

    const navigate = useNavigate()

    const onAdd = async () => {
        const url = "http://localhost:5000/api/exam"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                exam_id: autoid,
                exam_name: "1",
                start_date: "1",
                end_date: "1",
                timetable: "1",
                exam_status: "Active",

                exam_created_at: dates
            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/addExam', { state: { autoid } })
    }

    const onClose = () => {
        navigate('/academics')
    }

    const handleToggle = (e) => {

        // e.preventDefault()
        e.stopPropagation();

        // const updatedExams = exams.map((notification) =>
        //     notification.examId === id
        //         ? { ...notification, isChecked: !notification.isChecked }  // Toggle the isChecked value
        //         : notification
        // );
        // setExams(updatedExams);
    };

    const toDetailView = (id) => {
        setExams(id)
    }


    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Examination Timetables' fun={onClose} />

                        <SearchContainer>
                            <InputContainerSearch>
                                <SearchIcon><FaSearch size={18} /></SearchIcon>
                                <InputSearch placeholder="Enter Details" onChange={(e) => { setSearch(e.target.value) }} />
                            </InputContainerSearch>
                            <AddButton addfun={onAdd} buttonname='ADD' />
                        </SearchContainer>
                        {/* <Button style={{alignSelf:'flex-end',}} onClick={onAdd}>
                                        <IoIosAddCircleOutline style={{ margin: " 2px 8px 2px 0" }} size={25} /> 
                                        Add</Button> */}
                        <ExamContainer>
                            <TabContainer
                            // onClick={(e) => e.stopPropagation()}
                            >
                                {filteredExams.map((each, index) => (
                                    <Tabs key={each.exam_id} name={each.exam_name}
                                        onClick={() => { toDetailView(index) }}
                                    >
                                        <TabIcon><MdOutlineAssignment size={30} /></TabIcon>
                                        <TabNames>
                                            <TabName>{each.exam_name}</TabName>
                                            {/* <TabDate>{each.examDate}</TabDate> */}
                                        </TabNames>
                                        <ToggleSwitchContainer>
                                            <ToggleInput
                                                id={each.exam_id}
                                                type="checkbox"
                                                checked={each.exam_status}
                                                onChange={(e) => handleToggle(e, each.exam_id)}
                                            />
                                            <ToggleLabel
                                                htmlFor={each.exam_id}
                                                checked={each.exam_status}
                                            // theme={theme} // Pass theme prop here
                                            />
                                        </ToggleSwitchContainer>
                                    </Tabs>
                                ))}
                            </TabContainer>
                            <ResultContainer>

                                <ResultCard>
                                    <Exam>
                                        <ExamName>{name}</ExamName>
                                        <ExamName style={{ fontSize: "0.8rem", alignSelf: "flex-end", paddingLeft: "0.5rem" }}>{to}</ExamName>
                                    </Exam>

                                    <ResultView>
                                        <ResultTable>
                                            <ResultTableHeading>
                                                <ResultRow>
                                                    {columns.map(each => (
                                                        <TableHead key={each}>{each}</TableHead>
                                                    ))}
                                                </ResultRow>
                                            </ResultTableHeading>
                                            <ResultTableBody>
                                                {some.map((each, index) => (
                                                    <Rows key={`${each.date}-${index}`}>
                                                        <TableData>{each.date}</TableData>
                                                        <TableData>{each.day}</TableData>
                                                        <TableData>{each.subject}</TableData>
                                                        <TableData>{each.timings}</TableData>
                                                        <TableData>{each.syllabus}</TableData>

                                                        {/* <TableData>
                                                            <button style={{ padding: "0", outline: "none", background: "#eef0ee" }} onClick={toDetailView}>
                                                            <FaEdit style={{ color: "#027f19" }} size={20} />
                                                            </button>
                                                            </TableData> */}
                                                    </Rows>
                                                ))}
                                            </ResultTableBody>
                                        </ResultTable>

                                    </ResultView>
                                </ResultCard>
                            </ResultContainer>
                        </ExamContainer>
                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default Exams