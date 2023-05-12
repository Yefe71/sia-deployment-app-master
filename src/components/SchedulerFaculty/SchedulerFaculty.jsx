/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */

import * as React from "react";
import { DayView } from "@devexpress/dx-react-scheduler";
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
import Close from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import LocationOn from "@mui/icons-material/LocationOn";
import Notes from "@mui/icons-material/Notes";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { Box, TableCell, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import SchedulerFacultyCSS from "./SchedulerFaculty.module.css";
import Modal from "@mui/material/Modal";
import { appointments } from "../../data/appointments";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import SketchExample from "../SketchPicker/SketchPicker";
import addPerson from "../../assets/edit.svg";
import ProfessorTable from "../ProfessorTable/ProfessorTable";
import RoomTable from "../RoomTable/RoomTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";

const tooltipStyle = {
  width: "300px !important",
};
const CustomHeader = ({
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  commandButtonComponent: CommandButton,
  onOpenButtonClick,
  onHide,
  onDeleteButtonClick,
}) => (
  <div style={tooltipStyle}>
    <div style={tooltipStyle}>
      {showOpenButton && (
        <CommandButton id="open" onExecute={onOpenButtonClick} />
      )}
      {showDeleteButton && (
        <CommandButton id="delete" onExecute={onDeleteButtonClick} />
      )}
      {showCloseButton && <CommandButton id="close" onExecute={onHide} />}
    </div>
  </div>
);
const CustomContent = () => <div style={tooltipStyle} />;

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

const styleProf = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  height: 470,
  overflowY: "none",

  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  background: "#f6f6f6",
};
const styleRoom = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 350,
  overflowY: "none",

  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  background: "#f6f6f6",
};




