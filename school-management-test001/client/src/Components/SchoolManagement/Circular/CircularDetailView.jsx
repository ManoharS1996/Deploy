import {
    MainContainer, BottomContainer, SideContainer, FormContainer,
    TabName,
    LetterContainer,
    Dear

} from "./styledComponents"

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



import TopContainer from "../../../shared/UIElements/topcontainer";
import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";


const CircularDetailView = () => {

    const { circularId } = useParams()

    const navigate = useNavigate()



    useEffect(() => {
        getCircularDetail()
    }, [])

    const getCircularDetail = async () => {
        const url = `http://localhost:5000/api/circular/${circularId}`
        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            const data = responseData.circular[0]
            // console.log(data)
            setFormData((prev) => ({
                ...prev,
                circularId: circularId,
                title: data.circular_title,
                receiver: data.circular_receiver,
                subject: data.circular_subject,
                date: data.circular_date,
                status: data.circular_status,
                circular: data.circular_description
            })
            )

        } catch (err) {
            console.log(err)
        }
    }

    const [formData, setFormData] = useState({
        circularId: "", title: '', receiver: '', subject: '', date: "", status: "Active", circular: ""
    });
    // const onEdit=()=>{
    //     navigate('/addCircular')
    // }
    function convertToPlainText(html) {
        // Replace <br> and <br /> tags with newlines
        let text = html.replace(/<br\s*\/?>/g, '\n\n');
    
        // Remove remaining HTML tags
        text = text.replace(/<\/?[^>]+(>|$)/g, '');
    
        // Trim any extra whitespace
        return text.trim();
    }

    const [plainText, setPlainText] = useState(``);
   
    useEffect(() => {
        if (formData && formData.circular) {
            try {
                const parsedArray = JSON.parse(formData.circular);
                const htmlContent=`${parsedArray}`
                setPlainText(convertToPlainText(htmlContent))

            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [formData.circular]);

    //     useEffect(() => {
    //         // console.log((notify[0]).insert)
    //         setConvert((prev) => ({
    //             ...prev,
    //             first: (notify[0]).insert,
    //             second: (notify[1]).insert,
    //             third: (notify[2]).insert,
    //             fourth: (notify[3]).insert,
    //             fifth: (notify[4]).insert,
    //         }))
    //     }, [notify])

    //     useEffect(() => {
    //         console.log(stringForm)
    //         setStringForm(
    //            `
    // ${convert.first}${convert.second}${convert.third}${convert.fourth}${convert.fifth}
    // `)
    //     }, [convert])



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

    // const editorStyle = {
    //     fontFamily: "'Noto Sans Devanagari', sans-serif",  // Hindi font
    //     fontSize: '16px',
    //     width: '100%',
    //     height: '86%',
    //     backgroundColor: 'white',
    //     borderRadius: '10px'
    // };

    // const Modules = {
    //     toolbar: [
    //         ['bold', 'italic', 'underline'],
    //         [{ 'font': ['sans-serif', 'telugu', 'devanagari'] }, { 'header': '1' }, { 'header': '2' }],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //         [{ 'align': [] }],
    //         ['link'],
    //         [{ 'color': [] }, { 'background': [] }],
    //         ['pdf', 'image', 'video'],
    //         ['blockquote'],
    //         [{ 'script': 'sub' }, { 'script': 'super' }],
    //         ['code', 'code-block'],
    //     ],
    // };

    // const Formats = [
    //     'header', 'font', 'size', 'bold', 'italic', 'underline', 'color', 'background',
    //     'list', 'bullet', 'indent', 'align', 'link', 'image', 'video', 'blockquote',
    //     'code', 'code-block', 'script'
    // ];
    const onClose = () => {
        navigate('/circular')
    }


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

    // const toDetailView = (name, date) => {
    //     navigate(`/examsDetailView`, { state: { examName: name, examDate: date } })
    //     // console.log(name)
    // }
    // let title=example.name

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <FormContainer>
                        <TopContainer formname={formData.title} fun={onClose} />

                        <TabName style={{ fontSize: "1rem", padding: "0.5rem 1rem", margin: "0.5rem 0 1rem 0" }}>Subject : {formData.subject}</TabName>
                        {/* <Button style={{alignSelf:'flex-end',}} onClick={onAdd}>
                                        <IoIosAddCircleOutline style={{ margin: " 2px 8px 2px 0" }} size={25} /> 
                                        Add</Button> */}
                        <LetterContainer>
                            <Dear>{plainText}</Dear>

                        </LetterContainer>
                        {/* <AddButton onClick={onEdit}><MdEdit style={{marginRight:"0.5rem"}} size={20}/>Edit</AddButton> */}



                    </FormContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default CircularDetailView