import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      // bgcolor: "red",
      minWidth: "84%",
      maxWidth: "84%",
  
      minHeight: "94vh",
      // display: "unset",
    },
    "& .css-uhb5lp": {
      // bgcolor: "red",
      minWidth: "84%",
      maxWidth: "84%",
      minHeight: "98vh",
      // display: "unset",
    },
    "& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-uhb5lp":
      {
        minWidth: "84%",
        maxWidth: "84%",
        maxWidth: "unset",
        minHeight: "98vh",
      },
  
    // "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    //   minWidth: "84vw !important",
    //   // maxWidth: "84vw !important",
    //   width: "84vw !important",
    //   minHeight: "98vh",
    // },
  
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      overflow: "auto",
      paddingBottom: "4rem",
      display: "flex",
      flexDirection: "column",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));


export default function RenderPartsLists(props) {

    return (
        <React.Fragment>
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={props.openTrailerProgress}
        >
            <DialogTitle
            sx={{ m: 0, p: 2, display: "flex", justifyContent: "center" }}
            id="customized-dialog-title"
            >
            <Typography sx={{ fontSize: "1.4rem", fontWeight: "600" }}>
                {props.currentTrailer?.trailerType} | WO:{" "}
                {props.currentTrailer?.workOrder}
            </Typography>
            </DialogTitle>
    
            <IconButton
            aria-label="close"
            onClick={props.handleCloseTrailerProgress}
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
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Box>
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                    Trailer Progress
                </Typography>
                </Box>
                <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    mt: 2,
                    pl: 2,
                }}
                >
                <Box sx={{ width: "14rem" }}>
                    <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                    >
                    <Box sx={{ width: "100%" }}>
                        <Box
                        sx={{
                            width: "100%",
                            height: "2rem",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                        }}
                        >
                        <Typography
                            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
                        >
                            Process
                        </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: "100%",
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                        >
                        <Typography
                            sx={{ fontSize: "1.1rem", fontWeight: "600" }}
                        >
                            Front Frame
                        </Typography>
                        </Box>
                    </Box>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography sx={{ fontSize: "1.1rem", ml: 1 }}>
                        Manufacture Parts
                    </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography sx={{ fontSize: "1.1rem", ml: 1 }}>
                        Build Frame
                    </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography sx={{ fontSize: "1.1rem", ml: 1 }}>
                        Surface Treatment
                    </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "6.5rem", ml: 1 }}>
                    <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                    >
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ width: "100%", height: "2rem", mb: 1 }}>
                        <Typography
                            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
                        >
                            Status
                        </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: "100%",
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                        >
                        <Typography
                            sx={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color:
                                props.currentTrailer?.frontFrameGalvanizedStatus ===
                                "Completed" &&
                                props.currentTrailer?.frontFrameStatus ===
                                "Completed"
                                ? "var(--success)"
                                : "var(--smallPartsChart)",
                            }}
                        >
                            {props.currentTrailer?.frontFrameGalvanizedStatus ===
                            "Completed" &&
                            props.currentTrailer?.frontFrameStatus === "Completed"
                            ? "Completed"
                            : "In progress"}
                        </Typography>
                        </Box>
                    </Box>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{ fontSize: "1.1rem", color: "var(--success)" }}
                    >
                        Completed
                    </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{
                        fontSize: "1.1rem",
                        color:
                            props.currentTrailer?.frontFrameStatus === "Completed"
                            ? "var(--success)"
                            : props.currentTrailer?.frontFrameStatus === "running" ||
                                props.currentTrailer?.frontFrameStatus === "paused"
                            ? "var(--smallPartsChart)"
                            : "unset",
                        }}
                    >
                        {props.currentTrailer?.frontFrameStatus === "running" ||
                        props.currentTrailer?.frontFrameStatus === "paused"
                        ? "In Progress"
                        : props.currentTrailer?.frontFrameStatus}
                    </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{
                        fontSize: "1.1rem",
                        color:
                            props.currentTrailer?.frontFrameGalvanizedStatus ===
                            "Completed"
                            ? "var(--success)"
                            : props.currentTrailer?.frontFrameGalvanizedStatus ===
                                "In Progress"
                            ? "var(--smallPartsChart)"
                            : "unset",
                        }}
                    >
                        {props.currentTrailer?.frontFrameGalvanizedStatus === "sent"
                        ? "In Progress"
                        : !!props.currentTrailer?.frontFrameGalvanizedStatus
                        ? "Completed"
                        : "Not Started"}
                    </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "4rem", ml: 1 }}>
                    <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                    >
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ width: "100%", height: "2rem", mb: 1 }}>
                        <Typography
                            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
                        >
                            Start
                        </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: "100%",
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                        >
                        <Typography
                            sx={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "var(--success)",
                            }}
                        >
                            {!!props.currentTrailer?.dateCreated
                            ? new Date(
                                props.currentTrailer?.dateCreated
                                ).toLocaleDateString("en-US", {
                                month: "numeric",
                                day: "numeric",
                                })
                            : "No date"}
                        </Typography>
                        </Box>
                    </Box>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{ fontSize: "1.1rem", color: "var(--success)" }}
                    >
                        {!!props.currentTrailer?.dateCreated
                        ? new Date(
                            props.currentTrailer?.dateCreated
                            ).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            })
                        : "No date"}
                    </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{ fontSize: "1.1rem", color: "var(--success)" }}
                    >
                        {!!props.currentTrailer?.frontFrameStartTime
                        ? new Date(
                            props.currentTrailer?.frontFrameStartTime
                            ).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            })
                        : ""}
                    </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{ fontSize: "1.1rem", color: "var(--success)" }}
                    >
                        {!!props.currentTrailer?.frontFrameGalvinizedStartTime
                        ? new Date(
                            props.currentTrailer?.frontFrameGalvinizedStartTime
                            ).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            })
                        : ""}
                    </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "4rem", ml: 1 }}>
                    <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                    }}
                    >
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ width: "100%", height: "2rem", mb: 1 }}>
                        <Typography
                            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
                        >
                            End
                        </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: "100%",
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                        }}
                        >
                        <Typography
                            sx={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "var(--success)",
                            }}
                        >
                            {!!props.currentTrailer?.frontFrameGalvinizedEndTime
                            ? new Date(
                                props.currentTrailer?.frontFrameGalvinizedEndTime
                                ).toLocaleDateString("en-US", {
                                month: "numeric",
                                day: "numeric",
                                })
                            : ""}
                        </Typography>
                        </Box>
                    </Box>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{ fontSize: "1.1rem", color: "var(--success)" }}
                    >
                        {!!props.currentTrailer?.frontFrameEndTime
                        ? new Date(
                            props.currentTrailer?.frontFrameEndTime
                            ).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            })
                        : ""}
                    </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "2rem",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Typography
                        sx={{
                        fontSize: "1.1rem",
                        color: "var(--success)",
                        }}
                    >
                        {!!props.currentTrailer?.frontFrameGalvinizedEndTime
                        ? new Date(
                            props.currentTrailer?.frontFrameGalvinizedEndTime
                            ).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            })
                        : ""}
                    </Typography>
                    </Box>
                </Box>
                </Box>
            </Box>
            </DialogContent>
        </BootstrapDialog>
        </React.Fragment>
    );

}