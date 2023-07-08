import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import TableStudentsList from "../TableStudentsList/TableStudentsList";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import ReactToPrint from "react-to-print";

const BlockClassesPage = () => {
  let componentRef = React.useRef();

  useLayoutEffect(() => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    window.scrollTo({
      top: vh * 0.11,
      behavior: "smooth",
    });
  }, []);
  const exportAsPDF = (data) => {
    const doc = new jsPDF('l');
    const head = [
      [
        "ID",
        "Student ID",
        "Last Name",
        "First Name",
        "Middle Name",
        "Standing",
        "Year",
        "Block",
      ],
    ];

    const body = data.map((row, index) => [
      index + 1,
      row.student_id,
      row.last_name,
      row.first_name,
      row.middle_name,
      row.standing,
      row.year,
      row.block,
    ]);

    doc.autoTable({
      head: head,
      body: body,
    });
    doc.autoTable({
      head: head,
      body: body,
      didDrawPage: function(data) {
        // Footer
        const str2 = "PROF. CENTENO, CRISELLE J.";
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

        doc.setFontSize(10);

        const str2Width = doc.getStringUnitWidth(str2) * doc.internal.getFontSize() / doc.internal.scaleFactor;


        doc.text(str2, pageSize.width - str2Width - 10, pageHeight - 10);
        doc.setLineWidth(0.5);
        doc.line(pageSize.width - str2Width - 10, pageHeight - 15, pageSize.width - 10, pageHeight - 15);
      }
    });
    doc.save("students.pdf");
  };
  const exportAsExcel = (data) => {
    const headers = [
      "ID",
      "Student ID",
      "Last Name",
      "First Name",
      "Middle Name",
      "Standing",
      "Year",
      "Block",
    ];

    const dataArray = data.map((row, index) => [
      index + 1,
      row.student_id,
      row.last_name,
      row.first_name,
      row.middle_name,
      row.standing,
      row.year,
      row.block,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...dataArray]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  const isSmallScreen = useMediaQuery("(max-width: 500px)");

  const [blockChild, setBlockChild] = useState([]);

  const [year, setYear] = useState([]);
  const handleChangeYear = (event) => {
    setYear(event.target.value);
    // setFilterRefreshData((prevState) => !prevState);
  };
  const [block, setBlock] = React.useState([]);
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };

  const handleClick = () => {
    // Call the function in the child component
    childComponentRef.current.openModal();
  };

  const childComponentRef = React.useRef();
  const [standing, setStanding] = React.useState("");
  const [dataChild, setDataChild] = useState([]);
  useEffect(() => {
    setYear("0");
    setBlock("0");
    const timeoutId = setTimeout(() => {
      setYear("");
      setBlock("");
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log(isHovered)
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    console.log(isHovered)
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
          <div ref={componentRef} className={BlockClassessCSS.printContainer}>
            <SchedulerFaculty
              isBlockClassess={true}
              ref={childComponentRef}
              readOnly={true}
              year={year}
              block={block}
              setBlockChild={setBlockChild}
            />

          <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "340px",
                marginLeft: "125vw",
                display: isHovered ? "block" : "none"
              }}
            >
              <div
                style={{
                  width: "24rem",
                  borderTop: "3px solid black",
                  marginRight: "5px",
           
                }}
              ></div>
              <div
                style={{
                  marginTop: "15px",
                  fontFamily: "Arial",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                PROF. CENTENO, CRISELLE J.
              </div>
              </div>
          </div>
        </div>
        <div className={BlockClassessCSS.bottomButtonsTop}>
          <div className={BlockClassessCSS.middle} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
            <ReactToPrint
              trigger={() => (
                <Stack spacing={2} direction="row">
                  <Button
                    style={{ textTransform: "none" }}
                    sx={{
                      marginRight: "1rem",
                      backgroundColor: "#424242",

                      color: "white",
                      borderRadius: "0.5rem",
                      fontFamily: "Poppins",
                      fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                      padding: "0rem",
                      padding: "0.9rem",
                      "&:hover": {
                        backgroundColor: "#313131",
                        // Change the hover background color here
                      },
                    }}
                    variant="contained"
                  >
                    Print as PDF
                  </Button>
                </Stack>
              )}
              content={() => componentRef.current}
            />


          </div>
        </div>
      </div>

      <div className={BlockClassessCSS.topTableWrapper}>
        <div className={BlockClassessCSS.topTableBottom}>
          <h2>Class List</h2>
        </div>
        <div className={BlockClassessCSS.tableWrapper}>
          <TableStudentsList
            standing={standing}
            yearButton={year}
            blockButton={block}
            setDataChild={setDataChild}
          />
        </div>
      </div>
      <div className={BlockClassessCSS.bottomButtons}>
        <div className={BlockClassessCSS.middle} >
          <Stack spacing={2} direction="row">
            <Button
              style={{ textTransform: "none" }}
              onClick={() => exportAsPDF(dataChild)}
              sx={{
                marginRight: "1rem",
                backgroundColor: "#424242",

                color: "white",
                borderRadius: "0.5rem",
                fontFamily: "Poppins",
                fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
               
                padding: "0.9rem 1.25rem",
                "&:hover": {
                  backgroundColor: "#313131",
                  // Change the hover background color here
                },
              }}
              variant="contained"
            >
              Print as PDF
            </Button>
          </Stack>
          <Stack spacing={2} direction="row">
            <Button
              style={{ textTransform: "none" }}
              onClick={() => exportAsExcel(dataChild)}
              sx={{
                marginRight: "1rem",
                backgroundColor: "#424242",

                color: "white",
                borderRadius: "0.5rem",
                fontFamily: "Poppins",
                fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                padding: "0rem",
                padding: "0.9rem",
                "&:hover": {
                  backgroundColor: "#313131",
                  // Change the hover background color here
                },
              }}
              variant="contained"
            >
              Save as XLSX
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default BlockClassesPage;
