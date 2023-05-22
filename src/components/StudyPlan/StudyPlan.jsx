import React, {useLayoutEffect} from "react";
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
const StudyPlan = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");

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
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };
  return (
    <>
      <div className={StudyPlanCSS.topTableWrapper}>
        <div className={StudyPlanCSS.topTable}>
          <h2>Study Plan</h2>
          <div className={StudyPlanCSS.topButtons}>
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
                <MenuItem value="">Irregular Student</MenuItem>

              </Select>
            </FormControl>

          </div>
        </div>

        <div className={StudyPlanCSS.tablesWrapper}>

          <div className={StudyPlanCSS.containerWrapperLeft}>
            <div className={`${StudyPlanCSS.tableWrapperLeft}`}>
                <StudyPlanForm/>
            </div> 
            <div className={StudyPlanCSS.bottomButtonsLeft}>
              <Stack spacing={2} direction="row">
                <Button
                  // onClick={handleOpen}
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
                >
                  Generate
                </Button>
              </Stack>
            </div>
            
          </div>

            <div className={StudyPlanCSS.containerWrapperRight}>
            <div className={`${StudyPlanCSS.tableWrapperRight}`}>
                <TableStudyPlan/>
            </div> 
            <div className={StudyPlanCSS.middle}>
              <Stack spacing={2} direction="row">
                    <Button
                      style={{ textTransform: "none" }}
                      // onClick={() => exportAsPDF(dataChild)}
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
                      // onClick={() => exportAsExcel(dataChild)}
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
