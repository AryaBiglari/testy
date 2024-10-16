import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import CircularProgressForTrailers from "../planning/CircularProgressForTrailers.js";

export function SortableWall(props) {
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
      !props.wall?.status || props.wall?.status === "Not Started"
        ? false
        : true,
  });

  // console.log(props.id);

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

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
          width: "30rem",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "space-evenly",
          borderRight: "1px solid var(--secondary5)",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}> {props.wall.WO + " | " + props.wall.customer}</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>
          {props.wall.trailerType}
        </Typography>
      </Box>

      <Box
        sx={{
          ml: 2,
          width: "9.5rem",
          height: "2.6rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          borderRadius: "1.6rem",
          borderLeft: "1px solid var(--secondary5)",
          bgcolor:
            !props.wall?.status || props.wall?.status === "Not Started"
              ? "var(--success1)"
              : "var(--success25)",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {/* 
          {!props.wall?.status || props.wall?.status === "Not Started"
            ? "Not Started"
            : "In progress"} */}
          {props.wall?.status}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "4rem",
          // bgcolor: "red",
          justifyContent: "center",
          flexDirection: "column",
          ml: 1,
        }}
      >
        <CircularProgressForTrailers
          value={Number(props.wall.wallsProgress)}
          //   value={100}
          size="3.2rem"
          font="0.9rem"
        />
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
        {props.wall.activeEmployees &&
          props.wall.activeEmployees.length > 0 &&
          props.wall.activeEmployees?.map((employee, index) => {
            // console.log(employee)
            return (
              <Chip
                key={index}
                size="small"
                // onDelete={() => {}}
                color="success"
                sx={{ mb: 0.5, mr: 1 }}
                label={`${employee?.firstName}`}
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
        {props.wall.show && <Checkbox checked={props.wall.show} />}
      </Box>
    </Paper>
  );
}
