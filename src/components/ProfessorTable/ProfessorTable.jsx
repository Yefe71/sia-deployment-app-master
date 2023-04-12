import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Alert from "@mui/lab/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ProfessorTableCSS from "./ProfessorTable.module.css";

// Creating styles
const useStyles = () =>
  css({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    table: {
      minWidth: 650,
    },
    snackbar: {
      bottom: "104px",
    },
  });

function ProfessorTable() {
  // Creating style object
  const classes = useStyles();

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([
    { id: 1, firstname: "", lastname: "", city: "" },
  ]);

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
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
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        firstname: "",
        lastname: "",
        city: "",
      },
    ]);
    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
    setDisable(true);
    setOpen(true);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
    const list = [...rows];
    list.splice(i, 1);
    setRows(list);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar>

      <Box margin={1}>
        <div>
          <div>
            {isEdit ? (
              <div className={ProfessorTableCSS["add-saveOptions"]}>
                <Button onClick={handleAdd}>
                  <AddBoxIcon
                    className={ProfessorTableCSS.addIcon}
                    onClick={handleAdd}
                  />
                  ADD
                </Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <Button disabled align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    ) : (
                      <Button align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={ProfessorTableCSS["add-editOptions"]}>
                <Button onClick={handleAdd}>
                  <AddBoxIcon
                    className={ProfessorTableCSS.addIcon}
                    onClick={handleAdd}
                  />
                  ADD
                </Button>
                <Button align="right" onClick={handleEdit}>
                  <CreateIcon />
                  EDIT
                </Button>
              </div>
            )}
          </div>
        </div>
        <TableRow align="center"> </TableRow>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>City</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
          {rows.map((row, i) => {
              return (
                <div>
                  <TableRow>
                    {isEdit ? (
                      <div>
                        <TableCell sx={{ padding: "10px" }}>

                          <TextField
                            labelId="course-code-label"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "150px" }}
                            size="small"
                            label="First Name"
                            onChange={(e) => handleInputChange(e, i)}
                            value={row.firstname}
                            name="firstname"
                          ></TextField>
                        </TableCell>
                        <TableCell sx={{ padding: "0px" }}>
                          <TextField
                            labelId="course-code-label"
                            size="small"
                            sx={{ width: "150px" }}
                            InputLabelProps={{ shrink: true }}
                            label="Last Name"
                            onChange={(e) => handleInputChange(e, i)}
                            value={row.lastname}
                            name="lastname"
                          ></TextField>
                        </TableCell>
                        <TableCell sx={{ padding: "10px" }}>
                          <FormControl
                            size="small"
                            sx={{ margin: "0px 0px" }}
                            variant="outlined"
                          >
                      
                            <TextField
                              size="small"
                              sx={{ width: "150px", fontSize: "15px" }}
                              name="city"
                              select
                              InputLabelProps={{ shrink: true }}
                              label="Class Type"
                              value={row.city}
                              onChange={(e) => handleInputChange(e, i)}
                            >
                              <MenuItem
                                sx={{ fontSize: "15px" }}
                                value={"Karanja"}
                              >
                                Karanja
                              </MenuItem>
                              <MenuItem
                                sx={{ fontSize: "15px" }}
                                value={"Hingoli"}
                              >
                                Hingoli
                              </MenuItem>
                              <MenuItem
                                sx={{ fontSize: "15px" }}
                                value={"Bhandara"}
                              >
                                Bhandara
                              </MenuItem>
                            </TextField>
                          </FormControl>
                        </TableCell>
                      </div>
                    ) : (
                      <div className={ProfessorTableCSS["cells-deleteWrapper"]}>
                        <div>
                          <FormControl
                            variant="outlined"
                            sx={{ margin: "5px 7px" }}
                            className={classes.textField}
                          >
                            <TextField
                              labelId="class-type-label"
                              InputLabelProps={{ shrink: true }}
                              size="small"
                              sx={{ width: "150px" }}
                              InputProps={{
                                readOnly: true,
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
                              sx={{ width: "150px" }}
                              InputProps={{
                                readOnly: true,
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
                              sx={{ width: "150px" }}
                              InputProps={{
                                readOnly: true,
                              }}
                              //   label = "Class Type"
                              value={row.city}
                            />
                          </FormControl>
                        </div>
                        {isEdit ? (
                           
                          <div
                            onClick={handleConfirm}
                            style={{ width: "1rem", height: "1rem" }}
                            className={`${ProfessorTableCSS.iconWrapper} ${ProfessorTableCSS.ripple}`}
                          >
                        
                            <ClearIcon />
                          </div>    
                        ) : (
                          <div
                            onClick={handleConfirm}
                            style={{ width: "1rem", height: "1rem" }}
                            className={`${ProfessorTableCSS.iconWrapper} ${ProfessorTableCSS.ripple}`}
                          >
                            <DeleteOutlineIcon />
                          </div>
                        )}


                      </div>
                    )}

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
                              onClick={() => handleRemoveClick(i)}
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
                  </TableRow>
                </div>
              );
            })}

          </TableBody>
        </Table>
      </Box>
    </TableBody>
  );
}

export default ProfessorTable;
