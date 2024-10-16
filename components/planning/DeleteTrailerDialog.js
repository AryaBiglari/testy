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
import CircularProgress from "@mui/material/CircularProgress";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  zIndex: "100000000000000000000000000000000000000000000000000000",
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    // bgcolor: "red",
    minWidth: "40%",
    maxWidth: "40%",

    minHeight: "14rem",
    // display: "unset",
  },
  "& .css-uhb5lp": {
    // bgcolor: "red",
    minWidth: "40%",
    maxWidth: "40%",
    minHeight: "14rem",
    // display: "unset",
  },
  "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
    {
      minWidth: "40%",
      maxWidth: "40%",

      minHeight: "14rem",
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

export default function DeleteTrailerDialog(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  //   console.log(props.currentPartData.part);

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={props.handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        // onClose={props.handleCloseDeletePart}
        aria-labelledby="customized-dialog-title"
        open={props.openDeletePart}
        // open={props.openDrawings}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Are you sure you want to delete this trailer?
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleCloseDeletePart}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: 5,
              //   minHeight: "39rem",
              //   bgcolor: "red",
            }}
          >
            <FormControl
              sx={{ width: "9rem", mr: 6 }}
              variant="outlined"
              size="small"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChangePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {props.isDeletingPart && (
              <CircularProgress
                size={35}
                thickness={4}
                sx={{
                  color: "primary",
                  mr: 2,
                }}
              />
            )}
            <Button
              variant="contained"
              disabled={!password}
              onClick={() => props.handleDeletePart(props.currentID, password)}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
