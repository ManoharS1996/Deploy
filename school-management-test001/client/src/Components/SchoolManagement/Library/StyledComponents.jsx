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
export const StudentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2rem 1rem;
  width: 100%;
  transition: transform 0.4s ease;
  /* border:2px solid red; */
`;
export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;
  width: 100%;
  transition: transform 0.4s ease;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  /* border:2px solid red; */
`;
export const TopContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 0.6rem;
`
export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 5px 1px #ccc;
  background-color: white;
  flex-grow: 0;
  padding:0.8rem;

  &::-webkit-scrollbar {
    width: 3px;
  }
`;
export const FormHeading = styled.h1`
  font-size: 1.2rem;
  color: darkgreen;
  font-weight: bold;
`
export const Forms = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  width: 100%;
  margin-top: 0rem;
  overflow-y:auto;

`;
export const FormName = styled.p`
  color: black;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem 0rem 1rem;
  margin-bottom: 0;
`
export const Heading = styled.h1`
  font-size: 1.4rem;
  color: darkgreen;
  padding: 0 0 0.4rem 0;
  margin: 0;
`
export const CloseIcon = styled.div`
height: 30px;
width: 30px;
cursor: pointer;
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.6rem 0.6rem 0.6rem 0.2rem;
`;
export const InputContainerSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border: 0;
  border-radius: 1rem;
  width: 35vw;
  /* box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5); */
  box-shadow: 2px 2px 4px #999; /* Small shadow */

`;
export const SearchIcon = styled.div`
  padding: 0.2rem 0.4rem 0.2rem 0.5rem;
`;
export const InputSearch = styled.input`
  border: 0;
  padding: 0.4rem;
  border-radius: 1rem;
  outline: none;
  font-size: 0.9rem;
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
export const AddButton = styled.button`
background-color: darkgreen;
    border: 0;
    border-radius: 1rem;
    color: white;
    width: 8rem;
    margin: 1.5rem;
    align-self: flex-end;
`
export const InputElements = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  /* padding:0; */
   margin:0;
`;

export const InputContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0rem 0rem;
    padding: 0.1rem 0.5rem;
    font-family: 'Segoe UI', sans-serif;
    margin: 1.5rem 0 0 0;
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
    text-transform: capitalize;
    
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
`;

export const DescriptionInput = styled.textarea`
  font-size: 100%;
    height: 5rem;
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
export const InputContainerDiff = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0rem rem;
    padding: 0.1rem 0.5rem;
    font-family: 'Segoe UI', sans-serif;
    margin: 1.5rem 0;
    position: relative;
`
export const InputMarks = styled.input`
    width:90%;
    border-radius:0.5rem;
    outline:none;
    border: 1.5px solid #dfe1df ;
    background-color: transparent;
    /* border:0; */
    
`
export const UnderContainer = styled.div`
  width:98%;
  /* height: 65vh; */
  display: flex;
  flex-direction:column;
  justify-content:flex-start;
  /* align-items: center; */
  border-radius: 1rem;
  padding: 0.1rem 0.5rem 0 0 ;
  /* margin: 0.1rem; */
  flex-grow: 0;
  /* overflow-y:auto; */

  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5); */
  /* background-color:#f0f0f0; */

  /* border: 2px solid red; */

  &::-webkit-scrollbar {
    width: 3px;
  }
`;
export const TableContainer = styled.div`
  width: 100%;
  /* height:40vh; */
  display: flex;
  overflow-y: auto;
  overflow-x:auto;
  align-self:center;
  border-radius: 1rem;
  margin: 0.4rem 0 0 0.5rem;
  flex-grow: 1;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.5);
  background-color:#fbfbfb;
  /* border: 1.5px solid green; */


  /* border: 2px solid red; */

  &::-webkit-scrollbar {
    width: 3px;
  }
`;
export const Table = styled.table`
  width: 100%;
  height: fit-content;
  border-collapse: collapse;
  border-radius: 1rem;
  overflow-x:auto;
  /* border: 2px solid red; */
`;
export const TableHeading = styled.thead`
  width: 100%;
  height: 2rem;
  position: sticky;
  text-align: left;
  background-color:#026902;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);

`
export const TableHead = styled.th`
  height: 2.5rem;
  background-color: transparent;
  top: 0;
  z-index: 5;
  padding: 0rem 1rem;
  color: white;
`;
export const TableBody=styled.tbody`
   overflow-y: auto;

`
export const Rows = styled.tr`
  width: 100%;
  height: 0.3rem !important;
   /* border: 2px solid red;  */
  padding: 0.5rem 1rem;

`
export const TableData = styled.td`
  padding:0.6rem 0 0.4rem 1rem;
  outline: none;
  font-size:0.9rem;
`;
export const BookTableContainer = styled.div`
  width:100%;
  /* height:40vh; */
  display: flex;
  overflow-y: auto;
  overflow-x:auto;
  /* align-self:center; */
  border-radius: 1rem;
  margin: 0.2rem 0 0 1rem;
  flex-grow: 1;
  /* box-shadow: -5px 0 10px rgba(0, 0, 0, 0.5); */
  background-color:transparent;
  /* border: 1.5px solid green; */


  /* border: 2px solid red; */

  &::-webkit-scrollbar {
    width: 3px;
  }
`;
export const BookTable = styled.table`
  width: 100%;
  height: fit-content;
  border-collapse: collapse;
  border-radius: 1rem;
  overflow-x:auto;
  /* border: 2px solid red; */
`;
export const BookTableHeading = styled.thead`
  width: 100%;
  height: 2rem;
  position: sticky;
  text-align: left;
  background-color:#026902;
  /* box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5); */
  
`
export const BookButton = styled.button`
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
export const BooksContainer=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0.6rem;
border:1.5px solid green;
border-radius:0.5rem;
padding: 0.5rem;
cursor:pointer;
`
export const BookIcon=styled.div`
color:${props=>(props.status=="Available" ? '#157a02':'#a6a5a5')};
`
export const BookName=styled.span`
font-size:1rem;
padding:0.3rem 0.2rem 0.2rem 0.2rem;
`
export const BookNames = styled.div`
    display: flex;
 flex-direction: row;
 justify-content: flex-start;
 /* align-items:center; */
 padding: 0.5rem 0 0 1rem;
 margin: 0;
 color: black;
     /* border: 1px solid red; */

`
export const BookTitle = styled.h1`
    font-size: 1rem;
    padding: 0;
    /* border: 1px solid red; */
    margin:0;

   
`
export const BookAuthor = styled.p`
    font-size: 0.85rem;
    padding: 0 0 0 0.5rem;
    margin:0;

    /* align-self:right; */
    /* border: 1px solid red; */

`