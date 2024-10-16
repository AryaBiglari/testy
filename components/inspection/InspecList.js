import React, { useState } from "react";
import { Box, Typography, Checkbox, IconButton, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

const sectionIsCompleted = (section) => {
  let totalUnchecked = 0;
  let totalCheckpointsCount = 0;

  section.SubSectionList.forEach((subSection) => {
    subSection.CheckpointList.forEach((checkpoint) => {
      if (checkpoint.CheckpointStatus !== "deviation") {
        totalCheckpointsCount++;
        if (checkpoint.CheckpointStatus === "") {
          totalUnchecked++;
        }
      }
    });
  });

  return totalUnchecked === 0 && totalCheckpointsCount > 0;
};

const renderImage = (image, trailerType, optionalFeatures) => {
  let renderImage = false;

  if (image?.TrailerType?.length > 0) {
    if (image?.TrailerType?.includes(trailerType)) {
      renderImage = true;
    } else return false;
  }
  if (image?.TrailerType?.length === 0) {
    renderImage = true;
  }

  if (renderImage) {
    if (!image?.AirInflation) {
      renderImage = true;
    } else if (
      image?.AirInflation &&
      image.AirInflation === "notSelected" &&
      !optionalFeatures.includes("Air Inflation")
    ) {
      renderImage = true;
    } else if (
      image?.AirInflation &&
      image.AirInflation === "selected" &&
      optionalFeatures.includes("Air Inflation")
    ) {
      renderImage = true;
    } else {
      return false;
    }
  }

  if (renderImage) {
    if (image?.TireType === "") {
      renderImage = true;
    } else if (image?.TireType === trailerType) {
      renderImage = true;
    } else {
      return false;
    }
  }

  if (renderImage) {
    if (image?.FendersType === "") {
      renderImage = true;
    } else if (image?.FendersType === trailerType) {
      renderImage = true;
    } else {
      return false;
    }
  }

  if (renderImage) {
    if (image?.doorsOpeningDirection === "") {
      renderImage = true;
    } else if (image?.doorsOpeningDirection === trailerType) {
      renderImage = true;
    } else {
      return false;
    }
  }

  if (renderImage) {
    if (!image?.tarpsOpening) {
      renderImage = true;
    } else if (
      image?.tarpsOpening &&
      image.tarpsOpening === "Manual" &&
      !optionalFeatures.includes("Electric Tarp Opening")
    ) {
      renderImage = true;
    } else if (
      image?.tarpsOpening &&
      image.tarpsOpening === "Electric" &&
      optionalFeatures.includes("Electric Tarp Opening")
    ) {
      renderImage = true;
    } else {
      return false;
    }
  }

  return renderImage;
};

const InspectionList = ({
  inspectionData,
  trailerType,
  optionalFeatures,
  setUpdatedInspectionData,
  handleOpenSubmitDialog,
  handleOpenDeviationDialog,
}) => {
  const [openedSectionIndex, setOpenedSectionIndex] = useState(null);

  const handleCheckAllItems = (section, isSectionComplete) => {
    const updatedData = [...inspectionData];
    section.SubSectionList.forEach((subSection) => {
      subSection.CheckpointList.forEach((checkpoint) => {
        if (checkpoint.CheckpointStatus !== "deviation") {
          checkpoint.CheckpointStatus = isSectionComplete ? "" : "checked";
        }
      });
    });
    setUpdatedInspectionData(updatedData);
  };

  const areAllPointsAssessed = (inspectionData) => {
    for (const section of inspectionData) {
      for (const subSection of section.SubSectionList) {
        for (const checkpoint of subSection.CheckpointList) {
          if (checkpoint.CheckpointStatus === "") {
            return false;
          }
        }
      }
    }
    return true;
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
    setUpdatedInspectionData(updatedData);
  };

  const handleOpenDeviationDialogLocal = (
    checkpoint,
    subSection,
    section,
    sectionIndex,
    subSectionIndex,
    checkpointIndex
  ) => {
    const deviation = {
      CheckpointID: checkpoint.CheckpointID,
      sectionName: section.SectionName,
      subSectionDescription: subSection.SubSectionDescription,
      CheckpointDescription: checkpoint.CheckpointDescription,
      sectionIndex,
      subSectionIndex,
      checkpointIndex,
      workOrder: section.workOrder,
      imageURLS: checkpoint.imageURLS,
      trailerType: section.trailerType,
      comments: checkpoint.comments,
      deviationType: checkpoint.deviationType,
    };
    handleOpenDeviationDialog(deviation);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {inspectionData.map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ width: "100%", maxWidth: "44rem" }}>
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
              bgcolor: sectionIsCompleted(section)
                ? "var(--success50)"
                : "var(--primary5)",
              borderRadius: "0.5rem",
              border: sectionIsCompleted(section)
                ? "1px solid #84cda6"
                : "1px solid #eff4f8",
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
                sx={{
                  width: "100%",
                }}
              >
                <Typography
                  sx={{ fontSize: "1.5rem", fontWeight: "600", mt: 1, mb: 1 }}
                >
                  {subSection.SubSectionDescription}
                </Typography>

                {subSection.ImageList &&
                  typeof subSection.ImageList[0] === "string" &&
                  (!subSection?.optional ||
                    optionalFeatures.includes(subSection.optional) ||
                    subSection.optional === "Manual") &&
                  !(
                    (optionalFeatures.includes("Electric Doors Opening") ||
                      optionalFeatures.includes("Electric Tarp Opening")) &&
                    subSection.optional === "Manual"
                  ) &&
                  subSection.ImageList.map((image, imageIndex) => (
                    <Box
                      key={imageIndex}
                      sx={{ position: "relative", width: "100%", mt: 3, mb: 3 }}
                    >
                      <Image
                        src={image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "90%", height: "auto" }}
                        alt="preview-image"
                      />
                    </Box>
                  ))}

                {subSection.ImageList &&
                  typeof subSection.ImageList[0] === "object" &&
                  (!subSection?.optional ||
                    optionalFeatures.includes(subSection.optional) ||
                    subSection.optional === "Manual") &&
                  !(
                    (optionalFeatures.includes("Electric Doors Opening") ||
                      optionalFeatures.includes("Electric Tarp Opening")) &&
                    subSection.optional === "Manual"
                  ) &&
                  subSection.ImageList.map(
                    (image, imageIndex) =>
                      renderImage(image, trailerType, optionalFeatures) &&
                      image?.url?.map((imageItem, imageItemIndex) => (
                        <Box
                          key={imageItemIndex}
                          sx={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 3,
                            mb: 3,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={imageItem}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "90%", height: "auto" }}
                            alt="preview-image"
                          />
                        </Box>
                      ))
                  )}

                {subSection.CheckpointList?.map(
                  (checkpoint, checkpointIndex) => (
                    <Box
                      key={checkpointIndex}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: checkpointIndex % 2 === 1 ? "#F1F4F6" : "",
                        mb: "1rem",
                      }}
                    >
                      <Typography sx={{ fontSize: "1.4rem" }}>
                        {`${checkpoint.CheckpointID}: ${checkpoint.CheckpointDescription}`}
                      </Typography>
                      <Box sx={{ minWidth: "9rem" }}>
                        {checkpoint.CheckpointStatus !== "deviation" && (
                          <Checkbox
                            checked={checkpoint.CheckpointStatus === "checked"}
                            onChange={() =>
                              handleCheckboxChange(
                                sectionIndex,
                                subSectionIndex,
                                checkpointIndex
                              )
                            }
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                          />
                        )}
                        {checkpoint.CheckpointStatus !== "checked" && (
                          <IconButton
                            onClick={() =>
                              handleOpenDeviationDialogLocal(
                                checkpoint,
                                subSection,
                                section,
                                sectionIndex,
                                subSectionIndex,
                                checkpointIndex
                              )
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
                    </Box>
                  )
                )}
              </Box>
            ))}

          {openedSectionIndex === sectionIndex && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 3,
                mb: 3,
              }}
            >
              <Button
                variant="contained"
                sx={{ fontSize: "1.1rem" }}
                onClick={() =>
                  handleCheckAllItems(section, sectionIsCompleted(section))
                }
              >
                {sectionIsCompleted(section) ? "Uncheck all" : "Check all"}
              </Button>
            </Box>
          )}
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenSubmitDialog}
        sx={{ mt: 4 }}
        disabled={!areAllPointsAssessed(inspectionData)}
      >
        Submit Inspection Data
      </Button>
    </Box>
  );
};

export default InspectionList;
