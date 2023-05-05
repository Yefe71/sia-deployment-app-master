import React, {useState, useLayoutEffect} from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import StudentsPageCSS from "./StudentsPage.module.css";
import MyTable from "../Table/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import TableStudentsList from '../TableStudentsList/TableStudentsList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


const StudentsPage = () => {
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





    const [standing, setStanding] = React.useState("");
    const [dataChild, setDataChild] = useState([])
    const isSmallScreen = useMediaQuery("(max-width: 500px)");
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 200,
      height: 450,
      bgcolor: "#eeeeee",
      borderRadius: "1rem",
      boxShadow: 24,
      p: 4,
    };
  
    const handleChangeStanding = (event) => {
      setStanding(event.target.value);
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleClose();
    }

    useLayoutEffect(() => {
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      window.scrollTo({
        top: vh * 0.11,
        behavior: 'smooth'
      });
    }, []);
  return (
   <>
     <div className={StudentsPageCSS.topTableWrapper}>
    <div className={StudentsPageCSS.topTable}>
      <h2>Student List</h2>
      <div className={StudentsPageCSS.topButtons}>
        <FormControl sx={{ mr: 1, minWidth: isSmallScreen ? 90 : 115}}>
          <Select
            value={standing}
            onChange={handleChangeStanding}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              fontFamily: "Poppins",
              fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
              padding: "0rem",
              fontWeight: "600"
            }}
          >
     
            <MenuItem value="">All</MenuItem>
            <MenuItem value="REGULAR">Regular</MenuItem>
            <MenuItem value="IRREGULAR">Irregular</MenuItem>
          </Select>
        </FormControl>

      </div>
    </div>
    <div className={StudentsPageCSS.tableWrapper}>
    <TableStudentsList standing = {standing} setDataChild = {setDataChild}/>
    </div>
            </div>

    
    <div className={StudentsPageCSS.bottomButtons}>

   
    <div className={StudentsPageCSS.middle}>
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


    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={StudentsPageCSS.boxWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={StudentsPageCSS.noStudents}>
          <p>Number of Students</p>
          <h3>119</h3>
        </div>
        <div className={StudentsPageCSS.blkCapacity}>
          <p>Block Capacity</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "5vw" }}
          />
        </div>
        <div className={StudentsPageCSS.noBlocks}>
          <p>Number of Blocks</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "5vw" }}
          />
        </div>
         
        <Stack spacing={2} direction="row">
          <Button
           type="submit"
            onClick={handleOpen}
            style={{ textTransform: "none" }}
            sx={{
              marginTop: '3rem',
              backgroundColor: "#4CAF50 ",
              color: "white",
              borderRadius: "0.5rem",
              fontFamily: "Poppins",
              fontSize: "0.9rem",
              padding: "0rem",
              padding: "0.9rem",
              "&:hover": {
                backgroundColor: "#429645 ", // Change the hover background color here
              },
            }}
            variant="contained"
          >
            Generate
          </Button>
        </Stack>
        </form>
      </Box>
    </Modal>
   </>
  )
}

export default StudentsPage