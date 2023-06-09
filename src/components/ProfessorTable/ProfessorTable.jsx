import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  Toolbar
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BlockIcon from "@mui/icons-material/Block"
import DoneIcon from "@mui/icons-material/Done";
import { css } from "@emotion/react";
import Alert from "@mui/lab/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ProfessorTableCSS from "./ProfessorTable.module.css";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { styled } from '@mui/material/styles';

// Creating styles
const useStyles = () =>
  css({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },

    snackbar: {
      bottom: "104px",
    },
  });

  const StickyPagination = styled('div')({
    position: 'sticky',
    bottom: 0,
    width: '100%',
    backgroundColor: '#e6e2e2',
    zIndex: 1,
    padding: "0px 0px",
    boxSizing: 'border-box',
    border: '1px solid #c4c4c4',
    borderTop: "none",
    minHeight: "0px !important",
   
      '& .MuiToolbar-root': {
        paddingRight: '2px',
        minHeight: '0px',
        height: '43px',
        fontSize: '13px !important'
      },
      '&:last-child': {
        fontSize: '13px !important',
      },
      '& .MuiTablePagination-selectLabel': {
        fontSize: '13px !important',
      },
      '& .MuiTablePagination-displayedRows': {
        fontSize: '13px !important',
      },
    
  });
  

