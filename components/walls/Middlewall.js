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

export default function MiddleWall(props) {
  const { trailer, trailerType, wallType, wall, task } = props;

  const saveInterval = 300;
  const wallArrIndex = wallTypeFindIndex(trailer.walls, wallType);

  const [openDrawings, setOpenDrawings] = React.useState(false);

  const handleOpenDrawings = (val) => {
    setOpenDrawings(val);
  };

  const [openEmployeesWorking, setOpenEmployeesWorking] = React.useState(false);

  const handleClickOpenEmployeesWorking = () => {
    setOpenEmployeesWorking(true);
  };

  const handleCloseEmployeesWorking = () => {
    setOpenEmployeesWorking(false);
  };

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

  const handleActiveEmployees = (newActiveEmployees) => {
    // console.log(newActiveEmployees);
    setActiveEmployees(newActiveEmployees);
  };

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
    console.log("started");
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
    if (status === "notStarted" || status === undefined) {
      const updates = {
        [wallActiveEmployeesKey]: activeEmployees,
        [wallStatusKey]: "running",
        [wallStartTimeKey]: startTime,
        [wallCurrenStartTimeKey]: startTime,
      };
      await updateTrailerData(updates);
    } else {
      await updateTrailerData({
        [wallActiveEmployeesKey]: activeEmployees,
        [wallStatusKey]: "running",
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

  const confirmCompletion = () => {
    setShowConfirmation(true);
  };

  const updateTrailerData = async (updates) => {
    const data = {
      workOrder: trailer.workOrder,
      trailerType: trailerType,
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
      if (fetchedEmployeeLogs) {
        setEmployeeLogs(fetchedEmployeeLogs);
      }

      if (fetchedActiveEmployees) {
        setActiveEmployees(fetchedActiveEmployees);
      }

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
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
    //   <Box
    //   sx={{
    //       width: "18%",
    //       height: "40rem",
    //       display: "flex",
    //       justifyContent: "flex-start",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       pt: 22,
    //     }}
    //     >
    <Box
      sx={{
        width: "100%",
        height: "40rem",
        mt: 0,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
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
          position: "absolute",
          zIndex: "1",
          width: "100%",
          bottom: "1rem",
          left: "2.6rem",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
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
          <Typography sx={{ fontSize: "1.1rem" }}>
            Mid Wall {trailerType.includes("Tri 3 Hop") ? "- 2" : ""}
          </Typography>
          <IconButton
            aria-label="open-drawings"
            color="primary"
            sx={{ ml: 2 }}
            onClick={() => {
              handleOpenDrawings(true);
            }}
          >
            <DocumentScannerIcon sx={{ fontSize: "1.8rem" }} />
          </IconButton>
          {trailer?.walls?.filter((wall) => wall.wallType === "Mid Wall")[0]
            ?.specialRequirements && (
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
            // bgcolor:"red",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "3rem",
          }}
        >
          {!isActive && !isPaused && !isCompleted && (
            <Box sx={{ minWidth: "19rem" }}>
              <Button
                variant="contained"
                onClick={handleClickOpenEmployeesWorking}
              >
                {props.eng ? "Start Wall" : "Empezar Pared"}
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
            <Typography sx={{ minWidth: "35rem", color: "var(--success)" }}>
              {props.eng ? "Completed on" : "Terminada el"}{" "}
              {new Date(wallEndTime).toLocaleDateString(
                props.eng ? "en-US" : "es-ES",
                {
                  month: "short",
                  day: "numeric",
                }
              )}
              ,
              {new Date(wallEndTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              ({Math.floor(time / 60)} {props.eng ? "minutes" : "minutos"})
            </Typography>
          )}
        </Box>
      </Box>

      {trailerType.includes("Tri 3 Hop") && (
        <Box
          sx={{
            position: "absolute",
            zIndex: "1",
            width: "100%",
            top: "2.5rem",
            left: "-2.6rem",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
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
            <Typography sx={{ fontSize: "1.1rem" }}>Mid Wall - 1</Typography>
            <IconButton
              aria-label="open-drawings"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => {
                props.handleClickOpenDrawings("Mid Wall 2", trailer);
              }}
            >
              <DocumentScannerIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
            {trailer?.walls?.filter((wall) => wall.wallType === "Mid Wall 2")[0]
              ?.specialRequirements && (
              <IconButton aria-label="error" color="error" sx={{ ml: 1 }}>
                <ErrorIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{
              width: "100%",
              mt: 0,
              bgcolor: "red",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "3rem",
            }}
          >
            {!isActive && !isPaused && !isCompleted && (
              <Box sx={{ minWidth: "5rem" }}>
                <Typography sx={{ fontSize: "1rem" }}>
                  {props.eng ? "Start Wall" : "Empezar Pared"}
                </Typography>
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
                  onClick={startTimer}
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
                {new Date(wallEndTime).toLocaleDateString(
                  props.eng ? "en-US" : "es-ES",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
                ,
                {new Date(wallEndTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                ({Math.floor(time / 60)} {props.eng ? "minutes" : "minutos"})
              </Typography>
            )}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          height: "100%",
          maxHeight: "40rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          // bgcolor: "green",
          mt: -11,

          pl: trailerType.includes("Tri 3 Hop") ? 8 : 5,
          pr: trailerType.includes("Tri 3 Hop") ? 0 : 3,

          pt: 10,
          pb: 10,

          //   overflow: "hidden",
        }}
      >
        <Image
          src={
            !trailerType.includes("Tri 3 Hop")
              ? status === "Completed"
                ? `${
                    trailer?.walls?.filter(
                      (wall) => wall.wallType === "Mid Wall"
                    )[0]?.completedImage
                  }.png`
                : `${
                    trailer?.walls?.filter(
                      (wall) => wall.wallType === "Mid Wall"
                    )[0]?.defaultImage
                  }.png`
              : status === "Completed"
              ? `/images/walls/completedTri3Hop/midwall.png`
              : `${
                  trailer?.walls?.filter(
                    (wall) => wall.wallType === "Mid Wall"
                  )[0]?.defaultImage
                }.png`
          }
          width={0}
          height={0}
          sizes={"20rem"}
          style={{
            width: "auto",
            height: "100%",
            maxHeight: "20rem",
          }}
          alt="Trailer"
        />
      </Box>
    </Box>
    //   </Box>
  );
}
