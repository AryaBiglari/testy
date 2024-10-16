import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import CircularProgressForTrailers from "../planning/CircularProgressForTrailers.js";
import IconButton from "@mui/material/IconButton";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import TrailerProgressDialog from "./TrailerProgressDialog.js";
import TrailerDetailsDialog from "./TrailerDetailsDialog.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DeleteTrailerDialog from "./DeleteTrailerDialog.js";
import Tooltip from "@mui/material/Tooltip";
import {
  intlFormatDistance,
  differenceInHours,
  differenceInBusinessDays,
  subBusinessDays,
  isPast,
} from "date-fns";

export function SortableTrailer(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    disabled: false,
    // disabled:
    //   !props.wall?.status || props.wall?.status === "Not Started"
    //     ? false
    //     : true,
  });

  // console.log(props.id);

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  const processWallName = (wallName) => {
    if (wallName === "Side Wall - Driver") {
      return "DS";
    }
    if (wallName === "Side Wall - Passenger") {
      return "PS";
    }
    if (wallName === "Front Top") {
      return "FT";
    }
    if (wallName === "Rear Top") {
      return "RT";
    }
    if (wallName === "Front Slope") {
      return "FS";
    }
    if (wallName === "Rear Slope") {
      return "RS";
    }
    if (wallName === "Mid Wall") {
      return "MW";
    }
    if (wallName === "Mid Wall - 2") {
      return "M2";
    }
    if (wallName === "Mid Wall - 1") {
      return "M1";
    } else return wallName;
  };

  const [openDetails, setOpenDetails] = React.useState(false);
  const [currentTrailer, setCurrentTrailer] = React.useState(null);

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  const [openTrailerProgress, setOpenTrailerProgress] = React.useState(false);

  const handleClickOpenTrailerProgress = () => {
    setOpenTrailerProgress(true);
  };
  const handleCloseTrailerProgress = () => {
    setOpenTrailerProgress(false);
  };

  const [openDeletePart, setOpenDeletePart] = React.useState(false);
  const handleOpenDeletePart = (id) => {
    setOpenDeletePart(true);
  };

  const handleCloseDeletePart = () => {
    setOpenDeletePart(false);
  };

  async function handleDeletePart(id, password) {
    // return;
    props.handleIsDeletingPart(true);
    console.log(id);
    const response = await fetch(
      `/api/planning/delete-trailer?id=${id}&password=${password}`,
      {
        method: "POST",
        body: JSON.stringify({
          id,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      props.handleGetPartsAfterDelete(id);
      props.handleIsDeletingPart(false);
      props.handleDeletePartAlert(true);
      handleCloseDeletePart();
      console.log("Delete trialer success");
    } else {
      console.error("Failed to delete trialer");
    }
  }

  const handleEditClick = (id) => {
    props.handleClickOpenEditTrailer(id);
  };

  //status and progress - start
  function renderStatus(start, end) {
    if (!start) {
      return "Not Started";
    } else if (start && !end) {
      return "In Progress";
    } else return "Completed";
  }

  function renderSectionStatus(timesArr) {
    const statusArr = [];
    timesArr.forEach((time) => {
      statusArr.push(renderStatus(time.start, time.end));
    });

    if (
      statusArr.includes("Not Started") &&
      !statusArr.includes("Completed") &&
      !statusArr.includes("In Progress")
    ) {
      return "Not Started";
    }
    if (
      statusArr.includes("Completed") &&
      !statusArr.includes("Not Started") &&
      !statusArr.includes("In Progress")
    ) {
      return "Completed";
    } else return "In Progress";
  }

  const frontFrameTimesArr = [
    {
      start: props.trailer?.partKits?.frontFrameState?.StartTime,
      end: props.trailer?.partKits?.frontFrameState?.EndTime,
    },

    {
      start: props.trailer?.frontFrameStartTime,
      end: props.trailer?.frontFrameEndTime,
    },
    {
      start: props.trailer?.frontFrameGalvinizedStartTime,
      end: props.trailer?.frontFrameGalvinizedEndTime,
    },
  ];

  const rearFrameTimesArr = [
    {
      start: props.trailer?.partKits?.rearFrameState?.StartTime,
      end: props.trailer?.partKits?.rearFrameState?.EndTime,
    },

    {
      start: props.trailer?.rearFrameStartTime,
      end: props.trailer?.rearFrameEndTime,
    },
    {
      start: props.trailer?.rearFrameGalvinizedStartTime,
      end: props.trailer?.rearFrameGalvinizedEndTime,
    },
  ];

  const boxStage1TimesArr = [
    {
      start: props.trailer?.partKits?.boxStage1State?.StartTime,
      end: props.trailer?.partKits?.boxStage1State?.EndTime,
    },
    {
      start: props.trailer?.boxData?.stages[0]?.startedDate,
      end: props.trailer?.boxData?.stages[0]?.completedDate,
    },
  ];
  const boxStage2TimesArr = [
    {
      start: props.trailer?.partKits?.boxStage2State?.StartTime,
      end: props.trailer?.partKits?.boxStage2State?.EndTime,
    },
    {
      start: props.trailer?.boxData?.stages[1]?.startDate,
      end: props.trailer?.boxData?.stages[1]?.endDate,
    },
  ];
  const boxStage3TimesArr = [
    {
      start: props.trailer?.partKits?.boxStage3State?.StartTime,
      end: props.trailer?.partKits?.boxStage3State?.EndTime,
    },
    {
      start: props.trailer?.boxData?.stages[2]?.startDate,
      end: props.trailer?.boxData?.stages[2]?.endDate,
    },
  ];
  const boxStage4TimesArr = [
    {
      start: props.trailer?.partKits?.boxStage4State?.StartTime,
      end: props.trailer?.partKits?.boxStage4State?.EndTime,
    },
    {
      start: props.trailer?.boxData?.stages[3]?.startDate,
      end: props.trailer?.boxData?.stages[3]?.endDate,
    },
  ];

  const smallPartsTimesArr =
    props.trailer?.trailerType === "Tri 61' 3 Hoppers"
      ? [
          {
            start: props.trailer?.partKits?.smallPartsStageState?.StartTime,
            end: props.trailer?.partKits?.smallPartsStageState?.EndTime,
          },
          {
            start: props.trailer?.hopperDoorsFront?.StartTime,
            end: props.trailer?.hopperDoorsFront?.EndTime,
          },
          {
            start: props.trailer?.hopperDoorsRear?.StartTime,
            end: props.trailer?.hopperDoorsRear?.EndTime,
          },
          {
            start: props.trailer?.hopperDoorsMiddle?.StartTime,
            end: props.trailer?.hopperDoorsMiddle?.EndTime,
          },
        ]
      : [
          {
            start: props.trailer?.partKits?.smallPartsStageState?.StartTime,
            end: props.trailer?.partKits?.smallPartsStageState?.EndTime,
          },
          {
            start: props.trailer?.hopperDoorsFront?.StartTime,
            end: props.trailer?.hopperDoorsFront?.EndTime,
          },
          {
            start: props.trailer?.hopperDoorsRear?.StartTime,
            end: props.trailer?.hopperDoorsRear?.EndTime,
          },
        ];

  const frontFrameFinishingTimesArr = [
    {
      start: props.trailer?.partKits?.frontFrameFinishingState?.StartTime,
      end: props.trailer?.partKits?.frontFrameFinishingState?.EndTime,
    },
    {
      start: props.trailer?.frontFrameFinishingState?.StartTime,
      end: props.trailer?.frontFrameFinishingState?.EndTime,
    },
  ];
  const rearFrameFinishingTimesArr = [
    {
      start: props.trailer?.partKits?.rearFrameFinishingState?.StartTime,
      end: props.trailer?.partKits?.rearFrameFinishingState?.EndTime,
    },
    {
      start: props.trailer?.rearFrameFinishingState?.StartTime,
      end: props.trailer?.rearFrameFinishingState?.EndTime,
    },
  ];

  const boxFinishingTimesArr = [
    {
      start: props.trailer?.partKits?.boxFinishingState?.StartTime,
      end: props.trailer?.partKits?.boxFinishingState?.EndTime,
    },
    {
      start: props.trailer?.boxFinishingState?.StartTime,
      end: props.trailer?.boxFinishingState?.EndTime,
    },
    {
      start: props.trailer?.installHopperDoorsState?.StartTime,
      end: props.trailer?.installHopperDoorsState?.EndTime,
    },
    {
      start: props.trailer?.installFramesState?.StartTime,
      end: props.trailer?.installFramesState?.EndTime,
    },
  ];

  const wallsTimesArr = [];
  props.trailer?.walls?.map((wall) => {
    wallsTimesArr.push({
      start: wall.startedDate,
      end: wall.completedDate,
    });
  });

  const qualityInspectionTimesArr = [
    {
      start: props.trailer?.qualityInspection?.initialInspection?.startTime,
      end: props.trailer?.qualityInspection?.initialInspection?.endTime,
    },
    {
      start: props.trailer?.qualityInspection?.finalCheckStartingDate,
      end: props.trailer?.qualityInspection?.finalCheckCompletedDate,
    },
  ];

  const installFramesTimesArr = [
    {
      start: props.trailer?.installFramesState?.StartTime,
      end: props.trailer?.installFramesState?.EndTime,
    },
  ];

  const trailerStatus =
    renderSectionStatus(frontFrameTimesArr) === "Completed" &&
    renderSectionStatus(rearFrameTimesArr) === "Completed" &&
    renderSectionStatus(wallsTimesArr) === "Completed" &&
    renderSectionStatus(boxStage1TimesArr) === "Completed" &&
    renderSectionStatus(boxStage2TimesArr) === "Completed" &&
    renderSectionStatus(boxStage3TimesArr) === "Completed" &&
    renderSectionStatus(boxStage4TimesArr) === "Completed" &&
    renderSectionStatus(smallPartsTimesArr) === "Completed" &&
    renderSectionStatus(boxFinishingTimesArr) === "Completed" &&
    renderSectionStatus(frontFrameFinishingTimesArr) === "Completed" &&
    renderSectionStatus(rearFrameFinishingTimesArr) === "Completed" &&
    renderSectionStatus(qualityInspectionTimesArr) === "Completed"
      ? "Completed"
      : renderSectionStatus(frontFrameTimesArr) === "Not Started" &&
        renderSectionStatus(rearFrameTimesArr) === "Not Started" &&
        renderSectionStatus(wallsTimesArr) === "Not Started" &&
        renderSectionStatus(boxStage1TimesArr) === "Not Started" &&
        renderSectionStatus(boxStage2TimesArr) === "Not Started" &&
        renderSectionStatus(boxStage3TimesArr) === "Not Started" &&
        renderSectionStatus(boxStage4TimesArr) === "Not Started" &&
        renderSectionStatus(smallPartsTimesArr) === "Not Started" &&
        renderSectionStatus(boxFinishingTimesArr) === "Not Started" &&
        renderSectionStatus(frontFrameFinishingTimesArr) === "Not Started" &&
        renderSectionStatus(rearFrameFinishingTimesArr) === "Not Started" &&
        renderSectionStatus(qualityInspectionTimesArr) === "Not Started"
      ? "Not Started"
      : "In Progress";

  const trailerProgressLevel =
    (renderSectionStatus(frontFrameTimesArr) === "Completed" ? 9 : 0) +
    (renderSectionStatus(rearFrameTimesArr) === "Completed" ? 6 : 0) +
    (renderSectionStatus(wallsTimesArr) === "Completed" ? 18 : 0) +
    (renderSectionStatus(boxStage1TimesArr) === "Completed" ? 5 : 0) +
    (renderSectionStatus(boxStage2TimesArr) === "Completed" ? 5 : 0) +
    (renderSectionStatus(boxStage3TimesArr) === "Completed" ? 5 : 0) +
    (renderSectionStatus(boxStage4TimesArr) === "Completed" ? 5 : 0) +
    (renderSectionStatus(smallPartsTimesArr) === "Completed" ? 8 : 0) +
    (renderSectionStatus(boxFinishingTimesArr) === "Completed" ? 10 : 0) +
    (renderSectionStatus(frontFrameFinishingTimesArr) === "Completed"
      ? 12
      : 0) +
    (renderSectionStatus(rearFrameFinishingTimesArr) === "Completed" ? 14 : 0) +
    (renderSectionStatus(qualityInspectionTimesArr) === "Completed" ? 3 : 0);
  //status and progress - end

  //render dates - start
  const getEarliestStartTime = (timesArr) => {
    const startTimes = [];
    timesArr.forEach((time) => {
      if (time.start) {
        startTimes.push(new Date(time.start));
      }
    });

    const orderedDates = startTimes.sort(function (a, b) {
      return Date.parse(a) - Date.parse(b);
    });

    return orderedDates[0]?.toISOString();
  };

  const getLatestTime = (timesArr) => {
    const endTimes = [];
    timesArr.forEach((time) => {
      if (time.start) {
        endTimes.push(new Date(time.end));
      }
    });
    const orderedDates = endTimes.sort(function (a, b) {
      return Date.parse(b) - Date.parse(a);
    });

    if (renderSectionStatus(timesArr) === "Completed") {
      return orderedDates[0]?.toISOString();
    }
  };

  //render dates - end

  return (
    <Paper
      elevation={4}
      ref={setNodeRef}
      // style={style}
      {...attributes}
      {...listeners}
      sx={{
        // width: "100%",
        height: "4rem",
        mb: 1,
        mt: 2,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transform: CSS.Transform.toString(transform),
        transition: transition,
        bgcolor: isDragging ? "var(--success5)" : "",
        "z-index": isDragging ? "10000" : "1",
      }}
    >
      <TrailerProgressDialog
        currentTrailer={props.trailer}
        openTrailerProgress={openTrailerProgress}
        handleCloseTrailerProgress={handleCloseTrailerProgress}
        renderSectionStatus={renderSectionStatus}
        renderStatus={renderStatus}
      />

      <TrailerDetailsDialog
        currentTrailer={currentTrailer}
        openDetails={openDetails}
        handleCloseDetails={handleCloseDetails}
      />

      <DeleteTrailerDialog
        isDeletingPart={props.isDeletingPart}
        currentID={props.id}
        openDeletePart={openDeletePart}
        handleOpenDeletePart={handleOpenDeletePart}
        handleCloseDeletePart={handleCloseDeletePart}
        handleDeletePart={handleDeletePart}
      />

      <Box
        sx={{
          pl: 1,
          width: "12.3rem",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "space-evenly",
          //   borderRight: "1px solid var(--secondary5)",
        }}
      >
        <Typography sx={{ fontSize: "0.9rem" }}>
          {" "}
          {props.trailer.workOrder} | {props.trailer.trailerType}
        </Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>
          {props.trailer.customer}
        </Typography>
      </Box>

      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          height: "50%",
          width: "100%",
          borderRadius: "0.2rem",
          width: "5.7rem",
          pl: 1,
          bgcolor:
            trailerStatus === "Completed"
              ? "var(--success25)"
              : trailerStatus === "In Progress"
              ? "var(--warning)"
              : "var(--error5)",
        }}
      >
        <Typography sx={{ fontSize: "0.9rem" }}>{trailerStatus}</Typography>
      </Box>
      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "4rem",
          //   bgcolor: "red",
          pl: 0,
        }}
      >
        <IconButton
          onClick={() => {
            console.log("teert");
            // setCurrentTrailer(props?.trailer);
            handleClickOpenTrailerProgress();
          }}
          sx={{
            // bgcolor: "red",
            "&:hover": {
              bgcolor: "var(--success5)",
            },
          }}
        >
          <CircularProgressForTrailers
            value={trailerProgressLevel}
            size="2.9rem"
            font="1rem"
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          ml: 2,
          width: "3.8rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          //   bgcolor: "red",
          //   borderRight: "1px solid var(--secondary5)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "46%",
            borderRadius: "0.2rem",
            bgcolor:
              renderSectionStatus(frontFrameTimesArr) === "Completed"
                ? "var(--success25)"
                : renderSectionStatus(frontFrameTimesArr) === "In Progress"
                ? "var(--warning)"
                : "var(--error5)",
          }}
        >
          <Typography sx={{ fontSize: "0.9rem", mr: 0 }}>Front</Typography>
          {/* <CheckCircleIcon
            sx={{ fontSize: "1.2rem", color: "var(--success)" }}
          /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "46%",
            borderRadius: "0.2rem",
            bgcolor:
              renderSectionStatus(rearFrameTimesArr) === "Completed"
                ? "var(--success25)"
                : renderSectionStatus(rearFrameTimesArr) === "In Progress"
                ? "var(--warning)"
                : "var(--error5)",
          }}
        >
          <Typography sx={{ fontSize: "0.9rem", mr: 0 }}> Rear</Typography>
          {/* <PriorityHighIcon
            sx={{ fontSize: "1.2rem", color: "var(--datewarning)" }}
          /> */}
        </Box>
      </Box>

      <Box
        sx={{
          ml: 2,
          width: "8.8rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          //   borderRight: "1px solid var(--secondary5)",
          //   bgcolor: "red",
        }}
      >
        {props?.trailer?.walls?.map((wall, index) => {
          return (
            <Box
              key={index}
              sx={{
                borderRadius: "0.2rem",
                width: "2rem",
                bgcolor: wall?.completedDate
                  ? "var(--success25)"
                  : wall?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",

                height: "46%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title={wall.wallType} arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  {processWallName(wall.wallType)}
                </Typography>
              </Tooltip>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "2.6rem",
          //   bgcolor: "red",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {props.trailer?.boxData?.jig === 0
            ? "TBD"
            : props.trailer?.boxData?.jig}
        </Typography>
      </Box>

      <Box
        sx={{
          ml: 2,
          width: "4rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          //   bgcolor: "red",
          //   borderRight: "1px solid var(--secondary5)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: "46%",
            width: "4rem",
            // bgcolor: "blue",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                bgcolor: props?.trailer?.boxData?.stages[0]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[0]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <Tooltip title="Box Stage 1" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S1</Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                bgcolor: props?.trailer?.boxData?.stages[1]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[1]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <Tooltip title="Box Stage 2" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S2</Typography>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: "46%",
            width: "4rem",
            // bgcolor: "blue",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                bgcolor: props?.trailer?.boxData?.stages[2]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[2]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <Tooltip title="Box Stage 3" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S3</Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                bgcolor: props?.trailer?.boxData?.stages[3]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[3]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <Tooltip title="Box Stage 4" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S4</Typography>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "13rem",
          height: "100%",
          //   bgcolor: "blue",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.1rem",
            height: "96%",
            borderRadius: "0.2rem",
            bgcolor:
              renderSectionStatus(installFramesTimesArr) === "Completed"
                ? "var(--success25)"
                : renderSectionStatus(installFramesTimesArr) === "In Progress"
                ? "var(--warning)"
                : "var(--error5)",
          }}
        >
          <Tooltip title="Frames Connected to Box" arrow>
            <Typography sx={{ fontSize: "0.8rem" }}>FC</Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.4rem",
            height: "96%",
            borderRadius: "0.2rem",
            bgcolor:
              renderSectionStatus(boxFinishingTimesArr) === "Completed"
                ? "var(--success25)"
                : renderSectionStatus(boxFinishingTimesArr) === "In Progress"
                ? "var(--warning)"
                : "var(--error5)",
          }}
        >
          <Tooltip title="Box Finishing" arrow>
            <Typography sx={{ fontSize: "0.8rem" }}>Box</Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "96%",
            borderRadius: "0.2rem",
            bgcolor:
              renderSectionStatus(frontFrameFinishingTimesArr) === "Completed"
                ? "var(--success25)"
                : renderSectionStatus(frontFrameFinishingTimesArr) ===
                  "In Progress"
                ? "var(--warning)"
                : "var(--error5)",
          }}
        >
          <Tooltip title="Front Frame Finishing" arrow>
            <Typography sx={{ fontSize: "0.8rem" }}>FFF</Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "96%",
            borderRadius: "0.2rem",
            bgcolor:
              renderSectionStatus(rearFrameFinishingTimesArr) === "Completed"
                ? "var(--success25)"
                : renderSectionStatus(rearFrameFinishingTimesArr) ===
                  "In Progress"
                ? "var(--warning)"
                : "var(--error5)",
          }}
        >
          <Tooltip title="Rear Frame Finishing" arrow>
            <Typography sx={{ fontSize: "0.8rem" }}>RFF</Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.2rem",
            height: "96%",
            borderRadius: "0.2rem",
            bgcolor:
              renderSectionStatus(qualityInspectionTimesArr) === "Completed"
                ? "var(--success25)"
                : renderSectionStatus(qualityInspectionTimesArr) ===
                  "In Progress"
                ? "var(--warning)"
                : "var(--error5)",
          }}
        >
          <Tooltip title="Quality Check" arrow>
            <Typography sx={{ fontSize: "0.8rem" }}>QC</Typography>
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "2.5rem",
          //   bgcolor: "red",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => {
            // console.log("adsfadadfadfa");
            setCurrentTrailer(props.trailer);

            handleClickOpenDetails();
          }}
        >
          <DocumentScannerIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "2.2rem",
          //   bgcolor: "red",
        }}
      >
        <Typography sx={{ fontSize: "0.9rem" }}>
          {new Date(props?.trailer?.dateRequired).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            weekday: "short",
          })}
        </Typography>
      </Box>
      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "2.2rem",
          //   bgcolor: "red",
        }}
      >
        <Typography sx={{ fontSize: "0.9rem" }}>
          {" "}
          {!!getEarliestStartTime([
            ...frontFrameTimesArr,
            ...rearFrameTimesArr,
            ...boxStage1TimesArr,
            ...boxStage2TimesArr,
            ...boxStage3TimesArr,
            ...boxStage4TimesArr,
            ...smallPartsTimesArr,
            ...frontFrameFinishingTimesArr,
            ...rearFrameFinishingTimesArr,
            ...boxFinishingTimesArr,
            ...wallsTimesArr,
            ...qualityInspectionTimesArr,
          ])
            ? new Date(
                getEarliestStartTime([
                  ...frontFrameTimesArr,
                  ...rearFrameTimesArr,
                  ...boxStage1TimesArr,
                  ...boxStage2TimesArr,
                  ...boxStage3TimesArr,
                  ...boxStage4TimesArr,
                  ...smallPartsTimesArr,
                  ...frontFrameFinishingTimesArr,
                  ...rearFrameFinishingTimesArr,
                  ...boxFinishingTimesArr,
                  ...wallsTimesArr,
                  ...qualityInspectionTimesArr,
                ])
              ).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                weekday: "short",
              })
            : ""}
        </Typography>
      </Box>

      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "2.2rem",
          //   bgcolor: "blue",
          //   bgcolor: "red",
        }}
      >
        <Typography sx={{ fontSize: "0.9rem" }}>
          {!!getLatestTime([
            ...frontFrameTimesArr,
            ...rearFrameTimesArr,
            ...boxStage1TimesArr,
            ...boxStage2TimesArr,
            ...boxStage3TimesArr,
            ...boxStage4TimesArr,
            ...smallPartsTimesArr,
            ...frontFrameFinishingTimesArr,
            ...rearFrameFinishingTimesArr,
            ...boxFinishingTimesArr,
            ...wallsTimesArr,
            ...qualityInspectionTimesArr,
          ])
            ? new Date(
                getLatestTime([
                  ...frontFrameTimesArr,
                  ...rearFrameTimesArr,
                  ...boxStage1TimesArr,
                  ...boxStage2TimesArr,
                  ...boxStage3TimesArr,
                  ...boxStage4TimesArr,
                  ...smallPartsTimesArr,
                  ...frontFrameFinishingTimesArr,
                  ...rearFrameFinishingTimesArr,
                  ...boxFinishingTimesArr,
                  ...wallsTimesArr,
                  ...qualityInspectionTimesArr,
                ])
              ).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                weekday: "short",
              })
            : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "2.2rem",
          //   bgcolor: "blue",
        }}
      >
        {trailerStatus === "Completed" && props?.trailer?.dateRequired && (
          <Typography
            sx={{
              fontSize: "1rem",
              color:
                differenceInBusinessDays(
                  getLatestTime([
                    ...frontFrameTimesArr,
                    ...rearFrameTimesArr,
                    ...boxStage1TimesArr,
                    ...boxStage2TimesArr,
                    ...boxStage3TimesArr,
                    ...boxStage4TimesArr,
                    ...smallPartsTimesArr,
                    ...frontFrameFinishingTimesArr,
                    ...rearFrameFinishingTimesArr,
                    ...boxFinishingTimesArr,
                    ...wallsTimesArr,
                    ...qualityInspectionTimesArr,
                  ]),
                  props?.trailer?.dateRequired
                ) >= 0
                  ? "var(--error)"
                  : "var(--success)",
            }}
          >
            {differenceInBusinessDays(
              getLatestTime([
                ...frontFrameTimesArr,
                ...rearFrameTimesArr,
                ...boxStage1TimesArr,
                ...boxStage2TimesArr,
                ...boxStage3TimesArr,
                ...boxStage4TimesArr,
                ...smallPartsTimesArr,
                ...frontFrameFinishingTimesArr,
                ...rearFrameFinishingTimesArr,
                ...boxFinishingTimesArr,
                ...wallsTimesArr,
                ...qualityInspectionTimesArr,
              ]),
              props?.trailer?.dateRequired
            )}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "center",
          width: "5rem",
          //   bgcolor: "red",
          textWrap: "wrap",
        }}
      >
        <Typography sx={{ fontSize: "0.8rem", wordBreak: "break-word" }}>
          2A9CTP1S5SS209334
        </Typography>
      </Box>
      <Box
        sx={{
          ml: 1,
          display: "flex",
          alignItems: "center",
          width: "5rem",
        }}
      >
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => {
            handleEditClick(props.id);
          }}
        >
          <EditIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
        <IconButton
          sx={{ ml: 0 }}
          aria-label="delete"
          color="primary"
          onClick={() => {
            console.log("sdafds");
            handleOpenDeletePart(props.id);
          }}
        >
          <DeleteIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </Box>
    </Paper>
  );
}
