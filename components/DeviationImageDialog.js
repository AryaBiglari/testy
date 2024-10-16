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
import Image from "next/image";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      // bgcolor: "red",
      minWidth: "80%",
      maxWidth: "unset",
      minHeight: "95vh",
      // display: "unset",
    },
    "& .css-uhb5lp": {
      // bgcolor: "red",
      minWidth: "80%",
      minHeight: "95vh",
      // display: "unset",
    },
    "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
      {
        minWidth: "70%",
        maxWidth: "unset",
        minHeight: "90vh",
      },
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      overflow: "auto",
      minHeight: "80vh",
      // minWidth: "300rem",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));


export default function DeviationImageDialog(props) {
  console.log("props");
  console.log(props);
  if (props.deviation == null) { return;}

        return (
        <React.Fragment>
        {/* <Button variant="outlined" onClick={props.handleClickOpen}>
            Open dialog
        </Button> */}
        <BootstrapDialog
            onClose={props.handleCloseDeviationImageDialog}
            aria-labelledby="customized-dialog-title"
            open={props.openDeviationImageDialog}
        >
            <DialogTitle 
            sx={{ 
              m: 0, 
              p: 2,
              bgcolor: (props.deviation.isCorrection ? "rgba(216, 243, 220, 0.6)" : "rgba(214, 40, 40, 0.3)")
            }} id="customized-dialog-title">
            {`Image of ${props.deviation.isCorrection ? "correction" : "deviation"} for ${props.deviation.checkID}`}
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={props.handleCloseDeviationImageDialog}
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
                padding: 2,
                minWidth: "100%",
                position: "relative",
                minHeight: "90vh",
                // bgcolor: "red",
                }}
            >
                <Image
                src={props.deviation.url}
                style={{ objectFit: "contain" }}
                fill={true}
                // width={500}
                // height={500}
                alt="Deviation Image"
                />
            </Box>
            </DialogContent>
        </BootstrapDialog>
        </React.Fragment>
    );
    }