const FormOverlay = React.forwardRef(({ visible, children }, ref) => {
  return (
    <Modal open={visible} ref={ref}>
      <Paper
        sx={{
          width: "27rem",
          padding: 1,
          borderRadius: "15px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
});

const Appointment = ({ children, style, ...restProps }) => {
  const { data } = restProps; // Destructure data from restProps
  const contentStyle = {
    color: "white",
    fontWeight: "bold",
    padding: "0px 10px 0px",
    margin: "0px",
  };

  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        overflowY: "scroll",
        backgroundColor: `rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`,
      }}
      draggable={false}
    >
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          padding: "13px 10px 0px 10px",
          margin: "0px",
        }}
      >
        {data.professorName}
      </p>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          padding: "0px 10px 0px",
          margin: "0px",
        }}
      >
        {` ${data.courseCode} `}
      </p>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          padding: "0px 10px 0px",
          margin: "0px",
        }}
      >
        {` ${data.courseName} `}
      </p>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          padding: "0px 10px 0px",
          margin: "0px",
        }}
      >
        {`BSIT ${data.year} - ${data.block}`}
      </p>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          padding: "0px 10px 0px",
          margin: "0px",
        }}
      >
        {`${data.classType} ${data.room}`}
      </p>
      <p style={contentStyle}>
        {" "}
        {dayjs(data.startDate).format("h:mm a")} -{" "}
        {dayjs(data.endDate).format("h:mm a")}{" "}
      </p>{" "}
      {/* Display the end time */}
    </Appointments.Appointment>
  );
};
const days = [
  { value: "2023-01-02", label: "Mon" },
  { value: "2023-01-03", label: "Tue" },
  { value: "2023-01-04", label: "Wed" },
  { value: "2023-01-05", label: "Thu" },
  { value: "2023-01-06", label: "Fri" },
  { value: "2023-01-07", label: "Sat" },
  { value: "2023-01-08", label: "Sun" },
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

const courseNames = {
  1: {
    "Introduction to Computer Human Interaction (lec)": "EIT 0121",
    "Introduction to Computer Human Interaction (lab)": "EIT 0121.1",
    "Discrete Mathematics": "EIT 0122",
    "Web Systems Technology (lec)": "EIT 0123",
    "Web Systems Technology (lab)": "EIT 0123.1",
    "Intermediate Programming (lec)": "ICC 0103",
    "Intermediate Programming (lab)": "ICC 0103.1",
  },
  2: {
    "Platform Technology": "EIT 0212",
    "Information Management (lec)": "ICC 0105",
    "Information Management (lab)": "ICC 0105.1",
    "Quantitative Methods": "EIT 0221",
    "Networking 1 (lec)": "EIT 0222",
    "Networking 1 (lab)": "EIT 0222.1",
    "Professional Elective 2": "EIT Elective 2",
  },
  3: {
    "Information Assurance and Security 1 (lec)": "EIT 0321",
    "Information Assurance and Security 1 (lab)": "EIT 0321.1",
    "System Integration and Architecture 1 (lec)": "EIT 0322",
    "System Integration and Architecture 1 (lab)": "EIT 0322.1",
    "Integrative Programming and Technologies (lec)": "EIT 0323",
    "Integrative Programming and Technologies (lab)": "EIT 0323.1",
  },
  4: {
    "Practicum (Lecture)": "IIP 0101",
    "Practicum (Immersion)": "IIP 0102",
  },
};


const courseColors = {
  "EIT 0121": "#2c3e50", //"Introduction to Computer Human Interaction (lec)"
  "EIT 0121.1": "#1a2734",
  "EIT 0122": "#3c4f5a",
  "EIT 0123": "#4e606c",
  "EIT 0123.1": "#384b54",
  "ICC 0103": "#243443",
  "ICC 0103.1": "#1a2530",
  "EIT 0212": "#10524b",
  "ICC 0105": "#1c5e37",
  "ICC 0105.1": "#206547",
  "EIT 0221": "#21649a",
  "EIT 0222": "#1a4a70",
  "EIT 0222.1": "#612d8a",
  "EIT Elective 2": "#7a339d",
  "EIT 0321": "#b55d18",
  "EIT 0321.1": "#9e4900",
  "EIT 0322": "#b23228",
  "EIT 0322.1": "#932321",
  "EIT 0323": "#b5770e",
  "EIT 0323.1": "#9e650a",
  "IIP 0101": "#137f6a",
  "IIP 0102": "#249a51"
};



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
    this.overlayRef = React.createRef();
    this.state = {
      appointmentChanges: {},
      openProf: false,
      openRoom: false,
      courseCode: "",
      yearBlock1: [],
      yearBlock2: [],
      yearBlock3: [],
      yearBlock4: [],
      yearBlock5: [],
      professorsNames: [],
      roomsNames: [],
      newYear: null,
      yearField: this.props.appointmentData.year,
      yearPropChild: null,
      blockPropChild: null
    };

    
    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };
    this.handleCategoryChange = (event) => {
      this.setState({ yearField: event });
    };

    this.handleNameToCodeChange = (event) => {
      this.setState({ courseCode: event });
    };
    

    this.handleOpenProf = this.handleOpenProf.bind(this);
    this.handleCloseProf = this.handleCloseProf.bind(this);
    this.handleOpenRoom = this.handleOpenRoom.bind(this);
    this.handleCloseRoom = this.handleCloseRoom.bind(this);
    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);

    this.childRef = React.createRef();
  }


  triggerChildFunction = (colorParent) => {

    console.log(colorParent)
    if(this.childRef.current) {
        this.childRef.current.handleChange(colorParent);
    }
}

  handleChange = (value, isYear) => {
    if (isYear) {
      this.props.handleDataFromChild(value, this.props.block);
    } else {
      this.props.handleDataFromChild(this.props.year, value);
    }
  };

  handleOpenProf() {
    this.setState({ openProf: true });
  }

  handleCloseProf() {
    this.setState({ openProf: false });
  }
  handleOpenRoom() {
    this.setState({ openRoom: true });
  }

  handleCloseRoom() {
    this.setState({ openRoom: false });
  }

  handleColorChange = (color) => {
    this.changeAppointment({
      field: "color",
      changes: color,
    });

    console.log(color)
  };

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };


    this.setState({
      appointmentChanges: nextChanges,
    },);

  }
  changeAppointmentYearCode({ name, pair }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      courseName: name,
      courseCode: pair,
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

  async fetchDataProf() {
    try {
      console.log("i ran prof");
      const response = await fetch("http://localhost:3000/grabProfessorsNames");
      const data = await response.json();
      this.setState({ professorsNames: data });
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
  }

  async fetchDataRoom() {
    try {
      const response = await fetch("http://localhost:3000/grabRoomsNames");
      const data = await response.json();
      this.setState({ roomsNames: data });
    } catch (error) {
      console.error("Error fetching rooms names:", error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.openProf !== this.state.openProf && !this.state.openProf) {
      this.fetchDataProf();
    }

    if (prevState.openRoom !== this.state.openRoom && !this.state.openRoom) {
      this.fetchDataRoom();
    }

    if(prevProps.visible !== this.props.visible){
      this.setState({ yearField: 0 });
      this.setState({yearPropChild: this.props.appointmentData.year })
      this.setState({blockPropChild: this.props.appointmentData.block })
    }


    console.log(this.state.yearField, "yearfield update")
    
    if (!this.state.yearField) {
      this.setState({ yearField: this.props.appointmentData.year });
       console.log(this.state.yearField, "when no yearfield, apptdata is yearfield")
    }

 
   
  }

  async componentDidMount() {

 
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
        fetch("http://localhost:3000/grabProfessorsNames"),
        fetch("http://localhost:3000/grabRoomsNames"),
      ]);

      const dataPromises = responses.map((response) => response.json());
      const allData = await Promise.all(dataPromises);

      // Process the fetched rooms names
      const roomsNamesData = allData.pop();
      this.setState({ roomsNames: roomsNamesData });

      // Process the fetched professor names
      const professorsNamesData = allData.pop();
      this.setState({ professorsNames: professorsNamesData });

      allData.forEach((data, index) => {
        const uniqueBlocks = [
          ...new Set(data.map((student) => student.block)),
        ].sort();
        if (index === 0) this.setState({ yearBlock1: uniqueBlocks });
        else if (index === 1) this.setState({ yearBlock2: uniqueBlocks });
        else if (index === 2) this.setState({ yearBlock3: uniqueBlocks });
        else if (index === 3) this.setState({ yearBlock4: uniqueBlocks });
        else if (index === 4) this.setState({ yearBlock5: uniqueBlocks });
      });
    } catch (error) {
      console.log(error);
    }
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
    const { yearField } = this.state;
    const filteredCourseNames = yearField ? courseNames[yearField] : [];
    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };



    const isFormValid = () => {
      const requiredFields = [
        "professorName",
        "year",
        "block",
        "courseName",
        "courseCode",
        "units",
        "actualUnits",
        "classType",
        "room",
        "day",
      ];

      return requiredFields.every((field) => displayAppointmentData[field]);
    };

    const isNewAppointment = appointmentData.id === undefined;

    const applyChanges = isNewAppointment
      ? () => { 
        this.commitAppointment("added")
        this.props.handleDataFromChild(this.state.blockPropChild, false)
        this.props.handleDataFromChild(this.state.yearPropChild, true)
   
        
        this.props.handleClickFromChild("clicked");
      }
      : () => {
        console.log("AKOY NAGLAKAD", this.state.yearPropChild, this.state.blockPropChild)
        this.commitAppointment("changed")
        this.props.handleDataFromChild(this.state.blockPropChild, false)
        this.props.handleDataFromChild(this.state.yearPropChild, true)
      };

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
    const textEditorPropsSpecial = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        })
        
        },
      value: displayAppointmentData[field] || "",
      className: classes.textField,
    });
    const textEditorPropsBlockSpecial = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        })
        this.setState({blockPropChild: change.value})
        },
      value: displayAppointmentData[field] || "",
      className: classes.textField,
    });


    function hexToRGBA(hex) {
      // Remove the '#' character if present
      hex = hex.replace("#", "");

      // Split the hex value into red, green, blue, and alpha components
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      var a = 1; // Assuming alpha value of 1 (fully opaque)

      // Create and return the RGBA object
      var rgba = {
        r: r,
        g: g,
        b: b,
        a: a
      };

      return rgba;
    }


    const textEditorPropsCourseName = (field) => ({
      variant: "outlined",

      onChange: ({ target: change }) => {
        const name = change.value.split(":")[0];
        const pair = change.value.split(":")[1];
        this.triggerChildFunction(hexToRGBA(courseColors[pair]))
        // this.handleColorChange(hexToRGBA(courseColors[pair]))
        this.handleNameToCodeChange(pair);
        this.changeAppointmentYearCode({
          name: name,
          pair: pair,
        });

    

      },

      value: `${displayAppointmentData.courseName}:${displayAppointmentData.courseCode}`,
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });
    const textEditorPropsYear = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.handleCategoryChange(change.value);
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
        
      },
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });
    const textEditorPropsYearSpecial = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.handleCategoryChange(change.value);
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });

        this.setState({yearPropChild: change.value})
      },
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const textEditorPropsReadOnly = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
      },
      value: displayAppointmentData[field] || "",
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
      // Set minTime and maxTime depending on the field
      minTime: dayjs().hour(6).minute(0),
      maxTime: dayjs().hour(21).minute(0),
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
    const courseNameOptions = Object.keys(courseNames).map((category) => (
      <optgroup key={`category-${category}`} label={`Category ${category}`}>
        {Object.entries(courseNames[category]).map(([name, code]) => (
          <option key={code} value={name}>
            {name}
          </option>
        ))}
      </optgroup>
    ));

    const { yearBlock1, yearBlock2, yearBlock3, yearBlock4, yearBlock5 } =
      this.state;

    // create a variable based on yearField to determine the current block options
    let currentBlocks;
   
    if (!yearField) {
      currentBlocks = [];
    } else if (yearField === 1) {
      currentBlocks = yearBlock1;
    } else if (yearField === 2) {
      currentBlocks = yearBlock2;
    } else if (yearField === 3) {
      currentBlocks = yearBlock3;
    } else if (yearField === 4) {
      currentBlocks = yearBlock4;
    } else if (yearField === 5) {
      currentBlocks = yearBlock5;
    } else {
      currentBlocks = [];
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    return (
      <FormOverlay visible={visible}  ref={this.overlayRef}>
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
            <div
              className={SchedulerFacultyCSS.wrapper}
              style={{ margin: "0px 7px 7px 7px" }}
            >
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel id="professor-name-label">
                  Professor Name
                </InputLabel>
                <Select
                  label="professor-name-label"
                  {...textEditorProps("professorName")}
                >
                  {this.state.professorsNames.map((name, index) => (
                    <MenuItem key={index} value={name.full_name}>
                      {name.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div
                style={{ width: "2rem", height: "2rem" }}
                onClick={this.handleOpenProf}
                className={`${SchedulerFacultyCSS.iconWrapper} ${SchedulerFacultyCSS.ripple}`}
              >
                <img
                  src={addPerson}
                  style={{
                    width: "1.8rem",
                    height: "1.8rem",
                    marginBottom: "5px",
                  }}
                  alt=""
                />
              </div>
            </div>

            <div className={SchedulerFacultyCSS["year-courseWrapper"]}>
              <FormControl
                variant="outlined"
                className={classes.textField}
                sx={{ margin: "7px 7px" }}
              >
                <InputLabel id="course-category-label">Year</InputLabel>
                <Select
                  label="course-category-label"
                  {...textEditorPropsYearSpecial("year")}
                >
                  <MenuItem value={1}>1st Year</MenuItem>
                  <MenuItem value={2}>2nd Year</MenuItem>
                  <MenuItem value={3}>3rd Year</MenuItem>
                  <MenuItem value={4}>4th Year</MenuItem>
                </Select>
              </FormControl>

              <SketchExample
                defaultColor={displayAppointmentData["color"]}
                className={`${SchedulerFacultyCSS.ripple}`}
                onColorChange={this.handleColorChange}
                ref={this.childRef}
              />

              <FormControl
                variant="outlined"
                sx={{ margin: "7px 7px" }}
                className={classes.textField}
              >
                <InputLabel>Block</InputLabel>
                <Select label="Block" {...textEditorPropsBlockSpecial("block")}>
                  {currentBlocks.map((block) => (
                    <MenuItem key={block} value={block}>
                      Block {block}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* COURSE NAME FIELD */}
            <div className={classes.wrapper}>
              <FormControl
                sx={{ margin: "4px 7px" }}
                variant="outlined"
                className={classes.textField}
              >
                <InputLabel sx={{ fontSize: "15px" }} id="course-name-label">
                  Course Name
                </InputLabel>
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5, // where 48 is the item height
                        width: '20ch',
                        overflow: 'auto',
                      },
                    },
                  }}
                  label="course-name-label"
                  {...textEditorPropsCourseName("courseName")}
                  sx={{ fontSize: "15px" }}
                >
                  {Object.keys(filteredCourseNames).map((name) => (
                    <MenuItem
                      sx={{ fontSize: "15px" }}
                      key={name}
                      value={`${name}:${filteredCourseNames[name]}`}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className={classes.wrapper}>
              <FormControl
                variant="outlined"
                sx={{ margin: "0px 7px" }}
                className={classes.textField}
              >
                <TextField
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Course Code"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5, // where 48 is the item height
                        width: '20ch',
                        overflow: 'auto',
                      },
                    },
                  }}
                  {...textEditorPropsReadOnly("courseCode")}
                ></TextField>
              </FormControl>
              <TextField
                sx={{ margin: "0px 7px", width: "230px" }}
                label="Units"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                {...textEditorPropsSpecial("units")}
              />
              <TextField
                sx={{ margin: "0px 7px", width: "230px" }}
                label="Actual Units"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                type="number"
                {...textEditorPropsSpecial("actualUnits")}
              />
            </div>

            {/* 3. Add a Select field that says Class type, and a Select field that says Room */}
            <div className={classes.wrapper}>
              <FormControl
                sx={{ margin: "0px 7px" }}
                variant="outlined"
                className={classes.textField}
              >
                <InputLabel>Class Type</InputLabel>
                <Select
                  label="Class Type"
                  {...textEditorPropsSpecial("classType")}
                >
                  <MenuItem value={"F2F"}>F2F</MenuItem>
                  <MenuItem value={"Synchronous Online"}>Sync Online</MenuItem>
                  <MenuItem value={"Asynchronous Online"}>
                    Async Online
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ margin: "0px 7px" }}
                variant="outlined"
                className={classes.textField}
              >
                <InputLabel>Room</InputLabel>
                <Select label="Room" {...textEditorProps("room")}>
                  {this.state.roomsNames.map((name, index) => (
                    <MenuItem key={index} value={name.room_name}>
                      {name.room_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  margin: "0px 7px 7px 7px",
                }}
                onClick={this.handleOpenRoom}
                className={`${SchedulerFacultyCSS.iconWrapper} ${SchedulerFacultyCSS.ripple}`}
              >
                <img
                  src={addPerson}
                  style={{
                    width: "1.8rem",
                    height: "1.8rem",
                    marginBottom: "5px",
                  }}
                  alt=""
                />
              </div>
            </div>

            <div className={SchedulerFacultyCSS.wrapper}>
              <FormControl
                sx={{ minWidth: 80, margin: "7px 7px" }}
                variant="outlined"
              >
                <InputLabel>Day</InputLabel>

                <Select
                  label="Day"
                  value={displayAppointmentData["day"]}
                  onChange={(event) =>
                    this.changeAppointment({
                      field: "day",
                      changes: dayjs(event.target.value).format("YYYY-MM-DD"),
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
                  format="HH:mm a" // Add this line
                  renderInput={(props) => (
                    <TextField
                      className={classes.picker}
                      {...props}
                      sx={{ margin: "7px 7px" }}
                    />
                  )}
                  {...startDatePickerProps}
                  ampm={true}
                  defaultValue="any"
                />
                <TimePicker
                  label="End Time"
                  format="HH:mm a" // Add this line
                  renderInput={(props) => (
                    <TextField
                      className={classes.picker}
                      {...props}
                      sx={{ margin: "7px 7px" }}
                    />
                  )}
                  {...endDatePickerProps}
                  ampm={true}
                />
              </LocalizationProvider>
            </div>

            <div className={SchedulerFacultyCSS.buttonWrapper}>
              {!isNewAppointment && (
                <Button
                  sx={{
                    color: "white",
                    borderRadius: "0.5rem",
                    fontFamily: "Poppins",
                    fontSize: "0.9rem",
                    padding: "0.7rem",
                    width: "100%",
                    margin: "15px 7px",
                  }}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    visibleChange();
                    this.commitAppointment("deleted");
                  }}
                >
                  Delete
                </Button>
              )}

              <Button
                onClick={() => {
                  visibleChange();
                  applyChanges();
                  this.props.setIsNewSched(isNewAppointment)
                }}
                style={{ textTransform: "none" }}
                sx={{
                  color: "white",
                  borderRadius: "0.5rem",
                  fontFamily: "Poppins",
                  fontSize: "0.9rem",
                  padding: "0.7rem",
                  width: "100%",
                  margin: "15px 7px",
                  backgroundColor: "#2196F3",
                }}
                disabled={!isFormValid()}
                variant="contained"
              >
                {isNewAppointment ? "Create" : "Save"}
              </Button>
            </div>
          </div>
        </StyledDiv>

        {/* PROF MODAL */}
        <Modal
          className={SchedulerFacultyCSS.profModal}
          open={this.state.openProf}
          onClose={this.handleCloseProf}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className={SchedulerFacultyCSS.profModalBoxParent}
            sx={styleProf}
          >
            <ProfessorTable onCloseProp={this.handleCloseProf} />
          </Box>
        </Modal>

        {/* ROOM MODAL */}
        <Modal
          className={SchedulerFacultyCSS.profRoom}
          open={this.state.openRoom}
          onClose={this.handleCloseRoom}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className={SchedulerFacultyCSS.roomModalBoxParent}
            sx={styleRoom}
          >
            <RoomTable onCloseProp={this.handleCloseRoom} />
          </Box>
        </Modal>
      </FormOverlay>
    );
  }
}

/* eslint-disable-next-line react/no-multi-comp */
export default class SchedulerFaculty extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newData: [],
      currentDate: "2023-01-07",
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 7,
      endDayHour: 21,
      isNewAppointment: false,
      appointmentColor: {},
      isUpdatingSchedules: false,
      schedulerKey: 0,
      year: null,
      block: null,
      clicked: "notClicked",
      isConflict: false,
      isConflictProp: false,
  
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
        data: data,
        handleDataFromChild: this.handleDataFromChild,
        handleClickFromChild: this.handleClickFromChild,
        setIsNewSched: this.props.setIsNewSched,
        isConflict: this.state.isConflict,
        isConflictProp: this.state.isConflictProp,
        handleEditYearChange: this.state.handleEditYearChange
      };
    });
  }

  
  handleDataFromChild = (value, isYear) => {

    
      if (isYear) {
        this.setState({ year: value });
      } else {
        this.setState({ block: value });
      }

    

    
  };

  handleClickFromChild = (isCreateClicked) => {
    this.setState({ clicked: isCreateClicked });
  
  };

  
  applyFilter = (year, block) => {


    if (!this.props.year && this.props.block.length === 0) {
      console.log(`i ran 1 ${this.props.year} ${this.props.block}`)
      this.updateNewData(this.state.data);
    } else if (!this.props.year) {
      console.log(`i ran 2 ${this.props.year} ${this.props.block}`)
      const filteredData = this.state.data.filter(item => item.block === this.props.block);
      this.updateNewData(filteredData);
    } else if (this.props.block.length === 0) {
      console.log(`i ran 3 ${this.props.year} ${this.props.block}`)
      const filteredData = this.state.data.filter(item => item.year === this.props.year);
      this.updateNewData(filteredData);
    } else {
      console.log(`i ran 4 ${this.props.year} ${this.props.block}`)
      const filteredData = this.state.data.filter(item => item.year === this.props.year && item.block === this.props.block);
      this.updateNewData(filteredData);
    }
  };

  handleAppointmentColorChange = (color) => {
    this.setState({ appointmentColor: color });
  };

  openModal() {
    const { currentDate, startDayHour } = this.state;
    this.setState({ editingFormVisible: true });
    this.onEditingAppointmentChange(undefined);
    this.onAddedAppointmentChange({
      startDate: dayjs(currentDate)
        .startOf("day")
        .add(7, "hour") // Set the start hour to 0 (12 am)
        .toDate(),
      endDate: dayjs(currentDate)
        .startOf("day")
        .add(10, "hour") // Set the end hour to 12 (12 pm)
        .toDate(),
      color: {
        r: 66,
        g: 165,
        b: 245,
        a: 1,
      },
    });
  }


