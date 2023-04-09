import React, {useState} from 'react'
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



const exportToExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    "data.xlsx"
  );
};

// Utility function to convert the string to an ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

const BlockManagePage = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");

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
      setYearProp(yearForm)
      setBlockProp(blockForm)
      setRefreshData(prevState => !prevState);
      handleClose();
    }
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
            onChange={handleChangeYear}
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
            <MenuItem value="" >Block</MenuItem>
            <MenuItem value={1}>Block 1</MenuItem>
            <MenuItem value={2}>Block 2</MenuItem>
            <MenuItem value={3}>Block 3</MenuItem>
            <MenuItem value={4}>Block 4</MenuItem>
            <MenuItem value={5}>Block 5</MenuItem>
            <MenuItem value={6}>Block 6</MenuItem>
            <MenuItem value={7}>Block 7</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
    
    <div className={ManageBlockCSS.tableWrapper}>
      <TableManageBlock yearForm = {yearForm} blockForm = {blockForm} yearButton = {year} blockButton = {block} filterRefreshData = {filterRefreshData} refreshData={refreshData} />
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
          Print Reblock List
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
          />
        </div>
        <div className={ManageBlockCSS.noBlocks}>
          <p>Number of Blocks</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "6rem" }}
            onChange={(event) => setBlockForm(event.target.value)}
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