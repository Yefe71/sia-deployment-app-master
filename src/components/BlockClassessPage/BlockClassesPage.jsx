import React, {useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BlockClassessCSS from "./BlockClassesPage.module.css";
import MyTable from "../Table/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Scheduler from "../Scheduler/Scheduler";
import { useMediaQuery } from "@mui/material";
import SchedulerStudent from "../SchedulerStudent/SchedulerStudent";
import SchedulerFaculty from "../SchedulerFaculty/SchedulerFaculty";

const BlockClassesPage = () => {

  const isSmallScreen = useMediaQuery("(max-width: 500px)");

  const [blockChild, setBlockChild] = useState([])
  
  const [year, setYear] = useState([])
  const handleChangeYear = (event) => {
    setYear(event.target.value);
    // setFilterRefreshData((prevState) => !prevState);
  };

  const [block, setBlock] = React.useState([])
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };


  const handleClick = () => {
    // Call the function in the child component
    childComponentRef.current.openModal();
  };

  const childComponentRef = React.useRef();
  return (
    <>
      {/* <div className={BlockClassessCSS.topTableWrapper}>
        <div className={BlockClassessCSS.topTable}>
          <h2>Schedule</h2>
          <div className={BlockClassessCSS.topButtons}>
            <FormControl
              sx={{
                mr: 0.6,
                minWidth: isSmallScreen ? 90 : 115,
              }}
            >
              <Select
                value={year}
                onChange={handleChangeYear}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                }}
              >
                <MenuItem value="">1st Year</MenuItem>
                <MenuItem value={10}>2nd Year</MenuItem>
                <MenuItem value={20}>3rd Year</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{minWidth: isSmallScreen ? 80 : 100}}>
              <Select
                value={block}
                onChange={handleChangeBlock}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                }}
              >
                <MenuItem value="">Block 1</MenuItem>
                <MenuItem value={10}>Block 2</MenuItem>
                <MenuItem value={20}>Block 3</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className={`${BlockClassessCSS.tableWrapper} ${BlockClassessCSS.sched}`}>
        <SchedulerStudent  ref={childComponentRef}/>
        </div>
      </div> */}

<div className={BlockClassessCSS.topTableWrapper}>
        <div className={BlockClassessCSS.topTable}>

          
          <h2>Schedule</h2>
          <div className={BlockClassessCSS.topButtons}>
            <FormControl
              sx={{
                mr: 0.6,
                minWidth: isSmallScreen ? 90 : 115,
              }}
            >
              <Select
                value={year}
                onChange={(event) => {
                  handleChangeYear(event);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                }}
              >
                <MenuItem value="">Year</MenuItem>
                <MenuItem value={1}>1st Year</MenuItem>
                <MenuItem value={2}>2nd Year</MenuItem>
                <MenuItem value={3}>3rd Year</MenuItem>
                <MenuItem value={4}>4th Year</MenuItem>
                <MenuItem value={5}>5th Year</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: isSmallScreen ? 80 : 100 }}>
              <Select
                value={block}
                onChange={handleChangeBlock}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                }}
              >
                <MenuItem value="">Block</MenuItem>
                {blockChild.map((blockNumber) => (
                  <MenuItem value={blockNumber} key={blockNumber}>
                    Block {blockNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
      

        </div>
        <div className={BlockClassessCSS.tableWrapper}>
          <SchedulerFaculty isBlockClassess = {true} ref={childComponentRef} readOnly = {true} year={year} block={block} setBlockChild={setBlockChild}/>
        </div>

      </div>

      <div className={BlockClassessCSS.topTableWrapper}>
        <div className={BlockClassessCSS.topTable}>
          <h2>Class List</h2>
        </div>
        <div className={BlockClassessCSS.tableWrapper}>
          <MyTable />
        </div>
      </div>
      <div className={BlockClassessCSS.bottomButtons}>

        <div className={BlockClassessCSS.middle}>
          <Stack spacing={2} direction="row">
            <Button
              style={{ textTransform: "none" }}
              sx={{
                
                backgroundColor: "#424242",

                color: "white",
                borderRadius: "0.5rem",
                fontFamily: "Poppins",
                fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                padding: "0.9rem",
                "&:hover": {
                  backgroundColor: "#313131",
                  // Change the hover background color here
                },
              }}
              variant="contained"
            >
              Print Blockclassess
            </Button>
          </Stack>
        </div>
   
      </div>
    </>
  );
};

export default BlockClassesPage;
