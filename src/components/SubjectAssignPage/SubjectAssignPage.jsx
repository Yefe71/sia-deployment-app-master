import React, {useState} from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SubjectAssignCSS from "./SubjectAssignPage.module.css";
import MyTable from "../Table/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { OutlinedInput } from '@mui/material';
const SubjectAssignPage = () => {
    const isSmallScreen = useMediaQuery("(max-width: 500px)");
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      height: 450,
      bgcolor: "#eeeeee",
      borderRadius: "1rem",
      boxShadow: 24,
      p: 4,
    };

    //Modal Open-Close-Submit
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (event) => {
      event.preventDefault();
      handleClose();
    }

    //Day-Time Picker
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));


    //FORM CONTENT
    //Professor Name
    const [isOpenProf, setIsOpenProf] = useState(false);
    const [isFocusedProf, setIsFocusedProf] = useState(false);
    const [nameProf, setNameProf] = React.useState('');

    
    const handleChangeProf = (event) => {
      setNameProf(event.target.value);
    };

    const handleFocusProf = () => {
      setIsFocusedProf(true);
    };

    const handleBlurProf = () => {
      setIsFocusedProf(false);
    };

    //Course Name
    const [isOpenCourseName, setIsOpenCourseName] = useState(false);
    const [isFocusedCourseName, setIsFocusedCourseName] = useState(false);
    const [courseName, setCourseName] = React.useState('');

    
    const handleChangeCourseName = (event) => {
      setCourseName(event.target.value);
    };

    const handleFocusCourseName = () => {
      setIsFocusedCourseName(true);
    };

    const handleBlurCourseName = () => {
      setIsFocusedCourseName(false);
    };


  return (
    <>
      <div className={SubjectAssignCSS.topTableWrapper}>
        <div className={SubjectAssignCSS.topTable}>
          <h2>Subject Assignment</h2>

          <div className={SubjectAssignCSS.topButtons}>
            <FormControl sx={{ mr: 1, minWidth: 120 }}>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                }}
              >
                <MenuItem value="">Regular</MenuItem>

                <MenuItem value={20}>Irregular</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={SubjectAssignCSS.tableWrapper}>
          <MyTable />
        </div>
        <div className={SubjectAssignCSS.bottomButtons}>
          <div class={SubjectAssignCSS.left}>
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
          <div class={SubjectAssignCSS.middle}>
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
          <div class={SubjectAssignCSS.right}>
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
                Assign
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
        <Box sx={style} className={SubjectAssignCSS.boxWrapper}>
          <form onSubmit={handleSubmit}>

            {/* PROFESSOR NAME FIELD */}
            
            <FormControl sx={{ m: 1, minWidth: 280 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Professor Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={nameProf}
                label="nameProf"
                onChange={handleChangeProf}
                onFocus={handleFocusProf}
                onBlur={handleBlurProf}
                onOpen={() => {
                  setIsOpenProf(true);
                }}
                onClose={() => {
                  setIsOpenProf(false);
                }}
                input={
                  (isOpenProf === true && nameProf) ||
                  (isOpenProf === false && nameProf) ||
                  (isOpenProf === true && !nameProf) ||
                  (isFocusedProf && !nameProf) ? (
                    <OutlinedInput notched label="Professor Name" />
                  ) : (
                    <OutlinedInput />
                  )
                }
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>


            {/* COURSE TITLE AND CODE FIELD */}

            <FormControl sx={{ m: 1, minWidth: 280 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Course Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={courseName}
                label="courseName"
                onChange={handleChangeCourseName}
                onFocus={handleFocusCourseName}
                onBlur={handleBlurCourseName}
                onOpen={() => {
                  setIsOpenCourseName(true);
                }}
                onClose={() => {
                  setIsOpenCourseName(false);
                }}
                input={
                  (isOpenCourseName === true && courseName) ||
                  (isOpenCourseName === false && courseName) ||
                  (isOpenCourseName === true && !courseName) ||
                  (isFocusedCourseName && !courseName) ? (
                    <OutlinedInput notched label="Course Name" />
                  ) : (
                    <OutlinedInput />
                  )
                }
              >
                <MenuItem value={10}>GCA</MenuItem>
                <MenuItem value={20}>FGAS</MenuItem>
                <MenuItem value={30}>ASDASD</MenuItem>
              </Select>
            </FormControl>

            
            {/* 
        <div className={SubjectAssignCSS["block-unit-wrapper"]}>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-helper-label">Block</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>

          </FormControl>
          <Box
            component="form"
            sx={{ m: 1, width: 90 }}
            noValidate
            autoComplete="off"
          >
         
          <TextField id="outlined-basic" label="Units" type="number" variant="outlined" />
    
          </Box>
          <Box
            component="form"
            sx={{ m: 1, width: 100 }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-read-only-input"
              label="Actual Units"
              defaultValue="16"
              InputProps={{
                readOnly: true,
              }}
           
            />
          </Box>


        </div>
        <div className={SubjectAssignCSS["status-room-wrapper"]}>
          
        <FormControl sx={{ m: 1, minWidth: 152 }}>
          <InputLabel id="demo-simple-select-helper-label">Class Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 152 }}>
          <InputLabel id="demo-simple-select-helper-label">Room</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

        </FormControl>
        </div>

          <div className={SubjectAssignCSS.timeWrapper}>
          <FormControl sx={{ m: 1, minWidth: 90 }}>
            <InputLabel id="demo-simple-select-helper-label">Day</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>

          </FormControl>
          <FormControl components={['TimePicker', 'TimePicker']} sx={{ m: 1, width: 100 }}>
              
              <TimePicker
                label="From"
                defaultValue={dayjs('2022-04-17T00:00')}
              />
          
            </FormControl>
            <FormControl components={['TimePicker', 'TimePicker']} sx={{ m: 1, width: 100 }}>
                
              <TimePicker
                label="To"
                defaultValue={dayjs('2022-04-17T00:00')}
              />
          
            </FormControl>
          </div> */}

            {/* <Stack spacing={2} direction="row">
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
            Assign
          </Button>
        </Stack> */}
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default SubjectAssignPage