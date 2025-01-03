import MainPage from "../../../shared/UIElements/mainpage"
import ListView from "../../../shared/UIElements/listview"

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const TransportReusable = () => {
    // const date = new Date()
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    // const day = String(date.getDate()).padStart(2, "0");
    // let dates = `${day}-${month}-${year}`



    const [search, setSearch] = useState("")

    const columns = ["User ID","Name","Class","PickUp Point",'Bus Fee','Paid','Due','Contact','Status']
    const rows = ["student_id", "student_name", "student_class", "transport_pickup",  "transport_busfee","transport_paid","transport_due","student_contact","transport_status",]

    const [alltransport, setAlltransport] = useState([])

    useEffect(() => {
        getItemsdata()
    }, [])

    const getItemsdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/transport"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            // console.log(autoid)
            const transports = responseData.transports || []; // Default empty array
            if (transports.length > 0) {
                const filterdata = transports.filter(transport => (transport.student_name !== "" && transport.student_name !== "1"))
                setAlltransport(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }


    const filteredTransports = alltransport.filter(transport =>
        transport.student_name.toLowerCase().includes(search.toLowerCase()) ||
        transport.student_id.toLowerCase().includes(search.toLowerCase()) ||
        transport.student_contact.toLowerCase().includes(search.toLowerCase()) ||
        transport.transport_status.toLowerCase().includes(search.toLowerCase()) ||
        transport.transport_pickup.toLowerCase().includes(search.toLowerCase()) ||
        transport.student_class.toLowerCase().includes(search.toLowerCase()) ||
        transport.transport_busfee.toLowerCase().includes(search.toLowerCase())
    );

    const navigate = useNavigate();

    //   const onClose = () => {
    //     navigate("/dashboard");
    //   };

    const onAdd = async () => {
        navigate('/createTransport')
    }
    const toDetailView = (e) => {
        // console.log(i)
        navigate(`/transportDetailView/${e}`)
    }
    return (
        <MainPage work={<ListView name='Transportation Details' search={search} setSearch={setSearch} buttonname='add' addfun={onAdd} headings={columns} rows={rows} pass='student_id' datas={filteredTransports} editfun={toDetailView} />} />
    )
}

export default TransportReusable