function ProfessorTable({onCloseProp, dataChangeTrigger}) {
  // Creating style object
  const classes = useStyles();
  const [deleteIndex, setDeleteIndex] = useState(null);


    useEffect(() => {
      const fetchProfessors = async () => {
        try {
          const response = await fetch(`http://localhost:3000/grabProfessors`);
          const data = await response.json();
          const sortedData = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
          const rows = sortedData.map((item) => ({
            lastname: item.last_name,
            middlename: item.middle_name,
            firstname: item.first_name,
            employment: item.employment,
            maxUnits: item.max_units,
          }));
          setRows(rows);

        } catch (error) {
          console.log(error);
        }
      };


      fetchProfessors();
    }, []);





    useEffect(() => {
      const fetchProfessors = async () => {
        try {
          const response = await fetch(`http://localhost:3000/grabProfessors`);
          const data = await response.json();
          const sortedData = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
          const rows = sortedData.map((item) => ({
            lastname: item.last_name,
            middlename: item.middle_name,
            firstname: item.first_name,
            employment: item.employment,
            maxUnits: item.max_units,
          }));
          setRowsEdit(rows);
    
        } catch (error) {
          console.log(error);
        }
      };
  
  
      fetchProfessors();
    }, []);
  



    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const [rows, setRows] = useState([
    ]);

    const [rowsEdit, setRowsEdit] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
  // Initial states
    const [open, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  

  // Function For adding new row object
  const handleAdd = () => {
    setRowsEdit([
      ...rowsEdit,
      {
        // id: rowsEdit.length + 1,
        lastname: "",
        firstname: "",
        middlename: "",
        employment: "",
        maxUnits: "",
      },
    ]);
    
    
    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    if (!isEdit) {
      setRowsEdit(rows.map(row => ({ ...row })));
    }
    setEdit(!isEdit);
  };


  const handleSave = () => {
    setEdit(!isEdit);


    setRows(rowsEdit);
    dataChangeTrigger();
    setDisable(false);
    setOpen(true);


    const updateProfessors = async () => {
     
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rowsEdit),
        };
     
        const response = await fetch('http://localhost:3000/updateProfessors', requestOptions);
        const data = await response.json();
        
        console.log(data, "hahah")
        if (data.success) {
          console.log('Professors updated successfully');
        } else {
          console.log('Failed to update professors');
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateProfessors();

  
  };

  const handleCancel = () => {
    console.log(rows, "rows in cancel")
    setEdit(false);
    console.log("i ran");
  };

  
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rowsEdit];
    const actualIndex = page * rowsPerPage + index;
    list[actualIndex][name] = value;
    setRowsEdit(list);
    console.log(typeof(e.target.value))
};

  const handleConfirm = (index) => {
    setShowConfirm(true);
    setDeleteIndex(index);
  };

  const handleRemoveClick = () => {
    const list = [...rowsEdit];
    list.splice(deleteIndex, 1);
    setRowsEdit(list);
    setShowConfirm(false);
  };

  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <div className={ProfessorTableCSS.tableOnly}>
      <TableBody>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          className={classes.snackbar}
        >
          <Alert sx = {{marginTop: '-5rem'}}onClose={handleClose} severity="success">
            Record saved successfully!
          </Alert>
        </Snackbar>

        <div className={ProfessorTableCSS.closeIconWrapper}>
          
          <h2 className={ProfessorTableCSS.professorsTitle}>Professors</h2>

          <div className={`${ProfessorTableCSS.ripple} ${ProfessorTableCSS.iconContainer}`}>
            
         <Close onClick = {onCloseProp} sx={{color: "#707070"}} />
          </div>
     
        </div>
  
        <Box onClick = {() => {
          console.log(rowsEdit, "rowsEdit")
          console.log(rows, "rows")
          
          }} className={ProfessorTableCSS.tableParent}>

            <div className={ProfessorTableCSS.fieldsWrapper}>

          
          <div className={ProfessorTableCSS.topItems}>
        
            <div className={ProfessorTableCSS.fieldLabels}>
              <h3 className={ProfessorTableCSS.label1}>Last Name</h3>
              <h3 className={ProfessorTableCSS.label2}>First Name</h3>
              <h3 className={ProfessorTableCSS.label3}>Middle Name</h3>
              <h3 className={ProfessorTableCSS.label4}>Employment</h3>
              <h3 className={ProfessorTableCSS.label5}>Max Units</h3>
            </div>
          </div>
          <TableRow align="center"> </TableRow>

          <Table
            size="small"
            aria-label="a dense table"
            style={{ width: "0px" }}
          >
            <TableHead>
              <TableRow></TableRow>
            </TableHead>

            <TableBody>
              {rowsEdit.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                return (
                  <div>
                    <TableRow>
                      {isEdit ? (
                        <div className={ProfessorTableCSS.trueIsEdit}>
                          <TableCell
                            sx={{
                              padding: "0px",
                              paddingTop: "0px",
                              borderBottom: "0px",
                            }}
                          >
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px", fontSize: "10px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="course-code-label"
                                InputLabelProps={{ shrink: true }}
                                sx={{ width: "100px" }}
                                size="small"
                                InputProps={{
                                  style: { fontSize: "13px" },
                                }}
                                onChange={(e) => handleInputChange(e, i)}
                                value={row.lastname}
                                name="lastname"
                              />
                            </FormControl>
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "0px",
                              paddingTop: "0px",
                              borderBottom: "0px",
                            }}
                          >
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px", fontSize: "13px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="course-code-label"
                                size="small"
                                sx={{ width: "100px", fontSize: "13px" }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                  style: { fontSize: "13px" },
                                }}
                                onChange={(e) => handleInputChange(e, i)}
                                value={row.firstname}
                                name="firstname"
                              ></TextField>
                            </FormControl>
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "0px",
                              paddingTop: "0px",
                              borderBottom: "0px",
                            }}
                          >
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px", fontSize: "13px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="course-code-label"
                                size="small"
                                sx={{ width: "100px", fontSize: "13px" }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                  style: { fontSize: "13px" },
                                }}
                                onChange={(e) => handleInputChange(e, i)}
                                value={row.middlename}
                                name="middlename"
                              ></TextField>
                            </FormControl>
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "0px",
                              paddingRight: "0px",
                              paddingTop: "0px",
                              borderBottom: "0px",
                            }}
                          >
                            <FormControl
                              size="small"
                              sx={{ margin: "5px 7px", fontSize: "13px" }}
                              variant="outlined"
                            >
                              <TextField
                                sx={{ width: "120px" }}
                                name="employment"
                                select
                                InputProps={{
                                  style: { fontSize: "13px" },
                                }}
                                size="small"
                                value={row.employment}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <MenuItem  style= {{ fontSize: "15px" }} value={"Part-time"}>
                                  Part-time
                                </MenuItem>
                                <MenuItem  style= {{ fontSize: "15px" }} value={"Full-time"}>
                                  Full-time
                                </MenuItem>
                                <MenuItem   style= {{ fontSize: "15px" }}value={"Full-pledge"}>
                                  Full-pledge
                                </MenuItem>
                                <MenuItem   style= {{ fontSize: "15px" }}value={"TBA"}>
                                  TBA
                                </MenuItem>
                              </TextField>
                            </FormControl>
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "0px",
                              paddingBottom: "0px",
                              borderBottom: "0px",
                              paddingTop: "0px",
                            }}
                          >
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px", fontSize: "13px" }}
                              className={classes.textField}
                            >

                              <TextField
                                sx={{ width: "70px" }}
                                name="maxUnits"
                                select
                                InputProps={{
                                  style: { fontSize: "13px" },
                                }}
                                size="small"
                                value={row.maxUnits}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <MenuItem  style= {{ fontSize: "15px" }} value={0}>
                                  0
                                </MenuItem>
                                <MenuItem style= {{ fontSize: "15px" }} value={18}>
                                  18
                                </MenuItem>
                                <MenuItem style= {{ fontSize: "15px" }} value={24}>
                                  24
                                </MenuItem>
                              </TextField>



                            </FormControl>
                          </TableCell>




                          
                          <div
                             onClick={() => handleConfirm(i)}
                            style={{ width: "0.7rem", height: "0.7rem" }}
                            className={`${ProfessorTableCSS.iconWrapper} ${ProfessorTableCSS.ripple}`}
                          >
                            <DeleteOutlineIcon
                              style={{
                                color: "#6f6f6f",
                                width: "1.4rem",
                                height: "1.4rem",
                              }}
                            />
                          </div>
                        </div>
                      ) : ""}
                    </TableRow>
                  </div>
                );
              })}

            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                return (
                  <div >
                    <TableRow>
                      {!isEdit ? (
                        <div
                          className={ProfessorTableCSS["cells-deleteWrapper"]}
                        >
                          <div className={ProfessorTableCSS.falseIsEdit}>
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="class-type-label"
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: "100px" }}
                                InputProps={{
                                  readOnly: true,
                                  style: { fontSize: "13px" },
                                }}
                                //   label = "Class Type"
                                value={row.lastname}
                              />
                            </FormControl>
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="class-type-label"
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: "100px" }}
                                InputProps={{
                                  readOnly: true,
                                  style: { fontSize: "13px" },
                                }}
                                //   label = "Class Type"
                                value={row.firstname}
                              />
                            </FormControl>
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="class-type-label"
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: "100px" }}
                                InputProps={{
                                  readOnly: true,
                                  style: { fontSize: "13px" },
                                }}
                                //   label = "Class Type"
                                value={row.middlename}
                              />
                            </FormControl>
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="class-type-label"
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: "120px" }}
                                InputProps={{
                                  readOnly: true,
                                  style: { fontSize: "13px" },
                                }}
                                //   label = "Class Type"
                                value={row.employment}
                              />
                            </FormControl>
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="class-type-label"
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: "70px" }}
                                InputProps={{
                                  readOnly: true,
                                  style: { fontSize: "13px" },
                                }}
                                //   label = "Class Type"
                                value={row.maxUnits}
                              />
                            </FormControl>
                          </div>
                        </div>
                      ): ""}
                    </TableRow>
                  </div>
                );
              })}
            </TableBody>
              {showConfirm && (
                <div>
                  <Dialog
                    open={showConfirm}
                    onClose={handleNo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Confirm Delete"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure to delete
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleRemoveClick}
                        color="primary"
                        autoFocus
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={handleNo}
                        color="primary"
                        autoFocus
                      >
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
          </Table>

           
    
    </div>
        </Box>
        
      </TableBody>
      { !isEdit ?
       <>
       
      <StickyPagination>
      <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[7, 10]}
      
        />
        </StickyPagination>
        </>
        :
        <>
         <StickyPagination>
        <TablePagination
          component="div"
          count={rowsEdit.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[6, 25, 50, 100]}
  
        />
        </StickyPagination>
        </>
      }
      {isEdit ? (
        <div
          style={{ margin: "15px 7px 10px 0px" }}
          className={ProfessorTableCSS["add-saveOptions"]}
        >



<Button
            onClick={handleCancel}
            style={{ textTransform: "none" }}
            sx={{
              marginRight: "7px",
              background: "#1e82d4",
              color: "#ffffff",
              borderRadius: "0.25rem",
              fontFamily: "Poppins",
              fontSize: "0.7rem",
              padding: "0rem",
              padding: "0.7rem",
              "&:hover": {
                background: "#1b70b5",

                color: "#fafafa",
              },
            }}
            // onClick={handleAdd}
          >
            <BlockIcon
              className={ProfessorTableCSS.addIcon}
       
              sx={{
                color: "#ffffff",
                marginRight: "2px",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            />
            CANCEL
          </Button>

          
          <Button
            style={{ textTransform: "none" }}
            sx={{
              background: "#1e82d4",
              color: "#ffffff",
              borderRadius: "0.25rem",
              fontFamily: "Poppins",
              fontSize: "0.7rem",
              padding: "0rem",
              padding: "0.7rem",
              "&:hover": {
                background: "#1b70b5",

                color: "#fafafa",
              },
            }}
            onClick={handleAdd}
          >
            <AddBoxIcon
              className={ProfessorTableCSS.addIcon}
    
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            />
            ADD
          </Button>
          {true && (
            <div style={{ margin: "0px 0px 0px 7px" }}>
              
              {!rowsEdit.every(row => row.lastname !== "" && row.firstname !== "" && row.employment !== "" && row.maxUnits !== "") ? (
                <Button
                  disabled
                  style={{ textTransform: "none" }}
                  sx={{
                    background: "#cfd2d3",
                    color: "#ffffff",
                    borderRadius: "0.25rem",
                    fontFamily: "Poppins",
                    fontSize: "0.7rem",
                    padding: "0rem",
                    padding: "0.7rem",
                    "&:hover": {
                      background: "#1b70b5",

                      color: "#fafafa",
                    },
                  }}
                  onClick={handleSave}
                >
                  <DoneIcon
                    className={ProfessorTableCSS.addIcon}
                  
                  />
                  SAVE
                </Button>
              ) : (
                <Button
                  style={{ textTransform: "none" }}
                  sx={{
                    background: "#1e82d4",
                    color: "#ffffff",
                    borderRadius: "0.25rem",
                    fontFamily: "Poppins",
                    fontSize: "0.7rem",
                    padding: "0rem",
                    padding: "0.7rem",
                    "&:hover": {
                      background: "#1b70b5",

                      color: "#fafafa",
                    },
                  }}
                  onClick={handleSave}
                >
                  <DoneIcon
                    className={ProfessorTableCSS.addIcon}
              
                    sx={{
                      color: "#ffffff",
                      "&:hover": {
                        color: "#ffffff",
                      },
                    }}
                  />
                  SAVE
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{ margin: "15px 7px 10px 0px" }}
          className={ProfessorTableCSS["add-editOptions"]}
        >
          <Button
            align="right"
            style={{ textTransform: "none", marginLeft: "8px" }}
            sx={{
              background: "#1e82d4",
              color: "#ffffff",
              borderRadius: "0.25rem",
              fontFamily: "Poppins",
              fontSize: "0.7rem",
              padding: "0rem",
              padding: "0.7rem",
              "&:hover": {
                background: "#1b70b5",

                color: "#fafafa",
              },
            }}
            onClick={handleEdit}
          >
            <CreateIcon
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            />
            EDIT
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfessorTable;
