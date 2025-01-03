import {
    MainContainer, BottomContainer, StudentListContainer,CloseIcon, FormContainer, Forms, FormName, FormTop, InputElements,
    InputContainer, InputName, Input, TableContainer, Table, TableHeading, Rows, TableHead, TableBody,
    TableData,
} from "./StyledComponents"

// import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import Select from 'react-select';

import TopContainer from "../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../shared/UIElements/submitButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";

// import { CustomStyles } from "../CustomStyles"
// import { FeeType } from "../DummyData";
import { Tooltip } from 'react-tooltip'
import { IoIosCloseCircle } from "react-icons/io";
import { HiOutlineInformationCircle } from "react-icons/hi2";



const BillingDetailView = () => {

    const navigate = useNavigate()

    const Information = `
    Student Id: S0027
    Student Name: Sruthika
    Gender: Female
    City: Vijayawada
    Guardian Name: Siva
    Contact: 1234567890
    `;

    const Columns = ["Fee Type", "Due Date", "Total Fee", "GST(18%)", "Fee paid", "Due Amount", 'Bill',]

    const onClose = () => {
        navigate('/billing')
    }
    const onSubmit = () => {
        navigate('/billing')
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentListContainer>
                    <FormContainer>
                    <TopContainer formname='Billing' fun={onClose}/>


                        <Forms>
                            <FormTop>
                                <FormName>Student Information</FormName>
                                <HiOutlineInformationCircle data-tooltip-id="my-tooltip"
                                    data-tooltip-content={Information}
                                    style={{ marginTop: "-5px", cursor: "pointer" }} size={20} />
                                <Tooltip arrow
                                    id="my-tooltip"
                                    place="right-end"       // Position the tooltip at the top
                                    effect="solid"    // Solid background for the tooltip
                                    delayHide={300}   // Delay before the tooltip hides
                                    style={{
                                        backgroundColor: '#f3f3f3', // Green background
                                        color: '#000',             // White text
                                        borderRadius: '10px', // Optional: rounded corners
                                        zIndex: "100",
                                        whiteSpace: "pre-wrap",
                                        height: "10rem",
                                        width: "12rem",
                                        padding: "0.5rem",
                                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
                                    }}
                                />
                            </FormTop>
                            <InputElements>
                                <InputContainer>
                                    <Input id="studentId" type="text" required />
                                    <InputName htmlfor="studentId">Student Id</InputName>

                                </InputContainer>
                                <InputContainer>
                                    <Input id="fullname" type="text" required />
                                    <InputName htmlFor="fullname">Student Name</InputName>

                                </InputContainer>
                            </InputElements>

                            <FormName>Billing Details</FormName>

                            <TableContainer style={{ width: '94%', border: '1.5px solid green', height: 'fit-content' }}>
                                <Table>
                                    <TableHeading>
                                        <Rows>
                                            {Columns.map(each => (
                                                <TableHead key={each}>{each}</TableHead>
                                            ))}
                                            <thead></thead>
                                        </Rows>
                                    </TableHeading>

                                    <TableBody>
                                        <Rows>
                                            <TableData>Tution Fee</TableData>
                                            <TableData>05-12-2024</TableData>
                                            <TableData>50,000</TableData>
                                            <TableData>9,000</TableData>
                                            <TableData>30,000</TableData>
                                            <TableData>29,000</TableData>
                                            <TableData>29,000</TableData>

                                            <TableData>
                                                <CloseIcon type="button"
                                                // onClick={() => deleteRow(index)}
                                                ><IoIosCloseCircle style={{ color: "#de0404" }} size={25} /></CloseIcon>
                                            </TableData>
                                        </Rows>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <p style={{ width: '22%', color: 'black', fontSize: '1rem', alignSelf: 'flex-end', marginTop: "10px" }}>Total Bill :
                                <span style={{ fontWeight: 'bold', fontSize: '1.15rem' }}> 29,000 </span>
                            </p>

                            <SubmitButton type="submit" onClick={onSubmit} buttonname='send'/>


                        </Forms>
                    </FormContainer>
                </StudentListContainer>

            </BottomContainer>
        </MainContainer>
    )
}
export default BillingDetailView


{/* <TabContainer>
{Fees.map((each) => (
    <Tabs key={each.exam} name={each.examName} 
    // onClick={() => toDetailView(each.examName, each.examDate)}
    >
        {/* <TabIcon><MdOutlineAssignment size={30} /></TabIcon> */}
//         <TabNames>
//             <TabName>{each.name}</TabName>
//         </TabNames>
//     </Tabs>
// ))}
// </TabContainer> */}