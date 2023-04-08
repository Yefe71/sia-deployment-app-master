/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import LocationOn from "@mui/icons-material/LocationOn";
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { TableCell } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import SchedulerFacultyCSS from "./SchedulerFaculty.module.css";

import { appointments } from "../../data/appointments";

const CustomTimeTableCell = ({ ...props }) => {
  const onDoubleClick = (event) => {
    event.stopPropagation();
  };

  return <WeekView.TimeTableCell {...props} onDoubleClick={onDoubleClick} />;
};
const allowDrag = () => false;
const dayScaleCell = ({ startDate, endDate, today }) => (
  <TableCell>
    <span className={SchedulerFacultyCSS.dayName}>
      {Intl.DateTimeFormat("en-US", { weekday: "short" }).format(startDate)}
    </span>
  </TableCell>
);
const Appointment = ({ children, style, ...restProps }) => {
  const { data } = restProps; // Destructure data from restProps

  // Create a new style object
  const contentStyle = {
    color: "white",
    fontWeight: "bold",
    padding: "0px 10px 0px",
    margin: "0px",
  };

  return (
    <Appointments.Appointment {...restProps} draggable={false}>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          padding: "10px 10px 0px",
          margin: "0px",
        }}
      >
        {data.professorName}
      </p>{" "}
      {/* Display the professor's name */}
      <p style={contentStyle}>
        {" "}
        {dayjs(data.startDate).format("HH:mm")} -{" "}
        {dayjs(data.endDate).format("HH:mm")}{" "}
      </p>{" "}
      {/* Display the end time */}
    </Appointments.Appointment>
  );
};
const days = [
  { value: "2023-01-01", label: "Monday" },
  { value: "2023-01-02", label: "Tuesday" },
  { value: "2023-01-03", label: "Wednesday" },
  { value: "2023-01-04", label: "Thursday" },
  { value: "2023-01-05", label: "Friday" },
  { value: "2023-01-06", label: "Saturday" },
  { value: "2023-01-07", label: "Sunday" },
];
const PREFIX = "Demo";
// #FOLD_BLOCK
const classes = {
  content: `${PREFIX}-content`,
  header: `${PREFIX}-header`,
  closeButton: `${PREFIX}-closeButton`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  button: `${PREFIX}-button`,
  picker: `${PREFIX}-picker`,
  wrapper: `${PREFIX}-wrapper`,
  icon: `${PREFIX}-icon`,
  textField: `${PREFIX}-textField`,
  addButton: `${PREFIX}-addButton`,
};
const professorNames = [
  "Prof. John Doe",
  "Prof. Jane Smith",
  "Prof. Michael Brown",
];
// #FOLD_BLOCK
const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: "100%",
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: "right",
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  [`& .${classes.wrapper}`]: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));

const CustomPaper = styled(Paper)({
  height: "100%",
  minWidth: "1440px", // set a fixed width
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment("added")
      : () => this.commitAppointment("changed");

    const textEditorProps = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value,
        }),
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = (field) => ({
      // keyboard: true,
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field]),
        }),
      ampm: false,
      // Update this line to display only the time
      onError: () => null,
    });

    const startDatePickerProps = pickerEditorProps("startDate");
    const endDatePickerProps = pickerEditorProps("endDate");
    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        onHide={onHide}
      >
        <StyledDiv>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
              size="large"
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            {/* PROFESSOR NAME FIELD */}
            <div className={classes.wrapper}>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel id="professor-name-label">
                  Professor Name
                </InputLabel>
                <Select
                  labelId="professor-name-label"
                  {...textEditorProps("professorName")}
                >
                  {professorNames.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* COURSE NAME FIELD */}
            <div className={classes.wrapper}>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel id="course-name-label">Course Name</InputLabel>
                <Select
                  labelId="course-name-label"
                  {...textEditorProps("professorName")}
                >
                  {professorNames.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* 1. Add a read-only text input field that says "EIT ELECTIVE 7" */}
            <div className={classes.wrapper}>
              <TextField
                label="Course"
                defaultValue="EIT ELECTIVE 7"
                className={classes.textField}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </div>

            {/* 2. Add a Select field that says Block, a number input field, and a read-only text input field that says "12" */}
            <div className={classes.wrapper}>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel>Block</InputLabel>
                <Select
                  label="Block"
                  // Add your options here
                >
                  {/* ... */}
                </Select>
              </FormControl>
              <TextField
                label="Number"
                type="number"
                className={classes.textField}
                variant="outlined"
              />
              <TextField
                label="Fixed Number"
                defaultValue="12"
                className={classes.textField}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </div>

            {/* 3. Add a Select field that says Class type, and a Select field that says Room */}
            <div className={classes.wrapper}>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel>Class Type</InputLabel>
                <Select
                  label="Class Type"
                  // Add your options here
                >
                  {/* ... */}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel>Room</InputLabel>
                <Select
                  label="Room"
                  // Add your options here
                >
                  {/* ... */}
                </Select>
              </FormControl>
            </div>

            <div className={classes.wrapper}>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel>Day</InputLabel>
                <Select
                  label="Day"
                  value={displayAppointmentData.day || ""}
                  onChange={(event) =>
                    this.changeAppointment({
                      field: "day",
                      changes: event.target.value,
                    })
                  }
                >
                  {days.map((day) => (
                    <MenuItem key={day.value} value={day.value}>
                      {day.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Start Time"
                  format="HH:mm" // Add this line
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...startDatePickerProps}
                />
                <TimePicker
                  label="End Time"
                  format="HH:mm" // Add this line
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...endDatePickerProps}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Start Date"
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...startDatePickerProps}
                />
                <DateTimePicker
                  label="End Date"
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...endDatePickerProps}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment("deleted");
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? "Create" : "Save"}
            </Button>
          </div>
        </StyledDiv>
      </AppointmentForm.Overlay>
    );
  }
}

