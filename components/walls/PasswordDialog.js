import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const PasswordDialog = (props) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "123";

  const handleClose = () => {
    props.close();
    setPassword("");
    setError("");
  };

  const handleConfirm = () => {
    if (password === correctPassword) {
      console.log("pass");
      handleClose();
      props.undoCompletion();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle>Password Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the password to undo completion.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordDialog;
