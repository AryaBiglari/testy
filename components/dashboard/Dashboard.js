import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import SelectDataRadioButtons from "./SelectDataRadioButtons";
import SelectTimeDivision from "./SelectTimeDivision";
import SelectProcessesCheckboxes from "./SelectProcessesCheckboxes";
import SelectTrailerCheckboxes from "./SelectTrailerCheckboxes";
import SelectToCompare from "./SelectToCompare";
import SelectChartType from "./SelectChartType";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import {
  differenceInCalendarDays,
  isThisWeek,
  getISOWeek,
  isThisMonth,
  startOfWeek,
  isSameDay,
  getMonth,
  subDays,
  getWeek,
  format,
  startOfISOWeek,
} from "date-fns";

import {
  PieChart,
  Pie,
  Cell,
  Area,
  Bar,
  ComposedChart,
  Line,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

function CustomTooltip({
  active,
  payload,
  label,
  timeDivision,
  selectedBand,
  showComparison,
}) {
  // console.log(label, payload);
  if (active) {
    return (
      <Paper
        sx={{
          padding: "0.5rem",
          borderRadius: "0.75rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--success1)",
          opacity: 0.85,
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="chartTooltip">
            {timeDivision === "dayly" ? "Day:" : "Week starting on"}{" "}
            <Typography variant="chartTooltipBold">
              {timeDivision === "dayly" ? label : label.substr(3, 10)}
            </Typography>
          </Typography>

          {payload?.length > 0 && payload[0]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[0]?.stroke }}
            >
              {payload[0]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[0]?.stroke }}
              >
                {payload[0]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[0].name.length > 10 ? `for a Band ${selectedBand}` : ""} */}
            </Typography>
          )}

          {payload?.length > 0 && payload[1]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[1]?.stroke }}
            >
              {payload[1]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[1]?.stroke }}
              >
                {payload[1]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[1].name.length > 10 ? `for a Band ${selectedBand}` : ""} */}
            </Typography>
          )}

          {payload?.length > 0 && payload[2]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[2]?.stroke }}
            >
              {payload[2]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[2]?.stroke }}
              >
                {payload[2]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[2].name.length > 10
                ? `for a Band ${selectedBand} student`
                : ""} */}
            </Typography>
          )}
          {payload?.length > 0 && payload[3]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[3]?.stroke }}
            >
              {" "}
              {payload[3]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[3]?.stroke }}
              >
                {payload[3]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[3].name.length > 10
                ? `for a Band ${selectedBand} student`
                : ""} */}
            </Typography>
          )}
          {payload?.length > 0 && payload[4]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[4]?.stroke }}
            >
              {payload[4]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[4]?.stroke }}
              >
                {payload[4]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[4].name.length > 10
                ? `for a Band ${selectedBand} student`
                : ""} */}
            </Typography>
          )}
          {payload?.length > 0 && payload[5]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[5]?.stroke }}
            >
              {payload[5]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[5]?.stroke }}
              >
                {payload[5]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[5].name.length > 10
                ? `for a Band ${selectedBand} student`
                : ""} */}
            </Typography>
          )}
          {payload?.length > 0 && payload[6]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[6]?.stroke }}
            >
              {payload[6]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[6]?.stroke }}
              >
                {payload[6]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[6].name.length > 10
                ? `for a Band ${selectedBand} student`
                : ""} */}
            </Typography>
          )}
          {payload?.length > 0 && payload[7]?.name && (
            <Typography
              variant="chartTooltip"
              sx={{ color: payload[7]?.stroke }}
            >
              {payload[7]?.name}:{" "}
              <Typography
                variant="chartTooltipBold"
                sx={{ color: payload[7]?.stroke }}
              >
                {payload[7]?.value.toFixed(0)}
              </Typography>{" "}
              {payload[0].unit}{" "}
              {/* {payload[7].name.length > 10
                ? `for a Band ${selectedBand} student`
                : ""} */}
            </Typography>
          )}
        </Stack>
      </Paper>
    );
  } else {
    return null;
  }
}

// export default function Dashboard(props) {
//   const [dataType, setDataType] = React.useState("times");
//   const [timeDivision, setTimeDivision] = React.useState("dayly");
//   //   console.log(timeDivision);

//   const [chartType, setChartType] = React.useState("areas");

//   const handleDataTypeChange = (event) => {
//     setDataType(event.target.value);
//   };
//   const handleTimeDivisionChange = (event) => {
//     setTimeDivision(event.target.value);
//   };
//   const [isBarsChartSelected, setIsBarsChartSelected] = React.useState(false);
//   const handleChartTypeChange = (event) => {
//     setChartType(event.target.value);
//     if (event.target.value === "bars") {
//       setIsBarsChartSelected(true);
//       setShowFrames(true);
//       setShowWalls(true);
//       setShowBoxes(true);
//       setShowCutBend(true);
//       setShowSmallParts(true);
//       setShowFinishing(true);
//     } else setIsBarsChartSelected(false);
//   };

//   const [showComparison, setShowComparison] = React.useState(false);

//   const handleShowComparisonChange = (event) => {
//     // setShowComparison(event.target.checked);
//     setShowComparison(false);
//     setSelectedBand(!event.target.checked);
//   };

//   const [selectedBand, setSelectedBand] = React.useState(null);

