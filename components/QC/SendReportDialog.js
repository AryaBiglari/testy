import * as React from "react";

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
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "80%",
    maxWidth: "38rem",
    // maxWidth: "unset",
    // minHeight: "50vh",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "hidden",
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

export default function SendReportDialog(props) {
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={props.handleClickOpen}>
          Open dialog
        </Button> */}
      <BootstrapDialog
        onClose={props.handleCloseSendReportDialog}
        aria-labelledby="customized-dialog-title"
        // open={props.openComments}
        open={props.openSendReportDialog}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, pl: 4, pr: 4 }}
          id="customized-dialog-title"
        >
          There are {props.uncheckedCheckpoints} unreviewed checkpoints. Are you
          sure you want to send the report anyways?
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleCloseSendReportDialog}
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
          <Box sx={{ padding: 1, mb: 1 }}>
            <TextField
              onChange={props.handleIncompletedComments}
              value={props.incompletedComments}
              fullWidth
              label="Describe the reasons for sending an incomplete report"
              id="fullWidth"
              multiline
              maxRows={6}
              minRows={3}
            />
          </Box>
          <Box
            sx={{
              padding: 1,
              minWidth: "36rem",
            }}
          >
            <Box
              sx={{
                //   position: "absolute",
                right: "0.5rem",
                display: "flex",
                justifyContent: "center",
                // bgcolor: "blue",
                //   width: "20%",
              }}
            >
              <Button
                onClick={props.sendIncompleteReport}
                variant="contained"
                disabled={!props.incompletedComments}
              >
                {props.isSavingIncompleteReport && (
                  <Box
                    sx={{
                      width: "4rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      left: "-4rem",
                      // bgcolor: "red",
                      // ml: "-4.5rem",
                      //   mr: "0.2rem",
                    }}
                  >
                    <CircularProgress
                      size={30}
                      thickness={4}
                      sx={{
                        color: "primary",
                      }}
                    />
                  </Box>
                )}
                SEND INCOMPLETE REPORT
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
