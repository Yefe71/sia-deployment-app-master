import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import dayjs from "dayjs";

const dataRowSX = {
  display: "table-row",
  ":hover": {
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
  "&.disabled": {
    backgroundColor: "#f5f5f5",
    cursor: "not-allowed",
  },
  "&.clicked": {
    animation: "$blink 0.5s ease-in-out",
  },
  "@keyframes blink": {
    "0%": { backgroundColor: "transparent" },
    "50%": { backgroundColor: "#f5f5f5" },
    "100%": { backgroundColor: "transparent" },
  },
};


const StyledTableCellID = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f7f4f4",
});

const StyleTable = styled(Table)({
  height: '33.5rem',
   display: 'flex',
   justifyContent: 'space-between',
   flexDirection: 'column'
 });

const StyledTableCellLeft = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f7f4f4",
});

const StyledTableCellRight = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f7f4f4",

  borderTopRightRadius: "1rem",
});
const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f7f4f4",
});

const StyledTableRow = styled(TableRow)({
  backgroundColor: "#ffffff",
  transition: "background-color 0.5s ease",
});

const StyledTableHead = styled(TableHead)({
  position: "sticky",
  top: 0,
  zIndex: 1,
});

const StickyPagination = styled('div')({
  position: 'sticky',
  bottom: 0,
  width: '100%',  // make sure it stretches to full width
  backgroundColor: '#f7f4f4',
  zIndex: 1,
  padding: "2px 0px",
  marginTop: 'auto', 
});

const TableFormStudents = forwardRef(
  ({ yearTableProp, handleRowClick }, ref) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    const [clickedRow, setClickedRow] = useState(null);
    const [schedules, setSchedules] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
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
          }));

          setSchedules(rows);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      console.log(data, "schedules!");
    }, [data]);

    const isScheduleConflict = (row) => {
      return schedules.some(
        (schedule) =>
          schedule.year === row.year &&
          schedule.block === row.block &&
          schedule.courseCode === row.course_code &&
          schedule.professorName === row.professor_name &&
          schedule.room === row.room &&
          schedule.day === dayjs(row.day).format("YYYY-MM-DD") &&
          dayjs(schedule.startDate, "h:mm A").isSame(dayjs(row.start_date, "h:mm A")) &&
          dayjs(schedule.endDate, "h:mm A").isSame(dayjs(row.end_date, "h:mm A"))
      );
    };





    const handleClick = (id) => {
      setClickedRow(id);
      setTimeout(() => setClickedRow(null), 100);
    };

    const fetchDataButtonsYear = () => {
      fetch(`http://localhost:3000/grabMinorsData?yearButton=${yearTableProp}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      fetchDataButtonsYear();
      setPage(0);
      console.log("i ran year data");
    }, [yearTableProp]);

    const getDayLabel = (dateString) => {
      const date = new Date(dateString);
      date.setUTCDate(date.getUTCDate() + 1);
      const datePart = date.toISOString().split("T")[0];

      const dayLabels = [
        { value: "2023-01-02", label: "Mon" },
        { value: "2023-01-03", label: "Tue" },
        { value: "2023-01-04", label: "Wed" },
        { value: "2023-01-05", label: "Thu" },
        { value: "2023-01-06", label: "Fri" },
        { value: "2023-01-07", label: "Sat" },
        { value: "2023-01-08", label: "Sun" },
      ];

      const dayLabel = dayLabels.find((day) => day.value === datePart);

      return dayLabel ? dayLabel.label : "Date not found";
    };

    function formatTime(dateString) {
      const date = new Date(dateString);
      const hours = date.getHours();
      const minutes = date.getMinutes();


      const ampm = hours >= 12 ? "PM" : "AM";

 
      const formattedHours = hours % 12 || 12;

     
      const formattedMinutes = minutes.toString().padStart(2, "0");

      const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

      return formattedTime;
    }

    return (
      <>
        <StyleTable>
          <Table >
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableCellID>ID</StyledTableCellID>
                <StyledTableCellLeft>Professor Name</StyledTableCellLeft>
                <StyledTableCell>Year</StyledTableCell>
                <StyledTableCell>Course Name</StyledTableCell>
                <StyledTableCell>Course Code</StyledTableCell>

                <StyledTableCell>Room</StyledTableCell>
                <StyledTableCell>Class Type</StyledTableCell>
                <StyledTableCell>Day</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCellRight>End Time</StyledTableCellRight>
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
            {data
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const matchingSchedule = schedules.find(schedule => 
                  schedule.year === row.year &&
                  schedule.courseCode === row.course_code &&
                  schedule.professorName === row.professor_name &&
                  schedule.room === row.room &&
                  schedule.classType === row.class_type  &&
                  dayjs(schedule.day).format("YYYY-MM-DD") === dayjs(row.day).format("YYYY-MM-DD")  &&
                  schedule.startDate === row.start_date &&
                  schedule.endDate === row.end_date
                );

                const isDisabled = !!matchingSchedule; 

                const dataRowSXDisabled = {
                  ...dataRowSX,
                  pointerEvents: isDisabled ? 'none' : 'auto',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.5 : 1,
                };

                return (
                  <ButtonBase
                    key={row.id}
                    component={TableRow}
                    sx={isDisabled ? dataRowSXDisabled : dataRowSX}
                    onClick={() => {
                      if (!isDisabled) {
                        handleRowClick(row);
                        handleClick(row.id);
                      }
                    }}
                    className={row.id === clickedRow ? 'clicked' : ''}
                  >
                    <TableCell>{rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.professor_name}</TableCell>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.course_name}</TableCell>
                    <TableCell>{row.course_code}</TableCell>
                    <TableCell>{row.room}</TableCell>
                    <TableCell>{row.class_type}</TableCell>
                    <TableCell>{getDayLabel(row.day)}</TableCell>
                    <TableCell>{formatTime(row.start_date)}</TableCell>
                    <TableCell>{formatTime(row.end_date)}</TableCell>
                  </ButtonBase>
                );
              })}
            </TableBody>
          </Table>
        </StyleTable>
        {/* <StickyPagination>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[7, 14, 21, 28, 35]}
          />
        </StickyPagination> */}
      </>
    );
  }
);

export default TableFormStudents;
