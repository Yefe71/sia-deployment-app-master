import React, {useState, useLayoutEffect, useEffect} from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SubjectAssignCSS from "./SubjectAssignPageStudent.module.css";
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
import SchedulerFaculty from '../SchedulerFaculty/SchedulerFaculty';
import * as XLSX from 'xlsx/xlsx.mjs';
const SubjectAssignPageStudent = () => {

  const handleClick = () => {
    // Call the function in the child component
    childComponentRef.current.openModal();
  };

  const childComponentRef = React.useRef();
  
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

//sched filters

  const [blockChild, setBlockChild] = useState([])
  const [year, setYear] = useState([])
  const [professorNames, setProfessorNames] = useState([])
  
  const [selectedProfessor, setSelectedProfessor] = useState([])



  
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const [block, setBlock] = React.useState([])
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };
  const handleChangeProfessorName = (event) => {
    setSelectedProfessor(event.target.value);
    setSelectedValue(event.target.value);
  };

  const [yearProp, setYearProp] = useState(null)
  const [blockProp, setBlockProp] = useState(null)
  const [yearTable, setYearTable] = useState(null)
  
  const handleDataFromChild = (yearData, blockData) => {

    if (isCreateClicked === "clicked" && isNewSched === true && isEditConflict === true){
      setYearProp(yearData);
      setBlockProp(blockData);
      setIsNewSched(false);
      setIsCreateClicked(false);
    }else{
      setIsNewSched(false);
      setIsCreateClicked(false);
    }
  };

  const [isCreateClicked, setIsCreateClicked] = useState("notClicked")
  const [isNewSched, setIsNewSched] = useState(false)
  const [isEditConflict, setIsEditConflict] = useState(false)
  
  const handleClickFromChild = (isCreateClicked) => {
    
    setIsCreateClicked(isCreateClicked);

  };


const handleYearBlockAdd = (year, block) => {


        setYear(year)
        setBlock(block)

  
}

  
  useEffect(() => {
    setSelectedProfessor('1');
    setYear('0');
    setBlock('0');
    const timeoutId = setTimeout(() => {
      setSelectedProfessor('');
      setYear('');
      setBlock('');
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  useEffect(() => {
    const yearArray = [yearProp];
    const blockArray = [blockProp];

    if (isCreateClicked === "clicked" && isNewSched === true && isEditConflict === true) {
      console.log("I RAN WTF!");
      handleClickFromChild("notClicked");
      setYear(yearArray);
      setBlock(blockArray);
      setIsNewSched(false);
      setIsCreateClicked(false);
    }else{
      setIsNewSched(false);
      setIsCreateClicked(false);
    }
    
 
  }, [isCreateClicked]);





  const fetchProfNames = async () => {
    try {
      console.log("i ran prof");
      const response = await fetch("http://localhost:3000/grabProfessorsNames");
      const data = await response.json();
      setProfessorNames(data)
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
  }

  useEffect( () => {

    fetchProfNames()

  }, [])

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

    const [isFocused, setIsFocused] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleFocus = () => {
      setIsFocused(true);
    }
  
    const handleBlur = () => {
      setIsFocused(false);
    }
    const ExcelDateToJSDate = (date) => {
      let converted_date = new Date(Math.round((date - 25569) * 864e5));
      converted_date = String(converted_date).slice(4, 15);
      const dateArr = converted_date.split(" ");
      let day = dateArr[1];
      let month = dateArr[0];
      month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1;
      if (month.toString().length <= 1) {
        month = '0' + month;
      }
      let year = dateArr[2];
      return year + '-' + month + '-' + day;
    }
    
    function handleFileUpload(e) {
      e.preventDefault();
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          
          // Iterate over each row in the JSON array
          json.forEach(row => {
            // Convert the "day" value to a human-readable date format
            row.day = ExcelDateToJSDate(row.day);
            
            // Convert "start_date" and "end_date" to the desired format
            row.start_date = new Date(row.start_date).toISOString();
            row.end_date = new Date(row.end_date).toISOString();
          });
    
          console.log(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    }
    
    
  return (
    <>
      <div className={SubjectAssignCSS.topTableWrapper}>
        <div className={SubjectAssignCSS.topTable}>
          <h2>{`Subject Assignment`}</h2>
          <div className={SubjectAssignCSS.topButtons}>
            <FormControl
              onFocus={handleFocus}
              onBlur={handleBlur}
              sx={{
                mr: 0.6,
                // width: (isFocused || (selectedValue !== "" && selectedValue !== "Professor") || isSmallScreen) ? '240px' : '125px',
                // '&:hover': {
                //   width: '240px',
                // },
              width: "200px",
                transition: 'width 0.1s ease',
              }}
            >
              <Select
                value={selectedProfessor}
                onChange={handleChangeProfessorName}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5, // where 48 is the item height
                      width: "5ch",
                      minWidth: "25ch",
                      overflow: "auto",
                    },
                  },
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
                <MenuItem value="">Professor</MenuItem>
                {professorNames.map((professor, index) => (
                  <MenuItem value={professor.full_name} key={index}>
                      {professor.full_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        <div className={SubjectAssignCSS.tableWrapper}>
          <SchedulerFaculty isStudent = {true} handleYearBlockAdd = {handleYearBlockAdd} setIsEditConflict = {setIsEditConflict} setIsNewSched = {setIsNewSched} setYearParent={setYear} setBlockParent={setBlock}  clicked={isCreateClicked}  handleClickFromChild = {handleClickFromChild} onDataReceived={handleDataFromChild} readOnly = {false} ref={childComponentRef} selectedProfessorParent = {setSelectedProfessor} professorName = {selectedProfessor} year={year} block={block} setBlockChild={setBlockChild}/>
        </div>
        <div className={SubjectAssignCSS.bottomButtons}>
          <div className={SubjectAssignCSS.left}>
     <Stack spacing={2} direction="row">
              <Button
                // onClick={handleClick}
                style={{ textTransform: "none" }}
                sx={{
                  backgroundColor: "#e73f31",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#dd3e30", // Change the hover background color here
                  },
                }}
                variant="contained"
              >
                Clear
              </Button>
              
            </Stack>
          <Stack spacing={2} direction="row">
              <Button
                // onClick={handleClick}
                style={{ textTransform: "none" }}
                sx={{
                  backgroundColor: "#37af47",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#33a141", // Change the hover background color here
                  },
                }}
                component="label"
                variant="contained"
              >
                Upload Minors CSV  
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
              
            </Stack>
          
          </div>
          <div className={SubjectAssignCSS.middle}>
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
          <div className={SubjectAssignCSS.right}>

            <Stack spacing={2} direction="row">
              <Button
                onClick={handleClick}
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


    </>
  );
}

export default SubjectAssignPageStudent