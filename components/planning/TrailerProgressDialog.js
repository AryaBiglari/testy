import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import wallsData from "../../lib/wallsData.js";
import WallsDrawingsDialog from "./WallsDrawingsDialog.js";
// import RenderProcess from "./RenderProcess.js";
import RenderNonEditableProcess from "./RenderNonEditableProcess.js";
import RenderTrailerDetails from "./RenderTrailerDetails.js";
import BoxProgress from "./BoxProgress.js";
import ProcessTableTitles from "./ProcessTableTitles.js";
import ProcessTitles from "./ProcessTitles.js";
import ProcessSteps from "./ProcessSteps.js";
import CircularProgress from "@mui/material/CircularProgress";
import CircularProgressForTrailers from "./CircularProgressForTrailers.js";
import { subBusinessDays, isPast } from "date-fns";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    // bgcolor: "red",
    minWidth: "92%",
    maxWidth: "92%",

    minHeight: "94vh",
    // display: "unset",
  },
  "& .css-uhb5lp": {
    // bgcolor: "red",
    minWidth: "84%",
    maxWidth: "84%",
    minHeight: "98vh",
    // display: "unset",
  },
  "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
  {
    minWidth: "84%",
    maxWidth: "84%",
    maxWidth: "unset",
    minHeight: "98vh",
  },

  // "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
  //   minWidth: "84vw !important",
  //   // maxWidth: "84vw !important",
  //   width: "84vw !important",
  //   minHeight: "98vh",
  // },

  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
    paddingBottom: "4rem",
    display: "flex",
    flexDirection: "column",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function RenderPartsLists(props) {
  const [currentTrailer, setCurrentTrailer] = React.useState(null);
  const [allParts, setAllParts] = React.useState([]);
  const [selectedCompletionDate, setSelectedCompletionDate] = React.useState(() =>
    currentTrailer?.completedDate ? new Date(currentTrailer.completedDate) : null
  );
  
  React.useEffect(() => {
    if (currentTrailer?.completedDate) {
      setSelectedCompletionDate(new Date(currentTrailer.completedDate));
    }
  }, [currentTrailer]);  const [frontFrameOpened, setFrontFrameOpened] = React.useState(false);
  const [rearFrameOpened, setRearFrameOpened] = React.useState(false);
  const [wallsOpened, setWallsOpened] = React.useState(false);
  const [boxStage1Opened, setBoxStage1Opened] = React.useState(false);
  const [boxStage2Opened, setBoxStage2Opened] = React.useState(false);
  const [boxStage3Opened, setBoxStage3Opened] = React.useState(false);
  const [boxStage4Opened, setBoxStage4Opened] = React.useState(false);
  const [smallPartsOpened, setSmallPartsOpened] = React.useState(false);
  const [boxFinishingOpened, setBoxFinishingOpened] = React.useState(false);
  const [frontFrameFinishingOpened, setFrontFrameFinishingOpened] =
    React.useState(false);
  const [rearFrameFinishingOpened, setRearFrameFinishingOpened] =
    React.useState(false);
  const [qualityInspectionOpened, setQualityInspectionOpened] =
    React.useState(false);

  const handleCurrentTrailerSet = (newCurrentTrailer) => {
    setCurrentTrailer(newCurrentTrailer);
  };

  const handleCurrentTrailerUpload = async (newCurrentTrailer) => {
    setIsLoading(true);

    const id = newCurrentTrailer._id.toString();
    const { _id, ...updates } = newCurrentTrailer;

    const response = await fetch(`/api/planning/create-trailer`, {
      method: "PUT",
      body: JSON.stringify({ id, updates }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setCurrentTrailer(newCurrentTrailer);
    }

    setIsLoading(false);
    return response;
  };
  const handleQualityInspectionOpened = () => {
    setQualityInspectionOpened(!qualityInspectionOpened);
  };
  const handleBoxFinishingOpened = () => {
    setBoxFinishingOpened(!boxFinishingOpened);
  };
  const handleFrontFrameFinishingOpened = () => {
    setFrontFrameFinishingOpened(!frontFrameFinishingOpened);
  };
  const handleRearFrameFinishingOpened = () => {
    setRearFrameFinishingOpened(!rearFrameFinishingOpened);
  };
  const handleSmallPartsOpened = () => {
    setSmallPartsOpened(!smallPartsOpened);
  };
  const handleBoxStage1Opened = () => {
    setBoxStage1Opened(!boxStage1Opened);
  };
  const handleBoxStage2Opened = () => {
    setBoxStage2Opened(!boxStage2Opened);
  };
  const handleBoxStage3Opened = () => {
    setBoxStage3Opened(!boxStage3Opened);
  };
  const handleBoxStage4Opened = () => {
    setBoxStage4Opened(!boxStage4Opened);
  };

  const handleWallsOpened = () => {
    setWallsOpened(!wallsOpened);
  };

  const handleFrontFrameOpened = () => {
    setFrontFrameOpened(!frontFrameOpened);
  };
  const handleRearFrameOpened = () => {
    setRearFrameOpened(!rearFrameOpened);
  };
  //   console.log(allParts);
  const [isLoading, setIsLoading] = React.useState(true);
  const handleIsLoading = (val) => {
    setIsLoading(val);
  };
  //   console.log(props.currentFrame);

  const [alerts, setAlerts] = React.useState([]);
  const [alertActive, setAlertActve] = React.useState(false);
  const [activeAlertType, setActiveAlertType] = React.useState("");
  const [activeAlertMessage, setActiveAlertMessage] = React.useState("");

  // const handleActiveAlert = (state, type, message) => {
  //   setAlertActve(state);
  //   setActiveAlertType(type);
  //   setActiveAlertMessage(message);
  // };

  const handleActiveAlert = (state, type, message) => {
    if (state) {
      const newAlert = { id: new Date().getTime(), type, message };
      setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    } else {
      setAlerts([]);
    }
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  React.useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  // get Parts - start
  React.useEffect(() => {
    setIsLoading(true);
    async function getPartsHandler() {
      const response = await fetch(
        `/api/planning/create-trailer?id=${props.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }

      setCurrentTrailer(data);
      setIsLoading(false);
    }
    const onPageLoad = () => {
      try {
        if (props.openTrailerProgress) {
          getPartsHandler().then((response) => { });
        }
      } catch {
        (err) => console.log(err);
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [props.openTrailerProgress]);

  const frontFrameTimesArr = [
    {
      start: currentTrailer?.partKits?.frontFrameState?.StartTime,
      end: currentTrailer?.partKits?.frontFrameState?.EndTime,
    },
    {
      start: currentTrailer?.frontFrameTimeData?.startDate,
      end: currentTrailer?.frontFrameTimeData?.completedDate,
    },
    {
      start: currentTrailer?.frontFrameTimeData?.finishingStartTime,
      end: currentTrailer?.frontFrameTimeData?.finishingEndTime,
    },
  ];

  const rearFrameTimesArr = [
    {
      start: currentTrailer?.partKits?.rearFrameState?.StartTime,
      end: currentTrailer?.partKits?.rearFrameState?.EndTime,
    },
    {
      start: currentTrailer?.rearFrameTimeData?.startDate,
      end: currentTrailer?.rearFrameTimeData?.completedDate,
    },
    {
      start: currentTrailer?.rearFrameTimeData?.finishingStartTime,
      end: currentTrailer?.rearFrameTimeData?.finishingEndTime,
    },
  ];

  const boxStage1TimesArr = [
    {
      start: currentTrailer?.partKits?.boxStage1State?.StartTime,
      end: currentTrailer?.partKits?.boxStage1State?.EndTime,
    },
    {
      start: currentTrailer?.boxData?.stages[0]?.startedDate,
      end: currentTrailer?.boxData?.stages[0]?.completedDate,
    },
  ];
  const boxStage2TimesArr = [
    {
      start: currentTrailer?.partKits?.boxStage2State?.StartTime,
      end: currentTrailer?.partKits?.boxStage2State?.EndTime,
    },
    {
      start: currentTrailer?.boxData?.stages[1]?.startedDate,
      end: currentTrailer?.boxData?.stages[1]?.completedDate,
    },
  ];
  const boxStage3TimesArr = [
    {
      start: currentTrailer?.partKits?.boxStage3State?.StartTime,
      end: currentTrailer?.partKits?.boxStage3State?.EndTime,
    },
    {
      start: currentTrailer?.boxData?.stages[2]?.startedDate,
      end: currentTrailer?.boxData?.stages[2]?.completedDate,
    },
  ];
  const boxStage4TimesArr = [
    {
      start: currentTrailer?.partKits?.boxStage4State?.StartTime,
      end: currentTrailer?.partKits?.boxStage4State?.EndTime,
    },
    {
      start: currentTrailer?.boxData?.stages[3]?.startedDate,
      end: currentTrailer?.boxData?.stages[3]?.completedDate,
    },
  ];

  const smallPartsTimesArr =
    currentTrailer?.trailerType === "Tri 61' 3 Hoppers"
      ? [
        {
          start: currentTrailer?.partKits?.smallPartsStageState?.StartTime,
          end: currentTrailer?.partKits?.smallPartsStageState?.EndTime,
        },
        {
          start: currentTrailer?.hopperDoorsFront?.StartTime,
          end: currentTrailer?.hopperDoorsFront?.EndTime,
        },
        {
          start: currentTrailer?.hopperDoorsRear?.StartTime,
          end: currentTrailer?.hopperDoorsRear?.EndTime,
        },
        {
          start: currentTrailer?.hopperDoorsMiddle?.StartTime,
          end: currentTrailer?.hopperDoorsMiddle?.EndTime,
        },
      ]
      : [
        {
          start: currentTrailer?.partKits?.smallPartsStageState?.StartTime,
          end: currentTrailer?.partKits?.smallPartsStageState?.EndTime,
        },
        {
          start: currentTrailer?.hopperDoorsFront?.StartTime,
          end: currentTrailer?.hopperDoorsFront?.EndTime,
        },
        {
          start: currentTrailer?.hopperDoorsRear?.StartTime,
          end: currentTrailer?.hopperDoorsRear?.EndTime,
        },
      ];

  const frontFrameFinishingTimesArr = [
    {
      start: currentTrailer?.partKits?.frontFrameFinishingState?.StartTime,
      end: currentTrailer?.partKits?.frontFrameFinishingState?.EndTime,
    },
    {
      start: currentTrailer?.frontFrameFinishingState?.StartTime,
      end: currentTrailer?.frontFrameFinishingState?.EndTime,
    },
  ];
  const rearFrameFinishingTimesArr = [
    {
      start: currentTrailer?.partKits?.rearFrameFinishingState?.StartTime,
      end: currentTrailer?.partKits?.rearFrameFinishingState?.EndTime,
    },
    {
      start: currentTrailer?.rearFrameFinishingState?.StartTime,
      end: currentTrailer?.rearFrameFinishingState?.EndTime,
    },
  ];

  const boxFinishingTimesArr = [
    {
      start: currentTrailer?.partKits?.boxFinishingState?.StartTime,
      end: currentTrailer?.partKits?.boxFinishingState?.EndTime,
    },
    {
      start: currentTrailer?.boxFinishingState?.StartTime,
      end: currentTrailer?.boxFinishingState?.EndTime,
    },
    {
      start: currentTrailer?.installHopperDoorsState?.StartTime,
      end: currentTrailer?.installHopperDoorsState?.EndTime,
    },
    {
      start: currentTrailer?.installFramesState?.StartTime,
      end: currentTrailer?.installFramesState?.EndTime,
    },
  ];

  const qualityInspectionTimesArr = [
    {
      start: currentTrailer?.qualityInspection?.initialInspection?.startTime,
      end: currentTrailer?.qualityInspection?.initialInspection?.endTime,
    },
    {
      start: currentTrailer?.qualityInspection?.finalCheckStartingDate,
      end: currentTrailer?.qualityInspection?.finalCheckCompletedDate,
    },
  ];

  const wallsTimesArr = [];
  currentTrailer?.walls?.map((wall) => {
    wallsTimesArr.push({
      start: wall.startedDate,
      end: wall.completedDate,
    });
  });

  const trailerProgressLevel =
    (props.renderSectionStatus(frontFrameTimesArr) === "Completed" ? 9 : 0) +
    (props.renderSectionStatus(rearFrameTimesArr) === "Completed" ? 6 : 0) +
    (props.renderSectionStatus(wallsTimesArr) === "Completed" ? 18 : 0) +
    (props.renderSectionStatus(boxStage1TimesArr) === "Completed" ? 5 : 0) +
    (props.renderSectionStatus(boxStage2TimesArr) === "Completed" ? 5 : 0) +
    (props.renderSectionStatus(boxStage3TimesArr) === "Completed" ? 5 : 0) +
    (props.renderSectionStatus(boxStage4TimesArr) === "Completed" ? 5 : 0) +
    (props.renderSectionStatus(smallPartsTimesArr) === "Completed" ? 8 : 0) +
    (props.renderSectionStatus(boxFinishingTimesArr) === "Completed" ? 10 : 0) +
    (props.renderSectionStatus(frontFrameFinishingTimesArr) === "Completed"
      ? 12
      : 0) +
    (props.renderSectionStatus(rearFrameFinishingTimesArr) === "Completed"
      ? 14
      : 0) +
    (props.renderSectionStatus(qualityInspectionTimesArr) === "Completed"
      ? 3
      : 0);

  const handleToggleComplete = async () => {
    const id = currentTrailer?._id;

    if (!id) {
      handleActiveAlert(true, "error", "Trailer ID is missing.");
      return;
    }

    const updates = {
      completed: !currentTrailer?.completed,
      completedDate: !currentTrailer?.completed
        ? selectedCompletionDate
          ? selectedCompletionDate.toISOString()
          : new Date().toISOString() // Use the selected date if provided
        : null, // Remove date when marking as incomplete
    };

    try {
      const response = await fetch("/api/planning/create-trailer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, updates }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to toggle completion status.");
      }

      handleActiveAlert(
        true,
        "success",
        updates.completed
          ? "Trailer marked as complete."
          : "Trailer marked as incomplete."
      );

      setCurrentTrailer((prev) => ({
        ...prev,
        ...updates,
      }));

    } catch (error) {
      console.error("Error toggling completion status:", error);
      handleActiveAlert(true, "error", error.message);
    }
  };

  const handleConfirmCompletionDate = async () => {
    const id = currentTrailer?._id;

    if (!id) {
      handleActiveAlert(true, "error", "Trailer ID is missing.");
      return;
    }
    console.log("SELCTED?", selectedCompletionDate);

    const updates = {
      completedDate: selectedCompletionDate ? new Date(selectedCompletionDate).toISOString() : null,
    };

    try {
      const response = await fetch("/api/planning/create-trailer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, updates }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update the completion date.");
      }

      handleActiveAlert(true, "success", "Completion date updated.");

      setCurrentTrailer((prev) => ({
        ...prev,
        ...updates,
      }));
    } catch (error) {
      console.error("Error updating completion date:", error);
      handleActiveAlert(true, "error", error.message);
    }
  };



  const getEarliestStartTime = (timesArr) => {
    const startTimes = [];
    timesArr.forEach((time) => {
      if (time.start) {
        let startTime = time.start;

        // Check if startTime is a string and can be converted to a valid number
        if (typeof startTime === "string" && !isNaN(Number(startTime))) {
          startTime = Number(startTime);
        }

        startTimes.push(new Date(startTime));
      }
    });

    const orderedDates = startTimes.sort(function (a, b) {
      return Date.parse(a) - Date.parse(b);
    });

    return orderedDates[0]?.toISOString();
  };

  const getLatestStartTime = (timesArr) => {
    const endTimes = [];
    timesArr.forEach((time) => {
      if (time.start) {
        endTimes.push(new Date(time.end));
      }
    });
    const orderedDates = endTimes.sort(function (a, b) {
      return Date.parse(b) - Date.parse(a);
    });

    if (props.renderSectionStatus(timesArr) === "Completed") {
      return orderedDates[0]?.toISOString();
    }
  };

  //   getEarliestStartTime(frontFrameTimesArr);

  const dateReqFrameGalvanized = subBusinessDays(
    currentTrailer?.dateRequired,
    10
  );

  const dateReqFrameBuild = subBusinessDays(currentTrailer?.dateRequired, 15);
  const dateReqFrameParts = subBusinessDays(currentTrailer?.dateRequired, 16);

  const dateReqBoxStage1 = subBusinessDays(currentTrailer?.dateRequired, 12);
  const dateReqBoxStage2 = subBusinessDays(currentTrailer?.dateRequired, 11);
  const dateReqBoxStage3 = subBusinessDays(currentTrailer?.dateRequired, 10);
  const dateReqBoxStage4 = subBusinessDays(currentTrailer?.dateRequired, 9);

  const dateReqBoxStage1Parts = subBusinessDays(
    currentTrailer?.dateRequired,
    13
  );
  const dateReqBoxStage2Parts = subBusinessDays(
    currentTrailer?.dateRequired,
    12
  );
  const dateReqBoxStage3Parts = subBusinessDays(
    currentTrailer?.dateRequired,
    11
  );
  const dateReqBoxStage4Parts = subBusinessDays(
    currentTrailer?.dateRequired,
    10
  );

  const dateReqSmallPartsParts = subBusinessDays(
    currentTrailer?.dateRequired,
    12
  );
  const dateReqSmallParts = subBusinessDays(currentTrailer?.dateRequired, 11);
  const dateReqBoxFinishingParts = subBusinessDays(
    currentTrailer?.dateRequired,
    8
  );
  const dateReqBoxFinishing = subBusinessDays(currentTrailer?.dateRequired, 7);
  const dateReqFrontFrameFinishingParts = subBusinessDays(
    currentTrailer?.dateRequired,
    6
  );
  const dateReqFrontFrameFinishing = subBusinessDays(
    currentTrailer?.dateRequired,
    5
  );
  const dateReqRearFrameFinishingParts = subBusinessDays(
    currentTrailer?.dateRequired,
    4
  );
  const dateReqRearFrameFinishing = subBusinessDays(
    currentTrailer?.dateRequired,
    3
  );

  const dateReqInstallFrames = subBusinessDays(currentTrailer?.dateRequired, 7);
  const dateReqInstallDoors = subBusinessDays(currentTrailer?.dateRequired, 7);
  const dateReqQualityInspection = subBusinessDays(
    currentTrailer?.dateRequired,
    2
  );

  const dateReqWalls = subBusinessDays(currentTrailer?.dateRequired, 12);

  if (isLoading) {
    return (
      <React.Fragment>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={props.openTrailerProgress}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {`Trailer Progress`}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={props.handleCloseTrailerProgress}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box
              sx={{
                display: "flex",
                width: 1,
                // minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "red",
                minHeight: "100%",
                minHeight: "70vh",
              }}
            >
              <CircularProgress
                size={65}
                thickness={4}
                sx={{
                  color: "primary",
                }}
              />
            </Box>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        // onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openTrailerProgress}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            pb: 0,

            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          id="customized-dialog-title"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "1.4rem", fontWeight: "600", mb: 1 }}>
              {currentTrailer?.trailerType} | WO: {currentTrailer?.workOrder}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "600",
                mb: 1,
                ml: 8,
                mr: 2,
              }}
            >
              Trailer Progress:
            </Typography>
            <CircularProgressForTrailers
              value={trailerProgressLevel}
              size="2.6rem"
              font="0.75rem"
            />
          </Box>

          <ProcessTableTitles />

        </DialogTitle>

        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "0.4rem",
            zIndex: "100",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {alerts.map((alert) => (
            <Collapse key={alert.id} in={true}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => removeAlert(alert.id)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity={alert.type}
                sx={{ mb: 2 }}
              >
                {alert.message}
              </Alert>
            </Collapse>
          ))}
        </Box>

        <IconButton
          aria-label="close"
          onClick={props.handleCloseTrailerProgress}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              width: "80.8rem",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",

              // bgcolor: "red",
            }}
          >
            <Box
              sx={{
                mt: -2,
                maxHeight: frontFrameOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(frontFrameTimesArr)}
                end={getLatestStartTime(frontFrameTimesArr)}
                status={props.renderSectionStatus(frontFrameTimesArr)}
                title={"Front Frame"}
                handleOpenProcesses={handleFrontFrameOpened}
                openState={frontFrameOpened}
                url={"/frames"}
                dateReq={dateReqFrameGalvanized}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.partKits?.frontFrameState?.StartTime}
                end={currentTrailer?.partKits?.frontFrameState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.frontFrameState?.StartTime,
                  currentTrailer?.partKits?.frontFrameState?.EndTime
                )}
                dateReq={dateReqFrameParts}
                // timer={currentTrailer?.partKits?.frontFrameState?.Time}
                title={"Manufacture Parts Kit"}
                processTitle={"Front Frame"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.frontFrameTimeData?.startDate}
                end={currentTrailer?.frontFrameTimeData?.completedDate}
                status={props.renderStatus(
                  currentTrailer?.frontFrameTimeData?.startDate,
                  currentTrailer?.frontFrameTimeData?.completedDate
                )}
                dateReq={dateReqFrameBuild}
                // timer={currentTrailer?.frontFrameState?.Time}
                title={"Build Frame"}
                processTitle={"Front Frame"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.frontFrameTimeData?.finishingStartTime}
                end={currentTrailer?.frontFrameTimeData?.finishingEndTime}
                status={props.renderStatus(
                  currentTrailer?.frontFrameTimeData?.finishingStartTime,
                  currentTrailer?.frontFrameTimeData?.finishingEndTime
                )}
                dateReq={dateReqFrameGalvanized}
                title={"Surface Treatment"}
                processTitle={"Front Frame"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: rearFrameOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(rearFrameTimesArr)}
                end={getLatestStartTime(rearFrameTimesArr)}
                status={props.renderSectionStatus(rearFrameTimesArr)}
                title={"Rear Frame"}
                openState={rearFrameOpened}
                handleOpenProcesses={handleRearFrameOpened}
                url={"/frames"}
                dateReq={dateReqFrameGalvanized}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.partKits?.rearFrameState?.StartTime}
                end={currentTrailer?.partKits?.rearFrameState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.rearFrameState?.StartTime,
                  currentTrailer?.partKits?.rearFrameState?.EndTime
                )}
                dateReq={dateReqFrameParts}
                title={"Manufacture Parts Kit"}
                processTitle={"Rear Frame"}
              />

              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.rearFrameTimeData?.startDate}
                end={currentTrailer?.rearFrameTimeData?.completedDate}
                status={props.renderStatus(
                  currentTrailer?.rearFrameTimeData?.startDate,
                  currentTrailer?.rearFrameTimeData?.completedDate
                )}
                dateReq={dateReqFrameBuild}
                title={"Build Frame"}
                processTitle={"Rear Frame"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.rearFrameTimeData?.finishingStartTime}
                end={currentTrailer?.rearFrameTimeData?.finishingEndTime}
                status={props.renderStatus(
                  currentTrailer?.rearFrameTimeData?.finishingStartTime,
                  currentTrailer?.rearFrameTimeData?.finishingEndTime
                )}
                dateReq={dateReqFrameGalvanized}
                title={"Surface Treatment"}
                processTitle={"Rear Frame"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: wallsOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(wallsTimesArr)}
                end={getLatestStartTime(wallsTimesArr)}
                status={props.renderSectionStatus(wallsTimesArr)}
                openState={wallsOpened}
                handleOpenProcesses={handleWallsOpened}
                title={"Walls"}
                url={"/walls"}
                dateReq={dateReqWalls}
              />

              {currentTrailer?.walls?.map((wall, index) => {
                return (
                  <ProcessSteps
                    handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                    handleCurrentTrailerSet={handleCurrentTrailerSet}
                    currentTrailer={currentTrailer}
                    handleActiveAlert={handleActiveAlert}
                    key={122 + index}
                    start={wall.startedDate}
                    end={wall.completedDate}
                    status={props.renderStatus(
                      wall.startedDate,
                      wall.completedDate
                    )}
                    title={wall.wallType}
                    processTitle={"Walls"}
                    dateReq={dateReqWalls}
                  />
                );
              })}
            </Box>

            <Box
              sx={{
                maxHeight: boxStage1Opened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(boxStage1TimesArr)}
                end={getLatestStartTime(boxStage1TimesArr)}
                status={props.renderSectionStatus(boxStage1TimesArr)}
                title={"Box - Stage 1"}
                openState={boxStage1Opened}
                handleOpenProcesses={handleBoxStage1Opened}
                url={"/boxes"}
                dateReq={dateReqBoxStage1}
              />

              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.partKits?.boxStage1State?.StartTime}
                end={currentTrailer?.partKits?.boxStage1State?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.boxStage1State?.StartTime,
                  currentTrailer?.partKits?.boxStage1State?.EndTime
                )}
                dateReq={dateReqBoxStage1Parts}
                title={"Manufacture Parts Kit"}
                processTitle={"Boxes - Stage 1"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.boxData?.stages[0]?.startedDate}
                end={currentTrailer?.boxData?.stages[0]?.completedDate}
                status={props.renderStatus(
                  currentTrailer?.boxData?.stages[0]?.startedDate,
                  currentTrailer?.boxData?.stages[0]?.completedDate
                )}
                dateReq={dateReqBoxStage1}
                title={"Install Parts"}
                processTitle={"Boxes - Stage 1"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: boxStage2Opened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(boxStage2TimesArr)}
                end={getLatestStartTime(boxStage2TimesArr)}
                status={props.renderSectionStatus(boxStage2TimesArr)}
                title={"Box - Stage 2"}
                openState={boxStage2Opened}
                handleOpenProcesses={handleBoxStage2Opened}
                url={"/boxes"}
                dateReq={dateReqBoxStage2}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.partKits?.boxStage2State?.StartTime}
                end={currentTrailer?.partKits?.boxStage2State?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.boxStage2State?.StartTime,
                  currentTrailer?.partKits?.boxStage2State?.EndTime
                )}
                dateReq={dateReqBoxStage2Parts}
                title={"Manufacture Parts Kit"}
                processTitle={"Boxes - Stage 2"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.boxData?.stages[1]?.startedDate}
                end={currentTrailer?.boxData?.stages[1]?.completedDate}
                status={props.renderStatus(
                  currentTrailer?.boxData?.stages[1]?.startedDate,
                  currentTrailer?.boxData?.stages[1]?.completedDate
                )}
                openState={boxStage3Opened}
                handleOpenProcesses={handleBoxStage3Opened}
                dateReq={dateReqBoxStage2}
                title={"Install Parts"}
                processTitle={"Boxes - Stage 2"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: boxStage3Opened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(boxStage3TimesArr)}
                end={getLatestStartTime(boxStage3TimesArr)}
                status={props.renderSectionStatus(boxStage3TimesArr)}
                title={"Box - Stage 3"}
                openState={boxStage3Opened}
                handleOpenProcesses={handleBoxStage3Opened}
                url={"/boxes"}
                dateReq={dateReqBoxStage3}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.partKits?.boxStage3State?.StartTime}
                end={currentTrailer?.partKits?.boxStage3State?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.boxStage3State?.StartTime,
                  currentTrailer?.partKits?.boxStage3State?.EndTime
                )}
                dateReq={dateReqBoxStage3Parts}
                title={"Manufacture Parts Kit"}
                processTitle={"Boxes - Stage 3"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.boxData?.stages[2]?.startedDate}
                end={currentTrailer?.boxData?.stages[2]?.completedDate}
                status={props.renderStatus(
                  currentTrailer?.boxData?.stages[2]?.startedDate,
                  currentTrailer?.boxData?.stages[2]?.completedDate
                )}
                title={"Install Parts"}
                dateReq={dateReqBoxStage3}
                processTitle={"Boxes - Stage 3"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: boxStage4Opened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(boxStage4TimesArr)}
                end={getLatestStartTime(boxStage4TimesArr)}
                status={props.renderSectionStatus(boxStage4TimesArr)}
                title={"Box - Stage 4"}
                openState={boxStage4Opened}
                handleOpenProcesses={handleBoxStage4Opened}
                url={"/boxes"}
                dateReq={dateReqBoxStage4}
              />
              <ProcessSteps
                handleIsLoading={handleIsLoading}
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.partKits?.boxStage4State?.StartTime}
                end={currentTrailer?.partKits?.boxStage4State?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.boxStage4State?.StartTime,
                  currentTrailer?.partKits?.boxStage4State?.EndTime
                )}
                dateReq={dateReqBoxStage4Parts}
                title={"Manufacture Parts Kit"}
                processTitle={"Boxes - Stage 4"}
              />
              <ProcessSteps
                handleIsLoading={handleIsLoading}
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.boxData?.stages[3]?.startedDate}
                end={currentTrailer?.boxData?.stages[3]?.completedDate}
                status={props.renderStatus(
                  currentTrailer?.boxData?.stages[3]?.startedDate,
                  currentTrailer?.boxData?.stages[3]?.completedDate
                )}
                title={"Install Parts"}
                dateReq={dateReqBoxStage4}
                processTitle={"Boxes - Stage 4"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: smallPartsOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(smallPartsTimesArr)}
                end={getLatestStartTime(smallPartsTimesArr)}
                status={props.renderSectionStatus(smallPartsTimesArr)}
                title={"Small Parts"}
                openState={smallPartsOpened}
                handleOpenProcesses={handleSmallPartsOpened}
                url={"/smallparts"}
                dateReq={dateReqSmallParts}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={
                  currentTrailer?.partKits?.smallPartsStageState?.StartTime
                }
                end={currentTrailer?.partKits?.smallPartsStageState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.smallPartsStageState?.StartTime,
                  currentTrailer?.partKits?.smallPartsStageState?.EndTime
                )}
                title={"Manufacture Parts Kit"}
                dateReq={dateReqSmallPartsParts}
                processTitle={"Small Parts"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.hopperDoorsFront?.StartTime}
                end={currentTrailer?.hopperDoorsFront?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.hopperDoorsFront?.StartTime,
                  currentTrailer?.hopperDoorsFront?.EndTime
                )}
                title={"Build Front Hopper Door"}
                dateReq={dateReqSmallParts}
                processTitle={"Small Parts"}
              />

              {currentTrailer?.trailerType === "Tri 61' 3 Hoppers" && (
                <ProcessSteps
                  handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                  handleCurrentTrailerSet={handleCurrentTrailerSet}
                  currentTrailer={currentTrailer}
                  handleActiveAlert={handleActiveAlert}
                  start={currentTrailer?.hopperDoorsMiddle?.StartTime}
                  end={currentTrailer?.hopperDoorsMiddle?.EndTime}
                  status={props.renderStatus(
                    currentTrailer?.hopperDoorsMiddle?.StartTime,
                    currentTrailer?.hopperDoorsMiddle?.EndTime
                  )}
                  title={"Build Middle Hopper Door"}
                  dateReq={dateReqSmallParts}
                  processTitle={"Small Parts"}
                />
              )}
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.hopperDoorsRear?.StartTime}
                end={currentTrailer?.hopperDoorsRear?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.hopperDoorsRear?.StartTime,
                  currentTrailer?.hopperDoorsRear?.EndTime
                )}
                title={"Build Rear Hopper Door"}
                dateReq={dateReqSmallParts}
                processTitle={"Small Parts"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: boxFinishingOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(boxFinishingTimesArr)}
                end={getLatestStartTime(boxFinishingTimesArr)}
                status={props.renderSectionStatus(boxFinishingTimesArr)}
                title={"Box Finishing"}
                openState={boxFinishingOpened}
                handleOpenProcesses={handleBoxFinishingOpened}
                url={"/finishing"}
                dateReq={dateReqBoxFinishing}
              />

              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.partKits?.boxFinishingState?.StartTime}
                end={currentTrailer?.partKits?.boxFinishingState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.boxFinishingState?.StartTime,
                  currentTrailer?.partKits?.boxFinishingState?.EndTime
                )}
                dateReq={dateReqBoxFinishingParts}
                title={"Manufacture Parts Kit"}
                processTitle={"Box Finishing"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.installHopperDoorsState?.StartTime}
                end={currentTrailer?.installHopperDoorsState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.installHopperDoorsState?.StartTime,
                  currentTrailer?.installHopperDoorsState?.EndTime
                )}
                dateReq={dateReqInstallDoors}
                title={"Install Hopper Doors"}
                processTitle={"Box Finishing"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.installFramesState?.StartTime}
                end={currentTrailer?.installFramesState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.installFramesState?.StartTime,
                  currentTrailer?.installFramesState?.EndTime
                )}
                dateReq={dateReqInstallFrames}
                title={"Install Frames"}
                processTitle={"Box Finishing"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.boxFinishingState?.StartTime}
                end={currentTrailer?.boxFinishingState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.boxFinishingState?.StartTime,
                  currentTrailer?.boxFinishingState?.EndTime
                )}
                dateReq={dateReqBoxFinishing}
                title={"Install Parts"}
                processTitle={"Box Finishing"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: frontFrameFinishingOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(frontFrameFinishingTimesArr)}
                end={getLatestStartTime(frontFrameFinishingTimesArr)}
                status={props.renderSectionStatus(frontFrameFinishingTimesArr)}
                title={"Front Frame Finishing"}
                openState={frontFrameFinishingOpened}
                handleOpenProcesses={handleFrontFrameFinishingOpened}
                url={"/finishing"}
                dateReq={dateReqFrontFrameFinishing}
              />

              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={
                  currentTrailer?.partKits?.frontFrameFinishingState?.StartTime
                }
                end={
                  currentTrailer?.partKits?.frontFrameFinishingState?.EndTime
                }
                status={props.renderStatus(
                  currentTrailer?.partKits?.frontFrameFinishingState?.StartTime,
                  currentTrailer?.partKits?.frontFrameFinishingState?.EndTime
                )}
                dateReq={dateReqFrontFrameFinishingParts}
                title={"Manufacture Parts Kit"}
                processTitle={"Front Frame Finishing"}
              />

              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.frontFrameFinishingState?.StartTime}
                end={currentTrailer?.frontFrameFinishingState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.frontFrameFinishingState?.StartTime,
                  currentTrailer?.frontFrameFinishingState?.EndTime
                )}
                title={"Install Parts"}
                dateReq={dateReqFrontFrameFinishing}
                processTitle={"Front Frame Finishing"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: rearFrameFinishingOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(rearFrameFinishingTimesArr)}
                end={getLatestStartTime(rearFrameFinishingTimesArr)}
                status={props.renderSectionStatus(rearFrameFinishingTimesArr)}
                title={"Rear Frame Finishing"}
                openState={rearFrameFinishingOpened}
                handleOpenProcesses={handleRearFrameFinishingOpened}
                url={"/finishing"}
                dateReq={dateReqRearFrameFinishing}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={
                  currentTrailer?.partKits?.rearFrameFinishingState?.StartTime
                }
                end={currentTrailer?.partKits?.rearFrameFinishingState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.partKits?.rearFrameFinishingState?.StartTime,
                  currentTrailer?.partKits?.rearFrameFinishingState?.EndTime
                )}
                dateReq={dateReqRearFrameFinishingParts}
                title={"Manufacture Parts Kit"}
                processTitle={"Rear Frame Finishing"}
              />

              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={currentTrailer?.rearFrameFinishingState?.StartTime}
                end={currentTrailer?.rearFrameFinishingState?.EndTime}
                status={props.renderStatus(
                  currentTrailer?.rearFrameFinishingState?.StartTime,
                  currentTrailer?.rearFrameFinishingState?.EndTime
                )}
                title={"Install Parts"}
                dateReq={dateReqRearFrameFinishing}
                processTitle={"Rear Frame Finishing"}
              />
            </Box>
            <Box
              sx={{
                maxHeight: qualityInspectionOpened ? "unset" : "3rem",
                padding: 0,
                overflowY: "hidden",
                width: "100%",
              }}
            >
              <ProcessTitles
                start={getEarliestStartTime(qualityInspectionTimesArr)}
                end={getLatestStartTime(qualityInspectionTimesArr)}
                status={props.renderSectionStatus(qualityInspectionTimesArr)}
                title={"Quality Inspection"}
                openState={qualityInspectionOpened}
                handleOpenProcesses={handleQualityInspectionOpened}
                url={"/qc"}
                dateReq={dateReqQualityInspection}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={
                  currentTrailer?.qualityInspection?.initialInspection
                    ?.startTime
                }
                end={
                  currentTrailer?.qualityInspection?.initialInspection?.endTime
                }
                status={props.renderStatus(
                  currentTrailer?.qualityInspection?.initialInspection
                    ?.startTime,
                  currentTrailer?.qualityInspection?.initialInspection?.endTime
                )}
                title={"Initial Quality Inspection"}
                dateReq={dateReqQualityInspection}
                processTitle={"Quality Inspection"}
              />
              <ProcessSteps
                handleCurrentTrailerUpload={handleCurrentTrailerUpload}
                handleCurrentTrailerSet={handleCurrentTrailerSet}
                currentTrailer={currentTrailer}
                handleActiveAlert={handleActiveAlert}
                start={
                  currentTrailer?.qualityInspection?.finalCheckStartingDate
                }
                end={currentTrailer?.qualityInspection?.finalCheckCompletedDate}
                status={props.renderStatus(
                  currentTrailer?.qualityInspection?.finalCheckStartingDate,
                  currentTrailer?.qualityInspection?.finalCheckCompletedDate
                )}
                title={"Deviation Quality Inspection"}
                dateReq={dateReqQualityInspection}
                processTitle={"Quality Inspection"}
              />
            </Box>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color={currentTrailer?.completed ? "error" : "success"}
                onClick={handleToggleComplete}
                size="large"
              >
                {currentTrailer?.completed ? "Mark as Uncomplete" : "Mark as Complete"}
              </Button>

              {currentTrailer?.completed && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Completion Date/Time
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DateTimePicker
    label="Completion Date & Time"
    value={
      selectedCompletionDate 
        ? new Date(selectedCompletionDate) 
        : currentTrailer?.completedDate 
        ? new Date(currentTrailer.completedDate) 
        : new Date() // Fallback to current date if neither is available
    }
    onChange={(newValue) => setSelectedCompletionDate(newValue)}
    slots={{ textField: (params) => <TextField {...params} /> }}
  />
</LocalizationProvider>

                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleConfirmCompletionDate}>
                      Confirm Completion Date
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>


          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
