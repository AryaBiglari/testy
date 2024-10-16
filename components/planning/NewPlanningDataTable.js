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
import AddPartDetails from "../cutting-old/AddPartDetails.js";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import BendingDocDialog from "../cutting-old/BendingDocDialog.js";
import DeletePartDialog from "../cutting-old/DeletePartDialog.js";
import IconButton from "@mui/material/IconButton";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import CircularProgressForTrailers from "./CircularProgressForTrailers.js";

import {
  GridRowModes,
  DataGrid,
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
import TrailerDetailsDialog from "./TrailerDetailsDialog.js";
import TrailerProgressDialog from "./TrailerProgressDialog.js";

const featureNames = [
  "Lead",
  "Pup",
  "Tandem",
  "Tri 61 3 Hoppers",
  "Tri 61 2 Hoppers",
  "Tri 72 2 Hoppers",
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

const columnGroupingModel = [
  {
    groupId: "Expected Vs Real Dates",
    // description: "Box manufactuing dates",
    children: [
      { field: "boxExpected" },
      { field: "boxEnd" },
      { field: "boxTimeDeviation" },
      { field: "boxStart" },
    ],
  },
  // {
  //   groupId: "Trailer Manufacturing Dates",
  //   // description: "Box manufactuing dates",
  //   children: [
  //     { field: "trailerExpected" },

  //     { field: "trailerEnd" },
  //     { field: "trailerTimeDeviation" },
  //   ],
  // },
];
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  return (
    <GridToolbarContainer sx={{ mt: -1.3, mb: 1 }}>
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

      <Button
        color="primary"
        startIcon={<AddIcon />}
        disabled={props.mode === "bending"}
        onClick={() => props.handleClickOpenCreateTrailer()}
        variant="contained"
        sx={{ ml: "12.4rem", borderRadius: "0.5rem", mb: "0rem" }}
      >
        New Trailer
      </Button>
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
  const [openDetails, setOpenDetails] = React.useState(false);

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  const [openTrailerProgress, setOpenTrailerProgress] = React.useState(false);

  const handleClickOpenTrailerProgress = () => {
    setOpenTrailerProgress(true);
  };
  const handleCloseTrailerProgress = () => {
    setOpenTrailerProgress(false);
  };

  const [repeatedParts, setRepeatedParts] = React.useState(
    props.repeatedPartNumbers
  );

  React.useEffect(() => {
    setRepeatedParts(props.repeatedPartNumbers);
  }, [props.repeatedPartNumbers]);

  const [selectedStatus, setSelectedStatus] = React.useState("Up-to-date");

  const handleChangeSelectedStatus = (event) => {
    setSelectedStatus(event.target.value);
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

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    props.handleClickOpenEditTrailer(id);
  };

  // const handleSaveClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  // };

  const [currentUpdatedRow, setCurrentUpdatedRow] = React.useState(null);
  async function handleUpdatePart(part) {
    return;
    if (selectedStatus !== "") {
      part.status = selectedStatus;
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

      props.handleEditPartAlert(true);
    }
  }

  async function handleUpdatePartFromEdit(part) {
    return;
    if (selectedStatus !== "") {
      part.status = selectedStatus;
    }

    if (previewImage?.id === part._id && previewImage.image) {
      handleUploadImage(part._id);
    }

    if (previewBendingImage?.id === part._id && !!previewBendingImage?.image) {
      handleUploadBendingImage(part._id);
    }

    setRowModesModel({
      [part._id]: { mode: GridRowModes.View },
    });

    const response = await fetch("/api/cutting/update-part-from-edit", {
      method: "POST",
      body: JSON.stringify({
        part,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // props.handleGetPartsAfterDelete(part.id + new Date());
      //   handleOptionalFeatures([]);

      // props.rows.map((item) => {
      //   if (item._id === part._id) {
      //     return part;
      //   } else return item;
      // });
      // console.log(props.rows.filter((item) => item._id === part._id));

      // props.handleSetRows(props.rows);

      handleSetOptionalFeaturesName([]);
    }
  }

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
    return;
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
      // props.rows.map((item) => (item._id === part._id ? part : item));
      //   handleOptionalFeatures([]);
      //   handleSetOptionalFeaturesName([]);
    }
  }

  async function handleUpdateNoBendingRequired(id, bendingIsRequired) {
    return;
    const response = await fetch("/api/cutting/update-part-required-bending", {
      method: "POST",
      body: JSON.stringify({
        id,
        bendingIsRequired,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
    }
  }

  async function handleDeletePart(id, password) {
    // return;
    props.handleIsDeletingPart(true);
    const response = await fetch(
      `/api/planning/create-trailer?id=${id}&password=${password}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      props.handleGetPartsAfterDelete(id);
      props.handleDeletePartAlert(true);
      props.handleIsDeletingPart(false);
      handleCloseDeletePart();
      //   props.handleSetRows(
      //     props.rows.filter((row) => {
      //       row._id !== id;
      //     })
      //   );
      console.log("Delete trialer success");
    } else {
      console.error("Failed to delete trialer");
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
  };

  const processRowUpdate = (newRow, originalRow) => {
    setCurrentUpdatedRow(newRow);

    const updatedRow = { ...newRow, isNew: false };

    props.handleSetRows(
      props.rows.map((row) => (row._id === newRow.id ? updatedRow : row))
    );

    handleUpdatePart(newRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
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
    return;
    // setIsLoading(true);
    const data = new FormData();

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

  //upload bending doc logic - start
  const [previewBendingImage, setPreviewBendingImage] = React.useState(null);

  const handleSelectBendingImage = (event, id) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setPreviewBendingImage({ id: id, image: fileReader.result });
    });
    fileReader?.readAsDataURL(file);
  };

  async function handleUploadBendingImage(id) {
    // setIsLoading(true);
    const data = new FormData();

    data.append("file", previewBendingImage.image);
    data.append("tags", [id]);
    data.append("folder", "Bending Documentation Images");
    data.append("upload_preset", "quality-check-reports");

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
        setPreviewBendingImage(null);
      }
      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }

    // setIsLoading(false);
  }
  //upload bending doc images logic - end

  function renderStatus(start, end) {
    if (!start) {
      return "Not Started";
    } else if (start && !end) {
      return "In Progress";
    } else return "Completed";
  }

  function renderSectionStatus(timesArr) {
    const statusArr = [];
    timesArr.forEach((time) => {
      statusArr.push(renderStatus(time.start, time.end));
    });

    if (
      statusArr.includes("Not Started") &&
      !statusArr.includes("Completed") &&
      !statusArr.includes("In Progress")
    ) {
      return "Not Started";
    }
    if (
      statusArr.includes("Completed") &&
      !statusArr.includes("Not Started") &&
      !statusArr.includes("In Progress")
    ) {
      return "Completed";
    } else return "In Progress";
  }

  const initialColumns = [
    {
      field: "WO",
      headerName: "WO",
      width: 75,
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
              textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {params.row?.workOrder}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "Trailer",
      headerName: "Trailer",
      width: 100,
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
              textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {params.row?.trailerType}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Customer",
      headerName: "Customer",
      width: 100,
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
              textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {params.row?.customer}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Specs",
      headerName: "Specs",
      width: 62,
      editable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              //   width: "5rem",
              //   bgcolor: "red",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => {
                setCurrentTrailer(params.row);

                handleClickOpenDetails();
              }}
            >
              <DocumentScannerIcon />
            </IconButton>
          </Box>
        );
      },
    },

    {
      field: "Status",
      headerName: "Status",
      type: "string",
      // width: 100,
      width: 130,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        const frontFrameTimesArr = [
          {
            start: params.row?.partKits?.frontFrameState?.StartTime,
            end: params.row?.partKits?.frontFrameState?.EndTime,
          },

          {
            start: params.row?.frontFrameStartTime,
            end: params.row?.frontFrameEndTime,
          },
          {
            start: params.row?.frontFrameGalvinizedStartTime,
            end: params.row?.frontFrameGalvinizedEndTime,
          },
        ];

        const rearFrameTimesArr = [
          {
            start: params.row?.partKits?.rearFrameState?.StartTime,
            end: params.row?.partKits?.rearFrameState?.EndTime,
          },

          {
            start: params.row?.rearFrameStartTime,
            end: params.row?.rearFrameEndTime,
          },
          {
            start: params.row?.rearFrameGalvinizedStartTime,
            end: params.row?.rearFrameGalvinizedEndTime,
          },
        ];

        const boxStage1TimesArr = [
          {
            start: params.row?.partKits?.boxStage1State?.StartTime,
            end: params.row?.partKits?.boxStage1State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[0]?.startDate,
            end: params.row?.boxData?.stages[0]?.endDate,
          },
        ];
        const boxStage2TimesArr = [
          {
            start: params.row?.partKits?.boxStage2State?.StartTime,
            end: params.row?.partKits?.boxStage2State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[1]?.startDate,
            end: params.row?.boxData?.stages[1]?.endDate,
          },
        ];
        const boxStage3TimesArr = [
          {
            start: params.row?.partKits?.boxStage3State?.StartTime,
            end: params.row?.partKits?.boxStage3State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[2]?.startDate,
            end: params.row?.boxData?.stages[2]?.endDate,
          },
        ];
        const boxStage4TimesArr = [
          {
            start: params.row?.partKits?.boxStage4State?.StartTime,
            end: params.row?.partKits?.boxStage4State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[3]?.startDate,
            end: params.row?.boxData?.stages[3]?.endDate,
          },
        ];

        const smallPartsTimesArr =
          params.row?.trailerType === "Tri 61' 3 Hoppers"
            ? [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsMiddle?.StartTime,
                  end: params.row?.hopperDoorsMiddle?.EndTime,
                },
              ]
            : [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
              ];

        const frontFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.frontFrameFinishingState?.StartTime,
            end: params.row?.partKits?.frontFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.frontFrameFinishingState?.StartTime,
            end: params.row?.frontFrameFinishingState?.EndTime,
          },
        ];
        const rearFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.rearFrameFinishingState?.StartTime,
            end: params.row?.partKits?.rearFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.rearFrameFinishingState?.StartTime,
            end: params.row?.rearFrameFinishingState?.EndTime,
          },
        ];

        const boxFinishingTimesArr = [
          {
            start: params.row?.partKits?.boxFinishingState?.StartTime,
            end: params.row?.partKits?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.boxFinishingState?.StartTime,
            end: params.row?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.installHopperDoorsState?.StartTime,
            end: params.row?.installHopperDoorsState?.EndTime,
          },
          {
            start: params.row?.installFramesState?.StartTime,
            end: params.row?.installFramesState?.EndTime,
          },
        ];

        const wallsTimesArr = [];
        params.row?.walls?.map((wall) => {
          wallsTimesArr.push({
            start: wall.startedDate,
            end: wall.completedDate,
          });
        });

        const qualityInspectionTimesArr = [
          {
            start: params.row?.qualityInspection?.initialInspection?.startTime,
            end: params.row?.qualityInspection?.initialInspection?.endTime,
          },
          {
            start: params.row?.qualityInspection?.finalCheckStartingDate,
            end: params.row?.qualityInspection?.finalCheckCompletedDate,
          },
        ];

        const trailerStatus =
          renderSectionStatus(frontFrameTimesArr) === "Completed" &&
          renderSectionStatus(rearFrameTimesArr) === "Completed" &&
          renderSectionStatus(wallsTimesArr) === "Completed" &&
          renderSectionStatus(boxStage1TimesArr) === "Completed" &&
          renderSectionStatus(boxStage2TimesArr) === "Completed" &&
          renderSectionStatus(boxStage3TimesArr) === "Completed" &&
          renderSectionStatus(boxStage4TimesArr) === "Completed" &&
          renderSectionStatus(smallPartsTimesArr) === "Completed" &&
          renderSectionStatus(boxFinishingTimesArr) === "Completed" &&
          renderSectionStatus(frontFrameFinishingTimesArr) === "Completed" &&
          renderSectionStatus(rearFrameFinishingTimesArr) === "Completed" &&
          renderSectionStatus(qualityInspectionTimesArr) === "Completed"
            ? "Completed"
            : renderSectionStatus(frontFrameTimesArr) === "Not Started" &&
              renderSectionStatus(rearFrameTimesArr) === "Not Started" &&
              renderSectionStatus(wallsTimesArr) === "Not Started" &&
              renderSectionStatus(boxStage1TimesArr) === "Not Started" &&
              renderSectionStatus(boxStage2TimesArr) === "Not Started" &&
              renderSectionStatus(boxStage3TimesArr) === "Not Started" &&
              renderSectionStatus(boxStage4TimesArr) === "Not Started" &&
              renderSectionStatus(smallPartsTimesArr) === "Not Started" &&
              renderSectionStatus(boxFinishingTimesArr) === "Not Started" &&
              renderSectionStatus(frontFrameFinishingTimesArr) ===
                "Not Started" &&
              renderSectionStatus(rearFrameFinishingTimesArr) ===
                "Not Started" &&
              renderSectionStatus(qualityInspectionTimesArr) === "Not Started"
            ? "Not Started"
            : "In Progress";

        // console.log(
        //   renderSectionStatus(frontFrameTimesArr),
        //   renderSectionStatus(rearFrameTimesArr),
        //   renderSectionStatus(wallsTimesArr),
        //   renderSectionStatus(boxStage1TimesArr),
        //   renderSectionStatus(boxStage2TimesArr),
        //   renderSectionStatus(boxStage3TimesArr),
        //   renderSectionStatus(boxStage4TimesArr),
        //   renderSectionStatus(smallPartsTimesArr),
        //   renderSectionStatus(boxFinishingTimesArr),
        //   renderSectionStatus(frontFrameFinishingTimesArr),
        //   renderSectionStatus(rearFrameFinishingTimesArr),
        //   renderSectionStatus(qualityInspectionTimesArr)
        // );

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              //   maxHeight: "3rem",
              //   bgcolor: "blue",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>{trailerStatus}</Typography>
          </Box>
        );
      },
    },
    {
      field: "Progress",
      headerName: "Progress",
      type: "string",
      // width: 100,
      width: 85,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => {
        const frontFrameTimesArr = [
          {
            start: params.row?.partKits?.frontFrameState?.StartTime,
            end: params.row?.partKits?.frontFrameState?.EndTime,
          },

          {
            start: params.row?.frontFrameStartTime,
            end: params.row?.frontFrameEndTime,
          },
          {
            start: params.row?.frontFrameGalvinizedStartTime,
            end: params.row?.frontFrameGalvinizedEndTime,
          },
        ];

        const rearFrameTimesArr = [
          {
            start: params.row?.partKits?.rearFrameState?.StartTime,
            end: params.row?.partKits?.rearFrameState?.EndTime,
          },

          {
            start: params.row?.rearFrameStartTime,
            end: params.row?.rearFrameEndTime,
          },
          {
            start: params.row?.rearFrameGalvinizedStartTime,
            end: params.row?.rearFrameGalvinizedEndTime,
          },
        ];

        const boxStage1TimesArr = [
          {
            start: params.row?.partKits?.boxStage1State?.StartTime,
            end: params.row?.partKits?.boxStage1State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[0]?.startDate,
            end: params.row?.boxData?.stages[0]?.endDate,
          },
        ];
        const boxStage2TimesArr = [
          {
            start: params.row?.partKits?.boxStage2State?.StartTime,
            end: params.row?.partKits?.boxStage2State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[1]?.startDate,
            end: params.row?.boxData?.stages[1]?.endDate,
          },
        ];
        const boxStage3TimesArr = [
          {
            start: params.row?.partKits?.boxStage3State?.StartTime,
            end: params.row?.partKits?.boxStage3State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[2]?.startDate,
            end: params.row?.boxData?.stages[2]?.endDate,
          },
        ];
        const boxStage4TimesArr = [
          {
            start: params.row?.partKits?.boxStage4State?.StartTime,
            end: params.row?.partKits?.boxStage4State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[3]?.startDate,
            end: params.row?.boxData?.stages[3]?.endDate,
          },
        ];

        const smallPartsTimesArr =
          params.row?.trailerType === "Tri 61' 3 Hoppers"
            ? [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsMiddle?.StartTime,
                  end: params.row?.hopperDoorsMiddle?.EndTime,
                },
              ]
            : [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
              ];

        const frontFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.frontFrameFinishingState?.StartTime,
            end: params.row?.partKits?.frontFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.frontFrameFinishingState?.StartTime,
            end: params.row?.frontFrameFinishingState?.EndTime,
          },
        ];
        const rearFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.rearFrameFinishingState?.StartTime,
            end: params.row?.partKits?.rearFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.rearFrameFinishingState?.StartTime,
            end: params.row?.rearFrameFinishingState?.EndTime,
          },
        ];

        const boxFinishingTimesArr = [
          {
            start: params.row?.partKits?.boxFinishingState?.StartTime,
            end: params.row?.partKits?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.boxFinishingState?.StartTime,
            end: params.row?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.installHopperDoorsState?.StartTime,
            end: params.row?.installHopperDoorsState?.EndTime,
          },
          {
            start: params.row?.installFramesState?.StartTime,
            end: params.row?.installFramesState?.EndTime,
          },
        ];

        const wallsTimesArr = [];
        params.row?.walls?.map((wall) => {
          wallsTimesArr.push({
            start: wall.startedDate,
            end: wall.completedDate,
          });
        });

        const qualityInspectionTimesArr = [
          {
            start: params.row?.qualityInspection?.initialInspection?.startTime,
            end: params.row?.qualityInspection?.initialInspection?.endTime,
          },
          {
            start: params.row?.qualityInspection?.finalCheckStartingDate,
            end: params.row?.qualityInspection?.finalCheckCompletedDate,
          },
        ];

        const trailerProgressLevel =
          (renderSectionStatus(frontFrameTimesArr) === "Completed" ? 9 : 0) +
          (renderSectionStatus(rearFrameTimesArr) === "Completed" ? 6 : 0) +
          (renderSectionStatus(wallsTimesArr) === "Completed" ? 18 : 0) +
          (renderSectionStatus(boxStage1TimesArr) === "Completed" ? 5 : 0) +
          (renderSectionStatus(boxStage2TimesArr) === "Completed" ? 5 : 0) +
          (renderSectionStatus(boxStage3TimesArr) === "Completed" ? 5 : 0) +
          (renderSectionStatus(boxStage4TimesArr) === "Completed" ? 5 : 0) +
          (renderSectionStatus(smallPartsTimesArr) === "Completed" ? 8 : 0) +
          (renderSectionStatus(boxFinishingTimesArr) === "Completed" ? 10 : 0) +
          (renderSectionStatus(frontFrameFinishingTimesArr) === "Completed"
            ? 12
            : 0) +
          (renderSectionStatus(rearFrameFinishingTimesArr) === "Completed"
            ? 14
            : 0) +
          (renderSectionStatus(qualityInspectionTimesArr) === "Completed"
            ? 3
            : 0);

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              //   maxHeight: "3rem",
              //   bgcolor: "blue",
            }}
          >
            <IconButton
              onClick={() => {
                setCurrentTrailer(params.row);
                handleClickOpenTrailerProgress();
              }}
              sx={{
                // bgcolor: "red",
                "&:hover": {
                  bgcolor: "var(--success25)",
                },
              }}
            >
              <CircularProgressForTrailers value={trailerProgressLevel} />
            </IconButton>
          </Box>
        );
      },
    },

    {
      field: "Jig",
      headerName: "Jig",
      // type: "string",
      width: 70,
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
              {params?.row?.boxData?.jig === 0
                ? "TBA"
                : params?.row?.boxData?.jig}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "boxExpected",
      headerName: "Due Date",
      type: "date",
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
              textWrap: "wrap",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {new Date(params.row?.dateRequired).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "boxStart",
      headerName: "Start",
      type: "date",
      width: 120,
      editable: false,
      renderCell: (params) => {
        const frontFrameTimesArr = [
          {
            start: params.row?.partKits?.frontFrameState?.StartTime,
            end: params.row?.partKits?.frontFrameState?.EndTime,
          },

          {
            start: params.row?.frontFrameStartTime,
            end: params.row?.frontFrameEndTime,
          },
          {
            start: params.row?.frontFrameGalvinizedStartTime,
            end: params.row?.frontFrameGalvinizedEndTime,
          },
        ];

        const rearFrameTimesArr = [
          {
            start: params.row?.partKits?.rearFrameState?.StartTime,
            end: params.row?.partKits?.rearFrameState?.EndTime,
          },

          {
            start: params.row?.rearFrameStartTime,
            end: params.row?.rearFrameEndTime,
          },
          {
            start: params.row?.rearFrameGalvinizedStartTime,
            end: params.row?.rearFrameGalvinizedEndTime,
          },
        ];

        const boxStage1TimesArr = [
          {
            start: params.row?.partKits?.boxStage1State?.StartTime,
            end: params.row?.partKits?.boxStage1State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[0]?.startDate,
            end: params.row?.boxData?.stages[0]?.endDate,
          },
        ];
        const boxStage2TimesArr = [
          {
            start: params.row?.partKits?.boxStage2State?.StartTime,
            end: params.row?.partKits?.boxStage2State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[1]?.startDate,
            end: params.row?.boxData?.stages[1]?.endDate,
          },
        ];
        const boxStage3TimesArr = [
          {
            start: params.row?.partKits?.boxStage3State?.StartTime,
            end: params.row?.partKits?.boxStage3State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[2]?.startDate,
            end: params.row?.boxData?.stages[2]?.endDate,
          },
        ];
        const boxStage4TimesArr = [
          {
            start: params.row?.partKits?.boxStage4State?.StartTime,
            end: params.row?.partKits?.boxStage4State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[3]?.startDate,
            end: params.row?.boxData?.stages[3]?.endDate,
          },
        ];

        const smallPartsTimesArr =
          params.row?.trailerType === "Tri 61' 3 Hoppers"
            ? [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsMiddle?.StartTime,
                  end: params.row?.hopperDoorsMiddle?.EndTime,
                },
              ]
            : [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
              ];

        const frontFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.frontFrameFinishingState?.StartTime,
            end: params.row?.partKits?.frontFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.frontFrameFinishingState?.StartTime,
            end: params.row?.frontFrameFinishingState?.EndTime,
          },
        ];
        const rearFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.rearFrameFinishingState?.StartTime,
            end: params.row?.partKits?.rearFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.rearFrameFinishingState?.StartTime,
            end: params.row?.rearFrameFinishingState?.EndTime,
          },
        ];

        const boxFinishingTimesArr = [
          {
            start: params.row?.partKits?.boxFinishingState?.StartTime,
            end: params.row?.partKits?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.boxFinishingState?.StartTime,
            end: params.row?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.installHopperDoorsState?.StartTime,
            end: params.row?.installHopperDoorsState?.EndTime,
          },
          {
            start: params.row?.installFramesState?.StartTime,
            end: params.row?.installFramesState?.EndTime,
          },
        ];

        const wallsTimesArr = [];
        params.row?.walls?.map((wall) => {
          wallsTimesArr.push({
            start: wall.startedDate,
            end: wall.completedDate,
          });
        });

        const qualityInspectionTimesArr = [
          {
            start: params.row?.qualityInspection?.initialInspection?.startTime,
            end: params.row?.qualityInspection?.initialInspection?.endTime,
          },
          {
            start: params.row?.qualityInspection?.finalCheckStartingDate,
            end: params.row?.qualityInspection?.finalCheckCompletedDate,
          },
        ];

        const getEarliestStartTime = (timesArr) => {
          const startTimes = [];
          timesArr.forEach((time) => {
            if (time.start) {
              startTimes.push(new Date(time.start));
            }
          });

          const orderedDates = startTimes.sort(function (a, b) {
            return Date.parse(a) - Date.parse(b);
          });

          return orderedDates[0]?.toISOString();
        };

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              //   maxHeight: "3rem",
              //   bgcolor: "blue",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {!!getEarliestStartTime([
                ...frontFrameTimesArr,
                ...rearFrameTimesArr,
                ...boxStage1TimesArr,
                ...boxStage2TimesArr,
                ...boxStage3TimesArr,
                ...boxStage4TimesArr,
                ...smallPartsTimesArr,
                ...frontFrameFinishingTimesArr,
                ...rearFrameFinishingTimesArr,
                ...boxFinishingTimesArr,
                ...wallsTimesArr,
                ...qualityInspectionTimesArr,
              ])
                ? new Date(
                    getEarliestStartTime([
                      ...frontFrameTimesArr,
                      ...rearFrameTimesArr,
                      ...boxStage1TimesArr,
                      ...boxStage2TimesArr,
                      ...boxStage3TimesArr,
                      ...boxStage4TimesArr,
                      ...smallPartsTimesArr,
                      ...frontFrameFinishingTimesArr,
                      ...rearFrameFinishingTimesArr,
                      ...boxFinishingTimesArr,
                      ...wallsTimesArr,
                      ...qualityInspectionTimesArr,
                    ])
                  ).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                : ""}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "boxEnd",
      headerName: "End",
      type: "date",
      width: 120,
      editable: false,
      valueFormatter: (params) =>
        params?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      renderCell: (params) => {
        const frontFrameTimesArr = [
          {
            start: params.row?.partKits?.frontFrameState?.StartTime,
            end: params.row?.partKits?.frontFrameState?.EndTime,
          },

          {
            start: params.row?.frontFrameStartTime,
            end: params.row?.frontFrameEndTime,
          },
          {
            start: params.row?.frontFrameGalvinizedStartTime,
            end: params.row?.frontFrameGalvinizedEndTime,
          },
        ];

        const rearFrameTimesArr = [
          {
            start: params.row?.partKits?.rearFrameState?.StartTime,
            end: params.row?.partKits?.rearFrameState?.EndTime,
          },

          {
            start: params.row?.rearFrameStartTime,
            end: params.row?.rearFrameEndTime,
          },
          {
            start: params.row?.rearFrameGalvinizedStartTime,
            end: params.row?.rearFrameGalvinizedEndTime,
          },
        ];

        const boxStage1TimesArr = [
          {
            start: params.row?.partKits?.boxStage1State?.StartTime,
            end: params.row?.partKits?.boxStage1State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[0]?.startDate,
            end: params.row?.boxData?.stages[0]?.endDate,
          },
        ];
        const boxStage2TimesArr = [
          {
            start: params.row?.partKits?.boxStage2State?.StartTime,
            end: params.row?.partKits?.boxStage2State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[1]?.startDate,
            end: params.row?.boxData?.stages[1]?.endDate,
          },
        ];
        const boxStage3TimesArr = [
          {
            start: params.row?.partKits?.boxStage3State?.StartTime,
            end: params.row?.partKits?.boxStage3State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[2]?.startDate,
            end: params.row?.boxData?.stages[2]?.endDate,
          },
        ];
        const boxStage4TimesArr = [
          {
            start: params.row?.partKits?.boxStage4State?.StartTime,
            end: params.row?.partKits?.boxStage4State?.EndTime,
          },
          {
            start: params.row?.boxData?.stages[3]?.startDate,
            end: params.row?.boxData?.stages[3]?.endDate,
          },
        ];

        const smallPartsTimesArr =
          params.row?.trailerType === "Tri 61' 3 Hoppers"
            ? [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsMiddle?.StartTime,
                  end: params.row?.hopperDoorsMiddle?.EndTime,
                },
              ]
            : [
                {
                  start: params.row?.partKits?.smallPartsStageState?.StartTime,
                  end: params.row?.partKits?.smallPartsStageState?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsFront?.StartTime,
                  end: params.row?.hopperDoorsFront?.EndTime,
                },
                {
                  start: params.row?.hopperDoorsRear?.StartTime,
                  end: params.row?.hopperDoorsRear?.EndTime,
                },
              ];

        const frontFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.frontFrameFinishingState?.StartTime,
            end: params.row?.partKits?.frontFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.frontFrameFinishingState?.StartTime,
            end: params.row?.frontFrameFinishingState?.EndTime,
          },
        ];
        const rearFrameFinishingTimesArr = [
          {
            start: params.row?.partKits?.rearFrameFinishingState?.StartTime,
            end: params.row?.partKits?.rearFrameFinishingState?.EndTime,
          },
          {
            start: params.row?.rearFrameFinishingState?.StartTime,
            end: params.row?.rearFrameFinishingState?.EndTime,
          },
        ];

        const boxFinishingTimesArr = [
          {
            start: params.row?.partKits?.boxFinishingState?.StartTime,
            end: params.row?.partKits?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.boxFinishingState?.StartTime,
            end: params.row?.boxFinishingState?.EndTime,
          },
          {
            start: params.row?.installHopperDoorsState?.StartTime,
            end: params.row?.installHopperDoorsState?.EndTime,
          },
          {
            start: params.row?.installFramesState?.StartTime,
            end: params.row?.installFramesState?.EndTime,
          },
        ];

        const wallsTimesArr = [];
        params.row?.walls?.map((wall) => {
          wallsTimesArr.push({
            start: wall.startedDate,
            end: wall.completedDate,
          });
        });

        const qualityInspectionTimesArr = [
          {
            start: params.row?.qualityInspection?.initialInspection?.startTime,
            end: params.row?.qualityInspection?.initialInspection?.endTime,
          },
          {
            start: params.row?.qualityInspection?.finalCheckStartingDate,
            end: params.row?.qualityInspection?.finalCheckCompletedDate,
          },
        ];

        const getLatestTime = (timesArr) => {
          const endTimes = [];
          timesArr.forEach((time) => {
            if (time.start) {
              endTimes.push(new Date(time.end));
            }
          });
          const orderedDates = endTimes.sort(function (a, b) {
            return Date.parse(b) - Date.parse(a);
          });

          if (renderSectionStatus(timesArr) === "Completed") {
            return orderedDates[0]?.toISOString();
          }
        };

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              textWrap: "wrap",
              //   maxHeight: "3rem",
              //   bgcolor: "blue",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>
              {!!getLatestTime([
                ...frontFrameTimesArr,
                ...rearFrameTimesArr,
                ...boxStage1TimesArr,
                ...boxStage2TimesArr,
                ...boxStage3TimesArr,
                ...boxStage4TimesArr,
                ...smallPartsTimesArr,
                ...frontFrameFinishingTimesArr,
                ...rearFrameFinishingTimesArr,
                ...boxFinishingTimesArr,
                ...wallsTimesArr,
                ...qualityInspectionTimesArr,
              ])
                ? new Date(
                    getLatestTime([
                      ...frontFrameTimesArr,
                      ...rearFrameTimesArr,
                      ...boxStage1TimesArr,
                      ...boxStage2TimesArr,
                      ...boxStage3TimesArr,
                      ...boxStage4TimesArr,
                      ...smallPartsTimesArr,
                      ...frontFrameFinishingTimesArr,
                      ...rearFrameFinishingTimesArr,
                      ...boxFinishingTimesArr,
                      ...wallsTimesArr,
                      ...qualityInspectionTimesArr,
                    ])
                  ).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                : ""}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "boxTimeDeviation",
      headerName: "Dif",
      // type: "string",
      width: 80,
      editable: false,

      // valueGetter: (value, row) => {
      //   return differenceInBusinessDays(row.boxExpected, row.boxEnd);
      // },
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                color:
                  +differenceInBusinessDays(
                    params.row.boxExpected,
                    params.row.boxEnd
                  ) < 0
                    ? "var(--error)"
                    : "var(--success)",
              }}
            >
              {params.row.boxEnd
                ? differenceInBusinessDays(
                    params.row.boxExpected,
                    params.row.boxEnd
                  )
                : "-"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "VIN",
      headerName: "VIN",
      width: 120,
      editable: true,
      type: "string",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {params?.value?.length > 0 ? (
              <Typography>{params?.value}</Typography>
            ) : (
              <Button
                variant="contained"
                onClick={() => window.open(`/vincalculator`)}
                sx={{ fontSize: "0.7rem" }}
              >
                Calculate
              </Button>
            )}
          </Box>
        );
      },
    },

    {
      field: "Assembly",
      headerName: "Assembly",
      type: "string",
      width: 120,
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
              fontSize: "0.5rem",
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
            https://cad.onshape.com/documents/d71ac0b8b7535f4d96c8eec2/w/00b6186d7cd4b6675c4f2956/e/e24cfb0868804bcb82efc938
          </Typography>
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
                  sx={{ fontSize: props.mode !== "stock" ? "" : "2.2rem" }}
                />
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleUpdatePartFromEdit(params.row)}
            />,
            <GridActionsCellItem
              key={Math.random()}
              icon={
                <CancelIcon
                  sx={{ fontSize: props.mode !== "stock" ? "" : "2.2rem" }}
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

  const [columns, setColumns] = React.useState(initialColumns);

  //   React.useEffect(() => {
  //     let partialColumns = initialColumns;

  //     if (props.mode === "bending") {
  //       //   partialColumns.splice(14, 1);
  //       partialColumns = initialColumns.filter(
  //         (column) =>
  //           column.field !== "onshapeURL" &&
  //           column.field !== "actions" &&
  //           column.field !== "DTAF" &&
  //           column.field !== "neededCuts"
  //       );
  //     }
  //     if (props.mode === "stock") {
  //       //   partialColumns.splice(14, 1);
  //       partialColumns = initialColumns.filter(
  //         (column) =>
  //           column.field !== "bending" &&
  //           column.field !== "details" &&
  //           column.field !== "piecesPerTrailer" &&
  //           column.field !== "TAF" &&
  //           column.field !== "status" &&
  //           column.field !== "onshapeName" &&
  //           column.field !== "partName" &&
  //           column.field !== "position" &&
  //           column.field !== "description" &&
  //           column.field !== "onshapeURL" &&
  //           column.field !== "DTAF" &&
  //           column.field !== "neededCuts"
  //       );
  //     }

  //     if (props.showMat === "all") {
  //       setColumns(partialColumns);
  //     } else setColumns(partialColumns.slice(1));
  //   }, [
  //     props.showMat,
  //     rowModesModel,
  //     previewImage,
  //     previewBendingImage,
  //     optionalFeaturesName,
  //     selectedStatus,
  //   ]);

  const [openBendingDoc, setOpenBendingDoc] = React.useState(false);
  const [currentID, setCurrentID] = React.useState("");
  const [currentPartData, setCurrentPartData] = React.useState("");
  const [currentTrailer, setCurrentTrailer] = React.useState(null);

  const [openComments, setOpenComments] = React.useState(false);
  const handleOpenComments = (state, id) => {
    setOpenComments(state);
    setCurrentID(id);
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

  const [openDeletePart, setOpenDeletePart] = React.useState(false);
  const handleOpenDeletePart = (id) => {
    setOpenDeletePart(true);
    setCurrentID(id);
  };

  const handleCloseDeletePart = () => {
    setOpenDeletePart(false);
  };

  return (
    <Box
      sx={{
        mt: -5.8,
        height: "100%",
        width: "96%",
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
      />
      {/* <TrailerDetailsDialog
        currentTrailer={currentTrailer}
        openDetails={openDetails}
        handleCloseDetails={handleCloseDetails}
      /> */}
      <TrailerProgressDialog
        currentTrailer={currentTrailer}
        openTrailerProgress={openTrailerProgress}
        handleCloseTrailerProgress={handleCloseTrailerProgress}
        renderSectionStatus={renderSectionStatus}
        renderStatus={renderStatus}
      />
      <BendingDocDialog
        openBendingDoc={openBendingDoc}
        currentPartData={currentPartData}
        handleOpenBendingDoc={handleOpenBendingDoc}
        handleCloseBendingDoc={handleCloseBendingDoc}
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
        disableColumnMenu={props.mode !== "stock" ? false : true}
        loading={props.isLoadingPage}
        localeText={{ noRowsLabel: "No Trailers found for this filter" }}
        rowHeight={80}
        // getRowHeight={() => "auto"}
        rows={props.rows}
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
            handleClickOpenCreateTrailer: props.handleClickOpenCreateTrailer,
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
