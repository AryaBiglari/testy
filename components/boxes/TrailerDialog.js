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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    // bgcolor: "red",
    minWidth: "70%",
    maxWidth: "70%",

    minHeight: "90vh",
    // display: "unset",
  },
  "& .css-uhb5lp": {
    // bgcolor: "red",
    minWidth: "70%",
    maxWidth: "70%",
    minHeight: "90vh",
    // display: "unset",
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

export default function CustomizedDialogs(props) {
  const [readyTrailersArray, setReadyTrailersArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  console.log("running trailer dialog");
  React.useEffect(() => {
    console.log("WE PULLED");
    setIsLoading(true);
    async function getReadyTrailers() {
      const response = await fetch(`/api/boxes/boxesapi?type=ready`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trailers");
      }

      const data = await response.json();
      console.log("data was fetched");
      console.log(data);

      setReadyTrailersArray(data);
      setIsLoading(false);
      return data;
    }

    const onPageLoad = () => {
      try {
        getReadyTrailers().then((response) => { });
      } catch {
        (err) => console.log(err);
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  const theAdder = async (trailer) => {
    const resp = await props.jigAdder(trailer, props.jig);

    if (!resp.ok) {
      console.error("Failed to update the trailer data");
    } else {
      console.log("Trailer data updated successfully");
      props.handleClickCloseAddTrailerDialog();
      // props.handleIsJigEmpty(false);
    }
  };

  if (isLoading) {
    return (
      <React.Fragment>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={props.openAddTrailerDialog}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {`Add Trailer Menu`}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={props.handleClickCloseAddTrailerDialog}
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
                // minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center",
                // bgcolor: "red",
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
        open={props.openAddTrailerDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {`Add Trailer Menu`}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClickCloseAddTrailerDialog}
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
                    key={index + 1}
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
                      <Typography>Customer: {trailer.customer}</Typography>

                      <Typography>
                        Trailer Type: {trailer.trailerType}
                      </Typography>
                      <Typography>
                        Completion Date:{" "}
                        {new Date(trailer.dateRequired).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => {
                        console.log("Add Trailer Clicked", trailer);
                        theAdder(trailer);
                      }}
                    >
                      Add to Jig
                    </Button>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
