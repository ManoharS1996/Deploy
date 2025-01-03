import PropTypes from "prop-types";
import styled from "styled-components";

import CloseButton from "./closeButton";


export const FormTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0.5rem 0.5rem;
  height: 6vh;
  width:100%;
  /* box-sizing: content-box; */
`
export const FormHeading = styled.h1`
  font-size: 1.2rem;
  color: darkgreen;
  font-weight: bold;
`

const TopContainer = ({formname,fun}) => {
    // console.log(formname)
    return (
        <FormTopContainer>
            <FormHeading>{formname}</FormHeading>
            <CloseButton fun={fun} />
        </FormTopContainer>
        
    )
};

TopContainer.propTypes = {
    formname: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
    fun:PropTypes.func.isRequired,
};
export default TopContainer;
