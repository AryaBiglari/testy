import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import wallsData from "../../lib/wallsData.js";
import WallsDrawingsDialog from "../planning/WallsDrawingsDialog.js";
// import RenderProcess from "./RenderProcess.js";
import RenderNonEditableProcess from "../planning/RenderNonEditableProcess.js";
import RenderTrailerDetails from "../planning/RenderTrailerDetails.js";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    // bgcolor: "red",
    minWidth: "84%",
    maxWidth: "84%",

    minHeight: "94vh",
    // display: "unset",
  },
  "& .css-uhb5lp": {
    // bgcolor: "red",
    minWidth: "84%",
    maxWidth: "84%",
    minHeight: "98vh",
    // display: "unset",
  },
  "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
    {
      minWidth: "84%",
      maxWidth: "84%",
      maxWidth: "unset",
      minHeight: "98vh",
    },

  // "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
  //   minWidth: "84vw !important",
  //   // maxWidth: "84vw !important",
  //   width: "84vw !important",
  //   minHeight: "98vh",
  // },

  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
    paddingBottom: "4rem",
    display: "flex",
    flexDirection: "column",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function RenderPartsLists(props) {
  const [allParts, setAllParts] = React.useState([]);
  console.log(props);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  console.log(props.currentFrame);
  const [filteredParts, setFilteredParts] = React.useState([]);

  let imageSrc = "";
  if (props.currentFrame === "Hopper Door") {
    imageSrc = "/images/frames/hopper-door.png";
  } else {
    imageSrc = "public/images/frames/hopper-door.png";
  }

  // get Parts - start
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

      // const sortedParts = data?.sort((Mat1, Mat2) => Mat1.mat - Mat2.mat);

      function fractionToDecimal(f) {
        if (f === "0.078") {
          return 0.078;
        }
        if (f === "1") {
          return 1;
        }

        if (typeof f !== "string") {
          f = f.toString();
        }

        if (typeof f === "string") {
          return f.split("/").reduce((n, d, i) => n / (i ? d : 1));
        }
        // Handle cases where f is not a string
        throw new TypeError("Invalid input: f must be a string");
      }

      setAllParts(data);

      // const orderedByNum = data.sort((part1, part2) => {
      //   return fractionToDecimal(part2.part) - fractionToDecimal(part1.part);
      // });

      // const onlyALParts = orderedByWT?.filter((part) => part.mat === "AL");

      // const onlyCSParts = orderedByWT?.filter((part) => part.mat === "CS");
      // const onlyQT100Parts = orderedByWT?.filter(
      //   (part) => part.mat === "QT100"
      // );
      // const onlySSParts = orderedByWT?.filter((part) => part.mat === "SS");
      // const noMatParts = orderedByWT?.filter((part) => part.mat === "");

      // setAllParts(
      //   [
      //     ...noMatParts,
      //     ...onlyALParts,
      //     ...onlyCSParts,
      //     ...onlyQT100Parts,
      //     ...onlySSParts,
      //   ].map((part) => {
      //     return { ...part, checked: true };
      //   })
      // );

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

  // Filter mainArray based on numbersArray
  const selectedParts = allParts.filter((mainObj) => {
    if (props.currentFrame === "Front") {
      return props.currentTrailer?.frontFrameParts?.some((numbersObj) => {
        return mainObj.part === numbersObj.partNumber;
      });
    }

    if (props.currentFrame === "Rear") {
      return props.currentTrailer?.rearFrameParts?.some((numbersObj) => {
        return mainObj.part === numbersObj.partNumber;
      });
    }
    console.log("parts");
  });

  const relevantParts = () => {
    const partNumbersSet = new Set(props.parts?.map((item) => item.partNumber));

    setFilteredParts(allParts?.filter((part) => partNumbersSet.has(part.part)));
  };

  React.useEffect(() => {
    if (props.openDrawings === true) {
      relevantParts(allParts);
    }
  }, [props.openDrawings]);

  console.log(filteredParts);
  return (
    <React.Fragment>
      <BootstrapDialog
        // onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDrawings}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, display: "flex", justifyContent: "center" }}
          id="customized-dialog-title"
        >
          <Typography sx={{ fontSize: "1.4rem", fontWeight: "600" }}>
            {props.currentTrailer?.trailerType} {props.currentFrame} | Parts and
            Details | WO: {props.currentTrailer?.workOrder}
          </Typography>
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
              minWidth: "100%",
              position: "relative",
              minHeight: "30rem",
              mb: 0,
            }}
          >
            <Image
              src={imageSrc}
              style={{ objectFit: "contain" }}
              fill={true}
              // width={500}
              // height={500}
              alt="Picture of the Frame"
            />
          </Box>
          <RenderNonEditableProcess
            partType={props.partType}
            parts={filteredParts}
            partsQuantities={props.parts}
            surfaceProcess={props.currentTrailer?.frontFrameSurface}
            additionalRequirements={null}
          />

          <RenderTrailerDetails
            trailerType={props.currentTrailer?.trailerType}
            workOrder={props.currentTrailer?.workOrder}
            customer={props.currentTrailer?.customer}
            dateRequired={props.currentTrailer?.dateRequired}
            tires={props.currentTrailer?.tires}
            rims={props.currentTrailer?.rims}
            fendersType={props.currentTrailer?.fendersType}
            airInflation={props.currentTrailer?.airInflation}
            liftAxle={props.currentTrailer?.liftAxle}
            rearCustomerLogo={props.currentTrailer?.rearCustomerLogo}
            interiorSteps={props.currentTrailer?.interiorSteps}
            trailerLenght={props.currentTrailer?.trailerLenght}
            specialTrailerLength={props.currentTrailer?.specialTrailerLength}
            trailerWallHeight={props.currentTrailer?.trailerWallHeight}
            specialTrailerWallHeight={
              props.currentTrailer?.specialTrailerWallHeight
            }
            frontSlope={props.currentTrailer?.frontSlope}
            specialTrailerFrontSlope={
              props.currentTrailer?.specialTrailerFrontSlope
            }
            rearSlope={props.currentTrailer?.rearSlope}
            specialTrailerRearSlope={
              props.currentTrailer?.specialTrailerRearSlope
            }
            sideLights={props.currentTrailer?.sideLights}
            wLights={props.currentTrailer?.wLights}
            slopesUnderglow={props.currentTrailer?.slopesUnderglow}
            hoppersUnderglow={props.currentTrailer?.hoppersUnderglow}
            interiorLights={props.currentTrailer?.interiorLights}
            unloadLights={props.currentTrailer?.unloadLights}
            hoppersType={props.currentTrailer?.hoppersType}
            doorSize={props.currentTrailer?.doorSize}
            frontDoorOpens={props.currentTrailer?.frontDoorOpens}
            midDoorOpens={props.currentTrailer?.midDoorOpens}
            rearDoorOpens={props.currentTrailer?.rearDoorOpens}
            chuteLocks={props.currentTrailer?.chuteLocks}
            hammerHits={props.currentTrailer?.hammerHits}
            doorsOpening={props.currentTrailer?.doorsOpening}
            electricTarpOpener={props.currentTrailer?.electricTarpOpener}
          />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
