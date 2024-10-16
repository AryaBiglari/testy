"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import InspectionList from "../../components/inspection/InspecList";
import SubmitDialog from "../../components/inspection/SubmitDialog";
import IssueDialog from "../../components/inspection/IssueDialog";
import inspectionData from "../../lib/deliveryInspectionData";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const vin = router.query.vinNumber;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatedInspectionData, setUpdatedInspectionData] =
    useState(inspectionData);
  const [openDeviationDialog, setOpenDeviationDialog] = useState(false);
  const [currentDeviation, setCurrentDeviation] = useState(null);
  const [optionalFeatures, setOptionalFeatures] = useState(null);

  const handleSubmitInspectionData = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/planning/submit-inspection-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vin: vin,
          inspectionData: updatedInspectionData,
          comments,
        }),
      });
      if (response.ok) {
        alert("Inspection data submitted successfully");
        setOpenSubmitDialog(false);
        setTrailer({ ...trailer, lastInspection: true }); // Update the local state to reflect submission
        router.reload(); // Reload the page
      } else {
        alert("Failed to submit inspection data");
      }
    } catch (error) {
      console.error("Error submitting inspection data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenSubmitDialog = () => {
    setOpenSubmitDialog(true);
  };

  const handleCloseSubmitDialog = () => {
    setOpenSubmitDialog(false);
  };

  const handleOpenDeviationDialog = (deviation) => {
    setCurrentDeviation(deviation);
    setOpenDeviationDialog(true);
  };

  const handleCloseDeviationDialog = () => {
    setOpenDeviationDialog(false);
  };

  const handleDeviationSave = (updatedDeviation) => {
    const { sectionIndex, subSectionIndex, checkpointIndex } = currentDeviation;
    const updatedData = [...updatedInspectionData];
    updatedData[sectionIndex].SubSectionList[subSectionIndex].CheckpointList[
      checkpointIndex
    ] = updatedDeviation;
    setUpdatedInspectionData(updatedData);
    setOpenDeviationDialog(false);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const sectionsConditionalRender = (trailerType, sectionArray) => {
    if (
      (trailerType === "Pup" || trailerType === "Tandem") &&
      sectionArray.SubSectionList2
    ) {
      return sectionArray?.SubSectionList2;
    } else if (
      (trailerType === "Tri 61' 2 Hoppers" ||
        trailerType === "Tri 61' 3 Hoppers" ||
        trailerType === "Tri 72' 2 Hoppers") &&
      sectionArray.SubSectionList3
    ) {
      return sectionArray?.SubSectionList3;
    } else if (
      (trailerType === "Tri 61' 2 Hoppers" ||
        trailerType === "Tri 61' 3 Hoppers" ||
        trailerType === "Tri 72' 2 Hoppers") &&
      sectionArray.SectionNumber === 6
    ) {
      return sectionArray?.SubSectionList2;
    } else if (
      (trailerType === "Pup" ||
        trailerType === "Tandem" ||
        trailerType === "Tri 61' 2 Hoppers" ||
        trailerType === "Tri 61' 3 Hoppers" ||
        trailerType === "Tri 72' 2 Hoppers") &&
      (!sectionArray.SubSectionList2 || !sectionArray.SubSectionList3)
    ) {
      return sectionArray?.SubSectionList;
    } else if (trailerType === "Lead") {
      return sectionArray?.SubSectionList;
    }
  };

  const sectionIncludesThisTrailer = (trailerType, section) => {
    if (section?.TrailersUsedIn) {
      return section?.TrailersUsedIn?.includes(trailerType);
    } else return true;
  };

  const filterInspectionData = (
    inspectionData,
    trailerType,
    optionalFeatures
  ) => {
    return inspectionData
      .map((section) => {
        // Check if the section includes the trailer type
        if (!sectionIncludesThisTrailer(trailerType, section)) {
          return null;
        }

        // Check if the section is optional and included in optional features
        if (section.optional && !optionalFeatures.includes(section.optional)) {
          return null;
        }

        // Get the relevant subsections based on the trailer type
        const relevantSubSections = sectionsConditionalRender(
          trailerType,
          section
        )
          ?.map((subSection) => {
            // Check if the subsection is optional and included in optional features
            if (
              subSection.optional &&
              !optionalFeatures.includes(subSection.optional) &&
              subSection.optional !== "Manual"
            ) {
              return null;
            }

            // Filter checkpoints
            const filteredCheckpoints = subSection.CheckpointList?.filter(
              (checkpoint) => checkpoint.CheckpointStatus !== "deviation"
            );

            return {
              ...subSection,
              CheckpointList: filteredCheckpoints,
            };
          })
          .filter(Boolean);

        return {
          ...section,
          SubSectionList: relevantSubSections,
        };
      })
      .filter(Boolean);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/planning/search-trailer-by-vin?vin=${vin}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const trailerData = await response.json();
        setTrailer(trailerData);
        const filteredData = filterInspectionData(
          inspectionData,
          trailerData.trailerType,
          trailerData.qualityInspection.optionalFeatures
        );
        setUpdatedInspectionData(filteredData);
        setOptionalFeatures(trailerData.qualityInspection.optionalFeatures);
        console.log("Filtered Data:");
        console.log(filteredData);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (vin) {
      fetchData();
    }
  }, [vin]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const renderDeviations = (inspectionData) => {
    const deviations = [];

    inspectionData.forEach((section, sectionIndex) => {
      section.SubSectionList.forEach((subSection, subSectionIndex) => {
        subSection.CheckpointList.forEach((checkpoint, checkpointIndex) => {
          if (checkpoint.CheckpointStatus === "deviation") {
            deviations.push({
              sectionName: section.SectionName,
              subSectionDescription: subSection.SubSectionDescription,
              ...checkpoint,
              sectionIndex,
              subSectionIndex,
              checkpointIndex,
            });
          }
        });
      });
    });

    return deviations.map((deviation, index) => (
      <Box key={index} sx={{ marginBottom: 4 }}>
        <Typography variant="h6">
          {deviation.sectionName} - {deviation.subSectionDescription}
        </Typography>
        <Typography variant="body1">
          {deviation.CheckpointDescription}
        </Typography>
        <Typography variant="body2">Comments: {deviation.comments}</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
          {deviation.imageURLS &&
            deviation.imageURLS.map((url, idx) => (
              <Box key={idx} sx={{ width: "100%", maxWidth: 300, margin: 1 }}>
                <Image
                  src={url}
                  alt={`Deviation Image ${idx + 1}`}
                  width={300}
                  height={200}
                  objectFit="contain"
                />
              </Box>
            ))}
        </Box>
      </Box>
    ));
  };

  return (
    <Container>
      {trailer && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            marginTop: 4,
            backgroundColor: "background.paper",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Trailer Information
          </Typography>
          <Typography variant="body1">VIN: {trailer.vinNumber}</Typography>
          <Typography variant="body1">Model: {trailer.trailerType}</Typography>
        </Paper>
      )}

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          marginTop: 4,
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {trailer && trailer.lastInspection
            ? "Inspection Submitted"
            : "Inspection Checklist"}
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : trailer && trailer.lastInspection ? (
          <Box>
            <Typography variant="body1">
              The inspection has been submitted successfully.
            </Typography>
            {renderDeviations(trailer.inspectionData)}
          </Box>
        ) : (
          <InspectionList
            inspectionData={updatedInspectionData}
            setUpdatedInspectionData={setUpdatedInspectionData}
            handleOpenSubmitDialog={handleOpenSubmitDialog}
            handleOpenDeviationDialog={handleOpenDeviationDialog}
            optionalFeatures={optionalFeatures}
            trailerType={trailer.trailerType}
          />
        )}
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid VIN Number
        </Alert>
      </Snackbar>
      <SubmitDialog
        openSubmitDialog={openSubmitDialog}
        handleCloseSubmitDialog={handleCloseSubmitDialog}
        handleSubmit={handleSubmitInspectionData}
        handleCommentsChange={handleCommentsChange}
        comments={comments}
        isSubmitting={isSubmitting}
      />
      {currentDeviation && (
        <IssueDialog
          openDeviationDialog={openDeviationDialog}
          handleCloseDeviationDialog={handleCloseDeviationDialog}
          handleDeviationSave={handleDeviationSave}
          currentDeviation={currentDeviation}
        />
      )}
    </Container>
  );
}
