import React from "react";
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

const BlockClasses = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");

  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };
  return (
    <>
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
          <Scheduler />
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

        <div class={BlockClassessCSS.middle}>
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

export default BlockClasses;
