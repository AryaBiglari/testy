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

export default function SheetRow(props) {
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
          paddingX: "0rem",
          paddingY: "0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderTop: "none",
          width: "6.5rem",
          bgcolor: renderColor(props.sheet.material),
          height: "100%",
          borderBottomLeftRadius:
            props.index === props.sheets.length - 1 ? "0.8rem" : "",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {props.sheet.material}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: "0rem",
          paddingY: "0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderLeft: "none",
          borderTop: "none",
          width: "7rem",
          bgcolor: renderColor(props.sheet.material),
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}> {props.sheet.WT}</Typography>
      </Box>

      <Box
        sx={{
          paddingX: "0rem",
          paddingY: "0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderLeft: "none",
          borderTop: "none",
          width: "10rem",
          bgcolor: renderColor(props.sheet.material),
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "1rem" }}>
          {" "}
          {props.sheet.sheetSize}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: "0rem",
          paddingY: "0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderLeft: "none",
          borderTop: "none",
          width: "8rem",
          bgcolor: renderColor(props.sheet.material),
          height: "100%",
        }}
      >
        {!editMode && (
          <Typography sx={{ fontSize: "1rem" }}>{props.sheet.stock}</Typography>
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
              props.updateSheetsStock(
                props.sheet?.material,
                props.sheet?.WT,
                newStock
              );
              //   setIsSavingLocal(false);
            }
          }}
        >
          {!editMode && (
            <EditIcon fontSize="inherit" sx={{ fontSize: "1.3rem" }} />
          )}
          {editMode && (
            <SaveIcon fontSize="inherit" sx={{ fontSize: "1.3rem" }} />
          )}
        </IconButton>
        {props.isSaving &&
          props.currentMaterial === props.sheet?.material &&
          props.currentWT === props.sheet?.WT && (
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
          paddingX: "0rem",
          paddingY: "0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary15)",
          borderLeft: "none",
          borderTop: "none",
          width: "10rem",
          bgcolor: renderColor(props.sheet.material),
          height: "100%",
        }}
      >
        {props.sheet?.stockDate && (
          <Typography
            sx={{
              fontSize: "0.9rem",

              color:
                differenceInBusinessDays(new Date(), props.sheet?.stockDate) > 5
                  ? "var(--error75)"
                  : differenceInBusinessDays(
                      new Date(),
                      props.sheet?.stockDate
                    ) > 3
                  ? "var(--secondary65)"
                  : "var(--success75)",
            }}
          >
            {differenceInBusinessDays(new Date(), props.sheet?.stockDate) > 0
              ? `Updated ${differenceInBusinessDays(
                  new Date(),
                  props.sheet?.stockDate
                )} day${
                  differenceInBusinessDays(new Date(), props.sheet?.stockDate) >
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
            paddingX: "0rem",
            paddingY: "0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5rem",
            bgcolor: renderColor(props.sheet.material),
            color:
              (props.sheet.h24 / props.sheet.sheetArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.sheet.stock)
                ? "var(--error)"
                : "",
            height: "100%",
          }}
        >
          <Typography sx={{ fontSize: "1rem" }}>
            {props.sheet.h24 > 0
              ? (props.sheet.h24 / props.sheet.sheetArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0rem",
            paddingY: "0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5rem",
            bgcolor: renderColor(props.sheet.material),
            color:
              (props.sheet.h48 / props.sheet.sheetArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.sheet.stock)
                ? "var(--error)"
                : "",
            height: "100%",
          }}
        >
          <Typography sx={{ fontSize: "1rem" }}>
            {props.sheet.h48 > 0
              ? (props.sheet.h48 / props.sheet.sheetArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0rem",
            paddingY: "0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5rem",
            bgcolor: renderColor(props.sheet.material),
            color:
              (props.sheet.w1 / props.sheet.sheetArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.sheet.stock)
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
            {props.sheet.w1 > 0
              ? (props.sheet.w1 / props.sheet.sheetArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0rem",
            paddingY: "0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5.5rem",
            bgcolor: renderColor(props.sheet.material),
            color:
              (props.sheet.w2 / props.sheet.sheetArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.sheet.stock)
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
            {props.sheet.w2 > 0
              ? (props.sheet.w2 / props.sheet.sheetArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0rem",
            paddingY: "0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "5.5rem",
            bgcolor: renderColor(props.sheet.material),
            color:
              (props.sheet.m1 / props.sheet.sheetArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.sheet.stock)
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
            {props.sheet.m1 > 0
              ? (props.sheet.m1 / props.sheet.sheetArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
      {!props.mode && (
        <Box
          sx={{
            paddingX: "0rem",
            paddingY: "0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--secondary15)",
            borderLeft: "none",
            borderTop: "none",
            width: "6rem",
            bgcolor: renderColor(props.sheet.material),
            color:
              (props.sheet.m2 / props.sheet.sheetArea)
                .toFixed(1)
                .replace(/[.,]0$/, "") > Number(props.sheet.stock)
                ? "var(--error)"
                : "",
            height: "100%",
            borderBottomRightRadius:
              props.index === props.sheets.length - 1 ? "0.8rem" : "",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {props.sheet.m2 > 0
              ? (props.sheet.m2 / props.sheet.sheetArea)
                  .toFixed(1)
                  .replace(/[.,]0$/, "")
              : "0"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
