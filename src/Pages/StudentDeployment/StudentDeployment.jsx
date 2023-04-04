import React from "react";
import studentDepCSS from "./StudentDeployment.module.css";
import BlockClassesPage from "../../components/BlockClassessPage/BlockClassesPage";
import BlockManagePage from "../../components/BlockManagePage/BlockManagePage";
import StudentsPage from "../../components/StudentsPage/StudentsPage";
import logo from "../../assets/logo.png"
const StudentDeployment = ({setAccess, access, pageSent}) => {

  const page = pageSent ;


  return (
    <>
      <div className={`${studentDepCSS.studentDepParent}`}>
        <img className={studentDepCSS.logo} src={logo} alt="" />
        <div className={studentDepCSS.rightContainer}>
          {page === "blockUtil" && <BlockClassesPage />}
          {page === "students" && <StudentsPage />}
          {page === "manage" && <BlockManagePage />}
        </div>
      </div>
    </>
  );
};

export default StudentDeployment;