fetchDataButtonsSched = () => {
    fetch(`http://localhost:3000/grabStudentsButtons?yearButton=${this.props.year}&blockButton=''`)
      .then((response) => response.json())
      .then((data) => {
        // setData(data);
        // setDataChild(data);
        const uniqueBlocks = [...new Set(data.map((student) => student.block))].sort();
        this.props.setBlockChild(uniqueBlocks);
          
      })
      .catch((error) => console.log(error));
  };


  

  componentDidUpdate(prevProps, prevState) {
    this.appointmentForm.update();
    if (
      (this.props.year !== prevProps.year || this.props.block !== prevProps.block)
    ) {
      this.fetchDataButtonsSched();
      this.applyFilter();
    }

    if (!prevState.isConflict && this.state.isConflict) {

      this.setState({isConflictProp: this.state.isConflict})
      this.props.setIsEditConflict(this.state.isConflict)
      
      toast.error('Conflict found. No changes made.', {
        position: toast.POSITION.TOP_CENTER,
        className:  SchedulerFacultyCSS['custom-toast'],
        style: {
          borderRadius: '10px',
          background: '#ffffff',
          color: '#0b0b0b',
          fontFamily: 'Roboto',
          fontSize: "15px"
        }
      });
      this.setState({ isConflict: false });
    }


  }

  updateNewData(newData) {
    console.log("AKO RIN AJAJJAJAHA")
    if (JSON.stringify(this.state.newData) !== JSON.stringify(newData)) {
      this.setState({ newData });
    }
  }

  async componentDidMount() {

    
    try {
      const response = await fetch(`http://localhost:3000/grabSchedules`);
      const data = await response.json();
      const rows = data.map((item) => ({
        id: item.id,
        color: item.color,
        startDate: item.start_date,
        endDate: item.end_date,
        professorName: item.professor_name,
        year: item.year,
        block: item.block,
        courseName: item.course_name,
        courseCode: item.course_code,
        actualUnits: item.actual_units,
        units: item.units,
        classType: item.class_type,
        room: item.room,
        day: dayjs(item.day).format("YYYY-MM-DD"),
      }));
      console.log(rows, "grab schedules");

      this.setState({ data: rows }, () => {
        this.setState({newData: this.state.data}, () => this.applyFilter())
      });


    } catch (error) {
      console.log(error);
    }

   
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
    this.setState(
      (state) => {
        const { data, deletedAppointmentId } = state;
        const nextData = data.filter(
          (appointment) => appointment.id !== deletedAppointmentId
        );

        return { data: nextData, deletedAppointmentId: null };
      },
      () => {
        console.log("me delete");
        this.updateSchedules(this.state.data);
        
      }
    );
    this.toggleConfirmationVisible();
  }

  handleEditYearChange(yearEdit, blockEdit){
    this.setState({year: yearEdit})
    this.setState({block: blockEdit})
  }

  async updateSchedules(dataLatest, added, changed, deleted, conflict) {
    this.setState({ isUpdatingSchedules: true });

    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataLatest),
      };

      const response = await fetch(
        "http://localhost:3000/updateSchedules",
        requestOptions
      );
      const data = await response.json();
      console.log(data, "updating scheds, should be latest");
      if (data.success) {
        console.log(data, "guds");
      } else {
        console.log(data, "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done updating, applying filters')
      console.log(this.state.year, this.state.block)
      
   
      
  
      if(added || changed){
    
      console.log(conflict, "TANGINA GUMANA KA PARANG AWA")

      if (!conflict){
        console.log(conflict, "nag run ako")
        this.applyFilterUpdate(this.state.year, this.state.block, added, changed, deleted);
      }
      
      }else{
      this.applyFilter();
      }
      this.setState({ isUpdatingSchedules: false });
      
    }
  }

  isTimeOverlap(time1, time2) {
    let start1 = dayjs(time1.startDate);
    let end1 = dayjs(time1.endDate);
    let start2 = dayjs(time2.startDate);
    let end2 = dayjs(time2.endDate);

    return start1.isBefore(end2) && end1.isAfter(start2);
  }

  doesScheduleOverlap(newSchedule, existingSchedules, isUpdate = false) {

    

    if (newSchedule.classType !== 'F2F') return false;
  
    for (let existing of existingSchedules) {
      // Check if the schedules conflict due to the same room, day, and time
      let isRoomDayTimeConflict = existing.classType === 'F2F' &&
        existing.room === newSchedule.room && 
        existing.day === newSchedule.day &&
        this.isTimeOverlap(existing, newSchedule);
  
      // Check if the schedules conflict due to the same year, block, day, and time
      let isYearBlockDayTimeConflict = existing.classType === 'F2F' &&
        existing.year === newSchedule.year &&
        existing.block === newSchedule.block &&
        existing.day === newSchedule.day &&
        this.isTimeOverlap(existing, newSchedule);
  
      // Check if the schedules conflict due to the same professor, day, and time
      let isProfDayTimeConflict = existing.classType === 'F2F' &&
        existing.professorName === newSchedule.professorName &&
        existing.day === newSchedule.day &&
        this.isTimeOverlap(existing, newSchedule);
  
      if (isRoomDayTimeConflict || isYearBlockDayTimeConflict || isProfDayTimeConflict) {
        if (
          isUpdate &&
          existing.room === newSchedule.room &&
          existing.startDate === newSchedule.startDate &&
          existing.endDate === newSchedule.endDate
        ) {
          continue;
        }
        return true;
      }
    }
    
    return false;
  }
  
  
  
  
