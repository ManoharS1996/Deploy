import PropTypes from "prop-types";

import styled from "styled-components";

export const Button = styled.button`
  display:flex ;
  align-items: center;
  font-size: 0.9rem;
  background-color: darkgreen;
  border: 0;
  border-radius: 0.8rem;
  color: white;
  width: fit-content;
  cursor: pointer;
  padding: 0.4rem 1.2rem;
  margin: 0.8rem 2rem 1rem 0;
  align-self: flex-end;
  text-transform: uppercase;
`;
const SubmitButton = ({ funsubmit,buttonname }) => {
  return <Button onClick={funsubmit}>{buttonname}</Button>;
};
SubmitButton.propTypes = {
  funsubmit: PropTypes.func.isRequired,
  buttonname: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
};
export default SubmitButton;
