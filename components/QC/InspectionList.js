"use client";
import * as React from "react";
import Image from "next/image";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import QCDeviationDialog from "../../components/QCDeviationDialog.js";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";

export default function InspectionList(props) {
  // console.log(props);
  const [checkAllItems, setCheckAllItems] = React.useState(true);

  const sectionIsCompleted = (section) => {
    let totalUnchecked = 0;
    let totalCheckpointsCount = 0;
    props
      .sectionsConditionalRender(props.trailerType, section)
      .forEach((subSection) => {
        subSection.CheckpointList.forEach((checkpoint) => {
          totalCheckpointsCount++;

          if (
            !checkpoint.CheckpointStatus ||
            checkpoint.CheckpointStatus === "tbd"
          ) {
            totalUnchecked++;
          }
        });
      });

    if (totalUnchecked > 0) {
      return false;
    } else return true;
  };

  const checkAllItemsHandler = (section, isSectionComplete) => {
    props
      .sectionsConditionalRender(props.trailerType, section)
      .forEach((subSection) => {
        subSection.CheckpointList.forEach((checkpoint) => {  const checkAllItemsHandler = (section, isSectionComplete) => {
    props
      .sectionsConditionalRender(props.trailerType, section)
      .forEach((subSection) => {
        subSection.CheckpointList.forEach((checkpoint) => {
          if (isSectionComplete) {
            checkpoint.CheckpointStatus = true;
          } else {
            checkpoint.CheckpointStatus = false;
          }
        });
      });
    setCheckAllItems(!checkAllItems);
  };
          if (isSectionComplete) {
            checkpoint.CheckpointStatus = false;
          } else {
            checkpoint.CheckpointStatus = true;
          }
        });
      });
    setCheckAllItems(!checkAllItems);
  };

  React.useEffect(() => {
    props.handleSetCheckState(props.checkState);
  }, [checkAllItems]);

  const [progressBarHeight, setProgressBarHeight] = React.useState(null);

  React.useEffect(() => {
    let totalUnchecked = 0;
    let totalCheckpointsCount = 0;
    props.checkState?.forEach((section) => {
      if (
        !section?.optional ||
        props.optionalFeatures.includes(section.optional)
      ) {
        props
          .sectionsConditionalRender(props.trailerType, section)
          .forEach((subSection) => {
            subSection.CheckpointList?.forEach((checkpoint) => {
              // if (
              //   !subSection?.optional ||
              //   props.optionalFeatures.includes(subSection.optional)
              // )
              if (
                (!subSection?.optional ||
                  props.optionalFeatures.includes(subSection.optional) ||
                  subSection.optional === "Manual") &&
                !(
                  (props.optionalFeatures.includes("Electric Doors Opening") || props.optionalFeatures.includes("Electric Tarp Opening")) &&
                  subSection.optional === "Manual"
                )
              ) {
                totalCheckpointsCount++;
                console.log(checkpoint.CheckpointStatus);
                if (
                  !checkpoint.CheckpointStatus ||
                  checkpoint.CheckpointStatus === "tbd"
                ) {
                  totalUnchecked++;
                }
              }
            });
          });
      }
    });

    // setUncheckedCheckpoints(totalUnchecked);
    // setTotalCheckpoints(totalCheckpointsCount);
    console.log(totalUnchecked);
    console.log(totalCheckpointsCount);
    setProgressBarHeight(
      ((totalCheckpointsCount - totalUnchecked) / totalCheckpointsCount) * 84
    );
    props.handleInspectionProgress(
      ((totalCheckpointsCount - totalUnchecked) / totalCheckpointsCount) * 100
    );
  }, [props.checkState]);

  // image?.TrailerType && image?.TrailerType?.includes(props.trailerType)

  const renderImage = (image) => {
    let renderImage = false;

    // trailer type check starts
    if (image?.TrailerType?.length > 0) {
      if (image?.TrailerType?.includes(props.trailerType)) {
        renderImage = true;
      } else return false;
    }
    if (image?.TrailerType?.length === 0) {
      renderImage = true;
    }
    // trailer type check ends

    // air inflation check starts **
    // if (renderImage && image?.AirInflation) {
    //   renderImage = true;
    // } else return false;
    // air inflation check ends

    if (renderImage) {
      if (!image?.AirInflation) {
        renderImage = true;
      } else if (
        image?.AirInflation &&
        image.AirInflation === "notSelected" &&
        !props.optionalFeatures.includes("Air Inflation")
      ) {
        renderImage = true;
      } else if (
        image?.AirInflation &&
        image.AirInflation === "selected" &&
        props.optionalFeatures.includes("Air Inflation")
      ) {
        renderImage = true;
      } else {
        return false;
      }
    }

    // Tire Type check starts
    if (renderImage) {
      if (image?.TireType === "") {
        renderImage = true;
      } else if (image?.TireType === props.tiresType) {
        renderImage = true;
      } else {
        return false;
      }
    }
    // Tire Type check ends

    // Fenders Type check starts
    if (renderImage) {
      if (image?.FendersType === "") {
        renderImage = true;
      } else if (image?.FendersType === props.fendersType) {
        renderImage = true;
      } else {
        return false;
      }
    }
    // Fenders Type check ends
    // Doors Opening Direction check starts

    if (renderImage) {
      if (image?.doorsOpeningDirection === "") {
        renderImage = true;
      } else if (image?.doorsOpeningDirection === props.doorsOpeningDirection) {
        renderImage = true;
      } else {
        return false;
      }
    }
    // Doors Opening Direction check ends

    // Tarps Opening check starts
    if (renderImage) {
      if (!image?.tarpsOpening) {
        renderImage = true;
      } else if (
        image?.tarpsOpening &&
        image.tarpsOpening === "Manual" &&
        !props.optionalFeatures.includes("Electric Tarp Opening")
      ) {
        renderImage = true;
      } else if (
        image?.tarpsOpening &&
        image.tarpsOpening === "Electric" &&
        props.optionalFeatures.includes("Electric Tarp Opening")
      ) {
        renderImage = true;
      } else {
        return false;
      }
    }
    // Tarps Opening check ends

    return renderImage;
  };

  return (
    <Box
      sx={{
        // maxHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        // bgcolor: "red",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "0rem",
          right: "0rem",
          mr: "0.6rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          // bgcolor: "blue",
          width: "2rem",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "6rem",
            bgcolor: "var(--success1)",
            width: "1rem",
            height: "84vh",
            borderRadius: "0.4rem",
          }}
        ></Box>
        <Box sx={{ mt: "4.4rem" }}>
          <Typography sx={{ fontSize: "0.9rem", color: "var(--secondary65)" }}>
            {props.inspectionProgress?.toFixed(0)}%
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "6rem",
            bgcolor:
              +props.inspectionProgress === 100
                ? "var(--success50)"
                : "var(--success25)",
            width: "1rem",
            height: `${progressBarHeight}vh`,
            borderRadius: "0.4rem",
          }}
        ></Box>
      </Box>
      <QCDeviationDialog
        comments={props.comments}
        handleComments={props.handleComments}
        deviationType={props.deviationType}
        handleDeviationType={props.handleDeviationType}
        deviationData={props.deviationData}
        handlePicturesforCurrentWorkOrder={
          props.handlePicturesforCurrentWorkOrder
        }
        openComments={props.openComments}
        handleCloseComments={props.handleCloseComments}
        openCommentID={props.openCommentID}
        openCommentSectionName={props.openCommentSectionName}
        openCommentCheckpointDescription={
          props.openCommentCheckpointDescription
        }
        openCommentCheckpointSubSectionDescription={
          props.openCommentCheckpointSubSectionDescription
        }
        picturesforCurrentWorkOrder={props.picturesforCurrentWorkOrder}
        previewImage={props.previewImage}
        handleSelectImage={props.handleSelectImage}
        isLoadingImg={props.isLoadingImg}
        handleImgLoading={props.handleImgLoading}
        workOrder={props.workOrder}
        isLoading={props.isLoading}
        handleUploadImage={props.handleUploadImage}
        trailerType={props.trailerType}
        isCorrection={false}
      />

      {/* <Box sx={{ position: "sticky", top: "2.5rem", right: "6rem" }}>
        <Button
          variant="contained"
          disabled={props.disableSendReport}
          sx={{
            ml: 2,
          }}
          onClick={props.sendReport}
        >
          Send Report
        </Button>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // bgcolor: "green",

          mt: 10,
        }}
      >
        <Typography sx={{ fontSize: "2.2rem", mb: 2 }}>
          Quality Check Procedure
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContentL: "flex-start",
          alignItems: "center",
        }}
      >
        {props.checkState.map(
          (section, index) =>
            props.sectionIncludesThisTrailer(props.trailerType, section) &&
            (!section?.optional ||
              props.optionalFeatures.includes(section.optional)) &&
            props
              .sectionsConditionalRender(props.trailerType, section)
              ?.map((subSection, subSectionIndex) => (
                <Box
                  key={subSectionIndex * Math.random()}
                  sx={{
                    // mt: 2,
                    width: "100%",
                    maxWidth: "44rem",

                    // bgcolor: "red",
                  }}
                >
                  {subSectionIndex === 0 && (
                    <Box
                      onClick={() => {
                        props.showSectionHandler(index);
                        window.scrollTo({
                          top: window.scrollY,
                          behavior: "smooth",
                        });
                      }}
                      // ref={openedSectionRef}
                      key={subSectionIndex + 2 * Math.random()}
                      sx={{
                        mt: 1,
                        mb: 1,

                        // display: subSectionIndex === 0 ? "visible" : "none"
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "3.5rem",
                        // bgcolor: "var(--primary5)",
                        bgcolor: sectionIsCompleted(section)
                          ? "var(--success50)"
                          : "var(--primary5)",
                        borderRadius: "0.5rem",
                        border: sectionIsCompleted(section)
                          ? "1px solid #84cda6"
                          : "1px solid #eff4f8",
                        "&:hover": {
                          cursor: "pointer",
                        },
                        // position: props.openedSectionIndex === index ? "fixed" : "",
                      }}
                    >
                      <Typography
                        sx={{
                          width: "100%",
                          fontSize: "1.7rem",
                          fontWeight: "600",
                          //   bgcolor: "blue",
                          pl: 2,
                          pr: 1,
                            // bgcolor: "green",
                        }}
                      >
                        {`Section ${section.SectionNumber}: ${section.SectionName}`}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          props.showSectionHandler(index);
                          window.scrollTo({
                            top: window.scrollY,
                            behavior: "smooth",
                          });
                          // openedSectionRef.current.scrollIntoView({});
                        }}
                        sx={{ ml: 1 }}
                      >
                        {props.openedSectionIndex === index ? (
                          <KeyboardArrowUpIcon sx={{ fontSize: "2.6rem" }} />
                        ) : (
                          <KeyboardArrowDownIcon sx={{ fontSize: "2.6rem" }} />
                        )}
                      </IconButton>
                    </Box>
                  )}

                  {props.showSection &&
                    props.openedSectionIndex === index &&
                    ((!subSection?.optional ||
                      props.optionalFeatures.includes(subSection.optional) ||
                      subSection.optional === "Manual") &&
                    !(
                      (props.optionalFeatures.includes("Electric Doors Opening") || 
                      props.optionalFeatures.includes("Electric Tarp Opening")) 
                      && subSection.optional === "Manual"
                    )) && (
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: "600",

                          mt: 1,
                          mb: 1,
                        }}
                      >
                        {subSection.SubSectionDescription}
                      </Typography>
                    )}
                  {/* images with array of urls*/}
                  {props.showSection &&
                    props.openedSectionIndex === index &&
                    typeof subSection.ImageList[0] === "string" &&
                    ((!subSection?.optional ||
                      props.optionalFeatures.includes(subSection.optional) ||
                      subSection.optional === "Manual") &&
                    !(
                      (props.optionalFeatures.includes("Electric Doors Opening") || 
                      props.optionalFeatures.includes("Electric Tarp Opening")) 
                      && subSection.optional === "Manual"
                    )) &&
                    subSection.ImageList.map((image) => (
                      <Box
                        key={index + Math.random()}
                        sx={{
                          position: "relative",
                          // bgcolor: "red",
                          // maxHeight: "10rem",
                          // height: "19rem",
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
                          src={image}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "90%", height: "auto" }}
                          alt="preview-image"
                        />
                      </Box>
                    ))}
                  {/* images with array of objects with trailer type + url*/}
                  {props.showSection &&
                    props.openedSectionIndex === index &&
                    typeof subSection.ImageList[0] === "object" &&
                    ((!subSection?.optional ||
                      props.optionalFeatures.includes(subSection.optional) ||
                      subSection.optional === "Manual") &&
                    !(
                      (props.optionalFeatures.includes("Electric Doors Opening") || 
                      props.optionalFeatures.includes("Electric Tarp Opening")) 
                      && subSection.optional === "Manual"
                    )) &&
                    subSection.ImageList.map(
                      (image) =>
                        renderImage(image) &&
                        image?.url?.map((imageItem) => {
                          return (
                            <Box
                              key={index + Math.random()}
                              sx={{
                                position: "relative",
                                // bgcolor: "red",
                                // maxHeight: "10rem",
                                // height: "19rem",
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
                          );
                        })
                    )}
                  {/* {props.showSection && //^
                    props.openedSectionIndex === index &&
                    (!subSection?.optional ||
                      props.optionalFeatures.includes(subSection.optional)) &&
                    subSection.ImageList.map((imageListItem) => {
                      if (imageListItem?.hasOwnProperty("TrailerType")) {
                  
                        if (
                          imageListItem.TrailerType.includes(props.trailerType)
                        ) {
                          return imageListItem.url.map((url, urlIndex) => (
                            <Box
                              key={urlIndex + 2}
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
                                key={urlIndex + 1}
                                src={url}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: "90%", height: "auto" }}
                                alt="preview-image"
                              />
                            </Box>
                          ));
                        } else {
                          return null;
                        }
                      }
                    })} */}

                  {props.showSection &&
                    props.openedSectionIndex === index &&
                    !subSection?.DoubleSided &&
                    ((!subSection?.optional ||
                      props.optionalFeatures.includes(subSection.optional) ||
                      subSection.optional === "Manual") &&
                    !(
                      (props.optionalFeatures.includes("Electric Doors Opening") || 
                      props.optionalFeatures.includes("Electric Tarp Opening")) 
                      && subSection.optional === "Manual"
                    )) &&
                    subSection.CheckpointList?.map((checkpoint, index) => (
                      <Box
                        key={index * Math.random()}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          bgcolor: index % 2 === 1 ? "#F1F4F6" : "",
                        }}
                      >
                        <Typography sx={{ fontSize: "1.4rem" }}>
                          {`${checkpoint.CheckpointID}: ${checkpoint.CheckpointDescription}`}
                        </Typography>
                        <Box sx={{ minWidth: "9rem" }}>
                          {checkpoint.CheckpointStatus !== "deviation" && (
                            <Checkbox
                              checked={
                                checkpoint.CheckpointStatus !== ""
                                  ? checkpoint.CheckpointStatus
                                  : false
                              }
                              onChange={() =>
                                props.handleCheckStateChange(
                                  checkpoint.CheckpointID,
                                  event
                                )
                              }
                              disabled={(!props.isActive) ||
                                props.picturesforCurrentWorkOrder.find(
                                  (deviation) =>
                                    deviation.checkID ===
                                    checkpoint.CheckpointID
                                )?.checkID
                                  ? true
                                  : false
                              }
                              // defaultChecked
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: 40 },
                              }}
                            />
                          )}

                          {!props.picturesforCurrentWorkOrder.find(
                            (deviation) =>
                              deviation.checkID === checkpoint.CheckpointID
                          )?.checkID &&
                            !(checkpoint.CheckpointStatus === true) && (
                              <IconButton
                                aria-label="delete"
                                size="large"
                                disabled={(!props.isActive)}
                                sx={{
                                  ml:
                                    checkpoint.CheckpointStatus !== "deviation"
                                      ? 2
                                      : 0,
                                }}
                                onClick={() =>
                                  props.handleClickOpenComments(
                                    checkpoint.CheckpointID,
                                    checkpoint.CheckpointDescription,
                                    subSection?.SubSectionDescription,
                                    section.SectionName,
                                    false, // don't know what this false is for
                                    false // this false is to say not iscorrection maybe change to strings after
                                  )
                                }
                              >
                                <ErrorOutlineIcon
                                  sx={{ fontSize: 40 }}
                                  color="error"
                                />
                              </IconButton>
                            )}
                          {props.picturesforCurrentWorkOrder.find(
                            (deviation) =>
                              deviation.checkID === checkpoint.CheckpointID
                          )?.checkID &&
                            !(checkpoint.CheckpointStatus === true) && (
                              <IconButton
                                aria-label="delete"
                                size="large"
                                sx={{
                                  ml:
                                    checkpoint.CheckpointStatus !== "deviation"
                                      ? 2
                                      : 0,
                                }}
                                onClick={() =>
                                  props.handleClickOpenComments(
                                    checkpoint.CheckpointID,
                                    checkpoint.CheckpointDescription,
                                    subSection?.SubSectionDescription,
                                    section.SectionName,
                                    props.picturesforCurrentWorkOrder.find(
                                      (deviation) => {
                                        if (
                                          deviation.checkID ===
                                          checkpoint.CheckpointID
                                        )
                                          return deviation;
                                      }
                                    )
                                  )
                                }
                              >
                                <EditIcon
                                  sx={{ fontSize: 40 }}
                                  color="primary"
                                />
                              </IconButton>
                            )}
                        </Box>
                      </Box>
                    ))}

                  {props.showSection &&
                    props.openedSectionIndex === index &&
                    ((!subSection?.optional ||
                      props.optionalFeatures.includes(subSection.optional) ||
                      subSection.optional === "Manual") &&
                    !(
                      (props.optionalFeatures.includes("Electric Doors Opening") || 
                      props.optionalFeatures.includes("Electric Tarp Opening")) 
                      && subSection.optional === "Manual"
                    )) &&
                    subSection?.DoubleSided && (
                      <Box
                        key={2 + Math.random()}
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          // bgcolor: "red",
                        }}
                      >
                        <Box
                          key={3 + Math.random()}
                          sx={{
                            width: "45%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            // bgcolor: "green",
                          }}
                        >
                          {subSection.CheckpointList?.map(
                            (checkpoint, index) => (
                              <Box
                                key={index + 3 + Math.random()}
                                sx={{
                                  width: "100%",
                                  // bgcolor: "green",
                                  // display: "flex",
                                  // flexDirection: "column",
                                  // justifyContent: "center",
                                  // alignItems: "flexStart",
                                  // bgcolor: index % 2 === 1 ? "#F1F4F6" : "",
                                }}
                              >
                                {(checkpoint.CheckpointDescription.toLowerCase().includes(
                                  "left"
                                ) ||
                                  (checkpoint.CheckpointDescription.toLowerCase().includes(
                                    "rear"
                                  ) &&
                                    !checkpoint.CheckpointDescription.toLowerCase().includes(
                                      "right"
                                    ))) && (
                                  <Box
                                    sx={{
                                      width: "100%",
                                      // bgcolor: "yellow",
                                      display: "flex",
                                      // flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize:
                                          !checkpoint.CheckpointDescription
                                            .length > 30
                                            ? "1.4rem"
                                            : "1.2rem",
                                      }}
                                    >
                                      {`${checkpoint.CheckpointID}: ${checkpoint.CheckpointDescription}`}
                                    </Typography>
                                    <Box
                                      sx={{
                                        // bgcolor: "green",
                                        minWidth:
                                          !checkpoint.CheckpointDescription
                                            .length > 30
                                            ? "9rem"
                                            : "8rem",
                                      }}
                                    >
                                      {checkpoint.CheckpointStatus !==
                                        "deviation" && (
                                        <Checkbox
                                          checked={
                                            checkpoint.CheckpointStatus !== ""
                                              ? checkpoint.CheckpointStatus
                                              : false
                                          }
                                          onChange={() =>
                                            props.handleCheckStateChange(
                                              checkpoint.CheckpointID,
                                              event
                                            )
                                          }
                                          disabled={(!props.isActive) ||
                                            props.picturesforCurrentWorkOrder.find(
                                              (deviation) =>
                                                deviation.checkID ===
                                                checkpoint.CheckpointID
                                            )?.checkID
                                              ? true
                                              : false
                                          }
                                          // defaultChecked
                                          sx={{
                                            "& .MuiSvgIcon-root": {
                                              fontSize: 40,
                                            },
                                          }}
                                        />
                                      )}

                                      {!props.picturesforCurrentWorkOrder.find(
                                        (deviation) =>
                                          deviation.checkID ===
                                          checkpoint.CheckpointID
                                      )?.checkID &&
                                        !(
                                          checkpoint.CheckpointStatus === true
                                        ) && (
                                          <IconButton
                                            aria-label="delete"
                                            size="large"
                                            disabled={(!props.isActive)}
                                            sx={{
                                              ml:
                                                !checkpoint
                                                  .CheckpointDescription
                                                  .length > 30
                                                  ? 2
                                                  : 0,
                                            }}
                                            onClick={() =>
                                              props.handleClickOpenComments(
                                                checkpoint.CheckpointID,
                                                checkpoint.CheckpointDescription,
                                                subSection?.SubSectionDescription,
                                                section.SectionName,
                                                false
                                              )
                                            }
                                          >
                                            <ErrorOutlineIcon
                                              sx={{ fontSize: 40 }}
                                              color="error"
                                            />
                                          </IconButton>
                                        )}
                                      {props.picturesforCurrentWorkOrder.find(
                                        (deviation) =>
                                          deviation.checkID ===
                                          checkpoint.CheckpointID
                                      )?.checkID &&
                                        !(
                                          checkpoint.CheckpointStatus === true
                                        ) && (
                                          <IconButton
                                            aria-label="delete"
                                            size="large"
                                            sx={{
                                              ml:
                                                checkpoint.CheckpointStatus !==
                                                "deviation"
                                                  ? 2
                                                  : 0,
                                            }}
                                            onClick={() =>
                                              props.handleClickOpenComments(
                                                checkpoint.CheckpointID,
                                                checkpoint.CheckpointDescription,
                                                subSection?.SubSectionDescription,
                                                section.SectionName,
                                                props.picturesforCurrentWorkOrder.find(
                                                  (deviation) => {
                                                    if (
                                                      deviation.checkID ===
                                                      checkpoint.CheckpointID
                                                    )
                                                      return deviation;
                                                  }
                                                )
                                              )
                                            }
                                          >
                                            <EditIcon
                                              sx={{ fontSize: 40 }}
                                              color="primary"
                                            />
                                          </IconButton>
                                        )}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            )
                          )}
                        </Box>
                        <Box
                          key={index * Math.random()}
                          sx={{
                            width: "45%",
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            // bgcolor: "blue",
                          }}
                        >
                          {" "}
                          {subSection.CheckpointList?.map(
                            (checkpoint, index) => (
                              <Box
                                key={index * Math.random()}
                                sx={{
                                  width: "100%",
                                  // bgcolor: "green",

                                  // display: "flex",
                                  // flexDirection: "column",
                                  // justifyContent: "center",
                                  // alignItems: "flexStart",
                                  // bgcolor: index % 2 === 1 ? "#F1F4F6" : "",
                                }}
                              >
                                {(checkpoint.CheckpointDescription.toLowerCase().includes(
                                  "right"
                                ) ||
                                  (checkpoint.CheckpointDescription.toLowerCase().includes(
                                    "front"
                                  ) &&
                                    !checkpoint.CheckpointDescription.toLowerCase().includes(
                                      "left"
                                    ))) && (
                                  <Box
                                    sx={{
                                      width: "100%",
                                      // bgcolor: "blue",
                                      display: "flex",
                                      // flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      // minHeight: "8rem",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize:
                                          !checkpoint.CheckpointDescription
                                            .length > 30
                                            ? "1.4rem"
                                            : "1.2rem",
                                      }}
                                    >
                                      {`${checkpoint.CheckpointID}: ${checkpoint.CheckpointDescription}`}
                                    </Typography>
                                    <Box
                                      sx={{
                                        minWidth:
                                          !checkpoint.CheckpointDescription
                                            .length > 30
                                            ? "9rem"
                                            : "8rem",
                                        // bgcolor: "blue",
                                      }}
                                    >
                                      {checkpoint.CheckpointStatus !==
                                        "deviation" && (
                                        <Checkbox
                                          checked={
                                            checkpoint.CheckpointStatus !== ""
                                              ? checkpoint.CheckpointStatus
                                              : false
                                          }
                                          onChange={() =>
                                            props.handleCheckStateChange(
                                              checkpoint.CheckpointID,
                                              event
                                            )
                                          }
                                          disabled={(!props.isActive) ||
                                            props.picturesforCurrentWorkOrder.find(
                                              (deviation) =>
                                                deviation.checkID ===
                                                checkpoint.CheckpointID
                                            )?.checkID
                                              ? true
                                              : false
                                          }
                                          // defaultChecked
                                          sx={{
                                            "& .MuiSvgIcon-root": {
                                              fontSize: 40,
                                            },
                                          }}
                                        />
                                      )}

                                      {!props.picturesforCurrentWorkOrder.find(
                                        (deviation) =>
                                          deviation.checkID ===
                                          checkpoint.CheckpointID
                                      )?.checkID &&
                                        !(
                                          checkpoint.CheckpointStatus === true
                                        ) && (
                                          <IconButton
                                            aria-label="delete"
                                            size="large"
                                            disabled={(!props.isActive)}
                                            sx={{
                                              ml:
                                                !checkpoint
                                                  .CheckpointDescription
                                                  .length > 30
                                                  ? 2
                                                  : 0,
                                            }}
                                            onClick={() => 
                                              // console.log(props)
                                              props.handleClickOpenComments(
                                                checkpoint.CheckpointID,
                                                checkpoint.CheckpointDescription,
                                                subSection?.SubSectionDescription,
                                                section.SectionName,
                                                false
                                              )
                                            }
                                          >
                                            <ErrorOutlineIcon
                                              sx={{ fontSize: 40 }}
                                              color="error"
                                              
                                            />
                                          </IconButton>
                                        )}
                                      {props.picturesforCurrentWorkOrder.find(
                                        (deviation) =>
                                          deviation.checkID ===
                                          checkpoint.CheckpointID
                                      )?.checkID &&
                                        !(
                                          checkpoint.CheckpointStatus === true
                                        ) && (
                                          <IconButton
                                            aria-label="delete"
                                            size="large"
                                            sx={{
                                              ml:
                                                checkpoint.CheckpointStatus !==
                                                "deviation"
                                                  ? 2
                                                  : 0,
                                            }}
                                            onClick={() =>
                                              props.handleClickOpenComments(
                                                checkpoint.CheckpointID,
                                                checkpoint.CheckpointDescription,
                                                subSection?.SubSectionDescription,
                                                section.SectionName,
                                                props.picturesforCurrentWorkOrder.find(
                                                  (deviation) => {
                                                    if (
                                                      deviation.checkID ===
                                                      checkpoint.CheckpointID
                                                    )
                                                      return deviation;
                                                  }
                                                )
                                              )
                                            }
                                          >
                                            <EditIcon
                                              sx={{ fontSize: 40 }}
                                              color="primary"
                                            />
                                          </IconButton>
                                        )}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            )
                          )}
                        </Box>
                      </Box>
                    )}

                  {props.showSection &&
                    props.openedSectionIndex === index &&
                    props.sectionsConditionalRender(props.trailerType, section)
                      .length ===
                      subSectionIndex + 1 && (
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
                          onClick={() => checkAllItemsHandler(section, sectionIsCompleted(section))}
                        >
                          {sectionIsCompleted(section)
                            ? "Uncheck all"
                            : "Check all"}
                        </Button>
                      </Box>
                    )}
                </Box>
              ))
        )}
      </Box>
    </Box>
  );
}
