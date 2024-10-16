

import * as React from "react";


import JigSwiper2 from "../../components/boxes/JigSwiper2.js";



import Image from "next/image";


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
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ButtonGroup from "@mui/material/ButtonGroup";
import InfoIcon from "@mui/icons-material/Info";



import {
  Navigation,
  Pagination,
  Keyboard,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade } from "swiper/modules";

import { Autoplay } from "swiper";
import CircularProgress from "@mui/material/CircularProgress";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import { DvrOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const CustomNextButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  backgroundColor: "var(--primary)",
  color: "white",
  width: "3.6rem",
  height: "3.6rem",
  borderRadius: "1rem",
  zIndex: 10,
  "&:hover": {
    backgroundColor: "var(--primary75)",
  },
}));

const CustomPrevButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  backgroundColor: "var(--primary)",
  color: "white",
  width: "3.6rem",
  height: "3.6rem",
  borderRadius: "1rem",
  zIndex: 10,
  "&:hover": {
    backgroundColor: "var(--primary75)",
  },
}));

export default function Boxes() {
  const numJigs = 4;

  const checkPassword = () => {
    const password = localStorage.getItem("password");
    return true;
  };

  const ISSERVER = typeof window === "undefined";
  let isPasswordValid = false;

  if (!ISSERVER) {
    isPasswordValid = checkPassword();
    console.log("Password Valid and Editing On: " + isPasswordValid);
  }

  const [eng, setEng] = React.useState(true);
  const [currentJig, setCurrentJig] = React.useState(1);
  const [trailersOnJigs, setTrailersOnJigs] = React.useState(
    Array(numJigs).fill(null)
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const handleCurrentJig = (newJig) => {
    setCurrentJig(newJig);
  };


  React.useEffect(() => {
    setIsLoading(true);
    async function getBoxData() {
      const response = await fetch(`/api/boxes/boxesapi?type=onJig`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trailers");
      }

      const data = await response.json();


      let temp = Array(numJigs).fill(null);
      data.forEach((trailer) => {
        const jigNumber = trailer.boxData.jig;
        if (jigNumber >= 1 && jigNumber <= numJigs) {
          temp[jigNumber - 1] = trailer;
        }
      });

      setTrailersOnJigs(temp);
      setIsLoading(false);
    }

    const onPageLoad = () => {
      try {
        getBoxData().then((response) => { });
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

  const handleJigRemoval = async (_id) => {
    const updates = {
      isReadyForBoxStage: "complete",
    };
    const data = {
      _id,
      updates,
    };

    try {
      const response = await fetch("/api/boxes/boxesapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to remove trailer:", errorData);

        return;
      }

      console.log("Trailer removed success");
      setTrailersOnJigs((prevTrailersOnJigs) => {
        const updatedTrailersOnJigs = [...prevTrailersOnJigs];

        const index = updatedTrailersOnJigs.findIndex(
          (trailer) => trailer?._id === _id
        );

        if (index !== -1) {
          updatedTrailersOnJigs[index] = null;
        }

        return updatedTrailersOnJigs;
      });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };



  const jigAdder = async (trailer, jig) => {
    const updates = {
      [`isReadyForBoxStage`]: "currently on jig",
      [`boxData.jig`]: jig,
    };

    const data = {
      workOrder: trailer.workOrder,
      trailerType: trailer.trailerType,
      updates,
    };

    const response = await fetch("/api/boxes/boxesapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to update the trailer data");
    } else if (response.ok) {
      console.log("Trailer data updated successfully");
      trailer.boxData.jig = jig;
      let temp = [...trailersOnJigs];
      temp[jig - 1] = trailer;

      setTrailersOnJigs(temp);
    }

    return response;
  };










  const swiperRef = React.useRef(null);

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideChange = () => {
    handleCurrentJig(swiperRef.current.swiper.activeIndex + 1);
  };

  const makeChangeToTrailer = (jig, path, newValue) => {
    setTrailersOnJigs((prevTrailersOnJigs) => {
      const updatedTrailersOnJigs = [...prevTrailersOnJigs];
      const keys = path.split(".");
      let current = updatedTrailersOnJigs[jig - 1];

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = newValue;
      return updatedTrailersOnJigs;
    });
  };

  const handleJigAddition = (workOrder, trailerType, jig) => { };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: 1,
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
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
    );
  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100vh",

        display: "flex",

        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        pt: 0,
        pl: 2,
        pr: 2,
        bgcolor: "white",
      }}
    >
      {/* Top Bar with Logo and Jig Buttons */}
      <Box
        sx={{
          width: "100%",


          height: "2.4rem",

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
        {/* Logo */}
        <Box
          onClick={() => { }}
          sx={{

            height: "100%",

            position: "relative",

            display: "flex",
            justifyContent: "flex-start",

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

            alt="logo"
            priority={true}
          />
        </Box>
        <Box
          sx={{

            display: "flex",
            justifyContent: "center",

          }}
        ></Box>

        {/* Jig Buttons Section */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            flexDirection: "column",
            alignItems: "center",
            width: "99rem",
            height: "3.6rem",
            mt: 3,
          }}
        >
          <ButtonGroup variant="outlined" aria-label="Basic button group">

            {Array.from({ length: numJigs }, (_, index) => index + 1).map(
              (jig, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    handleCurrentJig(jig);
                    goToSlide(index);
                  }}
                  sx={{
                    zIndex: "100",
                    width: "6rem",
                    height: "3.6rem",
                    fontSize: "1.2rem",
                    bgcolor: currentJig === jig ? "var(--primary)" : "white",
                    color: currentJig === jig ? "white" : "var(--primary)",
                    "&:hover": {
                      backgroundColor: "var(--primary5)",
                      color: "var(--primary)",
                    },
                    borderTopLeftRadius: index === 0 ? "1rem" : "0",
                    borderBottomLeftRadius: index === 0 ? "1rem" : "0",
                    borderTopRightRadius: index === numJigs - 1 ? "1rem" : "0",
                    borderBottomRightRadius: index === numJigs - 1 ? "1rem" : "0",
                  }}
                >
                  Jig {jig}
                </Button>
              )
            )}
          </ButtonGroup>


        </Box>

        <Box
          sx={{

            display: "flex",

            width: "13.5rem",
            justifyContent: "center",

            position: "relative",
          }}
        ></Box>
      </Box>

      {/* Language Toggle Button Group */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          alignItems: "center",
          top: "0.57rem",
          right: "1.9rem",


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

              },
            }}
            onClick={() => setEng(false)}
          >
            Español
          </Button>
        </ButtonGroup>
      </Box>

      {/* Swiper and Main Content */}
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Custom Previous Button */}
        <CustomPrevButton onClick={handlePrev} aria-label="Previous Slide" sx={{
          width: "5rem",
          height: "5rem",
        }}>

          <ArrowBackIcon sx={{ fontSize: "2rem" }} />
        </CustomPrevButton>

        {/* Swiper Component */}
        <Swiper
          onSlideChange={handleSlideChange}
          ref={swiperRef}
          style={{
            "--swiper-navigation-color": "#1976d2",
            "--swiper-navigation-size": "2.6rem",
            position: "relative",
          }}
          effect={"Fade"}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          keyboard={{
            enabled: true,
          }}
          navigation={false}
          modules={[Navigation, Keyboard, EffectFade]}
          speed={800}
          loop={false}
        >
          {trailersOnJigs &&
            trailersOnJigs.map((trailer, index) => (
              <SwiperSlide key={index}>
                {/* {console.log(trailer)} */}
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",

                    mt: "1.4rem",
                  }}
                >
                  <JigSwiper2

                    trailer={trailer}



                    jig={index + 1}
                    handleJigRemoval={handleJigRemoval}
                    handleJigAddition={handleJigAddition}
                    jigAdder={jigAdder}
                    makeChangeToTrailer={makeChangeToTrailer}
                    isJigEmpty={trailer === null}
                    isPasswordValid={isPasswordValid}
                    eng={eng}

                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Next Button */}
        <CustomNextButton onClick={handleNext} aria-label="Next Slide" sx={{
          width: "5rem",
          height: "5rem",
        }}>

          <ArrowForwardIcon sx={{ fontSize: "2rem" }} />
        </CustomNextButton>

      </Box>
    </Box>
  );


  function handlePrev() {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }

  function handleNext() {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }
}
