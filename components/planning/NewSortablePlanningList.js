"use client";
import * as React from "react";
import Image from "next/image";


import NewPlanningDataTable from "../../components/planning/NewPlanningDataTable.js";
import SelectMaterial from "../../components/cutting/SelectMaterial.js";
import CreateTrailerDialog from "../../components/planning/CreateTrailerDialog.js";
import SelectJig from "./SelectJig.js";


import DetermineTrailerStatus from "./DetermineTrailerStatus.js";


import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  intlFormatDistance,
  differenceInHours,
  differenceInBusinessDays,
  subBusinessDays,
  addHours,
  isPast,
  addMinutes,
} from "date-fns";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableTrailerBox } from "./SortableTrailerBox";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,


  backgroundColor: "var(--primary5)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    backgroundColor: "var(--primary15)",
  },

  maxWidth: "8rem",


  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),

  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  maxWidth: "1rem",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1, 0.8, 0),

    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SortablePlanningList(props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [currentID, setCurrentID] = React.useState("");
  const [openCreateTrailer, setOpenCreateTrailer] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedTrailerID, setSelectedTrailerID] = React.useState(null);

  const [jig1TrailerSchedule, setJig1TrailerSchedule] = React.useState([]);
  const [jig2TrailerSchedule, setJig2TrailerSchedule] = React.useState([]);
  const [jig3TrailerSchedule, setJig3TrailerSchedule] = React.useState([]);
  const [jig4TrailerSchedule, setJig4TrailerSchedule] = React.useState([]);

  const [jig1TrailerScheduleUnfiltered, setJig1TrailerScheduleUnfiltered] =
    React.useState([]);
  const [jig2TrailerScheduleUnfiltered, setJig2TrailerScheduleUnfiltered] =
    React.useState([]);
  const [jig3TrailerScheduleUnfiltered, setJig3TrailerScheduleUnfiltered] =
    React.useState([]);
  const [jig4TrailerScheduleUnfiltered, setJig4TrailerScheduleUnfiltered] =
    React.useState([]);

  const checkIsQcComplete = (trailer) => {
    return trailer?.qualityInspection?.finalCheckCompletedDate;
  };

  const checkIsBoxComplete = (trailer) => {


    return trailer?.boxData?.stages[3]?.completedDate;
  };


  const checkIsActive = (trailer) => {


    return (
      trailer?.boxData?.stages[0]?.startedDate && !checkIsBoxComplete(trailer)
    );
  };

  const handleClickOpenCreateTrailer = () => {
    setSelectedTrailerID(null);
    setIsEditMode(false);
    setOpenCreateTrailer(true);
  };

  const handleSaveSchedule = async () => {
    if (isFilterActive()) {
      console.log("Can't save, filter is active");

      return;
    }

    setIsSavingSchedule(true);

    const jig1ScheduleObj = {
      process: "Jig 1",

      scheduleArr: jig1TrailerSchedule.map((trailer) => {
        return {
          trailerId: trailer._id,

          boxExpectedStart: trailer.boxExpectedStart,

          boxExpectedEnd: trailer.boxExpectedEnd,

          trailerExpectedEnd: trailer.trailerExpectedEnd,
        };
      }),

      showBoxCompletionDays: showBoxCompletionDays1,

      showTrailerCompletionDays: showTrailerCompletionDays1,
    };

    const jig2ScheduleObj = {
      process: "Jig 2",

      scheduleArr: jig2TrailerSchedule.map((trailer) => {
        return {
          trailerId: trailer._id,

          boxExpectedStart: trailer.boxExpectedStart,

          boxExpectedEnd: trailer.boxExpectedEnd,

          trailerExpectedEnd: trailer.trailerExpectedEnd,
        };
      }),

      showBoxCompletionDays: showBoxCompletionDays2,

      showTrailerCompletionDays: showTrailerCompletionDays2,
    };

    const jig3ScheduleObj = {
      process: "Jig 3",

      scheduleArr: jig3TrailerSchedule.map((trailer) => {
        return {
          trailerId: trailer._id,

          boxExpectedStart: trailer.boxExpectedStart,

          boxExpectedEnd: trailer.boxExpectedEnd,

          trailerExpectedEnd: trailer.trailerExpectedEnd,
        };
      }),

      showBoxCompletionDays: showBoxCompletionDays3,

      showTrailerCompletionDays: showTrailerCompletionDays3,
    };

    const jig4ScheduleObj = {
      process: "Jig 4",

      scheduleArr: jig4TrailerSchedule.map((trailer) => {
        return {
          trailerId: trailer._id,

          boxExpectedStart: trailer.boxExpectedStart,

          boxExpectedEnd: trailer.boxExpectedEnd,

          trailerExpectedEnd: trailer.trailerExpectedEnd,
        };
      }),

      showBoxCompletionDays: showBoxCompletionDays4,

      showTrailerCompletionDays: showTrailerCompletionDays4,
    };

    const schedules = [
      jig1ScheduleObj,
      jig2ScheduleObj,
      jig3ScheduleObj,
      jig4ScheduleObj,
    ];

    const response = await fetch("/api/schedule/save-trailer-schedule", {
      method: "POST",
      body: JSON.stringify(schedules),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(response);
    } else {
      console.log("Updated Schedules");
    }
    setIsSavingSchedule(false);
    setSaveScheduleAlert(true);
  };
  const handleCloseCreateTrailer = () => {
    setOpenCreateTrailer(false);
  };

  const [openDeletePart, setOpenDeletePart] = React.useState(false);
  const handleOpenDeletePart = (id) => {
    setOpenDeletePart(true);
    setCurrentID(id);
  };

  const handleCloseDeletePart = () => {
    setOpenDeletePart(false);
  };

  const [deletePartAlert, setdeletePartAlert] = React.useState(false);
  const [saveScheduleAlert, setSaveScheduleAlert] = React.useState(false);
  const [isDeletingPart, setIsDeletingPart] = React.useState(false);

  const [isViewEmptyOn, setIsViewEmptyOn] = React.useState(null);

  const handleToggleEmpty = () => {
    const newValue = !isViewEmptyOn;
    setIsViewEmptyOn(newValue);
  };

  const addBlanks = (schedule, trailerDays, boxDays) => {

    const trailerDaysInMs = trailerDays * 24 * 60 * 60 * 1000;
    let newSchedule = [];

    for (let i = 0; i < schedule.length; i++) {
      const currentTrailer = schedule[i];
      if (i === schedule.length - 1) {
        newSchedule.push(currentTrailer);
        continue;
      }

      const nextTrailer = schedule[i + 1];

      if (nextTrailer.boxData?.stages[0]?.startedDate) {
        newSchedule.push(currentTrailer);
        continue;
      }


      newSchedule.push(currentTrailer);


      const currentDate = new Date(currentTrailer.trailerExpectedEnd);
      const nextDate = new Date(nextTrailer.dateRequired);
      const dateDifference = nextDate - currentDate;


      const blanksToInsert = Math.floor(dateDifference / trailerDaysInMs);


      for (let j = 0; j < blanksToInsert; j++) {
        newSchedule.push({
          key: Math.floor(Math.random() * 100000) + 1,
          id: Math.floor(Math.random() * 100000) + 1,


        });
      }
    }
    console.error(newSchedule);
    return newSchedule;
  };

  React.useEffect(() => {
    let partialJig1Schedule = [...jig1TrailerScheduleUnfiltered];
    let partialJig2Schedule = [...jig2TrailerScheduleUnfiltered];
    let partialJig3Schedule = [...jig3TrailerScheduleUnfiltered];
    let partialJig4Schedule = [...jig4TrailerScheduleUnfiltered];

    if (isViewEmptyOn) {
      partialJig1Schedule = addBlanks(
        partialJig1Schedule,
        showTrailerCompletionDays1,
        showBoxCompletionDays1
      );
      partialJig2Schedule = addBlanks(
        partialJig2Schedule,
        showTrailerCompletionDays2,
        showBoxCompletionDays2
      );
      partialJig3Schedule = addBlanks(
        partialJig3Schedule,
        showTrailerCompletionDays3,
        showBoxCompletionDays3
      );
      partialJig4Schedule = addBlanks(
        partialJig4Schedule,
        showTrailerCompletionDays4,
        showBoxCompletionDays4
      );
    } else {
    }

    setJig1TrailerSchedule(partialJig1Schedule);
    setJig2TrailerSchedule(partialJig2Schedule);
    setJig3TrailerSchedule(partialJig3Schedule);
  }, [isViewEmptyOn]);

  const handleDeletePartAlert = (state) => {
    setdeletePartAlert(state);
  };
  const handleSaveScheduleAlert = (state) => {
    setSaveScheduleAlert(state);
  };

  const handleIsDeletingPart = (state) => {
    setIsDeletingPart(state);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setdeletePartAlert(false);
    }, 7000);
  }, [isDeletingPart]);

  const [createPartAlert, setCreatePartAlert] = React.useState(false);
  const [isCreatingPart, setIsCreatingPart] = React.useState(false);

  const handleCreatePartAlert = (state) => {
    setCreatePartAlert(state);
  };

  const handleIsCreatingPart = (state) => {
    setIsCreatingPart(state);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setCreatePartAlert(false);
    }, 5000);
  }, [isCreatingPart]);

  const [editPartAlert, setEditPartAlert] = React.useState(false);

  const handleClickOpenEditTrailer = (trailerId) => {
    setSelectedTrailerID(trailerId);


    setIsEditMode(true);
    setOpenCreateTrailer(true);
  };

  const handleEditPartAlert = (state) => {
    setEditPartAlert(state);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setEditPartAlert(false);
    }, 5000);
  }, [editPartAlert]);

  const [showMat, setShowMat] = React.useState("all");
  const [showJig, setShowJig] = React.useState("all");
  const [showWT, setShowWT] = React.useState("all");
  const [reRender, setReRender] = React.useState(false);

  const [rows, setRows] = React.useState([]);
  const [trailers, setTrailers] = React.useState([]);


  const [value, setValue] = React.useState("");
  const [workOrderValue, setWorkOrderValue] = React.useState("");
  const [fendersType, setFendersType] = React.useState("Any");
  const [config, setConfig] = React.useState("Any");
  const [doors, setDoors] = React.useState("Any");

  const [status, setStatus] = React.useState("In Progress & Not Started");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [boxFilterStatus, setBoxFilterStatus] = React.useState("Any");

  const handleBoxFilterStatusChange = (event) => {
    setBoxFilterStatus(event.target.value);
  };

  const [unfilteredRows, setUnfilteredRows] = React.useState([]);

  const [showBoxCompletionDays1, setShowBoxCompletionDays1] =
    React.useState(4.7);
  const [showTrailerCompletionDays1, setShowTrailerCompletionDays1] =
    React.useState(10.5);
  const [showBoxCompletionDays2, setShowBoxCompletionDays2] =
    React.useState(4.7);
  const [showTrailerCompletionDays2, setShowTrailerCompletionDays2] =
    React.useState(10.5);
  const [showBoxCompletionDays3, setShowBoxCompletionDays3] =
    React.useState(4.7);
  const [showTrailerCompletionDays3, setShowTrailerCompletionDays3] =
    React.useState(10.5);
  const [showBoxCompletionDays4, setShowBoxCompletionDays4] =
    React.useState(4.7);
  const [showTrailerCompletionDays4, setShowTrailerCompletionDays4] =
    React.useState(10.5);

  const boxesPerWeek = (
    7 / Number(showBoxCompletionDays1) +
    7 / Number(showBoxCompletionDays2) +
    7 / Number(showBoxCompletionDays3) +
    7 / Number(showBoxCompletionDays4)
  ).toFixed(2);

  const boxesPerYear = (boxesPerWeek * 52.1429).toFixed(0);

  console.log(boxesPerWeek);
  console.log(boxesPerYear);

  const handleshowBoxCompletionDays = (operation, jig) => {
    if (jig === "1") {
      if (operation === "plus") {
        setShowBoxCompletionDays1(
          (Number(showBoxCompletionDays1) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showBoxCompletionDays1) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowBoxCompletionDays1(
            (Number(showBoxCompletionDays1) - 0.1).toFixed(1)
          );
      }
    }

    if (jig === "2") {
      if (operation === "plus") {
        setShowBoxCompletionDays2(
          (Number(showBoxCompletionDays2) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showBoxCompletionDays2) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowBoxCompletionDays2(
            (Number(showBoxCompletionDays2) - 0.1).toFixed(1)
          );
      }
    }

    if (jig === "3") {
      if (operation === "plus") {
        setShowBoxCompletionDays3(
          (Number(showBoxCompletionDays3) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showBoxCompletionDays3) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowBoxCompletionDays3(
            (Number(showBoxCompletionDays3) - 0.1).toFixed(1)
          );
      }
    }

    if (jig === "4") {
      if (operation === "plus") {
        setShowBoxCompletionDays4(
          (Number(showBoxCompletionDays4) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showBoxCompletionDays4) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowBoxCompletionDays4(
            (Number(showBoxCompletionDays4) - 0.1).toFixed(1)
          );
      }
    }
  };

  const handleshowTrailerCompletionDays = (operation, jig) => {
    if (jig === "1") {
      if (operation === "plus") {
        setShowTrailerCompletionDays1(
          (Number(showTrailerCompletionDays1) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showTrailerCompletionDays1) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowTrailerCompletionDays1(
            (Number(showTrailerCompletionDays1) - 0.1).toFixed(1)
          );
      }
    }

    if (jig === "2") {
      if (operation === "plus") {
        setShowTrailerCompletionDays2(
          (Number(showTrailerCompletionDays2) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showTrailerCompletionDays2) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowTrailerCompletionDays2(
            (Number(showTrailerCompletionDays2) - 0.1).toFixed(1)
          );
      }
    }

    if (jig === "3") {
      if (operation === "plus") {
        setShowTrailerCompletionDays3(
          (Number(showTrailerCompletionDays3) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showTrailerCompletionDays3) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowTrailerCompletionDays3(
            (Number(showTrailerCompletionDays3) - 0.1).toFixed(1)
          );
      }
    }

    if (jig === "4") {
      if (operation === "plus") {
        setShowTrailerCompletionDays4(
          (Number(showTrailerCompletionDays4) + 0.1).toFixed(1)
        );
      }

      if (operation === "minus") {
        if ((Number(showTrailerCompletionDays4) - 0.1).toFixed(1) < 0) {
          return;
        } else
          setShowTrailerCompletionDays4(
            (Number(showTrailerCompletionDays4) - 0.1).toFixed(1)
          );
      }
    }
  };

  const [valueTrailer, setValueTrailer] = React.useState("Any");
  const [valueCustomer, setValueCustomer] = React.useState("");

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [isSavingSchedule, setIsSavingSchedule] = React.useState(false);

  const determineTrailerBoxStatus = (trailer) => {
    if (trailer?.boxData?.stages[3]?.completedDate) {
      return "Completed";
    } else if (trailer?.boxData?.stages[0]?.startedDate) {
      return "In Progress";
    } else {
      return "Not Started";
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setSaveScheduleAlert(false);
    }, 9000);
  }, [isSavingSchedule]);

  const handleCustomerSearch = (event, newValue) => {
    setValueCustomer(event.target.value);










  };

  const handleWorkOrderSearch = (event, newValue) => {
    setWorkOrderValue(event.target.value);

    const newRows = trailers.filter((row) => {
      return String(row?.part)
        .toLowerCase()
        .includes(event.target.value?.toLowerCase());
    });

    if (event.target.value.length > 0) {
      setTrailers(newRows);
    }
  };

  const handleSearchTrailer = (event, newValue) => {
    setValueTrailer(event.target.value);
  };

  const handleShowJig = (jig) => {
    setShowJig(jig);
  };

  const handleSetRows = (rows) => {
    setRows(rows);
  };

  const [getTrailersAgain, setGetTrailersAgain] = React.useState(false);
  const [getPartsAfterDelete, setGetPartsAfterDelete] = React.useState(false);

  const handleGetTrailersAgain = () => {
    setGetTrailersAgain(!getTrailersAgain);
  };
  const handleGetPartsAfterDelete = (id) => {
    setGetPartsAfterDelete(id);
  };

  const isFilterActive = () => {
    return (
      workOrderValue?.length > 0 ||
      valueCustomer?.length > 0 ||
      valueTrailer !== "Any" ||
      boxFilterStatus !== "Any" ||
      status !== "Any"
    );
  };


  React.useEffect(() => {
    let partialJig1Schedule = [...jig1TrailerScheduleUnfiltered];
    let partialJig2Schedule = [...jig2TrailerScheduleUnfiltered];
    let partialJig3Schedule = [...jig3TrailerScheduleUnfiltered];
    let partialJig4Schedule = [...jig4TrailerScheduleUnfiltered];


    if (workOrderValue?.length > 0) {
      const lowerWorkOrder = workOrderValue.toLowerCase();
      partialJig1Schedule = partialJig1Schedule.filter((trailer) =>
        trailer.workOrder.toLowerCase().includes(lowerWorkOrder)
      );
      partialJig2Schedule = partialJig2Schedule.filter((trailer) =>
        trailer.workOrder.toLowerCase().includes(lowerWorkOrder)
      );
      partialJig3Schedule = partialJig3Schedule.filter((trailer) =>
        trailer.workOrder.toLowerCase().includes(lowerWorkOrder)
      );
      partialJig4Schedule = partialJig4Schedule.filter((trailer) =>
        trailer.workOrder.toLowerCase().includes(lowerWorkOrder)
      );
    }


    if (valueCustomer?.length > 0) {
      const lowerCustomer = valueCustomer.toLowerCase();
      partialJig1Schedule = partialJig1Schedule.filter((trailer) =>
        trailer.customer.toLowerCase().includes(lowerCustomer)
      );
      partialJig2Schedule = partialJig2Schedule.filter((trailer) =>
        trailer.customer.toLowerCase().includes(lowerCustomer)
      );
      partialJig3Schedule = partialJig3Schedule.filter((trailer) =>
        trailer.customer.toLowerCase().includes(lowerCustomer)
      );
      partialJig4Schedule = partialJig4Schedule.filter((trailer) =>
        trailer.customer.toLowerCase().includes(lowerCustomer)
      );
    }


    if (valueTrailer !== "Any") {
      const lowerTrailer = valueTrailer.toLowerCase();
      partialJig1Schedule = partialJig1Schedule.filter((trailer) =>
        trailer.trailerType.toLowerCase().includes(lowerTrailer)
      );
      partialJig2Schedule = partialJig2Schedule.filter((trailer) =>
        trailer.trailerType.toLowerCase().includes(lowerTrailer)
      );
      partialJig3Schedule = partialJig3Schedule.filter((trailer) =>
        trailer.trailerType.toLowerCase().includes(lowerTrailer)
      );
      partialJig4Schedule = partialJig4Schedule.filter((trailer) =>
        trailer.trailerType.toLowerCase().includes(lowerTrailer)
      );
    }


    if (boxFilterStatus !== "Any") {
      partialJig1Schedule = partialJig1Schedule.filter(
        (trailer) => determineTrailerBoxStatus(trailer) === boxFilterStatus
      );
      partialJig2Schedule = partialJig2Schedule.filter(
        (trailer) => determineTrailerBoxStatus(trailer) === boxFilterStatus
      );
      partialJig3Schedule = partialJig3Schedule.filter(
        (trailer) => determineTrailerBoxStatus(trailer) === boxFilterStatus
      );
      partialJig4Schedule = partialJig4Schedule.filter(
        (trailer) => determineTrailerBoxStatus(trailer) === boxFilterStatus
      );
    }


    if (status !== "Any") {
      if (status === "In Progress & Not Started") {
        partialJig1Schedule = partialJig1Schedule.filter((trailer) =>
          ["In Progress", "Not Started"].includes(DetermineTrailerStatus(trailer))
        );
        partialJig2Schedule = partialJig2Schedule.filter((trailer) =>
          ["In Progress", "Not Started"].includes(DetermineTrailerStatus(trailer))
        );
        partialJig3Schedule = partialJig3Schedule.filter((trailer) =>
          ["In Progress", "Not Started"].includes(DetermineTrailerStatus(trailer))
        );
        partialJig4Schedule = partialJig4Schedule.filter((trailer) =>
          ["In Progress", "Not Started"].includes(DetermineTrailerStatus(trailer))
        );
      } else {
        partialJig1Schedule = partialJig1Schedule.filter(
          (trailer) => DetermineTrailerStatus(trailer) === status
        );
        partialJig2Schedule = partialJig2Schedule.filter(
          (trailer) => DetermineTrailerStatus(trailer) === status
        );
        partialJig3Schedule = partialJig3Schedule.filter(
          (trailer) => DetermineTrailerStatus(trailer) === status
        );
        partialJig4Schedule = partialJig4Schedule.filter(
          (trailer) => DetermineTrailerStatus(trailer) === status
        );
      }
    }


    setJig1TrailerSchedule(partialJig1Schedule);
    setJig2TrailerSchedule(partialJig2Schedule);
    setJig3TrailerSchedule(partialJig3Schedule);
    setJig4TrailerSchedule(partialJig4Schedule);
  }, [
    workOrderValue,
    valueCustomer,
    valueTrailer,
    status,
    boxFilterStatus,
    showJig,
    jig1TrailerScheduleUnfiltered,
    jig2TrailerScheduleUnfiltered,
    jig3TrailerScheduleUnfiltered,
    jig4TrailerScheduleUnfiltered,
  ]);



  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      const scheduleResponse = await fetch(`/api/schedule/save-schedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!scheduleResponse.ok) {
        throw new Error("Failed to fetch schedules");
      }

      const allSchedulesData = await scheduleResponse.json();

      const trailerResponse = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const trailerData = await trailerResponse.json();

      console.log("trailer data");
      console.log(trailerData);
      const trailerIds = new Set(trailerData.map((trailer) => trailer._id));

      let fetchedJig1Schedule = [];
      let fetchedJig2Schedule = [];
      let fetchedJig3Schedule = [];
      let fetchedJig4Schedule = [];

      let jig1BoxCompletion = 0;
      let jig1TrailerCompletion = 0;
      let jig2BoxCompletion = 0;
      let jig2TrailerCompletion = 0;
      let jig3BoxCompletion = 0;
      let jig3TrailerCompletion = 0;
      let jig4BoxCompletion = 1;
      let jig4TrailerCompletion = 1;


      allSchedulesData.forEach((schedule) => {
        if (schedule.process === "Jig 1") {
          jig1BoxCompletion = schedule?.showBoxCompletionDays;
          jig1TrailerCompletion = schedule?.showTrailerCompletionDays;
          fetchedJig1Schedule = schedule.scheduleArr
            .filter((item) => trailerIds.has(item?.trailerId))
            .map((item) => {
              const trailer = trailerData.find(
                (trailer) => trailer._id === item?.trailerId
              );
              return { ...item, ...trailer, id: trailer._id };
            });
        } else if (schedule.process === "Jig 2") {
          jig2BoxCompletion = schedule?.showBoxCompletionDays;
          jig2TrailerCompletion = schedule?.showTrailerCompletionDays;
          fetchedJig2Schedule = schedule.scheduleArr
            .filter((item) => trailerIds.has(item?.trailerId))
            .map((item) => {
              const trailer = trailerData.find(
                (trailer) => trailer._id === item?.trailerId
              );
              return { ...item, ...trailer, id: trailer._id };
            });
        } else if (schedule.process === "Jig 3") {
          jig3BoxCompletion = schedule?.showBoxCompletionDays;
          jig3TrailerCompletion = schedule?.showTrailerCompletionDays;
          fetchedJig3Schedule = schedule.scheduleArr
            .filter((item) => trailerIds.has(item?.trailerId))
            .map((item) => {
              const trailer = trailerData.find(
                (trailer) => trailer._id === item?.trailerId
              );
              return { ...item, ...trailer, id: trailer._id };
            });
        } else if (schedule.process === "Jig 4") {
          jig4BoxCompletion = schedule?.showBoxCompletionDays || 1;
          jig4TrailerCompletion = schedule?.showTrailerCompletionDays || 1;
          fetchedJig4Schedule = schedule.scheduleArr
            .filter((item) => trailerIds.has(item?.trailerId))
            .map((item) => {
              const trailer = trailerData.find(
                (trailer) => trailer._id === item?.trailerId
              );
              return { ...item, ...trailer, id: trailer._id };
            });
        }
      });

      const fetchedJig1ScheduleId = new Set(
        fetchedJig1Schedule.map((trailer) => trailer._id)
      );

      const fetchedJig2ScheduleId = new Set(
        fetchedJig2Schedule.map((trailer) => trailer._id)
      );

      const fetchedJig3ScheduleId = new Set(
        fetchedJig3Schedule.map((trailer) => trailer._id)
      );

      const fetchedJig4ScheduleId = new Set(
        fetchedJig4Schedule.map((trailer) => trailer._id)
      );

      trailerData.sort((a, b) => {
        const dateA = new Date(a?.requiredDate);
        const dateB = new Date(b?.requiredDate);
        return dateA - dateB;
      });

      let completedJig1Schedule = [];
      let completedJig2Schedule = [];
      let completedJig3Schedule = [];
      let completedJig4Schedule = [];

      let newTrailersForJig1Schedule = [];
      let newTrailersForJig2Schedule = [];
      let newTrailersForJig3Schedule = [];
      let newTrailersForJig4Schedule = [];

      let activeTrailerOnJig1 = [];
      let activeTrailerOnJig2 = [];
      let activeTrailerOnJig3 = [];
      let activeTrailerOnJig4 = [];

      const getExpectedValues = (id, fetchedSchedule) => {
        const item = fetchedSchedule.find((obj) => {
          return obj.trailerId === id;
        });

        const expectedValues = {
          boxExpectedStart: item?.boxExpectedStart,

          boxExpectedEnd: item?.boxExpectedEnd,

          trailerExpectedEnd: item?.trailerExpectedEnd,
        };

        return expectedValues;
      };


      trailerData.forEach((trailer) => {
        const jig = trailer.boxData?.jig;

        const isActive = checkIsActive(trailer);

        if (isActive) {
          if (String(jig) === "1") {
            activeTrailerOnJig1.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig1Schedule),

              id: trailer._id,
            });
          } else if (String(jig) === "2") {
            activeTrailerOnJig2.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig2Schedule),

              id: trailer._id,
            });
          } else if (String(jig) === "3") {
            activeTrailerOnJig3.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig3Schedule),

              id: trailer._id,
            });
          } else if (String(jig) === "4") {
            activeTrailerOnJig4.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig4Schedule),

              id: trailer._id,
            });
          }
        }
      });
      console.log(trailerData);



      trailerData.forEach((trailer) => {
        const jig = trailer.futureJig;

        const isComplete = checkIsBoxComplete(trailer);

        if (isComplete) {
          if (jig === "1") {
            completedJig1Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig1Schedule),

              id: trailer._id,
            });
          } else if (jig === "2") {
            completedJig2Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig2Schedule),

              id: trailer._id,
            });
          } else if (jig === "3") {
            completedJig3Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig3Schedule),

              id: trailer._id,
            });
          } else if (jig === "4") {
            completedJig4Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig4Schedule),

              id: trailer._id,
            });
          }
        } else {
          if (
            jig === "1" &&
            !fetchedJig1ScheduleId.has(trailer._id) &&
            !checkIsActive(trailer)
          ) {
            newTrailersForJig1Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig1Schedule),

              id: trailer._id,
            });
          } else if (
            jig === "2" &&
            !fetchedJig2ScheduleId.has(trailer._id) &&
            !checkIsActive(trailer)
          ) {
            newTrailersForJig2Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig2Schedule),

              id: trailer._id,
            });
          } else if (
            jig === "3" &&
            !fetchedJig3ScheduleId.has(trailer._id) &&
            !checkIsActive(trailer)
          ) {
            newTrailersForJig3Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig3Schedule),

              id: trailer._id,
            });
          } else if (
            jig === "4" &&
            !fetchedJig4ScheduleId.has(trailer._id) &&
            !checkIsActive(trailer)
          ) {
            newTrailersForJig4Schedule.push({
              ...trailer,

              ...getExpectedValues(trailer._id, fetchedJig4Schedule),

              id: trailer._id,
            });
          }
        }
      });



      let jig1Scheduled = fetchedJig1Schedule

        .filter(
          (trailer) => !checkIsBoxComplete(trailer) && !checkIsActive(trailer)
        )

        .map((trailer) => {
          return {
            ...trailer,

            ...getExpectedValues(trailer._id, fetchedJig1Schedule),

            id: trailer._id,
          };
        });

      let jig2Scheduled = fetchedJig2Schedule

        .filter(
          (trailer) => !checkIsBoxComplete(trailer) && !checkIsActive(trailer)
        )

        .map((trailer) => {
          return {
            ...trailer,

            ...getExpectedValues(trailer._id, fetchedJig2Schedule),

            id: trailer._id,
          };
        });

      let jig3Scheduled = fetchedJig3Schedule
        .filter(
          (trailer) => !checkIsBoxComplete(trailer) && !checkIsActive(trailer)
        )

        .map((trailer) => {
          return {
            ...trailer,

            ...getExpectedValues(trailer._id, fetchedJig3Schedule),

            id: trailer._id,
          };
        });

      let jig4Scheduled = fetchedJig4Schedule
        .filter(
          (trailer) => !checkIsBoxComplete(trailer) && !checkIsActive(trailer)
        )

        .map((trailer) => {
          return {
            ...trailer,

            ...getExpectedValues(trailer._id, fetchedJig4Schedule),

            id: trailer._id,
          };
        });



      const calculateDates = (
        scheduleArray,

        boxCompletionDays,

        trailerCompletionDays
      ) => {
        return scheduleArray.map((trailer, index) => {
          if (index === 0) {
            if (!trailer.boxExpectedStart) {
              trailer.boxExpectedStart = new Date();
            }

            if (!trailer.boxExpectedEnd) {
              console.log("Made a new box expected end");

              trailer.boxExpectedEnd = new Date();
            }

            if (!trailer.trailerExpectedEnd) {
              console.log("Made a new trailer expected end");

              trailer.trailerExpectedEnd = new Date();
            }
          } else {
            if (checkIsQcComplete(trailer)) {



            } else if (checkIsBoxComplete(trailer)) {




              trailer.trailerExpectedEnd = addMinutes(
                scheduleArray[index]?.boxExpectedStart,

                trailerCompletionDays * 24 * 60
              );
            } else if (checkIsActive(trailer)) {
              trailer.boxExpectedEnd = addMinutes(
                scheduleArray[index]?.boxExpectedStart,

                boxCompletionDays * 24 * 60
              );

              trailer.trailerExpectedEnd = addMinutes(
                scheduleArray[index]?.boxExpectedStart,

                trailerCompletionDays * 24 * 60
              );
            } else {
              trailer.boxExpectedStart = addMinutes(
                scheduleArray[index - 1]?.boxExpectedStart,

                boxCompletionDays * 24 * 60
              );

              trailer.boxExpectedEnd = addMinutes(
                scheduleArray[index - 1]?.boxExpectedEnd,

                boxCompletionDays * 24 * 60
              );

              trailer.trailerExpectedEnd = addMinutes(
                scheduleArray[index]?.boxExpectedStart,

                trailerCompletionDays * 24 * 60
              );
            }
          }

          return trailer;
        });
      };

      const fixCalculatedDates = (
        scheduleArray,
        boxCompletionDays,
        trailerCompletionDays
      ) => {

        let firstActiveIndex = -1;
        for (let i = 0; i < scheduleArray.length; i++) {
          if (!checkIsBoxComplete(scheduleArray[i])) {
            firstActiveIndex = i;
            break;
          }
        }

        console.log(firstActiveIndex);

        if (firstActiveIndex === -1) {
          console.error("No active trailers found");
          return scheduleArray;
        }


        scheduleArray[firstActiveIndex].boxExpectedStart = new Date();
        scheduleArray[firstActiveIndex].boxExpectedEnd = addMinutes(
          new Date(),
          boxCompletionDays * 24 * 60
        );
        scheduleArray[firstActiveIndex].trailerExpectedEnd = addMinutes(
          new Date(),
          trailerCompletionDays * 24 * 60
        );


        for (let i = firstActiveIndex + 1; i < scheduleArray.length; i++) {
          scheduleArray[i].boxExpectedStart = addMinutes(
            scheduleArray[i - 1].boxExpectedStart,
            boxCompletionDays * 24 * 60
          );
          scheduleArray[i].boxExpectedEnd = addMinutes(
            scheduleArray[i - 1].boxExpectedEnd,
            boxCompletionDays * 24 * 60
          );
          scheduleArray[i].trailerExpectedEnd = addMinutes(
            scheduleArray[i - 1].boxExpectedEnd,
            trailerCompletionDays * 24 * 60
          );
        }


        for (let i = firstActiveIndex - 1; i >= 0; i--) {

          scheduleArray[i].boxExpectedStart = addMinutes(
            scheduleArray[i + 1].boxExpectedStart,
            -boxCompletionDays * 24 * 60
          );


          scheduleArray[i].boxData.stages[0].startedDate = addMinutes(
            scheduleArray[i + 1].boxExpectedStart,
            -boxCompletionDays * 24 * 60
          );


          scheduleArray[i].boxExpectedEnd = addMinutes(
            scheduleArray[i + 1].boxExpectedStart,
            -boxCompletionDays * 24 * 60
          );


          scheduleArray[i].boxData.stages[3].completedDate = addMinutes(
            scheduleArray[i + 1].boxExpectedStart,
            -boxCompletionDays * 24 * 60
          );


          scheduleArray[i].trailerExpectedEnd = addMinutes(
            scheduleArray[i + 1].boxExpectedStart,
            -trailerCompletionDays * 24 * 60
          );


          scheduleArray[i].qualityInspection.finalCheckCompletedDate =
            addMinutes(
              scheduleArray[i + 1].boxExpectedStart,
              -trailerCompletionDays * 24 * 60
            );
        }

        return scheduleArray;
      };

      completedJig1Schedule.sort((a, b) => {
        let dateA = new Date(a.boxData.stages[3]?.completedDate);

        let dateB = new Date(b.boxData.stages[3]?.completedDate);

        return dateA - dateB;
      });

      completedJig2Schedule.sort((a, b) => {
        let dateA = new Date(a.boxData.stages[3]?.completedDate);

        let dateB = new Date(b.boxData.stages[3]?.completedDate);

        return dateA - dateB;
      });

      completedJig3Schedule.sort((a, b) => {
        let dateA = new Date(a.boxData.stages[3]?.completedDate);

        let dateB = new Date(b.boxData.stages[3]?.completedDate);

        return dateA - dateB;
      });

      completedJig4Schedule.sort((a, b) => {
        let dateA = new Date(a.boxData.stages[3]?.completedDate);

        let dateB = new Date(b.boxData.stages[3]?.completedDate);

        return dateA - dateB;
      });



      const newJig1Schedule = calculateDates(
        [
          ...completedJig1Schedule,

          ...activeTrailerOnJig1,

          ...jig1Scheduled,

          ...newTrailersForJig1Schedule,
        ],

        jig1BoxCompletion,

        jig1TrailerCompletion
      ).filter((item) => item.futureJig === "1");

      const newJig2Schedule = calculateDates(
        [
          ...completedJig2Schedule,

          ...activeTrailerOnJig2,

          ...jig2Scheduled,

          ...newTrailersForJig2Schedule,
        ],

        jig2BoxCompletion,

        jig2TrailerCompletion
      ).filter((item) => item.futureJig === "2");

      const newJig3Schedule = calculateDates(
        [
          ...completedJig3Schedule,

          ...activeTrailerOnJig3,

          ...jig3Scheduled,

          ...newTrailersForJig3Schedule,
        ],

        jig3BoxCompletion,

        jig3TrailerCompletion
      ).filter((item) => item.futureJig === "3");

      const newJig4Schedule = calculateDates(
        [
          ...completedJig4Schedule,

          ...activeTrailerOnJig4,

          ...jig4Scheduled,

          ...newTrailersForJig4Schedule,
        ],

        jig4BoxCompletion,

        jig4TrailerCompletion
      ).filter((item) => item.futureJig === "4");

















































      setJig1TrailerScheduleUnfiltered(newJig1Schedule);
      setJig2TrailerScheduleUnfiltered(newJig2Schedule);
      setJig3TrailerScheduleUnfiltered(newJig3Schedule);
      setJig4TrailerScheduleUnfiltered(newJig4Schedule);








      setShowTrailerCompletionDays1(jig1TrailerCompletion);
      setShowTrailerCompletionDays2(jig2TrailerCompletion);
      setShowTrailerCompletionDays3(jig3TrailerCompletion);
      setShowTrailerCompletionDays4(jig4TrailerCompletion);

      setShowBoxCompletionDays1(jig1BoxCompletion);
      setShowBoxCompletionDays2(jig2BoxCompletion);
      setShowBoxCompletionDays3(jig3BoxCompletion);
      setShowBoxCompletionDays4(jig4BoxCompletion);

      setUnfilteredRows(trailerData);
      setRows(trailerData);
      setTrailers(trailerData);

      setIsLoadingPage(false);

      if (!trailerResponse.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }

    const onPageLoad = () => {
      try {
        getPartsHandler().then((response) => { });
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
  }, [getTrailersAgain, getPartsAfterDelete]);

  function handleDragEndTrailers(event) {
    const { active, over } = event;

    if (isFilterActive()) {
      return;
    }

    if (!over?.id) {
      return;
    }

    if (active?.id !== over?.id) {


      const activeItem = [
        ...jig1TrailerSchedule,

        ...jig2TrailerSchedule,

        ...jig3TrailerSchedule,

        ...jig4TrailerSchedule,
      ].find((item) => item.id === active.id);

      const overItem = [
        ...jig1TrailerSchedule,

        ...jig2TrailerSchedule,

        ...jig3TrailerSchedule,

        ...jig4TrailerSchedule,
      ].find((item) => item.id === over.id);

      if (!activeItem || !overItem) {
        return;
      }

      if (overItem.boxData?.isBoxDone === "completed") {
        console.log("cant go over completed");
      }

      if (overItem?.boxData?.jig !== 0) {
        console.log("can't go over active");



        return;
      }

      const jig1Index = jig1TrailerSchedule.findIndex(
        (item) => item.id === active.id
      );

      const jig2Index = jig2TrailerSchedule.findIndex(
        (item) => item.id === active.id
      );

      const jig3Index = jig3TrailerSchedule.findIndex(
        (item) => item.id === active.id
      );

      const jig4Index = jig4TrailerSchedule.findIndex(
        (item) => item.id === active.id
      );

      if (jig1Index !== -1) {


        const newJig1Schedule = arrayMove(
          jig1TrailerSchedule,

          jig1Index,

          jig1TrailerSchedule.findIndex((item) => item.id === over.id)
        );

        setJig1TrailerSchedule(newJig1Schedule);
        setJig1TrailerScheduleUnfiltered(newJig1Schedule);

        recalculateDates(
          newJig1Schedule,
          setJig1TrailerSchedule,
          showBoxCompletionDays1,
          showTrailerCompletionDays1
        );
      } else if (jig2Index !== -1) {


        const newJig2Schedule = arrayMove(
          jig2TrailerSchedule,

          jig2Index,

          jig2TrailerSchedule.findIndex((item) => item.id === over.id)
        );

        setJig2TrailerSchedule(newJig2Schedule);
        setJig2TrailerScheduleUnfiltered(newJig2Schedule);

        recalculateDates(
          newJig2Schedule,
          setJig2TrailerSchedule,
          showBoxCompletionDays2,
          showTrailerCompletionDays2
        );
      } else if (jig3Index !== -1) {


        const newJig3Schedule = arrayMove(
          jig3TrailerSchedule,

          jig3Index,

          jig3TrailerSchedule.findIndex((item) => item.id === over.id)
        );

        setJig3TrailerSchedule(newJig3Schedule);
        setJig3TrailerScheduleUnfiltered(newJig3Schedule);

        recalculateDates(
          newJig3Schedule,
          setJig3TrailerSchedule,
          showBoxCompletionDays3,
          showTrailerCompletionDays3
        );
      } else if (jig4Index !== -1) {


        const newJig4Schedule = arrayMove(
          jig4TrailerSchedule,

          jig4Index,

          jig4TrailerSchedule.findIndex((item) => item.id === over.id)
        );

        setJig4TrailerSchedule(newJig4Schedule);
        setJig4TrailerScheduleUnfiltered(newJig4Schedule);

        recalculateDates(
          newJig4Schedule,
          setJig4TrailerSchedule,
          showBoxCompletionDays4,
          showTrailerCompletionDays4
        );
      }
    }
  }



  const recalculateDates = (
    scheduleArray,
    setSchedule,
    boxCompletionDays,
    trailerCompletionDays
  ) => {
    console.log("THIS RECAL RAN!!!");
    const updatedSchedule = scheduleArray.map((trailer, index) => {
      if (index === 0) {
        if (checkIsQcComplete(trailer)) {



        } else if (checkIsBoxComplete(trailer)) {




          trailer.trailerExpectedEnd = addMinutes(
            new Date(),

            trailerCompletionDays * 24 * 60
          );
        } else if (checkIsActive(trailer)) {
          trailer.boxExpectedEnd = addMinutes(
            new Date(),

            boxCompletionDays * 24 * 60
          );

          trailer.trailerExpectedEnd = addMinutes(
            new Date(),

            trailerCompletionDays * 24 * 60
          );
        } else {
          trailer.boxExpectedStart = new Date();

          trailer.boxExpectedEnd = addMinutes(
            new Date(),

            boxCompletionDays * 24 * 60
          );

          trailer.trailerExpectedEnd = addMinutes(
            new Date(),

            trailerCompletionDays * 24 * 60
          );
        }
      } else {
        if (checkIsQcComplete(trailer)) {



        } else if (checkIsBoxComplete(trailer)) {




          trailer.trailerExpectedEnd = addMinutes(
            scheduleArray[index]?.boxExpectedStart,

            trailerCompletionDays * 24 * 60
          );
        } else if (checkIsActive(trailer)) {
          trailer.boxExpectedEnd = addMinutes(
            scheduleArray[index]?.boxExpectedStart,

            boxCompletionDays * 24 * 60
          );

          trailer.trailerExpectedEnd = addMinutes(
            scheduleArray[index]?.boxExpectedStart,

            trailerCompletionDays * 24 * 60
          );
        } else {
          trailer.boxExpectedStart = addMinutes(
            scheduleArray[index - 1]?.boxExpectedStart,

            boxCompletionDays * 24 * 60
          );

          trailer.boxExpectedEnd = addMinutes(
            scheduleArray[index - 1]?.boxExpectedEnd,

            boxCompletionDays * 24 * 60
          );

          trailer.trailerExpectedEnd = addMinutes(
            scheduleArray[index]?.boxExpectedStart,

            trailerCompletionDays * 24 * 60
          );
        }
      }

      return trailer;
    });

    setSchedule(updatedSchedule);
  };

  React.useEffect(() => {

    recalculateDates(
      jig1TrailerSchedule,
      setJig1TrailerSchedule,
      showBoxCompletionDays1,
      showTrailerCompletionDays1
    );

    recalculateDates(
      jig2TrailerSchedule,
      setJig2TrailerSchedule,
      showBoxCompletionDays2,
      showTrailerCompletionDays2
    );

    recalculateDates(
      jig3TrailerSchedule,
      setJig3TrailerSchedule,
      showBoxCompletionDays3,
      showTrailerCompletionDays3
    );

    recalculateDates(
      jig4TrailerSchedule,
      setJig4TrailerSchedule,
      showBoxCompletionDays4,
      showTrailerCompletionDays4
    );
  }, [
    showBoxCompletionDays1,

    showTrailerCompletionDays1,

    showBoxCompletionDays2,

    showTrailerCompletionDays2,

    showBoxCompletionDays3,

    showTrailerCompletionDays3,

    showBoxCompletionDays4,

    showTrailerCompletionDays4,
  ]);

  if (isLoadingPage) {
    return (
      <Box
        sx={{
          display: "flex",
          width: 1,
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
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
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",

        pt: 0,
        pb: 4,











      }}
    >
      <CreateTrailerDialog
        openCreateTrailer={openCreateTrailer}
        handleClickOpenCreateTrailer={handleClickOpenCreateTrailer}
        handleCloseCreateTrailer={handleCloseCreateTrailer}
        handleSetRows={handleSetRows}
        rows={rows}
        handleGetTrailersAgain={handleGetTrailersAgain}
        isEditMode={isEditMode}
        selectedTrailerID={selectedTrailerID}
      />
      {/* Fixed header with logo, filters, buttons */}
      <Box
        sx={{
          width: "100%",
          zIndex: "10",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",

          position: "fixed",


        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "0.4rem",

          }}
        >
          <Collapse in={deletePartAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setdeletePartAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                mb: 2,
                zIndex: "1000000000000000000000000",
                position: "fixed",
                bottom: "2rem",
              }}
            >
              The Trailer has been deleted
            </Alert>
          </Collapse>
        </Box>
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "0.4rem",
            zIndex: "100",
          }}
        >
          <Collapse in={saveScheduleAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSaveScheduleAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                mb: 2,
                position: "fixed",
                bottom: "2rem",
              }}
            >
              The Schedule has been saved
            </Alert>
          </Collapse>
        </Box>
        <Box
          sx={{
            width: "100%",


            height: "2.4rem",
            mb: 2,
            mt: 1,
            pt: 1,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            zIndex: "100000000",
            bgcolor: "white",

          }}
        >
          <Box
            onClick={() => {
              setValue("");
              setShowMat("all");
              setShowWT("all");
              setConfig("Any");
              setDoors("Any");
              setStatus("Any");
              setFendersType("Any");
              setValueTrailer("");
              setValueTrailer("Any");
              setValueCustomer("");
            }}
            sx={{
              minWidth: "6rem",
              height: "100%",

              position: "relative",
              ml: 2,
              display: "flex",
              justifyContent: "flex-start",

              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image
              src="/platinumLogo.png"
              width={163.84}
              height={29.92}

              alt="logo"
              priority={true}
            />
          </Box>
          <Box
            sx={{


              display: "flex",
              justifyContent: "flex-start",
              alignContent: "center",



            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  ml: 1,
                }}
              >
                {"Box/Week:"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  ml: 0.5,
                  fontWeight: "600",
                }}
              >
                {boxesPerWeek}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "1rem",

                  ml: 1,
                }}
              >
                {"Box/Year:"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  ml: 0.5,
                  fontWeight: "600",
                }}
              >
                {boxesPerYear}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",

              justifyContent: "space-evenly",

              width: "21.5rem",
              mr: 1,
            }}
          >
            <Button
              variant="contained"

              onClick={handleClickOpenCreateTrailer}
            >
              ADD TRAILER
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                minWidth: "13rem",

              }}
            >
              {isSavingSchedule && <CircularProgress size={34} />}
              <Button
                disabled={isFilterActive()}
                variant="contained"
                sx={{ ml: 1 }}
                onClick={handleSaveSchedule}
              >
                Save Schedule
              </Button>

              {isSavingSchedule && <CircularProgress size={34} />}
              {/* <Button
                disabled={isFilterActive()}
                variant="contained"
                sx={{ ml: 1, }}
                onClick={() => {
                  console.log("ytu")
                  handleToggleEmpty();
                }}
              >
                {isViewEmptyOn ? "Remove" : "See"} Blanks
              </Button> */}
            </Box>
          </Box>
          <Search sx={{ marginRight: 1, zIndex: 1, color: "black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="WO..."
              inputProps={{ "aria-label": "search" }}
              value={workOrderValue}
              onInput={handleWorkOrderSearch}
            />
          </Search>

          <Search sx={{ marginRight: 1, zIndex: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Customer..."
              inputProps={{ "aria-label": "search" }}
              value={valueCustomer}
              onInput={handleCustomerSearch}
            />
          </Search>

          <Box sx={{ width: "8rem", zIndex: 10000000000, ml: 1, mr: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="trailer-type-label">Trailer</InputLabel>
              <Select
                labelId="trailer-type-label"
                id="trailer-type"
                value={valueTrailer}
                label="Trailer"
                onChange={handleSearchTrailer}
                sx={{
                  bgcolor: "var(--primary5)",
                  maxHeight: "2.3rem",




                }}
              >
                <MenuItem value={"Any"}>Any</MenuItem>
                <MenuItem value={"Pup"}>Pup</MenuItem>
                <MenuItem value={"Lead"}>Lead</MenuItem>
                <MenuItem value={"Tri 61' 2 Hoppers"}>
                  Tri 61' 2 Hoppers
                </MenuItem>
                <MenuItem value={"Tri 61' 3 Hoppers"}>
                  Tri 61' 3 Hoppers
                </MenuItem>
                <MenuItem value={"Tri 72' 2 Hoppers"}>
                  Tri 72' 2 Hoppers
                </MenuItem>
                <MenuItem value={"Tandem"}>Tandem</MenuItem>
                <MenuItem value={"4 Axle"}>4 Axle</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: "8rem", zIndex: 1, ml: 1, mr: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-type-label">Box Status</InputLabel>

              <Select
                labelId="status-type-label"
                id="status-type"
                value={boxFilterStatus}
                label="Box Status"
                onChange={handleBoxFilterStatusChange}
                sx={{
                  bgcolor: "var(--primary5)",

                  maxHeight: "2.3rem",








                }}
              >
                <MenuItem value={"Any"}>Any</MenuItem>

                <MenuItem value={"Completed"}>Completed</MenuItem>

                <MenuItem value={"In Progress"}>In Progress</MenuItem>

                <MenuItem value={"Not Started"}>Not Started</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: "8rem", zIndex: 1, ml: 1, mr: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-type-label">Trailer Status</InputLabel>
              <Select
                labelId="status-type-label"
                id="status-type"
                value={status}
                label="Trailer Status"
                onChange={handleStatusChange}
                sx={{
                  bgcolor: "var(--primary5)",
                  maxHeight: "2.3rem",




                }}
              >
                <MenuItem value={"Any"}>Any</MenuItem>
                <MenuItem value={"In Progress & Not Started"}>
                  In Progress & Not Started
                </MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Not Started"}>Not Started</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{


          mt: 9,
          px: 2,
          pt: 2,
          bgcolor: "white",



        }}
      >
        <Box
          sx={{
            display: "flex",


            justifyContent: "space-around",

          }}
        >
          {/* Jig 1 */}
          <Box sx={{ mr: "2.2rem" }}>
            <Box
              sx={{

                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",

                bgcolor: "white",
                zIndex: "2",

                mt: -4.8,
                position: "sticky",
                top: 54,

                boxShadow: "20px 0 0px 0px white, -20px 0 0px 0px white",




              }}
            >
              {/* upper row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  with: "100%",
                  height: "2.9rem",
                }}
              >
                <Box sx={{ display: "flex", width: "9rem" }}>
                  <Typography
                    sx={{ fontSize: "1.2rem", ml: 0.8, fontWeight: "600" }}
                  >
                    Jig 1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13.5rem",
                    justifyContent: "center",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Boxes Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("minus", "1")}
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showBoxCompletionDays1}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("plus", "1")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13rem",
                    justifyContent: "flex-end",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Total Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() =>
                      handleshowTrailerCompletionDays("minus", "1")
                    }
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showTrailerCompletionDays1}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowTrailerCompletionDays("plus", "1")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
              </Box>
              {/* lower row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",

                  with: "100%",

                }}
              >
                <Box sx={{ width: "10rem", pl: 0 }}>
                  {" "}
                  <Typography sx={{ fontSize: "1rem", ml: -0.5 }}>
                    Trailer
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ml: 0,
                    display: "flex",
                    alignItems: "center",
                    width: "7.35rem",
                    pl: 0,

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Status</Typography>
                </Box>

                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box Start</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box End</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Completed</Typography>
                </Box>

                {/* <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
                width: "5rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem" }}>Actions</Typography>
            </Box> */}
              </Box>
            </Box>
            <DndContext
              id="builder-id"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndTrailers}
            >
              <SortableContext
                items={jig1TrailerSchedule}
                strategy={verticalListSortingStrategy}
              >
                {jig1TrailerSchedule?.map((trailer, index) => (
                  <SortableTrailerBox
                    index={index}
                    key={trailer?.id}
                    id={trailer?.id}
                    trailer={trailer}
                    handleGetPartsAfterDelete={handleGetPartsAfterDelete}
                    handleIsDeletingPart={handleIsDeletingPart}
                    isDeletingPart={isDeletingPart}
                    handleDeletePartAlert={handleDeletePartAlert}
                    handleClickOpenEditTrailer={handleClickOpenEditTrailer}
                    editPartAlert={editPartAlert}
                    handleEditPartAlert={handleEditPartAlert}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Box>

          {/* Jig 2 */}
          <Box sx={{ mr: "2.2rem" }}>
            <Box
              sx={{

                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",

                bgcolor: "white",
                zIndex: "2",


                mt: -4.8,
                position: "sticky",
                top: 54,

                boxShadow: "20px 0 0px 0px white, -20px 0 0px 0px white",


              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  with: "100%",
                  height: "2.9rem",
                }}
              >
                <Box sx={{ display: "flex", width: "9rem" }}>
                  <Typography
                    sx={{ fontSize: "1.2rem", ml: 0.8, fontWeight: "600" }}
                  >
                    Jig 2
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13.5rem",
                    justifyContent: "center",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Boxes Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("minus", "2")}
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showBoxCompletionDays2}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("plus", "2")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13rem",
                    justifyContent: "flex-end",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Total Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() =>
                      handleshowTrailerCompletionDays("minus", "2")
                    }
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showTrailerCompletionDays2}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowTrailerCompletionDays("plus", "2")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",

                  with: "100%",

                }}
              >
                <Box sx={{ width: "10rem", pl: 0 }}>
                  {" "}
                  <Typography sx={{ fontSize: "1rem", ml: -0.5 }}>
                    Trailer
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ml: 0,
                    display: "flex",
                    alignItems: "center",
                    width: "7.35rem",
                    pl: 0,

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Status</Typography>
                </Box>

                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box Start</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box End</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Completed</Typography>
                </Box>

                {/* <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
                width: "5rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem" }}>Actions</Typography>
            </Box> */}
              </Box>
            </Box>
            <DndContext
              id="builder-id"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndTrailers}
            >
              <SortableContext
                items={jig2TrailerSchedule}
                strategy={verticalListSortingStrategy}
              >
                {jig2TrailerSchedule?.map((trailer, index) => (
                  <SortableTrailerBox
                    index={index}
                    key={trailer?.id}
                    id={trailer?.id}
                    trailer={trailer}
                    handleGetPartsAfterDelete={handleGetPartsAfterDelete}
                    handleIsDeletingPart={handleIsDeletingPart}
                    isDeletingPart={isDeletingPart}
                    handleDeletePartAlert={handleDeletePartAlert}
                    handleClickOpenEditTrailer={handleClickOpenEditTrailer}
                    editPartAlert={editPartAlert}
                    handleEditPartAlert={handleEditPartAlert}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Box>

          {/* Jig 3 */}
          <Box sx={{ mr: "2.2rem" }}>
            <Box
              sx={{

                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",

                bgcolor: "white",
                zIndex: "2",


                mt: -4.8,
                position: "sticky",
                top: 54,

                boxShadow: "30px 0 0px 0px white, -30px 0 0px 0px white",


              }}
            >
              {/* top row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  with: "100%",
                  height: "2.9rem",
                }}
              >
                <Box sx={{ display: "flex", width: "9rem" }}>
                  <Typography
                    sx={{ fontSize: "1.2rem", ml: 0.8, fontWeight: "600" }}
                  >
                    Jig 3
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13.5rem",
                    justifyContent: "center",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Boxes Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("minus", "3")}
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showBoxCompletionDays3}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("plus", "3")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13rem",
                    justifyContent: "flex-end",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Total Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() =>
                      handleshowTrailerCompletionDays("minus", "3")
                    }
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showTrailerCompletionDays3}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowTrailerCompletionDays("plus", "3")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
              </Box>
              {/* bottom row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",

                  with: "100%",

                }}
              >
                <Box sx={{ width: "10rem", pl: 0 }}>
                  {" "}
                  <Typography sx={{ fontSize: "1rem", ml: -0.5 }}>
                    Trailer
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ml: 0,
                    display: "flex",
                    alignItems: "center",
                    width: "7.35rem",
                    pl: 0,

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Status</Typography>
                </Box>

                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box Start</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box End</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Completed</Typography>
                </Box>

                {/* <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
                width: "5rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem" }}>Actions</Typography>
            </Box> */}
              </Box>
            </Box>
            <DndContext
              id="builder-id"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndTrailers}
            >
              <SortableContext
                items={jig3TrailerSchedule}
                strategy={verticalListSortingStrategy}
              >
                {jig3TrailerSchedule?.map((trailer, index) => (
                  <SortableTrailerBox
                    index={index}
                    key={trailer?.id}
                    id={trailer?.id}
                    trailer={trailer}
                    handleGetPartsAfterDelete={handleGetPartsAfterDelete}
                    handleIsDeletingPart={handleIsDeletingPart}
                    isDeletingPart={isDeletingPart}
                    handleDeletePartAlert={handleDeletePartAlert}
                    handleClickOpenEditTrailer={handleClickOpenEditTrailer}
                    editPartAlert={editPartAlert}
                    handleEditPartAlert={handleEditPartAlert}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Box>

          {/* Jig 4 */}
          <Box sx={{ mr: "2.2rem" }}>
            <Box
              sx={{

                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",

                bgcolor: "white",
                zIndex: "2",


                mt: -4.8,
                position: "sticky",
                top: 54,

                boxShadow: "30px 0 0px 0px white, -30px 0 0px 0px white",


              }}
            >
              {/* top row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  with: "100%",
                  height: "2.9rem",
                }}
              >
                <Box sx={{ display: "flex", width: "9rem" }}>
                  <Typography
                    sx={{ fontSize: "1.2rem", ml: 0.8, fontWeight: "600" }}
                  >
                    Jig 4
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13.5rem",
                    justifyContent: "center",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Boxes Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("minus", "4")}
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showBoxCompletionDays4}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowBoxCompletionDays("plus", "4")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "13rem",
                    justifyContent: "flex-end",

                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      mr: 0.5,

                    }}
                  >
                    Total Time
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ mr: 0.5 }}
                    onClick={() =>
                      handleshowTrailerCompletionDays("minus", "4")
                    }
                  >
                    <ChevronLeftIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "600",

                    }}
                  >
                    {showTrailerCompletionDays4}
                  </Typography>
                  <IconButton
                    aria-label="left"
                    sx={{ ml: 0.5 }}
                    onClick={() => handleshowTrailerCompletionDays("plus", "4")}
                  >
                    <ChevronRightIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
              </Box>
              {/* bottom row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",

                  with: "100%",

                }}
              >
                <Box sx={{ width: "10rem", pl: 0 }}>
                  {" "}
                  <Typography sx={{ fontSize: "1rem", ml: -0.5 }}>
                    Trailer
                  </Typography>
                </Box>

                <Box
                  sx={{
                    ml: 0,
                    display: "flex",
                    alignItems: "center",
                    width: "7.35rem",
                    pl: 0,

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Status</Typography>
                </Box>

                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box Start</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Box End</Typography>
                </Box>
                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    width: "4.8rem",

                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Completed</Typography>
                </Box>

                {/* <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
                width: "5rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem" }}>Actions</Typography>
            </Box> */}
              </Box>
            </Box>
            <DndContext
              id="builder-id"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndTrailers}
            >
              <SortableContext
                items={jig4TrailerSchedule}
                strategy={verticalListSortingStrategy}
              >
                {jig4TrailerSchedule?.map((trailer, index) => (
                  <SortableTrailerBox
                    index={index}
                    key={trailer?.id}
                    id={trailer?.id}
                    trailer={trailer}
                    handleGetPartsAfterDelete={handleGetPartsAfterDelete}
                    handleIsDeletingPart={handleIsDeletingPart}
                    isDeletingPart={isDeletingPart}
                    handleDeletePartAlert={handleDeletePartAlert}
                    handleClickOpenEditTrailer={handleClickOpenEditTrailer}
                    editPartAlert={editPartAlert}
                    handleEditPartAlert={handleEditPartAlert}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
