import { MainContainer, BottomContainer, SideContainer, TabContainer, Tabs, TabIcon, TabName } from "./StyledComponents"

import { useNavigate } from "react-router-dom";

import SideNavbar from "../SideNavbar/SideNavbar";
import Header from "../Header/Header";

import { LuCalendarCheck } from "react-icons/lu";
import { LuBookOpenCheck } from "react-icons/lu";
import { MdOutlineAssignment } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";
import { TbWriting } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

//fc8e03,04b40f,d4b806,8005a2,dc0677

const Academics = () => {
    const navigate = useNavigate()

    const tabs = [
        { name: "Attendence", id: "createAttendence", colors: "#ff006d", icon: <LuCalendarCheck size={50} /> },
        { name: "Diary", id: "diary", colors: "#01befe", icon: <LuBookOpenCheck size={50} /> },
        { name: "Assignments", id: "assignments", colors: "#ff7d00", icon: <MdOutlineAssignment size={50} /> },
        { name: "Class Notes", id: "classNotes", colors: "#d3cf06", icon: <GiWhiteBook size={50} /> },
        { name: "Exams", id: "exams", colors: "#8f00ff", icon: <TbWriting size={50} /> },
        { name: "Results", id: "result", colors: "#0ea007", icon: <VscGraph size={50} /> },
    ]

    const onClickTab = (id) => {
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
                            <Tabs key={each.name} style={{ background: each.colors }} onClick={() => onClickTab(each.id)}>
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
export default Academics