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
import CircularProgress from "@mui/material/CircularProgress";
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

import EditIcon from "@mui/icons-material/Edit";
import GetAppIcon from "@mui/icons-material/GetApp";

// data
import wallsData from "../../lib/wallsData.js";
import checkpointsData from "../../lib/checkpointsData.js";

// other react components
import WallsDrawingsDialog from "./WallsDrawingsDialog.js";
import RenderProcess from "./RenderProcess.js";
import RenderTrailerDetails from "./RenderTrailerDetails.js";
import defaultBoxesData from "../../lib/planning/defaultBoxesData.js";
import SelectTrailerDialog from "../walls/SelectTrailerDialog.js";
import { is } from "date-fns/locale/is";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    // bgcolor: "red",
    minWidth: "84%",
    maxWidth: "84%",

    minHeight: "98vh",
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
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const steps = [
  "Add Trailer Details",
  "Add Manufacturing Information",
  "Create Trailer Project",
];

export default function CustomizedDialogs(props) {

  const [wallComments1, setWallComments1] = React.useState({});
  const [wallComments2, setWallComments2] = React.useState({});
  const [wallComments3, setWallComments3] = React.useState({});
  const [wallComments4, setWallComments4] = React.useState({});
  const [wallComments5, setWallComments5] = React.useState({});
  const [wallComments6, setWallComments6] = React.useState({});
  const [wallComments7, setWallComments7] = React.useState({});

  const handleWallCommentsChange = (event, wallId) => {
    const value = event.target.value;

    switch (wallId) {
      case 1:
        setWallComments1((prevComments) => ({
          ...prevComments,
          [wallId]: value,
        }));
        break;
      case 2:
        setWallComments2((prevComments) => ({
          ...prevComments,
          [wallId]: value,
        }));
        break;
      case 3:
        setWallComments3((prevComments) => ({
          ...prevComments,
          [wallId]: value,
        }));
        break;
      case 4:
        setWallComments4((prevComments) => ({
          ...prevComments,
          [wallId]: value,
        }));
        break;
      case 5:
        setWallComments5((prevComments) => ({
          ...prevComments,
          [wallId]: value,
        }));
        break;
      case 6:
        setWallComments6((prevComments) => ({
          ...prevComments,
          [wallId]: value,
        }));
        break;
      case 7:
        setWallComments7((prevComments) => ({
          ...prevComments,
          [wallId]: value,
        }));
        break;
      default:
        console.error("Invalid wallId:", wallId);
    }
  };

  const {
    openCreateTrailer,
    handleCloseCreateTrailer,
    handleGetTrailersAgain,
    isEditMode = false, // New prop to determine if it's in edit mode
    selectedTrailerID = null, // New prop for the selected trailer
  } = props;
  console.log(props);

  const [selectedTrailer, setSelectedTrailer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Fetches the trailer information for when editing a trailer using the trailer ID
  React.useEffect(() => {
    const getTrailer = async function () {
      setIsLoading(true);
      const response = await fetch(
        `/api/planning/create-trailer?id=${selectedTrailerID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setSelectedTrailer(data);
      console.log("data");
      console.log(data);
      setIsLoading(false);
    };

    if (openCreateTrailer && selectedTrailerID && isEditMode) {
      console.log("came here");
      getTrailer();
      setActiveStep(0);
    } else {
      setActiveStep(0);
      setSelectedTrailer(null);
    }
  }, [selectedTrailerID, openCreateTrailer]);

  const resetToDefault = () => {
    console.log("reset??");
    // Step 1
    // Column 1
    setTrailerType("");
    setWorkOrder("");
    setCustomer("");
    setDateRequired(new Date(Date.now())); // Use current date as fallback
    setFutureJig("");
    setVinNumber("");
    setOriginalVinNumber("");
    setTires("");
    setIsCustomTires(false);
    setCustomTires("");
    setRims("");
    setIsCustomRims(false);
    setCustomRims("");
    setFendersType("");
    setAirInflation("");
    setElectricTarpOpener("");
    setIsCustomElectricTarpOpener(false);
    setCustomElectricTarpOpener("");
    setLiftAxle("");
    setrearCustomerLogo("");
    setInteriorSteps("");

    setJigReq("Standard");
    setSpecialJigReq("");

    // Column 2
    setSpecialTrailerLength("");
    setSpecialTrailerWallHeight("");
    setSpecialTrailerFrontSlope("");
    setSpecialTrailerRearSlope("");
    setSideLights("");
    setWLights("");
    setSlopesUnderglow("");
    setHoppersUnderglow("");
    setInteriorLights("");
    setUnloadLights("");

    setAxleType("");
    setIsCustomAxleType(false);
    setCustomAxleType("");

    setMudFlaps("");
    setIsCustomMudFlaps(false);
    setCustomMudFlaps("");

    // Column 3
    setHoppersType("");
    setDoorSize("");
    setFrontDoorOpens("");
    setRearDoorOpens("");
    setChuteOpener("");
    setIsCustomChuteOpener(false);
    setCustomChuteOpener("");
    setChuteLocks("");
    setHammerHits("");
    setDoorsOpening("");
    setNotes("");

    // Step 2
    // Walls
    setWallsSurface("");

    // Front Frame
    setFrontFrameSurface("");
    setFrontFramePartsState([]);

    // Rear Frame
    setRearFrameSurface("");
    setRearFramePartsState([]);


    // Hopper Doors
    setDoorsPartsState([]);

    // Box Stage 1
    setBoxStage1State([]);

    // Box Stage 2
    setBoxStage2State([]);

    // Box Stage 3 (Chutes)
    setChutesPartsState([]);

    // Box Stage 4
    setBoxStage4State([]);

    // Box Finishing
    setBoxFinishingState([]);

    // Front Frame Finishing
    setFrontFrameFinishingPartsState([]);

    // Rear Frame Finishing
    setRearFrameFinishingPartsState([]);

    // **Reset Middle Frame Fields**
    setMiddleFrameSurface("");
    setMiddleFrameSpecialReq("");
    setMiddleFrameFinishingSpecialReq("");
    setMiddleFramePartsState([]);
    setMiddleFrameFinishingPartsState([]);
  };


  React.useEffect(() => {
    const initializeTrailerData = async () => {
      if (openCreateTrailer && selectedTrailerID && isEditMode) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/planning/create-trailer?id=${selectedTrailerID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch trailer data");
          }

          const data = await response.json();
          setSelectedTrailer(data);
          console.log("Fetched trailer data:", data);
        } catch (error) {
          console.error("Error fetching trailer data:", error);
        } finally {
          setIsLoading(false);
          setActiveStep(0);
          resetToDefault();
        }
      } else {
        setActiveStep(0);
        setSelectedTrailer(null);
        resetToDefault();
      }
    };

    initializeTrailerData();
  }, [selectedTrailerID, openCreateTrailer, isEditMode]);


  React.useEffect(() => {
    // Initialize state with selectedTrailer data when it's available
    if (selectedTrailer) {
      // Step 1: General Configurations - Column 1
      setTrailerType(selectedTrailer.trailerType || "");
      setFrontFrameSpecialReq(selectedTrailer.frontFrameSpecialReq || "");
      setRearFrameSpecialReq(selectedTrailer.rearFrameSpecialReq || "");
      setWorkOrder(selectedTrailer.workOrder || "");
      setCustomer(selectedTrailer.customer || "");
      setDateRequired(new Date(selectedTrailer.dateRequired) || new Date()); // Ensure date is correctly parsed
      setFutureJig(selectedTrailer.futureJig || "");
      setOriginalVinNumber(selectedTrailer.vinNumber || "");
      setVinNumber(selectedTrailer.vinNumber || "");
      setTires(selectedTrailer.tires || "");
      setIsCustomTires(selectedTrailer.customTires || false);
      setCustomTires(selectedTrailer.customTires || "");
      setRims(selectedTrailer.rims || "");
      setIsCustomRims(selectedTrailer.isCustomRims || false);
      setCustomRims(selectedTrailer.customRims || "");
      setFendersType(selectedTrailer.fendersType || "");
      setAirInflation(selectedTrailer.airInflation || "");
      setElectricTarpOpener(selectedTrailer.electricTarpOpener || "");
      setIsCustomElectricTarpOpener(selectedTrailer.isCustomElectricTarpOpener || false);
      setCustomElectricTarpOpener(selectedTrailer.customElectricTarpOpener || "");
      setLiftAxle(selectedTrailer.liftAxle || "");
      setrearCustomerLogo(selectedTrailer.rearCustomerLogo || "");
      setInteriorSteps(selectedTrailer.interiorSteps || "");

      setJigReq(selectedTrailer.jigReq || "Standard");
      setSpecialJigReq(selectedTrailer.specialJigReq || "");

      // Step 1: General Configurations - Column 2
      setSpecialTrailerLength(selectedTrailer.specialTrailerLength || "");
      setSpecialTrailerWallHeight(selectedTrailer.specialTrailerWallHeight || "");
      setSpecialTrailerFrontSlope(selectedTrailer.specialTrailerFrontSlope || "");
      setSpecialTrailerRearSlope(selectedTrailer.specialTrailerRearSlope || "");
      setSideLights(selectedTrailer.sideLights || "");
      setWLights(selectedTrailer.wLights || "");
      setSlopesUnderglow(selectedTrailer.slopesUnderglow || "");
      setHoppersUnderglow(selectedTrailer.hoppersUnderglow || "");
      setInteriorLights(selectedTrailer.interiorLights || "");
      setUnloadLights(selectedTrailer.unloadLights || "");

      setAxleType(selectedTrailer.axleType || "");
      setIsCustomAxleType(selectedTrailer.isCustomAxleType || false);
      setCustomAxleType(selectedTrailer.customAxleType || "");

      setMudFlaps(selectedTrailer.mudFlaps || "");
      setIsCustomMudFlaps(selectedTrailer.isCustomMudFlaps || false);
      setCustomMudFlaps(selectedTrailer.customMudFlaps || "");

      // Step 1: General Configurations - Column 3
      setHoppersType(selectedTrailer.hoppersType || "");
      setDoorSize(selectedTrailer.doorSize || "");
      setFrontDoorOpens(selectedTrailer.frontDoorOpens || "");
      setRearDoorOpens(selectedTrailer.rearDoorOpens || "");
      setChuteOpener(selectedTrailer.chuteOpener || "");
      setChuteLocks(selectedTrailer.chuteLocks || "");
      setHammerHits(selectedTrailer.hammerHits || "");
      setDoorsOpening(selectedTrailer.doorsOpening || "");
      setNotes(selectedTrailer.notes || "");

      // Step 2: Walls Configuration
      if (selectedTrailer.trailerType) {
        setWallsSurface(selectedTrailer.wallsSurface || "");

        // Front Frame Configuration
        setFrontFrameSurface(selectedTrailer.frontFrameSurface || "");

        const frontFrameParts = parts
          .filter((part) =>
            selectedTrailer.frontFrameParts.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.frontFrameParts.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setFrontFramePartsState(frontFrameParts);

        // Rear Frame Configuration
        setRearFrameSurface(selectedTrailer.rearFrameSurface || "");

        const rearFrameParts = parts
          .filter((part) =>
            selectedTrailer.rearFrameParts.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.rearFrameParts.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setRearFramePartsState(rearFrameParts);

        // Hopper Doors Configuration
        const hopperDoorsParts = parts
          .filter((part) =>
            selectedTrailer.hopperDoorsParts.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.hopperDoorsParts.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setDoorsPartsState(hopperDoorsParts);

        // Box Stage 1 Configuration
        const boxStage1Parts = parts
          .filter((part) =>
            selectedTrailer.boxStage1.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.boxStage1.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setBoxStage1State(boxStage1Parts);

        // Box Stage 2 Configuration
        const boxStage2Parts = parts
          .filter((part) =>
            selectedTrailer.boxStage2.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.boxStage2.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setBoxStage2State(boxStage2Parts);

        // Box Stage 3 Configuration (Chutes)
        const boxStage3Parts = parts
          .filter((part) =>
            selectedTrailer.boxStage3.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.boxStage3.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setChutesPartsState(boxStage3Parts);

        // Box Stage 4 Configuration
        const boxStage4Parts = parts
          .filter((part) =>
            selectedTrailer.boxStage4.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.boxStage4.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setBoxStage4State(boxStage4Parts);

        // Box Finishing Configuration
        const boxFinishingParts = parts
          .filter((part) =>
            selectedTrailer.boxFinishing.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.boxFinishing.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setBoxFinishingState(boxFinishingParts);

        // Front Frame Finishing Configuration
        const frontFrameFinishingParts = parts
          .filter((part) =>
            selectedTrailer.frontFrameFinishingParts.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.frontFrameFinishingParts.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setFrontFrameFinishingPartsState(frontFrameFinishingParts);

        // Rear Frame Finishing Configuration
        const rearFrameFinishingParts = parts
          .filter((part) =>
            selectedTrailer.rearFrameFinishingParts.some(
              (selectedPart) => selectedPart.partNumber === part.part
            )
          )
          .map((part) => {
            const correspondingPart = selectedTrailer.rearFrameFinishingParts.find(
              (selectedPart) => selectedPart.partNumber === part.part
            );
            return {
              ...part,
              piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
            };
          });

        setRearFrameFinishingPartsState(rearFrameFinishingParts);

        // Consolidate all special requirements into refState
        setRefState((prevState) => ({
          ...prevState,
          frontFrameSpecialReq: selectedTrailer.frontFrameSpecialReq || "",
          rearFrameSpecialReq: selectedTrailer.rearFrameSpecialReq || "",
          hopperDoorsSpecialReq: selectedTrailer.hopperDoorsSpecialReq || "",
          boxStage1SpecialReq: selectedTrailer.boxStage1SpecialReq || "",
          boxStage2SpecialReq: selectedTrailer.boxStage2SpecialReq || "",
          boxStage3SpecialReq: selectedTrailer.boxStage3SpecialReq || "",
          boxStage4SpecialReq: selectedTrailer.boxStage4SpecialReq || "",
          boxFinishingSpecialReq: selectedTrailer.boxFinishingSpecialReq || "",
          frontFrameFinishingSpecialReq:
            selectedTrailer.frontFrameFinishingSpecialReq || "",
          rearFrameFinishingSpecialReq:
            selectedTrailer.rearFrameFinishingSpecialReq || "",
        }));

        // **Step 3: Middle Frame Configuration (Only for "4 Axle" Trailers)**
        if (selectedTrailer.trailerType === "4 Axle") {
          // Initialize Middle Frame Surface
          setMiddleFrameSurface(selectedTrailer.middleFrameSurface || "");

          // Consolidate Middle Frame Special Requirements into refState
          setRefState((prevState) => ({
            ...prevState,
            middleFrameSpecialReq: selectedTrailer.middleFrameSpecialReq || "",
            middleFrameFinishingSpecialReq:
              selectedTrailer.middleFrameFinishingSpecialReq || "",
          }));

          // Middle Frame Parts
          const middleFrameParts = parts
            .filter((part) =>
              selectedTrailer.middleFrameParts.some(
                (selectedPart) => selectedPart.partNumber === part.part
              )
            )
            .map((part) => {
              const correspondingPart = selectedTrailer.middleFrameParts.find(
                (selectedPart) => selectedPart.partNumber === part.part
              );
              return {
                ...part,
                piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
              };
            });
          setMiddleFramePartsState(middleFrameParts);

          // Middle Frame Finishing Parts
          const middleFrameFinishingParts = parts
            .filter((part) =>
              selectedTrailer.middleFrameFinishingParts.some(
                (selectedPart) => selectedPart.partNumber === part.part
              )
            )
            .map((part) => {
              const correspondingPart = selectedTrailer.middleFrameFinishingParts.find(
                (selectedPart) => selectedPart.partNumber === part.part
              );
              return {
                ...part,
                piecesPerTrailer: correspondingPart ? correspondingPart.qty : 0,
              };
            });
          setMiddleFrameFinishingPartsState(middleFrameFinishingParts);
        }
      }
    }
  }, [selectedTrailer]);



  // Initialize state with selected trailer's data if editing
  const [trailerType, setTrailerType] = React.useState("");
  const [frontFrameSpecialReq, setFrontFrameSpecialReq] = React.useState("");
  const [rearFrameSpecialReq, setRearFrameSpecialReq] = React.useState("");

  const [workOrder, setWorkOrder] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [dateRequired, setDateRequired] = React.useState(new Date());

  const [axleType, setAxleType] = React.useState("");
  const [customAxleType, setCustomAxleType] = React.useState("");
  const [isCustomAxleType, setIsCustomAxleType] = React.useState(false);

  const [mudFlaps, setMudFlaps] = React.useState("");
  const [customMudFlaps, setCustomMudFlaps] = React.useState("");
  const [isCustomMudFlaps, setIsCustomMudFlaps] = React.useState(false);

  const [tires, setTires] = React.useState("");
  const [customTires, setCustomTires] = React.useState("");
  const [isCustomTires, setIsCustomTires] = React.useState(false);

  const [rims, setRims] = React.useState("");
  const [customRims, setCustomRims] = React.useState("");
  const [isCustomRims, setIsCustomRims] = React.useState("");

  const [fendersType, setFendersType] = React.useState("");
  const [airInflation, setAirInflation] = React.useState(""); // Assuming boolean, set default to false

  const [electricTarpOpener, setElectricTarpOpener] = React.useState(""); // Assuming boolean, set default to false
  const [customElectricTarpOpener, setCustomElectricTarpOpener] =
    React.useState("");
  const [isCustomElectricTarpOpener, setIsCustomElectricTarpOpener] =
    React.useState(false);

  const [liftAxle, setLiftAxle] = React.useState(""); // Assuming boolean, set default to false
  const [frontFrame, setFrontFrame] = React.useState("");
  const [rearFrame, setRearFrame] = React.useState("");
  const [frontFrameFinishing, setFrontFrameFinishing] = React.useState("");
  const [rearFrameFinishing, setRearFrameFinishing] = React.useState("");
  const [hoppers, setHoppers] = React.useState("");
  const [wallsSurface, setWallsSurface] = React.useState("");
  const [interiorLights, setInteriorLights] = React.useState(""); // Assuming boolean, set default to false
  const [unloadLights, setUnloadLights] = React.useState(""); // Assuming boolean, set default to false


  // Middle Frame States (For "4 Axle" Trailers)
  const [middleFrameSurface, setMiddleFrameSurface] = React.useState("");
  const [middleFrameSpecialReq, setMiddleFrameSpecialReq] = React.useState("");
  const [middleFrameFinishingSpecialReq, setMiddleFrameFinishingSpecialReq] = React.useState("");
  const [middleFramePartsState, setMiddleFramePartsState] = React.useState([]);
  const [middleFrameFinishingPartsState, setMiddleFrameFinishingPartsState] = React.useState([]);


  const handleSave = async () => {
    console.log(frontFrameFinishingPartsState);

    // Prepare updates object
    const updates = {
      trailerType,
      notes,
      workOrder,
      customer,
      dateRequired,
      tires,
      isCustomTires,
      customTires,
      rims,
      isCustomRims,
      customRims,
      fendersType,
      mudFlaps,
      isCustomMudFlaps,
      customMudFlaps,
      airInflation,
      electricTarpOpener,
      isCustomElectricTarpOpener,
      customElectricTarpOpener,
      liftAxle,
      axleType,
      isCustomAxleType,
      customAxleType,
      rearCustomerLogo,
      interiorSteps,
      jigReq,
      specialJigReq,
      specialTrailerLength,
      specialTrailerWallHeight,
      specialTrailerFrontSlope,
      specialTrailerRearSlope,
      sideLights,
      wLights,
      slopesUnderglow,
      hoppersUnderglow,
      interiorLights,
      unloadLights,
      hoppersType,
      doorSize,
      frontDoorOpens,
      rearDoorOpens,
      chuteOpener,
      isCustomChuteOpener,
      customChuteOpener,
      chuteLocks,
      hammerHits,
      doorsOpening,
      wallsSurface,
      frontFrameSurface,
      rearFrameSurface,
      frontFrameFinishing,
      rearFrameFinishing,
      frontFrameSpecialReq: refState.frontFrameSpecialReq,
      rearFrameSpecialReq: refState.rearFrameSpecialReq,

      frontFrameParts: partListsForDB(frontFramePartsState),
      rearFrameParts: partListsForDB(rearFramePartsState),
      hopperDoorsParts: partListsForDB(doorsPartsState),
      boxStage1: partListsForDB(boxStage1State),
      boxStage2: partListsForDB(boxStage2State),
      boxStage3: partListsForDB(chutesPartsState),
      boxStage4: partListsForDB(boxStage4State),
      boxFinishing: partListsForDB(boxFinishingState),
      frontFrameFinishingParts: partListsForDB(frontFrameFinishingPartsState),
      rearFrameFinishingParts: partListsForDB(rearFrameFinishingPartsState),
      futureJig,
      vinNumber,
      wallComments1,
      wallComments2,
      wallComments3,
      wallComments4,
      wallComments5,
      wallComments6,
      wallComments7,


    };

    // **Include Middle Frame Data for "4 Axle" Trailers**
    if (trailerType === "4 Axle") {
      updates.middleFrame = {
        middleFrameSurface,
        middleFrameSpecialReq,
        middleFrameFinishingSpecialReq,
        middleFrameParts: partListsForDB(middleFramePartsState),
        middleFrameFinishingParts: partListsForDB(middleFrameFinishingPartsState),
        middleFrameStatus: "Not Started",
        middleFrameTime: 0,
        middleFrameStartTime: 0,
        middleFrameEndTime: "",
        middleGalvanizinStartTime: 0,
        middleGalvanizingEndTime: 0,
        middleGalvanizingStatus: "",
        middleFrameFinishingStatus: "Not Started",
      };
    }

    // Handle VIN Number
    if (vinNumber.length > 8 && vinNumber !== originalVinNumber) {
      updates.vinNumberDate = Date.now();
    }

    // Send PUT request to update trailer
    const response = await fetch(`/api/planning/create-trailer`, {
      method: "PUT",
      body: JSON.stringify({ id: selectedTrailerID, updates }), // Send the ID and updates
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Success");
      handleGetTrailersAgain();
      resetToDefault();
      handleCloseCreateTrailer();
    } else {
      console.error("Error updating trailer");
    }
  };


  const [applicableWallDrawings, setApplicableWallDrawings] =
    React.useState("Standard");

  const [jigReq, setJigReq] = React.useState("Standard");
  const [trailerLenght, setTrailerLenght] = React.useState("Standard");
  const [trailerWallHeight, setTrailerWallHeight] = React.useState("Standard");
  const [frontSlope, setFrontSlope] = React.useState("Standard");
  const [rearSlope, setRearSlope] = React.useState("Standard");

  const handleWorkOrder = (event) => {
    setWorkOrder(event.target.value);
  };

  const handleCustomer = (event) => {
    setCustomer(event.target.value);
  };

  const [addPartFrontFrame, setAddPartFrontFrame] = React.useState("");

  const handleAddPartFrontFrame = (state) => {
    console.log("handleaddpartfrontframe ran");
    console.log(state);
    setAddPartFrontFrame(state);
  };
  const [addPartRearFrame, setAddPartRearFrame] = React.useState("");

  const handleAddPartRearFrame = (state) => {
    setAddPartRearFrame(state);
  };

  const [addPartHopperDoors, setAddPartHopperDoors] = React.useState("");

  const handleAddPartHopperDoors = (state) => {
    setAddPartHopperDoors(state);
  };
  const [addPartBoxStage1, setAddPartBoxStage1] = React.useState("");

  const handleAddPartBoxStage1 = (state) => {
    setAddPartBoxStage1(state);
  };
  const [addPartBoxStage2, setAddPartBoxStage2] = React.useState("");

  const handleAddPartBoxStage2 = (state) => {
    setAddPartBoxStage2(state);
  };
  const [addPartBoxStage3, setAddPartBoxStage3] = React.useState("");

  const handleAddPartBoxStage3 = (state) => {
    setAddPartBoxStage3(state);
  };
  const [addPartBoxStage4, setAddPartBoxStage4] = React.useState("");

  const handleAddPartBoxStage4 = (state) => {
    setAddPartBoxStage4(state);
  };
  const [addPartBoxFinishing, setAddPartBoxFinishing] = React.useState("");

  const handleAddPartBoxFinishing = (state) => {
    setAddPartBoxFinishing(state);
  };
  const [addPartFrontFrameFinishing, setAddPartFrontFrameFinishing] =
    React.useState("");

  const handleAddPartFrontFrameFinishing = (state) => {
    setAddPartFrontFrameFinishing(state);
  };
  const [addPartRearFrameFinishing, setAddPartRearFrameFinishing] =
    React.useState("");

  const handleAddPartRearFrameFinishing = (state) => {
    setAddPartRearFrameFinishing(state);
  };

  const frontFrameRef = React.useRef(
    selectedTrailer?.frontFrameRef ? selectedTrailer.frontFrameRef : ""
  );
  const rearFrameRef = React.useRef(
    selectedTrailer?.rearFrameRef ? selectedTrailer.rearFrameRef : ""
  );
  const hopperDoorsRef = React.useRef(
    selectedTrailer?.hopperDoorsRef ? selectedTrailer.hopperDoorsRef : ""
  );
  const boxStage1Ref = React.useRef(
    selectedTrailer?.boxStage1Ref ? selectedTrailer.boxStage1Ref : ""
  );
  const boxStage2Ref = React.useRef(
    selectedTrailer?.boxStage2Ref ? selectedTrailer.boxStage2Ref : ""
  );
  const boxStage3Ref = React.useRef(
    selectedTrailer?.boxStage3Ref ? selectedTrailer.boxStage3Ref : ""
  );
  const boxStage4Ref = React.useRef(
    selectedTrailer?.boxStage4Ref ? selectedTrailer.boxStage4Ref : ""
  );
  const boxFinishingRef = React.useRef(
    selectedTrailer?.boxFinishingRef ? selectedTrailer.boxFinishingRef : ""
  );
  const frontFrameFinishingRef = React.useRef(
    selectedTrailer?.frontFrameFinishingRef
      ? selectedTrailer.frontFrameFinishingRef
      : ""
  );
  const rearFrameFinishingRef = React.useRef(
    selectedTrailer?.rearFrameFinishingRef
      ? selectedTrailer.rearFrameFinishingRef
      : ""
  );
  const frontFrameSpecialReqRef = React.useRef(
    selectedTrailer?.frontFrameSpecialReq
      ? selectedTrailer.frontFrameSpecialReq
      : ""
  );
  const rearFrameSpecialReqRef = React.useRef(
    selectedTrailer?.rearFrameSpecialReq
      ? selectedTrailer.rearFrameSpecialReq
      : ""
  );
  const hopperDoorsSpecialReqRef = React.useRef(
    selectedTrailer?.rearFrameSpecialReq
      ? selectedTrailer.rearFrameSpecialReq
      : ""
  );
  const boxStage1SpecialReqRef = React.useRef(
    selectedTrailer?.boxStage1SpecialReqRef
      ? selectedTrailer.boxStage1SpecialReqRef
      : ""
  );
  const boxStage2SpecialReqRef = React.useRef(
    selectedTrailer?.boxStage2SpecialReqRef
      ? selectedTrailer.boxStage2SpecialReqRef
      : ""
  );
  const boxStage3SpecialReqRef = React.useRef(
    selectedTrailer?.boxStage3SpecialReqRef
      ? selectedTrailer.boxStage3SpecialReqRef
      : ""
  );
  const boxStage4SpecialReqRef = React.useRef(
    selectedTrailer?.boxStage4SpecialReqRef
      ? selectedTrailer.boxStage4SpecialReqRef
      : ""
  );
  const boxFinishingSpecialReqRef = React.useRef(
    selectedTrailer?.boxFinishingSpecialReqRef
      ? selectedTrailer.boxFinishingSpecialReqRef
      : ""
  );
  const frontFrameFinishingSpecialReqRef = React.useRef(
    selectedTrailer?.frontFrameFinishingSpecialReqRef
      ? selectedTrailer.frontFrameFinishingSpecialReqRef
      : ""
  );
  const rearFrameFinishingSpecialReqRef = React.useRef(
    selectedTrailer?.rearFrameFinishingSpecialReqRef
      ? selectedTrailer.rearFrameFinishingSpecialReqRef
      : ""
  );

  const [refState, setRefState] = React.useState({
    frontFrame: "",

    rearFrame: "",

    hopperDoors: "",

    boxStage1: "",

    boxStage2: "",

    boxStage3: "",

    boxStage4: "",

    boxFinishing: "",

    frontFrameFinishing: "",

    rearFrameFinishing: "",

    frontFrameSpecialReq: "",

    rearFrameSpecialReq: "",

    hopperDoorsSpecialReq: "",

    boxStage1SpecialReq: "",

    boxStage2SpecialReq: "",

    boxStage3SpecialReq: "",

    boxStage4SpecialReq: "",

    boxFinishingSpecialReq: "",

    frontFrameFinishingSpecialReq: "",

    rearFrameFinishingSpecialReq: "",
  });

  const updateStateWithRefs = () => {
    setRefState((prevState) => ({
      ...prevState,

      frontFrame: frontFrameRef.current?.value || "",

      rearFrame: rearFrameRef.current?.value || "",

      hopperDoors: hopperDoorsRef.current?.value || "",

      boxStage1: boxStage1Ref.current?.value || "",

      boxStage2: boxStage2Ref.current?.value || "",

      boxStage3: boxStage3Ref.current?.value || "",

      boxStage4: boxStage4Ref.current?.value || "",

      boxFinishing: boxFinishingRef.current?.value || "",

      frontFrameFinishing: frontFrameFinishingRef.current?.value || "",

      rearFrameFinishing: rearFrameFinishingRef.current?.value || "",

      frontFrameSpecialReq: frontFrameSpecialReqRef.current?.value || "",

      rearFrameSpecialReq: rearFrameSpecialReqRef.current?.value || "",

      hopperDoorsSpecialReq: hopperDoorsSpecialReqRef.current?.value || "",

      boxStage1SpecialReq: boxStage1SpecialReqRef.current?.value || "",

      boxStage2SpecialReq: boxStage2SpecialReqRef.current?.value || "",

      boxStage3SpecialReq: boxStage3SpecialReqRef.current?.value || "",

      boxStage4SpecialReq: boxStage4SpecialReqRef.current?.value || "",

      boxFinishingSpecialReq: boxFinishingSpecialReqRef.current?.value || "",

      frontFrameFinishingSpecialReq:
        frontFrameFinishingSpecialReqRef.current?.value || "",

      rearFrameFinishingSpecialReq:
        rearFrameFinishingSpecialReqRef.current?.value || "",
    }));
  };

  const [specialJigReq, setSpecialJigReq] = React.useState("");
  const handleSpecialJigReq = (event) => {
    setSpecialJigReq(event.target.value);
  };

  const [specialTrailerLength, setSpecialTrailerLength] = React.useState("");
  const handleSpecialTrailerLength = (event) => {
    setSpecialTrailerLength(event.target.value);
  };
  const [specialTrailerWallHeight, setSpecialTrailerWallHeight] =
    React.useState("");
  const handleSpecialTrailerWallHeight = (event) => {
    setSpecialTrailerWallHeight(event.target.value);
  };
  const [specialTrailerFrontSlope, setSpecialTrailerFrontSlope] =
    React.useState("");
  const handleSpecialTrailerFrontSlope = (event) => {
    setSpecialTrailerFrontSlope(event.target.value);
  };
  const [specialTrailerRearSlope, setSpecialTrailerRearSlope] =
    React.useState("");
  const handleSpecialTrailerRearSlope = (event) => {
    setSpecialTrailerRearSlope(event.target.value);
  };

  const convertTrailerName = (trailerName) => {
    if (trailerName === "Tri 61' 2 Hoppers") {
      return "Tri 61 2 Hoppers";
    }
    if (trailerName === "Tri 72' 2 Hoppers") {
      return "Tri 72 2 Hoppers";
    }
    if (trailerName === "Tri 61' 3 Hoppers") {
      return "Tri 61 3 Hoppers";
    } else return trailerName;
  };

  const handleTrailerTypeChange = (event) => {
    setTrailerType(event.target.value);
  };

  const handleAxleTypeChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsCustomAxleType(true);
    } else {
      setCustomAxleType("");
      setIsCustomAxleType(false);
      setAxleType(value);
    }
  };

  const handleCustomAxleTypeChange = (event) => {
    setCustomAxleType(event.target.value);
  };

  const handleMudFlapsChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsCustomMudFlaps(true);
    } else {
      setCustomMudFlaps("");
      setIsCustomMudFlaps(false);
      setMudFlaps(value);
    }
  };

  const handleCustomMudFlapsChange = (event) => {
    setCustomMudFlaps(event.target.value);
  };

  const handleTiresChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsCustomTires(true);
    } else {
      setCustomTires("");
      setIsCustomTires(false);
      setTires(value);
    }
  };

  const handleCustomTiresChange = (event) => {
    setCustomTires(event.target.value);
  };

  const handleRimsChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsCustomRims(true);
    } else {
      setCustomRims("");
      setIsCustomRims(false);
      setRims(value);
    }
  };

  const handleCustomRimsChange = (event) => {
    setCustomRims(event.target.value);
  };

  const handleFendersTypeChange = (event) => {
    setFendersType(event.target.value);
  };

  const [hoppersType, setHoppersType] = React.useState("");
  const handleHoppersTypeChange = (event) => {
    setHoppersType(event.target.value);
  };
  const [sideLights, setSideLights] = React.useState("");
  const handleSideLightsChange = (event) => {
    setSideLights(event.target.value);
  };
  const [rearCustomerLogo, setrearCustomerLogo] = React.useState("");
  const handlerearCustomerLogoChange = (event) => {
    setrearCustomerLogo(event.target.value);
  };
  const [interiorSteps, setInteriorSteps] = React.useState("");
  const handleInteriorStepsChange = (event) => {
    setInteriorSteps(event.target.value);
  };
  const handleWallsSurfaceChange = (event) => {
    setWallsSurface(event.target.value);
  };

  const [wLights, setWLights] = React.useState("");
  const handleWLightsChange = (event) => {
    setWLights(event.target.value);
  };
  const [slopesUnderglow, setSlopesUnderglow] = React.useState("");
  const handleSlopesUnderglowChange = (event) => {
    setSlopesUnderglow(event.target.value);
  };

  const [hoppersUnderglow, setHoppersUnderglow] = React.useState("");
  const handleHoppersUnderglowChange = (event) => {
    setHoppersUnderglow(event.target.value);
  };
  const handleInteriorLightsChange = (event) => {
    setInteriorLights(event.target.value);
  };
  const handleUnloadLightsChange = (event) => {
    setUnloadLights(event.target.value);
  };

  const [doorSize, setDoorSize] = React.useState("");
  const handleDoorSizeChange = (event) => {
    setDoorSize(event.target.value);
  };
  const [frontDoorOpens, setFrontDoorOpens] = React.useState("");
  const handleFrontDoorOpensChange = (event) => {
    setFrontDoorOpens(event.target.value);
  };

  const [rearDoorOpens, setRearDoorOpens] = React.useState("");
  const handleRearDoorOpensChange = (event) => {
    setRearDoorOpens(event.target.value);
  };
  const [midDoorOpens, setMidDoorOpens] = React.useState("");
  const handleMidDoorOpensChange = (event) => {
    setMidDoorOpens(event.target.value);
  };

  const midDoorSelected =
    trailerType === "Tri 61' 3 Hoppers" ? !!midDoorOpens : true;

  const [chuteOpener, setChuteOpener] = React.useState("");
  const [isCustomChuteOpener, setIsCustomChuteOpener] = React.useState("");
  const [customChuteOpener, setCustomChuteOpener] = React.useState("");

  const handleChuteOpenerChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsCustomChuteOpener(true);
    } else {
      setCustomChuteOpener("");
      setIsCustomChuteOpener(false);
      setChuteOpener(value);
    }
  };

  const handleCustomChuteOpenerChange = (event) => {
    setCustomChuteOpener(event.target.value);
  };

  const [chuteLocks, setChuteLocks] = React.useState("");
  const handleChuteLocksChange = (event) => {
    setChuteLocks(event.target.value);
  };
  const [hammerHits, setHammerHits] = React.useState("");
  const handleHammerHitsChange = (event) => {
    setHammerHits(event.target.value);
  };
  const [doorsOpening, setDoorsOpening] = React.useState("");
  const handleDoorsOpeningChange = (event) => {
    setDoorsOpening(event.target.value);
  };

  const [notes, setNotes] = React.useState("");
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const [futureJig, setFutureJig] = React.useState("");
  const handleFutureJig = (event) => {
    setFutureJig(event.target.value);
  };

  const [originalVinNumber, setOriginalVinNumber] = React.useState("");
  const [isNewVin, setIsNewVin] = React.useState("");
  const [vinNumber, setVinNumber] = React.useState("");
  // const [vinNumber, setVinNumber] = React.useState("");
  const handleVinNumber = (event) => {
    setVinNumber(event.target.value);
  };

  const handleAirInflationChange = (event) => {
    setAirInflation(event.target.value);
  };

  const handleLiftAxleChange = (event) => {
    setLiftAxle(event.target.value);
  };

  const handleElectricTarpOpenerChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsCustomElectricTarpOpener(true);
    } else {
      setCustomElectricTarpOpener("");
      setIsCustomElectricTarpOpener(false);
      setElectricTarpOpener(value);
    }
  };

  const handleCustomTarpOpenerChange = (event) => {
    setCustomElectricTarpOpener(event.target.value);
  };

  const [frontFrameSurface, setFrontFrameSurface] =
    React.useState("Galvanized");
  const handleFrontFrameSurfaceChange = (event) => {
    setFrontFrameSurface(event.target.value);
  };

  const [rearFrameSurface, setRearFrameSurface] = React.useState("Galvanized");
  const handleRearFrameSurfaceChange = (event) => {
    setRearFrameSurface(event.target.value);
  };

  const disableStep2 =
    !!(trailerLenght === "Standard" || specialTrailerLength) &&
    !!(trailerWallHeight === "Standard" || specialTrailerWallHeight) &&
    !!(frontSlope === "Standard" || specialTrailerFrontSlope) &&
    !!(rearSlope === "Standard" || specialTrailerRearSlope) &&
    !!workOrder &&
    !!customer &&
    !!trailerType &&
    !!tires &&
    !!rims &&
    !!fendersType &&
    !!hoppersType &&
    !!sideLights &&
    !!rearCustomerLogo &&
    !!interiorSteps &&
    !!wallsSurface &&
    !!wLights &&
    !!slopesUnderglow &&
    !!hoppersUnderglow &&
    !!interiorLights &&
    !!unloadLights &&
    !!doorSize &&
    !!frontDoorOpens &&
    !!midDoorSelected &&
    !!chuteLocks &&
    !!hammerHits &&
    !!doorsOpening &&
    !!airInflation &&
    !!liftAxle &&
    !!electricTarpOpener;

  // Stepper - start
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const matchingTrailerType = (trailer) => {
    if (trailer === trailerType) {
      return true;
    }

    if (trailerType === "Tri 61' 2 Hoppers" && trailer === "Tri 2 Hop") {
      return true;
    }
    if (trailerType === "Tri 72' 2 Hoppers" && trailer === "Tri 2 Hop") {
      return true;
    }
    if (trailerType === "Tri 61' 3 Hoppers" && trailer === "Tri 3 Hop") {
      return true;
    } else return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const step1RequirmentsMet = () => {
    return workOrder !== "" && futureJig !== "";
  };

  const handleNext = () => {
    let newSkipped = skipped;

    updateStateWithRefs();
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 0 && !step1RequirmentsMet()) {
      console.log("Can't move to next step");
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // Stepper - end

  const [openDrawings, setOpenDrawings] = React.useState(false);
  const [currentWall, setCurrentWall] = React.useState({});

  const handleClickOpenDrawings = (wall) => {
    setOpenDrawings(true);
    setCurrentWall(wall);
  };

  const handleCloseDrawings = () => {
    setOpenDrawings(false);
  };
  const [parts, setParts] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  // get Parts - start
  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      console.log("me?");
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

        return f.split("/").reduce((n, d, i) => n / (i ? d : 1));
      }

      function comparePart(part) {
        if (!Number(part)) {
          return 1;
        } else return Number(part);
      }

      const orderedByWT = data.sort((part1, part2) => {
        return fractionToDecimal(part2.WT) - fractionToDecimal(part1.WT);
      });

      const onlyALParts = orderedByWT?.filter((part) => part.mat === "AL");

      const onlyCSParts = orderedByWT?.filter((part) => part.mat === "CS");
      const onlyQT100Parts = orderedByWT?.filter(
        (part) => part.mat === "QT100"
      );
      const onlySSParts = orderedByWT?.filter((part) => part.mat === "SS");
      const noMatParts = orderedByWT?.filter((part) => part.mat === "");

      setParts(
        [
          ...noMatParts,
          ...onlyALParts,
          ...onlyCSParts,
          ...onlyQT100Parts,
          ...onlySSParts,
        ].map((part) => {
          return { ...part, checked: true };
        })
      );

      setIsLoadingPage(false);

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }
    const onPageLoad = () => {
      try {
        getPartsHandler().then((response) => { });
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

  // (part.mat === "CS" || part.mat === "QT100") &&
  // part.position?.toLowerCase().includes("front") &&

  const frontFrameParts = parts.filter(
    (part) =>
      part?.process === "Front Frame" &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );
  const [frontFramePartsState, setFrontFramePartsState] =
    React.useState(frontFrameParts);

  const handleFrontFramePartsStateChange = (state) => {
    setFrontFramePartsState(state);
  };

  const rearFrameParts = parts.filter(
    (part) =>
      part?.process === "Rear Frame" &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );
  const [rearFramePartsState, setRearFramePartsState] =
    React.useState(rearFrameParts);

  const handleRearFramePartsStateChange = (state) => {
    setRearFramePartsState(state);
  };

  // part.mat === "AL" &&
  // part.WT === "3/16" &&
  // part.config === hoppersType &&
  // part.trailerType?.includes(trailerType) &&
  // part.status === "Up-to-date" &&
  // !part.description?.toLowerCase().includes("door") &&
  // part?.liftAxle !== ""

  const chutesParts = parts.filter(
    (part) =>
      part?.process === "Box - Stage 3" &&
      part.config === hoppersType &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );

  const [chutesPartsState, setChutesPartsState] = React.useState(chutesParts);

  const handleChutesPartsStateChange = (state) => {
    setChutesPartsState(state);
  };

  // (part.doors === frontDoorOpens || part.doors === "Any") &&
  // part.description?.toLowerCase().includes("door") &&
  // !part.description?.toLowerCase().includes("box finishing") &&
  // !part.position?.toLowerCase().includes("passenger lock") &&
  // part.config === hoppersType &&

  const doorsParts = parts.filter(
    (part) => {
      if (
        part?.process === "Small Parts" &&
        part.trailerType?.includes(convertTrailerName(trailerType)) &&
        part.status === "Up-to-date"
      ) {
        if (
          part.doors === frontDoorOpens &&
          part.position?.toLowerCase().includes("front")
        ) {
          return true;
        }
        if (part.position?.toLowerCase().includes("rear")) {
          return true;
        }
        if (
          !part.description?.toLowerCase().includes("door surround") &&
          !part.description?.toLowerCase().includes("door shroud")
        ) {
          return true;
        } else return false;
      } else return false;
    }
    // part.doors !== frontDoorOpens &&
  );

  // const doorsSurroundParts = parts.filter(
  //   (part) =>
  //     part.doors === frontDoorOpens &&
  //     part.description === "Door Surround" &&
  //     part?.process === "Small Parts" &&
  //     part.trailerType?.includes(trailerType) &&
  //     part.status === "Up-to-date"
  // );

  const [doorsPartsState, setDoorsPartsState] = React.useState(doorsParts);

  const handleDoorPartsStateChange = (state) => {
    setDoorsPartsState(state);
  };

  const boxStage1 = parts.filter(
    (part) =>
      part?.process === "Box - Stage 1" &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );

  const [boxStage1State, setBoxStage1State] = React.useState(boxStage1);

  const handleBoxStage1StateChange = (state) => {
    setBoxStage1State(state);
  };

  const boxStage2 = parts.filter(
    (part) =>
      part?.process === "Box - Stage 2" &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );

  const [boxStage2State, setBoxStage2State] = React.useState(boxStage2);

  const handleBoxStage2StateChange = (state) => {
    setBoxStage2State(state);
  };

  const boxStage4 = [
    ...parts.filter(
      (part) =>
        part?.process === "Box - Stage 4" &&
        (part.config === "Any" || part.config === "") &&
        part.trailerType?.includes(convertTrailerName(trailerType)) &&
        part.status === "Up-to-date"
    ),
    ...parts.filter(
      (part) =>
        part?.process === "Box - Stage 4" &&
        part.config === hoppersType &&
        part.trailerType?.includes(convertTrailerName(trailerType)) &&
        part.status === "Up-to-date"
    ),
  ];

  const [boxStage4State, setBoxStage4State] = React.useState(boxStage4);

  const handleBoxStage4StateChange = (state) => {
    setBoxStage4State(state);
  };

  const boxFinishing1 = parts.filter(
    (part) =>
      part?.process === "Box Finishing" &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );
  const boxFinishing2 = parts.filter(
    (part) =>
      part.position?.toLowerCase().includes("passenger lock") &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );

  const frontFrameFinishingParts = parts.filter(
    (part) =>
      part?.process === "Front Frame Finishing" &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date"
  );

  const [frontFrameFinishingPartsState, setFrontFrameFinishingPartsState] =
    React.useState(boxStage4);

  const handleFrontFrameFinishingPartsChange = (state) => {
    setFrontFrameFinishingPartsState(state);
  };

  const rearFrameFinishingParts1 = parts.filter(
    (part) =>
      part?.process === "Rear Frame Finishing" &&
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part.status === "Up-to-date" &&
      part?.liftAxle !== "Lift Axle"
  );
  const liftAxleParts = parts.filter(
    (part) =>
      part.trailerType?.includes(convertTrailerName(trailerType)) &&
      part?.liftAxle === "Lift Axle"
  );

  let rearFrameFinishingParts =
    liftAxle === "No"
      ? rearFrameFinishingParts1
      : [...rearFrameFinishingParts1, ...liftAxleParts];

  rearFrameFinishingParts =
    rearCustomerLogo === "Customer Logo"
      ? rearFrameFinishingParts.filter((part) => part.part !== "1140")
      : rearFrameFinishingParts;
  rearFrameFinishingParts =
    airInflation === "No"
      ? rearFrameFinishingParts.filter(
        (part) => part.airInflation !== "Air Inflation"
      )
      : rearFrameFinishingParts;
  rearFrameFinishingParts = !(
    slopesUnderglow === "Under Both Slopes" ||
    slopesUnderglow === "Under Rear Slope"
  )
    ? rearFrameFinishingParts.filter(
      (part) => part.position !== "Rear Slope Underglow Light Plate"
    )
    : rearFrameFinishingParts;

  const boxFinishing =
    chuteLocks !== "Both Sides"
      ? boxFinishing1
      : [...boxFinishing1, ...boxFinishing2];

  // get Parts - end

  const [rearFrameFinishingPartsState, setRearFrameFinishingPartsState] =
    React.useState(rearFrameFinishingParts);

  const handleRearFrameFinishingPartsChange = (state) => {
    setRearFrameFinishingPartsState(state);
  };

  const [boxFinishingState, setBoxFinishingState] =
    React.useState(boxFinishing);

  const handleBoxFinishingStateChange = (state) => {
    setBoxFinishingState(state);
  };

  const getOtherWorkOrder = async (workOrder) => {
    const response = await fetch(
      `/api/planning/get-trailer-by-workOrder?workOrder=${workOrder}`,
      {
        method: "GET",
        headers: {
          "Contenr-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.length > 1) {
      console.log("There are already two trailers with this Work Order");
    }

    return data[0];
  };

  const applyValuesFromTrailer = (otherTrailer) => {
    // column 1
    setWorkOrder(otherTrailer?.workOrder || "");
    setCustomer(otherTrailer?.customer || "");
    setDateRequired(new Date(otherTrailer?.dateRequired || Date.now()));
    setTires(otherTrailer?.tires || "");
    setIsCustomTires(otherTrailer?.customTires || false);
    setCustomTires(otherTrailer?.customTires || "");
    setRims(otherTrailer?.rims || "");
    setIsCustomRims(otherTrailer?.customRims || false);
    setCustomRims(otherTrailer?.customRims || "");
    setFendersType(otherTrailer?.fendersType || "");
    setAirInflation(otherTrailer?.airInflation || "");
    setElectricTarpOpener(otherTrailer?.electricTarpOpener || "");
    setIsCustomElectricTarpOpener(otherTrailer?.customElectricTarpOpener || "");
    setCustomElectricTarpOpener(otherTrailer?.customElectricTarpOpener || "");
    setLiftAxle(otherTrailer?.liftAxle || "");
    setInteriorSteps(otherTrailer?.interiorSteps || "");

    // column 2
    setSideLights(otherTrailer?.sideLights || "");
    setWLights(otherTrailer?.wLights || "");
    setSlopesUnderglow(otherTrailer?.slopesUnderglow || "");
    setHoppersUnderglow(otherTrailer?.hoppersUnderglow || "");
    setInteriorLights(otherTrailer?.interiorLights || "");
    setUnloadLights(otherTrailer?.unloadLights || "");

    // column 3
    setHoppersType(otherTrailer?.hoppersType || "");
    setDoorSize(otherTrailer?.doorSize || "");
    setFrontDoorOpens(otherTrailer?.frontDoorOpens || "");
    setRearDoorOpens(otherTrailer?.rearDoorOpens || "");
    setChuteOpener(otherTrailer?.chuteOpener || "");
    setChuteLocks(otherTrailer?.chuteLocks || "");
    setHammerHits(otherTrailer?.hammerHits || "");
    setDoorsOpening(otherTrailer?.doorsOpening || "");
    setNotes(otherTrailer?.notes || "");
  };

  const [getOtherTrailerDataIsLoading, setGetOtherTrailerDataIsLoading] =
    React.useState(false);

  const handleIconClick = async () => {
    console.log("clicked");
    setGetOtherTrailerDataIsLoading(true);
    const otherTrailer = await getOtherWorkOrder(workOrder);
    console.log("otherTrailer");
    console.log(otherTrailer);
    applyValuesFromTrailer(otherTrailer);
    setGetOtherTrailerDataIsLoading(false);
  };

  React.useEffect(() => {
    if (
      !isEditMode ||
      (isEditMode && selectedTrailer?.trailerType !== trailerType)
    ) {
      setFrontFramePartsState(frontFrameParts);
      setRearFramePartsState(rearFrameParts);
      setBoxStage1State(boxStage1);
      setBoxStage2State(boxStage2);
      // setBoxStage3State(boxStage3);
      setBoxStage4State(boxStage4);
      setChutesPartsState(chutesParts);
      setBoxFinishingState(boxFinishing);
      setFrontFrameFinishingPartsState(frontFrameFinishingParts);
      setRearFrameFinishingPartsState(rearFrameFinishingParts);
      setDoorsPartsState(doorsParts);
    }
  }, [
    parts,
    trailerType,
    isLoadingPage,
    hoppersType,
    doorSize,
    frontDoorOpens,
    rearDoorOpens,
    liftAxle,
    airInflation,
    frontSlope,
    rearCustomerLogo,
    rearSlope,
    trailerWallHeight,
    trailerLenght,
  ]);

  const partListsForDB = (partsList) => {
    return partsList
      .filter((part) => part.checked)
      .map((part) => {
        return { partNumber: part.part, qty: Number(part.piecesPerTrailer) };
      });
  };

  const [isSavingTrailer, setIsSavingTrailer] = React.useState(false);

  const setUpOptionalFeatures = () => {
    let optionalFeatures = [];

    if (airInflation === "Yes") {
      optionalFeatures.push("Air Inflation");
    }
    if (electricTarpOpener === "Mitchels Tarp System") {
      optionalFeatures.push("Electric Tarp Opening");
    }
    // if (paint) {optionalFeatures.push("Paint")};
    if (doorsOpening === "Electric") {
      optionalFeatures.push("Electric Doors Opening");
    }
    // if (extraLights) {optionalFeatures.push("Air Inflation")};
    if (chuteLocks === "Both Sides") {
      optionalFeatures.push("Dual door locks");
    }
    if (
      liftAxle === "1 Lift Axle SPIF Compliant" ||
      liftAxle === "2 Lift Axle SPIF Compliant"
    ) {
      optionalFeatures.push("Lift Axle");
    }

    return optionalFeatures;
  };

  const setUpInspectionList = () => {
    const optionalFeatures = setUpOptionalFeatures();

    if (optionalFeatures.includes("52 extra lights")) {
      optionalFeatures.push("28 extra lights");
    }
    const inspectorName = "";
    const doorsOpeningDirection = frontDoorOpens;
    const check = checkpointsData;

    const qcObject = {
      inspectorName: inspectorName,
      tires: tires,
      doorsOpeningDirection: doorsOpeningDirection,
      fendersType: fendersType,
      // airInflation: data.airInflation,
      optionalFeatures: optionalFeatures,
      active: true,
      finalActive: false,
      checkPointsData: check,
    };

    return qcObject;
  };

  async function uploadTrailerHandler() {
    setIsSavingTrailer(true);

    // Mapping trailer types to default box data
    const trailerTypeMapToDefaultBox = {
      Pup: "Pup",
      Tandem: "Tandem",
      Lead: "Lead",
      "Tri 61' 2 Hoppers": "Tri61TwoHoppers",
      "Tri 61' 3 Hoppers": "Tri61ThreeHoppers",
      "Tri 72' 2 Hoppers": "Tri72TwoHoppers",
      "4 Axle": "4 Axle",
    };

    const qcObject = setUpInspectionList();

    const relevantDefaultBoxData =
      defaultBoxesData[trailerTypeMapToDefaultBox[trailerType]];

    // Initialize newTrailer with existing fields
    const newTrailer = {
      trailerType,
      notes,
      dateRequired,
      workOrder,
      customer,
      trailerWallHeight,
      trailerLenght,
      frontSlope,
      rearSlope,
      jigReq,
      specialJigReq,
      specialTrailerLength,
      specialTrailerWallHeight,
      specialTrailerFrontSlope,
      specialTrailerRearSlope,
      tires,
      isCustomTires,
      customTires,
      rims,
      isCustomRims,
      customRims,
      fendersType,
      mudFlaps,
      isCustomMudFlaps,
      customMudFlaps,
      hoppersType,
      sideLights,
      rearCustomerLogo,
      interiorSteps,
      wallsSurface,
      wLights,
      slopesUnderglow,
      hoppersUnderglow,
      interiorLights,
      unloadLights,
      doorSize,
      frontDoorOpens,
      rearDoorOpens,
      midDoorOpens,
      chuteOpener,
      isCustomChuteOpener,
      customChuteOpener,
      chuteLocks,
      hammerHits,
      doorsOpening,
      airInflation,
      liftAxle,
      axleType,
      isCustomAxleType,
      customAxleType,
      electricTarpOpener,
      isCustomElectricTarpOpener,
      customElectricTarpOpener,
      frontFrameSurface,
      rearFrameSurface,
      walls,
      frontFrameSpecialReq: refState.frontFrameSpecialReq,
      rearFrameSpecialReq: refState.rearFrameSpecialReq,
      boxStage1SpecialReq: refState.boxStage1SpecialReq,
      boxStage2SpecialReq: refState.boxStage2SpecialReq,
      boxStage3SpecialReq: refState.boxStage3SpecialReq,
      boxStage4SpecialReq: refState.boxStage4SpecialReq,
      hopperDoorsSpecialReq: refState.hopperDoorsSpecialReq,
      boxFinishingSpecialReq: refState.boxFinishingSpecialReq,
      frontFrameFinishingSpecialReq: refState.frontFrameFinishingSpecialReq,
      rearFrameFinishingSpecialReq: refState.rearFrameFinishingSpecialReq,
      frontFrameParts: partListsForDB(frontFramePartsState),
      rearFrameParts: partListsForDB(rearFramePartsState),
      hopperDoorsParts: partListsForDB(doorsPartsState),
      boxStage1: partListsForDB(boxStage1State),
      boxStage2: partListsForDB(boxStage2State),
      boxStage3: partListsForDB(chutesPartsState),
      boxStage4: partListsForDB(boxStage4State),
      boxFinishing: partListsForDB(boxFinishingState),
      frontFrameFinishingParts: partListsForDB(frontFrameFinishingPartsState),
      rearFrameFinishingParts: partListsForDB(rearFrameFinishingPartsState),
      frontFrameStatus: "Not Started",
      frontFrameTime: 0,
      frontFrameStartTime: 0,
      frontFrameEndTime: "",
      frontGalvanizinStartTime: 0,
      frontGalvanizingEndTime: 0,
      frontGalvanizingStatus: "",
      rearFrameStatus: "Not Started",
      rearFrameTime: 0,
      rearFrameStartTime: "",
      rearFrameEndTime: "",
      rearGalvanizingStatus: "",
      rearGalvanizinStartTime: 0,
      rearGalvanizingEndTime: 0,
      hopperDoorsStatus: "Not Started",
      boxStage1Status: "Not Started",
      boxStage2Status: "Not Started",
      boxStage3Status: "Not Started",
      boxStage4Status: "Not Started",
      boxFinishingStatus: "Not Started",
      frontFrameFinishingStatus: "Not Started",
      rearFrameFinishingStatus: "Not Started",
      futureJig: futureJig,
      boxData: relevantDefaultBoxData,
      isReadyForBoxStage: "ready",
      qualityInspection: qcObject,
    };

    // **Add Middle Frame Data for "4 Axle" Trailers**
    if (trailerType === "4 Axle") {
      newTrailer.middleFrame = {
        middleFrameSurface, // Ensure this value exists in your state
        middleFrameSpecialReq: refState.middleFrameSpecialReq, // Ensure this exists
        middleFrameFinishingSpecialReq: refState.middleFrameFinishingSpecialReq, // Ensure this exists
        middleFrameParts: partListsForDB(middleFramePartsState), // Ensure this exists
        middleFrameFinishingParts: partListsForDB(middleFrameFinishingPartsState), // Ensure this exists
        middleFrameStatus: "Not Started",
        middleFrameTime: 0,
        middleFrameStartTime: 0,
        middleFrameEndTime: "",
        middleGalvanizinStartTime: 0,
        middleGalvanizingEndTime: 0,
        middleGalvanizingStatus: "",
        middleFrameFinishingStatus: "Not Started",
      };
    }

    // Handle VIN Number
    if (vinNumber.length > 8) {
      newTrailer.vinNumber = vinNumber;
      newTrailer.vinNumberDate = Date.now();
    }

    const body = JSON.stringify(newTrailer);

    // Send POST request to create trailer
    const response = await fetch("/api/planning/create-trailer", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Reset states and close modal
    setIsSavingTrailer(false);
    resetToDefault();
    handleCloseCreateTrailer();
    handleGetTrailersAgain();

    // Handle response
    if (response.ok) {
      console.log("Trailer created successfully.");
    } else {
      console.error("Failed to create trailer.");
    }

    // Optionally, add the new trailer to state if needed
    // newTrailer._id = "1122";
    // props.handleSetRows([newTrailer, ...props.rows]);
  }


  const walls = wallsData.filter((trailer, index) =>
    matchingTrailerType(trailer.trailerType)
  )[0]?.walls;

  if (isLoading) {
    return (
      <React.Fragment>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={openCreateTrailer}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {`Edit Trailer Menu`}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => {
              resetToDefault();
              handleCloseCreateTrailer();
            }}
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
                width: 1,
                // minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "red",
                minHeight: "100%",
                minHeight: "70vh",
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
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        // onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        // open={props.openDrawings}
        open={openCreateTrailer}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {/* upper menu bar */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "space-between",
              paddingLeft: "4rem",
              paddingRight: "4rem",
              pt: 0,
              // bgcolor: "red",
            }}
          >
            <WallsDrawingsDialog
              openDrawings={openDrawings}
              handleClickOpenDrawings={handleClickOpenDrawings}
              handleCloseDrawings={handleCloseDrawings}
              currentWall={currentWall}
            />
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                // if (isStepOptional(index)) {
                //   labelProps.optional = (
                //     <Typography variant="caption">Optional</Typography>
                //   );
                // }
                // if (isStepSkipped(index)) {
                //   stepProps.completed = false;
                // }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      {...labelProps}
                      sx={{
                        // bgcolor:'blue',
                        // minHeight:'2.4rem',
                        "& .MuiStepLabel-label": {
                          fontSize: "1.1rem !important",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "1.7rem !important",
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset} variant="contained">
                    Reset
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                    mt: 1,
                  }}
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    variant="contained"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box
                    sx={{
                      left: "7rem",
                      minWidth: "8rem",
                      position: "absolute",
                    }}
                  >
                    <Typography>
                      Step {activeStep + 1} of {steps.length}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )} */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {trailerType && workOrder
                      ? `${trailerType} | WO ${workOrder}`
                      : ""}
                  </Box>
                  {activeStep === steps.length - 1 && isSavingTrailer && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <CircularProgress
                        size={35}
                        thickness={4}
                        sx={{
                          color: "primary",
                          mr: 0,
                        }}
                      />
                    </Box>
                  )}
                  <Button
                    sx={{
                      minWidth:
                        activeStep === steps.length - 1 ? "16rem" : "unset",
                    }}
                    onClick={() => {
                      if (activeStep !== steps.length - 1) {
                        handleNext();
                      } else {
                        if (isEditMode) {
                          handleSave();
                        } else {
                          uploadTrailerHandler();
                        }
                      }
                    }}
                    variant="contained"
                  // disabled={!desableStep2}
                  >
                    {activeStep === steps.length - 1
                      ? !isEditMode
                        ? "Create Trailer Project"
                        : "Save Changes"
                      : "Next"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            resetToDefault();
            handleCloseCreateTrailer();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* main content section */}
        <DialogContent dividers>
          {activeStep === 0 && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                paddingBottom: 4,
                paddingLeft: "1rem",
                paddingRight: "1rem",
                //   bgcolor: "red",
              }}
            >
              <Box
                sx={{
                  minWidth: "20rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ mt: 0, mb: 1, mt: 1 }}>
                  General Configurations
                </Typography>
                {/* Trailer Type */}
                <Box sx={{ maxWidth: "20rem", mt: 2, width: "100%" }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="trailer-type-label">
                      Trailer Type
                    </InputLabel>
                    <Select
                      labelId="trailer-type-label"
                      id="trailer-type"
                      value={trailerType}
                      label="Trailer Type"
                      onChange={handleTrailerTypeChange}
                    >
                      <MenuItem value={"Lead"}>Lead</MenuItem>
                      <MenuItem value={"Pup"}>Pup</MenuItem>
                      <MenuItem value={"Tri 61' 2 Hoppers"}>
                        Tri 61' 2 Hoppers
                      </MenuItem>
                      <MenuItem value={"Tri 61' 3 Hoppers"}>
                        Tri 61' 3 Hoppers
                      </MenuItem>
                      <MenuItem value={"Tri 72' 2 Hoppers"}>
                        Tri 72' 2 Hoppers
                      </MenuItem>
                      <MenuItem value={"Tandem"}>Tandem</MenuItem>
                      <MenuItem value={"4 Axle"}>4 Axle</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* Work Order */}
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "20rem",
                    mt: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic1"
                    label="Work Order"
                    variant="outlined"
                    // type="number"
                    value={workOrder}
                    onChange={handleWorkOrder}
                  />
                  {workOrder &&
                    !isEditMode &&
                    (trailerType === "Pup" || trailerType === "Lead") && (
                      <IconButton onClick={handleIconClick}>
                        <GetAppIcon sx={{ fontSize: 25 }} />
                        {getOtherTrailerDataIsLoading && (
                          <CircularProgress size={34} />
                        )}
                      </IconButton>
                    )}
                </Box>
                {/* Cutomer */}
                <Box sx={{ width: "100%", maxWidth: "20rem", mt: 4 }}>
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic1"
                    label="Customer"
                    variant="outlined"
                    // type="number"
                    value={customer}
                    onChange={handleCustomer}
                  />
                </Box>
                {/* Completion data */}
                {/* <Box sx={{ maxWidth: "20rem", mt: 4, width: "100%", hidden: "true" }}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Required Completion Date"
                        slotProps={{ textField: { size: "small" } }}
                        value={dateRequired}
                        onChange={(newValue) => setDateRequired(newValue)}
                      />
                 </LocalizationProvider>
                  </FormControl>
                </Box> */}
                {/* Future Jig */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="doors-opening-label">
                        Future Jig
                      </InputLabel>
                      <Select
                        labelId="future-jig-label"
                        id="future-jig"
                        value={futureJig}
                        label="Future Jig"
                        onChange={handleFutureJig}
                      >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Typography sx={{ mr: 1 }}>
                    Jig Modification Requirments
                  </Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          jigReq === "Standard" ? "var(--primary)" : "white",
                        color:
                          jigReq === "Standard" ? "white" : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setJigReq("Standard")}
                    >
                      No
                    </Button>
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          jigReq === "Special" ? "var(--primary)" : "white",
                        color:
                          jigReq === "Special" ? "white" : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setJigReq("Special")}
                    >
                      Yes
                    </Button>
                  </ButtonGroup>
                </Box>
                {jigReq === "Special" && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      // alignItems: "center",
                      mt: 3,
                      // bgcolor: "red",
                    }}
                  >
                    <Typography sx={{ mr: 0, mb: 1 }}>
                      Add Special Requirments:
                    </Typography>
                    <Box sx={{ maxWidth: "25rem" }}>
                      <TextField
                        size="small"
                        fullWidth
                        id="outlined-basic1"
                        label="Special Requirments"
                        variant="outlined"
                        multiline
                        type="string"
                        value={specialJigReq}
                        onChange={handleSpecialJigReq}
                      />
                    </Box>
                  </Box>
                )}
                {/* VIN Number */}
                <Box sx={{ width: "100%", maxWidth: "20rem", mt: 4 }}>
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic1"
                    label="VIN Number"
                    variant="outlined"
                    // type="number"
                    value={vinNumber}
                    onChange={handleVinNumber}
                    InputLabelProps={{
                      shrink: Boolean(vinNumber), // This ensures the label shrinks if vinNumber is not empty
                    }}
                  />
                  <Button
                    sx={{ mt: 1, mb: 2 }}
                    onClick={() => {
                      window.open(
                        "https://trackingnew.vercel.app//vincalculator"
                      );
                    }}
                  >
                    Calculate VIN Number
                  </Button>
                </Box>
                <Typography sx={{ mt: 1, mb: 3 }}>
                  Trailer Dimensions and Slopes
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Typography sx={{ mr: 0 }}>Sidewalls Length</Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          trailerLenght === "Standard"
                            ? "var(--primary)"
                            : "white",
                        color:
                          trailerLenght === "Standard"
                            ? "white"
                            : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setTrailerLenght("Standard")}
                    >
                      Standard
                    </Button>
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          trailerLenght === "Special"
                            ? "var(--primary)"
                            : "white",
                        color:
                          trailerLenght === "Special"
                            ? "white"
                            : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setTrailerLenght("Special")}
                    >
                      Special
                    </Button>
                  </ButtonGroup>
                </Box>
                {trailerLenght === "Special" && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 3,
                      // bgcolor: "red",
                    }}
                  >
                    <Typography sx={{ mr: 2 }}>Add Special Length:</Typography>
                    <Box sx={{ maxWidth: "10rem" }}>
                      <TextField
                        size="small"
                        fullWidth
                        id="outlined-basic1"
                        label="Special Length"
                        variant="outlined"
                        type="number"
                        value={specialTrailerLength}
                        onChange={handleSpecialTrailerLength}
                      />
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Typography sx={{ mr: 0 }}>Sidewalls Height</Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          trailerWallHeight === "Standard"
                            ? "var(--primary)"
                            : "white",
                        color:
                          trailerWallHeight === "Standard"
                            ? "white"
                            : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setTrailerWallHeight("Standard")}
                    >
                      Standard
                    </Button>
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          trailerWallHeight === "Special"
                            ? "var(--primary)"
                            : "white",
                        color:
                          trailerWallHeight === "Special"
                            ? "white"
                            : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setTrailerWallHeight("Special")}
                    >
                      Special
                    </Button>
                  </ButtonGroup>
                </Box>
                {trailerWallHeight === "Special" && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 3,
                      // bgcolor: "red",
                    }}
                  >
                    <Typography sx={{ mr: 2 }}>
                      Add Special Walls Height:
                    </Typography>
                    <Box sx={{ maxWidth: "10rem" }}>
                      <TextField
                        size="small"
                        fullWidth
                        id="outlined-basic1"
                        label="Special Height"
                        variant="outlined"
                        type="number"
                        value={specialTrailerWallHeight}
                        onChange={handleSpecialTrailerWallHeight}
                      />
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Typography sx={{ mr: 0 }}>Front Slope</Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          frontSlope === "Standard"
                            ? "var(--primary)"
                            : "white",
                        color:
                          frontSlope === "Standard"
                            ? "white"
                            : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setFrontSlope("Standard")}
                    >
                      Standard
                    </Button>
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          frontSlope === "Special" ? "var(--primary)" : "white",
                        color:
                          frontSlope === "Special" ? "white" : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setFrontSlope("Special")}
                    >
                      Special
                    </Button>
                  </ButtonGroup>
                </Box>
                {frontSlope === "Special" && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 3,
                      // bgcolor: "red",
                    }}
                  >
                    <Typography sx={{ mr: 2 }}>
                      Add Front Slope Angle:
                    </Typography>
                    <Box sx={{ maxWidth: "10rem" }}>
                      <TextField
                        size="small"
                        fullWidth
                        id="outlined-basic1"
                        label="Special Angle"
                        variant="outlined"
                        type="number"
                        value={specialTrailerFrontSlope}
                        onChange={handleSpecialTrailerFrontSlope}
                      />
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Typography sx={{ mr: 0 }}>Rear Slope</Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          rearSlope === "Standard" ? "var(--primary)" : "white",
                        color:
                          rearSlope === "Standard" ? "white" : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setRearSlope("Standard")}
                    >
                      Standard
                    </Button>
                    <Button
                      sx={{
                        zIndex: "100",
                        fontSize: "0.8rem",
                        bgcolor:
                          rearSlope === "Special" ? "var(--primary)" : "white",
                        color:
                          rearSlope === "Special" ? "white" : "var(--primary)",
                        "&:hover": {
                          backgroundColor: "var(--primary5)",
                          color: "var(--primary)",
                          // borderLeft: "none",
                        },
                      }}
                      onClick={() => setRearSlope("Special")}
                    >
                      Special
                    </Button>
                  </ButtonGroup>
                </Box>
                {rearSlope === "Special" && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 3,
                      // bgcolor: "red",
                    }}
                  >
                    <Typography sx={{ mr: 2 }}>
                      Add Rear Slope Angle:
                    </Typography>
                    <Box sx={{ maxWidth: "10rem" }}>
                      <TextField
                        size="small"
                        fullWidth
                        id="outlined-basic1"
                        label="Special Angle"
                        variant="outlined"
                        type="number"
                        value={specialTrailerRearSlope}
                        onChange={handleSpecialTrailerRearSlope}
                      />
                    </Box>
                  </Box>
                )}

                <Typography sx={{ mt: 4, mb: 1 }}>Tarps</Typography>
                {/* Tarps Opener */}
                <Box sx={{ maxWidth: "20rem", mt: 2, width: "100%" }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="fenders-type-label">
                      Tarps Opener
                    </InputLabel>
                    <Select
                      labelId="fenders-type-label"
                      id="fenders-type"
                      value={
                        isCustomElectricTarpOpener
                          ? "Other"
                          : electricTarpOpener
                      }
                      label="Tarps Opening"
                      onChange={handleElectricTarpOpenerChange}
                    >
                      <MenuItem value="Manual">Manual</MenuItem>
                      <MenuItem value="Michel's Tarp System">
                        Michel's Electric Tarp
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {isCustomElectricTarpOpener && (
                    <TextField
                      fullWidth
                      size="small"
                      label="Custom Tarp Opener"
                      value={customElectricTarpOpener}
                      onChange={handleCustomTarpOpenerChange}
                      sx={{ mt: 2 }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "24rem",
                  // bgcolor: "grey",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                  ml: 10,
                  mr: 10,
                }}
              >
                <Typography sx={{ mt: 1, mb: 1 }}>Chutes</Typography>
                {/* Hopper Gruond Clearance */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  {/* <Typography sx={{ mr: 0 }}>Hopper Panels</Typography> */}
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="hoppers-type-label">
                        Hopper Ground Clearance
                      </InputLabel>
                      <Select
                        labelId="hoppers-type-label"
                        id="hoppers-type"
                        value={hoppersType}
                        label="Hopper Panels Ground Clearance"
                        onChange={handleHoppersTypeChange}
                      >
                        <MenuItem value={"High"}>High</MenuItem>
                        <MenuItem value={"Mid"}>Mid</MenuItem>
                        <MenuItem value={"Low"}>Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                {/* Hoppers Door Size */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  {/* <Typography sx={{ mr: 0 }}>Hopper Doors Size</Typography> */}
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="hoppers-doors-size-label">
                        Hopper Doors Size
                      </InputLabel>
                      <Select
                        labelId="hoppers-doors-size-label"
                        id="hoppers-doors-size"
                        value={doorSize}
                        label="Hoppers Doors Size"
                        onChange={handleDoorSizeChange}
                      >
                        <MenuItem value={"24x24"}>24x24</MenuItem>
                        <MenuItem value={"22x22"}>22x22</MenuItem>
                        <MenuItem value={"24x19"}>24x19</MenuItem>
                        <MenuItem value={"40x30"}>40x30</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                {/* Front Door Open Towards */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  {/* <Typography sx={{ mr: 0 }}>Front Door Opens</Typography> */}
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="front-door-opens-label">
                        Front Door Opens Towards
                      </InputLabel>
                      <Select
                        labelId="front-door-opens-label"
                        id="front-door-opens"
                        value={frontDoorOpens}
                        label="Front Door Opens Towards"
                        onChange={handleFrontDoorOpensChange}
                      >
                        <MenuItem value={"In"}>In</MenuItem>
                        <MenuItem value={"Out"}>Out</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                {/* Mid Door Open Towards */}
                {trailerType === "Tri 61' 3 Hoppers" && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>Middle Door Opens</Typography> */}
                    <Box sx={{ mt: 0, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="mid-door-opens-towards-label">
                          Middle Door Opens Towards
                        </InputLabel>
                        <Select
                          labelId="mid-door-opens-towards-label"
                          id="mid-door-opens-towards"
                          value={midDoorOpens}
                          label="Middle Door Opens Towards"
                          onChange={handleMidDoorOpensChange}
                        >
                          <MenuItem value={"Forward"}>Forward</MenuItem>
                          <MenuItem value={"Backwards"}>Backwards</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                )}
                {/* Rear Door Open Towards */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  {/* <Typography sx={{ mr: 0 }}>Rear Door Opens</Typography> */}
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="rear-door-opens-towards-label">
                        Rear Door Opens Towards
                      </InputLabel>
                      <Select
                        labelId="rear-door-opens-towards-label"
                        id="rear-door-opens-towards"
                        value={rearDoorOpens}
                        label="Rear Door Opens Towards"
                        onChange={handleRearDoorOpensChange}
                      >
                        <MenuItem value={"In"}>In</MenuItem>
                        <MenuItem value={"Out"}>Out</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                {/* Chute Opener */}
                <Box
                  sx={{
                    width: "100%",
                    // maxWidth: '20rem',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="chute-opener-label">
                        Chute Opener
                      </InputLabel>
                      <Select
                        labelId="chute-opener-label"
                        id="chute-opener"
                        value={chuteOpener}
                        label="Chute Opener"
                        onChange={handleChuteOpenerChange}
                      >
                        <MenuItem value={"Electric"}>Electric</MenuItem>
                        <MenuItem value={"Manual"}>Manual</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                    {isCustomChuteOpener && (
                      <TextField
                        fullWidth
                        size="small"
                        label="Custom Chute Opener"
                        value={customChuteOpener}
                        onChange={handleCustomChuteOpenerChange}
                        sx={{ mt: 2 }}
                      />
                    )}
                  </Box>
                </Box>
                {/* Chute Locks */}
                <Box
                  sx={{
                    width: "100%",
                    // maxWidth: '20rem',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  {/* <Typography sx={{ mr: 0 }}>Chute Locks</Typography> */}
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="chute-locks-label">
                        Chute Locks
                      </InputLabel>
                      <Select
                        labelId="chute-locks-label"
                        id="chute-locks"
                        value={chuteLocks}
                        label="Chute Locks"
                        onChange={handleChuteLocksChange}
                      >
                        <MenuItem value={"Driver Side"}>Driver Side</MenuItem>
                        <MenuItem value={"Both Sides"}>Both Sides</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                {/* Hammer Hit Brackets */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  {/* <Typography sx={{ mr: 0 }}>Hammer Hit Brackets</Typography> */}
                  <Box sx={{ mt: 0, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="hammer-hits-label">
                        Hammer Hit Brackets
                      </InputLabel>
                      <Select
                        labelId="hammer-hits-label"
                        id="hammer-hits"
                        value={hammerHits}
                        label="Hammer Hit Brackets"
                        onChange={handleHammerHitsChange}
                      >
                        <MenuItem value={"Driver Side"}>Driver Side</MenuItem>
                        <MenuItem value={"Both Sides"}>Both Sides</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                {/* Doors Opener */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  {/* <Typography sx={{ mr: 0 }}>Doors Opening</Typography> */}
                  <Box sx={{ mt: 0, mb: 3, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="doors-opening-label">
                        Doors Opener
                      </InputLabel>
                      <Select
                        labelId="doors-opening-label"
                        id="doors-opening"
                        value={doorsOpening}
                        label="Doors Opening"
                        onChange={handleDoorsOpeningChange}
                      >
                        <MenuItem value={"Manual"}>Manual</MenuItem>
                        <MenuItem value={"Electric"}>Electric</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Typography sx={{ mt: 1, mb: 1 }}>Axle/Breaking</Typography>
                {/* Lift Axle */}
                <Box
                  sx={{
                    // maxWidth: "20rem",
                    mt: 2,
                    // mb: 3,
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="fenders-type-label">Lift Axle</InputLabel>
                    <Select
                      labelId="fenders-type-label"
                      id="fenders-type"
                      value={liftAxle}
                      label="Lift Axle"
                      onChange={handleLiftAxleChange}
                    >
                      <MenuItem value={"No"}>No</MenuItem>
                      <MenuItem value={"1 Lift Axle SPIF Compliant"}>
                        1 Lift Axle SPIF Compliant
                      </MenuItem>
                      <MenuItem value={"2 Lift Axles SPIF Compliant"}>
                        2 Lift Axles SPIF Compliant
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    // maxWidth: '20rem',
                    mt: 4,
                    mb: 3,
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="axle-type-label">Axle Type</InputLabel>
                    <Select
                      labelId="axle-type-label"
                      id="axle-type"
                      value={isCustomAxleType ? "Other" : axleType}
                      label="Axle Type"
                      onChange={handleAxleTypeChange}
                    >
                      <MenuItem value={"Standard"}>Standard</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {isCustomAxleType && (
                    <TextField
                      fullWidth
                      size="small"
                      label="Custom Axle Type"
                      value={customAxleType}
                      onChange={handleCustomAxleTypeChange}
                      sx={{ mt: 2 }}
                    />
                  )}
                </Box>

                <Typography sx={{ mt: 1, mb: 1 }}>Tires/Rims</Typography>
                {/* Tire Types */}
                <Box
                  sx={{
                    // maxWidth: '20rem',
                    mt: 2,
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="tires-type-label">Tires Type</InputLabel>
                    <Select
                      labelId="tires-type-label"
                      id="tires-type"
                      value={isCustomTires ? "Other" : tires}
                      label="Tires Type"
                      onChange={handleTiresChange}
                    >
                      <MenuItem value={'Super Singles 22.5"'}>
                        Super Singles 22.5"
                      </MenuItem>
                      <MenuItem value={'Michelin XTE 22.5"'}>
                        Michelin XTE 22.5"
                      </MenuItem>
                      <MenuItem value={'American Racing Standard 22.5"'}>
                        American Racing Standard 22.5"
                      </MenuItem>
                      <MenuItem value={'Hankook 22.5"'}>Hankook 22.5"</MenuItem>
                      <MenuItem value={'Hankook 24.5"'}>Hankook 24.5"</MenuItem>
                      <MenuItem value={'Goodyear Marathon 22.5"'}>
                        Goodyear Marathon 22.5"
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {isCustomTires && (
                    <TextField
                      fullWidth
                      size="small"
                      label="Custom Tires Type"
                      value={customTires}
                      onChange={handleCustomTiresChange}
                      sx={{ mt: 2 }}
                    />
                  )}
                </Box>
                {/* Rim Types */}
                <Box
                  sx={{
                    // maxWidth: '20rem',
                    mt: 4,
                    mb: 3,
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="rims-type-label">Rims Type</InputLabel>
                    <Select
                      labelId="rims-type-label"
                      id="rims-type"
                      value={isCustomRims ? "Other" : rims}
                      label="Rims Type"
                      onChange={handleRimsChange}
                    >
                      <MenuItem value={"8.5x24.5 Rim American Racing"}>
                        8.5x24.5 Rim American Racing
                      </MenuItem>
                      <MenuItem value={"8.5x22.5 Rim American Racing Standard"}>
                        8.5x22.5 Rim American Racing Standard
                      </MenuItem>
                      <MenuItem
                        value={'22.5" Polished Rims by American Racing'}
                      >
                        22.5" Polished Rims by American Racing
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {isCustomRims && (
                    <TextField
                      fullWidth
                      size="small"
                      label="Custom Rims Type"
                      value={customRims}
                      onChange={handleCustomRimsChange}
                      sx={{ mt: 2 }}
                    />
                  )}
                </Box>
                <Typography sx={{ mt: 1, mb: 1 }}>Fenders</Typography>
                {/* Fender Types */}
                <Box
                  sx={{
                    // maxWidth: "20rem",
                    mt: 2,
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="fenders-type-label">
                      Fenders Type
                    </InputLabel>
                    <Select
                      labelId="fenders-type-label"
                      id="fenders-type"
                      value={fendersType}
                      label="Fenders Type"
                      onChange={handleFendersTypeChange}
                    >
                      <MenuItem value={"Heartland"}>Heartland</MenuItem>
                      <MenuItem value={"Poly Fenders Class 8"}>
                        Poly Fenders Class 8
                      </MenuItem>
                      <MenuItem value={"Stainless Fenders Class 8"}>
                        Stainless Fenders Class 8
                      </MenuItem>
                      <MenuItem value={"Adomar"}>Adomar</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    // maxWidth: '20rem',
                    mt: 4,
                    mb: 3,
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="mat-flaps-type-label">Mud Flaps</InputLabel>
                    <Select
                      labelId="mat-flaps-type-label"
                      id="mat-flaps-type"
                      value={isCustomMudFlaps ? "Other" : mudFlaps}
                      label="Mud Flaps"
                      onChange={handleMudFlapsChange}
                    >
                      <MenuItem value={"Standard"}>Standard</MenuItem>
                      <MenuItem value={"Logo"}>Logo</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  {isCustomMudFlaps && (
                    <TextField
                      fullWidth
                      size="small"
                      label="Custom Mud Flaps"
                      value={customMudFlaps}
                      onChange={handleCustomMudFlapsChange}
                      sx={{ mt: 2 }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  // width: "24rem",
                  minWidth: "20rem",
                  // bgcolor: "grey",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ mt: 2, mb: 1, mt: 1 }}>
                    Lighting & Electrical
                  </Typography>
                  {/* Side Lights */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>Side Lights</Typography> */}
                    <Box sx={{ mt: 1, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="hoppers-type-label">
                          Side Lights
                        </InputLabel>
                        <Select
                          labelId="hoppers-type-label"
                          id="hoppers-type"
                          value={sideLights}
                          label="Side Lights"
                          onChange={handleSideLightsChange}
                        >
                          <MenuItem value={"Standard Lighting"}>
                            Standard Lighting
                          </MenuItem>
                          <MenuItem value={"28 Extra Sidelights"}>
                            28 Extra Sidelights
                          </MenuItem>
                          <MenuItem value={"44 Extra Sidelights"}>
                            44 Extra Sidelights
                          </MenuItem>
                          <MenuItem value={"68 Extra Sidelights"}>
                            68 Extra Sidelights
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  {/* W Lights */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>W Lights</Typography> */}
                    <Box sx={{ mt: 0, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="hoppers-type-label">
                          W Lights
                        </InputLabel>
                        <Select
                          labelId="hoppers-type-label"
                          id="hoppers-type"
                          value={wLights}
                          label="W Lights"
                          onChange={handleWLightsChange}
                        >
                          <MenuItem value={"No Lights on W"}>
                            No Lights on W
                          </MenuItem>
                          <MenuItem value={"20 Lights per W"}>
                            20 Lights per W
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  {/* Slopes Underglow */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>Slopes Underglow</Typography> */}
                    <Box sx={{ mt: 0, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="hoppers-type-label">
                          Slopes Underglow
                        </InputLabel>
                        <Select
                          labelId="hoppers-type-label"
                          id="hoppers-type"
                          value={slopesUnderglow}
                          label="Slopes Underglow"
                          onChange={handleSlopesUnderglowChange}
                        >
                          <MenuItem value={"No Underglow"}>
                            No Underglow
                          </MenuItem>
                          <MenuItem value={"Under Both Slopes"}>
                            Under Both Slopes
                          </MenuItem>
                          <MenuItem value={"Under Front Slope"}>
                            Under Front Slope
                          </MenuItem>
                          <MenuItem value={"Under Rear Slope"}>
                            Under Rear Slope
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  {/* Hoppers Underglow */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>Hoppers Underglow</Typography> */}
                    <Box sx={{ mt: 0, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="hoppers-type-label">
                          Hoppers Underglow
                        </InputLabel>
                        <Select
                          labelId="hoppers-type-label"
                          id="hoppers-type"
                          value={hoppersUnderglow}
                          label="Hoppers Underglow"
                          onChange={handleHoppersUnderglowChange}
                        >
                          <MenuItem value={"No Underglow"}>
                            No Underglow
                          </MenuItem>
                          <MenuItem value={"Underglow Around Hoppers"}>
                            Underglow Around Hoppers
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  {/* Interior Lights */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>Interior Lights</Typography> */}
                    <Box sx={{ mt: 0, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="hoppers-type-label">
                          Interior Lights
                        </InputLabel>
                        <Select
                          labelId="hoppers-type-label"
                          id="hoppers-type"
                          value={interiorLights}
                          label="Interior Lights"
                          onChange={handleInteriorLightsChange}
                        >
                          <MenuItem value={"Standard"}>Standard</MenuItem>
                          <MenuItem value={"1 Corner Light per Hopper"}>
                            1 Corner Light per Hopper
                          </MenuItem>
                          <MenuItem value={"2 Corner Lights per Hopper"}>
                            2 Corner Lights per Hopper
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  {/* Unload Lights */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4,
                      mb: 3,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>Unload Lights</Typography> */}
                    <Box sx={{ mt: 0, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="hoppers-type-label">
                          Unload Lights
                        </InputLabel>
                        <Select
                          labelId="hoppers-type-label"
                          id="hoppers-type"
                          value={unloadLights}
                          label="Unload Lights"
                          onChange={handleUnloadLightsChange}
                        >
                          <MenuItem value={"1 per Hopper"}>
                            1 per Hopper
                          </MenuItem>
                          <MenuItem value={"2 per Hopper"}>
                            2 per Hopper
                          </MenuItem>
                          <MenuItem value={"No lights"}>
                            No Unload Lights
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Typography sx={{ mt: 1, mb: 1 }}>Interior Steps</Typography>

                  {/* Interior Steps */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                      mb: 3,
                    }}
                  >
                    {/* <Typography sx={{ mr: 0 }}>Interior Steps</Typography> */}
                    <Box sx={{ mt: 0, width: "100%" }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="hoppers-type-label">
                          Interior Steps
                        </InputLabel>
                        <Select
                          labelId="hoppers-type-label"
                          id="hoppers-type"
                          value={interiorSteps}
                          label="Interior Steps"
                          onChange={handleInteriorStepsChange}
                        >
                          <MenuItem value={"Standard Configuration"}>
                            Standard Configuration
                          </MenuItem>
                          <MenuItem value={"Special Configuration"}>
                            Special Configuration
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  {/* Customer Logo on Rear */}
                  {trailerType !== "Lead" && (
                    <>
                      <Typography sx={{ mt: 1, mb: 1 }}>
                        Customer Logo
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                          mb: 3,
                        }}
                      >
                        {/* <Typography sx={{ mr: 0 }}>Customer Logo on Rear</Typography> */}
                        <Box sx={{ mt: 0, width: "100%" }}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="hoppers-type-label">
                              Customer Logo on Rear
                            </InputLabel>
                            <Select
                              labelId="hoppers-type-label"
                              id="hoppers-type"
                              value={rearCustomerLogo}
                              label="Customer Logo on Rear"
                              onChange={handlerearCustomerLogoChange}
                            >
                              <MenuItem value={"No Customer Logo"}>
                                No Customer Logo
                              </MenuItem>
                              <MenuItem value={"Customer Logo"}>
                                Yes - Provide JPEG Logo
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </>
                  )}
                  <Typography sx={{ mt: 1, mb: 1 }}>Other</Typography>
                  {/* Air Inflation */}
                  <Box sx={{ maxWidth: "20rem", mt: 2, width: "100%" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="fenders-type-label">
                        Air Inflation
                      </InputLabel>
                      <Select
                        labelId="fenders-type-label"
                        id="fenders-type"
                        value={airInflation}
                        label="Air Inflation"
                        onChange={handleAirInflationChange}
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* Special Requirements */}
                  <Box
                    sx={{
                      width: "100%",
                      mt: 4,
                    }}
                  >
                    <TextField
                      id="notes"
                      label="Special Requirments"
                      multiline
                      rows={15}
                      fullWidth
                      variant="outlined"
                      value={notes}
                      onChange={handleNotesChange}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {activeStep === 1 && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: 40,
                paddingLeft: "1rem",
                paddingRight: "1rem",
                // bgcolor: "red",
                minHeight: "5rem",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // bgcolor:'red',
                  pt: 1,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                    Walls
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    // maxWidth: "70vw",
                    display: "flex",
                    justifyContent: "flex-start",
                    mb: 3,
                    flexWrap: "wrap",
                    bgcolor: "var(--success1)",
                    py: 1,
                    px: 2,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "1.1rem", mr: 2, fontWeight: "600" }}
                  >
                    Relevant Fields:
                  </Typography>

                  <Typography sx={{ fontSize: "1.1rem", mr: 6 }}>
                    Sidewalls Length: {trailerLenght}
                    {trailerLenght !== "Standard"
                      ? ` (${specialTrailerLength}")`
                      : ""}
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", mr: 6 }}>
                    Sidewalls Height: {trailerWallHeight}
                    {trailerWallHeight !== "Standard"
                      ? ` (${specialTrailerWallHeight}")`
                      : ""}
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", mr: 6 }}>
                    Front Slope: {frontSlope}
                    {frontSlope !== "Standard"
                      ? ` (${specialTrailerFrontSlope}")`
                      : ""}
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", mr: 6 }}>
                    Rear Slope: {rearSlope}
                    {rearSlope !== "Standard"
                      ? ` (${specialTrailerRearSlope}")`
                      : ""}
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem", mr: 6 }}>
                    Side Lights: {sideLights}
                  </Typography>

                  {/* !!(trailerLenght === "Standard" || specialTrailerLength) &&
    !!(trailerWallHeight === "Standard" || specialTrailerWallHeight) &&
    !!(frontSlope === "Standard" || specialTrailerFrontSlope) &&
    !!(rearSlope === "Standard" || specialTrailerRearSlope) &&
    !!workOrder &&
    !!trailerType &&
    !!tires &&
    !!rims &&
    !!fendersType &&
    !!hoppersType &&
    !!sideLights &&
    !!rearCustomerLogo &&
    !!interiorSteps &&
    !!wallsSurface &&
    !!wLights &&
    !!slopesUnderglow &&
    !!hoppersUnderglow &&
    !!interiorLights &&
    !!unloadLights &&
    !!doorSize &&
    !!frontDoorOpens &&
    !!midDoorSelected &&
    !!chuteLocks &&
    !!hammerHits &&
    !!doorsOpening &&
    !!airInflation &&
    !!liftAxle &&
    !!electricTarpOpener; */}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "12rem",
                      // bgcolor: "blue",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      Wall Type
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "9rem",
                      // bgcolor: "blue",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      Image
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "12rem",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      Standard Drawings
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "13rem",
                      justifyContent: "center",
                      ml: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      Applicable Drawings
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "10rem",
                      justifyContent: "center",
                      ml: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      Walls Surface
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "10rem",
                      justifyContent: "center",
                      ml: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      Other Comments
                    </Typography>
                  </Box>
                </Box>
                {wallsData.map((trailer, trailerIndex) => {
                  if (matchingTrailerType(trailer.trailerType)) {
                    return trailer.walls.map((wall, wallIndex) => {
                      // Determine the correct state for wall comments based on the wallIndex
                      const getWallCommentsState = (index) => {
                        switch (index) {
                          case 0:
                            return wallComments1[wallIndex] || "";
                          case 1:
                            return wallComments2[wallIndex] || "";
                          case 2:
                            return wallComments3[wallIndex] || "";
                          case 3:
                            return wallComments4[wallIndex] || "";
                          case 4:
                            return wallComments5[wallIndex] || "";
                          case 5:
                            return wallComments6[wallIndex] || "";
                          case 6:
                            return wallComments7[wallIndex] || "";
                          default:
                            return "";
                        }
                      };

                      // Update the correct wallComments state based on the wallIndex
                      const handleWallCommentsChangeForIndex = (e, index) => {
                        const value = e.target.value;
                        switch (index) {
                          case 0:
                            setWallComments1((prevComments) => ({
                              ...prevComments,
                              [wallIndex]: value,
                            }));
                            break;
                          case 1:
                            setWallComments2((prevComments) => ({
                              ...prevComments,
                              [wallIndex]: value,
                            }));
                            break;
                          case 2:
                            setWallComments3((prevComments) => ({
                              ...prevComments,
                              [wallIndex]: value,
                            }));
                            break;
                          case 3:
                            setWallComments4((prevComments) => ({
                              ...prevComments,
                              [wallIndex]: value,
                            }));
                            break;
                          case 4:
                            setWallComments5((prevComments) => ({
                              ...prevComments,
                              [wallIndex]: value,
                            }));
                            break;
                          case 5:
                            setWallComments6((prevComments) => ({
                              ...prevComments,
                              [wallIndex]: value,
                            }));
                            break;
                          case 6:
                            setWallComments7((prevComments) => ({
                              ...prevComments,
                              [wallIndex]: value,
                            }));
                            break;
                          default:
                            break;
                        }
                      };

                      return (
                        <Box
                          key={wallIndex}
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-evenly",
                            mb: 2,
                          }}
                        >
                          {/* Wall type label */}
                          <Box sx={{ width: "12rem", display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "1rem" }}>{wall.wallType}</Typography>
                          </Box>

                          {/* Wall image */}
                          <Box
                            sx={{
                              padding: 0.3,
                              bgcolor: "white",
                              height: "4rem",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              borderRadius: "0.8rem",
                              maxWidth: "10rem",
                              position: "relative",
                            }}
                          >
                            <Image
                              src={`${wall.defaultImage}.png`}
                              style={{ objectFit: "contain" }}
                              fill={true}
                              sizes={"100%"}
                              priority={true}
                              alt="Wall Image"
                            />
                          </Box>

                          {/* Button to open wall drawings */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "12rem",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              aria-label="view-drawings"
                              color="primary"
                              variant="outlined"
                              sx={{ ml: 0, width: "4rem", height: "2.2rem" }}
                              onClick={() => handleClickOpenDrawings(wall)}
                            >
                              See
                            </Button>
                          </Box>

                          {/* Button group for wall drawing options */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "13rem",
                              justifyContent: "center",
                              ml: 2,
                            }}
                          >
                            <ButtonGroup variant="outlined" aria-label="wall-drawing-options">
                              <Button
                                sx={{
                                  fontSize: "0.8rem",
                                  bgcolor: applicableWallDrawings === "Standard" ? "var(--primary)" : "white",
                                  color: applicableWallDrawings === "Standard" ? "white" : "var(--primary)",
                                  "&:hover": {
                                    backgroundColor: "var(--primary5)",
                                    color: "var(--primary)",
                                  },
                                }}
                                onClick={() => setApplicableWallDrawings("Standard")}
                              >
                                Standard
                              </Button>
                              <Button
                                sx={{
                                  fontSize: "0.8rem",
                                  bgcolor: applicableWallDrawings === "Special" ? "var(--primary)" : "white",
                                  color: applicableWallDrawings === "Special" ? "white" : "var(--primary)",
                                  "&:hover": {
                                    backgroundColor: "var(--primary5)",
                                    color: "var(--primary)",
                                  },
                                }}
                                onClick={() => setApplicableWallDrawings("Special")}
                              >
                                Upload
                              </Button>
                            </ButtonGroup>
                          </Box>

                          {/* Walls surface selection */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "10rem",
                              justifyContent: "center",
                              ml: 2,
                            }}
                          >
                            <FormControl fullWidth size="small">
                              <InputLabel id={`walls-surface-label-${wallIndex}`}>Walls Surface</InputLabel>
                              <Select
                                labelId={`walls-surface-label-${wallIndex}`}
                                id={`walls-surface-${wallIndex}`}
                                value={wallsSurface}
                                label="Walls Surface"
                                onChange={handleWallsSurfaceChange}
                              >
                                <MenuItem value={"Aluminum not Polished"}>Aluminum not Polished</MenuItem>
                                <MenuItem value={"Aluminum Polished"}>Aluminum Polished</MenuItem>
                                <MenuItem value={"Painted"}>Painted</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          {/* Comments section */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "10rem",
                              justifyContent: "center",
                              ml: 2,
                            }}
                          >
                            <TextField
                              size="small"
                              fullWidth
                              multiline
                              id={`comment-${wallIndex}`}
                              label="Add Comments"
                              variant="outlined"
                              value={getWallCommentsState(wallIndex)}
                              onChange={(e) => handleWallCommentsChangeForIndex(e, wallIndex)}
                            />
                          </Box>
                        </Box>
                      );
                    });
                  }
                })}

              </Box>

              <RenderProcess
                isEditMode={isEditMode}
                parts={frontFramePartsState}
                handleParts={handleFrontFramePartsStateChange}
                allParts={parts}
                sectionTitle={"Front Frame"}
                addPartRef={frontFrameRef}
                surfaceProcess={frontFrameSurface}
                handleSurfaceProcess={handleFrontFrameSurfaceChange}
                additionalRequirements={frontFrameSpecialReqRef}
                handleAddPartText={handleAddPartFrontFrame}
                relevantFields={[
                  {
                    text: "Front Slope",
                    value: frontSlope,
                    special: specialTrailerFrontSlope,
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={rearFramePartsState}
                handleParts={handleRearFramePartsStateChange}
                allParts={parts}
                sectionTitle={"Rear Frame"}
                addPartRef={rearFrameRef}
                surfaceProcess={rearFrameSurface}
                handleSurfaceProcess={handleRearFrameSurfaceChange}
                additionalRequirements={rearFrameSpecialReqRef}
                handleAddPartText={handleAddPartRearFrame}
                relevantFields={[
                  {
                    text: "Rear Slope",
                    value: rearSlope,
                    special: specialTrailerRearSlope,
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={doorsPartsState}
                handleParts={handleDoorPartsStateChange}
                allParts={parts}
                sectionTitle={"Hopper Doors"}
                addPartRef={hopperDoorsRef}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={hopperDoorsSpecialReqRef}
                handleAddPartText={handleAddPartHopperDoors}
                relevantFields={
                  trailerType !== "Tri 61' 3 Hoppers"
                    ? [
                      {
                        text: "Hoppers Type",
                        value: hoppersType,
                        special: "",
                      },
                      {
                        text: "Hopper Doors Size",
                        value: doorSize,
                        special: "",
                      },
                      {
                        text: "Front Door Opens",
                        value: frontDoorOpens,
                        special: "",
                      },
                      {
                        text: "Rear Door Opens",
                        value: rearDoorOpens,
                        special: "",
                      },
                      {
                        text: "Sidewalls Length",
                        value: trailerLenght,
                        special: specialTrailerLength,
                      },
                      {
                        text: "Sidewalls Height",
                        value: trailerWallHeight,
                        special: specialTrailerWallHeight,
                      },
                      {
                        text: "Front Slope",
                        value: frontSlope,
                        special: specialTrailerFrontSlope,
                      },
                      {
                        text: "Rear Slope",
                        value: rearSlope,
                        special: specialTrailerRearSlope,
                      },
                    ]
                    : [
                      {
                        text: "Hoppers Type",
                        value: hoppersType,
                        special: "",
                      },
                      {
                        text: "Hopper Doors Size",
                        value: doorSize,
                        special: "",
                      },
                      {
                        text: "Front Door Opens",
                        value: frontDoorOpens,
                        special: "",
                      },
                      {
                        text: "Middle Door Opens",
                        value: midDoorOpens,
                        special: "",
                      },
                      {
                        text: "Rear Door Opens",
                        value: rearDoorOpens,
                        special: "",
                      },
                      {
                        text: "Sidewalls Length",
                        value: trailerLenght,
                        special: specialTrailerLength,
                      },
                      {
                        text: "Sidewalls Height",
                        value: trailerWallHeight,
                        special: specialTrailerWallHeight,
                      },
                      {
                        text: "Front Slope",
                        value: frontSlope,
                        special: specialTrailerFrontSlope,
                      },
                      {
                        text: "Rear Slope",
                        value: rearSlope,
                        special: specialTrailerRearSlope,
                      },
                    ]
                }
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={boxStage1State}
                handleParts={handleBoxStage1StateChange}
                allParts={parts}
                sectionTitle={"Box - Stage 1"}
                addPartRef={boxStage1Ref}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={boxStage1SpecialReqRef}
                handleAddPartText={handleAddPartBoxStage1}
                relevantFields={[
                  {
                    text: "Sidewalls Length",
                    value: trailerLenght,
                    special: specialTrailerLength,
                  },
                  {
                    text: "Sidewalls Height",
                    value: trailerWallHeight,
                    special: specialTrailerWallHeight,
                  },
                  {
                    text: "Front Slope",
                    value: frontSlope,
                    special: specialTrailerFrontSlope,
                  },
                  {
                    text: "Rear Slope",
                    value: rearSlope,
                    special: specialTrailerRearSlope,
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={boxStage2State}
                handleParts={handleBoxStage2StateChange}
                allParts={parts}
                sectionTitle={"Box - Stage 2"}
                addPartRef={boxStage2Ref}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={boxStage2SpecialReqRef}
                handleAddPartText={handleAddPartBoxStage2}
                relevantFields={[
                  {
                    text: "Sidewalls Length",
                    value: trailerLenght,
                    special: specialTrailerLength,
                  },
                  {
                    text: "Sidewalls Height",
                    value: trailerWallHeight,
                    special: specialTrailerWallHeight,
                  },
                  {
                    text: "Front Slope",
                    value: frontSlope,
                    special: specialTrailerFrontSlope,
                  },
                  {
                    text: "Rear Slope",
                    value: rearSlope,
                    special: specialTrailerRearSlope,
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={chutesPartsState}
                handleParts={handleChutesPartsStateChange}
                allParts={parts}
                sectionTitle={"Box - Stage 3 (Chutes)"}
                addPartRef={boxStage3Ref}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={boxStage3SpecialReqRef}
                handleAddPartText={handleAddPartBoxStage3}
                relevantFields={[
                  {
                    text: "Hoppers Type",
                    value: hoppersType,
                    special: "",
                  },
                  {
                    text: "Hopper Doors Size",
                    value: doorSize,
                    special: "",
                  },

                  {
                    text: "Sidewalls Length",
                    value: trailerLenght,
                    special: specialTrailerLength,
                  },
                  {
                    text: "Sidewalls Height",
                    value: trailerWallHeight,
                    special: specialTrailerWallHeight,
                  },
                  {
                    text: "Front Slope",
                    value: frontSlope,
                    special: specialTrailerFrontSlope,
                  },
                  {
                    text: "Rear Slope",
                    value: rearSlope,
                    special: specialTrailerRearSlope,
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={boxStage4State}
                handleParts={handleBoxStage4StateChange}
                allParts={parts}
                sectionTitle={
                  "Box - Stage 4 (Filler Strips + Steps + Tarp Bows)"
                }
                addPartRef={boxStage3Ref}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={boxFinishingSpecialReqRef}
                handleAddPartText={handleAddPartBoxFinishing}
                relevantFields={[
                  {
                    text: "Hoppers Type",
                    value: hoppersType,
                    special: "",
                  },
                  {
                    text: "Hopper Doors Size",
                    value: doorSize,
                    special: "",
                  },
                  {
                    text: "Interior Steps",
                    value: interiorSteps,
                    special: "",
                  },

                  {
                    text: "Sidewalls Length",
                    value: trailerLenght,
                    special: specialTrailerLength,
                  },
                  {
                    text: "Sidewalls Height",
                    value: trailerWallHeight,
                    special: specialTrailerWallHeight,
                  },
                  {
                    text: "Front Slope",
                    value: frontSlope,
                    special: specialTrailerFrontSlope,
                  },
                  {
                    text: "Rear Slope",
                    value: rearSlope,
                    special: specialTrailerRearSlope,
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={boxFinishingState}
                handleParts={handleBoxFinishingStateChange}
                allParts={parts}
                sectionTitle={"Box Finishing"}
                addPartRef={boxFinishingRef}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={boxStage4SpecialReqRef}
                handleAddPartText={handleAddPartBoxFinishing}
                relevantFields={[
                  {
                    text: "Front Door Opens",
                    value: frontDoorOpens,
                    special: "",
                  },

                  {
                    text: "Rear Door Opens",
                    value: rearDoorOpens,
                    special: "",
                  },
                  {
                    text: "Chute Locks",
                    value: chuteLocks,
                    special: "",
                  },
                  {
                    text: "Hammer Hits",
                    value: hammerHits,
                    special: "",
                  },
                  {
                    text: "Side Lights",
                    value: sideLights,
                    special: "",
                  },
                  {
                    text: "W Lights",
                    value: wLights,
                    special: "",
                  },
                  {
                    text: "Interior Lights",
                    value: interiorLights,
                    special: "",
                  },
                  {
                    text: "Unload Lights",
                    value: unloadLights,
                    special: "",
                  },
                  {
                    text: "Hoppers Underglow",
                    value: hoppersUnderglow,
                    special: "",
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={frontFrameFinishingPartsState}
                handleParts={handleFrontFrameFinishingPartsChange}
                allParts={parts}
                sectionTitle={"Front Frame Finishing"}
                addPartRef={frontFrameFinishingRef}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={frontFrameFinishingSpecialReqRef}
                handleAddPartText={handleAddPartFrontFrameFinishing}
                relevantFields={[
                  {
                    text: "Slopes Underglow",
                    value: slopesUnderglow,
                    special: "",
                  },
                ]}
              />

              <RenderProcess
                isEditMode={isEditMode}
                parts={rearFrameFinishingPartsState}
                handleParts={handleRearFrameFinishingPartsChange}
                allParts={parts}
                sectionTitle={"Rear Frame Finishing"}
                addPartRef={rearFrameFinishingRef}
                surfaceProcess={""}
                handleSurfaceProcess={() => { }}
                additionalRequirements={rearFrameFinishingSpecialReqRef}
                handleAddPartText={handleAddPartRearFrameFinishing}
                relevantFields={[
                  {
                    text: "Slopes Underglow",
                    value: slopesUnderglow,
                    special: "",
                  },
                ]}
              />
            </Box>
          )}
          {activeStep === 2 && (
            <RenderTrailerDetails
              trailerType={trailerType}
              notes={notes}
              workOrder={workOrder}
              customer={customer}
              dateRequired={dateRequired}
              futureJig={futureJig}
              vinNumber={vinNumber}
              tires={tires}
              isCustomTires={isCustomTires}
              customTires={customTires}
              rims={rims}
              isCustomRims={isCustomRims}
              customRims={customRims}
              fendersType={fendersType}
              mudFlaps={mudFlaps}
              isCustomMudFlaps={isCustomMudFlaps}
              customMudFlaps={customMudFlaps}
              airInflation={airInflation}
              liftAxle={liftAxle}
              axleType={axleType}
              isCustomAxleType={isCustomAxleType}
              customAxleType={customAxleType}
              rearCustomerLogo={rearCustomerLogo}
              interiorSteps={interiorSteps}
              trailerLenght={trailerLenght}
              specialTrailerLength={specialTrailerLength}
              trailerWallHeight={trailerWallHeight}
              specialTrailerWallHeight={specialTrailerWallHeight}
              frontSlope={frontSlope}
              specialTrailerFrontSlope={specialTrailerFrontSlope}
              rearSlope={rearSlope}
              specialTrailerRearSlope={specialTrailerRearSlope}
              sideLights={sideLights}
              wLights={wLights}
              slopesUnderglow={slopesUnderglow}
              hoppersUnderglow={hoppersUnderglow}
              interiorLights={interiorLights}
              unloadLights={unloadLights}
              hoppersType={hoppersType}
              doorSize={doorSize}
              frontDoorOpens={frontDoorOpens}
              midDoorOpens={midDoorOpens}
              rearDoorOpens={rearDoorOpens}
              chuteOpener={chuteOpener}
              isCustomChuteOpener={isCustomChuteOpener}
              customChuteOpener={customChuteOpener}
              chuteLocks={chuteLocks}
              hammerHits={hammerHits}
              doorsOpening={doorsOpening}
              electricTarpOpener={electricTarpOpener}
              isCustomElectricTarpOpener={isCustomElectricTarpOpener}
              customElectricTarpOpener={customElectricTarpOpener}
            />
          )}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}