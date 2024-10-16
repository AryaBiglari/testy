import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import RenderNonEditableProcess from "../planning/RenderNonEditableProcess.js";
import RenderTrailerDetails from "../planning/RenderTrailerDetails.js";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: "70%",
    maxWidth: "unset",
    minHeight: "90vh",
  },
  "& .css-uhb5lp": {
    minWidth: "70%",
    minHeight: "90vh",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
  const [view, setView] = React.useState("view1");
  const [allParts, setAllParts] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [filteredParts, setFilteredParts] = React.useState([]);
  const [parts, setParts] = React.useState(props.trailer.boxStage1);

  React.useEffect(() => {
    const currentTrailer = props.trailer;
    const currentParts = currentTrailer[`boxStage${props.stage}`];
    setParts(currentParts);
  }, [props.trailer, props.stage]);

  const getImagePath = (trailer) => {
    const trailerTypeMapToDefaultBox = {
      Pup: "pup",
      Tandem: "tandem",
      Lead: "lead",
      "Tri 61' 2 Hoppers": "Tri2Hop",
      "Tri 61' 3 Hoppers": "Tri3Hop",
      "Tri 72' 2 Hoppers": "Tri2Hop",
      "4 Axle": "4 Axle"
    };

    let trailerType = trailerTypeMapToDefaultBox[trailer.trailerType];

    const imagePath = `/images/box/${trailerType}/full-stage/stage${props.stage}.png`;
    return imagePath;
  };
  const imagePath = getImagePath(props.trailer);

  const currentFrame = `Box Stage ${props.stage}`;

  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      const response = await fetch(`/api/cutting/upload-part`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setAllParts(data);
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

  const selectedParts = allParts.filter((mainObj) => {
    if (currentFrame === "Front") {
      return props.trailer?.frontFrameParts?.some((numbersObj) => {
        return mainObj.part === numbersObj.partNumber;
      });
    }

    if (currentFrame === "Rear") {
      return props.trailer?.rearFrameParts?.some((numbersObj) => {
        return mainObj.part === numbersObj.partNumber;
      });
    }
  });

  const relevantParts = () => {
    const partNumbersSet = new Set(parts?.map((item) => item.partNumber));
    const newFilteredParts = allParts?.filter((part) =>
      partNumbersSet.has(part.part)
    );
    setFilteredParts(newFilteredParts);
  };

  React.useEffect(() => {
    if (props.openDrawings === true) {
      relevantParts(allParts);
    }
  }, [props.openDrawings]);

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.openDrawings}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {true
            ? `Drawings and Parts for WO: ${props.trailer.workOrder} Stage: ${props.stage}`
            : `Planos para WO: ${props.trailer.workOrder} Stage: ${props.stage}`}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleCloseDrawings}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                onClick={() => setView("view1")}
                sx={{
                  zIndex: "100",
                  height: "3.6rem",
                  fontSize: "1.2rem",
                  bgcolor: view === "view1" ? "var(--primary)" : "white",
                  color: view === "view1" ? "white" : "var(--primary)",
                  "&:hover": {
                    backgroundColor: "var(--primary5)",
                    color: "var(--primary)",
                  },
                  borderTopLeftRadius: "1rem",
                  borderBottomLeftRadius: "1rem",
                }}
              >
                Drawings
              </Button>
              <Button
                onClick={() => setView("view2")}
                sx={{
                  zIndex: "100",
                  height: "3.6rem",
                  fontSize: "1.2rem",
                  bgcolor: view === "view2" ? "var(--primary)" : "white",
                  color: view === "view2" ? "white" : "var(--primary)",
                  "&:hover": {
                    backgroundColor: "var(--primary5)",
                    color: "var(--primary)",
                  },
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                Parts
              </Button>
            </ButtonGroup>
          </Box>
          <Box
            sx={{
              padding: 3,
              minWidth: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              minHeight: "40rem",
              mb: 2,
            }}
          >
            {view === "view1" && (
              <Box>
                {props.trailer?.boxData?.stages[
                  props.stage - 1
                ].infoDrawings.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: 3,
                      minWidth: "100%",
                      position: "relative",
                      minHeight: "40rem",
                      mb: 2,
                    }}
                  >
                    <Image
                      src={img}
                      style={{ objectFit: "contain" }}
                      fill={true}
                      // width={500}
                      // height={500}
                      alt="Picture of the author"
                    />
                  </Box>
                ))}
              </Box>
            )}
            {view === "view2" && (
              <Box>
                <Box
                  sx={{
                    minWidth: "100%",
                    position: "relative",
                    minHeight: "30rem",
                    mb: 0,
                  }}
                >
                  <Image
                    src={imagePath}
                    style={{ objectFit: "contain" }}
                    fill={true}
                    alt="Picture of the Frame"
                  />
                </Box>
                <RenderNonEditableProcess
                  partType={currentFrame}
                  parts={filteredParts}
                  partsQuantities={parts}
                  surfaceProcess={props.trailer?.frontFrameSurface}
                  additionalRequirements={null}
                />

                <RenderTrailerDetails
                  trailerType={props.trailer?.trailerType}
                  notes={props.trailer?.notes}
                  workOrder={props.trailer?.workOrder}
                  customer={props.trailer?.customer}
                  dateRequired={props.trailer?.dateRequired}
                  tires={props.trailer?.tires}
                  isCustomTires={props.currentTrailer?.isCustomTires}
                  customTires={props.currentTrailer?.customTires}
                  rims={props.currentTrailer?.rims}
                  isCustomRims={props.currentTrailer?.isCustomRims}
                  customRims={props.currentTrailer?.customRims}
                  fendersType={props.trailer?.fendersType}
                  airInflation={props.trailer?.airInflation}
                  liftAxle={props.trailer?.liftAxle}
                  electricTarpOpener={props.currentTrailer?.electricTarpOpener}
                  isCustomElectricTarpOpener={
                    props.currentTrailer?.isCustomElectricTarpOpener
                  }
                  customElectricTarpOpener={
                    props.currentTrailer?.customElectricTarpOpener
                  }
                  rearCustomerLogo={props.trailer?.rearCustomerLogo}
                  interiorSteps={props.trailer?.interiorSteps}
                  trailerLenght={props.trailer?.trailerLenght}
                  specialTrailerLength={props.trailer?.specialTrailerLength}
                  trailerWallHeight={props.trailer?.trailerWallHeight}
                  specialTrailerWallHeight={
                    props.trailer?.specialTrailerWallHeight
                  }
                  frontSlope={props.trailer?.frontSlope}
                  specialTrailerFrontSlope={
                    props.trailer?.specialTrailerFrontSlope
                  }
                  rearSlope={props.trailer?.rearSlope}
                  specialTrailerRearSlope={
                    props.trailer?.specialTrailerRearSlope
                  }
                  sideLights={props.trailer?.sideLights}
                  wLights={props.trailer?.wLights}
                  slopesUnderglow={props.trailer?.slopesUnderglow}
                  hoppersUnderglow={props.trailer?.hoppersUnderglow}
                  interiorLights={props.trailer?.interiorLights}
                  unloadLights={props.trailer?.unloadLights}
                  hoppersType={props.trailer?.hoppersType}
                  doorSize={props.trailer?.doorSize}
                  frontDoorOpens={props.trailer?.frontDoorOpens}
                  midDoorOpens={props.trailer?.midDoorOpens}
                  rearDoorOpens={props.trailer?.rearDoorOpens}
                  chuteOpener={props.trailer?.chuteOpener}
                  isCustomChuteOpener={props.trailer?.isCustomChuteOpener}
                  customChuteOpener={props.trailer?.customChuteOpener}
                  chuteLocks={props.trailer?.chuteLocks}
                  hammerHits={props.trailer?.hammerHits}
                  doorsOpening={props.trailer?.doorsOpening}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
