import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { isTomorrow, isToday, subBusinessDays, isPast } from "date-fns";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    // bgcolor: "red",
    minWidth: "80%",
    maxWidth: "unset",
    minHeight: "95vh",
    // display: "unset",
  },
  "& .css-uhb5lp": {
    // bgcolor: "red",
    minWidth: "80%",
    minHeight: "95vh",
    // display: "unset",
  },
  "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
    {
      minWidth: "70%",
      maxWidth: "unset",
      minHeight: "90vh",
    },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
    // minWidth: "300rem",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ProjectionsDialog(props) {
  //   console.log(props.currentProjectionsData);
  let acc = 0;
  props?.currentProjectionsData &&
    props?.currentProjectionsData?.map(
      (projection) => (acc = acc + projection.qty)
    );

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={props.handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={props.handleCloseProjections}
        aria-labelledby="customized-dialog-title"
        open={props.openProjections}
        // open={props.openDrawings}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {`Projections for Part ${props.currentPartData?.part}`}
          <Button
            variant="contained"
            onClick={() => window.open("/partkits")}
            sx={{ ml: 4 }}
          >
            See all the required parts
          </Button>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={props.handleCloseProjections}
          sx={{
            position: "absolute",
            right: 10,
            top: 15,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              padding: 2,
              minWidth: "100%",
              position: "relative",
              minHeight: "39rem",
              //   bgcolor: "red",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "10rem",
                position: "relative",
                // bgcolor: "red",
                mb: 3,
              }}
            >
              <Image
                src={props.currentPartData.partURL}
                style={{ objectFit: "contain" }}
                fill={true}
                alt="required parts"
              />
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
                  Units in Stock: {props.currentPartData?.stock}
                </Typography>
                <Typography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
                  Units in Schedule: {acc}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                mb: 1,
                maxHeight: "2.4rem",
                // bgcolor: "blue",
              }}
            >
              <Box
                sx={{
                  width: "6rem",
                  // bgcolor: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  WO
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "9rem",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  // bgcolor: "red",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  Trailer
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "15rem",
                  justifyContent: "flex-start",
                  // bgcolor: "red",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  Process
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "12rem",
                  justifyContent: "flex-start",
                  ml: 2,
                  mb: 1,
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  Required by
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "12rem",
                  justifyContent: "flex-start",
                  ml: 2,
                  // bgcolor: "red",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  Required Quantity
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "14rem",
                  justifyContent: "flex-start",
                  ml: 2,
                  mb: 1,
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                  Trailer Required Date
                </Typography>
              </Box>
            </Box>

            {props?.currentProjectionsData &&
              props?.currentProjectionsData?.map((projection, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    mb: 1,
                    maxHeight: "2.4rem",
                    // bgcolor: "blue",
                  }}
                >
                  <Box
                    sx={{
                      width: "6rem",
                      // bgcolor: "blue",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      {projection.WO}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "9rem",
                      justifyContent: "center",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      {projection.trailerType}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "15rem",
                      justifyContent: "flex-start",
                      // bgcolor: "red",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      {projection.process}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "12rem",
                      justifyContent: "flex-start",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        color: isPast(
                          props.processDateReq(
                            projection.process,
                            projection.dateReqForTrailer
                          )
                        )
                          ? "var(--error)"
                          : "",
                      }}
                    >
                      {props.processDateReq(
                        projection.process,
                        projection.dateReqForTrailer
                      )
                        ? props
                            .processDateReq(
                              projection.process,
                              projection.dateReqForTrailer
                            )
                            .toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })
                        : ""}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "12rem",
                      justifyContent: "flex-start",
                      ml: 2,
                      // bgcolor: "red",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      {projection.qty}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "12rem",
                      justifyContent: "flex-start",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        color: isPast(projection.dateReqForTrailer)
                          ? "var(--error)"
                          : "",
                      }}
                    >
                      {projection.dateReqForTrailer
                        ? new Date(
                            projection.dateReqForTrailer
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })
                        : ""}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
