// "use client";
import { useRouter } from "next/router";
import * as React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function QualityCheckReports(props) {
  const router = useRouter();
  const [showReportsListsOpen, setShowReportsListsOpen] = React.useState(false);

  async function handleDeleteInspectionList(id) {
    const response = await fetch("/api/delete-inspection-list", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newInspectionLists = [];
    if (response?.ok) {
      props.qualityCheckReports.map((inspection) => {
        if (inspection._id !== id) {
          return newInspectionLists.push(inspection);
        }
      });

      props.handleQualityCheckReports(newInspectionLists);
    }
  }

  // Helper function to group and sort reports by month
  const groupReportsByMonth = (reports) => {
    const groupedReports = {};

    reports?.forEach((report) => {
      const date = new Date(
        report.qualityInspection.initialInspection.startTime
      );
      const monthYear = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!groupedReports[monthYear]) {
        groupedReports[monthYear] = [];
      }
      groupedReports[monthYear].push(report);
    });

    // Sort each group by date in descending order
    for (const monthYear in groupedReports) {
      groupedReports[monthYear].sort((a, b) => {
        const dateA = new Date(a.qualityInspection.initialInspection.startTime);
        const dateB = new Date(b.qualityInspection.initialInspection.startTime);
        return dateB - dateA;
      });
    }

    return groupedReports;
  };

  // Group and sort reports
  const groupedReports = groupReportsByMonth(props.qualityCheckReports);

  // Sort the groups by month in descending order
  const sortedMonthKeys = Object.keys(groupedReports).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA;
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        pb: 40,
      }}
    >
      <Box
        onClick={() => setShowReportsListsOpen(!showReportsListsOpen)}
        sx={{
          width: "100%",
          maxWidth: "50rem",
          minWidth: "44rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          maxHeight: showReportsListsOpen ? "100%" : "6rem",
          overflow: "hidden",
          pb: 3,
          border: "var(--mainBorder)",
          borderRadius: "0.5rem",
          mt: 4,
          pl: 1,
          pr: 1,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", pl: 3 }}>
            <Typography sx={{ fontSize: "2rem", mt: 2 }}>
              Quality Check Reports
            </Typography>
          </Box>
          <IconButton
            onClick={() => setShowReportsListsOpen(!showReportsListsOpen)}
            sx={{ ml: 6, mt: 3, mr: 0 }}
          >
            {showReportsListsOpen ? (
              <KeyboardArrowUpIcon sx={{ fontSize: "2.8rem" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: "2.8rem" }} />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              pl: 2,
              mb: 1,
            }}
          >
            <Box sx={{ minWidth: "7rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Work Order
              </Typography>
            </Box>
            <Box sx={{ minWidth: "4.8rem", pr: 1 }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Trailer
              </Typography>
            </Box>
            <Box sx={{ minWidth: "6.3rem", pr: 1 }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Customer
              </Typography>
            </Box>
            <Box sx={{ minWidth: "4rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Status
              </Typography>
            </Box>
            <Box sx={{ minWidth: "8.1rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Date
              </Typography>
            </Box>
            <Box sx={{ minWidth: "4rem" }}>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Inspector
              </Typography>
            </Box>
          </Box>
          {sortedMonthKeys.map((monthYear, monthIndex) => (
            <Box key={monthYear} sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  mt: monthIndex === 0 ? 1.5 : 0,
                  mb: 2.5,
                  pl: 2,
                }}
              >
                {monthYear}
              </Typography>
              {groupedReports[monthYear].map((trailer, rowIndex) => (
                <Box
                  key={rowIndex}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    pl: 2,
                    mb:
                      rowIndex !== groupedReports[monthYear].length - 1
                        ? 2.5
                        : 2.5,
                  }}
                >
                  <Box sx={{ minWidth: "7rem" }}>
                    <Typography
                      sx={{ fontSize: "0.9rem", color: "var(--secondary50)" }}
                    >
                      {trailer.workOrder}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "4.8rem" }}>
                    <Typography
                      sx={{
                        fontSize:
                          trailer?.trailerType.length > 8 ? "0.7rem" : "0.9rem",
                        pr: 1,
                        color: "var(--secondary50)",
                      }}
                    >
                      {trailer.trailerType}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "6.3rem" }}>
                    <Typography
                      sx={{
                        fontSize:
                          trailer?.customer.length > 8 ? "0.7rem" : "0.9rem",
                        pr: 1,
                        color: "var(--secondary50)",
                      }}
                    >
                      {trailer.customer}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "4rem", color: "var(--secondary50)" }}>
                    <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                      {trailer.qualityInspection.finalActive === "completed"
                        ? "Final"
                        : "Initial"}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "8.1rem", ml: 0 }}>
                    <Typography
                      sx={{ fontSize: "0.9rem", color: "var(--secondary50)" }}
                    >
                      {`${new Date(trailer?.qualityInspection?.initialInspection?.startTime)?.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}, ${new Date(trailer?.qualityInspection?.initialInspection?.startTime)?.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}`}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: "4rem" }}>
                    <Typography
                      sx={{ fontSize: "1.1rem", color: "var(--secondary50)" }}
                    >
                      {trailer?.qualityInspection?.inspectorName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => window.open(`/qc/${trailer._id}`)}
                      variant="contained"
                      sx={{
                        ml: 2,
                        mr: 1,
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
