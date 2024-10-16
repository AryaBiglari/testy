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
import { image } from "@cloudinary/url-gen/qualifiers/source";
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

const PartKitsRow = (props) => {
  const { trailer, partType, location, handleClickOpenDrawings, category } =
    props;

  const saveInterval = 300;

  const getImagePath = (trailer) => {
    const trailerTypeMapToDefaultBox = {
      Pup: "pup",
      Tandem: "tandem",
      Lead: "lead",
      "Tri 61' 2 Hoppers": "Tri2Hop",
      "Tri 61' 3 Hoppers": "Tri3Hop",
      "Tri 72' 2 Hoppers": "Tri2Hop",
    };

    let trailerType = trailerTypeMapToDefaultBox[trailer.trailerType];

    if (category === "Frames") {
      if (trailerType != "pup" || trailerType != "lead") {
        trailerType = "pup";
      }

      const imagePath = `/images/frames/${trailerType}/${props.location}.png`;

      return imagePath;
    }

    if (category === "Box Stages") {
      // let trailerType = trailer.trailerType.toLowerCase();

      let stage = partType.charAt(partType.length - 1);
      const imagePath = `/images/box/${trailerType}/full-stage/stage${stage}.png`;
      return imagePath;
    }

    if (category === "Small Parts") {
      return `/images/frames/hopper-door.png`;
    }

    if (category === "Finishing") {
      let trailerType;
      if (trailer.trailerType === "Pup") {
        trailerType = "pup";
      } else if (trailer.trailerType === "Lead") {
        trailerType = "lead";
      } else {
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

      return `/images/finish/${trailerType}${part}.png`;
    }
    // return imagePath;
  };
  const imagePath = getImagePath(trailer);

  // const partKey = `${`${location.slice(0, 1).toUpperCase()}${location.slice(1)}` + partType.toLowerCase()}`;
  const partKey = `partKits.${camelCase(partType)}State`;
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

  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  const [frameStartTime, setFrameStartTime] = React.useState(null);
  const [frameEndTime, setFrameEndTime] = React.useState(null);

  // Updated startTimer function
  const startTimer = async () => {
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
        setFrameEndTime(getNestedProperty(trailer, frameEndTimeKey));
      }
    };

    initializeState();
  }, [props.trailer]);

  // timer set interval
  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      // Start the interval after the first immediate update
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

  const dateReqFrameParts = subBusinessDays(trailer?.dateRequired, 16);
  const dateReqBoxStage1 = subBusinessDays(trailer?.dateRequired, 13);
  const dateReqBoxStage2 = subBusinessDays(trailer?.dateRequired, 12);
  const dateReqBoxStage3 = subBusinessDays(trailer?.dateRequired, 11);
  const dateReqBoxStage4 = subBusinessDays(trailer?.dateRequired, 10);
  const dateReqSmallParts = subBusinessDays(trailer?.dateRequired, 12);
  const dateReqBoxFinishing = subBusinessDays(trailer?.dateRequired, 8);
  const dateReqFrontFrameFinishing = subBusinessDays(trailer?.dateRequired, 6);
  const dateReqRearFrameFinishing = subBusinessDays(trailer?.dateRequired, 4);

  const dateReqFunction = (partType) => {
    if (partType === "Front Frame" || partType === "Rear Frame") {
      return dateReqFrameParts;
    }
    if (partType === "Box Stage 1") {
      return dateReqBoxStage1;
    }

    if (partType === "Box Stage 2") {
      return dateReqBoxStage2;
    }

    if (partType === "Box Stage 3") {
      return dateReqBoxStage3;
    }

    if (partType === "Box Stage 4") {
      return dateReqBoxStage4;
    }
    if (partType === "Small Parts Stage") {
      return dateReqSmallParts;
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
          aria-label="open-drawings"
          color="primary"
          onClick={() => {
            handleClickOpenDrawings(trailer, partType, imagePath);
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

export default PartKitsRow;
