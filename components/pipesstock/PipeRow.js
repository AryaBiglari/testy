import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { differenceInBusinessDays } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

export default function PipeRow(props) {
  const renderColor = (material) => {
    if (material === "AL") {
      return "var(--success5)";
    }
    if (material === "CS") {
      return "var(--secondary5)";
    }
    if (material === "SS") {
      return "var(--primary5)";
    }
    if (material === "QT100") {
      return "var(--warning)";
    }
  };

  const [editMode, setEditMode] = React.useState(false);

  const [newStock, setNewStock] = React.useState("");

  const [isSavingLocal, setIsSavingLocal] = React.useState("");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        mb: 0,
        // bgcolor: "red",
        maxHeight: "1.9rem",
      }}
    >
      <Box
        sx={{
          //   bgcolor: "blue",
          paddingX: "0.5rem",
          paddingY: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderTop: "none",
          width: "3.5rem",
          bgcolor: renderColor(props.pipe.material),
          height: "100%",
          borderBottomLeftRadius:
            props.index === props.pipes.length - 1 ? "0.8rem" : "",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {props.pipe.material}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: "0.5rem",
          paddingY: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderTop: "none",
          width: "10rem",
          bgcolor: renderColor(props.pipe.material),
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {props.pipe.diameter}
        </Typography>
      </Box>

      <Box
        sx={{
          paddingX: "0.5rem",
          paddingY: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderTop: "none",
          width: "6rem",
          bgcolor: renderColor(props.pipe.material),
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {props.pipe.thickness}
        </Typography>
      </Box>

      <Box
        sx={{
          paddingX: "0.5rem",
          paddingY: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderTop: "none",
          width: "5rem",
          bgcolor: renderColor(props.pipe.material),
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {props.pipe.length}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: "0.5rem",
          paddingY: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderTop: "none",
          width: "10rem",
          bgcolor: renderColor(props.pipe.material),
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {props.pipe.shape}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: "0.5rem",
          paddingY: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderLeft: "none",
          borderTop: "none",
          width: "6rem",
          bgcolor: renderColor(props.pipe.material),
          height: "100%",
        }}
      >
        {!editMode && (
          <Typography sx={{ fontSize: "1rem" }}>{props.pipe.stock}</Typography>
        )}
        {editMode && (
          <Box sx={{ width: "2.5rem" }}>
            <TextField
              id="outlined-controlled"
              size="small"
              variant="standard"
              //   type="number"
              value={newStock}
              onChange={(event) => {
                setNewStock(event.target.value);
              }}
            />
          </Box>
        )}

        <IconButton
          sx={{ ml: 3 }}
          aria-label="close"
          color="primary"
          size="small"
          onClick={() => {
            setEditMode(!editMode);
            if (editMode) {
              // Spread the existing pipe data and update the stock value
              props.updatePipesStock({
                ...props.pipe, // Spread the current pipe properties
                stock: newStock, // Update the stock with the new value
              });
            }
          }}
        >
          {!editMode ? <EditIcon fontSize="inherit" sx={{ fontSize: "1.3rem" }} /> : <SaveIcon fontSize="inherit" sx={{ fontSize: "1.3rem" }} />}
        </IconButton>
        

        {props.isSaving &&
          props.currentMaterial === props.pipe?.material &&
          props.currentPartNumber=== props.pipe?.partnumber && (
            <CircularProgress
              size={22}
              thickness={6}
              sx={{
                color: "primary",
                ml: 2,
              }}
            />
          )}
      </Box>
      <Box
        sx={{
          paddingX: "0.5rem",
          paddingY: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderLeft: "none",
          borderTop: "none",
          width: "10rem",
          bgcolor: renderColor(props.pipe.material),
          height: "100%",
        }}
      >
        {props.pipe?.stockDate && (
          <Typography
            sx={{
              fontSize: "0.9rem",

              color:
                differenceInBusinessDays(new Date(), props.pipe?.stockDate) > 5
                  ? "var(--error75)"
                  : differenceInBusinessDays(
                      new Date(),
                      props.pipe?.stockDate
                    ) > 3
                  ? "var(--secondary65)"
                  : "var(--success75)",
            }}
          >
            {differenceInBusinessDays(new Date(), props.pipe?.stockDate) > 0
              ? `Updated ${differenceInBusinessDays(
                  new Date(),
                  props.pipe?.stockDate
                )} day${
                  differenceInBusinessDays(new Date(), props.pipe?.stockDate) >
                  1
                    ? "s"
                    : ""
                } ago`
              : `Updated Today`}
          </Typography>
        )}
      </Box>
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0.5rem",
            paddingY: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5rem",
            bgcolor: renderColor(props.pipe.material),
            color:
              (props.pipe.h24 / props.pipe.pipeArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.pipe.stock)
                ? "var(--error)"
                : "",
            height: "100%",
          }}
        >
          <Typography sx={{ fontSize: "1rem" }}>
            {props.pipe.h24 > 0
              ? (props.pipe.h24 / props.pipe.pipeArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0.5rem",
            paddingY: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5rem",
            bgcolor: renderColor(props.pipe.material),
            color:
              (props.pipe.h48 / props.pipe.pipeArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.pipe.stock)
                ? "var(--error)"
                : "",
            height: "100%",
          }}
        >
          <Typography sx={{ fontSize: "1rem" }}>
            {props.pipe.h48 > 0
              ? (props.pipe.h48 / props.pipe.pipeArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0.5rem",
            paddingY: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5rem",
            bgcolor: renderColor(props.pipe.material),
            color:
              (props.pipe.w1 / props.pipe.pipeArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.pipe.stock)
                ? "var(--error)"
                : "",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {props.pipe.w1 > 0
              ? (props.pipe.w1 / props.pipe.pipeArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0.5rem",
            paddingY: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5.5rem",
            bgcolor: renderColor(props.pipe.material),
            color:
              (props.pipe.w2 / props.pipe.pipeArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.pipe.stock)
                ? "var(--error)"
                : "",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {props.pipe.w2 > 0
              ? (props.pipe.w2 / props.pipe.pipeArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0.5rem",
            paddingY: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5.5rem",
            bgcolor: renderColor(props.pipe.material),
            color:
              (props.pipe.m1 / props.pipe.pipeArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.pipe.stock)
                ? "var(--error)"
                : "",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              textAlign: "center",
              width: "4 rem",
            }}
          >
            {props.pipe.m1 > 0
              ? (props.pipe.m1 / props.pipe.pipeArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0.5rem",
            paddingY: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "6rem",
            bgcolor: renderColor(props.pipe.material),
            color:
              (props.pipe.m2 / props.pipe.pipeArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.pipe.stock)
                ? "var(--error)"
                : "",
            height: "100%",
            borderBottomRightRadius:
              props.index === props.pipes.length - 1 ? "0.8rem" : "",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {props.pipe.m2 > 0
              ? (props.pipe.m2 / props.pipe.pipeArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
