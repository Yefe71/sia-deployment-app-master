import React, { useState, useEffect} from "react";
import NavbarCSS from "./Navbar.module.css";
import logo from "../../assets/logo.png";
const Navbar = ({ access, setPage, setAccess, page, currentApp, setCurrentApp}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatDate = (date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year} -`;
  };
  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
  
      hour12: true
    };
    return date.toLocaleTimeString('en-US', options);
  };

  return (
    <>

    
      <div className={NavbarCSS.navParent}>
        <div className={NavbarCSS.leftNav}>
          <div className={NavbarCSS.imgWrapper}>
            <img src={logo} alt="" />
            { currentApp === "student" ?
              <p onClick={() => 
              {
                setCurrentApp('faculty') 
                setPage('schedsummary')
              }}>Student</p>
              :
              <p onClick={() => 
                {
                  setCurrentApp('student')
                  setPage('blockUtil')
                }}>Faculty</p>
            }
          </div>
          <div className={NavbarCSS.leftNavText}>
            <h2>
              Advance<span>IT</span>
            </h2>
            <h3>Information Technology Department</h3>
          </div>
        </div>

        <div className={NavbarCSS.rightNav}>
        <h3> {formatDate(currentDateTime)} {formatTime(currentDateTime)}</h3>
        </div>
      </div>
      <div className={`${NavbarCSS.subNav} ${access === false ? NavbarCSS.shrink : ""}`}>
        {access === true && (
          <>

            <div className={NavbarCSS.left}>
            <h3 className={NavbarCSS.logout} onClick={() => {
              setAccess(false)}}>Sign Out</h3>
            </div>

            <div className={NavbarCSS.subNavWrapper}>
              { currentApp === 'student' ?
                <>
                  <h3 className = {`${page === "blockUtil" && NavbarCSS.active}`} onClick={() => setPage("blockUtil")}>Blockclasses Utility</h3>
                  <h3 className = {`${page === "students" && NavbarCSS.active}`} onClick={() => setPage("students")}>Student List</h3>
                  <h3 className = {`${page === "manage" && NavbarCSS.active}`} onClick={() => setPage("manage")}>Block Management</h3>
                  <h3 className={NavbarCSS.logout} onClick={() => {setAccess(false)}}>Sign Out</h3>
                </>
                :
                <>
                  <h3 className = {`${page === "schedsummary" && NavbarCSS.active}`} onClick={() => setPage("schedsummary")}>Schedule Summary</h3>
                  <h3 className = {`${page === "roomplot" && NavbarCSS.active}`} onClick={() => setPage("roomplot")}>Room Plotting</h3>
                  <h3 className = {`${page === "students" && NavbarCSS.active}`} onClick={() => setPage("students")}>Student List</h3>
                  <h3 className={NavbarCSS.logout} onClick={() => {setAccess(false)}}>Sign Out</h3>
                </>
              }
              
            </div>

            <div className={NavbarCSS.right}>
            <h3 className={NavbarCSS.logout} onClick={() => {
              setAccess(false)}}>Sign Out</h3>
            </div>

        </>

          
        )}
      </div>
    </>
  );
};

export default Navbar;
