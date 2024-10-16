import * as React from "react";
import Image from "next/image";

// MUI Imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

// import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "90%",
    maxWidth: "42rem",
    minWidth: "38rem",
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

<Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload Picture
  <VisuallyHiddenInput type="file" />
</Button>;

export default function CustomizedDialogs(props) {
  // console.log("happening");
  // console.log(props);
  function onImageLoad() {
    props.handleImgLoading(false);
    // setImageUrl(image.url);
    // console.log("loaded");
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={props.handleClickOpen}>
          Open dialog
        </Button> */}
      <BootstrapDialog
        onClose={props.handleCloseComments}
        aria-labelledby="customized-dialog-title"
        open={props.openComments}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Quality {props.isCorrection ? "Correction" : "Deviation"} for Checkpoint {props.openCommentID}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleCloseComments}
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
          {!(props.isCorrection) && 
            <Box 
            sx={{ 
              padding: 1,}}>
              <FormControl fullWidth>
                <InputLabel id="deviation-label">Deviation Category</InputLabel>
                <Select
                  labelId="deviation-label"
                  id="deviation"
                  value={props.deviationType}
                  label="Deviation Category"
                  onChange={props.handleDeviationType}
                >
                  <MenuItem value={"Welding"}>Welding</MenuItem>
                  <MenuItem value={"Fixings"}>Fixings</MenuItem>
                  <MenuItem value={"Alignments"}>Alignments</MenuItem>
                  <MenuItem value={"Bending"}>Bending</MenuItem>
                  <MenuItem value={"Aesthetic"}>Aesthetic</MenuItem>
                  <MenuItem value={"Others"}>Others</MenuItem>
                </Select>
              </FormControl>
            </Box>
          }
          {!(props.isCorrection) &&
          (<Box 
            sx={{ 
              padding: 1, 
              mb: 1,
              }}
            >
              <TextField
                onChange={props.handleComments}
                value={props.comments}
                fullWidth
                label="Add Description"
                id="fullWidth"
                multiline
                maxRows={6}
              />
          </Box>)}
          <Box
            sx={{
              width: "100%",
              // bgcolor: "red",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {!props.previewImage && (
              <Button
                sx={{ zIndex: 1000000 }}
                onChange={props.handleSelectImage}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {props?.deviationData?.url
                  ? "Select Another Picture"
                  : "Select Picture"}
                <VisuallyHiddenInput type="file" />
              </Button>
            )}

            {props.previewImage && (
              <Button
                sx={{ zIndex: 1000000 }}
                onChange={props.handleSelectImage}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Change Picture
                <VisuallyHiddenInput type="file" />
              </Button>
            )}

            {props.previewImage && (
              <Button
                // sx={{ width: "7rem" }}
                disabled={!props.deviationType}
                onClick={() =>
                  props.handleUploadImage(
                    props.workOrder,
                    props.openCommentID,
                    props.deviationType,
                    props.comments,
                    props.trailerType,
                    props.openCommentSectionName,
                    props.openCommentCheckpointDescription,
                    props.openCommentCheckpointSubSectionDescription,
                    props.isCorrection
                  )
                }
                variant="contained"
              >
                Save
              </Button>
            )}
          </Box>
          {true && (
            <Box
              sx={{
                // width: "100%",
                display: "flex",
                // height: "100%",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "2000000",
                top: "0rem",
              }}
            ></Box>
          )}
          {props.previewImage && !props.isLoading ? (
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
                mb: 2,
                mt: 2,
              }}
            >
              {" "}
              <Image
                style={{ objectFit: "contain" }}
                src={props.previewImage}
                fill={true}
                // width={70}
                // height={70}
                alt="preview-image"
              />{" "}
            </Box>
          ) : null}

          {props.previewImage && props.isLoading ? (
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
          ) : null}
          {/* props?.deviationData?.url && props.isLoadingImg */}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              // justifyContent: !props.isLoading ? "flex-start" : "center",
              // minHeight: !props.isLoading ? "unset" : "15rem",
              // height: !props.isLoading ? "unset" : "100%",
              alignItems: "center",
              // bgcolor: "red",
              // pr: 1,
              position: "relative",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
                // height: "14rem",
                // bgcolor: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <DialogContent dividers /> */}
              {props?.deviationData?.url && (
                <Divider component="" sx={{ mt: 3 }} />
              )}
              {props?.deviationData?.url && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mb: 1,
                    mt: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "1.2rem" }}>
                    Uploaded Pictures
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  minWidth: "100%",
                  // bgcolor: "orange",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {props?.deviationData?.url
                  ? props.picturesforCurrentWorkOrder.map((picture) => {
                      if (picture.checkID === props.openCommentID) {
                        return (
                          <Box
                            key={48 + Math.random()}
                            sx={{
                              width: "17rem",
                              height: "17rem",
                              display: "flex",

                              justifyContent: "flex-start",
                              alignItems: "center",
                              // bgcolor: "blue",
                              position: "relative",
                              ml: 1,
                              mb: 2,
                            }}
                          >
                            <Image
                              style={{ objectFit: "contain" }}
                              src={picture?.url}
                              fill={true}
                              onLoad={onImageLoad}
                              // priority
                              // width={70}
                              // height={70}
                              alt="uploaded-image"
                            />
                          </Box>
                        );
                      }
                    })
                  : null}
              </Box>
            </Box>

            {/* {props.isLoading && (
                <CircularProgress
                  size={50}
                  thickness={4}
                  sx={{
                    color: "primary",
                  }}
                />
              )} */}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