//   const handleSelectedBandChange = (event) => {
//     setSelectedBand(event.target.value);
//   };

//   const [showBoxes, setShowBoxes] = React.useState(true);
//   const [showWalls, setShowWalls] = React.useState(true);
//   const [showFrames, setShowFrames] = React.useState(false);
//   const [showCutBend, setShowCutBend] = React.useState(false);
//   const [showSmallParts, setShowSmallParts] = React.useState(false);
//   const [showFinishing, setShowFinishing] = React.useState(false);
//   const [showTotal, setShowTotal] = React.useState(true);

//   const handleShowBoxes = (event) => {
//     setShowBoxes(event.target.checked);
//   };
//   const handleShowWalls = (event) => {
//     setShowWalls(event.target.checked);
//   };
//   const handleShowFrames = (event) => {
//     setShowFrames(event.target.checked);
//   };
//   const handleShowCutBend = (event) => {
//     setShowCutBend(event.target.checked);
//   };
//   const handleShowSmallParts = (event) => {
//     setShowSmallParts(event.target.checked);
//   };
//   const handleShowFinishing = (event) => {
//     setShowFinishing(event.target.checked);
//   };
//   const handleShowTotal = (event) => {
//     setShowTotal(event.target.checked);
//   };

//   const [showWritingTime, setShowWritingTime] = React.useState(true);

//   const writingData = [];
//   const productionData = [];

//   for (
//     let num = differenceInCalendarDays(
//       new Date(),
//       "Feb 1 2024 11:36:23 GMT-0400 (Eastern Daylight Time)"
//     );
//     num >= 0;
//     num--
//   ) {
//     productionData.push({
//       date: subDays(new Date(), num),
//       formattedDate: format(subDays(new Date(), num), "MMM dd"),
//       week: null,
//       startOfWeek: null,
//       WONumber: Math.trunc(100000 * Math.random()),
//       trailerType: null,
//       times: {
//         walls: 70 * Math.random(),
//         boxes: 100 * Math.random(),
//         frames: 30 * Math.random(),
//         cutbend: 25 * Math.random(),
//         smallparts: 20 * Math.random(),
//         finishing: 30 * Math.random(),
//         total: null,
//       },
//       costs: {
//         walls: 10000 * Math.random(),
//         boxes: 7000 * Math.random(),
//         frames: 100 * Math.random(),
//         cutbend: 3500 * Math.random(),
//         smallparts: 2000 * Math.random(),
//         finishing: 3000 * Math.random(),
//         total: null,
//       },
//       completed: {
//         lead: Math.trunc(1.3 * Math.random()),
//         pup: Math.trunc(1.3 * Math.random()),
//         tri2h: Math.trunc(1.12 * Math.random()),
//         tri3h: Math.trunc(1.12 * Math.random()),
//         tandem: Math.trunc(1.1 * Math.random()),
//         others: Math.trunc(1.08 * Math.random()),
//         total: null,
//       },
//     });
//   }

//   console.log(productionData);

//   //production data weekly - starts

//   //production data weekly - ends

//   // totals + weekData for Production - starts
//   for (
//     let num = differenceInCalendarDays(
//       new Date(),
//       new Date("Feb 1 2024 11:36:23 GMT-0400 (Eastern Daylight Time)")
//     );
//     num >= 0;
//     num--
//   ) {
//     productionData[num].week = getWeek(productionData[num].date, {
//       weekStartsOn: 1,
//     });
//     productionData[num].startOfWeek = startOfISOWeek(productionData[num].date, {
//       weekStartsOn: 1,
//     });

//     productionData[num].times.total =
//       productionData[num].times.walls +
//       productionData[num].times.boxes +
//       productionData[num].times.frames +
//       productionData[num].times.cutbend +
//       productionData[num].times.smallparts +
//       productionData[num].times.finishing;
//     productionData[num].costs.total =
//       productionData[num].costs.walls +
//       productionData[num].costs.boxes +
//       productionData[num].costs.frames +
//       productionData[num].costs.cutbend +
//       productionData[num].costs.smallparts +
//       productionData[num].costs.finishing;

//     productionData[num].completed.total =
//       productionData[num].completed.lead +
//       productionData[num].completed.pup +
//       productionData[num].completed.tri2h +
//       productionData[num].completed.tri3h +
//       productionData[num].completed.tandem +
//       productionData[num].completed.others;
//   }

//   // for (
//   //   let num = differenceInCalendarDays(
//   //     new Date(),
//   //     new Date("Feb 1 2024 11:36:23 GMT-0400 (Eastern Daylight Time)")
//   //   );
//   //   num >= 0;
//   //   num--
//   // ) {
//   //   productionData[num].times.total =
//   //     productionData[num].times.walls +
//   //     productionData[num].times.boxes +
//   //     productionData[num].times.frames +
//   //     productionData[num].times.cutbend +
//   //     productionData[num].times.smallparts +
//   //     productionData[num].times.finishing;
//   //   productionData[num].costs.total =
//   //     productionData[num].costs.walls +
//   //     productionData[num].costs.boxes +
//   //     productionData[num].costs.frames +
//   //     productionData[num].costs.cutbend +
//   //     productionData[num].costs.smallparts +
//   //     productionData[num].costs.finishing;

