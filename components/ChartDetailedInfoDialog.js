import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
  Chip,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { format, parseISO, addDays } from "date-fns";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";


const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));


const capitalize = (s) =>
  s && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "";


const formatDate = (date) => {
  if (!date || isNaN(date.getTime())) return "N/A";
  return format(date, "MMM d, yyyy");
};


const formatDateTime = (date) => {
  if (!date || isNaN(date.getTime())) return "N/A";
  return format(date, "MMM d, yyyy, h:mm a");
};


const formatTime = (totalSeconds) => {
  if (typeof totalSeconds !== "number" || isNaN(totalSeconds)) return "0h 0m";
  const hrs = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const mins = Math.floor(remainingSecondsAfterHours / 60);
  return `${hrs}h ${mins}m`;
};

const ChartDetailedInfoDialog = ({
  open,
  handleClose,
  date,
  data,
  loading,
  error,
  interval,
}) => {

  const parsedDate = React.useMemo(() => {
    return typeof date === "string" ? parseISO(date) : date;
  }, [date]);


  const dialogTitle = React.useMemo(() => {
    if (interval === "week") {
      const toDate = addDays(parsedDate, 6);
      return `Detailed Completions from ${formatDate(parsedDate)} to ${formatDate(
        toDate
      )}`;
    } else {
      return `Detailed Completions for ${formatDate(parsedDate)}`;
    }
  }, [parsedDate, interval]);


  const calculateTotalManpower = React.useCallback((employees) => {
    if (!employees || employees.length === 0) return "0h 0m";
    const totalSeconds = employees.reduce(
      (acc, emp) => acc + (emp.timeWorked || 0),
      0
    );
    return formatTime(totalSeconds);
  }, []);


  const sortedData = React.useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const timeA = a.completedDate ? new Date(a.completedDate).getTime() : 0;
      const timeB = b.completedDate ? new Date(b.completedDate).getTime() : 0;
      return timeB - timeA;
    });
  }, [data]);


  const renderEmployees = (employees) => {
    if (!employees || employees.length === 0) {
      return <Typography variant="body2">N/A</Typography>;
    }
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
        {employees.map((employee) => (
          <Tooltip
            key={employee.employeeID}
            title={`Time Worked: ${formatTime(employee.timeWorked || 0)}`}
            arrow
          >
            <Chip
              color="success"
              label={`${capitalize(employee.firstName)} (${employee.employeeID})`}
              variant="outlined"
              size="small"
              sx={{ cursor: "pointer" }}
              aria-label={`Employee ${employee.firstName} with ID ${employee.employeeID}`}
            />
          </Tooltip>
        ))}
      </Box>
    );
  };


  const renderCategoryDetails = (item) => {
    let typeLabel = "";
    if (item.category === "frames") typeLabel = item.type;
    else if (item.category === "walls") typeLabel = item.wallType;
    else if (item.category === "boxes") typeLabel = "Box";
    else if (item.category === "trailers") typeLabel = "Trailer";
    else typeLabel = capitalize(item.category);

    const isTrailer = item.category === "trailers";

    return (
      <>
        <TableCell>
          <Typography variant="subtitle1">{typeLabel}</Typography>
          <Typography variant="body2">Work Order: {item.workOrder}</Typography>
          <Typography variant="body2">Customer: {item.customer}</Typography>
          {item.category === "trailers" ? null : (
            <Typography variant="body2">Type: {item.trailerType}</Typography>
          )}
        </TableCell>

        <TableCell>
          {isTrailer ? null : (
            <>
              <Typography variant="body2">Employees Involved:</Typography>
              {renderEmployees(item.employees)}
            </>
          )}
        </TableCell>

        <TableCell>
          {isTrailer ? null : (
            <>
              <Typography variant="body2">Total Manpower:</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {calculateTotalManpower(item.employees)}
              </Typography>
            </>
          )}
        </TableCell>

        <TableCell align="right">
          {item.category !== "trailers" && (
            <Typography variant="body2">
              Start Date: {formatDateTime(new Date(item.startedDate))}
            </Typography>
          )}
          <Typography variant="body2">
            Completed Date: {formatDateTime(new Date(item.completedDate))}
          </Typography>
        </TableCell>
      </>
    );
  };


  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="chart-detailed-info-dialog-title"
      open={open}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="chart-detailed-info-dialog-title">
        {dialogTitle}
        <CloseButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error || "An unexpected error occurred."}</Alert>
        ) : !sortedData || sortedData.length === 0 ? (
          <Typography>No data available for this date.</Typography>
        ) : (
          <Table>
            <TableBody>
              {sortedData.map((item) => (
                <TableRow key={item.id || item.workOrder}>
                  {renderCategoryDetails(item)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};


ChartDetailedInfoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string.isRequired,
      type: PropTypes.string,
      wallType: PropTypes.string,
      workOrder: PropTypes.string.isRequired,
      customer: PropTypes.string.isRequired,
      trailerType: PropTypes.string,
      employees: PropTypes.arrayOf(
        PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          employeeID: PropTypes.string.isRequired,
          timeWorked: PropTypes.number,
        })
      ),
      startedDate: PropTypes.string,
      completedDate: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  interval: PropTypes.string,
};


ChartDetailedInfoDialog.defaultProps = {
  data: [],
  loading: false,
  error: null,
  interval: "day",
};

export default ChartDetailedInfoDialog;
