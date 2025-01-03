import MainPage from "../../../shared/UIElements/mainpage"
import ListView from "../../../shared/UIElements/listview"

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
// import { useCallback } from "react";


const SchoolReusable = () => {
     const date = new Date()
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
        const day = String(date.getDate()).padStart(2, "0");
        let dates = `${day}-${month}-${year}`
    
        

    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");  // Stores the generated ID

    const columns = ['Institute Id', 'Institute Name', 'Institute Type', 'Affiliation Board', 'Est. Year', 'Contact', 'Status', 'Actions',]
    const rows = ["institute_id", 'institute_name', "institute_type", "board_of_education", "est_year", "institute_contact", "institute_status",]

    const [allinstitutes, setAllInstitutes] = useState([])

    useEffect(() => {
        getInstitutesdata()
    }, [])

    const getInstitutesdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/schools"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setAutoid(responseData.newId)
            // console.log(autoid)
            const institutes = responseData.institutes.reverse() || []; // Default empty array
            if (institutes.length > 0) {
                const filterdata = institutes.filter(institute => (institute.institute_name !=="" && institute.institute_name !=="1"))
                setAllInstitutes(filterdata)
                
            }
        } catch (err) {
            console.log(err)
        }
    }

  
    const filteredInstitutes =search.trim()
    ? allinstitutes.filter(institute => {
        // Split the search string by commas, trim whitespace, and filter out empty terms
        const searchTerms = search
            .split(',')
            .map(term => term.trim().toLowerCase())
            .filter(term => term); // Remove empty terms

        // Check if all valid search terms match at least one field in the institute object
        return searchTerms.every(term => 
            institute.institute_name.toLowerCase().includes(term) ||
            institute.institute_id.toLowerCase().includes(term) ||
            institute.institute_type.toLowerCase().includes(term) ||
            institute.est_year.toLowerCase().includes(term) ||
            institute.board_of_education.toLowerCase().includes(term) ||
            institute.institute_contact.toLowerCase().includes(term) ||
            institute.institute_status.toLowerCase().includes(term)
        );
    })
    : allinstitutes;


    const navigate = useNavigate();

    //   const onClose = () => {
    //     navigate("/dashboard");
    //   };


    const onAdd = async () => {
        const url = "http://localhost:5000/api/schools"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                institute_id: autoid,
                institute_name: '1',
                est_year: '1',
                institute_category: '1',
                institute_type: '1',
                board_of_education: '1',
                institute_contact: '+91',
                institute_email: "1",
                institute_status: "Active",
                institute_nationality: {
                    institute_nationality_id:'1',
                    institute_nationality_emoji: "1",
                    institute_nationality_name: "1"
                },
                institute_state: {
                    institute_state_id: "1",
                    institute_state_name: "1",
                    institute_state_code:"1"
                },
                institute_city: "1",
                institute_street: "1",
                institute_pincode: "1",
                institute_principal_name: "1",
                institute_principal_contact: "+91",
                institute_principal_email: "1",
                institute_created_at:dates
            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/createSchool',{state:{autoid}})

    }

    const toDetailView = async (e) => {
        console.log(e)
        navigate(`/schoolDetailView/${e}`)
    }
    return (
        <MainPage work={<ListView name='Institute Details' search={search} setSearch={setSearch} pass="institute_id" buttonname='add' addfun={onAdd} headings={columns} rows={rows} datas={filteredInstitutes} editfun={(e) => toDetailView(e)} />} />
    )
}

export default SchoolReusable