//   //   productionData[num].completed.total =
//   //     productionData[num].completed.lead +
//   //     productionData[num].completed.pup +
//   //     productionData[num].completed.tri2h +
//   //     productionData[num].completed.tri3h +
//   //     productionData[num].completed.tandem +
//   //     productionData[num].completed.others;
//   // }
//   // totals + weekData for Production - ends

//   console.log(productionData);

//   // const arr = productionData.find((date) => date.week === 7);

//   // console.log(arr.startOfWeek);

//   const productionDataWeekly = [];
//   const productionStartWeek = productionData[0]?.week;
//   const productionEndWeek = productionData[productionData.length - 1]?.week;

//   for (let num = productionStartWeek; num <= productionEndWeek; num++) {
//     const weekData = {
//       week: num,
//       startOfWeek: String(
//         new Date(productionData.find((date) => date.week === num).startOfWeek)
//       ).substring(0, 10),
//       // startOfWeek: productionData.reduce((acc, dayData) => {
//       //   return dayData.week === num ? acc + dayData.startOfWeek : acc;
//       // }, 0),
//       times: {
//         walls: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.times.walls : acc;
//         }, 0),
//         boxes: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.times.boxes : acc;
//         }, 0),
//         frames: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.times.frames : acc;
//         }, 0),
//         cutbend: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.times.cutbend : acc;
//         }, 0),
//         smallparts: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.times.smallparts : acc;
//         }, 0),
//         finishing: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.times.finishing : acc;
//         }, 0),
//         total: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.times.total : acc;
//         }, 0),
//       },
//       costs: {
//         walls: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.costs.walls : acc;
//         }, 0),
//         boxes: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.costs.boxes : acc;
//         }, 0),
//         frames: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.costs.frames : acc;
//         }, 0),
//         cutbend: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.costs.cutbend : acc;
//         }, 0),
//         smallparts: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.costs.smallparts : acc;
//         }, 0),
//         finishing: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.costs.finishing : acc;
//         }, 0),
//         total: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.costs.total : acc;
//         }, 0),
//       },

//       completed: {
//         lead: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.completed.lead : acc;
//         }, 0),
//         pup: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.completed.pup : acc;
//         }, 0),
//         tri2h: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.completed.tri2h : acc;
//         }, 0),
//         tri3h: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.completed.tri3h : acc;
//         }, 0),
//         tandem: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.completed.tandem : acc;
//         }, 0),
//         others: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.completed.others : acc;
//         }, 0),
//         total: productionData.reduce((acc, dayData) => {
//           return dayData.week === num ? acc + dayData.completed.total : acc;
//         }, 0),
//       },
//     };
//     productionDataWeekly.push(weekData);
//   }

//   console.log(productionDataWeekly);
//   //writings arrays original logic ends
//   let totalCompletedTrailers = 0;
//   let totalManufacturingTimes = 0;
//   let totalManufacturingCosts = 0;

//   productionDataWeekly.forEach((week) => {
//     if (getISOWeek(new Date()) !== week.week) {
//       totalCompletedTrailers = totalCompletedTrailers + week.completed.total;
//       totalManufacturingTimes = totalManufacturingTimes + week.times.total;
//       totalManufacturingCosts = totalManufacturingCosts + week.costs.total;
//     }
//   });

//   let averageCompletedTrailersPerWeek = (
//     totalCompletedTrailers / productionDataWeekly.length -
//     1
//   ).toFixed(1);

//   let averageManufacturingTimesPerTrailer = (
//     totalManufacturingTimes / totalCompletedTrailers
//   ).toFixed(1);
//   let averageManufacturingCostsPerTrailer = (
//     totalManufacturingCosts / totalCompletedTrailers
//   ).toFixed(1);

//   let projectedCompletedTrailersPerYear = (
//     averageCompletedTrailersPerWeek * 52
//   ).toFixed();

//   console.log(
//     averageCompletedTrailersPerWeek,
//     averageManufacturingTimesPerTrailer,
//     averageManufacturingCostsPerTrailer,
//     projectedCompletedTrailersPerYear
//   );

//   return (
//     <Box
//       sx={{
//         marginTop: "22px",
//         maxWidth: "70rem",
//         // marginTop: "3.875rem",
//         // pl: "24px",
//         // pr: "24px",
//         // backgrounColor: "blue",
//         height: "100%",
//         overflowY: "hidden",
//         width: "100%",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           mt: "4px",
//           // pl: "24px",
//           height: "100%",
//           minHeight: "2.4rem",
//           display: "flex",
//           // flexDirection: "column",
//           justifyContent: "flex-start",
//           alignItems: "center",
//         }}
//       >
//         <Typography
//           sx={{
//             ml: 2,
//             pl: "1.5rem",
//             width: "60%",
//             fontSize: "1.1rem",
//             fontWeight: 600,
//             color: "var(--secondary75)",
//           }}
//         >
//           Manufacturing Statistics
//         </Typography>
//       </Box>
//       <Paper
//         sx={{
//           // borderRadius: "10px",
//           mt: 0,
//           pl: 0,
//           pt: 0,
//           // height: "100%",
//           width: "100%",
//           // border: "2px solid var(--secondary15)",
//           //   border: "var(--mainBorder)",
//           //   border: "none",
//           boxShadow: "none",
//           outline: "none",
//           position: "relative",
//           display: "flex",
//           justifyContent: "flex-start",
//           alignItems: "center",
//           flexDirection: "column",
//           //   backgrounColor: "red",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             // backgroundColor: "red",
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "flex-start",

