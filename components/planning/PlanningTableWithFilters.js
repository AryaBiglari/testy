"use client";
import * as React from "react";
import Image from "next/image";

// Components
import NewPlanningDataTable from "../../components/planning/NewPlanningDataTable.js";
import SelectMaterial from "../../components/cutting/SelectMaterial.js";
import CreateTrailerDialog from "../../components/planning/CreateTrailerDialog.js";
import SelectJig from "./SelectJig.js";

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
  const [openCreateTrailer, setOpenCreateTrailer] = React.useState(false);

  const handleClickOpenCreateTrailer = () => {
    setOpenCreateTrailer(true);
  };
  const handleCloseCreateTrailer = () => {
    setOpenCreateTrailer(false);
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

  const [rows, setRows] = React.useState([]);

  // const [rowsData, setRowsData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [fendersType, setFendersType] = React.useState("Any");
  const [config, setConfig] = React.useState("Any");
  const [doors, setDoors] = React.useState("Any");

  const [status, setStatus] = React.useState("Any");
  const handleStatusChange = (event) => {
    setFendersType("Any");
    setConfig("Any");
    setDoors("Any");
    setStatus("Any");
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

  const [valueTrailer, setValueTrailer] = React.useState("");
  const [valueDescription, setValueDescription] = React.useState("");

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const handleSearchDescription = (event, newValue) => {
    setValueDescription(event.target.value);

    const newRows = rows.filter((row) =>
      row.description
        ?.toLocaleLowerCase()
        .includes(event.target.value?.toLocaleLowerCase())
    );

    if (event.target.value.length > 0) {
      setRows(newRows);
    }
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
  const handleSearchTrailer = (event, newValue) => {
    setValueTrailer(event.target.value);
    if (valueTrailer?.length === 0) {
      //   setCheckState(checkpointsData);
    }

    const newRows = rows.filter((row) => {
      let trailerStr = "";
      row.trailerType?.map((trailer) => (trailerStr = trailerStr + trailer));

      return trailerStr
        .toLocaleLowerCase()
        .includes(event.target.value?.toLocaleLowerCase());
    });

    if (event.target.value.length > 0) {
      setRows(newRows);
    }
  };

  const handleShowJig = (jig) => {
    setShowJig(jig);
  };

  //   filter useEffect starts
  React.useEffect(() => {
    setRows(unfilteredRows);

    if (showMat !== "all" && showWT !== "all") {
      if (fendersType !== "Any") {
        setRows(
          unfilteredRows.filter((item) => {
            return (
              item.mat === showMat &&
              item.WT === showWT &&
              item.fenderType === fendersType
            );
          })
        );
      }

      if (fendersType === "Any") {
        if (config === "Any") {
          if (doors !== "Any") {
            setRows(
              unfilteredRows.filter((item) => {
                return (
                  item.mat === showMat &&
                  item.WT === showWT &&
                  item.doors === doors
                );
              })
            );
          }

          if (doors === "Any") {
            if (status !== "Any") {
              setRows(
                unfilteredRows.filter((item) => {
                  return (
                    item.mat === showMat &&
                    item.WT === showWT &&
                    item.status === status
                  );
                })
              );
            }

            if (status === "Any") {
              setRows(
                unfilteredRows.filter((item) => {
                  return item.mat === showMat && item.WT === showWT;
                })
              );
            }
          }
        }
        if (config !== "Any") {
          setRows(
            unfilteredRows.filter((item) => {
              return (
                item.mat === showMat &&
                item.WT === showWT &&
                item.config === config
              );
            })
          );
        }
      }
    }
    if (showMat === "all" && showWT !== "all") {
      if (fendersType !== "Any") {
        setRows(
          unfilteredRows.filter((item) => {
            return item.WT === showWT && item.fenderType === fendersType;
          })
        );
      }

      if (fendersType === "Any") {
        if (config === "Any") {
          if (doors !== "Any") {
            setRows(
              unfilteredRows.filter((item) => {
                return item.WT === showWT && item.doors === doors;
              })
            );
          }
          if (doors === "Any") {
            if (status !== "Any") {
              setRows(
                unfilteredRows.filter((item) => {
                  return item.WT === showWT && item.status === status;
                })
              );
            }

            if (status === "Any") {
              setRows(
                unfilteredRows.filter((item) => {
                  return item.WT === showWT;
                })
              );
            }
          }
        }
        if (config !== "Any") {
          setRows(
            unfilteredRows.filter((item) => {
              return item.WT === showWT && item.config === config;
            })
          );
        }
      }
    }
    if (showMat !== "all" && showWT === "all") {
      if (fendersType !== "Any") {
        setRows(
          unfilteredRows.filter((item) => {
            return item.mat === showMat && item.fenderType === fendersType;
          })
        );
      }

      if (fendersType === "Any") {
        if (config === "Any") {
          if (doors !== "Any") {
            setRows(
              unfilteredRows.filter((item) => {
                return item.mat === showMat && item.doors === doors;
              })
            );
          }

          if (doors === "Any") {
            if (status !== "Any") {
              setRows(
                unfilteredRows.filter((item) => {
                  return item.mat === showMat && item.status === status;
                })
              );
            }

            if (status === "Any") {
              setRows(
                unfilteredRows.filter((item) => {
                  return item.mat === showMat;
                })
              );
            }
          }
        }
        if (config !== "Any") {
          setRows(
            unfilteredRows.filter((item) => {
              return item.mat === showMat && item.config === config;
            })
          );
        }
      }
    }
    if (showMat === "all" && showWT === "all" && fendersType !== "Any") {
      setRows(
        unfilteredRows.filter((item) => {
          return item.fenderType === fendersType;
        })
      );
    }
    if (showMat === "all" && showWT === "all" && fendersType === "Any") {
      if (config !== "Any") {
        setRows(
          unfilteredRows.filter((item) => {
            return item.config === config;
          })
        );
      }

      if (config === "Any") {
        if (doors !== "Any") {
          setRows(
            unfilteredRows.filter((item) => {
              return item.doors === doors;
            })
          );
        }

        if (doors === "Any") {
          if (status !== "Any") {
            setRows(
              unfilteredRows.filter((item) => {
                return item.status === status;
              })
            );
          }
        }
      }
    }
  }, [
    showMat,
    showWT,
    value?.length === 0,
    valueTrailer?.length === 0,
    valueDescription?.length === 0,
    status,
    fendersType,
    config,
    doors,
  ]);
  //   filter useEffect ends

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

      console.log(data);

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
      <CreateTrailerDialog
        openCreateTrailer={openCreateTrailer}
        handleClickOpenCreateTrailer={handleClickOpenCreateTrailer}
        handleCloseCreateTrailer={handleCloseCreateTrailer}
        handleSetRows={handleSetRows}
        rows={rows}
        handleGetTrailersAgain={handleGetTrailersAgain}
      />
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
              setShowMat("all");
              setShowWT("all");
              setConfig("Any");
              setDoors("Any");
              setStatus("Any");
              setFendersType("Any");
              setValueTrailer("");
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
              justifyContent: "space-between",
              //   bgcolor: "red",
            }}
          >
            {" "}
            <Typography
              sx={{
                //   bgcolor: "blue",
                width: "13rem",
                //   pb: 1,
                //   pt: 0.5,
                fontSize: "1.6rem",
                //   ml: 12,
                //   mt: 0,
                //   mb: 2,
              }}
            >
              Planning System
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
                flexDirection: props.mode !== "stock" ? "row" : "column",
                alignItems: "center",
                // bgcolor: "red",
                width: "18rem",
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
              value={value}
              onInput={handleSearch}
            />
          </Search>

          <Search sx={{ marginRight: 1, zIndex: 1, color: "black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Trailer..."
              inputProps={{ "aria-label": "search" }}
              value={valueTrailer}
              onInput={handleSearchTrailer}
            />
          </Search>

          {props.mode !== "stock" && (
            <Search sx={{ marginRight: 1, zIndex: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Customer..."
                inputProps={{ "aria-label": "search" }}
                value={valueDescription}
                onInput={handleSearchDescription}
              />
            </Search>
          )}

          {props.mode !== "stock" && (
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
          )}
        </Box>
      </Box>

      <NewPlanningDataTable
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
      />
    </Box>
  );
}
