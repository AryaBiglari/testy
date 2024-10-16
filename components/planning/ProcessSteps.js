import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  differenceInHours,
  differenceInBusinessDays,
  subBusinessDays,
  isPast,
} from "date-fns";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: "40%",
    maxWidth: "40%",
    minHeight: "14rem",
  },
  "& .css-uhb5lp": {
    minWidth: "40%",
    maxWidth: "40%",
    minHeight: "14rem",
  },
  "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
    {
      minWidth: "40%",
      maxWidth: "40%",
      minHeight: "14rem",
    },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ProcessSteps(props) {
  const dateReqColor = (dateReq) => {
    if (isPast(dateReq)) {
      return "var(--error)";
    } else if (isPast(subBusinessDays(dateReq, 2))) {
      return "var(--datewarning)";
    } else return "var(--secondary)";
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [undoAction, setUndoAction] = React.useState(() => () => {});
  const [dialogProcessTitle, setDialogProcessTitle] = React.useState("");
  const [dialogStepTitle, setDialogStepTitle] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [isEditingStart, setIsEditingStart] = React.useState(false);
  const [isEditingEnd, setIsEditingEnd] = React.useState(false);
  const [editedStartDate, setEditedStartDate] = React.useState(null);
  const [editedEndDate, setEditedEndDate] = React.useState(null);

  const handleStartDateDoubleClick = () => {
    setEditedStartDate(props.start ? new Date(props.start) : new Date());
    setIsEditingStart(true);
  };

  const handleEndDateDoubleClick = () => {
    setEditedEndDate(props.end ? new Date(props.end) : new Date());
    setIsEditingEnd(true);
  };

  const handleStartDateChange = (newValue) => {
    setEditedStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEditedEndDate(newValue);
  };

  const safeSet = (obj, path, value) => {
    const keys = path.split(".");
    let current = obj;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        }
        current = current[key];
      }
    });
  };

  const updateStartDate = async () => {
    try {
      const updatedTrailer = { ...props.currentTrailer };

      if (props.processTitle === "Front Frame") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.frontFrameState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Build Frame") {
          safeSet(
            updatedTrailer,
            "frontFrameTimeData.startDate",
            editedStartDate
          );
        } else if (props.title === "Surface Treatment") {
          safeSet(
            updatedTrailer,
            "frontFrameTimeData.finishingStartTime",
            editedStartDate
          );
        }
      } else if (props.processTitle === "Rear Frame") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.rearFrameState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Build Frame") {
          safeSet(
            updatedTrailer,
            "rearFrameTimeData.startDate",
            editedStartDate
          );
        } else if (props.title === "Surface Treatment") {
          safeSet(
            updatedTrailer,
            "rearFrameTimeData.finishingStartTime",
            editedStartDate
          );
        }
      } else if (props.processTitle.includes("Boxes - Stage")) {
        const stageNumber = parseInt(props.processTitle.split("Stage ")[1]) - 1;
        const stageKey = `boxStage${stageNumber + 1}State`;
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            `partKits.${stageKey}.StartTime`,
            editedStartDate
          );
        } else if (props.title === "Install Parts") {
          if (!updatedTrailer.boxData) {
            updatedTrailer.boxData = { stages: [] };
          }
          if (!updatedTrailer.boxData.stages[stageNumber]) {
            updatedTrailer.boxData.stages[stageNumber] = {};
          }
          safeSet(
            updatedTrailer,
            `boxData.stages.${stageNumber}.startedDate`,
            editedStartDate
          );
        }
      } else if (props.processTitle === "Small Parts") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.smallPartsStageState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Build Front Hopper Door") {
          safeSet(
            updatedTrailer,
            "hopperDoorsFront.StartTime",
            editedStartDate
          );
        } else if (props.title === "Build Middle Hopper Door") {
          safeSet(
            updatedTrailer,
            "hopperDoorsMiddle.StartTime",
            editedStartDate
          );
        } else if (props.title === "Build Rear Hopper Door") {
          safeSet(updatedTrailer, "hopperDoorsRear.StartTime", editedStartDate);
        }
      } else if (props.processTitle === "Walls") {
        const wallIndex = props.currentTrailer.walls.findIndex(
          (wall) => wall.wallType === props.title
        );
        if (wallIndex !== -1) {
          safeSet(
            updatedTrailer,
            `walls.${wallIndex}.startedDate`,
            editedStartDate
          );
        }
      } else if (props.processTitle === "Box Finishing") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.boxFinishingState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Install Hopper Doors") {
          safeSet(
            updatedTrailer,
            "installHopperDoorsState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Install Frames") {
          safeSet(
            updatedTrailer,
            "installFramesState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Install Parts") {
          safeSet(
            updatedTrailer,
            "boxFinishingState.StartTime",
            editedStartDate
          );
        }
      } else if (props.processTitle === "Front Frame Finishing") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.frontFrameFinishingState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Install Parts") {
          safeSet(
            updatedTrailer,
            "frontFrameFinishingState.StartTime",
            editedStartDate
          );
        }
      } else if (props.processTitle === "Rear Frame Finishing") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.rearFrameFinishingState.StartTime",
            editedStartDate
          );
        } else if (props.title === "Install Parts") {
          safeSet(
            updatedTrailer,
            "rearFrameFinishingState.StartTime",
            editedStartDate
          );
        }
      } else if (props.processTitle === "Quality Inspection") {
        if (props.title === "Initial Quality Inspection") {
          safeSet(
            updatedTrailer,
            "qualityInspection.initialInspection.startTime",
            editedStartDate
          );
        } else if (props.title === "Deviation Quality Inspection") {
          safeSet(
            updatedTrailer,
            "qualityInspection.finalCheckStartingDate",
            editedStartDate
          );
        }
      }

      let response = await props.handleCurrentTrailerUpload(updatedTrailer);
      if (!response.ok) {
        props.handleActiveAlert(true, "error", "Failed to update start date");
      } else {
        props.handleActiveAlert(
          true,
          "success",
          "Start date updated successfully"
        );
        props.handleCurrentTrailerSet(updatedTrailer);
      }
    } catch (error) {
      console.error("Error updating start date:", error);
      props.handleActiveAlert(
        true,
        "error",
        "An error occurred while updating"
      );
    } finally {
      setIsEditingStart(false);
    }
  };

  const updateEndDate = async () => {
    try {
      const updatedTrailer = { ...props.currentTrailer };

      if (props.processTitle === "Front Frame") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.frontFrameState.EndTime",
            editedEndDate
          );
        } else if (props.title === "Build Frame") {
          safeSet(
            updatedTrailer,
            "frontFrameTimeData.completedDate",
            editedEndDate
          );
        } else if (props.title === "Surface Treatment") {
          safeSet(
            updatedTrailer,
            "frontFrameTimeData.finishingEndTime",
            editedEndDate
          );
        }
      } else if (props.processTitle === "Rear Frame") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.rearFrameState.EndTime",
            editedEndDate
          );
        } else if (props.title === "Build Frame") {
          safeSet(
            updatedTrailer,
            "rearFrameTimeData.completedDate",
            editedEndDate
          );
        } else if (props.title === "Surface Treatment") {
          safeSet(
            updatedTrailer,
            "rearFrameTimeData.finishingEndTime",
            editedEndDate
          );
        }
      } else if (props.processTitle.includes("Boxes - Stage")) {
        const stageNumber = parseInt(props.processTitle.split("Stage ")[1]) - 1;
        const stageKey = `boxStage${stageNumber + 1}State`;
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            `partKits.${stageKey}.EndTime`,
            editedEndDate
          );
        } else if (props.title === "Install Parts") {
          if (!updatedTrailer.boxData) {
            updatedTrailer.boxData = { stages: [] };
          }
          if (!updatedTrailer.boxData.stages[stageNumber]) {
            updatedTrailer.boxData.stages[stageNumber] = {};
          }
          safeSet(
            updatedTrailer,
            `boxData.stages.${stageNumber}.completedDate`,
            editedEndDate
          );
        }
      } else if (props.processTitle === "Small Parts") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.smallPartsStageState.EndTime",
            editedEndDate
          );
        } else if (props.title === "Build Front Hopper Door") {
          safeSet(updatedTrailer, "hopperDoorsFront.EndTime", editedEndDate);
        } else if (props.title === "Build Middle Hopper Door") {
          safeSet(updatedTrailer, "hopperDoorsMiddle.EndTime", editedEndDate);
        } else if (props.title === "Build Rear Hopper Door") {
          safeSet(updatedTrailer, "hopperDoorsRear.EndTime", editedEndDate);
        }
      } else if (props.processTitle === "Walls") {
        const wallIndex = props.currentTrailer.walls.findIndex(
          (wall) => wall.wallType === props.title
        );
        if (wallIndex !== -1) {
          safeSet(
            updatedTrailer,
            `walls.${wallIndex}.completedDate`,
            editedEndDate
          );
        }
      } else if (props.processTitle === "Box Finishing") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.boxFinishingState.EndTime",
            editedEndDate
          );
        } else if (props.title === "Install Hopper Doors") {
          safeSet(
            updatedTrailer,
            "installHopperDoorsState.EndTime",
            editedEndDate
          );
        } else if (props.title === "Install Frames") {
          safeSet(updatedTrailer, "installFramesState.EndTime", editedEndDate);
        } else if (props.title === "Install Parts") {
          safeSet(updatedTrailer, "boxFinishingState.EndTime", editedEndDate);
        }
      } else if (props.processTitle === "Front Frame Finishing") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.frontFrameFinishingState.EndTime",
            editedEndDate
          );
        } else if (props.title === "Install Parts") {
          safeSet(
            updatedTrailer,
            "frontFrameFinishingState.EndTime",
            editedEndDate
          );
        }
      } else if (props.processTitle === "Rear Frame Finishing") {
        if (props.title === "Manufacture Parts Kit") {
          safeSet(
            updatedTrailer,
            "partKits.rearFrameFinishingState.EndTime",
            editedEndDate
          );
        } else if (props.title === "Install Parts") {
          safeSet(
            updatedTrailer,
            "rearFrameFinishingState.EndTime",
            editedEndDate
          );
        }
      } else if (props.processTitle === "Quality Inspection") {
        if (props.title === "Initial Quality Inspection") {
          safeSet(
            updatedTrailer,
            "qualityInspection.initialInspection.endTime",
            editedEndDate
          );
        } else if (props.title === "Deviation Quality Inspection") {
          safeSet(
            updatedTrailer,
            "qualityInspection.finalCheckCompletedDate",
            editedEndDate
          );
        }
      }

      let response = await props.handleCurrentTrailerUpload(updatedTrailer);
      if (!response.ok) {
        props.handleActiveAlert(true, "error", "Failed to update end date");
      } else {
        props.handleActiveAlert(
          true,
          "success",
          "End date updated successfully"
        );
        props.handleCurrentTrailerSet(updatedTrailer);
      }
    } catch (error) {
      console.error("Error updating end date:", error);
      props.handleActiveAlert(
        true,
        "error",
        "An error occurred while updating"
      );
    } finally {
      setIsEditingEnd(false);
    }
  };

  const handleStartDateBlur = () => {
    updateStartDate();
  };

  const handleEndDateBlur = () => {
    updateEndDate();
  };

  const handleOpenDialog = (action, processTitle, stepTitle) => {
    setUndoAction(() => action);
    setDialogProcessTitle(processTitle);
    setDialogStepTitle(stepTitle);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPassword("");
    setErrorMessage("");
  };

  const handleConfirmUndo = () => {
    if (password === process.env.deletePartPassword) {
      undoAction();
      handleCloseDialog();
    } else {
      setErrorMessage("Incorrect password");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const undoFrameBuild = async (currentTrailer, processTitle) => {
    console.log("asdfsd");
    const frame = processTitle?.slice(0, 1) === "F" ? "front" : "rear";
    const currentTrailerCopy = structuredClone(currentTrailer);
    const frameKey = `${frame}FrameTimeData`;

    if (currentTrailer[frameKey]?.finishingStartTime) {
      props.handleActiveAlert(
        true,
        "error",
        "The finishing must be undone first"
      );
      return;
    }

    currentTrailer[frameKey].status = "";
    currentTrailer[frameKey].currentLogStartTime = "";
    currentTrailer[frameKey].startDate = "";
    currentTrailer[frameKey].completedDate = "";
    currentTrailer[frameKey].activeEmployees = [];
    currentTrailer[frameKey].employeeLogs = [];

    let response = await props.handleCurrentTrailerUpload(currentTrailer);

    if (!response.ok) {
      console.log(currentTrailer, currentTrailerCopy);
      currentTrailer = { ...currentTrailerCopy };
      props.handleCurrentTrailerSet(currentTrailerCopy);
      props.handleActiveAlert(true, "error", "The undo failed to happen");
    } else {
      props.handleActiveAlert(
        true,
        "success",
        "The task was undone successfully"
      );
    }

    console.log(currentTrailer, response);
  };

  const undoFrameSurfaceTreatment = async (currentTrailer, processTitle) => {
    const frame = processTitle?.slice(0, 1) === "F" ? "front" : "rear";
    const currentTrailerCopy = structuredClone(currentTrailer);
    const frameKey = `${frame}FrameTimeData`;

    currentTrailer[frameKey].finishingStartTime = "";
    currentTrailer[frameKey].finishingStatus = "";
    currentTrailer[frameKey].finishingEndTime = "";

    let response = await props.handleCurrentTrailerUpload(currentTrailer);

    if (!response.ok) {
      console.log(currentTrailer, currentTrailerCopy);
      currentTrailer = { ...currentTrailerCopy };
      props.handleCurrentTrailerSet(currentTrailerCopy);
      props.handleActiveAlert(true, "error", "The undo failed to happen");
    } else {
      props.handleActiveAlert(
        true,
        "success",
        "The task was undone successfully"
      );
    }

    console.log(currentTrailer, response);
  };

  const undoBoxInstallParts = async (currentTrailer, processTitle) => {
    const stage = parseInt(processTitle?.slice(-1)) - 1;
    const currentTrailerCopy = structuredClone(currentTrailer);

    if (stage < 3 && currentTrailer.boxData.stages[stage + 1].startedDate) {
      console.log("Not Allowed Ahead is Complete", stage);
      return;
    }
    console.log(stage);
    console.log(currentTrailer.boxData.stages[stage]);

    currentTrailer.boxData.stages[stage].status = "";
    currentTrailer.boxData.stages[stage].currentLogStartTime = "";
    currentTrailer.boxData.stages[stage].startedDate = "";
    currentTrailer.boxData.stages[stage].completedDate = "";
    currentTrailer.boxData.stages[stage].activeEmployees = [];
    currentTrailer.boxData.stages[stage].employeeLogs = [];

    if (stage === 0) {
      currentTrailer.isReadyForBoxStage = "ready";
    }

    let response = await props.handleCurrentTrailerUpload(currentTrailer);

    if (!response.ok) {
      console.log(currentTrailer, currentTrailerCopy);
      currentTrailer = { ...currentTrailerCopy };
      props.handleCurrentTrailerSet(currentTrailerCopy);
      props.handleActiveAlert(true, "error", "The undo failed to happen");
    } else {
      props.handleActiveAlert(
        true,
        "success",
        "The task was undone successfully"
      );
    }
    console.log(currentTrailer, response);
  };

  const undoStatus = async (processTitle, subTitle) => {
    if (props.status === "Not Started") {
      props.handleActiveAlert(true, "error", `This stage has not yet started`);
    }

    if (processTitle?.includes("Frame")) {
      if (subTitle === "Build Frame") {
        undoFrameBuild(props.currentTrailer, processTitle);
      }
      if (subTitle === "Surface Treatment") {
        undoFrameSurfaceTreatment(props.currentTrailer, processTitle);
      }
    }

    if (
      processTitle?.includes("Boxes - Stage") &&
      subTitle === "Install Parts"
    ) {
      undoBoxInstallParts(props.currentTrailer, processTitle);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        borderRadius: "0.3rem",
        bgcolor:
          props.status === "Completed"
            ? "var(--success5)"
            : props.status === "In Progress"
            ? "var(--warning)"
            : "var(--red)",
        mt: 0,
        pl: 2,
        mb: 1,
        position: "relative",
        "&:hover .undo-icon": {
          alignSelf: "center",
          display: "inline-flex",
        },
      }}
    >
      <Box
        id="process-name"
        sx={{
          width: "15rem",
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        <KeyboardArrowRightIcon sx={{ fontSize: "1.2rem", mr: -0.5, ml: -1 }} />
        <Typography sx={{ fontSize: "1.1rem", ml: 1 }}>
          {props?.title}
        </Typography>
      </Box>

      {/* Status */}
      <Box
        id="process-status"
        sx={{
          width: "8rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        <Typography sx={{ fontSize: "1.1rem" }}>{props?.status}</Typography>
      </Box>

      {/* Start Date */}
      <Box
        id="process-start"
        sx={{
          width: "18rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
          cursor: "pointer",
        }}
        onDoubleClick={handleStartDateDoubleClick}
      >
        {isEditingStart ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={editedStartDate}
              onChange={handleStartDateChange}
              onClose={handleStartDateBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  size="small"
                  autoFocus
                />
              )}
            />
          </LocalizationProvider>
        ) : (
          <Typography sx={{ fontSize: "1.1rem" }}>
            {!!props?.start
              ? new Date(props?.start).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : ""}
          </Typography>
        )}
      </Box>

      {/* End Date */}
      <Box
        id="process-end"
        sx={{
          width: "18rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
          cursor: "pointer",
        }}
        onDoubleClick={handleEndDateDoubleClick}
      >
        {isEditingEnd ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={editedEndDate}
              onChange={handleEndDateChange}
              onClose={handleEndDateBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  size="small"
                  autoFocus
                />
              )}
            />
          </LocalizationProvider>
        ) : (
          <Typography sx={{ fontSize: "1.1rem" }}>
            {!!props?.end
              ? new Date(props?.end).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : ""}
          </Typography>
        )}
      </Box>

      {/* Duration */}
      <Box
        id="process-duration"
        sx={{
          width: "5rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        {props?.status === "Completed" && props?.start && props?.end && (
          <Typography sx={{ fontSize: "1.1rem" }}>
            {differenceInHours(new Date(props?.end), new Date(props?.start)) <
            24
              ? `${differenceInHours(
                  new Date(props?.end),
                  new Date(props?.start)
                )} hours`
              : `${differenceInBusinessDays(
                  new Date(props?.end),
                  new Date(props?.start)
                )} days`}
          </Typography>
        )}
      </Box>

      {/* Date Required */}
      <Box
        id="date-required"
        sx={{
          width: "8rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        <Typography
          sx={{ fontSize: "1.1rem", color: dateReqColor(props?.dateReq) }}
        >
          {!!props?.dateReq
            ? new Date(props?.dateReq).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : ""}
        </Typography>
      </Box>

      {/* Date Difference */}
      <Box
        id="date-dif"
        sx={{
          width: "2rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        {props?.end && props?.dateReq && (
          <Typography
            sx={{
              fontSize: "1.1rem",
              color:
                differenceInBusinessDays(props?.end, props?.dateReq) >= 0
                  ? "var(--error)"
                  : "var(--success)",
            }}
          >
            {differenceInBusinessDays(props?.end, props?.dateReq)}
          </Typography>
        )}
      </Box>

      {/* Undo Icon */}
      <IconButton
        className="undo-icon"
        sx={{
          position: "absolute",
          right: 8,
          display: "none",
          height: 28,
          width: 28,
        }}
        onClick={() =>
          handleOpenDialog(
            () => undoStatus(props.processTitle, props.title),
            props.processTitle,
            props.title
          )
        }
      >
        <UndoIcon />
      </IconButton>

      {/* Undo Confirmation Dialog */}
      <BootstrapDialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Confirm Undo Action
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
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
          <Typography>Process: {dialogProcessTitle}</Typography>
          <Typography>Step: {dialogStepTitle}</Typography>
          <FormControl
            sx={{ width: "100%", mt: 2 }}
            variant="outlined"
            size="small"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {errorMessage && (
            <Typography sx={{ color: "red", mt: 1 }}>{errorMessage}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmUndo} disabled={!password}>
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
