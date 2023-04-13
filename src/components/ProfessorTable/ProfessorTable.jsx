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

    snackbar: {
      bottom: "104px",
    },
  });

function ProfessorTable() {
  // Creating style object
  const classes = useStyles();
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([
    {
      id: 1,
      lastname: "Libed",
      middlename: "Jake",
      firstname: "Dela Rosa",
      employment: "Part-time",
      maxUnits: "24",
    },
  ]);

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
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        lastname: "",
        firstname: "",
        employment: "",
        maxUnits: "",
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
    setDisable(false);
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
  const handleConfirm = (index) => {
    setShowConfirm(true);
    setDeleteIndex(index);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = () => {
    const list = [...rows];
    list.splice(deleteIndex, 1);
    setRows(list);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
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
          <Alert onClose={handleClose} severity="success">
            Record saved successfully!
          </Alert>
        </Snackbar>

        <Box className={ProfessorTableCSS.tableParent}>
          <div className={ProfessorTableCSS.topItems}>
            <div></div>
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
            //   className={classes.table}
            size="small"
            aria-label="a dense table"
            style={{ width: "0px" }}
          >
            <TableHead>
              <TableRow></TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, i) => {
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
                                <MenuItem value={"Part-time"}>
                                  Part-time
                                </MenuItem>
                                <MenuItem value={"Full-time"}>
                                  Full-time
                                </MenuItem>
                                <MenuItem value={"Full-pledge"}>
                                  Full-pledge
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
                                labelId="course-code-label"
                                size="small"
                                type="number"
                                sx={{ width: "70px", fontSize: "13px" }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                  style: { fontSize: "13px" },
                                }}
                                onChange={(e) => handleInputChange(e, i)}
                                value={row.maxUnits}
                                name="maxUnits"
                              ></TextField>
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
                      ) : (
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
                      )}

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
        </Box>
      </TableBody>
      {isEdit ? (
        <div
          style={{ margin: "15px 7px 10px 0px" }}
          className={ProfessorTableCSS["add-saveOptions"]}
        >
          <Button
            style={{ textTransform: "none" }}
            sx={{
              background: "#2196F3",
              color: "#ffffff",
              borderRadius: "0.25rem",
              fontFamily: "Poppins",
              fontSize: "0.7rem",
              padding: "0rem",
              padding: "0.7rem",
              "&:hover": {
                background: "#1f7ecc",

                color: "#fafafa",
              },
            }}
            onClick={handleAdd}
          >
            <AddBoxIcon
              className={ProfessorTableCSS.addIcon}
              onClick={handleAdd}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            />
            ADD
          </Button>
          {rows.length !== 0 && (
            <div style={{ margin: "0px 0px 0px 7px" }}>
              {disable ? (
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
                      background: "#1f7ecc",

                      color: "#fafafa",
                    },
                  }}
                  onClick={handleSave}
                >
                  <DoneIcon
                    className={ProfessorTableCSS.addIcon}
                    onClick={handleSave}
                  />
                  SAVE
                </Button>
              ) : (
                <Button
                  style={{ textTransform: "none" }}
                  sx={{
                    background: "#2196F3",
                    color: "#ffffff",
                    borderRadius: "0.25rem",
                    fontFamily: "Poppins",
                    fontSize: "0.7rem",
                    padding: "0rem",
                    padding: "0.7rem",
                    "&:hover": {
                      background: "#1f7ecc",

                      color: "#fafafa",
                    },
                  }}
                  onClick={handleSave}
                >
                  <DoneIcon
                    className={ProfessorTableCSS.addIcon}
                    onClick={handleSave}
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
            style={{ textTransform: "none" }}
            sx={{
              background: "#2196F3",
              color: "#ffffff",
              borderRadius: "0.25rem",
              fontFamily: "Poppins",
              fontSize: "0.7rem",
              padding: "0rem",
              padding: "0.7rem",
              "&:hover": {
                background: "#1f7ecc",

                color: "#fafafa",
              },
            }}
            onClick={handleAdd}
          >
            <AddBoxIcon
              className={ProfessorTableCSS.addIcon}
              onClick={handleAdd}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#ffffff",
                },
              }}
            />
            ADD
          </Button>
          <Button
            align="right"
            style={{ textTransform: "none", marginLeft: "8px" }}
            sx={{
              background: "#2196F3",
              color: "#ffffff",
              borderRadius: "0.25rem",
              fontFamily: "Poppins",
              fontSize: "0.7rem",
              padding: "0rem",
              padding: "0.7rem",
              "&:hover": {
                background: "#1f7ecc",

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
