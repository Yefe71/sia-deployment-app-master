import React, {useLayoutEffect} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import StudyPlanCSS from "./StudyPlan.module.css";
import { useMediaQuery } from "@mui/material";
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
                <MenuItem value="">1st Year</MenuItem>
                <MenuItem value={10}>2nd Year</MenuItem>
                <MenuItem value={20}>3rd Year</MenuItem>
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
                <MenuItem value="">Block 1</MenuItem>
                <MenuItem value={10}>Block 2</MenuItem>
                <MenuItem value={20}>Block 3</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className={`${StudyPlanCSS.tableWrapper}`}>

        
        </div> 
      </div>

    </>
  );
};

export default StudyPlan;
