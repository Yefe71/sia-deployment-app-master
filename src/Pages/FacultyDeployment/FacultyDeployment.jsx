import React from "react";
import facultyDepCSS from "./FacultyDeployment.module.css";
import BlockClassesPage from "../../components/BlockClassessPage/BlockClassesPage";
import BlockManagePage from "../../components/BlockManagePage/BlockManagePage";
import StudentsPage from "../../components/StudentsPage/StudentsPage";
import logo from "../../assets/logo.png"
import SchedSummaryPage from "../../components/SchedSummaryPage/SchedSummaryPage";
import RoomPlotPage from "../../components/RoomPlotPage/RoomPlotPage";
const FacultyDeployment = ({setAccess, access, pageSent}) => {

  const page = pageSent ;


  return (
    <>
      <div className={`${facultyDepCSS.facultyDepParent}`}>
        <img className={facultyDepCSS.logo} src={logo} alt="" />
        <div className={facultyDepCSS.rightContainer}>
          {page === "schedsummary" && <SchedSummaryPage/>}
          {page === "students" && <StudentsPage />}
          {page === "roomplot" && <RoomPlotPage/>}
        </div>
      </div>
    </>
  );
};

export default FacultyDeployment;