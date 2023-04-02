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
const BlockManagePage = () => {
    const [year, setYear] = React.useState("");
    const [block, setBlock] = React.useState("");

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
  
    const handleChangeStatus = (event) => {
      setYear(event.target.value);
    };
    const handleChangeBlock = (event) => {
      setBlock(event.target.value);
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleClose();
    }
  return (
   <>
    <div className={ManageBlockCSS.topTableWrapper}>
    <div className={ManageBlockCSS.topTable}>
      <h2>Manage Blocks</h2>
      
      <div className={ManageBlockCSS.topButtons}>
        <FormControl sx={{ mr: 1, minWidth: 120 }}>
          <Select
            value={year}
            onChange={handleChangeStatus}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              fontFamily: "Poppins",
              fontSize: "0.9rem",
              padding: "0rem",
              fontWeight: "600"
            }}
          >
     
            <MenuItem value="">Regular</MenuItem>
            
            <MenuItem value={20}>Irregular</MenuItem>
          </Select>
        </FormControl>

      </div>
    </div>
    <div className={ManageBlockCSS.tableWrapper}>
      <MyTable />
    </div>
    <div className={ManageBlockCSS.bottomButtons}>

    <div class={ManageBlockCSS.left}>
    <Stack spacing={2} direction="row">
        <Button
          onClick={handleOpen}
          style={{ textTransform: "none" }}
          sx={{ 

            marginRight: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0.5rem",
            fontFamily: "Poppins",
            fontSize: "0.9rem",
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
            fontSize: "0.9rem",
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

            marginRight: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0.5rem",
            fontFamily: "Poppins",
            fontSize: "0.9rem",
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
          <p>Block Capacity</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "6rem" }}
          />
        </div>
        <div className={ManageBlockCSS.noBlocks}>
          <p>Number of Blocks</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "6rem" }}
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

export default BlockManagePage