  import * as React from "react";
  import Button from "@mui/material/Button";
  import Box from "@mui/material/Box";
  import { styled } from "@mui/material/styles";
  import Typography from "@mui/material/Typography";
  import CircularProgress from "@mui/material/CircularProgress";
  import Image from "next/image";
  import boxData from "../../lib/boxData.js";
  import ButtonGroup from "@mui/material/ButtonGroup";
  import DrawingDialogNew from "../walls/DrawingDialogNew.js";
  import RenderPartsLists from "../smallparts/RenderPartsLists.js";
  import SmallPartsRow from "../smallparts/SmallPartsRow.js";
  import { halftone16x16Orthogonal } from "@cloudinary/url-gen/qualifiers/dither";
  import PipeRow from "./PipeRow.js";
  import Alert from "@mui/material/Alert";
  import Collapse from "@mui/material/Collapse";
  import IconButton from "@mui/material/IconButton";
  import CloseIcon from "@mui/icons-material/Close";
  import { isTomorrow, isToday, subBusinessDays, isPast } from "date-fns";

  export default function PipesStockTable(props) {
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
    const [currentPartNumber, setCurrentPartNumber] = React.useState("");


    const [pipes, setPipes] = React.useState([]);

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

    const renderStock = (partNumber, stock) => {
      return stock.filter((item) => item.partNumber === partNumber)[0];
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

          const stockResponse = await fetch(`/api/pipes/update-pipes`, {
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
          const initialPipes = [
            {
              partNumber: "160001004",
              material: "AL",
              shape: "Bar",
              alloy: "6061 T6511",
              diameter: "0.5 in",
              thickness: "N/A",
              length: "144 in",
            },
            {
              partNumber: "363002500",
              material: "AL",
              shape: "Rectangular Tube",
              alloy: "6061 T6511",
              diameter: "2 in x 3 in",
              thickness: "0.188 in",
              length: "240 in",
            },
            {
              partNumber: "300063529",
              material: "AL",
              shape: "Square Tube",
              alloy: "6061 T6511",
              diameter: "3 in x 3 in",
              thickness: "0.187 in",
              length: "288 in",
            },
            {
              partNumber: "100007747",
              material: "AL",
              shape: "Square Tube",
              alloy: "6061 T6511",
              diameter: "4 in x 4 in",
              thickness: "0.25 in",
              length: "240 in",
            },
            {
              partNumber: "300063574",
              material: "AL",
              shape: "Square Tube",
              alloy: "6061 T6511",
              diameter: "6 in x 6 in",
              thickness: "0.25 in",
              length: "288 in",
            },
            {
              partNumber: "300063530",
              material: "AL",
              shape: "Pipe",
              alloy: "6061 T4",
              diameter: "1 in Nominal",
              thickness: "0.133 in",
              length: "240 in",
            },
            {
              partNumber: "300063577",
              material: "AL",
              shape: "Round Tube",
              alloy: "6061 T6511",
              diameter: "3 in OD",
              thickness: "0.125 in",
              length: "212 in",
            },
            {
              partNumber: "900000071",
              material: "SS",
              shape: "Pipe",
              alloy: "304",
              diameter: '3/4 in Nominal',
              thickness: "0.154 in", 
              length: "240 in",
            },
            {
              partNumber: "160010320",
              material: "SS",
              shape: "Orn. Round Tube",
              alloy: "304",
              diameter: "1.25 in OD",
              thickness: "16 GA", 
              length: "240 in",
            },].map((pipe) => {
              const renderedStock = renderStock(pipe.partNumber, stockData);
            
              return {
                ...pipe,
                stock: renderedStock?.stock || 0,
                stockDate: renderedStock?.date || null,
                // Add other properties like h24, h48, etc., if needed
              };
            });

          console.log("made it here");
          setPipes(initialPipes);
          setTrailers(trailersData);
          setParts(partsData);

          console.log(stockData, trailersData, partsData);
          console.log(initialPipes);

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

    const updatePipesStock = async (pipeData) => {
      setIsSaving(true);
      setCurrentPartNumber(pipeData.partNumber);
      setCurrentMaterial(pipeData.material);
      
      const data = {
        partNumber: pipeData.partNumber,
        material: pipeData.material,
        shape: pipeData.shape,
        alloy: pipeData.alloy,
        diameter: pipeData.diameter,
        thickness: pipeData.thickness,
        length: pipeData.length,
        date: new Date(), // Current date
        stock: pipeData.stock,
      };
    
        // Make the POST request to update the pipe stock
        const response = await fetch("/api/pipes/update-pipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const result = await response.json();
    
        if (!response.ok) {
          handleActiveAlert(true, "error", result.message || "The part failed to update");
          console.error("Failed to update the pipe data:", result.message);
        } else {
          console.log("Pipe data updated successfully:", result);
          handleActiveAlert(true, "success", "The part was updated successfully");
    
          setPipes((prevPipes) =>
            prevPipes.map((pipe) =>
              pipe.partNumber === pipeData.partNumber
                ? { ...pipe, stock: data.stock, stockDate: data.date }
                : pipe
            )
          );
        }
      setIsSaving(false);
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
          minHeight: "50vh",
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

        {/* <Button onClick={() => updatePipesStock("SS", "0.078", 2)}>Test</Button> */}
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
          </Box>

          <Box sx={{ width: "13.3rem" }}></Box>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 0, pt: 6}}>
          Pipes Stock Control
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
            mt: 0,
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
                width: "3.5rem",
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
                width: "10rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                Diameter
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
                width: "6rem",
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
                width: "5rem",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                Length
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
                Shape
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
                width: "6rem",
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

          {pipes.map((pipe, index) => {
            return (
              <PipeRow
                key={index}
                mode={props.mode}
                handleActiveAlert={handleActiveAlert}
                pipe={pipe}
                index={index}
                pipes={pipes}
                updatePipesStock={updatePipesStock}
                isSaving={isSaving}
                currentPartNumber={currentPartNumber}
              />

            );
          })}
        </Box>
      </Box>
    );
  }
