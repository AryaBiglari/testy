import * as React from "react";
import Image from "next/image";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { subBusinessDays, isPast, set } from "date-fns";
import RenderEmployee from "../../components/planning/RenderEmployee.js";
import { TableRow, TableCell, Box, Typography, IconButton, Button, Chip } from "@mui/material";

import FramesRowInspectionDialog from "./FramesRowInspectionDialog.js";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const columns = [
  { id: 'team', label: 'Team', width: '12rem' },
  { id: 'woCustomer', label: 'WO | Customer', width: '12rem' },
  { id: 'trailer', label: 'Trailer', width: '7rem' },
  { id: 'frame', label: 'Frame', width: '9rem' },
  { id: 'picture', label: 'Picture', width: '10rem' },
  { id: 'parts', label: 'Parts', width: '5rem' },
  { id: 'finishing', label: 'Finishing', width: '7rem' },
  { id: 'specialReq', label: 'Special Req.', width: '8rem' },
  { id: 'status', label: 'Status', width: '9rem' },
  { id: 'buildTimer', label: 'Build Timer', width: '11rem' },
  { id: 'qa', label: 'QA', width: '5rem' },
];

const getNestedProperty = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const FramesRow = (props) => {
  const {
    trailer,
    frameType,
    handleClickOpenDrawings,
    eng,
    isPasswordValid,
    columns,
    index,
  } = props;

  const task = "Frames";
  // console.log("FramesRow Component Rendered with trailer:", trailer);

  const frameSpecialReqKey = `${frameType.toLowerCase()}FrameSpecialReq`;
  const frameSurfaceKey = `${frameType.toLowerCase()}FrameSurface`;

  const frameKey = `${frameType.toLowerCase()}FrameTimeData`;
  const frameStatusKey = `${frameKey}.status`;
  const frameStartTimeKey = `${frameKey}.startDate`;
  const frameEndTimeKey = `${frameKey}.completedDate`;
  const frameActiveEmployeesKey = `${frameKey}.activeEmployees`;
  const frameEmployeeLogsTimeKey = `${frameKey}.employeeLogs`;
  const frameCurrentStartTimeKey = `${frameKey}.currentLogStartTime`;
  const frameGalStatusKey = `${frameKey}.finishingStatus`;
  const frameGalStartTimeKey = `${frameKey}.finishingStartTime`;
  const frameGalEndTimeKey = `${frameKey}.finishingEndTime`;

  const [openInspectionDialog, setOpenInspectionDialog] = React.useState(false);

  const handleOpenInspectionDialog = () => {
    // console.log("Opening Inspection Dialog");
    setOpenInspectionDialog(true);
  };

  const handleCloseInspectionDialog = () => {
    // console.log("Closing Inspection Dialog");
    setOpenInspectionDialog(false);
  };

  const processTrailerNameForTrailerType = (trailerName) => {
    if (trailerName === "Tri 61' 2 Hoppers") {
      return "Tri 61' 2H";
    }
    if (trailerName === "Tri 61' 3 Hoppers") {
      return "Tri 61' 3H";
    }
    if (trailerName === "Tri 72' 2 Hoppers") {
      return "Tri 72' 2H";
    }
    else if (trailerName === "4 Axle") {
      return "4 Axle";
    } else return trailerName;
  };

  const dispSecondsAsMins = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const seconds_ = seconds % 60;

    const hoursStr = hours < 10 ? "0" + hours.toString() : hours.toString();
    const minsStr = mins < 10 ? "0" + mins.toString() : mins.toString();
    const secondsStr =
      seconds_ < 10 ? "0" + seconds_.toString() : seconds_.toString();

    return `${hoursStr}:${minsStr}:${secondsStr}`;
  };

  const getStatusText = () => {
    if (galvanizationStatus === "completed") {
      return "Completed";
    } else if (galvanizationStatus === "sent") {
      return "Galvanization Sent";
    } else if (isCompleted) {
      return "Galvanization Pending";
    } else if (isActive || isPaused) {
      return "In Progress";
    } else {
      return "Not Started";
    }
  };

  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  const [elapsed, setElapsed] = React.useState(0);
  const [timePrior, setTimePrior] = React.useState(0);

  const [frameStartTime, setFrameStartTime] = React.useState(null);
  const [frameEndTime, setFrameEndTime] = React.useState(null);
  const [galvanizationStatus, setGalvanizationStatus] = React.useState(null);
  const [galvanizationStartTime, setGalvanizationStartTime] =
    React.useState(null);
  const [galvanizationEndTime, setGalvanizationEndTime] = React.useState(null);
  const [activeEmployees, setActiveEmployees] = React.useState([]);
  const [currentLogStartTime, setCurrentLogStartTime] = React.useState();
  const [employeeLogs, setEmployeeLogs] = React.useState([]);
  const [openEmployeesWorking, setOpenEmployeesWorking] = React.useState(false);

  const [checkPointsData, setCheckPointsData] = React.useState(null);

  const handleCheckPointsData = (newData) => {
    // console.log("Handling new CheckPointsData:", newData);
    setCheckPointsData(newData);
  };

  const handleClickOpenEmployeesWorking = () => {
    // console.log("Opening Employees Working Dialog");
    setOpenEmployeesWorking(true);
  };

  const handleCloseEmployeesWorking = () => {
    // console.log("Closing Employees Working Dialog");
    setOpenEmployeesWorking(false);
  };

  const handleActiveEmployees = (newActiveEmployees) => {
    // console.log("Setting Active Employees:", newActiveEmployees);
    setActiveEmployees(newActiveEmployees);
  };

  const startTimer = async (selectedEmployees) => {
    console.log(elapsed);
    // console.log("Start Timer clicked with selectedEmployees:", selectedEmployees);
    console.log(status);

    if (elapsed == 0) {
      setTimePrior(0);
    }
    
    setIsActive(true);
    setIsPaused(false);
    setShowConfirmation(false);
    const startTime = new Date();
    // console.log("Timer started at:", startTime);
    setCurrentLogStartTime(startTime);

    const newActiveTask = (currentEmployee) => ({
      startTime,
      trailerType: trailer.trailerType,
      workOrder: trailer.workOrder,
      task: "Frames",
      specificTask: frameType,
      otherEmployees: activeEmployees
        .filter(({ employeeID }) => employeeID !== currentEmployee.employeeID)
        .map(({ firstName, lastName, employeeID }) => ({
          firstName,
          lastName,
          employeeID,
        })),
    });

    const employeesLogsInDB = selectedEmployees.map((employee) => ({
      employeeID: employee.employeeID,
      updates: {
        $set: { activeTask: newActiveTask(employee), isActive: true },
      },
    }));

    const tempActiveEmployees = selectedEmployees.map(
      ({ firstName, lastName, employeeID, currentWage }) => ({
        firstName,
        lastName,
        employeeID,
        currentWage,
      })
    );

    // console.log("Updating multiple employee logs in DB:", employeesLogsInDB);
    await updateMultipleEmployeeLogsInDB(employeesLogsInDB);

    if (status === "notStarted" || status === undefined) {
      // console.log("Status is notStarted or undefined, setting frame start time.");
      setFrameStartTime(startTime);
      const updates = {
        [frameActiveEmployeesKey]: tempActiveEmployees,
        [frameStatusKey]: "running",
        [frameStartTimeKey]: startTime,
        [frameCurrentStartTimeKey]: startTime,
      };
      // console.log("Updating trailer data with initial run:", updates);
      await updateTrailerData(updates);
    } else {
      // console.log("Status is already started, updating trailer data to running.");
      await updateTrailerData({
        [frameActiveEmployeesKey]: tempActiveEmployees,
        [frameStatusKey]: "running",
        [frameCurrentStartTimeKey]: startTime,
      });
    }
  };

  const updateEmployeeLogs = (
    activeEmployees,
    logs,
    currentSessionStartTime
  ) => {
    // console.log("Updating employee logs.");
    const endTime = new Date();
    const logEntry = {
      startTime: currentSessionStartTime,
      endTime: endTime,
      employees: activeEmployees?.map(
        ({ firstName, lastName, employeeID, currentWage }) => ({
          firstName,
          lastName,
          employeeID,
          currentWage,
        })
      ),
    };

    const updatedLogs = [...logs, logEntry];
    // console.log("Updated Logs:", updatedLogs);

    return updatedLogs;
  };

  const updateMultipleEmployeeLogsInDB = async (employeesLogsInDB) => {
    // console.log("Updating multiple employee logs in DB:", employeesLogsInDB);
    const response = await fetch("/api/employees/employeesInfo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updates: employeesLogsInDB }),
    });

    if (!response.ok) {
      console.error("Failed to update logs for employees");
    } else {
      // console.log("Logs updated successfully for employees");
    }
  };

  const pauseTimer = async () => {
    // console.log("Pause Timer clicked.");
    setIsActive(false);
    setIsPaused(true);

    const endTime = new Date();
    // console.log("Timer paused at:", endTime);
    const newLogs = updateEmployeeLogs(
      activeEmployees,
      employeeLogs,
      currentLogStartTime
    );
    const totalTimeInMms = calculateTotalTimeMms(newLogs);
    setTimePrior(totalTimeInMms);
    setEmployeeLogs(newLogs);

    const updates = {
      [frameActiveEmployeesKey]: activeEmployees,
      [frameEmployeeLogsTimeKey]: newLogs,
      [frameStatusKey]: "paused",
    };
    // console.log("Updating trailer data to paused:", updates);
    await updateTrailerData(updates);

    const employeesLogsInDB = activeEmployees.map((employee) => {
      const activeTask = {
        startTime: currentLogStartTime,
        trailerType: trailer.trailerType,
        workOrder: trailer.workOrder,
        task: "Frames",
        specificTask: frameType,
        otherEmployees: activeEmployees
          .filter(({ employeeID }) => employeeID !== employee.employeeID)
          .map(({ firstName, lastName, employeeID }) => ({
            firstName,
            lastName,
            employeeID,
          })),
      };

      return {
        employeeID: employee.employeeID,
        updates: {
          $push: { activityLog: { ...activeTask, endTime } },
          $set: { activeTask: null, isActive: false },
        },
      };
    });

    // console.log("Updating multiple employee logs in DB after pausing:", employeesLogsInDB);
    await updateMultipleEmployeeLogsInDB(employeesLogsInDB);
  };

  const processTrailerName = (trailerName) => {
    if (trailerName.toLowerCase().includes("tri")) {
      return "tri";
    } else return trailerName;
  };

  const handleCompletion = async (confirmed) => {
    // console.log("Handle Completion called with confirmed:", confirmed);
    if (confirmed) {
      const endTime = new Date();
      // console.log("Completion confirmed at:", endTime);
      setIsCompleted(true);
      setShowConfirmation(false);
      setIsActive(false);
      setIsPaused(false);
      setFrameEndTime(endTime);
      const updates = {
        [frameActiveEmployeesKey]: [],
        [`${frameStatusKey}`]: "completed",
        [`${frameEndTimeKey}`]: endTime,
      };
      // console.log("Updating trailer data to completed:", updates);
      props.handleCompletedCount("add");
      await updateTrailerData(updates);
    } else {
      // console.log("Completion not confirmed.");
      setShowConfirmation(false);
      setIsPaused(true);
    }
  };

  const confirmCompletion = () => {
    // console.log("Confirming completion.");
    setShowConfirmation(true);
  };

  const handleGalvanization = async () => {
    // console.log("Handle Galvanization clicked.");
    if (galvanizationStatus !== "sent") {
      const startTime = Date.now();
      // console.log("Sending for galvanization at:", startTime);
      setGalvanizationStatus("sent");
      setGalvanizationStartTime(startTime);
      await updateTrailerData({
        [frameGalStatusKey]: "sent",
        [frameGalStartTimeKey]: startTime,
      });
    } else if (galvanizationStatus === "sent") {
      const endTime = Date.now();
      // console.log("Receiving galvanization at:", endTime);
      setGalvanizationStatus("completed");
      setGalvanizationEndTime(endTime);
      props.handleFinishedCount("add");
      await updateTrailerData({
        [frameGalStatusKey]: "completed",
        [frameGalEndTimeKey]: endTime,
      });
    }
  };

  const updateTrailerData = async (updates) => {
    if (isPasswordValid) {
      // console.log("Updating trailer data with updates:", updates);
      const data = {
        workOrder: props.trailer.workOrder,
        trailerType: props.trailer.trailerType,
        updates,
      };

      const response = await fetch("/api/boxes/boxesapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Failed to update the trailer data");
      } else {
        // console.log("Trailer data updated successfully");
      }
    } else {
      console.warn("Password not valid. Cannot update trailer data.");
    }
  };

  function calculateTotalTimeMms(employeeLogs) {
    if (employeeLogs) {
      let totalTime = employeeLogs?.reduce((acc, log) => {
        let start = new Date(log.startTime).getTime();
        let end = new Date(log.endTime).getTime();
        return acc + (end - start);
      }, 0);
      // console.log("Calculated total time in ms:", totalTime);
      return totalTime;
    } else {
      // console.log("No employee logs found. Total time is 0 ms.");
      return 0;
    }
  }

  React.useEffect(() => {
    // console.log("useEffect triggered with props.trailer:", props.trailer);
    const initializeState = () => {
      const savedStatus = getNestedProperty(trailer, frameStatusKey);
      const savedStartTime = getNestedProperty(trailer, frameStartTimeKey);
      const abc = getNestedProperty(
        trailer,
        `${frameType.toLowerCase()}FrameInspectionData`
      );
      if (trailer.workOrder === "s000143") {
        // console.log("Inspection Data for workOrder s000143:", abc);
      }

      setCheckPointsData(abc);

      if (savedStartTime) {
        const startTimeDate = new Date(savedStartTime);
        // console.log("Saved Start Time:", startTimeDate);
        setFrameStartTime(startTimeDate);
      }

      // console.log("Saved Status:", savedStatus);
      setStatus(savedStatus);

      const fetchedEmployeeLogs = getNestedProperty(
        trailer,
        frameEmployeeLogsTimeKey
      );
      const fetchedActiveEmployees = getNestedProperty(
        trailer,
        frameActiveEmployeesKey
      );
      if (fetchedEmployeeLogs) {
        // console.log("Fetched Employee Logs:", fetchedEmployeeLogs);
        setEmployeeLogs(fetchedEmployeeLogs);
        let totalPreviousTime = calculateTotalTimeMms(fetchedEmployeeLogs);
        setTimePrior(totalPreviousTime);
      }

      if (fetchedActiveEmployees) {
        // console.log("Fetched Active Employees:", fetchedActiveEmployees);
        handleActiveEmployees(fetchedActiveEmployees);
      }

      if (savedStatus === "running") {
        // console.log("Status is running. Initializing active state.");
        setIsActive(true);
        setIsPaused(false);
        setShowConfirmation(false);
        setIsCompleted(false);
        let totalPreviousTimeInMms = calculateTotalTimeMms(fetchedEmployeeLogs);
        let objCurrentTime = getNestedProperty(
          trailer,
          frameCurrentStartTimeKey
        );
        let startElapsedTime =
          (new Date().getTime() -
            new Date(objCurrentTime) +
            totalPreviousTimeInMms) /
          1000;
        let startElapsedTimeRounded = Math.round(startElapsedTime);
        // console.log("Total Previous Time (ms):", totalPreviousTimeInMms);
        // console.log("Start Elapsed Time (s):", startElapsedTimeRounded);
        setElapsed(startElapsedTimeRounded);
        setCurrentLogStartTime(objCurrentTime);
      } else if (savedStatus === "paused") {
        // console.log("Status is paused. Setting paused state.");
        setIsActive(false);
        setIsPaused(true);
        setShowConfirmation(false);
        setIsCompleted(false);
        const totalTimeInSec =
          calculateTotalTimeMms(fetchedEmployeeLogs) / 1000;
        const totalTimeInSecRounded = Math.round(totalTimeInSec);
        // console.log("Total Time Prior (s):", totalTimeInSecRounded);
        setElapsed(totalTimeInSecRounded);
      } else if (savedStatus === "completed") {
        // console.log("Status is completed. Setting completed state.");
        setIsActive(false);
        setIsPaused(false);
        setShowConfirmation(false);
        setIsCompleted(true);

        const endTime = getNestedProperty(trailer, frameEndTimeKey);
        // console.log("Frame End Time:", endTime);
        setFrameEndTime(endTime);

        const totalTimeInSec =
          calculateTotalTimeMms(fetchedEmployeeLogs) / 1000;
        const totalTimeInSecRounded = Math.round(totalTimeInSec);
        // console.log("Total Time Completed (s):", totalTimeInSecRounded);
        setElapsed(totalTimeInSecRounded);

        const newFinishingStatus = getNestedProperty(
          trailer,
          frameGalStatusKey
        );
        const newFinishingStartTime = getNestedProperty(
          trailer,
          frameGalStartTimeKey
        );
        const newFinishingEndTime = getNestedProperty(
          trailer,
          frameGalEndTimeKey
        );

        // console.log("Finishing Status:", newFinishingStatus);
        // console.log("Finishing Start Time:", newFinishingStartTime);
        // console.log("Finishing End Time:", newFinishingEndTime);

        setGalvanizationStatus(newFinishingStatus);
        setGalvanizationStartTime(newFinishingStartTime);
        setGalvanizationEndTime(newFinishingEndTime);
      }
    };

    initializeState();
  }, [props.trailer]);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      // console.log("Timer is active. Starting interval.");
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor(
          (new Date().getTime() -
            new Date(currentLogStartTime).getTime() +
            timePrior) /
          1000
        );
        // console.log("Elapsed Seconds:", elapsedSeconds);
        setElapsed(elapsedSeconds);
      }, 500);
    } else {
      if (interval) {
        // console.log("Timer is not active. Clearing interval.");
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        // console.log("Cleaning up interval.");
        clearInterval(interval);
      }
    };
  }, [isActive, currentLogStartTime, timePrior]);

  const dateReq = subBusinessDays(trailer?.dateRequired, 15);
  // console.log("Date Required (15 business days subtracted):", dateReq);

  const dateReqColor = (dateReqDate) => {
    if (isPast(dateReqDate)) {
      return "var(--error)";
    } else if (isPast(subBusinessDays(dateReqDate, 2))) {
      return "var(--datewarning)";
    } else return "var(--secondary)";
  };

  return (
    <>
      <RenderEmployee
        startTimer={startTimer}
        currentTrailer={trailer}
        currentFrame={props.frameType}
        activeEmployees={activeEmployees}
        openEmployeesWorking={openEmployeesWorking}
        task={task}
        eng={eng}
        handleCloseEmployeesWorking={handleCloseEmployeesWorking}
        handleActiveEmployees={handleActiveEmployees}
        showStart={!isActive && !isPaused && !isCompleted}
      />
      <TableRow
        sx={{
          backgroundColor: index % 2 ? "var(--primary5)" : "var(--success1)",
        }}
      >
        {/* WO | Customer */}
        <TableCell sx={{ width: "12rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {trailer.workOrder + " | " + trailer.customer}
          </Typography>
        </TableCell>

        {/* Trailer */}
        <TableCell sx={{ width: "7rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {processTrailerNameForTrailerType(trailer.trailerType)}
          </Typography>
        </TableCell>

        <TableCell sx={{ width: "9rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {/* Conditional logic for renaming "Front" to "Front + Mid" if trailer is "4 Axle" */}
            {trailer.trailerType === "4 Axle" && frameType === "Front"
              ? "Front + Mid"
              : frameType}
          </Typography>
        </TableCell>


        {/* Picture */}
        <TableCell sx={{ width: "10rem" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "4rem",
              bgcolor: "white",
              borderRadius: "0.8rem",
            }}
          >
            <Image
              src={`/images/frames/${processTrailerName(
                trailer.trailerType
              ).toLowerCase()}/${frameType.toLowerCase()}.png`}
              style={{ objectFit: "contain" }}
              fill={true}
              sizes={"100%"}
              priority={true}
              alt="Picture of the Frame"
            />
          </Box>
        </TableCell>

        {/* Parts */}
        <TableCell sx={{ width: "5rem" }}>
          <IconButton
            aria-label="open-drawings"
            color="primary"
            onClick={() => {
              // console.log("Open Drawings button clicked.");
              handleClickOpenDrawings(trailer, frameType);
            }}
          >
            <DocumentScannerIcon />
          </IconButton>
        </TableCell>

        {/* Surface */}
        <TableCell sx={{ width: "7rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {trailer[frameSurfaceKey]}
          </Typography>
        </TableCell>

        {/* Special Req. */}
        <TableCell sx={{ width: "8rem" }}>
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: getNestedProperty(trailer, frameSpecialReqKey) ? "red" : "black",
            }}
          >
            {getNestedProperty(trailer, frameSpecialReqKey) || "No"}
          </Typography>
        </TableCell>


        {/* Status */}
        <TableCell sx={{ width: "9rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {getStatusText()}
          </Typography>
        </TableCell>

        {/* Build Timer */}
        <TableCell sx={{ width: "11rem" }}>
          {!isActive && !isPaused && !isCompleted && (
            <Button
              variant="contained"
              onClick={() => {
                // console.log("Start button clicked.");
                if (isPasswordValid) {
                  handleClickOpenEmployeesWorking();
                } else {
                  console.warn("Password is not valid. Cannot start timer.");
                }
              }}
            >
              {eng ? "Start" : "Comenzar"}
            </Button>
          )}
          {isActive && !isCompleted && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
                {dispSecondsAsMins(elapsed)}
              </Typography>
              <IconButton
                aria-label="pause"
                color="primary"
                onClick={() => {
                  // console.log("Pause button clicked.");
                  if (isPasswordValid) {
                    pauseTimer();
                  } else {
                    console.warn("Password is not valid. Cannot pause timer.");
                  }
                }}
              >
                <PauseCircleOutlineIcon />
              </IconButton>
            </Box>
          )}
          {isPaused && !showConfirmation && !isCompleted && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
                {dispSecondsAsMins(elapsed)}
              </Typography>
              <IconButton
                aria-label="play"
                color="primary"
                onClick={() => {
                  // console.log("Play button clicked.");
                  if (isPasswordValid) {
                    handleClickOpenEmployeesWorking();
                  } else {
                    console.warn("Password is not valid. Cannot resume timer.");
                  }
                }}
              >
                <PlayCircleOutlineIcon />
              </IconButton>
              <IconButton
                aria-label="confirm"
                color="primary"
                onClick={() => {
                  // console.log("Confirm Completion button clicked.");
                  if (isPasswordValid) {
                    confirmCompletion();
                  } else {
                    console.warn("Password is not valid. Cannot confirm completion.");
                  }
                }}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </Box>
          )}
          {showConfirmation && !isCompleted && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  // console.log("User clicked 'No' on confirmation.");
                  handleCompletion(false);
                }}
                sx={{ mr: 1 }}
              >
                No
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // console.log("User clicked 'Yes' on confirmation.");
                  handleCompletion(true);
                }}
                sx={{}}
              >
                {eng ? "Yes" : "Sí"}
              </Button>
            </Box>
          )}
          {isCompleted && (
            <Typography sx={{ maxWidth: "15rem", color: "var(--success)" }}>
              {eng ? "Completed on" : "Terminada el"}{" "}
              {new Date(frameEndTime).toLocaleDateString(
                eng ? "en-US" : "es-ES",
                {
                  month: "short",
                  day: "numeric",
                }
              )}
              ,{" "}
              {new Date(frameEndTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              ({Math.floor(elapsed / 60)} {eng ? "minutes" : "minutos"})
            </Typography>
          )}
        </TableCell>

        {/* Team (Active Employees) */}
        <TableCell sx={{ width: "10rem" }}>
          {isActive &&
            !isCompleted &&
            activeEmployees.map((employee, idx) => (
              <Chip
                key={idx}
                color="success"
                sx={{ mb: 0.5 }}
                label={`${employee?.firstName} (${employee?.employeeID})`}
                variant="outlined"
              />
            ))}
        </TableCell>

        {/* Finishing */}
        <TableCell sx={{ width: "11rem" }}>
          {galvanizationStatus !== "completed" && (
            <Button
              variant="contained"
              onClick={() => {
                // console.log("Galvanization button clicked.");
                if (isPasswordValid) {
                  handleGalvanization();
                } else {
                  console.warn("Password is not valid. Cannot handle galvanization.");
                }
              }}
              disabled={!isCompleted}
              sx={{
                backgroundColor: !isCompleted ? "grey" : "primary.main",
                color: "white",
              }}
            >
              {galvanizationStatus === "sent"
                ? "Received"
                : "Send for Galvanization"}
            </Button>
          )}
          {galvanizationStatus === "completed" && (
            <Typography sx={{ maxWidth: "15rem", color: "var(--success)" }}>
              {eng ? "Received:" : "Terminada el"}{" "}
              {new Date(galvanizationEndTime).toLocaleDateString(
                eng ? "en-US" : "es-ES",
                {
                  month: "short",
                  day: "numeric",
                }
              )}
              ,{" "}
              {new Date(galvanizationEndTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          )}
        </TableCell>

        {/* QA */}
        <TableCell sx={{ width: "5rem" }}>
          <IconButton
            aria-label="open-inspection"
            sx={{
              color:
                checkPointsData?.status === "Complete"
                  ? "var(--success)"
                  : checkPointsData?.status === "In Progress"
                    ? "var(--datewarning)"
                    : "var(--error)",
            }}
            onClick={handleOpenInspectionDialog}
          >
            <FactCheckIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Inspection Dialog */}
      <FramesRowInspectionDialog
        open={openInspectionDialog}
        onClose={handleCloseInspectionDialog}
        trailer={trailer}
        trailerFrameInspectionData={checkPointsData}
        handleCheckPointsData={handleCheckPointsData}
        frameType={frameType}
      />
    </>
  );
};

export default FramesRow;