//             "@media (max-width: 1215px)": {
//               flexDirection: "column",
//             },
//           }}
//         >
//           <SelectDataRadioButtons
//             // totalProductionData={totalProductionData}
//             handleDataTypeChange={handleDataTypeChange}
//             value={dataType}
//             averageCompletedTrailersPerWeek={averageCompletedTrailersPerWeek}
//             averageManufacturingTimesPerTrailer={
//               averageManufacturingTimesPerTrailer
//             }
//             averageManufacturingCostsPerTrailer={
//               averageManufacturingCostsPerTrailer
//             }
//             projectedCompletedTrailersPerYear={
//               projectedCompletedTrailersPerYear
//             }
//             // isDrawerOpen={props.isDrawerOpen}
//           />
//           <Box
//             sx={{
//               width: "37%",
//               // minWidth: "12rem",
//               // backgroundColor: "green",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               pr: 2.5,
//               height: "5.6rem",
//             }}
//           >
//             <Box
//               sx={{
//                 // backgroundColor: "red",
//                 display: "flex",

//                 justifyContent: "center",
//                 alignItems: "flex-start",
//               }}
//             >
//               <SelectChartType
//                 handleChartTypeChange={handleChartTypeChange}
//                 value={chartType}
//               />
//               <SelectTimeDivision
//                 handleTimeDivisionChange={handleTimeDivisionChange}
//                 value={timeDivision}
//               />
//             </Box>
//             {/* {!max1215 && (
//               <SelectToCompare
//                 handleSelectedBandChange={handleSelectedBandChange}
//                 value={selectedBand}
//                 onChange={handleShowComparisonChange}
//                 showComparison={showComparison}
//               />
//             )} */}
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             width: "100%",
//             mt: 1,

//             // backgroundColor: "red",
//             position: "relative",
//             display: "flex",
//             justifyContent: "flex-start",
//           }}
//         >
//           {dataType !== "completed" && (
//             <SelectProcessesCheckboxes
//               onChangeBoxes={handleShowBoxes}
//               onChangeWalls={handleShowWalls}
//               onChangeFrames={handleShowFrames}
//               onChangeCutBend={handleShowCutBend}
//               onChangeSmallParts={handleShowSmallParts}
//               onChangeFinishing={handleShowFinishing}
//               onChangeTotal={handleShowTotal}
//               isBarsChartSelected={isBarsChartSelected}
//               showFrames={showFrames}
//               showWalls={showWalls}
//               showBoxes={showBoxes}
//               showCutBend={showCutBend}
//               showSmallParts={showSmallParts}
//               showFinishing={showFinishing}
//             />
//           )}
//           {dataType === "completed" && (
//             <SelectTrailerCheckboxes
//               onChangeBoxes={handleShowBoxes}
//               onChangeWalls={handleShowWalls}
//               onChangeFrames={handleShowFrames}
//               onChangeCutBend={handleShowCutBend}
//               onChangeSmallParts={handleShowSmallParts}
//               onChangeFinishing={handleShowFinishing}
//               onChangeTotal={handleShowTotal}
//               isBarsChartSelected={isBarsChartSelected}
//               showFrames={showFrames}
//               showWalls={showWalls}
//               showBoxes={showBoxes}
//               showCutBend={showCutBend}
//               showSmallParts={showSmallParts}
//               showFinishing={showFinishing}
//             />
//           )}
//         </Box>
//         <Box
//           sx={{
//             width: "100%",
//             // height: "30rem",
//             // bgcolor: "red",
//             display: "flex",
//             justifyContent: "flex-start",
//           }}
//         >
//           <Box
//             sx={{
//               width: "100%",
//               height: "26rem",
//               ml: 1,
//               display: "flex",
//               justifyContent: "center",
//               //   bgcolor: "blue",
//             }}
//           >
//             <ResponsiveContainer width="96%" height="100%">
//               <ComposedChart
//                 width={400}
//                 height={250}
//                 // data={writingData}
//                 // data={writingDataWeekly}
//                 // data={timeDivision === "dayly" ? writingData : writingDataWeekly}
//                 data={
//                   timeDivision === "dayly"
//                     ? productionData
//                     : productionDataWeekly
//                 }
//                 margin={{ top: 10, right: 26, left: -6, bottom: 30 }}
//               >
//                 <defs>
//                   <linearGradient id="colorWalls" x1="0" y1="0" x2="0" y2="1">
//                     <stop
//                       offset="5%"
//                       stopColor="var(--success50)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="var(--success50)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                   <linearGradient id="colorBoxes" x1="0" y1="0" x2="0" y2="1">
//                     <stop
//                       offset="5%"
//                       stopColor="var(--primary50)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="var(--primary50)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                   <linearGradient id="colorFrames" x1="0" y1="0" x2="0" y2="1">
//                     <stop
//                       offset="5%"
//                       stopColor="var(--framesChart)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="var(--framesChart)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                   <linearGradient id="colorCutBend" x1="0" y1="0" x2="0" y2="1">
//                     <stop
//                       offset="5%"
//                       stopColor="var(--cutBendChart)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="var(--cutBendChart)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                   <linearGradient
//                     id="colorSmallParts"
//                     x1="0"
//                     y1="0"
//                     x2="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="5%"
//                       stopColor="var(--smallPartsChart)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="var(--smallPartsChart)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                   <linearGradient
//                     id="colorFinishing"
//                     x1="0"
//                     y1="0"
//                     x2="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="5%"
//                       stopColor="var(--finishingChart)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="var(--finishingChart)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                   <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
//                     <stop
//                       offset="5%"
//                       stopColor="var(--totalChart)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="var(--totalChart)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                 </defs>
//                 <XAxis
//                   tickMargin={10}
//                   tick={{ fontSize: 15 }}
//                   // interval={20}
//                   // dataKey="formattedDate"
//                   dataKey={
//                     timeDivision === "dayly" ? "formattedDate" : "startOfWeek"
//                   }
//                   stroke="var(--secondary35)"
//                 />

