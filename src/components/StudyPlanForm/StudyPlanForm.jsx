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
  Toolbar,
  Select
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
import StudyPlanFormCSS from "./StudyPlanForm.module.css";
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
    backgroundColor: '#f7f4f4',
    zIndex: 1,
    padding: "0px 0px",
    boxSizing: 'border-box',
    border: '1px solid #c4c4c4',
    borderTop: "none",
    borderBottomRightRadius: "6px",
    borderBottomLeftRadius: "6px",
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
  

function StudyPlanForm({selectedStudent, setIsFormValid, setRowsChild}) {

  const classes = useStyles();
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    const fetchMenuItemsMajorMinorCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/grabMajorMinorCourses`);
        const data = await response.json();
        const rows = data.map((item) => ({
          name: item.name,
          code: item.code,
        }));

        // Sort menuItems alphabetically by name
        rows.sort((a, b) => a.name.localeCompare(b.name));

        setMenuItems(rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenuItemsMajorMinorCourses();
  }, []);

    
 

    
    // useEffect(() => {
    //   const fetchMajorMinorCourses = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:3000/grabFormMajorMinor`);
    //       const data = await response.json();
    //       const rows = data.map((item) => ({
    //         // id: item.id,
    //         name: item.name,
    //         code: item.code,
    //       }));
    //       setRows(rows);

    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };


    //   fetchMajorMinorCourses();
    // }, []);





    // useEffect(() => {
    //   const fetchMajorMinorCourses = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:3000/grabFormMajorMinor`);
    //       const data = await response.json();
    //       const rows = data.map((item) => ({
    //         name: item.name,
    //         code: item.code,
    //       }));
    //       setRowsEdit(rows);
    
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
  
  
    //   fetchMajorMinorCourses();
    // }, []);
  



    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const [rows, setRows] = useState([
    ]);
    useEffect(() => {

      if (!rows.length){
        setIsFormValid(true)
      }else{
        setIsFormValid(false)
      }


      setRowsChild(rows)
    }, [rows]);
    const [rowsEdit, setRowsEdit] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
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
        name: "",
        code: "",
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
 
    setDisable(false);
    setOpen(true);


    const updateFormMajorMinor = async () => {
     
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rowsEdit),
        };
     
        const response = await fetch('http://localhost:3000/updateFormMajorMinor', requestOptions);
        const data = await response.json();
        
        console.log(data, "hahah")
        if (data.success) {
          console.log('Form updated successfully');
        } else {
          console.log('Failed to update professors');
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateFormMajorMinor();
  
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
    list[actualIndex].code =  menuItems.find((item) => item.name === value).code;
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
 
       <div className={StudyPlanFormCSS.formWrapper}>
      <TableBody sx={{height: "67%"}}>
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

     
        <Box onClick = {() => {
          console.log(rowsEdit, "rowsEdit")
          console.log(rows, "rows")
          
          }} className={StudyPlanFormCSS.tableParent}>

            <div className={StudyPlanFormCSS.fieldsWrapper}>

          
          <div className={StudyPlanFormCSS.topItems}>
        
            <div className={StudyPlanFormCSS.fieldLabels}>
              <h3 className={StudyPlanFormCSS.label1}>Course Name</h3>
              <h3 className={StudyPlanFormCSS.label5}>Course Code</h3>
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
              {rowsEdit
              
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                return (
                  <div>
                    <TableRow>
                      {isEdit ? (
                        <div className={StudyPlanFormCSS.trueIsEdit}>
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
                               <Select
                             
                                name="name"
                                select
                                InputProps={{
                                  style: { fontSize: "13px" },
                                }}
                                MenuProps={{
                                  PaperProps: {
                                    style: {
                                      maxHeight: 48 * 4.5,
                                      width: "31ch",
                                      minWidth: "25ch",
                                      overflow: "auto",
                                      
                                    },
                                  },
                                }}
                                size="small"
                                value={row.name}
                                sx={{
                                  width: "250px",
                                  backgroundColor: "white",
                                  borderRadius: "0.5rem",
                         
                                  fontSize: "0.8rem",
                                  padding: "0rem",
                                
                                }}
                                onChange={(e) => handleInputChange(e, i)}
                     
                              >
                                {menuItems.map( (course, i)  => {
                                  
                                  return <MenuItem key={i} style={{ fontSize: '0.8rem' }} value={course.name}>
                                          {course.name}
                                         </MenuItem>

                                })}
                              </Select>
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
                                value={row.code}
                                name="code"
                              />
                            </FormControl>
                          </TableCell>




                          
                          <div
                             onClick={() => handleConfirm(i)}
                            style={{ width: "0.7rem", height: "0.7rem" }}
                            className={`${StudyPlanFormCSS.iconWrapper} ${StudyPlanFormCSS.ripple}`}
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
                          className={StudyPlanFormCSS["cells-deleteWrapper"]}
                        >
                          <div className={StudyPlanFormCSS.falseIsEdit}>
                            <FormControl
                              variant="outlined"
                              sx={{ margin: "5px 7px" }}
                              className={classes.textField}
                            >
                              <TextField
                                labelId="class-type-label"
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                sx={{ width: "250px" }}
                                InputProps={{
                                  readOnly: true,
                                  style: { fontSize: "13px" },
                                }}
                                //   label = "Class Type"
                                value={row.name}
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
                                value={row.code}
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
                  rowsPerPageOptions={[7, 25, 50, 100]}
  
                />
                </StickyPagination>
                </>
              }


     
              {isEdit ? (
                <div
                  style={{ margin: "15px 7px 10px 0px" }}
                  className={StudyPlanFormCSS["add-saveOptions"]}
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
                      className={StudyPlanFormCSS.addIcon}
       
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
                      className={StudyPlanFormCSS.addIcon}
    
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
                            className={StudyPlanFormCSS.addIcon}
                  
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
                            className={StudyPlanFormCSS.addIcon}
              
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
                  className={StudyPlanFormCSS["add-editOptions"]}
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
      </TableBody>

    </div>
     
  );
}

export default StudyPlanForm;
