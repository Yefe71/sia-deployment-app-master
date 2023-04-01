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
import BlockManagePage from "../../components/BlockManagePage/BlockManagePage";
const StudentDeployment = ({setAccess, access}) => {

  const [page, setPage] = React.useState("students");


  return (
    <div className={studentDepCSS.studentDepParent}>
      {/* <div className={studentDepCSS.leftContainer}>
        <NavBox access = {access}/>
        <div className={studentDepCSS.sidebarWrapper}>
          <div onClick={() => setPage('blockUtil')}  className={`${studentDepCSS.sideLink} ${page === 'blockUtil' ? studentDepCSS.active : ''}`}>
            <img src={blocks} alt="" />
            <h2>Blocklasses Utility</h2>
          </div>
          <div onClick={() => setPage('schedule')} className={`${studentDepCSS.sideLink} ${page === 'schedule' ? studentDepCSS.active : ''}`}>
            <img src={schedule} alt="" />
            <h2>Schedule</h2>
          </div>
          <div onClick={() => setPage('manage')} className={`${studentDepCSS.sideLink} ${page === 'manage' ? studentDepCSS.active : ''}`}>
            <img src={edit} alt="" />
            <h2>Manage Blocks</h2>
          </div>
          <div onClick={() => setAccess(false)} className={`${studentDepCSS.sideLink} ${page === 'out' ? studentDepCSS.active : ''}`}>
            <img src={signout} alt="" />
            <h2>Signout</h2>
          </div>
        </div>
      </div> */}

      <div className={studentDepCSS.rightContainer}>
        {page === "blockUtil" && <BlockClassesPage />}
        {page === "students" && <BlockManagePage />}
        {page === "manage" && <BlockManagePage />}
      </div>
    </div>
  );
};

export default StudentDeployment;
