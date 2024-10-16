import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  intlFormatDistance,
  differenceInHours,
  differenceInBusinessDays,
  subBusinessDays,
  isPast,
} from "date-fns";

export default function ProcessTitles(props) {
  const dateReqColor = (dateReq) => {
    if (isPast(dateReq)) {
      return "var(--error)";
    } else if (isPast(subBusinessDays(dateReq, 2))) {
      return "var(--datewarning)";
    } else return "var(--secondary)";
  };
  const url = props?.url;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        borderRadius: "0.3rem",
        bgcolor:
          props.status === "Completed"
            ? "var(--success5)"
            : props.status === "In Progress"
            ? "var(--warning)"
            : "var(--red)",
        mt: 1,
        pl: 2,
        mb: 1,
        "&:hover": {
          backgroundColor: "var(--primary5)",
        },
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
          // bgcolor: "red",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "var(--secondary75)",
          }}
        >
          {props?.title}
        </Typography>
        <IconButton
          sx={{ height: "2rem", width: "2rem", mr: 0.3 }}
          onClick={() => window.open(url, "_blank")}
        >
          <OpenInNewIcon />
        </IconButton>
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
          // bgcolor: "red",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "var(--secondary75)",
          }}
        >
          {props?.status}
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
        <Typography
          sx={{
            fontSize: "1.1rem",
            // fontWeight: "600",
            // color: "var(--secondary75)",
          }}
        >
          {!!props?.start
            ? new Date(props?.start).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : ""}
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
        <Typography
          sx={{
            fontSize: "1.1rem",
            // fontWeight: "600",
            // color: "var(--secondary75)",
          }}
        >
          {!!props?.end
            ? new Date(props?.end).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : ""}
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
          // bgcolor: "red",
        }}
      >
        {props?.status === "Completed" && (
          <Typography sx={{ fontSize: "1.1rem" }}>
            {differenceInHours(new Date(props?.end), new Date(props?.start)) <
            48
              ? `${differenceInHours(
                  new Date(props?.end),
                  new Date(props?.start)
                )} hours`
              : `${differenceInBusinessDays(
                  new Date(props?.end),
                  new Date(props?.start)
                )} days`}
          </Typography>
        )}
      </Box>
      <Box
        id="date-required"
        sx={{
          width: "8rem",
          ml: 1,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
          // bgcolor: "red",
        }}
      >
        <Typography
          sx={{ fontSize: "1.1rem", color: dateReqColor(props?.dateReq) }}
        >
          {!!props?.dateReq
            ? new Date(props?.dateReq).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : ""}
        </Typography>
      </Box>
      <Box
        id="date-dif"
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
        {props?.end && props?.dateReq && (
          <Typography
            sx={{
              fontSize: "1.1rem",
              color:
                differenceInBusinessDays(props?.end, props?.dateReq) >= 0
                  ? "var(--error)"
                  : "var(--success)",
            }}
          >
            {differenceInBusinessDays(props?.end, props?.dateReq)}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          width: "2rem",
          ml: 0,
          display: "flex",
          alignItems: "center",
          height: "2rem",
          mb: 0,
          //   bgcolor: "orange",
        }}
      >
        <IconButton
          onClick={props.handleOpenProcesses}
          sx={{ ml: 1, height: "1.8rem", width: "1.8rem" }}
        >
          {props.openState ? (
            <KeyboardArrowUpIcon sx={{ fontSize: "2rem" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
