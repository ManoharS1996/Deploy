import MainPage from "../../../shared/UIElements/mainpage"
import ListView from "../../../shared/UIElements/listview"

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const InventoryReusable = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    let dates = `${day}-${month}-${year}`



    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");  // Stores the generated ID

    const columns = ['Item Id', 'Item Name', 'Category', 'Brand', 'Stock', 'Unit Price', 'Total Price', 'Status','Actions']
    const rows = ["item_id", "item_name", "item_category", "item_brand", "item_quantity", "item_unitprice", "item_totalprice", "item_status"]

    const [allitems, setAllitems] = useState([])

    useEffect(() => {
        getItemsdata()
    }, [])

    const getItemsdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/inventory"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setAutoid(responseData.newId)
            // console.log(autoid)
            const items = responseData.items || []; // Default empty array
            if (items.length > 0) {
                const filterdata = items.filter(item => (item.item_name !== "" && item.item_name !== "1"))
                setAllitems(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }


    const filteredItems = allitems.filter(item =>
        item.item_name.toLowerCase().includes(search.toLowerCase()) ||
        item.item_id.toLowerCase().includes(search.toLowerCase()) ||
        item.item_category.toLowerCase().includes(search.toLowerCase()) ||
        item.item_quantity.toLowerCase().includes(search.toLowerCase()) ||
        item.item_unitprice.toLowerCase().includes(search.toLowerCase()) ||
        item.item_brand.toLowerCase().includes(search.toLowerCase()) ||
        item.item_status.toLowerCase().includes(search.toLowerCase())
    );

    const navigate = useNavigate();

    //   const onClose = () => {
    //     navigate("/dashboard");
    //   };

    const onAdd = async () => {

        const url = "http://localhost:5000/api/inventory"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_id: autoid,
                item_name: "1",
                item_category: "1",
                item_quantity: "1",
                item_unitprice: "1",
                item_totalprice: "1",
                item_purchasedate: dates,
                item_brand: "1",
                item_unitmeasure: "1",
                item_place: "1",
                item_status: "Active",
                item_description: "1",

                item_created_at: dates
            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        } 

        navigate('/createInventory', { state: { autoid } })
    }
    const toDetailView = (e) => {
        // console.log(i)
        navigate(`/inventoryDetailView/${e}`)
    }
    return (
        <MainPage work={<ListView name='Inventory Details' search={search} setSearch={setSearch} buttonname='add' addfun={onAdd} headings={columns} rows={rows} pass='item_id' datas={filteredItems} editfun={toDetailView} />} />
    )
}

export default InventoryReusable