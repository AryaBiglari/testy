import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { camelCase } from "@cloudinary/url-gen/backwards/utils/legacyBaseUtil";
import { subBusinessDays, isPast } from "date-fns";

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join("");
}

const FinishingRow = (props) => {
  const { trailer, partType, location, handleClickOpenDrawings } = props;

  const saveInterval = 300;

  const getImagePath = (trailer) => {
    let trailerType;
    if (trailer.trailerType === "Pup") {
      trailerType = "pup";
    } else if (trailer.trailerType === "Lead") {
      trailerType = "lead";
    } else {
      console.log("Trailer type not supported for picture");
      trailerType = "pup";
    }

    let part;
    if (partType === "Front Frame Finishing") {
      part = "FrontFinished";
    } else if (partType === "Rear Frame Finishing") {
      part = "RearFinished";
    } else if (partType === "Box Finishing") {
      part = "BoxFinished";
    } else {
      part = "BoxFinished";
    }

    const imagePath = `/images/finish/${trailerType}${part}.png`;
    return imagePath;
  };
  const imagePath = getImagePath(trailer);

  // const partKey = `${`${location.slice(0, 1).toUpperCase()}${location.slice(1)}` + partType.toLowerCase()}`;
  const partKey = `${camelCase(partType)}State`;
  const frameSpecialReqKey = `${partKey}.SpecialReq`;
  const frameStatusKey = `${partKey}.Status`;
  const frameTimeKey = `${partKey}.Time`;
  const frameStartTimeKey = `${partKey}.StartTime`;
  const frameEndTimeKey = `${partKey}.EndTime`;

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

  const [time, setTime] = React.useState(
    props.trailer.frontFrameTime ? props.trailer.frontFrameTime : 0
  );
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  const [frameStartTime, setFrameStartTime] = React.useState(null);
  const [frameEndTime, setFrameEndTime] = React.useState(null);

  // Updated startTimer function
  const startTimer = async () => {
    console.log("started");
    setIsActive(true);
    setIsPaused(false);
    setShowConfirmation(false);
    if (status === "Not Started" || status === undefined) {
      const startTime = Date.now();
      setFrameStartTime(startTime);
      const updates = {
        [`${frameStatusKey}`]: "Running",
        [`${frameStartTimeKey}`]: startTime,
      };
      await updateTrailerData(updates);
    } else {
      await updateTrailerData({ [`${frameStatusKey}`]: "Running" });
    }
  };

  // Updated pauseTimer function
  const pauseTimer = async () => {
    setIsActive(false);
    setIsPaused(true);
    const updates = {
      [`${frameStatusKey}`]: "Paused",
      [`${frameTimeKey}`]: time,
    };
    await updateTrailerData(updates);
  };

  // Updated handleCompletion function
  const handleCompletion = async (confirmed) => {
    if (confirmed) {
      const endTime = Date.now();
      setIsCompleted(true);
      setShowConfirmation(false);
      setIsActive(false);
      setIsPaused(false);
      setFrameEndTime(endTime);
      const updates = {
        [`${frameStatusKey}`]: "Completed",
        [`${frameTimeKey}`]: time,
        [`${frameEndTimeKey}`]: endTime,
      };
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
    // Prepare the data to be sent to the API
    const data = {
      workOrder: props.trailer.workOrder,
      trailerType: props.trailer.trailerType,
      updates,
    };

    console.log(updates);

    const response = await fetch("/api/boxes/boxesapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log(respone)
    if (!response.ok) {
      console.error("Failed to update the trailer data");
    } else {
      console.log("Trailer data updated successfully");
    }
  };

  const updateTimeWhileRunning = async () => {
    if (time % saveInterval === 0) {
      const updates = {
        [`${frameTimeKey}`]: time,
      };

      await updateTrailerData(updates);
    }
  };

  // Added state initialization in useEffect
  React.useEffect(() => {
    const initializeState = () => {
      const savedStatus = getNestedProperty(trailer, frameStatusKey);
      const savedTime = getNestedProperty(trailer, frameTimeKey);

      if (savedTime === undefined) {
        setTime(0);
      } else {
        setTime(savedTime);
      }

      setStatus(savedStatus);

      if (savedStatus === "Running") {
        setIsActive(true);
        setIsPaused(false);
        setShowConfirmation(false);
        setIsCompleted(false);
      } else if (savedStatus === "Paused") {
        setIsActive(false);
        setIsPaused(true);
        setShowConfirmation(false);
        setIsCompleted(false);
      } else if (savedStatus === "Completed") {
        setIsActive(false);
        setIsPaused(false);
        setShowConfirmation(false);
        setIsCompleted(true);
      }
    };

    initializeState();
  }, [props.trailer]);

  // timer set interval
  React.useEffect(() => {
    console.log(time);
    let interval = null;
    if (isActive) {
      // Start the interval after the first immediate update
      interval = setInterval(() => {
        setTime((prevTime) => {
          console.log(time);
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

  const dateReqInstallFrames = subBusinessDays(trailer?.dateRequired, 7);
  const dateReqInstallDoors = subBusinessDays(trailer?.dateRequired, 7);
  const dateReqBoxFinishing = subBusinessDays(trailer?.dateRequired, 6);
  const dateReqFrontFrameFinishing = subBusinessDays(trailer?.dateRequired, 5);
  const dateReqRearFrameFinishing = subBusinessDays(trailer?.dateRequired, 4);

  const dateReqFunction = (partType) => {
    if (partType === "Install Frames") {
      return dateReqInstallFrames;
    }
    if (partType === "Install Hopper Doors") {
      return dateReqInstallDoors;
    }

    if (partType === "Box Finishing") {
      return dateReqBoxFinishing;
    }

    if (partType === "Front Frame Finishing") {
      return dateReqFrontFrameFinishing;
    }
    if (partType === "Rear Frame Finishing") {
      return dateReqRearFrameFinishing;
    } else return trailer?.dateRequired;
  };
  const dateReqColor = (dateReq) => {
    if (isPast(dateReq)) {
      return "var(--error)";
    } else if (isPast(subBusinessDays(dateReq, 2))) {
      return "var(--datewarning)";
    } else return "var(--secondary)";
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        mb: 1,
      }}
    >
      <Box
        sx={{
          width: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
          {trailer.workOrder}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "9rem",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
          {trailer.trailerType}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "15rem",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.1rem", color: "black" }}>
          {partType}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 0.3,
          // bgcolor: "red",
          height: "4rem",
          width: "12rem",
          display: "flex",
          justifyContent: "center",
          borderRadius: "0.8rem",
          maxWidth: "10rem",
          position: "relative",
        }}
      >
        <Image
          src={imagePath}
          style={{
            objectFit: "contain",
          }}
          fill={true}
          sizes={"100%"}
          priority={true}
          alt="Picture of the Part"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "8rem",
          justifyContent: "center",
          ml: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            color: dateReqColor(dateReqFunction(partType)),
          }}
        >
          {new Date(dateReqFunction(partType)).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "5rem",
          justifyContent: "center",
          ml: 2,
        }}
      >
        <IconButton
          disabled={
            partType === "Install Frames" || partType === "Install Hopper Doors"
          }
          aria-label="open-drawings"
          color="primary"
          onClick={() => {
            handleClickOpenDrawings(trailer, partType);
          }}
        >
          <DocumentScannerIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "8rem",
          justifyContent: "center",
          ml: 2,
        }}
      >
        <Typography
          sx={{ fontSize: "1.1rem", color: "black", textAlign: "center" }}
        >
          {trailer[frameSpecialReqKey] || "No"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "8rem",
          justifyContent: "center",
          ml: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          {getStatusText()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "11rem",
          //   bgcolor: "red",
          justifyContent: "center",
          ml: 2,
        }}
      >
        {!isActive && !isPaused && !isCompleted && (
          <Button variant="contained" onClick={startTimer}>
            Start
          </Button>
        )}
        {isActive && !isCompleted && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "1.1rem", color: "black", mr: 2 }}>
              {dispSecondsAsMins(time)}
            </Typography>
            <IconButton aria-label="pause" color="primary" onClick={pauseTimer}>
              <PauseCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
        {isPaused && !showConfirmation && !isCompleted && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "1.1rem", color: "black", mr: 2 }}>
              {dispSecondsAsMins(time)}
            </Typography>
            <IconButton aria-label="play" color="primary" onClick={startTimer}>
              <PlayCircleOutlineIcon />
            </IconButton>
            <IconButton
              aria-label="confirm"
              color="primary"
              onClick={confirmCompletion}
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
              sx={{}}
            >
              Yes
            </Button>
          </Box>
        )}
        {isCompleted && (
          <Typography sx={{ maxWidth: "15rem", color: "var(--success)" }}>
            {true ? "Completed on" : "Terminada el"}{" "}
            {new Date(frameEndTime).toLocaleDateString(
              true ? "en-US" : "es-ES",
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
            ({Math.floor(time / 60)} {true ? "minutes" : "minutos"})
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FinishingRow;
