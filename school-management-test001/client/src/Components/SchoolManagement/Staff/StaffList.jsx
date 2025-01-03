import {
    MainContainer, StudentListContainer, Heading, SearchContainer, InputContainer, SearchIcon, Input, BottomContainer, TableContainer, Table,
    TableHeading, TableHead, Rows, TableData
} from "./StyledComponent"

import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import AddButton from "../../../shared/UIElements/addButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const StaffList = () => {

    const navigate=useNavigate()

    const columns = ['Id', 'Name', 'Job Title', 'Class', 'Section', 'Phone','Status','Actions']
    const students = [
        { employeeId: 1,employeeName: 'Leela rani',jobTitle:'Teacher', class: '10', section: 'A', phone: '123-456-7890',state: "Active"},
        { employeeId: 2, employeeName: 'Sunitha',jobTitle:'Attender', class: '12', section: 'B', phone: '987-654-3210',state: "Active" },
        { employeeId: 3, employeeName: 'Chandrakala',jobTitle:'Teacher', class: '11', section: 'C', phone: '555-555-5555',state: "InActive" },
        { employeeId: 4,  employeeName: 'Devi Priya',jobTitle:'Teacher', class: '10', section: 'A', phone: '444-444-4444' ,state: "Active"},
        { employeeId: 5,  employeeName: 'Eswar',jobTitle:'Clerk', class: '12', section: 'B', phone: '666-666-6666',state: "Active" },
        { employeeId: 6, employeeName: 'Satthi Babu',jobTitle:'Teacher', class: '9', section: 'D', phone: '123-456-7890',state: "InActive" },
        { employeeId: 7, employeeName: 'Ram babu',jobTitle:'Teacher', class: '1', section: 'A', phone: '012-345-6789',state: "Active" },
        { employeeId: 8,employeeName: 'Alice Johnson',jobTitle:'Teacher', class: '10', section: 'A', phone: '123-456-7890',state: "Active"},
        { employeeId: 9, employeeName: 'Bob Smith',jobTitle:'Attender', class: '12', section: 'B', phone: '987-654-3210',state: "Active" },
        { employeeId: 10, employeeName: 'Charlie Brown',jobTitle:'Teacher', class: '11', section: 'C', phone: '555-555-5555',state: "InActive" },
        { employeeId: 11, employeeName: 'sathyam',jobTitle:'Teacher', class: '11', section: 'C', phone: '555-555-5555',state: "InActive" },
        { employeeId: 12,  employeeName: 'Sundaram',jobTitle:'Clerk', class: '12', section: 'B', phone: '666-666-6666',state: "Active" },

    ];

    const onAdd=()=>{
        navigate('/createStaff')
    }
    const toDetailView=()=>{
        navigate('/staffDetailView')
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentListContainer>
                    <Heading>Staff Details</Heading>
                    <SearchContainer>
                        <InputContainer>
                            <SearchIcon><FaSearch size={18} /></SearchIcon>
                            <Input placeholder="Enter Details" />
                        </InputContainer>
                        <AddButton fun={onAdd} buttonname='ADD'/>
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
                            <tbody>
                                {students.map(each => (
                                    <Rows key={each.employeeId}>
                                        <TableData >{each.employeeId}</TableData>
                                        <TableData >{each.employeeName} </TableData>
                                        <TableData >{each.jobTitle} </TableData>
                                        <TableData >{each.class} </TableData>
                                        <TableData >{each.section} </TableData>
                                        <TableData >{each.phone} </TableData>
                                        <TableData>{each.state}</TableData>
                                        <TableData ><button style={{padding:"0"}} onClick={toDetailView}><FaEdit style={{color:"#027f19"}} size={20} /></button></TableData>
                                    </Rows>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                </StudentListContainer>

            </BottomContainer>

        </MainContainer>
    )
}
export default StaffList