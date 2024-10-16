import * as React from "react";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "var(--primary75)"
            : "var(--primary75)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "var(--primary75)",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function SelectToCompare(props) {
  let selectedBand = props.value;
  let showComparison = props.showComparison;

  let bandTextColor = !showComparison
    ? "var(--secondary25)"
    : "var(--secondary50)";
  let backGroundColorHover = !showComparison ? "white" : "var(--success15)";

  // const [disabled, setDisabled] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setDisabled(!event.target.checked);
  };

  return (
    <Box
      sx={{
        width: "100%",
        // backgroundColor: "red",
        height: "100%",

        // ml: "auto",
        // mr: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        mb: 0.8,
      }}
    >
      <FormControl
        sx={{
          "& .MuiFormGroup-root": {
            width: "100%",

            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{
            fontSize: 18,
            mt: 0,
            mb: 0,
            ml: -1,
            textAlign: "center",
            color: "var(--secondary75)",
            // mr: 2,
          }}
        >
          <CustomSwitch
            sx={{ transform: "scale(0.7)", mb: 0.2 }}
            checked={showComparison}
            onChange={props.onChange}
          />
          <Typography variant="formLabel" sx={{ color: bandTextColor }}>
            Compare with average students (coming soon)
          </Typography>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="band8"
          value={selectedBand}
          onChange={props.handleSelectedBandChange}
        >
          <FormControlLabel
            value={6}
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",
                  width: "3.9rem",

                  backgroundColor:
                    selectedBand === "6" ? "var(--success5)" : "white",

                  borderLeft: "var(--cardBorder)",
                  borderTop: "var(--cardBorder)",
                  borderBottom: "var(--cardBorder)",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: backGroundColorHover,
                  },
                }}
              >
                <Typography
                  sx={{
                    ml: 1,
                    color: bandTextColor,
                    minWidth: "2.6rem",
                  }}
                  variant="chartDataTitle"
                >
                  Band 6
                </Typography>
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
            }}
            disabled={!showComparison}
          />
          <FormControlLabel
            value={7}
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",

                  paddingLeft: "0px !important",

                  backgroundColor:
                    selectedBand === "7" ? "var(--success5)" : "white",
                  width: "3.9rem",
                  borderLeft: "var(--cardBorder)",
                  borderTop: "var(--cardBorder)",
                  borderBottom: "var(--cardBorder)",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: backGroundColorHover,
                  },
                }}
              >
                <Typography
                  sx={{
                    ml: 1,
                    color: bandTextColor,
                  }}
                  variant="chartDataTitle"
                >
                  Band 7
                </Typography>
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
            }}
            disabled={!showComparison}
          />
          <FormControlLabel
            value={8}
            control={<Radio sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",
                  backgroundColor:
                    selectedBand === "8" ? "var(--success5)" : "white",
                  paddingLeft: "0px !important",
                  // backgroundColor: daylyBackgroundColor,
                  width: "3.9rem",
                  borderLeft: "var(--cardBorder)",
                  borderTop: "var(--cardBorder)",
                  borderBottom: "var(--cardBorder)",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: backGroundColorHover,
                  },
                }}
              >
                <Typography
                  sx={{
                    ml: 1,
                    color: bandTextColor,
                  }}
                  variant="chartDataTitle"
                >
                  Band 8
                </Typography>
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
            }}
            disabled={!showComparison}
          />
          <FormControlLabel
            value={9}
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",
                  backgroundColor:
                    selectedBand === "9" ? "var(--success5)" : "white",
                  paddingLeft: "0px !important",
                  // backgroundColor: daylyBackgroundColor,
                  width: "3.9rem",

                  border: "var(--cardBorder)",

                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: backGroundColorHover,
                  },
                }}
              >
                <Typography
                  sx={{
                    ml: 1,
                    color: bandTextColor,
                    minWidth: "2.6rem",
                  }}
                  variant="chartDataTitle"
                >
                  Band 9
                </Typography>
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
            }}
            disabled={!showComparison}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
