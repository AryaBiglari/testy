import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import RenderTrailerDetails from "./RenderTrailerDetails.js";
import DialogContent from "@mui/material/DialogContent";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: "84%",
    maxWidth: "84%",
    minHeight: "94vh",
  },
  "& .css-uhb5lp": {
    minWidth: "84%",
    maxWidth: "84%",
    minHeight: "98vh",
  },
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

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  subheader: {
    fontSize: 12,
    fontWeight: 900,
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: 100,
    margin: 2,
  },
  pdf: {},
});

// Create Document Component
const TrailerDetailsPDF = (props) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text
        style={styles.title}
      >{`${props.trailerType} | WO: ${props.workOrder} | Customer: ${props.customer}`}</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.subheader}>General Configurations</Text>
          <Text style={styles.text}>Trailer: {props.trailerType}</Text>
          <Text style={styles.text}>Work Order: {props.workOrder}</Text>
          <Text style={styles.text}>Customer: {props.customer}</Text>
          <Text style={styles.text}>Future Jig: {props.futureJig}</Text>
          <Text style={styles.text}>
            Jig Modification Requirment:{" "}
            {props?.jigReq !== "Special"
              ? " Standard"
              : ` ${props?.specialJigReq}`}
          </Text>
          <Text style={styles.text}>Vin Number: {props.vinNumber}</Text>
          <Text style={styles.subheader}>Trailer Dimensions and Slopes</Text>
          <Text style={styles.text}>
            Sidewalls Length:{" "}
            {props.trailerLenght !== "Standard"
              ? ` (${props.specialTrailerLength}")`
              : "Standard"}
          </Text>
          <Text style={styles.text}>
            Sidewalls Height:{" "}
            {props.trailerWallHeight !== "Standard"
              ? ` (${props.specialTrailerWallHeight}")`
              : "Standard"}
          </Text>
          <Text style={styles.text}>
            Front Slope:{" "}
            {props.frontSlope !== "Standard"
              ? ` (${props.specialTrailerFrontSlope}")`
              : "Standard"}
          </Text>
          <Text style={styles.text}>
            Rear Slope:{" "}
            {props.rearSlope !== "Standard"
              ? ` (${props.specialTrailerRearSlope}")`
              : "Standard"}
          </Text>
          <Text style={styles.subheader}>Tarps</Text>
          <Text style={styles.text}>
            Tarps Opening:{" "}
            {props.customElectricTarpOpener || props.electricTarpOpener}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheader}>Chutes</Text>
          <Text style={styles.text}>
            Hopper Ground Clearance: {props.hoppersType}
          </Text>
          <Text style={styles.text}>Hopper Door Size: {props.doorSize}</Text>
          <Text style={styles.text}>
            Front Door Opens Towards: {props.frontDoorOpens}
          </Text>
          {props.trailerType === "Tri 61' 3 Hoppers" && (
            <Text style={styles.text}>
              Middle Door Opens Towards: {props.midDoorOpens}
            </Text>
          )}
          <Text style={styles.text}>
            Rear Door Opens Towards: {props.rearDoorOpens}
          </Text>
          <Text style={styles.text}>
            Chute Opener: {props.customChuteOpener || props.chuteOpener}
          </Text>
          <Text style={styles.text}>Chute Locks: {props.chuteLocks}</Text>
          <Text style={styles.text}>
            Hammer Hit Brackets: {props.hammerHits}
          </Text>
          <Text style={styles.text}>Doors Opener: {props.doorsOpening}</Text>
          <Text style={styles.subheader}>Axle/Breaking</Text>
          <Text style={styles.text}>Lift Axle: {props.liftAxle}</Text>
          <Text style={styles.text}>
            Axle Type: {props.customAxleType || props.axleType}
          </Text>
          <Text style={styles.subheader}>Tires/Rims</Text>
          <Text style={styles.text}>
            Tires Type: {props.customTires || props.tires}
          </Text>
          <Text style={styles.text}>
            Rims Type: {props.customRims || props.rims}
          </Text>
          <Text style={styles.subheader}>Fenders</Text>
          <Text style={styles.text}>Fenders Type: {props.fendersType}</Text>
          <Text style={styles.text}>
            Mud Flaps: {props.customMudFlaps || props.mudFlaps}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheader}>Lighting Configuration</Text>
          <Text style={styles.text}>Side Lights: {props.sideLights}</Text>
          <Text style={styles.text}>W Lights: {props.wLights}</Text>
          <Text style={styles.text}>
            Slopes Underglow: {props.slopesUnderglow}
          </Text>
          <Text style={styles.text}>
            Hoppers Underglow: {props.hoppersUnderglow}
          </Text>
          <Text style={styles.text}>
            Interior Lights: {props.interiorLights}
          </Text>
          <Text style={styles.text}>Unload Lights: {props.unloadLights}</Text>
          <Text style={styles.subheader}>Interior Steps</Text>
          <Text style={styles.text}>Interior Steps: {props.interiorSteps}</Text>
          {props.trailerType !== "Lead" && (
            <>
              <Text style={styles.subheader}>Customer Logo</Text>
              <Text style={styles.text}>
                Customer Logo on Rear: {props.rearCustomerLogo}
              </Text>
            </>
          )}
          <Text style={styles.subheader}>Other</Text>
          <Text style={styles.text}>Air Inflation: {props.airInflation}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.subheader}>Trailer Special Requirements</Text>
        <Text style={styles.text}>{props.notes}</Text>
      </View>
    </Page>
  </Document>
);

