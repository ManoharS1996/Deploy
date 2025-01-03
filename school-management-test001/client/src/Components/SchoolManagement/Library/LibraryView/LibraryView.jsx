import { MainContainer, BottomContainer, SideContainer, TabContainer, Tabs, TabIcon, TabName } from "./StyledComponents"

import { useNavigate } from "react-router-dom";

import SideNavbar from "../../SideNavbar/SideNavbar";
import Header from "../../Header/Header";

import { GiOpenBook } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";


//fc8e03,04b40f,d4b806,8005a2,dc0677

const LibraryView = () => {
    const navigate=useNavigate()

    const tabs = [{ name: "Books",id:"library", colors: "#279202", icon: <GiOpenBook  size={50} /> },
    { name: "Users",id:"users", colors: "#279202", icon: <FaUsers  size={50} />},
    ]

    const onClickTab=(id)=>{
        console.log(id)
        navigate(`/${id}`)
    }

    return (
        <MainContainer>
            <Header />
            <BottomContainer>
                <SideNavbar />
                <SideContainer>
                    <TabContainer>
                        {tabs.map((each) => (
                            <Tabs key={each.name} style={{background: each.colors}} onClick={() => onClickTab(each.id)}>
                                <TabIcon>{each.icon}</TabIcon>
                                <TabName>{each.name}</TabName>
                            </Tabs>)
                        )}
                    </TabContainer>
                </SideContainer>
            </BottomContainer>
        </MainContainer>
    )

}
export default LibraryView