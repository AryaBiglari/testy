import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import boxData from "../../lib/boxData.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import DrawingDialogNew from "../../components/walls/DrawingDialogNew.js";
import RenderPartsLists from "../../components/smallparts/RenderPartsLists.js";
import SmallPartsRow from "../../components/smallparts/SmallPartsRow.js";
import { halftone16x16Orthogonal } from "@cloudinary/url-gen/qualifiers/dither";
import SheetRow from "./SheetRow.js";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { isTomorrow, isToday, subBusinessDays, isPast } from "date-fns";

export default function SheetsStockTable(props) {
  const [trailers, setTrailers] = React.useState([]);
  const [isLoadingTrailers, setIsLoadingTrailers] = React.useState(true);
  const [isLoadingParts, setIsLoadingParts] = React.useState(true);
  const [rerender, setRerender] = React.useState(true);

  const handleRerender = () => {
    setRerender(!rerender);
  };

  const [isSaving, setIsSaving] = React.useState(false);

  const [openDrawings, setOpenDrawings] = React.useState(false);

  const [currentMaterial, setCurrentMaterial] = React.useState("");
  const [currentWT, setCurrentWT] = React.useState("");

  const [sheets, setSheets] = React.useState([]);

  const [newNeededPartsArr, setnewNeededPartsArr] = React.useState([]);

  const handleClickOpenDrawings = (trailer, frame) => {
    setCurrentTrailer(trailer);
    setCurrentFrame(frame);
    setOpenDrawings(true);
  };

  const handleCloseDrawings = () => {
    setOpenDrawings(false);
  };

  const [stock, setStock] = React.useState([]);

  const renderStock = (WT, material, stock) => {
    return stock.filter(
      (item) => item.material === material && item.WT === WT
    )[0];
  };

  const [alertActive, setAlertActve] = React.useState(false);
  const [activeAlertType, setActiveAlertType] = React.useState("");
  const [activeAlertMessage, setActiveAlertMessage] = React.useState("");

  const handleActiveAlert = (state, type, message) => {
    setAlertActve(state);
    setActiveAlertType(type);
    setActiveAlertMessage(message);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setAlertActve(false);
    }, 5000);
  }, [alertActive]);

  const getNeededPartsArr = (trailers) => {
    const newNeededPartsArr = [];

    trailers.map((trailer) => {
      trailer?.boxStage1?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Box Stage 1",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });

      trailer?.boxStage2?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Box Stage 2",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.boxStage3?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Box Stage 3",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.boxStage4?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Box Stage 4",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.boxFinishing?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Box Finishing",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.frontFrameFinishingParts?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Front Frame Finishing",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.rearFrameFinishingParts?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Rear Frame Finishing",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.frontFrameParts?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Front Frame",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.rearFrameParts?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Rear Frame",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
      trailer?.hopperDoorParts?.map((part) => {
        newNeededPartsArr.push({
          ...part,
          process: "Small Parts Stage",
          dateReqForTrailer: trailer?.dateRequired,
          WO: trailer.workOrder,
          trailerType: trailer.trailerType,
        });
      });
    });

    return newNeededPartsArr;
  };

  const [parts, setParts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingParts(true);
        setIsLoadingTrailers(true);

        const stockResponse = await fetch(`/api/sheets/update-sheets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const stockData = await stockResponse.json();
        console.log("stock data was recieeved", stockData);

        const trailersResponse = await fetch(`/api/planning/create-trailer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const trailersData = await trailersResponse.json();
        console.log("trailer data was receieved", trailersData);

        const partsResponse = await fetch(`/api/cutting/upload-part`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const partsData = await partsResponse.json();
        console.log("parts data was recieved", partsData);

        if (!stockResponse.ok || !trailersResponse.ok || !partsResponse.ok) {
          throw new Error("Something went wrong, please try again");
        }

        const newNeededPartsArr = getNeededPartsArr(trailersData);
        console.log("something else");
        const initialSheets = [
          {
            material: "AL",
            WT: "0.05",
            sheetSize: "60 x 120",
            sheetArea: 60 * 120,
          },
          {
            material: "AL",
            WT: "1/8",
            sheetSize: "72 x 144",
            sheetArea: 72 * 144,
          },
          {
            material: "AL",
            WT: "3/16",
            sheetSize: "60 x 144",
            sheetArea: 60 * 144,
          },
          {
            material: "AL",
            WT: "1/4",
            sheetSize: "60 x 120",
            sheetArea: 60 * 120,
          },
          {
            material: "AL",
            WT: "3/8",
            sheetSize: "60 x 120",
            sheetArea: 60 * 120,
          },
          {
            material: "AL",
            WT: "1/2",
            sheetSize: "60 x 120",
            sheetArea: 60 * 120,
          },
          {
            material: "AL",
            WT: "5/8",
            sheetSize: "48.5 x 144",
            sheetArea: 48.5 * 144,
          },
          {
            material: "CS",
            WT: "3/16",
            sheetSize: "72.81 X 144.25",
            sheetArea: 72.5 * 144,
          },
          {
            material: "CS",
            WT: "1/4",
            sheetSize: "60 X 120",
            sheetArea: 72.5 * 144,
          },
          {
            material: "CS",
            WT: "5/16",
            sheetSize: "72.56 X 144.21",
            sheetArea: 72.5 * 144,
          },
          {
            material: "CS",
            WT: "3/8",
            sheetSize: "72.37 X 144.25",
            sheetArea: 72.5 * 144,
          },
          {
            material: "CS",
            WT: "1/2",
            sheetSize: "60 X 120",
            sheetArea: 60 * 120,
          },
          {
            material: "QT100",
            WT: "3/16",
            sheetSize: "96 X 288",
            sheetArea: 96 * 288,
          },
          {
            material: "QT100",
            WT: "3/8",
            sheetSize: "96 X 288",
            sheetArea: 96 * 288,
          },
          {
            material: "SS",
            WT: "0.078",
            sheetSize: "48 x 96",
            sheetArea: 48 * 96,
          },
          {
            material: "SS",
            WT: "1/8",
            sheetSize: "48 x 96",
            sheetArea: 48 * 96,
          },
          {
            material: "SS",
            WT: "3/16",
            sheetSize: "60 x 120",
            sheetArea: 60 * 120,
          },
          {
            material: "SS",
            WT: "3/8",
            sheetSize: "60 x 120",
            sheetArea: 60 * 120,
          },
          {
            material: "SS",
            WT: "1/2",
            sheetSize: "60 x 120",
            sheetArea: 60 * 120,
          },
          // {
          //   material: "SS",
          //   WT: "177/2",
          //   sheetSize: "60 x 120",
          //   sheetArea: 60 * 120,
          // },
        ].map((sheet, index) => {
          const renderedStock = renderStock(
            sheet.WT,
            sheet.material,
            stockData
          );
          const neededAreasCalculated = neededAreas(
            sheet.WT,
            sheet.material,
            partsData,
            newNeededPartsArr
          );

          return {
            ...sheet,
            stock: renderedStock?.stock,
            stockDate: renderedStock?.date,
            h24: neededAreasCalculated?.neededArea24h,
            h48: neededAreasCalculated?.neededArea48h,
            w1: neededAreasCalculated?.neededArea1W,
            w2: neededAreasCalculated?.neededArea2W,
            m1: neededAreasCalculated?.neededArea1M,
            m2: neededAreasCalculated?.neededArea2M,
          };
        });

        console.log("made it here");
        setSheets(initialSheets);
        setTrailers(trailersData);
        setParts(partsData);

        console.log(stockData, trailersData, partsData);
        console.log(initialSheets);

        setIsLoadingParts(false);
        setIsLoadingTrailers(false);
      } catch (error) {
        console.error(error);
        setIsLoadingParts(false);
        setIsLoadingTrailers(false);
      }
    };

    const onPageLoad = () => {
      fetchData();
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [rerender]);

  const processDateReq = (process, dateReqForTrailer) => {
    if (process === "Rear Frame" || process === "Front Frame") {
      return subBusinessDays(dateReqForTrailer, 16);
    }
    if (process === "Box Stage 1") {
      return subBusinessDays(dateReqForTrailer, 13);
    }
    if (process === "Box Stage 2") {
      return subBusinessDays(dateReqForTrailer, 12);
    }
    if (process === "Box Stage 3") {
      return subBusinessDays(dateReqForTrailer, 11);
    }
    if (process === "Box Stage 4") {
      return subBusinessDays(dateReqForTrailer, 10);
    }
    if (process === "Small Parts Stage") {
      return subBusinessDays(dateReqForTrailer, 12);
    }
    if (process === "Box Finishing") {
      return subBusinessDays(dateReqForTrailer, 8);
    }
    if (process === "Front Frame Finishing") {
      return subBusinessDays(dateReqForTrailer, 6);
    }
    if (process === "Rear Frame Finishing") {
      return subBusinessDays(dateReqForTrailer, 4);
    } else return null;
  };

  const neededAreas = (thickness, material, parts, newNeededPartsArr) => {
    let neededArea24h = 0;
    let neededArea48h = 0;
    let neededArea1W = 0;
    let neededArea2W = 0;
    let neededArea1M = 0;
    let neededArea2M = 0;

    parts.forEach((part) => {
      let totalPartStockArea = 0;
      if (part.WT === thickness && part.mat === material) {
        totalPartStockArea =
          totalPartStockArea +
          Number(part.stock ? part.stock : 0) *
            Number(part.area ? part.area : 0);

        let totalPartNeededArea = 0;
        const needsForThisPart = newNeededPartsArr.filter(
          (item) => String(item.partNumber) === String(part.part)
        );

        needsForThisPart.forEach((element) => {
          totalPartNeededArea =
            totalPartNeededArea +
            Number(element.qty ? element.qty : 0) *
              Number(part.area ? part.area : 0);

          if (
            isTomorrow(
              new Date(
                processDateReq(element?.process, element?.dateReqForTrailer)
              )
            ) ||
            isToday(
              new Date(
                new Date(
                  processDateReq(element?.process, element?.dateReqForTrailer)
                )
              )
            ) ||
            isPast(
              new Date(
                new Date(
                  processDateReq(element?.process, element?.dateReqForTrailer)
                )
              )
            )
          ) {
            neededArea24h =
              neededArea24h +
              Number(part.area ? part.area : 0) * Number(element?.qty);
          }

          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(element?.process, element?.dateReqForTrailer)
                ),
                2
              )
            )
          ) {
            neededArea48h =
              neededArea48h +
              Number(part.area ? part.area : 0) * Number(element?.qty);
          }

          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(element?.process, element?.dateReqForTrailer)
                ),
                5
              )
            )
          ) {
            neededArea1W =
              neededArea1W +
              Number(part.area ? part.area : 0) * Number(element?.qty);
          }

          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(element?.process, element?.dateReqForTrailer)
                ),
                10
              )
            )
          ) {
            neededArea2W =
              neededArea2W +
              Number(part.area ? part.area : 0) * Number(element?.qty);
          }

          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(element?.process, element?.dateReqForTrailer)
                ),
                20
              )
            )
          ) {
            neededArea1M =
              neededArea1M +
              Number(part.area ? part.area : 0) * Number(element?.qty);
          }

          if (
            isPast(
              subBusinessDays(
                new Date(
                  processDateReq(element?.process, element?.dateReqForTrailer)
                ),
                40
              )
            )
          ) {
            neededArea2M =
              neededArea2M +
              Number(part.area ? part.area : 0) * Number(element?.qty);
          }
        });

        neededArea24h = neededArea24h - totalPartStockArea;
        neededArea48h = neededArea48h - totalPartStockArea;
        neededArea1W = neededArea1W - totalPartStockArea;
        neededArea2W = neededArea2W - totalPartStockArea;
        neededArea1M = neededArea1M - totalPartStockArea;
        neededArea2M = neededArea2M - totalPartStockArea;
      }
    });
    return {
      neededArea24h,
      neededArea48h,
      neededArea1W,
      neededArea2W,
      neededArea1M,
      neededArea2M,
    };
  };

  const updateSheetsStock = async (material, WT, stock) => {
    setIsSaving(true);
    setCurrentMaterial(material);
    setCurrentWT(WT);

    // sheets.filter(item => item.material === material && item.WT === WT).isSaving = true
    const data = {
      material: material,
      WT: WT,
      date: new Date(),
      stock: stock,
    };

    const response = await fetch("/api/sheets/update-sheets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      handleActiveAlert(true, "error", "The part failed to update");
      console.error("Failed to update the trailer data");
    } else {
      console.log("Trailer data updated successfully");
      handleActiveAlert(true, "success", "The part was updated successfully");
      setSheets((prevSheets) =>
        prevSheets.map((sheet) =>
          sheet.WT === WT && sheet.material === material
            ? { ...sheet, stock: data.stock, stockDate: data.date }
            : sheet
        )
      );
    }

    // console.log(
    //   sheets.map((sheet) => {
    //     if (sheet.material === material && sheet.WT === WT) {
    //       sheet.stock = 234;
    //       return { ...sheet };
    //     } else return sheet;
    //   })
    // );

    setIsSaving(false);
    // handleRerender();
  };

  if (isLoadingTrailers || isLoadingParts) {
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
        minHeight: "0vh",
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
        pb: 0,
        mt: 0,
        mb: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: "0.4rem",
          zIndex: "100",
        }}
      >
        <Collapse in={alertActive}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertActve(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={activeAlertType}
            sx={{ mb: 2 }}
          >
            {activeAlertMessage}
          </Alert>
        </Collapse>
      </Box>

      {/* <Button onClick={() => updateSheetsStock("SS", "0.078", 2)}>Test</Button> */}
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
        <Typography variant="h4" sx={{ textAlign: "center", mb: 12, pt: 18}}>
          Sheets Stock Control
        </Typography>
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            justifyContent: "center",
            // bgcolor: "red",
          }}
        >
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
          width: "100%",
          mt: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          mt: 12,
          pl: 2,
          //   bgcolor: "red",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            mb: 0,
            // maxHeight: "2.4rem",
            // bgcolor: "blue",
          }}
        >
          <Box
            sx={{
              //   width: "5.5rem",
              //   bgcolor: "blue",
              paddingX: "1rem",
              paddingY: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--secondary15)",
              borderTopLeftRadius: "0.8rem",
              width: "6.5rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
              Material
            </Typography>
          </Box>
          <Box
            sx={{
              paddingX: "1rem",
              paddingY: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--secondary15)",
              borderLeft: "none",
              width: "7rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
              Thickness
            </Typography>
          </Box>

          <Box
            sx={{
              paddingX: "1rem",
              paddingY: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--secondary15)",
              borderLeft: "none",
              width: "10rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
              Sheet Size
            </Typography>
          </Box>
          <Box
            sx={{
              paddingX: "1rem",
              paddingY: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--secondary15)",
              borderLeft: "none",
              width: "8rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
              Stock
            </Typography>
          </Box>
          <Box
            sx={{
              paddingX: "1rem",
              paddingY: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--secondary15)",
              borderLeft: "none",
              width: "10rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
              Stock Date
            </Typography>
          </Box>
          {!props.mode && (
            <Box
              sx={{
                paddingX: "0.5rem",
                paddingY: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--secondary15)",
                borderLeft: "none",
                width: "5rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                24 hrs
              </Typography>
            </Box>
          )}
          {!props.mode && (
            <Box
              sx={{
                paddingX: "0.5rem",
                paddingY: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--secondary15)",
                borderLeft: "none",
                width: "5rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                48 hrs
              </Typography>
            </Box>
          )}
          {!props.mode && (
            <Box
              sx={{
                paddingX: "0.5rem",
                paddingY: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--secondary15)",
                borderLeft: "none",
                width: "5rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                1 Week
              </Typography>
            </Box>
          )}
          {!props.mode && (
            <Box
              sx={{
                paddingX: "0.5rem",
                paddingY: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--secondary15)",
                borderLeft: "none",
                width: "5.5rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                2 Weeks
              </Typography>
            </Box>
          )}
          {!props.mode && (
            <Box
              sx={{
                paddingX: "0.5rem",
                paddingY: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--secondary15)",
                borderLeft: "none",
                width: "5.5rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                  width: "4 rem",
                }}
              >
                1 Month
              </Typography>
            </Box>
          )}
          {!props.mode && (
            <Box
              sx={{
                paddingX: "0.5rem",
                paddingY: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--secondary15)",
                borderLeft: "none",
                borderTopRightRadius: "0.8rem",
                width: "6rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                2 Months
              </Typography>
            </Box>
          )}
        </Box>

        {sheets.map((sheet, index) => {
          return (
            <SheetRow
              key={index}
              mode={props.mode}
              handleActiveAlert={handleActiveAlert}
              sheet={sheet}
              index={index}
              sheets={sheets}
              updateSheetsStock={updateSheetsStock}
              isSaving={isSaving}
              currentMaterial={currentMaterial}
              currentWT={currentWT}
            />
          );
        })}
      </Box>
    </Box>
  );
}
