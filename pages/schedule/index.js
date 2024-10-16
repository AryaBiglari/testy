import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import withAuth from "../../components/WithAuth";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Tooltip, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';

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

import { SortableItem } from "../../components/schedule/SortableItem";
import { SortableWall } from "../../components/schedule/SortableWall";

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

const Schedule = () => {
  const [frames, setFrames] = React.useState([]);
  const [walls, setWalls] = React.useState([]);
  const [reRender, setReRender] = React.useState(false);
  const [showNumberFrames, setShowNumberFrames] = React.useState(0);
  const [showWallsNumber, setShowWallsNumber] = React.useState(0);

  const handleshowNumberFrames = (operation) => {
    if (operation === "plus") {
      setShowNumberFrames(Number(showNumberFrames) + 1);
    }
    if (operation === "minus") {
      setShowNumberFrames(Number(showNumberFrames) - 1);
    }
  };
  const handleShowWallsNumber = (operation) => {
    if (operation === "plus") {
      setShowWallsNumber(Number(showWallsNumber) + 1);
    }
    if (operation === "minus") {
      setShowWallsNumber(Number(showWallsNumber) - 1);
    }
  };

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [alertActive, setAlertActve] = React.useState(false);
  const [activeAlertType, setActiveAlertType] = React.useState("");
  const [activeAlertTimeMms, setActiveAlertTimeMms] = React.useState(0);
  const [activeAlertMessage, setActiveAlertMessage] = React.useState("");

  const handleActiveAlert = (state, type, message, timeMms) => {
    setAlertActve(state);
    setActiveAlertType(type);
    setActiveAlertMessage(message);
    setActiveAlertTimeMms(activeAlertTimeMms);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setAlertActve(false);
    }, 5000);
  }, [alertActive, activeAlertTimeMms]);

  // get Frames - start
  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      const scheduleResponse = await fetch(`/api/schedule/save-schedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const allSchedulesData = await scheduleResponse.json();

      let fetchedFrames = [];
      let fetchedWalls = [];

      allSchedulesData.forEach((schedule, index) => {
        if (schedule.process === "Frames") {
          fetchedFrames = schedule.scheduleArr;
        } else if (schedule.process === "Walls") {
          fetchedWalls = schedule.scheduleArr;
        }
      });

      console.log(fetchedFrames);

      const response = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const trailerData = await response.json();

      trailerData.sort((a, b) => {
        const dateA = new Date(a.requiredDate);
        const dateB = new Date(b.requiredDate);
        return dateA - dateB;
      });

      console.log("*****");
      console.log(trailerData);
      console.log("*****");

      const fetchedFrameIds = new Set(
        fetchedFrames.map((frame) => frame.trailerId)
      );

      const updatedFrames = fetchedFrames
        .map((frame) => {
          const matchingTrailer = trailerData.find(
            (trailer) => trailer._id === frame.trailerId
          );
          if (matchingTrailer) {
            const isFront = frame.frameType === "Front";
            const status = isFront
              ? matchingTrailer?.frontFrameTimeData?.status
              : matchingTrailer?.rearFrameTimeData?.status;
            if (status !== "Completed" && status !== "completed") {
              return {
                ...frame,
                status: status,
                activeEmployees: isFront
                  ? matchingTrailer.frontFrameTimeData?.activeEmployees
                  : matchingTrailer.rearFrameTimeData?.activeEmployees,
              };
            }
          }
          return null;
        })
        .filter((frame) => frame !== null);

        console.log("UPDATED FRAMES");
      console.log(updatedFrames);


      

      const newFrames = trailerData
        .filter((trailer) => !fetchedFrameIds.has(trailer._id))
        .flatMap((trailer) => [
          {
            id: `${trailer._id}front`,
            requiredDate: trailer.requiredDate,
            trailerId: trailer._id,
            trailerType: trailer.trailerType,
            customer: trailer.customer,
            WO: trailer.workOrder,
            frameType: "Front",
            status: trailer?.frontFrameTimeData?.status,
            activeEmployees: trailer?.frontFrameTimeData?.activeEmployees,
            show: false,
          },
          {
            id: `${trailer._id}rear`,
            requiredDate: trailer.requiredDate,
            trailerId: trailer._id,
            trailerType: trailer.trailerType,
            customer: trailer.customer,
            WO: trailer.workOrder,
            frameType: "Rear",
            status: trailer?.rearFrameTimeData?.status,
            activeEmployees: trailer?.rearFrameTimeData?.activeEmployees,
            show: false,
          },
        ]);
      

      console.log("NEW FRAMES");
      console.log(newFrames);

      // Combine the updated frames with the new frames, ensuring no completed frames are included
      const totalFrames = [...updatedFrames, ...newFrames].filter((item) => {
        //console.log(item);
        return item.status !== "Completed" && item.status !== "completed";
      });

      const totalFrameShows = totalFrames.reduce((acc, cur) => {
        if (cur.show) {
          return acc + 1;
        }
        return acc;
      }, 0);

      setShowNumberFrames(totalFrameShows);
      console.log("TOTAL FRAMES");
      console.log(totalFrames);
      setFrames(totalFrames);

      const fetchedWallsIds = new Set(
        fetchedWalls.map((wall) => wall.trailerId)
      );

      const updatedWalls = fetchedWalls
        .map((wall) => {
          const matchingTrailer = trailerData.find(
            (trailer) => trailer._id === wall.trailerId
          );
          if (matchingTrailer) {
            let wallsStatus = null;
            let wallsStatusArr = [];
            let activeEmployeesArr = [];
            matchingTrailer?.walls?.forEach((wallData) => {
              if (
                wallData?.activeEmployees &&
                wallData?.activeEmployees?.length > 0 &&
                wallData.status === "running"
              ) {
                activeEmployeesArr.push(...wallData.activeEmployees);
              }

              if (!wallData.startedDate && !wallData.completedDate) {
                wallsStatusArr.push("Not Started");
              }
              if (wallData.startedDate && !wallData.completedDate) {
                wallsStatusArr.push("In Progress");
              }
              if (wallData.startedDate && wallData.completedDate) {
                wallsStatusArr.push("Completed");
              }
            });

            if (wallsStatusArr.includes("In Progress")) {
              wallsStatus = "In Progress";
            }
            if (
              !wallsStatusArr.includes("In Progress") &&
              wallsStatusArr.includes("Not Started")
            ) {
              wallsStatus = "Not Started";
            }
            if (
              !wallsStatusArr.includes("In Progress") &&
              wallsStatusArr.includes("Completed")
            ) {
              wallsStatus = "Completed";
            }

            const completedWallsArr = wallsStatusArr.filter(
              (wallStatus) => wallStatus === "Completed"
            );
            let wallsProgress;
            console.log("wall");
            console.log(wall);
            console.log(wallsStatusArr);
            if (wallsStatusArr.length != 0) {
              wallsProgress =
                (100 * completedWallsArr.length) / wallsStatusArr.length;
            }
            else {
              wallsProgress = 0;
            }
            


            const uniqueActiveEmployees = activeEmployeesArr.reduce(
              (acc, obj) => {
                const existingObj = acc.find(
                  (item) => item.employeeID === obj.employeeID
                );
                if (!existingObj) {
                  acc.push(obj);
                }
                return acc;
              },
              []
            );

            return {
              ...wall,
              status: wallsStatus,
              wallsProgress: wallsProgress,
              activeEmployees: uniqueActiveEmployees,
            };
          }
          return null;
        })
        .filter((wall) => wall !== null);
      
      console.log("Updated walls");
      console.log(updatedWalls);

      const newWalls = trailerData
        .filter((trailer) => !fetchedWallsIds.has(trailer._id))
        .map((trailer) => {
          let wallsStatus = null;
          let wallsStatusArr = [];
          let activeEmployeesArr = [];
          trailer?.walls?.forEach((wallData) => {
            if (
              wallData?.activeEmployees &&
              wallData?.activeEmployees?.length > 0 &&
              wallData.status === "running"
            ) {
              activeEmployeesArr.push(...wallData.activeEmployees);
            }

            if (!wallData.startedDate && !wallData.completedDate) {
              wallsStatusArr.push("Not Started");
            }
            if (wallData.startedDate && !wallData.completedDate) {
              wallsStatusArr.push("In Progress");
            }
            if (wallData.startedDate && wallData.completedDate) {
              wallsStatusArr.push("Completed");
            }
          });

          if (wallsStatusArr.includes("In Progress")) {
            wallsStatus = "In Progress";
          }
          if (
            !wallsStatusArr.includes("In Progress") &&
            wallsStatusArr.includes("Not Started")
          ) {
            wallsStatus = "Not Started";
          }
          if (
            !wallsStatusArr.includes("In Progress") &&
            wallsStatusArr.includes("Completed")
          ) {
            wallsStatus = "Completed";
          }

          

          const completedWallsArr = wallsStatusArr.filter(
            (wallStatus) => wallStatus === "Completed"
          );
          

          if (trailer.trailerType == "4 Axle") {
            console.log("GR");
          }
          /* console.log("TEST");
          console.log(completedWallsArr);
          console.log(trailer.trailerType); */

          const wallsProgress =
            (100 * completedWallsArr.length) / wallsStatusArr.length;

          const uniqueActiveEmployees = activeEmployeesArr.reduce(
            (acc, obj) => {
              const existingObj = acc.find(
                (item) => item.employeeID === obj.employeeID
              );
              if (!existingObj) {
                acc.push(obj);
              }
              return acc;
            },
            []
          );

          return {
            id: `${trailer._id}wall`,
            requiredDate: trailer.requiredDate,
            trailerId: trailer._id,
            trailerType: trailer.trailerType,
            customer: trailer.customer,
            WO: trailer.workOrder,
            status: wallsStatus,
            wallsProgress: wallsProgress,
            activeEmployees: uniqueActiveEmployees,
            show: false,
          };
        });

        console.log("New walls");
        console.log(newWalls);

      const totalWalls = [...updatedWalls, ...newWalls].filter(
        (item) => item.status !== "Completed" && item.status !== "completed"
      );
      console.log("total walls");
          console.log(totalWalls);

      const totalWallsShows = totalWalls.reduce((acc, cur) => {
        if (cur.show) {
          return acc + 1;
        }
        return acc;
      }, 0);

      setShowWallsNumber(totalWallsShows);
      setWalls(totalWalls);
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
  }, []);
  // get Frames - end

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    setFrames(
      frames.map((frame, index) => {
        if (index < showNumberFrames) {
          frame.show = true;
        } else frame.show = false;

        return frame;
      })
    );
  }, [reRender, showNumberFrames]);

  React.useEffect(() => {
    setWalls(
      walls.map((wall, index) => {
        if (index < showWallsNumber) {
          wall.show = true;
        } else wall.show = false;

        return wall;
      })
    );
  }, [reRender, showWallsNumber]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over?.id) {
      return;
    }

    if (active?.id !== over?.id) {
      setFrames((frames) => {
        // const oldIndex = frames.indexOf(active.id);
        const oldIndex = frames.findIndex((x) => x.id === active?.id);
        // console.log(oldIndex);
        // const newIndex = frames.indexOf(over.id);
        const newIndex = frames.findIndex((x) => x.id === over?.id);
        setReRender(!reRender);
        return arrayMove(frames, oldIndex, newIndex);
      });
    }
  }

  function handleDragEndWalls(event) {
    const { active, over } = event;

    if (!over?.id) {
      return;
    }

    if (active?.id !== over?.id) {
      setWalls((walls) => {
        // const oldIndex = frames.indexOf(active.id);
        const oldIndex = walls.findIndex((x) => x.id === active?.id);
        // console.log(oldIndex);
        // const newIndex = frames.indexOf(over.id);
        const newIndex = walls.findIndex((x) => x.id === over?.id);
        setReRender(!reRender);
        return arrayMove(walls, oldIndex, newIndex);
      });
    }
  }

  const [isSavingFrames, setIsSavingFrames] = React.useState(false);
  const [isSavingWalls, setIsSavingWalls] = React.useState(false);

  async function handleSaveSchedule(process) {
    let scheduleArr;
    
    // Function to fetch customer data from TrailersNew collection
    async function fetchCustomerData(trailerId) {
        try {
          const response = await fetch(`/api/planning/create-trailer?id=${trailerId}`);
          if (!response.ok) {
                throw new Error("Failed to fetch trailer data");
            }
            const trailerData = await response.json();
            return trailerData.customer; // Assuming 'customer' is the field you want
        } catch (error) {
            console.error("Error fetching trailer customer:", error);
            return null; // Return null if there's an error fetching customer
        }
    }

    if (process === "Frames") {
        setIsSavingFrames(true);
        
        // Map over frames and fetch customer data for each trailerId
        scheduleArr = await Promise.all(frames.map(async (item) => {
            const customer = await fetchCustomerData(item.trailerId);
            return {
                id: item.id,
                trailerId: item.trailerId,
                trailerType: item.trailerType,
                WO: item.WO,
                customer: customer, // Set customer from TrailersNew
                frameType: item.frameType,
                show: item.show,
            };
        }));
    }

    if (process === "Walls") {
        setIsSavingWalls(true);
        
        // Map over walls and fetch customer data for each trailerId
        scheduleArr = await Promise.all(walls.map(async (item) => {
            const customer = await fetchCustomerData(item.trailerId);
            return {
                id: item.id,
                trailerId: item.trailerId,
                trailerType: item.trailerType,
                WO: item.WO,
                customer: customer, // Set customer from TrailersNew
                // wallType: item.wallType, (if needed)
                show: item.show,
            };
        }));
    }


    console.log("SCHEDULE ARRAY");
    console.log(scheduleArr);

    const response = await fetch("/api/schedule/save-schedule", {
      method: "POST",
      body: JSON.stringify({ process: process, scheduleArr: scheduleArr }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      handleActiveAlert(
        true,
        "error",
        `Error: ${process} failed to update`,
        4000
      );
    }
    handleActiveAlert(
      true,
      "success",
      `${process} schedule updated succesfully`,
      4000
    );
    setIsSavingFrames(false);
    setIsSavingWalls(false);
    return response;
  }

  // if (isLoadingPage || isSavingFrames || isSavingWalls) {
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
            color: "var(--primary75)",
          }}
        />
      </Box>
    );
  }

  return (
    <>
      <Collapse
        in={alertActive}
        sx={{
          width: "100%",
        }}
      >
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

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          // maxWidth: "100%",
          // maxHeight: "100vh",

          display: "flex",
          // bgcolor: "m 42",
          justifyContent: "center",
          // flexDirection: "column",
          alignItems: "flax-start",
          position: "relative",
          pt: 0,
          pl: 2,
          pr: 2,
          bgcolor: "white",
          // overflowX: "scroll",
        }}
      >
        <Box
          sx={{
            width: "100%",
            // bgcolor: "brown",
            // pl: 28,
            height: "2.4rem",
            // mb: 2,
            mt: 1,
            display: "flex",
            pl: 4,
            pr: 4,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Box
            onClick={() => {}}
            sx={{
              // minWidth: "12rem",
              height: "100%",
              // bgcolor: "orange",
              position: "relative",
              // ml: -0.3,
              display: "flex",
              justifyContent: "flex-start",
              // flex: 0.8,
              alignItems: "center",
              cursor: "pointer",
              position: "absolute",
              left: "2rem",
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

          <Box sx={{ width: "13.3rem" }}></Box>
          <Box
            sx={{
              // width: "100%",
              display: "flex",
              justifyContent: "center",
              // bgcolor: "red",
            }}
          >
            <Typography
              sx={{
                // bgcolor: "blue",
                width: "17rem",
                fontSize: "1.6rem",
                textAlign: "center",
                // mt: "1.7rem",
              }}
            >
              Schedule
            </Typography>
          </Box>
          <Box
            sx={{
              // width: "100%",
              display: "flex",
              // flex: 1,
              width: "13.5rem",
              justifyContent: "center",
              // bgcolor: "blue",
              position: "relative",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            // bgcolor: "blue",
            mt: 6,
          }}
        >
          <Box
            sx={{
              // width: "30rem",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              // bgcolor: "blue",
              mt: 2,
              ml: 4,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // bgcolor: "red",
                minWidth: "40.5rem",
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Typography
    sx={{
      fontSize: "1.3rem",
      textAlign: "center",
      ml: 2,
      width: 1
    }}
  >
    Frames
  </Typography>

  <IconButton
          sx={{ height: "2rem", width: "2rem", ml: 0.7 }}
          onClick={() => window.open("/frames", "_blank")}
        >
          <OpenInNewIcon />
        </IconButton>
</Box>

              {/* {!isSavingFrames && <CircularProgress />} */}
              {isSavingFrames && <CircularProgress size={34} />}
              <Button
                onClick={() => handleSaveSchedule("Frames")}
                variant="contained"
                sx={{ ml: 0 }}
              >
                Save Schedule
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // width: "9rem",
                  justifyContent: "center",
                  // bgcolor: "green",
                }}
              >
                <IconButton
                  aria-label="left"
                  sx={{ mr: 2 }}
                  onClick={() => handleshowNumberFrames("minus")}
                >
                  <ChevronLeftIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    // color: part.checked ? "" : "var(--secondary25)",
                  }}
                >
                  {showNumberFrames}
                </Typography>
                <IconButton
                  aria-label="left"
                  sx={{ ml: 2 }}
                  onClick={() => handleshowNumberFrames("plus")}
                >
                  <ChevronRightIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
              <DndContext
                id="builder-id"
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={frames}
                  strategy={verticalListSortingStrategy}
                >
                  {frames?.map((frame) => (
                    <SortableItem key={frame.id} id={frame.id} frame={frame} />
                  ))}
                </SortableContext>
              </DndContext>
            </Box>
          </Box>
          <Box
            sx={{
              width: "65rem",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              // bgcolor: "blue",
              mt: 2,
              ml: 6,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // bgcolor: "red",
                minWidth: "39rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  textAlign: "center",
                  ml: 2,
                  // bgcolor: "blue",
                }}
              >
                Walls
                <IconButton
          sx={{ height: "2rem", width: "2rem", ml: 0.7 }}
          onClick={() => window.open("/walls", "_blank")}
        >
          <OpenInNewIcon />
        </IconButton>
              </Typography>
              
              {isSavingWalls && <CircularProgress size={34} />}
              <Button
                onClick={() => handleSaveSchedule("Walls")}
                variant="contained"
                sx={{ ml: 0 }}
              >
                Save Schedule
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // width: "9rem",
                  justifyContent: "center",
                  // bgcolor: "green",
                }}
              >
                <IconButton
                  aria-label="left"
                  sx={{ mr: 2 }}
                  onClick={() => handleShowWallsNumber("minus")}
                >
                  <ChevronLeftIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: "1.3rem",
                    // color: part.checked ? "" : "var(--secondary25)",
                  }}
                >
                  {showWallsNumber}
                </Typography>
                <IconButton
                  aria-label="left"
                  sx={{ ml: 2 }}
                  onClick={() => handleShowWallsNumber("plus")}
                >
                  <ChevronRightIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
              <DndContext
                id="builder-id"
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEndWalls}
              >
                <SortableContext
                  items={walls}
                  strategy={verticalListSortingStrategy}
                >
                  {walls?.map((wall) => (
                    <SortableWall key={wall.id} id={wall.id} wall={wall} />
                  ))}
                </SortableContext>
              </DndContext>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default withAuth(Schedule);
