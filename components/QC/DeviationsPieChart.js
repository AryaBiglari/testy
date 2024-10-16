import * as React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF1242",
  "#5612F2",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DeviationsPieChart(props) {
  //   console.log(deviationsChartData);
  //   const data = [
  //     { deviationType: "Welding", value: 330 },
  //     { deviationType: "Fixings", value: 300 },
  //     { deviationType: "Alignments", value: 300 },
  //     { deviationType: "Bending", value: 200 },
  //     { deviationType: "Aesthetic", value: 200 },
  //     { deviationType: "Others", value: 200 },
  //   ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={props.deviationsChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ deviationType, value }) =>
            `${deviationType}: ${value} ${
              value === 1 ? "deviation" : "deviations"
            } (${((value / props.totalDeviations) * 100).toFixed()}%)`
          }
          //   label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          nameKey="deviationType"
        >
          {props.deviationsChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Legend />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    // <ResponsiveContainer width="100%" height="100%">
    //   <PieChart width={200} height={200}>
    //     <Pie
    //       // data={distributionData}
    //       cx="50%"
    //       cy="50%"
    //       labelLine={false}
    //       label={renderCustomizedLabel}
    //       // label
    //       outerRadius={100}
    //       innerRadius={70}
    //       paddingAngle={4}
    //       dataKey="value"
    //     >
    //       <Cell fill={COLORS[0]} />
    //       <Cell fill={COLORS[1]} />
    //       <Cell fill={COLORS[2]} />
    //     </Pie>
    //     {/* <Tooltip content={<CustomTooltipPieChart />} /> */}
    //   </PieChart>
    // </ResponsiveContainer>
  );
}
