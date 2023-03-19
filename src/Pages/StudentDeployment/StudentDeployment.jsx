import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import studentDepCSS from "./StudentDeployment.module.css";
import edit from "../../assets/edit.svg";
import blocks from "../../assets/blocks.svg";
import schedule from "../../assets/schedule.svg";
import signout from "../../assets/signout.svg";
import MyTable from "../../components/Table/Table";
import NavBox from "../../components/NavBox/NavBox";
import BlockClassesPage from "../../components/BlockClassessPage/BlockClassesPage";
import SchedulePage from "../../components/SchedulePage/SchedulePage";
const StudentDeployment = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");
  

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };
  return (
    <div className={studentDepCSS.studentDepParent}>
      <div className={studentDepCSS.leftContainer}>
        <NavBox/>
        <div className={studentDepCSS.sidebarWrapper}>
          <div className={`${studentDepCSS.sideLink} ${studentDepCSS.active}`}>
            <img src={blocks} alt="" />
            <h2>Blocklasses Utility</h2>
          </div>
          <div className={`${studentDepCSS.sideLink}`}>
            <img src={schedule} alt="" />
            <h2>Schedule</h2>
          </div>
          <div className={`${studentDepCSS.sideLink}`}>
            <img src={edit} alt="" />
            <h2>Manage Blocks</h2>
          </div>
          <div className={`${studentDepCSS.sideLink}`}>
            <img src={signout} alt="" />
            <h2>Signout</h2>
          </div>
        </div>
      </div>

      <div className={studentDepCSS.rightContainer}>
        {/* <BlockClassesPage/> */}
        <SchedulePage/>
      </div>
    </div>
  );
};

export default StudentDeployment;
