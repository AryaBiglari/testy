"use client";
import * as React from "react";
import Image from "next/image";

// Components
import NewPlanningDataTable from "../../components/planning/NewPlanningDataTable.js";
import SelectMaterial from "../../components/cutting/SelectMaterial.js";
import CreateTrailerDialog from "../../components/planning/CreateTrailerDialog.js";
import SelectJig from "./SelectJig.js";

// Functions
import DetermineTrailerStatus from "./DetermineTrailerStatus.js";

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

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableTrailer } from "./SortableTrailer";

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

  const handleClickOpenCreateTrailer = () => {
    setSelectedTrailerID(null);
    setIsEditMode(false);
    setOpenCreateTrailer(true);
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
  const [isDeletingPart, setIsDeletingPart] = React.useState(false);

  const handleDeletePartAlert = (state) => {
    setdeletePartAlert(state);
  };

  const handleIsDeletingPart = (state) => {
    setIsDeletingPart(state);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setdeletePartAlert(false);
    }, 5000);
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
    console.log(trailerId);
    // setOpenEditTrailer(true);
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

  // const [rowsData, setRowsData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [workOrderValue, setWorkOrderValue] = React.useState("");
  const [fendersType, setFendersType] = React.useState("Any");
  const [config, setConfig] = React.useState("Any");
  const [doors, setDoors] = React.useState("Any");

  const [status, setStatus] = React.useState("Any");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [unfilteredRows, setUnfilteredRows] = React.useState([]);
  const [partNumbersArray, setPartNumbersArray] = React.useState([]);
  const [repeatedPartNumbers, setRepeatedPartNumbers] = React.useState([]);

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

  const [valueTrailer, setValueTrailer] = React.useState("Any");
  const [valueCustomer, setValueCustomer] = React.useState("");

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const handleCustomerSearch = (event, newValue) => {
    setValueCustomer(event.target.value);

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

    const newRows = rows.filter((row) => {
      return String(row?.part)
        .toLowerCase()
        .includes(event.target.value?.toLowerCase());
    });

    if (event.target.value.length > 0) {
      setRows(newRows);
    }
  };

  const handleWorkOrderSearch = (event, newValue) => {
    setWorkOrderValue(event.target.value);

    const newRows = rows.filter((row) => {
      return String(row?.part)
        .toLowerCase()
        .includes(event.target.value?.toLowerCase());
    });

    if (event.target.value.length > 0) {
      setRows(newRows);
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

  async function uploadPartHandler(part) {
    return;
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
      handleCreatePartAlert(true);
      handleIsCreatingPart(false);
    }
    const data = await response.json();

    return data.id;
  }

  React.useEffect(() => {
    let partialRows = unfilteredRows;

    if (workOrderValue?.length > 0) {
      partialRows = partialRows.filter((trailer) => {
        const isPass = String(trailer.workOrder)
          .toLowerCase()
          .includes(workOrderValue?.toLowerCase());
        return isPass;
      });
    }

    if (valueCustomer?.length > 0) {
      partialRows = partialRows.filter((trailer) => {
        const isPass = String(trailer.customer)
          .toLowerCase()
          .includes(valueCustomer?.toLowerCase());
        return isPass;
      });
    }

    if (valueTrailer != "Any") {
      partialRows = partialRows.filter((trialer) => {
        return String(trialer.trailerType)
          .toLowerCase()
          .includes(valueTrailer?.toLowerCase());
      });
    }

    if (showJig != "all") {
      partialRows = partialRows.filter((trailer) => {
        if (trailer.boxData.jig === 0 && showJig === "TBD") {
          return true;
        }

        const isPass = String(trailer.boxData.jig) === showJig;
        return isPass;
      });
    }

    // Determine when to mark as notStarted/inprogress/complete
    if (status !== "Any") {
      partialRows = partialRows.filter((trailer) => {
        return DetermineTrailerStatus(trailer) === status;
      });
    }

    console.log(partialRows);
    setRows(partialRows);
  }, [
    workOrderValue,
    unfilteredRows,
    valueTrailer,
    status,
    valueCustomer,
    showJig,
  ]);

  React.useEffect(() => {
    setTrailers(
      rows.map((trailer) => {
        return { id: trailer._id, ...trailer };
      })
    );
  }, [rows]);

  // get Parts - start
  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      const response = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setUnfilteredRows(data);

      //   setPartNumbersArray(
      //     data
      //       .map((part) => Number(part.part))
      //       .filter((partNumber) => !!partNumber)
      //   );

      setRows(data);
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
  }, [getTrailersAgain, getPartsAfterDelete]);

  function handleDragEndTrailers(event) {
    const { active, over } = event;

    if (!over?.id) {
      return;
    }

    if (active?.id !== over?.id) {
      setTrailers((trailers) => {
        // const oldIndex = frames.indexOf(active.id);
        const oldIndex = trailers.findIndex((x) => x.id === active?.id);

        // const newIndex = frames.indexOf(over.id);
        const newIndex = trailers.findIndex((x) => x.id === over?.id);
        setReRender(!reRender);
        return arrayMove(trailers, oldIndex, newIndex);
      });
    }
  }

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
        // mt: 2,
        pt: 0,
        pb: 4,

        // width: "100%",
        // height: "100vh",
        // bgcolor: "red",
        // overflowY: "hidden",
        // overflowX: "scroll",
        // bgcolor: "white",
        // width: "100%",
        // maxWidth: "100rem !important",
        // minWidth: "100%",
        // bgcolor: "red",
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
      <Box
        sx={{
          width: "100%",
          zIndex: "1000",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
          position: "fixed",

          //   zIndex: "10000",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "0.4rem",
            // zIndex: "10000",
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
                    setdeletePartAlert(true);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              The part has been deleted
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
                    setEditPartAlert(true);
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: props.mode !== "stock" ? "inherit" : "2rem",
                    }}
                  />
                </IconButton>
              }
              icon={
                <CheckIcon
                  sx={{ fontSize: props.mode !== "stock" ? "inherit" : "2rem" }}
                />
              }
              sx={{
                mb: 2,
                fontSize: props.mode !== "stock" ? "inherit" : "1.4rem",
              }}
            >
              {props.mode !== "stock"
                ? "The part has been edited"
                : " The stock has been updated"}
            </Alert>
          </Collapse>
        </Box>
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "0.4rem",
            zIndex: "10000",
            // bgcolor: "red",
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
            >
              A new part has been created
            </Alert>
          </Collapse>
        </Box>
        <Box
          sx={{
            width: "100%",
            // bgcolor: "brown",
            // pl: 28,
            height: "2.4rem",
            mb: 2,
            mt: 1,
            pt: 1,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            zIndex: "100000",
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
              minWidth: "12rem",
              height: "100%",
              //   bgcolor: "orange",
              position: "relative",
              ml: 2,
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
            <Button
              variant="contained"
              sx={{ ml: 4 }}
              onClick={handleClickOpenCreateTrailer}
            >
              ADD TRAILER
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              mt: -0.5,
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              //   bgcolor: "red",
              height: "100%",
            }}
          >
            {" "}
            <Typography
              sx={{
                // bgcolor: "blue",
                width: "8rem",

                //   pb: 1,
                //   pt: 0.5,
                fontSize: "1.6rem",
                mb: 0.4,
                //   ml: 12,
                //   mt: 0,
                //   mb: 2,
              }}
            >
              Planning
            </Typography>
            {/* <Button
              sx={{ position: "absolute", top: "0", left: "32rem" }}
              onClick={uploadPartHandler}
            >
              Upload Part
            </Button> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                // mr: 6,
                flexDirection: "column",
                alignItems: "center",
                // bgcolor: "red",
                width: "23rem",
              }}
            >
              <SelectJig showJig={showJig} handleShowJig={handleShowJig} />
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

          <Box sx={{ width: "8rem", zIndex: 1, ml: 1, mr: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="trailer-type-label">Trailer</InputLabel>
              <Select
                labelId="trailer-type-label"
                id="trailer-type"
                value={valueTrailer}
                defaultValue="Up-to-date"
                label="Trailer"
                onChange={handleSearchTrailer}
                sx={{
                  bgcolor: "var(--primary5)",
                  maxHeight: "2.3rem",
                  //   "& .MuiOutlinedInput-input": {
                  //     //   bgcolor: "red",
                  //     py: 0,
                  //   },
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
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: "8rem", zIndex: 1, ml: 1, mr: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-type-label">Status</InputLabel>
              <Select
                labelId="status-type-label"
                id="status-type"
                value={status}
                defaultValue="Up-to-date"
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
                <MenuItem value={"Any"}>Any</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Not Started"}>Not Started</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* <NewPlanningDataTable
        handleClickOpenCreateTrailer={handleClickOpenCreateTrailer}
        isLoadingPage={isLoadingPage}
        editPartAlert={editPartAlert}
        handleEditPartAlert={handleEditPartAlert}
        isCreatingPart={isCreatingPart}
        handleCreatePartAlert={handleCreatePartAlert}
        handleIsCreatingPart={handleIsCreatingPart}
        handleIsDeletingPart={handleIsDeletingPart}
        isDeletingPart={isDeletingPart}
        handleDeletePartAlert={handleDeletePartAlert}
        mode={props.mode}
        showJig={showJig}
        rows={rows}
        unfilteredRows={unfilteredRows}
        handleGetPartsAfterDelete={handleGetPartsAfterDelete}
        handleSetRows={handleSetRows}
        uploadPartHandler={uploadPartHandler}
        nextPartNumber={nextPartNumber}
        repeatedPartNumbers={repeatedPartNumbers}
      /> */}

      <Box
        sx={{
          //   width: "100%",
          //   height: "100%",
          mt: 9,
          px: 2,

          bgcolor: "white",

          //   bgcolor: "red",
          //   zIndex: "10000",
        }}
      >
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "fixed",
            bgcolor: "white",
            zIndex: "1000",

            // bgcolor: "orange",
            mt: -2,
            // maxWidth: "100rem !important",
            // overflowX: "scroll",
          }}
        >
          <Box sx={{ width: "12.3rem", pl: 1 }}>
            {" "}
            <Typography sx={{ fontSize: "1rem" }}>Trailer</Typography>
          </Box>

          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              width: "5.7rem",
              pl: 1,
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Status</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              width: "4rem",
              pl: 0,
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Progress</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              width: "3.8rem",
              pl: 0.5,
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Frames</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "8.8rem",
              pl: 0,
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Walls</Typography>
          </Box>
          <Box
            sx={{
              ml: 1.8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.6rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Jig</Typography>
          </Box>
          <Box
            sx={{
              ml: 2.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              //   bgcolor: "red",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Boxes</Typography>
          </Box>

          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "13rem",
              //   bgcolor: "red",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Finishing</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              width: "2.5rem",
              //   bgcolor: "red",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Spec</Typography>
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
            <Typography sx={{ fontSize: "1rem" }}>Due</Typography>
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
            <Typography sx={{ fontSize: "1rem" }}>Start</Typography>
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
            <Typography sx={{ fontSize: "1rem" }}>End</Typography>
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
            <Typography sx={{ fontSize: "1rem" }}>Dif</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              width: "5rem",
              //   bgcolor: "red",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>VIN</Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              width: "5rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Actions</Typography>
          </Box>
        </Box>
        {trailers?.length === 0 && !isLoadingPage ? (
          <Box
            sx={{
              width: "96vw",
              height: "96vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              pt: "5rem",
              //   bgcolor: "red",
            }}
          >
            {/* <Typography sx={{ fontSize: "1.6rem" }}>
              No trailers available for this filter
            </Typography> */}
          </Box>
        ) : null}
        <DndContext
          id="builder-id"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEndTrailers}
        >
          <SortableContext
            items={trailers}
            strategy={verticalListSortingStrategy}
          >
            {trailers?.map((trailer) => (
              <SortableTrailer
                key={trailer.id}
                id={trailer._id}
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
  );
}
