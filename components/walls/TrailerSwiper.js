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
import Divider from "@mui/material/Divider";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ErrorIcon from "@mui/icons-material/Error";
// import wallsData from "../../lib/wallsData.js";
// import DrawingDialogNew from "../../components/walls/DrawingDialogNew copy";
import SideWallDriver from "./SideWallDriver";
import RearTop from "./RearTop";
import RearSlope from "./RearSlope";
import FrontSlope from "./FrontSlope";
import FrontTop from "./FrontTop";
import SideWallPassenger from "./SideWallPassenger";

// import CircularWithValueLabel from "/components/CircularWithValueLabel.js";
import WallsProgressChart from "./WallsProgressChart.js";

// import RenderEmployee from "../../components/planning/RenderEmployee.js";

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
import MiddleWall from "./Middlewall.js";

export default function TrailerSwiper(props) {
  const [activeTasks, setActiveTasks] = React.useState([]);
  const [completeWalls, setCompleteWalls] = React.useState(0);

  const addCompletedWall = () => {
    setCompleteWalls(completeWalls + 1);
  };

  // Function to add a wall to the activeTasks array
  const handleAddActiveTasks = (wall) => {
    setActiveTasks((prevTasks) => {
      // Check if the wall type already exists in the active tasks
      const exists = prevTasks.some((task) => task.wallType === wall.wallType);
      if (!exists) {
        // props.handleAddActiveTrailers(wall);
        return [...prevTasks, wall];
      }
      return prevTasks;
    });
  };

  // Function to remove a wall from the activeTasks array
  const handleRemoveActiveTasks = (wallType) => {
    console.log(activeTasks);
    setActiveTasks((prevTasks) =>
      prevTasks.filter((task) => task.wallType !== wallType)
    );
    // props.handleRemoveActiveTrailers (props.trailer.workOrder, props.trailer.trailerType, wallType);
  };

  const [walls, setWalls] = React.useState([]);

  React.useEffect(() => {
    // // Filter walls with status "running"
    // const runningTasks = props.trailer.walls
    //   .filter(wall => wall.status === "Completed")
    //   .map(wall => ({
    //     workOrder: props.trailer.workOrder,
    //     trailerType: props.trailer.trailerType,
    //     wallType: wall.wallType,
    //     currentStartTime: wall.startTime || null,
    //     currentActiveEmployees: wall.activeEmployees || [],
    //   }));

    // // Debugging logs to verify the filtered tasks
    // if (props.trailer.workOrder === "123" && props.trailer.trailerType === "Lead") {
    //   console.log("Running tasks:");
    //   console.log(runningTasks);
    // }

    // // Add running tasks to active tasks
    // runningTasks.forEach(task => {
    //   console.log("Adding task:", task);
    //   handleAddActiveTasks(task);
    // });

    const completedWallsArr = props.trailer.walls.filter(
      (wall) => wall.status === "Completed"
    );
    setCompleteWalls(completedWallsArr.length);
  }, [props.trailer.walls]);

  // React.useEffect(() => {
  //   props.updateAT(activeTasks, props.trailer.trailerType, props.trailer.workOrder);
  // }, [activeTasks]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        fontsize: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        pt: 0,
        pl: 2,
        pr: 2,
      }}
    >
      {/* menu section code */}
      <Box
        sx={{
          position: "absolute",
          width: "25%",
          height: "12.9rem",
          top: "3.4rem",
          bgcolor: "var(--primary5)",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          zIndex: "3",
          borderRadius: "0.5rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "var(--primary25)",
            height: "2.8rem",
            display: "flex",
            justifyContent: "space-between",
            borderTopRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
          }}
        >
          <Box sx={{ ml: 6, display: "flex", alignItems: "center" }}></Box>
          <Box
            sx={{
              width: "100%",
              height: "2.8rem",
              display: "flex",
              mt: 0,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Box
              sx={{ width: "50%", display: "flex", justifyContent: "center" }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>
                {props.trailer.trailerType}
              </Typography>
            </Box>
            <Box
              sx={{ width: "50%", display: "flex", justifyContent: "center" }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>
                WO: {props.trailer.workOrder}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "10rem",
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ mb: 1 }}>
                {props.eng ? "Trailer Progress" : "Progreso en Trailer"}
              </Typography>
            </Box>
            <Box sx={{ pr: 2 }}>
              <WallsProgressChart
                wallsProgress={
                  (completeWalls / props.trailer.walls.length) * 100
                }
              />
            </Box>
          </Box>
          {/* Monthly Progress Section */}
          {/* <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              alignItems: "center",
              borderLeft: "1px solid var(--primary25)",
            }}
          >
            <Box>
              <Typography sx={{ mb: 1 }}>{props.eng ? "Monthly Progress" : "Progreso Mensual"}</Typography>
            </Box>
            <Box sx={{ pr: 2 }}>
              <WallsProgressChart
                wallsProgress={(props.completedTrailersThisMonth / props.totalTrailersForTheMonth) * 100}
              />
            </Box>
          </Box> */}
        </Box>
      </Box>

      {/* Left walls */}
      <Box
        sx={{
          width: "40%",
          height: "40rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* <Box sx={{ width: "80%", height: "20rem", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "flex-start", position: "relative" }}> */}
        <SideWallDriver
          trailer={props.trailer}
          trailerType={props.trailer.trailerType}
          wall={null}
          eng={props.eng}
          task={"Walls"}
          wallType="Side Wall - Driver"
          handleAddActiveTasks={handleAddActiveTasks}
          handleRemoveActiveTasks={handleRemoveActiveTasks}
          addCompletedWall={addCompletedWall}
        />
        {/* </Box> */}

        {/* Bottom left walls */}
        <Box
          sx={{
            width: "100%",
            height: "20rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "45%",
              height: "20rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RearTop
              trailer={props.trailer}
              trailerType={props.trailer.trailerType}
              wall={null}
              eng={props.eng}
              task={"Walls"}
              wallType="Rear Top"
              handleAddActiveTasks={handleAddActiveTasks}
              handleRemoveActiveTasks={handleRemoveActiveTasks}
              addCompletedWall={addCompletedWall}
            />
          </Box>
          <Box
            sx={{
              width: props.trailer.trailerType.includes("T") ? "100%" : "55%",
              height: "20rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: props.trailer.trailerType.includes("T") ? 18 : 0,
            }}
          >
            <RearSlope
              trailer={props.trailer}
              trailerType={props.trailer.trailerType}
              wall={null}
              eng={props.eng}
              task={"Walls"}
              wallType="Rear Slope"
              handleAddActiveTasks={handleAddActiveTasks}
              handleRemoveActiveTasks={handleRemoveActiveTasks}
              addCompletedWall={addCompletedWall}
            />
          </Box>
        </Box>
      </Box>

      {/* Middle Walls */}
      <Box
        sx={{
          width: "18%",
          height: "40rem",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          pt: 22,
        }}
      >
        <MiddleWall
          trailer={props.trailer}
          trailerType={props.trailer.trailerType}
          wall={null}
          eng={props.eng}
          task={"Walls"}
          wallType="Mid Wall"
          handleAddActiveTasks={handleAddActiveTasks}
          handleRemoveActiveTasks={handleRemoveActiveTasks}
          addCompletedWall={addCompletedWall}
        />
      </Box>

      {/* Right Walls */}
      <Box
        sx={{
          width: "42%",
          height: "40rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "22rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pl: 2,
          }}
        >
          <FrontSlope
            trailer={props.trailer}
            trailerType={props.trailer.trailerType}
            wall={null}
            eng={props.eng}
            task={"Walls"}
            wallType="Front Slope"
            handleAddActiveTasks={handleAddActiveTasks}
            handleRemoveActiveTasks={handleRemoveActiveTasks}
            addCompletedWall={addCompletedWall}
          />
          <FrontTop
            trailer={props.trailer}
            trailerType={props.trailer.trailerType}
            wall={null}
            eng={props.eng}
            task={"Walls"}
            wallType="Front Top"
            handleAddActiveTasks={handleAddActiveTasks}
            handleRemoveActiveTasks={handleRemoveActiveTasks}
            addCompletedWall={addCompletedWall}
          />
        </Box>
        <SideWallPassenger
          trailer={props.trailer}
          trailerType={props.trailer.trailerType}
          wall={null}
          eng={props.eng}
          task={"Walls"}
          wallType="Side Wall - Passenger"
          handleAddActiveTasks={handleAddActiveTasks}
          handleRemoveActiveTasks={handleRemoveActiveTasks}
          addCompletedWall={addCompletedWall}
        />
      </Box>
    </Box>
  );
}