//                 {/* {chartType === "areas" && dataType === "completed" && (
//                   <Area
//                     name="Completed"
//                     stackId="1"
//                     type="monotone"
//                     unit={" completed"}
//                     dataKey={"completed"}
//                     stroke="var(--primary)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorCompleted)"
//                   />
//                 )} */}

//                 {chartType === "areas" && showFrames && (
//                   <Area
//                     name={dataType === "completed" ? "Lead" : "Frames"}
//                     type="monotone"
//                     stackId="1"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.frames"
//                         : dataType === "costs"
//                         ? "costs.frames"
//                         : "completed.lead"
//                     }
//                     stroke="var(--framesChart)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorFrames)"
//                   />
//                 )}
//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "areas" &&
//                   showMockTest && (
//                     <Area
//                       name="Mock Tests Comparison"
//                       stackId="2"
//                       type="monotone"
//                       unit={
//                         dataType === "writingTime"
//                           ? " minutes"
//                           : dataType === "writtenWords"
//                           ? " words"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonMockTest.mockTestTime"
//                           : dataType === "writtenWords"
//                           ? "comparisonMockTest.mockTestWords"
//                           : "comparisonMockTest.mockTestCompleted"
//                       }
//                       stroke="var(--mockTestChart)"
//                       strokeWidth={1.5}
//                       fillOpacity={0.2}
//                       fill="url(#colorMockTest)"
//                       strokeDasharray="5 5"
//                     />
//                   )} */}

//                 {chartType === "areas" && showWalls && (
//                   <Area
//                     name={dataType === "completed" ? "Pup" : "Walls"}
//                     stackId="1"
//                     type="monotone"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.walls"
//                         : dataType === "costs"
//                         ? "costs.walls"
//                         : "completed.pup"
//                     }
//                     stroke="var(--success)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorWalls)"
//                   />
//                 )}
//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "areas" &&
//                   showTask1 && (
//                     <Area
//                       name="Tasks 1 Comparison"
//                       stackId="2"
//                       type="monotone"
//                       unit={
//                         dataType === "writingTime"
//                           ? " minutes"
//                           : dataType === "writtenWords"
//                           ? " words"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonTask1.task1Time"
//                           : dataType === "writtenWords"
//                           ? "comparisonTask1.task1Words"
//                           : "comparisonTask1.task1Completed"
//                       }
//                       stroke="var(--success)"
//                       strokeWidth={1.5}
//                       fillOpacity={0.2}
//                       fill="url(#colorTask1)"
//                       strokeDasharray="5 5"
//                     />
//                   )} */}
//                 {chartType === "areas" && showBoxes && (
//                   <Area
//                     name={dataType === "completed" ? "Tri 2 Hoppers" : "Boxes"}
//                     stackId="1"
//                     type="monotone"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.boxes"
//                         : dataType === "costs"
//                         ? "costs.boxes"
//                         : "completed.tri2h"
//                     }
//                     stroke="var(--primary)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorBoxes)"
//                   />
//                 )}

//                 {chartType === "areas" && showCutBend && (
//                   <Area
//                     name={
//                       dataType === "completed"
//                         ? "Tri 3 Hoppers"
//                         : "Cutting + Bending"
//                     }
//                     type="monotone"
//                     stackId="1"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.cutbend"
//                         : dataType === "costs"
//                         ? "costs.cutbend"
//                         : "completed.tri3h"
//                     }
//                     stroke="var(--cutBendChart)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorCutBend)"
//                   />
//                 )}
//                 {chartType === "areas" && showSmallParts && (
//                   <Area
//                     name={dataType === "completed" ? "Tandem" : "Small Parts"}
//                     type="monotone"
//                     stackId="1"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.smallparts"
//                         : dataType === "costs"
//                         ? "costs.smallparts"
//                         : "completed.tandem"
//                     }
//                     stroke="var(--smallPartsChart)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorSmallParts)"
//                   />
//                 )}
//                 {chartType === "areas" && showFinishing && (
//                   <Area
//                     name={dataType === "completed" ? "Others" : "Finishing"}
//                     type="monotone"
//                     stackId="1"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.finishing"
//                         : dataType === "costs"
//                         ? "costs.finishing"
//                         : "completed.others"
//                     }
//                     stroke="var(--finishingChart)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorFinishing)"
//                   />
//                 )}
//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "areas" &&
//                   showTask2 && (
//                     <Area
//                       name="Tasks 2 Comparison"
//                       stackId="2"
//                       type="monotone"
//                       unit={
//                         dataType === "writingTime"
//                           ? " minutes"
//                           : dataType === "writtenWords"
//                           ? " words"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonTask2.task2Time"
//                           : dataType === "writtenWords"
//                           ? "comparisonTask2.task2Words"
//                           : "comparisonTask2.task2Completed"
//                       }
//                       stroke="var(--primary)"
//                       strokeWidth={1.5}
//                       fillOpacity={0.2}
//                       fill="url(#colorTask2)"
//                       strokeDasharray="5 5"
//                     />
//                   )} */}
//                 {chartType === "areas" && showTotal && (
//                   <Area
//                     name="Total"
//                     stackId="3"
//                     type="monotone"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.total"
//                         : dataType === "costs"
//                         ? "costs.total"
//                         : "completed.total"
//                     }
//                     stroke="var(--totalChart)"
//                     strokeWidth={1.5}
//                     fillOpacity={0.5}
//                     fill="url(#colorTotal)"
//                   />
//                 )}
//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "areas" &&
//                   showTotal && (
//                     <Area
//                       name="Total Comparison"
//                       type="monotone"
//                       unit={
//                         dataType === "writingTime"
//                           ? " minutes"
//                           : dataType === "writtenWords"
//                           ? " words"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonTotal.totalTime"
//                           : dataType === "writtenWords"
//                           ? "comparisonTotal.totalWords"
//                           : "comparisonTotal.totalCompleted"
//                       }
//                       stroke="var(--totalChart)"
//                       strokeWidth={1.5}
//                       fillOpacity={0.2}
//                       fill="url(#colorTotal)"
//                       strokeDasharray="5 5"
//                     />
//                   )} */}

