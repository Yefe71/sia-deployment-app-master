import React, {useState, useLayoutEffect} from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ManageBlockCSS from "./BlockManagePage.module.css";
import MyTable from "../Table/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import TableManageBlock from '../TableManageBlock/TableManageBlock';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';



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


const BlockManagePage = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");
  const [blockChild, setBlockChild] = useState([])
  const [dataChild, setDataChild] = useState([])
  const [numYearBlock, setNumYearBlock] = useState([])
  
  const handleChangeYear = (event) => {
    setYear(event.target.value);
    setFilterRefreshData(prevState => !prevState);
    
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
    setFilterRefreshData(prevState => !prevState);
    
  };
    
  const [yearForm, setYearForm] = React.useState("");
  const [blockForm, setBlockForm] = React.useState("");

  const [refreshData, setRefreshData] = useState(false);
  const [filterRefreshData, setFilterRefreshData] = useState(false);


    const isSmallScreen = useMediaQuery("(max-width: 500px)");
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 180,
      height: 450,
      bgcolor: "#eeeeee",
      borderRadius: "1rem",
      boxShadow: 24,
      p: 4,
    };
  




    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

 
    const handleSubmit = (event) => {
      event.preventDefault();
      setRefreshData(prevState => !prevState);
      handleClose();
    }

    useLayoutEffect(() => {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      window.scrollTo(0, vh * 0.11);
  
    }, []);

    
  return (
   <>
    <div className={ManageBlockCSS.topTableWrapper}>
    <div className={ManageBlockCSS.topTable}>
      <h2>Manage Blocks</h2>
      <div className={ManageBlockCSS.topButtons}>
        <FormControl
          sx={{
            mr: 0.6,
            minWidth: isSmallScreen ? 90 : 115,
          }}
        >
          <Select
            value={year}
            onChange={event => {
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
            <MenuItem value="" >Year</MenuItem>
            <MenuItem value={1}>1st Year</MenuItem>
            <MenuItem value={2}>2nd Year</MenuItem>
            <MenuItem value={3}>3rd Year</MenuItem>
            <MenuItem value={4}>4th Year</MenuItem>
            <MenuItem value={5}>5th Year</MenuItem>
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
    
    <div className={ManageBlockCSS.tableWrapper}>
      <TableManageBlock setNumYearBlock = {setNumYearBlock} setBlockChild = {setBlockChild} setDataChild = {setDataChild} yearForm = {yearForm} blockForm = {blockForm} yearButton = {year} blockButton = {block} filterRefreshData = {filterRefreshData} refreshData={refreshData} />
    </div>
    <div className={ManageBlockCSS.bottomButtons}>
    <div class={ManageBlockCSS.left}>
      
    <Stack spacing={2} direction="row">
        <Button
          onClick={handleOpen}
          style={{ textTransform: "none" }}
          sx={{ 
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0.5rem",
            fontFamily: "Poppins",
            fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
            padding: "0rem",
            padding: "0.9rem",
            "&:hover": {
              backgroundColor: "#0070e7", // Change the hover background color here
            },
          }}
          variant="contained"
        >
          Reblock
        </Button>
      </Stack>
    </div>
    <div class={ManageBlockCSS.middle}>
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
    <div class={ManageBlockCSS.right}>
      
      
      <Stack spacing={2} direction="row">
        <Button
          onClick={handleOpen}
          style={{ textTransform: "none" }}
          sx={{ 
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0.5rem",
            fontFamily: "Poppins",
            fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
            padding: "0rem",
            padding: "0.9rem",
            "&:hover": {
              backgroundColor: "#0070e7", // Change the hover background color here
            },
          }}
          variant="contained"
        >
          Reblock
        </Button>
      </Stack>
    </div>
      



    </div>
    </div>
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={ManageBlockCSS.boxWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={ManageBlockCSS.noStudents}>
          <p>Number of Students</p>
          <h3>119</h3>
        </div>
        <div className={ManageBlockCSS.blkCapacity}>
          <p>Year</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "6rem" }}
            onChange={(event) => setYearForm(event.target.value)}
            inputProps={{
              min: "1",
              max: "4"
            }}
          />

        </div>
        <div className={ManageBlockCSS.noBlocks}>
          <p>Number of Blocks</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "6rem" }}
            onChange={(event) => setBlockForm(event.target.value)}
            inputProps={{
              min: "1",
              max: "7"
            }}
          />
        </div>
         
        <Stack spacing={2} direction="row">
          <Button
           type="submit"
            onClick={handleSubmit}
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

export default BlockManagePage