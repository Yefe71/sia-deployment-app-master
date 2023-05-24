import React, {useLayoutEffect, useState, useEffect, useRef} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import StudyPlanCSS from "./StudyPlan.module.css";
import { Button, Stack, useMediaQuery } from "@mui/material";
import ProfessorTable from "../ProfessorTable/ProfessorTable";
import StudyPlanForm from "../StudyPlanForm/StudyPlanForm";
import TableFormStudents from "../TableFormStudents/TableFormStudents";
import TableManageBlock from "../TableManageBlock/TableManageBlock";
import TableStudentsList from "../TableStudentsList/TableStudentsList";
import TableStudyPlan from "../TableStudyPlan/TableStudyPlan";
import dayjs from "dayjs";
import { filter } from "lodash";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


const StudyPlan = () => {
  const [student, setStudent] = React.useState("");
  const [block, setBlock] = React.useState("");
  const [isFormValid, setIsFormValid] = useState(false)
  const [rowsChild, setRowsChild] = useState([])
  const [schedules, setSchedules] = useState([])
  const [generatedSchedules, setGeneratedSchedules] = useState([])
  const [genClicked, setGenClicked] = useState(false)
  const [filterChanged, setFilterChanged] = useState(false)
  const [dataChild, setDataChild] = useState([])


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
    const doc = new jsPDF('l'); // Set to 'l' for landscape orientation
    const head = [["ID", "Professor Name", "Year", "Block", "Course Name", "Course Code",  "Class Type",  "Room", "Day", "Start Time", "End Time"]];

    const body = data.map((row, index) => [
      index + 1,
      row.professorName,
      row.year,
      row.block,
      row.courseName,
      row.courseCode,
      row.classType,
      row.room,
      formatDate(row.day),
      formatTime(row.startDate),
      formatTime(row.endDate)
    ]);

    doc.autoTable({
      head: head,
      body: body,
    });

    doc.save("students.pdf");
  };

  const exportAsExcel = (data) => {
    console.log(dataChild, "datachild!")
    const headers = ["ID", "Professor Name", "Year", "Block", "Course Name", "Course Code",  "Class Type",  "Room", "Day", "Start Time", "End Time"];

    const dataArray = data.map((row, index) => [
      index + 1,
      row.professorName,
      row.year,
      row.block,
      row.courseName,
      row.courseCode,
      row.classType,
      row.room,
      formatDate(row.day),
      formatTime(row.startDate),
      formatTime(row.endDate)
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...dataArray]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  
  const handleChangeStudent = (event) => {
    setStudent(event.target.value);
    setFilterChanged(true)
  };



const handleGenerate = () => {

  
      const filteredObjects = schedules.filter(obj => {
        return rowsChild.some(course => course.code === obj.courseCode);
      });

      // Step 1: Group objects by course code
      const groupedObjects = filteredObjects.reduce((groups, obj) => {
        const courseCode = obj.courseCode;
        if (!groups[courseCode]) {
          groups[courseCode] = [];
        }
        groups[courseCode].push(obj);
        return groups;
      }, {});
      function schedulesConflict(a, b) {
        return new Date(a.startDate) < new Date(b.endDate) && new Date(a.endDate) > new Date(b.startDate);
    }

    let outputSchedules = [];
    for (const course of rowsChild) {
        const courseSchedules = schedules.filter(s => s.courseCode === course.code).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        for (const schedule of courseSchedules) {
            if (!outputSchedules.some(s => schedulesConflict(s, schedule))) {
                outputSchedules.push(schedule);
                break;
            }
        }
    }

    for (const schedule of outputSchedules) {
        console.log(`Course Name: ${schedule.courseName}`);
        console.log(`Day: ${new Date(schedule.startDate).toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" })}`);
        console.log(`Start Date: ${new Date(schedule.startDate).toLocaleTimeString("en-US", { timeZone: "Asia/Shanghai" })}`);
        console.log(`End Date: ${new Date(schedule.endDate).toLocaleTimeString("en-US", { timeZone: "Asia/Shanghai" })}`);
        console.log('\n');
    }

    let updatedSchedules = outputSchedules.map((obj, index) => {
      return { ...obj, studentName: student };
    });
    setGeneratedSchedules(updatedSchedules)
    console.log(genClicked)   // console.log(outputSchedules)

    clearChildForm()
  }
  

  
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


  const [irregulars, setIrregulars] = useState("");

  useEffect(() => {
    const fetchIrregulars = async () => {
      try {
        const response = await fetch(`http://localhost:3000/grabIrregulars`);
        const data = await response.json();

        const compareByLastName = (a, b) => {
          const lastNameA = a.last_name.toUpperCase();
          const lastNameB = b.last_name.toUpperCase();
          if (lastNameA < lastNameB) {
            return -1;
          }
          if (lastNameA > lastNameB) {
            return 1;
          }
          return 0;
        };

        // Sort the array by last name
        data.sort(compareByLastName);

        setIrregulars(data);
    
    
      } catch (error) {
        console.log(error);
      }
    };
  
  
    fetchIrregulars();
  }, [filterChanged]);


  useEffect(() => {
    
    console.log(rowsChild, "I'M ROWS CHILD")
    console.log(schedules)
  }, [rowsChild]);
  
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch(`http://localhost:3000/grabSchedules`);
        const data = await response.json();
        const rows = data.map((item) => ({
          id: item.id,
          color: item.color,
          startDate: item.start_date,
          endDate: item.end_date,
          professorName: item.professor_name,
          year: item.year,
          block: item.block,
          courseName: item.course_name,
          courseCode: item.course_code,
          actualUnits: item.actual_units,
          units: item.units,
          classType: item.class_type,
          room: item.room,
          day: dayjs(item.day).format("YYYY-MM-DD"),
          currentCapacity: item.current_capacity,
          maxCapacity: item.max_capacity
        }));
        console.log(rows, "grab schedules");

        setSchedules(rows)
        console.log(rows)
      } catch (error) {
        console.log(error);
      } 
    }

    fetchSchedules()
 
 
  }, []);
  const childRef = useRef();
  const clearChildForm = () => {
    childRef.current.clearForm();
  };
  

  return (
    <>
      <div className={StudyPlanCSS.topTableWrapper}>
        <div className={StudyPlanCSS.topTable}>
      

        </div>

        <div className={StudyPlanCSS.tablesWrapper}>

          <div className={StudyPlanCSS.containerWrapperLeft}>
          <div className={StudyPlanCSS.topButtonsLeft}>
              <h2>Study Plan</h2>
            
              <FormControl
                sx={{
                  mr: 0.6,
                  minWidth: isSmallScreen ? 90 : 115,
                }}
              >
                <Select
                  value={student}
                  onChange={handleChangeStudent}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    width:"24ch",
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    fontFamily: "Poppins",
                    fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                    padding: "0rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem"
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "28ch",
                        minWidth: "25ch",
                        overflow: "auto",
                                      
                      },
                    },
                  }}
                >
                  <MenuItem style={{ fontSize: '0.95rem' }} value="">Irregular Student</MenuItem>
                  {irregulars ? irregulars.map((student) => 
                  {
                  return <MenuItem  style={{ fontSize: '0.95rem' }} value={`${student.last_name}, ${student.first_name} ${student.middle_name}`}>{`${student.last_name}, ${student.first_name} ${student.middle_name}`}</MenuItem>
                   })
                  : ""}
                
                   
                </Select>
              </FormControl>

            </div>
            <div className={`${StudyPlanCSS.tableWrapperLeft}`}>
                <StudyPlanForm ref={childRef} setRowsChild={setRowsChild} setIsFormValid = {setIsFormValid} selectedStudent = {student} />
            </div> 
            <div className={StudyPlanCSS.bottomButtonsLeft}>
              <Stack spacing={2} direction="row">
                <Button
                  // onClick={handleGenerate}
                  onClick={() => {
                    handleGenerate()
                    setGenClicked(true)
                    
                  }}
                  style={{ textTransform: "none" }}
                  sx={{
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
                  disabled = {isFormValid}
                >
                  Generate
                </Button>
              </Stack>
            </div>
            
          </div>

            <div className={StudyPlanCSS.containerWrapperRight}>
            <div className={StudyPlanCSS.topButtonsRight}>
              <FormControl
               
                sx={{
                  mr: 0.6,
                  minWidth: isSmallScreen ? 90 : 115,
                }}
              >
                <Select
                  style={{visibility: "hidden"}}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    backgroundColor: "white",
                    marginBottom: "0.5rem",
                    borderRadius: "0.5rem",
                    fontFamily: "Poppins",
                    fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                    padding: "0rem",
                    fontWeight: "600",
                  }}
                >
                  <MenuItem value="">Irregular Student</MenuItem>

                </Select>
              </FormControl>

            </div>
            <div className={`${StudyPlanCSS.tableWrapperRight}`}>
                <TableStudyPlan selectedStudent = {student} generatedSchedules = {generatedSchedules} genClicked = {genClicked} setGenClicked = {setGenClicked} setFilterChanged = {setFilterChanged} filterChanged={filterChanged} setDataChild={setDataChild}/>
            </div> 
            <div className={StudyPlanCSS.middle}>
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


        </div>



      </div>

    </>
  );
};

export default StudyPlan;
