import {
    MainContainer, StudentListContainer, Heading, SearchContainer, InputContainer, SearchIcon, Input, BottomContainer, TableContainer, Table,
    TableHeading, TableHead, Rows, TableData,
    TableBody
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import AddButton from "../../../shared/UIElements/addButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const TransportationList = () => {

    const navigate=useNavigate()

    const columns = ['Id','Roll No','Student Name', 'Class', 'PickUp Point','Bus Fee','Paid','Due', 'Gurdian Contact','Status']
    const students = [
        { studentId: 1, rollNo: 'S100', studentName: 'Alice Johnson', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '123-456-7890',state: "Active" },
        { studentId: 2, rollNo: 'S200', studentName: 'Bob Smith', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000',phone: '987-654-3210',state: "Active" },
        { studentId: 3, rollNo: 'S300', studentName: 'Charlie Brown', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '555-555-5555',state: "InActive" },
        { studentId: 4, rollNo: 'S400', studentName: 'Diana Prince', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '444-444-4444',state: "Active" },
        { studentId: 5, rollNo: 'S500', studentName: 'Edward Elric', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '666-666-6666',state: "Active" },
        { studentId: 6, rollNo: 'S500', studentName: 'Satthi Babu',class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '123-456-7890' ,state: "InActive"},
        { studentId: 7, rollNo: 'S500', studentName: 'Ram babu', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000',phone: '012-345-6789',state: "Active" },
        { studentId: 8, rollNo: 'S500', studentName: 'Rama raju', class: '10/A',pickUp:'Benz Circle',busFee:'10000',feePaid:'6000',due:'4000', phone: '012-345-6789',state: "Active" },
        { studentId: 9, rollNo: 'S100', studentName: 'Alice Johnson', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '123-456-7890',state: "Active" },
        { studentId: 10, rollNo: 'S200', studentName: 'Bob Smith', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '987-654-3210',state: "Active" },
        { studentId: 11, rollNo: 'S300', studentName: 'Charlie Brown', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '555-555-5555',state: "InActive" },
        { studentId: 12, rollNo: 'S500', studentName: 'Satthi Babu', class: '10/A',pickUp:'Benz Circle',busFee:'5000',feePaid:'4000',due:'1000', phone: '123-456-7890' ,state: "InActive"},
    ];

    const onAdd=()=>{
        navigate('/createTransport')
    }
    const toDetailView=()=>{
        navigate(`/transportDetailView`)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentListContainer>
                    <Heading>Transportation Details</Heading>
                    <SearchContainer>
                        <InputContainer>
                            <SearchIcon><FaSearch size={18} /></SearchIcon>
                            <Input placeholder="Enter Details" />
                        </InputContainer>
                        <AddButton addfun={onAdd} buttonname='ADD'/>
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
                                {students.map(each => (
                                    <Rows key={each.studentId}>
                                        <TableData >{each.rollNo}</TableData>
                                        <TableData >{each.studentId} </TableData>
                                        <TableData >{each.studentName} </TableData>
                                        <TableData >{each.class} </TableData>
                                        <TableData >{each.pickUp} </TableData>
                                        <TableData >{each.busFee} </TableData>
                                        <TableData >{each.feePaid} </TableData>
                                        <TableData >{each.due} </TableData>
                                        <TableData >{each.phone} </TableData>
                                        <TableData>{each.state}</TableData>
                                        <TableData style={{paddingRight:"1rem"}}><button style={{padding:"0",outline:"none"}} onClick={toDetailView}><FaEdit style={{color:"#027f19"}} size={20} /></button></TableData>
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
export default TransportationList