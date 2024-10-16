import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: "70%",
    maxWidth: "70%",
    minHeight: "90vh",
  },
  "& .css-uhb5lp": {
    minWidth: "70%",
    maxWidth: "70%",
    minHeight: "90vh",
  },
  "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
    {
      minWidth: "70%",
      maxWidth: "70%",
      maxWidth: "unset",
      minHeight: "90vh",
    },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export default function SelectTrailerDialog(props) {
  const [readyTrailersArray, setReadyTrailersArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedTrailerIds, setSelectedTrailerIds] = React.useState([]);

  React.useEffect(() => {
    async function getTrailers() {
      console.log("getting all");
      setIsLoading(true);
      const response = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("this phase");

      if (!response.ok) {
        throw new Error("Failed to fetch trailers");
      }

      const data = await response.json();
      setReadyTrailersArray(data);

      const initiallySelectedTrailerIds = data
        .filter((trailer) => getNestedProperty(trailer, props.selectionKey))
        .map((trailer) => ({
          workOrder: trailer.workOrder,
          trailerType: trailer.trailerType,
        }));

      setSelectedTrailerIds(initiallySelectedTrailerIds);

      setIsLoading(false);
      console.log("got data");
    }

    if (props.openSelectTrailerDialog) {
      getTrailers();
    }
  }, [props.openSelectTrailerDialog]);

  const handleCheckboxChange = (workOrder, trailerType) => {
    const identifier = { workOrder, trailerType };

    setSelectedTrailerIds((prevSelectedTrailerIds) =>
      prevSelectedTrailerIds.some(
        (selectedTrailer) =>
          selectedTrailer.workOrder === workOrder &&
          selectedTrailer.trailerType === trailerType
      )
        ? prevSelectedTrailerIds.filter(
            (selectedTrailer) =>
              selectedTrailer.workOrder !== workOrder ||
              selectedTrailer.trailerType !== trailerType
          )
        : [...prevSelectedTrailerIds, identifier]
    );
  };

  const handleConfirmSelection = async () => {
    const selectedTrailers = readyTrailersArray.filter((trailer) =>
      selectedTrailerIds.some(
        (selectedTrailer) =>
          selectedTrailer.workOrder === trailer.workOrder &&
          selectedTrailer.trailerType === trailer.trailerType
      )
    );

    const selectedTrailerIdentifiers = new Set(
      selectedTrailers.map(
        (trailer) => `${trailer.workOrder}-${trailer.trailerType}`
      )
    );

    const batchUpdates = readyTrailersArray.map((trailer) => {
      const trailerIdentifier = `${trailer.workOrder}-${trailer.trailerType}`;
      const isSelected = selectedTrailerIdentifiers.has(trailerIdentifier);
      return {
        workOrder: trailer.workOrder,
        trailerType: trailer.trailerType,
        updates: { [props.selectionKey]: isSelected },
      };
    });

    try {
      const response = await fetch("/api/boxes/boxesapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batchUpdates }),
      });

      if (!response.ok) {
        console.error("Failed to update the trailer data");
      } else {
        console.log("Batch trailer data updated successfully");
      }
    } catch (error) {
      console.error("Error updating trailer data:", error);
    }

    props.updateSelectedTrailers(selectedTrailers);
    props.handleClickCloseSelectTrailerDialog();
  };

  if (isLoading) {
    return (
      <React.Fragment>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={props.openSelectTrailerDialog}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {`Select Trailer Menu`}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={props.handleClickCloseSelectTrailerDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box
              sx={{
                display: "flex",
                width: 1,
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
                minHeight: "70vh",
              }}
            >
              <CircularProgress
                size={65}
                thickness={4}
                sx={{
                  color: "primary",
                }}
              />
            </Box>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.openSelectTrailerDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {`Select Trailer Menu`}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClickCloseSelectTrailerDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {readyTrailersArray.length === 0 ? (
              <Typography>No trailers available</Typography>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    mb: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Available Trailers
                </Typography>
                {readyTrailersArray.map((trailer, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: 2,
                      borderBottom: "1px solid #ccc",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography>Work Order: {trailer.workOrder}</Typography>
                      <Typography>
                        Trailer Type: {trailer.trailerType}
                      </Typography>
                      <Typography>
                        Completion Date:{" "}
                        {new Date(trailer.dateRequired).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedTrailerIds.some(
                            (selectedTrailer) =>
                              selectedTrailer.workOrder === trailer.workOrder &&
                              selectedTrailer.trailerType ===
                                trailer.trailerType
                          )}
                          onChange={() =>
                            handleCheckboxChange(
                              trailer.workOrder,
                              trailer.trailerType
                            )
                          }
                        />
                      }
                      label="Select"
                    />
                  </Box>
                ))}
              </>
            )}
          </Box>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmSelection}
          >
            Confirm Selection
          </Button>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  );
}
