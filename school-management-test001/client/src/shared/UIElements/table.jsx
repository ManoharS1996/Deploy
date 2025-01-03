import PropTypes from "prop-types";
import styled from "styled-components";
import { FaEdit } from "../icons";

export const Button = styled.button`
  border: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.5); /* Add shadow on hover */
    background-color: rgba(173, 255, 47, 0.4); /* Change background color on hover */
  }

`;

const TableContainer = styled.div`
  height: 80%;
  min-width:100%;
  max-width: 100%;
  display: flex;
  border-radius: 1rem;
  margin: 0 0 0.5rem 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  background-color: #fbfbfb; /* border: 2px solid red; */
  flex-grow: 1;
  overflow:hidden;

  &::-webkit-scrollbar {
    width: 3px;
  }
`;
const Table = styled.table`
min-width:100%;
  max-width: 100%;
  height: fit-content;
  border-collapse: collapse;
  border-radius: 1rem;
  /* border: 2px solid red; */
  overflow-x: auto;
`;
const TableHeading = styled.thead`
  width:auto;
  min-width: 100%;
  height: 2rem;
  /* position: sticky; */
  text-align: left;
  background-color: #026902;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
`;
const TableHead = styled.th`
  height: 2.5rem;
  background-color: transparent;
  top: 0;
  /* z-index: -1; */
  padding: 0rem 1.2rem;
  color: white;
  white-space: nowrap; /* Prevent header text from wrapping */

`;
const TableBody = styled.tbody`
height:fit-content;
  overflow-y: auto;
  overflow-x: auto;
`;
const Rows = styled.tr`
  width: 100%;
  /* height:2rem; */
  /* height: 0.3rem !important; */
  /* border: 2px solid red;  */
  padding: 0.5rem 1rem;
`;
const TableData = styled.td`
  padding: 0.6rem 0 0.4rem 1rem;
  /* margin:0 1rem; */
  outline: none;
  /* height:2rem; */
`;

const TableComponent = ({ headings, rows, datas,pass, editfun }) => {

  // const names = Object.keys(datas[0]);
  // const readableColumns = names.map((each) => {
  //   return (
  //     each
  //       .replace(/_/g, " ") // Replace underscores with space
  //       .replace(/([A-Z])/g, " $1") // Add space before capital letters
  //       .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter

  //       // Capitalize the first letter of each word
  //       .replace(/\b\w/g, (str) => str.toUpperCase())
  //   );
  // });
  // console.log(datas[headings]);
  // console.log(datas)

  return (
    <TableContainer>
      <Table>
        <TableHeading>
          <Rows>
            {headings.map((each) => (
              <TableHead key={each}>{each}</TableHead>
            ))}
          </Rows>
        </TableHeading>
        <TableBody>
          {datas.map(one => (
            <Rows key={one}>
              {rows.map((each) => (
                <TableData key={each}>{one[each]}</TableData>
              ))}
              <TableData>
                <Button
                  style={{ padding: "0", outline: "none" }}
                  onClick={() => editfun(one[pass])}
                >
                  <FaEdit style={{ color: "#027f19" }} size={20} />
                </Button>
              </TableData>
            </Rows>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
TableComponent.propTypes = {
  headings: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
  datas: PropTypes.func.isRequired,
  rows: PropTypes.func.isRequired,
  editfun: PropTypes.func.isRequired,
  pass:PropTypes.func.isRequired,
};
export default TableComponent;
