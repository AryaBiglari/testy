// "use client";
import * as React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Component Imports
import ActiveInspectionLists from "../../components/QC/ActiveInspectionLists.js";
import QualityCheckReports from "../../components/QC/QualityCheckReports.js";
import checkpointsData from "../../lib/checkpointsData.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const featureNames = [
  "Air Inflation",
  "Electric Tarp Opening",
  "Paint",
  "Electric Doors Opening",
  "28 extra lights",
  "52 extra lights",
  "Dual door locks",
  "Lift Axle",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip(props) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let selectedValues = typeof value === "string" ? value.split(",") : value;
    console.log(selectedValues);
    console.log(event.target.value);
    if (
      (selectedValues[selectedValues.length - 1] === "52 extra lights" &&
        selectedValues.includes("28 extra lights")) ||
      (selectedValues[selectedValues.length - 1] === "28 extra lights" &&
        selectedValues.includes("52 extra lights"))
    ) {
      selectedValues.pop();
    }
    console.log(selectedValues);
    props.handleSetOptionalFeaturesName(selectedValues);
    props.handleOptionalFeatures(selectedValues);
    props.handleSetOptionalFeaturesName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    props.handleOptionalFeatures(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Optional Features</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.optionalFeaturesName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Optional Features"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {featureNames.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.optionalFeaturesName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default function Page() {
  const [optionalFeaturesName, setOptionalFeaturesName] = React.useState([]);

  const handleSetOptionalFeaturesName = (state) => {
    setOptionalFeaturesName(state);
  };

  const [openCreatedListAlert, setOpenCreatedListAlert] = React.useState(false);
  const [openDeletedListAlert, setOpenDeletedListAlert] = React.useState(false);
  const [optionalFeatures, setOptionalFeatures] = React.useState(false);

  const handleOptionalFeatures = (state) => {
    console.log(state);
    setOptionalFeatures(state);
  };

  const handleOpenDeletedListAlert = () => {
    // console.log(list);
    setOpenDeletedListAlert(true);
  };

  const [createListOpen, setCreateListOpen] = React.useState(false);
  const [activeInspectionLists, setActiveInspectionLists] =
    React.useState(null);
  const handleActiveInspectionLists = (list) => {
    // console.log(list);
    setActiveInspectionLists(list);
  };

  const [qualityCheckReports, setQualityCheckReports] = React.useState(null);

  const handleQualityCheckReports = (list) => {
    // console.log(list);
    setQualityCheckReports(list);
  };

  // console.log(activeInspectionLists);
  //study - start
  // QCCheckpoints[0].SubSectionList.forEach((subSection) => {
  //   subSection.CheckpointList?.forEach((checkpoint) => {
  //     picturesforCurrentWorkOrder.find(
  //       (deviation) => deviation.checkID === checkpoint.CheckpointID
  //     );
  //   });
  // });
  //study - end

  const [workOrder, setWorkOrder] = React.useState("");
  // console.log(checkPointsData);
  // const [checkPoints, setCheckPoints] = React.useState();

  const [createListIsLoading, setCreateListIsLoading] = React.useState(false);

  // console.log(inspectionsList);

  const [inspectorName, setInspectorName] = React.useState("");

  const handleInspectorName = (event) => {
    setInspectorName(event.target.value);
  };

  const handleWorkOrder = (event) => {
    setWorkOrder(event.target.value);
    // console.log(+workOrder);
  };

  const [trailerType, setTrailerType] = React.useState("");
  // console.log(trailerType);
  const handleTrailerTypeChange = (event) => {
    setTrailerType(event.target.value);
    // console.log(event.target.value);
  };
  const [tires, setTires] = React.useState("");
  const handleTiresChange = (event) => {
    setTires(event.target.value);
  };
  const [doorsOpeningDirection, setDoorsOpeningDirection] = React.useState("");
  const handleDoorsOpeningDirectionChange = (event) => {
    setDoorsOpeningDirection(event.target.value);
  };
  const [fendersType, setFendersType] = React.useState("");
  const handleFendersTypeChange = (event) => {
    setFendersType(event.target.value);
  };
  const [airInflation, setAirInflation] = React.useState("");
  const handleAirInflationChange = (event) => {
    setAirInflation(event.target.value);
  };
  const [lightingConfig, setLightingConfig] = React.useState("");
  const handleLightingConfigChange = (event) => {
    setLightingConfig(event.target.value);
  };
  const [electricTarpOpener, setElectricTarpOpener] = React.useState("");
  const handleElectricTarpOpenerChange = (event) => {
    setElectricTarpOpener(event.target.value);
  };

  // !!electricTarpOpener;

  // const [trailerType, setTrailerType] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      setOpenCreatedListAlert(false);
    }, 5000);
  }, [createListOpen]);
  React.useEffect(() => {
    setTimeout(() => {
      setOpenDeletedListAlert(false);
    }, 5000);
  }, [openDeletedListAlert === true]);

  async function handleCreateInspectionList() {
    setCreateListIsLoading(true);
    if (optionalFeatures.includes("52 extra lights")) {
      optionalFeatures.push("28 extra lights");
    }
    const check = checkpointsData;
    const response = await fetch("/api/create-inspection-list", {
      method: "POST",
      body: JSON.stringify({
        inspectorName,
        workOrder,
        trailerType,
        tires,
        doorsOpeningDirection,
        fendersType,
        optionalFeatures: optionalFeatures,
        active: true,
        check,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setCreateListOpen(false);
      setCreateListIsLoading(false);
      setOpenCreatedListAlert(true);
      handleActiveListsOpen(true);
      // console.log(response.ok);
      // setInspectionsList(true);

      setWorkOrder("");
      setInspectorName("");
      // setTrailerType("");
      setDoorsOpeningDirection("");
      setTires("");
      setFendersType("");
      setAirInflation("");
      setLightingConfig("");
      setElectricTarpOpener("");
      // setOptionalFeatures([]);
      handleSetOptionalFeaturesName([]);
    }
  }

  const [showActiveListsOpen, setShowActiveListsOpen] = React.useState(false);
  const [savedInspectionProgress, setSavedInspectionProgress] =
    React.useState(null);

  // console.log(savedInspectionProgress);

  const handleActiveListsOpen = (state) => {
    setShowActiveListsOpen(state);
  };

  // get inspection list - start
  React.useEffect(() => {
    // setIsLoading(true);
    async function getInspectionsListsHandler() {
      const response = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong, please try again");
      }
      const data = await response.json();
      console.log(data);

      // setInspectionsList(true);
      setActiveInspectionLists(
        data.filter((trailer) => trailer?.qualityInspection?.active === true)
      );

      setQualityCheckReports(
        data.filter((trailer) => trailer?.qualityInspection?.active === false)
      );

      // console.log(data.workOrder);
      setWorkOrder(data?.workOrder ? data?.workOrder : "");
      setOptionalFeatures(
        data?.qualityInspection?.optionalFeatures
          ? data?.qualityInspection.optionalFeatures
          : []
      );
      setInspectorName(
        data?.qualityInspection?.inspectorName
          ? data?.qualityInspection.inspectorName
          : ""
      );
      setTrailerType(data?.trailerType ? data?.trailerType : "");
      setDoorsOpeningDirection(
        data?.qualityInspection?.doorsOpeningDirection
          ? data?.qualityInspection.doorsOpeningDirection
          : ""
      );
      setTires(
        data?.qualityInspection?.tires ? data?.qualityInspection.tires : ""
      );
      setFendersType(
        data?.qualityInspection?.fendersType
          ? data?.qualityInspection.fendersType
          : ""
      );
      setAirInflation(
        data?.qualityInspection?.airInflation
          ? data?.qualityInspection.airInflation
          : ""
      );
      setLightingConfig(
        data?.qualityInspection?.lightingConfig
          ? data?.qualityInspection.lightingConfig
          : ""
      );
      setElectricTarpOpener(
        data?.qualityInspection?.electricTarpOpener
          ? data?.qualityInspection.electricTarpOpener
          : ""
      );
      setSavedInspectionProgress(
        data?.qualityInspection?.inspectionProgress
          ? data?.qualityInspection.inspectionProgress
          : ""
      );

      // console.log(data.filter((trailer) => trailer.WONumber === 123903254)[0]);

      // setIsLoading(false);
    }
    const onPageLoad = () => {
      try {
        getInspectionsListsHandler().then((response) => {});
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
  }, [openCreatedListAlert]);
  // get inspection list - end

  // console.log(activeInspectionLists);

  const allFieldsCompleted =
    !!inspectorName &&
    !!workOrder &&
    !!trailerType &&
    !!tires &&
    !!fendersType &&
    !!doorsOpeningDirection;

  return (
    <Box
      sx={{
        // maxHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // pl: 4,
        pb: 40,
        bgcolor: "white",
        pl: 2,
        pr: 2,
        // position: "relative",
        // position: "relative",
        bgcolor: "white",
        color: "black",
      }}
    >
      <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: "1" }}>
        <Collapse in={openCreatedListAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenCreatedListAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            The new Inspection List has been created
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: "1" }}>
        <Collapse in={openDeletedListAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenDeletedListAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            The Inspection List has been deleted
          </Alert>
        </Collapse>
      </Box>
      {/* Create Quality List Section */}
      {/* <Box
        onClick={() => !createListOpen && setCreateListOpen(!createListOpen)}
        sx={{
          // bgcolor: "green",
          maxWidth: "50rem",
          minWidth: "44rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          maxHeight: createListOpen ? "100%" : "6rem",
          overflow: "hidden",
          pb: 3,
          border: "var(--mainBorder)",
          borderRadius: "0.5rem",
          mt: 4,
          "&:hover": {
            cursor: !createListOpen ? "pointer" : "",
          },
        }}
      >
        <Box
          sx={{
            // bgcolor: "red",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // minWidth: "30rem",
          }}
        >
          <Box sx={{ width: "100%", pl: 3 }}>
            <Typography sx={{ fontSize: "2rem", mt: 2 }}>
              Create Quality Check List
            </Typography>
          </Box>
          <IconButton
            onClick={() => setCreateListOpen(!createListOpen)}
            sx={{ ml: 6, mt: 3, mr: 1 }}
          >
            {createListOpen ? (
              <KeyboardArrowUpIcon sx={{ fontSize: "2.8rem" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: "2.8rem" }} />
            )}
          </IconButton>
        </Box>

        <Box sx={{ width: "100%", maxWidth: "30rem", mt: 4 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Inspector Name"
            variant="outlined"
            // type="number"
            value={inspectorName}
            onChange={handleInspectorName}
          />
        </Box>

        <Box sx={{ maxWidth: "30rem", mt: 4, width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="trailer-type-label">Trailer Type</InputLabel>
            <Select
              labelId="trailer-type-label"
              id="trailer-type"
              value={trailerType}
              label="Trailer Type"
              onChange={handleTrailerTypeChange}
            >
              <MenuItem value={"Lead"}>Lead</MenuItem>
              <MenuItem value={"Pup"}>Pup</MenuItem>
              <MenuItem value={"Tri 61' 2 Hoppers"}>Tri 61' 2 Hoppers</MenuItem>
              <MenuItem value={"Tri 61' 3 Hoppers"}>Tri 61' 3 Hoppers</MenuItem>
              <MenuItem value={"Tri 72' 2 Hoppers"}>Tri 72' 2 Hoppers</MenuItem>
              <MenuItem value={"Tandem"}>Tandem</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "100%", maxWidth: "30rem", mt: 4 }}>
          <TextField
            fullWidth
            id="outlined-basic1"
            label="Work Order"
            variant="outlined"
            // type="number"
            value={workOrder}
            onChange={handleWorkOrder}
          />
        </Box>
        <Box sx={{ maxWidth: "30rem", mt: 4, width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="tires-type-label">Tires Type</InputLabel>
            <Select
              labelId="tires-type-label"
              id="tires-type"
              value={tires}
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
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ maxWidth: "30rem", mt: 4, width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="fenders-type-label">Fenders Type</InputLabel>
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
        <Box sx={{ maxWidth: "30rem", mt: 4, width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="doors-type-label">
              Doors Opening Direction
            </InputLabel>
            <Select
              labelId="doors-type-label"
              id="doors-type"
              value={doorsOpeningDirection}
              label="Doors Opening Direction"
              onChange={handleDoorsOpeningDirectionChange}
            >
              <MenuItem value={"Doors Open Outwards"}>
                Doors Open Outwards
              </MenuItem>
              <MenuItem value={"Doors Open Inwards"}>
                Doors Open Inwards
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "100%", maxWidth: "30rem", mt: 4 }}>
          <MultipleSelectChip
            handleOptionalFeatures={handleOptionalFeatures}
            optionalFeaturesName={optionalFeaturesName}
            handleSetOptionalFeaturesName={handleSetOptionalFeaturesName}
          />
        </Box>
       
        <Box
          sx={{
            maxWidth: "30rem",
            width: "100%",
            // height: "100%",
            // bgcolor: "blue",
            // position: "absolute",
            // right: "22rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            mb: 1,
          }}
        >
          <Button
            // disabled={!allFieldsCompleted}
            disabled={true}
            variant="contained"
            onClick={() => handleCreateInspectionList()}
            sx={{ minWidth: "100%", height: "3rem" }}
          >
            {createListIsLoading && (
              <Box
                sx={{
                  width: "4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // bgcolor: "red",
                  ml: "-4.5rem",
                  mr: "0.5rem",
                }}
              >
                <CircularProgress
                  size={30}
                  thickness={4}
                  sx={{
                    color: "white",
                  }}
                />
              </Box>
            )}
            Create Inspection List
          </Button>
        </Box>
      </Box> */}
      {/* End of Create Quality List Section*/}

      {/* List of current active inspections */}
      <ActiveInspectionLists
        savedInspectionProgress={savedInspectionProgress}
        trailersList={activeInspectionLists}
        handleActiveInspectionLists={handleActiveInspectionLists}
        showActiveListsOpen={showActiveListsOpen}
        handleActiveListsOpen={handleActiveListsOpen}
        // openCreatedListAlert={openCreatedListAlert}
        handleOpenDeletedListAlert={handleOpenDeletedListAlert}
      />

      {/* List of Quality Check Reports */}
      <QualityCheckReports
        qualityCheckReports={qualityCheckReports}
        handleQualityCheckReports={handleQualityCheckReports}
      />
    </Box>
  );

  // if (inspectionsList) {
  //   return (
  //     <InspectionList
  //       comments={comments}
  //       handleComments={handleComments}
  //       deviationType={deviationType}
  //       handleDeviationType={handleDeviationType}
  //       deviationData={deviationData}
  //       handlePicturesforCurrentWorkOrder={handlePicturesforCurrentWorkOrder}
  //       openComments={openComments}
  //       handleCloseComments={handleCloseComments}
  //       openCommentID={openCommentID}
  //       picturesforCurrentWorkOrder={picturesforCurrentWorkOrder}
  //       previewImage={previewImage}
  //       handleSelectImage={handleSelectImage}
  //       isLoadingImg={isLoadingImg}
  //       handleImgLoading={handleImgLoading}
  //       workOrder={workOrder}
  //       disableSendReport={disableSendReport}
  //       sendReport={sendReport}
  //       sectionIncludesThisTrailer={sectionIncludesThisTrailer}
  //       sectionsConditionalRender={sectionsConditionalRender}
  //       showSectionHandler={showSectionHandler}
  //       openedSectionIndex={openedSectionIndex}
  //       showSection={showSection}
  //       handleCheckStateChange={handleCheckStateChange}
  //       trailerType={trailerType}
  //       handleClickOpenComments={handleClickOpenComments}
  //     />
  //   );
  // }
}
