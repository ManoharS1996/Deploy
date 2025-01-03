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
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  /* border:2px solid red; */
`;

export const TabContainer=styled.div`
height: 60%;
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-start;
flex-wrap: wrap;
padding: 2rem 0 0 1rem;
`

export const Tabs=styled.div`
 height: 8rem;
 width: 18rem;
 border-radius:1rem;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items:center;
 background-color: green;
 margin: 0 1rem;
 padding: 0;

`
export const TabIcon=styled.div`
color: white;
`
export const TabName=styled.h1`
    font-size: 1.5rem;
    padding-top:0.5rem;
    color: white;
`