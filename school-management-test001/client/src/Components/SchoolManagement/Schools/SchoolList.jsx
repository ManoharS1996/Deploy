import {
    MainContainer, StudentListContainer, Heading, SearchContainer, InputContainer, SearchIcon, Input, BottomContainer, TableContainer, Table,
    TableHeading, TableHead, Rows, TableData,
    TableBody
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";

// import SubmitButton from "../../../shared/UIElements/submitButton";
import AddButton from "../../../shared/UIElements/addButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";
import { useEffect, useState } from "react";


const SchoolList = () => {

    const navigate = useNavigate()

    const columns = ['Id', 'School Name', 'School Type', 'Affiliation Board', 'Est. Year', 'Contact', 'Status', 'Actions']
    // const Schools = [
    //     { schoolId:"SC001", schoolName: 'Sri Chaitanya School',institutionType:'Higher Secondary',board:"State Board",year:"2016" ,phone: '123-456-7890',state: "Active" },
    //     { schoolId:"SC002", schoolName: 'Global International School', institutionType:'Primary', board:"CBSE", year:"2010", phone: '987-654-3210', state: "Active" },
    //     { schoolId:"SC003", schoolName: 'Sunshine Academy', institutionType:'Secondary', board:"ICSE", year:"2005", phone: '555-123-4567', state: "Active" },
    //     { schoolId:"SC004", schoolName: 'Blue Ridge High School', institutionType:'Higher Secondary', board:"State Board", year:"2012", phone: '321-654-9870', state: "Inactive" },
    //     { schoolId:"SC005", schoolName: 'Greenfield School', institutionType:'Primary', board:"IB", year:"2018", phone: '212-345-6789', state: "Active" },
    //     { schoolId:"SC006", schoolName: 'St. Xavier\'s School', institutionType:'Secondary', board:"ICSE", year:"2000", phone: '403-567-8901', state: "Active" },
    //     { schoolId:"SC007", schoolName: 'Mountain View Academy', institutionType:'Higher Secondary', board:"CBSE", year:"2015", phone: '765-432-1098', state: "Active" },
    //     { schoolId:"SC008", schoolName: 'Royal Global School', institutionType:'Secondary', board:"State Board", year:"2017", phone: '432-678-9012', state: "Active" },
    //     { schoolId:"SC009", schoolName: 'Wisdom International School', institutionType:'Primary', board:"IB", year:"2020", phone: '678-890-1234', state: "Active" },
    //     { schoolId:"SC010", schoolName: 'Sri Chaitanya School',institutionType:'Higher Secondary',board:"State Board",year:"2016", phone: '555-555-5555',state: "InActive" },
    //     { schoolId:"SC011", schoolName: 'Sri Chaitanya School',institutionType:'Higher Secondary',board:"State Board",year:"2016", phone: '123-456-7890' ,state: "InActive"},
    // ];
    const [schools, setSchools] = useState([])
    useEffect(() => {
        getSchoolsdata()
    }, [])


    const getSchoolsdata = async () => {
        const url = "http://localhost:5000/api/schools"
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
            setSchools(responseData.schools)
        } catch (err) {
            console.log(err)
        }
    }


    const onAdd = () => {
        navigate('/createSchool')
    }
    const toDetailView = () => {
        navigate(`/schoolDetailView`)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentListContainer>
                    <Heading>School Details</Heading>
                    <SearchContainer>
                        <InputContainer>
                            <SearchIcon><FaSearch size={18} /></SearchIcon>
                            <Input placeholder="Enter Details" />
                        </InputContainer>
                        <AddButton addfun={onAdd} buttonname='ADD' />
                    </SearchContainer>

                    <TableContainer>
                        <Table>
                            <TableHeading>
                                <Rows>
                                    {columns.map(each => (
                                        <TableHead key={each}>{each}</TableHead>
                                    ))}
                                </Rows>
                            </TableHeading>
                            <TableBody>
                                {schools.length > 0 && schools.map(each => (
                                    <Rows key={each.schoolname}>
                                        <TableData >{each.schoolid}</TableData>
                                        <TableData >{each.schoolname} </TableData>
                                        <TableData >{each.institutetype} </TableData>
                                        <TableData >{each.boardofeducation} </TableData>
                                        <TableData >{each.estyear} </TableData>
                                        <TableData >{each.contact} </TableData>
                                        <TableData>{each.status}</TableData>
                                        <TableData ><button style={{ padding: "0", outline: "none" }} onClick={() => toDetailView(each.studentId)}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData>
                                    </Rows>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StudentListContainer>

            </BottomContainer>

        </MainContainer>
    )
}
export default SchoolList