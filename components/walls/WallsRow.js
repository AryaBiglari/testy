import * as React from "react";
import Image from "next/image";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DrawingDialogNew from "./DrawingDialogNew.js";
import RenderEmployee from "../../components/planning/RenderEmployee.js";
import PasswordDialog from "./PasswordDialog.js";
import { subBusinessDays, isPast } from "date-fns";
import {
  TableRow,
  TableCell,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
} from "@mui/material";

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

const WallsRow = (props) => {
  const { trailer, wallType, eng, isPasswordValid, index } = props;

  const [openDrawings, setOpenDrawings] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [elapsed, setElapsed] = React.useState(0);
  const [timePrior, setTimePrior] = React.useState(0);
  const [wallStartTime, setWallStartTime] = React.useState(null);
  const [wallEndTime, setWallEndTime] = React.useState(null);
  const [activeEmployees, setActiveEmployees] = React.useState([]);
  const [currentLogStartTime, setCurrentLogStartTime] = React.useState();
  const [employeeLogs, setEmployeeLogs] = React.useState([]);
  const [openEmployeesWorking, setOpenEmployeesWorking] = React.useState(false);
  const [openPassowrdDialog, setOpenPasswordDialog] = React.useState(false);

  function wallTypeFindIndex(wallsArr, wallType) {
    if (!Array.isArray(wallsArr)) {
      console.error("wallsArr is not an array or is undefined:", wallsArr);
      return -1;
    }
    return wallsArr.findIndex((wall) => wall.wallType === wallType);
  }

  const processTrailerNameForTrailerType = (trailerType) => {
    if (trailerType === "Tri 61' 2 Hoppers") {
      return "Tri 61' 2H";
    }
    if (trailerType === "Tri 61' 3 Hoppers") {
      return "Tri 61' 3H";
    }
    if (trailerType === "Tri 72' 2 Hoppers") {
      return "Tri 72' 2H";
    } else return trailerType;
  };

  const getImagePath = (trailer, wallType, isCompleted) => {
    const trailerTypeMapToDefaultBox = {
      Pup: "Pup",
      Tandem: "Tandem",
      Lead: "Lead",
      "Tri 61' 2 Hoppers": "Tri2Hop",
      "Tri 61' 3 Hoppers": "Tri3Hop",
      "Tri 72' 2 Hoppers": "Tri2Hop",
      "4 Axle": "4Axle",
    };

    const wallTypeMapToDefaultBox = {
      "Side Wall - Driver": "driver",
      "Side Wall - Passenger": "pass",
      "Front Top": "top-front",
      "Rear Top": "top-rear",
      "Front Slope": "front-slope",
      "Rear Slope": "rear-slope",
      "Mid Wall": "midwall",
      "Mid Wall 2": "midwall2",
    };

    const completionText = isCompleted ? "completed" : "default";

    const trailerType = trailerTypeMapToDefaultBox[trailer.trailerType];
    const wallPath = wallTypeMapToDefaultBox[wallType];

    const imagePath = `/images/walls/${completionText}${trailerType}/${wallPath}.png`;
    return imagePath;
  };

  const task = "Walls";

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
    if (isCompleted) {
      return "Completed";
    } else if (isActive || isPaused) {
      return "In Progress";
    } else {
      return "Not Started";
    }
  };

  const handleClickOpenDrawings = () => {
    setOpenDrawings(true);
  };

  const handleCloseDrawings = (val) => {
    setOpenDrawings(val);
  };

  const handleClickOpenPassowrdDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePassowrdDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handleClickOpenEmployeesWorking = () => {
    setOpenEmployeesWorking(true);
  };

  const handleCloseEmployeesWorking = () => {
    setOpenEmployeesWorking(false);
  };

  const handleActiveEmployees = (newActiveEmployees) => {
    setActiveEmployees(newActiveEmployees);
  };

  const startTimer = async (selectedEmployees) => {
    if (elapsed == 0) {
      setTimePrior(0);
    }

    setIsActive(true);
    setIsPaused(false);
    setShowConfirmation(false);
    const startTime = new Date();
    setCurrentLogStartTime(startTime);

    const newActiveTask = (currentEmployee) => ({
      startTime,
      trailerType: trailer.trailerType,
      workOrder: trailer.workOrder,
      task: "Walls",
      specificTask: wallType,
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

    await updateMultipleEmployeeLogsInDB(employeesLogsInDB);

    if (status === "notStarted" || status === undefined) {
      setWallStartTime(startTime);
      const updates = {
        [wallActiveEmployeesKey]: tempActiveEmployees,
        [wallStatusKey]: "running",
        [wallStartTimeKey]: startTime,
        [wallCurrenStartTimeKey]: startTime,
      };
      await updateTrailerData(updates);
      props.handleCompletedCount("add");
    } else {
      await updateTrailerData({
        [wallActiveEmployeesKey]: tempActiveEmployees,
        [wallStatusKey]: "running",
        [wallCurrenStartTimeKey]: startTime,
      });
    }
  };

  const updateEmployeeLogs = (
    activeEmployees,
    logs,
    currentSessionStartTime
  ) => {
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

    return updatedLogs;
  };

  const updateMultipleEmployeeLogsInDB = async (employeesLogsInDB) => {
    const response = await fetch("/api/employees/employeesInfo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updates: employeesLogsInDB }),
    });

    if (!response.ok) {
      console.error("Failed to update logs for employees");
      for (let i = 0; i < 3; i++) {
        try {
          const responseRetry = await fetch("/api/employees/employeesInfo", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updates: employeesLogsInDB }),
          });

          const data = await responseRetry.json();

          if (!responseRetry.ok) {
            throw new Error(
              `HTTP error! status: ${responseRetry.status} message: ${data.message}`
            );
          }
          return data;
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          const attempts = 3;
          if (i < attempts - 1) {
            let delay = 50;
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            alert(
              "An error occurred while fetching data. Please try again later."
            );
          }
        }
      }
    } else {
      console.log("Logs updated successfully for employees");
    }
  };

  const pauseTimer = async () => {
    setIsActive(false);
    setIsPaused(true);

    const endTime = new Date();
    const newLogs = updateEmployeeLogs(
      activeEmployees,
      employeeLogs,
      currentLogStartTime
    );
    const totalTimeInMms = calculateTotalTimeMms(newLogs);
    setTimePrior(totalTimeInMms);
    setEmployeeLogs(newLogs);

    const updates = {
      [wallActiveEmployeesKey]: activeEmployees,
      [wallEmployeeLogsTimeKey]: newLogs,
      [wallStatusKey]: "paused",
    };
    await updateTrailerData(updates);

    const employeesLogsInDB = activeEmployees.map((employee) => {
      const activeTask = {
        startTime: currentLogStartTime,
        trailerType: trailer.trailerType,
        workOrder: trailer.workOrder,
        task: "Walls",
        specificTask: wallType,
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

    await updateMultipleEmployeeLogsInDB(employeesLogsInDB);
  };

  const handleCompletion = async (confirmed) => {
    if (confirmed) {
      const endTime = new Date();
      setIsCompleted(true);
      setShowConfirmation(false);
      setIsActive(false);
      setIsPaused(false);
      setWallEndTime(endTime);
      const updates = {
        [wallActiveEmployeesKey]: [],
        [`${wallStatusKey}`]: "completed",
        [`${wallEndTimeKey}`]: endTime,
      };
      props.handleCompletedCount("add");
      await updateTrailerData(updates);
    } else {
      setShowConfirmation(false);
      setIsPaused(true);
    }
  };

  const confirmCompletion = () => {
    setShowConfirmation(true);
  };

  const undoCompletion = async () => {
    console.log(isPasswordValid);

    if (isPasswordValid) {
      const updates = {
        [`${wallStatusKey}`]: "paused",
        [`${wallEndTimeKey}`]: null,
      };

      try {
        const response = await updateTrailerData(updates);

        if (!response.ok) {
          console.error(
            "Failed to undo completion. There was an issue with the data."
          );
        } else {
          setIsCompleted(false);
          setShowConfirmation(false);
          setIsActive(false);
          setIsPaused(true);
          setWallEndTime(null);

          console.log("Completion undone successfully");
        }
      } catch {
        console.error("Failed to undo completion");
      }
    }
  };

  const updateTrailerData = async (updates) => {
    if (isPasswordValid) {
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
        console.log("Trailer data updated successfully");
      }

      return response;
    }
  };

  function calculateTotalTimeMms(employeeLogs) {
    if (employeeLogs) {
      let totalTime = employeeLogs?.reduce((acc, log) => {
        let start = new Date(log.startTime).getTime();
        let end = new Date(log.endTime).getTime();
        return acc + (end - start);
      }, 0);
      return totalTime;
    } else {
      return 0;
    }
  }

  React.useEffect(() => {
    console.log("X");
    console.log(trailer.walls);
    console.log(wallType);
    console.log("Z");

    const wallArrIndex = wallTypeFindIndex(trailer.walls, wallType);
    console.log(wallArrIndex);
    if (wallArrIndex === -1) {
      console.error(`Wall type ${wallType} not found in trailer walls array.`);
      return; // Exit the effect early if wall not found
    }

    const partKey = `walls.${wallArrIndex}`;
    const wallStatusKey = `${partKey}.status`;
    const wallStartTimeKey = `${partKey}.startedDate`;
    const wallEndTimeKey = `${partKey}.completedDate`;
    const wallCurrenStartTimeKey = `${partKey}.currentLogStartTime`;
    const wallActiveEmployeesKey = `${partKey}.activeEmployees`;
    const wallEmployeeLogsTimeKey = `${partKey}.employeeLogs`;

    const initializeState = () => {
      const savedStatus = getNestedProperty(trailer, wallStatusKey);
      const savedStartTime = getNestedProperty(trailer, wallStartTimeKey);

      if (savedStartTime) {
        setWallStartTime(new Date(savedStartTime));
      }

      setStatus(savedStatus);

      const fetchedEmployeeLogs = getNestedProperty(
        trailer,
        wallEmployeeLogsTimeKey
      );
      const fetchedActiveEmployees = getNestedProperty(
        trailer,
        wallActiveEmployeesKey
      );
      if (fetchedEmployeeLogs) {
        setEmployeeLogs(fetchedEmployeeLogs);
        let totalPreviousTime = calculateTotalTimeMms(fetchedEmployeeLogs);
        setTimePrior(totalPreviousTime);
      }

      if (fetchedActiveEmployees) {
        handleActiveEmployees(fetchedActiveEmployees);
      }

      if (savedStatus === "running") {
        setIsActive(true);
        setIsPaused(false);
        setShowConfirmation(false);
        setIsCompleted(false);
        let totalPreviousTimeInMms = calculateTotalTimeMms(fetchedEmployeeLogs);
        let objCurrentTime = getNestedProperty(trailer, wallCurrenStartTimeKey);
        let startElapsedTime =
          (new Date().getTime() -
            new Date(objCurrentTime) +
            totalPreviousTimeInMms) /
          1000;
        let startElapsedTimeRounded = Math.round(startElapsedTime);
        setElapsed(startElapsedTimeRounded);
        setCurrentLogStartTime(objCurrentTime);
      } else if (savedStatus === "paused") {
        setIsActive(false);
        setIsPaused(true);
        setShowConfirmation(false);
        setIsCompleted(false);
        const totalTimeInSec =
          calculateTotalTimeMms(fetchedEmployeeLogs) / 1000;
        const totalTimeInSecRounded = Math.round(totalTimeInSec);
        setElapsed(totalTimeInSecRounded);
      } else if (savedStatus === "completed") {
        setIsActive(false);
        setIsPaused(false);
        setShowConfirmation(false);
        setIsCompleted(true);
        const totalTimeInSec =
          calculateTotalTimeMms(fetchedEmployeeLogs) / 1000;
        const totalTimeInSecRounded = Math.round(totalTimeInSec);
        setElapsed(totalTimeInSecRounded);

        const endTime = getNestedProperty(trailer, wallEndTimeKey);
        setWallEndTime(endTime);
      }
    };

    initializeState();
  }, [trailer, wallType]); // Adjusted dependencies


  React.useEffect(() => {
    let interval = null;
  
    if (isActive) {  // Conditional logic here is OK since the hook is always initialized
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor(
          (new Date().getTime() - new Date(currentLogStartTime).getTime() + timePrior) / 1000
        );
        setElapsed(elapsedSeconds);
      }, 500);
    }
  
    return () => clearInterval(interval);  // Always clear interval on cleanup
  }, [isActive, currentLogStartTime, timePrior]);

  const wallArrIndex = wallTypeFindIndex(trailer.walls, wallType);

  if (wallArrIndex === -1) {
    console.error(`Wall type ${wallType} not found in trailer walls array.`);
    return null;
  }

  const partKey = `walls.${wallArrIndex}`;
  const wallSpecialReqKey = `${partKey}.specialRequirements`;
  const wallStatusKey = `${partKey}.status`;
  const wallStartTimeKey = `${partKey}.startedDate`;
  const wallEndTimeKey = `${partKey}.completedDate`;
  const wallCurrenStartTimeKey = `${partKey}.currentLogStartTime`;
  const wallActiveEmployeesKey = `${partKey}.activeEmployees`;
  const wallEmployeeLogsTimeKey = `${partKey}.employeeLogs`;

  const getWallSpecialReq = (trailer, wallArrIndex) => {
    const wallCommentsKey = `wallComments${wallArrIndex + 1}`;
    const commentsObj = trailer[wallCommentsKey];
    if (commentsObj && typeof commentsObj === 'object') {
      const values = Object.values(commentsObj);
      if (values.length > 0) {
        return values[0];
      }
    }
    return "No";
  };
  
  const dateReq = subBusinessDays(trailer?.dateRequired, 11);

  const dateReqColor = (dateReq) => {
    if (isPast(dateReq)) {
      return "var(--error)";
    } else if (isPast(subBusinessDays(dateReq, 2))) {
      return "var(--datewarning)";
    } else return "var(--secondary)";
  };

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: index % 2 ? "var(--primary5)" : "var(--success1)",
        }}
      >
        {/* WO | Customer */}
        <TableCell sx={{ width: "18rem" }}>
          <Typography sx={{ fontSize: "1.2rem", color: "black" }}>
            {trailer.workOrder + " | " + trailer.customer}
          </Typography>
        </TableCell>

        {/* Trailer */}
        <TableCell sx={{ width: "9rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {processTrailerNameForTrailerType(trailer.trailerType)}
          </Typography>
        </TableCell>

        {/* Wall */}
        <TableCell sx={{ width: "13rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {wallType}
          </Typography>
        </TableCell>

        {/* Picture */}
        <TableCell sx={{ width: "10rem", position: "relative", height: "6rem" }}>
          <Image
            src={getImagePath(trailer, wallType, isCompleted)}
            style={{ objectFit: "contain" }}
            fill={true}
            sizes={"100%"}
            priority={true}
            alt="Picture of the Wall"
          />
        </TableCell>

        {/* Parts */}
        <TableCell sx={{ width: "5rem" }}>
          <IconButton
            aria-label="open-drawings"
            color="primary"
            onClick={handleClickOpenDrawings}
          >
            <DocumentScannerIcon />
          </IconButton>
        </TableCell>

        {/* Special Req. */}
        <TableCell sx={{ width: "8rem" }}>
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: getWallSpecialReq(trailer, wallArrIndex) !== "No" ? "red" : "black",
            }}
          >
            {getWallSpecialReq(trailer, wallArrIndex)}
          </Typography>
        </TableCell>


        {/* Status */}
        <TableCell sx={{ width: "9rem" }}>
          <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
            {getStatusText()}
          </Typography>
        </TableCell>

        {/* Timer */}
        <TableCell sx={{ width: "11rem" }}>
          {/* Build Timer Logic */}
          {!isActive && !isPaused && !isCompleted && (
            <Button
              variant="contained"
              onClick={() => {
                if (isPasswordValid) {
                  handleClickOpenEmployeesWorking();
                }
              }}
            >
              Start
            </Button>
          )}
          {isActive && !isCompleted && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "1.1rem", color: "black", mr: 2 }}>
                {dispSecondsAsMins(elapsed)}
              </Typography>
              <IconButton
                aria-label="pause"
                color="primary"
                onClick={() => {
                  if (isPasswordValid) {
                    pauseTimer();
                  }
                }}
              >
                <PauseCircleOutlineIcon />
              </IconButton>
            </Box>
          )}
          {isPaused && !showConfirmation && !isCompleted && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "1.1rem", color: "black", mr: 2 }}>
                {dispSecondsAsMins(elapsed)}
              </Typography>
              <IconButton
                aria-label="play"
                color="primary"
                onClick={() => {
                  if (isPasswordValid) {
                    handleClickOpenEmployeesWorking();
                  }
                }}
              >
                <PlayCircleOutlineIcon />
              </IconButton>
              <IconButton
                aria-label="confirm"
                color="primary"
                onClick={() => {
                  if (isPasswordValid) {
                    confirmCompletion();
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
                onClick={() => handleCompletion(false)}
                sx={{ mr: 1 }}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCompletion(true)}
              >
                Yes
              </Button>
            </Box>
          )}
          {isCompleted && (
            <Button
              sx={{
                textTransform: "none",
              }}
              onClick={handleClickOpenPassowrdDialog}
            >
              <Typography
                sx={{
                  maxWidth: "15rem",
                  color: "var(--success)",
                  textAlign: "left",
                }}
              >
                {eng ? "Completed on" : "Terminada el"}{" "}
                {new Date(wallEndTime).toLocaleDateString(
                  eng ? "en-US" : "es-ES",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
                ,{" "}
                {new Date(wallEndTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                ({Math.floor(elapsed / 60)} {eng ? "minutes" : "minutos"})
              </Typography>
            </Button>
          )}
        </TableCell>

        {/* Team */}
        <TableCell sx={{ width: "25rem" }}>
          {isActive &&
            !isCompleted &&
            activeEmployees?.map((employee, idx) => (
              <Chip
                key={idx}
                color="success"
                sx={{ mb: 0.5 }}
                label={`${employee?.firstName} (${employee?.employeeID})`}
                variant="outlined"
              />
            ))}
        </TableCell>
      </TableRow>

      {/* Drawing Dialog */}
      <DrawingDialogNew
        trailer={trailer}
        openDrawings={openDrawings}
        handleOpenDrawings={handleCloseDrawings}
        currentWall={
          wallArrIndex >= 0 && trailer.walls ? trailer.walls[wallArrIndex] : null
        }
        wallType={wallType}
      />

      {/* Password Dialog */}
      <PasswordDialog
        open={openPassowrdDialog}
        close={handleClosePassowrdDialog}
        undoCompletion={undoCompletion}
        trailer={trailer}
        wallType={wallType}
      />

      {/* RenderEmployee Component */}
      <RenderEmployee
        startTimer={startTimer}
        currentTrailer={trailer}
        currentFrame={wallType}
        activeEmployees={activeEmployees}
        openEmployeesWorking={openEmployeesWorking}
        eng={eng}
        task={task}
        handleCloseEmployeesWorking={handleCloseEmployeesWorking}
        handleActiveEmployees={handleActiveEmployees}
        showStart={!isActive && !isPaused && !isCompleted}
      />
    </>
  );
};

export default WallsRow;
