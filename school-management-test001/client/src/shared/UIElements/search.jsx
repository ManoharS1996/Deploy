import PropTypes from "prop-types";
import styled from "styled-components";

import { FaSearch } from '../icons'

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
  width:100%;
`;
const SearchBar = ({search,setSearch}) => {

  const handleSearch = (e) => {
    setSearch(e.target.value); // Directly set the input value
  }

  return (
    <InputContainer>
      <SearchIcon><FaSearch size={18} /></SearchIcon>
      <Input value={search} onChange={(e) => handleSearch(e)} placeholder="Enter Details" />
    </InputContainer>
  )
};

SearchBar.propTypes = {
  search: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
  setSearch:PropTypes.func.isRequired,
};

export default SearchBar;
