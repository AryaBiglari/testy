import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddPartDetails from "./AddPartDetails.js";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import BendingDocDialog from "./BendingDocDialog.js";
import ProjectionsDialog from "./ProjectionsDialog.js";
import DeletePartDialog from "./DeletePartDialog.js";
import OnShapeInformationDialog from "./OnShapeInformationDialog.js";
import {
  isTomorrow,
  isToday,
  subBusinessDays,
  isPast,
  isValid,
} from "date-fns";

import {
  GridRowModes,
  DataGrid,
  useGridApiRef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { differenceInBusinessDays } from "date-fns";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import QualityCheckReports from "../QC/QualityCheckReports.js";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { isResSent } from "next/dist/shared/lib/utils.js";
import CircularProgress from "@mui/material/CircularProgress";

const featureNames = [
  "Lead",
  "Pup",
  "Tandem",
  "Tri 61 3 Hoppers",
  "Tri 61 2 Hoppers",
  "Tri 72 2 Hoppers",
  "4 Axle"
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip(props) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let selectedValues = typeof value === "string" ? value.split(",") : value;

    props.handleSetOptionalFeaturesName(selectedValues);
    props.handleOptionalFeatures({ [props.id]: selectedValues });
    props.handleSetOptionalFeaturesName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 0,
          minWidth: "6rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        // fullwidth={true}
      >
        <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
        <Select
          sx={{ minWidth: "100%" }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.optionalFeaturesName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Optional Features"
            />
          }
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ fontSize: "0.6rem" }} />
              ))}
            </Box>
          )}
        >
          {featureNames.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.optionalFeaturesName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function EditToolbar(props) {
  const {
    setRows,
    setRowModesModel,
    mode,
    isCreatingPart,
    uploadPartHandler,
    nextPartNumber,
    selectedRows,
    updateSelectedRowsStatus,
  } = props; // Destructure the new prop

  return (
    <GridToolbarContainer sx={{ mt: props.mode !== "stock" ? 0 : 5 }}>
      {isCreatingPart && (
        <CircularProgress
          size={30}
          thickness={4}
          sx={{
            color: "primary",
            mr: 1,
          }}
        />
      )}
      {mode !== "stock" && !(selectedRows?.length > 0) && (
        <Button
          color="primary"
          startIcon={<AddIcon />}
          disabled={mode === "bending"}
          onClick={() =>
            uploadPartHandler({
              mat: "",
              WT: "",
              onshapeURL: "",
              trailerType: null,
              part: nextPartNumber,
              position: "",
              description: "",
              piecesPerTrailer: "",
              stock: "",
              DTAF: 5,
              needs48hs: "",
              needsWeek: "",
              needsMonth: "",
              status: "Up-to-date",
              fenderType: "Any",
              config: "Any",
              doors: "Any",
              specialReq: "",
              partURL: "",
              onshapeName: "",
              onshapeURL: "",
              bendingIsRequired: true,
              stockDate: new Date(),
            })
          }
          variant="contained"
          sx={{ ml: -1, borderRadius: "0.5rem" }}
        >
          Part
        </Button>
      )}
      {mode !== "stock" && selectedRows?.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateSelectedRowsStatus("Up-to-date")} // Add this button
        >
          Up-to-date
        </Button>
      )}
      {mode !== "stock" && selectedRows?.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateSelectedRowsStatus("Outdated")} // Add this button
        >
          Outdated
        </Button>
      )}
      {mode !== "stock" && selectedRows?.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateSelectedRowsStatus("Caution")} // Add this button
        >
          Caution
        </Button>
      )}
    </GridToolbarContainer>
  );
}

function PartNumber(props) {
  return (
    <Typography
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        textWrap: "wrap",
        bgcolor: props.repeatedPartNumbers.includes(
          Number(props.params.row?.part)
        )
          ? "var(--error75)"
          : "",
        fontSize: props.repeatedPartNumbers.includes(
          Number(props.params.row?.part)
        )
          ? "0.7rem"
          : "0.9rem",
      }}
    >
      {`${props.params.row?.part} ${
        props.repeatedPartNumbers.includes(Number(props.params.row?.part))
          ? `Repeated: Use Number ${props.nextPartNumber}`
          : ""
      } `}
    </Typography>
  );
}

