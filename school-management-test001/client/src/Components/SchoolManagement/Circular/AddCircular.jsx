import {
    MainContainer, BottomContainer, SideContainer, FormContainer, InputContainer, InputName, InputName1, Input, QuillContainer,
    LetterContainer,
    InputElements

} from "./styledComponents"

import { useNavigate } from "react-router-dom";

import { CustomStyles } from "../CustomStyles"
import { Circulars, Status } from "../DummyData";

// import React from 'react';
import ReactQuill from 'react-quill'; // Import the Quill editor
import 'react-quill/dist/quill.snow.css';

import TopContainer from "../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../shared/UIElements/submitButton";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";
import Select from 'react-select';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const AddCircular = () => {
    const location = useLocation()
    const { autoid } = location.state || {};

    const [editorValue, setEditorValue] = useState([
        { insert: 'Dear Parents/Guardians,\n\n' },
        { insert: 'This is to inform you that the school will remain closed for the upcoming public holidays from [Date] to [Date]. Regular classes will resume on [Date].\n\n' },
        { insert: 'Please ensure that your child is informed of these dates and prepares accordingly for the following school days.\n\n' },
        { insert: 'Thank you for your cooperation.\n\n\n' },
        {
            insert: 'Sincerely,\n\n[Your Name]\n\nPrincipal\n\n[School Name]',
            // attributes: { bold: true }
        }
    ]);
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);1
    let dates = `${year}-${month}-${day}`

    // useEffect(() => {
    //     setFormData(prevData => ({
    //     ...prevData,
    //     circular:circular: JSON.stringify(editorValue) ,
    // }))
    // }, [editorValue])

    const [formData, setFormData] = useState({
        circularId: autoid, title: '', receiver: '', subject: '', date: dates, status: "Active", circular:editorValue
    });

    useEffect(()=>{
        setFormData((prev)=>({
            ...prev,
            circular:editorValue
        }))

    },[editorValue])
    const navigate = useNavigate()

    const onAdd = async () => {
        const url = `http://localhost:5000/api/circular/${autoid}`
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                circular_title: formData.title,
                circular_subject: formData.subject,
                circular_receiver: formData.receiver,
                circular_status: formData.status,
                circular_date: formData.date,
                circular_description:JSON.stringify(formData.circular),
            })
        }
        console.log({
            circular_title: formData.title,
            circular_subject: formData.subject,
            circular_receiver: formData.receiver,
            circular_status: formData.status,
            circular_date: formData.date,
            circular_description:JSON.stringify(formData.circular),
        })

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }
        navigate('/circular') 
    }

    const handleChange = (value, key) => {
        // console.log(value, key)
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSelect = (e, key) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            [key]: value,

        }))
    }
    const handleLetter = (e) => {
        setEditorValue(e);
        // console.log(editorValue)
    };
    // console.log(editorValue)

    //     const letter=`Dear Parents/Guardians,

    // This is to inform you that the school will remain closed for the upcoming public holidays from [Date] to [Date]. Regular classes will resume on [Date].

    // Please ensure that your child is informed of these dates and prepares accordingly for the following school days.

    // Thank you for your cooperation.


    // Sincerely,
    // [Your Name]

    // Principal
    // [School Name]`

    // const formattedAnnouncement = letter.split('\n').map((line, index) => (
    //     <React.Fragment key={index}>
    //       {line}
    //       <br />
    //     </React.Fragment>
    //   ));

    // const editor = withReact(createEditor());

    // const initialValue = [
    //     {
    //       type: 'paragraph',
    //       children: [
    //         {
    //           text: 'Start typing here...',
    //         },
    //       ],
    //     },
    //   ];

    const editorStyle = {
        fontFamily: "'Noto Sans Devanagari', sans-serif",
        fontSize: '16px',
        width: '100%',
        height: '86%',
        backgroundColor: 'white',
        borderRadius: '10px'
    };

    const Modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'font': ['sans-serif', 'telugu', 'devanagari'] }, { 'header': '1' }, { 'header': '2' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link'],
            [{ 'color': [] }, { 'background': [] }],
            ['pdf', 'image', 'video'],
            ['blockquote'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['code', 'code-block'],
        ],
    };

    const Formats = [
        'header', 'font', 'size', 'bold', 'italic', 'underline', 'color', 'background',
        'list', 'bullet', 'indent', 'align', 'link', 'image', 'video', 'blockquote',
        'code', 'code-block', 'script'
    ];

    const onClose = async () => {
        navigate('/circular')
        const url = `http://localhost:5000/api/circular/${autoid}`

        const options = {
            method: "DELETE",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const circular = responseData.circulars || []
            console.log(circular)


        } catch (err) {
            console.log(err)
        }
    }


    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname='Create Circular' fun={onClose} />

                        {/* <Button style={{alignSelf:'flex-end',}} onClick={onAdd}>
                                        <IoIosAddCircleOutline style={{ margin: " 2px 8px 2px 0" }} size={25} /> 
                                        Add</Button> */}

                        <InputElements>
                            <InputContainer
                                style={{ width: "24%" }}
                            >
                                <Input name="CircularID" id="circularId" value={formData.circularId} onChange={(e) => handleChange(e.target.value, e.target.id)}
                                    type="text" required
                                />
                                <InputName1 htmlFor="circularId">Circular ID</InputName1>
                            </InputContainer>
                            <InputContainer
                                style={{ width: "24%" }}
                            >
                                <InputName1 >Receiver</InputName1>
                                <Select
                                    // style={{width:"50%"}}
                                    styles={CustomStyles}
                                    name="circulars"
                                    options={Circulars}
                                    value={Circulars.find(each => (formData.receiver === each.value))}
                                    placeholder="Select"
                                    onChange={(e) => handleSelect(e, 'receiver')}
                                />
                            </InputContainer>
                            <InputContainer style={{ width: "24%" }}
                            >
                                <Input name="date"
                                    placeholder=""
                                    onChange={(e) => handleChange(e.target.value, e.target.id)}
                                    value={formData.date}
                                    style={{ textTransform: "uppercase" }}
                                    type="date"
                                    id="date"
                                />
                                <InputName htmlFor="purchaseDate" >Event Date</InputName>
                            </InputContainer>
                            <InputContainer style={{ width: "24%", }}>
                                <InputName1 >Status</InputName1>
                                <Select
                                    // style={{width:"50%"}}
                                    styles={CustomStyles}
                                    name="status"
                                    options={Status}
                                    value={Status.find(each => (formData.status === each.value))}
                                    // value={formData.selectedOption}
                                    placeholder="Select"
                                    onChange={(e) => handleSelect(e, 'status')}
                                />
                            </InputContainer>
                            <InputContainer style={{ padding: "0", margin: "0.2rem 0 0.8rem 0.5rem" }}>
                                <Input type="text" id="title" onChange={(e) => handleChange(e.target.value, e.target.id)}
                                    required></Input>
                                <InputName htmlFor="title">Title: </InputName>
                            </InputContainer>

                            <InputContainer style={{ padding: "0", margin: "0.2rem 0 0.8rem 0.5rem" }}>
                                <Input type="text" id="subject" onChange={(e) => handleChange(e.target.value, e.target.id)}
                                    required></Input>
                                <InputName>Subject :</InputName>
                            </InputContainer>
                        </InputElements>

                        <LetterContainer style={{ padding: "0.5rem 1rem", width: '100%' }}>

                            <QuillContainer>
                                <ReactQuill
                                    value={editorValue}
                                    onChange={handleLetter}
                                    style={editorStyle}
                                    modules={Modules}
                                    formats={Formats}
                                />
                            </QuillContainer>
                        </LetterContainer>

                        <SubmitButton type="button" funsubmit={onAdd} buttonname='+ Create' />


                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default AddCircular