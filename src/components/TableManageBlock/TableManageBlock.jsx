import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';



const StyleTable = styled(Table)({
    // borderCollapse: 'collapse',
    // '& th': {
    //   fontWeight: 'bold',
    //   backgroundColor: '#f2f2f2',
    //   padding: '8px',
    // },
    // '& td': {
    //   border: '1px solid #ddd',
    //   padding: '8px',
    // },
  });
  
  const StyledTableCellLeft = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f7f4f4',

    borderTopLeftRadius: '1rem'
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

const TableManageBlock = ({yearForm, blockForm, refreshData, yearButton, blockButton, filterRefreshData, setDataChild}) => {


  const [data, setData] = useState([])

  const fetchDataButtons = () => {
    console.log(yearButton, blockButton)
      fetch(`http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=${blockButton}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setDataChild(data); // call setDataChild with the fetched data
        })
        .catch((error) => console.log(error));
    
    
  };


  const fetchData = () => {
    if (yearForm && blockForm) {
      fetch(`http://localhost:3000/grabStudents?year=${yearForm}&numBlock=${blockForm}&yearButton=${yearButton}&blockButton=${blockButton}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setDataChild(data); // call setDataChild with the fetched data
        })
        .catch((error) => console.log(error));
        
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshData]);

  useEffect(() => {
    fetchDataButtons();
  }, [filterRefreshData]);


  return (
    <>

    <StyleTable>
    <Table>
      <StyledTableHead>
        <StyledTableRow>
          <StyledTableCellLeft>Student ID</StyledTableCellLeft>
          <StyledTableCell>Last Name</StyledTableCell>
          <StyledTableCell>First Name</StyledTableCell>
          <StyledTableCell>Middle Name</StyledTableCell>
          <StyledTableCell>Standing</StyledTableCell>
          <StyledTableCell>Year</StyledTableCell>
          <StyledTableCellRight>Block</StyledTableCellRight>
        </StyledTableRow>
      </StyledTableHead>
      <TableBody>
        {data.map((row) => (
          <StyledTableRow key={row.id}>
            <TableCell>{row.student_id}</TableCell>
            <TableCell>{row.last_name}</TableCell>
            <TableCell>{row.first_name}</TableCell>
            <TableCell>{row.middle_name}</TableCell>
            <TableCell>{row.standing}</TableCell>
            <TableCell>{row.year}</TableCell>
            <TableCell>{row.block}</TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    </StyleTable>
    
    </>
  );
};

export default TableManageBlock;
