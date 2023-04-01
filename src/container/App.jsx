import react, { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StudentDeployment from "../Pages/StudentDeployment/StudentDeployment";
import Admin from "../Pages/Admin/Admin";
import Navbar from "../components/Navbar/Navbar";

function App() {

  const [access, setAccess] = useState(false);

  return (
    <div className="App">
       <Navbar access = {access}/>
      { access ? <StudentDeployment setAccess = {setAccess} access = {access}/>: <Admin setAccess = {setAccess} access = {access}/>  
    }

    </div>
  );
}

export default App;
