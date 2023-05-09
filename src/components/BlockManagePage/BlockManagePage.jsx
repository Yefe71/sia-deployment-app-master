import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ManageBlockCSS from "./BlockManagePage.module.css";
import MyTable from "../Table/Table";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import TableManageBlock from "../TableManageBlock/TableManageBlock";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import EastIcon from "@mui/icons-material/East";
import Tooltip from "@mui/material/Tooltip";

const exportAsPDF = (data) => {
  const doc = new jsPDF();
  const head = [
    [
      "ID",
      "Student ID",
      "Last Name",
      "First Name",
      "Middle Name",
      "Standing",
      "Year",
      "Block",
    ],
  ];

  const body = data.map((row, index) => [
    index + 1,
    row.student_id,
    row.last_name,
    row.first_name,
    row.middle_name,
    row.standing,
    row.year,
    row.block,
  ]);

  doc.autoTable({
    head: head,
    body: body,
  });

  doc.save("students.pdf");
};
const exportAsExcel = (data) => {
  const headers = [
    "ID",
    "Student ID",
    "Last Name",
    "First Name",
    "Middle Name",
    "Standing",
    "Year",
    "Block",
  ];

  const dataArray = data.map((row, index) => [
    index + 1,
    row.student_id,
    row.last_name,
    row.first_name,
    row.middle_name,
    row.standing,
    row.year,
    row.block,
  ]);

  const ws = XLSX.utils.aoa_to_sheet([headers, ...dataArray]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "students.xlsx");
};

