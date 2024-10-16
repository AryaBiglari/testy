import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { differenceInBusinessDays } from "date-fns";
import { Typography } from "@mui/material";

// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from "@mui/x-data-grid-generator";

// const roles = ["Market", "Finance", "Development"];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

const columnGroupingModel = [
  {
    groupId: "Boxes Manufacturing Dates",
    // description: "Box manufactuing dates",
    children: [
      { field: "boxExpected" },
      { field: "boxStart" },
      { field: "boxEnd" },
      { field: "boxTimeDeviation" },
    ],
  },
  {
    groupId: "Trailer Manufacturing Dates",
    // description: "Box manufactuing dates",
    children: [
      { field: "trailerExpected" },

      { field: "trailerEnd" },
      { field: "trailerTimeDeviation" },
    ],
  },
];

function EditToolbar(props) {
  // console.log(props);
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.trunc(22 * Math.random());
    setRows((oldRows) => [
      ...oldRows,
      { id, WO: "", customer: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "WO" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        variant="contained"
        // sx={{ ml: 1, mt: 1 }}
      >
        Add New Trailer
      </Button>
    </GridToolbarContainer>
  );
}

export default function PlanningDataTable(props) {
  // React.useEffect(() => {}, initialRows);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    props.handleSetRows(props.rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = props.rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      props.handleSetRows(props.rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    props.handleSetRows(
      props.rows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const initialColumns = [
    { field: "jig", headerName: "Jig", width: 40, editable: true },
    { field: "WO", headerName: "WO", width: 80, editable: true },
    {
      field: "customer",
      headerName: "Customer",
      type: "string",
      width: 130,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "trailerType",
      headerName: "Product",
      // type: "string",
      type: "singleSelect",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
      valueOptions: [
        "Lead",
        "Pup",
        "Tri 72",
        "Tri 61 2H",
        "Tri 61 3H",
        "Tandem",
      ],
    },
    {
      field: "boxExpected",
      headerName: "Expected End",
      type: "date",
      width: 110,
      editable: true,
      valueFormatter: (params) =>
        params?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
    },
    {
      field: "boxStart",
      headerName: "Start",
      type: "date",
      width: 80,
      editable: true,
      valueFormatter: (params) =>
        params?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
    },
    {
      field: "boxEnd",
      headerName: "End",
      type: "date",
      width: 80,
      editable: true,
      valueFormatter: (params) =>
        params?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              // bgcolor: params.row.boxExpected ? "red" : "",
            }}
          >
            <Typography
              sx={{
                color: "",
              }}
            >
              {params.row.boxExpected
                ? params.row.boxExpected.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : params.row.boxStart
                ? `${Math.trunc(Math.random() * 100)} %`
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
      width: 190,
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
              >
                Calculate
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: "trailerExpected",
      headerName: "Expected End",
      type: "date",
      width: 110,
      editable: true,
      valueFormatter: (params) =>
        params?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
    },

    {
      field: "trailerEnd",
      headerName: "End",
      type: "date",
      width: 80,
      editable: true,
      valueFormatter: (params) =>
        params?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
    },
    {
      field: "trailerTimeDeviation",
      headerName: "Dif",
      // type: "string",
      width: 60,
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
            }}
          >
            <Typography
              sx={{
                color:
                  +differenceInBusinessDays(
                    params.row.trailerExpected,
                    params.row.trailerEnd
                  ) < 0
                    ? "var(--error)"
                    : "var(--success)",
              }}
            >
              {params.row.trailerEnd
                ? differenceInBusinessDays(
                    params.row.trailerExpected,
                    params.row.trailerEnd
                  )
                : "-"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      // type: "string",
      width: 103,
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
            {!params.row.trailerEnd && params.row.boxStart && (
              <Typography
                sx={{
                  color: "var(--primary)",
                }}
              >
                Started
              </Typography>
            )}
            {params.row.trailerEnd && (
              <Typography
                sx={{
                  color: "var(--success)",
                }}
              >
                Completed
              </Typography>
            )}
            {!params.row.trailerEnd && !params.row.boxStart && (
              <Typography
                sx={{
                  color: "var(--secondary75)",
                }}
              >
                No Started
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={Math.random()}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={Math.random()}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={Math.random()}
            icon={<VisibilityIcon />}
            label="Delete"
            onClick={() => {}}
            color="inherit"
          />,
          <GridActionsCellItem
            key={Math.random()}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={Math.random()}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    if (props.showJig === "all") {
      setColumns(initialColumns);
    } else setColumns(initialColumns.slice(1));
  }, [props.showJig, rowModesModel]);

  // console.log(columns.slice(1));

  return (
    <Box
      sx={{
        mt: -1,
        height: "86%",
        // overflowY: "visible",
        width: "90%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={props.rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows: props.handleSetRows, setRowModesModel },
        }}
        columnGroupingModel={columnGroupingModel}
        hideFooter={true}
        sx={{
          border: 0,

          "& .MuiDataGrid-columnHeaders": {
            outline: "none !important",
            border: "none !important",
          },

          "& .MuiDataGrid-virtualScroller": {
            overflowX: "hidden",
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
            fontSize: "0.8rem",
            color: "var(--secondary75)",
          },
        }}
      />
    </Box>
  );
}
