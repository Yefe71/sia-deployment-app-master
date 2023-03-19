import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ManageBlockCSS from "./ManageBlockPage.module.css";
import MyTable from "../Table/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

const ManageBlockPage = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  }
  return (
    <>
      <div className={ManageBlockCSS.topTable}>
        <h2>Manage Blocks</h2>
        <div
          className={ManageBlockCSS.topButtons}
          style={{ marginRight: "-0rem" }}
        >

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
          <FormControl sx={{ mr: 1, minWidth: 120 }}>
            <Select
              value={year}
              onChange={handleChangeYear}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                padding: "0rem",
                fontWeight: "600",
              }}
            >
              <MenuItem value="">1st Year</MenuItem>
              <MenuItem value={10}>2nd Year</MenuItem>
              <MenuItem value={20}>3rd Year</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={block}
              onChange={handleChangeBlock}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                padding: "0rem",
                fontWeight: "600",
              }}
            >
              <MenuItem value="">Block 1</MenuItem>
              <MenuItem value={10}>Block 2</MenuItem>
              <MenuItem value={20}>Block 3</MenuItem>
            </Select>
          </FormControl>

        </div>
      </div>
      <div className={ManageBlockCSS.tableWrapper}>
        <MyTable />
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
              sx={{ width: "5vw" }}
            />
          </div>
          <div className={ManageBlockCSS.noBlocks}>
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
              Confirm
            </Button>
          </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ManageBlockPage;
