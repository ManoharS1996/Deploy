import {
    MainContainer, StudentListContainer, Heading, SearchContainer, InputContainer, SearchIcon, Input,  BottomContainer, TableContainer, Table,
    TableHeading, TableHead, Rows, TableData,
    TableBody
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";

import AddButton from "../../../shared/UIElements/addButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const StudentsList = () => {

    const navigate=useNavigate()

    const columns = ['Id', 'Name', 'Roll No', 'Class', 'Section', 'Phone','Status','Actions']
    const students = [
        { studentId: 'S100', rollNo: 'A100', studentName: 'Alice Johnson', class: '10', section: 'A', gurdianContact: '123-456-7890',status: "Active" },
        { studentId: 'S200', rollNo: 'B200', studentName: 'Bob Smith', class: '12', section: 'B', gurdianContact: '987-654-3210',status: "Active" },
        { studentId: 'S300', rollNo: 'C300', studentName: 'Charlie Brown', class: '11', section: 'C', gurdianContact: '555-555-5555',status: "InActive" },
        { studentId: 'S400', rollNo: 'D400', studentName: 'Diana Prince', class: '10', section: 'A', gurdianContact: '444-444-4444',status: "Active" },
        { studentId: 'S500', rollNo: 'E500', studentName: 'Edward Elric', class: '12', section: 'B', gurdianContact: '666-666-6666',status: "Active" },
        { studentId: 'S600', rollNo: 'F500', studentName: 'Satthi Babu', class: '9', section: 'D', gurdianContact: '123-456-7890' ,status: "InActive"},
        { studentId: 'S700', rollNo: 'G500', studentName: 'Ram babu', class: '1', section: 'A', gurdianContact: '012-345-6789',status: "Active" },
        { studentId: 'S800', rollNo: 'H500', studentName: 'Rama raju', class: '5', section: 'B', gurdianContact: '012-345-6789',status: "Active" },
        { studentId: 'S900', rollNo: 'A100', studentName: 'Alice Johnson', class: '10', section: 'A', gurdianContact: '123-456-7890',status: "Active" },
        { studentId: 'S102', rollNo: 'B200', studentName: 'Bob Smith', class: '12', section: 'B', gurdianContact: '987-654-3210',status: "Active" },
        { studentId: 'S105', rollNo: 'C300', studentName: 'Charlie Brown', class: '11', section: 'C', gurdianContact: '555-555-5555',status: "InActive" },
        { studentId: 'S427', rollNo: 'F500', studentName: 'Satthi Babu', class: '9', section: 'D', gurdianContact: '123-456-7890' ,status: "InActive"},
    ];

    const onAdd=()=>{
        navigate('/createStudent')
    }
    const toDetailView=(id)=>{
        navigate(`/studentDetailView/${id}`)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentListContainer>
                    <Heading>Students Details</Heading>
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
                            <TableBody>
                                {students.map(each => (
                                    <Rows key={each.studentId}>
                                        <TableData >{each.studentId}</TableData>
                                        <TableData >{each.studentName} </TableData>
                                        <TableData >{each.rollNo} </TableData>
                                        <TableData >{each.class} </TableData>
                                        <TableData >{each.section} </TableData>
                                        <TableData >{each.gurdianContact} </TableData>
                                        <TableData>{each.status}</TableData>
                                        <TableData ><button style={{padding:"0",outline:"none"}} onClick={() => toDetailView(each.studentId)}><FaEdit style={{color:"#027f19"}} size={20} /></button></TableData>
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
export default StudentsList