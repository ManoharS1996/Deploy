import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f1fcf0;
  /* border: 2px solid red; */
`;
export const BottomContainer = styled.div`
  display: flex;
  height: 92vh;
  flex-direction: row;
  width: 100vw;
`;
export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;
  width: 100%;
  transition: transform 0.4s ease;
  background-color: white;
  border-radius: 1rem;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.5);
  /* border:2px solid red; */
`;

export const SelectContainer = styled.div`
width:50%;
`
export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border-radius: 0.8rem;
  box-shadow: 0px 0px 5px 1px #ccc;
  background-color: white;
  padding:0.8rem;
position:relative;
overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
`;
export const TopContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 0.6rem;
`
export const FormHeading = styled.h1`
  font-size: 1.2rem;
  color: darkgreen;
  font-weight: bold;
`
export const CloseIcon = styled.div`
height: 30px;
width: 30px;
cursor: pointer;
`

export const Forms = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  width: 100%;
  margin-top: 0rem;
`;
export const FormName = styled.p`
  color: black;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem 0rem 0.6rem;
`
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 1rem 0.6rem 0.6rem 0.2rem;
  align-self:center;
`;
export const InputContainerSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border: 1.5px solid #acacac;
  border-radius: 1rem;
  width: 35vw;
  /* box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 2px 2px 4px #999; Small shadow; */
  `

export const SearchIcon = styled.div`
  padding: 0.2rem 0.4rem 0.2rem 0.5rem;
`;

export const Button = styled.button`
  background-color: darkgreen;
  border: 0;
  border-radius: 1rem;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.1rem 1rem;
  font-size: 1rem;

`;

export const InputElements = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

export const InputContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0rem 0rem;
    padding: 0.1rem 0.5rem;
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0;
    position: relative;
`
export const Input = styled.input`
  font-size: 100%;
    height: 2.5rem;
    width: 100%;
    padding: 0.8em;
    outline: none;
    border: 1.5px solid #dfe1df ;
    background-color: transparent;
    border-radius: 1rem;
    width: 100%;
    
    &:focus,
    &:valid {
        border-color: #dfe1df;
    }
`;

export const InputName = styled.label`
  font-size: 100%;
    position: absolute;
    left: 0;
    top: 45%;
    transform: translateY(-50%);
    padding: 0.8em;
    margin-left: 0.8em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #242524;
    background-color: transparent;

    ${Input}:focus + &,
    ${Input}:valid + & {
        top: 0;
        transform: translateY(-50%) scale(0.9);  
        margin-left: 1rem;
        padding: 0.2em 0.5em;  
        background-color: #fff;  
    }
`;

export const InputName1 = styled.label`
  font-size: 100%;
    position: absolute;
    left: 0;
    top: 0;
    /* transform: translateY(-50%); */
    /* padding: 0.8em; */
    /* margin-left: 0.8em; */
    pointer-events: none;
    transition: all 0.3s ease;
    color: #242524;
    /* background-color: transparent; */
    transform: translateY(-50%) scale(0.9);  
    margin-left: 1rem;
    padding: 0.2em 0.5em;  
    background-color: #fff; 
    z-index: 99;

    /* ${Input}:focus + &,
    ${Input}:valid + & {
        transform: translateY(-50%) scale(0.9);  
        margin-left: 1rem;
        padding: 0.2em 0.5em;  
        background-color: #fff;  
    } */
`
export const AddButton = styled.button`
background-color: darkgreen;
    border: 0;
    border-radius: 1rem;
    color: white;
    width: 7rem;
    margin: 0.5rem 1rem;
    align-self: flex-end;
    /* padding-left: 1rem; */

`
export const UnderContainer = styled.div`
  width:100%;
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
  border-radius: 1rem;
  /* margin: 0.1rem; */
  flex-grow: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  background-color:#f0f0f0;

  /* border: 2px solid red; */

  &::-webkit-scrollbar {
    width: 3px;
  }
`
export const InputSearch = styled.input`
  border: 0;
  padding: 0.4rem;
  border-radius: 1rem;
  outline: none;
  font-size: 0.9rem;
  width:100%;
`;


export const TableContainer = styled.div`
  width:100%;
  height: 63vh;
  display: flex;
  flex-direction: column;
  /* justify-content:center; */
  border-radius: 1rem;
  margin: 0.5rem;
  /* flex-grow: 0; */
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5); */
  background-color:#f0f0f0;
  overflow-y:auto;
  /* border: 2px solid red; */

  &::-webkit-scrollbar {
    width: 3px;
  }
`;

