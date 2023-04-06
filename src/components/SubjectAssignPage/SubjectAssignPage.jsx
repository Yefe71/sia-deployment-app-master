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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { OutlinedInput } from '@mui/material';

const SubjectAssignPage = () => {
    const isSmallScreen = useMediaQuery("(max-width: 500px)");
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 320,
      height: 440,
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
    
    //Blocks
    const [isOpenBlock, setIsOpenBlock] = useState(false);
    const [isFocusedBlock, setIsFocusedBlock] = useState(false);
    const [block, setBlock] = React.useState('');

    
    const handleChangeBlock = (event) => {
      setBlock(event.target.value);
    };

    const handleFocusBlock = () => {
      setIsFocusedBlock(true);
    };

    const handleBlurBlock = () => {
      setIsFocusedBlock(false);
    };

    //Class Type
    const [isOpenClassType, setIsOpenClassType] = useState(false);
    const [isFocusedClassType, setIsFocusedClassType] = useState(false);
    const [classType, setClassType] = React.useState('');
  
      
    const handleChangeClassType = (event) => {
      setClassType(event.target.value);
    };
  
    const handleFocusClassType = () => {
      setIsFocusedClassType(true);
    };
  
    const handleBlurClassType = () => {
      setIsFocusedClassType(false);
    };

    //Room
    const [isOpenRoom, setIsOpenRoom] = useState(false);
    const [isFocusedRoom, setIsFocusedRoom] = useState(false);
    const [room, setRoom] = React.useState('');
  
      
    const handleChangeRoom = (event) => {
      setRoom(event.target.value);
    };
  
    const handleFocusRoom = () => {
      setIsFocusedRoom(true);
    };
  
    const handleBlurRoom = () => {
      setIsFocusedRoom(false);
    };
  
    //Day
    const [isOpenDay, setIsOpenDay] = useState(false);
    const [isFocusedDay, setIsFocusedDay] = useState(false);
    const [day, setDay] = React.useState('');
  
      
    const handleChangeDay = (event) => {
      setDay(event.target.value);
    };
  
    const handleFocusDay = () => {
      setIsFocusedDay(true);
    };
  
    const handleBlurDay = () => {
      setIsFocusedDay(false);
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

            <FormControl sx={{ m: 1, minWidth: 320 }}>
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
          <div className={SubjectAssignCSS["course-title-field"]}>
            <FormControl sx={{ m: 1, minWidth: 205 }}>
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

            <Box
              component="form"
              sx={{ m: 1, width: 100 }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-read-only-input"
                label="Course Code"
                defaultValue="EE234"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </div>

            {/* BLOCK FIELD */}

            <div className={SubjectAssignCSS["block-unit-wrapper"]}>
              <FormControl sx={{ m: 1, minWidth: 90 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Block
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={block}
                  label="block"
                  onChange={handleChangeBlock}
                  onFocus={handleFocusBlock}
                  onBlur={handleBlurBlock}
                  onOpen={() => {
                    setIsOpenBlock(true);
                  }}
                  onClose={() => {
                    setIsOpenBlock(false);
                  }}
                  input={
                    (isOpenBlock === true && block) ||
                    (isOpenBlock === false && block) ||
                    (isOpenBlock === true && !block) ||
                    (isFocusedBlock && !block) ? (
                      <OutlinedInput notched label="Block" />
                    ) : (
                      <OutlinedInput />
                    )
                  }
                >
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={30}>3</MenuItem>
                </Select>
              </FormControl>

              {/* BLOCK UNITS FIELD */}
              <Box
                component="form"
                sx={{ m: 1, width: 100 }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Units"
                  type="number"
                  variant="outlined"
                />
              </Box>

              {/* ACTUAL UNITS FIELD */}
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

            {/* Class Type */}

            <div className={SubjectAssignCSS["status-room-wrapper"]}>
              <FormControl sx={{ m: 1, minWidth: 152 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Class Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={classType}
                  label="classType"
                  onChange={handleChangeClassType}
                  onFocus={handleFocusClassType}
                  onBlur={handleBlurClassType}
                  onOpen={() => {
                    setIsOpenClassType(true);
                  }}
                  onClose={() => {
                    setIsOpenClassType(false);
                  }}
                  input={
                    (isOpenClassType === true && classType) ||
                    (isOpenClassType === false && classType) ||
                    (isOpenClassType === true && !classType) ||
                    (isFocusedClassType && !classType) ? (
                      <OutlinedInput notched label="Class Type" />
                    ) : (
                      <OutlinedInput />
                    )
                  }
                >
                  <MenuItem value={10}>Synch</MenuItem>
                  <MenuItem value={20}>Asynch</MenuItem>
                  <MenuItem value={30}>F2F</MenuItem>
                </Select>
              </FormControl>

            {/* Room */}
              <FormControl sx={{ m: 1, minWidth: 152 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Room
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={room}
                  label="room"
                  onChange={handleChangeRoom}
                  onFocus={handleFocusRoom}
                  onBlur={handleBlurRoom}
                  onOpen={() => {
                    setIsOpenRoom(true);
                  }}
                  onClose={() => {
                    setIsOpenRoom(false);
                  }}
                  input={
                    (isOpenRoom === true && room) ||
                    (isOpenRoom === false && room) ||
                    (isOpenRoom === true && !room) ||
                    (isFocusedRoom && !room) ? (
                      <OutlinedInput notched label="Room" />
                    ) : (
                      <OutlinedInput />
                    )
                  }
                >
                  <MenuItem value={10}>GCA</MenuItem>
                  <MenuItem value={20}>CGA</MenuItem>
                  <MenuItem value={30}>FDG</MenuItem>
                </Select>
              </FormControl>
            </div>

          {/* DAY-TIME FIELDS */}
            <div className={SubjectAssignCSS.timeWrapper}>
          <FormControl sx={{ m: 1, minWidth: 90 }}>
            <InputLabel id="demo-simple-select-helper-label">Day</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={day}
              label="day"
              onChange={handleChangeDay}
              onFocus={handleFocusDay}
              onBlur={handleBlurDay}
              onOpen={() => {
                setIsOpenDay(true);
              }}
              onClose={() => {
                setIsOpenDay(false);
              }}
              input={
                (isOpenDay === true && day) ||
                (isOpenDay === false && day) ||
                (isOpenDay === true && !day) ||
                (isFocusedDay && !day) ? (
                  <OutlinedInput notched label="Day" />
                ) : (
                  <OutlinedInput />
                )
              }
            >
              <MenuItem value={10}>Synch</MenuItem>
              <MenuItem value={20}>Asynch</MenuItem>
              <MenuItem value={30}>F2F</MenuItem>
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
          </div>

          <Stack spacing={2}  direction="row">
          <Button
           type="submit"
            onClick={handleOpen}
            style={{ textTransform: "none" }}
            sx={{
              marginTop: '1.5rem',
              backgroundColor: "#4CAF50 ",
              color: "white",
              borderRadius: "0.5rem",
              fontFamily: "Poppins",
              fontSize: "0.9rem",
              padding: "0rem",
              padding: "0.9rem",
              width: 320,
              "&:hover": {
                backgroundColor: "#429645 ", // Change the hover background color here
              },
            }}
            variant="contained"
          >
            Assign
          </Button>
        </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default SubjectAssignPage