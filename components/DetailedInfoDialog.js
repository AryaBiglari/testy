import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

const formatLabel = (label) => {
  if (!label) return "";
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

const capitalize = (s) =>
  s && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleString(undefined, options);
};

const formatTime = (totalSeconds) => {
  if (typeof totalSeconds !== "number" || isNaN(totalSeconds)) return "0h 0m";
  const hrs = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const mins = Math.floor(remainingSecondsAfterHours / 60);
  return `${hrs}h ${mins}m`;
};

const DetailedInfoDialog = ({
  open,
  handleClose,
  category,
  week,
  data,
  loading,
  error,
}) => {
  const calculateTotalManpower = (employees) => {
    if (!employees || employees.length === 0) return "0h 0m";
    const totalSeconds = employees.reduce(
      (acc, emp) => acc + (emp.timeWorked || 0),
      0
    );
    return formatTime(totalSeconds);
  };

  const sortedData = React.useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const dateA = a.completedDate ? new Date(a.completedDate) : new Date(0);
      const dateB = b.completedDate ? new Date(b.completedDate) : new Date(0);
      return dateB - dateA;
    });
  }, [data]);


  const totalManpowerSeconds = React.useMemo(() => {
    if (!sortedData || sortedData.length === 0) return 0;
    return sortedData.reduce((acc, item) => {
      if (!item.employees || item.employees.length === 0) return acc;
      return (
        acc +
        item.employees.reduce(
          (empAcc, emp) => empAcc + (emp.timeWorked || 0),
          0
        )
      );
    }, 0);
  }, [sortedData]);

  const totalManpower = formatTime(totalManpowerSeconds);
  const totalCompleted = sortedData.length;
  const averageSeconds = totalCompleted > 0 ? totalManpowerSeconds / totalCompleted : 0;
  const averageHours = formatTime(Math.floor(averageSeconds));


  const showAdditionalInfo =
    category === "walls" || category === "boxes";


  const wallType =
    category === "walls" && sortedData.length > 0
      ? sortedData[0].wallType.includes("Side Wall")
        ? "Side Wall"
        : "Other Wall"
      : null;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="detailed-info-dialog-title"
      open={open}
      maxWidth={category === "trailers" ? "md" : "lg"}
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }} id="detailed-info-dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          {/* Title Section */}
          <Typography variant="h6">
            {category === "walls" && sortedData.length > 0
              ? `${sortedData[0].wallType.includes("Side Wall") ? "Side Wall" : "Other Wall"} Details - ${formatLabel(
                week
              )}`
              : category === "trailers"
                ? `Trailers Completed Details - ${formatLabel(week)}`
                : `${capitalize(category)} Details - ${formatLabel(week)}`}
          </Typography>

          {/* Metrics Section */}
          {(category === "walls" || category === "boxes") && sortedData.length > 0 && (
            <Box textAlign="right" mr="3rem">
              <Typography variant="body2">
                <strong>Total Manpower:</strong> {totalManpower}
              </Typography>
              <Typography variant="body2">
                <strong>Total Completed:</strong> {totalCompleted}
              </Typography>
              <Typography variant="body2">
                <strong>Average Time per Task:</strong> {averageHours}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !sortedData || sortedData.length === 0 ? (
          <Typography>No data available for this period.</Typography>
        ) : (
          <Table>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={index}>
                  {/* Frames Category */}
                  {category === "frames" && (
                    <>
                      <TableCell>
                        <Typography variant="subtitle1">{item.type}</Typography>
                        <Typography variant="body2">
                          Work Order: {item.workOrder}
                        </Typography>
                        <Typography variant="body2">
                          Customer: {item.customer}
                        </Typography>
                        <Typography variant="body2">
                          Type: {item.trailerType}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          Employees Involved:
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mt: 1,
                          }}
                        >
                          {item.employees && item.employees.length > 0 ? (
                            item.employees.map((employee, empIndex) => (
                              <Tooltip
                                key={empIndex}
                                title={`Time Worked: ${formatTime(
                                  employee.timeWorked || 0
                                )}`}
                                arrow
                              >
                                <Chip
                                  color="success"
                                  label={`${capitalize(
                                    employee.firstName
                                  )} (${employee.employeeID})`}
                                  variant="outlined"
                                  size="small"
                                  sx={{ cursor: "pointer" }}
                                />
                              </Tooltip>
                            ))
                          ) : (
                            <Typography variant="body2">N/A</Typography>
                          )}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          Total Manpower:
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {calculateTotalManpower(item.employees)}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body2">
                          Start Date: {formatDateTime(item.startedDate)}
                        </Typography>
                        <Typography variant="body2">
                          Completed Date: {formatDateTime(item.completedDate)}
                        </Typography>
                      </TableCell>
                    </>
                  )}

                  {/* Walls Category */}
                  {category === "walls" && (
                    <>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {item.wallType}
                        </Typography>
                        <Typography variant="body2">
                          Work Order: {item.workOrder}
                        </Typography>
                        <Typography variant="body2">
                          Customer: {item.customer}
                        </Typography>
                        <Typography variant="body2">
                          Type: {item.trailerType}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          Employees Involved:
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mt: 1,
                          }}
                        >
                          {item.employees && item.employees.length > 0 ? (
                            item.employees.map((employee, empIndex) => (
                              <Tooltip
                                key={empIndex}
                                title={`Time Worked: ${formatTime(
                                  employee.timeWorked || 0
                                )}`}
                                arrow
                              >
                                <Chip
                                  color="success"
                                  label={`${capitalize(
                                    employee.firstName
                                  )} (${employee.employeeID})`}
                                  variant="outlined"
                                  size="small"
                                  sx={{ cursor: "pointer" }}
                                />
                              </Tooltip>
                            ))
                          ) : (
                            <Typography variant="body2">N/A</Typography>
                          )}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          Total Manpower:
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {calculateTotalManpower(item.employees)}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body2">
                          Start Date: {formatDateTime(item.startedDate)}
                        </Typography>
                        <Typography variant="body2">
                          Completed Date: {formatDateTime(item.completedDate)}
                        </Typography>
                      </TableCell>
                    </>
                  )}

                  {/* Boxes Category */}
                  {category === "boxes" && (
                    <>
                      <TableCell>
                        <Typography variant="subtitle1">Box</Typography>
                        <Typography variant="body2">
                          Work Order: {item.workOrder}
                        </Typography>
                        <Typography variant="body2">
                          Customer: {item.customer}
                        </Typography>
                        <Typography variant="body2">
                          Type: {item.trailerType}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          Employees Involved:
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mt: 1,
                          }}
                        >
                          {item.employees && item.employees.length > 0 ? (
                            item.employees.map((employee, empIndex) => (
                              <Tooltip
                                key={empIndex}
                                title={`Time Worked: ${formatTime(
                                  employee.timeWorked || 0
                                )}`}
                                arrow
                              >
                                <Chip
                                  color="success"
                                  label={`${capitalize(
                                    employee.firstName
                                  )} (${employee.employeeID})`}
                                  variant="outlined"
                                  size="small"
                                  sx={{ cursor: "pointer" }}
                                />
                              </Tooltip>
                            ))
                          ) : (
                            <Typography variant="body2">N/A</Typography>
                          )}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          Total Manpower:
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {calculateTotalManpower(item.employees)}
                        </Typography>
                      </TableCell>

                      <TableCell align="right" width="340rem">
                        <Box width="100%">
                          <Typography variant="body2" textAlign="right">
                            Start Date: {formatDateTime(item.startedDate || "N/A")} <br />
                            Completed Date: {formatDateTime(item.completedDate)}
                          </Typography>
                        </Box>
                      </TableCell>
                    </>
                  )}

                  {/* Trailers Category */}
                  {category === "trailers" && (
                    <>
                      <TableCell>
                        <Typography variant="subtitle1">Trailer</Typography>
                        <Typography variant="body2">
                          Work Order: {item.workOrder}
                        </Typography>
                        <Typography variant="body2">
                          Customer: {item.customer}
                        </Typography>
                        <Typography variant="body2">
                          Type: {item.trailerType}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body2">
                          Completed Date: {formatDateTime(item.completedDate)}
                        </Typography>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailedInfoDialog;
