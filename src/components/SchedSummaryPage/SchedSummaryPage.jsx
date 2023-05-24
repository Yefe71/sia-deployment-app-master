import React, {useLayoutEffect} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SchedSumCSS from "./SchedSummaryPage.module.css";
import { Button, Stack, useMediaQuery } from "@mui/material";
import TableSchedSummary from "../TableSchedSummary/TableSchedSummary";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


const SchedSummaryPage = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");
  const [dataChild, setDataChild] = React.useState([])

  const days = [
    { value: "2023-01-02", label: "Mon" },
    { value: "2023-01-03", label: "Tue" },
    { value: "2023-01-04", label: "Wed" },
    { value: "2023-01-05", label: "Thu" },
    { value: "2023-01-06", label: "Fri" },
    { value: "2023-01-07", label: "Sat" },
    { value: "2023-01-08", label: "Sun" },
  ];


  const formatDate = (time) => {
    const date = new Date(time).toISOString().split('T')[0]; // Get only the date part of the time
    const day = days.find(d => d.value === date); // Find the corresponding day in the array
    return day ? day.label : ''; // Return the label if found, or an empty string if not
  }
  
  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  };


  const exportAsPDF = (data) => {
    const doc = new jsPDF('l'); 
    const head = [["ID", "Professor Name", "Year", "Block", "Course Name", "Course Code", "Units", "Actual Units",  "Class Type",  "Room", "Day", "Start Time", "End Time"]];

    const body = data.map((row, index) => [
      index + 1,
      row.professorName,
      row.year,
      row.block,
      row.courseName,
      row.courseCode,
      row.units,
      row.actualUnits,
      row.classType,
      row.room,
      formatDate(row.day),
      formatTime(row.startDate),
      formatTime(row.endDate)
    ]);

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

    doc.save("schedulesummary.pdf");
  };

  const exportAsExcel = (data) => {
    console.log(dataChild, "datachild!")
    const headers = ["ID", "Professor Name", "Year", "Block", "Course Name", "Course Code", "Units", "Actual Units",  "Class Type",  "Room", "Day", "Start Time", "End Time"];

    const dataArray = data.map((row, index) => [
      index + 1,
      row.professorName,
      row.year,
      row.block,
      row.courseName,
      row.courseCode,
      row.units,
      row.actualUnits,
      row.classType,
      row.room,
      formatDate(row.day),
      formatTime(row.startDate),
      formatTime(row.endDate)
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...dataArray]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SchedSummary");
    XLSX.writeFile(wb, "schedulesummary.xlsx");
  };


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
  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };
  return (
    <>
      <div className={SchedSumCSS.topTableWrapper}>
        <div className={SchedSumCSS.topTable}>
          <h2>Schedule Summary</h2>
        </div>

        <div className={`${SchedSumCSS.tableWrapper} ${SchedSumCSS.sched}`}>
            <TableSchedSummary setDataChild = {setDataChild}/>
        
        </div>

        <div className={SchedSumCSS.middle}>
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

export default SchedSummaryPage;