applyFilterUpdate = (year, block, added, changed, deleted) => {

  console.log("NAG RUN RIN AKO MGA TANGA")
    
  if (!year && !block) {
    console.log(`i ran 1 ${year} ${block}`)
    this.updateNewData(this.state.data);
  } else if (!year) {
    console.log(`i ran 2 ${year} ${block}`)
    const filteredData = this.state.data.filter(item => item.block === block);
    this.updateNewData(filteredData);
  } else if (!block) {
    console.log(`i ran 3 ${year} ${block}`)
    const filteredData = this.state.data.filter(item => item.year === year);
    this.updateNewData(filteredData);
  } else {
    console.log(`i ran 4 ${year} ${block}`)
    const filteredData = this.state.data.filter(item => item.year === year && item.block === block);
    this.updateNewData(filteredData);
  }


  this.props.handleYearBlockAdd(year, block)
  
  
};



  commitChanges({ added, changed, deleted }) {
    
    this.setState(
      (state) => {
        let { data, appointmentColor } = state;
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

          if (this.doesScheduleOverlap(fixedDateAppointment, data)) {
            this.setState({ isConflict: true });
            return { data, addedAppointment: {} }; 
          }

          const maxId =
            data.length > 0 ? Math.max(...data.map((item) => item.id)) : -1;
          const newId = maxId + 1;

          console.log(data)
          data = [
            ...data,
            { id: newId, color: appointmentColor, ...fixedDateAppointment },
          ];
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

              const otherAppointments = data.filter(a => a.id !== appointment.id);

              if (this.doesScheduleOverlap(updatedAppointment, otherAppointments, true)) {
                this.setState({ isConflict: true });
                return appointment;  // Skip the update if there is a conflict
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
      },
      () => {
   
        console.log(this.state.isConflict, "UPDATE SHEEEE")
        this.updateSchedules(this.state.data, added,changed,deleted, this.state.isConflict);
        
      }
    );
  }
  

  render() {
    const {
      currentDate,
      data,
      newData,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
      block,
      year,
      clicked
    } = this.state;


   
  
    return (
      <div className={SchedulerFacultyCSS.tooltipContainer}>
        <>
          <CustomPaper>
            <Scheduler data={newData} height={"100%"} firstDayOfWeek={1} key={this.state.schedulerKey}>
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

              <Appointments appointmentComponent={Appointment}  />

            { this.props.readOnly ?
              null
              :
              <AppointmentTooltip
              showOpenButton
              showCloseButton
              showDeleteButton
              headerComponent={CustomHeader}
              contentComponent={CustomContent}
              sx={{ width: "300px" }}
       
            />
              }

              <AppointmentForm
                overlayComponent={this.appointmentForm}
                visible={editingFormVisible}
                onVisibilityChange={this.props.readOnly ? null : this.toggleEditingFormVisibility}
              />

              <DragDropProvider allowDrag={allowDrag} allowResize={allowDrag} />
            </Scheduler>

            <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
              <DialogTitle>Delete Schedule</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this schedule?
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
          <ToastContainer />
        </>
        
      </div>
    );
  }
}
