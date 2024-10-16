"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import TimerIcon from "@mui/icons-material/Timer";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CustomizedDialogs from "./DrawingDialog.js";
import { Troubleshoot } from "@mui/icons-material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Image from "next/image";

export default function SecondTable(props) {
  function Row(props) {
    // const [wallHasActiveTask, setWallHasActiveTask] = React.useState(false);
    // console.log(wallHasActiveTask);

    props.currentTrailerRow.wallsList.forEach((wall) => {
      let isActive = 0;
      wall.tasksList.forEach((task) => {
        if (task.timerActive === true) {
          isActive++;
          // setWallHasActiveTask(true);
        }
      });
      if (isActive >= 1) {
        wall.wallIsActive = true;
      } else wall.wallIsActive = false;
      // console.log(wall);
    });

    //logic to show time for each ongoing task - starts
    let timersArray = [];
    props.currentTrailerRow.wallsList.forEach((wall) => {
      wall.tasksList.forEach((task) => {
        timersArray.push({
          wallName: wall.wallName,
          taskName: task.task,
          isActive: task.timerActive,
          time: task.savedSeconds,
        });
      });
    });

    const [multipleTimers, setMultipleTimers] = React.useState(timersArray);
    const [timeChange, setTimeChange] = React.useState(false);

    // console.log(multipleTimers);

    React.useEffect(() => {
      const intervalIds = multipleTimers.map((timer, index) => {
        if (timer?.isActive) {
          return setInterval(() => {
            setMultipleTimers((prevTimersData) => {
              const updatedTimer = { ...prevTimersData[index] };
              updatedTimer.time += 1;
              return [
                ...prevTimersData.slice(0, index),
                updatedTimer,
                ...prevTimersData.slice(index + 1),
              ];
            });
          }, 1000);
        }
        return null;
      });

      return () => {
        intervalIds.forEach((intervalId) => clearInterval(intervalId));
      };
    }, [multipleTimers]);

    function handleStart(wallName, taskName) {
      setMultipleTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.wallName === wallName && timer.taskName === taskName) {
            return { ...timer, isActive: true };
          } else return timer;
        })
      );
    }
    function handleStop(wallName, taskName) {
      setMultipleTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.wallName === wallName && timer.taskName === taskName) {
            return { ...timer, isActive: false };
          } else return timer;
        })
      );
    }

    function handleToggleTimer(wallName, taskName) {
      props.currentTrailerRow.wallsList.forEach((wall) => {
        if (wall.wallName === wallName) {
          // console.log(wall);
          wall.tasksList.forEach((task) => {
            if (task.task === taskName) {
              if (task.timerActive === true) {
                task.timerActive = false;
              } else task.timerActive = true;
            }
          });
        }
      });

      setMultipleTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.wallName === wallName && timer.taskName === taskName) {
            return { ...timer, isActive: !timer.isActive };
          } else return timer;
        })
      );
    }

    // const [currentTime, setCurrentTime] = React.useState(null);
    let currentTime;
    // console.log(props.currentTrailerRow);
    function updateTimeONDB(wallName, taskName) {
      // console.log(wallName, taskName);
      multipleTimers.forEach((timer) => {
        if (timer.wallName === wallName && timer.taskName === taskName) {
          currentTime = timer.time;
        }
      });
    }

    async function pushPauseTimeToDB(trailer, wallName, taskName) {
      // console.log(trailer, wallName, taskName);

      trailer.wallsList.forEach((wall) => {
        if (wall.wallName === wallName) {
          wall.tasksList.forEach((task) => {
            if (task.task === taskName) {
              task?.pauses?.push(new Date());
              // console.log("executed");
              // console.log(task.pauses);
            }
          });
        }
      });

      // console.log(trailer);
      props.saveProgressHandler(trailer);
    }

    const displayFormattedTime = (wallName, taskName) => {
      const selectedTimer = [];

      multipleTimers.forEach((timer) => {
        if (timer.wallName === wallName && timer.taskName === taskName) {
          selectedTimer.push(timer);
        }
      });

      const hours = Math.floor(selectedTimer[0].time / 3600);
      const mins = Math.floor(selectedTimer[0].time / 60 - hours * 60);
      const seconds_ = selectedTimer[0].time % 60;
      if (selectedTimer.length !== 0) {
        return (
          (hours == 0 ? "" : hours.toString() + ":") +
          (mins == 0
            ? "00"
            : mins < 10
            ? "0" + mins.toString()
            : mins.toString()) +
          ":" +
          (seconds_ == 0
            ? "00"
            : seconds_ < 10
            ? "0" + seconds_.toString()
            : seconds_.toString())
        );
      }
    };

    const displayExactTime = (trailer, wallName, taskName) => {
      let totalExactTime = 0;
      trailer.wallsList.forEach((wall) => {
        if (wall.wallName === wallName) {
          wall.tasksList.forEach((task) => {
            if (task.task === taskName) {
              // console.log(task?.pauses.length);

              if (task?.pauses?.length > 0) {
                for (let i = 0; i < +((task?.pauses?.length - 1) / 2); i++) {
                  totalExactTime =
                    totalExactTime +
                    +Math.floor(
                      (new Date(task?.pauses[2 * i + 1]).getTime() -
                        new Date(task?.pauses[2 * i]).getTime()) /
                        1000
                    );
                }
              }
            }
          });
        }
      });

      const hours = Math.floor(totalExactTime / 3600);
      const mins = Math.floor(totalExactTime / 60);
      const seconds_ = totalExactTime % 60;

      return `${mins} min`;

      // return (
      //   (hours == 0 ? "" : hours.toString() + ":") +
      //   (mins == 0
      //     ? "00"
      //     : mins < 10
      //     ? "0" + mins.toString()
      //     : mins.toString()) +
      //   ":" +
      //   (seconds_ == 0
      //     ? "00"
      //     : seconds_ < 10
      //     ? "0" + seconds_.toString()
      //     : seconds_.toString())
      // );
    };
    //logic to show time for each ongoing task - end

    // logic to update walls progress chart from database - start

    let wallsAreCompleted = false;
    let completedTasksNumber = 0;
    let totalTasksNumber = 0;
    props.row.tasksList.forEach((element) => {
      totalTasksNumber++;
      if (element.completed !== "") {
        wallsAreCompleted = true;
        completedTasksNumber++;
      } else wallsAreCompleted = false;
    });

    // Logic to set completed Walls - starts
    let completedWalls = 0;
    let totalWalls = 0;

    props.currentTrailerRow.wallsList.forEach((wall) => {
      totalWalls++;
      if (wall.wallStatus === "Completed") {
        completedWalls++;
      }
    });

    React.useEffect(() => {
      props.updateWallsProgress(100 * (completedWalls / totalWalls));
    }, [completedWalls]);

    // logic to update walls progress chart from database - end

    const [openDrawings, setOpenDrawings] = React.useState(false);

    const handleClickOpenDrawings = () => {
      setOpenDrawings(true);
    };
    const handleCloseDrawings = () => {
      setOpenDrawings(false);
    };

    const { row } = props;

    const [open, setOpen] = React.useState(false);

    const [isLoadingImg, setIsLoadingImg] = React.useState(true);
    // console.log(isLoadingImg);

    const handleImgLoading = (state) => {
      setIsLoadingImg(state);
    };

    function onImageLoad() {
      handleImgLoading(false);
      // setImageUrl(image.url)
      // console.log("loaded");
    }

    const wallsLinkGenerator = (trailerType) => {
      if (trailerType === "Tri 3 Hoppers") {
        return "tri-3h";
      }
      if (trailerType === "Tri 2 Hoppers") {
        return "tri";
      }
      if (trailerType === "Tandem") {
        return "tandem";
      }
      if (trailerType === "Pup") {
        return "pup";
      }
      if (trailerType === "Lead") {
        return "lead";
      }
    };

    return (
      <React.Fragment>
        <CustomizedDialogs
          openDrawings={openDrawings}
          handleClickOpenDrawings={handleClickOpenDrawings}
          handleCloseDrawings={handleCloseDrawings}
          row={row}
          eng={props.eng}
        />
        <TableRow
          sx={{
            "& > *": {
              borderBottom: `2px solid ${
                props.index % 2 ? "#FAF4F4 !important" : "white !important"
              }`,
              bgcolor: props.index % 2 ? "#FAF4F4" : "white",
              height: "100%",
            },
          }}
        >
          <TableCell component="th" scope="row">
            {row.wallName}
          </TableCell>
          <TableCell>
            {row.wallStatus === "Completed" ? (
              <Chip
                label={props.eng ? "Completed" : "Terminada"}
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
                    ? row.wallStatus === "Not Started"
                      ? "Not Started"
                      : "In Progress"
                    : row.wallStatus === "Not Started"
                    ? "No Empezada"
                    : "En Progreso"
                }
                variant="outlined"
              />
            )}
          </TableCell>
          <TableCell sx={{ minWidth: "3.8rem" }}>
            {row.wallIsActive ? (
              <TimerIcon
                color="warning"
                sx={{
                  fontSize: "1.6rem",
                  mb: -0.8,
                }}
              />
            ) : null}
          </TableCell>
          <TableCell
            sx={{
              // minWidth: "9rem",
              // maxHeight: "7.8rem",
              width: "100%",
              // height: "100%",
              // minHeight: "5rem",
              // bgcolor: "green",
              position: "relative",
              // border: "1px solid red",

              paddingTop: 0.4,
              paddingBottom: 0.1,
              display: "flex",
              justifyContent: "center",
              // maxWidth: "10rem",
              // bgcolor: "red",
            }}
          >
            {/* {isLoadingImg && (
              <Box
                sx={{
                  minWidth: "7rem",
                  minHeight: "5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // bgcolor: "red",
                }}
              >
                <CircularProgress
                  size={30}
                  thickness={4}
                  sx={{
                    color: "primary",
                  }}
                />
              </Box>
            )} */}
            <Paper
              elevation={1}
              // variant="outlined"
              sx={{
                padding: 0.3,
                bgcolor: "white",
                maxHeight: "4rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0.8rem",
                // border: "1px solid red",
                maxWidth: "9rem",
              }}
            >
              <Image
                src={`/images/${wallsLinkGenerator(
                  props.currentTrailerRow.trailerType
                )}/${props.index}.png`}
                onLoad={onImageLoad}
                // style={{ objectFit: "contain" }}
                // fill={true}
                // width={500}
                // height={500}
                width={0}
                height={0}
                sizes={"7rem"}
                style={{
                  width: "auto",
                  height: "100%",
                  // display: isLoadingImg ? "none" : "visible",
                }}
                alt="Picture of the author"
              />
            </Paper>
          </TableCell>
          <TableCell sx={{ width: "4rem", mr: -5 }} align="right">
            {/* !props.currentTrailerRow.dateCompleted */}
            {true && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>
        </TableRow>
        <TableRow
          sx={{
            bgcolor: props.index % 2 ? "#FAF4F4" : "white",
          }}
        >
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              maxWidth: "36rem",
              width: "36rem",
            }}
            colSpan={5}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  width: "100%",
                  minHeight: "2rem",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  disabled={!!row?.specialRequirements}
                  sx={{
                    textTransform: "none",
                    color: "#2C2624",
                    borderColor: "#2C2624",
                    bgcolor: "#F3DAB6",
                    mr: 3,
                    "&:hover": {
                      backgroundColor: "#F7F0E6",
                      borderColor: "#2C2624",
                    },
                  }}
                  onClick={handleClickOpenDrawings}
                >
                  {props.eng ? "See Drawing" : "Ver Plano"}
                </Button>
                <Button
                  variant={
                    !!row?.specialRequirements ? "contained" : "outlined"
                  }
                  disabled={!!row?.specialRequirements ? false : true}
                  sx={{
                    textTransform: "none",
                    color: !!row?.specialRequirements ? "white" : "#2C2624",
                    borderColor: !!row?.specialRequirements ? "" : "#2C2624",
                    bgcolor: !!row?.specialRequirements ? "#E7453A" : "#F3DAB6",
                    mr: 3,
                    "&:hover": {
                      backgroundColor: !!row?.specialRequirements
                        ? "#E51F12"
                        : "#F7F0E6",
                      borderColor: "#2C2624",
                    },
                    "&:disabled": {
                      backgroundColor: "#F7F0E6",
                      borderColor: "#2C2624",
                      color: "#2C2624",
                    },
                  }}
                >
                  {!!row?.specialRequirements
                    ? props.eng
                      ? `Special Requirements: ${row?.specialRequirements}`
                      : `Requerimientos Especiales: ${row?.specialRequirements}`
                    : props.eng
                    ? "Regular Wall - No Special Requirements"
                    : "Pared Normal - Sin Requerimientos Especiales"}
                </Button>
              </Box>
              <Box sx={{ margin: 1, width: "100%" }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        {props.eng ? "Started" : "Empezada"}
                      </TableCell>
                      <TableCell>
                        {props.eng ? "Completed" : "Terminada"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "3.5rem" }}>
                        {props.eng ? "Time" : "Tiempo"}
                      </TableCell>
                      <TableCell>
                        {/* {props.eng ? "Procedure" : "Procedimiento"} */}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.row.tasksList.map((tasksRow, index) => (
                      <TableRow
                        key={props.row.wallName + tasksRow?.task + index}
                        id={props.row.wallName + tasksRow?.task + index}
                        sx={{
                          height: "3rem",
                          bgcolor:
                            tasksRow.started &&
                            !tasksRow.completed &&
                            tasksRow?.timerActive
                              ? "#DCF3DD"
                              : "",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontSize: "0.7rem", fontWeight: "600" }}
                        >
                          {props.eng ? tasksRow?.task : tasksRow?.taskEs}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.7rem" }}>
                          {tasksRow.started ? (
                            `${new Date(tasksRow?.started)?.toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}, ${new Date(
                              tasksRow?.started
                            )?.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                // bgcolor: "red",
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: -1,
                              }}
                            >
                              <IconButton
                                aria-label="delete"
                                color="primary"
                                onClick={() => {
                                  tasksRow.started = new Date();
                                  handleStart(
                                    props.row.wallName,
                                    tasksRow.task
                                  );
                                  tasksRow.timerActive = true;

                                  let wallsAreStarted = false;

                                  props.row.tasksList.forEach((element) => {
                                    if (element.started === "") {
                                      wallsAreStarted = true;
                                    } else wallsAreStarted = false;
                                  });

                                  if (wallsAreStarted) {
                                    props.row.wallStatus = "In Progress";
                                  }
                                  // logic to set trailer in progress - start
                                  props.currentTrailerRow.wallsList.forEach(
                                    (wall) => {
                                      if (wall.wallStatus === "In Progress") {
                                        props.currentTrailerRow.status =
                                          "In Progress";
                                      }
                                    }
                                  );
                                  if (props.row.tasksList.length === 1) {
                                    props.row.wallStatus = "In Progress";
                                    props.currentTrailerRow.status =
                                      "In Progress";
                                  }
                                  // logic to set trailer in progress - end

                                  props.currentTrailerRow.wallsList.forEach(
                                    (wall) => {
                                      if (
                                        wall.wallName === props.row.wallName
                                      ) {
                                        wall.tasksList.forEach((task) => {
                                          if (task.task === tasksRow.task) {
                                            task?.pauses?.push(new Date());
                                            // console.log("executed");
                                            // console.log(task.pauses);
                                          }
                                        });
                                      }
                                    }
                                  );

                                  setTimeChange(!timeChange);
                                  props.saveProgressHandler(
                                    props.currentTrailerRow
                                  );
                                }}
                              >
                                <CheckCircleOutlineIcon
                                  sx={{ fontSize: "1.8rem" }}
                                />
                              </IconButton>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.7rem" }}>
                          {tasksRow.completed ? (
                            `${new Date(
                              tasksRow?.completed
                            )?.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}, ${new Date(
                              tasksRow?.completed
                            )?.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                ml: -1,
                              }}
                            >
                              <IconButton
                                aria-label="delete"
                                color="primary"
                                disabled={!tasksRow.started}
                                onClick={() => {
                                  tasksRow.completed = new Date();
                                  handleStop(props.row.wallName, tasksRow.task);
                                  tasksRow.timerActive = false;
                                  // Logic to set completed Walls - starts
                                  let wallsAreCompleted = false;
                                  let completedTasksNumber = 0;
                                  let totalTasksNumber = 0;
                                  props.row.tasksList.forEach((element) => {
                                    totalTasksNumber++;
                                    if (element.completed !== "") {
                                      wallsAreCompleted = true;
                                      completedTasksNumber++;
                                    } else wallsAreCompleted = false;
                                  });

                                  if (wallsAreCompleted) {
                                    props.row.wallStatus = "Completed";
                                  }
                                  let completedWalls = 0;
                                  let totalWalls = 0;
                                  props.currentTrailerRow.wallsList.forEach(
                                    (wall) => {
                                      totalWalls++;
                                      if (wall.wallStatus === "Completed") {
                                        completedWalls++;
                                      }
                                    }
                                  );
                                  if (
                                    completedWalls &&
                                    totalWalls &&
                                    completedWalls === totalWalls
                                  ) {
                                    props.currentTrailerRow.status =
                                      "Completed";
                                    // changed to get date object on DB
                                    props.currentTrailerRow.dateCompleted =
                                      new Date();
                                  }
                                  // logic to update walls progress circular chart - start
                                  props.updateWallsProgress(
                                    100 * (completedWalls / totalWalls)
                                  );
                                  // logic to update walls progress circular chart - end
                                  setTimeChange(!timeChange);
                                  props.saveProgressHandler(
                                    props.currentTrailerRow
                                  );
                                  //update main progress bar logic - start
                                  let completedTrailers = 0;
                                  props.mainRows.forEach((trailer) => {
                                    if (trailer.status === "Completed") {
                                      completedTrailers++;
                                    }
                                  });
                                  props.setCompletedTrailers(completedTrailers);
                                  //update main progress bar logic - end
                                  updateTimeONDB(
                                    props.row.wallName,
                                    tasksRow.task
                                  );

                                  tasksRow.savedSeconds = currentTime;

                                  props.currentTrailerRow.wallsList.forEach(
                                    (wall) => {
                                      if (
                                        wall.wallName === props.row.wallName
                                      ) {
                                        wall.tasksList.forEach((task) => {
                                          if (task.task === tasksRow.task) {
                                            task?.pauses?.push(new Date());
                                            // console.log("executed");
                                            // console.log(task.pauses);
                                          }
                                        });
                                      }
                                    }
                                  );

                                  // console.log(tasksRow.savedSeconds);
                                  props.saveProgressHandler(
                                    props.currentTrailerRow
                                  );
                                }}
                              >
                                <CheckCircleOutlineIcon
                                  sx={{ fontSize: "1.8rem" }}
                                />
                              </IconButton>
                            </Box>
                          )}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "0.7rem",
                            // bgcolor: "red",
                          }}
                        >
                          {tasksRow?.started &&
                            !tasksRow?.completed &&
                            displayFormattedTime(
                              props.row.wallName,
                              tasksRow.task
                            )}
                          {tasksRow?.completed &&
                            displayExactTime(
                              props.currentTrailerRow,
                              props.row.wallName,
                              tasksRow.task
                            )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.7rem" }}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-start",
                              ml: -1,
                            }}
                          >
                            {tasksRow.started && !tasksRow.completed && (
                              <IconButton
                                key={
                                  props.row.wallName + tasksRow?.task + index
                                }
                                id={props.row.wallName + tasksRow?.task + index}
                                color="primary"
                                onClick={() => {
                                  handleToggleTimer(
                                    props.row.wallName,
                                    tasksRow.task
                                  );
                                  // console.log(
                                  //   props.row.wallName,
                                  //   tasksRow.task
                                  updateTimeONDB(
                                    props.row.wallName,
                                    tasksRow.task
                                  );
                                  tasksRow.savedSeconds = currentTime;
                                  props.saveProgressHandler(
                                    props.currentTrailerRow
                                  );

                                  pushPauseTimeToDB(
                                    props.currentTrailerRow,
                                    props.row.wallName,
                                    tasksRow.task
                                  );

                                  // setWallHasActiveTask(false);
                                  // wallHasActiveTaskHandler(props?.row);
                                }}
                              >
                                {tasksRow?.timerActive && (
                                  <PauseCircleOutlineIcon
                                    sx={{ fontSize: "1.8rem" }}
                                  />
                                )}

                                {!tasksRow?.timerActive && (
                                  <PlayCircleOutlineIcon
                                    sx={{ fontSize: "1.8rem" }}
                                  />
                                )}
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "start",
        mb: 2,
        // bgcolor: "blue",
        width: "90%",
      }}
    >
      <Typography
        sx={{
          pb: 1,
          pt: 0,
          fontSize: "1.6rem",
          ml: 1,
        }}
      >
        {props.eng ? "Walls for this " : "Paredes para este "}
        {props.row.trailerType}
      </Typography>

      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {props.row.wallsList.map((row, index) => (
                <Row
                  key={row.wallName}
                  row={row}
                  mainRows={props.mainRows}
                  currentTrailerRow={props.currentTrailerRow}
                  updateMainRows={props.updateMainRows}
                  updateWallsProgress={props.updateWallsProgress}
                  saveProgressHandler={props.saveProgressHandler}
                  eng={props.eng}
                  setCompletedTrailers={props.setCompletedTrailers}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
