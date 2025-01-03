import { MainContainer,BottomContainer,SideContainer } from "./StyledComponents"
import SideNavbar from "../SideNavbar/SideNavbar"
import Header from "../Header/Header"

const PayRoll = () => {
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

export default PayRoll