export const Table = styled.table`
  width: 100%;
  height:fit-content;
  border-collapse: collapse;
  border-radius: 1rem;
  /* border: 2px solid red; */
  background-color:#f0f0f0;
  padding: 0;
  margin: 0;
  /* overflow-y:auto; */
`;
export const TableHeading = styled.thead`
  width: 100%;
  height: 2.5rem;
  position:sticky;
  text-align: left;
  background-color:white;
  border-radius:0.5rem;
  padding:0.5rem; 
  /* box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5); */
  /* border: 2px solid red; */

`
export const TableHead = styled.th`
  height: 2.5rem;
  background-color: transparent;
  top: 0;
  z-index: 5;
  padding: 0.5rem 1rem;
  color: #027f19;
  /* border: 2px solid red; */


`;
export const TableBody = styled.tbody`

`
export const Rows = styled.tr`
  width: 100%;
  height: 0.3rem !important;
   /* border: 2px solid red;  */
  padding: 0.5rem 1rem;

`
export const TableData = styled.td`
  padding:0.6rem 0 0.4rem 0.8rem;
  outline: none;
`;
export const InputMarks = styled.input`
    width: 5vw;
    border-radius:0.5rem;
    border:0.5px solid #bebebe;
`
export const TabContainer = styled.div`
/* width: 90%; */
/* height:75%; */
display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
padding: 0.5rem 0 0 1rem;
overflow-y:auto;
`
export const Tabs = styled.div`
 height:fit-content;
 width: 75%;
 border-radius:1rem;
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-items:center;
 margin: 1rem;
 padding: 0;
border:1px solid green;
background-color: white;
color:darkgreen;

`
export const Tab = styled.div`
height:4rem;
width: 100%;
 border-radius:1rem;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #06841b;
 padding: 0;
 margin:0;
 border:1px solid green;
background-color: white;
color:darkgreen;
`
export const Side = styled.div`
display:flex;
flex-direction: row;
align-items: flex-start;
align-items: center;
width: 60%;
cursor: pointer;
`
export const TabIcon = styled.div`
color: darkgreen;
padding-left: 1rem;
`
export const TabNames = styled.h1`
    display: flex;
 flex-direction: column;
 justify-content: center;
 align-items:flex-start;
 padding: 2rem  0.5rem 0.5rem 1rem;
 /* color: white; */
`
export const TabName = styled.h1`
    font-size: 1.2rem;
    /* margin-top: 1.2rem; */
   
`
export const TabDate = styled.p`
    font-size: 0.8rem;
    width:100%;
    padding: 0;
    /* align-self:right; */
`
export const ResultContainer = styled.div`
display: flex;
flex-direction: column;
justify-content:flex-start;
align-items: flex-start;
padding: 0.5rem;
width: 100%;
height: 100%;

`
export const StudentCard = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items:center;
background-color:#368503 ;
border-radius:0.8rem;
`
export const StudentDetails = styled.div`
 display:flex;
 flex-direction: column;
 justify-content:center;
 align-items: flex-start;
 padding:0.5rem 0.5rem 0.5rem 1rem;
`
export const StudentDetail = styled.span`
color: white;
font-size:1rem;
`
export const StudentLabel = styled.label`
width: 4.5rem;
text-align:left;
`
export const StudentImage = styled.img`
height:6rem;
border-radius: 5rem;
/* background-color: transparent; */
margin-right: 2rem;
`
export const ResultCard = styled.div`
padding: 1.2rem 0.1rem 0.2rem 0.1rem;
width: 100%;
`
export const Exam = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`
export const ExamName = styled.h1`
font-size:1.2rem; 
color: darkgreen;
padding:0.6rem 0 0.2rem 0;
`
export const ResultView = styled.div`
  width: 100%;
  height: 49vh;
  background-color:#daf7c0;
  border-radius:1rem;
  border: 2px solid green;
  /* overflow: hidden; */
  overflow-y: auto;

  /* box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5); */

`
export const ResultTable = styled.table`
  width: 100%;
  height:fit-content;
  border-collapse: collapse;
  border-radius: 1rem;
  background-color:#daf7c0;
  padding: 0;
  margin: 0;
  border-radius:1rem;
  overflow-y:auto;
`;
export const ResultTableHeading = styled.thead`
  width: 99%;
  height: 2.5rem;
  position:sticky;
  text-align: left;
  background-color:white;
  border-radius:1rem;
  /* margin:0 0.2rem 0 0.2rem; */
  /* box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5); */

`
export const ResultTableHead = styled.th`
  height: 2.5rem;
  background-color: transparent;
  top: 0;
  z-index: 5;
  padding: 0.5rem;
  color: #027f19;
  border-radius:1rem;

  /* border: 2px solid red; */


`;
export const ResultTableBody = styled.tbody`

`
export const ResultRow = styled.tr`
width: 96%;
height: 0.3rem !important;
 /* border: 2px solid red;  */
 border-radius: 1rem;
 /* padding:0.1rem 1rem; */
 margin: 0 0.5rem;
`
export const LetterContainer = styled.div`
width: 95%;
min-height:60vh;
display:flex;
flex-direction:column;
padding: 0.6rem 1.2rem;
overflow-y:auto;
/* border: 2px solid green; */
border-radius:1rem;
`
export const Dear = styled.p`
    font-size: 1rem;
    color: black;
    white-space: pre-wrap; 
    line-height: 1.2;
`
export const QuillContainer = styled.div`
  width:98%;
  min-height:50vh;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
  border-radius: 1rem;
  margin: 0.4rem 0.4rem 0 0.4rem;
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5); */
  background-color:white;
  overflow: hidden;
  border:0.5px solid black;

  /* border: 2px solid red; */

  &::-webkit-scrollbar {
    width: 3px;
  }
`
// ToggleSwitch.styles.js

export const ToggleSwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
`;

export const ToggleInput = styled.input`
  display: none;
`;

export const ToggleLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 24px;
  background-color: ${props => (props.checked ? '#216804' : '#bdbebc')};
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.3s;

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: #fff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s;
    transform: ${props => (props.checked ? 'translateX(16px)' : 'translateX(0)')};
  }
`;
