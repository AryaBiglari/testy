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
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={props.handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        // onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDrawings}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {true
            ? `Drawings for the ${props.wallType}`
            : `Planos para ${props.wallType}`}
          {/* {props.trailer.wallType} */}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            props.handleOpenDrawings(false);
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
  {props.trailer.walls?.length > 0 &&
    props.trailer.walls
      .find((wall) => wall?.wallType === props.wallType)
      ?.wallDrawings?.map((img, index) => (
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
            alt="Picture of the author"
          />
        </Box>
      ))}
</DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}
