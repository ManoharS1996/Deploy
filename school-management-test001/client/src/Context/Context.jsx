import React from "react";
const Context=React.createContext({
    activeTab:'Dashboard',
    isSmall:true,

    setActiveTab:()=>{},
    setSmall:()=>{},

})

export default Context