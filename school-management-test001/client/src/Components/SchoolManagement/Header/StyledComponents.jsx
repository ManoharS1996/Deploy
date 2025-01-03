import styled from "styled-components";

export const MainContainer=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 8vh;
    color: black;
    background-color:#f1fcf0;
    padding: 0 0.4rem;
    /* border: 2px solid red; */
`
export const HeaderContainer=styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    /* margin: 10px; */
    width: 100vw;
    /* border: 2px solid red; */
`
export const FirstContainer=styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
`
export const Title=styled.h1`
    font-size: 22px;
    font-weight: 600;
    width: 14vw;
    padding-left: 20px;
`
export const DateTimeContainer=styled.div`
    border: 0;
    border-radius:1rem;
    background-color:white;
    font-size: 0.8rem;
    width: 15rem;
    height: 90%;
    margin-right:0.8rem;
    padding: 0 0.5rem;
`
export const ProfileImage=styled.img`
    border: 0;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
`
