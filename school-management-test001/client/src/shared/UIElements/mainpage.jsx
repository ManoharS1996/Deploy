import PropTypes from "prop-types";
import styled from "styled-components";

import SideNavbar from "../../Components/SchoolManagement/SideNavbar/SideNavbar";
import Header from "../../Components/SchoolManagement/Header/Header";



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
export const ListContainer = styled.div`
height: 92vh;
  display: flex;
  flex-direction: column;
  /* padding: 0.2rem; */
  width: 100%;
  transition: transform 0.4s ease;
  /* border:2px solid red; */
`;
const MainPage = ({work}) => {
    return (
    <MainContainer>
        <Header/>
       <BottomContainer>
        <SideNavbar/>
        <ListContainer>
            {work}
        </ListContainer>
       </BottomContainer>
    </MainContainer>
    )
};
MainPage.propTypes = {
    work:PropTypes.func.isRequired,
    name: PropTypes.func.isRequired, // Ensure `fun` is a function and is required
    buttonname:PropTypes.func.isRequired,
    addfun:PropTypes.func.isRequired,
    fun:PropTypes.func.isRequired,
    headings:PropTypes.func.isRequired,
    datas:PropTypes.func.isRequired,
    pass:PropTypes.func.isRequired,
    
};
export default MainPage;
