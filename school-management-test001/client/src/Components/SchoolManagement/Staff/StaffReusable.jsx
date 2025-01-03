import MainPage from "../../../shared/UIElements/mainpage"
import ListView from "../../../shared/UIElements/listview"

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const StaffReusable = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    let dates = `${day}-${month}-${year}`



    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");  // Stores the generated ID

    const columns = ['Staff Id', 'Staff Name', 'Job Title', 'Class', 'Section', 'Contact', 'Status', 'Actions']
    const rows = ["staff_id", "staff_name", "staff_title", "staff_class", "staff_section", "staff_contact", "staff_status"]

    const [allstaff, setAllstaff] = useState([])

    useEffect(() => {
        getStaffdata()
    }, [])

    const getStaffdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/staff"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setAutoid(responseData.newId)
            // console.log(autoid)
            const staffs = responseData.staffs || []; // Default empty array
            if (staffs.length > 0) {
                const filterdata = staffs.filter(staff => (staff.staff_name !== "" && staff.staff_name !== "1"))
                setAllstaff(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }


    const filteredStaff = allstaff.filter(staff =>
        staff.staff_name.toLowerCase().includes(search.toLowerCase()) ||
        staff.staff_id.toLowerCase().includes(search.toLowerCase()) ||
        staff.staff_title.toLowerCase().includes(search.toLowerCase()) ||
        staff.staff_class.toLowerCase().includes(search.toLowerCase()) ||
        staff.staff_section.toLowerCase().includes(search.toLowerCase()) ||
        staff.staff_contact.toLowerCase().includes(search.toLowerCase()) ||
        staff.staff_status.toLowerCase().includes(search.toLowerCase())
    );

    const navigate = useNavigate();

    //   const onClose = () => {
    //     navigate("/dashboard");
    //   };

    const onAdd = async () => {

        const url = "http://localhost:5000/api/staff"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                staff_id: autoid,
                staff_name: "1",
                staff_gender: "1",
                staff_date_of_birth: dates,
                staff_contact:"+91",
                staff_email: "1",
                staff_status:"Active",
                staff_nationality: {
                    staff_nationality_id: "1",
                    staff_nationality_emoji: "1",
                    staff_nationality_name: "1"
                },
                staff_state: {
                    staff_state_id: "1",
                    staff_state_name: "1",
                    staff_state_code: "1"

                },
                staff_city: "1",
                staff_street: "1",
                staff_pincode:"1",

                staff_title: "1",
                staff_department:"1",
                staff_degree: "1",
                staff_work:"1",
                staff_certificates: "1",

                staff_class: "1",
                staff_section: "1",

                staff_medical: "1",
                staff_specify: "1",

                staff_created_at: dates


            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/createStaff', { state: { autoid } })
    }
    const toDetailView = (e) => {
        // console.log(i)
        navigate(`/staffDetailView/${e}`)
    }
    return (
        <MainPage work={<ListView name='Staff Details' search={search} setSearch={setSearch} buttonname='add' addfun={onAdd} headings={columns} rows={rows} pass='staff_id' datas={filteredStaff} editfun={toDetailView} />} />
    )
}

export default StaffReusable