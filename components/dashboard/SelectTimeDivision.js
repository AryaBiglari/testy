import * as React from "react";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

export default function SelectTimeDivision(props) {
  let timeDivision = props.value;

  return (
    <Box
      sx={{
        // backgroundColor: "blue",
        // width: "8rem",
        margin: 0.3,
        mt: 0.9,
        display: "flex",
        justifyContent: "center",
        padding: "0px !important",
        marginLeft: "0px !important",
      }}
    >
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="dayly"
          value={timeDivision}
          onChange={props.handleTimeDivisionChange}
          sx={{ marginLeft: "0px !important", marginRight: "0px !important" }}
        >
          <FormControlLabel
            value="dayly"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",
                  width: "4rem",
                  paddingLeft: "0px !important",
                  backgroundColor:
                    timeDivision === "dayly" ? "var(--success5)" : "white",
                  width: "3.5rem",
                  ml: 1.3,
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
                <Typography
                  sx={{
                    ml: 1,
                  }}
                  variant="chartDataTitle"
                >
                  Dayly
                </Typography>
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
            }}
          />
          <FormControlLabel
            value="weekly"
            control={<Radio color="primary" sx={{ display: "none" }} />}
            label={
              <Box
                sx={{
                  height: "2rem",
                  padding: "12px",
                  width: "4rem",
                  paddingLeft: "0px !important",
                  backgroundColor:
                    timeDivision === "weekly" ? "var(--success5)" : "white",
                  width: "3.5rem",
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
                <Typography
                  sx={{
                    ml: 1,
                  }}
                  variant="chartDataTitle"
                >
                  Weekly
                </Typography>
              </Box>
            }
            sx={{
              marginLeft: "0px !important",
              marginRight: "0px !important",
            }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
