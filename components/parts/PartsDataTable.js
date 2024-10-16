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
import SupplierDialog from "./SupplierDialog.js";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import SpecDialog from "./SpecDialog.js";
import ProjectionsDialog from "./ProjectionsDialog.js";
import DeletePartDialog from "./DeletePartDialog.js";
import { isTomorrow, isToday, subBusinessDays, isPast } from "date-fns";
import ListSubheader from "@mui/material/ListSubheader";

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
import QualityCheckReports from "../../components/QC/QualityCheckReports.js";
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
  "4 Axle",
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

    props.handleSetTrailerOptionsName(selectedValues);
    props.handleTrailerOptions({ [props.id]: selectedValues });
    props.handleSetTrailerOptionsName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl
        size="small"
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
          value={props.trailerOptionsName}
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
              style={getStyles(name, props.trailerOptionsName, theme)}
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
  const { setRows, setRowModesModel } = props;

  return (
    <GridToolbarContainer sx={{ mt: props.mode !== "stock" ? 0 : 5 }}>
      {props.isCreatingPart && (
        <CircularProgress
          size={30}
          thickness={4}
          sx={{
            color: "primary",
            mr: 1,
          }}
        />
      )}
      {props.mode !== "stock" && (
        <Button
          color="primary"
          startIcon={<AddIcon />}
          disabled={props.mode === "spec"}
          onClick={() =>
            props.uploadPartHandler({
              mat: "",
              WT: "",
              onshapeURL: "",
              trailerType: null,
              part: props.nextPartNumber,
              position: "",
              description: "",
              piecesPerTrailer: "",
              stock: "",
              DTAF: 5,
              needs48hs: "",
              needsWeek: "",
              needsMonth: "",
              status: "",
              fenderType: "Any",
              config: "Any",
              doors: "Any",
              specialReq: "",
              status: "Up-to-date",
              partURL: "",
              onshapeName: "",
              onshapeURL: "",
              specIsRequired: true,
              stockDate: new Date(),
            })
          }
          variant="contained"
          sx={{ ml: -1, borderRadius: "0.5rem" }}
        >
          Part
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

  React.useEffect(() => {
    setRepeatedParts(props.repeatedPartNumbers);
  }, [props.repeatedPartNumbers]);

  const [selectedStatus, setSelectedStatus] = React.useState("Any");
  //   const [selectedStatus, setSelectedStatus] = React.useState("Up-to-date");

  const handleSpecSave = () => {
    console.log();
  };

  const [currentRow, setCurrentRow] = React.useState(null);

  const handleChangeSelectedStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [selectedProcess, setSelectedProcess] = React.useState("Front Frame");

  const handleChangeSelectedProcess = (event) => {
    setSelectedProcess(event.target.value);
  };
  const [selectedType, setSelectedType] = React.useState("");

  const handleChangeSelectedType = (event) => {
    setSelectedType(event.target.value);
  };

  const [supplier, setSupplier] = React.useState("");
  const [specLink, setSpecLink] = React.useState("");

  const handleChangeSupplier = (event) => {
    setSupplier(event.target.value);
  };
  const handleChangeSpecLink = (event) => {
    setSpecLink(event.target.value);
  };
  const [supplierURL, setSupplierURL] = React.useState("");

  const handleChangeSupplierURL = (event) => {
    setSupplierURL(event.target.value);
  };
  const [supplierEmail, setSupplierEmail] = React.useState("");

  const handleChangeSupplierEmail = (event) => {
    setSupplierEmail(event.target.value);
  };
  const [supplierPhone, setSupplierPhone] = React.useState("");

  const handleChangeSupplierPhone = (event) => {
    setSupplierPhone(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleChangeSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
  const [unit, setUnit] = React.useState("");

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  const [specMode, setSpecMode] = React.useState("view"); // 'view' or 'edit'
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenSpecDialog = (mode) => {
    setSpecMode(mode);
    setIsDialogOpen(true);
  };

  const handleCloseSpecDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUploadAllImages = async (specImages) => {
    const newUrls = [];
    try {
      for (const specImage of specImages) {
        if (typeof specImage === "string") {
          newUrls.push(specImage);
          continue;
        }
        let data = new FormData();

        data.append("file", specImage.image);
        data.append("tags", [specImage.id]);
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

        if (!response.ok) {
          return null;
        }

        const imgData = await response.json();
        newUrls.push(imgData.secure_url);
        console.log(imgData);
      }

      console.log(newUrls);
      return newUrls;
    } catch (error) {
      console.error(error);
    }

    // setIsLoading(false);
  };

  const ensureHttps = (url) => {
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const saveSpec = async (specImages, specLink, currentPart) => {
    const newUrls = await handleUploadAllImages(specImages);

    const newSpecLink = ensureHttps(specLink);

    const response = await fetch("/api/parts/upload-spec-imgs", {
      method: "POST",
      body: JSON.stringify({
        id: currentPartData._id,
        specImages: newUrls,
        specURL: newSpecLink,
        isSpecImages: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(currentPart);
      apiRef.current.updateRows([
        {
          id: currentPart._id,
          ...currentPart,
          specImages: newUrls,
          specURL: newSpecLink,
          isSpecImages: true,
        },
      ]);
      props.handleActiveAlert(true, "success", "Specs saved successfully");
      setRowModesModel({
        ...rowModesModel,
        [currentPart._id]: { mode: GridRowModes.View },
      });
    }

    return response;
  };

  const [trailerOptionsName, setTrailerOptionsName] = React.useState([]);

  const handleSetTrailerOptionsName = (state) => {
    setTrailerOptionsName(state);
  };

  const [trailerOptions, setTrailerOptions] = React.useState(false);

  const handleTrailerOptions = (state) => {
    setTrailerOptions(state);
  };
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params) => {
    const row = props.rows.find((row) => row._id === params.id);
    setSelectedStatus(row.status);
    setSelectedProcess(row.process);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    if (props.isCreatingPart || isEditing || isUpdating) {
      console.error("Didn't allow edit click");
      return;
    }

    const row = props.rows.find((row) => row._id === id);
    console.log(row);
    setSelectedStatus(row?.status);
    setSelectedProcess(row?.process);
    setTrailerOptionsName(row?.trailerType || []);
    setIsEditing(true);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  React.useEffect(() => {
    console.log(apiRef);
  }, [apiRef]);

  const handleUpdateSupplier = async (row, newSupplierList) => {
    try {
      const part = { ...row, suppliers: newSupplierList };
      console.log(part);

      const response = await fetch("/api/parts/update-part", {
        method: "POST",
        body: JSON.stringify({
          part,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        props.handleEditPartAlert(true, false);
        // props.handleUpdateAllRows(props.rows);
        throw new Error("Failed to update part");
      }

      const newRows = props.rows.map((row) =>
        row._id === part._id ? part : row
      );
      console.log(newRows);
      props.handleUpdateAllRows(newRows);
      props.handleActiveAlert(true, "success", "The suppliers were updated");
      apiRef.current.updateRows([{ id: part._id, ...part }]);
      setRowModesModel({
        ...rowModesModel,
        [part._id]: { mode: GridRowModes.View },
      });
    } catch (error) {
      console.error(error);
      props.handleActiveAlert(true, "error", "The update to suppliers failed");
    }
  };

  async function handleUpdatePart(part) {
    if (selectedStatus !== "") {
      part.status = selectedStatus;
    }
    if (selectedProcess !== "") {
      part.process = selectedProcess;
    }
    if (selectedCategory !== "") {
      part.category = selectedCategory;
    }

    if (selectedType !== "") {
      part.type = selectedType;
    }
    if (unit !== "") {
      part.unit = unit;
    }
    if (supplier !== "") {
      part.supplier = supplier;
    }
    if (supplierURL !== "") {
      part.supplierURL = supplierURL;
    }
    if (supplierEmail !== "") {
      part.supplierEmail = supplierEmail;
    }
    if (supplierPhone !== "") {
      part.supplierPhone = supplierPhone;
    }
    if (specLink !== "") {
      part.specLink = specLink;
    }

    setRowModesModel({
      ...rowModesModel,
      [part._id]: { mode: GridRowModes.View },
    });

    if (trailerOptions && trailerOptions[part._id]) {
      part.trailerType = trailerOptions[part._id];
    }

    const response = await fetch("/api/parts/update-part", {
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

      props.handleEditPartAlert(true);
    }
  }

  const [isEditing, setIsEditing] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  async function handleUpdateNoSpecRequired(oldRow, specIsRequired) {
    const response = await fetch("/api/parts/upload-spec-imgs", {
      method: "POST",
      body: JSON.stringify({
        id: oldRow._id,
        specImages: null,
        specURL: null,
        isSpecImages: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(oldRow._id);
      props.handleActiveAlert(
        true,
        "success",
        "Successfully set part to no specs"
      );
      console.log(apiRef);
      apiRef.current.updateRows([
        {
          ...oldRow,
          id: oldRow._id,
          specImages: null,
          specURL: null,
          isSpecImages: null,
        },
      ]);
    } else {
      props.handleActiveAlert(true, "error", "Failed to set part to no specs");
    }
  }

  async function handleDeletePart(id, password) {
    props.handleIsDeletingPart(true);
    const response = await fetch("/api/parts/delete-part", {
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
      props.handleDeletePartAlert(true);
      //   props.handleSetRows(
      //     props.rows.filter((row) => {
      //       row._id !== id;
      //     })
      //   );
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

    setPreviewSpecImage(null);
    setPreviewImage(null);
    setIsEditing(false);
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const updatedRow = { ...newRow, isNew: false };

      setIsUpdating(true);

      if (selectedStatus !== "") {
        updatedRow.status = selectedStatus;
      }

      if (selectedProcess !== "") {
        updatedRow.process = selectedProcess;
      }

      if (selectedCategory !== "") {
        updatedRow.category = selectedCategory;
      }
      if (selectedType !== "") {
        updatedRow.type = selectedType;
      }

      if (unit !== "") {
        updatedRow.unit = unit;
      }

      if (supplier !== "") {
        updatedRow.supplier = supplier;
      }
      if (supplierURL !== "") {
        updatedRow.supplierURL = supplierURL;
      }
      if (supplierEmail !== "") {
        updatedRow.supplierEmail = supplierEmail;
      }
      if (supplierPhone !== "") {
        updatedRow.supplierPhone = supplierPhone;
      }

      if (specLink !== "") {
        updatedRow.specLink = specLink;
      }

      updatedRow.stockDate = new Date();

      const id = newRow._id;
      if (trailerOptions && trailerOptions[id]) {
        const trailerTypes = trailerOptions[id];
        if (trailerTypes && trailerTypes.length > 0) {
          updatedRow.trailerType = trailerTypes;
        }
      }

      if (previewImage?.id === id && previewImage.image) {
        handleUploadImage(id);
      }

      if (previewSpecImage?.id === id && !!previewSpecImage?.image) {
        handleUploadSpecImage(id);
      }

      console.log(updatedRow);
      // const response = await fetch("/api/cutting/update-part", {
      //   method: "POST",
      //   body: JSON.stringify({ part: updatedRow}),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const response = await fetch("/api/parts/update-part-from-edit", {
        method: "POST",
        body: JSON.stringify({ part: updatedRow }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        props.handleEditPartAlert(true, false);
        // props.handleUpdateAllRows(props.rows);
        throw new Error("Failed to update part");
      }

      // const updatedRow = await response.json();
      // console.log(newRow)
      console.log(updatedRow);
      const newRows = props.rows.map((row) =>
        row._id === newRow._id ? updatedRow : row
      );
      console.log(newRows);
      props.handleActiveAlert(true, "success", "Row Saved Succesfully");
      props.handleUpdateAllRows(newRows);
      setIsEditing(false);
      setIsUpdating(false);
      setSelectedProcess([]);
      // setIsSpec(() => {
      //   return null;
      // });;
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      return updatedRow;
    } catch (error) {
      console.error(error);
      setIsEditing(false);
      setIsUpdating(false);
      props.handleActiveAlert(true, "error", "Row Failed to Save");
      // setIsSpec(() => {
      //   return null;
      // });;
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      return oldRow; // Revert back to old row data if update fails
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log("this was called", newRowModesModel);
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
    const data = new FormData();

    data.append("file", previewImage.image);
    data.append("tags", [id]);
    data.append("folder", "External Parts Images");
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

    if (imgData?.secure_url) {
      //   setUploadImgURL(imgData?.secure_url);

      const response = await fetch("/api/parts/upload-parts-imgs", {
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
        setPreviewImage(null);
      }
      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }

    // setIsLoading(false);
  }
  //upload part images logic - end

  //upload spec doc logic - start
  const [previewSpecImage, setPreviewSpecImage] = React.useState(null);

  const handleSelectSpecImage = (event, id) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewSpecImage({ id: id, image: fileReader.result });
    });
    fileReader?.readAsDataURL(file);
  };

  async function handleUploadSpecImage(id) {
    // setIsLoading(true);
    const data = new FormData();

    data.append("file", previewSpecImage.image);
    data.append("tags", [id]);
    data.append("folder", "External Parts Specs Images");
    data.append("upload_preset", "quality-check-reports");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ddxhm7w2n/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const imgSpecData = await response.json();

    if (imgSpecData?.secure_url) {
      //   setUploadImgURL(imgData?.secure_url);

      const response = await fetch("/api/parts/upload-spec-imgs", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          url: imgSpecData.secure_url,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPreviewSpecImage(null);
      }
      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }

    // setIsLoading(false);
  }
  //upload spec doc images logic - end

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
      field: "mat2",
      headerName: "Type",
      width: 120,
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
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    sx={{ minWidth: "100%" }}
                    labelId="type-label"
                    label="Type"
                    id="type"
                    value={selectedType}
                    onChange={handleChangeSelectedType}
                  >
                    <MenuItem value={"Ready"}>Ready</MenuItem>
                    <MenuItem value={"Processed"}>Processed</MenuItem>
                    <MenuItem value={"Raw"}>Raw</MenuItem>
                    <MenuItem value={"Consumable"}>Consumable</MenuItem>
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
                {params.row?.type}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "mat",
      headerName: "Category",
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
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    sx={{ minWidth: "100%" }}
                    labelId="category-label"
                    label="Category"
                    id="category"
                    value={selectedCategory}
                    onChange={handleChangeSelectedCategory}
                  >
                    <ListSubheader
                      sx={{
                        mb: -0.5,
                        bgcolor: "var(--success5)",
                        fontWeight: "600",
                      }}
                    >
                      Ready-to-use Materials
                    </ListSubheader>
                    <MenuItem value={"Bolts"}>Bolts</MenuItem>
                    <MenuItem value={"Hucks"}>Hucks</MenuItem>
                    <MenuItem value={"Washers"}>Washers</MenuItem>
                    <MenuItem value={"Nuts"}>Nuts</MenuItem>
                    <MenuItem value={"Rivets"}>Rivets</MenuItem>
                    <MenuItem value={"Hoses"}>Hoses</MenuItem>
                    <MenuItem value={"Valves"}>Valves</MenuItem>
                    <MenuItem value={"Air Line Tubing"}>
                      Air Line Tubing
                    </MenuItem>
                    <MenuItem value={"Lights"}>Lights</MenuItem>
                    <MenuItem value={"Bezels"}>Bezels</MenuItem>
                    <MenuItem value={"Fittings"}>Air Fittings</MenuItem>
                    <MenuItem value={"Tires"}>Tires</MenuItem>
                    <MenuItem value={"Rims"}>Rims</MenuItem>
                    <MenuItem value={"Fenders"}>Fenders</MenuItem>
                    <MenuItem value={"Axles"}>Axles</MenuItem>
                    <MenuItem value={"Tarps"}>Tarps</MenuItem>
                    <MenuItem value={"Air Tanks"}>Air Tanks</MenuItem>
                    <MenuItem value={"Rubber"}>Rubber</MenuItem>
                    <MenuItem value={"Bushings"}>Bushings</MenuItem>
                    <MenuItem value={"Filters"}>Filters</MenuItem>
                    <MenuItem value={"Tapes"}>Tapes</MenuItem>
                    <MenuItem value={"Cables"}>Cables</MenuItem>
                    <MenuItem value={"Harnesses"}>Harnesses</MenuItem>
                    <MenuItem value={"Boxes"}>Boxes</MenuItem>
                    <MenuItem value={"Landing Gear"}>Landing Gear</MenuItem>
                    <MenuItem value={"Fifth Wheel Plate"}>
                      Fifth Wheel Plate
                    </MenuItem>
                    <MenuItem value={"Bars"}>Bars</MenuItem>
                    <MenuItem value={"Pipes"}>Pipes</MenuItem>
                    <MenuItem value={"Rods"}>Rods</MenuItem>
                    <MenuItem value={"Walkways"}>Walkways</MenuItem>
                    <MenuItem value={"Steps"}>Steps</MenuItem>
                    <MenuItem value={"Others - Electric"}>
                      Others - Electric
                    </MenuItem>
                    <MenuItem value={"Others - Mechanic"}>
                      Others - Mechanic
                    </MenuItem>
                    <MenuItem value={"Others - General"}>
                      Others - General
                    </MenuItem>
                    <ListSubheader
                      sx={{
                        mb: -0.5,
                        bgcolor: "var(--success5)",
                        fontWeight: "600",
                      }}
                    >
                      Processed Materials
                    </ListSubheader>
                    <MenuItem value={"W Arms"}>W Arms</MenuItem>
                    <MenuItem value={"Support Arms"}>Support Arms</MenuItem>
                    <ListSubheader
                      sx={{
                        mb: -0.5,
                        bgcolor: "var(--success5)",
                        fontWeight: "600",
                      }}
                    >
                      Consumables Materials
                    </ListSubheader>
                    <MenuItem value={"Plasma Consumables"}>
                      Plasma Consumables
                    </MenuItem>
                    <MenuItem value={"Gas"}>Gas</MenuItem>
                    <MenuItem value={"Welding Wire"}>Welding Wire</MenuItem>
                    <MenuItem value={"Cutting Discs"}>Cutting Discs</MenuItem>
                    <MenuItem value={"Coolant"}>Coolant</MenuItem>
                    <MenuItem value={"Lubricants"}>Lubricants</MenuItem>
                    <MenuItem value={"PPE"}>PPE</MenuItem>
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
                {params.row?.category}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "part",
      // repeatedPartNumbers
      headerName: "Part",
      type: "string",
      width: props.mode !== "stock" ? 80 : 82,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => (
        <PartNumber
          repeatedPartNumbers={props.repeatedPartNumbers}
          nextPartNumber={props.nextPartNumber}
          params={params}
        />
      ),
    },
    {
      field: "code",
      headerName: "Code",
      width: props.mode !== "stock" ? 100 : 75,
      editable: true,
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
      field: "Spec",
      headerName: "Spec",
      type: "string",
      width: 188,
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
            {params.row?.specImages?.length > 0 &&
              rowModesModel[params.row._id]?.mode != GridRowModes.Edit &&
              params.row?.isSpecImages && (
                <Image
                  onClick={() => handleOpenSpecDoc(true, params.row, "view")}
                  src={params.row?.specImages[0]}
                  alt="logo"
                  style={{ objectFit: "contain" }}
                  fill={true}
                  sizes={"100%"}
                  priority={true}
                />
              )}
            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
              <Button
                sx={{
                  zIndex: 1000000,
                  mb:
                    rowModesModel[params.row._id]?.mode === GridRowModes.Edit
                      ? -1.5
                      : 0,
                }}
                // onChange={() =>
                //   handleSelectSpecImage(event, params.row._id)
                // }
                onClick={() => {
                  handleOpenSpecDoc(true, params.row, "edit");
                }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {/* {!params.row?.specURL ? "Upload Image" : "Edit Spec"} */}
                Edit Spec
                {/* <VisuallyHiddenInput type="file" /> */}
              </Button>
            )}
            {params.row?.isSpecImages === false &&
              rowModesModel[params.row._id]?.mode !== GridRowModes.Edit && (
                <Typography sx={{ fontSize: "0.8rem", textWrap: "wrap" }}>
                  No Spec
                </Typography>
              )}

            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
              <Button
                // variant="contained"
                sx={{ mt: 2 }}
                onClick={() => handleUpdateNoSpecRequired(params.row, false)}
              >
                No Spec
              </Button>
            )}
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

            {rowModesModel[params.row._id]?.mode != GridRowModes.Edit &&
              params.row.trailerType?.map((trailer, index) => (
                <Typography
                  sx={{ fontSize: "0.7rem", textWrap: "wrap" }}
                  key={index}
                >
                  {trailer}
                </Typography>
              ))}

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
                <MultipleSelectChip
                  id={params.row._id}
                  handleTrailerOptions={handleTrailerOptions}
                  trailerOptionsName={trailerOptionsName}
                  handleSetTrailerOptionsName={handleSetTrailerOptionsName}
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
            <Box>U/T</Box>
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

                {/* {differenceInBusinessDays(new Date(), params.row?.stockDate)} */}
                {/* ${new Date()?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  weekday: "short",
                })} */}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 110,
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
                  <InputLabel id="unit-label">Unit</InputLabel>
                  <Select
                    sx={{ minWidth: "100%" }}
                    labelId="unit-label"
                    label="Unit"
                    id="unit"
                    value={unit}
                    onChange={handleChangeUnit}
                  >
                    <MenuItem value={"Units"}>Units</MenuItem>
                    <MenuItem value={"Inches"}>Inches</MenuItem>
                    <MenuItem value={"Feet"}>Feet</MenuItem>
                    <MenuItem value={"Meters"}>Meters</MenuItem>
                    <MenuItem value={"lb"}>lb</MenuItem>
                    <MenuItem value={"kg"}>kg</MenuItem>
                    <MenuItem value={"Gallons"}>Gallons</MenuItem>
                    <MenuItem value={"Liters"}>Liters</MenuItem>
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
                {params.row?.unit}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      type: "string",
      width: props.mode !== "stock" ? 100 : 70,
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
            <Typography sx={{ fontSize: "1rem" }}>
              {params.row?.location}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "inProgress",
      headerName: "In Progress",
      type: "string",
      width: props.mode !== "stock" ? 120 : 70,
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
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "0.9rem" }}>
              {params.row?.inProgress}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "DOS",
      headerName: "Days of Supply",
      type: "string",
      width: props.mode !== "stock" ? 120 : 60,
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
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>
              {params.row.stock}
            </Typography>

            {/* <Typography sx={{ fontSize: "1rem" }}>
                {params.row?.piecesPerTrailer.length}
              </Typography> */}
          </Box>
        );
      },
    },
    {
      field: "orderCycle",
      headerName: "Order Cycle",
      type: "string",
      width: props.mode !== "stock" ? 100 : 60,
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
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>
              {params.row?.orderCycle}
            </Typography>

            {/* <Typography sx={{ fontSize: "1rem" }}>
                  {params.row?.piecesPerTrailer.length}
                </Typography> */}
          </Box>
        );
      },
    },
    {
      field: "minLot",
      headerName: "Min Lot",
      type: "string",
      width: props.mode !== "stock" ? 80 : 60,
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
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>
              {params.row?.minLot}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "safetyStock",
      headerName: "Safety Stock",
      type: "string",
      width: props.mode !== "stock" ? 110 : 60,
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
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>
              {params.row?.safetyStock}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "cost",
      headerName: "Cost ($)",
      type: "string",
      width: props.mode !== "stock" ? 80 : 70,
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
              //   bgcolor: "red",
              //   textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>
              {params.row?.cost}
            </Typography>
          </Box>
        );
      },
    },
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
      valueGetter: (curValue, row) => {
        const piecesPerTrailer = Number(row.piecesPerTrailer);
        const stock = Number(row.stock);
        const value = piecesPerTrailer > 0 ? stock / piecesPerTrailer : null;
        return value;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2;
      },
      renderCell: (params) => {
        const piecesPerTrailer = Number(params.row.piecesPerTrailer);
        const stock = Number(params.row.stock);
        const taf =
          piecesPerTrailer > 0
            ? (stock / piecesPerTrailer).toFixed(1).replace(/[.,]0$/, "")
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
      headerName: "Needed Order",
      type: "string",
      width: 125,
      align: "left",
      headerAlign: "left",
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
              textWrap: "wrap",
              bgcolor:
                Number(
                  params.row?.piecesPerTrailer?.length > 0
                    ? (params.row.stock / params.row.piecesPerTrailer)
                        .toFixed(1)
                        .replace(/[.,]0$/, "")
                    : ""
                ) <= 2
                  ? "var(--error75)"
                  : Number(params.row?.piecesPerTrailer) *
                      Number(params.row?.DTAF) -
                      Number(params.row?.stock) >
                    0
                  ? "var(--warning)"
                  : "",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>
              {Number(params.row?.piecesPerTrailer) * Number(params.row?.DTAF) -
                Number(params.row?.stock) >=
              0
                ? Number(params.row?.piecesPerTrailer) *
                    Number(params.row?.DTAF) -
                  Number(params.row?.stock)
                : "Overstocked"}
            </Typography>
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
              fontSize: "0.6rem",
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
                    <MenuItem value={"Consumable"}>Consumable</MenuItem>
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
      field: "suppliers",
      headerName: "Suppliers",
      // type: "string",
      width: 180,
      editable: false,
      hide: true,
      renderCell: (params) => {
        apiRef.current = params.api;
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              height: "100%",
              //   bgcolor: "blue",
            }}
          >
            {rowModesModel[params.row._id]?.mode === GridRowModes.Edit && (
              <Box
                sx={{
                  width: "100%",
                  minHeight: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  //   bgcolor: "red",
                  //   py: 1,
                  //   transform: "scale(0.7)",
                }}
              >
                <Button
                  // variant="contained"
                  onClick={() => {
                    handleOpenSupplierView(
                      true,
                      params.row._id,
                      params.row,
                      "edit"
                    );
                  }}
                >
                  Edit Supplier List
                </Button>

                {/* <TextField
                  sx={{ transform: "scale(0.6)", mb: -1.3, mt: -0.3 }}
                  size="small"
                  fullWidth
                  id="outlined-basic1"
                  label="Supplier"
                  variant="outlined"
                  // type="number"
                  value={supplier}
                  onChange={handleChangeSupplier}
                />
                <TextField
                  sx={{ transform: "scale(0.6)", mb: -1.3 }}
                  size="small"
                  fullWidth
                  id="outlined-basic2"
                  label="Supplier URL"
                  variant="outlined"
                  // type="number"
                  value={supplierURL}
                  onChange={handleChangeSupplierURL}
                />
                <TextField
                  sx={{ transform: "scale(0.6)", mb: -1.3 }}
                  size="small"
                  fullWidth
                  id="outlined-basic3"
                  label="Email"
                  variant="outlined"
                  // type="number"
                  value={supplierEmail}
                  onChange={handleChangeSupplierEmail}
                />
                <TextField
                  sx={{ transform: "scale(0.6)", mb: -0.3 }}
                  size="small"
                  fullWidth
                  id="outlined-basic4"
                  label="Phone"
                  variant="outlined"
                  // type="number"
                  value={supplierPhone}
                  onChange={handleChangeSupplierPhone}
                /> */}
              </Box>
            )}

            {rowModesModel[params.row._id]?.mode !== GridRowModes.Edit && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  py: 1,
                  alignItems: "flex-start",
                  width: "100%",
                  height: "100%",

                  //   textWrap: "wrap",
                  //   bgcolor: "red",
                }}
              >
                <Button
                  onClick={() => {
                    handleOpenSupplierView(
                      true,
                      params.row._id,
                      params.row,
                      "view"
                    );
                  }}
                >
                  View Suppliers
                </Button>
                {/* <Typography
                  onClick={() => window.open(`${params.row?.supplierURL}`)}
                  //   onClick={() => window.open("https://www.mcmaster.com")}
                  sx={{
                    color: "var(--primary)",
                    fontSize: "0.9rem",
                    textDecoration: "underline",
                  }}
                >
                  {params?.row?.supplier}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--secondary65)",
                    fontSize: "0.9rem",
                    // bgcolor: "blue",
                    //   textDecoration: "underline",
                  }}
                >
                  {params?.row?.supplierPhone}
                </Typography>
                <Typography
                  href={`mailto:test@example.com`}
                  sx={{
                    color: "var(--secondary65)",
                    fontSize: "0.9rem",
                    //   textDecoration: "underline",
                  }}
                >
                  {params?.row?.supplierEmail}
                </Typography> */}
              </Box>
            )}
          </Box>
        );
      },
    },
    // {
    //   field: "onshapeURL",
    //   headerName: "OnShape Link",
    //   type: "string",
    //   width: 130,
    //   align: "left",
    //   headerAlign: "left",
    //   editable: true,
    //   renderCell: (params) => {
    //     return (
    //       <Typography
    //         sx={{
    //           display: "flex",
    //           justifyContent: "flex-start",
    //           alignItems: "center",
    //           width: "100%",
    //           fontSize: "0.6rem",
    //           //   maxWidth: "3rem",
    //           height: "100%",
    //           textWrap: "wrap",
    //           wordBreak: "break-all",
    //           // "word-break": "break-all",
    //           // "overflow-wrap": "break-word",
    //           //   wordWrap: "break-word !important",
    //           //   bgcolor: "red",
    //         }}
    //       >
    //         {params.row?.onshapeURL}
    //       </Typography>
    //     );
    //   },
    // },
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
              onClick={() => handleSaveClick(params.row._id)}
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
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(params.row._id)}
                color="inherit"
              />,

              <GridActionsCellItem
                key={Math.random()}
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleOpenDeletePart(params.row._id)}
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

    if (props.mode === "spec") {
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
          column.field !== "spec" &&
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
          column.field !== "area"
      );
    }

    if (props.showType === "all") {
      setColumns(partialColumns);
    } else setColumns(partialColumns.slice(1));
  }, [
    props.showType,
    rowModesModel,
    previewImage,
    previewSpecImage,
    trailerOptionsName,
    selectedStatus,
    selectedProcess,
    selectedCategory,
    unit,
    selectedType,
    supplier,
    supplierURL,
    supplierEmail,
    supplierPhone,
    specLink,
    props.isLoadingProjections,
    props.isLoadingPage,
  ]);

  const [openSpecDoc, setOpenSpecDoc] = React.useState(false);
  const [openProjections, setOpenProjections] = React.useState(false);
  const [currentID, setCurrentID] = React.useState("");
  const [currentPartData, setCurrentPartData] = React.useState("");
  const [currentProjectionsData, setCurrentProjectionsData] =
    React.useState("");

  const [openSupplierView, setOpenSupplierView] = React.useState(false);
  const [openSupplierViewMode, setOpenSupplierViewMode] = React.useState(false);

  const handleOpenSupplierView = (state, id, row, mode) => {
    setOpenSupplierView(state);
    setCurrentID(id);
    setCurrentRow(row);
    setOpenSupplierViewMode(mode);
  };

  const handleCloseSupplierView = (id) => {
    setOpenSupplierView(false);
    setCurrentID(null);
    setCurrentRow(null);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleOpenSpecDoc = (state, part, newSpecMode) => {
    setOpenSpecDoc(state);
    setCurrentPartData(part);
    if (newSpecMode) {
      setSpecMode(newSpecMode);
    }
  };

  const handleCloseSpecDoc = () => {
    setOpenSpecDoc(false);
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
  const handleOpenDeletePart = (id) => {
    setOpenDeletePart(true);
    setCurrentID(id);
  };

  const handleCloseDeletePart = () => {
    setOpenDeletePart(false);
  };

  // console.log(
  //   isTomorrow(new Date("2024-05-29T19:51:37.452Z")) ||
  //     isToday(new Date("2024-05-29T19:51:37.452Z"))
  // );

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
      <SupplierDialog
        comments={props.comments}
        handleComments={props.handleComments}
        openSupplierView={openSupplierView}
        row={currentRow}
        uniqueSuppliersArray={props?.uniqueSuppliersArray}
        mode={openSupplierViewMode}
        handleCloseSupplierView={handleCloseSupplierView}
        handleUpdateSupplier={handleUpdateSupplier}
        handleActiveAlert={props.handleActiveAlert}
        currentID={currentID}
      />
      <SpecDialog
        openSpecDoc={openSpecDoc}
        currentPartData={currentPartData}
        specMode={specMode}
        handleCloseSpecDoc={handleCloseSpecDoc}
        activeAlert={props.handleActiveAlert}
        saveSpec={saveSpec}
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
        disableColumnMenu={props.mode !== "stock" ? false : true}
        loading={props.isLoadingPage}
        localeText={{ noRowsLabel: "No Parts for this filter" }}
        rowHeight={120}
        // getRowHeight={() => "auto"}
        rows={props.rows}
        // rows={props.unfilteredRows}
        handleGetPartsAfterDelete={props.handleGetPartsAfterDelete}
        columns={columns}
        editMode="row"
        disableRowSelectionOnClick
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
