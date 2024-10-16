import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  IconButton,
  Typography,
  Input,
  InputAdornment,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import initialInspectionData from "./inspectionData";
import IssueDialog from "./IssueDialog";
import SubmitDialog from "./SubmitDialog";
import checkpointsData from "../../lib/checkpointsData";

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

const processTrailerName = (trailer) => {
  if (trailer.toLowerCase().includes("tri")) {
    return "tri";
  } else return trailer;
};

const QualityInspectionDialog = ({
  open,
  onClose,
  trailer,
  frameType,
  trailerFrameInspectionData,
  handleCheckPointsData,
}) => {
  const [inspectorName, setInspectorName] = useState("");
  const [isInspectorNameEntered, setIsInspectorNameEntered] = useState(false);
  const [openedSectionIndex, setOpenedSectionIndex] = useState(null);
  const [currentDeviation, setCurrentDeviation] = useState(null);
  const [openDeviationDialog, setOpenDeviationDialog] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [inspectionData, setInspectionData] = useState(null);
  const [isContinuing, setIsContinuing] = useState(false);
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);

  useEffect(() => {
    if (!open) {
      resetState();
    } else {
      // Check if an inspection has already started for this frame type
      const savedInspectionData = structuredClone(trailerFrameInspectionData);
      const savedInspectionDataCheckPoints =
        savedInspectionData?.checkpointsData;
      if (savedInspectionData) {
        // If an inspection has started, continue it
        console.log(savedInspectionData, savedInspectionDataCheckPoints);
        setInspectorName(savedInspectionData.inspectorName || "");
        setInspectionData(savedInspectionDataCheckPoints);
        setStatus(savedInspectionData.status);
        setStartTime(savedInspectionData.startTime);
        if (savedInspectionData?.endTime) {
          setEndTime(savedInspectionData?.endTime);
        }
        // setIsInspectorNameEntered(true);
        setIsContinuing(true);
      } else {
        // Otherwise, start a new inspection
        setInspectorName("");
        const defaultData = getNestedProperty(
          initialInspectionData,
          `${trailer.trailerType.toUpperCase()}.${frameType.toUpperCase()}`
        );
        setInspectionData(defaultData);
        setIsContinuing(false);
        setStartTime(Date.now());
      }
    }
  }, [open, trailer, frameType, trailerFrameInspectionData]);

  const resetState = () => {
    setInspectorName("");
    setIsInspectorNameEntered(false);
    setOpenedSectionIndex(null);
    setCurrentDeviation(null);
    setOpenDeviationDialog(false);
    setOpenSubmitDialog(false);
    setInspectionData(null);
    setIsContinuing(false);
  };

  const handleInspectorNameSubmit = () => {
    if (inspectorName.trim() !== "") {
      setIsInspectorNameEntered(true);
    }
  };

  const handleCheckboxChange = (
    sectionIndex,
    subSectionIndex,
    checkpointIndex
  ) => {
    const updatedData = [...inspectionData];
    const checkpoint =
      updatedData[sectionIndex].SubSectionList[subSectionIndex].CheckpointList[
        checkpointIndex
      ];
    checkpoint.CheckpointStatus =
      checkpoint.CheckpointStatus === "checked" ? "" : "checked";
    setInspectionData(updatedData);
  };

  const handleNumberInputChange = (
    sectionIndex,
    subSectionIndex,
    checkpointIndex,
    value
  ) => {
    const updatedData = [...inspectionData];
    const checkpoint =
      updatedData[sectionIndex].SubSectionList[subSectionIndex].CheckpointList[
        checkpointIndex
      ];
    checkpoint.value = value;
    setInspectionData(updatedData);
  };

  const handleOpenDeviationDialog = (deviation) => {
    setCurrentDeviation(deviation);
    setOpenDeviationDialog(true);
  };

  const handleDeviationSave = (updatedDeviation) => {
    const updatedData = [...inspectionData];
    const { sectionIndex, subSectionIndex, checkpointIndex } = updatedDeviation;
    updatedData[sectionIndex].SubSectionList[subSectionIndex].CheckpointList[
      checkpointIndex
    ] = updatedDeviation;
    setInspectionData(updatedData);
    setOpenDeviationDialog(false);
    handleSave();
  };

  const handleSave = async () => {
    try {
      const updates = {
        [`${frameType.toLowerCase()}FrameInspectionData`]: {
          checkpointsData: [...inspectionData],
          startTime,
          inspectorName,
          status: "In Progress",
        },
      };

      // console.log("Saving inspection data", updates);

      console.log(updates);
      const response = await fetch(`/api/planning/create-trailer`, {
        method: "PUT",
        body: JSON.stringify({ id: trailer._id, updates }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to save inspection data");
      } else {
        const result = await response.json();
        console.log("Save result:", result, updates);
      }
    } catch (error) {
      console.error("Error saving inspection data:", error);
    }
  };

  const handleSubmit = async (comments) => {
    try {
      const currEndTime = Date.now();
      const updatedData = {
        checkpointsData: [...inspectionData],
        startTime,
        endTime: currEndTime,
        inspectorName,
        status: "Complete",
        comments,
      };
      const updates = {
        [`${frameType.toLowerCase()}FrameInspectionData`]: updatedData,
      };
      setEndTime(currEndTime);

      console.log("Submitting inspection data", updates);

      const response = await fetch(`/api/planning/create-trailer`, {
        method: "PUT",
        body: JSON.stringify({ id: trailer._id, updates }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit inspection data");
      }

      const result = await response.json();
      console.log("Submit inspection data", result);
      handleCheckPointsData(updatedData);
      onClose();
    } catch (error) {
      console.error("Error submitting inspection data:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="inspection-dialog-title"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="inspection-dialog-title">
        Quality Inspection | {trailer?.trailerType} | WO: {trailer?.workOrder}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {!isInspectorNameEntered && (
          <>
            {isContinuing ? (
              // If continuing, show the continue button and details
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {trailer.trailerType} {frameType} Frame Inspection
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Inspection originally started by:{" "}
                  <strong>{inspectorName}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Started on:{" "}
                  <strong>{new Date(startTime).toLocaleString()}</strong>
                </Typography>
                {endTime && (
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    Completed on:{" "}
                    <strong>{new Date(endTime).toLocaleString()}</strong>
                  </Typography>
                )}
                <Button onClick={handleInspectorNameSubmit} color="primary">
                  {endTime ? "View" : "Continue"} Inspection
                </Button>
              </Box>
            ) : (
              // If no previous inspection, ask for the inspector name
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Inspector Name"
                  fullWidth
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                />
                <Button onClick={handleInspectorNameSubmit} color="primary">
                  Start Inspection
                </Button>
              </>
            )}
          </>
        )}

        {isInspectorNameEntered && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {inspectionData?.map((section, sectionIndex) => (
              <Box key={sectionIndex} sx={{ width: "100%", maxWidth: "54rem" }}>
                <Box
                  onClick={() =>
                    setOpenedSectionIndex(
                      openedSectionIndex === sectionIndex ? null : sectionIndex
                    )
                  }
                  sx={{
                    mt: 1,
                    mb: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "3.5rem",
                    bgcolor: "#f5f5f5",
                    borderRadius: "0.5rem",
                    border: "1px solid #eff4f8",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      fontSize: "1.7rem",
                      fontWeight: "600",
                      pl: 2,
                      pr: 1,
                    }}
                  >
                    {`Section ${section.SectionNumber}: ${section.SectionName}`}
                  </Typography>
                  <IconButton>
                    {openedSectionIndex === sectionIndex ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "2.6rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "2.6rem" }} />
                    )}
                  </IconButton>
                </Box>

                {openedSectionIndex === sectionIndex &&
                  section.SubSectionList.map((subSection, subSectionIndex) => (
                    <Box
                      key={subSectionIndex}
                      sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          width: "100%",
                          mt: 1,
                          mb: 1,
                        }}
                      >
                        {subSection.SubSectionDescription}
                      </Typography>

                      {subSection.ImageList?.map((image, imageIndex) => (
                        <Box key={imageIndex} sx={{ mb: 2 }}>
                          {image.url.map((imageUrl, urlIndex) => (
                            <Image
                              key={urlIndex}
                              src={imageUrl}
                              alt={`Image ${urlIndex}`}
                              width={500}
                              height={300}
                            />
                          ))}
                        </Box>
                      ))}

                      {subSection.CheckpointList?.map(
                        (checkpoint, checkpointIndex) => (
                          <Box
                            key={checkpointIndex}
                            sx={{
                              width: "48%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              bgcolor:
                                Math.floor(checkpointIndex / 2) % 2 === 0
                                  ? "#F1F4F6"
                                  : "",
                              mb: "1rem",
                              flex: "1 0 48%",
                              boxSizing: "border-box",
                            }}
                          >
                            <Typography sx={{ fontSize: "1.0rem" }}>
                              {`${checkpoint.CheckpointID}: ${checkpoint.CheckpointDescription}`}
                            </Typography>

                            {subSection.sectionType === "Number Inputs" && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Input
                                  id="standard-adornment-weight"
                                  endAdornment={
                                    <InputAdornment position="end">
                                      {checkpoint.unit}
                                    </InputAdornment>
                                  }
                                  sx={{
                                    mr: "2rem",
                                    ml: "1rem",
                                  }}
                                  aria-describedby="standard-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "weight",
                                  }}
                                  value={checkpoint.value || ""}
                                  disabled={status === "Complete"}
                                  onChange={(e) =>
                                    handleNumberInputChange(
                                      sectionIndex,
                                      subSectionIndex,
                                      checkpointIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    alignSelf: "flex-end",
                                    mr: "2rem",
                                  }}
                                >
                                  Expected Value: {checkpoint.expectedValue}{" "}
                                  Variance: {checkpoint.acceptableVariance}
                                </Typography>
                              </Box>
                            )}
                            {subSection.sectionType === "Checkbox" && (
                              <Box sx={{ minWidth: "9rem" }}>
                                {checkpoint.CheckpointStatus !==
                                  "deviation" && (
                                  <Checkbox
                                    disabled={status === "Complete"}
                                    checked={
                                      checkpoint.CheckpointStatus === "checked"
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        sectionIndex,
                                        subSectionIndex,
                                        checkpointIndex
                                      )
                                    }
                                    sx={{
                                      "& .MuiSvgIcon-root": { fontSize: 40 },
                                    }}
                                  />
                                )}
                                {checkpoint.CheckpointStatus !== "checked" && (
                                  <IconButton
                                    onClick={() =>
                                      handleOpenDeviationDialog({
                                        ...checkpoint,
                                        sectionName: section.SectionName,
                                        subSectionDescription:
                                          subSection.SubSectionDescription,
                                        sectionIndex,
                                        subSectionIndex,
                                        checkpointIndex,
                                      })
                                    }
                                  >
                                    {checkpoint.CheckpointStatus === "" ? (
                                      <ErrorOutlineIcon
                                        sx={{ fontSize: 40 }}
                                        color="error"
                                      />
                                    ) : (
                                      <ErrorOutlineIcon sx={{ fontSize: 40 }} />
                                    )}
                                  </IconButton>
                                )}
                              </Box>
                            )}
                          </Box>
                        )
                      )}
                    </Box>
                  ))}
              </Box>
            ))}
            <DialogActions>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
              <Button onClick={() => setOpenSubmitDialog(true)} color="primary">
                Submit
              </Button>
              {/* <Button onClick={onClose} color="primary">
            Close
          </Button> */}
            </DialogActions>
          </Box>
        )}

        {isInspectorNameEntered && status === "Complete" && false && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {inspectionData?.map((section, sectionIndex) => (
              <Box key={sectionIndex} sx={{ width: "100%", maxWidth: "54rem" }}>
                <Box
                  onClick={() =>
                    setOpenedSectionIndex(
                      openedSectionIndex === sectionIndex ? null : sectionIndex
                    )
                  }
                  sx={{
                    mt: 1,
                    mb: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "3.5rem",
                    bgcolor: "#f5f5f5",
                    borderRadius: "0.5rem",
                    border: "1px solid #eff4f8",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      fontSize: "1.7rem",
                      fontWeight: "600",
                      pl: 2,
                      pr: 1,
                    }}
                  >
                    {`Section ${section.SectionNumber}: ${section.SectionName}`}
                  </Typography>
                  <IconButton>
                    {openedSectionIndex === sectionIndex ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "2.6rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "2.6rem" }} />
                    )}
                  </IconButton>
                </Box>

                {openedSectionIndex === sectionIndex &&
                  section.SubSectionList.map((subSection, subSectionIndex) => (
                    <Box
                      key={subSectionIndex}
                      sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          width: "100%",
                          mt: 1,
                          mb: 1,
                        }}
                      >
                        {subSection.SubSectionDescription}
                      </Typography>

                      {subSection.ImageList?.map((image, imageIndex) => (
                        <Box key={imageIndex} sx={{ mb: 2 }}>
                          {image.url.map((imageUrl, urlIndex) => (
                            <Image
                              key={urlIndex}
                              src={imageUrl}
                              alt={`Image ${urlIndex}`}
                              width={500}
                              height={300}
                            />
                          ))}
                        </Box>
                      ))}

                      {subSection.CheckpointList?.map(
                        (checkpoint, checkpointIndex) => (
                          <Box
                            key={checkpointIndex}
                            sx={{
                              width: "48%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              bgcolor:
                                Math.floor(checkpointIndex / 2) % 2 === 0
                                  ? "#F1F4F6"
                                  : "",
                              mb: "1rem",
                              flex: "0 0 48%",
                              boxSizing: "border-box",
                            }}
                          >
                            <Typography sx={{ fontSize: "1.0rem" }}>
                              {`${checkpoint.CheckpointID}: ${checkpoint.CheckpointDescription}`}
                            </Typography>

                            {subSection.sectionType === "Number Inputs" && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Input
                                  id="standard-adornment-weight"
                                  disabled={true}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      {checkpoint.unit}
                                    </InputAdornment>
                                  }
                                  sx={{
                                    mr: "2rem",
                                    ml: "1rem",
                                  }}
                                  aria-describedby="standard-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "weight",
                                  }}
                                  value={checkpoint.value || ""}
                                  onChange={(e) =>
                                    handleNumberInputChange(
                                      sectionIndex,
                                      subSectionIndex,
                                      checkpointIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    alignSelf: "flex-end",
                                    mr: "2rem",
                                  }}
                                >
                                  Expected Value: {checkpoint.expectedValue}{" "}
                                  Variance: {checkpoint.acceptableVariance}
                                </Typography>
                              </Box>
                            )}
                            {subSection.sectionType === "Checkbox" && (
                              <Box sx={{ minWidth: "9rem" }}>
                                {checkpoint.CheckpointStatus !==
                                  "deviation" && (
                                  <Checkbox
                                    disabled={true}
                                    checked={
                                      checkpoint.CheckpointStatus === "checked"
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        sectionIndex,
                                        subSectionIndex,
                                        checkpointIndex
                                      )
                                    }
                                    sx={{
                                      "& .MuiSvgIcon-root": { fontSize: 40 },
                                    }}
                                  />
                                )}
                                {checkpoint.CheckpointStatus !== "checked" && (
                                  <IconButton
                                    onClick={() =>
                                      handleOpenDeviationDialog({
                                        ...checkpoint,
                                        sectionName: section.SectionName,
                                        subSectionDescription:
                                          subSection.SubSectionDescription,
                                        sectionIndex,
                                        subSectionIndex,
                                        checkpointIndex,
                                      })
                                    }
                                  >
                                    {checkpoint.CheckpointStatus === "" ? (
                                      <ErrorOutlineIcon
                                        sx={{ fontSize: 40 }}
                                        color="error"
                                      />
                                    ) : (
                                      <ErrorOutlineIcon sx={{ fontSize: 40 }} />
                                    )}
                                  </IconButton>
                                )}
                              </Box>
                            )}
                          </Box>
                        )
                      )}
                    </Box>
                  ))}
              </Box>
            ))}
            {status !== "Complete" && (
              <DialogActions>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
                <Button
                  onClick={() => setOpenSubmitDialog(true)}
                  color="primary"
                >
                  Submit
                </Button>
                {/* <Button onClick={onClose} color="primary">
            Close
          </Button> */}
              </DialogActions>
            )}
          </Box>
        )}
      </DialogContent>

      <IssueDialog
        openDeviationDialog={openDeviationDialog}
        handleCloseDeviationDialog={() => setOpenDeviationDialog(false)}
        currentDeviation={currentDeviation}
        handleDeviationSave={handleDeviationSave}
        inputDisabled={status === "Complete"}
      />

      <SubmitDialog
        openSubmitDialog={openSubmitDialog}
        handleCloseSubmitDialog={() => setOpenSubmitDialog(false)}
        handleSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default QualityInspectionDialog;
