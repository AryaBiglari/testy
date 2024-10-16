import * as React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, ButtonGroup, Button } from "@mui/material";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import CircularProgressForTrailer from "../../components/planning/CircularProgressForTrailers.js";
import boxData from "../../lib/boxData.js";
import DrawingDialogNew from "../../components/walls/DrawingDialogNew";
import RenderPartsLists from "../../components/planning/RenderPartsLists.js";
import SelectTrailerDialog from "../../components/walls/SelectTrailerDialog.js";
import FramesRow from "../../components/frames/FramesRow.js";
import { TextRotationAngleupRounded } from "@mui/icons-material";

  

export default function Frames() {
  const framesSelectionKey = `framesSelected`;
  const [eng, setEng] = React.useState(true);

  const checkPassword = () => {
    const password = localStorage.getItem("password");
    return true;
    return password === "uncleboob";
  };

  const ISSERVER = typeof window === "undefined";
  let isPasswordValid = false;

  if (!ISSERVER) {
    isPasswordValid = checkPassword();
    console.log("Password Valid and Editing On: " + isPasswordValid);
  }

  const [isLoading, setIsLoading] = React.useState(false);

  const [allTrailers, setAllTrailers] = React.useState([]);
  const [selectedTrailers, setSelectedTrailers] = React.useState([]);
  const [schedule, setSchedule] = React.useState([]);
  const [currentTrailer, setCurrentTrailer] = React.useState(null);
  const [currentFrame, setCurrentFrame] = React.useState("");

  const [completedCount, setCompletedCount] = React.useState(0);
  const [finishedCount, setFinishedCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);

  const [openDrawings, setOpenDrawings] = React.useState(false);
  // const [openSelectTrailerDialog, setOpenSelectTrailerDialog] =
  //   React.useState(false);

  // const handleClickOpenSelectTrailerDialog = () => {
  //   setOpenSelectTrailerDialog(true);
  // };

  // const handleClickCloseSelectTrailerDialog = () => {
  //   setOpenSelectTrailerDialog(false);
  // };

  const updateSelectedTrailers = (selectedTrailers) => {
    setSelectedTrailers(selectedTrailers);
  };

  const handleUpdateSelectTrailers = (trailerFrame) => { };

  const handleCompletedCount = (action) => {
    if (action === "add") {
      const newValue = completedCount + 1;
      setCompletedCount(newValue);
    } else if (action === "sub") {
      const newValue = completedCount - 1;
      setCompletedCount(newValue);
    }
  };

  const handleFinishedCount = (action) => {
    if (action === "add") {
      const newValue = finishedCount + 1;
      setFinishedCount(newValue);
    } else if (action === "sub") {
      const newValue = finishedCount - 1;
      setFinishedCount(newValue);
    }
  };

  const handleTotalCount = (action) => {
    if (action === "add") {
      const newValue = totalCount + 1;
      setTotalCount(newValue);
    } else if (action === "sub") {
      const newValue = totalCount - 1;
      setTotalCount(newValue);
    }
  };

  const handleClickOpenDrawings = (trailer, frame) => {
    setCurrentTrailer(trailer);
    setCurrentFrame(frame);
    setOpenDrawings(true);
  };

  const handleCloseDrawings = () => {
    setOpenDrawings(false);
  };

  const [weeklyPercentage, setWeeklyPercentage] = React.useState(0);

  // get Parts - start
  // get Parts - start
  React.useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const scheduleResponse = await fetch(
          `/api/schedule/save-schedule?process=Frames`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!scheduleResponse.ok) {
          throw new Error("Failed to fetch schedule");
        }

        const scheduleData = await scheduleResponse.json();
        const scheduleDataArr = scheduleData.scheduleArr;
        console.log(scheduleData);

        const trailerResponse = await fetch(`/api/frames/get-frames`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!trailerResponse.ok) {
          throw new Error("Failed to fetch trailers");
        }

        const trailerData = await trailerResponse.json();

        const trailerMap = new Map(
          trailerData.map((trailer) => [trailer._id, trailer])
        );

        // Create the selected trailers array based on the schedule order
        const selectedTrailers = scheduleDataArr
          .map((scheduleItem) => {
            if (scheduleItem.show) {
              const trailer = trailerMap.get(scheduleItem.trailerId);
              if (trailer) {
                return {
                  trailer,
                  frameType: scheduleItem.frameType,
                };
              }
            }
            return null; // Handle cases where the trailer might not be found
          })
          .filter((trailer) => trailer !== null); // Remove any null values

        console.log(selectedTrailers);

        setAllTrailers(trailerData);
        setSchedule(scheduleData);
        setSelectedTrailers(selectedTrailers);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    const onPageLoad = () => {
      fetchData();
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  React.useEffect(() => {
    const total = selectedTrailers.length;

    const complete = selectedTrailers.filter((trailer) => {
      if (trailer.frameType === "Front") {
        return trailer.trailer.frontFrameTimeData?.completedDate;
      } else if (trailer.frameType === "Rear") {
        return trailer.trailer.rearFrameTimeData?.completedDate;
      } else {
        return false;
      }
    }).length;

    const finished = selectedTrailers.filter((trailer) => {
      if (trailer.frameType === "Front") {
        return trailer.trailer.frontFrameTimeData?.finishingStartTime;
      } else if (trailer.frameType === "Rear") {
        return trailer.trailer.rearFrameTimeData?.finishingEndTime;
      } else {
        return false;
      }
    }).length;

    console.log(total);
    console.log("COMPLETE" + complete);
    console.log(finished);

    setCompletedCount(complete);
    setFinishedCount(finished);
    setTotalCount(total);

    // const percentage = (complete/total)*100;
    // console.log(percentage);

    // setWeeklyPercentage(complete/total);
  }, [selectedTrailers]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: 1,
          minHeight: "100vh",
          justifyContent: "center", ml: 0,
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
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        pt: 0,
        pl: 2,
        pr: 0,
        bgcolor: "white",
      }}
    >
      {/* RenderPartsLists Component */}
      <RenderPartsLists
        currentTrailer={currentTrailer}
        partType={"Frame"}
        parts={currentTrailer?.hopperDoorsParts}
        currentFrame={currentFrame}
        openDrawings={openDrawings}
        handleCloseDrawings={handleCloseDrawings}
      />
  
      {/* Header Section */}
      <Box
        sx={{
          width: "100%",
          height: "2.4rem",
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
        {/* Logo */}
        <Box
          onClick={() => {}}
          sx={{
            height: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "flex-start",
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
            alt="logo"
            priority={true}
          />
        </Box>
  
        {/* Spacer */}
        <Box sx={{ width: "13.3rem" }}></Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              width: "27rem",
              fontSize: "1.6rem",
              textAlign: "center",
              mt: "1.7rem",
            }}
          >
          {eng ? "Frames Manufacturing" : "Fabricación de marcos"}
        </Typography>
          <Typography
            sx={{
              width: "27rem",
              fontSize: "1.1rem",
              textAlign: "center",
              mt: "1.7rem",
            }}
          >
            {completedCount} Frames Completed from Weekly Goal of {totalCount} (
            {totalCount > 0
              ? Math.round((completedCount / totalCount) * 100)
              : 0}
            %)
          </Typography>
        </Box>
  
        {/* Language Switcher */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            alignItems: "center",
            top: "0.8rem",
            right: "1.9rem",
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
                },
              }}
              onClick={() => setEng(false)}
            >
              Español
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
  
      {/* Table Section */}
      <Box
        sx={{
          width: "100%",
          mt: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Table
          sx={{
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: "12rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                WO | Customer
              </TableCell>
              <TableCell
                sx={{ width: "7rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Trailer
              </TableCell>
              <TableCell
                sx={{ width: "9rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Frame
              </TableCell>
              <TableCell
                sx={{ width: "10rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Picture
              </TableCell>
              <TableCell
                sx={{ width: "5rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Parts
              </TableCell>
              <TableCell
                sx={{ width: "7rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Surface
              </TableCell>
              <TableCell
                sx={{ width: "8rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Special Req.
              </TableCell>
              <TableCell
                sx={{ width: "9rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ width: "11rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Build Timer
              </TableCell>
              <TableCell
                sx={{ width: "10rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Team
              </TableCell>
              <TableCell
                sx={{ width: "11rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Finishing
              </TableCell>
              <TableCell
                sx={{ width: "5rem", fontWeight: "bold", fontSize: "1.1rem" }}
              >
                QA
              </TableCell>
            </TableRow>
          </TableHead>
  
          {/* Table Body */}
          <TableBody>
            {selectedTrailers.map((trailer, index) => (
              <FramesRow
                key={index}
                trailer={trailer.trailer}
                frameType={trailer.frameType}
                handleClickOpenDrawings={handleClickOpenDrawings}
                setCurrentTrailer={setCurrentTrailer}
                setCurrentFrame={setCurrentFrame}
                handleTotalCount={handleTotalCount}
                handleFinishedCount={handleFinishedCount}
                handleCompletedCount={handleCompletedCount}
                index={index}
                isPasswordValid={isPasswordValid}
                eng={eng}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
  
  
}
