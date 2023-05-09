import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

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
    transition: 'background-color 0.5s ease',
  });
  
  const StyledTableHead = styled(TableHead)({
    position: 'sticky',
    top: 0,
    zIndex: 1,
  });

const TableManageBlock = ({yearForm, blockForm, refreshData, actionRefreshData, yearButton, refreshDataTransfer, blockButton, filterRefreshData, setDataChild, setBlockChild, setNumYearBlock, addStudentId}) => {


  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refreshWholePage, setRefreshWholePage] = useState(false);

  const [yearBlock1, setYearBlock1] = useState([])
  const [yearBlock2, setYearBlock2] = useState([])
  const [yearBlock3, setYearBlock3] = useState([])
  const [yearBlock4, setYearBlock4] = useState([])
  const [yearBlock5, setYearBlock5] = useState([])
  const [blinkStudentId, setBlinkStudentId] = useState(null);



  useEffect(() => {
    const fetchDataButtons = async () => {
      try {
        const responses = await Promise.all([
          fetch(`http://localhost:3000/grabStudentsButtons?yearButton=1&blockButton=''`),
          fetch(`http://localhost:3000/grabStudentsButtons?yearButton=2&blockButton=''`),
          fetch(`http://localhost:3000/grabStudentsButtons?yearButton=3&blockButton=''`),
          fetch(`http://localhost:3000/grabStudentsButtons?yearButton=4&blockButton=''`),
          fetch(`http://localhost:3000/grabStudentsButtons?yearButton=5&blockButton=''`),
        ]);

        const dataPromises = responses.map((response) => response.json());
        const allData = await Promise.all(dataPromises);

        allData.forEach((data, index) => {
          setData(data);
          setDataChild(data);
          const uniqueBlocks = [...new Set(data.map((student) => student.block))].sort();
          if (index === 0) setYearBlock1(uniqueBlocks);
          else if (index === 1) setYearBlock2(uniqueBlocks);
          else if (index === 2) setYearBlock3(uniqueBlocks);
          else if (index === 3) setYearBlock4(uniqueBlocks);
          else if (index === 4) setYearBlock5(uniqueBlocks);
        });

        setNumYearBlock(yearBlock1, yearBlock2, yearBlock3, yearBlock4, yearBlock5);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataButtons();
  }, []);
  



  useEffect(() => {
    const fetchDataButtons = () => {
      fetch(`http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=''`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setDataChild(data);
          const uniqueBlocks = [...new Set(data.map((student) => student.block))].sort();
          setBlockChild(uniqueBlocks);
          
        })
        .catch((error) => console.log(error));
    };

    fetchDataButtons();
  }, [yearButton]);

  const fetchDataButtons = () => {

 
      fetch(`http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=${blockButton}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setDataChild(data);
        })
        .catch((error) => console.log(error));
  };

  const fetchDataAction = () => {

 
      fetch(`http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=${blockButton}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setDataChild(data);

          const index = data.findIndex(
            (student) => student.student_id === addStudentId
          );

          console.log(index)
          console.log(data[index])
          console.log('page', Math.floor(index / rowsPerPage))
          setPage(Math.floor(index / rowsPerPage));


          // Set the blinkStudentId and clear it after 1 second
          setBlinkStudentId(addStudentId);
          setTimeout(() => {
            setBlinkStudentId(null);
          }, 1000);

        })

        
        .catch((error) => console.log(error));
  };


  const fetchData = () => {

    console.log('i ran too helo', yearForm, blockForm)
    if (yearForm && blockForm) {
      fetch(`http://localhost:3000/grabStudents?year=${yearForm}&numBlock=${blockForm}&yearButton=${yearButton}&blockButton=${blockButton}`)
        .then((response) => response.json())
        .then((data) => {
          
          setData(data);
          setDataChild(data);
          const uniqueBlocks = [...new Set(data.map((student) => student.block))].sort();  
          console.log(uniqueBlocks)
          setBlockChild(uniqueBlocks);

        })
        .catch((error) => console.log(error));
        
    }
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // useEffect(() => {
  //   setPage(0); // Set the page state to 0
  // }, [data]); // Watch for changes in the data state

  useEffect(() => {
    fetchData();
    console.log('i ran form')
  }, [refreshData]);

  useEffect(() => {
    fetchDataButtons();
    setPage(0);
    console.log('i ran buttons')
  }, [filterRefreshData]);
  
  
  useEffect(() => {
    fetchDataAction();
    console.log("TUMAKBO AKO!")
  }, [actionRefreshData]);
  
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
          <StyledTableCell>Suffix</StyledTableCell>
          <StyledTableCell>Standing</StyledTableCell>
          <StyledTableCell>Year</StyledTableCell>
          <StyledTableCellRight>Block</StyledTableCellRight>
        </StyledTableRow>
      </StyledTableHead>
      <TableBody>
      {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <StyledTableRow      key={row.id}
            style={{
              backgroundColor:
                row.student_id === blinkStudentId ? "#98c1ff" : "white",
            }}>
              <TableCell>{page * rowsPerPage + index + 1}</TableCell>
              <TableCell>{row.student_id}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.middle_name}</TableCell>
              <TableCell>{row.suffix}</TableCell>
              <TableCell>{row.standing}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.block}</TableCell>
            </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    </StyleTable>
    <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </>
  );
};

export default TableManageBlock;


  