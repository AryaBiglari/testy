import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: "84%",
    maxWidth: "84%",
    minHeight: "94vh",
  },
  "& .css-uhb5lp": {
    minWidth: "84%",
    maxWidth: "84%",
    minHeight: "98vh",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
    paddingBottom: "4rem",
    display: "flex",
    flexDirection: "column",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const getColourForStatus = (status) => {
  if (status === "completed and confirmed") {
    return "var(--success)";
  } else if (status === "complete") {
    return "var(--smallPartsChart)";
  } else if (status === "running") {
    return "var(--smallPartsChart)";
  } else if (status === "paused") {
    return "var(--smallPartsChart)";
  } else if (status === "paused") {
    return "var(--smallPartsChart)";
  } else {
    return "unset";
  }
};

const getTextForStatus = (status) => {
  if (status === "completed and confirmed") {
    return "Completed";
  } else if (status === "complete") {
    return "In Progress";
  } else if (status === "running") {
    return "In Progress";
  } else if (status === "paused") {
    return "In Progress";
  } else if (status === "paused") {
    return "In Progress";
  } else {
    return "Not Started";
  }
};

export default function BoxProgress(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          mt: 0,
          mb: 1,
          pl: 2,
        }}
      >
        {/* Title Row */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{ fontSize: "1.1rem", fontWeight: "600", width: "14rem" }}
          >
            Box Stage {props.stage}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "6.5rem",
              color: getColourForStatus(
                props.currentTrailer?.boxData.stages[props.stage - 1].status
              ),
            }}
          >
            {getTextForStatus(
              props.currentTrailer?.boxData.stages[props.stage - 1].status
            ) === "Completed"
              ? "Completed"
              : "In progress"}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "4rem",
              color: "var(--success)",
            }}
          >
            {!!props.currentTrailer?.dateCreated
              ? new Date(props.currentTrailer?.dateCreated).toLocaleDateString(
                  "en-US",
                  {
                    month: "numeric",
                    day: "numeric",
                  }
                )
              : "No date"}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "4rem",
              color: "var(--success)",
            }}
          >
            {getTextForStatus(
              props.currentTrailer?.boxData.stages[props.stage - 1].status
            ) === "Completed"
              ? new Date(props.currentTrailer?.dateCreated).toLocaleDateString(
                  "en-US",
                  {
                    month: "numeric",
                    day: "numeric",
                  }
                )
              : ""}
          </Typography>
        </Box>

        {/* Manufacture Parts Row */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography sx={{ fontSize: "1.1rem", width: "14rem" }}>
            Manufacture Parts Kit
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "6.5rem",
              color: "var(--success)",
            }}
          >
            Completed
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "4rem",
              color: "var(--success)",
            }}
          >
            N/A
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "4rem",
              color: "var(--success)",
            }}
          >
            N/A
          </Typography>
        </Box>

        {/* Build Frame Row */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography sx={{ fontSize: "1.1rem", width: "14rem" }}>
            Build Frame
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "6.5rem",
              color: getColourForStatus(
                props.currentTrailer?.boxData.stages[props.stage - 1].status
              ),
            }}
          >
            {getTextForStatus(
              props.currentTrailer?.boxData.stages[props.stage - 1].status
            )}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "4rem",
              color: "var(--success)",
            }}
          >
            {!!props.currentTrailer?.boxData.stages[props.stage - 1]
              .startDate != ""
              ? new Date(
                  props.currentTrailer?.boxData.stages[
                    props.stage - 1
                  ].startDate
                ).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })
              : ""}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
              ml: 1,
              width: "4rem",
              color: "var(--success)",
            }}
          >
            {!!props.currentTrailer?.boxData.stages[props.stage - 1].endDate !=
            ""
              ? new Date(
                  props.currentTrailer?.boxData.stages[props.stage - 1].endDate
                ).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })
              : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
