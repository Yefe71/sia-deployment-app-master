import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';;
import 'jspdf-autotable';
import TableSchedCSS from './TableSchedCSS.module.css'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

const StickyPagination = styled('div')({
  position: 'absolute',
  bottom: 0,
  width: '100%',  // make sure it stretches to full width
  backgroundColor: '#f7f4f4',
  zIndex: 1,
  padding: "2px 0px",
  marginTop: 'auto', 

});


const StyledTableCellID = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f7f4f4',
});

const StyleTable = styled(Table)({

  });
  
  const StyledTableCellLeft = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f7f4f4',

  });
  
  const StyledTableCellRight = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f7f4f4',

    borderTopRightRadius: '1rem'
  });
  const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f7f4f4',
  });
  
  const StyledTableRow = styled(TableRow)({
    backgroundColor: '#ffffff',
  });
  
  const StyledTableHead = styled(TableHead)({
    position: 'sticky',
    top: 0,
    zIndex: 1,
  });

const TableSchedSummary = ({selectedStudent, generatedSchedules, genClicked, setGenClicked}) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(0);
  // const [minors, setMinors] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  const fetchMinors = async () => {
    try {
      const response = await fetch("http://localhost:3000/grabMinors");
      const data = await response.json();

      return data
    } catch (error) {
      console.error("Error fetching minors names:", error);
    }
  }

  const fetchStudyPlans = async () => {
    try {

      const minors = await fetchMinors();


      const response = await fetch("http://localhost:3000/grabSchedules");
      const data = await response.json();
      console.log(data, "fetch study plans")
      
      const convertedData = data.map(item => {
        return {
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
        }
      });

      
      const minorNames = minors.map(minor => minor.name);

      console.log(minorNames, "MINOR NAMES")
      console.log(convertedData, "CONVERTED DATA")
      const filteredSchedules = convertedData.filter(schedule => !minorNames.includes(schedule.courseName));
      console.log(filteredSchedules, "FILTERED DATA")
      
      setData(filteredSchedules)
      console.log(convertedData, "CONVERTED!")
      // return convertedData;  // Return the fetched data
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
  }

  useEffect(() => {
    fetchStudyPlans()
  }, []);

 

  useEffect(() => {
    
    fetchStudyPlans()
  }, []);

  


 




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


  
  return (
    <div className={TableSchedCSS.studyPlanTableWrapper}>
    <StyleTable>
    <Table>
      <StyledTableHead>
        <StyledTableRow>
        <StyledTableCellID>ID</StyledTableCellID>
          <StyledTableCellLeft>Professor Name</StyledTableCellLeft>
          <StyledTableCell>Year</StyledTableCell>
          <StyledTableCell>Block</StyledTableCell>
          <StyledTableCell>Course Name</StyledTableCell>
          <StyledTableCell>Course Code</StyledTableCell>
          <StyledTableCell>Units</StyledTableCell>
          <StyledTableCell>Actual Units</StyledTableCell>
          <StyledTableCell>Class Type</StyledTableCell>
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
            <StyledTableRow key={row.id}>
              <TableCell>{page * rowsPerPage + index + 1}</TableCell>
              <TableCell>{row.professorName}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.block}</TableCell>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>{row.courseCode}</TableCell>
              <TableCell>{row.units}</TableCell>
              <TableCell>{row.actualUnits}</TableCell>
              <TableCell>{row.classType}</TableCell>
              <TableCell>{row.room}</TableCell>
              <TableCell>{formatDate(row.day)}</TableCell>
              <TableCell>{formatTime(row.startDate)}</TableCell>
              <TableCell>{formatTime(row.endDate)}</TableCell>
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
        rowsPerPageOptions={[10, 25, 50, 100]}
      
      />
      </StickyPagination>
    </div>
  );
};

export default TableSchedSummary;
