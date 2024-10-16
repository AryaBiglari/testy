
import React, { useContext, useState, useEffect, useCallback } from "react";
import { EmployeeContext } from "../employees/EmployeeContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    minWidth: "55%",
    maxWidth: "55%",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflow: "auto",
    paddingBottom: "2.6rem",
    display: "flex",
    flexDirection: "column",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function RenderEmployees(props) {
  const { allEmployees, loading, fetchEmployees } = useContext(EmployeeContext);
  const [frequentEmployees, setFrequentEmployees] = useState([]);
  const [addEmployee, setAddEmployee] = useState("");
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.openEmployeesWorking) {
      if (allEmployees.length === 0) {
        fetchEmployees();
      }
    }
  }, [props.openEmployeesWorking, allEmployees, fetchEmployees]);

  useEffect(() => {
    if (props.openEmployeesWorking && !loading) {
      initializeFrequentEmployees();
      setLocalLoading(false);
    }
  }, [allEmployees, props.openEmployeesWorking, loading]);

  const initializeFrequentEmployees = useCallback(() => {
    const activeEmployees = props?.activeEmployees || [];

    const initialFrequentEmployees = allEmployees.filter(
      (employee) =>
        employee.defaultTasks.includes(props.task) ||
        activeEmployees.some((active) => active.employeeID === employee.employeeID)
    );

    const updatedFrequentEmployees = initialFrequentEmployees.map((employee) => {
      const isActive = activeEmployees.some(
        (active) => active.employeeID === employee.employeeID
      );
      return { ...employee, selected: isActive };
    });

    setFrequentEmployees(updatedFrequentEmployees);
  }, [allEmployees, props.activeEmployees, props.task]);

  const handleSetFrequentEmployees = (employeeID, state) => {
    setFrequentEmployees((prev) =>
      prev.map((employee) =>
        employee.employeeID === employeeID ? { ...employee, selected: state } : employee
      )
    );
  };

  const handleAddEmployeeChange = (event) => {
    setAddEmployee(event.target.value);
  };

  const handleAddEmployee = (employeeID) => {
    if (
      !addEmployee ||
      !allEmployees.find((employee) => employee.employeeID === employeeID) ||
      frequentEmployees.find((employee) => employee.employeeID === employeeID)
    ) {
      return;
    }
    const selectedEmployee = allEmployees.find((employee) => employee.employeeID === employeeID);
    setFrequentEmployees((prev) => [...prev, { ...selectedEmployee, selected: true }]);
    setAddEmployee("");
  };

  const selectedEmployees = frequentEmployees.filter((employee) => employee.selected);


  const handleStartTask = async () => {

    const employeeIDs = selectedEmployees.map(emp => emp.employeeID);

    try {

      const response = await fetch('/api/employees/verifyAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeIDs }),
      });

      const result = await response.json();

      if (!response.ok) {

        setError(result.message || 'Some employees are busy.');
        return;
      }


      props.handleActiveEmployees(selectedEmployees);
      props.handleCloseEmployeesWorking();
      props.startTimer(selectedEmployees);
    } catch (error) {
      console.error('Error verifying employee availability:', error);
      setError('An unexpected error occurred while verifying employee availability.');
    }
  };

  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.openEmployeesWorking}
        onClose={props.handleCloseEmployeesWorking}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, display: "flex", justifyContent: "center" }}
          id="customized-dialog-title"
        >
          <Typography sx={{ fontSize: "1.4rem", fontWeight: "600" }}>
            {props.currentTrailer?.trailerType} {props.currentFrame} | WO:{" "}
            {props.currentTrailer?.workOrder}
          </Typography>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={props.handleCloseEmployeesWorking}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {loading || localLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                minWidth: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                mt: 1,
                paddingLeft: 3,
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "1.6rem", fontWeight: "600" }}>
                  {props.eng
                    ? "Select the Team for this Task"
                    : "Seleccione el equipo para esta tarea"}
                </Typography>
              </Box>
              <Box
                sx={{
                  minWidth: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  minHeight: "3rem",
                  mt: 3,
                  flexWrap: "wrap",
                }}
              >
                {frequentEmployees.map((employee) => (
                  <Button
                    color="success"
                    variant={employee.selected ? "contained" : "outlined"}
                    sx={{ mr: 4, mb: 4 }}
                    key={employee.employeeID}
                    onClick={() => handleSetFrequentEmployees(employee.employeeID, !employee.selected)}
                  >
                    {employee.firstName} {employee.lastName} ({employee.employeeID})
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  mt: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: 0,
                  }}
                >
                  <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic1"
                    label={props.eng ? "Add another employee" : "Añadir otro empleado"}
                    variant="outlined"
                    value={addEmployee}
                    onChange={handleAddEmployeeChange}
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        handleAddEmployee(addEmployee);
                      }
                    }}
                  />
                  <Button
                    sx={{ ml: 3 }}
                    variant="contained"
                    disabled={!addEmployee}
                    onClick={() => handleAddEmployee(addEmployee)}
                  >
                    {props.eng ? "Add" : "Agregar"}
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: 5,
                }}
              >
                <Button
                  disabled={selectedEmployees.length === 0}
                  sx={{ ml: 0, fontSize: "1.3rem" }}
                  variant="contained"
                  onClick={handleStartTask}
                >
                  {props.showStart
                    ? props.eng
                      ? "Start Task"
                      : "Iniciar Tarea"
                    : props.eng
                      ? "Resume Task"
                      : "Reanudar la Tarea"}
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </BootstrapDialog>

      {/* **Error Snackbar** */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
