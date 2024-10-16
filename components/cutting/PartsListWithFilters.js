"use client";
import * as React from "react";
import Image from "next/image";

// Components
import CuttingDataTable from "./CuttingDataTable.js";
import SelectMaterial from "./SelectMaterial.js";
import SelectWT from "./SelectWT.js";

// MUI Imports
import Box from "@mui/material/Box";
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,

  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  backgroundColor: "var(--primary5)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    backgroundColor: "var(--primary15)",
  },
  // marginLeft: 10,
  maxWidth: "10rem",
  //   maxHeight: "1rem",

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
  //   backgroundColor: "red",
  maxWidth: "1rem",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1, 0.8, 0),
    // vertical padding + font size from searchIcon
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

export default function PartsListWithFilter(props) {
  const [deletePartAlert, setDeletePartAlert] = React.useState(false);
  const [isDeletingPart, setIsDeletingPart] = React.useState(false);
  const [deletePartStatus, setDeletePartStatus] = React.useState(false);

  const handleDeletePartAlert = (state, status) => {
    setDeletePartAlert(state);
    setDeletePartStatus(status);
  };

  const handleIsDeletingPart = (state) => {
    setIsDeletingPart(state);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setDeletePartAlert(false);
    }, 5000);
  }, [isDeletingPart]);

  const [createPartAlert, setCreatePartAlert] = React.useState(false);
  const [isCreatingPart, setIsCreatingPart] = React.useState(false);
  const [createPartStatus, setCreatePartStatus] = React.useState(false);

  const handleCreatePartAlert = (state, status) => {
    setCreatePartAlert(state);
    setCreatePartStatus(status);
  };

  const handleIsCreatingPart = (state) => {
    setIsCreatingPart(state);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setCreatePartAlert(false);
    }, 5000);
  }, [isCreatingPart]);

  const [alertActive, setAlertActve] = React.useState(false);
  const [activeAlertType, setActiveAlertType] = React.useState("");
  const [activeAlertMessage, setActiveAlertMessage] = React.useState("");

  const handleActiveAlert = (state, type, message) => {
    setAlertActve(state);
    setActiveAlertType(type);
    setActiveAlertMessage(message);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setAlertActve(false);
    }, 5000);
  }, [alertActive]);

  const [editPartAlert, setEditPartAlert] = React.useState(false);
  const [editPartStatus, setEditPartStatus] = React.useState(false);

  const handleEditPartAlert = (state, status) => {
    setEditPartAlert(state);
    setEditPartStatus(status);
  };

  const editPartAlertText = (mode, status) => {
    if (mode === "stock" && status) {
      return "The stock has been updated";
    } else if (mode === "stock" && !status) {
      return "The stock failed to update";
    } else if (mode !== "stock" && status) {
      return "The part has been edited";
    } else if (mode !== "stock" && !status) {
      return "The part failed to be edited";
    } else {
      ("There was some issue");
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setEditPartAlert(false);
    }, 5000);
  }, [editPartAlert]);

  const [showMat, setShowMat] = React.useState("all");
  const [showWT, setShowWT] = React.useState("all");

  const [rows, setRows] = React.useState([]);

  // const [rowsData, setRowsData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [fendersType, setFendersType] = React.useState([]);
  const [trailerType, setTrailerType] = React.useState([]);
  const [config, setConfig] = React.useState([]);

  // console.log(rows);
  // console.log(rows[0]);

  const handleFendersTypeChange = (event) => {
    setFendersType(event.target.value);
  };
  const handleTrailerTypeChange = (event) => {
    setTrailerType(event.target.value);
  };

  const handleConfigChange = (event) => {
    // setFendersType("Any");
    // setDoors("Any");
    // setStatus("Any");
    setConfig(event.target.value);
  };

  const [doors, setDoors] = React.useState([]);
  const handleDoorsChange = (event) => {
    // setFendersType("Any");
    // setConfig("Any");
    // setStatus("Any");
    setDoors(event.target.value);
  };
  const [status, setStatus] = React.useState(["Up-to-date", "Caution"]);
  const handleStatusChange = (event) => {
    // setFendersType("Any");
    // setConfig("Any");
    // setDoors("Any");
    // setStatus("Any");
    setStatus(event.target.value);
  };

  const [unfilteredRows, setUnfilteredRows] = React.useState([]);
  const [partNumbersArray, setPartNumbersArray] = React.useState([]);
  const [repeatedPartNumbers, setRepeatedPartNumbers] = React.useState([]);

  // const pendingDocs =
  //   (unfilteredRows.filter((row) => !row.bendingURL).length /
  //     unfilteredRows.length) *
  //   100;
  const completedDocs =
    (unfilteredRows.filter(
      (row) => row.bendingIsRequired === true && row.bendingURL
    ).length /
      unfilteredRows.filter((row) => row.bendingURL).length) *
    100;

  const nextPartNumber = Math.max(...partNumbersArray) + 1;

  React.useEffect(() => {
    const duplicated = [];

    partNumbersArray.forEach((element, index) => {
      if (partNumbersArray.indexOf(element) !== index) {
        duplicated.push(element);
      }
    });

    setRepeatedPartNumbers(duplicated);
  }, [partNumbersArray, repeatedPartNumbers.length]);

  // const [valueTrailer, setValueTrailer] = React.useState("");
  const [valueDescription, setValueDescription] = React.useState("");

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [isLoadingProjections, setIsLoadingProjections] = React.useState(true);

  const handleSearchDescription = (event, newValue) => {
    setValueDescription(event.target.value);

    // const newRows = rows.filter((row) =>
    //   row.description
    //     ?.toLocaleLowerCase()
    //     .includes(event.target.value?.toLocaleLowerCase())
    // );

    // if (event.target.value.length > 0) {
    //   setRows(newRows);
    // }
  };

  const handleSearch = (event, newValue) => {
    setValue(event.target.value);

    // const newRows = rows.filter((row) => {
    //   return String(row?.part)
    //     .toLowerCase()
    //     .includes(event.target.value?.toLowerCase());
    // });

    // if (event.target.value.length > 0) {
    //   setRows(newRows);
    // }
  };
  // const handleSearchTrailer = (event, newValue) => {
  //   setValueTrailer(event.target.value);
  //   if (valueTrailer?.length === 0) {
  //     //   setCheckState(checkpointsData);
  //   }

  //   const newRows = rows.filter((row) => {
  //     let trailerStr = "";
  //     row.trailerType?.map((trailer) => (trailerStr = trailerStr + trailer));

  //     return trailerStr
  //       .toLocaleLowerCase()
  //       .includes(event.target.value?.toLocaleLowerCase());
  //   });

  //   if (event.target.value.length > 0) {
  //     setRows(newRows);
  //   }
  // };

  const handleShowMat = (mat) => {
    setShowMat(mat);
  };
  const handleShowWT = (WT) => {
    setShowWT(WT);
  };

  const handleSetRows = (rows) => {
    console.log("Rows have been handled");
    console.log(rows);
    setRows(rows);
  };

  const [getPartsAgain, setGetPartsAgain] = React.useState(false);
  const [getPartsAfterDelete, setGetPartsAfterDelete] = React.useState(false);

  const handleGetPartsAfterDelete = (id) => {
    setGetPartsAfterDelete(id);
  };

  async function uploadPartHandler(part) {
    handleIsCreatingPart(true);
    const response = await fetch("/api/cutting/upload-part", {
      method: "POST",
      body: JSON.stringify({ part }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setGetPartsAgain(!getPartsAgain);
      handleCreatePartAlert(true, true);
      handleIsCreatingPart(false);
    } else {
      handleCreatePartAlert(true, false);
    }
    const data = await response.json();

    return data.id;
  }

  //get needed parts projection from Trailers collection - start
  const [trailers, setTrailers] = React.useState([]);
  React.useEffect(() => {
    setIsLoadingProjections(true);
    async function getPartsHandler() {
      const response = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setTrailers(data);

      setIsLoadingProjections(false);

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }
    const onPageLoad = () => {
      try {
        getPartsHandler().then((response) => {});
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
  }, []);

  const neededPartsArr = [];

  trailers.map((trailer) => {
    trailer?.boxStage1?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Box Stage 1",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });

    trailer?.boxStage2?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Box Stage 2",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.boxStage3?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Box Stage 3",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.boxStage4?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Box Stage 4",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.boxFinishing?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Box Finishing",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.frontFrameFinishingParts?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Front Frame Finishing",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.rearFrameFinishingParts?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Rear Frame Finishing",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.frontFrameParts?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Front Frame",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.rearFrameParts?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Rear Frame",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
    trailer?.hopperDoorParts?.map((part) => {
      neededPartsArr.push({
        ...part,
        process: "Small Parts Stage",
        dateReqForTrailer: trailer?.dateRequired,
        WO: trailer.workOrder,
        trailerType: trailer.trailerType,
      });
    });
  });

  const handleUpdateAllRows = (newRows) => {
    console.log(newRows);
    setIsLoadingPage(true);
    try {
      function fractionToDecimal(f) {
        if (f === "0.078") {
          return 0.078;
        }
        if (f === "1") {
          return 1;
        }

        return f.split("/").reduce((n, d, i) => n / (i ? d : 1));
      }

      // Helper function to merge new rows into unfiltered rows
      const updatedUnfilteredRows = unfilteredRows.map((row) => {
        const updatedRow = newRows.find((newRow) => newRow._id === row._id);
        return updatedRow ? { ...row, ...updatedRow } : row;
      });

      const orderedByWT = updatedUnfilteredRows.sort((part1, part2) => {
        return fractionToDecimal(part2.WT) - fractionToDecimal(part1.WT);
      });

      const onlyALParts = orderedByWT.filter((part) => part.mat === "AL");
      const onlyCSParts = orderedByWT.filter((part) => part.mat === "CS");
      const onlyQT100Parts = orderedByWT.filter((part) => part.mat === "QT100");
      const onlySSParts = orderedByWT.filter((part) => part.mat === "SS");
      const noMatParts = orderedByWT.filter((part) => part.mat === "");

      setUnfilteredRows([
        ...noMatParts,
        ...onlyALParts,
        ...onlyCSParts,
        ...onlyQT100Parts,
        ...onlySSParts,
      ]);

      setPartNumbersArray(
        newRows
          .map((part) => Number(part.part))
          .filter((partNumber) => !!partNumber)
      );
      console.log("Handle UPDATE ALL ROWS");
      console.log(status);

      console.log(unfilteredRows);

      // setRows(newRowsToBeSet); // not needed to be set change to unfillterrd rows will trigger useeffect
      setIsLoadingPage(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  // console.log(neededPartsArr);
  //get needed parts projection from Trailers collection - end

  // get Parts - start
  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      const response = await fetch(`/api/cutting/upload-part`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // console.log(data);

      // const sortedParts = data?.sort((Mat1, Mat2) => Mat1.mat - Mat2.mat);

      function fractionToDecimal(f) {
        if (f === "0.078") {
          return 0.078;
        }
        if (f === "1") {
          return 1;
        }

        return f.split("/").reduce((n, d, i) => n / (i ? d : 1));
      }

      function comparePart(part) {
        if (!Number(part)) {
          return 1;
        } else return Number(part);
      }

      const orderedByWT = data.sort((part1, part2) => {
        return fractionToDecimal(part2.WT) - fractionToDecimal(part1.WT);
      });

      const onlyALParts = orderedByWT?.filter((part) => part.mat === "AL");

      const onlyCSParts = orderedByWT?.filter((part) => part.mat === "CS");
      const onlyQT100Parts = orderedByWT?.filter(
        (part) => part.mat === "QT100"
      );
      const onlySSParts = orderedByWT?.filter((part) => part.mat === "SS");
      const noMatParts = orderedByWT?.filter((part) => part.mat === "");

      setUnfilteredRows([
        ...noMatParts,
        ...onlyALParts,
        ...onlyCSParts,
        ...onlyQT100Parts,
        ...onlySSParts,
      ]);

      setPartNumbersArray(
        data
          .map((part) => Number(part.part))
          .filter((partNumber) => !!partNumber)
      );

      // console.log("Fetching")

      setIsLoadingPage(false);

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }
    const onPageLoad = () => {
      try {
        getPartsHandler().then((response) => {});
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
  }, [getPartsAgain, getPartsAfterDelete]);

  //   filter useEffect starts
  React.useEffect(() => {
    // console.log("Filtering???")
    let partialRows = unfilteredRows;

    if (status.length > 0) {
      partialRows = partialRows.filter((item) => {
        if (status.includes("None") && !item.status) {
          return true;
        }
        return status.includes(item?.status);
      });
    }

    if (showMat !== "all") {
      partialRows = partialRows.filter((item) => {
        return item?.mat === showMat;
      });
    }
    if (showWT !== "all") {
      partialRows = partialRows.filter((item) => {
        return item?.WT === showWT;
      });
    }
    if (config.length > 0) {
      partialRows = partialRows.filter((item) => {
        return config.includes(item?.config);
      });
    }
    if (doors.length > 0) {
      partialRows = partialRows.filter((item) => {
        return doors.includes(item?.doors);
      });
    }
    if (fendersType.length > 0) {
      partialRows = partialRows.filter((item) => {
        return fendersType.includes(item?.fenderType);
      });
    }
    if (trailerType.length > 0) {
      partialRows = partialRows.filter((item) => {
        return item.trailerType?.some((trailer) => {
          return trailerType.includes(trailer);
        });
      });
    }

    if (value?.length > 0) {
      partialRows = partialRows.filter((item) => {
        return String(item.part).toLowerCase().includes(value?.toLowerCase());
      });
    }
    console.log(partialRows);
    if (valueDescription?.length > 0) {
      partialRows = partialRows.filter((item) => {
        return String(item.description)
          .toLowerCase()
          .includes(valueDescription?.toLowerCase());
      });
    }

    setRows(partialRows);
  }, [
    showMat,
    showWT,
    value,
    trailerType,
    valueDescription,
    status,
    fendersType,
    config,
    doors,
    isLoadingPage,
    isLoadingProjections,
    unfilteredRows,
  ]);

  //   filter useEffect ends
  // getPartsAgain, getPartsAfterDelete
  // get Parts - end

  // if (isLoadingPage) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         width: 1,
  //         minHeight: "100vh",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <CircularProgress
  //         size={65}
  //         thickness={4}
  //         sx={{
  //           color: "primary",
  //         }}
  //       />
  //     </Box>
  //   );
  // }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        // mt: 2,
        pt: 1,
        pb: 4,
        height: "100vh",
        // bgcolor: "red",
        overflowY: "hidden",
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          // bgcolor: "green",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "0.4rem",
            zIndex: "100",
          }}
        >
          <Collapse in={alertActive}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertActve(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity={activeAlertType}
              sx={{ mb: 2 }}
            >
              {activeAlertMessage}
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
          <Collapse in={deletePartAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setDeletePartAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity={deletePartStatus ? "success" : "error"}
            >
              {deletePartStatus
                ? "The part has been deleted"
                : "There was an issue part did not delete"}
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
          <Collapse in={editPartAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setEditPartAlert(false);
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: props.mode !== "stock" ? "inherit" : "2rem",
                    }}
                  />
                </IconButton>
              }
              // icon={
              //   <CheckIcon
              //     sx={{ fontSize: props.mode !== "stock" ? "inherit" : "2rem" }}
              //   />
              // }
              sx={{
                mb: 2,
                fontSize: props.mode !== "stock" ? "inherit" : "1.4rem",
              }}
              severity={editPartStatus ? "success" : "error"}
            >
              {editPartAlertText(props.mode, editPartStatus)}
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
          <Collapse in={createPartAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setCreatePartAlert(true);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity={createPartStatus ? "success" : "error"}
            >
              {createPartStatus
                ? "A new part has been created"
                : "There was an issue new part was not created"}
            </Alert>
          </Collapse>
        </Box>
        <Box
          sx={{
            width: props.mode !== "stock" ? "96%" : "98%",
            // bgcolor: "brown",
            // pl: 28,
            height: "2.4rem",
            mb: 2,
            mt: 1,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            onClick={() => {
              setValue("");
              setShowMat("all");
              setShowWT("all");
              setConfig([]);
              setDoors([]);
              setStatus([]);
              setFendersType([]);
              setTrailerType([]);

              setValueDescription("");
            }}
            sx={{
              minWidth: "12rem",
              height: "100%",
              // bgcolor: "orange",
              position: "relative",
              ml: -0.3,
              display: "flex",
              justifyContent: "flex-start",
              flex: 0.8,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image
              src="/platinumLogo.png"
              width={163.84}
              height={29.92}
              // fill={true}
              alt="logo"
              priority={true}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              //   bgcolor: "red",
            }}
          >
            {" "}
            <Typography
              sx={{
                //   bgcolor: "blue",
                width: "10rem",
                //   pb: 1,
                //   pt: 0.5,
                fontSize: "1.6rem",
                //   ml: 12,
                //   mt: 0,
                //   mb: 2,
              }}
            >
              {props.mode !== "stock" ? "Stock Control" : "Stock"}
            </Typography>
            {/* <Button
              sx={{ position: "absolute", top: "0", left: "32rem" }}
              onClick={uploadPartHandler}
            >
              Upload Part
            </Button> */}
          </Box>
          <Search sx={{ marginRight: 1, zIndex: 1, color: "black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Part..."
              inputProps={{ "aria-label": "search" }}
              value={value}
              onInput={handleSearch}
            />
          </Search>

          {/* <Search sx={{ marginRight: 1, zIndex: 1, color: "black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Trailer..."
              inputProps={{ "aria-label": "search" }}
              value={valueTrailer}
              onInput={handleSearchTrailer}
            />
          </Search> */}

          {props.mode !== "stock" && (
            <Search sx={{ marginRight: 1, zIndex: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Description..."
                inputProps={{ "aria-label": "search" }}
                value={valueDescription}
                onInput={handleSearchDescription}
              />
            </Search>
          )}

          <Box sx={{ width: "10.5rem", zIndex: 1, ml: 1, mr: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="trailer-type-label">Trailer</InputLabel>
              <Select
                labelId="trailer-type-label"
                id="trailer-type"
                multiple
                value={trailerType}
                label="Trailer"
                onChange={handleTrailerTypeChange}
                sx={{
                  bgcolor: "var(--primary5)",
                  maxHeight: "2.3rem",
                  //   "& .MuiOutlinedInput-input": {
                  //     //   bgcolor: "red",
                  //     py: 0,
                  //   },
                }}
              >
                <MenuItem value={"Lead"}>Lead</MenuItem>
                <MenuItem value={"Pup"}>Pup</MenuItem>
                <MenuItem value={"Tri 61 2 Hoppers"}>Tri 61 2 Hoppers</MenuItem>
                <MenuItem value={"Tri 72 2 Hoppers"}>Tri 72 2 Hoppers</MenuItem>
                <MenuItem value={"Tri 61 3 Hoppers"}>Tri 61 3 Hoppers</MenuItem>
                <MenuItem value={"Tandem"}>Tandem</MenuItem>
                <MenuItem value={"4 Axle"}>4 Axle</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {props.mode !== "stock" && (
            <Box sx={{ width: "8rem", zIndex: 1, ml: 1, mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="fenders-type-label">Fenders</InputLabel>
                <Select
                  labelId="fenders-type-label"
                  id="fenders-type"
                  multiple
                  value={fendersType}
                  label="Fenders"
                  onChange={handleFendersTypeChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Heartland"}>Heartland</MenuItem>
                  <MenuItem value={"Adomar"}>Adomar</MenuItem>
                  <MenuItem value={"Stainless"}>Stainless</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {props.mode !== "stock" && (
            <Box sx={{ width: "8rem", zIndex: 1, ml: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="config-label">Config.</InputLabel>
                <Select
                  labelId="config-label"
                  id="config"
                  multiple
                  value={config}
                  label="Config."
                  onChange={handleConfigChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Mid"}>Mid</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          {props.mode !== "stock" && (
            <Box sx={{ width: "8rem", zIndex: 1, ml: 2, mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="doors-type-label">Doors</InputLabel>
                <Select
                  labelId="doors-type-label"
                  id="doors-type"
                  multiple
                  value={doors}
                  label="Doors"
                  onChange={handleDoorsChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"In"}>In</MenuItem>
                  <MenuItem value={"Out"}>Out</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          {props.mode !== "stock" && (
            <Box sx={{ width: "12rem", zIndex: 1, ml: 1, mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-type-label">Status</InputLabel>
                <Select
                  labelId="status-type-label"
                  id="status-type"
                  value={status}
                  multiple
                  label="Status"
                  onChange={handleStatusChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Up-to-date"}>Up-to-date</MenuItem>
                  <MenuItem value={"Caution"}>Caution</MenuItem>
                  <MenuItem value={"Outdated"}>Outdated</MenuItem>
                  <MenuItem value={"None"}>None</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: props.mode !== "stock" ? "row" : "column",
            alignItems: "center",
            // bgcolor: "red",
            width: props.mode !== "stock" ? "92%" : "96%",
            mb: 0.8,
            // "& > *": {
            //   m: 1,
            // },
            pl: props.mode !== "stock" ? 21 : 0,
          }}
        >
          <SelectMaterial
            showMat={showMat}
            handleShowMat={handleShowMat}
            mode={props.mode}
          />
          <SelectWT showWT={showWT} handleShowWT={handleShowWT} />
        </Box>
      </Box>

      <CuttingDataTable
        isLoadingPage={isLoadingPage}
        isLoadingProjections={isLoadingProjections}
        editPartAlert={editPartAlert}
        handleEditPartAlert={handleEditPartAlert}
        isCreatingPart={isCreatingPart}
        handleCreatePartAlert={handleCreatePartAlert}
        handleIsCreatingPart={handleIsCreatingPart}
        handleIsDeletingPart={handleIsDeletingPart}
        handleActiveAlert={handleActiveAlert}
        isDeletingPart={isDeletingPart}
        handleDeletePartAlert={handleDeletePartAlert}
        mode={props.mode}
        showMat={showMat}
        rows={rows}
        unfilteredRows={unfilteredRows}
        handleGetPartsAfterDelete={handleGetPartsAfterDelete}
        handleSetRows={handleSetRows}
        handleUpdateAllRows={handleUpdateAllRows}
        uploadPartHandler={uploadPartHandler}
        nextPartNumber={nextPartNumber}
        repeatedPartNumbers={repeatedPartNumbers}
        neededPartsArr={neededPartsArr}
      />
    </Box>
  );
}
