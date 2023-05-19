import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useRef
} from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const StyledTableCellID = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f7f4f4",
});

const StyleTable = styled(Table)({

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
  padding: "1px 0px"
});

const TableFormStudents = forwardRef(
  (
    {
      yearTableProp,
    },
    ref
  ) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

 

    const fetchDataButtonsYear = () => {
      fetch(
        `http://localhost:3000/grabMinorsData?yearButton=${yearTableProp}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);

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
      const dayOfWeek = date.getDay();

      const dayLabels = [
        { value: "2023-01-02", label: "Mon" },
        { value: "2023-01-03", label: "Tue" },
        { value: "2023-01-04", label: "Wed" },
        { value: "2023-01-05", label: "Thu" },
        { value: "2023-01-06", label: "Fri" },
        { value: "2023-01-07", label: "Sat" },
        { value: "2023-01-08", label: "Sun" }
      ];

      return dayLabels[dayOfWeek].label;
    };

    function formatTime(dateString) {
      const date = new Date(dateString);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // Determine if it's AM or PM
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12;

      // Add leading zeros to minutes if needed
      const formattedMinutes = minutes.toString().padStart(2, '0');

      // Concatenate the formatted time string
      const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

      return formattedTime;
    }


    return (
      <>
        <StyleTable>
          <Table>
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableCellID>ID</StyledTableCellID>
                <StyledTableCellLeft>Professor Name</StyledTableCellLeft>
                <StyledTableCell>Year</StyledTableCell>
                <StyledTableCell>Course Name</StyledTableCell>
                <StyledTableCell>Course Code</StyledTableCell>

                <StyledTableCell>Room</StyledTableCell>
                <StyledTableCell>Day</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCellRight>End Time</StyledTableCellRight>
       
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow
                    key={row.id}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.professor_name}</TableCell>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.course_name}</TableCell>
                    <TableCell>{row.course_code}</TableCell>
                    <TableCell>{row.room}</TableCell>
                    <TableCell>{getDayLabel(row.day)}</TableCell>
                    <TableCell>{formatTime(row.start_date)}</TableCell>
                    <TableCell>{formatTime(row.end_date)}</TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </StyleTable>
        <StickyPagination>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[7, 14, 21, 28, 35]}
        />
        </StickyPagination>
      </>
    );
  }
);

export default TableFormStudents;