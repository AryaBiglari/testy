// "use client";
import { useRouter } from "next/router";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GetNameDialog from "./GetNameDialog";
import TrailerDetailsDialog from "../planning/TrailerDetailsDialog.js";

function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ minWidth: "4rem", ml: 0 }}>
      <Typography sx={{ fontSize: "1rem", color: "var(--secondary50)" }}>
        <div>
          <Button
            aria-describedby={id}
            variant="outlined"
            onClick={handleClick}
          >
            Info
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              {props.optionalFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </Typography>
          </Popover>
        </div>
      </Typography>
    </Box>
  );
}

export default function ActiveInspectionLists(props) {
  const [isOpenGetNameDialog, setIsOpenGetNameDialog] = React.useState(null);
  const [activeTrailer, setActiveTrailer] = React.useState(null);
  const [openDetails, setOpenDetails] = React.useState(false);

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleGetNameDialogClose = () => {
    setIsOpenGetNameDialog(false);
  };

  const handleGetNameDialogOpen = () => {
    setIsOpenGetNameDialog(true);
  };

  const addInspectorName = async (name, wo, trailerType) => {
    const updates = {
      "qualityInspection.inspectorName": name,
    };

    const data = {
      workOrder: wo,
      trailerType: trailerType,
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
        throw new Error("Failed to update inspector name");
      }

      const result = await response.json();
      console.log("Inspector name updated successfully:", result);
    } catch (error) {
      console.error("Error updating inspector name:", error);
    }
  };

  const router = useRouter();

  const handleInspectionStart = (trailer) => {
    setActiveTrailer(trailer);
    if (trailer?.qualityInspection.inspectorName === "") {
      handleGetNameDialogOpen();
    } else {
      window.open(`/qc/${trailer._id}`);
    }
  };

  async function handleDeleteInspectionList(id) {
    const response = await fetch("/api/delete-inspection-list", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newInspectionLists = [];
    if (response?.ok) {
      props.handleOpenDeletedListAlert();
      props.trailersList.map((inspection) => {
        if (inspection._id !== id) {
          return newInspectionLists.push(inspection);
        }
      });

      props.handletrailersList(newInspectionLists);
    }
  }

  // Helper function to group and sort trailers by month
  const groupTrailersByMonth = (trailers) => {
    const groupedTrailers = {};
    trailers?.forEach((trailer) => {
      const date = new Date(trailer.dateCreated);
      const monthYear = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!groupedTrailers[monthYear]) {
        groupedTrailers[monthYear] = [];
      }
      groupedTrailers[monthYear].push(trailer);
    });

    // Sort each group by date in descending order
    for (const monthYear in groupedTrailers) {
      groupedTrailers[monthYear].sort((a, b) => {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateB - dateA;
      });
    }

    return groupedTrailers;
  };

  // Group and sort trailers
  const groupedTrailers = groupTrailersByMonth(props.trailersList);

  // Sort the groups by month in descending order
  const sortedMonthKeys = Object.keys(groupedTrailers).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA;
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        pb: 0,
      }}
    >
      <GetNameDialog
        isOpen={isOpenGetNameDialog}
        handleOpen={handleGetNameDialogOpen}
        handleClose={handleGetNameDialogClose}
        addName={addInspectorName}
        trailer={activeTrailer}
      />

      <Box
        sx={{
          width: "100%",
          maxWidth: "50rem",
          minWidth: "44rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          maxHeight: props.showActiveListsOpen ? "100%" : "6rem",
          overflow: "hidden",
          pb: 3,
          border: "var(--mainBorder)",
          borderRadius: "0.5rem",
          mt: 4,
          pl: 1,
          pr: 1,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            onClick={() =>
              props.handleActiveListsOpen(!props.showActiveListsOpen)
            }
            sx={{ width: "100%", pl: 3 }}
          >
            <Typography sx={{ fontSize: "2rem", mt: 2 }}>
              Active Inspection Lists
            </Typography>
          </Box>
          <IconButton
            onClick={() =>
              props.handleActiveListsOpen(!props.showActiveListsOpen)
            }
            sx={{ ml: 6, mt: 3, mr: 0 }}
          >
            {props.showActiveListsOpen ? (
              <KeyboardArrowUpIcon sx={{ fontSize: "2.8rem" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: "2.8rem" }} />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              pl: 2,
            }}
          >
            <Box sx={{ minWidth: "7rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Work Order
              </Typography>
            </Box>
            <Box sx={{ minWidth: "4.8rem", pr: 1 }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Trailer
              </Typography>
            </Box>
            <Box sx={{ minWidth: "6.3rem", pr: 1 }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Customer
              </Typography>
            </Box>
            <Box sx={{ minWidth: "8.1rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Date
              </Typography>
            </Box>
            <Box sx={{ minWidth: "5.3rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Progress
              </Typography>
            </Box>
            <Box sx={{ minWidth: "4.0rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Specs
              </Typography>
            </Box>
          </Box>
          <TrailerDetailsDialog
            currentTrailer={activeTrailer}
            openDetails={openDetails}
            handleCloseDetails={handleCloseDetails}
          />
          {sortedMonthKeys.map((monthYear, monthIndex) => (
            <Box key={monthYear} sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  mt: monthIndex === 0 ? 1.5 : 0,
                  mb: 2.5,
                  pl: 2,
                }}
              >
                {monthYear}
              </Typography>
              {groupedTrailers[monthYear].map((trailer, rowIndex) => (
                <Box
                  key={rowIndex}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    pl: 2,
                    mb:
                      rowIndex !== groupedTrailers[monthYear].length - 1
                        ? 2.5
                        : 2.5,
                  }}
                >
                  <Box sx={{ minWidth: "7rem" }}>
                    <Typography
                      sx={{ fontSize: "0.9rem", color: "var(--secondary50)" }}
                    >
                      {trailer.workOrder}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "4.8rem" }}>
                    <Typography
                      sx={{
                        fontSize:
                          trailer?.trailerType.length > 8 ? "0.7rem" : "0.9rem",
                        pr: 1,
                        color: "var(--secondary50)",
                      }}
                    >
                      {trailer.trailerType}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "6.3rem" }}>
                    <Typography
                      sx={{
                        fontSize:
                          trailer?.customer.length > 8 ? "0.7rem" : "0.9rem",
                        pr: 1,
                        color: "var(--secondary50)",
                      }}
                    >
                      {trailer.customer}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "8.1rem", ml: 0 }}>
                    <Typography
                      sx={{ fontSize: "0.9rem", color: "var(--secondary50)" }}
                    >
                      {`${new Date(trailer?.dateCreated)?.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}, ${new Date(trailer?.dateCreated)?.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}`}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "5.3rem" }}>
                    <Typography
                      sx={{ fontSize: "0.9rem", color: "var(--secondary50)" }}
                    >
                      {(+trailer?.qualityInspection?.inspectionProgress
                        ? +trailer?.qualityInspection?.inspectionProgress
                        : 0
                      ).toFixed(1)}
                      {"%"}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "4.0rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => {
                          setActiveTrailer(trailer);
                          handleClickOpenDetails();
                        }}
                      >
                        <DocumentScannerIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleInspectionStart(trailer);
                      }}
                      variant="contained"
                      sx={{
                        ml: 2,
                        mr: 2,
                      }}
                    >
                      {trailer?.qualityInspection?.status === "In Progress"
                        ? "Resume"
                        : "Start"}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
