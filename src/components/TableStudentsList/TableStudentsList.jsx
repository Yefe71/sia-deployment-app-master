import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const StickyPagination = styled('div')({
  position: 'sticky',
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

const TableStudentsList = ({standing, setDataChild, yearButton, blockButton}) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDataButtons = () => {
      console.log(standing, 'me!!')
      fetch(`http://localhost:3000/grabStudentsButtons?standingButton=${standing}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setDataChild(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    };

    fetchDataButtons();
  }, [standing]);

  const fetchDataButtonsYear = () => {
    fetch(
      `http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=${blockButton}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setDataChild(data);

      })
      .catch((error) => console.log(error));
  };



  const fetchDataButtonsBlock = () => {
    fetch(
      `http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=${blockButton}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setDataChild(data);

        console.log("hoho block", data)

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
      console.log("i ran year  data");
   
  }, [yearButton]);

  useEffect(() => {
 
      fetchDataButtonsBlock();
      setPage(0);
      console.log("i ran block data");
    
  }, [blockButton]);

  useEffect(() => {
    setPage(0); // Set the page state to 0
  }, [data]); // Watch for changes in the data state

  

  return (
    <>

    <StyleTable>
    <Table>
      <StyledTableHead>
        <StyledTableRow>
        <StyledTableCellID>ID</StyledTableCellID>
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
      {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <StyledTableRow key={row.id}>
              <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
    </>
  );
};

export default TableStudentsList;
