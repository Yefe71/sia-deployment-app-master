import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import TableStudyPlanCSS from './TableStudyPlan.module.css'

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

const TableStudyPlan = ({standing, setDataChild, yearButton, blockButton}) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const fetchStudyPlans = async () => {
    try {
      console.log("i ran prof");
      const response = await fetch("http://localhost:3000/grabStudyPlans");
      const data = await response.json();
      setData(data)
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
  }

  useEffect( () => {

    fetchStudyPlans()

  }, [])
  // Helper function to format the date in YYYY-MM-DD format
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  // Helper function to format the time in HH:MM format
  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  };

  return (
    <div className={TableStudyPlanCSS.studyPlanTableWrapper}>

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
              <TableCell>{row.professor_name}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.block}</TableCell>
              <TableCell>{row.course_name}</TableCell>
              <TableCell>{row.course_code}</TableCell>
              <TableCell>{row.class_type}</TableCell>
              <TableCell>{row.room}</TableCell>
              <TableCell>{formatDate(row.day)}</TableCell>
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
        rowsPerPageOptions={[10, 25, 50, 100]}
      
      />
      </StickyPagination>
    </div>
  );
};

export default TableStudyPlan;
