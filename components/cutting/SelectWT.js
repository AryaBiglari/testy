"use client";
import * as React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SelectWT(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        zIndex: 1,
        ml: 2,
        mr: 1,
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
          bgcolor: props.showWT === "5/8" ? "var(--primary)" : "white",
          color: props.showWT === "5/8" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowWT("5/8")}
      >
        5/8
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          //   px: "0.6rem",
          borderRadius: "0rem",
          borderLeft: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showWT === "1/2" ? "var(--primary)" : "white",
          color: props.showWT === "1/2" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
          },
        }}
        onClick={() => props.handleShowWT("1/2")}
      >
        1/2
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          //   px: "0.6rem",
          borderRadius: "0rem",
          borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showWT === "3/8" ? "var(--primary)" : "white",
          color: props.showWT === "3/8" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowWT("3/8")}
      >
        3/8
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "0rem",
          //   minWidth: "unset",
          //   px: "0.6rem",
          //   borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showWT === "5/16" ? "var(--primary)" : "white",
          color: props.showWT === "5/16" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowWT("5/16")}
      >
        5/16
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "0rem",
          //   minWidth: "unset",
          //   px: "0.6rem",
          //   borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showWT === "1/4" ? "var(--primary)" : "white",
          color: props.showWT === "1/4" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowWT("1/4")}
      >
        1/4
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "0rem",
          //   minWidth: "unset",
          //   px: "0.6rem",
          //   borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showWT === "3/16" ? "var(--primary)" : "white",
          color: props.showWT === "3/16" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowWT("3/16")}
      >
        3/16
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "0rem",
          //   minWidth: "unset",
          //   px: "0.6rem",
          //   borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showWT === "1/8" ? "var(--primary)" : "white",
          color: props.showWT === "1/8" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowWT("1/8")}
      >
        1/8
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "0rem",
          //   minWidth: "unset",
          //   px: "0.6rem",
          //   borderLeft: "none",
          borderRight: "none",
          borderColor: "var(--primary)",
          bgcolor: props.showWT === "0.078" ? "var(--primary)" : "white",
          color: props.showWT === "0.078" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
            // borderLeft: "none",
            borderRight: "none",
          },
        }}
        onClick={() => props.handleShowWT("0.078")}
      >
        .078
      </Button>
      <Button
        variant="outlined"
        sx={{
          //   minWidth: "unset",
          //   px: "0.6rem",
          borderRadius: "0rem",
          borderColor: "var(--primary)",
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          bgcolor: props.showWT === "all" ? "var(--primary)" : "white",
          color: props.showWT === "all" ? "white" : "var(--primary)",
          "&:hover": {
            backgroundColor: "var(--primary5)",
            color: "var(--primary)",
          },
        }}
        onClick={() => props.handleShowWT("all")}
      >
        All
      </Button>
    </Box>
  );
}