//                 {/* only barchart */}

//                 {/* {chartType === "bars" && dataType === "completed" && (
//                   <Bar
//                     stackId="a"
//                     type="monotone"
//                     name="Frames"
//                     unit={" completed"}
//                     dataKey={"completed"}
//                     stroke="var(--totalChart)"
//                     fillOpacity={1}
//                     fill="var(--totalChart)"
//                   />
//                 )} */}
//                 {chartType === "bars" && showFrames && (
//                   <Bar
//                     stackId="a"
//                     type="monotone"
//                     name={dataType === "completed" ? "Lead" : "Frames"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.frames"
//                         : dataType === "costs"
//                         ? "costs.frames"
//                         : "completed.lead"
//                     }
//                     stroke="var(--framesChart)"
//                     fillOpacity={1}
//                     fill="var(--framesChart)"
//                   />
//                 )}

//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "bars" &&
//                   showMockTest && (
//                     <Bar
//                       stackId="b"
//                       type="monotone"
//                       name="Mock Tests Comparison"
//                       unit={
//                         dataType === "writingTime"
//                           ? " minutes"
//                           : dataType === "writtenWords"
//                           ? " words"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonMockTest.mockTestTime"
//                           : dataType === "writtenWords"
//                           ? "comparisonMockTest.mockTestWords"
//                           : "comparisonMockTest.mockTestCompleted"
//                       }
//                       stroke="var(--mockTestChart)"
//                       fillOpacity={0.6}
//                       strokeOpacity={0.2}
//                       fill="var(--mockTestChart)"
//                     />
//                   )} */}

//                 {chartType === "bars" && showWalls && (
//                   <Bar
//                     stackId="a"
//                     type="monotone"
//                     name={dataType === "completed" ? "Pup" : "Walls"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.boxes"
//                         : dataType === "costs"
//                         ? "costs.boxes"
//                         : "completed.pup"
//                     }
//                     stroke="var(--success75)"
//                     fillOpacity={1}
//                     fill="var(--success75)"
//                   />
//                 )}
//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "bars" &&
//                   showTask1 && (
//                     <Bar
//                       stackId="b"
//                       type="monotone"
//                       name="Tasks 1 Comparison"
//                       unit={
//                         dataType === "writingTime"
//                           ? " minutes"
//                           : dataType === "writtenWords"
//                           ? " words"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonTask1.task1Time"
//                           : dataType === "writtenWords"
//                           ? "comparisonTask1.task1Words"
//                           : "comparisonTask1.task1Completed"
//                       }
//                       stroke="var(--success75)"
//                       fillOpacity={0.6}
//                       strokeOpacity={0.2}
//                       fill="var(--success75)"
//                     />
//                   )} */}
//                 {chartType === "bars" && showBoxes && (
//                   <Bar
//                     stackId="a"
//                     type="monotone"
//                     name={dataType === "completed" ? "Tri 2 Hoppers" : "Boxes"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.boxes"
//                         : dataType === "costs"
//                         ? "costs.boxes"
//                         : "completed.tri2h"
//                     }
//                     stroke="var(--primary75)"
//                     fillOpacity={1}
//                     fill="var(--primary75)"
//                   />
//                 )}

