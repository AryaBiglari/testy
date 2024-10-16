import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import RenderEmployee from "../../components/planning/RenderEmployee.js";
import ErrorIcon from "@mui/icons-material/Error";
import Image from "next/image";
import DrawingDialogNew from "../../components/walls/DrawingDialogNew";
import { subBusinessDays, isPast } from "date-fns";

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function wallTypeFindIndex(wallsArr, wallType) {
  return wallsArr.findIndex((wall) => wall.wallType === wallType);
}

export default function SideWallPassenger(props) {
  const { trailer, trailerType, wallType, wall, task } = props;

  const saveInterval = 300;

  const wallArrIndex = wallTypeFindIndex(trailer.walls, wallType);

  const [openDrawings, setOpenDrawings] = React.useState(false);
  const [openEmployeesWorking, setOpenEmployeesWorking] = React.useState(false);

  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [wallStartTime, setWallStartTime] = React.useState(null);
  const [wallEndTime, setWallEndTime] = React.useState(null);
  const [currentStartTime, setCurrentStartTime] = React.useState(null);
  const [activeEmployees, setActiveEmployees] = React.useState([]);
  const [employeeLogs, setEmployeeLogs] = React.useState([]);

  const handleOpenDrawings = (val) => setOpenDrawings(val);
  const handleClickOpenEmployeesWorking = () => {
    setOpenEmployeesWorking(true);
    console.log(openEmployeesWorking);
  };
  const handleCloseEmployeesWorking = () => setOpenEmployeesWorking(false);
  const handleActiveEmployees = (newActiveEmployees) =>
    setActiveEmployees(newActiveEmployees);

  const partKey = `walls.${wallArrIndex}`;
  const wallStatusKey = `${partKey}.status`;
  const wallTimeKey = `${partKey}.time`;
  const wallStartTimeKey = `${partKey}.startedDate`;
  const wallEndTimeKey = `${partKey}.completedDate`;
  const wallCurrenStartTimeKey = `${partKey}.currentStartTime`;
  const wallActiveEmployeesKey = `${partKey}.activeEmployees`;
  const wallEmployeeLogsTimeKey = `${partKey}.employeeLogs`;

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

  const startTimer = async () => {
    setIsActive(true);
    setIsPaused(false);
    setShowConfirmation(false);
    const startTime = new Date();
    const taskWall = {
      workOrder: trailer.workOrder,
      trailerType: trailer.trailerType,
      wallType: wallType,
      currentStartTime: startTime,
      currentActiveEmployees: activeEmployees,
    };
    props.handleAddActiveTasks(taskWall);
    setCurrentStartTime(startTime);
    const updates =
      status === "notStarted" || status === undefined
        ? {
            [wallActiveEmployeesKey]: activeEmployees,
            [wallStatusKey]: "running",
            [wallStartTimeKey]: startTime,
          }
        : {
            [wallActiveEmployeesKey]: activeEmployees,
            [wallStatusKey]: "running",
          };
    await updateTrailerData(updates);
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
        ({ firstName, lastName, employeeID }) => ({
          firstName,
          lastName,
          employeeID,
        })
      ),
    };
    return [...logs, logEntry];
  };

  const pauseTimer = async () => {
    setIsActive(false);
    setIsPaused(true);
    const newLogs = updateEmployeeLogs(
      activeEmployees,
      employeeLogs,
      currentStartTime
    );
    setEmployeeLogs(newLogs);
    const updates = {
      [wallActiveEmployeesKey]: activeEmployees,
      [wallEmployeeLogsTimeKey]: newLogs,
      [wallStatusKey]: "paused",
      [wallTimeKey]: time,
    };
    props.handleRemoveActiveTasks(wallType);
    await updateTrailerData(updates);
  };

  const handleCompletion = async (confirmed) => {
    if (confirmed) {
      const endTime = Date.now();
      setIsCompleted(true);
      setShowConfirmation(false);
      setIsActive(false);
      setIsPaused(false);
      setStatus("Completed");
      setWallEndTime(endTime);
      const updates = {
        [wallActiveEmployeesKey]: [],
        [wallStatusKey]: "Completed",
        [wallTimeKey]: time,
        [wallEndTimeKey]: endTime,
      };
      props.addCompletedWall();
      await updateTrailerData(updates);
    } else {
      setShowConfirmation(false);
      setIsPaused(true);
    }
  };

  const confirmCompletion = () => setShowConfirmation(true);

  const updateTrailerData = async (updates) => {
    const data = {
      workOrder: trailer.workOrder,
      trailerType: trailerType,
      updates,
    };

    const response = await fetch("/api/boxes/boxesapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) console.error("Failed to update the trailer data");
    else console.log("Trailer data updated successfully");
  };

  const updateTimeWhileRunning = async () => {
    if (time % saveInterval === 0) {
      const updates = {
        [wallActiveEmployeesKey]: activeEmployees,
        [wallTimeKey]: time,
        [wallCurrenStartTimeKey]: currentStartTime,
      };
      await updateTrailerData(updates);
    }
  };

  React.useEffect(() => {
    const initializeState = () => {
      const savedStatus = getNestedProperty(trailer, wallStatusKey);
      const savedTime = getNestedProperty(trailer, wallTimeKey);
      setTime(savedTime ?? 0);
      setStatus(savedStatus);

      const fetchedEmployeeLogs = getNestedProperty(
        trailer,
        wallEmployeeLogsTimeKey
      );
      const fetchedActiveEmployees = getNestedProperty(
        trailer,
        wallActiveEmployeesKey
      );
      if (fetchedEmployeeLogs) setEmployeeLogs(fetchedEmployeeLogs);
      if (fetchedActiveEmployees) setActiveEmployees(fetchedActiveEmployees);

      if (savedStatus === "running") {
        setIsActive(true);
        setIsPaused(false);
        setIsCompleted(false);
      } else if (savedStatus === "paused") {
        setIsActive(false);
        setIsPaused(true);
        setIsCompleted(false);
      } else if (savedStatus === "Completed") {
        setIsActive(false);
        setIsPaused(false);
        setIsCompleted(true);

        const endTime = getNestedProperty(trailer, wallEndTimeKey);
        setWallEndTime(endTime);
      }
    };

    initializeState();
  }, [trailer]);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          updateTimeWhileRunning();
          return newTime;
        });
      }, 1000);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
    <Box
      sx={{
        width: "55%",
        height: "22rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pl: 6,
      }}
    >
      <DrawingDialogNew
        trailer={trailer}
        openDrawings={openDrawings}
        handleOpenDrawings={handleOpenDrawings}
        currentWall={wall}
        wallType={wallType}
      />

      <RenderEmployee
        startTimer={startTimer}
        currentTrailer={trailer}
        currentFrame={wallType}
        activeEmployees={activeEmployees}
        openEmployeesWorking={openEmployeesWorking}
        task={task}
        handleCloseEmployeesWorking={handleCloseEmployeesWorking}
        handleActiveEmployees={handleActiveEmployees}
        showStart={!isActive && !isPaused && !isCompleted}
      />
      <Box
        sx={{
          width: "100%",
          height: "22rem",
          mt: 0,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: "0rem",
            left: "4rem",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            zIndex: "2",
            borderRadius: "0.5rem",
            p: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "1.1rem" }}>Front Slope</Typography>
            <IconButton
              aria-label="open-drawings"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => handleOpenDrawings(true)}
            >
              <DocumentScannerIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
            {trailer?.walls?.filter(
              (wall) => wall.wallType === "Front Slope"
            )[0]?.specialRequirements && (
              <IconButton aria-label="error" color="error" sx={{ ml: 1 }}>
                <ErrorIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{
              width: "100%",
              mt: 0,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "3rem",
            }}
          >
            {!isActive && !isPaused && !isCompleted && (
              <Box sx={{ minWidth: "5rem" }}>
                <Button
                  variant="contained"
                  onClick={handleClickOpenEmployeesWorking}
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    {props.eng ? "Start Wall" : "Empezar Pared"}
                  </Typography>
                </Button>
              </Box>
            )}
            {isActive && !isCompleted && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    color: "var(--primary)",
                    minWidth: "5rem",
                  }}
                >
                  {dispSecondsAsMins(time)}
                </Typography>
                <IconButton
                  aria-label="pause"
                  color="primary"
                  onClick={pauseTimer}
                >
                  <PauseCircleOutlineIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
              </Box>
            )}
            {isPaused && !showConfirmation && !isCompleted && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    color: "var(--primary)",
                    minWidth: "5rem",
                  }}
                >
                  {dispSecondsAsMins(time)}
                </Typography>
                <IconButton
                  aria-label="play"
                  color="primary"
                  onClick={handleClickOpenEmployeesWorking}
                >
                  <PlayCircleOutlineIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
                <IconButton
                  aria-label="confirm"
                  color="primary"
                  onClick={confirmCompletion}
                >
                  <CheckCircleOutlineIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
              </Box>
            )}
            {showConfirmation && (
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
              <Typography sx={{ maxWidth: "15rem", color: "var(--success)" }}>
                {props.eng ? "Completed on" : "Terminada el"}{" "}
                {new Date().toLocaleDateString(props.eng ? "en-US" : "es-ES", {
                  month: "short",
                  day: "numeric",
                })}
                ,
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                ({Math.floor(time / 60)} {props.eng ? "minutes" : "minutos"})
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            height: "100%",
            maxHeight: "18rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: "1",
            mt: 16,
            pl: 1,
            pr: 1,
          }}
        >
          <Image
            src={
              isCompleted
                ? `${
                    trailer?.walls?.filter(
                      (wall) => wall.wallType === "Front Slope"
                    )[0]?.completedImage
                  }.png`
                : `${
                    trailer?.walls?.filter(
                      (wall) => wall.wallType === "Front Slope"
                    )[0]?.defaultImage
                  }.png`
            }
            width={0}
            height={0}
            sizes={"20rem"}
            style={{ width: "auto", height: "100%", maxHeight: "20rem" }}
            alt="Trailer"
          />
        </Box>
      </Box>
    </Box>
  );
}
