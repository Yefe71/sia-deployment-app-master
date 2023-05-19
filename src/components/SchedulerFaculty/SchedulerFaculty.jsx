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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TableManageBlock from "../TableManageBlock/TableManageBlock";
import TableFormStudents from "../TableFormStudents/TableFormStudents";

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

const FormOverlay = React.forwardRef(({ visible, contents, isStudent}, ref) => {
  return (
   
    <Modal open={visible} ref={ref} sx={{ zIndex: 2 }}> 
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
      }}
    >
      
      {
        isStudent === false ? 
        
        <Paper
          sx={{
            width: "27rem",
            padding: 1,
            paddingBottom: "0px",
            borderRadius: "15px",
            height: "36rem"
            // transform: "translate(-50%, -50%)",
          }}
        >
          {contents.children}
        </Paper>
        
        
        :

<>

        
<Paper
    sx={{
      width: "75rem",
      padding: 1,
      paddingBottom: "0px",
      borderRadius: "15px",
      height: "36rem"
      // transform: "translate(-50%, -50%)",
    }}
  >
    {contents.otherChildren}
  </Paper>

  
  <Paper
    sx={{
      width: "27rem",
      padding: 1,
      paddingBottom: "0px",
      borderRadius: "15px",
      height: "36rem"
      // transform: "translate(-50%, -50%)",
    }}
  >
    {contents.children}
  </Paper>

        

</>
      
      }

  

      </Box>
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
      blockPropChild: null,
      oldYear: null,
      oldBlock: null,
      isSelect: true,
      yearTable: '',
      selectedRow: null,
      yearFieldTable: null

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
    this.handleSwitchField = this.handleSwitchField.bind(this);
    this.handleCloseProf = this.handleCloseProf.bind(this);
    this.handleOpenRoom = this.handleOpenRoom.bind(this);
    this.handleCloseRoom = this.handleCloseRoom.bind(this);
    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);

    this.childRef = React.createRef();
  }

  triggerChildFunction = (colorParent) => {
    console.log(colorParent);
    if (this.childRef.current) {
      this.childRef.current.handleChange(colorParent);
    }
  };

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
  handleSwitchField() {
    this.setState({ isSelect: !this.state.isSelect });
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

    console.log(color);
  };

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes, //this doesn't work
    };

    this.setState({
      appointmentChanges: nextChanges,
    });
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

  commitAppointment(type, isConfirm) {
    const { commitChanges } = this.props;

    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };

    if (type === "deleted") {
      commitChanges({ [type]: appointment.id }, isConfirm);
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } }, isConfirm);
    } else {
      commitChanges({ [type]: appointment }, isConfirm);
    }

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

  hexToRGBA = (hex) => {
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
      a: a,
    };

    return rgba;
  }

 componentDidUpdate = async(prevProps, prevState) => {


    
    if(prevState.selectedRow !== this.state.selectedRow) {
    this.setState({ yearFieldTable: this.state.selectedRow.year});
    //table form student changes on click row
   
      this.triggerChildFunction(this.hexToRGBA(this.props.coursesColors[this.state.selectedRow.course_code]));
      
      const nextChanges = {
        ...this.getAppointmentChanges(),
        professorName: this.state.selectedRow.professor_name,
        year: this.state.selectedRow.year,
        classType: this.state.selectedRow.class_type,
        room: this.state.selectedRow.room,
        courseName: this.state.selectedRow.course_name,
        courseCode: this.state.selectedRow.course_code,
      };
      
      this.setState({
        appointmentChanges: nextChanges,
      });
    }
    
    if (this.state.isFirstRender) {
    }

    if (prevState.openProf !== this.state.openProf && !this.state.openProf) {
      this.fetchDataProf();
    }

    if (prevState.openRoom !== this.state.openRoom && !this.state.openRoom) {
      this.fetchDataRoom();
    }

    if (prevProps.visible !== this.props.visible) {
      this.setState({ yearField: 0 });
      this.setState({ yearFieldTable: 0 });
      this.setState({ yearPropChild: this.props.appointmentData.year });
      this.setState({ blockPropChild: this.props.appointmentData.block });
      this.setState({ oldYear: this.props.appointmentData.year });
      this.setState({ oldBlock: this.props.appointmentData.block });
      this.setState({appointmentChanges: {}})

      
    }

    if (prevProps.triggerToast !== this.props.triggerToast) {
      toast.error(`${this.props.conflictDesc}`, {
        position: toast.POSITION.TOP_CENTER,
        className: SchedulerFacultyCSS["custom-toast"],
        style: {
          borderRadius: "10px",
          background: "#ffffff",
          color: "#0b0b0b",
          fontFamily: "Roboto",
          fontSize: "15px",
          zIndex: 3,
        },
      });
    }

    if (prevState.appointmentChanges !== this.state.appointmentChanges) {
      console.log("LATEST APPT CHANGES",  this.state.appointmentChanges)
      this.props.handleChangeFields();
    }

    if (!this.state.yearField) {
      this.setState({ yearField: this.props.appointmentData.year });
      console.log(
        this.state.yearField,
        "when no yearfield, apptdata is yearfield"
      );
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

      //Process fetched Professors data

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

  handleRowClick = (row) => {
      this.setState({selectedRow: row}, () => console.log(this.state.selectedRow.professor_name, "IM CLICKED ROW"))
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
    const { isFirstRender } = this.state;
    const { appointmentChanges } = this.state;
    const { yearField } = this.state;
    const { yearFieldTable } = this.state;
    const filteredCourseNames = yearField ? this.props.majorCourses[yearField] : [];
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

    const applyChanges = (isConfirm) => {
      return isNewAppointment
        ? () => { 
          this.commitAppointment("added", isConfirm);
          this.props.handleDataFromChild(this.state.blockPropChild, false);
          this.props.handleDataFromChild(this.state.yearPropChild, true);
          this.props.handleClickFromChild("clicked");
        }
        : () => {
          console.log("AKOY NAGLAKAD", this.state.yearPropChild, this.state.blockPropChild);
          this.commitAppointment("changed", isConfirm);
          this.props.handleDataFromChild(this.state.blockPropChild, false, this.state.oldYear, this.state.oldBlock);
          this.props.handleDataFromChild(this.state.yearPropChild, true, this.state.oldYear, this.state.oldBlock);
        };
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
    const TABLEtextEditorPropsProf = (field) => ({
      variant: "outlined",
      // onChange: ({ target: change }) =>
      //   this.changeAppointment({
      //     field: [field],
      //     changes: change.value,
      //   }),
      value: this.state.selectedRow ? this.state.selectedRow.professor_name : "",
      label: "Professor Name",
      className: classes.textField,
    });


    const TABLEtextEditorPropsRoom = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value,
        }),
        value: this.state.selectedRow ? this.state.selectedRow.room : "",
      className: classes.textField,
    });
    const textEditorPropsSpecial = (field) => ({
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
    const TABLEtextEditorPropsSpecial = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
      },
      value: this.state.selectedRow ? this.state.selectedRow.class_type : "",
      className: classes.textField,
    });
    const TABLEtextEditorPropsSpecialUnits = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
      },
      value: this.state.selectedRow ? this.state.selectedRow.unit : "",
      className: classes.textField,
    });
    const TABLEtextEditorPropsSpecialActUnits = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
      },
      value: this.state.selectedRow ? this.state.selectedRow.actual_unit : "",
      className: classes.textField,
    });






    
    const textEditorPropsBlockSpecial = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
        this.setState({ blockPropChild: change.value });
      },
      value: displayAppointmentData[field] || "",
      className: classes.textField,
    });
    const TABLEeditorPropsBlockSpecial = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
        this.setState({ blockPropChild: change.value });
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
        a: a,
      };

      return rgba;
    }

    const textEditorPropsCourseName = (field) => ({
      variant: "outlined",

      onChange: ({ target: change }) => {
        const name = change.value.split(":")[0];
        const pair = change.value.split(":")[1];
        this.triggerChildFunction(hexToRGBA(this.props.coursesColors[pair]));
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
    
    const TABLEtextEditorPropsCourseName = (field) => ({
      variant: "outlined",
      // onChange: ({ target: change }) => {
      //   this.triggerChildFunction(hexToRGBA(this.props.coursesColors[this.state.selectedRow.course_code]));
      //   this.handleNameToCodeChange(this.state.selectedRow.course_code);
      //   this.changeAppointmentYearCode({
      //     name: this.state.selectedRow.course_name,
      //     pair: this.state.selectedRow.course_code,
      //   });
      // },

      value: this.state.selectedRow ? `${this.state.selectedRow.course_name}` : "",
      // label: field[0].toUpperCase() + field.slice(1),
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

        this.setState({ yearPropChild: change.value });
      },
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });
    const TABLEtextEditorPropsYearSpecial = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.handleCategoryChange(change.value);
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });

        this.setState({ yearPropChild: change.value });
      },
      value: this.state.selectedRow ? this.state.selectedRow.year : "",
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
    const TABLEtextEditorPropsReadOnly = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) => {
        this.changeAppointment({
          field: [field],
          changes: change.value,
        });
      },
      value: this.state.selectedRow ? this.state.selectedRow.course_code : "",
      className: classes.textField,
    });

    const TABLEpickerEditorProps = (field) => ({
      // keyboard: true,
      value: "",
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

    
    const TABLEstartDatePickerProps = TABLEpickerEditorProps("startDate");
    const TABLEendDatePickerProps = TABLEpickerEditorProps("endDate");
    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };
    const courseNameOptions = Object.keys(this.props.majorCourses).map((category) => (
      <optgroup key={`category-${category}`} label={`Category ${category}`}>
        {Object.entries(this.props.majorCourses[category]).map(([name, code]) => (
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

    if (this.props.isStudent === false){
    
    
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

    }else{
       if (!yearFieldTable) {
        currentBlocks = [];
      } else if (yearFieldTable === 1) {
        currentBlocks = yearBlock1;
      } else if (yearFieldTable === 2) {
        currentBlocks = yearBlock2;
      } else if (yearFieldTable === 3) {
        currentBlocks = yearBlock3;
      } else if (yearFieldTable === 4) {
        currentBlocks = yearBlock4;
      } else if (yearFieldTable === 5) {
        currentBlocks = yearBlock5;
      } else {
        currentBlocks = [];
      }

    }


 


    return (
      <>

<FormOverlay visible={visible} ref={this.overlayRef} isStudent = {this.props.isStudent} contents={{
          children: (
            <div>
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

                {this.props.isStudent === false ? 
          
                <>
                 <InputLabel id="professor-name-label">
                  Professor Name
                </InputLabel>
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5, // where 48 is the item height
                        width: "20ch",
                        overflow: "auto",
                      },
                    },
                  }}
                  label="professor-name-label"
                  {...textEditorProps("professorName")}
                >
                  {this.state.professorsNames.map((name, index) => (
                    <MenuItem key={index} value={name.full_name}>
                      {name.full_name}
                    </MenuItem>
                  ))}
                </Select>
                </>
          
                :
          
                <TextField
                InputProps={{
                  readOnly: true,
                }}
                id="outlined-helperText"
                label="Professor Name"
                {...TABLEtextEditorPropsProf("professorName")}
              />
          
          
                }
                
 


                
                    </FormControl>


                    { this.props.isStudent === false ? 
          
          
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

              : ""
          
                    }

         


              
                  </div>

                  <div className={SchedulerFacultyCSS["year-courseWrapper"]}>

                    {
                      this.props.isStudent === false  ?   

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


                      :
                      <FormControl
                      variant="outlined"
                      className={classes.textField}
                      sx={{ margin: "7px 7px" }}
                    >
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        id="outlined-helperText"
                        label="Year"
                      {...TABLEtextEditorPropsYearSpecial("year")}
                      />
                       </FormControl>
                    }
             

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

                  {!this.props.isStudent ?
                  
                  
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
                            width: "20ch",
                            overflow: "auto",
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
                  
                   :
                   
                   <FormControl
                   sx={{ margin: "4px 7px" }}
                   variant="outlined"
                   className={classes.textField}
                 >
                   <TextField
                     InputProps={{
                       readOnly: true,
                     }}
                  
                     label="Course Name"
                     {...TABLEtextEditorPropsCourseName("courseName")}
                   />
                 </FormControl>
                   
                   }
                    
                    
          


                    
                  </div>

                  <div className={classes.wrapper}>



                    {this.props.isStudent === false ? 
                    
                    <>
                    
                      <FormControl
                        variant="outlined"
                        sx={{ margin: "0px 7px" }}
                        className={classes.textField}
                      >
                        <TextField
                          InputProps={{
                            readOnly: true
                          }}
                          InputLabelProps={{ shrink: true }}
                          label="Course Code"
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 48 * 4.5, // where 48 is the item height
                                width: "20ch",
                                overflow: "auto",
                              },
                            },
                          }}
                          {...textEditorPropsReadOnly("courseCode")}
                        ></TextField>
                      </FormControl>


                
                      <TextField
                        sx={{ margin: "0px 7px", width: "230px" }}
                        label="Units"
                        type = "number"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        {...textEditorPropsSpecial("units")}
                      />
                      <TextField

                        sx={{ margin: "0px 7px", width: "230px" }}
                        label="Actual Units"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        type = "number"
                        {...textEditorPropsSpecial("actualUnits")}
                      />
                    
                    
                    
                    </>
                    
                    :
                    
                    <>
                    
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
                                width: "20ch",
                                overflow: "auto",
                              },
                            },
                          }}
                          {...TABLEtextEditorPropsReadOnly("courseCode")}
                        ></TextField>
                      </FormControl>


                
                      <TextField
                        InputProps={{
                          readOnly: true
                        }}
                        sx={{ margin: "0px 7px", width: "230px" }}
                        label="Units"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        {...TABLEtextEditorPropsSpecialUnits("units")}
                      />
                      <TextField
                        InputProps={{
                          readOnly:true
                        }}
                      
                        sx={{ margin: "0px 7px", width: "230px" }}
                        label="Actual Units"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        {...TABLEtextEditorPropsSpecialActUnits("actualUnits")}
                      />
                    </>
                    
                    }

                  </div>

                  {/* 3. Add a Select field that says Class type, and a Select field that says Room */}
                  <div className={classes.wrapper}>

                {this.props.isStudent === false ?
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
                
                 :
                  <FormControl
                  sx={{ margin: "0px 7px" }}
                    variant="outlined"
                    className={classes.textField}
                  >
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      id="outlined-helperText"
                      label="Class Type"
                      {...TABLEtextEditorPropsSpecial("classType")}
                    />
                  </FormControl>
                 
                 }
              

                    
                    {this.props.isStudent === false ? 
                    
                    
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
                    :
                    
                      <FormControl
                        sx={{ margin: "0px 7px" }}
                        variant="outlined"
                        className={classes.textField}
                      >
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          id="outlined-helperText"
                          label="Room"
                          {...TABLEtextEditorPropsRoom("room")}
                        />
                      </FormControl>
                    
                    }
          
          {this.props.isStudent === false ? 
          
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
          
          :
          
          ""
          }
                  
                  </div>

                  <div className={SchedulerFacultyCSS.wrapper}>

                    {this.props.isStudent === false ? 
                    
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
                    :
                    
                    <FormControl
                    sx={{ width: "120px !important", margin: "7px 7px" }}
                    variant="outlined"
                    className={classes.textField}
                  >
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      id="outlined-helperText"
                      label="Day"
                      value={""}
                      onChange={(event) =>
                        this.changeAppointment({
                          field: "day",
                          changes: dayjs(event.target.value).format("YYYY-MM-DD"),
                        })
                      }
                    />
                  </FormControl>
                    
                    }
   

                    <LocalizationProvider dateAdapter={AdapterMoment}>


                      {this.props.isStudent === false ? 

                      <>
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
                      </>
                      :
                      <>
                      <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ margin: "7px 7px" }}
                      id="outlined-helperText"
                      label="Start Time"
                    {...TABLEstartDatePickerProps}
                    />

                    <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ margin: "7px 7px" }}
                    id="outlined-helperText"
                    label="End Time"
                  {...TABLEstartDatePickerProps}
                  />
                        </>
                      }

                    </LocalizationProvider>
                  </div>

                  <div className={SchedulerFacultyCSS.buttonWrapper}>
                    {!isNewAppointment && (
                      <Button
                        sx={{
                          textTransform: "none",
                          color: "white",
                          borderRadius: "0.5rem",
                          fontFamily: "Poppins",
                          fontSize: "0.9rem",
                          padding: "0.7rem",
                          minWidth: "3rem",
                          height: "100%",
                          margin: "15px 5px",
                          background: "#ca302e",
                          "&:hover": {
                            background: "#ab2927",
                            // Change the hover background color here
                          },
                        }}
                        variant="contained"
                        onClick={() => {
                          visibleChange();
                          this.commitAppointment("deleted");
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        // visibleChange();
                        applyChanges(false)();
                        this.props.setIsNewSched(isNewAppointment);
                      }}
                      style={{ textTransform: "none" }}
                      sx={{
                        color: "white",
                        borderRadius: "0.5rem",
                        fontFamily: "Poppins",
                        fontSize: "0.9rem",
                        padding: "0.7rem",
                        width: "100%",
                        margin: "15px 2px",

                        backgroundColor: "#3a9b51 ",
                        "&:hover": {
                          background: "#2b773d",
                          // Change the hover background color here
                        },
                      }}
                      disabled={this.props.isConflictForm ? !isFormValid() : false}
                      variant="contained"
                    >
                      Verify
                    </Button>
                    <Button
                      onClick={() => {
                        visibleChange();
                        applyChanges(true)();
                        // this.props.setIsNewSched(isNewAppointment)
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
                      disabled={this.props.isConflictForm}
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
            </div>
          ),
          otherChildren: (
            <div className={SchedulerFacultyCSS.minorsFormContainer}>
              <div className={SchedulerFacultyCSS.topSection}>
                
              <h2>Minor Subjects</h2>
              <FormControl
                sx={{
                  mr: 0.6,
                  minWidth: 115,
                }}
              >
                <Select
                  value={this.state.yearTable}
                  onChange={(event) => {
                    this.setState({yearTable: event.target.value})
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    fontFamily: "Poppins",
                    fontSize: "0.9rem",
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
              </div>
              <div className={SchedulerFacultyCSS.tableWrapper}>

                
             <TableFormStudents handleRowClick = {this.handleRowClick} yearTableProp = {this.state.yearTable}/>
              </div>
            
            </div>
          ),
        }}/>  


      </>
      
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
      oldYearParent: null,
      oldBlockParent: null,
      professorsData: [],
      conflictDesc: "",
      isConflictForm: true,
      triggerToast: false,
      majorCourses: {},
      coursesColors: {}
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility =
      this.toggleEditingFormVisibility.bind(this);
    this.handleChangeFields = this.handleChangeFields.bind(this);
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
        handleEditYearChange: this.state.handleEditYearChange,
        isConflictForm: this.state.isConflictForm,
        handleChangeFields: this.handleChangeFields,
        triggerToast: this.state.triggerToast,
        conflictDesc: this.state.conflictDesc,
        isNewAppointment: this.state.isNewAppointment,
        majorCourses: this.state.majorCourses,
        coursesColors: this.state.coursesColors,
        isStudent: this.props.isStudent
      };
    });
  }





  
  handleDataFromChild = (value, isYear, oldYear, oldBlock) => {

    console.log("NAG SET AKO!!!")

    if (isYear) {
      this.setState({ year: value });
    } else {
      this.setState({ block: value });
    }

    this.setState({ oldYearParent: oldYear });
    this.setState({ oldBlockParent: oldBlock });
  };

  handleClickFromChild = (isCreateClicked) => {
    this.setState({ clicked: isCreateClicked });
  };

  applyFilter = () => {

    console.log(this.props.professorName,"I'M THE PROFESSOR")

    console.log(this.state.data, "I'm the data")
    //if no year and block and professor, show all data
    if (!this.props.year && this.props.block.length === 0 && !this.props.professorName) {
      console.log(`i ran 1 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      this.updateNewData(this.state.data);
    
     //if no year and block, show professor matches 
    } else if (!this.props.year && this.props.block.length === 0) {
      console.log(`i ran 2 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      const filteredData = this.state.data.filter(
        (item) => {
          return item.professorName === this.props.professorName
        }
      );
      this.updateNewData(filteredData);

      //if no block and professor, show year matches 
    } else if (this.props.block.length === 0 && !this.props.professorName) {
      console.log(`i ran 3 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      const filteredData = this.state.data.filter(
        (item) => item.year === this.props.year
      );
      this.updateNewData(filteredData);
    } else if (!this.props.year && !this.props.professorName) { //if no year and professor, show block matches
      console.log(`i ran 4 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      const filteredData = this.state.data.filter(
        (item) => item.block === this.props.block
      );
      this.updateNewData(filteredData);
    } else if (!this.props.year) { //if there is block and professor, show block and professor matches
      console.log(`i ran 5 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      const filteredData = this.state.data.filter(
        (item) => item.block === this.props.block && item.professorName === this.props.professorName
      );
      this.updateNewData(filteredData);
    } else if (this.props.block.length === 0) { //if there is year and professor, show year and professor matches
      console.log(`i ran 6 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      const filteredData = this.state.data.filter(
        (item) => item.year === this.props.year && item.professorName === this.props.professorName
      );
      this.updateNewData(filteredData);
    } else if (!this.props.professorName) { //if there is year and block, show year and block matches
      console.log(`i ran 7 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      const filteredData = this.state.data.filter(
        (item) => item.year === this.props.year && item.block === this.props.block
      );
      this.updateNewData(filteredData);
    } else {

      //if there is year, block and professor, show year, block and professor matches
      console.log(`i ran 8 ${this.props.year} ${this.props.block} ${this.props.professorName}`);
      const filteredData = this.state.data.filter(
        (item) =>
          item.year === this.props.year && item.block === this.props.block && item.professorName === this.props.professorName
      );
      this.updateNewData(filteredData);
    }
  };


  applyFilterRoom = () => {
    if (this.props.room) {
      console.log("i ran room");
      const filteredData = this.state.data.filter(
        (item) => item.room === this.props.room
      );
      this.updateNewData(filteredData);
    } else if (!this.props.room) {
      this.updateNewData(this.state.data);
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
    fetch(
      `http://localhost:3000/grabStudentsButtons?yearButton=${this.props.year}&blockButton=''`
    )
      .then((response) => response.json())
      .then((data) => {
        // setData(data);
        // setDataChild(data);
        const uniqueBlocks = [
          ...new Set(data.map((student) => student.block)),
        ].sort();
        this.props.setBlockChild(uniqueBlocks);
      })
      .catch((error) => console.log(error));
  };

  async fetchAllProfData() {
    try {
      console.log("i ran prof");
      const response = await fetch("http://localhost:3000/grabProfessors");
      const data = await response.json();
      this.setState({ professorsData: data });
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.appointmentForm.update();

    if (
      this.props.year !== prevProps.year ||
      this.props.block !== prevProps.block ||
      this.props.professorName !== prevProps.professorName
    ) {
      console.log("TUMATAKBO BAKO O HINDE")
      this.fetchDataButtonsSched();
      this.applyFilter();
    }
    if (this.props.room !== prevProps.room) {
      this.applyFilterRoom();
    }

    if (this.state.editingFormVisible !== prevState.editingFormVisible) {
      console.log("CHANGE");
      this.updateCurrentUnits();
      this.fetchAllProfData();
    }

    if (!prevState.isConflict && this.state.isConflict) {
      this.setState({ isConflictProp: this.state.isConflict });
      this.props.setIsEditConflict(this.state.isConflict);
      this.setState({ triggerToast: !this.state.triggerToast });
      this.setState({ isConflict: false });
    }
  }

  updateNewData(newData) {
    console.log("AKO RIN AJAJJAJAHA");
    if (JSON.stringify(this.state.newData) !== JSON.stringify(newData)) {
      this.setState({ newData });
    }
  }

  async componentDidMount() {
    this.updateCurrentUnits();
    this.fetchAllProfData();


    try {
      console.log("i ran major courses data");
      const response = await fetch("http://localhost:3000/grabMajorCourses");
      const data = await response.json();
      const courseNames = data.reduce((acc, course) => {
        if (!acc[course.year]) {
          acc[course.year] = {};
        }
        acc[course.year][course.name] = course.code;
        return acc;
      }, {});
      this.setState({ majorCourses: courseNames }, () =>   console.log(this.state.majorCourses, "AKO UNG MAJORS"));
    
    
    } catch (error) {
      console.error("Error fetching major names:", error);
    }


    try {
      console.log("i ran course color data");
      const response = await fetch("http://localhost:3000/grabCoursesColors");
      const data = await response.json();
      const coursesColors = data.reduce((acc, course) => {
        acc[course.course_code] = course.color;
        return acc;
      }, {});
     
      this.setState({ coursesColors: coursesColors }, () =>   console.log(this.state.coursesColors, "AKO UNG COLORS"));
    
    
    } catch (error) {
      console.error("Error fetching major names:", error);
    }
    
    try {
      console.log("i ran prof data");
      const response = await fetch("http://localhost:3000/grabProfessors");
      const data = await response.json();
      this.setState({ professorsData: data });
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }

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
        this.setState({ newData: this.state.data }, () => this.applyFilter());
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

  handleEditYearChange(yearEdit, blockEdit) {
    this.setState({ year: yearEdit });
    this.setState({ block: blockEdit });
  }

  async updateCurrentUnits() {
    console.log("TINRY KO NAMAN HA");
    try {
      const response = await fetch(
        "http://localhost:3000/updateProfessorsUnits",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Request succeeded");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  async updateSchedules(
    dataLatest,
    added,
    changed,
    deleted,
    conflict,
    isConfirm
  ) {
    this.setState({ isUpdatingSchedules: true });
    console.log(isConfirm, added, changed, "confirm check")
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
      console.log("done updating units");
      this.updateCurrentUnits();
      this.fetchAllProfData();

      if (added || changed) {

        console.log("IM CHANGED!!!", this.state.year, this.state.block)
       
        if (!conflict) {
          console.log(conflict, "nag run ako");

          if (this.state.year && this.state.block) {
            console.log("CHECK");
            console.log(this.state.year, this.state.block);
            console.log(this.state.oldYearParent, this.state.oldBlockParent);

            if (
              this.state.year !== this.state.oldYearParent ||
              this.state.block !== this.state.oldBlockParent
            ) {
              console.log(isConfirm, "APPLY FILTER DECISION");
              if (isConfirm) {
                this.applyFilterUpdate(
                  this.state.year,
                  this.state.block,
                  added,
                  changed,
                  deleted
                );
              }
            } else {
              if (isConfirm) {
                this.applyFilter();
              }
            }
          }
        }
      } else {
        this.applyFilter();
      }

      console.log("ahhahahahha hulihin moko!");

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
    let conflictDescriptions = [];

    if (newSchedule.classType !== "F2F")
      return { conflict: false, description: conflictDescriptions.join(', ') };

    for (let existing of existingSchedules) {
      let conflicts = [];
      let isTimeConflict = this.isTimeOverlap(existing, newSchedule) && existing.day === newSchedule.day;
      
      if (isTimeConflict && existing.professorName === newSchedule.professorName) {
        conflicts.push('professor');
      }
      if (isTimeConflict && existing.year === newSchedule.year && existing.block === newSchedule.block) {
        conflicts.push('year-block');
      } 
      if (isTimeConflict && existing.room === newSchedule.room) {
        conflicts.push('room');
      } 

      if (conflicts.length) {
        conflictDescriptions.push(`Conflict due to same ${conflicts.join(', ')} and day-time overlap.`);
      }

      if (conflicts.length) {
        if (
          isUpdate &&
          existing.room === newSchedule.room &&
          existing.startDate === newSchedule.startDate &&
          existing.endDate === newSchedule.endDate
        ) {
          continue;
        }
        return { conflict: true, description: conflictDescriptions.join(' ') };
      }
    }

    return { conflict: false, description: conflictDescriptions.join(' ') };
  }



  async doesUnitsExceedUpdate(newSchedule, changed) {
    try {
      console.log("i ran prof");
      const response = await fetch("http://localhost:3000/grabProfessors");
      const data = await response.json();
      this.setState({ professorsData: data }, () => {
        const professorName = newSchedule.professorName;
        let conflictDescription = "";
        console.log(professorName);
        console.log(this.state.professorsData);

        // Find the professor object in the array that matches professorName
        const professor = data.find((professor) => {
          const fullName = `${professor.last_name}, ${professor.first_name} ${professor.middle_name}`;
          return fullName === professorName;
        });

        console.log(professor, "MATCH");
        // If professor not found, return false or handle the error
        if (!professor) {
          console.log("Professor not found");
          return { conflict: false, description: conflictDescription };
        }

        console.log(newSchedule.units);
        console.log(professor.current_units);
        console.log(professor.max_units);

        let doesUnitsExceedCheck =
          parseInt(newSchedule.units) > professor.max_units;
        console.log(doesUnitsExceedCheck, "NIASDASD");
        if (!changed) {
          console.log("NOT CHANGED");
          let doesUnitsExceedCheck =
            parseInt(newSchedule.units) + professor.current_units >
            professor.max_units;
          if (doesUnitsExceedCheck) {
            conflictDescription = `Max Units Exceeded: 
              ${professor.current_units} + ${parseInt(newSchedule.units)}
             > ${professor.max_units} `;
            console.log(
              parseInt(newSchedule.units) + professor.current_units,
              "is greater than max units:",
              professor.max_units
            );
            return { conflict: true, description: conflictDescription };
          }
        } else if (changed) {
          console.log("CHANGED");
          let doesUnitsExceedCheck =
            parseInt(newSchedule.units) > professor.max_units;
          if (doesUnitsExceedCheck) {
            conflictDescription = `Max Units Exceeded: 
            ${professor.current_units} + ${parseInt(newSchedule.units)}
           > ${professor.max_units} `;
            console.log(
              parseInt(newSchedule.units),
              "is greater than max units:",
              professor.max_units
            );
            return { conflict: true, description: conflictDescription };
          }
        }

        return { conflict: false, description: conflictDescription };
      });
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
  }

  handleChangeFields() {
    this.setState({ isConflictForm: true });
  }

  doesUnitsExceed(newSchedule, changed, professorsData) {
    const professorName = newSchedule.professorName;
    let conflictDescription = "";
    console.log(professorName);
    console.log(professorsData);

    // Find the professor object in the array that matches professorName
    const professor = professorsData.find((professor) => {
      const fullName = `${professor.last_name}, ${professor.first_name} ${professor.middle_name}`;
      return fullName === professorName;
    });

    console.log(professor, "MATCH");
    // If professor not found, return false or handle the error
    if (!professor) {
      console.log("Professor not found");
      return { conflict: false, description: conflictDescription };
    }

    console.log(newSchedule.units);
    console.log(professor.current_units);
    console.log(professor.max_units);

    if (!changed) {
      let doesUnitsExceedCheck =
        parseInt(newSchedule.units) + professor.current_units >
        professor.max_units;

      console.log(doesUnitsExceedCheck, "NIASDASD");
      if (doesUnitsExceedCheck) {
        conflictDescription = `Max Units Exceeded: 
        ${professor.current_units} + ${parseInt(newSchedule.units)}
       > ${professor.max_units} `;
        console.log(
          parseInt(newSchedule.units) + professor.current_units,
          "is greater than max units:",
          professor.max_units
        );
        return { conflict: true, description: conflictDescription };
      }
    } else if (changed) {
      let doesUnitsExceedCheck =
        parseInt(newSchedule.units) > professor.max_units;

      console.log(doesUnitsExceedCheck, "NIASDASD");
      if (doesUnitsExceedCheck) {
         conflictDescription = `Max Units Exceeded: 
          ${professor.current_units} + ${parseInt(newSchedule.units)}
         > ${professor.max_units} `;
        console.log(
          parseInt(newSchedule.units),
          "is greater than max units:",
          professor.max_units
        );
        return { conflict: true, description: conflictDescription };
      }
    }

    return { conflict: false, description: conflictDescription };
  }

  applyFilterUpdate = (year, block, added, changed, deleted) => {
    console.log("NAG RUN RIN AKO MGA TANGA");

    if (!year && !block) {
      console.log(`i ran 1 ${year} ${block}`);
      this.updateNewData(this.state.data);
    } else if (!year) {
      console.log(`i ran 2 ${year} ${block}`);
      const filteredData = this.state.data.filter(
        (item) => item.block === block
      );
      this.updateNewData(filteredData);
    } else if (!block) {
      console.log(`i ran 3 ${year} ${block}`);
      const filteredData = this.state.data.filter((item) => item.year === year);
      this.updateNewData(filteredData);
    } else {
      console.log(`i ran 4 ${year} ${block}`);
      const filteredData = this.state.data.filter(
        (item) => item.year === year && item.block === block
      );
      this.updateNewData(filteredData);
    }

    this.props.handleYearBlockAdd(year, block);
  };

  async commitChanges({ added, changed, deleted }, isConfirm) {

    console.log("TYPES!!!!!!!!", added, changed, deleted)
    try {
      const response = await fetch("http://localhost:3000/grabProfessors");
      const professorsData = await response.json();
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

            let result = this.doesScheduleOverlap(fixedDateAppointment, data);
            if (result.conflict) {
              this.setState({ conflictDesc: result.description });
              this.setState({ isConflict: result.conflict });
              this.setState({ isConflictForm: true });
              return isConfirm ? { data, addedAppointment: {} } : null; //this one
            }

            let resultUnit = this.doesUnitsExceed(
              fixedDateAppointment,
              false,
              professorsData
            );
            if (resultUnit.conflict) {
              this.setState({ conflictDesc: resultUnit.description });
              this.setState({ isConflict: resultUnit.conflict });
              this.setState({ isConflictForm: true });
              console.log("YES CONFLICT 1");
              return isConfirm ? { data, addedAppointment: {} } : null; //this one
            }

            if (result.conflict === false && resultUnit.conflict === false) {
              console.log("NO CONFLICT 1");

              this.setState({ isConflictForm: false });
            }

            const maxId =
              data.length > 0 ? Math.max(...data.map((item) => item.id)) : -1;
            const newId = maxId + 1;

            console.log(data);
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

                const otherAppointments = data.filter(
                  (a) => a.id !== appointment.id
                );
                const oldAppointment = data.filter(
                  (a) => a.id === appointment.id
                );

                let result = this.doesScheduleOverlap(
                  updatedAppointment,
                  otherAppointments,
                  true
                );
                if (result.conflict) {
                  console.log(result);
                  this.setState({ conflictDesc: result.description });
                  this.setState({ isConflict: true });
                  this.setState({ isConflictForm: true });
                  return appointment;
                }

                console.log("FOUND IT", parseInt(oldAppointment[0].units));
                console.log("FOUND IT NEW", updatedAppointment.units);

                //IF UNITS IS UNTOUCHED, Don't run unit exceed check
                let resultUnit = this.doesUnitsExceed(
                  updatedAppointment,
                  true,
                  professorsData
                );
                if (oldAppointment[0].units !== updatedAppointment.units) {
                  if (resultUnit.conflict) {
                    this.setState({ conflictDesc: resultUnit.description });
                    this.setState({ isConflict: resultUnit.conflict });
                    console.log("YES CONFLICT 2");
                    this.setState({ isConflictForm: true });
                    return appointment;
                  }
                }

                console.log(
                  "ETO RESULTA",
                  result.conflict,
                  resultUnit.conflict
                );
                if (
                  result.conflict === false &&
                  resultUnit.conflict === false
                ) {
                  console.log("NO CONFLICT 2");
                  this.setState({ isConflictForm: false });
                }

                return isConfirm ? updatedAppointment : null; //this one
              } else {
                return appointment;
              }
            });
          }

          if (deleted !== undefined) {
            this.setDeletedAppointmentId(deleted);
            this.toggleConfirmationVisible();
          } else {
          }

          return isConfirm ? { data, addedAppointment: {} } : null;
        },
        () => {
          console.log(this.state.isConflict, "UPDATE SHEEEE");
          console.log(this.state.data + "=" + added + "=" + changed  + "=" + deleted  + "=" +this.state.isConflict + "=" + isConfirm    )
          this.updateSchedules(
            this.state.data,
            added,
            changed,
            deleted,
            this.state.isConflict,
            isConfirm
          );
        }
      );
    } catch (error) {
      console.error("Error fetching professor names:", error);
    }
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
      clicked,
    } = this.state;

    return (
      <div className={SchedulerFacultyCSS.tooltipContainer}>
        <>
          <CustomPaper>
            <Scheduler
              data={newData}
              height={"100%"}
              firstDayOfWeek={1}
              key={this.state.schedulerKey}
            >
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

              {this.props.readOnly ? null : (
                <AppointmentTooltip
                  showOpenButton
                  showCloseButton
                  showDeleteButton
                  headerComponent={CustomHeader}
                  contentComponent={CustomContent}
                  sx={{ width: "300px" }}
                />
              )}

              <AppointmentForm
                overlayComponent={this.appointmentForm}
                visible={editingFormVisible}
                onVisibilityChange={
                  this.props.readOnly ? null : this.toggleEditingFormVisibility
                }
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
        </>
      </div>
    );
  }
}