const DownloadButton = (props) => (
  <PDFDownloadLink
    document={<TrailerDetailsPDF {...props.currentTrailer} />}
    fileName={`${props.currentTrailer?.trailerType}-WO${props.currentTrailer?.workOrder}--${props.currentTrailer?.customer}`}
    style={{}}
  >
    <Button
      variant="outlined"
      sx={
        {
          // left: 1350,
          // top: -55,
          // color: (theme) => theme.palette.grey[500],
        }
      }
    >
      Download PDF
    </Button>
  </PDFDownloadLink>
);

const RenderPartsLists = (props) => {
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.openDetails}
        onClose={props.handleCloseDetails} // Added onClose prop here
      >
        <DialogTitle
          sx={{ m: 0, p: 2, display: "flex", justifyContent: "center" }}
          id="customized-dialog-title"
        >
          <Typography sx={{ fontSize: "1.4rem", fontWeight: "600", mr: 8 }}>
            {props.currentTrailer?.trailerType} | WO:{" "}
            {props.currentTrailer?.workOrder} | Customer:{" "}
            {props.currentTrailer?.customer}
          </Typography>
          <DownloadButton currentTrailer={props.currentTrailer} />
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={props.handleCloseDetails}
          
          sx={{
            position: "absolute",
            right: 8,
            width: 55,
            height: 55,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <RenderTrailerDetails
            trailerType={props.currentTrailer?.trailerType}
            notes={props.currentTrailer?.notes}
            workOrder={props.currentTrailer?.workOrder}
            futureJig={props.currentTrailer?.futureJig}
            jigReq={props.currentTrailer?.jigReq}
            specialJigReq={props.currentTrailer?.specialJigReq}
            vinNumber={props.currentTrailer?.vinNumber}
            customer={props.currentTrailer?.customer}
            dateRequired={props.currentTrailer?.dateRequired}
            tires={props.currentTrailer?.tires}
            isCustomTires={props.currentTrailer?.isCustomTires}
            customTires={props.currentTrailer?.customTires}
            rims={props.currentTrailer?.rims}
            isCustomRims={props.currentTrailer?.isCustomRims}
            customRims={props.currentTrailer?.customRims}
            fendersType={props.currentTrailer?.fendersType}
            airInflation={props.currentTrailer?.airInflation}
            liftAxle={props.currentTrailer?.liftAxle}
            axleType={props.currentTrailer?.axleType}
            isCustomAxleType={props.currentTrailer?.isCustomAxleType}
            customAxleType={props.currentTrailer?.customAxleType}
            mudFlaps={props.currentTrailer?.mudFlaps}
            isCustomMudFlaps={props.currentTrailer?.isCustomMudFlaps}
            customMudFlaps={props.currentTrailer?.customMudFlaps}
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
            chuteOpener={props.currentTrailer?.chuteOpener}
            isCustomChuteOpener={props.currentTrailer?.isCustomChuteOpener}
            customChuteOpener={props.currentTrailer?.customChuteOpener}
            chuteLocks={props.currentTrailer?.chuteLocks}
            hammerHits={props.currentTrailer?.hammerHits}
            doorsOpening={props.currentTrailer?.doorsOpening}
            electricTarpOpener={props.currentTrailer?.electricTarpOpener}
            isCustomElectricTarpOpener={
              props.currentTrailer?.isCustomElectricTarpOpener
            }
            customElectricTarpOpener={
              props.currentTrailer?.customElectricTarpOpener
            }
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default RenderPartsLists;
