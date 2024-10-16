import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  horizontal,
  vertical,
} from "@cloudinary/url-gen/qualifiers/gradientDirection";

export default function Home() {
  const [vin, setVin] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleVinChange = (e) => {
    setVin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (vin) {
      try {
        const response = await fetch(
          `/api/planning/search-trailer-by-vin?vin=${vin}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          console.log("new page");
          window.location.href = `/inspection/${vin}`;
        } else {
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.log(error);
        setOpenSnackbar(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          marginTop: 4,
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Enter VIN Number
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            label="VIN Number"
            variant="outlined"
            value={vin}
            onChange={handleVinChange}
            sx={{
              marginBottom: 2,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid VIN Number
        </Alert>
      </Snackbar>
    </Container>
  );
}
