import * as React from "react";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import ChartAreaIcon from "../../public/ChartAreaIcon.svg";

export default function SelectChartType(props) {
  let chartType = props.value;

  return (
    <Box
      sx={{
        // backgroundColor: "black",
        width: "8rem",
        margin: 0.3,
        mt: 0.9,
      }}
    >
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="areas"
          value={chartType}
          onChange={props.handleChartTypeChange}
        >
          <FormControlLabel
            value="areas"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  padding: "12px",
                  height: "2rem",
                  maxHeight: "2rem",
                  paddingLeft: "12px !important",
                  backgroundColor:
                    chartType === "areas" ? "var(--success5)" : "white",
                  width: "2.7rem",
                  maxWidth: "2.7rem",
                  border: "var(--cardBorder)",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "var(--success15)",
                  },
                }}
              >
                <Box
                  sx={{
                    mt: 1,
                    "@media (max-width: 950px)": {
                      transform: "scale(0.95)",
                    },
                    "@media (max-width: 900px)": {
                      transform: "scale(0.92)",
                      ml: 0.4,
                      mt: 0.7,
                    },
                    "@media (max-width: 460px)": {
                      transform: "scale(0.75)",
                      ml: 0.4,
                      mt: 0.7,
                    },
                  }}
                >
                  <ChartAreaIcon
                    viewBox="0 0 512 512"
                    width="20"
                    height="20"
                    fill="var(--secondary60)"
                    sx={{
                      marginLeft: "0.75rem !important",
                    }}
                  />
                </Box>
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
              "& .MuiSvgIcon-root": {
                fontSize: 22,
              },

              "& .MuiFormControlLabel-label": {
                fontSize: 16,
                color: "var(--secondary60)",
              },
            }}
          />
          <FormControlLabel
            value="bars"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",
                  paddingLeft: "0px !important",
                  backgroundColor:
                    chartType === "bars" ? "var(--success5)" : "white",
                  width: "2.6rem",
                  borderTop: "var(--cardBorder)",
                  borderBottom: "var(--cardBorder)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "var(--success15)",
                  },
                }}
              >
                <StackedBarChartIcon
                  sx={{
                    marginLeft: "0.75rem !important",
                  }}
                />
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
              "& .MuiSvgIcon-root": {
                fontSize: "1.375rem",
                color: "var(--secondary50)",
              },
            }}
          />
          <FormControlLabel
            value="lines"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",
                  width: "2.7rem",
                  paddingLeft: "0px !important",
                  backgroundColor:
                    chartType === "lines" ? "var(--success5)" : "white",
                  border: "var(--cardBorder)",
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "var(--success15)",
                  },
                }}
              >
                <StackedLineChartIcon
                  sx={{
                    marginLeft: "0.75rem !important",
                  }}
                />
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
              "& .MuiSvgIcon-root": {
                fontSize: "1.375rem",
              },

              "& .MuiFormControlLabel-label": {
                fontSize: 16,
                color: "var(--secondary60)",
              },
            }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
