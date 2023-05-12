import React, { useState, useEffect, useRef } from "react";
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import ReactToPrint from 'react-to-print';

const BlockClassesPage = () => {
  let componentRef = React.useRef();

  async function printDocument() {
    // Get the element and its container
    const element = document.getElementById('mydiv');
    const container = element.parentElement;

    // Store the container's original size
    const originalSize = {
        width: container.style.width,
        height: container.style.height,
        overflow: container.style.overflow,
    };

    // Expand the container to fit its contents
    container.style.width = `${element.scrollWidth}px`;
    container.style.height = `${element.scrollHeight}px`;
    container.style.overflow = 'visible';

    // Wait for the browser to render the changes
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Capture the element
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");

    // Restore the container's original size
    container.style.width = originalSize.width;
    container.style.height = originalSize.height;
    container.style.overflow = originalSize.overflow;
}


  const exportAsPDF = (data) => {
    const doc = new jsPDF();
    const head = [["ID", "Student ID", "Last Name", "First Name", "Middle Name", "Standing", "Year", "Block"]];

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

    doc.save("students.pdf");
  };
  const exportAsExcel = (data) => {
    const headers = ["ID", "Student ID", "Last Name", "First Name", "Middle Name", "Standing", "Year", "Block"];

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
  const [dataChild, setDataChild] = useState([])
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
        <ReactToPrint
            trigger={() => <button>Print Scheduler</button>}
            content={() => componentRef.current}
          />
       
          <SchedulerFaculty
            isBlockClassess={true}
            ref={childComponentRef}
            readOnly={true}
            year={year}
            block={block}
            setBlockChild={setBlockChild}
          />
     
        </div>
        <div className={BlockClassessCSS.bottomButtonsTop}>
          
        <div className={BlockClassessCSS.middle}>
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
                  Export as Excel
                </Button>
              </Stack>
          </div>
        </div>
        
      </div>

      <div className={BlockClassessCSS.topTableWrapper}>
        <div className={BlockClassessCSS.topTable}>
          <h2>Class List</h2>
        </div>
        <div className={BlockClassessCSS.tableWrapper}>
        <TableStudentsList standing = {standing} yearButton = {year} blockButton = {block} setDataChild = {setDataChild}/>
        </div>
      </div>
      <div className={BlockClassessCSS.bottomButtons}>
      <div className={BlockClassessCSS.middle}>
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
                Export as Excel
              </Button>
            </Stack>
        </div>
      </div>
    </>
  );
};

export default BlockClassesPage;
