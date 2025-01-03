import {
    MainContainer, StudentListContainer, Heading, SearchContainer, InputContainer, SearchIcon, Input,  BottomContainer, TableContainer, Table,
    TableHeading, TableHead, Rows, TableData,
    TableBody
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";

import AddButton from "../../../shared/UIElements/addButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const FeeTable = () => {

    const navigate=useNavigate()

    const columns = ['Id', 'Name', 'Class','Transcation ID','Fee Type','Total Fee','Fee Paid','Due Amount', 'Contact','Status',]
    const students = [
        { studentId: 1, studentName: 'Alice Johnson', class: '10', transId: 'Tx84654687', type:'Tution',fee:"100000",feePaid:"5370",due:"4630", phone: '123-456-7890',state: "Paid" },
        { studentId: 2, studentName: 'Bob Smith', class: '12', transId: 'Tx84654687', type:'Sports',fee:"2000",feePaid:"2000",due:"0", phone: '987-654-3210',state: "Paid" },
        { studentId: 3, studentName: 'Charlie Brown', class: '11',transId: 'Tx84654687', type:'Library',fee:"5000",feePaid:"5000",due:"5000", phone: '555-555-5555',state: "Pending" },
        { studentId: 4, studentName: 'Diana Prince', class: '10',transId: 'Tx84654687',type:'Tution',fee:"10000",feePaid:"5000",due:"5000", phone: '444-444-4444',state: "Paid" },
        { studentId: 5, studentName: 'Edward Elric', class: '12', transId: 'Tx84654687',type:'Tution',fee:"100000",feePaid:"5000",due:"5000", phone: '666-666-6666',state: "Paid" },
        { studentId: 6,  studentName: 'Satthi Babu', class: '9', transId: 'Tx84654687',type:'Library',fee:"10000",feePaid:"5000",due:"5000", phone: '123-456-7890' ,state: "Partial"},
        { studentId: 7,  studentName: 'Ram babu', class: '1', transId: 'Tx84654687',type:'Sports',fee:"100000",feePaid:"5000",due:"5000", phone: '012-345-6789',state: "Pending" },
        { studentId: 8,  studentName: 'Rama raju', class: '5', transId: 'Tx84654687',type:'Library',fee:"10000",feePaid:"5000",due:"5000", phone: '012-345-6789',state: "Paid" },
        { studentId: 9,  studentName: 'Alice Johnson', class: '10', transId: 'Tx84654687',type:'Tution',fee:"10000",feePaid:"5000",due:"5000", phone: '123-456-7890',state: "Paid" },
        { studentId: 10, studentName: 'Bob Smith', class: '12', transId: 'Tx84654687', type:'Tution',fee:"10000",feePaid:"5000",due:"5000",phone: '987-654-3210',state: "Paid" },
        { studentId: 11, studentName: 'Charlie Brown', class: '11',transId: 'Tx84654687',type:'Sports',fee:"100000",feePaid:"5000",due:"5000", phone: '555-555-5555',state: "Partial" },
        { studentId: 12,  studentName: 'Satthi Babu', class: '9',transId: 'Tx84654687',type:'Tution',fee:"10000",feePaid:"5000",due:"5000", phone: '123-456-7890' ,state: "Pending"},
    ];

    const onAdd=()=>{
        navigate('/createReceipt')
    }
    const onInside=()=>{
        navigate('/feeDetailView')
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentListContainer>
                    <Heading>Fee Details</Heading>
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
                                        <TableData >{each.studentId}</TableData>
                                        <TableData >{each.studentName} </TableData>
                                        <TableData >{each.class} </TableData>
                                        <TableData >{each.transId} </TableData>
                                        <TableData >{each.type} </TableData>
                                        <TableData>{each.fee}</TableData>
                                        <TableData>{each.feePaid}</TableData>
                                        <TableData>{each.due}</TableData>
                                        <TableData >{each.phone} </TableData>
                                        <TableData>{each.state}</TableData>
                                        <TableData ><button style={{padding:"0"}} onClick={onInside} ><GrFormNextLink style={{color:"#027f19"}} size={20}  /></button></TableData>
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
export default FeeTable