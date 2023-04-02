import React, { useRef, useEffect, useState, createRef } from "react";
import { useMediaQuery } from '@mui/material'
import { TextField, Button } from '@mui/material';
import adminCSS from "./Admin.module.css";
import plm from "../../assets/plm.png";
import logo from "../../assets/logo.png"
const Admin = ({ setAccess, setPage }) => {

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

      <div className={adminCSS.adminParent}>
        <div className={adminCSS.adminWrapper}>
          <div className={adminCSS.leftAdmin}>
     
          <img src={plm} alt="" />
          </div>

          <div className={adminCSS.rightAdmin}>
          <div className={adminCSS.authTitleWrapper}>
            <h2>ADMIN LOGIN</h2>      
          </div>
          
          <div className={adminCSS.authWrapper}>
          <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                defaultValue="Small"
                size="small"
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                defaultValue="Small"
                size="small"
                margin="normal"
              />
              <Button 
                onClick={() => {
                  setAccess(true)
                  setPage('blockUtil')
                }}
                variant="contained" 
             
                sx = {{
                  fontSize: isSmallScreen ? "1rem" : "1.3rem",
                  fontFamily: "Lato",
                  fontWeight: "700",
                  borderRadius: "6px",
                  marginTop: "1rem"
                }}
              >
                Login
              </Button>
            </form>
          </div>
          
          </div>


          
        </div>

      </div>
    </>
  );
};

export default Admin;
