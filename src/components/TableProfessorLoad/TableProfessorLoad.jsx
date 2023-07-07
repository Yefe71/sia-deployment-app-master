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
    height: 50, // Adjust the height value as needed
  });

const TableProfessorLoad = ({dataChangeValue, standing, setDataChild, yearButton, blockButton}) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch(`http://localhost:3000/grabProfessors`);
        const data = await response.json();
  
        // Sort data by last name alphabetically
        data.sort((a, b) => a.last_name.localeCompare(b.last_name));
  
        const rows = data.map((item) => ({
          // id: item.id,
          fullname: `${item.last_name}, ${item.first_name}`,
          employment: item.employment,
          currentUnits: item.current_units,
          maxUnits: item.max_units,
        }));
        setData(rows);
        setDataChild(rows);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProfessors();
  }, [dataChangeValue]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    setPage(0); // Set the page state to 0
  }, [data]); // Watch for changes in the data state

  

  return (
    <>

    <StyleTable>
    <Table size = "small">
      <StyledTableHead >
        <StyledTableRow >
        <StyledTableCellID>ID</StyledTableCellID>
          <StyledTableCellLeft>Full Name</StyledTableCellLeft>
          <StyledTableCell>Employment</StyledTableCell>
          <StyledTableCell>Current Units</StyledTableCell>
          <StyledTableCell>Max Units</StyledTableCell>
        </StyledTableRow>
      </StyledTableHead>
      <TableBody>
      {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <StyledTableRow key={row.id}>
              <TableCell >{page * rowsPerPage + index + 1}</TableCell>
              <TableCell>{row.fullname}</TableCell>
              <TableCell>{row.employment}</TableCell>
              <TableCell>{row.currentUnits}</TableCell>
              <TableCell>{row.maxUnits}</TableCell>
  
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

export default TableProfessorLoad;
