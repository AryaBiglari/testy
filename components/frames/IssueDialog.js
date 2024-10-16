import * as React from "react";
import Image from "next/image";
import {
  Button,
  Box,
  Divider,
  Typography,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "90%",
    maxWidth: "42rem",
    minWidth: "38rem",
  },
  "& .css-uhb5lp": {
    width: "90%",
    maxWidth: "42rem",
    minWidth: "38rem",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflowY: "auto",
    overflowX: "hidden",
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
  whiteSpace: "nowrap",
  width: 1,
});

const extractPublicId = (url) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];
  return publicId;
};

export default function IssueDialog(props) {
  const [comments, setComments] = React.useState(
    props.currentDeviation?.comments || ""
  );
  const [deviationType, setDeviationType] = React.useState(
    props.currentDeviation?.deviationType || ""
  );
  const [previewImage, setPreviewImage] = React.useState(
    props.currentDeviation?.previewImage || null
  );
  const [imageURLS, setImageURLS] = React.useState(
    props.currentDeviation?.imageURLS || null
  );
  const [uploadFile, setUploadFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setComments(props.currentDeviation?.comments || "");
    setDeviationType(props.currentDeviation?.deviationType || "");
    setPreviewImage(props.currentDeviation?.previewImage || null);
    setImageURLS(props.currentDeviation?.imageURLS || null);
    setUploadFile(null);
  }, [
    props.currentDeviation?.comments,
    props.currentDeviation?.deviationType,
    props.currentDeviation?.previewImage,
    props.currentDeviation?.imageURLS,
    props.openDeviationDialog,
  ]);

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleDeviationTypeChange = (e) => {
    setDeviationType(e.target.value);
  };

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUploadFile(file);
    }
  };

  const handleDeleteImage = async (publicURL) => {
    const publicId = extractPublicId(publicURL);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgzynn8cb/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: publicId,
          }),
        }
      );
      const result = await response.json();
      if (result.result === "ok" || true) {
        const updatedImageURLS = imageURLS.filter(
          (imageURL) => imageURL !== publicURL
        );
        setImageURLS(updatedImageURLS);

        const updatedDeviation = {
          ...props.currentDeviation,
          imageURLS: updatedImageURLS,
        };

        props.handleDeviationSave(updatedDeviation);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUploadImage = async () => {
    setIsLoading(true);
    const data = new FormData();
    console.log(uploadFile);
    data.append("file", uploadFile);
    data.append("tags", [
      props.currentDeviation?.workOrder,
      props.currentDeviation?.checkID,
      deviationType,
      comments,
      props.currentDeviation?.sectionName,
      props.currentDeviation?.checkpointDescription,
      props.currentDeviation?.subSectionDescription,
    ]);
    const folderPath = `frameInspection/${props.currentDeviation?.workOrder}/${props.currentDeviation?.checkID}/deviations/`;
    data.append("folder", folderPath);
    data.append("upload_preset", "hcrvdvwh");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgzynn8cb/image/upload`,
        // `https://api.cloudinary.com/v1_1/ddxhm7w2n/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      if (result.secure_url) {
        return result.secure_url;
      } else {
        throw new Error("Failed to get secure_url from the response");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const imageURL = await handleUploadImage();
    if (!imageURL) {
      console.error("Image URL is undefined");
      return;
    }

    let newImageURLS = [];
    if (props.currentDeviation?.imageURLS) {
      newImageURLS = [...props.currentDeviation?.imageURLS];
    }
    newImageURLS.push(imageURL);

    const updatedDeviation = {
      ...props.currentDeviation,
      comments,
      deviationType,
      previewImage: imageURL,
      CheckpointStatus: "deviation",
      imageURLS: newImageURLS,
    };

    props.handleDeviationSave(updatedDeviation);
  };

  const beforeClose = () => {
    console.log("closing");
    setPreviewImage("");
    props.handleCloseDeviationDialog();
  };

  return (
    <BootstrapDialog
      onClose={beforeClose}
      aria-labelledby="customized-dialog-title"
      open={props.openDeviationDialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Report Issue {props.currentDeviation?.CheckpointID}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          beforeClose();
        }}
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
        <Box sx={{ padding: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="deviation-label">Deviation Category</InputLabel>
            <Select
              labelId="deviation-label"
              id="deviation"
              disabled={props.inputDisabled}
              value={deviationType}
              onChange={handleDeviationTypeChange}
            >
              <MenuItem value={"Welding"}>Welding</MenuItem>
              <MenuItem value={"Fixings"}>Fixings</MenuItem>
              <MenuItem value={"Alignments"}>Alignments</MenuItem>
              <MenuItem value={"Bending"}>Bending</MenuItem>
              <MenuItem value={"Aesthetic"}>Aesthetic</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ padding: 1, mb: 1 }}>
          <TextField
            onChange={handleCommentsChange}
            disabled={props.inputDisabled}
            value={comments}
            fullWidth
            label="Add Description"
            multiline
            minRows={4}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {!previewImage ? (
            <Button
              sx={{ zIndex: 1000000 }}
              disabled={props.inputDisabled}
              onChange={handleSelectImage}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              {props.currentDeviation?.imageURLS?.length >= 1
                ? "Upload Another Picture"
                : "Select Picture"}
              <VisuallyHiddenInput type="file" />
            </Button>
          ) : (
            <Button
              sx={{ zIndex: 1000000 }}
              onChange={handleSelectImage}
              disabled={props.inputDisabled}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Add Picture
              <VisuallyHiddenInput type="file" />
            </Button>
          )}

          {previewImage && (
            <Button
              disabled={!deviationType || props.inputDisabled}
              onClick={handleSave}
              variant="contained"
            >
              Save
            </Button>
          )}
        </Box>

        {previewImage && !isLoading && !props.inputDisabled ? (
          <Box
            sx={{
              minWidth: "100%",
              minHeight: "12rem",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              mb: 2,
              mt: 2,
            }}
          >
            <Image
              style={{ objectFit: "contain" }}
              src={
                typeof previewImage === "string"
                  ? previewImage
                  : URL.createObjectURL(previewImage)
              }
              fill
              alt="preview-image"
            />
          </Box>
        ) : null}

        {previewImage && isLoading ? (
          <Box
            sx={{
              minWidth: "100%",
              minHeight: "12rem",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              mt: 2,
            }}
          >
            <CircularProgress size={50} thickness={4} />
          </Box>
        ) : null}

        {props.currentDeviation?.imageURLS?.length >= 1 && (
          <>
            <Divider sx={{ mt: 3 }} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: 1,
                mt: 2,
              }}
            >
              <Typography sx={{ fontSize: "1.2rem" }}>
                Uploaded Pictures
              </Typography>
            </Box>
            <Box
              sx={{
                minWidth: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {props.currentDeviation?.imageURLS.map((imageURL) => (
                <Box
                  key={imageURL}
                  sx={{
                    width: "17rem",
                    height: "17rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    ml: 1,
                    mb: 2,
                  }}
                >
                  <Image
                    style={{ objectFit: "contain" }}
                    src={imageURL}
                    fill
                    alt="uploaded-image"
                  />
                  {!props.inputDisabled && (
                    <IconButton
                      onClick={() => handleDeleteImage(imageURL)}
                      sx={{ mt: 1 }}
                    >
                      <DeleteIcon sx={{ fontSize: 30, color: "red" }} />
                    </IconButton>
                  )}
                  j
                </Box>
              ))}
            </Box>
          </>
        )}
      </DialogContent>
    </BootstrapDialog>
  );
}