//                 {chartType === "bars" && showCutBend && (
//                   <Bar
//                     stackId="a"
//                     type="monotone"
//                     name={
//                       dataType === "completed"
//                         ? "Tri 3 Hoppers"
//                         : "Cutting + Bending"
//                     }
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.cutbend"
//                         : dataType === "costs"
//                         ? "costs.cutbend"
//                         : "completed.tri3h"
//                     }
//                     stroke="var(--cutBendChart)"
//                     fillOpacity={1}
//                     fill="var(--cutBendChart)"
//                   />
//                 )}
//                 {chartType === "bars" && showSmallParts && (
//                   <Bar
//                     stackId="a"
//                     type="monotone"
//                     name={dataType === "completed" ? "Tandem" : "Small Parts"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.smallparts"
//                         : dataType === "costs"
//                         ? "costs.smallparts"
//                         : "completed.tandem"
//                     }
//                     stroke="var(--smallPartsChart)"
//                     fillOpacity={1}
//                     fill="var(--smallPartsChart)"
//                   />
//                 )}
//                 {chartType === "bars" && showFinishing && (
//                   <Bar
//                     stackId="a"
//                     type="monotone"
//                     name={dataType === "completed" ? "Others" : "Finishing"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.finishing"
//                         : dataType === "costs"
//                         ? "costs.finishing"
//                         : "completed.others"
//                     }
//                     stroke="var(--finishingChart)"
//                     fillOpacity={1}
//                     fill="var(--finishingChart)"
//                   />
//                 )}

//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "bars" &&
//                   showTask2 && (
//                     <Bar
//                       stackId="b"
//                       type="monotone"
//                       name="Tasks 2 Comparison"
//                       unit={
//                         dataType === "writingTime"
//                           ? " minutes"
//                           : dataType === "writtenWords"
//                           ? " words"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonTask2.task2Time"
//                           : dataType === "writtenWords"
//                           ? "comparisonTask2.task2Words"
//                           : "comparisonTask2.task2Completed"
//                       }
//                       stroke="var(--primary75)"
//                       fillOpacity={0.6}
//                       strokeOpacity={0.2}
//                       fill="var(--primary75)"
//                     />
//                   )} */}

//                 {/* only barchart */}

//                 {/* lineChart */}

//                 {chartType === "lines" && showFrames && (
//                   <Line
//                     dot={false}
//                     activeDot={{ r: 6 }}
//                     type="monotone"
//                     name={dataType === "completed" ? "Lead" : "Frames"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.frames"
//                         : dataType === "costs"
//                         ? "costs.frames"
//                         : "completed.lead"
//                     }
//                     stroke="var(--framesChart)"
//                     strokeWidth={1.5}
//                   />
//                 )}

//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "lines" &&
//                   showFrames && (
//                     <Line
//                       dot={false}
//                       activeDot={{ r: 6 }}
//                       type="monotone"
//                       name="Frames Comparison"
//                       unit={
//                         dataType === "writingTime"
//                           ? " hours"
//                           : dataType === "writtenWords"
//                           ? " $"
//                           : " tasks completed"
//                       }
//                       dataKey={
//                         dataType === "writingTime"
//                           ? "comparisonFrames.framesTime"
//                           : dataType === "writtenWords"
//                           ? "comparisonFrames.framesWords"
//                           : "comparisonFrames.framesCompleted"
//                       }
//                       stroke="var(--framesChart)"
//                       strokeWidth={1.5}
//                       strokeDasharray="5 5"
//                     />
//                   )} */}

//                 {chartType === "lines" && showWalls && (
//                   <Line
//                     dot={false}
//                     activeDot={{ r: 6 }}
//                     type="monotone"
//                     name={dataType === "completed" ? "Pup" : "Walls"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.walls"
//                         : dataType === "costs"
//                         ? "costs.walls"
//                         : "completed.pup"
//                     }
//                     stroke="var(--success)"
//                     strokeWidth={1.5}
//                   />
//                 )}

//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "lines" &&
//                   showWalls && (
//                     <Line
//                       dot={false}
//                       activeDot={{ r: 6 }}
//                       type="monotone"
//                       name="Walls Comparison"
//                       unit={
//                         dataType === "times"
//                           ? " hours"
//                           : dataType === "costs"
//                           ? " $"
//                           : " completed"
//                       }
//                       dataKey={
//                         dataType === "times"
//                           ? "comparisonWalls.wallsTime"
//                           : dataType === "costs"
//                           ? "comparisonWalls.wallsWords"
//                           : "comparisonWalls.wallsCompleted"
//                       }
//                       stroke="var(--success)"
//                       strokeWidth={1.5}
//                       strokeDasharray="5 5"
//                     />
//                   )} */}

//                 {chartType === "lines" && showBoxes && (
//                   <Line
//                     dot={false}
//                     activeDot={{ r: 6 }}
//                     type="monotone"
//                     name={dataType === "completed" ? "Tri 2 Hoppers" : "Boxes"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.boxes"
//                         : dataType === "costs"
//                         ? "costs.boxes"
//                         : "completed.tri2h"
//                     }
//                     fillOpacity={1}
//                     stroke="var(--primary)"
//                     strokeWidth={1.5}
//                   />
//                 )}

