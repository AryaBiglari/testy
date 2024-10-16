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

export default function RenderNonEditableProcess(props) {
  props.parts.map((part) => {
    part.piecesPerTrailer = props?.partsQuantities?.find(
      (item) => part?.part === item?.partNumber
    )?.qty;
    return {
      ...part,
    };
  });

  console.log(props);
  //   console.log(props.partsQuantities);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        pt: 1,
        px: 2,
        mt: 2,
        mb: 8,
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
          mb: 2,
          position: "relative",
          // bgcolor:'blue'
        }}
      >
        <Typography sx={{ fontSize: "1.4rem", fontWeight: "600", mb: 1 }}>
          List of Parts for this {props.partType}
        </Typography>
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
                  // color: part.checked ? "" : "var(--secondary25)",
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
                  // filter: part.checked ? "unset" : "opacity(20%)",
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
              <Typography
                sx={{
                  fontSize: "1rem",
                  // color: part.checked ? "" : "var(--secondary25)",
                }}
              >
                {part.piecesPerTrailer}
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
              <Typography
                sx={{
                  fontSize: "1rem",
                  // color: part.checked ? "" : "var(--secondary25)",
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
                    // color: part.checked
                    //   ? "var(--primary)"
                    //   : "var(--secondary25)",
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
          </Box>
        );
      })}
    </Box>
  );
}
