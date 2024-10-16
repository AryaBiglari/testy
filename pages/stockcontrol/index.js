import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SheetsStockTable from "../sheetscontrol/index.js";
import PipesStockTable from "../pipescontrol/index.js";

export default function StockControlPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "white",
        padding: 0,
        margin: 0,
      }}
    >
      

      {/* Sheets Stock Section */}
      <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
        <SheetsStockTable mode={null} sx={{ padding: 0, margin: 0 }} />
      </Box>

      {/* Pipes Stock Section */}
      <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
        <PipesStockTable mode={null} sx={{ padding: 0, margin: 0 }} />
      </Box>
    </Box>
  );
}
