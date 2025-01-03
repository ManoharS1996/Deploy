import PropTypes from "prop-types";
import styled from "styled-components";

import SearchBar from "./search";
import AddButton from "./AddButton";

import { CgMoreO } from '../icons'
import { Tooltip } from 'react-tooltip';


export const SearchContainerLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.6rem;
`;

export const IconsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 10vw;
`

const SearchContainer = ({ buttonname, search, setSearch, addfun }) => {

    return (
        <SearchContainerLine>
            <SearchBar search={search} setSearch={setSearch} />
            <IconsContainer >
                <AddButton addfun={addfun} buttonname={buttonname} />
                <div>
                    <CgMoreO style={{ color: "darkgreen" }} data-tooltip-id="more" data-tooltip-content={`Download`} size={26} />
                    <Tooltip
                        // noArrow
                        id="more"
                        place="bottom-left"       // Position the tooltip at the top
                        effect="solid"    // Solid background for the tooltip
                        delayHide={300}   // Delay before the tooltip hides
                        style={{
                            backgroundColor: '#f3f3f3', // Green background
                            color: '#000',             // White text
                            borderRadius: '0.2rem', // Optional: rounded corners
                            zIndex: "100",
                            // whiteSpace: "pre-wrap",
                            height: "fit-content",
                            width: "fit-content",
                            padding: "0.2rem 0.5rem",
                            boxShadow: "0px 0px 0.2rem 0.05rem rgba(0, 0, 0, 0.1)",
                        }}
                    />
                </div>
            </IconsContainer>
        </SearchContainerLine>

    )
};

SearchContainer.propTypes = {
    buttonname: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
    addfun: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
};
export default SearchContainer;
