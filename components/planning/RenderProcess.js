import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function RenderProcess(props) {
  const handleCheckPart = (partsList, partNumber, checkState) => {
    const arr = partsList.map((part) => {
      if (part.part === partNumber) {
        console.log({ ...part, checked: checkState });
        return { ...part, checked: checkState };
      }
      return part;
    });
    props.handleParts(arr);
  };
  const handleCheckPartQuantities = (partsList, partNumber, operation) => {
    const arr = partsList.map((part) => {
      if (part.part === partNumber) {
        if (operation === "Add") {
          console.log("add exec");
          return {
            ...part,
            piecesPerTrailer: Number(part?.piecesPerTrailer) + 1,
          };
        }
        if (operation === "Subs") {
          if (Number(part?.piecesPerTrailer) === 0) {
            return part;
          }
          return {
            ...part,
            piecesPerTrailer: Number(part?.piecesPerTrailer) - 1,
          };
        }
      }
      return part;
    });
    props.handleParts(arr);
  };

  const handleAddPart = (partNumber) => {
    let duplicatedParts = 0;

    props.parts.map((part) => {
      if (String(part.part) === String(partNumber)) {
        return duplicatedParts++;
      } else return null;
    });

    const addedPart = props.allParts.filter(
      (part) =>
        String(part.part) === String(partNumber) && duplicatedParts === 0
    );

    const chechedAddedPart = [{ ...addedPart[0], checked: true }];

    if (addedPart.length > 0) {
      props.handleParts([...chechedAddedPart, ...props.parts]);
    }

    props.handleAddPartText("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        pt: 3,
        px: 2,
        mt: 2,
        // bgcolor:'red'
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
          position: "relative",
          // bgcolor:'blue'
        }}
      >
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600", mb: 2 }}>
          {props.sectionTitle}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            right: "0rem",
            top: "0.15rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.1rem", mr: 2 }}>
            Set of {props.parts.filter((part) => part.checked).length} part
            numbers
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mt: 0,
            mb: 0,
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "20rem",
              justifyContent: "space-between",
              // mr:9,
              // mb:2,
              // bgcolor:'red'
            }}
          >
            <TextField
              inputRef={props.addPartRef}
              size="small"
              fullWidth
              id="outlined-basic1"
              label="Add Additional Part"
              variant="outlined"
              // type="number"
              // value={addPartFrontFrame}
              // onChange={handleAddPartFrontFrame}
            />
            <Button
              sx={{ ml: 3, minWidth: "7.5rem" }}
              variant="contained"
              onClick={() => handleAddPart(props.addPartRef.current.value)}
            >
              Add Part
            </Button>
          </Box>
          <Box sx={{ mt: 0, minWidth: "11rem" }}>
            {(props.sectionTitle === "Front Frame" ||
              props.sectionTitle === "Rear Frame") && (
              <FormControl fullWidth size="small">
                <InputLabel id="front-frame-surface-label">
                  Surface Treatment
                </InputLabel>
                <Select
                  labelId="front-frame-surface-label"
                  id="front-frame-surface"
                  value={props.surfaceProcess}
                  label="Surface Treatment"
                  onChange={props.handleSurfaceProcess}
                >
                  <MenuItem value={"Galvanized"}>Galvanized</MenuItem>
                  <MenuItem value={"Painted"}>Painted</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
          <Box sx={{ width: "24rem" }}>
            <TextField
              inputRef={props.additionalRequirements}
              size="small"
              fullWidth
              multiline
              id="outlined-basic1"
              label="Additional Requirements or Explanations"
              variant="outlined"
              // type="number"
              // value={workOrder}
              // onChange={handleWorkOrder}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          // maxWidth: "70vw",
          display: "flex",
          justifyContent: "flex-start",
          mb: 3,
          flexWrap: "wrap",
          bgcolor: "var(--success1)",
          py: 1,
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.1rem", mr: 2, fontWeight: "600" }}>
          Relevant Fields:
        </Typography>

        {props.relevantFields.map((field, index) => {
          return (
            <Typography sx={{ fontSize: "1.1rem", mr: 6 }} key={index}>
              {field.text}: {field.value}
              {field.value !== "Standard" &&
              (field.text === "Rear Slope" ||
                field.text === "Front Slope" ||
                field.text === "Sidewalls Length" ||
                field.text === "Sidewalls Height")
                ? ` (${field.special}")`
                : ""}
            </Typography>
          );
        })}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: "5rem",
            // bgcolor: "blue",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Part
          </Typography>
        </Box>
        <Box
          sx={{
            width: "10rem",
            // bgcolor: "blue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Image
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "9rem",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Quantity
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "5rem",
            justifyContent: "center",
            ml: 2,
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Stock
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "10rem",
            justifyContent: "center",
            ml: 2,
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Part Link
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "12rem",
            justifyContent: "center",
            ml: 2,
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
            Use / Upload Part
          </Typography>
        </Box>
      </Box>
      {props.parts.map((part, index) => {
        return (
          <Box
            key={index * Math.random() + 2}
            sx={{
              width: "100%",
              display: "flex",
              // alignItems:'center',
              // bgcolor: "red",
              justifyContent: "space-evenly",
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: "5rem",
                // bgcolor: "blue",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: part.checked ? "" : "var(--secondary25)",
                }}
              >
                {part.part}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: 0.3,
                bgcolor: "white",
                height: "4rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0.8rem",
                maxWidth: "10rem",
                position: "relative",
                position: "relative",
              }}
            >
              <Image
                src={`${part.partURL}`}
                style={{
                  objectFit: "contain",
                  filter: part.checked ? "unset" : "opacity(20%)",
                }}
                fill={true}
                sizes={"100%"}
                priority={true}
                alt="Picture of the author"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "9rem",
                justifyContent: "center",
              }}
            >
              <IconButton
                aria-label="left"
                sx={{ mr: 2 }}
                onClick={() =>
                  handleCheckPartQuantities(props.parts, part.part, "Subs")
                }
              >
                <ChevronLeftIcon sx={{ fontSize: "1.3rem" }} />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: part.checked ? "" : "var(--secondary25)",
                }}
              >
                {part.piecesPerTrailer}
              </Typography>
              <IconButton
                aria-label="left"
                sx={{ ml: 2 }}
                onClick={() =>
                  handleCheckPartQuantities(props.parts, part.part, "Add")
                }
              >
                <ChevronRightIcon sx={{ fontSize: "1.3rem" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "5rem",
                justifyContent: "center",
                ml: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: part.checked ? "" : "var(--secondary25)",
                }}
              >
                {part.stock}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "10rem",
                justifyContent: "center",
                ml: 2,
                cursor: "pointer",
              }}
            >
              {part?.onshapeURL && (
                <Typography
                  onClick={() => window.open(`${part?.onshapeURL}`)}
                  sx={{
                    fontSize: "0.9rem",
                    textDecoration: "underline",
                    color: part.checked
                      ? "var(--primary)"
                      : "var(--secondary25)",
                  }}
                >
                  {part?.onshapeName}
                </Typography>
              )}
              {!part?.onshapeURL && (
                <Typography
                  sx={{
                    color: "var(--secondary65)",
                    fontSize: "0.9rem",
                    //   textDecoration: "underline",
                  }}
                >
                  {part?.onshapeName}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "12rem",
                justifyContent: "center",
                ml: 2,
              }}
            >
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                  sx={{
                    zIndex: "100",
                    fontSize: "0.8rem",
                    bgcolor: part.checked ? "var(--primary)" : "white",
                    color: part.checked ? "white" : "var(--primary)",
                    "&:hover": {
                      backgroundColor: "var(--primary5)",
                      color: "var(--primary)",
                      // borderLeft: "none",
                    },
                  }}
                  onClick={() => handleCheckPart(props.parts, part.part, true)}
                >
                  Use
                </Button>
                <Button
                  sx={{
                    zIndex: "100",
                    fontSize: "0.8rem",
                    bgcolor: !part.checked ? "var(--primary)" : "white",
                    color: !part.checked ? "white" : "var(--primary)",
                    "&:hover": {
                      backgroundColor: "var(--primary5)",
                      color: "var(--primary)",
                      // borderLeft: "none",
                    },
                  }}
                  onClick={() => handleCheckPart(props.parts, part.part, false)}
                >
                  Remove
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
