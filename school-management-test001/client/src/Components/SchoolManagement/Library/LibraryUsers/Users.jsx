import {
    MainContainer, BottomContainer, SideContainer, FormContainer, UserInputContainer, Input, SearchContainer, InputContainerSearch, SearchIcon, InputSearch, 
    ResultContainer,
    ResultCard,
    ResultView,
    ResultTable, ResultTableHeading, TableHead, Rows, ResultTableBody, TableData, ResultRow,
    InputContainer,
    InputName
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";

// import { CustomStyles } from "../../CustomStyles"
// import { Grades, Sections } from "../../DummyData";

import TopContainer from "../../../../shared/UIElements/topcontainer";
import AddButton from "../../../../shared/UIElements/addButton";
import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
// import Select from 'react-select';
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useLocation } from 'react-router-dom';




// import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";

// import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const Users = () => {
    // const location = useLocation();
    // const example = location.state
    // console.log(example);

    // console.log(props)

    const columns = ['User ID', 'User Name', 'Book ID', 'Book Name', 'Author', 'Start Date', 'End Date']
    const UserBooks = [{ userId: 'S007', userName: 'Sruthika', bookId: "B0051", bookName: 'Theory of Physics', author: 'Siva', startDate: "16-11-2024", endDate: '24-10-2024' },
    { userId: 'S007', userName: 'Sruthika', bookId: "B0051", bookName: 'Theory of Physics', author: 'Siva', startDate: "16-11-2024", endDate: '24-10-2024' },
    { userId: 'S007', userName: 'Sruthika', bookId: "B0051", bookName: 'Theory of Physics', author: 'Siva', startDate: "16-11-2024", endDate: '24-10-2024' },
        // {userId:'S007',userName:'Sruthika', bookId:"B0051",bookName:'Theory of Physics',author:'Siva', startDate: "16-11-2024", endDate: '24-10-2024' },
        // {userId:'S007',userName:'Sruthika', bookId:"B0051",bookName:'Theory of Physics',author:'Siva', startDate: "16-11-2024", endDate: '24-10-2024' },
        // {userId:'S007',userName:'Sruthika', bookId:"B0051",bookName:'Theory of Physics',author:'Siva', startDate: "16-11-2024", endDate: '24-10-2024' },
    ]
    //  const {name}=props

    // const [formData, setFormData] = useState({
    //     grade: '', section: '', subject: '', examName: '', selectedOption: ''
    // });
    const navigate = useNavigate()

    const onClose = () => {
        navigate(`/libraryView`)
    }

    const onAdd=()=>{
        navigate('/addBook')
    }

    // const StudentInformation=[{name:"Sruthika Vedhala"},{class:'5'},{section:'A'},{rollNo:'21'}]
    // const Options = Grades.map(option => ({
    //     value: option.value,
    //     label: (
    //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //             <span>{option.name}</span>
    //             <span >{option.label}</span>
    //         </div>
    //     )
    // }))
    // const onClickTab=(id)=>{
    //     console.log(id)
    //     navigate(`/${id}`)
    // }

    // const handleSelect = (e) => {
    //     // console.log(e)
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
                    <TopContainer formname='User View' fun={onClose}/>

                        <FaRegUserCircle size={200} />
                        <UserInputContainer>
                        <InputContainer style={{width:'100%',padding:'0',margin:"0",}}>
                            <Input style={{ border:"0",outline:'none' }} required />
                            <InputName>User ID</InputName>
                        </InputContainer>
                            <SearchIcon><FaSearch size={18} /></SearchIcon>
                        </UserInputContainer>
                       


                        <ResultContainer>
                            <ResultCard>
                                <SearchContainer>
                                    <InputContainerSearch>
                                        <SearchIcon><FaSearch size={18} /></SearchIcon>
                                        <InputSearch placeholder="Enter Details" />
                                    </InputContainerSearch>
                                    <AddButton addfun={onAdd} buttonname='book'/>

                                </SearchContainer>
                                <ResultView>
                                    <ResultTable>
                                        <ResultTableHeading>
                                            <ResultRow>
                                                {columns.map(each => (
                                                    <TableHead key={each}>{each}</TableHead>
                                                ))}
                                                <th></th>
                                            </ResultRow>
                                        </ResultTableHeading>
                                        <ResultTableBody>
                                            {UserBooks.map(each => (
                                                <Rows key={each.id}>
                                                    <TableData >{each.userId}</TableData>
                                                    <TableData >{each.userName} </TableData>
                                                    <TableData >{each.bookId} </TableData>
                                                    <TableData >{each.bookName} </TableData>
                                                    <TableData >{each.author} </TableData>
                                                    <TableData >{each.startDate} </TableData>
                                                    <TableData >{each.endDate} </TableData>
                                                    <TableData ><button style={{ padding: "0", background: "transparent", border: "0" }}  ><GrFormNextLink style={{ color: "#027f19" }} size={20} /></button></TableData>
                                                </Rows>
                                            ))}
                                        </ResultTableBody>
                                    </ResultTable>

                                </ResultView>
                            </ResultCard>
                        </ResultContainer>

                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default Users