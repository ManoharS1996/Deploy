import PropTypes from 'prop-types';

import { IoMdClose } from "../icons";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #de0404;
  background-color: transparent;
  /* border:1.5px solid red; */
  border-radius: 50%;
  outline: none;
  padding: 0.1rem;
  margin: 0 0.5rem 0.2rem 0 ;
  cursor: pointer;
/* box-sizing: content-box; */

  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
    background-color: #ffecec; /* Change background color on hover */
    border:1px solid red; /* Remove border on hover */
  }

   &:focus {
    outline: none; 
    border: none; 
  } 
`;

const CloseButton = ({fun}) => {
    return (
        <Button onClick={fun}>
            <IoMdClose size={20} />
        </Button>
    );
};

CloseButton.propTypes = {
    fun: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
};

export default CloseButton;
