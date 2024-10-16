"use client";
import * as React from "react";
import Image from "next/image";

// Components
import PartsDataTable from "../../components/parts/PartsDataTable.js";
import SelectType from "./SelectType.js";
import SelectWT from "../../components/cutting/SelectWT.js";

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
import ListSubheader from "@mui/material/ListSubheader";
import { cat } from "@cloudinary/url-gen/qualifiers/focusOn";

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

  const handleEditPartAlert = (state) => {
    setEditPartAlert(state);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setEditPartAlert(false);
    }, 5000);
  }, [editPartAlert]);

  const [showType, setShowType] = React.useState("all");
  const [showWT, setShowWT] = React.useState("all");

  const [rows, setRows] = React.useState([]);
  const [uniqueSuppliersArray, setUniqueSuppliersArray] = React.useState([]);

  // const [rowsData, setRowsData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [valueCode, setValueCode] = React.useState("");
  const [trailerType, setTrailerType] = React.useState([]);
  const [category, setCategory] = React.useState([]);

  const handleTrailerTypeChange = (event) => {
    setTrailerType(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [status, setStatus] = React.useState(["Up-to-date", "Caution"]);
  const handleStatusChange = (event) => {
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
  const [valueSupplier, setValueSupplier] = React.useState("");

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [isLoadingProjections, setIsLoadingProjections] = React.useState(true);

  const handleSearchDescription = (event, newValue) => {
    setValueDescription(event.target.value);
  };

  const handleSearch = (event, newValue) => {
    setValue(event.target.value);
  };
  const handleSearchCode = (event, newValue) => {
    setValueCode(event.target.value);
  };
  const handleSearchSupplier = (event, newValue) => {
    setValueSupplier(event.target.value);
  };

  const handleShowType = (type) => {
    setShowType(type);
  };
  const handleShowWT = (WT) => {
    setShowWT(WT);
  };

  const handleSetRows = (rows) => {
    setRows(rows);
  };

  const [getPartsAgain, setGetPartsAgain] = React.useState(false);
  const [getPartsAfterDelete, setGetPartsAfterDelete] = React.useState(false);

  const handleGetPartsAfterDelete = (id) => {
    setGetPartsAfterDelete(id);
  };

  async function uploadPartHandler(part) {
    handleIsCreatingPart(true);
    const response = await fetch("/api/parts/upload-part", {
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
      console.log(data);

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

  // console.log(neededPartsArr);
  //get needed parts projection from Trailers collection - end

  // get Parts - start
  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      const response = await fetch(`/api/parts/upload-part`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

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

      const orderedByPart = data.sort((part1, part2) => {
        return part1.part - part2.part;
      });

      setUnfilteredRows(data);

      setPartNumbersArray(
        data
          .map((part) => Number(part.part))
          .filter((partNumber) => !!partNumber)
      );

      //   [
      //     ...noMatParts,
      //     ...onlyALParts,
      //     ...onlyCSParts,
      //     ...onlyQT100Parts,
      //     ...onlySSParts,
      //   ].filter((item) => {
      //     return item.status === status;
      //   })

      setRows(data);

      const uniqueSuppliers = [];
      const seenSupplierNames = new Set();

      data.forEach((row) => {
        row?.suppliers?.forEach((supplier) => {
          if (!seenSupplierNames.has(supplier.name)) {
            seenSupplierNames.add(supplier.name);
            uniqueSuppliers.push(supplier);
          }
        });
      });

      console.log(uniqueSuppliers);
      console.log(seenSupplierNames);

      setUniqueSuppliersArray(uniqueSuppliers);

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

  const handleUpdateAllRows = (newRows) => {
    console.log(newRows);
    setIsLoadingPage(true);
    try {
      // function fractionToDecimal(f) {
      //   if (f === "0.078") {
      //     return 0.078;
      //   }
      //   if (f === "1") {
      //     return 1;
      //   }

      //   return f.split("/").reduce((n, d, i) => n / (i ? d : 1));
      // }

      // Helper function to merge new rows into unfiltered rows
      const updatedUnfilteredRows = unfilteredRows.map((row) => {
        const updatedRow = newRows.find((newRow) => newRow._id === row._id);
        return updatedRow ? { ...row, ...updatedRow } : row;
      });

      const orderedByPart = data.sort((part1, part2) => {
        return part1.part - part2.part;
      });

      // const onlyALParts = orderedByWT.filter((part) => part.mat === "AL");
      // const onlyCSParts = orderedByWT.filter((part) => part.mat === "CS");
      // const onlyQT100Parts = orderedByWT.filter((part) => part.mat === "QT100");
      // const onlySSParts = orderedByWT.filter((part) => part.mat === "SS");
      // const noMatParts = orderedByWT.filter((part) => part.mat === "");

      const newUnfilteredRows = [...orderedByPart];
      console.log(newUnfilteredRows);
      setUnfilteredRows(newUnfilteredRows);

      // setUnfilteredRows(updatedUnfilteredRows);

      setPartNumbersArray(
        newRows
          .map((part) => Number(part.part))
          .filter((partNumber) => !!partNumber)
      );

      const uniqueSuppliersArray = [];
      const seenSupplierNames = new Set();

      updatedUnfilteredRows.forEach((row) => {
        row.suppliers?.forEach((supplier) => {
          if (!seenSupplierNames.has(supplier.name)) {
            seenSupplierNames.add(supplier.name);
            uniqueSuppliersArray.push(supplier);
          }
        });
      });

      setUniqueSuppliersArray(uniqueSuppliersArray);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  //   filter useEffect starts
  React.useEffect(() => {
    let partialRows = unfilteredRows;

    if (status.length > 0) {
      partialRows = partialRows.filter((item) => {
        if (status.includes("None") && !item.status) {
          return true;
        }
        return status.includes(item?.status);
      });
    }

    if (showType !== "all") {
      partialRows = partialRows.filter((item) => {
        return item.type === showType;
      });
    }

    if (trailerType.length > 0) {
      partialRows = partialRows.filter((item) => {
        return item.trailerType?.some((trailer) => {
          return trailerType.includes(trailer);
        });
      });
    }

    if (category.length > 0) {
      partialRows = partialRows.filter((item) => {
        return category.includes(item?.category);
      });
    }

    if (value?.length > 0) {
      partialRows = partialRows.filter((item) => {
        return String(item.part).toLowerCase().includes(value?.toLowerCase());
      });
    }

    if (valueCode?.length > 0) {
      partialRows = partialRows.filter((item) => {
        return String(item.code)
          .toLowerCase()
          .includes(valueCode?.toLowerCase());
      });
    }

    if (valueSupplier?.length > 0) {
      partialRows = partialRows.filter((row) => {
        // Check if any supplier in row.suppliers matches valueSupplier
        return row?.suppliers?.some((supplier) =>
          String(supplier.name)
            .toLowerCase()
            .includes(valueSupplier.toLowerCase())
        );
      });
    }

    if (valueDescription?.length > 0) {
      partialRows = partialRows.filter((item) => {
        return String(item.description)
          .toLowerCase()
          .includes(valueDescription?.toLowerCase());
      });
    }

    setRows(partialRows);
  }, [
    showType,
    showWT,
    value,
    valueCode,
    valueSupplier,
    trailerType,
    category,
    valueDescription,
    status,
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
            >
              A new part has been created
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
              setValueCode("");
              setValueSupplier("");
              setShowType("all");
              setCategory([]);
              setStatus([]);
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
              {props.mode !== "stock" ? "Parts Stock" : "Stock"}
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
          <Search sx={{ marginRight: 1, zIndex: 1, color: "black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Ext Code..."
              inputProps={{ "aria-label": "search" }}
              value={valueCode}
              onInput={handleSearchCode}
            />
          </Search>

          <Search sx={{ marginRight: 1, zIndex: 1, color: "black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Supplier..."
              inputProps={{ "aria-label": "search" }}
              value={valueSupplier}
              onInput={handleSearchSupplier}
            />
          </Search>

          <Box sx={{ width: "10.5rem", zIndex: 1, ml: 1, mr: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-type"
                multiple
                value={category}
                label="Category"
                onChange={handleCategoryChange}
                sx={{
                  bgcolor: "var(--primary5)",
                  maxHeight: "2.3rem",
                }}
              >
                <ListSubheader
                  sx={{
                    mb: -0.5,
                    bgcolor: "var(--success5)",
                    fontWeight: "600",
                  }}
                >
                  Ready-to-use Materials
                </ListSubheader>
                <MenuItem value={"Bolts"}>Bolts</MenuItem>
                <MenuItem value={"Hucks"}>Hucks</MenuItem>
                <MenuItem value={"Washers"}>Washers</MenuItem>
                <MenuItem value={"Nuts"}>Nuts</MenuItem>
                <MenuItem value={"Rivets"}>Rivets</MenuItem>
                <MenuItem value={"Hoses"}>Hoses</MenuItem>
                <MenuItem value={"Valves"}>Valves</MenuItem>
                <MenuItem value={"Air Line Tubing"}>Air Line Tubing</MenuItem>
                <MenuItem value={"Lights"}>Lights</MenuItem>
                <MenuItem value={"Bezels"}>Bezels</MenuItem>
                <MenuItem value={"Fittings"}>Air Fittings</MenuItem>
                <MenuItem value={"Tires"}>Tires</MenuItem>
                <MenuItem value={"Rims"}>Rims</MenuItem>
                <MenuItem value={"Fenders"}>Fenders</MenuItem>
                <MenuItem value={"Axles"}>Axles</MenuItem>
                <MenuItem value={"Tarps"}>Tarps</MenuItem>
                <MenuItem value={"Air Tanks"}>Air Tanks</MenuItem>
                <MenuItem value={"Rubber"}>Rubber</MenuItem>
                <MenuItem value={"Bushings"}>Bushings</MenuItem>
                <MenuItem value={"Filters"}>Filters</MenuItem>
                <MenuItem value={"Tapes"}>Tapes</MenuItem>
                <MenuItem value={"Cables"}>Cables</MenuItem>
                <MenuItem value={"Harnesses"}>Harnesses</MenuItem>
                <MenuItem value={"Boxes"}>Boxes</MenuItem>
                <MenuItem value={"Landing Gear"}>Landing Gear</MenuItem>
                <MenuItem value={"Fifth Wheel Plate"}>
                  Fifth Wheel Plate
                </MenuItem>
                <MenuItem value={"Bars"}>Bars</MenuItem>
                <MenuItem value={"Pipes"}>Pipes</MenuItem>
                <MenuItem value={"Rods"}>Rods</MenuItem>
                <MenuItem value={"Walkways"}>Walkways</MenuItem>
                <MenuItem value={"Steps"}>Steps</MenuItem>
                <MenuItem value={"Others - Electric"}>
                  Others - Electric
                </MenuItem>
                <MenuItem value={"Others - Mechanic"}>
                  Others - Mechanic
                </MenuItem>
                <MenuItem value={"Others - General"}>Others - General</MenuItem>
                <ListSubheader
                  sx={{
                    mb: -0.5,
                    bgcolor: "var(--success5)",
                    fontWeight: "600",
                  }}
                >
                  Processed Materials
                </ListSubheader>
                <MenuItem value={"W Arms"}>W Arms</MenuItem>
                <MenuItem value={"Support Arms"}>Support Arms</MenuItem>
                <ListSubheader
                  sx={{
                    mb: -0.5,
                    bgcolor: "var(--success5)",
                    fontWeight: "600",
                  }}
                >
                  Consumable Materials
                </ListSubheader>
                <MenuItem value={"Plasma Consumables"}>
                  Plasma Consumables
                </MenuItem>
                <MenuItem value={"Gas"}>Gas</MenuItem>
                <MenuItem value={"Welding Wire"}>Welding Wire</MenuItem>
                <MenuItem value={"Cutting Discs"}>Cutting Discs</MenuItem>
                <MenuItem value={"Coolant"}>Coolant</MenuItem>
                <MenuItem value={"Lubricants"}>Lubricants</MenuItem>
                <MenuItem value={"PPE"}>PPE</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
          <SelectType
            showType={showType}
            handleShowType={handleShowType}
            mode={props.mode}
          />
          {/* <SelectWT showWT={showWT} handleShowWT={handleShowWT} /> */}
        </Box>
      </Box>

      <PartsDataTable
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
        handleUpdateAllRows={handleUpdateAllRows}
        showType={showType}
        rows={rows}
        unfilteredRows={unfilteredRows}
        uniqueSuppliersArray={uniqueSuppliersArray}
        handleGetPartsAfterDelete={handleGetPartsAfterDelete}
        handleSetRows={handleSetRows}
        uploadPartHandler={uploadPartHandler}
        nextPartNumber={nextPartNumber}
        repeatedPartNumbers={repeatedPartNumbers}
        neededPartsArr={neededPartsArr}
      />
    </Box>
  );
}
