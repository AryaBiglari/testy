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
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "40%",
    maxWidth: "40%",
    minHeight: "14rem",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function OnShapeInformationDialog(props) {
  const [partName, setPartName] = React.useState("");
  const [partUrl, setPartUrl] = React.useState("");

  const handleSave = () => {
    props.onSave(partName, partUrl, props.row);
  };

  React.useEffect(() => {
    setPartName(props.row?.onshapeName || "");
    setPartUrl(props.row?.onshapeURL || "");
  }, [props.open, props.part]);

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          OnShape Part Information
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.onClose}
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
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 2,
            }}
          >
            <FormControl variant="outlined" size="small">
              <TextField
                label="Part Name"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
              />
            </FormControl>
            <FormControl variant="outlined" size="small">
              <TextField
                label="Part URL"
                value={partUrl}
                onChange={(e) => setPartUrl(e.target.value)}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!partName || !partUrl}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
