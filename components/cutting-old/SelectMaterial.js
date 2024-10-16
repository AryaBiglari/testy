"use client";
import * as React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SelectMaterial(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        zIndex: 1,
        mb: props.mode !== "stock" ? 0 : 2,
      }}
    >
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          //   px: "0.6rem",
          borderColor: "var(--primary)",
          borderRadius: "0rem",
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
          bgcolor: props.showMat === "AL" ? "var(--primary)" : "white",
          color: props.showMat === "AL" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowMat("AL")}
      >
        AL
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          borderRadius: "0rem",
          //   px: "0.6rem",
          borderLeft: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showMat === "CS" ? "var(--primary)" : "white",
          color: props.showMat === "CS" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
          },
        }}
        onClick={() => props.handleShowMat("CS")}
      >
        CS
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          borderRadius: "0rem",
          //   px: "0.6rem",
          borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showMat === "SS" ? "var(--primary)" : "white",
          color: props.showMat === "SS" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowMat("SS")}
      >
        SS
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          borderRadius: "0rem",
          //   px: "0.6rem",
          //   borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showMat === "QT100" ? "var(--primary)" : "white",
          color: props.showMat === "QT100" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowMat("QT100")}
      >
        QT100
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "0rem",
          //   px: "0.6rem",
          borderColor: "var(--primary)",
          //   minWidth: "unset",
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          bgcolor: props.showMat === "all" ? "var(--primary)" : "white",
          color: props.showMat === "all" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowMat("all")}
      >
        All
      </Button>
    </Box>
  );
}