const BlockManagePage = () => {
  const [year, setYear] = React.useState("");
  const [block, setBlock] = React.useState("");
  const [blockChild, setBlockChild] = useState([]);
  const [dataChild, setDataChild] = useState([]);
  const [numYearBlock, setNumYearBlock] = useState([]);

  //EDIT MODAL
  const [editType, setEditType] = React.useState("transfer");

  const handleChangeEditType = (event) => {
    setEditType(event.target.value);
    // setFilterRefreshData((prevState) => !prevState);
  };

  const [editId, setEditId] = React.useState("");
  const [editStudentName, setEditStudentName] = React.useState("");

  const [currentEditYearBlock, setCurrentEditYearBlock] = React.useState("");
  const [transferStanding, setTransferStanding] = React.useState("");

  const [newEditYearBlock, setNewEditYearBlock] = useState("");

  const [editStudentLast, setEditStudentLast] = useState("");
  const [editStudentFirst, setEditStudentFirst] = useState("");
  const [editStudentMiddle, setEditStudentMiddle] = useState("");
  const [editStudentSuffix, setEditStudentSuffix] = useState("");

  const handleInputChange = (event) => {
    console.log(blockChild);
    const newValue = event.target.value;
    const length = newValue.length;
    const secondCharIsHyphen = length >= 2 && newValue.charAt(1) === "-";
    const thirdCharIsDigit = length <= 2 || !isNaN(newValue.charAt(2));
    const fourthCharIsDigit = length <= 3 || !isNaN(newValue.charAt(3));
    if (secondCharIsHyphen && thirdCharIsDigit && fourthCharIsDigit) {
      setNewEditYearBlock(newValue);
    }
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
    setFilterRefreshData((prevState) => !prevState);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
    setFilterRefreshData((prevState) => !prevState);
  };

  const [yearForm, setYearForm] = React.useState("");
  const [blockForm, setBlockForm] = React.useState("");
  const [studentsNumForm, setStudentsNumForm] = useState("");
  const [studentsBlockForm, setStudentsBlockForm] = useState("");
  const [studentsBlockFormValue, setStudentsBlockFormValue] = useState("");

  const [addStudentId, setAddStudentId] = useState("");
  const [addStudentYear, setAddStudentYear] = useState("");
  const [addStudentBlock, setAddStudentBlock] = useState("");
  const [addStudentLast, setAddStudentLast] = useState("");
  const [addStudentFirst, setAddStudentFirst] = useState("");
  const [addStudentMiddle, setAddStudentMiddle] = useState("");
  const [addStudentStanding, setAddStudentStanding] = useState("");
  const [addStudentSuffix, setAddStudentSuffix] = useState("");

  const [dropStudentId, setDropStudentId] = useState("");
  
  const [dropStudentName, setDropStudentName] = React.useState("");
  const [dropEditYearBlock, setDropEditYearBlock] = React.useState("");
  const [dropStanding, setDropStanding] = React.useState("");

  const [error, setError] = useState(false);
  const [errorYear, setErrorYear] = useState(false);

  const isYearEmpty = !yearForm || yearForm === "" || yearForm === "0";

  const handleInputReblockChange = (event) => {
    const value = event.target.value;
    let newValue = parseInt(value);

    if (value === "") {
      setStudentsBlockFormValue(value);
      setError(false);
      return;
    }

    if (!isNaN(newValue) && newValue >= 1) {
      setStudentsBlockFormValue(newValue);
      setError(false);
    } else {
    }
  };

  const onKeyPress = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      setError(true);
    }
  };
  const onKeyPressYear = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      setErrorYear(true);
    }
  };


  const childRef = useRef(null);

  const [nameIsFocused, setNameIsFocused] = useState(false);
  
  const [refreshData, setRefreshData] = useState(false);
  const [refreshDataTransfer, setRefreshDataTransfer] = useState(true);
  const [filterRefreshData, setFilterRefreshData] = useState(false);


  const [actionRefreshData, setActionRefreshData] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 180,
    height: 530,
    bgcolor: "#eeeeee",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
  };
  const editStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 510,
    maxHeight: 650,
    bgcolor: "#eeeeee",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 1,
    pt: 5,
    pb: 5,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setError(false);
    setYearForm("");
    setStudentsBlockForm("");

  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    setEditType("edit");

    setEditId(null);
    setEditStudentName('');
    setCurrentEditYearBlock(null);
    setNewEditYearBlock(null);

    setAddStudentId(null);
    setAddStudentYear('');
    setAddStudentBlock('');
    setAddStudentLast('');
    setAddStudentFirst('');
    setAddStudentMiddle('');
    setAddStudentStanding('');
    setAddStudentSuffix('');

    setEditStudentLast('');
    setEditStudentFirst('');
    setEditStudentMiddle('');
    setNameIsFocused(false)
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSubmit = (event) => {
    console.log(refreshData, 1);
    setRefreshData((prevState) => !prevState);
    console.log(refreshData, 2);
    handleClose();
    setYear("1");
    setBlock("1");
    setYear("");
    setBlock("");
  };

  const editStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/transferStudent?studentId=${editId}&newBlock=${newEditYearBlock}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      console.log(data, "data updated");
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudentNameEdit = async () => {
    console.log(editId, "me!!");
    try {
      const response = await fetch(
        `http://localhost:3000/transferStudentNameEdit?studentId=${editId}&editStudentLast=${editStudentLast}&editStudentFirst=${editStudentFirst}&editStudentMiddle=${editStudentMiddle}&editStudentSuffix=${editStudentSuffix}&transferStanding=${transferStanding}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();

        console.log('update success')
    } catch (error) {
      console.log(error);
    }
  };


  const addStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/addStudent?addStudentId=${addStudentId}&addStudentYear=${addStudentYear}&addStudentBlock=${addStudentBlock}&addStudentLast=${addStudentLast}&addStudentFirst=${addStudentFirst}&addStudentMiddle=${addStudentMiddle}&addStudentSuffix=${addStudentSuffix}&addStudentStanding=${addStudentStanding}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      console.log(data, "data updated");
    } catch (error) {
      console.log(error);
    }
  };

  const dropStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/dropStudent?dropStudentId=${dropStudentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      console.log(data, "data dropped/failed");
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    // setRefreshDataTransfer((prevState) => !prevState);

    handleCloseEdit();

    editStudent();
    await updateStudentNameEdit();
 


  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    console.log(
      addStudentId,
      addStudentYear,
      addStudentBlock,
      addStudentLast,
      addStudentFirst,
      addStudentMiddle,
      addStudentStanding
    );
    handleCloseEdit();
    await addStudent();

    childRef.current.fetchDataAction(addStudentId);
  };

  const handleSubmitDrop = (event) => {
    event.preventDefault();
    handleCloseEdit();
    dropStudent();
    setRefreshData((prevState) => !prevState);
    setYear("1");
    setBlock("1");
    setYear("");
    setBlock("");
    console.log("i ran");
  };

  useLayoutEffect(() => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    window.scrollTo({
      top: vh * 0.11,
      behavior: "smooth",
    });
  }, []);


  useEffect(() => {
    const fetchDataButtons = () => {
      console.log(year, "me!!");
      fetch(
        `http://localhost:3000/grabStudentsButtons?yearButton=${yearForm}&blockButton=''`
      )
        .then((response) => response.json())
        .then((data) => {
          const uniqueBlocks = [
            ...new Set(data.map((student) => student.block)),
          ].sort();
          setStudentsNumForm(data.length);
          setStudentsBlockForm(uniqueBlocks.length);
          setStudentsBlockFormValue("");
        })
        .catch((error) => console.log(error));
    };

    fetchDataButtons();
  }, [yearForm]);

  useEffect(() => {
    console.log("run");
    const fetchStudentName = async () => {
      console.log(editId, "me!!");
      try {
        const response = await fetch(
          `http://localhost:3000/transferStudentName?studentId=${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const studentData = data[0];
          const fullNameString = `${studentData.last_name}, ${studentData.first_name} ${studentData.middle_name} ${studentData.suffix}`;
          console.log(fullNameString, "hello")
          setEditStudentName(fullNameString);
          setEditStudentLast(studentData.last_name);
          setEditStudentFirst(studentData.first_name);
          setEditStudentMiddle(studentData.middle_name);
          setEditStudentSuffix(studentData.suffix);

        
        } else {
          console.log("No student data found for this ID");
          setEditStudentName("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentName();
  }, [editId]);

  
 

  useEffect(() => {
    console.log("run");
    const fetchStudentName = async () => {
      console.log(editId, "me!!");
      try {
        const response = await fetch(
          `http://localhost:3000/transferStudentName?studentId=${dropStudentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const studentData = data[0];
          const fullNameString = `${studentData.last_name}, ${studentData.first_name} ${studentData.middle_name} ${studentData.suffix}`;
          console.log(fullNameString, "hello")
          setDropStudentName(fullNameString);
        } else {
          console.log("No student data found for this ID");
          setDropStudentName("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentName();
  }, [dropStudentId]);



  

  useEffect(() => {
    console.log("run");
    const fetchStudentYearBlock = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/transferYearBlock?studentId=${dropStudentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();

        const yearBlock = data.map((student) => student.year_block);
        const yearBlockString = yearBlock.join(", ");

        const transferStanding = data.map((student) => student.standing);
        const transferStandingString = transferStanding.join(", ");

        setDropStanding(transferStandingString);
        setDropEditYearBlock(yearBlockString);

        // const yearBlockStringSplit = yearBlockString.slice(0, 2);
        // setNewEditYearBlock(yearBlockStringSplit);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentYearBlock();
  }, [dropStudentId]);


  useEffect(() => {
    console.log("run");
    const fetchStudentYearBlock = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/transferYearBlock?studentId=${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();

        const yearBlock = data.map((student) => student.year_block);
        const yearBlockString = yearBlock.join(", ");

        const transferStanding = data.map((student) => student.standing);
        const transferStandingString = transferStanding.join(", ");

        setTransferStanding(transferStandingString);
        setCurrentEditYearBlock(yearBlockString);

        const yearBlockStringSplit = yearBlockString.slice(0, 2);
        setNewEditYearBlock(yearBlockStringSplit);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentYearBlock();
  }, [editId]);

  const handleChangeYearForm = (event) => {
    const value = event.target.value;
    let newValue = parseInt(value);

    if (value === "") {
      setYearForm(value);
      setErrorYear(false);
      return;
    }

    if (!isNaN(newValue) && newValue >= 1 && newValue <= 5) {
      setYearForm(newValue);
      setErrorYear(false);
    } else {
      setErrorYear(true);
    }

    console.log("changed");
  };

 

  useEffect(() => {
 
    setNameIsFocused(false);
    setDropStudentId("")
    setEditId("")
  }, [editType])
  

  return (
    <>
      <div className={ManageBlockCSS.topTableWrapper}>
        <div className={ManageBlockCSS.topTable}>
          <h2>Manage Blocks</h2>
          <div className={ManageBlockCSS.topButtons}>
            <FormControl
              sx={{
                mr: 0.6,
                minWidth: isSmallScreen ? 90 : 115,
              }}
            >
              <Select
                value={year}
                onChange={(event) => {
                  handleChangeYear(event);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                }}
              >
                <MenuItem value="">Year</MenuItem>
                <MenuItem value={1}>1st Year</MenuItem>
                <MenuItem value={2}>2nd Year</MenuItem>
                <MenuItem value={3}>3rd Year</MenuItem>
                <MenuItem value={4}>4th Year</MenuItem>
                <MenuItem value={5}>5th Year</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: isSmallScreen ? 80 : 100 }}>
              <Select
                value={block}
                onChange={handleChangeBlock}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                }}
              >
                <MenuItem value="">Block</MenuItem>
                {blockChild.map((blockNumber) => (
                  <MenuItem value={blockNumber} key={blockNumber}>
                    Block {blockNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className={ManageBlockCSS.tableWrapper}>
          <TableManageBlock
            ref={childRef}
            actionRefreshData = {actionRefreshData}
            setNumYearBlock={setNumYearBlock}
            setBlockChild={setBlockChild}
            setDataChild={setDataChild}
            yearForm={yearForm}
            blockForm={studentsBlockFormValue}
            yearButton={year}
            blockButton={block}
            filterRefreshData={filterRefreshData}
            refreshData={refreshData}
            refreshDataTransfer={refreshDataTransfer}
            addStudentId = {addStudentId}
          />
        </div>
        <div className={ManageBlockCSS.bottomButtons}>
          <div className={ManageBlockCSS.left}>
            <Stack spacing={2} direction="row">
              <Button
                onClick={handleOpen}
                style={{ textTransform: "none" }}
                sx={{
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#0070e7", // Change the hover background color here
                  },
                }}
                variant="contained"
              >
                Reblock
              </Button>
            </Stack>
          </div>
          <div className={ManageBlockCSS.middle}>
            <Stack spacing={2} direction="row">
              <Button
                style={{ textTransform: "none" }}
                onClick={() => exportAsPDF(dataChild)}
                sx={{
                  marginRight: "1rem",
                  backgroundColor: "#424242",

                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#313131",
                    // Change the hover background color here
                  },
                }}
                variant="contained"
              >
                Print as PDF
              </Button>
            </Stack>
            <Stack spacing={2} direction="row">
              <Button
                style={{ textTransform: "none" }}
                onClick={() => exportAsExcel(dataChild)}
                sx={{
                  marginRight: "1rem",
                  backgroundColor: "#424242",

                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#313131",
                    // Change the hover background color here
                  },
                }}
                variant="contained"
              >
                Export as Excel
              </Button>
            </Stack>
          </div>
          <div className={ManageBlockCSS.right}>
            <Stack spacing={2} direction="row">
              <Button
                onClick={handleOpenEdit}
                style={{ textTransform: "none" }}
                sx={{
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#0070e7", // Change the hover background color here
                  },
                }}
                variant="contained"
              >
                Actions
              </Button>
              <Button
                onClick={handleOpen}
                style={{ textTransform: "none" }}
                sx={{
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#0070e7", // Change the hover background color here
                  },
                }}
                variant="contained"
              >
                Reblock
              </Button>
            </Stack>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={ManageBlockCSS.boxWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={ManageBlockCSS.noStudents}>
              <p style={{ textAlign: "center" }}>Number of Students</p>

              <h3
                style={{
                  textAlign: "center",
                  color: "#7a7a7a",
                  fontSize: "19px",
                }}
              >
                {studentsNumForm}
              </h3>
            </div>
            <div className={ManageBlockCSS.blkCapacity}>
              <p>Year</p>
              <Tooltip
                open={errorYear}
                title={"Only input numbers from [0-5]"}
                arrow
              >
                <TextField
                  value={yearForm}
                  type="number"
                  sx={{ width: "5rem" }}
                  onChange={handleChangeYearForm}
                  inputProps={{
                    min: "1",
                    max: "5",
                    style: { textAlign: "center" },
                  }}
                  onKeyPress={onKeyPressYear}
                />
              </Tooltip>
            </div>
            <div className={ManageBlockCSS.noBlocks}>
              <p className={ManageBlockCSS.reblockNumTitle}>Number of Blocks</p>

              <div className={ManageBlockCSS.noBlocksWrapper}>
                <div className={ManageBlockCSS.currentReblockWrapper}>
                  <p>Current</p>
                  <TextField
                    readOnly
                    value={yearForm ? studentsBlockForm : ""}
                    disabled={isYearEmpty}
                    sx={{ width: "3rem" }}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                  />
                </div>

                <div className={ManageBlockCSS.newReblockWrapper}>
                  <p>New</p>
                  <Tooltip open={error} title={"Only input numbers"} arrow>
                    <TextField
                      disabled={isYearEmpty}
                      value={studentsBlockFormValue}
                      error={error}
                      type="number"
                      sx={{ width: "4.5rem" }}
                      onChange={handleInputReblockChange}
                      onKeyPress={onKeyPress}
                      inputProps={{
                        min: "1",
                        style: { textAlign: "center" },
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>

            <Stack spacing={2} direction="row">
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{ textTransform: "none" }}
                sx={{
                  marginTop: "3rem",
                  backgroundColor: "#4CAF50 ",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: "0.9rem",
                  padding: "0rem",
                  padding: "0.9rem",
                  "&:hover": {
                    backgroundColor: "#429645 ", // Change the hover background color here
                  },
                }}
                variant="contained"
              >
                Generate
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={editStyle} className={ManageBlockCSS.boxWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={ManageBlockCSS.noStudents}>
              <p>Action Type</p>
              <Select
                value={editType}
                onChange={(event) => {
                  handleChangeEditType(event);
                }}
                displayEmpty
                inputProps={{
                  "aria-label": "Without label",
                  style: { textAlign: "center" },
                }}
                sx={{
                  fontFamily: "Poppins",
                  fontSize: isSmallScreen ? "0.5rem" : "0.9rem",
                  padding: "0rem",
                  fontWeight: "600",
                  width: "120px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <MenuItem value={"edit"}>Edit</MenuItem>
                <MenuItem value={"add"}>Add</MenuItem>
                <MenuItem value={"drop"}>Drop</MenuItem>
              </Select>
            </div>

            {editType === "drop" ? (
              <>
                <div className={ManageBlockCSS.blkCapacity}>
                  <div className={ManageBlockCSS.firstRowWrapper}>
                    <div className={ManageBlockCSS.leftWrapper}>
                      <p>Student ID</p>
                      <TextField
                        value={dropStudentId}
                        sx={{ marginBottom: "10px" }}
                        onChange={(event) => setDropStudentId(event.target.value)}
                        inputProps={{
                          min: "1",
                          max: "999",
                          style: { textAlign: "center" },
                        }}
                      />
                    </div>

                    <div className={ManageBlockCSS.rightWrapper}>
                      <p className={ManageBlockCSS.yearBlockTitle}>
                        Year & Block
                      </p>

                      <div className={ManageBlockCSS.transferFields}>
                        <div className={ManageBlockCSS.currentWrapper}>
                          <TextField
                            value={dropEditYearBlock}
                    
                            sx={{ width: "7rem" }}
                            onChange={(event) =>
                              setDropEditYearBlock(event.target.value)
                            }
                            inputProps={{
                              min: "1",
                              max: "999",
                              readOnly: true,
                              style: { textAlign: "center" },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>Student Name</p>
                  <TextField
                    value={dropStudentName}
                   
                    sx={{ width: "100%" }}
                    onChange={(event) => setDropStudentName(event.target.value)}
                    inputProps={{
                      min: "1",
                      max: "999",
                      readOnly: true,
                      style: { textAlign: "center" },
                    }}
                  />
                </div>

                <p
                  style={{ marginTop: "15px" }}
                  className={ManageBlockCSS.yearBlockTitle}
                >
                  Standing
                </p>

                <TextField
                  value={dropStanding}
            
                  sx={{ width: "7rem" }}
                  inputProps={{
                    min: "1",
                    max: "999",
                    readOnly: true,
                    style: { textAlign: "center" },
                  }}
                />
                <Stack spacing={2} direction="row">
                  <Button
                    type="submit"
                    onClick={handleSubmitDrop}
                    style={{ textTransform: "none" }}
                    sx={{
                      marginTop: "2rem",
                      backgroundColor: "#df0000 ",
                      color: "white",
                      borderRadius: "0.5rem",
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      padding: "0rem",
                      padding: "0.9rem 1.5rem",

                      "&:hover": {
                        backgroundColor: "#c70202 ", // Change the hover background color here
                      },
                    }}
                    variant="contained"
                  >
                    Drop
                  </Button>
                </Stack>
              </>
            ) : editType === "add" ? (
              <>
                <div className={ManageBlockCSS.blkCapacity}>
                  <div className={ManageBlockCSS.firstRowWrapper}>
                    <div className={ManageBlockCSS.leftWrapper}>
                      <p>Student ID</p>
                      <TextField
                        value={addStudentId}
                        sx={{ marginBottom: "10px" }}
                        onChange={(event) =>
                          setAddStudentId(event.target.value)
                        }
                        
                        inputProps={{
                          min: "1",
                          max: "999",
                          style: { textAlign: "center" },
                        }}
                      />
                    </div>

                    <div className={ManageBlockCSS.rightWrapper}>
                      <div className={ManageBlockCSS.addYearBlockWrapper}>
                        <div className={ManageBlockCSS.currentWrapper}>
                          <p className={ManageBlockCSS.yearBlockTitle}>Year</p>
                          <TextField
                            value={addStudentYear}
                            
                            id="outlined-number"
                            sx={{ width: "5rem" }}
                            onChange={
                              (event) => setAddStudentYear(event.target.value)
                            }
                            onKeyPress={onKeyPress}
                            inputProps={{
                              min: "1",
                              max: "999",
                              // readOnly: true,
                              style: { textAlign: "center" },
                            }}
                          />
                        </div>

                        <div className={ManageBlockCSS.currentWrapper}>
                          <p className={ManageBlockCSS.yearBlockTitle}>Block</p>

                          <TextField
                            value={addStudentBlock}
                            id="outlined-number"
                            sx={{ width: "5rem" }}
                            onChange={
                              (event) => setAddStudentBlock(event.target.value)
                            }
                            onKeyPress={onKeyPress}
                            inputProps={{
                              min: "1",
                              max: "999",
                              // readOnly: true,
                              style: { textAlign: "center" },
                              pattern: "\\d*" 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>Student Name</p>
                  <div className={ManageBlockCSS.studentNameWrapper}>
                    <TextField
                      label="Last Name"
                      value={addStudentLast}
                      id="outlined"
                      sx={{ width: "100%" }}
                      onChange={(event) =>
                        setAddStudentLast(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="First Name"
                      value={addStudentFirst}
                      id="outlined"
                      sx={{ width: "100%" }}
                      onChange={(event) =>
                        setAddStudentFirst(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                        // readOnly: true,
                        // style: { textAlign: "center" },
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Middle Name"
                      value={addStudentMiddle}
                      id="outlined"
                      sx={{ width: "100%" }}
                      onChange={(event) =>
                        setAddStudentMiddle(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Suffix"
                      value={addStudentSuffix}
                      id="outlined"
                      sx={{ width: "50%" }}
                      onChange={(event) =>
                        setAddStudentSuffix(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>

                <div className={ManageBlockCSS.currentWrapper}>
                  <p
                    style={{ marginTop: "15px" }}
                    className={ManageBlockCSS.yearBlockTitle}
                  >
                    Standing
                  </p>

                  <Select
                    value={addStudentStanding}
                    id="outlined-number"
                    sx={{ width: "9rem" }}
                    onChange={(event) =>
                      setAddStudentStanding(event.target.value.toUpperCase())
                    }
                    inputProps={{
                      min: "1",
                      max: "999",
                      style: { textAlign: "center" },
                    }}

                    
                  >
                    <MenuItem value={"REGULAR"}>REGULAR</MenuItem>
                    <MenuItem value={"IRREGULAR"}>IRREGULAR</MenuItem>
                  </Select>

                  
                </div>

                <Stack spacing={2} direction="row">
                  <Button
                    type="submit"
                    onClick={handleSubmitAdd}
                    style={{ textTransform: "none" }}
                    sx={{
                      marginTop: "2rem",
                      backgroundColor: "#4CAF50 ",
                      color: "white",
                      width: "5.2rem",
                      borderRadius: "0.5rem",
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      padding: "0rem",
                      padding: "0.9rem",
                      "&:hover": {
                        backgroundColor: "#429645 ", // Change the hover background color here
                      },
                    }}
                    variant="contained"
                  >
                    Add
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <div className={ManageBlockCSS.blkCapacity}>
                  <div className={ManageBlockCSS.firstRowWrapper}>
                    <div className={ManageBlockCSS.leftWrapper}>
                      <p>Student ID</p>
                      <TextField
                        value={editId}
                        id="outlined-number"
                        sx={{ marginBottom: "10px" }}
                        onChange={(event) => {
                          setEditId(event.target.value)
                          setAddStudentId("")
                          setDropStudentId("");
                          setDropStudentName("");
                          setDropEditYearBlock("");
                          setDropStanding("");
                        }
                        }
                        inputProps={{
                          min: "1",
                          max: "999",
                          style: { textAlign: "center" },
                        }}
                      />
                    </div>

                    <div className={ManageBlockCSS.rightWrapper}>
                      <div className={ManageBlockCSS.transferFields}>
                        <p>Year & Block</p>

                        <div className={ManageBlockCSS.currentNewWrapper}>
                          <TextField
                            label="Current"
                            value={currentEditYearBlock}
                            id="outlined-number"
                            sx={{ width: "5rem" }}
                            inputProps={{
                              min: "1",
                              max: "999",
                              readOnly: true,
                              style: { textAlign: "center" },
                            }}
                            InputLabelProps={{ shrink: true }}
                          />

                          <div className={ManageBlockCSS.arrowWrapper}>
                            <EastIcon sx={{ color: "#6d6d6d" }} />
                          </div>

                          <TextField
                            disabled={!editId}
                            label="New"
                            value={newEditYearBlock}
                            id="outlined-number"
                            sx={{ width: "5rem", textAlign: "center" }}
                            onChange={handleInputChange}
                            inputProps={{
                              style: { textAlign: "center" },
                              maxLength: 4,
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

{ !nameIsFocused ? 
<>
                  <p>Student Name</p>       
                  <TextField
                    disabled={!editId}
                    value={editStudentName}
                    id="outlined"
                    sx={{ width: "100%" }}
                    onFocus={() => setNameIsFocused(true)}
                    onBlur={() => setNameIsFocused(false)}
                    onChange={(event) =>
                      setEditStudentName(event.target.value.toUpperCase())
                    }
                    inputProps={{
                      min: "1",
                      max: "999",
                      readOnly: true,
                      style: { textAlign: "center" },
                    }}
                  />
</>
:
<>
                  <p>Student Name</p>
                  <div className={ManageBlockCSS.studentNameWrapper}>
                    <TextField
                      disabled={!editId}
                      label="Last Name"
                      value={editStudentLast}
                      id="outlined"
                      sx={{ width: "100%" }}
                      onChange={(event) =>
                        setEditStudentLast(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      disabled={!editId}
                      label="First Name"
                      value={editStudentFirst}
                      id="outlined"
                      sx={{ width: "100%" }}
                      onChange={(event) =>
                        setEditStudentFirst(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                        // readOnly: true,
                        // style: { textAlign: "center" },
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      disabled={!editId}
                      label="Middle Name"
                      value={editStudentMiddle}
                      id="outlined"
                      sx={{ width: "100%" }}
                      onChange={(event) =>
                        setEditStudentMiddle(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Suffix"
                      value={editStudentSuffix}
                      id="outlined"
                      sx={{ width: "50%" }}
                      onChange={(event) =>
                        setEditStudentSuffix(event.target.value.toUpperCase())
                      }
                      inputProps={{
                        min: "1",
                        max: "999",
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                    </>
                  }
                </div>

                {/* <p className={ManageBlockCSS.yearBlockTitle}>Year and Block</p> */}

                <p
                  style={{ marginTop: "15px" }}
                  className={ManageBlockCSS.yearBlockTitle}
                >
                  Standing
                </p>



                <Select
                  disabled={!editId}
                  value={transferStanding}
                  id="outlined-number"
                  sx={{ width: "9rem" }}
                  onChange={(event) =>
                    setTransferStanding(event.target.value)
                  }
                  inputProps={{
                    min: "1",
                    max: "999",
                    style: { textAlign: "center" },
                  }}

                    
                >
                  <MenuItem value={"REGULAR"}>REGULAR</MenuItem>
                  <MenuItem value={"IRREGULAR"}>IRREGULAR</MenuItem>
                </Select>


                <Stack spacing={2} direction="row">
                  <Button
                    type="submit"
                    onClick={handleSubmitEdit}
                    style={{ textTransform: "none" }}
                    sx={{
                      width: "5rem",
                      marginTop: "2rem",
                      backgroundColor: "#4CAF50 ",
                      color: "white",
                      borderRadius: "0.5rem",
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      padding: "0rem",
                      padding: "0.9rem",
                      "&:hover": {
                        backgroundColor: "#429645 ", // Change the hover background color here
                      },
                    }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </Stack>
              </>
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default BlockManagePage;
