import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";

export default function VINCalculator() {
  const [lastVINNumber, setLastVINNumber] = React.useState("");
  const [chasis, setChasis] = React.useState("K");
  const [trailerType, setTrailerType] = React.useState("H");
  const [workOrder, setWorkOrder] = React.useState("");
  const [trailerLength, setTrailerLength] = React.useState("");
  const [trailerAxles, setTrailerAxles] = React.useState("");
  const [trailerConfiguration, setTrailerConfiguration] = React.useState("");
  const [modelYear, setModelYear] = React.useState("S");
  const [digit9, setDigit9] = React.useState("");
  const [digitNineNumerator, setDigitNineNumerator] = React.useState("");
  const [products, setProducts] = React.useState("");
  const [lastVINDigitsPlus1, setLastVINDigitsPlus1] = React.useState("");
  const [VIN, setVIN] = React.useState("");
  const [recentTrailers, setRecentTrailers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isGenerated, setIsGenerated] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [trailerTypeSearch, setTrailerTypeSearch] = React.useState("");
  const [getOtherTrailerDataIsLoading, setGetOtherTrailerDataIsLoading] =
    React.useState(false);
  const [searchedTrailer, setSearchedTrailer] = React.useState(null);
  const [isUpdatingVIN, setIsUpdatingVIN] = React.useState(false);

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

  const handleTrailerTypeSearchChange = (event) => {
    setTrailerTypeSearch(event.target.value);
  };

  const handleWorkOrder = (event) => {
    setWorkOrder(event.target.value);
  };

  const handleLastVINNumberChange = (event) => {
    if (+event.target.value > 999) return;
    if (+event.target.value < 0) return;
    setLastVINNumber(event.target.value);
  };

  const handleChasisChange = (event) => {
    setChasis(event.target.value);
  };

  const handleTrailerTypeChange = (event) => {
    setTrailerType(event.target.value);
  };

  const handleTrailerLengthChange = (event) => {
    setTrailerLength(event.target.value);
  };

  const handleTrailerAxlesChange = (event) => {
    setTrailerAxles(event.target.value);
  };

  const handleTrailerConfigurationChange = (event) => {
    setTrailerConfiguration(event.target.value);
  };

  const handleModelYearChange = (event) => {
    setModelYear(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(VIN);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const resetOtherFields = () => {
    setChasis("K");
    setTrailerType("H");
    setWorkOrder("");
    setTrailerLength("");
    setTrailerAxles("");
    setTrailerConfiguration("");
    setModelYear("S");
    setDigit9("");
    setDigitNineNumerator("");
    setProducts("");
    setWorkOrder("");
    setTrailerTypeSearch("");
  };

  const getTrailerByWorkOrderAndType = async (workOrder, trailerTypeSearch) => {
    const response = await fetch(
      `/api/planning/getTrailerByWorkOrderAndTrailerType?workOrder=${String(
        workOrder
      )}&trailerType=${String(trailerTypeSearch)}`,
      {
        method: "GET",
        headers: {
          "Contenr-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      handleActiveAlert(
        true,
        "error",
        "This Trailer does not exisit in the database"
      );
      return null;
    }

    const data = await response.json();
    console.log(data);

    return data;
  };

  const updateVin = async (trailer, vin) => {
    const updates = {
      vinNumber: vin,
      vinNumberDate: Date.now(),
    };

    const response = await fetch(`/api/planning/create-trailer`, {
      method: "PUT",
      body: JSON.stringify({ id: trailer._id, updates }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Success");
      setIsUpdatingVIN(true);
      try {
        const recentTrailersResponse = await fetch(
          "/api/planning/most-recent-trailers?limit=5"
        );
        if (!recentTrailersResponse.ok) {
          throw error;
        }
        const data = await recentTrailersResponse.json();
        console.log(data);
        setRecentTrailers(data);
        const lastDigits = data[0].vinNumber.slice(-3);
        console.log(lastDigits);
        resetOtherFields();
        setLastVINNumber(lastDigits);
        handleActiveAlert(
          true,
          "success",
          "Trailer Vin and Recent Trailers Updated Successfully"
        );
      } catch (error) {
        handleActiveAlert(true, "error", "Error Getting New Recent Trailers");
        console.error("Error fetching recent trailers:", error);
      } finally {
        setIsUpdatingVIN(false);
      }
    } else {
      handleActiveAlert(true, "error", "Error Updating Vin Number");
      console.error("Error updating trailer");
    }
  };

  const handleGetTrailerToUpdateClick = async () => {
    console.log("clicked");
    setGetOtherTrailerDataIsLoading(true);
    const fetchedTrailer = await getTrailerByWorkOrderAndType(
      workOrder,
      trailerTypeSearch
    );
    console.log(fetchedTrailer);
    setSearchedTrailer(fetchedTrailer);
    setGetOtherTrailerDataIsLoading(false);
  };

  const letterToNumber = (letter) => {
    switch (letter) {
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
      case "D":
        return 4;
      case "E":
        return 5;
      case "F":
        return 6;
      case "G":
        return 7;
      case "H":
        return 8;
      case "J":
        return 1;
      case "K":
        return 2;
      case "L":
        return 3;
      case "M":
        return 4;
      case "N":
        return 5;
      case "P":
        return 7;
      case "R":
        return 9;
      case "S":
        return 2;
      case "Q":
        return 8;
      case "T":
        return 3;
      case "U":
        return 4;
      case "V":
        return 5;
      case "W":
        return 6;
      case "X":
        return 7;
      case "Y":
        return 8;
      case "Z":
        return 9;
      default:
    }
  };

  React.useEffect(() => {
    setLastVINDigitsPlus1(+lastVINNumber + 1);

    setProducts(
      2 * 8 +
        1 * 7 +
        9 * 6 +
        letterToNumber(chasis) * 5 +
        letterToNumber(trailerType) * 4 +
        letterToNumber(trailerLength) * 3 +
        +trailerAxles * 2 +
        letterToNumber(trailerConfiguration) * 10 +
        letterToNumber(modelYear) * 9 +
        letterToNumber("S") * 8 +
        2 * 7 +
        0 * 6 +
        9 * 5 +
        Number(String(lastVINDigitsPlus1)[0]) * 4 +
        Number(String(lastVINDigitsPlus1)[1]) * 3 +
        Number(String(lastVINDigitsPlus1)[2]) * 2
    );

    let productsOver11 = products / 11;

    setDigitNineNumerator(products - 11 * Math.trunc(productsOver11));

    setVIN(
      "2A9" +
        chasis +
        trailerType +
        trailerLength +
        trailerAxles +
        trailerConfiguration +
        digit9 +
        modelYear +
        "S209" +
        String(lastVINDigitsPlus1)
    );

    setIsGenerated(false);

    if (!digitNineNumerator) {
      setDigit9("0");
      return;
    }

    if (+digitNineNumerator === 10) {
      setDigit9("X");
    } else setDigit9(String(digitNineNumerator));
  }, [
    chasis,
    trailerType,
    trailerLength,
    trailerAxles,
    trailerConfiguration,
    lastVINNumber,
    VIN,
    digit9,
    digitNineNumerator,
    products,
    lastVINDigitsPlus1,
    modelYear,
  ]);

  const fetchRecentTrailers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/planning/most-recent-trailers?limit=5"
      );
      const data = await response.json();
      console.log(data);
      setRecentTrailers(data);
      const lastDigits = data[0].vinNumber.slice(-3);
      console.log(lastDigits);
      setLastVINNumber(lastDigits);
    } catch (error) {
      console.error("Error fetching recent trailers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRecentTrailers();
  }, []);

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
            color: "var(--primary75)",
          }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          maxHeight: "100vh",
          width: "100%",
          display: "flex",
          bgcolor: "white",
          color: "black",
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
        <Box sx={{ pt: 2, width: "40%", ml: 8, pb: 1 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "2rem", minWidth: "14rem" }}>
              VIN Calculator
            </Typography>
            <Box sx={{ minWidth: "7rem", mt: 1 }}>
              <TextField
                id="outlined-basic"
                label="Last VIN 3 Digits"
                variant="outlined"
                type="number"
                value={lastVINNumber}
                onChange={handleLastVINNumberChange}
              />
            </Box>
          </Box>
          {/* Chasis */}
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="chasis-label">Chassis</InputLabel>
              <Select
                labelId="chasis-label"
                id="chasis"
                value={chasis}
                label="Chasis"
                onChange={handleChasisChange}
              >
                <MenuItem value={"C"}>Chassis</MenuItem>
                <MenuItem value={"K"}>Complete</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Trailer Type */}
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="trailer-type-label">Trailer Type</InputLabel>
              <Select
                labelId="trailer-type-label"
                id="trailer-type"
                value={trailerType}
                label="Trailer Type"
                onChange={handleTrailerTypeChange}
              >
                <MenuItem value={"D"}>Dump</MenuItem>
                <MenuItem value={"T"}>Tank</MenuItem>
                <MenuItem value={"F"}>Flat</MenuItem>
                <MenuItem value={"H"}>Hopper</MenuItem>
                <MenuItem value={"R"}>Refuse</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Trailer Length */}
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="trailer-length-label">Trailer Length</InputLabel>
              <Select
                labelId="trailer-length-label"
                id="trailer-length"
                value={trailerLength}
                label=" Trailer Length"
                onChange={handleTrailerLengthChange}
              >
                <MenuItem value={"P"}>Less or equal than 28 ft</MenuItem>
                <MenuItem value={"R"}>
                  More than 28 and less or equal than 40 ft
                </MenuItem>
                <MenuItem value={"S"}>
                  More than 40 and less or equal than 48 ft
                </MenuItem>
                <MenuItem value={"T"}>
                  More than 48 and less or equal than 53 ft
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Number of axles */}
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="number-axles-label">Number of axles</InputLabel>
              <Select
                labelId="number-axles-label"
                id="number-axles"
                value={trailerAxles}
                label="Number of axles"
                onChange={handleTrailerAxlesChange}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"6"}>6</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Configuration */}
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="configuration-label">Configuration</InputLabel>
              <Select
                labelId="configuration-label"
                id="configuration"
                value={trailerConfiguration}
                label="Configuration"
                onChange={handleTrailerConfigurationChange}
              >
                <MenuItem value={"S"}>Spif</MenuItem>
                <MenuItem value={"M"}>Michigan</MenuItem>
                <MenuItem value={"N"}>North American</MenuItem>
                <MenuItem value={"P"}>Michigan/Ontario</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Model Year */}
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="model-year-label">Model Year</InputLabel>
              <Select
                labelId="model-year-label"
                id="model-year"
                value={modelYear}
                label="Model Year"
                onChange={handleModelYearChange}
              >
                <MenuItem value={"R"}>2024</MenuItem>
                <MenuItem value={"S"}>2025</MenuItem>
                <MenuItem value={"T"}>2026</MenuItem>
                <MenuItem value={"V"}>2027</MenuItem>
                <MenuItem value={"W"}>2028</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Recent Trailers Section */}
          <Box
            sx={{
              pt: 2,
              mt: 4,
              pb: 1,
              width: "100%",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // mt: 4,
              bgcolor: "whitesmoke",
              // p: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Trailers
            </Typography>
            {recentTrailers.map((trailer) => (
              <Box
                key={trailer._id}
                sx={{
                  display: "flex",
                  flexDirection: "column", // Change flexDirection to column
                  alignItems: "flex-start", // Align items to the left
                  width: "80%",
                  mb: 2,
                  p: 2,
                  bgcolor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="body1">
                  Workorder: {trailer.workOrder}
                </Typography>
                <Typography variant="body1">
                  Trailer Type: {trailer.trailerType}
                </Typography>
                <Typography variant="body1">
                  Customer: {trailer.customer}
                </Typography>
                <Typography variant="body1">
                  Vin Creation Date:{" "}
                  {new Date(trailer.vinNumberDate).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Trailer Creation Date:{" "}
                  {new Date(trailer.dateCreated).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  VIN Number: {trailer.vinNumber}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: "35%",
            minWidth: "24rem",
            display: "flex",
            // justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            mt: 10,
            ml: 5,
          }}
        >
          {(!(VIN.length === 17 && digit9) || !isGenerated) && (
            <>
              {!(VIN.length === 17 && digit9) && (
                <Typography
                  sx={{ fontSize: "2.4rem", ml: 1, minWidth: "8rem", mt: 3 }}
                >
                  Select All Values
                </Typography>
              )}

              {!!(VIN.length === 17 && digit9) && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsGenerated(true);
                    setSearchedTrailer(null);
                  }}
                >
                  Generate Vin Number
                </Button>
              )}
            </>
          )}

          {!!(VIN.length === 17 && digit9) && isGenerated && (
            <>
              <Typography
                sx={{ fontSize: "1.6rem", ml: 1, minWidth: "8rem", mt: 3 }}
              >
                New VIN
              </Typography>

              <Typography sx={{ fontSize: "2rem", ml: 1, mt: 3 }}>
                {!!(VIN.length === 17 && digit9) ? VIN : ""}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.6rem",
                  ml: 1,
                  mt: 5,
                  minWidth: "8rem",
                  mt: 3,
                }}
              >
                Format to be copied:
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  ml: 1,
                  mt: 3,
                  fontFamily: "Arial",
                  fontWeight: "bold",
                }}
              >
                {!!(VIN.length === 17 && digit9) ? VIN : ""}
                <IconButton onClick={handleCopy} sx={{ ml: 1 }}>
                  <ContentCopyIcon />
                </IconButton>
              </Typography>

              <Typography
                sx={{
                  fontSize: "18px",
                  ml: 1,
                  mt: 3,
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                Find and Update the Vin Number
              </Typography>

              {/* Trailer Type */}
              <Box sx={{ maxWidth: "20rem", mt: 2, width: "100%" }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="trailer-type-label">Trailer Type</InputLabel>
                  <Select
                    labelId="trailer-type-label"
                    id="trailer-type"
                    value={trailerTypeSearch}
                    label="Trailer Type"
                    onChange={handleTrailerTypeSearchChange}
                  >
                    <MenuItem value={"Lead"}>Lead</MenuItem>
                    <MenuItem value={"Pup"}>Pup</MenuItem>
                    <MenuItem value={"Tri 61' 2 Hoppers"}>
                      Tri 61' 2 Hoppers
                    </MenuItem>
                    <MenuItem value={"Tri 61' 3 Hoppers"}>
                      Tri 61' 3 Hoppers
                    </MenuItem>
                    <MenuItem value={"Tri 72' 2 Hoppers"}>
                      Tri 72' 2 Hoppers
                    </MenuItem>
                    <MenuItem value={"Tandem"}>Tandem</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Work Order */}
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "20rem",
                  mt: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic1"
                  label="Work Order"
                  variant="outlined"
                  // type="number"
                  value={workOrder}
                  onChange={handleWorkOrder}
                />

                {/* {(workOrder && trailerTypeSearch) && (
              <IconButton 
                onClick={handleGetTrailerToUpdateClick}
              >
                <GetAppIcon sx={{ fontSize: 25 }} />
                {getOtherTrailerDataIsLoading && <CircularProgress size={34} />}
              </IconButton>
            )} */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  // bgcolor: "red",
                }}
              >
                <Button
                  variant="contained"
                  disabled={!(workOrder && trailerTypeSearch)}
                  sx={{
                    mt: 2,
                    // width: "100%"
                  }}
                  onClick={() => {
                    handleGetTrailerToUpdateClick();
                  }}
                >
                  Get Trailer to Update
                </Button>
                {getOtherTrailerDataIsLoading && (
                  <CircularProgress
                    size={34}
                    sx={{
                      ml: 2,
                    }}
                  />
                )}
              </Box>

              {searchedTrailer && (
                <>
                  <Box
                    key={searchedTrailer._id}
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Change flexDirection to column
                      alignItems: "flex-start", // Align items to the left
                      width: "80%",
                      mb: 2,
                      mt: 3,
                      p: 2,
                      bgcolor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Typography variant="body1">
                      Workorder: {searchedTrailer.workOrder}
                    </Typography>
                    <Typography variant="body1">
                      Trailer Type: {searchedTrailer.trailerType}
                    </Typography>
                    <Typography variant="body1">
                      Customer: {searchedTrailer.customer}
                    </Typography>
                    <Typography variant="body1">
                      Current Vin Creation Date:{" "}
                      {searchedTrailer?.vinNumberDate
                        ? new Date(
                            searchedTrailer?.vinNumberDate
                          )?.toLocaleString()
                        : "No Current Vin Date"}
                    </Typography>
                    <Typography variant="body1">
                      Trailer Creation Date:{" "}
                      {new Date(searchedTrailer.dateCreated).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Current VIN Number:{" "}
                      {searchedTrailer?.vinNumber || "No Current Vin Number"}
                    </Typography>

                    {(searchedTrailer?.vinNumberDate ||
                      searchedTrailer?.vinNumber) && (
                      <Typography
                        sx={{
                          fontSize: "13px",
                          ml: 1,
                          mt: 3,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                        }}
                      >
                        * Warning this trailer already has a VIN Number
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        updateVin(searchedTrailer, VIN);
                      }}
                    >
                      Update Vin In System
                    </Button>
                    {isUpdatingVIN && (
                      <CircularProgress
                        size={34}
                        sx={{
                          ml: 2,
                        }}
                      />
                    )}
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          VIN copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}
