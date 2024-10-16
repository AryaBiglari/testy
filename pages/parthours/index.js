import * as React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PartHours() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentTrailer, setCurrentTrailer] = React.useState(null);
  const [currentPhase, setCurrentPhase] = React.useState(null);
  const [form, setForm] = React.useState({
    workOrder: "",
    trailerType: "",
    process: "",
    subProcess: "",
  });

  const [subProcesses, setSubProcesses] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [employeeLogs, setEmployeeLogs] = React.useState([]);
  const [activeEmployees, setActiveEmployees] = React.useState([]);
  const [totalTime, setTotalTime] = React.useState(0);
  const [totalManMinutes, setTotalManMinutes] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");

  const processOptions = [
    "Walls",
    "Boxes",
    "Frames",
    "Finishing",
    "Small Parts",
  ];
  const subProcessOptions = {
    Walls: [
      "Side Wall - Passenger",
      "Side Wall - Driver",
      "Rear Slope",
      "Front Slope",
      "Mid Wall",
      "Rear Top",
      "Front Top",
    ],
    Boxes: ["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
    Frames: ["Front", "Rear"],
    Finishing: ["Final Assembly", "Quality Check", "Packaging"],
    SmallParts: ["Parts Production", "Parts Painting", "Parts Inspection"],
  };
  const trailerTypeOptions = [
    "Pup",
    "Lead",
    "Tandem",
    "Tri 61' 2 Hoppers",
    "Tri 61' 3 Hoppers",
    "Tri 72' 2 Hoppers",
  ];

  function wallTypeFindIndex(wallsArr, wallType) {
    return wallsArr.findIndex((wall) => wall.wallType === wallType);
  }

  function calculateTotalTime(employeeLogs) {
    let totalMinutes = employeeLogs.reduce((acc, log) => {
      let start = new Date(log.startTime).getTime();
      let end = new Date(log.endTime).getTime();
      return acc + (end - start) / 60000; // Convert milliseconds to minutes
    }, 0);
    return totalMinutes; // Total minutes
  }

  function calculateTotalManMinutes(employeeLogs) {
    let totalManMinutes = employeeLogs.reduce((acc, log) => {
      let start = new Date(log.startTime);
      let end = new Date(log.endTime);
      let minutesSpent = (end - start) / 60000;
      let manMinutes = minutesSpent * log.employees.length;
      return acc + manMinutes;
    }, 0);
    return totalManMinutes;
  }

  const calculateLabourCost = (employeeLogs) => {
    let totalLabourCost = employeeLogs.reduce((acc, log) => {
      let start = new Date(log.startTime);
      let end = new Date(log.endTime);
      let minutesSpent = (end - start) / 60000;

      let sprintCost = log.employees.reduce((sprintAcc, employee) => {
        let employeeCost = (minutesSpent / 60) * employee.currentWage;
        return sprintAcc + employeeCost;
      }, 0);

      return acc + sprintCost;
    }, 0);
    return totalLabourCost;
  };

  const getDifference = (startTime, endTime) => {
    let diffMinutes = (new Date(endTime) - new Date(startTime)) / 60000;
    let roundedMinutes = Math.round(diffMinutes * 10) / 10;
    return roundedMinutes;
  };

  React.useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  React.useEffect(() => {
    if (form.process) {
      setSubProcesses(subProcessOptions[form.process] || []);
    }
  }, [form.process]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetUseStates = () => {
    setTotalTime(0);
    setTotalManMinutes(0);
    setActiveEmployees([]);
    setEmployeeLogs([]);
    setCurrentPhase(null);
    setCurrentTrailer(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetUseStates();
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/planning/create-trailer?workOrder=${form.workOrder}&trailerType=${form.trailerType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newCurrentTrailer = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        setSeverity("error");
        setMessage(
          newCurrentTrailer.message || "Didn't find a matching trailer"
        );
        setOpen(true);
        resetUseStates();
        return;
      }

      setCurrentTrailer(newCurrentTrailer);

      if (form.process === "Walls") {
        let wallArrIndex = wallTypeFindIndex(
          newCurrentTrailer.walls,
          form.subProcess
        );
        let wall = newCurrentTrailer.walls[wallArrIndex];
        setCurrentPhase(wall);

        let currentActiveEmployees = wall.activeEmployees;
        let currentEmployeeLogs = wall.employeeLogs;

        if (currentActiveEmployees) {
          setActiveEmployees(currentActiveEmployees);
        }
        if (currentEmployeeLogs) {
          setEmployeeLogs(currentEmployeeLogs);
          let totalMinutes = calculateTotalTime(wall.employeeLogs);
          let manMinutes = calculateTotalManMinutes(wall.employeeLogs);
          setTotalTime(totalMinutes);
          setTotalManMinutes(manMinutes);
        }
      }

      if (form.process === "Frames") {
        // let frameKey = `${form.subProcess}`
        let frame = null;
        let currentActiveEmployees = null;
        let currentEmployeeLogs = null;
        if (form.subProcess === "Front") {
          let frame = newCurrentTrailer.frontFrameTimeData;
          setCurrentPhase(frame);
          let currentActiveEmployees = frame.activeEmployees;
          let currentEmployeeLogs = frame.employeeLogs;
        } else if (form.subProcess === "Rear") {
          let frame = newCurrentTrailer.rearFrameTimeData;
          setCurrentPhase(frame);
          let currentActiveEmployees = frame.activeEmployees;
          let currentEmployeeLogs = frame.employeeLogs;
        }

        if (currentActiveEmployees) {
          setActiveEmployees(currentActiveEmployees);
        }
        if (currentEmployeeLogs) {
          setEmployeeLogs(currentEmployeeLogs);
          let totalMinutes = calculateTotalTime(frame.employeeLogs);
          let manMinutes = calculateTotalManMinutes(frame.employeeLogs);
          setTotalTime(totalMinutes);
          setTotalManMinutes(manMinutes);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setSeverity("error");
      setMessage("Something went wrong, please try again");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Trailer Process Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Work Order"
                name="workOrder"
                value={form.workOrder}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="trailer-type-label">Trailer Type</InputLabel>
                <Select
                  labelId="trailer-type-label"
                  name="trailerType"
                  value={form.trailerType}
                  onChange={handleChange}
                >
                  {trailerTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="process-label">Process</InputLabel>
                <Select
                  labelId="process-label"
                  name="process"
                  value={form.process}
                  onChange={handleChange}
                >
                  {processOptions.map((process) => (
                    <MenuItem key={process} value={process}>
                      {process}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="sub-process-label">Sub-Process</InputLabel>
                <Select
                  labelId="sub-process-label"
                  name="subProcess"
                  value={form.subProcess}
                  onChange={handleChange}
                >
                  {subProcesses.map((subProcess) => (
                    <MenuItem key={subProcess} value={subProcess}>
                      {subProcess}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setOpen(false)} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <Box mt={3}>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                width: 1,
                minHeight: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                size={65}
                thickness={4}
                sx={{ color: "primary" }}
              />
            </Box>
          )}

          {currentPhase && (
            <Box mt={3}>
              <Typography variant="h6">Summary</Typography>
              <Typography>Status: {currentPhase.status}</Typography>
              {(currentPhase.status === "running" ||
                currentPhase.status === "paused") && (
                <>
                  <Typography>
                    Start Date:{" "}
                    {new Date(currentPhase.startedDate).toLocaleString(
                      "en-US",
                      { timeZone: "America/New_York" }
                    )}
                  </Typography>
                  <Typography>
                    Current Time Spent: {totalTime.toFixed(2)} Minutes
                  </Typography>
                  <Typography>
                    Current Man-Hours Spent: {totalManMinutes.toFixed(2)}{" "}
                    Minutes
                  </Typography>
                  <Typography>
                    Current Total Labour Cost:{" "}
                    {calculateLabourCost(employeeLogs)}
                  </Typography>
                </>
              )}
              {currentPhase.status === "completed" && (
                <>
                  <Typography>
                    Start Date:{" "}
                    {new Date(currentPhase.startedDate).toLocaleString(
                      "en-US",
                      { timeZone: "America/New_York" }
                    )}
                  </Typography>
                  <Typography>
                    End Date:{" "}
                    {new Date(currentPhase.completedDate).toLocaleString(
                      "en-US",
                      { timeZone: "America/New_York" }
                    )}
                  </Typography>
                  <Typography>
                    Total Time Spent: {totalTime.toFixed(2)} Minutes
                  </Typography>
                  <Typography>
                    Total Man-Hours Spent: {totalManMinutes.toFixed(2)} Minutes
                  </Typography>
                  <Typography>
                    Total Labour Cost: $ {calculateLabourCost(employeeLogs)}
                  </Typography>
                </>
              )}
            </Box>
          )}

          {activeEmployees.length > 0 && currentPhase?.status === "running" && (
            <Box mt={3}>
              <Typography variant="h6">Active Employees</Typography>
              <List>
                {activeEmployees.map((employee) => (
                  <ListItem key={employee.employeeID}>
                    <ListItemText
                      primary={`${employee.firstName} ${employee.lastName}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {employeeLogs.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6">Employee Logs</Typography>
              <List>
                {employeeLogs
                  .slice()
                  .reverse()
                  .map((log, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={`Start: ${new Date(
                            log.startTime
                          ).toLocaleString("en-US", {
                            timeZone: "America/New_York",
                          })} - End: ${new Date(log.endTime).toLocaleString(
                            "en-US",
                            { timeZone: "America/New_York" }
                          )}
                        (Total Minutes: ${getDifference(
                          log.startTime,
                          log.endTime
                        )})`}
                          secondary={`Employees: ${log.employees
                            .map((emp) => `${emp.firstName} ${emp.lastName}`)
                            .join(", ")}`}
                        />
                      </ListItem>
                      {index < employeeLogs.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
              </List>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
