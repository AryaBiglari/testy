import * as React from "react";
import Image from "next/image";
import boxData from "../../lib/boxData.js";
import DrawingDialogNew from "../../components/walls/DrawingDialogNew.js";
import RenderPartsLists from "../../components/smallparts/RenderPartsLists.js";
import SelectTrailerDialog from "../../components/walls/SelectTrailerDialog.js";
import WallsRow from "../../components/walls/WallsRow.js";
import { halftone16x16Orthogonal } from "@cloudinary/url-gen/qualifiers/dither";
import SmallPartsRow from "../../components/smallparts/SmallPartsRow.js";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
  ButtonGroup,
  CircularProgress,
  Button,
} from "@mui/material";

export default function Frames() {
  const [eng, setEng] = React.useState(true);
  const wallSelectionKey = `wallsSelected`;

  const checkPassword = () => {
    const password = localStorage.getItem("password");
    return true;
    return password === "uncleboob";
  };

const [isPasswordValid, setIsPasswordValid] = React.useState(false);

// Only run on the client side
React.useEffect(() => {
  if (typeof window !== "undefined") {
    const passwordValid = checkPassword();
    setIsPasswordValid(passwordValid);
    console.log("Password Valid and Editing On: " + passwordValid);
  }
}, []);


  const [isLoading, setIsLoading] = React.useState(false);

  const [allTrailers, setAllTrailers] = React.useState([]);
  const [selectedTrailers, setSelectedTrailers] = React.useState([]);
  const [schedule, setSchedule] = React.useState([]);
  const [currentTrailer, setCurrentTrailer] = React.useState(null);
  const [currentFrame, setCurrentFrame] = React.useState("");

  // console.log(currentTrailer);

  const [openDrawings, setOpenDrawings] = React.useState(false);
  // const [openSelectTrailerDialog, setOpenSelectTrailerDialog] =
  //   React.useState(false);

  // const handleClickOpenSelectTrailerDialog = () => {
  //   setOpenSelectTrailerDialog(true);
  // };

  // const handleClickCloseSelectTrailerDialog = () => {
  //   setOpenSelectTrailerDialog(false);
  // };

  const [completedCount, setCompletedCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);

  const handleCompletedCount = (action) => {
    if (action === "add") {
      const newValue = completedCount + 1;
      setCompletedCount(newValue);
    } else if (action === "sub") {
      const newValue = completedCount - 1;
      setCompletedCount(newValue);
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

  const updateSelectedTrailers = (selectedTrailers) => {
    setSelectedTrailers(selectedTrailers);
  };

  const handleClickOpenDrawings = (trailer, frame) => {
    setCurrentTrailer(trailer);
    setCurrentFrame(frame);
    setOpenDrawings(true);
  };

  const handleCloseDrawings = (val) => {
    setOpenDrawings(val);
  };

  // get Parts - start
  React.useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const scheduleResponse = await fetch(
          `/api/schedule/save-schedule?process=Walls`,
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
        const scheduleDataArr = scheduleData?.scheduleArr;
        console.log(scheduleDataArr);

        const trailerResponse = await fetch(`/api/planning/create-trailer`, {
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
                  wallType: scheduleItem.wallType,
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
      try {
        fetchData().then((response) => { });
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

  React.useEffect(() => {
    const total = selectedTrailers.reduce((acc, curr) => {
      return acc + (curr?.trailer?.walls?.length || 0); // Safely check if walls exist
    }, 0);
    console.log(total);
    console.log(selectedTrailers);

    const complete = selectedTrailers.reduce((acc, trailer) => {
      const wallsWithCompletedDate = trailer?.trailer?.walls?.filter(
        (wall) => wall?.completedDate
      ).length || 0; // Safely check if walls exist and filter them
      return acc + wallsWithCompletedDate;
    }, 0);

    console.log(total);
    console.log(complete);

    setCompletedCount(complete);
    setTotalCount(total);

    const percentage = total > 0 ? (complete / total) * 100 : 0; // Avoid division by zero
    console.log(percentage);

    // setWeeklyPercentage(percentage);
  }, [selectedTrailers]);


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
        pr: 2,
        bgcolor: "white",
      }}
    >
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
          onClick={() => { }}
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

        {/* Title and Progress */}
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
            {eng ? "Walls Manufacturing" : "Fabricación de paredes"}
          </Typography>
          <Typography
            sx={{
              width: "27rem",
              fontSize: "1.1rem",
              textAlign: "center",
              mt: "1.7rem",
            }}
          >
            {completedCount} Walls Completed from Weekly Goal of {totalCount} (
            {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}
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
          alignItems: "flex-start",
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
                sx={{ width: "18rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                WO | Customer
              </TableCell>
              <TableCell
                sx={{ width: "9rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Trailer
              </TableCell>
              <TableCell
                sx={{ width: "13rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Wall
              </TableCell>
              <TableCell
                sx={{ width: "10rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Picture
              </TableCell>
              {/* Removed the 'Required' column */}
              <TableCell
                sx={{ width: "5rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Parts
              </TableCell>
              <TableCell
                sx={{ width: "8rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Special Req.
              </TableCell>
              <TableCell
                sx={{ width: "9rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ width: "11rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Timer
              </TableCell>
              <TableCell
                sx={{ width: "25rem", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Team
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {selectedTrailers.map((trailerObj, index) => (
              <React.Fragment key={index}>
                {/* Render WallsRow components for each wall type */}
                {["Side Wall - Passenger", "Side Wall - Driver", "Rear Slope", "Front Slope", "Mid Wall", "Rear Top", "Front Top", "Mid Wall 2"].map(
                  (wallType) => (
                    <WallsRow
                      key={`${trailerObj.trailer.workOrder}-${wallType}`}
                      trailer={trailerObj.trailer}
                      wallType={wallType}
                      handleClickOpenDrawings={handleClickOpenDrawings}
                      setCurrentTrailer={setCurrentTrailer}
                      setCurrentFrame={setCurrentFrame}
                      handleCompletedCount={handleCompletedCount}
                      eng={eng}
                      index={index}
                      isPasswordValid={isPasswordValid}
                    />
                  )
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );

}
