import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function RenderTrailerDetails(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // bgcolor: "red",
      }}
    >
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "600", mb: 2 }}>
        Trailer Specs
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: "33.3%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            pl: 2,
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
            General Configurations
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Trailer: {props.trailerType}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Work Order: {props.workOrder}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Customer: {props?.customer}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Future Jig: {props?.futureJig}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Jig Modification Requirment:
            {props?.jigReq !== "Special"
              ? " Standard"
              : ` ${props?.specialJigReq}`}
          </Typography>
          {/* <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Completion Date:{" "}
            {new Date(props.dateRequired).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </Typography> */}
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Vin Number: {props?.vinNumber}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
            Trailer Dimensions and Slopes
          </Typography>

          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Sidewalls Length: {props.trailerLenght}
            {props.trailerLenght !== "Standard"
              ? ` (${props.specialTrailerLength}")`
              : ""}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Sidewalls Height: {props.trailerWallHeight}
            {props.trailerWallHeight !== "Standard"
              ? ` (${props.specialTrailerWallHeight}")`
              : ""}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Front Slope: {props.frontSlope}
            {props.frontSlope !== "Standard"
              ? ` (${props.specialTrailerFrontSlope})`
              : ""}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Rear Slope: {props.rearSlope}
            {props.rearSlope !== "Standard"
              ? ` (${props.specialTrailerRearSlope})`
              : ""}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
            Tarps
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Tarps Opening:{" "}
            {props?.customElectricTarpOpener || props?.electricTarpOpener}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "33.3%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
            Chutes
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Hopper Ground Clearance: {props.hoppersType}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Hopper Door Size: {props.doorSize}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Front Door Opens Towards: {props.frontDoorOpens}
          </Typography>
          {props.trailerType === "Tri 61' 3 Hoppers" && (
            <Typography sx={{ fontSize: "1rem", mt: 1 }}>
              Middle Door Opens Towards: {props.midDoorOpens}
            </Typography>
          )}
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Rear Door Opens Towards: {props.rearDoorOpens}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Chute Opener: {props?.customChuteOpener || props?.chuteOpener}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Chute Locks: {props.chuteLocks}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Hammer Hit Brackets: {props.hammerHits}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Doors Opener: {props.doorsOpening}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
            Axle/Breaking
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Lift Axle: {props.liftAxle}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Axle Type:{" "}
            {props?.isCustomAxleType ? props?.customAxleType : props?.axleType}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
            Tires/Rims
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Tires Type: {props?.customTires || props?.tires}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Rims Type: {props?.customRims || props?.rims}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
            Fenders
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Fenders Type: {props.fendersType}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Mud Flaps:{" "}
            {props?.isCustomMudFlaps ? props?.customMudFlaps : props?.mudFlaps}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "33.3%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 0 }}>
            Lighting Configuration
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Side Lights: {props.sideLights}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            W Lights: {props.wLights}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Slopes Underglow: {props.slopesUnderglow}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Hoppers Underglow: {props.hoppersUnderglow}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Interior Lights: {props.interiorLights}
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Unload Lights: {props.unloadLights}
          </Typography>

          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
            Interior Steps
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Interior Steps: {props.interiorSteps}
          </Typography>
          {props.trailerType !== "Lead" && (
            <>
              <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
                Customer Logo
              </Typography>
              <Typography sx={{ fontSize: "1rem", mt: 1 }}>
                Customer Logo on Rear: {props.rearCustomerLogo}
              </Typography>
            </>
          )}
          <Typography sx={{ fontSize: "1rem", fontWeight: "600", mt: 3 }}>
            Other
          </Typography>
          <Typography sx={{ fontSize: "1rem", mt: 1 }}>
            Air Inflation: {props.airInflation}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          alignSelf: "flex-start",
          width: "100%",
          pl: 2,
          mt: 4,
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600", mb: 2 }}>
          Trailer Special Requirements
        </Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>{props?.notes}</Typography>
      </Box>
    </Box>
  );
}
