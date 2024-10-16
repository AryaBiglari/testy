import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    minWidth: "80%",
    maxWidth: "unset",
    minHeight: "95vh",
  },
  "& .css-uhb5lp": {
    minWidth: "80%",
    minHeight: "95vh",
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
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "80%",
  // backgroundColor: "red",
  height: "auto",
  marginTop: "10px",
  paddingRight: "40px", // Add padding to the right to accommodate the trash icon
  "&:hover .delete-icon": {
    display: "flex", // Ensure flex display for centering
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
  },
}));

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "0px",
  width: "32px", // Set a fixed width
  height: "32px", // Set the height equal to the width to make it round
  borderRadius: "50%", // Make the button round
  transform: "translateY(-50%)",
  display: "none",
  ml: 2,
}));

export default function SpecDocDialog(props) {
  const [specLink, setSpecLink] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [specImages, setSpecImages] = React.useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [imageToDelete, setImageToDelete] = React.useState(null);

  const handleChangeSpecLink = (event) => {
    setSpecLink(event.target.value);
  };

  const saveSpecs = async (specImages, specLink, currentPart) => {
    setIsSaving(true);
    const response = await props.saveSpec(specImages, specLink, currentPart);

    if (!response.ok) {
      setIsSaving(false);
      props.activeAlert(true, "error", "Specs failed to save");
    } else {
      props.activeAlert(true, "success", "Specs saved successfully");
      props.handleCloseSpecDoc();
      setSpecImages([]);
      setSpecLink("");
    }
    setIsSaving(false);
  };

  const handleSelectSpecImage = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setSpecImages((prev) => [
        ...prev,
        { id: Date.now(), image: fileReader.result },
      ]);
    });
    fileReader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setSpecImages((prev) => prev.filter((_, index) => index !== imageToDelete));
    setOpenConfirmDialog(false);
  };

  React.useEffect(() => {
    console.log(props?.currentPartData);
    setSpecLink(props?.currentPartData?.specURL || "");
    setSpecImages(props?.currentPartData?.specImages || []);
  }, [props?.currentPartData, props?.openSpecDoc]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={props.handleCloseSpecDoc}
        aria-labelledby="customized-dialog-title"
        open={props.openSpecDoc}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {`Specification for Part ${props.currentPartData?.part}`}
          {props.currentPartData?.code && " | "}
          {props.currentPartData?.code &&
            `External Code ${props.currentPartData?.code}`}
          {props.currentPartData?.specURL && " | "}
          {props.currentPartData?.specURL && props.specMode === "view" && (
            <Button
              variant="contained"
              onClick={() => window.open(`${props.currentPartData?.specURL}`)}
            >
              Go To Online Spec
            </Button>
          )}
          {props.specMode === "edit" && (
            <span>
              <TextField
                sx={{
                  bgcolor: "white",
                  ml: 2,
                  mr: 2,
                }}
                size="small"
                id="outlined-basic1"
                label="Spec Link..."
                variant="outlined"
                value={specLink}
                onChange={handleChangeSpecLink}
              />

              <Button
                sx={{
                  zIndex: 1000000,
                  mr: 2,
                }}
                disabled={isSaving}
                onChange={handleSelectSpecImage}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <VisuallyHiddenInput type="file" />
              </Button>

              <Button
                sx={{
                  zIndex: 1000000,
                  mr: 2,
                }}
                disabled={isSaving}
                onClick={() => {
                  saveSpecs(specImages, specLink, props.currentPartData);
                }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>

              {isSaving && <CircularProgress size={30} />}
            </span>
          )}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleCloseSpecDoc}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              minWidth: "100%",
              position: "relative",
              minHeight: "39rem",
              alignItems: "center",
            }}
          >
            {specImages.map((specImage, index) => (
              <ImageContainer key={index}>
                <Image
                  src={
                    typeof specImage === "string" ? specImage : specImage.image
                  }
                  style={{ objectFit: "scale-down" }}
                  layout="responsive"
                  width={100}
                  height={100}
                  alt="Additional Spec Documentation"
                />

                {props.specMode === "edit" && (
                  <DeleteIconButton
                    className="delete-icon"
                    onClick={() => {
                      setImageToDelete(index);
                      setOpenConfirmDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </DeleteIconButton>
                )}
              </ImageContainer>
            ))}
          </Box>
        </DialogContent>
      </BootstrapDialog>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this image?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteImage} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
