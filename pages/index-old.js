"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SecondTable from "../components/SecondTable.js";
import CircularWithValueLabel from "../components/CircularWithValueLabel.js";
import main from "../components/mainRows.js";

import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
// import VINCalculator from "../components/VINCalculator.js";
import { Button } from "@mui/material";
import { getISOWeek } from "date-fns";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [eng, setEng] = React.useState(true);
  const [goalType, setGoalType] = React.useState("month");
  const [totalTrailers, setTotalTrailers] = React.useState(true);
  const [completedTrailers, setCompletedTrailers] = React.useState(true);

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  const monthName = new Date().toLocaleString("default", { month: "long" });
  const mesNombre = capitalize(
    new Date().toLocaleString("es-ES", { month: "long" })
  );
  // console.log(monthName);
  // console.log(mesNombre);

  // const updateCompletedTrailersHandler = () => {

  // }

  async function uploadTrailerHandler() {
    const response = await fetch("/api/trailers", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Check connection to DB - start
  async function saveProgressHandler(trailer) {
    const response = await fetch("/api/update-progress", {
      method: "POST",
      body: JSON.stringify({ trailer }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong, please try again");
    }

    if (data?.message === "updated") {
      // console.log("hola");
    }
    return data;
  }
  // Check connection to DB - end

  // get trailers - start
  React.useEffect(() => {
    setIsLoading(true);
    async function getTrailersHandler() {
      const response = await fetch(`/api/trailers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      const sortedTrailers = data?.sort(
        (d1, d2) =>
          new Date(d1.dateRequired).getTime() -
          new Date(d2.dateRequired).getTime()
      );

      // console.log(data.filter((trailer) => trailer.WONumber === 123903254)[0]);

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }

      if (goalType === "month") {
        // console.log(data);

        const trailersThisMonth = sortedTrailers?.filter((trailer) => {
          if (
            new Date(trailer.dateRequired).getMonth() === new Date().getMonth()
          ) {
            return trailer;
          }
        });

        setMainRows(trailersThisMonth);

        let totalTrailers = 0;
        let completedTrailers = 0;

        trailersThisMonth.forEach((trailer) => {
          totalTrailers++;
          if (trailer.status === "Completed") {
            completedTrailers++;
          }
        });

        setTotalTrailers(totalTrailers);
        setCompletedTrailers(completedTrailers);

        // setMainRows([data[0]]);
      }
      if (goalType === "week") {
        const trailersThisWeek = sortedTrailers?.filter((trailer) => {
          if (
            getISOWeek(new Date(trailer.dateRequired)) ===
            getISOWeek(new Date())
          ) {
            return trailer;
          }
        });

        setMainRows(trailersThisWeek);

        let totalTrailers = 0;
        let completedTrailers = 0;

        trailersThisWeek.forEach((trailer) => {
          totalTrailers++;
          if (trailer.status === "Completed") {
            completedTrailers++;
          }
        });

        setTotalTrailers(totalTrailers);
        setCompletedTrailers(completedTrailers);
      }

      setIsLoading(false);
      return data;
    }
    const onPageLoad = () => {
      try {
        getTrailersHandler().then((response) => {});
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
  }, [goalType]);
  // get trailers - end

  const [mainRows, setMainRows] = React.useState(main);

  //goals change without rerender - start
  //goals change without rerender - start

  // mainRows.forEach((trailer) => {
  //   trailer.wallsList.forEach((wall) => console.log(wall));
  // });

  // const [rerenderTable, setRerenderTable] = React.useState(false);

  // const handleRerenderTable = () => {
  //   setRerenderTable(!rerenderTable);
  // };

  //to be lifted code starts
  // const initialOpenState = [];

  // console.log(mainRows);
  // let initialOpenState = [];

  let initialOpenState = mainRows.map((row) => {
    return { WO: row.WONumber, trailerType: row.trailerType, isOpen: false };
  });
  const [openRow, setOpenRow] = React.useState({});
  const [prevWO, setPrevWO] = React.useState(null);
  const [invertOpenRow, setInvertOpenRow] = React.useState(true);

  React.useEffect(() => {
    setOpenRow(initialOpenState);
  }, []);

  const handleOpenRow = (openWO, openTrailerType) => {
    const newOpenArr = initialOpenState.map((trailer) => {
      // console.log(String(trailer.WO) + trailer.trailerType);
      // console.log(String(openWO) + openTrailerType);

      if (
        String(trailer.WO) + trailer.trailerType ===
        String(openWO) + openTrailerType
      ) {
        setPrevWO(String(trailer.WO) + trailer.trailerType);
        if (prevWO != String(openWO) + openTrailerType) {
          // console.log(invertOpenRow);
          setInvertOpenRow(!invertOpenRow);
        }

        if (prevWO === String(openWO) + openTrailerType) {
          // console.log(invertOpenRow);
          setInvertOpenRow(!invertOpenRow);
        }
        // if (prevWO != openWO) {
        //   setInvertOpenRow(invertOpenRow);
        // }

        return {
          WO: openWO,
          trailerType: openTrailerType,
          isOpen:
            prevWO === String(openWO) + openTrailerType ? !invertOpenRow : true,
        };
      } else return trailer;
    });

    setOpenRow(newOpenArr);
  };
  //to be lifted code ends

  function Row(props) {
    const [rerenderRows, setRerenderRows] = React.useState(false);

    const updateMainRows = () => {
      setRerenderRows(!rerenderRows);
    };

    const { row } = props;

    //to be lifted code starts
    const initialOpenState = [];

    mainRows.map((row, index) => initialOpenState.push(false));

    const [open, setOpen] = React.useState(initialOpenState);

    const handleOpenRow = () => {
      const newOpenArr = open.map((row, index) => {
        if (index === props.index) {
          // console.log(row)
          if (open[props.index] === true) {
            return false;
          }

          if (open[props.index] === false) {
            return true;
          }
        } else return false;
      });

      // console.log(newOpenArr);
      setOpen(newOpenArr);
      // console.log(open);
    };
    //to be lifted code ends
    const [wallsProgress, setWallsProgress] = React.useState(0);

    const updateWallsProgress = (progress) => {
      setWallsProgress(progress);
    };

    const processDateColor = () => {
      if (row.dateCompleted) {
        if (
          new Date(row.dateRequired)?.getTime() -
            new Date(row.dateCompleted)?.getTime() <=
          0
        ) {
          return "#d32f2f";
        }
        if (
          new Date(row.dateRequired)?.getTime() -
            new Date(row.dateCompleted)?.getTime() >
          0
        ) {
          return "#2e7d32";
        } else return "black";
      }
    };

    return (
      <React.Fragment>
        <TableRow
          id={props.index}
          // selected={true}

          sx={{
            "& > *": {
              borderBottom: "unset",
              bgcolor: props.openRow[props.index]?.isOpen ? "#F4ECE0" : "",
            },
          }}
        >
          <TableCell component="th" scope="row">
            {/* {row.trailerNumber} */}
            {props.index + 1} of {mainRows.length}
          </TableCell>
          <TableCell>{row.WONumber}</TableCell>
          <TableCell>{row.trailerType}</TableCell>
          <TableCell>
            {row.status === "Completed" ? (
              <Chip
                label={props.eng ? "Completed" : "Terminado"}
                variant="outlined"
                color="success"
                icon={
                  <DoneIcon sx={{ fontSize: "1.4rem", mb: 0.2, pl: 0.5 }} />
                }
              />
            ) : (
              <Chip
                label={
                  props.eng
                    ? row.status === "Not Started"
                      ? "Not Started"
                      : "In Progress"
                    : row.status === "Not Started"
                    ? "No Empezado"
                    : "En Progreso"
                }
                variant="outlined"
              />
            )}
          </TableCell>
          <TableCell sx={{ color: processDateColor() }}>
            {`${new Date(row.dateRequired).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}, ${new Date(row.dateRequired).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </TableCell>
          <TableCell sx={{ color: processDateColor() }}>
            {row.dateCompleted
              ? `${new Date(row.dateCompleted).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}, ${new Date(row.dateCompleted).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : ""}
          </TableCell>
          <TableCell>
            {/* {!row.dateCompleted && (  )} */}
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                // console.log(props.row.WONumber);

                if (props.openRow[props.index]?.isOpen) {
                  props.openRow[props.index].isOpen = false;
                }

                // console.log(
                //   props.openRow[props.index].isOpen
                //     ? (props.openRow[props.index].isOpen = false)
                //     : null
                // );
                // setTimeout(() => props.handleRerenderTable(), 2000);
                // handleOpenRow();

                props.handleOpenRow(props.row.WONumber, props.row.trailerType);
              }}
            >
              {props.openRow[props.index]?.isOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow
          sx={{ bgcolor: props.openRow[props.index]?.isOpen ? "#F4ECE0" : "" }}
        >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse
              in={props.openRow[props.index]?.isOpen}
              timeout="auto"
              unmountOnExit
            >
              <Box
                sx={{
                  // maxWidth: "46rem",
                  minWidth: "42rem",
                  minHeight: "5rem",
                  ml: 1,
                  display: "flex",
                  flexDirection: "row",
                  // bgcolor: "green",
                }}
              >
                <SecondTable
                  mainRows={mainRows}
                  row={row}
                  currentTrailerRow={row}
                  updateMainRows={updateMainRows}
                  updateWallsProgress={updateWallsProgress}
                  saveProgressHandler={saveProgressHandler}
                  eng={eng}
                  setCompletedTrailers={setCompletedTrailers}
                />
                <Box
                  sx={{
                    width: "9rem",
                    // bgcolor: "red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // ml: 4,
                  }}
                >
                  <Typography
                    sx={{
                      // fontSize: "0.9rem",
                      mb: 2,
                      mt: -1,
                      width: "100%",
                      ml: eng ? 3.3 : 5.5,
                    }}
                  >
                    {eng ? "Walls Completed" : "Paredes Listas"}
                  </Typography>
                  <CircularWithValueLabel wallsProgress={wallsProgress} />
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  if (isLoading) {
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
        alignItems: "center",
        flexDirection: "column",
        mt: 2,
        pb: 4,
        minHeight: "100vh",
        bgcolor: "white",
      }}
    >
      {/* <Button
        sx={{ position: "absolute", top: "0", left: "0" }}
        onClick={uploadTrailerHandler}
      >
        Upload WO
      </Button> */}
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
        <Typography
          sx={{
            pb: 1,
            pt: 0.5,
            fontSize: "1.6rem",
            mt: 0.5,
          }}
        >
          {eng
            ? "Manufacturing Tracking System"
            : "Sistema de Monitoreo de Fabricación"}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "5rem",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: eng ? "53rem" : "57rem",
            ml: !completedTrailers ? 1.8 : 0,
            // bgcolor: "blue",
          }}
        >
          <Typography
            sx={{
              pb: 1,
              pt: 0.5,
              fontSize: "1.8rem",
            }}
          >
            {eng
              ? `Goal for the ${goalType}: to complete all the walls for ${totalTrailers} trailer${
                  completedTrailers !== 1 ? "s" : ""
                }`
              : `Objetivo para ${
                  goalType === "month" ? "el mes" : "la semana"
                }: terminar todas las paredes para ${totalTrailers} trailer${
                  completedTrailers !== 1 ? "s" : ""
                }`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // bgcolor: "red",
            width: "100%",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              sx={{
                textTransform: "none",
                color: "#2C2624",
                borderColor: "#2C2624",
                bgcolor: goalType === "month" ? "#F7F0E6" : "",
                "&:hover": {
                  backgroundColor: "#EFEBE9",
                  borderColor: "#2C2624",
                },
              }}
              onClick={() => setGoalType("month")}
            >
              {eng ? monthName : mesNombre}
            </Button>
            <Button
              sx={{
                textTransform: "none",
                color: "#2C2624",
                borderColor: "#2C2624",
                bgcolor: goalType === "week" ? "#F7F0E6" : "",
                "&:hover": {
                  backgroundColor: "#EFEBE9",
                  borderColor: "#2C2624",
                },
              }}
              onClick={() => setGoalType("week")}
            >
              {eng ? "Week" : "Semana"}
            </Button>
          </ButtonGroup>
          <Box sx={{ position: "absolute", top: "1rem", right: "3rem" }}>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                sx={{
                  textTransform: "none",
                  color: "#2C2624",
                  borderColor: "#2C2624",
                  bgcolor: eng ? "#F7F0E6" : "",
                  "&:hover": {
                    backgroundColor: "#EFEBE9",
                    borderColor: "#2C2624",
                  },
                }}
                onClick={() => setEng(true)}
              >
                English
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  color: "#2C2624",
                  borderColor: "#2C2624",
                  bgcolor: !eng ? "#F7F0E6" : "",
                  "&:hover": {
                    backgroundColor: "#EFEBE9",
                    borderColor: "#2C2624",
                  },
                }}
                onClick={() => setEng(false)}
              >
                Español
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ position: "absolute", top: "1rem", left: "3rem" }}>
            <Image
              src="/platinumLogo.png"
              width={204.8}
              height={37.4}
              // fill={true}
              alt="logo"
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "3.5rem",
            // bgcolor: "grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              minWidth: eng ? "47.5rem" : "51rem",
              ml: !completedTrailers ? 1.8 : 0,
              height: "3.5rem",
              bgcolor: "#DCF3DD",
              borderRadius: "0.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!!completedTrailers && (
              <Box
                sx={{
                  width: `${Math.trunc(
                    (100 * completedTrailers) / totalTrailers
                  )}%`,
                  height: "3.5rem",
                  bgcolor: "#62B966",
                  borderRadius: "0.5rem",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {eng && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize:
                        completedTrailers / totalTrailers < 0.12
                          ? "0.7rem"
                          : completedTrailers / totalTrailers < 0.3
                          ? "1rem"
                          : "1.4rem",
                    }}
                  >
                    {completedTrailers
                      ? `${completedTrailers} trailer${
                          completedTrailers !== 1 ? "s" : ""
                        } completed`
                      : ""}
                  </Typography>
                )}
                {!eng && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize:
                        completedTrailers / totalTrailers < 0.12
                          ? "0.7rem"
                          : completedTrailers / totalTrailers < 0.3
                          ? "1rem"
                          : "1.4rem",
                    }}
                  >
                    {completedTrailers
                      ? `${completedTrailers} trailer${
                          completedTrailers !== 1 ? "s" : ""
                        } terminado${completedTrailers !== 1 ? "s" : ""}`
                      : ""}
                  </Typography>
                )}
              </Box>
            )}

            {!!(totalTrailers - completedTrailers) && !!totalTrailers && (
              <Box
                sx={{
                  width: `${
                    100 - Math.trunc((100 * completedTrailers) / totalTrailers)
                  }%`,
                  height: "3.5rem",
                  // bgcolor: "red",
                  borderRadius: "0.5rem",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {eng && (
                  <Typography
                    sx={{
                      fontSize:
                        completedTrailers / totalTrailers < 0.7
                          ? "1.4rem"
                          : "1rem",
                    }}
                  >
                    {totalTrailers - completedTrailers
                      ? `${totalTrailers - completedTrailers} pending trailer${
                          totalTrailers - completedTrailers !== 1 ? "s" : ""
                        }`
                      : ""}
                  </Typography>
                )}
                {!eng && (
                  <Typography
                    sx={{
                      fontSize:
                        completedTrailers / totalTrailers < 0.7
                          ? "1.4rem"
                          : "1rem",
                    }}
                  >
                    {totalTrailers - completedTrailers
                      ? `${totalTrailers - completedTrailers} trailer${
                          totalTrailers - completedTrailers !== 1 ? "s" : ""
                        } pendiente${
                          totalTrailers - completedTrailers !== 1 ? "s" : ""
                        }`
                      : ""}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
          {!!totalTrailers && (
            <Box
              sx={{
                width: "5rem",
                height: "3.5rem",
                // bgcolor: "grey",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: 1.5,
              }}
            >
              <Typography sx={{ fontSize: "2.4rem" }}>
                {Math.trunc((100 * completedTrailers) / totalTrailers)}%
              </Typography>
            </Box>
          )}
        </Box>

        <Box>
          <TableContainer component={Paper} sx={{ overflow: "hidden" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {eng ? "Trailer Number" : "Número de Trailer"}
                  </TableCell>
                  <TableCell>{eng ? "WO Number" : "Número de WO"}</TableCell>
                  <TableCell>
                    {eng ? "Trailer Type" : "Tipo de Trailer"}
                  </TableCell>
                  <TableCell>{eng ? "Status" : "Estatus"}</TableCell>
                  <TableCell>
                    {eng ? "Date Required" : "Fecha Requerida"}
                  </TableCell>
                  <TableCell>
                    {eng ? "Date Completed" : "Fecha Completado"}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {mainRows.map((row, index) => (
                  <Row
                    key={index}
                    row={row}
                    index={index}
                    id={index}
                    eng={eng}
                    // handleRerenderTable={handleRerenderTable}
                    openRow={openRow}
                    // updateMainRows={updateMainRows}
                    handleOpenRow={handleOpenRow}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
