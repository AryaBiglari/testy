import * as React from "react";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SelectDataRadioButtons(props) {
  // const max530 = useMediaQuery("(max-width:530px)");

  let dataType = props.value;
  // const totalProductionData = props.totalProductionData;

  // function toHoursAndMinutes(totalMinutes) {
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = Math.floor((totalMinutes / 60 - hours) * 60);

  //   return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
  // }

  // function padTo2Digits(num) {
  //   return num.toString().padStart(2, "0");
  // }

  // const writingTimeFormatted = toHoursAndMinutes(
  //   totalProductionData.totalTotal.totalTotalTime
  // );

  return (
    <Box
      sx={{
        height: "3.1rem",
        display: "flex",
        alignItems: "flex-start",
        mt: 3,
        width: "63%",
        // backgroundColor: "red",
        pl: props.isDrawerOpen ? "1.5rem" : "",
        "@media (max-width: 1215px)": {
          width: "100%",
          flexWrap: "nowrap",
        },
        "@media (max-width: 800px)": {
          pl: 0,
        },
        "@media (max-width: 360px)": {
          height: "5.2rem",
          mb: -0.5,
        },
      }}
    >
      <FormControl
        sx={{
          width: "100%",
          // backgroundColor: "green",
          "& .MuiFormControlLabel-root": {
            ml: 0,
            mr: 0,
          },
          "@media (max-width: 1215px)": {
            pl: 8,
            pr: 8,
            display: "flex",
            flexWrap: "nowrap",
          },
          "@media (max-width: 600px)": {
            pl: 1.5,
            pr: 1.5,
          },
        }}
      >
        <RadioGroup
          sx={{
            height: "3.1rem",
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            justifyContent: "space-evenly",
            "@media (max-width: 1215px)": {
              justifyContent: "space-between",
              flexWrap: "nowrap",
            },
          }}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="times"
          value={dataType}
          onChange={props.handleDataTypeChange}
        >
          <FormControlLabel
            value="times"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  padding: "0.5rem",
                  mr: 0.5,
                  backgroundColor:
                    dataType === "times" ? "var(--success5)" : "white",
                  height: "3.1rem",
                  width: "9.5rem",

                  border:
                    dataType === "times"
                      ? "2px solid var(--primary50)"
                      : "1px solid var(--secondary15)",
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "var(--success1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml: 0,
                    mt: 0.5,
                    width: "100%",
                  }}
                >
                  {/* <AccessTimeIcon
                    sx={{
                      fontSize: "1.2rem !important",
                    }}
                  /> */}
                  <Typography
                    sx={{
                      ml: 0,
                      "@media (max-width: 800px)": {
                        fontSize: "0.9rem",
                      },
                      "@media (max-width: 360px)": {
                        fontSize: "0.75rem",
                      },
                    }}
                    variant="chartDataTitle"
                  >
                    {`Production Times`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 0.8,
                    // backgroundColor: "red",
                    height: "3rem",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      ml: 0,
                      mt: -0.5,
                      fontSize: "1.8rem",
                    }}
                    variant="totalStatsNumber"
                  >
                    {/* {writingTimeFormatted} */}
                  </Typography>
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // backgroundColor: "red",
                    ml: 0,
                    mt: 0.7,
                    width: "100%",
                    "@media (max-width: 930px)": {
                      mt: 0.3,
                    },
                    "@media (max-width: 410px)": {
                      display: "none",
                    },
                  }}
                >
                  <TrendingUpIcon
                    sx={{
                      fontSize: "1.2rem !important",
                      backgroundColor: "var(--success25)",
                      borderRadius: "50%",
                      padding: 0.2,
                      color: "var(--success)",
                    }}
                  />
                  <Typography
                    sx={{
                      ml: 0.6,
                      fontSize: "0.7rem",
                    }}
                    variant="chartDataComparison"
                  >
                    +12.5%
                  </Typography>
                  <Typography
                    sx={{
                      ml: 0.7,
                      fontSize: "0.7rem",
                    }}
                    variant="chartDataComparisonGrey"
                  >
                    than last week
                  </Typography>
                </Box> */}
              </Box>
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "var(--secondary60)",
              },
            }}
          />
          <FormControlLabel
            value="costs"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  padding: "0.5rem",
                  mr: 0.5,

                  backgroundColor:
                    dataType === "costs" ? "var(--success5)" : "white",
                  height: "3.1rem",
                  width: "9.5rem",

                  border:
                    dataType === "costs"
                      ? "2px solid var(--primary50)"
                      : "1px solid var(--secondary15)",
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "var(--success1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml: 0,
                    mt: 0.5,
                    width: "100%",
                  }}
                >
                  {/* <AccessTimeIcon
                    sx={{
                      fontSize: "1.2rem !important",
                    }}
                  /> */}
                  <Typography
                    sx={{
                      ml: 0,
                    }}
                    variant="chartDataTitle"
                  >
                    {`Production Costs`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 0.8,
                    // backgroundColor: "red",
                    height: "3rem",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      ml: 0,
                      mt: -0.5,
                      fontSize: "1.8rem",
                    }}
                    variant="totalStatsNumber"
                  >
                    {/* {Math.floor(
                      Number(totalWritingData.totalTotal.totalTotalWords)
                    ).toLocaleString("en-US")} */}
                  </Typography>
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    ml: 0,
                    mt: 0.7,
                    width: "100%",
                    "@media (max-width: 930px)": {
                      mt: 0.3,
                    },
                    "@media (max-width: 410px)": {
                      display: "none",
                    },
                  }}
                >
                  <TrendingUpIcon
                    sx={{
                      fontSize: "1.2rem !important",
                      backgroundColor: "var(--success25)",
                      borderRadius: "50%",
                      padding: 0.2,
                      color: "var(--success)",
                    }}
                  />
                  <Typography
                    sx={{
                      ml: 0.6,
                      fontSize: "0.7rem",
                    }}
                    variant="chartDataComparison"
                  >
                    +12.5%
                  </Typography>
                  <Typography
                    sx={{
                      ml: 0.7,
                      fontSize: "0.7rem",
                    }}
                    variant="chartDataComparisonGrey"
                  >
                    than last week
                  </Typography>
                </Box> */}
              </Box>
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "var(--secondary60)",
              },
            }}
          />

          <FormControlLabel
            value="costs"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  padding: "0.5rem",

                  backgroundColor:
                    dataType === "costs" ? "var(--success5)" : "white",
                  height: "9.4rem",
                  width: "14rem",

                  border:
                    dataType === "costs"
                      ? "2px solid var(--primary50)"
                      : "1px solid var(--secondary15)",
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "var(--success1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml: 0,
                    mt: 0.5,
                    width: "100%",
                  }}
                >
                  {/* <AccessTimeIcon
                    sx={{
                      fontSize: "1.2rem !important",
                    }}
                  /> */}
                  <Typography
                    sx={{
                      ml: 0,
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--secondary50)",
                    }}
                  >
                    {`Production Costs`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: 0.8,
                    // backgroundColor: "red",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      ml: 0,
                      mt: -0.5,

                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "var(--primary)",
                    }}
                    // variant="totalStatsNumber"
                  >
                    ${props.averageManufacturingCostsPerTrailer}
                  </Typography>
                  <Typography
                    sx={{
                      ml: 2,
                      mt: -0.5,
                      mb: 4.5,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--secondary50)",
                    }}
                    // variant="totalStatsNumber"
                  >
                    average per trailer
                  </Typography>
                </Box>

                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    ml: 0,
                    mt: 0.7,
                    width: "100%",
                  }}
                >
                  <TrendingUpIcon
                    sx={{
                      fontSize: "1.2rem !important",
                      backgroundColor: "var(--success25)",
                      borderRadius: "50%",
                      padding: 0.2,
                      color: "var(--success)",
                    }}
                  />
                  <Typography
                    sx={{
                      ml: 0.6,
                      fontSize: "0.8rem",
                      // fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--success)",
                    }}
                    variant="chartDataComparison"
                  >
                    +12.5%
                  </Typography>
                  <Typography
                    sx={{
                      ml: 0.7,
                      // fontSize: "0.7rem",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--secondary50)",
                    }}
                    // variant="chartDataComparisonGrey"
                  >
                    than last week
                  </Typography>
                </Box> */}
              </Box>
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "var(--secondary60)",
              },
            }}
          />

          <FormControlLabel
            value="completed"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  padding: "0.5rem",

                  backgroundColor:
                    dataType === "completed" ? "var(--success5)" : "white",
                  height: "9.4rem",
                  width: "14rem",

                  border:
                    dataType === "completed"
                      ? "2px solid var(--primary50)"
                      : "1px solid var(--secondary15)",
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "var(--success1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ml: 0,
                    mt: 0.5,
                    width: "100%",
                  }}
                >
                  {/* <AccessTimeIcon
                    sx={{
                      fontSize: "1.2rem !important",
                    }}
                  /> */}
                  <Typography
                    sx={{
                      ml: 0,
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--secondary50)",
                    }}
                  >
                    {`Completed Trailers`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 0.8,
                    // backgroundColor: "red",
                    height: "3rem",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      ml: 0,
                      mt: -0.5,

                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "var(--primary)",
                    }}
                    // variant="totalStatsNumber"
                  >
                    {props.averageCompletedTrailersPerWeek}
                  </Typography>
                  <Typography
                    sx={{
                      ml: 2,
                      mt: -0.5,

                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--secondary50)",
                    }}
                    // variant="totalStatsNumber"
                  >
                    weekly average
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 0.8,
                    // backgroundColor: "red",
                    height: "3rem",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      ml: 0,
                      mt: -0.5,

                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "var(--primary)",
                    }}
                    // variant="totalStatsNumber"
                  >
                    {props.projectedCompletedTrailersPerYear}
                  </Typography>
                  <Typography
                    sx={{
                      ml: 2,
                      mt: -0.5,

                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--secondary50)",
                    }}
                    // variant="totalStatsNumber"
                  >
                    year projection
                  </Typography>
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    ml: 0,
                    mt: 0.7,
                    width: "100%",
                  }}
                >
                  <TrendingUpIcon
                    sx={{
                      fontSize: "1.2rem !important",
                      backgroundColor: "var(--success25)",
                      borderRadius: "50%",
                      padding: 0.2,
                      color: "var(--success)",
                    }}
                  />
                  <Typography
                    sx={{
                      ml: 0.6,
                      fontSize: "0.8rem",
                      // fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--success)",
                    }}
                    variant="chartDataComparison"
                  >
                    +12.5%
                  </Typography>
                  <Typography
                    sx={{
                      ml: 0.7,
                      // fontSize: "0.7rem",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--secondary50)",
                    }}
                    // variant="chartDataComparisonGrey"
                  >
                    than last week
                  </Typography>
                </Box> */}
              </Box>
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "var(--secondary60)",
              },
            }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
