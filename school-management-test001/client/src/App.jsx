import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from 'react-router-dom'
import { useState } from "react";
import Context from "./Context/Context";
// import './App.css'
import router from './Router'

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [isSmall, setSmall] = useState(true);


  const onClickTab=(tab)=>{
    setActiveTab(tab)
    console.log(tab)
  }
  const onClick = () => {
    setSmall(!isSmall);
};

  return (
    <Context.Provider
      value={{
        activeTab,isSmall,

        setActiveTab:onClickTab,
        setSmall:onClick,
      }}
    >
      <RouterProvider router={router} />
    </Context.Provider>
      
  )
}

export default App
