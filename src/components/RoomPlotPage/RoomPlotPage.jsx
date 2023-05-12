import React, {useState, useEffect, useLayoutEffect, useRef} from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RoomPlotCSS from "./RoomPlotPage.module.css";
import MyTable from "../Table/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import SchedulerFaculty from '../SchedulerFaculty/SchedulerFaculty';
import ReactToPrint from "react-to-print";

const RoomPlotPage = () => {
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
    const childComponentRef = React.useRef();
    const [blockChild, setBlockChild] = useState([])
    const [year, setYear] = useState([])
    const [block, setBlock] = React.useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [roomNames, setRoomNames] = useState([])
    

    
    const handleSubmit = (event) => {
      event.preventDefault();
      handleClose();
    }
    useEffect(() => {
      setYear('1');
      const timeoutId = setTimeout(() => {
        setYear('');
      }, 100);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);


    useEffect(() => {
      const fetchDataRoom = async () => {
        try {
          const response = await fetch("http://localhost:3000/grabRoomsNames");
          const data = await response.json();
          setRoomNames(data)
          console.log(data)
        } catch (error) {
          console.error("Error fetching rooms names:", error);
        }
      }

      fetchDataRoom();
    }, [])

    const [selectedRoom, setSelectedRoom] = React.useState("");
    const handleChangeRoom = (event) => {
      setSelectedRoom(event.target.value);
    };
  
    
  return (
   <>
    <div className={RoomPlotCSS.topTableWrapper}>
    <div className={RoomPlotCSS.topTable}>
      <h2>Room Plotting</h2>
      <div className={RoomPlotCSS.topButtons}>
        <FormControl
          sx={{
            mr: 0.6,
            minWidth: isSmallScreen ? 90 : 120,
          }}
        >
          <Select
            value={selectedRoom}
            onChange={handleChangeRoom}
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
            <MenuItem value="">Room</MenuItem>
            {roomNames.map((room, index) => (
              <MenuItem key={index} value={room.room_name}>
                {room.room_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl sx={{ minWidth: isSmallScreen ? 80 : 100 }}>
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
        </FormControl> */}
      </div>
    </div>
    <div className={RoomPlotCSS.tableWrapper}>
    <div ref={componentRef} className={RoomPlotCSS.printContainer}>
    <SchedulerFaculty room = {selectedRoom} isBlockClassess = {true} ref={childComponentRef} readOnly = {true} year={year} block={block} setBlockChild={setBlockChild}/>
    </div>
    </div>
    <div className={RoomPlotCSS.bottomButtons}>

    <div className={RoomPlotCSS.left}>
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
  
    <div className={RoomPlotCSS.middle}>
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

    <div className={RoomPlotCSS.right}>
      
      
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
      <Box sx={style} className={RoomPlotCSS.boxWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={RoomPlotCSS.noStudents}>
          <p>Number of Students</p>
          <h3>119</h3>
        </div>
        <div className={RoomPlotCSS.blkCapacity}>
          <p>Block Capacity</p>
          <TextField
            id="outlined-number"
            type="number"
            sx={{ width: "6rem" }}
          />
        </div>
        <div className={RoomPlotCSS.noBlocks}>
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

export default RoomPlotPage