//                 {chartType === "lines" && showCutBend && (
//                   <Line
//                     dot={false}
//                     activeDot={{ r: 6 }}
//                     type="monotone"
//                     name={
//                       dataType === "completed"
//                         ? "Tri 3 Hoppers"
//                         : "Cutting + Bending"
//                     }
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.cutbend"
//                         : dataType === "costs"
//                         ? "costs.cutbend"
//                         : "completed.tri3h"
//                     }
//                     fillOpacity={1}
//                     stroke="var(--primary)"
//                     strokeWidth={1.5}
//                   />
//                 )}
//                 {/* {showComparison &&
//                   !!selectedBand &&
//                   chartType === "lines" &&
//                   showBoxes && (
//                     <Line
//                       dot={false}
//                       activeDot={{ r: 6 }}
//                       type="monotone"
//                       name="Boxes Comparison"
//                       unit={
//                         dataType === "times"
//                           ? " hours"
//                           : dataType === "costs"
//                           ? " $"
//                           : " completed"
//                       }
//                       dataKey={
//                         dataType === "times"
//                           ? "comparisonBoxes.boxesTime"
//                           : dataType === "costs"
//                           ? "comparisonBoxes.boxesWords"
//                           : "comparisonBoxes.boxesCompleted"
//                       }
//                       stroke="var(--primary)"
//                       strokeWidth={1.5}
//                       strokeDasharray="5 5"
//                     />
//                   )} */}

//                 {chartType === "lines" && showSmallParts && (
//                   <Line
//                     dot={false}
//                     activeDot={{ r: 6 }}
//                     type="monotone"
//                     name={dataType === "completed" ? "Tandem" : "Small Parts"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.smallparts"
//                         : dataType === "costs"
//                         ? "costs.smallparts"
//                         : "completed.tandem"
//                     }
//                     stroke="var(--smallPartsChart)"
//                     strokeWidth={1.5}
//                   />
//                 )}
//                 {chartType === "lines" && showFinishing && (
//                   <Line
//                     dot={false}
//                     activeDot={{ r: 6 }}
//                     type="monotone"
//                     name={dataType === "completed" ? "Others" : "Finishing"}
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.finishing"
//                         : dataType === "costs"
//                         ? "costs.finishing"
//                         : "completed.others"
//                     }
//                     stroke="var(--finishingChart)"
//                     strokeWidth={1.5}
//                   />
//                 )}

//                 {chartType === "lines" && showTotal && (
//                   <Line
//                     dot={false}
//                     activeDot={{ r: 6 }}
//                     type="monotone"
//                     name="Total"
//                     unit={
//                       dataType === "times"
//                         ? " hours"
//                         : dataType === "costs"
//                         ? " $"
//                         : " completed"
//                     }
//                     dataKey={
//                       dataType === "times"
//                         ? "times.total"
//                         : dataType === "costs"
//                         ? "costs.total"
//                         : "completed.total"
//                     }
//                     stroke="var(--totalChart)"
//                     strokeWidth={1.5}
//                   />
//                 )}
//                 {showComparison &&
//                   !!selectedBand &&
//                   chartType === "lines" &&
//                   showTotal && (
//                     <Line
//                       dot={false}
//                       activeDot={{ r: 6 }}
//                       type="monotone"
//                       name="Total Comparison"
//                       unit={
//                         dataType === "times"
//                           ? " hours"
//                           : dataType === "costs"
//                           ? " $"
//                           : " completed"
//                       }
//                       dataKey={
//                         dataType === "times"
//                           ? "comparisonTotal.totalTime"
//                           : dataType === "costs"
//                           ? "comparisonTotal.totalWords"
//                           : "comparisonTotal.totalCompleted"
//                       }
//                       stroke="var(--totalChart)"
//                       strokeWidth={1.5}
//                       strokeDasharray="5 5"
//                     />
//                   )}

//                 {/* lineChart */}

//                 {/* lineChart */}

//                 {/* <Legend verticalAlign="top" align="right" height={36} /> */}
//                 <CartesianGrid
//                   // vertical={false}
//                   strokeDasharray="0"
//                   stroke="var(--secondary25)"
//                   strokeWidth="0.2"
//                 />
//                 {/* <Line type="monotone" dataKey="mockTest" stroke="#8884d8" /> */}
//                 <YAxis
//                   tickMargin={10}
//                   tick={{ fontSize: 15 }}
//                   axisLine={false}
//                   tickLine={false}
//                   stroke="var(--secondary35)"
//                 >
//                   {/* <Label
//                     // value="Writing time"
//                     offset={0}
//                     position="left"
//                     stroke="var(--secondary50)"
//                   /> */}
//                 </YAxis>
//                 <Tooltip
//                   content={
//                     <CustomTooltip
//                       timeDivision={timeDivision}
//                       selectedBand={selectedBand}
//                       showComparison={showComparison}
//                     />
//                   }
//                 />
//                 {timeDivision === "dayly" && (
//                   <Brush
//                     gap={6}
//                     dataKey="formattedDate"
//                     // dataKey={timeDivision === "weekly" ? "formattedDate" : "week"}
//                     height={24}
//                     stroke="var(--primary75)"
//                     y={378}
//                     travellerWidth={12}
//                   />
//                 )}
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
//   //   return (
//   //     <Box
//   //       sx={{
//   //         maxHeight: "100vh",
//   //         width: "100%",
//   //         display: "flex",
//   //         overflow: "hidden",
//   //       }}
//   //     >
//   //       <Box sx={{ pt: 2, width: "40%", ml: 8, pb: 1 }}>
//   //         <Box
//   //           sx={{
//   //             width: "100%",
//   //             display: "flex",
//   //             justifyContent: "space-between",
//   //             alignItems: "center",
//   //           }}
//   //         >
//   //           <Typography sx={{ fontSize: "2rem", minWidth: "14rem" }}>
//   //             Dashboard
//   //           </Typography>
//   //         </Box>
//   //       </Box>
//   //     </Box>
//   //   );
// }
