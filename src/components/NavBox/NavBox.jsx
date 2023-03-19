import React, {useEffect, useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import navbarCSS from "./NavBox.module.css";
import logo from "../../assets/logo.png"
const NavBox = () => {
  const [page, setPage] = React.useState("");

  



  const handleChangePage = (event) => {
    setPage(event.target.value);
  };


  return (
  
      <nav className={navbarCSS.navParent}>

      <img src={logo} alt="" />
        <h2>Deploy<span>IT</span></h2>
        <p>Information Technology <br/>Department</p> 



        <FormControl sx={{ mr: 0.8, mt: 3, mb: 5,minWidth: 200}}>
          <Select
            value={page}
            onChange={handleChangePage}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              fontFamily: "Poppins",
              fontSize: "0.9rem",
              padding: "0rem",
              fontWeight: "600"
            }}
          >
            <MenuItem value="">Student Department</MenuItem>
            <MenuItem value={10}>Faculty Department</MenuItem>
            <MenuItem value={20}>User Management</MenuItem>
          </Select>
        </FormControl>

      </nav>



   
  );
};

export default NavBox;
