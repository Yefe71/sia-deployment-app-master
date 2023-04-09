import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


function exportAsPDF(data) {
  const doc = new jsPDF();
  const headers = [
      'Student ID',
      'Last Name',
      'First Name',
      'Middle Name',
      'Standing',
      'Year',
      'Block',
  ];

  const rows = data.map((obj) => [
      obj.student_id,
      obj.last_name,
      obj.first_name,
      obj.middle_name,
      obj.standing,
      obj.year,
      obj.block,
  ]);

  doc.autoTable({
      head: [headers],
      body: rows,
  });

  doc.save('students.pdf');
}

function exportAsExcel(data) {
    const ws = XLSX.utils.json_to_sheet(data, {
        header: [
            'student_id',
            'last_name',
            'first_name',
            'middle_name',
            'standing',
            'year',
            'block',
        ],
        skipHeader: true,
    });

    // Add the custom header row
    XLSX.utils.sheet_add_aoa(ws, [
        [
            'Student ID',
            'Last Name',
            'First Name',
            'Middle Name',
            'Standing',
            'Year',
            'Block',
        ],
    ], { origin: 'A1' });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'students.xlsx');
}




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

const TableManageBlock = ({yearForm, blockForm, refreshData, yearButton, blockButton, filterRefreshData}) => {


  const [data, setData] = useState([])




  const fetchDataButtons = () => {
    console.log(yearButton, blockButton)
      fetch(`http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=${blockButton}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    
  };


  const fetchData = () => {
    if (yearForm && blockForm) {
      fetch(`http://localhost:3000/grabStudents?year=${yearForm}&numBlock=${blockForm}&yearButton=${yearButton}&blockButton=${blockButton}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    console.log('hahahahah')
    fetchData();
  }, [refreshData]);

  useEffect(() => {
    fetchDataButtons();
  }, [filterRefreshData]);


  return (
    <>
    <button onClick={() => exportAsPDF(data)}>Export as PDF</button>
    <button onClick={() => exportAsExcel(data)}>Export as Excel</button>
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
