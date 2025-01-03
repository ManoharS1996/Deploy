import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f1fcf0;
`;
export const BottomContainer = styled.div`
  display: flex;
  height: 92vh;
  flex-direction: row;
  width: 100vw;
`;
export const StudentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem 0.5rem 1rem;
  transition: transform 0.4s ease;
  /* border:2px solid red; */
`;
export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 5px 1px #ccc;
  background-color: white;
  flex-grow: 0;
  padding:0.8rem;


  &::-webkit-scrollbar {
    width: 3px;
  }
`;
export const TopContainer=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 0.5rem;
`
export const FormHeading = styled.h1`
  font-size: 1.2rem;
  color: darkgreen;
  font-weight: bold;
`
export const CloseIcon=styled.div`
height: 30px;
width: 30px;
cursor: pointer;
`

export const FormTop=styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items:center;
padding-top: 0.5rem;
`

export const Forms = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;
export const FormName = styled.p`
  color: black;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem 0.6rem 0.6rem;
  margin-bottom:0;
`
export const InputElements = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin:0;
  /* margin-bottom:0.1rem; */

`;

export const InputContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0.2rem 0rem;
    padding: 0.1rem 0.5rem;
    font-family: 'Segoe UI', sans-serif;
    margin: 0.9rem 0;
    position: relative;
    border:0;
`
export const Input = styled.input`
  font-size: 100%;
    height: 2.5rem;
    width: 100%;
    padding: 0.8em;
    outline: none;
    border: 1.5px solid  #dfe1df ;
    background-color: transparent;
    border-radius: 1rem;
    width: 100%;
    
    &:focus,
    &:valid {
        border-color: #dfe1df;
        background-color: transparent;
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
    z-index:10;

    ${Input}:focus + &,
    ${Input}:valid + & {
        top: 0;
        transform: translateY(-50%) scale(0.9);  
        margin-left: 1rem;
        padding: 0.2em 0.5em;  
        background-color: white;  
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
export const InputNameForDetail = styled.label`
  font-size: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%) scale(0.9);  
    padding: 0.2em 0.5em;  
    margin-left: 1rem;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #242524;
    background-color: white;
`;

export const Both = styled.div`
display: flex;
flex-direction:row;
justify-content: flex-start;
margin: -0.5rem;
padding:0 0 0 2rem;
`

export const RadioContainer=styled.div`
display: flex;
flex-direction:row;
justify-content: flex-start;
margin: 0;
padding:0.5rem 1.5rem;
`
export const Radio=styled.div`
    height: 20px;
    width: 20px;
    margin: 0;
    padding:0;
`
export const RadioName=styled.span`
padding:0.2rem 0 0 0.2rem;
font-size: 0.9rem;
    
`
export const Normal=styled.span`
color: black;
font-size: 0.9rem;
margin-top: -1rem;
`


export const Button=styled.button`
 background-color: darkgreen;
    border: 0;
    border-radius: 1rem;
    color: white;
    width: 8rem;
    margin: 1.5rem;
    align-self: flex-end;
`