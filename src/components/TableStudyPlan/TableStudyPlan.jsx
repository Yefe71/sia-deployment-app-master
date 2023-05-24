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

const TableStudyPlan = ({selectedStudent, generatedSchedules, genClicked, setGenClicked}) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(0);

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
      console.log(data, "fetch study plans")
      // Convert to camel case
      const convertedData = data.map(item => {
        return {
          professorName: item.professor_name,
          year: item.year,
          block: item.block,
          courseName: item.course_name,
          courseCode: item.course_code,
          classType: item.class_type,
          room: item.room,
          day: item.day,
          startDate: item.start_date,
          endDate: item.end_date,
          studentName: item.student_name
        }
      });

      console.log("I SET THE CONVERTED DATA WOOO")
      return convertedData;  // Return the fetched data
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
  }



  const updateStudyPlans = async () => {
    try {
      console.log(data);

      // Replace fetchedData with data from the state
      const fetchedData = await fetchStudyPlans();
    
      console.log('Generated schedules:', generatedSchedules);
      // Find the names in generatedSchedules
      let generatedNames = new Set(generatedSchedules.map(schedule => schedule.studentName));

      // Filter out the fetchedData that have names present in generatedNames
      let filteredFetchedData = fetchedData.filter(schedule => !generatedNames.has(schedule.studentName));

      // Combine the data
      const combinedData = [...filteredFetchedData, ...generatedSchedules];

      console.log(filteredFetchedData, "filteredFetchedData");
      console.log(generatedSchedules, "generated");
      console.log(combinedData, "combinedData");

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      };

      const response = await fetch(
        "http://localhost:3000/updateStudyPlans",
        requestOptions
      );
      const responseData = await response.json();
      setData(responseData);
      console.log(responseData, "updated scheds, should be latest");
      if (responseData.success) {
        console.log(responseData, "guds");
      } else {
        console.log(responseData, "error");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setDataUpdatedAt(Date.now());
    }
  }

  useEffect( () => {

    const fetchUpdatedStudyPlans = async () => {
      const updatedStudyPlans = await fetchStudyPlans();
      console.log(updatedStudyPlans, "UPDATED STUDY PLANS")
      setData(updatedStudyPlans)
    }

    fetchUpdatedStudyPlans()

  }, [])
  
  useEffect( () => {

    console.log("I CHANGED")
    const fetchUpdatedStudyPlans = async () => {
      const updatedStudyPlans = await fetchStudyPlans();
      console.log(updatedStudyPlans, "UPDATED STUDY PLANS")
      setData(updatedStudyPlans)
    }

    fetchUpdatedStudyPlans()

  }, [selectedStudent, dataUpdatedAt])

  
  useEffect( () => {
    console.log(generatedSchedules, "I received genScheds");
    console.log(generatedSchedules.length, "Length of generatedSchedules");

    
    if (generatedSchedules.length > 0){
      updateStudyPlans()
    }


  }, [generatedSchedules]);


  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

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
            .filter(row => selectedStudent? row.studentName === selectedStudent : row)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
            <StyledTableRow key={row.id}>
              <TableCell>{page * rowsPerPage + index + 1}</TableCell>
              <TableCell>{row.professorName}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.block}</TableCell>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>{row.courseCode}</TableCell>
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

export default TableStudyPlan;
