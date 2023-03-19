import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BlockClassessCSS from "./BlockClassesPage.module.css";
import MyTable from "../Table/Table";

const BlockClasses = () => {
    const [year, setYear] = React.useState("");
    const [block, setBlock] = React.useState("");
    
  
    const handleChangeYear = (event) => {
      setYear(event.target.value);
    };
    const handleChangeBlock = (event) => {
      setBlock(event.target.value);
    };
  return (
   <>
    <div className={BlockClassessCSS.topTable}>
      <h2>Blockclasses Utility</h2>
      <div className={BlockClassessCSS.topButtons}>
        <FormControl sx={{ mr: 1, minWidth: 120 }}>
          <Select
            value={year}
            onChange={handleChangeYear}
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
     
            <MenuItem value="">1st Year</MenuItem>
            <MenuItem value={10}>2nd Year</MenuItem>
            <MenuItem value={20}>3rd Year</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{  minWidth: 120 }}>
          <Select
            value={block}
            onChange={handleChangeBlock}
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
  
            <MenuItem value="">Block 1</MenuItem>
            <MenuItem value={10}>Block 2</MenuItem>
            <MenuItem value={20}>Block 3</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
    <div className={BlockClassessCSS.tableWrapper}>
      <MyTable />
    </div>
   </>
  )
}

export default BlockClasses