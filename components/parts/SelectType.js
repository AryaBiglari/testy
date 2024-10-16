"use client";
import * as React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SelectType(props) {
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
          bgcolor: props.showType === "Ready" ? "var(--primary)" : "white",
          color: props.showType === "Ready" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowType("Ready")}
      >
        Ready-to-use
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
          bgcolor: props.showType === "Processed" ? "var(--primary)" : "white",
          color: props.showType === "Processed" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowType("Processed")}
      >
        Processed
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
          bgcolor: props.showType === "Raw" ? "var(--primary)" : "white",
          color: props.showType === "Raw" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowType("Raw")}
      >
        Raw
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
          bgcolor: props.showType === "Consumable" ? "var(--primary)" : "white",
          color: props.showType === "Consumable" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowType("Consumable")}
      >
        Consumable
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
          bgcolor: props.showType === "all" ? "var(--primary)" : "white",
          color: props.showType === "all" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowType("all")}
      >
        All
      </Button>
    </Box>
  );
}
