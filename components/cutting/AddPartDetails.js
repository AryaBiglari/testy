import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "90%",
    maxWidth: "62rem",
    minWidth: "38rem",
    height: "27.5rem",
  },
  "& .css-uhb5lp": {
    width: "90%",
    maxWidth: "42rem",
    minWidth: "38rem",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflowY: "auto",
    overflowX: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddPartDialog(props) {
  const [fendersType, setFendersType] = React.useState(
    props.row.fenderType || ""
  );
  const handleFendersTypeChange = (event) => {
    setFendersType(event.target.value);
  };

  const [config, setConfig] = React.useState(props.row.config || "");
  const handleConfigChange = (event) => {
    setConfig(event.target.value);
  };

  const [doors, setDoors] = React.useState(props.row.doors || "");
  const handleDoorsChange = (event) => {
    setDoors(event.target.value);
  };
  const [doorsOpening, setDoorsOpening] = React.useState(
    props.row.doorsOpening || ""
  );
  const handleDoorsOpeningChange = (event) => {
    setDoorsOpening(event.target.value);
  };
  // const [status, setStatus] = React.useState("Up-to-date");
  // const handleStatusChange = (event) => {
  //   setStatus(event.target.value);
  // };
  const [specialData, setSpecialData] = React.useState(
    props.row.specialReq || ""
  );
  const handleSpecialData = (event) => {
    setSpecialData(event.target.value);
  };
  const [liftAxle, setLiftAxle] = React.useState(props.row.liftAxle || "");
  const handleLiftAxle = (event) => {
    setLiftAxle(event.target.value);
  };
  const [airInflation, setAirInflation] = React.useState(
    props.row.airInflation || ""
  );
  const handleAirInflation = (event) => {
    setAirInflation(event.target.value);
  };
  const [doorSize, setDoorSize] = React.useState(props.row.doorSize || "");
  const handleDoorSizeChange = (event) => {
    setDoorSize(event.target.value);
  };

  React.useEffect(() => {
    setFendersType(props.row.fenderType || "");
    setConfig(props.row.config || "");
    setDoors(props.row.doors || "");
    setDoorsOpening(props.row.doorsOpening || "");
    setSpecialData(props.row.specialReq || "");
    setLiftAxle(props.row.liftAxle || "");
    setAirInflation(props.row.airInflation || "");
    setDoorSize(props.row.doorSize || "");
  }, [props.row, props.openComments]);

  const closeDialog = () => {
    props.handleCloseComments();
    setFendersType("");
    setConfig("");
    setDoors("");
    setDoorsOpening("");
    setSpecialData("");
    setLiftAxle("");
    setAirInflation("");
    setDoorSize("");
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={props.handleClickOpen}>
          Open dialog
        </Button> */}
      <BootstrapDialog
        onClose={props.handleCloseComments}
        aria-labelledby="customized-dialog-title"
        open={props.openComments}
        // open={false}
      >
        <DialogTitle sx={{ ml: 1, p: 2 }} id="customized-dialog-title">
          Add Part's Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
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
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 0,
              py: 0,
              mt: 1,
              mb: 2,
              // flexWrap:'wrap',
              // minHeight:'7rem',
              // bgcolor:'red'
            }}
          >
            <Box sx={{ width: "10rem", zIndex: 1, ml: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="config-label">Hopper Panels</InputLabel>
                <Select
                  labelId="config-label"
                  id="config"
                  value={config}
                  label="Hopper Panels"
                  onChange={handleConfigChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    // maxHeight: "2.3rem",

                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Any"}>Any</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Mid"}>Mid</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "14rem", zIndex: 1, ml: 2, mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="doors-type-label">
                  Door Opening Direction
                </InputLabel>
                <Select
                  labelId="doors-type-label"
                  id="doors-type"
                  value={doors}
                  label="Door Opening Direction"
                  onChange={handleDoorsChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    // maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Any"}>Any</MenuItem>
                  <MenuItem value={"In"}>In</MenuItem>
                  <MenuItem value={"Out"}>Out</MenuItem>
                  <MenuItem value={"Forward"}>
                    Forward (Only 3 Hoppers Middle Hopper)
                  </MenuItem>
                  <MenuItem value={"Backwards"}>
                    Backwards (Only 3 Hoppers Middle Hopper)
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "12rem", zIndex: 1, ml: 2, mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="doors-type-label">Door Opening Type</InputLabel>
                <Select
                  labelId="doors-type-label"
                  id="doors-type"
                  value={doorsOpening}
                  label="Door Opening Type"
                  onChange={handleDoorsOpeningChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    // maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Manual"}>Manual</MenuItem>
                  <MenuItem value={"Electric"}>Electric</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: "11rem", zIndex: 1, ml: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="hopper-door-size-label">
                  Hopper Door Size
                </InputLabel>
                <Select
                  labelId="hopper-door-size-label"
                  id="hopper-door-size"
                  value={doorSize}
                  defaultValue="Up-to-date"
                  label="Hopper Door Size"
                  onChange={handleDoorSizeChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    // maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"24x24"}>24x24</MenuItem>
                  <MenuItem value={"22x22"}>22x22</MenuItem>
                  <MenuItem value={"24x19"}>24x19</MenuItem>
                  <MenuItem value={"40x30"}>40x30</MenuItem>
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
              px: 1,
              py: 0,
              mt: 3,
              mb: 2,
              // flexWrap:'wrap',
              // minHeight:'7rem',
              // bgcolor:'red'
            }}
          >
            <Box sx={{ width: "8rem", mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="fenders-type-label">Fenders</InputLabel>
                <Select
                  labelId="fenders-type-label"
                  id="fenders-type"
                  value={fendersType}
                  label="Fenders"
                  onChange={handleFendersTypeChange}
                  sx={{
                    bgcolor: "var(--primary5)",
                    // maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Any"}>Any</MenuItem>
                  <MenuItem value={"Heartland"}>Heartland</MenuItem>
                  <MenuItem value={"Adomar"}>Adomar</MenuItem>
                  <MenuItem value={"Stainless"}>Stainless</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "9rem", mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="fenders-type-label">Lift Axle</InputLabel>
                <Select
                  labelId="fenders-type-label"
                  id="fenders-type"
                  value={liftAxle}
                  label="Lift Axle"
                  onChange={handleLiftAxle}
                  sx={{
                    bgcolor: "var(--primary5)",
                    // maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Lift Axle"}>Lift Axle</MenuItem>
                  <MenuItem value={"No Lift Axle"}>No Lift Axle</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "10rem", mr: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="fenders-type-label">Air Inflation</InputLabel>
                <Select
                  labelId="fenders-type-label"
                  id="fenders-type"
                  value={airInflation}
                  label="Air Inflation"
                  onChange={handleAirInflation}
                  sx={{
                    bgcolor: "var(--primary5)",
                    // maxHeight: "2.3rem",
                    //   "& .MuiOutlinedInput-input": {
                    //     //   bgcolor: "red",
                    //     py: 0,
                    //   },
                  }}
                >
                  <MenuItem value={"Air Inflation"}>Air Inflation</MenuItem>
                  <MenuItem value={"No Air Inflation"}>
                    No Air Inflation
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ padding: 1, mb: 1, mt: 1 }}>
            <TextField
              onChange={handleSpecialData}
              value={specialData}
              fullWidth
              label="Add more details if this is a Special Part"
              id="fullWidth"
              multiline
              minRows={4}
            />
          </Box>

          {/* {props.previewImage && props.isLoading ? (
            <Box
              sx={{
                minWidth: "100%",
                minHeight: "12rem",
                position: "relative",
                // zIndex: "100000",
                // height: "14rem",
                // bgcolor: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                mt: 2,
              }}
            >
              <CircularProgress
                size={50}
                thickness={4}
                sx={{
                  color: "primary",
                }}
              />
            </Box>
          ) : null} */}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              // justifyContent: !props.isLoading ? "flex-start" : "center",
              // minHeight: !props.isLoading ? "unset" : "15rem",
              // height: !props.isLoading ? "unset" : "100%",
              alignItems: "center",
              // bgcolor: "red",
              // pr: 1,
              position: "relative",
              overflow: "visible",
              py: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                props.handleUpdatePartDetails(
                  props.currentID,
                  fendersType,
                  config,
                  doors,
                  doorsOpening,
                  liftAxle,
                  airInflation,
                  doorSize,
                  specialData
                )
              }
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