export default function PlanningDataTable(props) {
  const [repeatedParts, setRepeatedParts] = React.useState(
    props.repeatedPartNumbers
  );
  const apiRef = useGridApiRef();
  console.log(props);

  React.useEffect(() => {
    setRepeatedParts(props.repeatedPartNumbers);
  }, [props.repeatedPartNumbers]);

  const [selectedStatus, setSelectedStatus] = React.useState("");

  const handleChangeSelectedStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [openOnShapeDialog, setOpenOnShapeDialog] = React.useState("");
  const [tempOnShapeName, setTempOnShapeName] = React.useState(null);
  const [tempOnShapeURL, setTempOnShapeURL] = React.useState(null);

  const handleOpenOnShapeDialog = (val, partData) => {
    setOpenOnShapeDialog(val);
    setCurrentPartData(partData);
  };

  const handleCloseOnShapeDialog = () => {
    setOpenOnShapeDialog(false);
    setTempOnShapeName(null);
    setTempOnShapeURL(null);
  };

  const handleSaveOnShapeInfo = (onshapeName, onshapeURL, row) => {
    // const updatedRow = {... row, onshapeName, onshapeURL}
    setTempOnShapeName(onshapeName);
    setTempOnShapeURL(onshapeURL);
    setOpenOnShapeDialog(false);
    // apiRef.current.updateRows([{ id: row._id, ...updatedRow }]);
  };

  const [selectedProcess, setSelectedProcess] = React.useState("Front Frame");

  const handleChangeSelectedProcess = (event) => {
    setSelectedProcess(event.target.value);
  };

  const [optionalFeaturesName, setOptionalFeaturesName] = React.useState([]);

  const handleSetOptionalFeaturesName = (state) => {
    setOptionalFeaturesName(state);
  };

  const [optionalFeatures, setOptionalFeatures] = React.useState(false);

  const handleOptionalFeatures = (state) => {
    setOptionalFeatures(state);
  };
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params) => {
    console.log("We are here right now");
    const row = props.rows.find((row) => row._id === params.id);
    setSelectedStatus(row.status);
    setSelectedProcess(row.process);
  };

  const handleRowEditStop = (params, event) => {
    console.log("123");
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    if (props.isCreatingPart || isEditing || isUpdating) {
      console.error("Didn't allow edit click");
      return;
    }
    console.log("This time it was with the button");
    const row = props.rows.find((row) => row._id === id);
    console.log(row);
    setSelectedStatus(row?.status);
    setSelectedProcess(row?.process);
    setOptionalFeaturesName(row?.trailerType || []);
    setIsEditing(true);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const [currentUpdatedRow, setCurrentUpdatedRow] = React.useState(null);

  async function handleUpdatePart(part) {
    if (selectedStatus !== "") {
      part.status = selectedStatus;
    }
    if (selectedProcess !== "") {
      part.process = selectedProcess;
    }

    setRowModesModel({
      [part._id]: { mode: GridRowModes.View },
    });
    if (optionalFeatures && optionalFeatures[part._id]) {
      part.trailerType = optionalFeatures[part._id];
    }

    const response = await fetch("/api/cutting/update-part", {
      method: "POST",
      body: JSON.stringify({
        part,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // props.unfilteredRows.map((item) => (item._id === part._id ? part : item));

      const updatedRow = { ...part, isNew: false };
      console.log(part);
      console.log(updatedRow);

      const newRows = props.rows.map((row) => {
        if (row._id === part._id) {
          console.log("updatedRow was added");
          console.log(part);

          return part;
        } else {
          return row;
        }
      });

      console.log(props.rows);
      console.log(newRows);
      console.log(newRows[0].trailerType);
      console.log(newRows);
      console.log(newRows[1].trailerType);
      console.log(newRows[2].trailerType);
      setRowModesModel({
        [part._id]: { mode: GridRowModes.View },
      });
      props.handleUpdateAllRows(newRows);

      // props.handleEditPartAlert(true);
    }
  }

  const [partDetails, setPartDetails] = React.useState({});
  const [hasPartDetailsChanged, setHasPartDetailsChanged] =
    React.useState(false);

  async function handleUpdatePartDetails(
    id,
    fendersType,
    config,
    doors,
    doorsOpening,
    liftAxle,
    airInflation,
    doorSize,
    specialData
  ) {
    console.log("123 123");
    // setRowModesModel({
    //   [part._id]: { mode: GridRowModes.View },
    // });

    const response = await fetch("/api/cutting/update-part-details", {
      method: "POST",
      body: JSON.stringify({
        id,
        fendersType,
        config,
        doors,
        doorsOpening,
        liftAxle,
        airInflation,
        doorSize,
        specialData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // props.handleGetPartsAfterDelete(id);
      handleCloseComments();
      setHasPartDetailsChanged(true);
      setPartDetails({
        fendersType,
        config,
        doors,
        doorsOpening,
        liftAxle,
        airInflation,
        doorSize,
        specialReq: specialData,
      });
      console.log("123");
      props.handleActiveAlert(
        true,
        "success",
        "The details were updated successfully"
      );
      // props.rows.map((item) => (item._id === part._id ? part : item));
      //   handleOptionalFeatures([]);
      //   handleSetOptionalFeaturesName([]);
    } else {
      props.handleActiveAlert(true, "error", "The details failed to update");
    }
  }

  async function handleDeletePart(id, password) {
    props.handleIsDeletingPart(true);
    const response = await fetch("/api/cutting/delete-part", {
      method: "POST",
      body: JSON.stringify({
        id,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      props.handleGetPartsAfterDelete(id);
      handleCloseDeletePart();
      props.handleIsDeletingPart(false);
      props.handleDeletePartAlert(true, true);
      //   props.handleSetRows(
      //     props.rows.filter((row) => {
      //       row._id !== id;
      //     })
      //   );
    } else {
      props.handleIsDeletingPart(false);
      props.handleDeletePartAlert(true, false);
    }
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = props.rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      props.handleSetRows(props.rows.filter((row) => row._id !== id));
    }
    setPreviewBendingImage(null);
    setPreviewImage(null);
    setTempOnShapeName(null);
    setTempOnShapeURL(null);
    setIsBending(() => {
      console.log("b");
      return null;
    });
    setIsEditing(false);
  };

  const [isEditing, setIsEditing] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const processRowUpdate = async (newRow, oldRow) => {
    const updatedRow = { ...oldRow, ...newRow, isNew: false };
  
    setIsUpdating(true);
  
    if (selectedStatus !== "") {
      updatedRow.status = selectedStatus;
    }
    if (selectedProcess !== "") {
      updatedRow.process = selectedProcess;
    }
    if (tempOnShapeName !== null) {
      updatedRow.onshapeName = tempOnShapeName;
    }
    if (tempOnShapeURL !== null) {
      updatedRow.onshapeURL = tempOnShapeURL;
    }
  
    updatedRow.stockDate = new Date();
  
    const id = newRow._id;
    if (optionalFeatures && optionalFeatures[id]) {
      const trailerTypes = optionalFeatures[id];
      if (trailerTypes && trailerTypes.length > 0) {
        updatedRow.trailerType = trailerTypes;
      }
    }
  
    // Ensure status is not null or undefined
    if (updatedRow.status == null) {
      updatedRow.status = oldRow.status;
    }
  
    try {
      if (previewImage?.id === id && previewImage.image) {
        console.log("Uploading part image...");
        const url = await handleUploadImage(id);
        console.log("Image URL:", url);
        updatedRow.partURL = url;
      }
  
      if (
        previewBendingImage?.id === id &&
        previewBendingImage?.image
      ) {
        console.log("Uploading bending image...");
        const url = await handleUploadBendingImage(id);
        updatedRow.bendingURL = url;
        updatedRow.bendingIsRequired = true;
      }
  
      if (isBending?.id === id && !isBending?.required) {
        updatedRow.bendingURL = null;
        updatedRow.bendingIsRequired = false;
        console.log("Bending not required.");
      }
  
      if (hasPartDetailsChanged) {
        Object.assign(updatedRow, partDetails);
      }
  
      console.log("Updated Row:", updatedRow);
      const response = await fetch("/api/cutting/update-part", {
        method: "POST",
        body: JSON.stringify({ part: updatedRow }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        props.handleEditPartAlert(true, false);
        throw new Error("Failed to update part");
      }
  
      const newRows = props.rows.map((row) =>
        row._id === newRow._id ? updatedRow : row
      );
      console.log("New Rows:", newRows);
      props.handleEditPartAlert(true, true);
      props.handleUpdateAllRows(newRows);
      setIsEditing(false);
      setIsUpdating(false);
      setTempOnShapeName(null);
      setTempOnShapeURL(null);
      setSelectedProcess([]);
      setIsBending(() => {
        console.log("Resetting bending state.");
        return null;
      });
  
      return updatedRow;
    } catch (error) {
      console.error("Error updating part:", error);
      setIsEditing(false);
      setIsUpdating(false);
      setTempOnShapeName(null);
      setTempOnShapeURL(null);
      setIsBending(() => {
        console.log("Resetting bending state after error.");
        return null;
      });
      return oldRow; // Revert back to old row data if update fails
    }
  };
  

  const handleSaveClick = (newRow) => async () => {
    const id = newRow._id;
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log("ROW MODE WAS HANDLED THROUGH GRID MUI");
    setRowModesModel(newRowModesModel);
  };

  //upload images logic - start
  const [previewImage, setPreviewImage] = React.useState(null);

  const handleSelectImage = (event, id) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewImage({ id: id, image: fileReader.result });
    });
    fileReader?.readAsDataURL(file);
  };

  async function handleUploadImage(id) {
    // setIsLoading(true);
    console.log("HERERERER");
    const data = new FormData();

    try {
      data.append("file", previewImage.image);
      data.append("tags", [id]);
      data.append("folder", "Parts Images");
      data.append("upload_preset", "quality-check-reports");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/ddxhm7w2n/upload`,
        {
          method: "POST",
          body: data,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );

      const imgData = await response.json();

      console.log("HERERE45RER");

      if (imgData?.secure_url) {
        //   setUploadImgURL(imgData?.secure_url);

        const response = await fetch("/api/upload-parts-imgs", {
          method: "POST",
          body: JSON.stringify({
            id: id,
            url: imgData.secure_url,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log("ADFASDF");
          setPreviewImage(null);
          return imgData.secure_url;
        }
        if (!response.ok) {
          console.log("kjgfldfkj");
          throw new Error(
            data.message || "Something went wrong, please try again"
          );
        }
      }
    } catch (error) {
      console.error(error);
    }

    // setIsLoading(false);
  }
  //upload part images logic - end

  //upload bending doc logic - start
  const [previewBendingImage, setPreviewBendingImage] = React.useState(null);

  const handleSelectBendingImage = (event, id) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewBendingImage({ id: id, image: fileReader.result });
    });
    fileReader?.readAsDataURL(file);
    setIsBending({
      id: id,
      required: true,
    });
  };

  const [isBending, setIsBending] = React.useState(4);
  //console.log(isBending);

  React.useEffect(() => {
    console.log("use effect", isBending);
  }, [isBending]);

  function handleUpdateNoBendingRequired(id) {
    console.log(isBending);
    setIsBending({
      id: id,
      required: false,
    });
    setPreviewBendingImage(null);
  }

  async function handleUploadBendingImage(id) {
    // setIsLoading(true);
    const data = new FormData();

    data.append("file", previewBendingImage.image);
    data.append("tags", [id]);
    data.append("folder", "Bending Documentation Images");
    data.append("upload_preset", "quality-check-reports");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/ddxhm7w2n/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const imgBendingData = await response.json();

      if (imgBendingData?.secure_url) {
        //   setUploadImgURL(imgData?.secure_url);

        const response = await fetch("/api/upload-bending-imgs", {
          method: "POST",
          body: JSON.stringify({
            id: id,
            url: imgBendingData.secure_url,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log("iiuiuitrk");
          setPreviewBendingImage(null);
          return imgBendingData.secure_url;
        }
        if (!response.ok) {
          throw new Error(
            data.message || "Something went wrong, please try again"
          );
        }
      }
    } catch {
      console.error(error);
    }

    // setIsLoading(false);
  }
  //upload bending doc images logic - end

  const processDateReq = (process, dateReqForTrailer) => {
    if (process === "Rear Frame" || process === "Front Frame") {
      return subBusinessDays(dateReqForTrailer, 16);
    }
    if (process === "Box Stage 1") {
      return subBusinessDays(dateReqForTrailer, 13);
    }
    if (process === "Box Stage 2") {
      return subBusinessDays(dateReqForTrailer, 12);
    }
    if (process === "Box Stage 3") {
      return subBusinessDays(dateReqForTrailer, 11);
    }
    if (process === "Box Stage 4") {
      return subBusinessDays(dateReqForTrailer, 10);
    }
    if (process === "Small Parts Stage") {
      return subBusinessDays(dateReqForTrailer, 12);
    }
    if (process === "Box Finishing") {
      return subBusinessDays(dateReqForTrailer, 8);
    }
    if (process === "Front Frame Finishing") {
      return subBusinessDays(dateReqForTrailer, 6);
    }
    if (process === "Rear Frame Finishing") {
      return subBusinessDays(dateReqForTrailer, 4);
    } else return null;
  };

  const initialColumns = [
    {
      field: "mat",
      headerName: "Mat",
      width: props.mode !== "stock" ? 75 : 75,
      editable: props.mode !== "stock",
      type: "singleSelect",
      valueOptions: ["", "AL", "CS", "QT100", "SS"],
    },
    {
      field: "WT",
      headerName: "WT",
      width: props.mode !== "stock" ? 75 : 70,
      editable: props.mode === "stock" ? false : true,
      type: "singleSelect",
      valueOptions: [
        "",
        "5/8",
        "1/2",
        "3/8",
        "5/16",
        "1/4",
        "3/16",
        "1/8",
        ".078",
      ],
    },
    {
      field: "part",
      // repeatedPartNumbers
      headerName: "Part",
      type: "string",
      width: props.mode !== "stock" ? 80 : 82,
      align: "left",
      headerAlign: "left",
      editable: props.mode === "stock" ? false : true,
      renderCell: (params) => (
        <PartNumber
          repeatedPartNumbers={props.repeatedPartNumbers}
          nextPartNumber={props.nextPartNumber}
          params={params}
        />
      ),
    },
    {
      field: "image",
      headerName: "Image",
      type: "string",
      width: props.mode !== "stock" ? 260 : 270,
      editable: false,

      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              // bgcolor: "red",
              position: "relative",
            }}
          >
            {(!params.row?.partURL ||
              rowModesModel[params.row._id]?.mode === GridRowModes.Edit) &&
              previewImage?.id === params.row._id && (
                <Image
                  src={previewImage?.image}
                  alt="logo"
                  style={{ objectFit: "contain" }}
                  fill={true}
                  sizes={"100%"}
                  priority={true}
                />
              )}

            {params.row?.partURL &&
              !props.previewImage &&
              (rowModesModel[params.row._id]?.mode != GridRowModes.Edit ||
                (props.mode === "stock" &&
                  rowModesModel[params.row._id]?.mode ===
                    GridRowModes.Edit)) && (
                <Image
                  src={params.row?.partURL}
                  alt="logo"
                  style={{ objectFit: "contain" }}
                  fill={true}
                  sizes={"100%"}
                  priority={true}
                />
              )}
            {previewImage?.id !== params.row._id &&
              rowModesModel[params.row._id]?.mode === GridRowModes.Edit &&
              previewImage?.id !== params.row._id &&
              props.mode !== "stock" && (
                <Button
                  sx={{ zIndex: 1000000 }}
                  onChange={() => handleSelectImage(event, params.row._id)}
                  // onClick={() =>
                  //   setRowModesModel({
                  //     ...rowModesModel,
                  //     [params.row._id]: { mode: GridRowModes.Edit },
                  //   })
                  // }
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  {!params.row?.partURL ? "Upload Image" : "Change Image"}
                  <VisuallyHiddenInput type="file" />
                </Button>
              )}

            {/* {(!params.row?.partURL && previewImage?.id !== params.row._id) ||
              !(params.row?.partURL && previewImage?.id === params.row._id) ||
              (rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
               
              ))} */}
          </Box>
        );
      },
    },
    {
      field: "bending",
      headerName: "Bending",
      type: "string",
      width: 188,
      editable: false,

      renderCell: (params) => {
        if (rowModesModel[params.row._id]?.mode === GridRowModes.Edit) {
          console.log(isBending);
        }
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
              //   bgcolor: "red",
              position: "relative",
            }}
          >
            {/* Bending Image Preview */}
            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit &&
              previewBendingImage?.id === params.row._id && (
                <Image
                  onClick={() => handleOpenBendingDoc(true, params.row)}
                  src={previewBendingImage?.image}
                  alt="logo"
                  style={{ objectFit: "contain" }}
                  fill={true}
                  sizes={"100%"}
                  priority={true}
                />
              )}

            {/* Bending Image Saved */}
            {params.row?.bendingURL &&
              !props.previewBendingImage &&
              rowModesModel[params.row._id]?.mode != GridRowModes.Edit &&
              params.row?.bendingIsRequired && (
                <Image
                  onClick={() => handleOpenBendingDoc(true, params.row)}
                  src={params.row?.bendingURL}
                  alt="logo"
                  style={{ objectFit: "contain" }}
                  fill={true}
                  sizes={"100%"}
                  priority={true}
                />
              )}

            {/* No bending Text
            - editing: isbending id match and false
            - normal: params.row.bendingIsRequired is false */}
            {((rowModesModel[params.row._id]?.mode === GridRowModes.Edit &&
              isBending?.id === params.row._id &&
              isBending?.required === false) ||
              (rowModesModel[params.row._id]?.mode !== GridRowModes.Edit &&
                params?.row?.bendingIsRequired === false)) && (
              <Typography sx={{ fontSize: "0.8rem", textWrap: "wrap" }}>
                No Bending Required
              </Typography>
            )}

            {/* Add Bending Image Button */}
            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit &&
              !(
                previewBendingImage?.id === params.row._id ||
                previewBendingImage?.bendingURL
              ) && (
                <Button
                  sx={{ zIndex: 1000000 }}
                  onChange={() =>
                    handleSelectBendingImage(event, params.row._id)
                  }
                  // onClick={() =>
                  //   setRowModesModel({
                  //     ...rowModesModel,
                  //     [params.row._id]: { mode: GridRowModes.Edit },
                  //   })
                  // }
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  {!params.row?.bendingURL ? "Upload Image" : "Change Image"}
                  <VisuallyHiddenInput type="file" />
                </Button>
              )}

            {/* No Bending Button */}
            {/* 
            - is isEditing
            - no preview image
            - no bending not set
           */}

            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit &&
              !(
                previewBendingImage?.id === params.row._id ||
                previewBendingImage?.bendingURL
              ) &&
              !(
                isBending?.id === params.row._id &&
                isBending?.required === false
              ) &&
              params.row.bendingIsRequired && (
                <Button
                  // variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    handleUpdateNoBendingRequired(params.row._id);
                    // setIsBending({
                    //   id: params.row._id,
                    //   required: false,
                    // });
                    // setPreviewBendingImage(null);
                    // console.log(isBending)
                  }}
                >
                  No Bending
                </Button>
              )}

            {/* {(!params.row?.partURL && previewImage?.id !== params.row._id) ||
                !(params.row?.partURL && previewImage?.id === params.row._id) ||
                (rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
                 
                ))} */}
          </Box>
        );
      },
    },
    {
      field: "trailerType",
      headerName: "Trailer",
      type: "string",
      //   valueOptions: ["Market", "Finance", "Development"],
      width: 110,
      editable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              //   flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              //   textWrap: "wrap",

              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            {/* {rowModesModel[params.row._id]?.mode != GridRowModes.Edit && (
              //   params.row.trailerType?.map((item, index) => (
              //     <Typography sx={{ fontSize: "0.9rem" }} key={index}>
              //       {item}
              //       {index !== params.row.trailerType.length - 1 ? "," : ""}
              //     </Typography>
              //   ))
              <Typography sx={{ fontSize: "0.7rem", textWrap: "wrap" }}>
                {params.row.trailerType?.toString()}
              </Typography>
            )} */}

            {(rowModesModel[params.row._id]?.mode != GridRowModes.Edit ||
              props.mode === "stock") &&
              params.row.trailerType?.map((trailer, index) => (
                <Typography
                  sx={{ fontSize: "0.7rem", textWrap: "wrap" }}
                  key={index}
                >
                  {trailer}
                </Typography>
              ))}

            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit &&
              props.mode !== "stock" && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    //   bgcolor: "red",
                  }}
                >
                  <MultipleSelectChip
                    id={params.row._id}
                    handleOptionalFeatures={handleOptionalFeatures}
                    optionalFeaturesName={optionalFeaturesName}
                    handleSetOptionalFeaturesName={
                      handleSetOptionalFeaturesName
                    }
                  />
                </Box>
              )}
          </Box>
        );
      },
    },

    {
      field: "position",
      headerName: "Position",
      type: "string",
      // width: 130,
      width: 170,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",

              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {params.row.position}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "description",
      headerName: "Description",
      type: "string",
      // width: 100,
      width: 220,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {params.row?.description}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "piecesPerTrailer",
      headerName: "Pieces/Trailer",
      type: "string",
      width: props.mode !== "stock" ? 55 : 60,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderHeader: () => {
        return (
          <Box sx={{ fontSize: "0.9rem" }}>
            {/* <Box>Pieces /</Box> */}
            <Box>U/P</Box>
          </Box>
        );
      },
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>
              {params.row.piecesPerTrailer}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "string",
      width: props.mode !== "stock" ? 50 : 105,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        // const isInEditMode =
        //   rowModesModel[params.row._id]?.mode === GridRowModes.Edit;
        // console.log(isInEditMode);

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: props.mode !== "stock" ? "center" : "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              // bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: props.mode !== "stock" ? "1.2rem" : "1.8rem",
                fontWeight: 600,
              }}
            >
              {params.row.stock}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "stockDate",
      headerName: "Date",
      type: "string",
      width: props.mode !== "stock" ? 90 : 85,
      align: "left",
      headerAlign: "left",
      editable: props.mode === "stock" ? false : true,
      valueGetter: (currentValue, row) => {
        let newValue = "";
        const date = new Date(row.stockDate);
        if (isNaN(date.getTime())) {
          newValue = "Invalid Date";
        }
        const daysDifference = differenceInBusinessDays(new Date(), date);
        if (daysDifference > 0) {
          newValue = `Updated ${daysDifference} days ago`;
        } else {
          newValue = "Updated Today";
        }
        return newValue;
      },
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
            }}
          >
            {params.row?.stockDate && (
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color:
                    differenceInBusinessDays(
                      new Date(),
                      params.row?.stockDate
                    ) > 5
                      ? "var(--error75)"
                      : differenceInBusinessDays(
                          new Date(),
                          params.row?.stockDate
                        ) > 3
                      ? "var(--secondary65)"
                      : "var(--success75)",
                }}
              >
                {differenceInBusinessDays(new Date(), params.row?.stockDate) > 0
                  ? `Updated ${differenceInBusinessDays(
                      new Date(),
                      params.row?.stockDate
                    )} days ago`
                  : `Updated Today`}
              </Typography>
            )}
          </Box>
        );
      },
    },
    /* {
      field: "Projection",
      headerName: "Projection (test)",
      type: "string",
      width: 220,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        let partsFor24h = 0;
        let partsFor48h = 0;
        let partsFor1W = 0;
        let partsFor2W = 0;
        let partsFor1M = 0;
        let partsFor3M = 0;

        const totalparts = props.neededPartsArr.filter(
          (part) => part.partNumber === String(params.row.part)
        );

        totalparts.forEach((part) => {
          if (
            isTomorrow(
              new Date(processDateReq(part?.process, part?.dateReqForTrailer))
            ) ||
            isToday(
              new Date(
                new Date(processDateReq(part?.process, part?.dateReqForTrailer))
              )
            ) ||
            isPast(
              new Date(
                new Date(processDateReq(part?.process, part?.dateReqForTrailer))
              )
            )
          ) {
            partsFor24h = partsFor24h + part.qty;
          }

          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(part?.process, part?.dateReqForTrailer)
                ),
                2
              )
            )
          ) {
            partsFor48h = partsFor48h + part.qty;
          }
          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(part?.process, part?.dateReqForTrailer)
                ),
                5
              )
            )
          ) {
            partsFor1W = partsFor1W + part.qty;
          }
          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(part?.process, part?.dateReqForTrailer)
                ),
                10
              )
            )
          ) {
            partsFor2W = partsFor2W + part.qty;
          }
          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(part?.process, part?.dateReqForTrailer)
                ),
                20
              )
            )
          ) {
            partsFor1M = partsFor1M + part.qty;
          }
          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(part?.process, part?.dateReqForTrailer)
                ),
                60
              )
            )
          ) {
            partsFor3M = partsFor3M + part.qty;
          }
        });

        return (
          <Box
            onClick={() => handleOpenProjections(true, totalparts, params.row)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              "&:hover": {
                backgroundColor: "var(--success25)",
                borderRadius: "1rem",
              },
            }}
          >
            <Box
              sx={{
                width: "2rem",
                height: "100%",
                // bgcolor: "red",
                pt: 2.5,
                pb: 2.5,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                  borderBottom: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>24</Typography>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  bgcolor:
                    partsFor24h - params.row?.stock > 0 ? "var(--error75)" : "",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                }}
              >
                <Typography
                  sx={{
                    fontSize:
                      partsFor24h - params.row?.stock > 0 ? "1.1rem" : "1rem",
                    fontWeight:
                      partsFor24h - params.row?.stock > 0 ? "600" : "",
                  }}
                >
                  {partsFor24h}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "2rem",
                height: "100%",
                // bgcolor: "red",
                pt: 2.5,
                pb: 2.5,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                  borderBottom: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>48</Typography>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "green",
                  bgcolor:
                    partsFor48h - params.row?.stock > 0
                      ? "var(--datewarning)"
                      : "",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                }}
              >
                <Typography
                  sx={{
                    fontSize:
                      partsFor48h - params.row?.stock > 0 ? "1.1rem" : "1rem",
                    fontWeight:
                      partsFor48h - params.row?.stock > 0 ? "600" : "",
                  }}
                >
                  {partsFor48h}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "2rem",
                height: "100%",
                // bgcolor: "red",
                pt: 2.5,
                pb: 2.5,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                  borderBottom: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>1W</Typography>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "green",
                  bgcolor:
                    partsFor1W - params.row?.stock > 0
                      ? "var(--datewarning)"
                      : "",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                }}
              >
                <Typography
                  sx={{
                    fontSize:
                      partsFor1W - params.row?.stock > 0 ? "1.1rem" : "1rem",
                    fontWeight: partsFor1W - params.row?.stock > 0 ? "600" : "",
                  }}
                >
                  {partsFor1W}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "2rem",
                height: "100%",
                // bgcolor: "red",
                pt: 2.5,
                pb: 2.5,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                  borderBottom: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>2W</Typography>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>{partsFor2W}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "2rem",
                height: "100%",
                // bgcolor: "red",
                pt: 2.5,
                pb: 2.5,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                  borderBottom: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>1M</Typography>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>{partsFor1M}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "2rem",
                height: "100%",
                // bgcolor: "red",
                pt: 2.5,
                pb: 2.5,
              }}
            >
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // borderRight: "1px solid var(--secondary35)",
                  borderBottom: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>3M</Typography>
              </Box>
              <Box
                sx={{
                  height: "50%",
                  // bgcolor: "green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // borderRight: "1px solid var(--secondary35)",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>{partsFor3M}</Typography>
              </Box>
            </Box>
          </Box>
        );
      },
    }, */
    {
      field: "DTAF",
      headerName: "DTAF",
      type: "string",
      width: 55,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              // bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
              {params.row?.DTAF}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "TAF",
      headerName: "TAF",
      type: "number",
      width: props.mode !== "stock" ? 55 : 60,
      align: "left",
      headerAlign: "left",
      editable: false,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const row1 = cellParams1.api.getRow(cellParams1.id);
        const row2 = cellParams2.api.getRow(cellParams2.id);
    
        const isOverstocked1 = row1?.isOverstocked;
        const isOverstocked2 = row2?.isOverstocked;
    
        if (isOverstocked1 && !isOverstocked2) {
          return 1;
        } else if (!isOverstocked1 && isOverstocked2) {
          return -1; 
        } else {
          return v1 - v2;
        }
      },
      renderCell: (params) => {
        const taf =
          params.value !== null && params.value !== undefined
            ? Number(params.value).toFixed(1).replace(/[.,]0$/, "")
            : "";
    
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              bgcolor:
                Number(taf) >= 4
                  ? ""
                  : Number(taf) > 2
                  ? "var(--golden)"
                  : "var(--error75)",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>{taf}</Typography>
          </Box>
        );
      },
    },
    {
      field: "neededCuts",
      headerName: "Needed Cuts",
      type: "string",
      width: 125,
      align: "left",
      headerAlign: "left",
      editable: false,
    
      sortComparator: (v1, v2, params1, params2) => {
        const isV1Overstocked = v1 === "Overstocked";
        const isV2Overstocked = v2 === "Overstocked";
      
        if (isV1Overstocked || isV2Overstocked) {
          console.log(`Overstocked detected in comparison: v1 = ${v1}, v2 = ${v2}`);
        }
      
        const sortDirection = params1.api.getSortModel()[0]?.sort === "desc" ? -1 : 1;
      
        if (isV1Overstocked && isV2Overstocked) {
          return 0;
        }
      
        if (isV1Overstocked) {
          return 1 * sortDirection;
        }
        if (isV2Overstocked) {
          return -1 * sortDirection; 
        }
      
        const v1Number = isNaN(Number(v1)) ? 0 : Number(v1);
        const v2Number = isNaN(Number(v2)) ? 0 : Number(v2);
      
        return (v1Number - v2Number);
      },
      
    
    
      renderCell: (params) => {
        const taf = params.row.taf;
        const neededCutsValue = params.value;
    
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              bgcolor:
                taf <= 2
                  ? "var(--error75)"
                  : neededCutsValue !== "Overstocked" && Number(neededCutsValue) > 0
                  ? "var(--warning)"
                  : "",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>{neededCutsValue}</Typography>
          </Box>
        );
      },
    },
    
    {
      field: "status",
      headerName: "Status",
      // type: "string",
      width: 130,
      editable: false,
      renderCell: (params) => {
        apiRef.current = params.api;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              // bgcolor: "red",
            }}
          >
            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //   bgcolor: "red",
                }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    sx={{ minWidth: "100%" }}
                    labelId="status-label"
                    label="Status"
                    id="status"
                    value={selectedStatus}
                    onChange={handleChangeSelectedStatus}
                  >
                    <MenuItem value={"Up-to-date"}>Up-to-date</MenuItem>
                    <MenuItem value={"Caution"}>Caution</MenuItem>
                    <MenuItem value={"Outdated"}>Outdated</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {rowModesModel[params.row._id]?.mode !== GridRowModes.Edit && (
              <Typography
                sx={{
                  color:
                    params.row.status === "Up-to-date"
                      ? "var(--success)"
                      : params.row.status === "Caution"
                      ? "var(--datewarning)"
                      : "var(--error75)",
                  fontSize: "0.9rem",
                }}
              >
                {params.row.status}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "comments",
      headerName: "Comments",
      type: "string",
      width: 250,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              fontSize: "0.8rem",
              //   maxWidth: "3rem",
              height: "100%",
              textWrap: "wrap",
              wordBreak: "break-all",
              // "word-break": "break-all",
              // "overflow-wrap": "break-word",
              //   wordWrap: "break-word !important",
              //   bgcolor: "red",
            }}
          >
            {params.row?.comments}
          </Typography>
        );
      },
    },
    {
      field: "details",
      headerName: "Details",
      width: 140,
      editable: false,
      renderCell: (params) => {
        apiRef.current = params.api;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
            }}
          >
            {rowModesModel[params.row._id]?.mode !== GridRowModes.Edit && (
              <Box
                sx={{
                  color: "var(--secondary65)",
                  fontSize: "0.7rem",
                }}
              >
                {[
                  params.row.fenderType,
                  params.row.config,
                  params.row.doors,
                  params.row.specialReq,
                  params.row?.liftAxle,
                  params.row?.airInflation,
                ]?.map((option, index) => (
                  <Typography
                    sx={{ fontSize: "0.7rem", textWrap: "wrap" }}
                    key={index}
                  >
                    {option !== "Any" && option !== "" && index === 0
                      ? option + " Fender Br"
                      : ""}
                    {option !== "Any" && option !== "" && index === 1
                      ? option + " Hoppers"
                      : ""}
                    {option !== "Any" && option !== "" && index === 2
                      ? "Door Opens " + option
                      : ""}
                    {option !== "" && option !== null && index === 3
                      ? "Special Req: " + option
                      : ""}
                    {option !== "" && option !== null && index === 4
                      ? option
                      : ""}
                    {option !== "" && option !== null && index === 5
                      ? option
                      : ""}
                  </Typography>
                ))}
              </Box>
            )}
            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
              <Button
                variant="contained"
                onClick={() =>
                  handleOpenComments(true, params.row._id, params.row)
                }
              >
                Edit
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: "process",
      headerName: "Process",
      // type: "string",
      width: 180,
      editable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              // bgcolor: "red",
            }}
          >
            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  //   bgcolor: "red",
                }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel id="process-label">Process</InputLabel>
                  <Select
                    sx={{ minWidth: "100%" }}
                    labelId="process-label"
                    label="Process"
                    id="process"
                    value={selectedProcess}
                    onChange={handleChangeSelectedProcess}
                  >
                    <MenuItem value={"Front Frame"}>Front Frame</MenuItem>
                    <MenuItem value={"Rear Frame"}>Rear Frame</MenuItem>
                    <MenuItem value={"Walls"}>Walls</MenuItem>
                    <MenuItem value={"Box - Stage 1"}>Box - Stage 1</MenuItem>
                    <MenuItem value={"Box - Stage 2"}>Box - Stage 2</MenuItem>
                    <MenuItem value={"Box - Stage 3"}>Box - Stage 3</MenuItem>
                    <MenuItem value={"Box - Stage 4"}>Box - Stage 4</MenuItem>
                    <MenuItem value={"Small Parts"}>Small Parts</MenuItem>
                    <MenuItem value={"Box Finishing"}>Box Finishing</MenuItem>
                    <MenuItem value={"Front Frame Finishing"}>
                      Front Frame Finishing
                    </MenuItem>
                    <MenuItem value={"Rear Frame Finishing"}>
                      Rear Frame Finishing
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {rowModesModel[params.row._id]?.mode !== GridRowModes.Edit && (
              <Typography
                sx={{
                  fontSize: "0.9rem",
                }}
              >
                {params.row?.process}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "area",
      headerName: "Area (in2)",
      // type: "string",
      width: 90,
      editable: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              // bgcolor: "red",
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
              }}
            >
              {params.row?.area}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Part w Link",
      headerName: "Part with Link",
      type: "string",
      width: 218,
      editable: false,
      renderCell: (params) => {
        apiRef.current = params.api;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
              // bgcolor: "red",
              position: "relative",
            }}
          >
            {params.row?.onshapeName &&
              rowModesModel[params.row._id]?.mode !== GridRowModes.Edit && (
                <Typography
                  onClick={() => {
                    if (params.row?.onshapeURL)
                      window.open(`${params.row?.onshapeURL}`);
                  }}
                  sx={{
                    color: params.row?.onshapeURL
                      ? "var(--primary)"
                      : "var(--secondary65)",
                    fontSize: "0.9rem",
                    textDecoration: params.row?.onshapeURL ? "underline" : "",
                    textWrap: "wrap",
                  }}
                >
                  {params.row?.onshapeName}
                </Typography>
              )}

            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
              <Button
                sx={{
                  zIndex: 1000000,
                  size: 1,
                  mb:
                    rowModesModel[params.row._id]?.mode === GridRowModes.Edit
                      ? -1.5
                      : 0,
                }}
                onClick={() => {
                  handleOpenOnShapeDialog(true, params.row);
                }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
              >
                Edit Part Link
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: props.mode !== "stock" ? 90 : 110,
      cellClassName: "actions",
      getActions: (params) => {
        const isInEditMode =
          rowModesModel[params.row._id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={Math.random()}
              icon={
                <SaveIcon
                  sx={{
                    fontSize: props.mode !== "stock" ? "1.3rem" : "2.2rem",
                  }}
                />
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(params.row)}
            />,
            <GridActionsCellItem
              key={Math.random()}
              icon={
                <CancelIcon
                  sx={{
                    fontSize: props.mode !== "stock" ? "1.3rem" : "2.2rem",
                  }}
                />
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(params.row._id)}
              color="inherit"
            />,
          ];
        }

        return props.mode !== "stock"
          ? [
              <GridActionsCellItem
                key={Math.random()}
                icon={<EditIcon />}
                disabled={isEditing}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(params.row._id)}
                color="inherit"
              />,

              <GridActionsCellItem
                key={Math.random()}
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() =>
                  handleOpenDeletePart(
                    params.row._id,
                    params.row.partURL,
                    params.row.part
                  )
                }
                color="inherit"
              />,
            ]
          : [
              <GridActionsCellItem
                key={Math.random()}
                icon={<EditIcon sx={{ fontSize: "2.2rem" }} />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(params.row._id)}
                color="inherit"
              />,
            ];
      },
    },
  ];

  // needs removed columns:
  //   {
  //     field: "needs48hs",
  //     headerName: "Needs 48 hs",
  //     type: "string",
  //     width: 45,
  //     align: "left",
  //     headerAlign: "left",
  //     editable: true,
  //     renderHeader: () => {
  //       return (
  //         <Box sx={{ fontSize: "0.9rem" }}>
  //           {/* <Box>Needs</Box> */}
  //           <Box>48hs</Box>
  //         </Box>
  //       );
  //     },
  //     renderCell: (params) => {
  //       return (
  //         <Box
  //           sx={{
  //             display: "flex",

  //             justifyContent: "center",
  //             alignItems: "center",
  //             width: "100%",
  //             height: "100%",
  //             textWrap: "wrap",
  //             //   bgcolor: "red",
  //             //   textWrap: "wrap",
  //           }}
  //         >
  //           {params.row.stock >= params.row.needs48hs && (
  //             <Typography sx={{ fontSize: "1rem", color: "var(--success)" }}>
  //               {params.row.needs48hs}
  //             </Typography>
  //           )}
  //           {params.row.stock < params.row.needs48hs && (
  //             <Box
  //               sx={{
  //                 width: "100%",
  //                 height: "100%",
  //                 bgcolor: "var(--error)",
  //                 display: "flex",
  //                 justifyContent: "center",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Typography
  //                 sx={{
  //                   fontSize: "1rem",
  //                   color: "white",
  //                 }}
  //               >
  //                 {params.row.needs48hs}
  //               </Typography>
  //             </Box>
  //           )}
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     field: "needsWeek",
  //     headerName: "Needs Week",
  //     type: "string",
  //     width: 45,
  //     align: "left",
  //     headerAlign: "left",
  //     editable: true,
  //     renderHeader: () => {
  //       return (
  //         <Box sx={{ fontSize: "0.9rem" }}>
  //           {/* <Box>Needs</Box> */}
  //           <Box>Week</Box>
  //         </Box>
  //       );
  //     },
  //     renderCell: (params) => {
  //       return (
  //         <Box
  //           sx={{
  //             display: "flex",

  //             justifyContent: "center",
  //             alignItems: "center",
  //             width: "100%",
  //             height: "100%",
  //             textWrap: "wrap",
  //             //   bgcolor: "red",
  //             //   textWrap: "wrap",
  //           }}
  //         >
  //           {params.row.stock >= params.row.needsWeek && (
  //             <Typography sx={{ fontSize: "1rem", color: "var(--success)" }}>
  //               {params.row.needsWeek}
  //             </Typography>
  //           )}
  //           {params.row.stock < params.row.needsWeek && (
  //             <Box
  //               sx={{
  //                 width: "100%",
  //                 height: "100%",
  //                 bgcolor: "var(--error75)",
  //                 display: "flex",
  //                 justifyContent: "center",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Typography
  //                 sx={{
  //                   fontSize: "1rem",
  //                   color: "white",
  //                 }}
  //               >
  //                 {params.row.needsWeek}
  //               </Typography>
  //             </Box>
  //           )}
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     field: "needsMonth",
  //     headerName: "Needs Month",
  //     type: "string",
  //     width: 45,
  //     align: "left",
  //     headerAlign: "left",
  //     editable: true,
  //     renderHeader: () => {
  //       return (
  //         <Box sx={{ fontSize: "0.9rem" }}>
  //           {/* <Box>Needs</Box> */}
  //           <Box>Month</Box>
  //         </Box>
  //       );
  //     },
  //     renderCell: (params) => {
  //       return (
  //         <Box
  //           sx={{
  //             display: "flex",

  //             justifyContent: "center",
  //             alignItems: "center",
  //             width: "100%",
  //             height: "100%",
  //             textWrap: "wrap",
  //             //   bgcolor: "red",
  //             //   textWrap: "wrap",
  //           }}
  //         >
  //           {params.row.stock >= params.row.needsMonth && (
  //             <Typography sx={{ fontSize: "1rem", color: "var(--success)" }}>
  //               {params.row.needsMonth}
  //             </Typography>
  //           )}
  //           {params.row.stock < params.row.needsMonth && (
  //             <Box
  //               sx={{
  //                 width: "100%",
  //                 height: "100%",
  //                 bgcolor: "var(--warning)",
  //                 display: "flex",
  //                 justifyContent: "center",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Typography
  //                 sx={{
  //                   fontSize: "1rem",
  //                   color: "white",
  //                 }}
  //               >
  //                 {params.row.needsMonth}
  //               </Typography>
  //             </Box>
  //           )}
  //         </Box>
  //       );
  //     },
  //   },

  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    let partialColumns = initialColumns;

    if (props.mode === "bending") {
      //   partialColumns.splice(14, 1);
      partialColumns = initialColumns.filter(
        (column) =>
          column.field !== "process" &&
          column.field !== "onshapeURL" &&
          column.field !== "actions" &&
          column.field !== "DTAF" &&
          column.field !== "neededCuts" &&
          column.field !== "area"
      );
    }
    if (props.mode === "stock") {
      //   partialColumns.splice(14, 1);
      partialColumns = initialColumns.filter(
        (column) =>
          column.field !== "process" &&
          column.field !== "Projection" &&
          column.field !== "bending" &&
          column.field !== "details" &&
          column.field !== "piecesPerTrailer" &&
          column.field !== "TAF" &&
          column.field !== "status" &&
          column.field !== "onshapeName" &&
          column.field !== "partName" &&
          column.field !== "position" &&
          column.field !== "description" &&
          column.field !== "onshapeURL" &&
          column.field !== "DTAF" &&
          column.field !== "neededCuts" &&
          column.field !== "area" &&
          column.field !== "comments" &&
          column.field !== "Part w Link"
      );
    }

    if (props.showMat === "all") {
      setColumns(partialColumns);
    } else setColumns(partialColumns.slice(1));
  }, [
    props.showMat,
    rowModesModel,
    previewImage,
    previewBendingImage,
    optionalFeaturesName,
    selectedStatus,
    selectedProcess,
    props.isLoadingProjections,
    props.isLoadingPage,
  ]);

  const processedRows = React.useMemo(() => {
    return props.rows.map((row) => {
      const piecesPerTrailer = Number(row.piecesPerTrailer) || 0;
      const DTAF = Number(row.DTAF) || 0;
      const stock = Number(row.stock) || 0;
  
      const taf = piecesPerTrailer > 0 ? stock / piecesPerTrailer : null;
      const neededCutsValue = piecesPerTrailer * DTAF - stock;
      const neededCuts = neededCutsValue >= 0 ? neededCutsValue : "Overstocked";
      const isOverstocked = neededCutsValue < 0;
  
      return {
        ...row,
        taf,
        neededCuts,
        isOverstocked,
      };
    });
  }, [props.rows]);

  const [openBendingDoc, setOpenBendingDoc] = React.useState(false);
  const [openProjections, setOpenProjections] = React.useState(false);
  const [currentID, setCurrentID] = React.useState("");
  const [currentRow, setCurrentRow] = React.useState({});
  const [currentimageURL, setCurrentImageURL] = React.useState("");
  const [currentPartNumber, setCurrentPartNumber] = React.useState("");
  const [currentPartData, setCurrentPartData] = React.useState("");
  const [currentProjectionsData, setCurrentProjectionsData] =
    React.useState("");

  const [openComments, setOpenComments] = React.useState(false);
  const handleOpenComments = (state, id, row) => {
    setOpenComments(state);
    setCurrentID(id);
    setCurrentRow(row);
  };

  const handleCloseComments = () => {
    setOpenComments(false);
  };

  const handleOpenBendingDoc = (state, part) => {
    setOpenBendingDoc(state);
    setCurrentPartData(part);
  };

  const handleCloseBendingDoc = () => {
    setOpenBendingDoc(false);
  };

  const handleOpenProjections = (state, projections, part) => {
    setOpenProjections(state);
    setCurrentProjectionsData(projections);
    setCurrentPartData(part);
  };

  const handleCloseProjections = () => {
    setOpenProjections(false);
  };

  const [openDeletePart, setOpenDeletePart] = React.useState(false);
  const handleOpenDeletePart = (id, imageURL, partNumber) => {
    console.log(imageURL);
    setOpenDeletePart(true);
    setCurrentID(id);
    setCurrentImageURL(imageURL);
    setCurrentPartNumber(partNumber);
  };

  const handleCloseDeletePart = () => {
    setOpenDeletePart(false);
  };

  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSelectionModelChange = (newSelection) => {
    console.log(newSelection);
    setSelectedRows(newSelection);
  };

  const updateSelectedRowsStatus = async (newStatus) => {
    
    const updatedRows = props.rows.map((row) => {
      if (selectedRows.includes(row._id)) {
        if (newStatus === "Up-to-date") {
          return { ...row, status: "Up-to-date", stockDate: new Date() };
        } else if (newStatus === "Outdated") {
          return { ...row, status: "Outdated", stockDate: new Date() };
        } else if (newStatus === "Caution") {
          return { ...row, status: "Caution", stockDate: new Date() };
        }
      }
      return row;
    });

    console.log(props.rows);
    console.log(updatedRows);
    setIsUpdating(true);

    try {
      const response = await fetch("/api/cutting/update-multiple-parts", {
        method: "POST",
        body: JSON.stringify({
          parts: updatedRows.filter((row) => selectedRows.includes(row._id)),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        props.handleEditPartAlert(true, false);
        throw new Error("Failed to update part");
      }

      const result = await response.json();
      const newRows = props.rows.map((row) => {
        const updatedRow = updatedRows.find(
          (updatedRow) => updatedRow._id === row._id
        );
        return updatedRow || row;
      });

      console.log(newRows);
      console.log(apiRef);
      selectedRows.forEach((rowId) => {
        const updatedRow = updatedRows.find((row) => row._id === rowId);
        if (updatedRow) {
          apiRef.current.updateRows([{ id: rowId, ...updatedRow }]);
        }
      });

      props.handleEditPartAlert(true, true);
      props.handleUpdateAllRows(newRows);

      setIsEditing(false);
      setIsUpdating(false);

      return result;
    } catch (error) {
      console.error(error);
      props.handleEditPartAlert(true, false);
      setIsEditing(false);
      setIsUpdating(false);
      return null;
    }
  };

  // console.log(
  //   isTomorrow(new Date("2024-05-29T19:51:37.452Z")) ||
  //     isToday(new Date("2024-05-29T19:51:37.452Z"))
  // );

  // if (isUpdating) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         width: 1,
  //         minHeight: "100vh",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <CircularProgress
  //         size={65}
  //         thickness={4}
  //         sx={{
  //           color: "var(--primary75)",
  //         }}
  //       />
  //     </Box>
  //   )
  // }

  return (
    <Box
      sx={{
        mt: -5.8,
        height: props.mode !== "stock" ? "96.5%" : "92%",
        width: props.mode !== "stock" ? "96%" : "98%",
        // overflowY: "visible",

        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <AddPartDetails
        comments={props.comments}
        handleComments={props.handleComments}
        openComments={openComments}
        handleCloseComments={handleCloseComments}
        handleUpdatePartDetails={handleUpdatePartDetails}
        currentID={currentID}
        row={currentRow}
      />

      <OnShapeInformationDialog
        open={openOnShapeDialog}
        row={currentPartData}
        onClose={handleCloseOnShapeDialog}
        onSave={handleSaveOnShapeInfo}
      />

      <BendingDocDialog
        openBendingDoc={openBendingDoc}
        currentPartData={currentPartData}
        handleOpenBendingDoc={handleOpenBendingDoc}
        handleCloseBendingDoc={handleCloseBendingDoc}
      />
      <ProjectionsDialog
        openProjections={openProjections}
        currentProjectionsData={currentProjectionsData}
        handleOpenProjections={handleOpenProjections}
        handleCloseProjections={handleCloseProjections}
        processDateReq={processDateReq}
        currentPartData={currentPartData}
      />
      <DeletePartDialog
        isDeletingPart={props.isDeletingPart}
        currentID={currentID}
        openDeletePart={openDeletePart}
        imageURL={currentimageURL}
        currentPartNumber={currentPartNumber}
        handleOpenDeletePart={handleOpenDeletePart}
        handleCloseDeletePart={handleCloseDeletePart}
        handleDeletePart={handleDeletePart}
      />
      <DataGrid
        apiRef={apiRef}
        getRowClassName={(params) => {
          if (params.row.status === "Outdated") {
            return "outdated-parts";
          } else if (params.row.status === "Caution") {
            return "caution";
          } else {
            return "";
          }
        }}
        checkboxSelection={props.mode === "cutting"}
        onRowSelectionModelChange={handleSelectionModelChange}
        disableRowSelectionOnClick
        disableColumnMenu={props.mode !== "stock" ? false : true}
        loading={props.isLoadingPage || isUpdating}
        localeText={{ noRowsLabel: "No Parts for this filter" }}
        rowHeight={120}
        // getRowHeight={() => "auto"}
        rows={processedRows}
        // rows={props.unfilteredRows}
        handleGetPartsAfterDelete={props.handleGetPartsAfterDelete}
        columns={columns}
        editMode="row"
        // columnVisibilityModel={{
        //   // Hide columns status and traderName, the other columns will remain visible
        //   //   onshapeURL: false,
        //   needs48hs: false,
        //   needsWeek: false,
        //   needsMonth: false,
        // }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        onRowEditStart={handleRowEditStart}
        processRowUpdate={(updatedRow, originalRow) =>
          processRowUpdate(updatedRow, originalRow)
        }
        // processRowUpdate={(updatedRow, originalRow) => {
        //   setCurrentUpdatedRow(updatedRow);
        // }}
        getRowId={(row) => row._id}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            rows: props.rows,
            setRows: props.handleSetRows,
            setRowModesModel,
            showQuickFilter: true,
            uploadPartHandler: props.uploadPartHandler,
            nextPartNumber: props.nextPartNumber,
            isCreatingPart: props.isCreatingPart,
            mode: props.mode,
            selectedRows: selectedRows,
            updateSelectedRowsStatus: updateSelectedRowsStatus,
          },
        }}
        // columnGroupingModel={columnGroupingModel}
        pageSizeOptions={[100]}
        // pageSize={200}
        // hideFooter={true}

        sx={{
          ".outdated-parts": {
            bgcolor: "var(--error5)",
            "&:hover": {
              bgcolor: "var(--error25) !important",
            },
          },

          ".caution": {
            bgcolor: "var(--warning)",
            "&:hover": {
              bgcolor: "var(--warningdark) !important",
            },
          },

          border: 0,

          "& .MuiDataGrid-columnHeaders": {
            outline: "none !important",
            border: "none !important",
          },

          "& .MuiDataGrid-virtualScroller": {
            // overflowX: "hidden",
          },

          "& .MuiDataGrid-cell--textCenter": {
            textAlign: "right",
          },

          "& .MuiDataGrid-row": {
            cursor: "pointer",

            "&:hover": {
              backgroundColor: "var(--success15)",
            },
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell": {
            outline: "none",
            borderTop: "0.9px solid var(--success15)",
            borderBottom: "none !important",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
            // fontSize: "2rem !important",
          },

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--primary50)",
            },

            "&:hover fieldset": {
              borderColor: "var(--primary75)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--primary75)",
            },
            "& .MuiSvgIcon-root": {
              // backgroundColor: "red",
              color: "var(--secondary50)",
            },
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "0.9rem",
            color: "var(--secondary75)",
          },
          // "& .css-1b74o31-MuiInputBase-root-MuiDataGrid-editInputCell": {
          //   fontSize: "3.9rem !important",
          // },
          "& .MuiDataGrid-editInputCell": {
            fontSize: props.mode !== "stock" ? "" : "1.4rem !important",
          },
          // "& .css-yz9k0d-MuiInputBase-input": {
          //   // fontSize: "7.8rem !important",
          //   // bgcolor: "red !important",
          //   width: "3rem",
          // },
          "& .MuiInputBase-input": {},
        }}
      />
    </Box>
  );
}
