import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import TrailerSwiper from "../../components/walls/TrailerSwiper.js";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
// import wallsData from "../../lib/wallsData.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import SelectTrailerDialog from "../../components/walls/SelectTrailerDialog.js";
import DrawingDialogNew from "../../components/walls/DrawingDialogNew.js";
import RenderEmployee from "../../components/planning/RenderEmployee.js";
import { getMonth } from "date-fns";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Keyboard,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade } from "swiper/modules";

import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";

export default function Walls() {
  const wallSelectionKey = `wallsSelected`;
  const saveInterval = 300;
  const task = "boxes";

  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    console.log(localStorage.getItem("password"));
  }

  const [eng, setEng] = React.useState(true);
  const [trailerWalls, setTrailerWalls] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [allTrailers, setAllTrailers] = React.useState([]);
  const [selectedTrailers, setSelectedTrailers] = React.useState([]);
  const [wallsBeingBuilt, setWallsBeingBuilt] = React.useState([]);

  const [currentTrailer, setCurrentTrailer] = React.useState();
  const [activeEmployees, setActiveEmployees] = React.useState([]);
  const [currentStartTime, setCurrentStartTime] = React.useState();
  const [employeeLogs, setEmployeeLogs] = React.useState([]);
  const [openEmployeesWorking, setOpenEmployeesWorking] = React.useState(false);

  const [activeTrailers, setActiveTrailers] = React.useState([]);

  const [openSelectTrailerDialog, setOpenSelectTrailerDialog] =
    React.useState(false);

  const handleClickOpenSelectTrailerDialog = () => {
    setOpenSelectTrailerDialog(true);
  };

  const handleClickCloseSelectTrailerDialog = () => {
    setOpenSelectTrailerDialog(false);
  };

  const updateSelectedTrailers = async (arr) => {
    console.log(arr);
    setSelectedTrailers(arr);
    setIsLoading(true);

    // Create a set of unique identifiers for selected trailers
    // Each identifier is a string in the format "workOrder-trailerType"
    const selectedTrailerIdentifiers = new Set(
      arr.map((trailer) => `${trailer.workOrder}-${trailer.trailerType}`)
    );

    // Update all trailers
    for (const trailer of allTrailers) {
      // Check if the trailer is in the set of selected trailers'
      const trailerIdentifier = `${trailer.workOrder}-${trailer.trailerType}`;
      const isSelected = selectedTrailerIdentifiers.has(trailerIdentifier);
      // if (trailer.wallsSelected === isSelected) {
      //   console.log("This trailers selection didn't change " + trailerIdentifier)
      //   continue;
      // }
      const updates = { wallsSelected: isSelected };

      const data = {
        workOrder: trailer.workOrder,
        trailerType: trailer.trailerType,
        updates,
      };

      try {
        const response = await fetch("/api/boxes/boxesapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          console.error(
            `Failed to update the trailer data for workOrder: ${trailer.workOrder}, trailerType: ${trailer.trailerType}`
          );
        } else {
          console.log(
            `Trailer data updated successfully for workOrder: ${trailer.workOrder}, trailerType: ${trailer.trailerType}`
          );
        }
      } catch (error) {
        console.error(
          `Error updating trailer data for workOrder: ${trailer.workOrder}, trailerType: ${trailer.trailerType}:`,
          error
        );
      }
    }
    setIsLoading(false);
  };

  // Function to add a wall to the activeTasks array
  const handleAddActiveTrailers = (wall) => {
    console.log("dasfsdafteqwt");
    console.log(activeTrailers);
    setActiveTrailers((prevTasks) => [...prevTasks, wall]);
  };

  // Function to remove a wall from the activeTasks array
  const handleRemoveActiveTrailers = (workOrder, trailerType, wallType) => {
    console.log(workOrder);
    console.log(trailerType);
    console.log(wallType);
    setActiveTrailers((prevTasks) =>
      prevTasks.filter(
        (task) =>
          task.workOrder !== workOrder ||
          task.trailerType !== trailerType ||
          task.wallType !== wallType
      )
    );
  };

  const updateAT = (newAT, trailerType, workOrder) => {
    setActiveTrailers((prevTasks) => {
      const exists = prevTasks.some(
        (task) =>
          task.workOrder === workOrder && task.trailerType === trailerType
      );
      if (!exists) {
        return [...prevTasks, newAT];
      }
      return prevTasks;
    });
    console.log(activeTrailers);
  };

  // const updateAT = (newAT, trailerType, workOrder) => {
  //   setActiveTrailers(prevTrailers => {
  //     // Find the existing trailer
  //     const trailerIndex = prevTrailers.findIndex(trailer =>
  //       trailer.workOrder === workOrder && trailer.trailerType === trailerType
  //     );

  //     if (trailerIndex !== -1) {
  //       // Trailer exists, update its activeTasks
  //       const updatedTrailers = [...prevTrailers];
  //       const existingTrailer = updatedTrailers[trailerIndex];

  //       // Check if the task already exists in the trailer's activeTasks
  //       const taskExists = existingTrailer.activeTasks.some(task => task.wallType === newAT.wallType);

  //       if (!taskExists) {
  //         // Add the new task to the existing trailer's activeTasks
  //         existingTrailer.activeTasks.push(newAT);
  //       }

  //       return updatedTrailers;
  //     } else {
  //       // Trailer does not exist, add a new trailer with the new task
  //       return [...prevTrailers, {
  //         workOrder,
  //         trailerType,
  //         activeTasks: [newAT]
  //       }];
  //     }
  //   });

  //   console.log(activeTrailers);
  // };

  React.useEffect(() => {
    setIsLoading(true);
    async function getBoxData() {
      const response = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trailers");
      }

      const data = await response.json();

      setAllTrailers(data);
      const wallsSelectedTrailers = data.filter(
        (trailer) => trailer?.wallsSelected
      );
      setSelectedTrailers(wallsSelectedTrailers);

      // const trailersOnJigs = data.filter(trailer => trailer.jig !== null && trailer.jig !== undefined && trailer.jig > 0);

      setIsLoading(false);
      return data;
    }

    const onPageLoad = () => {
      try {
        getBoxData().then((response) => {});
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
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        // bgcolor: "m 42",
        justifyContent: "center",
        // flexDirection: "column",
        alignItems: "center",
        position: "relative",
        pt: 0,
        pl: 2,
        pr: 2,
        bgcolor: "white",
      }}
    >
      <SelectTrailerDialog
        selectionKey={wallSelectionKey}
        openSelectTrailerDialog={openSelectTrailerDialog}
        handleClickCloseSelectTrailerDialog={
          handleClickCloseSelectTrailerDialog
        }
        updateSelectedTrailers={updateSelectedTrailers}
        eng={eng}
      />
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
        {/* <Button sx={{ zIndex: "200" }} onClick={uploadTrailerHandler}>
          Upload Trailer walls
        </Button> */}
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
        <Box
          sx={{
            // width: "100%",
            // display: "flex",
            // justifyContent: "flax-start",
            // bgcolor: "red",
            position: "absolute",
            left: "14rem",
            top: "0rem",
          }}
        >
          <Button
            sx={{
              zIndex: "100",
              bgcolor: "var(--primary)",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--primary5)",
                color: "var(--primary)",
                // borderLeft: "none",
              },
            }}
            onClick={() => {
              handleClickOpenSelectTrailerDialog();
            }}
          >
            Select Trailers
          </Button>
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
              fontSize: eng ? "1.6rem" : "1.4rem",
              textAlign: "center",
              mt: "1.7rem",
            }}
          >
            {eng ? "Walls Manufacturing" : "Fabricación de Paredes"}
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
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          alignItems: "center",
          top: "0.8rem",
          right: "1.9rem",
          // bgcolor: "red",
          // width: "100%",
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            sx={{
              zIndex: "100",
              bgcolor: eng ? "var(--primary)" : "white",
              color: eng ? "white" : "var(--primary)",
              "&:hover": {
                backgroundColor: "var(--primary5)",
                color: "var(--primary)",
                // borderLeft: "none",
              },
            }}
            onClick={() => setEng(true)}
          >
            English
          </Button>
          <Button
            sx={{
              zIndex: "100",
              bgcolor: !eng ? "var(--primary)" : "white",
              color: !eng ? "white" : "var(--primary)",
              "&:hover": {
                backgroundColor: "var(--primary5)",
                color: "var(--primary)",
                // borderLeft: "none",
              },
            }}
            onClick={() => setEng(false)}
          >
            Español
          </Button>
        </ButtonGroup>
      </Box>
      <Swiper
        style={{
          "--swiper-navigation-color": "#1976d2",
          "--swiper-navigation-size": "2.6rem",
        }}
        effect={"Fade"}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Navigation, Keyboard, EffectFade]}
        speed={800}
        loop={false}
      >
        {selectedTrailers.map((trailer, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                // bgcolor: "red",
                mt: "1.4rem",
              }}
            >
              <TrailerSwiper
                eng={eng}
                // completedTrailersThisMonth={completedTrailersThisMonth}
                // totalTrailersForTheMonth={totalTrailersForTheMonth}
                // updateWallsHandler={updateWallsHandler}
                trailer={trailer}
                traielrIndex={index}
                handleAddActiveTrailers={handleAddActiveTrailers}
                handleRemoveActiveTrailers={handleRemoveActiveTrailers}
                updateAT={updateAT}
                // handleStart={handleStart}
                // timerIsActive={timerIsActive}
                // renderTimerIsActive={renderTimerIsActive}
                // renderWallStatus={renderWallStatus}
                // renderCompletedDate={renderCompletedDate}
                // handleCompleteWall={handleCompleteWall}
                // renderTrailerProgress={renderTrailerProgress}
                // openDrawings={openDrawings}
                // handleClickOpenDrawings={handleClickOpenDrawings}
                // handleCloseDrawings={handleCloseDrawings}
                // handleClickOpenEmployeesWorking={handleClickOpenEmployeesWorking}
                // currentWall={currentWall}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
