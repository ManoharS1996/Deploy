import {
    MainContainer, BottomContainer, SideContainer, FormContainer,
    Forms, InputElements, InputName1, InputContainer,
    QuillContainer,
    Input,
    InputName,
    UnderContainer
} from "./StyledComponents"

import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill'; // Import the Quill editor
import 'react-quill/dist/quill.snow.css';
// import { createEditor } from 'slate';
// import { Slate, Editable, withReact } from 'slate-react';
import TopContainer from "../../../../shared/UIElements/topcontainer";
import SubmitButton from "../../../../shared/UIElements/submitButton";
import { CustomStyles } from "../../CustomStyles"
import { Grades, Sections, Subjects } from "../../DummyData";

import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";
import Select from 'react-select';
import { useState } from "react";
// import { useLocation } from "react-router-dom";




// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { PiMathOperationsBold } from "react-icons/pi";
// import { GiAtom } from "react-icons/gi";
// import { MdHistoryEdu } from "react-icons/md";

// import { MdOutlineAssignment } from "react-icons/md";



//fc8e03,04b40f,d4b806,8005a2,dc0677

const AddClassNotes = () => {

    const [editorValue, setEditorValue] = useState('');

    const handleChange = (e) => {
        console.log(e)
        setEditorValue(e);
    };

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
        fontFamily: "'Noto Sans Devanagari', sans-serif",  // Hindi font
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
            ['pdf','image', 'video'],
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

    // const Subjects = [
    //     { subject: "1", subjectName: 'తెలుగు', icon: "", color: "#cd001a" },
    //     { subject: "2", subjectName: 'हिन्दी', icon: "", color: "#b5b736" },
    //     { subject: "3", subjectName: 'English', icon: "", color: "#1961ae" },
    //     { subject: "4", subjectName: 'Maths', icon: <PiMathOperationsBold size={40} />, color: "#619c00" },
    //     { subject: "5", subjectName: 'Science', icon: <GiAtom size={40} />, color: "#ef6a00" },
    //     { subject: "6", subjectName: 'Social', icon: <MdHistoryEdu size={40} />, color: "#61007d" },
    // ]


    // const location=useLocation()

    const [formData, setFormData] = useState({
        grade: '', section: '', subject: '', examName: '', selectedOption: ''
    });
    const navigate = useNavigate()

    const onClose = () => {
        navigate('/classNotesDetailView')
    }

    const Options = Grades.map(option => ({
        value: option.value,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.name}</span>
                <span >{option.label}</span>
            </div>
        )
    }))
    // const onClickTab=(id)=>{
    //     console.log(id)
    //     navigate(`/${id}`)
    // }

    const handleSelect = (e) => {
        // console.log(e)
        const { value } = e
        setFormData(prevData => ({
            ...prevData,
            selectedOption: value[value],

        }))
    }

    // const toDetailView = () => {
    //     navigate(`/resultDetailView/`)
    //     // console.log(name)
    // }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                    <TopContainer formname='Add Notes' fun={onClose}/>

                        <Forms>
                            <InputElements>
                                <InputContainer style={{ width: "30%" }}>
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

                                <InputContainer style={{ width: "30%" }}>
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
                                <InputContainer style={{ width: "30%" }}>
                                    <InputName1 >Subject</InputName1>
                                    <Select
                                        styles={CustomStyles}
                                        name="selectedOption"
                                        options={Subjects}
                                        value={formData.selectedOption}
                                        placeholder="Select"
                                        onChange={handleSelect}
                                    />
                                </InputContainer>
                            </InputElements>
                            
                        </Forms>
                        <UnderContainer>
                        <InputContainer style={{width:"30%",alignSelf:'flex-start'}}>
                            <Input style={{background:'white'}} required/>
                            <InputName>File Name</InputName>
                        </InputContainer>
                        <QuillContainer>
                            <ReactQuill
                                value={editorValue}
                                onChange={handleChange}
                                style={editorStyle}
                                modules={Modules}
                                formats={Formats}
                            />
                        </QuillContainer>
                        </UnderContainer>
                        

                       
                        {/* <Slate editor={editor} value={initialValue}>
                            <Editable placeholder="Type something..." />
                        </Slate> */}
                            <SubmitButton type="submit" buttonname='Add Notes'/>
                            </FormContainer>

                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default AddClassNotes