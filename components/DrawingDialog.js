import * as React from "react";
import Image from "next/image";

// MUI Imports
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    // bgcolor: "red",
    minWidth: "70%",
    maxWidth: "unset",
    minHeight: "90vh",
    // display: "unset",
  },
  "& .css-uhb5lp": {
    // bgcolor: "red",
    minWidth: "70%",
    minHeight: "90vh",
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
    // minWidth: "300rem",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
  // console.log(props.row?.wallDrawings);

  const imgArr = [
    "/images/pup/1301-PUP-1.png",
    "/images/pup/1301-PUP-1.png",
    "/images/pup/1301-PUP-1.png",
    "/images/pup/1302-PUP-1.png",
  ];

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={props.handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDrawings}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {props.eng
            ? `Drawings for the Wall: ${props.row.wallName}`
            : `Planos para la Pared: ${props.row.wallName}`}
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
          {/* <Typography gutterBottom>
            {props.eng
              ? "Drawings will be uploaded soon"
              : "Los planos estarán disponibles a la brevedad"}
          </Typography> */}

          {props.row?.wallDrawings?.map((img, index) => (
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
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={props.handleCloseDrawings}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
