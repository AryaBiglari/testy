import * as React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

export default function SelectProcessesCheckboxes(props) {
  const isBarsChartSelected = props.isBarsChartSelected;
  const showFrames = props.showFrames;
  const showWalls = props.showWalls;
  const showBoxes = props.showBoxes;
  const showCutBend = props.showCutBend;
  const showSmallParts = props.showSmallParts;
  const showFinishing = props.showFinishing;

  return (
    <Box
      sx={{
        width: "100%",
        // backgroundColor: "var(--success15)",
        ml: 12.5,
        "@media (max-width: 1215px)": {
          ml: 9,
        },
        "@media (max-width: 400px)": {
          ml: 4,
        },
        "@media (max-width: 360px)": {
          ml: 3,
        },
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <FormControl>
        <FormGroup>
          <Box
            sx={{
              width: "100%",
              // backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              // variant="chartDataTitle"
              sx={{
                mr: 2,
                "@media (max-width: 380px)": {
                  display: "none",
                },
              }}
            >
              Include
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="antoine"
                  color="primary"
                  onChange={props.onChangeFrames}
                  checked={showFrames}
                />
              }
              label={<Typography>Lead</Typography>}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1.25rem",
                  color: "var(--framesChart)",
                },

                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: "var(--secondary60)",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="gilad"
                  color="primary"
                  // defaultChecked
                  onChange={props.onChangeWalls}
                  checked={showWalls}
                />
              }
              label={<Typography>Pup</Typography>}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1.25rem",
                  color: "var(--success75)",
                },

                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: "var(--secondary60)",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="jason"
                  // defaultChecked
                  onChange={props.onChangeBoxes}
                  checked={showBoxes}
                />
              }
              label={<Typography>Tri 2 Hoppers</Typography>}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1.25rem",
                  color: "var(--primary75)",
                },

                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: "var(--secondary60)",
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="antoine"
                  color="primary"
                  onChange={props.onChangeCutBend}
                  checked={showCutBend}
                />
              }
              label={<Typography>Tri 3 Hoppers</Typography>}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1.25rem",
                  color: "var(--cutBendChart)",
                },

                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: "var(--secondary60)",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="antoine1"
                  color="primary"
                  onChange={props.onChangeSmallParts}
                  checked={showSmallParts}
                />
              }
              label={<Typography>Tandem</Typography>}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1.25rem",
                  color: "var(--smallPartsChart)",
                },

                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: "var(--secondary60)",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="antoine22"
                  color="primary"
                  onChange={props.onChangeFinishing}
                  checked={showFinishing}
                />
              }
              label={<Typography>Others</Typography>}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1.25rem",
                  color: "var(--finishingChart)",
                },

                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: "var(--secondary60)",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="antoine33"
                  color="primary"
                  onChange={props.onChangeTotal}
                  defaultChecked
                  disabled={isBarsChartSelected}
                />
              }
              label={<Typography>All</Typography>}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1.25rem",
                  color: isBarsChartSelected
                    ? "var(--secondary25)"
                    : "var(--totalChart)",
                },

                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: "var(--secondary60)",
                },
              }}
            />
          </Box>
        </FormGroup>
        {/* <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="writing time"
            control={<Radio color="primary75" />}
            label="Writing time"
            sx={{
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
            value="written words"
            control={<Radio color="primary75" />}
            label="Written words"
            sx={{
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
            value="completed tasks"
            control={<Radio color="primary75" />}
            label="Completed tasks"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 22,
              },

              "& .MuiFormControlLabel-label": {
                fontSize: 16,
                color: "var(--secondary60)",
              },
            }}
          />
        </RadioGroup> */}
      </FormControl>
    </Box>
  );
}
