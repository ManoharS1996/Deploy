import {
    MainContainer, BottomContainer, SideContainer, TopContainer,  FormHeading, FormContainer, Forms, InputElements,
    InputContainer, InputName1,SearchContainer,InputContainerSearch,SearchIcon,InputSearch, TableContainer,Table, TableHeading, TableHead, TableBody, TableData, Rows,
    UnderContainer
} from "./StyledComponents"
import {CustomStyles} from "../CustomStyles"
import { Grades,Sections } from "../DummyData";

import CloseButton from "../../../shared/UIElements/closeButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";
import { GrFormNextLink } from "react-icons/gr";

// import { FaEdit } from "react-icons/fa";




import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';


const Billing = () => {

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

    // const date = new Date()
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    // const day = String(date.getDate()).padStart(2, "0");
    // // console.log(`${year}-${month}-${day}`);
    // let dates = `${year}-${month}-${day}`

    const columns = ['Id','Roll No','Name', 'Class', 'Section', 'Class Teacher','Gurdian Number','Status' ]
    const diaries = [
        { id: "S0027", rollNo:'21', name:'Sruthika Vedhala', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '9848386828',status:'Received'},
        { id: "S001", rollNo:'1', name:'A. Dheeraj', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'Received'},
        { id: "S002", rollNo:'2', name:'B. Jaya Lakshmi', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'----------'},
        { id: "S003", rollNo:'3', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'Received' },
        { id: "S004", rollNo:'4', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'Received' },
        { id: "S005", rollNo:'5', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'Received'},
        { id: "S006", rollNo:'6', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890' ,status:'Received'},
        { id: "S007", rollNo:'7', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'Received' },
        { id: "S008", rollNo:'8', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari',phone: '123-456-7890' ,status:'----------' },
        { id: "S009", rollNo:'9', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'Received'},
        { id: "S010", rollNo:'10', name:'D.Eswar Krishna', class: '5', section: 'A',classTeacher:'Roja Kumari', phone: '123-456-7890',status:'Received'},

    ];

   

    const [formData, setFormData] = useState({
        grade: '', section: '', subject:'',examName:'', selectedOption: ''
    });
    // const onAdd = () => {
    //     navigate('/createResult')
    // }
    
    const onClose = () => {
        navigate('/dashboard')
    }
    const toDetailView = () => {
        navigate(`/billingDetailView`)
    }


    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     // console.log(name, value)
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value,

    //     }))
    // }
    const handleSelect = (e) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            selectedOption: value[value],

        }))
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer>
                            <FormHeading>Billing</FormHeading>
                            <CloseButton fun={onClose}/>
                        </TopContainer>

                        <Forms style={{marginTop:'1rem'}}>
                            <InputElements>
                                <InputContainer style={{width:"30%"}}>
                                    <InputName1 >Class/Grade</InputName1>
                                    <Select
                                    styles={CustomStyles}
                                        name="selectedOption"
                                        options={Options}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>

                                <InputContainer style={{width:"30%"}}>
                                    <InputName1 >Section</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="selectedOption"
                                        options={Sections}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>

                            </InputElements>
                            <UnderContainer>
                                <SearchContainer>
                                    <InputContainerSearch>
                                        <SearchIcon><FaSearch size={18} /></SearchIcon>
                                        <InputSearch placeholder="Enter Details" />
                                    </InputContainerSearch>
                                    {/* <Button onClick={onAdd}>
                                        <IoIosAddCircleOutline style={{ margin: " 2px 8px 2px 0" }} size={25} /> 
                                          Add</Button> */}
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
                                            {diaries.map(each => (
                                                <Rows key={each.id}>
                                                    <TableData >{each.id}</TableData>
                                                    <TableData >{each.rollNo} </TableData>
                                                    <TableData >{each.name} </TableData>
                                                    <TableData >{each.class} </TableData>
                                                    <TableData >{each.section} </TableData>
                                                    <TableData >{each.classTeacher} </TableData>
                                                    <TableData >{each.phone} </TableData>
                                                    <TableData>{each.status}</TableData>
                                                    {/* <TableData >{each.marks} </TableData>
                                                    <TableData >{each.grade} </TableData>
                                                    <TableData >{each.remarks} </TableData> */}
                                                    {/* <TableData ><button style={{ padding: "0", outline: "none", background: "#eef0ee" }} onClick={toDetailView}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData> */}
                                                    <TableData >
                                                        <button style={{padding:"0",background:"transparent",border:"0"}} onClick={()=>toDetailView(each.id,each.class,each.section)} >
                                                            <GrFormNextLink style={{color:"#027f19",background:"transparent",border:"0"}} size={25}  />
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
export default Billing