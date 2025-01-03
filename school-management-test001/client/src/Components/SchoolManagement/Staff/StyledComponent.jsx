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
export const Heading = styled.h1`
  font-size: 1.4rem;
  color: darkgreen;
  padding: 0 0 0.4rem 0;
  margin: 0;
`
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
`;
export const InputContainer = styled.div`
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
export const Input = styled.input`
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
export const TableContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-y: auto;
  border-radius: 1rem;
  /* margin: 0.4rem; */
  flex-grow: 1;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  background-color:#fbfbfb;


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
export const Rows = styled.tr`
  width: 100%;
  height: 0.3rem !important;
   /* border: 2px solid red;  */
  padding: 1rem 1rem;

`
export const TableData = styled.td`
  padding:0.6rem 0 0.4rem 1rem;
`;

