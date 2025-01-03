import styled from "styled-components";

import { CountrySelect } from "react-country-state-city";

export const Country = styled(CountrySelect)`
  .stdropdown-container {
    text-align: left;
    border: 1px solid #ccc !important;  /* Make sure it overrides other styles */
    position: relative;
    border-radius: 1rem;
  }

  /* Optionally target the select dropdown itself */
  .stdropdown-container select {
    padding: 8px 12px;
    font-size: 16px;
    background-color: #f4f4f9;
  }

  /* If you want to style the dropdown button (if available) */
  .stdropdown-container .dropdown-toggle {
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 1rem;
    background-color: #fff;
    font-size: 14px;
    color: #333;
  }
  .stdropdown-input .stsearch-box{
    border-radius:1rem;
    outline:0;
    border-color:transparent;
  }
  .selectcountry{
    border-radius: 1rem;
  }
`;


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
  padding: 0.2rem 0.6rem 0rem 0.6rem;
`
export const InputElements = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

export const InputContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0rem 0.2rem 0rem;
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
    border: 1.5px solid  #dfe1df ;
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

export const Both=styled.div`
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
/* margin: 0; */
padding:0rem 0.8rem;
`
export const Radio=styled.div`
    height: 15px;
    width: 15px;
    margin: 0;
    padding:0;
`
export const RadioName=styled.span`
padding:0.5rem 0 0 0.2rem;
font-size: 0.9rem;
    
`
export const Normal=styled.span`
color: black;
font-size: 1rem;
margin-top: -0.5rem;
padding:0;
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
export const CustomCountry =styled.div`
  width: '250px';
  padding: '10px';
  border: '1px solid #ccc';
  border-radius: '5px';
  background-color: '#f9f9f9';
  font-size: '14px';
`;