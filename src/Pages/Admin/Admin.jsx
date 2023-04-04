import React, { useRef, useEffect, useState, createRef } from "react";
import { useMediaQuery } from '@mui/material'
import { TextField, Button } from '@mui/material';
import adminCSS from "./Admin.module.css";
import plm from "../../assets/plm.png";
import logo from "../../assets/logo.png"
const Admin = ({ setAccess, setPage, access, currentApp }) => {

  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };
  return (
    <>
      
      <img className={adminCSS.logo} src={logo} alt="" />
      <div className={`${adminCSS.adminParent} ${access === false ? adminCSS.shrink2 : ""}`}>
        <div className={adminCSS.adminWrapper}>
          <div className={adminCSS.leftAdmin}>
     
          
          </div>

          <div className={adminCSS.rightAdmin}>
            <div className={adminCSS.rightAdminWrapper}>
          <div className={adminCSS.authTitleWrapper}>
            <h2>ADMIN LOGIN</h2>      
          </div>
          
          <div className={adminCSS.authWrapper}>
          
          <form onSubmit={handleSubmit}>
          {/* <img className={adminCSS.logoAuth} src={logo} alt="" /> */}
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                defaultValue= {isSmallScreen ? "Small" : "Large"}
                size={isSmallScreen ? "small" : "large"}
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                defaultValue= {isSmallScreen ? "Small" : "Large"}
                size={isSmallScreen ? "small" : "large"}
                margin="normal"
              />
              <Button 
                onClick={() => {
                  setAccess(true)
                  {
                    currentApp === "student" ? setPage('blockUtil') : setPage('schedsummary')
                  }
              
                }}
                variant="contained" 
             
                sx = {{
                  fontSize: isSmallScreen ? "1rem" : "1.3rem",
                  fontFamily: "Lato",
                  fontWeight: "700",
                  borderRadius: "6px",
                  marginTop: "2rem",
                  background: "#0d4daa",
                  width: "100%"
                }}
              >
                Login
              </Button>
            </form>
          </div>
              
            </div>
          
          </div>


          
        </div>

      </div>
    </>
  );
};

export default Admin;
