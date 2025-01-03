import PropTypes from "prop-types";
import styled from "styled-components";

import SearchContainer from "./searchContainer";
import TableComponent from "./table";


export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2rem 1rem;
  height: 100%;
  width: 100%;
  transition: transform 0.4s ease;
  /* border:2px solid red; */
`;
export const Heading = styled.h1`
  font-size: 1.4rem;
  color: darkgreen;
  margin: 0;
`
const ListView = ({name,buttonname,search,setSearch,pass,addfun,headings,rows,datas,editfun }) => {

    return (
    <ListContainer>
        <Heading>{name}</Heading>
        <SearchContainer search={search} setSearch={setSearch} buttonname={buttonname} addfun={addfun}/>
        <TableComponent headings={headings} rows={rows} datas={datas} pass={pass} editfun={editfun}/>
    </ListContainer>
    )
};
ListView.propTypes = {
    name: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
    buttonname:PropTypes.func.isRequired,
    addfun:PropTypes.func.isRequired,
    editfun:PropTypes.func.isRequired,
    headings:PropTypes.func.isRequired,
    datas:PropTypes.func.isRequired,
    rows:PropTypes.func.isRequired,
    search:PropTypes.func.isRequired,
    setSearch:PropTypes.func.isRequired,
    pass:PropTypes.func.isRequired,
};
export default ListView;
