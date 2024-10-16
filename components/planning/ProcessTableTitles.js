import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ProcessTableTitles(props) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        // bgcolor: "blue",
        mt: 0,
        pl: 2,
      }}
    >
      <Box
        id="process-name"
        sx={{
          width: "15rem",
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
          //   bgcolor: "red",
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Process
        </Typography>
      </Box>
      <Box
        id="process-status"
        sx={{
          width: "8rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
          //   bgcolor: "red",
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Status
        </Typography>
      </Box>
      <Box
        id="process-start"
        sx={{
          width: "18rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Start
        </Typography>
      </Box>

      <Box
        id="process-end"
        sx={{
          width: "18rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          End
        </Typography>
      </Box>

      <Box
        id="process-end"
        sx={{
          width: "5rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Lead T
        </Typography>
      </Box>
      <Box
        id="process-end"
        sx={{
          width: "8rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Required
        </Typography>
      </Box>
      <Box
        id="process-end"
        sx={{
          width: "2rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
          // bgcolor: "red",
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Dif
        </Typography>
      </Box>
    </Box>
  );
}
