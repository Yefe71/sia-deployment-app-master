import React, {useLayoutEffect} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SchedSumCSS from "./SchedSummaryPage.module.css";
import { useMediaQuery } from "@mui/material";
import TableSchedSummary from "../TableSchedSummary/TableSchedSummary";
const SchedSummaryPage = () => {
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
      <div className={SchedSumCSS.topTableWrapper}>
        <div className={SchedSumCSS.topTable}>
          <h2>Schedule Summary</h2>
        </div>

        <div className={`${SchedSumCSS.tableWrapper} ${SchedSumCSS.sched}`}>
            <TableSchedSummary/>
        
        </div>
      </div>

    </>
  );
};

export default SchedSummaryPage;
