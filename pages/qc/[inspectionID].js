"use client";
import { useRouter } from "next/router";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

// MUI Imports
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Component Imports
import DeviationsPieChart from "../../components/QC/DeviationsPieChart.js";
import InspectionList from "../../components/QC/InspectionList.js";
import SendReportDialog from "../../components/QC/SendReportDialog.js";
import QCDeviationDialog from "../../components/QCDeviationDialog.js";
import DeviationImageDialog from "../../components/DeviationImageDialog.js";
// import checkpointsData from "../../lib/checkpointsData.js";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginLeft: 10,
  minWidth: "10rem",

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
}));

const numValsInObject = (obj, val) => {
  let count = 0;

  // Loop through all properties in the object
  for (let key in obj) {
    // Check if the property value is true
    if (obj[key] === val) {
      count++;
    }
  }

  // Return the count of true values
  return count;
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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

function SearchAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ top: "1rem", mt: 0.5, ml: -1 }}>
            <Link href="/qc">
              <Image
                src="/platinumLogo.png"
                width={156.672}
                height={28.611}
                alt="logo"
              />
            </Link>
          </Box>
          {props.inspectionIsActive && (
            <Box
              sx={{
                top: "1rem",
                left: "3rem",
                flexGrow: 1,
                mt: 0.5,
                display: "flex",
                // bgcolor: "pink",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Box
                sx={
                  {
                    // ml: 2,
                    // bgcolor: "green",
                  }
                }
              >
                {!props.inspectionListIsLoading && (
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    WO: {props.workOrder}
                  </Typography>
                )}
                {!props.inspectionListIsLoading && (
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    {props.trailerType}
                  </Typography>
                )}
              </Box>

              {props.inspectionIsActive && (
                <Box
                  sx={{
                    ml: 0,
                    display: "flex",
                    alignItems: "center",
                    // bgcolor: "red",
                  }}
                >
                  <Button
                    onClick={() => props.saveInspectionProgress(props.id)}
                    sx={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: "1rem",
                      // mr: 2,
                      bgcolor: "var(--success75)",
                      height: "2.4rem",
                      "&:hover": {
                        bgcolor: "var(--success75)",
                      },
                    }}
                    disableRipple={true}
                  >
                    {props.isSavingInspectionList && (
                      <Box
                        sx={{
                          width: "4rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          left: "-3rem",
                        }}
                      >
                        <CircularProgress
                          size={30}
                          thickness={4}
                          sx={{
                            color: "white",
                            mr: "1rem",
                          }}
                        />
                      </Box>
                    )}
                    SAVE
                  </Button>
                </Box>
              )}

              <Box
                sx={{
                  ml: 0,
                  display: "flex",
                  alignItems: "center",
                  // bgcolor: "red",
                  height: "100%",
                  maxHeight: "2.4rem",
                  mt: 0.3,
                }}
              >
                {props.timerStatus === undefined ||
                props.timerStatus === "Not Started" ? (
                  <Button
                    onClick={props.startTimer}
                    sx={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: "1rem",
                      bgcolor: "var(--success75)",
                      height: "2.4rem",
                      "&:hover": {
                        bgcolor: "var(--success75)",
                      },
                    }}
                    disableRipple={true}
                  >
                    Start
                  </Button>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {dispSecondsAsMins(props.time)}
                    </Typography>
                    {props.isActive ? (
                      <IconButton
                        aria-label="pause"
                        color="var(--success75)"
                        onClick={props.pauseTimer}
                        sx={{ ml: 2 }}
                      >
                        <PauseCircleOutlineIcon
                          sx={{
                            fontSize: 44,
                            color: "white",
                          }}
                          color="var(--success75)"
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="play"
                        color="var(--success75)"
                        onClick={props.startTimer}
                        sx={{ ml: 2 }}
                      >
                        <PlayCircleOutlineIcon
                          sx={{
                            fontSize: 44,
                          }}
                          color="var(--success75)"
                        />
                      </IconButton>
                    )}
                  </>
                )}
              </Box>

              {props.inspectionIsActive && (
                <Box
                  sx={{
                    ml: 0,
                    display: "flex",
                    alignItems: "center",
                    // bgcolor: "red",
                  }}
                >
                  <Button
                    onClick={() => {
                      if (props.uncheckedCheckpoints) {
                        props.handleOpenSendReportDialog();
                      } else props.sendCompleteReport();
                    }}
                    sx={{
                      color: "black",
                      fontWeight: "600",
                      fontSize: "1rem",
                      bgcolor: "var(--success75)",
                      // mr: 3,
                      height: "2.4rem",
                      "&:hover": {
                        bgcolor: "var(--success75)",
                      },
                    }}
                    disableRipple={true}
                  >
                    {props.isSavingReport && (
                      <Box
                        sx={{
                          width: "4rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          left: "-3rem",
                        }}
                      >
                        <CircularProgress
                          size={30}
                          thickness={4}
                          sx={{
                            color: "white",
                            mr: "1rem",
                          }}
                        />
                      </Box>
                    )}
                    FINISH
                  </Button>
                </Box>
              )}
            </Box>
          )}
          {!props.inspectionIsActive && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Box sx={{ ml: 4 }}>
                {!props.inspectionListIsLoading && (
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      "@media (max-width: 920px)": {
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    WO: {props.workOrder}
                  </Typography>
                )}
              </Box>

              <Box sx={{ ml: 4 }}>
                {!props.inspectionListIsLoading && (
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      "@media (max-width: 920px)": {
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    Trailer: {props.trailerType}
                  </Typography>
                )}
              </Box>

              <Box sx={{ ml: 4 }}>
                {!props.inspectionListIsLoading && (
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      "@media (max-width: 920px)": {
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    Inspector: {props.inspectorName}
                  </Typography>
                )}
              </Box>

              <Box sx={{ ml: 4 }}>
                {!props.inspectionListIsLoading && (
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      "@media (max-width: 920px)": {
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    {`Date: ${new Date(props.reportDate)?.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}, ${new Date(props.reportDate)?.toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}`}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          {props.inspectionIsActive && (
            <Search sx={{ marginRight: -1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onInput={props.handleSearch}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function InspectionListPage(props) {
  const [trailerType, setTrailerType] = React.useState("");
  const [id, setId] = React.useState("");
  const [showSection, setShowSection] = React.useState(false);
  const [openedSectionIndex, setOpenedSectionIndex] = React.useState(null);
  // console.log(openedSectionIndex);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [isLoadingImg, setIsLoadingImg] = React.useState(true);
  const [isLoadingFinalInspection, setIsLoadingFinalInspection] =
    React.useState(false);

  const handleImgLoading = (state) => {
    setIsLoadingImg(state);
  };

  const [previewImage, setPreviewImage] = React.useState(null);

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
    fileReader?.readAsDataURL(file);
  };

  const [openDeviationImageDialog, setOpenDeviaitonImageDialog] =
    React.useState(false);

  const handleOpenDeviationImageDialog = (state, deviation) => {
    console.log("were opening");
    console.log(deviation);
    if (deviation) {
      setCurrentDeviation(deviation);
      setOpenDeviaitonImageDialog(state);
    }
  };

  const handleCloseDeviationImageDialog = () => {
    setOpenDeviaitonImageDialog(false);
    console.log("we set to false");
  };

  const [deviationType, setDeviationType] = React.useState("");
  const handleDeviationType = (event) => {
    setDeviationType(event.target.value);
  };

  const [checkState, setCheckState] = React.useState([]);

  const handleSetCheckState = (checkState) => {
    setCheckState([...checkState]);
  };
  const [unfilteredCheckState, setUnfilteredCheckState] = React.useState([]);

  const [value, setValue] = React.useState();

  const [time, setTime] = React.useState(0);
  const saveInterval = 300;
  const [isActive, setIsActive] = React.useState(false);
  const [timerStatus, setTimerStatus] = React.useState("");

  const updateInspectionData = async (updates) => {
    // Prepare the data to be sent to the API
    const data = {
      workOrder,
      trailerType,
      updates,
    };

    console.log(data);

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
    return response;
  };

  const startTimer = async () => {
    console.log("start timer pressed");
    console.log("time: " + time);
    if (!(time >= 0)) return;
    setIsActive(true);
    // setShowConfirmation(false);
    if (timerStatus === "Not Started" || timerStatus === undefined) {
      const startTime = Date.now();
      setTimerStatus("Running");
      console.log(time + " :Time");
      const updates = {
        "qualityInspection.initialInspection.status": "Running",
        "qualityInspection.initialInspection.startTime": startTime,
        "qualityInspection.initialInspection.time": time,
        "qualityInspection.initialInspection.isActive": isActive,
      };
      await updateInspectionData(updates);
    } else {
      await updateInspectionData({
        "qualityInspection.initialInspection.status": "Running",
      });
    }
  };

  const pauseTimer = async () => {
    setIsActive(false);
    setTimerStatus("Paused");
    const updates = {
      "qualityInspection.initialInspection.status": "Paused",
      "qualityInspection.initialInspection.isActive": false,
      "qualityInspection.initialInspection.time": time,
    };
    await updateInspectionData(updates);
  };

  const updateTimeWhileRunning = async () => {
    if (time % saveInterval === 0) {
      const updates = {
        "qualityInspection.initialInspection.time": time,
      };

      await updateInspectionData(updates);
    }
  };

  React.useEffect(() => {
    let interval = null;
    if (isActive && time >= 0) {
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

  const handleSearch = (event, newValue) => {
    setValue(event.target.value);
    if (value?.length === 0) {
      //   setCheckState(checkpointsData);
    }

    const newCheckState = checkState.filter((section) =>
      section?.SectionName.toLocaleLowerCase().includes(
        event.target.value?.toLocaleLowerCase()
      )
    );

    if (newCheckState.length > 0) {
      setCheckState(newCheckState);
    }

    // setValue(newValue);
    // props.click(props.value);
  };

  React.useEffect(() => {
    if (value?.length === 0) {
      setCheckState(unfilteredCheckState);
    }
  }, [value]);
  // const [currentURL, setCurrentURL] = React.useState(null);
  const [deviationData, setDeviationData] = React.useState(null);
  const [disableSendReport, setDisableSendReport] = React.useState(false);

  const [openComments, setOpenComments] = React.useState(false);
  const [openCommentID, setOpenCommentID] = React.useState("");
  const [picturesforCurrentWorkOrder, setPicturesforCurrentWorkOrder] =
    React.useState([]);

  const [comments, setComments] = React.useState("");
  const handleComments = (event) => {
    setComments(event.target.value);
  };

  const [currentDeviation, setCurrentDeviation] = React.useState(null);
  const handleCurrentDeviation = (deviation) => {
    setCurrentDeviation(deviation); // Set the current deviation details
  };

  const [incompletedComments, setIncompletedComments] = React.useState("");
  const handleIncompletedComments = (event) => {
    setIncompletedComments(event.target.value);
  };

  const [openCommentSectionName, setOpenCommentSectionName] =
    React.useState("");
  const [
    openCommentCheckpointDescription,
    setOpenCommentCheckpointDescription,
  ] = React.useState("");
  const [
    openCommentCheckpointSubSectionDescription,
    setOpenCommentCheckpointSubSectionDescription,
  ] = React.useState("");

  const handlePicturesforCurrentWorkOrder = (array) => {
    setPicturesforCurrentWorkOrder(array);
  };

  const handleClickOpenComments = (
    checkId,
    checkpointDescription,
    checkpointSubSectionDescription,
    sectionName,
    deviationData,
    isCorrection
  ) => {
    console.log(
      "checkpointSubSectionDescription: " + checkpointSubSectionDescription
    );
    console.log("sectionName: " + sectionName);
    handleImgLoading(true);
    setOpenComments(true);
    setOpenCommentID(checkId);
    setOpenCommentSectionName(sectionName);
    setOpenCommentCheckpointDescription(checkpointDescription);
    setOpenCommentCheckpointSubSectionDescription(
      checkpointSubSectionDescription
    );

    if (deviationData?.url) {
      setDeviationData(deviationData);
    }

    console.log(isCorrection);
    console.log("deviationData");
    console.log(deviationData);
    if (deviationData?.deviationType) {
      setDeviationType(deviationData?.deviationType);
    }

    if (deviationData?.comments) {
      setComments(deviationData?.comments);
    }
  };

  const handleCloseComments = () => {
    if (true);
    setOpenComments(false);
    setDeviationType("");
    setComments("");
    setPreviewImage(null);
    setDeviationData(null);
  };

  const [arrowDown, setArrowDown] = React.useState(true);
  const [optionalFeatures, setOptionalFeatures] = React.useState([]);
  // console.log(optionalFeatures);
  const [inspectionIsActive, setInspectionIsActive] = React.useState(false);
  const [inspectorName, setInspectorName] = React.useState(null);
  const [reportDate, setReportDate] = React.useState(null);
  const [uncheckedCheckpointsReport, setUncheckedCheckpointsReport] =
    React.useState(null);
  const [totalCheckpointsReport, setTotalCheckpointsReport] =
    React.useState(null);
  const [totalCheckpoints, setTotalCheckpoints] = React.useState(null);
  const [reasonsForIncompleted, setReasonsForIncompleted] =
    React.useState(null);

  const [trailerIsPainted, setTrailerIsPainted] = React.useState(null);
  const [electricTarps, setElectricTarps] = React.useState(null);
  const [electricDoors, setElectricDoors] = React.useState(null);
  const [airInflation, setAirInflation] = React.useState(null);
  const [lights28, setLights28] = React.useState(null);
  const [lights52, setLights52] = React.useState(null);
  const [dualDoorLocks, setDualDoorLocks] = React.useState(null);
  const [liftAxle, setLiftAxle] = React.useState(null);
  const [tiresType, setTiresType] = React.useState(null);
  const [fendersType, setFendersType] = React.useState(null);
  const [doorsOpeningDirection, setDoorsOpeningDirection] =
    React.useState(null);

  const [correctedDeviationIndexes, setCorrectedDeviationIndexes] =
    React.useState({});
  // React.useEffect(() => {
  //   console.log(correctedDeviationIndexes)
  //   const initialStates = {};
  //   picturesforCurrentWorkOrder.forEach(item => {
  //     initialStates[item.checkID] = shouldCheckboxBeChecked(item.checkID);
  //     console.log(shouldCheckboxBeChecked(item.checkID))
  //     console.log(picturesforCurrentWorkOrder)
  //   });
  //   setCorrectedDeviationIndexes(initialStates);
  //   console.log(initialStates);
  // }, [correctedDeviationIndexes]);

  const shouldCheckboxBeChecked = (checkID) => {
    let rval = false;
    picturesforCurrentWorkOrder.forEach((picture) => {
      if (picture.checkID === checkID && picture.isCorrection === true) {
        rval = true;
      }
    });
    return rval;
  };

  React.useEffect(() => {
    console.log(correctedDeviationIndexes);
    const initialStates = {};
    picturesforCurrentWorkOrder.forEach((item) => {
      console.log(item.checkID);
      initialStates[item.checkID] = shouldCheckboxBeChecked(item.checkID);
      console.log(shouldCheckboxBeChecked(item.checkID));
      console.log(picturesforCurrentWorkOrder);
    });
    setCorrectedDeviationIndexes(initialStates);
    console.log(initialStates);
  }, [picturesforCurrentWorkOrder]);

  //   const [workOrder, setWorkOrder] = React.useState(null);

  const router = useRouter();

  const showSectionHandler = (index) => {
    if (openedSectionIndex === index) {
      setShowSection(!showSection);
      setArrowDown(!arrowDown);
    }
    if (openedSectionIndex !== index) {
      setShowSection(true);
      setArrowDown(false);
    }

    setOpenedSectionIndex(index);
  };

  const handleImageClick = (picture) => {
    return () => {
      console.log("I was clicked");
      console.log(picture);
      handleOpenDeviationImageDialog(true, picture);
    };
  };

  const showArrowHandler = (index) => {
    if (openedSectionIndex === index) {
      return true;
    }
    if (openedSectionIndex !== index) {
      return false;
    }

    setOpenedSectionIndex(index);
  };

  const [inspectionListIsLoading, setInspectionListIsLoading] =
    React.useState(false);
  const [finalInspectionActive, setIFinalInspectionActive] =
    React.useState(false);

  const [finalReportPicturesArr, setFinalReportPicturesArr] =
    React.useState(null);

  const handleFinalInspectionActive = (state) => {
    setIFinalInspectionActive(state);
  };

  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getInspectionList() {
      setInspectionListIsLoading(true);

      console.log(`${router.query.inspectionID}`);
      const response = await fetch(
        `/api/planning/create-trailer?id=${router.query.inspectionID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const qualityInspection = data?.qualityInspection;
      console.log(data);

      setTiresType(qualityInspection?.tires);
      setId(data?._id);
      setFendersType(qualityInspection?.fendersType);
      setDoorsOpeningDirection(qualityInspection?.doorsOpeningDirection);
      setTrailerType(data?.trailerType);
      setWorkOrder(data?.workOrder);
      setCheckState(qualityInspection?.checkPointsData);
      setFinalReportPicturesArr(qualityInspection?.uniqueDeviationsArr);
      setIFinalInspectionActive(qualityInspection?.finalActive);
      setUnfilteredCheckState(qualityInspection?.checkPointsData);
      setInspectionIsActive(qualityInspection?.active);
      setInspectorName(qualityInspection?.inspectorName);
      setReportDate(qualityInspection?.initialInspection?.startTime);
      setUncheckedCheckpointsReport(qualityInspection?.uncheckedCheckpoints);
      setTotalCheckpointsReport(qualityInspection?.totalCheckpoints);
      setReasonsForIncompleted(qualityInspection?.reasonsForIncompleted);
      setOptionalFeatures(qualityInspection?.optionalFeatures);

      setTime(
        qualityInspection?.initialInspection?.time
          ? data?.qualityInspection?.initialInspection?.time
          : 0
      );
      // setIsActive(qualityInspection?.initialInspection?.isActive);
      // setTimerStatus(qualityInspection?.initialInspection?.timerStatus);
      setTimerStatus("Not Started");
      setTrailerIsPainted(
        qualityInspection?.optionalFeatures
          ? qualityInspection?.optionalFeatures.includes("Paint")
          : null
      );
      setElectricTarps(
        qualityInspection?.optionalFeatures
          ? data.optionalFeatures?.includes("Electric Tarp Opening")
          : null
      );
      setElectricDoors(
        qualityInspection?.optionalFeatures
          ? data.optionalFeatures?.includes("Electric Doors Opening")
          : null
      );
      setAirInflation(
        qualityInspection?.optionalFeatures
          ? data.optionalFeatures?.includes("Air Inflation")
          : null
      );
      setLights28(
        qualityInspection?.optionalFeatures
          ? data.optionalFeatures?.includes("28 extra lights")
          : null
      );
      setLights52(
        qualityInspection?.optionalFeatures
          ? data.optionalFeatures?.includes("52 extra lights")
          : null
      );
      setDualDoorLocks(
        qualityInspection?.optionalFeatures
          ? data.optionalFeatures?.includes("Dual door locks")
          : null
      );
      setLiftAxle(
        qualityInspection?.optionalFeatures
          ? data.optionalFeatures?.includes("Lift Axle")
          : null
      );
      setIsLoadingPage(false);
      //   if (!data) {
      //     router.replace("/writings");
      //   }
      //   if (data?.message === "task id is invalid") {
      //     router.replace("/writings");
      //   }

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }

      //   setIsLoading(false);
      //   return data;
    }
    const onPageLoad = () => {
      console.log("page loadded");
      if (router.query.inspectionID) {
        try {
          getInspectionList().then((response) => {
            setInspectionListIsLoading(false);
            // setTaskData(response);
          });
        } catch {
          (err) => console.log(err);
        }
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [router.query.inspectionID]);

  const sectionsConditionalRender = (trailerType, sectionArray) => {
    if (
      (trailerType === "Pup" || trailerType === "Tandem") &&
      sectionArray.SubSectionList2
    ) {
      return sectionArray?.SubSectionList2;
    } else if (
      (trailerType === "Tri 61' 2 Hoppers" ||
        trailerType === "Tri 61' 3 Hoppers" ||
        trailerType === "Tri 72' 2 Hoppers") &&
      sectionArray.SubSectionList3
    ) {
      return sectionArray?.SubSectionList3;
    } else if (
      (trailerType === "Tri 61' 2 Hoppers" ||
        trailerType === "Tri 61' 3 Hoppers" ||
        trailerType === "Tri 72' 2 Hoppers") &&
      sectionArray.SectionNumber === 6
    ) {
      return sectionArray?.SubSectionList2;
    } else if (
      (trailerType === "Pup" ||
        trailerType === "Tandem" ||
        trailerType === "Tri 61' 2 Hoppers" ||
        trailerType === "Tri 61' 3 Hoppers" ||
        trailerType === "Tri 72' 2 Hoppers") &&
      (!sectionArray.SubSectionList2 || !sectionArray.SubSectionList3)
    ) {
      return sectionArray?.SubSectionList;
    } else if (trailerType === "Lead") {
      return sectionArray?.SubSectionList;
    }
  };
  const sectionIncludesThisTrailer = (trailerType, section) => {
    if (section?.TrailersUsedIn) {
      return section?.TrailersUsedIn?.includes(trailerType);
    } else return true;
  };

  const [isSavingReport, setIsSavingReport] = React.useState(false);
  const [isSavingIncompleteReport, setIsIncompleteSavingReport] =
    React.useState(false);

  const [openSavedReportAlert, setOpenSavedReportAlert] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setOpenSavedReportAlert(false);
    }, 5000);
  }, [isSavingReport]);

  let totalCheckpointsCount = 0;
  // let uncheckedCheckpoints = 0;

  const [openSendReportDialog, setOpenSendReportDialog] = React.useState(false);
  const [uncheckedCheckpoints, setUncheckedCheckpoints] = React.useState(0);

  const handleOpenSendReportDialog = () => {
    setOpenSendReportDialog(true);
  };
  const handleCloseSendReportDialog = () => {
    setOpenSendReportDialog(false);
  };

  React.useEffect(() => {
    let totalUnchecked = 0;

    checkState?.forEach((section) => {
      if (!section?.optional || optionalFeatures.includes(section.optional)) {
        sectionsConditionalRender(trailerType, section).forEach(
          (subSection) => {
            subSection.CheckpointList?.forEach((checkpoint) => {
              // if (
              //   !subSection?.optional ||
              //   optionalFeatures.includes(subSection.optional)
              // )
              if (
                (!subSection?.optional ||
                  optionalFeatures.includes(subSection.optional) ||
                  subSection.optional === "Manual") &&
                !(
                  optionalFeatures.includes("Electric Tarp Opening") &&
                  subSection.optional === "Manual"
                )
              ) {
                totalCheckpointsCount++;

                if (
                  !checkpoint.CheckpointStatus ||
                  checkpoint.CheckpointStatus === "tbd"
                ) {
                  totalUnchecked++;
                }
              }
            });
          }
        );
      }
    });

    setUncheckedCheckpoints(totalUnchecked);
    setTotalCheckpoints(totalCheckpointsCount);
  }, [checkState]);

  async function sendCompleteReport() {
    if (value?.length > 0) {
      return;
    }

    const endTime = Date.now();
    setIsSavingReport(true);

    const updates = {
      "qualityInspection.initialInspection.status": "Complete",
      "qualityInspection.initialInspection.endTime": endTime,
      "qualityInspection.initialInspection.time": time,
      "qualityInspection.initialInspection.isActive": false,
      checkPointsData: checkState,
      inspectionProgress: inspectionProgress,
      "qualityInspection.totalCheckpoints": totalCheckpoints,
      "qualityInspection.active": false,
      "qualityInspection.uncheckedCheckpoints": uncheckedCheckpoints,
      "qualityInspection.reasonsForIncompleted": "",
      "qualityInspection.uncheckedCheckpoints": uncheckedCheckpoints,
    };
    const response = await updateInspectionData(updates);

    // const response = await fetch("/api/save-inspection-report", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: router.query.inspectionID,
    //     checkPointsData: checkState,
    //     totalCheckpoints: totalCheckpoints,
    //     uncheckedCheckpoints: uncheckedCheckpoints,
    //     reasonsForIncompleted: "",
    //     uncheckedCheckpoints: uncheckedCheckpoints,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    if (response.ok) {
      setIsSavingReport(false);
      setOpenSavedReportAlert(true);
      setInspectionIsActive(false);

      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  }

  async function sendIncompleteReport() {
    if (value?.length > 0) {
      return;
    }

    setIsIncompleteSavingReport(true);

    setOpenSendReportDialog(true);

    const endTime = Date.now();

    const updates = {
      "qualityInspection.initialInspection.status": "Complete",
      "qualityInspection.initialInspection.endTime": endTime,
      "qualityInspection.initialInspection.time": time,
      "qualityInspection.initialInspection.isActive": false,
      checkPointsData: checkState,
      inspectionProgress: inspectionProgress,
      "qualityInspection.totalCheckpoints": totalCheckpoints,
      "qualityInspection.uncheckedCheckpoints": uncheckedCheckpoints,
      "qualityInspection.active": false,
      "qualityInspection.reasonsForIncompleted": incompletedComments,
      "qualityInspection.uncheckedCheckpoints": uncheckedCheckpoints,
    };
    const response = await updateInspectionData(updates);

    if (response.ok) {
      console.log("surefire");
      const trailerUpdates = {
        "qualityInspection.initialInspection.start": "",
      };

      setIsIncompleteSavingReport(false);
      setOpenSendReportDialog(false);
      setOpenSavedReportAlert(true);

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  }

  async function setFinalCheckStart(finalActive) {
    setIsLoadingFinalInspection(true);
    const response = await fetch("/api/set-final-inspection", {
      method: "POST",
      body: JSON.stringify({
        id: router.query.inspectionID,
        finalActive: finalActive,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIFinalInspectionActive(true);
      setIsLoadingFinalInspection(false);
    }
  }

  async function finishFinalCheckStart() {
    setIsLoadingFinalInspection(true);
    const response = await fetch("/api/finish-final-inspection", {
      method: "POST",
      body: JSON.stringify({
        id: router.query.inspectionID,
        finalActive: finalInspectionActive,
        uniqueDeviationsArr: uniqueCheckpointsPictures,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload();
      setIFinalInspectionActive("completed");
      setIsLoadingFinalInspection(false);
    }
  }

  //   start={props.currentTrailer?.qualityInspection?.initialInspection?.startTime}
  //   end={props.currentTrailer?.qualityInspection?.initialInspection?.endTime}
  //   status={props.renderStatus(
  //     props.currentTrailer?.qualityInspection?.initialInspection?.startTime,
  //     props.currentTrailer?.qualityInspection?.initialInspection?.endTime,
  //   )}
  //   title={"Initial Quality Inspection"}
  // />
  // <ProcessSteps
  //   start={props.currentTrailer?.qualityInspection?.finalCheckStartingDate}
  //   end={props.currentTrailer?.qualityInspection?.finalCheckCompletedDate}

  const handleCheckStateChange = (checkpointCode, event) => {
    checkState?.forEach((section) => {
      sectionsConditionalRender(trailerType, section).forEach((subSection) => {
        subSection.CheckpointList.forEach((checkpoint) => {
          if (checkpoint.CheckpointID === checkpointCode) {
            checkpoint.CheckpointStatus = !checkpoint.CheckpointStatus;
          }
        });
      });
    });

    setCheckState([...checkState]);
  };

  const [isSavingInspectionList, setIsSavingInspectionList] =
    React.useState(false);

  const [openSavedListAlert, setOpenSavedListAlert] = React.useState(false);
  const [followUpReport, setFollowUpReport] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setOpenSavedListAlert(false);
    }, 5000);
  }, [isSavingInspectionList]);

  const [inspectionProgress, setInspectionProgress] = React.useState(null);

  const handleInspectionProgress = (state) => {
    setInspectionProgress(state);
  };

  async function saveInspectionProgress(id) {
    if (value?.length > 0) {
      return;
    }
    setIsSavingInspectionList(true);

    // const updates = {
    //   "qualityInspection.initialInspection.status": "Paused",
    //   "qualityInspection.initialInspection.isActive": false,
    //   "qualityInspection.initialInspection.time": time,
    //   "checkPointsData": checkState,
    //   "inspectionProgress": inspectionProgress,
    // }
    // await updateInspectionData(updates);

    const updates = {
      "qualityInspection.initialInspection.status": "Running",
      "qualityInspection.initialInspection.time": time,
      "qualityInspection.initialInspection.isActive": isActive,
      "qualityInspection.checkPointsData": checkState,
      "qualityInspection.inspectionProgress": inspectionProgress,
    };
    const response = await updateInspectionData(updates);

    // const response = await fetch("/api/save-inspection-progress", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id,
    //     checkPointsData: checkState,
    //     inspectionProgress: inspectionProgress,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    if (response.ok) {
      setIsSavingInspectionList(false);
      setOpenSavedListAlert(true);
    } else {
      console.log("did not save");
      setIsSavingInspectionList(false);
      setOpenSavedListAlert(false);
    }
  }

  const [workOrder, setWorkOrder] = React.useState("");
  // get imgs from DB - start
  React.useEffect(() => {
    async function getImgsHandler() {
      const response = await fetch(
        `/api/upload-quality-imgs?workOrder=${workOrder}&trailerType=${trailerType}&`,
        // `/api/upload-quality-imgs?workOrder=${workOrder}&trailerType=${trailerType}&`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }

      return data;
    }
    const onPageLoad = () => {
      // console.log("load2");
      if (workOrder && trailerType) {
        try {
          getImgsHandler().then((response) => {
            const picturesforCurrentWorkOrder = response.filter(
              (deviation) => deviation.workOrder === workOrder
            );

            setPicturesforCurrentWorkOrder(picturesforCurrentWorkOrder);
          });
        } catch {
          (err) => console.log(err);
        }
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [workOrder, openComments]);
  // get imgs from DB - end

  // upload img logic - start
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [selectedCheckID, setSelectedCheckID] = React.useState("");
  const [uploadImgURL, setUploadImgURL] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleUploadImage(
    workOrder,
    checkID,
    deviationType,
    comments,
    trailerType,
    sectionName,
    checkpointDescription,
    subSectionDescription,
    // add another field for correction
    isCorrection
  ) {
    setIsLoading(true);
    const data = new FormData();

    data.append("file", previewImage);
    data.append("tags", [
      workOrder,
      checkID,
      deviationType,
      comments,
      sectionName,
      checkpointDescription,
      subSectionDescription,
      isCorrection ? "Correction" : "Deviation",
    ]);

    const folderPath = isCorrection
      ? `QualityControl/${workOrder}/${sectionName}/${checkID}/corrections/`
      : `QualityControl/${workOrder}/${sectionName}/${checkID}/deviations/`;

    data.append("folder", folderPath);
    data.append("upload_preset", "hcrvdvwh");

    // prev folder folderPath
    // data.append("folder", workOrder + trailerType);

    // production upload_preset
    // data.append("upload_preset", "quality-check-reports");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgzynn8cb/image/upload`,
      {
        method: "POST",
        body: data,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }
    );

    const imgData = await response.json();

    if (imgData?.secure_url) {
      setUploadImgURL(imgData?.secure_url);

      const response = await fetch("/api/upload-quality-imgs", {
        method: "POST",
        body: JSON.stringify({
          workOrder,
          trailerType,
          checkID,
          deviationType,
          comments,
          sectionName,
          checkpointDescription,
          subSectionDescription,
          url: imgData.secure_url,
          isCorrection,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }

      if (data?.message === "updated") {
        //maybe add something here
      }

      if (isCorrection) {
        console.log("made it here 1057");
      }

      checkState?.forEach((section) => {
        sectionsConditionalRender(trailerType, section).forEach(
          (subSection) => {
            subSection.CheckpointList.forEach((checkpoint) => {
              if (checkpoint.CheckpointID === checkID) {
                checkpoint.CheckpointStatus = "deviation";
              }
            });
          }
        );
      });
      setCheckState([...checkState]);

      saveInspectionProgress(router.query.inspectionID);
      setPreviewImage(null);
      handleCloseComments();
    }

    setIsLoading(false);
  }

  const deviationsChartData = [];
  let weldingDeviations = 0;
  let fixingsDeviations = 0;
  let alignmentsDeviations = 0;
  let bendingDeviations = 0;
  let aestheticDeviations = 0;
  let othersDeviations = 0;
  let totalDeviations = 0;

  picturesforCurrentWorkOrder.forEach((deviation) => {
    if (!deviation.isCorrection) {
      if (deviation.deviationType === "Welding") {
        weldingDeviations++;
        totalDeviations++;
      }
      if (deviation.deviationType === "Fixings") {
        fixingsDeviations++;
        totalDeviations++;
      }
      if (deviation.deviationType === "Alignments") {
        alignmentsDeviations++;
        totalDeviations++;
      }
      if (deviation.deviationType === "Bending") {
        bendingDeviations++;
        totalDeviations++;
      }
      if (deviation.deviationType === "Aesthetic") {
        aestheticDeviations++;
        totalDeviations++;
      }
      if (deviation.deviationType === "Others") {
        othersDeviations++;
        totalDeviations++;
      }
    }
  });

  if (weldingDeviations > 0) {
    deviationsChartData.push({
      deviationType: "Welding",
      value: weldingDeviations,
    });
  }
  if (fixingsDeviations > 0) {
    deviationsChartData.push({
      deviationType: "Fixings",
      value: fixingsDeviations,
    });
  }
  if (alignmentsDeviations > 0) {
    deviationsChartData.push({
      deviationType: "Alignments",
      value: alignmentsDeviations,
    });
  }
  if (bendingDeviations > 0) {
    deviationsChartData.push({
      deviationType: "Bending",
      value: bendingDeviations,
    });
  }
  if (aestheticDeviations > 0) {
    deviationsChartData.push({
      deviationType: "Aesthetic",
      value: aestheticDeviations,
    });
  }
  if (othersDeviations > 0) {
    deviationsChartData.push({
      deviationType: "Others",
      value: othersDeviations,
    });
  }

  let uniqueCheckIds = [];
  let uniqueCheckpointsPictures = [];
  picturesforCurrentWorkOrder.forEach((deviation) => {
    if (!uniqueCheckIds.includes(deviation.checkID)) {
      uniqueCheckpointsPictures.push(deviation);
      uniqueCheckIds.push(deviation.checkID);
    }
  });

  // IMPORTANT UNCOMMENT AND FIX
  // uniqueCheckpointsPictures =
  //   finalInspectionActive !== "completed"
  //     ? uniqueCheckpointsPictures?.sort((a, b) => {
  //       console.log("rest: " + a + b);
  //         return +a?.checkID[0] - +b?.checkID[0];
  //       })
  //     : finalReportPicturesArr;

  const handleFinalCheck = (checkID, event, index) => {
    // return;
    // console.log(event);
    // add upload prompt here
    //
    let thereIsACorrection = false;

    // picturesforCurrentWorkOrder?.map((item) => {
    //   console.log(picturesforCurrentWorkOrder);
    //   if (item.checkID === checkID && item.isCorrection === true) {
    //     console.log("item?????");
    //     console.log(item);
    //     thereIsACorrection = true;
    //     handleCorrectedDeviationIndexes(index)
    //     console.log(correctedDeviationIndexes)
    //   }
    // })

    // if (thereIsACorrection) {
    //   picturesforCurrentWorkOrder?.map((item) => {
    //     if (item.checkID === checkID) {
    //       item.status = true;
    //       }
    //   });
    // }
  };

  const totalCorrectedDeviations = () => {
    let totalCorrected = 0;
    uniqueCheckpointsPictures?.map((item) => {
      if (item.status === true && !item.isCorrection) {
        totalCorrected++;
      }
    });
    return totalCorrected;
  };

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
        // maxHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // pl: 4,
        pb: 40,

        // position: "relative",
        bgcolor: "white",
        color: "black",
      }}
    >
      <Box sx={{ width: "100%", position: "sticky", top: "4rem", zIndex: "1" }}>
        <Collapse in={openSavedListAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenSavedListAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            The Inspection List has been saved
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ width: "100%", position: "sticky", top: "4rem", zIndex: "1" }}>
        <Collapse in={openSavedReportAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenSavedReportAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            The Quality Check Report has been saved
          </Alert>
        </Collapse>
      </Box>
      <SearchAppBar
        inspectionListIsLoading={inspectionListIsLoading}
        isSavingInspectionList={isSavingInspectionList}
        isSavingReport={isSavingReport}
        inspectionIsActive={inspectionIsActive}
        handleSearch={handleSearch}
        value={value}
        sendCompleteReport={sendCompleteReport}
        saveInspectionProgress={saveInspectionProgress}
        time={time}
        timerStatus={timerStatus}
        isActive={isActive}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        workOrder={workOrder}
        trailerType={trailerType}
        id={router.query.inspectionID}
        inspectorName={inspectorName}
        reportDate={reportDate}
        uncheckedCheckpoints={uncheckedCheckpoints}
        handleOpenSendReportDialog={handleOpenSendReportDialog}
      />

      <SendReportDialog
        isSavingIncompleteReport={isSavingIncompleteReport}
        openSendReportDialog={openSendReportDialog}
        uncheckedCheckpoints={uncheckedCheckpoints}
        totalCheckpoints={totalCheckpoints}
        handleCloseSendReportDialog={handleCloseSendReportDialog}
        sendIncompleteReport={sendIncompleteReport}
        incompletedComments={incompletedComments}
        handleIncompletedComments={handleIncompletedComments}
      />
      {inspectionIsActive && (
        <InspectionList
          isActive={isActive}
          tiresType={tiresType}
          fendersType={fendersType}
          doorsOpeningDirection={doorsOpeningDirection}
          optionalFeatures={optionalFeatures}
          inspectionProgress={inspectionProgress}
          handleInspectionProgress={handleInspectionProgress}
          handleSetCheckState={handleSetCheckState}
          // progressBarHeight={progressBarHeight}
          checkState={checkState}
          id={router.query.inspectionID}
          // checkpointsData={checkState}
          comments={comments}
          handleComments={handleComments}
          deviationType={deviationType}
          handleDeviationType={handleDeviationType}
          deviationData={deviationData}
          handlePicturesforCurrentWorkOrder={handlePicturesforCurrentWorkOrder}
          openComments={openComments}
          handleCloseComments={handleCloseComments}
          openCommentID={openCommentID}
          openCommentSectionName={openCommentSectionName}
          openCommentCheckpointDescription={openCommentCheckpointDescription}
          openCommentCheckpointSubSectionDescription={
            openCommentCheckpointSubSectionDescription
          }
          picturesforCurrentWorkOrder={picturesforCurrentWorkOrder}
          previewImage={previewImage}
          handleSelectImage={handleSelectImage}
          isLoadingImg={isLoadingImg}
          handleImgLoading={handleImgLoading}
          workOrder={workOrder}
          disableSendReport={disableSendReport}
          sendCompleteReport={sendCompleteReport}
          sendIncompleteReport={sendIncompleteReport}
          sectionIncludesThisTrailer={sectionIncludesThisTrailer}
          sectionsConditionalRender={sectionsConditionalRender}
          showSectionHandler={showSectionHandler}
          openedSectionIndex={openedSectionIndex}
          showSection={showSection}
          handleCheckStateChange={handleCheckStateChange}
          trailerType={trailerType}
          handleClickOpenComments={handleClickOpenComments}
          isLoading={isLoading}
          handleUploadImage={handleUploadImage}
        />
      )}

      {/* {Inspection not active sectoin} */}
      {!inspectionIsActive && (
        <Box
          sx={{
            mt: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            color: "black",
          }}
        >
          <DeviationImageDialog
            openDeviationImageDialog={openDeviationImageDialog}
            deviation={currentDeviation}
            handleOpenDeviationImageDialog={handleOpenDeviationImageDialog}
            handleCloseDeviationImageDialog={handleCloseDeviationImageDialog}
          />
          <Typography sx={{ fontSize: "2.2rem", mt: 1 }}>
            Quality Check Report{" "}
          </Typography>

          <Box sx={{ width: "100%", padding: 2 }}>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography sx={{ fontSize: "1.6rem", mt: 1, ml: 8, mb: 2 }}>
                {finalInspectionActive !== "completed"
                  ? "Initial Report, the quality deviations shown below haven't been corrected"
                  : "Final Report, including status of the quality deviations found during the first inspection"}
              </Typography>
            </Box>
            {finalInspectionActive !== "completed" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{ mb: 1, mt: -1, fontSize: "1.2rem" }}
                  variant="contained"
                  onClick={() => {
                    if (finalInspectionActive === true) {
                      finishFinalCheckStart();
                    }
                    if (finalInspectionActive === false) {
                      setFinalCheckStart(true);
                    } else return;
                  }}
                >
                  {isLoadingFinalInspection && (
                    <Box
                      sx={{
                        width: "3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // position: "absolute",
                        left: "-3rem",

                        // ml: "-4.5rem",
                        mr: "0.2rem",
                      }}
                    >
                      <CircularProgress
                        size={28}
                        thickness={4}
                        sx={{
                          color: "white",
                          mr: "1rem",
                        }}
                      />
                    </Box>
                  )}
                  {finalInspectionActive === true
                    ? "FINISH FINAL INSPECTION"
                    : "START FINAL INSPECTION"}
                </Button>
              </Box>
            )}
            <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
              Quality Deviations found: {uniqueCheckpointsPictures?.length}
            </Typography>
            {finalInspectionActive === "completed" && (
              <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
                Quality Deviations corrected:{" "}
                {numValsInObject(correctedDeviationIndexes, true)}
              </Typography>
            )}
            {finalInspectionActive === "completed" && (
              <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
                Quality Deviations not corrected:{" "}
                {numValsInObject(correctedDeviationIndexes, false)}
              </Typography>
            )}
            <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
              Checkpoints Inspected:{" "}
              {totalCheckpointsReport - uncheckedCheckpointsReport}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
              Quality Deviations over Checkpoints Inspected:
              {`${" "}${(
                (+totalDeviations /
                  (totalCheckpointsReport - uncheckedCheckpointsReport)) *
                100
              ).toFixed(2)}%`}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
              Checkpoints Approved:{" "}
              {totalCheckpointsReport -
                uncheckedCheckpointsReport -
                uniqueCheckpointsPictures?.length}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
              Total Required Checkpoints: {totalCheckpointsReport}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
              Unreviewed Checkpoints: {uncheckedCheckpointsReport}
            </Typography>
            {!!uncheckedCheckpointsReport && (
              <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 8, mb: 1 }}>
                The report has been sent incomplete due to: "
                {reasonsForIncompleted}"
              </Typography>
            )}
          </Box>

          {currentDeviation && (
            <QCDeviationDialog
              currentDeviation={currentDeviation}
              comments={comments}
              handleComments={handleComments}
              deviationType={currentDeviation.deviationType}
              handleDeviationType={handleDeviationType}
              deviationData={deviationData}
              handlePicturesforCurrentWorkOrder={
                handlePicturesforCurrentWorkOrder
              }
              openComments={openComments}
              handleCloseComments={handleCloseComments}
              openCommentID={currentDeviation.checkID}
              openCommentSectionName={currentDeviation.sectionName}
              openCommentCheckpointDescription={
                openCommentCheckpointDescription
              }
              openCommentCheckpointSubSectionDescription={
                openCommentCheckpointSubSectionDescription
              }
              picturesforCurrentWorkOrder={picturesforCurrentWorkOrder}
              previewImage={previewImage}
              handleSelectImage={handleSelectImage}
              isLoadingImg={isLoadingImg}
              handleImgLoading={handleImgLoading}
              workOrder={currentDeviation.workOrder}
              isLoading={isLoading}
              handleUploadImage={handleUploadImage}
              trailerType={trailerType}
              isCorrection={true}
              // status={dev} //figure out
            />
          )}

          <Box sx={{ width: "100%", height: "18rem" }}>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography sx={{ fontSize: "1.6rem", mt: 1, ml: 4, mb: -1 }}>
                Quality Deviations by Category
              </Typography>
            </Box>
            <DeviationsPieChart
              picturesforCurrentWorkOrder={picturesforCurrentWorkOrder}
              deviationsChartData={deviationsChartData}
              totalDeviations={totalDeviations}
            />
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography sx={{ fontSize: "1.6rem", mt: 5, ml: 4, mb: 1 }}>
              List of Quality Deviations found
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 0,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // bgcolor: "orange",
              // bgcolor: "green",
            }}
          >
            {uniqueCheckpointsPictures?.map((deviation, index) => {
              const handleCheckboxClick =
                (deviation, uniqueCheckpointsPictures) => (event) => {
                  console.log("OVER HERE");
                  console.log(deviation);
                  console.log(uniqueCheckpointsPictures);
                  event.preventDefault();
                  handleCurrentDeviation(deviation);
                  handleClickOpenComments(
                    deviation.CheckpointID,
                    deviation.CheckpointDescription,
                    deviation?.SubSectionDescription,
                    deviation.SectionName,
                    false, // don't know what it is for
                    true, // indicates it is a correction image
                    deviation?.status
                  );

                  handleFinalCheck(deviation.checkID, event, index);
                };
              return (
                <Box
                  key={index}
                  sx={{
                    //   width: "12rem",
                    width: "80%",
                    position: "relative",
                    minHeight: "20rem",
                    mb: 1,
                    mt: 1,
                    padding: 2,
                    bgcolor: "whtie",
                    // bgcolor: "red",
                    display: "flex",
                    justifyContent: "center",
                    // flexDirection:"row",
                    overflow: "auto",

                    border: "var(--mainBorder)",
                    "@media (max-width: 920px)": {
                      flexDirection: "column",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "25%",
                      "@media (max-width: 920px)": {
                        width: "100%",
                        mb: 2,
                      },
                      // bgcolor: "green",
                      bgcolor: "var(--success1)",
                      minHeight: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      p: 2,
                      alignItems: "flex-start",
                      border: "var(--mainBorder)",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{ fontSize: "1.1rem", mb: 3, fontWeight: "600" }}
                      >
                        {`Checkpoint: ${deviation.checkID} ${
                          " " + String.fromCodePoint(8680) + " "
                        }
                        ${
                          deviation?.sectionName ? deviation?.sectionName : ""
                        }${
                          deviation?.subSectionDescription
                            ? " " + String.fromCodePoint(8680) + " "
                            : ""
                        }${
                          deviation?.subSectionDescription
                            ? deviation?.subSectionDescription
                            : ""
                        }${
                          deviation?.checkpointDescription
                            ? " " + String.fromCodePoint(8680) + " "
                            : ""
                        }${
                          deviation?.checkpointDescription
                            ? deviation?.checkpointDescription
                            : ""
                        }`}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography sx={{ fontSize: "1.1rem", mb: 3 }}>
                        Deviation Category: {deviation.deviationType}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          fontSize: "1.1rem",
                          mb: 3,
                          overflowWrap: "break-word",
                          // bgcolor: "red",
                        }}
                      >
                        Inspector Comment: {deviation.comments}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "75%",

                      "@media (max-width: 920px)": {
                        width: "100%",
                      },
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: "1",
                      overflow: "auto",
                      // bgcolor: "pink",
                      position: "relative",
                      padding: 0,
                    }}
                  >
                    {/* upper row of deviation images */}
                    <Box
                      key={Math.random() + index / 223}
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-evenly",
                        borderWidth: "5px",
                        borderColor: "Black",
                        // bgcolor: "rgba(214, 40, 40, 0.3)",
                        flexWrap: "wrap",
                        //   padding: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          width: "100%",
                          textAlign: "center",
                          mb: 2,
                          fontWeight: "600",
                        }}
                      >
                        Deviation Pictures:
                      </Typography>
                      {picturesforCurrentWorkOrder.map((picture) => {
                        // console.log(picture)
                        if (picture.isCorrection) {
                          return;
                        }
                        if (picture.checkID === deviation.checkID) {
                          return (
                            <Box
                              key={44 + Math.random()}
                              sx={{
                                width: "26rem",
                                height: "26rem",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                // bgcolor: "blue",
                                position: "relative",

                                // borderRadius:"10",
                                ml: 0.5,
                                mb: 1,
                              }}
                            >
                              <Image
                                onClick={handleImageClick(picture)}
                                style={{
                                  objectFit: "contain",
                                  cursor: "pointer",
                                  // borderRadius: "10%",
                                }}
                                src={picture.url}
                                fill={true}
                                borderRadius="5%"
                                marginLeft="10 px"
                                // bgcolor="red"
                                //   onLoad={() => {}}
                                priority
                                // width={70}
                                // height={70}
                                alt="uploaded-image"
                              />
                            </Box>
                          );
                        }
                      })}
                    </Box>

                    {/* bottom row of corrected images  */}
                    <Box
                      key={Math.random() + index / 223}
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-evenly",
                        // bgcolor: "rgba(216, 243, 220, 0.6)",
                        flexWrap: "wrap",
                        //   padding: 2,
                      }}
                    >
                      {(correctedDeviationIndexes[deviation.checkID] ||
                        false) && (
                        <Typography
                          variant="h6"
                          sx={{
                            width: "100%",
                            textAlign: "center",
                            mb: 2,
                            fontWeight: "600",
                          }}
                        >
                          Correction Pictures:
                        </Typography>
                      )}
                      {picturesforCurrentWorkOrder.map((picture) => {
                        // console.log(picture)
                        if (!picture.isCorrection) {
                          return;
                        }
                        if (picture.checkID === deviation.checkID) {
                          return (
                            <Box
                              key={44 + Math.random()}
                              sx={{
                                width: "26rem",
                                height: "26rem",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                // bgcolor: "blue",
                                position: "relative",
                                borderRadius: "5%",
                                ml: 0.5,
                                mb: 1,
                              }}
                            >
                              <Image
                                onClick={handleImageClick(picture)}
                                style={{
                                  objectFit: "contain",
                                  borderRadius: "5%",
                                }}
                                src={picture.url}
                                fill={true}
                                // padding="1 rem"
                                // bgcolor="red"
                                //   onLoad={() => {}}
                                priority
                                // width={70}
                                // height={70}
                                alt="uploaded-image"
                              />
                            </Box>
                          );
                        }
                      })}
                    </Box>
                  </Box>
                  {finalInspectionActive && (
                    <Box
                      sx={{
                        width: "25%",
                        "@media (max-width: 920px)": {
                          width: "100%",
                        },

                        position: "relative",

                        bgcolor: "var(--success1)",
                        minHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        p: 2,
                        alignItems: "flex-start",
                        border: "var(--mainBorder)",
                        borderRadius: "0.5rem",
                        // bgcolor: "red"
                      }}
                    >
                      {finalInspectionActive === true && (
                        <Typography
                          sx={{
                            fontSize: "1.1rem",
                            mb: 1,
                            fontWeight: "600",
                            mt: 0,
                          }}
                        >
                          Check if the Deviation has been Corrected, and upload
                          an image
                        </Typography>
                      )}
                      {finalInspectionActive === "completed" && (
                        <Typography
                          sx={{
                            fontSize: "1.1rem",
                            mb: 1,
                            fontWeight: "600",
                            mt: 0,
                            color:
                              // deviation?.status === true ? "" : "var(--error)",
                              correctedDeviationIndexes[deviation.checkID] ||
                              false
                                ? ""
                                : "var(--error)",
                          }}
                        >
                          {/* {currentDeviation.status === true */}
                          {correctedDeviationIndexes[deviation.checkID] || false
                            ? "This Deviation has been Corrected"
                            : "This Deviation was not Corrected"}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          width: "100%",
                          height: "70%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          // bgcolor: "red",
                        }}
                      >
                        {(finalInspectionActive == "completed" ||
                          !correctedDeviationIndexes[deviation.checkID]) && (
                          <Checkbox
                            onClick={handleCheckboxClick(
                              deviation,
                              uncheckedCheckpoints
                            )}
                            checked={
                              correctedDeviationIndexes[deviation.checkID] ||
                              false
                            }
                            // checked={deviation?.status}
                            disabled={
                              finalInspectionActive === "completed"
                                ? true
                                : false
                            }
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 60 },
                              "&.Mui-disabled": {
                                color:
                                  // deviation?.status === true
                                  correctedDeviationIndexes[
                                    deviation.checkID
                                  ] || false
                                    ? "var(--primary)"
                                    : "var(--error75)",
                              },
                              color:
                                // deviation?.status === true
                                correctedDeviationIndexes[deviation.checkID] ||
                                false
                                  ? ""
                                  : "var(--error75)",
                            }}
                          />
                        )}

                        {finalInspectionActive != "completed" &&
                          correctedDeviationIndexes[deviation.checkID] && (
                            <div>
                              <IconButton
                                aria-label="delete"
                                size="large"
                                // sx={{
                                //   ml:
                                //     checkpoint.CheckpointStatus !== "deviation"
                                //       ? 2
                                //       : 0,
                                // }}
                                onClick={handleCheckboxClick(
                                  deviation,
                                  uncheckedCheckpoints
                                )}
                              >
                                <EditIcon
                                  sx={{ fontSize: 40 }}
                                  color="primary"
                                />
                              </IconButton>
                            </div>
                          )}
                      </Box>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
