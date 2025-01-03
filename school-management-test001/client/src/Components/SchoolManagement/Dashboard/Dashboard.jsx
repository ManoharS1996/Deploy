import { MainContainer,BottomContainer,SideContainer } from "./StyledComponents"
import SideNavbar from "../SideNavbar/SideNavbar"
import Header from "../Header/Header"

const Dashboard = () => {
    return(
        <MainContainer>
            <Header/>
            <BottomContainer>
                <SideNavbar/>
                <SideContainer>


                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )
}

export default Dashboard