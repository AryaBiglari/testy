import * as React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ListIcon from "@mui/icons-material/List";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, isValid, differenceInMinutes, startOfWeek, endOfWeek, startOfDay, endOfDay, addDays } from "date-fns";

const localizer = momentLocalizer(moment);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const isValidDate = (date) => isValid(date);

const formatDuration = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hrs}h ${mins}m`;
};

const getDifference = (startTime, endTime) => {
  const start = new Date(startTime);
  let end = new Date(endTime);
  if (!isValidDate(start)) return 0;
  if (!isValidDate(end)) {
    end = new Date();
  }
  let diffMinutes = (end - start) / 60000;
  let roundedMinutes = Math.round(diffMinutes * 10) / 10;
  return roundedMinutes;
};

const aggregateWeeklyTasks = (activityLog) => {

  const sortedLogs = activityLog
    .filter(log => isValidDate(new Date(log.startTime)))
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const aggregated = [];
  let currentGroup = null;

  sortedLogs.forEach(log => {
    const logStart = new Date(log.startTime);
    let logEnd = new Date(log.endTime);
    if (!isValidDate(logEnd)) {
      logEnd = new Date();
    }


    const groupKey = `${log.workOrder || 'WO'}|${log.trailerType || 'Trailer Type'}`;




    if (currentGroup && currentGroup.key === groupKey) {
      const gap = differenceInMinutes(logStart, currentGroup.end);


      if (gap <= 5) {
        currentGroup.end = logEnd > currentGroup.end ? logEnd : currentGroup.end;
        currentGroup.duration += getDifference(log.startTime, log.endTime);


        if (log.specificTask) {
          currentGroup.specificTasks.add(log.specificTask);
        }
      } else {

        aggregated.push({ ...currentGroup });

        currentGroup = {
          key: groupKey,
          workOrder: log.workOrder || 'WO',
          trailerType: log.trailerType || 'Trailer Type',
          specificTasks: new Set(log.specificTask ? [log.specificTask] : []),
          start: logStart,
          end: logEnd,
          duration: getDifference(log.startTime, log.endTime),
        };
      }
    } else {

      if (currentGroup) {
        aggregated.push({ ...currentGroup });
      }

      currentGroup = {
        key: groupKey,
        workOrder: log.workOrder || 'WO',
        trailerType: log.trailerType || 'Trailer Type',
        specificTasks: new Set(log.specificTask ? [log.specificTask] : []),
        start: logStart,
        end: logEnd,
        duration: getDifference(log.startTime, log.endTime),
      };
    }
  });


  if (currentGroup) {
    aggregated.push({ ...currentGroup });
  }


  return aggregated.map((group, index) => {
    const event = {
      id: `weekly-aggregated-${index}`,
      title: `${group.workOrder} | ${group.trailerType} | ${Array.from(group.specificTasks).join(', ') || 'N/A'}`,
      start: group.start,
      end: group.end,
      allDay: false,
      resource: {
        workOrder: group.workOrder,
        trailerType: group.trailerType,
        specificTasks: Array.from(group.specificTasks),
        duration: group.duration,
      },
      isAggregated: true,
    };




    return event;
  });
};

export default function EmployeeInfo() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentEmployee, setCurrentEmployee] = React.useState(null);
  const [form, setForm] = React.useState({
    employeeID: "",
  });
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [viewMode, setViewMode] = React.useState('calendar');

  const [calendarView, setCalendarView] = React.useState('week');
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [totalMinutesWeek, setTotalMinutesWeek] = React.useState(0);
  const [totalMinutesDay, setTotalMinutesDay] = React.useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  React.useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetUseStates = () => {
    setCurrentEmployee(null);
    setTotalMinutesWeek(0);
    setTotalMinutesDay(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetUseStates();
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/employees/employeesInfo?employeeID=${form.employeeID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newCurrentEmployee = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        setSeverity("error");
        setMessage(newCurrentEmployee.message || "Employee not found");
        setOpen(true);
        resetUseStates();
        return;
      }

      setCurrentEmployee(newCurrentEmployee);
      console.log("Fetched Employee Data:", newCurrentEmployee);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setIsLoading(false);
      setSeverity("error");
      setMessage("An error occurred while fetching employee data.");
      setOpen(true);
    }
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const handleCalendarViewChange = (view) => {
    setCalendarView(view);
    console.log("Calendar view changed to:", view);
  };

  const handleCalendarNavigate = (date, view) => {
    setCurrentDate(date);
    console.log("Calendar navigated to date:", date);
  };

  React.useEffect(() => {
    if (currentEmployee && calendarView === 'week' && currentEmployee.activityLog) {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

      const total = currentEmployee.activityLog.reduce((acc, log) => {
        const startTime = new Date(log.startTime);
        let endTime = new Date(log.endTime);
        if (!isValidDate(endTime)) {
          endTime = new Date();
        }
        if (startTime >= weekStart && endTime <= weekEnd) {
          const duration = getDifference(log.startTime, log.endTime);
          return acc + (typeof duration === 'number' ? duration : 0);
        }
        return acc;
      }, 0);

      setTotalMinutesWeek(total);
      console.log("Total Minutes Calculated for Week:", total);
    } else {
      setTotalMinutesWeek(0);
      console.log("Total Minutes Reset to 0 for Week");
    }
  }, [currentEmployee, calendarView, currentDate]);

  React.useEffect(() => {
    if (currentEmployee && calendarView === 'day' && currentEmployee.activityLog) {
      const dayStart = startOfDay(currentDate);
      const dayEnd = endOfDay(currentDate);

      const total = currentEmployee.activityLog.reduce((acc, log) => {
        const startTime = new Date(log.startTime);
        let endTime = new Date(log.endTime);
        if (!isValidDate(endTime)) {
          endTime = new Date();
        }
        if (startTime >= dayStart && endTime <= dayEnd) {
          const duration = getDifference(log.startTime, log.endTime);
          return acc + (typeof duration === 'number' ? duration : 0);
        }
        return acc;
      }, 0);

      setTotalMinutesDay(total);
      console.log("Total Minutes Calculated for Day:", total);
    } else {
      setTotalMinutesDay(0);
      console.log("Total Minutes Reset to 0 for Day");
    }
  }, [currentEmployee, calendarView, currentDate]);

  const calendarEvents = React.useMemo(() => {
    if (!currentEmployee || !currentEmployee.activityLog) return [];

    let events = [];

    if (calendarView === 'month') {
      const grouped = {};

      currentEmployee.activityLog.forEach(log => {
        const start = new Date(log.startTime);
        let end = new Date(log.endTime);
        if (!isValidDate(end)) {
          end = new Date();
        }

        if (!isValidDate(start)) {
          console.warn(`Invalid start date for log:`, log);
          return;
        }


        const groupKey = `${log.workOrder || 'WO'}|${log.trailerType || 'Trailer Type'}`;

        if (!grouped[groupKey]) {
          grouped[groupKey] = {
            workOrder: log.workOrder || 'WO',
            trailerType: log.trailerType || 'Trailer Type',
            specificTasks: new Set(log.specificTask ? [log.specificTask] : []),
            start: start,
            end: end,
            duration: getDifference(log.startTime, log.endTime),
          };
        } else {
          const group = grouped[groupKey];
          if (start < group.start) group.start = start;
          if (end > group.end) group.end = end;
          group.duration += getDifference(log.startTime, log.endTime);
          if (log.specificTask) {
            group.specificTasks.add(log.specificTask);
          }
        }
      });

      const aggregatedEvents = Object.values(grouped).map((group, index) => {
        const event = {
          id: `aggregated-month-${index}`,
          title: `${group.workOrder} | ${group.trailerType} | ${Array.from(group.specificTasks).join(', ') || 'N/A'}`,
          start: group.start,
          end: group.end,
          allDay: false,
          resource: {
            workOrder: group.workOrder,
            trailerType: group.trailerType,
            specificTasks: Array.from(group.specificTasks),
            duration: group.duration,
          },
          isAggregated: true,
        };


        console.log(`Aggregated Month Event [${index}]:`, event.resource);

        return event;
      });

      events = aggregatedEvents;
    }

    if (calendarView === 'week') {
      events = events.concat(aggregateWeeklyTasks(currentEmployee.activityLog));
    }

    if (calendarView === 'day') {
      const dayStart = startOfDay(currentDate);
      const dayEnd = endOfDay(currentDate);

      const sortedLogs = currentEmployee.activityLog
        .filter(log => isValidDate(new Date(log.startTime)))
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

      const aggregated = [];
      let currentGroup = null;

      sortedLogs.forEach(log => {
        const logStart = new Date(log.startTime);
        let logEnd = new Date(log.endTime);
        if (!isValidDate(logEnd)) {
          logEnd = new Date();
        }

        if (logStart < dayStart || logEnd > dayEnd) return;


        const groupKey = `${log.workOrder || 'WO'}|${log.trailerType || 'Trailer Type'}`;

        if (currentGroup && currentGroup.key === groupKey) {
          const gap = differenceInMinutes(logStart, currentGroup.end);
          if (gap <= 5) {
            currentGroup.end = logEnd > currentGroup.end ? logEnd : currentGroup.end;
            currentGroup.duration += getDifference(log.startTime, log.endTime);
            if (log.specificTask) {
              currentGroup.specificTasks.add(log.specificTask);
            }
          } else {
            aggregated.push({ ...currentGroup });
            currentGroup = {
              key: groupKey,
              workOrder: log.workOrder || 'WO',
              trailerType: log.trailerType || 'Trailer Type',
              specificTasks: new Set(log.specificTask ? [log.specificTask] : []),
              start: logStart,
              end: logEnd,
              duration: getDifference(log.startTime, log.endTime),
            };
          }
        } else {
          if (currentGroup) {
            aggregated.push({ ...currentGroup });
          }
          currentGroup = {
            key: groupKey,
            workOrder: log.workOrder || 'WO',
            trailerType: log.trailerType || 'Trailer Type',
            specificTasks: new Set(log.specificTask ? [log.specificTask] : []),
            start: logStart,
            end: logEnd,
            duration: getDifference(log.startTime, log.endTime),
          };
        }
      });

      if (currentGroup) {
        aggregated.push({ ...currentGroup });
      }

      const dailyAggregatedEvents = aggregated.map((group, index) => {
        const event = {
          id: `daily-aggregated-${index}`,
          title: `${group.workOrder} | ${group.trailerType} | ${Array.from(group.specificTasks).join(', ') || 'N/A'}`,
          start: group.start,
          end: group.end,
          allDay: false,
          resource: {
            workOrder: group.workOrder,
            trailerType: group.trailerType,
            specificTasks: Array.from(group.specificTasks),
            duration: group.duration,
          },
          isAggregated: true,
        };


        console.log(`Aggregated Day Event [${index}]:`, event.resource);

        return event;
      });

      events = events.concat(dailyAggregatedEvents);
    }

    if (calendarView !== 'month' && calendarView !== 'week' && calendarView !== 'day') {
      const individualEvents = currentEmployee.activityLog.map((log, index) => {
        const start = new Date(log.startTime);
        let end = new Date(log.endTime);
        if (!isValidDate(end)) {
          end = new Date();
        }

        if (!isValidDate(start) || !isValidDate(end)) {
          console.warn(`Invalid date for log ID ${index}:`, log);
          return null;
        }

        return {
          id: index,
          title: `${log.task || 'Task'} | ${log.workOrder || 'WO'}`,
          start,
          end,
          allDay: false,
          resource: { ...log },
          isAggregated: false,
        };
      }).filter(event => event !== null);

      events = events.concat(individualEvents);
    }

    if (currentEmployee.activeTask) {
      const active = currentEmployee.activeTask;
      const activeStart = new Date(active.startTime);
      let activeEnd = new Date(active.endTime || new Date());

      if (!isValidDate(activeEnd)) {
        activeEnd = new Date();
      }

      if (isValidDate(activeStart)) {
        const activeEvent = {
          id: `active-task-${activeStart.getTime()}`,
          title: `${active.workOrder} | ${active.trailerType} | ${active.specificTask}`,
          start: activeStart,
          end: activeEnd,
          allDay: false,
          resource: {
            workOrder: active.workOrder,
            trailerType: active.trailerType,
            specificTask: active.specificTask,
            duration: getDifference(active.startTime, activeEnd),
          },
          isAggregated: false,
          isActiveTask: true,
        };
        events.push(activeEvent);
      }
    }

    return events;
  }, [currentEmployee, calendarView, currentDate]);

  const events = calendarEvents;

  const CustomEvent = ({ event, view }) => {
    const { resource, isAggregated, isActiveTask } = event;

    let basicInfo = '';
    if (isActiveTask) {
      basicInfo = `${resource.workOrder} | ${resource.trailerType} | ${formatDuration(resource.duration)}`;
    } else if (isAggregated) {
      basicInfo = `${resource.workOrder} | ${resource.trailerType} | ${formatDuration(resource.duration)}`;
    } else {
      basicInfo = `${resource.workOrder} | ${resource.trailerType} | ${formatDuration(getDifference(resource.startTime, resource.endTime))}`;
    }


    const specificTasksDisplay = isAggregated
      ? (resource.specificTasks ? resource.specificTasks.join(', ') : 'N/A')
      : (resource.specificTask || 'N/A');

    return (
      <Tooltip
        title={
          <React.Fragment>
            <Typography variant="subtitle2">{event.title}</Typography>
            <Typography variant="body2">
              Start: {isValidDate(new Date(event.start)) ? format(new Date(event.start), 'PPpp') : 'N/A'}
            </Typography>
            <Typography variant="body2">
              End: {isValidDate(new Date(event.end)) ? format(new Date(event.end), 'PPpp') : 'N/A'}
            </Typography>
            <Typography variant="body2">
              {isAggregated || isActiveTask ? "Total Duration:" : "Duration:"} {formatDuration(resource.duration)}
            </Typography>
            <Typography variant="body2">
              Specific Task{isAggregated ? '(s)' : ''}: {specificTasksDisplay}
            </Typography>
            {/* Removed Other Employees from Tooltip */}
          </React.Fragment>
        }
        arrow
      >
        <div>{basicInfo}</div>
      </Tooltip>
    );
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#3174ad';
    let borderColor = '#3174ad';

    if (event.isActiveTask) {
      backgroundColor = 'var(--datewarning)';
      borderColor = '#4caf50';
    } else if (event.isAggregated) {
      backgroundColor = '#1976d2';
      borderColor = '#1976d2';
    }

    const style = {
      backgroundColor,
      borderColor,
      color: 'white',
      borderRadius: '0px',
      border: 'solid 1px',
      padding: '2px',
    };
    return {
      style,
    };
  };

  return (
    <Container maxWidth={false}>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Employee Information
        </Typography>

        {/* Split layout using Grid container */}
        <Grid container spacing={3}>
          {/* Left Side: Search and Basic Info */}
          <Grid item md={2.5}>
            {/* Search Form */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Employee ID"
                    name="employeeID"
                    value={form.employeeID}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>

            {/* Snackbar for messages */}
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={() => setOpen(false)} severity={severity}>
                {message}
              </Alert>
            </Snackbar>

            {/* Loading Indicator */}
            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  minHeight: "100px",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <CircularProgress
                  size={65}
                  thickness={4}
                  sx={{ color: "primary" }}
                />
              </Box>
            )}

            {/* Employee Basic Info */}
            {currentEmployee && (
              <Box mt={3}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {currentEmployee.firstName} {currentEmployee.lastName}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Grid>

          {/* Right Side: Calendar and Views */}
          <Grid item md={9.5}>
            {currentEmployee && (
              <Box>
                {/* Toggle Buttons for View Mode */}
                <Box mb={2} display="flex" justifyContent="flex-end">
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewModeChange}
                    aria-label="view mode"
                  >
                    <ToggleButton value="calendar" aria-label="calendar view">
                      <CalendarTodayIcon />
                      <Typography variant="button" sx={{ ml: 1 }}>Calendar</Typography>
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                      <ListIcon />
                      <Typography variant="button" sx={{ ml: 1 }}>List</Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                {/* List View */}
                {viewMode === 'list' && currentEmployee.activityLog?.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                      Activity Logs
                    </Typography>
                    <Paper>
                      <Box maxHeight="fluid" overflow="auto">
                        <Table size="small" aria-label="activity logs table">
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Date</strong></TableCell>
                              <TableCell><strong>Start Time</strong></TableCell>
                              <TableCell><strong>End Time</strong></TableCell>
                              <TableCell><strong>Duration</strong></TableCell>
                              <TableCell><strong>Work Order</strong></TableCell>
                              <TableCell><strong>Trailer Type</strong></TableCell>
                              <TableCell><strong>Task</strong></TableCell>
                              <TableCell><strong>Specific Task</strong></TableCell>
                              {/* Removed "Other Employees" column */}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {currentEmployee.activityLog
                              .slice()
                              .reverse()
                              .map((log, index) => {
                                const startTime = new Date(log.startTime);
                                let endTime = new Date(log.endTime);
                                if (!isValidDate(endTime)) {
                                  endTime = new Date();
                                }
                                let duration = getDifference(
                                  log.startTime,
                                  log.endTime
                                );
                                const date = isValidDate(startTime) ? format(startTime, "MM/dd/yyyy") : "N/A";
                                const startTimeFormatted = isValidDate(startTime) ? format(startTime, "hh:mm a") : "N/A";
                                const endTimeFormatted = isValidDate(endTime) ? format(endTime, "hh:mm a") : "N/A";

                                return (
                                  <TableRow key={index}>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>{startTimeFormatted}</TableCell>
                                    <TableCell>{endTimeFormatted}</TableCell>
                                    <TableCell>{formatDuration(duration)}</TableCell>
                                    <TableCell>{log.workOrder || "N/A"}</TableCell>
                                    <TableCell>{log.trailerType || "N/A"}</TableCell>
                                    <TableCell>{log.task || "N/A"}</TableCell>
                                    <TableCell>
                                      {log.specificTask || "N/A"}
                                    </TableCell>
                                    {/* Removed "Other Employees" cell */}
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </Box>
                    </Paper>
                  </Box>
                )}

                {/* Calendar View */}
                {viewMode === 'calendar' && (
                  <Box mt={2} className="custom-calendar">
                    {/* Display total hours worked when in 'week' view */}
                    {calendarView === 'week' && (
                      <Box mb={2}>
                        <Typography variant="h6" gutterBottom color="primary">
                          Total hours worked the week of {format(addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), 1), "MM/dd/yyyy")}: {(totalMinutesWeek / 60).toFixed(2)} hours
                        </Typography>
                      </Box>
                    )}

                    {/* Display total hours worked when in 'day' view */}
                    {calendarView === 'day' && (
                      <Box mb={2}>
                        <Typography variant="h6" gutterBottom color="primary">
                          Total hours worked on {format(currentDate, "MM/dd/yyyy")}: {(totalMinutesDay / 60).toFixed(2)} hours
                        </Typography>
                      </Box>
                    )}

                    <Calendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 900 }}
                      step={15}
                      timeslots={4}
                      tooltipAccessor={null}
                      components={{
                        event: CustomEvent,
                      }}
                      onNavigate={handleCalendarNavigate}
                      onView={handleCalendarViewChange}
                      view={calendarView}
                      date={currentDate}
                      popup
                      eventPropGetter={eventStyleGetter}
                      formats={{
                        eventTimeRangeFormat: () => '',
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
