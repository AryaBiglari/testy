import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import boxData from "../../lib/boxData.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import DrawingDialogNew from "../../components/walls/DrawingDialogNew.js";
import RenderPartsLists from "../../components/smallparts/RenderPartsLists.js";
import SmallPartsRow from "../../components/smallparts/SmallPartsRow.js";
import { halftone16x16Orthogonal } from "@cloudinary/url-gen/qualifiers/dither";

export default function Frames() {
  const [eng, setEng] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(true);

  const [trailers, setTrailers] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [currentTrailer, setCurrentTrailer] = React.useState(null);
  const [currentFrame, setCurrentFrame] = React.useState("");

  const [openDrawings, setOpenDrawings] = React.useState(false);

  const handleClickOpenDrawings = (trailer, frame) => {
    setCurrentTrailer(trailer);
    setCurrentFrame(frame);
    setOpenDrawings(true);
  };

  const handleCloseDrawings = () => {
    setOpenDrawings(false);
  };

  // get Parts - start
  React.useEffect(() => {
    setIsLoadingPage(true);
    async function getPartsHandler() {
      const response = await fetch(`/api/planning/create-trailer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setTrailers(data);

      setIsLoadingPage(false);

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong, please try again"
        );
      }
    }
    const onPageLoad = () => {
      try {
        getPartsHandler().then((response) => {});
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        // maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        // bgcolor: "m 42",
        justifyContent: "center",
        // flexDirection: "column",
        alignItems: "flax-start",
        position: "relative",
        pt: 0,
        pl: 2,
        pr: 2,
        bgcolor: "white",
      }}
    >
      <RenderPartsLists
        currentTrailer={currentTrailer}
        partType={"Hopper Door"}
        parts={currentTrailer?.hopperDoorsParts}
        currentFrame={currentFrame}
        openDrawings={openDrawings}
        handleCloseDrawings={handleCloseDrawings}
      />
      <Box
        sx={{
          width: "100%",
          // bgcolor: "brown",
          // pl: 28,
          height: "2.4rem",
          // mb: 2,
          mt: 1,
          display: "flex",
          pl: 4,
          pr: 4,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Box
          onClick={() => {}}
          sx={{
            // minWidth: "12rem",
            height: "100%",
            // bgcolor: "orange",
            position: "relative",
            // ml: -0.3,
            display: "flex",
            justifyContent: "flex-start",
            // flex: 0.8,
            alignItems: "center",
            cursor: "pointer",
            position: "absolute",
            left: "2rem",
          }}
        >
          <Image
            src="/platinumLogo.png"
            width={163.84}
            height={29.92}
            // fill={true}
            alt="logo"
            priority={true}
          />
        </Box>

        <Box sx={{ width: "13.3rem" }}></Box>
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            justifyContent: "center",
            // bgcolor: "red",
          }}
        >
          <Typography
            sx={{
              // bgcolor: "blue",
              width: "27rem",
              fontSize: "1.6rem",
              textAlign: "center",
              mt: "1.7rem",
            }}
          >
            {eng
              ? "Small Parts Manufacturing"
              : "Fabricación de piezas pequeñas"}
          </Typography>
        </Box>
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            // flex: 1,
            width: "13.5rem",
            justifyContent: "center",
            // bgcolor: "blue",
            position: "relative",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          alignItems: "center",
          top: "0.8rem",
          right: "1.9rem",
          // bgcolor: "red",
          // width: "100%",
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            sx={{
              zIndex: "100",
              bgcolor: eng ? "var(--primary)" : "white",
              color: eng ? "white" : "var(--primary)",
              "&:hover": {
                backgroundColor: "var(--primary5)",
                color: "var(--primary)",
                // borderLeft: "none",
              },
            }}
            onClick={() => setEng(true)}
          >
            English
          </Button>
          <Button
            sx={{
              zIndex: "100",
              bgcolor: !eng ? "var(--primary)" : "white",
              color: !eng ? "white" : "var(--primary)",
              "&:hover": {
                backgroundColor: "var(--primary5)",
                color: "var(--primary)",
                // borderLeft: "none",
              },
            }}
            onClick={() => setEng(false)}
          >
            Español
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          // bgcolor: "red",
        }}
      >
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
              width: "5rem",
              // bgcolor: "blue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              width: "9rem",
              justifyContent: "center",
              // bgcolor: "red",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Type
            </Typography>
          </Box>
          <Box
            sx={{
              padding: 0.3,
              // bgcolor: "white",
              height: "4rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              borderRadius: "0.8rem",
              maxWidth: "10rem",
              position: "relative",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Picture
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "8rem",
              justifyContent: "center",
              ml: 2,
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Required
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "5rem",
              justifyContent: "center",
              ml: 2,
              // bgcolor: "red",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Parts
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "8rem",
              // bgcolor: "red",
              justifyContent: "center",
              ml: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textAlign: "center",
                width: "4 rem",
              }}
            >
              Location
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "8rem",
              justifyContent: "center",
              ml: 2,
              // bgcolor: "blue",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Special Req.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "8rem",
              justifyContent: "center",
              ml: 2,
              // bgcolor: "green",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Status
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "11rem",
              justifyContent: "center",
              ml: 2,
              // bgcolor: "green",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Build Timer
            </Typography>
          </Box>
        </Box>
        {trailers.map((trailer, index) => (
          <React.Fragment key={index}>
            <SmallPartsRow
              trailer={trailer}
              partType="Hopper Door"
              location="Front"
              handleClickOpenDrawings={handleClickOpenDrawings}
              setCurrentTrailer={setCurrentTrailer}
              setCurrentFrame={setCurrentFrame}
            />

            {trailer.trailerType === "Tri 61' 3 Hoppers" && (
              <SmallPartsRow
                trailer={trailer}
                partType="Hopper Door"
                location="Middle"
                handleClickOpenDrawings={handleClickOpenDrawings}
                setCurrentTrailer={setCurrentTrailer}
                setCurrentFrame={setCurrentFrame}
              />
            )}

            <SmallPartsRow
              trailer={trailer}
              partType="Hopper Door"
              location="Rear"
              handleClickOpenDrawings={handleClickOpenDrawings}
              setCurrentTrailer={setCurrentTrailer}
              setCurrentFrame={setCurrentFrame}
            />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