/* eslint-disable-next-line react/no-multi-comp */
export default class SchedulerFaculty extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: "2023-01-07",
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility =
      this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange =
      this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment =
        data.filter(
          (appointment) =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  openModal() {
    const { currentDate, startDayHour } = this.state;
    this.setState({ editingFormVisible: true });
    this.onEditingAppointmentChange(undefined);
    this.onAddedAppointmentChange({
      startDate: dayjs(currentDate)
        .startOf("day")
        .add(startDayHour, "hour")
        .toDate(),
      endDate: dayjs(currentDate)
        .startOf("day")
        .add(startDayHour + 1, "hour")
        .toDate(),
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const fixedDateAppointment = {
          ...added,
          startDate: dayjs(added.day)
            .set("hour", dayjs(added.startDate).hour())
            .set("minute", dayjs(added.startDate).minute())
            .toDate(),
          endDate: dayjs(added.day)
            .set("hour", dayjs(added.endDate).hour())
            .set("minute", dayjs(added.endDate).minute())
            .toDate(),
        };
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...fixedDateAppointment }];
        console.log("Data after adding appointment:", data);
      }

      if (changed) {
        data = data.map((appointment) => {
          if (changed[appointment.id]) {
            const updatedAppointment = {
              ...appointment,
              ...changed[appointment.id],
            };
            if (updatedAppointment.day) {
              updatedAppointment.startDate = dayjs(updatedAppointment.day)
                .set("hour", dayjs(updatedAppointment.startDate).hour())
                .set("minute", dayjs(updatedAppointment.startDate).minute())
                .toDate();
              updatedAppointment.endDate = dayjs(updatedAppointment.day)
                .set("hour", dayjs(updatedAppointment.endDate).hour())
                .set("minute", dayjs(updatedAppointment.endDate).minute())
                .toDate();
            }
            return updatedAppointment;
          } else {
            return appointment;
          }
        });
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;

    return (
      <>
        <CustomPaper>
          <Scheduler data={data} height={"100%"}>
            <ViewState currentDate={currentDate} />
            <EditingState
              onCommitChanges={this.commitChanges}
              onEditingAppointmentChange={this.onEditingAppointmentChange}
              onAddedAppointmentChange={this.onAddedAppointmentChange}
              readOnly
            />
            <WeekView
              startDayHour={startDayHour}
              endDayHour={endDayHour}
              dayScaleCellComponent={dayScaleCell}
              timeTableCellComponent={CustomTimeTableCell}
            />

            <EditRecurrenceMenu />
            <Appointments appointmentComponent={Appointment} />

            <AppointmentTooltip
              showOpenButton
              showCloseButton
              showDeleteButton
            />

            <AppointmentForm
              overlayComponent={this.appointmentForm}
              visible={editingFormVisible}
              onVisibilityChange={this.toggleEditingFormVisibility}
            />
            <DragDropProvider allowDrag={allowDrag} />
          </Scheduler>

          <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this appointment?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.toggleConfirmationVisible}
                color="primary"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={this.commitDeletedAppointment}
                color="secondary"
                variant="outlined"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </CustomPaper>
      </>
    );
  }
}
