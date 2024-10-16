import * as React from "react";
import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import axios from "axios";
import DetailedInfoDialog from "../components/DetailedInfoDialog";
import { parseISO, parse } from "date-fns";
import Image from "next/image";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { subDays, startOfDay, endOfDay, isAfter } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  FormControl,
  InputLabel,
  Select,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Cell,
  TableHead,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Tooltip as TT } from "recharts";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import withAuth from "../components/WithAuth";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MuiDrawer from "@mui/material/Drawer";

import {
  subWeeks,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  differenceInMinutes,
  formatDistanceToNow,
} from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import ChartDetailedInfoDialog from "../components/ChartDetailedInfoDialog";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Home = () => {
  const [chartDialogOpen, setChartDialogOpen] = useState(false);
  const [chartDialogData, setChartDialogData] = useState([]);
  const [chartDialogLoading, setChartDialogLoading] = useState(false);
  const [chartDialogError, setChartDialogError] = useState(null);
  const [chartDialogDate, setChartDialogDate] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  const handleDownloadShortcut = () => {
    const fileName = 'AllEquipTracking.url';
    const url = 'https://trackingnew.vercel.app/';
    const iconUrl = 'https://raw.githubusercontent.com/AryaBiglari/testy/main/logo.ico'; // Absolute URL to the .ico file

    const content = `[InternetShortcut]
  URL=${url}
  IconFile=${iconUrl}
  IconIndex=0
  `;

    const blob = new Blob([content], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append to body temporarily
    document.body.appendChild(link);

    // Trigger click
    link.click();

    // Remove from body
    document.body.removeChild(link);

    // Open Snackbar
    setSnackbarOpen(true);
  };






  const handleBarClick = async (data, index) => {
    let fromDate, toDate;

    if (interval === "week") {
      fromDate = data.date;
      toDate = format(addDays(parseISO(data.date), 6), "yyyy-MM-dd");
    } else {
      toDate = data.date;
      fromDate = data.date;
    }

    console.log("=== HandleBarClick Triggered ===");
    console.log("From Date:", fromDate, "To Date:", toDate);

    setChartDialogDate(fromDate);
    setChartDialogOpen(true);
    setChartDialogLoading(true);
    setChartDialogError(null);
    setChartDialogData([]);

    try {

      const completionsApiUrl = "/api/completions/completionsChart";
      const completionsApiParams = {
        from: fromDate,
        to: toDate,
        interval,
      };

      console.log("Fetching completions data from API...");
      const completionsResponse = await axios.get(completionsApiUrl, {
        params: completionsApiParams,
      });


      if (
        !completionsResponse.data ||
        !Array.isArray(completionsResponse.data.detailedData)
      ) {
        console.error("Invalid completions API response structure.");
        throw new Error("Invalid completions API response structure.");
      }

      console.log("=== Completions API Response ===");
      console.log(completionsResponse);


      const employeeIDs = [
        ...new Set(
          completionsResponse.data.detailedData.flatMap((item) =>
            Array.isArray(item.employees)
              ? item.employees.map((emp) => emp.employeeID)
              : []
          )
        ),
      ];

      console.log("=== Extracted Employee IDs ===");
      console.log(employeeIDs);

      let employeeMap = {};


      if (employeeIDs.length > 0) {
        const employeesApiUrl = "/api/employees/employeesInfo";
        const employeesApiParams = {
          employeeIDs: employeeIDs.join(","),
        };

        console.log("Fetching employees data from API...");
        const employeesResponse = await axios.get(employeesApiUrl, {
          params: employeesApiParams,
        });

        console.log("=== Employees API Response ===");
        console.log(employeesResponse);

        if (!Array.isArray(employeesResponse.data)) {
          throw new Error("Invalid employees API response structure.");
        }

        const employeesData = employeesResponse.data;

        console.log("=== Employees Data Array ===");
        console.log(employeesData);


        employeeMap = employeesData.reduce((map, employee) => {
          map[employee.employeeID] = employee;
          return map;
        }, {});

        console.log("=== Employee Map ===");
        console.log(employeeMap);
      } else {
        console.log("No Employee IDs found in completions data.");
      }


      console.log("t2", completionsResponse);


      const enrichedDetailedData = completionsResponse.data.detailedData.map(
        (dataItem) => {
          console.log("YO", dataItem);
          const category = dataItem.category || "";


          const isTargetTask =
            dataItem.specificTask === "Front Slope" &&
            normalizeWorkOrder(dataItem.workOrder) === "47677";

          if (isTargetTask) {
            console.log("\n--- Processing Target Task ---");
            console.log("Data Item:", dataItem);
          }

          const employees = Array.isArray(dataItem.employees)
            ? dataItem.employees
            : [];


          const enrichedEmployees = employees
            .map((employee) => {
              const empId = employee.employeeID;
              const empData = employeeMap[empId];

              if (isTargetTask) {
                console.log(`\nProcessing Employee ID: ${empId}`);
                console.log("Employee Data:", empData);
              }

              let timeWorked = 0;
              let relevantLogs = [];

              if (
                empData &&
                empData.activityLog &&
                Array.isArray(empData.activityLog)
              ) {

                relevantLogs = empData.activityLog.filter((log) => {
                  if (!log.startTime || !log.endTime) {
                    if (isTargetTask) {
                      console.log(
                        "Log missing startTime or endTime. Skipping log:",
                        log
                      );
                    }
                    return false;
                  }

                  const logStart = parseDateString(log.startTime);
                  const logEnd = parseDateString(log.endTime);

                  if (!logStart || !logEnd) {
                    if (isTargetTask) {
                      console.log(
                        "Failed to parse log dates. Skipping log:",
                        log
                      );
                    }
                    return false;
                  }

                  let isCategoryMatch = false;
                  const logTask = log.task
                    ? log.task.trim().toLowerCase()
                    : "";
                  const categoryLower = category.trim().toLowerCase();

                  switch (categoryLower) {
                    case "frames":
                      isCategoryMatch = logTask === "frames";
                      break;
                    case "walls":
                      isCategoryMatch = logTask === "walls";
                      break;
                    case "boxes":
                      isCategoryMatch = logTask === "boxes";
                      break;
                    case "trailers":
                      isCategoryMatch = logTask === "trailers";
                      break;
                    case "finishing":
                      isCategoryMatch = logTask === "finishing";
                      break;
                    default:
                      isCategoryMatch = false;
                  }

                  if (!isCategoryMatch) {
                    if (isTargetTask) {
                      console.log(
                        `Category mismatch: logTask (${logTask}) vs category (${categoryLower}). Skipping log.`
                      );
                    }
                    return false;
                  }

                  const logWorkOrder = normalizeWorkOrder(log.workOrder);
                  const dataItemWorkOrder = normalizeWorkOrder(
                    dataItem.workOrder
                  );

                  if (isTargetTask) {
                    console.log(
                      `Normalized Work Orders: logWorkOrder (${logWorkOrder}) vs dataItemWorkOrder (${dataItemWorkOrder} vs (${dataItem.workOrder}))`
                    );
                  }


                  if (logWorkOrder === "47677") {
                    console.log("=== Specific Work Order 47677 Detected ===");
                    console.log("logWorkOrder:", logWorkOrder);
                    console.log("dataItemWorkOrder:", dataItemWorkOrder);
                    console.log(dataItem);
                  }

                  const isWorkOrderMatch = logWorkOrder === dataItemWorkOrder;
                  if (isTargetTask) {
                    console.log(`Work Order Match: ${isWorkOrderMatch}`);
                  }

                  if (!isWorkOrderMatch) {
                    if (isTargetTask) {
                      console.log("Work Order does not match. Skipping log.");
                    }
                    return false;
                  }

                  let isSpecificTaskMatch = false;
                  switch (categoryLower) {
                    case "frames":
                      isSpecificTaskMatch =
                        log.specificTask &&
                        dataItem.type &&
                        (log.specificTask
                          .trim()
                          .toLowerCase()
                          .includes(dataItem.type.trim().toLowerCase()) ||
                          dataItem.type
                            .trim()
                            .toLowerCase()
                            .includes(
                              log.specificTask.trim().toLowerCase()
                            ));
                      break;
                    case "walls":
                      isSpecificTaskMatch =
                        log.specificTask &&
                        dataItem.wallType &&
                        (log.specificTask
                          .trim()
                          .toLowerCase()
                          .includes(dataItem.wallType.trim().toLowerCase()) ||
                          dataItem.wallType
                            .trim()
                            .toLowerCase()
                            .includes(
                              log.specificTask.trim().toLowerCase()
                            ));
                      break;
                    case "boxes":
                    case "trailers":
                      isSpecificTaskMatch = true;
                      break;
                    default:
                      isSpecificTaskMatch = false;
                  }

                  if (isTargetTask) {
                    console.log(
                      `Specific Task Match: ${isSpecificTaskMatch}`
                    );
                  }

                  if (!isSpecificTaskMatch) {
                    if (isTargetTask) {
                      console.log(
                        "Specific Task does not match. Skipping log."
                      );
                    }
                    return false;
                  }

                  if (isTargetTask) {
                    console.log("Log is relevant:", log);
                  }

                  return true;
                });

                if (isTargetTask) {
                  console.log(
                    `Relevant Logs Count for Employee ID ${empId}:`,
                    relevantLogs.length
                  );
                }

                if (relevantLogs.length > 0) {
                  const compDate = parseDateString(dataItem.completedDate);
                  const adjustedLogs = relevantLogs.map((log) => {
                    let logStart = parseDateString(log.startTime);
                    let logEnd = parseDateString(log.endTime);

                    if (compDate && logEnd > compDate) {
                      if (isTargetTask) {
                        console.log(
                          `Adjusting logEnd for log: Original End (${logEnd}) > compDate (${compDate})`
                        );
                      }
                      logEnd = compDate;
                    }

                    return { ...log, logStart, logEnd };
                  });

                  if (isTargetTask) {
                    console.log("Adjusted Logs:", adjustedLogs);
                  }

                  const mergedIntervals = mergeIntervals(
                    adjustedLogs.map((log) => [
                      log.logStart.getTime(),
                      log.logEnd.getTime(),
                    ])
                  );

                  if (isTargetTask) {
                    console.log("Merged Intervals:", mergedIntervals);
                  }

                  timeWorked = mergedIntervals.reduce((acc, interval) => {
                    const diffMs = interval[1] - interval[0];
                    const diffSeconds = Math.floor(diffMs / 1000);
                    return acc + diffSeconds;
                  }, 0);

                  if (isTargetTask) {
                    console.log(
                      `Total Time Worked for Employee ID ${empId}: ${timeWorked} seconds`
                    );
                  }
                }
              }

              return {
                ...employee,
                timeWorked,
                relevantLogs,
              };
            })
            .filter((employee) => {
              const hasRelevantLogs =
                employee.relevantLogs && employee.relevantLogs.length > 0;
              if (isTargetTask && !hasRelevantLogs) {
                console.log(
                  `Employee ID ${employee.employeeID} has no relevant logs.`
                );
              }
              return hasRelevantLogs;
            });

          if (isTargetTask) {
            console.log(
              `Enriched Employees for Work Order ${dataItem.workOrder}:`,
              enrichedEmployees
            );
          }

          return {
            ...dataItem,
            employees: enrichedEmployees,
          };
        }
      );

      console.log("=== Enriched Detailed Data ===");
      console.log(enrichedDetailedData);


      const targetTask = enrichedDetailedData.find(
        (item) =>
          item.specificTask === "Front Slope" &&
          normalizeWorkOrder(item.workOrder) === "47677"
      );

      if (targetTask) {
        console.log("=== Target Task Found ===");
        console.log("Target Task Data:", targetTask);
        console.log(
          "Employees Involved:",
          targetTask.employees.map((emp) => emp.name).join(", ")
        );
        const totalManpowerSeconds = targetTask.employees.reduce(
          (acc, emp) => acc + emp.timeWorked,
          0
        );
        const totalManpowerMinutes = Math.floor(totalManpowerSeconds / 60);
        const remainingSeconds = totalManpowerSeconds % 60;
        console.log(
          `Total Manpower: ${totalManpowerMinutes}h ${remainingSeconds}m`
        );
      } else {
        console.log("=== Target Task Not Found ===");
      }

      setChartDialogData(enrichedDetailedData);
    } catch (error) {
      if (error.response) {
        console.error("API Error Response:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        setChartDialogError(
          error.response.data?.message ||
          "Failed to load detailed data. Please try again."
        );
      } else if (error.request) {
        console.error("No response received from API:", error.request);
        setChartDialogError(
          "No response from server. Please check your network connection."
        );
      } else {
        console.error("Error Setting Up API Request:", error.message);
        setChartDialogError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setChartDialogLoading(false);
      console.log("=== HandleBarClick Completed ===\n");
    }
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenTracking(false);
  };

  const [openTracking, setOpenTracking] = React.useState(false);

  const handleClickTracking = () => {
    setOpenTracking(!openTracking);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifMenuOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifMenuClose = () => {
    setNotifAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.setItem("isAuthenticated", "false");

    router.push("/login");
  };

  const [counts, setCounts] = useState({
    thisWeek: {
      sideWallsCount: 0,
      otherWallsCount: 0,
      framesCount: 0,
      boxesCount: 0,
      trailersCount: 0,
    },
    lastWeek: {
      sideWallsCount: 0,
      otherWallsCount: 0,
      framesCount: 0,
      boxesCount: 0,
      trailersCount: 0,
    },
    average: 0,
  });
  const [errorLogs, setErrorLogs] = useState(null);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogCategory, setDialogCategory] = useState("");
  const [dialogWeek, setDialogWeek] = useState("");
  const [dialogWallType, setDialogWallType] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState(null);
  const [employeeTimes, setEmployeeTimes] = useState({});
  const [logs, setLogs] = useState([]);
  const [fromDate, setFromDate] = useState(new Date("2024-09-30"));
  const [toDate, setToDate] = useState(new Date());
  const [interval, setInterval] = useState("week");
  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);
  const [errorChart, setErrorChart] = useState(null);
  const [recentEventsOpen, setRecentEventsOpen] = useState(false);

  const handleRecentEventsOpen = () => {
    setRecentEventsOpen(true);
  };

  const handleRecentEventsClose = () => {
    setRecentEventsOpen(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  const generateDateRange = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    const stopDate = new Date(endDate);

    while (currentDate <= stopDate) {
      dateArray.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const ensureAllDates = (fetchedData, from, to) => {
    const allDates = generateDateRange(from, to);
    const dataMap = fetchedData.reduce((acc, item) => {
      acc[formatDate(item.date)] = item;
      return acc;
    }, {});

    return allDates.map((date) => ({
      date,
      sideWallsCount: dataMap[date]?.sideWallsCount || 0,
      otherWallsCount: dataMap[date]?.otherWallsCount || 0,
      framesCount: dataMap[date]?.framesCount || 0,
      boxesCount: dataMap[date]?.boxesCount || 0,
      trailersCount: dataMap[date]?.trailersCount || 0,
    }));
  };

  function parseDateString(dateString) {
    let date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }

    const dateFormatString = "M/d/yyyy, h:mm:ss a";
    date = parse(dateString, dateFormatString, new Date());
    if (!isNaN(date.getTime())) {
      return date;
    }

    return null;
  }
  function normalizeWorkOrder(str) {
    return str ? str.replace(/\s+/g, " ").trim().toLowerCase() : "";
  }

  const handleOpenDialog = async (category, week, wallType = null) => {
    setDialogCategory(category);
    setDialogWallType(wallType);
    setDialogWeek(week);
    setDialogOpen(true);
    setLoadingDetail(true);
    setErrorDetail(null);
    setDetailedData([]);

    let fromDate, toDate;
    if (week === "thisWeek") {
      const now = new Date();
      const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
      fromDate = startOfDay(thisWeekStart);
      toDate = endOfDay(now);
    } else if (week === "lastWeek") {
      const now = new Date();
      const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
      const lastWeekStart = subWeeks(thisWeekStart, 1);
      const lastWeekEnd = subDays(thisWeekStart, 1);
      fromDate = startOfDay(lastWeekStart);
      toDate = endOfDay(lastWeekEnd);
    } else {
      const now = new Date();
      const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
      fromDate = startOfDay(thisWeekStart);
      toDate = endOfDay(now);
    }

    const from = format(fromDate, "yyyy-MM-dd");
    const to = format(toDate, "yyyy-MM-dd");

    try {
      const completionsApiUrl = "/api/completions/completions";
      const completionsApiParams = {
        from,
        to,
        detail: "true",
        category,
        wallType,
      };

      const completionsResponse = await axios.get(completionsApiUrl, {
        params: completionsApiParams,
      });

      if (
        !completionsResponse.data ||
        !Array.isArray(completionsResponse.data.detailedData)
      ) {
        throw new Error("Invalid completions API response structure.");
      }

      const employeeIDs = [
        ...new Set(
          completionsResponse.data.detailedData.flatMap((item) =>
            Array.isArray(item.employees)
              ? item.employees.map((emp) => emp.employeeID)
              : []
          )
        ),
      ];

      let employeeMap = {};

      console.log("HERE", employeeIDs);

      if (employeeIDs.length > 0) {
        const employeesApiUrl = "/api/employees/employeesInfo";
        const employeesApiParams = {
          employeeIDs: employeeIDs.join(","),
        };

        const employeesResponse = await axios.get(employeesApiUrl, {
          params: employeesApiParams,
        });

        if (!Array.isArray(employeesResponse.data)) {
          throw new Error("Invalid employees API response structure.");
        }

        const employeesData = employeesResponse.data;
        console.log("HERE2", employeesData);

        employeeMap = employeesData.reduce((map, employee) => {
          map[employee.employeeID] = employee;
          return map;
        }, {});
        console.log("HERE3", employeeMap);
      }

      const enrichedDetailedData = completionsResponse.data.detailedData.map(
        (dataItem) => {
          const employees = Array.isArray(dataItem.employees)
            ? dataItem.employees
            : [];

          const enrichedEmployees = employees
            .map((employee) => {
              const empId = employee.employeeID;
              const empData = employeeMap[empId];

              let timeWorked = 0;
              let relevantLogs = [];

              if (
                empData &&
                empData.activityLog &&
                Array.isArray(empData.activityLog)
              ) {
                relevantLogs = empData.activityLog.filter((log) => {
                  if (!log.startTime || !log.endTime) {
                    return false;
                  }

                  const logStart = parseDateString(log.startTime);
                  const logEnd = parseDateString(log.endTime);

                  if (!logStart || !logEnd) {
                    return false;
                  }

                  let isCategoryMatch = false;
                  const logTask = log.task ? log.task.trim().toLowerCase() : "";
                  const categoryLower = category.trim().toLowerCase();
                  switch (categoryLower) {
                    case "frames":
                      isCategoryMatch = logTask === "frames";
                      break;
                    case "walls":
                      isCategoryMatch = logTask === "walls";
                      break;
                    case "boxes":
                      isCategoryMatch = logTask === "boxes";
                      break;
                    case "trailers":
                      isCategoryMatch = logTask === "trailers";
                      break;
                    case "finishing":
                      isCategoryMatch = logTask === "finishing";
                      break;
                    default:
                      isCategoryMatch = false;
                  }

                  if (!isCategoryMatch) {
                    return false;
                  }

                  const logWorkOrder = normalizeWorkOrder(log.workOrder);
                  const dataItemWorkOrder = normalizeWorkOrder(
                    dataItem.workOrder
                  );

                  const isWorkOrderMatch = logWorkOrder === dataItemWorkOrder;

                  if (!isWorkOrderMatch) {
                    return false;
                  }

                  let isSpecificTaskMatch = false;
                  switch (categoryLower) {
                    case "frames":
                      isSpecificTaskMatch =
                        log.specificTask &&
                        dataItem.type &&
                        (log.specificTask
                          .trim()
                          .toLowerCase()
                          .includes(dataItem.type.trim().toLowerCase()) ||
                          dataItem.type
                            .trim()
                            .toLowerCase()
                            .includes(log.specificTask.trim().toLowerCase()));
                      break;
                    case "walls":
                      isSpecificTaskMatch =
                        log.specificTask &&
                        dataItem.wallType &&
                        (log.specificTask
                          .trim()
                          .toLowerCase()
                          .includes(dataItem.wallType.trim().toLowerCase()) ||
                          dataItem.wallType
                            .trim()
                            .toLowerCase()
                            .includes(log.specificTask.trim().toLowerCase()));
                      break;
                    case "boxes":
                      isSpecificTaskMatch = true;
                      break;
                    case "trailers":
                      isSpecificTaskMatch = true;
                      break;
                    default:
                      isSpecificTaskMatch = false;
                  }

                  if (!isSpecificTaskMatch) {
                    return false;
                  }

                  return true;
                });

                if (relevantLogs.length > 0) {
                  const compDate = parseDateString(dataItem.completedDate);
                  const adjustedLogs = relevantLogs.map((log) => {
                    let logStart = parseDateString(log.startTime);
                    let logEnd = parseDateString(log.endTime);

                    if (compDate && logEnd > compDate) {
                      logEnd = compDate;
                    }

                    return { ...log, logStart, logEnd };
                  });

                  const mergedIntervals = mergeIntervals(
                    adjustedLogs.map((log) => [
                      log.logStart.getTime(),
                      log.logEnd.getTime(),
                    ])
                  );

                  timeWorked = mergedIntervals.reduce((acc, interval) => {
                    const diffMs = interval[1] - interval[0];
                    const diffSeconds = Math.floor(diffMs / 1000);
                    return acc + diffSeconds;
                  }, 0);
                }
              }

              return {
                ...employee,
                timeWorked,
                relevantLogs,
              };
            })
            .filter((employee) => {
              const hasRelevantLogs =
                employee.relevantLogs && employee.relevantLogs.length > 0;
              return hasRelevantLogs;
            });

          return {
            ...dataItem,
            employees: enrichedEmployees,
          };
        }
      );

      setDetailedData(enrichedDetailedData);
    } catch (error) {
      if (error.response) {
        console.error("API Error Response:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        setErrorDetail(
          error.response.data?.message ||
          "Failed to load detailed data. Please try again."
        );
      } else if (error.request) {
        console.error("No response received from API:", error.request);
        setErrorDetail(
          "No response from server. Please check your network connection."
        );
      } else {
        console.error("Error Setting Up API Request:", error.message);
        setErrorDetail("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  function normalizeWorkOrder(workOrder) {
    if (!workOrder) return "";
    return workOrder.toString().trim().toLowerCase().replace(/\s+/g, " ");
  }

  function mergeIntervals(intervals) {
    if (!intervals.length) return [];

    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
      const prev = merged[merged.length - 1];
      const current = intervals[i];

      if (current[0] <= prev[1]) {
        prev[1] = Math.max(prev[1], current[1]);
      } else {
        merged.push(current);
      }
    }

    return merged;
  }

  function parseDateString(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDetailedData([]);
    setDialogCategory("");
    setDialogWeek("");
    setErrorDetail(null);
    setEmployeeTimes(0);
  };

  useEffect(() => {
    async function fetchCompletionLogs() {
      setLoadingLogs(true);
      setErrorLogs(null);

      try {
        const now = new Date();
        const threeDaysAgo = subDays(now, 3);
        const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
        const lastWeekStart = subWeeks(thisWeekStart, 1);
        const lastWeekEnd = subDays(thisWeekStart, 1);

        const thisWeekFrom = format(startOfDay(thisWeekStart), "yyyy-MM-dd");
        const thisWeekTo = format(endOfDay(now), "yyyy-MM-dd");

        const lastWeekFrom = format(startOfDay(lastWeekStart), "yyyy-MM-dd");
        const lastWeekTo = format(endOfDay(lastWeekEnd), "yyyy-MM-dd");

        const [thisWeekFrames, thisWeekBoxes, thisWeekWalls, thisWeekTrailers] =
          await Promise.all([
            axios.get(`/api/completions/completions`, {
              params: {
                from: thisWeekFrom,
                to: thisWeekTo,
                detail: "true",
                category: "frames",
              },
            }),
            axios.get(`/api/completions/completions`, {
              params: {
                from: thisWeekFrom,
                to: thisWeekTo,
                detail: "true",
                category: "boxes",
              },
            }),
            axios.get(`/api/completions/completions`, {
              params: {
                from: thisWeekFrom,
                to: thisWeekTo,
                detail: "true",
                category: "walls",
              },
            }),
            axios.get(`/api/completions/completions`, {
              params: {
                from: thisWeekFrom,
                to: thisWeekTo,
                detail: "true",
                category: "trailers",
              },
            }),
          ]);

        const [lastWeekFrames, lastWeekBoxes, lastWeekWalls, lastWeekTrailers] =
          await Promise.all([
            axios.get(`/api/completions/completions`, {
              params: {
                from: lastWeekFrom,
                to: lastWeekTo,
                detail: "true",
                category: "frames",
              },
            }),
            axios.get(`/api/completions/completions`, {
              params: {
                from: lastWeekFrom,
                to: lastWeekTo,
                detail: "true",
                category: "boxes",
              },
            }),
            axios.get(`/api/completions/completions`, {
              params: {
                from: lastWeekFrom,
                to: lastWeekTo,
                detail: "true",
                category: "walls",
              },
            }),
            axios.get(`/api/completions/completions`, {
              params: {
                from: lastWeekFrom,
                to: lastWeekTo,
                detail: "true",
                category: "trailers",
              },
            }),
          ]);

        const thisWeekData = [
          ...thisWeekFrames.data.detailedData,
          ...thisWeekBoxes.data.detailedData,
          ...thisWeekWalls.data.detailedData,
          ...thisWeekTrailers.data.detailedData,
        ];

        const lastWeekData = [
          ...lastWeekFrames.data.detailedData,
          ...lastWeekBoxes.data.detailedData,
          ...lastWeekWalls.data.detailedData,
          ...lastWeekTrailers.data.detailedData,
        ];

        const combinedCompletionData = [...thisWeekData, ...lastWeekData];

        const formattedCompletionLogs = combinedCompletionData.map((log) => {
          const startedDate = new Date(log.startedDate);
          const completedDate = new Date(log.completedDate);
          console.log(completedDate);
          const WO = log.workOrder || "N/A";
          const trailerType = log.trailerType || "N/A";
          const completionTime = differenceInMinutes(
            completedDate,
            startedDate
          );
          const formattedTime = `${Math.floor(completionTime / 60)}h ${completionTime % 60
            }m`;

          const timeAgo = formatDistanceToNow(completedDate, {
            addSuffix: true,
          });

          const customer = log.customer || "N/A";
          const trailerID = log.trailerID || "N/A";

          return {
            type: "Completion",
            workOrder: WO,
            workType: log.type || log.wallType || "Box",
            customer: customer,
            trailerType: trailerType,
            dateFinished: format(completedDate, "yyyy-MM-dd HH:mm"),
            timeTaken: formattedTime,
            timeAgo,
            completedDate,
            trailerID,
          };
        });

        const qualityCheckResponse = await axios.get(
          "/api/planning/qc-reports"
        );

        const formattedQCLogs = qualityCheckResponse.data
          .map((qc) => {
            const dateStr = qc.qualityInspection.finalCheckCompletedDate;
            const completedDate = dateStr ? new Date(dateStr) : null;

            if (!completedDate || isNaN(completedDate.getTime())) {
              console.warn(
                `Invalid or missing finalCheckCompletedDate for QC Report with Work Order: ${qc.workOrder}`
              );
              return null;
            }

            if (!isAfter(completedDate, threeDaysAgo)) {
              return null;
            }

            const timeAgo = formatDistanceToNow(completedDate, {
              addSuffix: true,
            });

            const issues = Array.isArray(qc.qualityInspection.issues)
              ? qc.qualityInspection.issues.join(", ")
              : "No issues reported";

            const customer =
              qc.customer?.name || qc.customer || "Unknown Customer";
            const trailerID = qc._id || "UnknownID";

            const trailerType =
              qc.trailerType ||
              (qc.qualityInspection && qc.qualityInspection.trailerType) ||
              "Not Available";

            console.log("XD", completedDate);

            return {
              type: "Quality Check",
              workOrder: qc.workOrder,
              workType: qc.type || qc.wallType || "Box",
              customer: customer,
              trailerType: trailerType,
              dateFinished: format(completedDate, "yyyy-MM-dd HH:mm"),
              timeTaken: "N/A",
              timeAgo,
              completedDate,
              trailerID,
            };
          })
          .filter((qcLog) => qcLog !== null);

        const combinedLogs = [...formattedCompletionLogs, ...formattedQCLogs];

        const filteredLogs = combinedLogs.filter((log) =>
          isAfter(log.completedDate, threeDaysAgo)
        );

        filteredLogs.sort((a, b) => b.completedDate - a.completedDate);

        setLogs(filteredLogs);
      } catch (error) {
        console.error(
          "Error fetching completion and quality check logs:",
          error
        );
        setErrorLogs("Failed to load recent events. Please try again later.");
      } finally {
        setLoadingLogs(false);
      }
    }

    fetchCompletionLogs();
  }, []);

  useEffect(() => {
    async function fetchCompletedData() {
      try {
        const now = new Date();

        const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });

        const lastWeekStart = subWeeks(thisWeekStart, 1);

        const lastWeekEnd = subDays(thisWeekStart, 1);

        const thisWeekFrom = formatDate(thisWeekStart);
        const thisWeekTo = formatDate(now);

        const lastWeekFrom = formatDate(lastWeekStart);
        const lastWeekTo = formatDate(lastWeekEnd);

        const [thisWeekResponse, lastWeekResponse] = await Promise.all([
          axios.get(
            `/api/completions/completions?from=${thisWeekFrom}&to=${thisWeekTo}`
          ),
          axios.get(
            `/api/completions/completions?from=${lastWeekFrom}&to=${lastWeekTo}`
          ),
        ]);

        const thisWeekData = thisWeekResponse.data;
        const lastWeekData = lastWeekResponse.data;

        setCounts({
          thisWeek: {
            sideWallsCount: thisWeekData.sideWallsCount,
            otherWallsCount: thisWeekData.otherWallsCount,
            framesCount: thisWeekData.framesCount,
            boxesCount: thisWeekData.boxesCount,
            trailersCount: thisWeekData.trailersCount,
          },
          lastWeek: {
            sideWallsCount: lastWeekData.sideWallsCount,
            otherWallsCount: lastWeekData.otherWallsCount,
            framesCount: lastWeekData.framesCount,
            boxesCount: lastWeekData.boxesCount,
            trailersCount: lastWeekData.trailersCount,
          },
          average: 0,
        });
      } catch (error) {
        console.error("Error fetching completed data:", error);
      }
    }

    fetchCompletedData();
  }, []);

  const fetchChartData = async () => {
    setLoadingChart(true);
    setErrorChart(null);
    try {
      const response = await axios.get("/api/completions/chartData", {
        params: {
          from: formatDate(fromDate),
          to: formatDate(toDate),
          interval,
        },
      });

      const fetchedData = response.data.data;

      if (!fetchedData || !Array.isArray(fetchedData)) {
        throw new Error("Invalid chart data format.");
      }
      let completeData;
      if (interval == "day") {
        completeData = ensureAllDates(
          fetchedData,
          formatDate(fromDate),
          formatDate(toDate)
        );
      } else {
        completeData = fetchedData;
      }

      let adjustedData;
      if (interval == "day") {
        adjustedData = completeData.map((item) => ({
          ...item,
          date: format(addDays(new Date(item.date), 2), "yyyy-MM-dd"),
        }));
      } else {
        adjustedData = completeData.map((item) => ({
          ...item,
          date: format(addDays(new Date(item.date), 1), "yyyy-MM-dd"),
        }));
      }

      setChartData(adjustedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setErrorChart("Failed to load chart data. Please try again.");
    } finally {
      setLoadingChart(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [fromDate, toDate, interval]);

  return (
    <Box sx={{ display: "flex" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          Shortcut downloaded! Please move it to your desktop for easy access.
        </MuiAlert>
      </Snackbar>

      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Drawer Toggle Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            sx={{
              minWidth: "6rem",
              height: "100%",
              bgcolor: "orange",
              position: "relative",
              ml: -0.4,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image
              src="/platinumLogo.png"
              width={163.84}
              height={29.92}
              alt="logo"
              priority={true}
            />
          </Box>

          {/* Spacer to push icons to the right */}
          <Box sx={{ bgcolor: "red", flexGrow: 1 }}></Box>

          {/* Account and Notifications Icons */}
          {true && (
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Download Icon */}
              <IconButton
                color="inherit"
                aria-label="download shortcut"
                onClick={handleDownloadShortcut}
                edge="end"
                sx={{
                  marginLeft: 2,
                }}
              >
                <DownloadIcon sx={{ fontSize: "2rem"}}/>
              </IconButton>


              {/* Notifications Icon with Badge */}
              <IconButton
                color="inherit"
                aria-label="show new notifications"
                onClick={handleNotifMenuOpen}
                edge="end"
                sx={{
                  marginLeft: 3,
                }}
              >
                <Badge badgeContent={logs.length} color="secondary" >
                  <NotificationsIcon sx={{ fontSize: "2rem"}}/>
                </Badge>
              </IconButton>

              {/* User Account Icon */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx = {{
                  marginLeft: 3
                }}
                color="inherit"
              >
                <AccountCircle sx={{ fontSize: "2rem" }} />
              </IconButton>

              {/* Account Menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>

              {/* Notifications Menu */}
              <Menu
                id="menu-notifications"
                anchorEl={notifAnchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(notifAnchorEl)}
                onClose={handleNotifMenuClose}
                PaperProps={{
                  style: {
                    maxHeight: 400,
                    width: "90ch",
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="h6">Recent Events</Typography>
                </Box>
                <Divider />
                {loadingLogs ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                ) : errorLogs ? (
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2" color="error">
                      {errorLogs}
                    </Typography>
                  </Box>
                ) : logs.length === 0 ? (
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2">
                      No new notifications.
                    </Typography>
                  </Box>
                ) : (
                  logs.map((log, index) => (
                    <React.Fragment key={index}>
                      {log.type === "Quality Check" ? (
                        <MenuItem
                          component="a"
                          href={`/qc/${log.trailerID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ cursor: "pointer" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            {/* Left Side: Main Content */}
                            <Box>
                              <Typography variant="body2">
                                <strong>QC Report:</strong> {log.customer} |{" "}
                                {log.workOrder}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {log.timeAgo}
                              </Typography>
                            </Box>

                            {/* Right Side: Date */}
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ textAlign: "right" }}
                            >
                              {log.dateFinished}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ) : (
                        <MenuItem sx={{ cursor: "default" }}>
                          {" "}
                          {/* Non-clickable items with default cursor */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            {/* Left Side: Main Content */}
                            <Box>
                              <Typography variant="body2">
                                {log.trailerType}'s{" "}
                                <strong>{log.workType}</strong> Completed:{" "}
                                {log.customer} | {log.workOrder}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {log.timeAgo}
                              </Typography>
                            </Box>

                            {/* Right Side: Date */}
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ textAlign: "right" }}
                            >
                              {log.dateFinished}
                            </Typography>
                          </Box>
                        </MenuItem>
                      )}

                      {/* Divider between log items */}
                      {index < logs.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Tooltip title="Planning" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => window.open(`/planning`)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Planning"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="Schedule" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => window.open(`/schedule`)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Schedule"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          {/* <Tooltip title="Dashboard" placement="right" arrow>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => window.open(`/planning-dashboard`)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip> */}
          <Tooltip title="Tracking" placement="right" arrow>
            <ListItemButton
              onClick={handleClickTracking}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <OpenInNewIcon />
              </ListItemIcon>
              <ListItemText primary="Tracking" sx={{ opacity: open ? 1 : 0 }} />
              {openTracking && open ? (
                <ExpandLess />
              ) : open ? (
                <ExpandMore />
              ) : null}
            </ListItemButton>
          </Tooltip>
          <Collapse in={openTracking} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip title="Frames" placement="right" arrow>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => window.open(`/frames`)}
                >
                  <ListItemIcon>
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Frames" />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Walls" placement="right" arrow>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => window.open(`/walls`)}
                >
                  <ListItemIcon>
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Walls" />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Boxes" placement="right" arrow>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => window.open(`/boxes`)}
                >
                  <ListItemIcon>
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Boxes" />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Small Parts" placement="right" arrow>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => window.open(`/smallparts`)}
                >
                  <ListItemIcon>
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Small Parts" />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Finishing" placement="right" arrow>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => window.open(`/finishing`)}
                >
                  <ListItemIcon>
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Finishing" />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Parts Kits" placement="right" arrow>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => window.open(`/partkits`)}
                >
                  <ListItemIcon>
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Parts Kits" />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip title="Quality Checks" placement="right" arrow>
              <ListItemButton
                onClick={() => window.open(`/qc`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Quality Checks"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
        <Divider />
        <List>
          <Tooltip title="Cutting Materials Database" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/cutting`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Cutting Stock"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="General Parts Database" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/parts`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Parts Stock"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="Stock Control" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/stockcontrol`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Stock Control"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="Bending Docs" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/bending`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Bending Docs"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Tooltip title="Employee Logs" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/employee-tracker`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Employee Logs"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="Process Times" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/parthours`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Process Times"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="AI Tool" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/ai`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"AI Tool"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="VIN Calculator" placement="right" arrow>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => window.open(`/vincalculator`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <OpenInNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"VIN Calculator"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box sx={{ display: "none" }}>
          <Typography paragraph sx={{ fontWeight: "600" }}>
            Potential Dashboard information to be added (some options):
          </Typography>
          <Typography paragraph>
            Frames: (trailers/week and trailers/year current speed for frames) /
            hours per frame / cost per frame / weekly goal progress / Finished
            frames stock / Frames parts stock indicator / Active employees
          </Typography>
          <Typography paragraph>
            Walls: (trailers/week and trailers/year current speed for walls) /
            hours per wall / cost per wall / weekly goal progress / Finished
            walls stock / panels and rails stock indicators (+ expected life for
            the current stock) / Active employees
          </Typography>
          <Typography paragraph>
            Boxes: (trailers/week and trailers/year current speed for boxes) /
            hours per box and per box stages / cost per box / weekly goal
            progress / parts stock indicators / Active employees
          </Typography>
          <Typography paragraph>
            Finishing: (trailers/week and trailers/year current speed for
            finishing) / hours per finishing of a trailer / cost per finishing /
            weekly goal progress / parts stock indicators / Active employees
          </Typography>
          <Typography paragraph>
            Quality: average rate and number of quality deviations per trailer /
            quality deviations chart over time to see overall tendencies / pie
            chart for average deviations types
          </Typography>
          <Typography paragraph>
            Parts Stock: main parts low in stock / average stock indicatiors /
            total inventory cost and financial cost
          </Typography>
          <Typography paragraph>
            Sheets Stock: sheets low in stock / sheets stock avarage indicator /
            stock projection for sheets / minimum required orders
          </Typography>
        </Box>
        {/* Aggregation Controls */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Frames Completed */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{ bgcolor: "var(--golden)", color: "white", maxHeight: 250 }}
            >
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        colSpan={2}
                      >
                        Frames Completed
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => handleOpenDialog("frames", "thisWeek")}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("frames", "thisWeek");
                          }
                        }}
                      >
                        This Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                            textAlign: "center",
                          }}
                          onClick={() => handleOpenDialog("frames", "thisWeek")}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog("frames", "thisWeek");
                            }
                          }}
                        >
                          {counts.thisWeek.framesCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => handleOpenDialog("frames", "lastWeek")}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("frames", "lastWeek");
                          }
                        }}
                      >
                        Last Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                            textAlign: "center",
                          }}
                          onClick={() => handleOpenDialog("frames", "lastWeek")}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog("frames", "lastWeek");
                            }
                          }}
                        >
                          {counts.lastWeek.framesCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Walls Completed */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                bgcolor: "var(--secondary)",
                color: "white",
                maxHeight: 250,
              }}
            >
              <CardContent>
                <Table>
                  {/* Table Head for Headers */}
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      >
                        Walls Completed
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      >
                        Side Walls
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      >
                        Other Walls
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* This Week Row */}
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() =>
                          handleOpenDialog("walls", "thisWeek", "Side Wall")
                        }
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("walls", "thisWeek", "Side Wall");
                          }
                        }}
                      >
                        This Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() =>
                            handleOpenDialog("walls", "thisWeek", "Side Wall")
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog(
                                "walls",
                                "thisWeek",
                                "Side Wall"
                              );
                            }
                          }}
                        >
                          {counts.thisWeek.sideWallsCount}
                        </TableCell>
                      </Tooltip>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() =>
                            handleOpenDialog("walls", "thisWeek", "Other Wall")
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog(
                                "walls",
                                "thisWeek",
                                "Other Wall"
                              );
                            }
                          }}
                        >
                          {counts.thisWeek.otherWallsCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                    {/* Last Week Row */}
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() =>
                          handleOpenDialog("walls", "lastWeek", "Side Wall")
                        }
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("walls", "lastWeek", "Side Wall");
                          }
                        }}
                      >
                        Last Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() =>
                            handleOpenDialog("walls", "lastWeek", "Side Wall")
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog(
                                "walls",
                                "lastWeek",
                                "Side Wall"
                              );
                            }
                          }}
                        >
                          {counts.lastWeek.sideWallsCount}
                        </TableCell>
                      </Tooltip>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            textAlign: "center",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() =>
                            handleOpenDialog("walls", "lastWeek", "Other Wall")
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog(
                                "walls",
                                "lastWeek",
                                "Other Wall"
                              );
                            }
                          }}
                        >
                          {counts.lastWeek.otherWallsCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Boxes Completed */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{ bgcolor: "var(--error)", color: "white", maxHeight: 250 }}
            >
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        colSpan={2}
                      >
                        Boxes Completed
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => handleOpenDialog("boxes", "thisWeek")}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("boxes", "thisWeek");
                          }
                        }}
                      >
                        This Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() => handleOpenDialog("boxes", "thisWeek")}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog("boxes", "thisWeek");
                            }
                          }}
                        >
                          {counts.thisWeek.boxesCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => handleOpenDialog("boxes", "lastWeek")}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("boxes", "lastWeek");
                          }
                        }}
                      >
                        Last Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                          }}
                          onClick={() => handleOpenDialog("boxes", "lastWeek")}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog("boxes", "lastWeek");
                            }
                          }}
                        >
                          {counts.lastWeek.boxesCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{ bgcolor: "var(--bronze)", color: "white", maxHeight: 250 }}
            >
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        colSpan={2}
                      >
                        Trailers Completed
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => handleOpenDialog("trailers", "thisWeek")}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("trailers", "thisWeek");
                          }
                        }}
                      >
                        This Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                            textAlign: "center",
                          }}
                          onClick={() =>
                            handleOpenDialog("trailers", "thisWeek")
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog("trailers", "thisWeek");
                            }
                          }}
                        >
                          {counts.thisWeek.trailersCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "inherit",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => handleOpenDialog("trailers", "lastWeek")}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleOpenDialog("trailers", "lastWeek");
                          }
                        }}
                      >
                        Last Week
                      </TableCell>
                      <Tooltip title="View detailed information" arrow>
                        <TableCell
                          tabIndex={0}
                          sx={{
                            color: "inherit",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                            textAlign: "center",
                          }}
                          onClick={() =>
                            handleOpenDialog("trailers", "lastWeek")
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleOpenDialog("trailers", "lastWeek");
                            }
                          }}
                        >
                          {counts.lastWeek.trailersCount}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ p: 3 }}>
          {/* Controls */}
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            {/* From Date Picker */}
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              selectsStart
              startDate={fromDate}
              endDate={toDate}
              dateFormat="yyyy-MM-dd"
              customInput={
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "150px",
                    display: "flex",
                    alignItems: "center",
                    height: 48,
                  }}
                >
                  <Typography variant="body1">
                    From: {fromDate.toISOString().split("T")[0]}
                  </Typography>
                </Box>
              }
            />

            {/* To Date Picker */}
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              selectsEnd
              startDate={fromDate}
              endDate={toDate}
              minDate={fromDate}
              dateFormat="yyyy-MM-dd"
              customInput={
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "150px",
                    display: "flex",
                    alignItems: "center",
                    height: 48,
                  }}
                >
                  <Typography variant="body1">
                    To: {toDate.toISOString().split("T")[0]}
                  </Typography>
                </Box>
              }
            />

            {/* Interval Selector */}
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="interval-label">Interval</InputLabel>
              <Select
                sx={{ height: 48 }}
                labelId="interval-label"
                value={interval}
                label="Interval"
                onChange={(e) => setInterval(e.target.value)}
              >
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
              </Select>
            </FormControl>

            {/* Refresh Icon Button */}
            <IconButton
              onClick={fetchChartData}
              color="primary"
              aria-label="refresh chart"
            >
              <RefreshIcon />
            </IconButton>
          </Stack>

          {/* Loading and Error States */}
          {loadingChart && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Chart */}
          {!loadingChart && !errorChart && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                {/* Grid for better readability */}
                <CartesianGrid strokeDasharray="2 2" />

                {/* X and Y Axes */}
                <XAxis dataKey="date" />
                <YAxis />

                {/* Tooltip with vertical cursor */}
                <TT
                  cursor={{ fill: "rgba(136, 132, 216, 0.2)" }}
                  formatter={(value, name) => [value, name]}
                  labelFormatter={(label) => `Date: ${label}`}
                />

                {/* Legend */}
                <Legend />

                {/* Data Bars with onClick handlers */}
                <Bar
                  dataKey="sideWallsCount"
                  fill="var(--secondary)"
                  name="Side Walls"
                  onClick={handleBarClick}
                  style={{ cursor: "pointer" }}
                />
                <Bar
                  dataKey="otherWallsCount"
                  fill="var(--primary)"
                  name="Other Walls"
                  onClick={handleBarClick}
                  style={{ cursor: "pointer" }}
                />
                <Bar
                  dataKey="framesCount"
                  fill="var(--golden)"
                  name="Frames"
                  onClick={handleBarClick}
                  style={{ cursor: "pointer" }}
                />
                <Bar
                  dataKey="boxesCount"
                  fill="var(--error)"
                  name="Boxes"
                  onClick={handleBarClick}
                  style={{ cursor: "pointer" }}
                />
                <Bar
                  dataKey="trailersCount"
                  fill="var(--bronze)"
                  name="Trailers"
                  onClick={handleBarClick}
                  style={{ cursor: "pointer" }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          <DetailedInfoDialog
            open={dialogOpen}
            handleClose={handleCloseDialog}
            category={dialogCategory}
            week={dialogWeek}
            data={detailedData}
            loading={loadingDetail}
            error={errorDetail}
          />
          <ChartDetailedInfoDialog
            open={chartDialogOpen}
            handleClose={() => setChartDialogOpen(false)}
            date={chartDialogDate}
            data={chartDialogData}
            loading={chartDialogLoading}
            error={chartDialogError}
            interval={interval}
          />
        </Box>

        {/* <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["bar A", "bar B", "bar C"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [2, 5, 3],
              },
            ]}
            width={500}
            height={300}
          /> */}
      </Box>
    </Box>
  );
};

export default withAuth(Home);
