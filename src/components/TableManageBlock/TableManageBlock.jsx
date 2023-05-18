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
  padding: "2px 0px"
});

const TableManageBlock = forwardRef(
  (
    {
      yearForm,
      blockForm,
      refreshData,
      actionRefreshData,
      yearButton,
      refreshDataTransfer,
      blockButton,
      filterRefreshData,
      setDataChild,
      setBlockChild,
      setNumYearBlock,
    },
    ref
  ) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [refreshWholePage, setRefreshWholePage] = useState(false);

    const [yearBlock1, setYearBlock1] = useState([]);
    const [yearBlock2, setYearBlock2] = useState([]);
    const [yearBlock3, setYearBlock3] = useState([]);
    const [yearBlock4, setYearBlock4] = useState([]);
    const [yearBlock5, setYearBlock5] = useState([]);
    const [blinkStudentId, setBlinkStudentId] = useState(null);

    useEffect(() => {
      console.log('i ran')
      const fetchDataButtons = async () => {
        try {
          const responses = await Promise.all([
            fetch(
              `http://localhost:3000/grabStudentsButtons?yearButton=1&blockButton=''`
            ),
            fetch(
              `http://localhost:3000/grabStudentsButtons?yearButton=2&blockButton=''`
            ),
            fetch(
              `http://localhost:3000/grabStudentsButtons?yearButton=3&blockButton=''`
            ),
            fetch(
              `http://localhost:3000/grabStudentsButtons?yearButton=4&blockButton=''`
            ),
            fetch(
              `http://localhost:3000/grabStudentsButtons?yearButton=5&blockButton=''`
            ),
          ]);

          const dataPromises = responses.map((response) => response.json());
          const allData = await Promise.all(dataPromises);

          allData.forEach((data, index) => {
            // setData(data);
            console.log("check", data)
            setDataChild(data);
            const uniqueBlocks = [
              ...new Set(data.map((student) => student.block)),
            ].sort();
            if (index === 0) setYearBlock1(uniqueBlocks);
            else if (index === 1) setYearBlock2(uniqueBlocks);
            else if (index === 2) setYearBlock3(uniqueBlocks);
            else if (index === 3) setYearBlock4(uniqueBlocks);
            else if (index === 4) setYearBlock5(uniqueBlocks);
          });

          setNumYearBlock(
            yearBlock1,
            yearBlock2,
            yearBlock3,
            yearBlock4,
            yearBlock5
          );
        } catch (error) {
          console.log(error);
        }
      };

      fetchDataButtons();
    }, []);

    // // //YEAR BUTTON
    // useEffect(() => {
    //   if (isInitialMount.current) {
    //     isInitialMount.current = false;
    //   } else {
    //     const fetchDataButtons = () => {
    //       fetch(
    //         `http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=''`
    //       )
    //         .then((response) => response.json())
    //         .then((data) => {
              // setData(data);
              // setDataChild(data);
              // const uniqueBlocks = [
              //   ...new Set(data.map((student) => student.block)),
              // ].sort();

              // console.log('i ran buttons')
              // setBlockChild(uniqueBlocks);
    //         })
    //         .catch((error) => console.log(error));
    //     };

    //     fetchDataButtons();
    //   }
    // }, [yearButton]);



    // useEffect(() => {
    //   if (isInitialMount.current) {
    //     isInitialMount.current = false;
    //   } else {
    //     const fetchDataButtons = () => {
    //       fetch(
    //         `http://localhost:3000/grabStudentsButtons?yearButton=''&blockButton=${blockButton}`
    //       )
    //         .then((response) => response.json())
    //         .then((data) => {
    //           setData(data);
    //           setDataChild(data);
    //           const uniqueBlocks = [
    //             ...new Set(data.map((student) => student.block)),
    //           ].sort();

    //           console.log('i ran buttons')
    //           setBlockChild(uniqueBlocks);
    //         })
    //         .catch((error) => console.log(error));
    //     };

    //     fetchDataButtons();
    //   }
    // }, [blockButton]);

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

    useImperativeHandle(ref, () => ({
      fetchDataAction,
    }));


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

    useImperativeHandle(ref, () => ({
      fetchDataAction,
    }));


    const fetchDataBlocks = () => {
      fetch(
        `http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=''`
      )
        .then((response) => response.json())
        .then((data) => {
          const uniqueBlocks = [
            ...new Set(data.map((student) => student.block)),
          ].sort();
          console.log("FETCH DATA BLOCKS", uniqueBlocks)
       
          setBlockChild(uniqueBlocks);
       

        })
        .catch((error) => console.log(error));
    };

    useImperativeHandle(ref, () => ({
      fetchDataAction,
    }));

    const [refreshKey, setRefreshKey] = useState(0);

    const fetchDataAction = async (actionId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/grabStudentsButtons?yearButton=${yearButton}&blockButton=${blockButton}`
        );
        const data = await response.json();

        setData(data);

       
        setDataChild(data);

        if (actionId.length > 4 && actionId.charAt(4) !== "-") {
          const newStudentId = actionId.slice(0, 4) + "-" + actionId.slice(4);
          actionId = newStudentId;
        }

        if (!actionId) {
          setRefreshKey((prevKey) => prevKey + 1);
        } else {
          const index = data.findIndex((student) => {
           
            return student.student_id === actionId;
          });

     

          setPage(Math.floor(index / rowsPerPage));

          setBlinkStudentId(actionId);
          setTimeout(() => {
            setBlinkStudentId(null);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = () => {
  
      if (yearForm && blockForm) {
        fetch(
          `http://localhost:3000/grabStudents?year=${yearForm}&numBlock=${blockForm}&yearButton=${yearButton}&blockButton=${blockButton}`
        )
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setDataChild(data);
            const uniqueBlocks = [
              ...new Set(data.map((student) => student.block)),
            ].sort();
         
            setBlockChild(uniqueBlocks);

            console.log("IM THE ONE BITHD")
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
    const isInitialMount = useRef(true);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        fetchData();
      }
      console.log("i ran buttons/mount data");
    }, [refreshData]);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        setPage(0);
        console.log("i ran buttons/mount data");
      }
    }, [filterRefreshData, refreshKey]);



    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        fetchDataButtonsYear();
        setPage(0);
        console.log("i ran year  data");
      }
    }, [yearButton]);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        fetchDataButtonsBlock();
        setPage(0);
        console.log("i ran block data");
      }
    }, [blockButton]);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        fetchDataBlocks();
        setPage(0);
        console.log("i ran unique blocks");
      }
    }, [yearButton, blockButton]);


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
                  <StyledTableRow
                    key={row.id}
                    style={{
                      backgroundColor:
                        row.student_id === blinkStudentId ? "#98c1ff" : "white",
                      color: 
                        row.student_id === blinkStudentId ? "#ffffff" : "black",
                    }}
                  >
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
  }
);

export default TableManageBlock;