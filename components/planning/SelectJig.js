"use client";
import * as React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SelectJig(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        zIndex: 1,
        height: "2.1rem",
        mb: 2,
        // bgcolor: "red",
      }}
    >
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          //   px: "0.6rem",
          borderColor: "var(--primary)",
          borderRadius: "0rem",
          // fontSize: "10px",
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
          bgcolor: props.showJig === "1" ? "var(--primary)" : "white",
          color: props.showJig === "1" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowJig("1")}
      >
        Jig 1
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          borderRadius: "0rem",
          //   px: "0.6rem",
          borderLeft: "none",
          // fontSize: "10px",
          borderColor: "var(--primary)",
          bgcolor: props.showJig === "2" ? "var(--primary)" : "white",
          color: props.showJig === "2" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
          },
        }}
        onClick={() => props.handleShowJig("2")}
      >
        Jig 2
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          borderRadius: "0rem",
          //   px: "0.6rem",
          borderLeft: "none",
          // fontSize: "10px",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showJig === "3" ? "var(--primary)" : "white",
          color: props.showJig === "3" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowJig("3")}
      >
        Jig 3
      </Button>

      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          borderRadius: "0rem",
          //   px: "0.6rem",
          // borderLeft: "none",
          borderRight: "none",
          // fontSize: "10px",
          borderColor: "var(--primary)",
          bgcolor: props.showJig === "TBD" ? "var(--primary)" : "white",
          color: props.showJig === "TBD" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowJig("TBD")}
      >
        TBD
      </Button>

      <Button
        variant="outlined"
        sx={{
          borderRadius: "0rem",
          //   px: "0.6rem",
          borderColor: "var(--primary)",
          // fontSize: "10px",
          //   minWidth: "unset",
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          bgcolor: props.showJig === "all" ? "var(--primary)" : "white",
          color: props.showJig === "all" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowJig("all")}
      >
        All
      </Button>
    </Box>
  );
}
