import * as React from "react";
import {
  Button,
  Box,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "80%",
    maxWidth: "38rem",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SubmitDialog(props) {
  return (
    <BootstrapDialog
      onClose={props.handleCloseSubmitDialog}
      aria-labelledby="customized-dialog-title"
      open={props.openSubmitDialog}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, pl: 4, pr: 4 }}
        id="customized-dialog-title"
      >
        Are you sure you want to submit the inspection data?
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleCloseSubmitDialog}
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
            onChange={props.handleCommentsChange}
            value={props.comments}
            fullWidth
            label="Additional Comments"
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
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                props.handleSubmit();
              }}
              variant="contained"
              disabled={props.isSubmitting}
            >
              {props.isSubmitting && (
                <Box
                  sx={{
                    width: "4rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: "-4rem",
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
              SUBMIT
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
