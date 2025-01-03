import {
    NavContainer,
    NavHeadContainer,
    Button,
    OptionContainer, Option,
    IconsContainer,
    Icon,
    IconName,
} from "./StyledComponents";

import {IoIosArrowBack,MdDashboard,LuSchool,PiStudentFill,GoPeople,FaCalculator,MdOutlinePayments,HiOutlineAcademicCap,IoDocumentTextSharp,MdEmojiTransportation,IoLibrarySharp,
    FaBoxOpen,IoMdSettings,FaHandHoldingHeart,SlCalender,} from '../../../shared/icons'

// import { useState } from "react";
import Context from "../../../Context/Context";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { useContext } from "react";


// import { IoIosArrowBack } from "react-icons/io";
// import { MdDashboard } from "react-icons/md";
// import { LuSchool } from "react-icons/lu";
// import { PiStudentFill } from "react-icons/pi";
// import { GoPeople } from "react-icons/go";
// import { FaCalculator } from "react-icons/fa6";
// import { MdOutlinePayments } from "react-icons/md";
// import { HiOutlineAcademicCap } from "react-icons/hi";
// import { IoDocumentTextSharp } from "react-icons/io5";
// import { MdEmojiTransportation } from "react-icons/md";
// import { IoLibrarySharp } from "react-icons/io5";
// import { FaBoxOpen } from "react-icons/fa";
// import { IoIosNotifications } from "react-icons/io";
// import { IoMdSettings } from "react-icons/io";
// import { FaHandHoldingHeart } from "react-icons/fa";
// import { SlCalender } from "react-icons/sl";

const SideNavbar = () => {
    const { isSmall } = useContext(Context)

    // const [small, setSmall] = useState(isSmall);

    // const onClick = () => {
    //     setSmall(!isSmall);
    // };


    const TabOptions = [
        { name: 'Dashboard', label: 'Dashboard', link: '/dashboard', icon: <MdDashboard size={isSmall ? "20" : "23"} /> },
        { name: 'Institutes', label: 'Institutes', link: '/schoolList', icon: <LuSchool size={isSmall ? "20" : "23"} /> },
        { name: 'Students', label: 'Students', link: '/studentsList', icon: <PiStudentFill size={isSmall ? "20" : "23"} /> },
        { name: 'Staff', label: 'Staff', link: '/staffList', icon: <GoPeople size={isSmall ? "20" : "23"} /> },
        { name: 'Fees', label: 'Fees', link: '/feeTable', icon: <FaCalculator size={isSmall ? "20" : "23"} /> },
        { name: 'Billing', label: 'Billing', link: '/billing', icon: <MdOutlinePayments size={isSmall ? "20" : "23"} /> },
        { name: 'Academics', label: 'Academics', link: '/academics', icon: <HiOutlineAcademicCap size={isSmall ? "20" : "23"} /> },
        { name: 'Circulars', label: 'Circulars', link: '/circular', icon: <IoDocumentTextSharp size={isSmall ? "20" : "23"} /> },
        { name: 'Transportation', label: 'Transportation', link: '/transportList', icon: <MdEmojiTransportation size={isSmall ? "20" : "23"} /> },
        { name: 'Library', label: 'Library', link: '/libraryView', icon: <IoLibrarySharp size={isSmall ? "20" : "23"} /> },
        { name: 'Inventory', label: 'Inventory', link: '/inventory', icon: <FaBoxOpen size={isSmall ? "20" : "23"} /> },
        { name: 'Care', label: 'Care', link: '/care', icon: <FaHandHoldingHeart size={isSmall ? "20" : "23"} /> },
        { name: 'Calendar', label: 'Calender', link: '/newCalendar', icon: <SlCalender size={isSmall ? "20" : "23"} /> },
        { name: 'Settings', label: 'Settings', link: '/example', icon: <IoMdSettings size={isSmall ? "20" : "23"} /> },

    ]

    return (
        <Context.Consumer>
            {(value) => {
                const { activeTab, isSmall, setActiveTab, setSmall } = value
                const onClickTab = (tab) => {
                    // console.log(tab)
                    setActiveTab(tab)
                }
                const onClick = () => {
                    setSmall(!isSmall);
                };

                return (
                    <NavContainer isActive={isSmall}>
                        {/* <Logo>School Name or Logo</Logo> */}
                        <Button isActive={isSmall} type="button" onClick={onClick}>
                            <IoIosArrowBack style={{ color: "black" }} />
                        </Button>
                        <NavHeadContainer>


                            <IconsContainer isActive={isSmall}>
                                {TabOptions.map(each => (
                                    <Link key={each.label} to={each.link}>
                                        <OptionContainer key={each.label} active={activeTab === each.label} isActive={isSmall} onClick={() => onClickTab(each.label)}>
                                            <Option isActive={isSmall} active={activeTab === each.label}>
                                                <Icon isActive={isSmall} active={activeTab === each.label} data-tooltip-id="sidenav" data-tooltip-content={each.label}
                                                    style={{ cursor: "pointer" }} size={20}>{each.icon}</Icon>
                                                {!isSmall && <Tooltip
                                                    noArrow
                                                    id="sidenav"
                                                    place="right"       // Position the tooltip at the top
                                                    effect="solid"    // Solid background for the tooltip
                                                    delayHide={300}   // Delay before the tooltip hides
                                                    style={{
                                                        backgroundColor: '#f3f3f3', // Green background
                                                        color: '#000',             // White text
                                                        borderRadius: '0.2rem', // Optional: rounded corners
                                                        zIndex: "1000",
                                                        // whiteSpace: "pre-wrap",
                                                        height: "fit-content",
                                                        width: "fit-content",
                                                        padding: "0.2rem 0.5rem",
                                                        boxShadow: "0px 0px 0.2rem 0.05rem rgba(0, 0, 0, 0.1)",
                                                    }}
                                                />}

                                                {isSmall && <IconName active={activeTab === each.label}>{each.name}</IconName>}
                                            </Option>
                                        </OptionContainer>
                                    </Link>
                                ))

                                }
                            </IconsContainer>
                        </NavHeadContainer>
                    </NavContainer>
                )
            }}


        </Context.Consumer>
    );
};
export default SideNavbar;
