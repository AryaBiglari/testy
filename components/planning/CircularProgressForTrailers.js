import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        ml: 0,
      }}
    >
      <CircularProgress
        variant="determinate"
        size={props?.size ? props?.size : "3.6rem"}
        {...props}
        color={props?.value === 100 ? "success" : "primary"}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   bgcolor: "green",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: props?.font ? props?.font : "1.1rem" }}
        >
          {`${Math.round(props?.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel(props) {
  return (
    <CircularProgressWithLabel
      value={props?.value}
      size={props?.size}
      font={props?.font}
    />
  );
}
