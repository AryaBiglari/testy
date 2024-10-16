import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DrawingDialogNew from "../walls/DrawingDialogNew.js";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";

// import  handleBoxesDB from "../../pages/api/boxesapi";
import defaultBoxesData from "../../lib/planning/defaultBoxesData.js";

// import CircularWithValueLabel from "/components/CircularWithValueLabel.js";
import WallsProgressChart from "../walls/WallsProgressChart.js";
import LinearWithValueLabel from "./ProgressBar.js";
import InfoIcon from "@mui/icons-material/Info";
import InfoDialog from "./InfoDialog.js";
import AddTrailerDialog from "./TrailerDialog.js";
import RenderEmployee from "../planning/RenderEmployee.js";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Keyboard,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade } from "swiper/modules";

import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import { isEmpty } from "@cloudinary/url-gen/backwards/utils/isEmpty";
import { set } from "date-fns";

export default function JigSwiper(props) {
  const {
    trailer,
    jig,
    eng,
    isJigEmpty,
    isPasswordValid,
    handleJigRemoval,
    handleJigAddition,
    jigAdder,
    makeChangeToTrailer,
  } = props;
  const task = "Boxes";
  const saveInterval = 300;
  const gridPictures = false;
  // const [isJigEmpty, setIsJigEmpty] = React.useState(props.trailer === null);

  const trailerTypeMapToDefaultBox = {
    Pup: "Pup",
    Tandem: "Tandem",
    Lead: "Lead",
    "Tri 61' 2 Hoppers": "Tri61TwoHoppers",
    "Tri 61' 3 Hoppers": "Tri61ThreeHoppers",
    "Tri 72' 2 Hoppers": "Tri72TwoHoppers",
    "4 Axle": "4 Axle"
  };

  function getNestedProperty(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  const settNestedValue = (obj, path, value) => {
    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
  };

  // const handleIsJigEmpty = (val) => {
  //   setIsJigEmpty(val);
  // }

  const dispSecondsAsMins = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60 - hours * 60);
    const seconds_ = seconds % 60;
    return (
      (hours == 0 ? "" : hours.toString() + ":") +
      (mins == 0 ? "00" : mins < 10 ? "0" + mins.toString() : mins.toString()) +
      ":" +
      (seconds_ == 0
        ? "00"
        : seconds_ < 10
          ? "0" + seconds_.toString()
          : seconds_.toString())
    );
  };

  const findActiveStage = () => {
    if (props.isJigEmpty) return null;
    let stages = props?.trailer?.boxData?.stages;
    for (let i = 0; i < stages?.length; i++) {
      if (
        stages[i]?.status === "running" ||
        stages[i]?.status === "paused" ||
        stages[i]?.status === "completed"
      ) {
        return i + 1;
      }
    }
    return 1;
  };

  const [activeStage, setActiveStage] = React.useState(findActiveStage());
  const [openDrawings, setOpenDrawings] = React.useState(false);
  const [openAddTrailerDialog, setOpenAddTrailerDialog] = React.useState(false);

  const [currentStageStatuses, setCurrentStageStatuses] = React.useState([]);

  const [stage, setStage] = React.useState(1);

  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const [elapsed, setElapsed] = React.useState(0);
  const [timePrior, setTimePrior] = React.useState(0);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [activeEmployees, setActiveEmployees] = React.useState([]);
  const [currentLogStartTime, setCurrentLogStartTime] = React.useState();
  const [employeeLogs, setEmployeeLogs] = React.useState([]);
  const [openEmployeesWorking, setOpenEmployeesWorking] = React.useState(false);
  // const [openPassowrdDialog, setOpenPasswordDialog] = React.useState(false);

  const getStageKey = (stageIndex, key) => {
    const partKey = `boxData.stages.${stageIndex}`;

    if (key === "status") {
      return `${partKey}.status`;
    }
    if (key === "startedDate") {
      return `${partKey}.startedDate`;
    }
    if (key === "completedDate") {
      return `${partKey}.completedDate`;
    }
    if (key === "currentLogStartTime") {
      return `${partKey}.currentLogStartTime`;
    }
    if (key === "activeEmployees") {
      return `${partKey}.activeEmployees`;
    }
    if (key === "employeeLogs") {
      return `${partKey}.employeeLogs`;
    } else {
    }
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

  // React.useEffect(() => {
  //   setCurrentStageStatuses(findStartingCurrentStageStatuses());
  // }, [props.trailer]);

  const handleClickOpenDrawings = () => {
    setOpenDrawings(true);
  };

  const handleClickCloseDrawings = () => {
    setOpenDrawings(false);
  };

  const handleClickOpenAddTrailerDialog = () => {
    setOpenAddTrailerDialog(true);
  };

  const handleClickCloseAddTrailerDialog = () => {
    setOpenAddTrailerDialog(false);
  };

  const handleAddTrailerButtonClick = () => {
    handleClickOpenAddTrailerDialog();
  };

  const handleCurrentStageStatuses = (index, status) => {
    console.log(currentStageStatuses);
    const newStatuses = [...currentStageStatuses];
    newStatuses[index] = status;

    // trailer.boxData.stages[index].status = status;
    setCurrentStageStatuses(newStatuses);
  };

  const stageStates = () => {
    if (stage === -1) return "removing";
    if (
      trailer?.boxData?.stages[stage - 1]?.status === "" &&
      (stage === 1 ||
        trailer?.boxData?.stages[stage - 2]?.status ===
        "completed and confirmed")
    )
      return "start";
    else if (
      trailer?.boxData?.stages[stage - 1]?.status === "" &&
      (stage === 1 ||
        trailer?.boxData?.stages[stage - 2]?.status !==
        "complete and confirmed")
    )
      return "prev not ready";
    else if (trailer?.boxData?.stages[stage - 1]?.status === "running")
      return "running";
    else if (trailer?.boxData?.stages[stage - 1]?.status === "paused")
      return "paused";
    else if (trailer?.boxData.stages[stage - 1]?.status === "completed")
      return "completed";
    else if (
      trailer?.boxData?.stages[stage - 1]?.status === "completed and confirmed"
    )
      return "completed and confirmed";
    else if (trailer === null) return null;
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
        console.log(updates);
      }

      return response;
    }
  };

  const updateEmployeeLogs = (
    activeEmployees,
    logs,
    currentSessionStartTime
  ) => {
    const endTime = new Date(); // Capture the current time as the end time
    // Create a log entry with the start time, end time, and active employees
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
          const response = await fetch("/api/employees/employeesInfo", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updates: employeesLogsInDB }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              `HTTP error! status: ${response.status} message: ${data.message}`
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

  const startTimer = async (selectedEmployees) => {

    if (elapsed == 0) {
      setTimePrior(0);
    }
    
    console.log("TIMER START");
    setIsActive(true);
    setIsPaused(false);
    setActiveStage(stage);
    handleCurrentStageStatuses(stage - 1, "running");
    const startTime = new Date();
    setCurrentLogStartTime(startTime);
    const stageIndex = stage - 1;
    console.log(stageIndex);

    const newActiveTask = (currentEmployee) => ({
      startTime,
      trailerType: trailer.trailerType,
      workOrder: trailer.workOrder,
      task: task,
      specificTask: `Stage: ${stageIndex + 1}`,
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
        $set: { activeTask: newActiveTask, isActive: true },
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
    const status = currentStageStatuses[stageIndex];
    if (status === "notStarted" || status === "" || status === undefined) {
      setStartTime(startTime);
      const updates = {
        [`${getStageKey(stageIndex, "activeEmployees")}`]: tempActiveEmployees,
        [`${getStageKey(stageIndex, "status")}`]: "running",
        [`${getStageKey(stageIndex, "startedDate")}`]: startTime,
        [`${getStageKey(stageIndex, "currentLogStartTime")}`]: startTime,
      };
      await updateTrailerData(updates);
      makeChangeToTrailer(
        jig,
        getStageKey(stageIndex, "activeEmployees"),
        tempActiveEmployees
      );
      makeChangeToTrailer(jig, getStageKey(stageIndex, "status"), "running");
      makeChangeToTrailer(
        jig,
        getStageKey(stageIndex, "startedDate"),
        startTime
      );
      makeChangeToTrailer(
        jig,
        getStageKey(stageIndex, "currentLogStartTime"),
        startTime
      );
    } else {
      const updates = {
        [`${getStageKey(stageIndex, "activeEmployees")}`]: tempActiveEmployees,
        [`${getStageKey(stageIndex, "status")}`]: "running",
        [`${getStageKey(stageIndex, "currentLogStartTime")}`]: startTime,
      };
      await updateTrailerData(updates);
      makeChangeToTrailer(
        jig,
        getStageKey(stageIndex, "activeEmployees"),
        tempActiveEmployees
      );
      makeChangeToTrailer(jig, getStageKey(stageIndex, "status"), "running");
      makeChangeToTrailer(
        jig,
        getStageKey(stageIndex, "currentLogStartTime"),
        startTime
      );
    }
  };

  const pauseTimer = async (stageIndex) => {
    if (isPasswordValid) {
    }
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
      [`${getStageKey(stageIndex, "activeEmployees")}`]: activeEmployees,
      [`${getStageKey(stageIndex, "employeeLogs")}`]: newLogs,
      [`${getStageKey(stageIndex, "status")}`]: "paused",
    };
    await updateTrailerData(updates);
    makeChangeToTrailer(
      jig,
      getStageKey(stageIndex, "activeEmployees"),
      activeEmployees
    );
    makeChangeToTrailer(jig, getStageKey(stageIndex, "employeeLogs"), newLogs);
    makeChangeToTrailer(jig, getStageKey(stageIndex, "status"), "paused");

    console.log(trailer);

    const employeesLogsInDB = activeEmployees.map((employee) => {
      const activeTask = {
        startTime: currentLogStartTime,
        trailerType: trailer.trailerType,
        workOrder: trailer.workOrder,
        task: task,
        specificTask: `Stage: ${stageIndex + 1}`,
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

  const handlePauseStage = async (stageIndex) => {
    if (isPasswordValid) {
      handleCurrentStageStatuses(stageIndex, "paused");
      pauseTimer(stageIndex);
    }
  };

  const handlePlayStage = async (stageIndex) => {
    if (isPasswordValid) {
      console.log("playinggg");
      console.log(isActive);
      console.log(isPaused);
      console.log(isCompleted);

      handleClickOpenEmployeesWorking();
    }
  };

  const handleUpdateCurrentStageStatuses = async (stageIndex, newStatus) => {
    if (isPasswordValid) {
      handleCurrentStageStatuses(stageIndex, newStatus);
      if (newStatus === "completed and confirmed") {
        const isFinalStage =
          stageIndex === trailer?.boxData?.stages?.length - 1;

        trailer.boxData.isBoxDone = isFinalStage;
        let currentDate = new Date();

        const updates = {
          [getStageKey(stageIndex, "status")]: newStatus,
          [getStageKey(stageIndex, "completedDate")]: currentDate,
          [`boxData.isBoxDone`]: isFinalStage,
        };

        setEmployeeLogs([]);
        // setElapsed(0);

        makeChangeToTrailer(jig, getStageKey(stageIndex, "status"), newStatus);
        makeChangeToTrailer(
          jig,
          getStageKey(stageIndex, "completedDate"),
          currentDate
        );

        await updateTrailerData(updates);
      } else {
        const updates = {
          [getStageKey(stageIndex, "status")]: newStatus,
        };
        makeChangeToTrailer(jig, getStageKey(stageIndex, "status"), newStatus);
        await updateTrailerData(updates);
      }
    }
  };

  // React.useEffect(() => {
  //   setIsActive
  // }, [stage])

  React.useEffect(() => {
    const initializeState = () => {
      let activeStageIndex = stage - 1;
      console.log(activeStageIndex);

      const savedStatus = getNestedProperty(
        trailer,
        getStageKey(activeStageIndex, "status")
      );
      const savedStartTime = getNestedProperty(
        trailer,
        getStageKey(activeStageIndex, "startedDate")
      );
      // console.log(trailer);
      // console.log(wallType);
      if (savedStartTime) {
        setStartTime(new Date(savedStartTime));
      }
      // console.log(activeStageIndex);
      console.log(trailer);
      console.log(getStageKey(activeStageIndex, "employeeLogs"));
      console.log(savedStatus);

      handleCurrentStageStatuses(activeStageIndex, savedStatus);

      const fetchedEmployeeLogs = getNestedProperty(
        trailer,
        getStageKey(activeStageIndex, "employeeLogs")
      );

      const fetchedActiveEmployees = getNestedProperty(
        trailer,
        getStageKey(activeStageIndex, "activeEmployees")
      );

      console.log(fetchedEmployeeLogs);

      if (fetchedEmployeeLogs) {
        setEmployeeLogs(fetchedEmployeeLogs);
        let totalPreviousTime = calculateTotalTimeMms(fetchedEmployeeLogs);
        setTimePrior(totalPreviousTime);
      } else {
        setEmployeeLogs([]);
        setTimePrior(0);
      }

      if (fetchedActiveEmployees) {
        handleActiveEmployees(fetchedActiveEmployees);
      } else {
        console.log("No Active Logs Found");
      }

      if (savedStatus === "running") {
        setIsActive(true);
        setIsPaused(false);
        setIsCompleted(false);
        let totalPreviousTimeInMms = calculateTotalTimeMms(fetchedEmployeeLogs);
        let objCurrentTime = getNestedProperty(
          trailer,
          getStageKey(activeStageIndex, "currentLogStartTime")
        );
        let startElapsedTime =
          (new Date().getTime() -
            new Date(objCurrentTime) +
            totalPreviousTimeInMms) /
          1000;
        let startElapsedTimeRounded = Math.round(startElapsedTime);
        console.log(fetchedEmployeeLogs);
        console.log(totalPreviousTimeInMms);
        console.log(objCurrentTime);
        console.log(startElapsedTimeRounded);
        setElapsed(startElapsedTimeRounded);
        setCurrentLogStartTime(objCurrentTime);
      } else if (savedStatus === "paused") {
        setIsActive(false);
        setIsPaused(true);
        setIsCompleted(false);
        const totalTimeInSec =
          calculateTotalTimeMms(fetchedEmployeeLogs) / 1000;
        const totalTimeInSecRounded = Math.round(totalTimeInSec);
        console.log(fetchedEmployeeLogs);
        console.log(totalTimeInSec);
        console.log(totalTimeInSecRounded);
        setElapsed(totalTimeInSecRounded);
      } else if (savedStatus === "completed") {
        setIsActive(false);
        setIsPaused(false);
        setIsCompleted(true);
        console.log(isCompleted);
        // trailer.boxData.stages.activeStageIndex.status = "completed";
        makeChangeToTrailer(
          jig,
          getStageKey(activeStageIndex, "status"),
          "completed"
        );
        const totalTimeInSec =
          calculateTotalTimeMms(fetchedEmployeeLogs) / 1000;
        const totalTimeInSecRounded = Math.round(totalTimeInSec);
        setElapsed(totalTimeInSecRounded);

        const endTime = getNestedProperty(
          trailer,
          getStageKey(activeStageIndex, "completedDate")
        );
        setEndTime(endTime);
      } else if (savedStatus === "completed and confirmed") {
        setIsActive(false);
        setIsPaused(false);
        setIsCompleted(true);
        console.log(isCompleted);
        // trailer.boxData.stages.activeStageIndex.status = "completed";
        makeChangeToTrailer(
          jig,
          getStageKey(activeStageIndex, "status"),
          "completed and confirmed"
        );
        const totalTimeInSec =
          calculateTotalTimeMms(fetchedEmployeeLogs) / 1000;
        const totalTimeInSecRounded = Math.round(totalTimeInSec);
        console.log(totalTimeInSecRounded);
        setElapsed(totalTimeInSecRounded);

        const endTime = getNestedProperty(
          trailer,
          getStageKey(activeStageIndex, "completedDate")
        );
        setEndTime(endTime);
      } else {
        console.log("The Stage did not match");
        setIsCompleted(false);
        setIsActive(false);
        setIsPaused(false);
        setActiveEmployees([]);
        setActiveEmployees([]);
        setElapsed(0);
        setTimePrior(0);
      }
    };
    if (trailer) {
      initializeState();
    }
  }, [props.trailer, stage]);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor(
          (new Date().getTime() -
            new Date(currentLogStartTime).getTime() +
            timePrior) /
          1000
        );
        setElapsed(elapsedSeconds);
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, currentLogStartTime, timePrior]);

  return props?.isJigEmpty ? (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: 0,
        pl: 2,
        pr: 2,
      }}
    >
      {openAddTrailerDialog && (
        <AddTrailerDialog
          openAddTrailerDialog={openAddTrailerDialog}
          handleClickOpenAddTrailerDialog={handleClickOpenAddTrailerDialog}
          handleClickCloseAddTrailerDialog={handleClickCloseAddTrailerDialog}
          jig={props?.jig}
          jigAdder={props?.jigAdder}
        // handleIsJigEmpty={handleIsJigEmpty}
        // currentWall={props.currentWall}
        //   row={row}
        //   eng={props.eng}
        />
      )}
      <Box
        sx={{
          position: "absolute",
          minWidth: "25%",
          minHeight: "10.9rem",
          top: "3.4rem",
          // left: "50%",
          mt: "3em",

          bgcolor: "var(--primary5)",

          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          zIndex: "3",
          borderRadius: "0.5rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "var(--primary25)",
            height: "2.8rem",
            display: "flex",
            justifyContent: "space-between",
            borderTopRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              // bgcolor: "brown",
              // pl: 28,
              height: "2.8rem",
              // mb: 2,
              mt: 0,
              display: "flex",
              //   pl: 4,
              //   pr: 4,
              //   top: 5,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                // bgcolor: "red",
              }}
            >
              <Typography
                sx={{
                  color: "var(--secondary)",
                  //   width: "15rem",
                  fontSize: "1.2rem",
                  //   textAlign: "end",
                  //   mr: 3,
                }}
              >
                Trailer Type: N/A
              </Typography>
            </Box>

            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                // bgcolor: "red",
              }}
            >
              <Typography
                sx={{
                  color: "var(--secondary)",
                  //   width: "8.3rem",
                  fontSize: "1.2rem",
                  //   textAlign: "start",
                  //   ml: 3,
                }}
              >
                WO: N/A
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Typography
            sx={{
              color: "var(--secondary75)",
              fontSize: "1.6rem",
            }}
          >
            This Jig is Empty
          </Typography>
          <Button
            sx={{
              flexGrow: "1",
              height: "2.2rem",
              width: "90%",
              fontSize: "1rem",
              borderRadius: "15px",
              // borderRadius: "2.5 rem",
              // width:"6.55rem",
              bgcolor: "primary.main",
              color: "common.white",
              // '&:not(:last-child)': {
              m: 1.5, // Adds a margin to the right of each button except the last one
              // },
              "&:hover": {
                bgcolor: "primary.dark",
              },

              // borderRadius: "10%",
              "&:hover": {
                backgroundColor: "var(--primary5)",
                color: "var(--primary)",
              },
            }}
            onClick={() => {
              handleAddTrailerButtonClick();
            }}
          >
            Add Trailer
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        // overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        // flexDirection: "column",
        // backgroundColor: "red",
        alignItems: "center",
        position: "relative",
        pt: 0,
        pl: 2,
        pr: 2,
        // bgcolor: "red",
      }}
    >
      <RenderEmployee
        startTimer={startTimer}
        currentTrailer={trailer}
        currentFrame={stage}
        activeEmployees={activeEmployees}
        openEmployeesWorking={openEmployeesWorking}
        eng={eng}
        task={task}
        handleCloseEmployeesWorking={handleCloseEmployeesWorking}
        handleActiveEmployees={handleActiveEmployees}
        showStart={stageStates() === "start"}
      // showStart={!isActive && !isPaused && !isCompleted}
      />

      {stage > 0 && (
        <InfoDialog
          trailer={props.trailer}
          openDrawings={openDrawings}
          handleClickOpenDrawings={handleClickOpenDrawings}
          handleCloseDrawings={handleClickCloseDrawings}
          stage={stage}
        // currentWall={props.currentWall}
        //   row={row}
        //   eng={props.eng}
        />
      )}

      {/* main menu - start */}
      <Box
        sx={{
          position: "absolute",
          minWidth: "25%",
          minHeight: "10.9rem",
          top: "3.5rem",
          // left: "50%",
          // mt: "3em",

          bgcolor: "var(--primary5)",

          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          justifyContent: "center",
          zIndex: "3",
          borderRadius: "0.5rem",
        }}
      >
        {/* Title */}
        <Box
          sx={{
            width: "100%",
            bgcolor: "var(--primary25)",
            height: "2.8rem",
            display: "flex",
            justifyContent: "space-between",
            borderTopRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
          }}
        >
          <Box
            sx={{
              // bgcolor: "green",
              ml: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <Typography>Prev</Typography> */}
          </Box>
          <Box
            sx={{
              width: "100%",
              // bgcolor: "brown",
              // pl: 28,
              height: "2.8rem",
              // mb: 2,
              mt: 0,
              display: "flex",
              //   pl: 4,
              //   pr: 4,
              //   top: 5,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                // bgcolor: "red",
              }}
            >
              <Typography
                sx={{
                  color: "var(--secondary)",
                  //   width: "15rem",
                  fontSize: "1.2rem",
                  //   textAlign: "end",
                  //   mr: 3,
                }}
              >
                {props.trailer.trailerType}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                // bgcolor: "red",
              }}
            >
              <Typography
                sx={{
                  color: "var(--secondary)",
                  //   width: "8.3rem",
                  fontSize: "1.2rem",
                  //   textAlign: "start",
                  //   ml: 3,
                }}
              >

                {//unused
                  props.trailer.workOrder + " | " + props.trailer.customer}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bottom half */}
        <Box
          sx={{
            width: "100%",
            height: "8rem",
            display: "flex",
            flexDirection: "column",
            // bgcolor: "red",
          }}
        >
          {/* Stages Row */}
          <Box
            sx={{
              display: "flex",
              // position: "absolute",
              flexDirection: "row",
              flexGrow: "1",
              alignItems: "center",
              // bgcolor: "green",
              width: "100%",
              height: "3.2rem",
              mt: 0,
            }}
          >
            {props.trailer &&
              props.trailer?.boxData?.stages?.map((mapStage, index) => (
                <Button
                  key={index}
                  sx={{
                    flexGrow: "1",
                    height: "2.2rem",
                    // width: "2.2rem",
                    fontSize: "1rem",
                    // borderRadius: "0%",
                    // borderRadius: "2.5 rem",
                    // width:"6.55rem",
                    border: "1px solid var(--primary)",
                    bgcolor:
                      stage === index + 1 ||
                        mapStage.status === "completed and confirmed"
                        ? "primary.main"
                        : "white",
                    color:
                      stage === index + 1 ||
                        mapStage.status === "completed and confirmed"
                        ? "common.white"
                        : "primary.main",
                    // '&:not(:last-child)': {
                    m: 1.5, // Adds a margin to the right of each button except the last one
                    // },
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },

                    // borderRadius: "10%",
                    "&:hover": {
                      backgroundColor: "var(--primary5)",
                      color: "var(--primary)",
                    },
                  }}
                  onClick={() => setStage(index + 1)}
                >
                  Stage {index + 1}
                </Button>
              ))}
          </Box>

          {/* Info Icon Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // bgcolor: "red",
              width: "100%",
              height: "2rem",
              mt: -0.5,
            }}
          >
            {props?.trailer?.boxData?.stages?.map((mapStage, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  // bgcolor: index%2 == 0 ? "blue" : "red",
                  minWidth: "2.2rem",
                  width: "100%",
                  height: "3.2rem",
                  alignItems: "center",
                  // bgcolor:'red'
                }}
              >
                {stage === index + 1 && (
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{
                      // ml: 2,
                      // flexGrow: "1",
                      height: "2.2rem",
                      width: "2.2rem",
                      alignItems: "center",
                      fontSize: "0.7rem",
                      // bgcolor: "black",
                      margin: "auto",
                    }}
                    // disabled={!tasksRow.started}
                    onClick={() => {
                      handleClickOpenDrawings();
                    }}
                  >
                    <InfoIcon
                      sx={{
                        fontSize: "1.8rem",
                      }}
                    />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>

          {/* new removal row button / Mark Box as Complete */}
          {props.trailer.boxData.isBoxDone && stage !== -1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // bgcolor: "red",
                width: "21rem",
                height: "3rem",
                mt: 0,
                position: "absolute",
                right: "30rem",
                top: "0rem",
                zIndex: 3000,
              }}
            >
              <Button
                sx={{
                  flexGrow: "1",
                  height: "2.8rem",
                  width: "2.2rem",
                  fontSize: "1.2rem",

                  borderRadius: "0.5rem",
                  // borderRadius: "2.5 rem",
                  // width:"6.55rem",
                  border: "1px solid var(--primary)",
                  bgcolor: stage !== -1 ? "primary.main" : "grey.300",
                  // bgcolor: "red",
                  color: stage !== -1 ? "common.white" : "grey.800",
                  // '&:not(:last-child)': {
                  m: 1.5, // Adds a margin to the right of each button except the last one
                  // },
                  "&:hover": {
                    bgcolor: "white",
                  },

                  // borderRadius: "10%",
                  "&:hover": {
                    backgroundColor: "var(--primary5)",
                    color: "var(--primary)",
                  },
                }}
                onClick={() => setStage(-1)}
              >
                Mark Box as Complete
              </Button>
            </Box>
          )}

          {/*  Main Message Row */}
          <Box
            sx={{
              display: "flex",

              // position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              height: "2.8rem",
              justifyContent: "center",
              // bgcolor: "green",
              flexDirection: "row",
              alignItems: "center",
              mt: 0,
            }}
          >
            {stageStates() === "start" && (
              <Typography
                sx={{
                  color: "var(--secondary75)",
                  fontSize: "1.4rem",
                  minWidth: "10rem",
                  ml: 2,
                }}
              >
                Start Stage {stage}
              </Typography>
            )}

            {stageStates() === "prev not ready" && (
              <Typography
                sx={{
                  color: "var(--secondary75)",
                  fontSize: "1.4rem",
                  minWidth: "21rem",
                  ml: 2,
                }}
              >
                Finish Stage {stage - 1} Before Starting
              </Typography>
            )}

            {stageStates() === "running" && (
              <Typography
                sx={{
                  color: "var(--secondary75)",
                  fontSize: "1.4rem",
                  minWidth: "14rem",
                  ml: 2,
                }}
              >
                Stage {stage} in Progress
              </Typography>
            )}

            {stageStates() === "paused" && (
              <Typography
                sx={{
                  color: "var(--secondary75)",
                  fontSize: "1.4rem",
                  minWidth: "14rem",
                  ml: 2,
                }}
              >
                Stage {stage} is Paused
              </Typography>
            )}

            {stageStates() === "completed" && (
              <Typography
                sx={{
                  color: "var(--secondary75)",
                  fontSize: "1.4rem",
                  minWidth: "14rem",
                  ml: 2,
                }}
              >
                Is Stage {stage} Complete?
              </Typography>
            )}

            {stageStates() === "completed and confirmed" && (
              <Typography
                sx={{
                  color: "var(--secondary75)",
                  fontSize: "1.4rem",
                  minWidth: "14rem",
                  ml: 2,
                }}
              >
                Stage {stage} is Complete
              </Typography>
            )}
            {/* Timer row*/}
            <Box
              sx={{
                width: "100%",
                height: "2.8rem",
                display: "flex",
                justifyContent: "center",
                // bgcolor: "blue",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {stageStates() === "start" && (
                <IconButton
                  aria-label="delete"
                  color="primary"
                  sx={{
                    // ml: 2,
                    // flexGrow: "1",
                    height: "2.2rem",
                    width: "2.2rem",
                    alignItems: "center",
                    fontSize: "0.7rem",
                    // bgcolor: "black",
                    margin: "auto",
                  }}
                  onClick={() => {
                    handlePlayStage(stage - 1);
                  }}
                >
                  <PlayCircleOutlineIcon
                    sx={{ fontSize: "2.5rem", color: "var(--primary)" }}
                  />
                </IconButton>
              )}

              {stageStates() === "prev not ready" && (
                <IconButton>
                  <PlayCircleOutlineIcon
                    sx={{ fontSize: "2.5rem", color: "var(--secondary50)" }}
                  />
                </IconButton>
              )}

              {stageStates() === "running" && (
                <Box
                  sx={{
                    // backgroundColor: "black",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--primary)",
                      fontSize: "1.7rem",
                      mr: "2em",
                    }}
                  >
                    {dispSecondsAsMins(elapsed)}
                  </Typography>

                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{
                      // ml: 2,
                      // flexGrow: "1",
                      height: "2.2rem",
                      width: "2.2rem",
                      alignItems: "center",
                      fontSize: "0.7rem",
                      // bgcolor: "black",
                      margin: "auto",
                    }}
                    // disabled={!tasksRow.started}
                    onClick={() => {
                      // pauseTimer();
                      handlePauseStage(stage - 1);
                    }}
                  >
                    <PauseCircleOutlineIcon
                      sx={{
                        fontSize: "2.5rem",
                        color: "primary",
                      }}
                    />
                  </IconButton>
                </Box>
              )}

              {stageStates() === "paused" && (
                <Box
                  sx={{
                    // backgroundColor: "black",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--primary)",
                      fontSize: "1.7rem",
                      mr: "2em",
                    }}
                  >
                    {dispSecondsAsMins(elapsed)}
                  </Typography>

                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{
                      // flexGrow: "1",
                      height: "2.2rem",
                      width: "2.2rem",
                      alignItems: "center",
                      fontSize: "0.7rem",

                      // bgcolor: "black",
                      margin: "auto",
                      mr: 2,
                    }}
                    // disabled={!tasksRow.started}
                    onClick={() => {
                      // handleCurrentStageStatuses(stage - 1, "running")
                      // startTimer();
                      handlePlayStage(stage - 1);
                    }}
                  >
                    <PlayCircleOutlineIcon
                      sx={{
                        fontSize: "2.5rem",
                        color: "var(--primary)",
                      }}
                    />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{
                      // ml: 2,
                      // flexGrow: "1",
                      height: "2.2rem",
                      width: "2.2rem",
                      alignItems: "center",
                      fontSize: "0.7rem",

                      // bgcolor: "black",
                      // pl: "2 rem",
                      // marginRight: "1rem",
                      margin: "auto",
                      mr: 1,
                    }}
                    // disabled={!tasksRow.started}
                    onClick={() => {
                      // handleCurrentStageStatuses(stage - 1, "completed");
                      handleUpdateCurrentStageStatuses(stage - 1, "completed");
                      // setStage(stage - 1);
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: "2.5rem", color: "primary" }}
                    />
                  </IconButton>
                </Box>
              )}

              {stageStates() === "completed" && (
                <Box
                  sx={{
                    // backgroundColor: "black",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    sx={{
                      height: "2.2rem",
                      width: "2.2rem",
                      fontSize: "1rem",
                      // borderRadius: "2.5 rem",
                      // width:"6.55rem",
                      bgcolor: "grey.300",
                      color: "grey.800",

                      m: 1.5,
                      // borderRadius: "10%",
                      "&:hover": {
                        backgroundColor: "var(--primary5)",
                        color: "var(--primary)",
                      },
                    }}
                    onClick={() => {
                      // handleCurrentStageStatuses(stage - 1, "paused");
                      handleUpdateCurrentStageStatuses(stage - 1, "paused");
                    }}
                  >
                    No
                  </Button>

                  <Button
                    sx={{
                      height: "2.2rem",
                      width: "2.2rem",
                      fontSize: "1rem",
                      // borderRadius: "2.5 rem",
                      // width:"6.55rem",
                      bgcolor: "grey.300",
                      color: "grey.800",

                      m: 1.5,
                      // borderRadius: "10%",
                      "&:hover": {
                        backgroundColor: "var(--primary5)",
                        color: "var(--primary)",
                      },
                    }}
                    onClick={() => {
                      // handleCurrentStageStatuses(stage - 1, "completed and confirmed");
                      handleUpdateCurrentStageStatuses(
                        stage - 1,
                        "completed and confirmed"
                      );
                    }}
                  >
                    Yes
                  </Button>
                </Box>
              )}

              {stageStates() === "completed and confirmed" && (
                <Box
                  sx={{
                    // backgroundColor: "black",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--secondary60)",
                      fontSize: "1.6rem",
                    }}
                  >
                    ({Math.floor(elapsed / 60)} minutes)
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* main menu - end */}
      {stage === -1 && (
        <Box
          sx={{
            position: "absolute",
            left: "8rem",
            width: "24rem",
            top: "2.9rem",
            height: "8rem",
            zIndex: "4",
          }}
        >
          <Box
            sx={{
              // bgcolor: "red",
              // height: "5rem",
              display: "flex",
              flexDirection: "column", // Change to column to stack the rows vertically
              alignItems: "center", // Center the items horizontally
            }}
          >
            {/* New row with the text */}
            <Box
              sx={{
                // backgroundColor: "grey.200", // Optional styling for the text box
                padding: "0.5rem", // Optional padding for the text box
                marginBottom: "1rem", // Margin between the text and the buttons
                textAlign: "center", // Center the text within the box
                display: "flex",
                flexDirection: "column",
                height: "7.4rem",
              }}
            >
              <Typography
                sx={{
                  color: "var(--secondary)",
                  pt: 1,
                  fontSize: "1.6rem",
                }}
              >
                Box is complete
              </Typography>

              <Typography
                sx={{
                  color: "var(--secondary)",

                  fontSize: "1.6rem",
                }}
              >
                Do you want to remove box from jig?
              </Typography>
            </Box>

            {/* Exiting Confirmation Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                // bgcolor: "blue",
              }}
            >
              <Button
                sx={{
                  height: "2.2rem",
                  width: "2.2rem",
                  fontSize: "1rem",
                  bgcolor: "grey.300",
                  color: "grey.800",
                  m: 1,
                  "&:hover": {
                    backgroundColor: "var(--primary5)",
                    color: "var(--primary)",
                  },
                }}
                onClick={() => {
                  setStage(1);
                }}
              >
                No
              </Button>

              <Button
                sx={{
                  height: "2.2rem",
                  width: "2.2rem",
                  fontSize: "1rem",
                  bgcolor: "grey.300",
                  color: "grey.800",
                  m: 1,
                  "&:hover": {
                    backgroundColor: "var(--primary5)",
                    color: "var(--primary)",
                  },
                }}
                onClick={() => {
                  props.handleJigRemoval(
                    props.trailer.workOrder,
                    props.trailer.trailerType
                  );
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {isActive && !isCompleted && (
        <Box
          sx={{
            position: "absolute",
            right: "25rem",
            // width: "24rem",
            top: "2.9rem",
            // height: "8rem",
            zIndex: "4",
            display: "flex",
            alignItems: "flex-start",

            justifyContent: "center",
            flexDirection: "column",
            // bgcolor: "red",
          }}
        >
          <Typography sx={{ mb: 1.5, mt: 2, fontSize: "1.1rem" }}>
            Active Employees
          </Typography>
          {isActive &&
            !isCompleted &&
            activeEmployees?.map((employee, index) => (
              <Chip
                key={index}
                color="success"
                sx={{ mb: 0.5 }}
                label={`${employee?.firstName} (${employee?.employeeID})`}
                variant="outlined"
              />
            ))}
        </Box>
      )}

      {/* image section */}
      <Box
        sx={{
          // bgcolor: "red",
          height: "65%",
          width: "100%",
          maxWidth: "100%",
          // position: "absolute",

          // overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          // backgroundColor: "pink",
          alignItems: "center",
          position: "relative",
          mt: 0,
          pl: 2,
          pr: 2,

          // position: "absolute",
          // minWidth: "95%",
          // minHeight: "45rem",
          top: "5rem",
          // // left: "50%",
          // mt: "3em",

          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // zIndex: "3",
          // borderRadius: "0.5rem",
        }}
      >
        {stage > 0 &&
          !gridPictures &&
          props?.trailer?.boxData?.stages[stage - 1]?.singlePicture != "" && (
            <Image
              src={`${props.trailer.boxData.stages[stage - 1].singlePicture[0]
                }`}
              style={{
                objectFit: "contain",
              }}
              fill
              priority
              alt="single picture did not load"
            />
          )}
      </Box>
    </Box>
  );
}
