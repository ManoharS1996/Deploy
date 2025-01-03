import {
    MainContainer, StudentListContainer, Heading, SearchContainer, InputContainerSearch, SearchIcon, InputSearch, BottomContainer, TableContainer, Table,
    TableHeading, TableHead, Rows, TableData,
    TableBody
} from "./StyledComponents"


import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import AddButton from "../../../shared/UIElements/addButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";



const Inventory = () => {

    const navigate = useNavigate()

    const columns = ['Item Id', 'Item Name', 'Category', 'Brand', 'Stock', 'Unit Price', 'Total Price', 'Status',""]
    const Items = [
        { itemId: 'I0051', itemName: 'Ballpoint Pens', category: 'Stationery', brand: 'Parker', stock: '100', UnitPrice: '5', totalPrice: '500', status: 'Available' },
        { itemId: 'I0052', itemName: 'Whiteboard Markers', category: 'Stationery', brand: 'Camlin', stock: '20', UnitPrice: '50', totalPrice: '1000', status: 'Available' },
        { itemId: 'I0053', itemName: 'A4 Sheets (Pack of 500)', category: 'Stationery', brand: 'JK Papers', stock: '10', UnitPrice: '250', totalPrice: '2500', status: 'Available' },
        { itemId: 'I0054', itemName: 'Classroom Whiteboard', category: 'Furniture', brand: 'Parker', stock: '3', UnitPrice: '500', totalPrice: '1500', status: 'Available' },
        { itemId: 'I0055', itemName: '4K Projector', category: 'Technology', brand: 'Epson', stock: '2', UnitPrice: '10000', totalPrice: '20000', status: 'Available' },
        { itemId: 'I0056', itemName: 'Office Chairs', category: 'Furniture', brand: 'Godrej', stock: '6', UnitPrice: '300', totalPrice: '1800', status: 'Available' },
        { itemId: 'I0057', itemName: 'Paper Clip (Box of 100)', category: 'Stationery', brand: 'Parker', stock: '2', UnitPrice: '50', totalPrice: '100', status: 'Available' },
        { itemId: 'I0058', itemName: 'First-Aid Kit', category: 'Miscellaneous', brand: 'Parker', stock: '4', UnitPrice: '200', totalPrice: '800', status: 'Available' },
    ];

    const onAdd = () => {
        navigate('/createInventory')
    }
    const toDetailView = () => {
        navigate(`/inventoryDetailView`)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <StudentListContainer>
                    <Heading>Inventory Details</Heading>
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
                                    <th></th>
                                </Rows>
                            </TableHeading>
                            <TableBody>
                                {Items.map(each => (
                                    <Rows key={each.itemId}>
                                        <TableData >{each.itemId}</TableData>
                                        <TableData >{each.itemName} </TableData>
                                        <TableData >{each.category} </TableData>
                                        <TableData >{each.brand} </TableData>
                                        <TableData >{each.stock} </TableData>
                                        <TableData >{each.UnitPrice} </TableData>
                                        <TableData >{each.totalPrice} </TableData>
                                        <TableData>{each.status}</TableData>
                                        <TableData style={{ paddingRight: "1rem" }}><button style={{ padding: "0", outline: "none" }} onClick={toDetailView}><FaEdit style={{ color: "#027f19" }} size={20} /></button></TableData>
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
export default Inventory