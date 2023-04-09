import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';


// const data = [
//   { id: 1, lastName: 'Doe', firstName: 'John', middleName: 'Adam', suffix: 'Jr', idNumber: '123456', status: 'Active' },
//   { id: 2, lastName: 'Smith', firstName: 'Jane', middleName: 'Elizabeth', suffix: '', idNumber: '654321', status: 'Inactive' },
//   { id: 3, lastName: 'Williams', firstName: 'David', middleName: 'Michael', suffix: '', idNumber: '789012', status: 'Active' },
//   { id: 4, lastName: 'Brown', firstName: 'Emily', middleName: 'Rose', suffix: '', idNumber: '345678', status: 'Inactive' },
//   { id: 5, lastName: 'Johnson', firstName: 'William', middleName: 'Thomas', suffix: 'Sr', idNumber: '901234', status: 'Active' },
//   { id: 6, lastName: 'Davis', firstName: 'Jessica', middleName: 'Anne', suffix: '', idNumber: '567890', status: 'Inactive' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
//   { id: 7, lastName: 'Garcia', firstName: 'Robert', middleName: 'Lee', suffix: '', idNumber: '432109', status: 'Active' },
// ];

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

const TableManageBlock = ({yearForm, blockForm, refreshData}) => {


  const [data, setData] = useState([])



  const fetchData = () => {
    if (yearForm && blockForm) {
      fetch(`http://localhost:3000/grabStudents?year=${yearForm}&numBlock=${blockForm}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    console.log('hahahahah')
    fetchData();
  }, [refreshData]);


  return (
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
  );
};

export default TableManageBlock;
