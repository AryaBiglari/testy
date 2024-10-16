import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    disabled:
      !props.frame?.status || props.frame?.status === "Not Started"
        ? false
        : true,
  });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  const processTrailerName = (trailer) => {
    if (trailer.toLowerCase().includes("tri")) {
      return "tri";
    } else return trailer.toLowerCase();
  };

  return (
    <Paper
      elevation={1}
      ref={setNodeRef}
      // style={style}
      {...attributes}
      {...listeners}
      sx={{
        width: "65rem",
        height: "4rem",
        mb: 1,
        mt: 2,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transform: CSS.Transform.toString(transform),
        transition: transition,
        bgcolor: isDragging ? "var(--success5)" : "",
        "z-index": isDragging ? "10000" : "1",
      }}
    >
      <Box
        sx={{
          pl: 1,
          width: "20rem",

          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "space-evenly",
          borderRight: "1px solid var(--secondary5)",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}> {props.frame.WO + " | " + props.frame.customer}</Typography>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: "1rem" }}>
            {props.frame.trailerType}
          </Typography>
          <Typography sx={{ fontSize: "1rem", ml: 0.5 }}>
            {/* Conditional logic for renaming "Front" to "Front + Mid" if trailer is "4 Axle" */}
            {props.frame.trailerType === "4 Axle" && props.frame.frameType === "Front"
              ? "Front + Mid"
              : props.frame.frameType}
          </Typography>
        </Box>

      </Box>
      <Box
        sx={{
          width: "0.5rem",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "space-evenly",

          // bgcolor: "red",
        }}
      >
        {/* <Typography sx={{ fontSize: "1rem" }}>
          {props.frame.trailerType}
        </Typography>
        <Typography sx={{ fontSize: "1rem" }}>
          {props.frame.frameType}
        </Typography> */}
      </Box>
      <Box
        sx={{
          padding: 2,
          // bgcolor: "red",
          width: "12rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          height: "3.6rem",
        }}
      >

        {console.log("IM HERE" + processTrailerName(
          props.frame?.trailerType) + props.frame.frameType?.toLowerCase())}
        <Image
          src={`/images/frames/${processTrailerName(
            props.frame?.trailerType
          )}/${props.frame.frameType?.toLowerCase()}.png`}
          style={{
            objectFit: "contain",
          }}
          fill={true}
          sizes={"100%"}
          priority={true}
          alt="Picture of the Frame"
        />
      </Box>
      <Box
        sx={{
          ml: 2,
          width: "10.5rem",
          height: "2.6rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          borderRadius: "1.6rem",

          bgcolor:
            !props.frame?.status || props.frame?.status === "Not Started"
              ? "var(--success1)"
              : "var(--success25)",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {/* {props.frame.status === "Not Started" ? "Not Started" : "In Progress"} */}

          {!props.frame?.status || props.frame?.status === "Not Started"
            ? "Not Started"
            : "In progress"}
          {/* {props.frame?.frameType === "Front"
            ? props.frame?.frontFrameTimeData?.status
            : props.frame?.rearFrameTimeData?.status} */}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "16rem",
          height: "100%",
          //   bgcolor: "red",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "wrap",
          ml: 1,
        }}
      >
        {props.frame?.status === "running" &&
          props.frame.activeEmployees?.map((employee, index) => {
            // console.log(employee)
            return (
              <Chip
                key={index}
                size="small"
                // onDelete={() => {}}
                color="success"
                sx={{ mb: 0.5 }}
                label={`${employee?.firstName} (${employee?.employeeID})`}
                variant="outlined"
              />
            );
          })}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "3rem",
          // bgcolor: "red",
          justifyContent: "center",
          flexDirection: "column",
          ml: 0,
        }}
      >
        {props.frame.show && <Checkbox checked={props.frame.show} />}
      </Box>
    </Paper>
  );
}
