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
import { styled } from "@mui/system";
import {
  intlFormatDistance,
  differenceInHours,
  differenceInBusinessDays,
  subBusinessDays,
  isPast,
} from "date-fns";
import { getDisplayName } from "next/dist/shared/lib/utils.js";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  zIndex: 1,
});

export function SortableTrailerBox(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    // disabled: false,
    disabled: !!props.trailer?.boxData?.stages[0]?.startedDate,
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

  const getCustomerDisplayName = (customer) => {
    let displayName = customer;

    if (customer.length > 26) {
      displayName = customer.slice(0, 23) + "...";
    }
    return displayName;
  };

  const [openDetails, setOpenDetails] = React.useState(false);
  const [currentTrailer, setCurrentTrailer] = React.useState(null);
  const [show, setShow] = React.useState(false);

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
      start: props.trailer?.frontFrameTimeData?.startDate,
      end: props.trailer?.frontFrameTimeData?.completedDate,
    },
    {
      start: props.trailer?.frontFrameTimeData?.finishingStartTime,
      end: props.trailer?.frontFrameTimeData?.finishingEndTime,
    },
  ];

  const rearFrameTimesArr = [
    {
      start: props.trailer?.partKits?.rearFrameState?.StartTime,
      end: props.trailer?.partKits?.rearFrameState?.EndTime,
    },
    {
      start: props.trailer?.rearFrameTimeData?.startDate,
      end: props.trailer?.rearFrameTimeData?.completedDate,
    },
    {
      start: props.trailer?.rearFrameTimeData?.finishingStartTime,
      end: props.trailer?.rearFrameTimeData?.finishingEndTime,
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
      start: props.trailer?.boxData?.stages[1]?.startedDate,
      end: props.trailer?.boxData?.stages[1]?.completedDate,
    },
  ];
  const boxStage3TimesArr = [
    {
      start: props.trailer?.partKits?.boxStage3State?.StartTime,
      end: props.trailer?.partKits?.boxStage3State?.EndTime,
    },
    {
      start: props.trailer?.boxData?.stages[2]?.startedDate,
      end: props.trailer?.boxData?.stages[2]?.completedDate,
    },
  ];
  const boxStage4TimesArr = [
    {
      start: props.trailer?.partKits?.boxStage4State?.StartTime,
      end: props.trailer?.partKits?.boxStage4State?.EndTime,
    },
    {
      start: props.trailer?.boxData?.stages[3]?.startedDate,
      end: props.trailer?.boxData?.stages[3]?.completedDate,
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

  const processTrailerName = (trailer) => {
    if (trailer === "Tri 61' 2 Hoppers") {
      return "Tri 61' 2H";
    }
    if (trailer === "Tri 61' 3 Hoppers") {
      return "Tri 61' 3H";
    }
    if (trailer === "Tri 72' 2 Hoppers") {
      return "Tri 72' 2H";
    } else return trailer;
  };

  // if (!props?.trailer.boxData) {
  //   return (
  //     <Paper
  //       onMouseOver={() => setShow(true)}
  //       onMouseOut={() => setShow(false)}
  //       elevation={2}
  //       ref={setNodeRef}
  //       // style={style}
  //       {...attributes}
  //       {...listeners}
  //       sx={{
  //         // width: "100%",
  //         height: "3.2rem",
  //         mb: 0,
  //         mt: props.index === 0 ? 1.5 : 1,
  //         display: "flex",
  //         alignItems: "center",
  //         cursor: !!props.trailer?.boxData?.stages[0]?.startedDate
  //           ? ""
  //           : "pointer",
  //         position: "relative",
  //         // width: "39rem",
  //         transform: CSS.Transform.toString(transform),
  //         transition: transition,
  //         bgcolor: isDragging ? "var(--success5)" : "",
  //         bgcolor:
  //           new Date(props?.trailer?.trailerExpectedEnd) >
  //           new Date(props?.trailer?.dateRequired)
  //             ? "var(--error25)"
  //             : "",
  //         "z-index": isDragging ? "10000" : "1",
  //         overflowX: "visible",
  //       }}
  //     ></Paper>
  //   );
  // }

  return (
    <Paper
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      elevation={2}
      ref={setNodeRef}
      // style={style}
      {...attributes}
      {...listeners}
      sx={{
        // width: "100%",
        height: "3.2rem",
        mb: 0,
        mt: props.index === 0 ? 1.5 : 1,
        display: "flex",
        alignItems: "center",
        cursor: !!props.trailer?.boxData?.stages[0]?.startedDate
          ? ""
          : "pointer",
        position: "relative",
        // width: "39rem",
        transform: CSS.Transform.toString(transform),
        transition: transition,
        bgcolor: isDragging ? "var(--success5)" : "",
        // bgcolor: (new Date(props?.trailer?.trailerExpectedEnd) > new Date(props?.trailer?.dateRequired)) ? "var(--error25)" : "",
        "z-index": isDragging ? "10000" : "1",
        overflowX: "visible",
      }}
    >
      <TrailerProgressDialog
        currentTrailer={props.trailer}
        id={props.trailer._id}
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
          width: "10rem",
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
          {props.trailer.workOrder} {props.trailer.trailerType ? "|" : ""}{" "}
          {processTrailerName(props.trailer.trailerType)}
        </Typography>
        <Typography
          sx={{
            fontSize: props.trailer.customer.length > 13 ? "0.75rem" : "0.9rem",
          }}
        >
          {getCustomerDisplayName(props.trailer.customer)}
        </Typography>
      </Box>
      <Box
        sx={{
          ml: 1,
          display: "flex",
          alignItems: "center",
          width: "3.35rem",
          // bgcolor: "red",
          pl: 0,
        }}
      >
        <CustomTooltip title={trailerStatus} arrow>
          <IconButton
            onClick={() => {
              // setCurrentTrailer(props?.trailer);
              handleClickOpenTrailerProgress();
            }}
            sx={{
              // bgcolor: "red",
              width: "2.4rem",
              height: "2.4rem",
              bgcolor:
                trailerStatus === "Completed"
                  ? "var(--success25)"
                  : trailerStatus === "In Progress"
                  ? "var(--warning)"
                  : "var(--error5)",
              "&:hover": {
                bgcolor:
                  trailerStatus === "Completed"
                    ? "var(--success5)"
                    : trailerStatus === "In Progress"
                    ? "var(--warningdark)"
                    : "var(--error15)",
              },
            }}
          >
            <CircularProgressForTrailers
              value={trailerProgressLevel}
              size="2.4rem"
              font="0.70rem"
            />
          </IconButton>
        </CustomTooltip>
      </Box>
      {/* <Box
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
      </Box> */}
      {/* <Box
        sx={{
          ml: 1,
          width: "3.8rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          // bgcolor: "red",
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
            width: "3.8rem",
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
            width: "3.8rem",
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
      </Box> */}
      <Box
        sx={{
          ml: 0,
          width: "1.8rem",

          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          // bgcolor: "red",
          //   borderRight: "1px solid var(--secondary5)",
        }}
      >
        {props?.trailer?.boxData?.stages[0]?.completedDate &&
          props?.trailer?.boxData?.stages[1]?.completedDate &&
          props?.trailer?.boxData?.stages[2]?.completedDate &&
          props?.trailer?.boxData?.stages[3]?.completedDate && (
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                height: "2.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                bgcolor: props?.trailer?.boxData?.stages[3]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[3]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <CustomTooltip title="Box Stage 4" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S4</Typography>
              </CustomTooltip>
            </Box>
          )}
        {!props?.trailer?.boxData?.stages[0]?.startedDate &&
          !props?.trailer?.boxData?.stages[1]?.startedDate &&
          !props?.trailer?.boxData?.stages[2]?.startedDate &&
          !props?.trailer?.boxData?.stages[3]?.startedDate && (
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                height: "2.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                bgcolor: props?.trailer?.boxData?.stages[0]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[0]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <CustomTooltip title="Box Stage 1" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S1</Typography>
              </CustomTooltip>
            </Box>
          )}

        {props?.trailer?.boxData?.stages[0]?.startedDate &&
          !props?.trailer?.boxData?.stages[1]?.startedDate && (
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                height: "2.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                bgcolor: props?.trailer?.boxData?.stages[0]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[0]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <CustomTooltip title="Box Stage 1" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S1</Typography>
              </CustomTooltip>
            </Box>
          )}

        {props?.trailer?.boxData?.stages[1]?.startedDate &&
          !props?.trailer?.boxData?.stages[2]?.startedDate && (
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                height: "2.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                bgcolor: props?.trailer?.boxData?.stages[1]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[1]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <CustomTooltip title="Box Stage 2" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S2</Typography>
              </CustomTooltip>
            </Box>
          )}

        {props?.trailer?.boxData?.stages[2]?.startedDate &&
          !props?.trailer?.boxData?.stages[3]?.startedDate && (
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                height: "2.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                bgcolor: props?.trailer?.boxData?.stages[2]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[2]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <CustomTooltip title="Box Stage 3" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S3</Typography>
              </CustomTooltip>
            </Box>
          )}

        {props?.trailer?.boxData?.stages[3]?.startedDate &&
          !props?.trailer?.boxData?.stages[3]?.completedDate && (
            <Box
              sx={{
                borderRadius: "0.2rem",
                width: "1.8rem",
                height: "2.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                bgcolor: props?.trailer?.boxData?.stages[3]?.completedDate
                  ? "var(--success25)"
                  : props?.trailer?.boxData?.stages[3]?.startedDate
                  ? "var(--warning)"
                  : "var(--error5)",
              }}
            >
              <CustomTooltip title="Box Stage 4" arrow>
                <Typography sx={{ fontSize: "0.8rem" }}>S4</Typography>
              </CustomTooltip>
            </Box>
          )}

        {/* {renderSectionStatus(boxStage1TimesArr) === "In Progress" && (
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
            <Tooltip title="Box Stage 4" arrow>
              <Typography sx={{ fontSize: "0.8rem" }}>S11</Typography>
            </Tooltip>
          </Box>
        )} */}
      </Box>
      <Box
        sx={{
          ml: 1,
          display: "flex",
          alignItems: "center",
          width: "2.2rem",
          // bgcolor: "red",
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
          ml: 1,
          display: "flex",
          alignItems: "space-around",
          justifyContent: "flex-start",
          width: "4.8rem",
        }}
      >
        <Box
          sx={{
            width: "3rem",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <CustomTooltip title="Expected Start" arrow>
            <Typography sx={{ fontSize: "0.8rem", mb: 0.3 }}>
              {new Date(props?.trailer?.boxExpectedStart).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  // weekday: "short",
                }
              )}
            </Typography>
          </CustomTooltip>
          <CustomTooltip title="Actual Start" arrow>
            <Typography sx={{ fontSize: "0.8rem" }}>
              {props?.trailer?.boxData?.stages[0]?.startedDate
                ? new Date(
                    props?.trailer?.boxData?.stages[0]?.startedDate
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    // weekday: "short",
                  })
                : "---"}
            </Typography>
          </CustomTooltip>
        </Box>
        <Box
          sx={{
            width: "1.8rem",
            // bgcolor: "orange",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props?.trailer?.boxData?.stages[0]?.startedDate && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color:
                  differenceInBusinessDays(
                    props?.trailer?.boxData?.stages[0]?.startedDate,
                    props?.trailer?.boxExpectedStart
                  ) <= 0
                    ? "var(--success75)"
                    : "var(--error50)",
              }}
            >
              (
              {differenceInBusinessDays(
                props?.trailer?.boxData?.stages[0]?.startedDate,
                props?.trailer?.boxExpectedStart
              )}
              )
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          ml: 2,
          display: "flex",
          alignItems: "space-around",
          justifyContent: "flex-start",
          width: "4.8rem",
        }}
      >
        <Box
          sx={{
            width: "3rem",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <CustomTooltip title="Expected End" arrow>
            <Typography sx={{ fontSize: "0.8rem", mb: 0.3 }}>
              {new Date(props?.trailer?.boxExpectedEnd).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  // weekday: "short",
                }
              )}
            </Typography>
          </CustomTooltip>
          <CustomTooltip title="Actual End" arrow>
            <Typography sx={{ fontSize: "0.8rem", mb: 0.3 }}>
              {props?.trailer?.boxData?.stages[3]?.completedDate
                ? new Date(
                    props?.trailer?.boxData?.stages[3]?.completedDate
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    // weekday: "short",
                  })
                : "---"}
            </Typography>
          </CustomTooltip>
        </Box>
        <Box
          sx={{
            width: "1.8rem",
            // bgcolor: "orange",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props?.trailer?.boxData?.stages[3]?.completedDate && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color:
                  differenceInBusinessDays(
                    props?.trailer?.boxData?.stages[3]?.completedDate,
                    props?.trailer?.boxExpectedEnd
                  ) <= 0
                    ? "var(--success75)"
                    : "var(--error50)",
              }}
            >
              (
              {differenceInBusinessDays(
                props?.trailer?.boxData?.stages[3]?.completedDate,
                props?.trailer?.boxExpectedEnd
              )}
              )
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          ml: 2,
          mr: 1,
          display: "flex",
          alignItems: "space-around",
          justifyContent: "flex-start",
          width: "4.8rem",
          // bgcolor: "orange",
        }}
      >
        <Box
          sx={{
            width: "3rem",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <CustomTooltip title="Expected End" arrow>
            <Typography sx={{ fontSize: "0.8rem", mb: 0.3 }}>
              {new Date(props?.trailer?.trailerExpectedEnd).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  // weekday: "short",
                }
              )}
            </Typography>
          </CustomTooltip>
          <CustomTooltip title="Actual End" arrow>
            <Typography sx={{ fontSize: "0.8rem", mb: 0.3 }}>
              {props.trailer?.qualityInspection?.finalCheckCompletedDate
                ? new Date(
                    props.trailer?.qualityInspection?.finalCheckCompletedDate
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    // weekday: "short",
                  })
                : "---"}
            </Typography>
          </CustomTooltip>
        </Box>
        <Box
          sx={{
            width: "1.8rem",
            // bgcolor: "orange",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.trailer?.qualityInspection?.finalCheckCompletedDate && (
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color:
                  differenceInBusinessDays(
                    props.trailer?.qualityInspection?.finalCheckCompletedDate,
                    props?.trailer?.trailerExpectedEnd
                  ) &&
                  differenceInBusinessDays(
                    props.trailer?.qualityInspection?.finalCheckCompletedDate,
                    props?.trailer?.trailerExpectedEnd
                  ) <= 0
                    ? "var(--success75)"
                    : "var(--error50)",
              }}
            >
              (
              {differenceInBusinessDays(
                props.trailer?.qualityInspection?.finalCheckCompletedDate,
                props?.trailer?.trailerExpectedEnd
              )}
              )
            </Typography>
          )}
        </Box>
      </Box>
      {/* <Box
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
                month: "short",
                day: "numeric",
                // weekday: "short",
              })
            : ""}
        </Typography>
      </Box> */}
      {/* <Box
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
      </Box> */}
      {/* <Box
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
      </Box> */}
      {show && (
        <Box
          sx={{
            ml: 1,
            display: "flex",
            alignItems: "center",
            position: "absolute",
            right: "-2.2rem",
            // left: "36.5rem",
            flexDirection: "column",
            // width: "5rem",
          }}
        >
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => {
              handleEditClick(props.id);
            }}
          >
            <EditIcon
              sx={{
                fontSize: "1.2rem",
              }}
            />
          </IconButton>

          <IconButton
            sx={{ ml: 0 }}
            aria-label="delete"
            color="primary"
            onClick={() => {
              handleOpenDeletePart(props.id);
            }}
          >
            <DeleteIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
}
