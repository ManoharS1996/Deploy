import PropTypes from "prop-types";
import styled from "styled-components";

import { IoIosAddCircleOutline } from '../icons'

export const Button = styled.button`
  display:flex ;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.9rem;
  background-color: darkgreen;
  border: 0;
  border-radius: 50px;
  color: white;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
  padding: 0.2rem 1rem 0.2rem 0.2rem;
  margin: 0rem 0rem 0rem 0;
  align-self: flex-end;
  text-transform: uppercase;
  gap:0.5rem;
`;

const AddButton = ({ addfun, buttonname }) => {
    return (
        <Button type="button" onClick={addfun}>
            <IoIosAddCircleOutline size={25} />
            <span>{buttonname}</span>
        </Button>
    )
};
AddButton.propTypes = {
    buttonname: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
    addfun: PropTypes.func.isRequired,
};
export default AddButton;
