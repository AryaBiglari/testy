
import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { EmployeeContext } from "../employees/EmployeeContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddEmployee = () => {
  const { fetchEmployees } = useContext(EmployeeContext);

  const [form, setForm] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    age: "",
    position: "",
    startDate: "",
    currentWage: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    skills: "",
    defaultTasks: [],
    authorityLevel: "",
  });

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  const defaultTaskOptions = [
    "Part Kits",
    "Frames",
    "Walls",
    "Boxes",
    "Finishing",
    "Small Parts",
  ];

  useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "defaultTasks") {
      setForm({ ...form, [name]: typeof value === "string" ? value.split(",") : value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employeeID) {
      setMessage("Employee ID is mandatory");
      setSeverity("error");
      return;
    }

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

      const data = await response.json();

      const newData = {
        employeeID: form.employeeID,
        firstName: form.firstName,
        lastName: form.lastName,
        age: parseInt(form.age),
        position: form.position,
        startDate: form.startDate,
        currentWage: parseFloat(form.currentWage),
        contactInfo: {
          email: form.email,
          phone: form.phone,
          address: {
            street: form.street,
            city: form.city,
            state: form.state,
            zip: form.zip,
          },
        },
        skills: form.skills.split(",").map((skill) => skill.trim()),
        defaultTasks: form.defaultTasks,
        authorityLevel: form.authorityLevel,
      };

      if (response.ok && data) {

        const updateResponse = await fetch("/api/employees/employeesInfo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeID: form.employeeID,
            updates: newData,
          }),
        });

        const updateResult = await updateResponse.json();

        if (updateResponse.ok) {
          setMessage(updateResult.message);
          setSeverity("success");
          fetchEmployees();
        } else {
          setMessage(updateResult.message || "Something went wrong");
          setSeverity("error");
        }
      } else {

        const createResponse = await fetch("/api/employees/employeesInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        const createResult = await createResponse.json();

        if (createResponse.ok) {
          setMessage(createResult.message);
          setSeverity("success");
          fetchEmployees();
        } else {
          setMessage(createResult.message || "Something went wrong");
          setSeverity("error");
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setMessage("An unexpected error occurred.");
      setSeverity("error");
    }
  };

  const handleDelete = async () => {
    if (!form.employeeID) {
      setMessage("Invalid ID");
      setSeverity("error");
      return;
    }

    try {
      const response = await fetch("/api/employees/employeesInfo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeID: form.employeeID }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setSeverity("success");
        fetchEmployees();
      } else {
        setMessage(result.message || "Something went wrong");
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      setMessage("An unexpected error occurred.");
      setSeverity("error");
    }
  };

  const handleGetEmployee = async () => {
    if (!form.employeeID) {
      setMessage("Invalid ID");
      setSeverity("error");
      return;
    }

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

      const data = await response.json();

      if (response.ok) {
        setForm({
          ...form,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          age: data.age || "",
          position: data.position || "",
          startDate: data.startDate || "",
          currentWage: data.currentWage || "",
          email: data.contactInfo?.email || "",
          phone: data.contactInfo?.phone || "",
          street: data.contactInfo?.address?.street || "",
          city: data.contactInfo?.address?.city || "",
          state: data.contactInfo?.address?.state || "",
          zip: data.contactInfo?.address?.zip || "",
          skills: data.skills?.join(", ") || "",
          defaultTasks: data.defaultTasks || [],
          authorityLevel: data.authorityLevel || "",
        });
        setMessage("Employee fetched successfully");
        setSeverity("success");
      } else {
        setMessage(data.message || "Employee not found");
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error in handleGetEmployee:", error);
      setMessage("An unexpected error occurred.");
      setSeverity("error");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add/Edit Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Employee ID */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Employee ID"
                name="employeeID"
                value={form.employeeID}
                onChange={handleChange}
              />
            </Grid>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </Grid>
            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
              />
            </Grid>
            {/* Position */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={form.position}
                onChange={handleChange}
              />
            </Grid>
            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.startDate}
                onChange={handleChange}
              />
            </Grid>
            {/* Current Wage */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Wage"
                name="currentWage"
                type="number"
                value={form.currentWage}
                onChange={handleChange}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </Grid>
            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Grid>
            {/* Street */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={form.street}
                onChange={handleChange}
              />
            </Grid>
            {/* City */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </Grid>
            {/* State */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </Grid>
            {/* ZIP Code */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="zip"
                value={form.zip}
                onChange={handleChange}
              />
            </Grid>
            {/* Skills */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma separated)"
                name="skills"
                value={form.skills}
                onChange={handleChange}
              />
            </Grid>
            {/* Default Tasks */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="default-tasks-label">Default Tasks</InputLabel>
                <Select
                  labelId="default-tasks-label"
                  name="defaultTasks"
                  multiple
                  value={form.defaultTasks}
                  onChange={handleChange}
                  label="Default Tasks"
                >
                  {defaultTaskOptions.map((task) => (
                    <MenuItem key={task} value={task}>
                      {task}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Authority Level */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Authority Level"
                name="authorityLevel"
                value={form.authorityLevel}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {/* Action Buttons */}
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
            >
              Delete Employee
            </Button>
            <Button
              onClick={handleGetEmployee}
              variant="contained"
              sx={{ ml: 2 }}
            >
              Get Employee
            </Button>
          </Box>
        </form>
        {/* Snackbar for Notifications */}
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
      </Paper>
    </Container>
  );
};

export default AddEmployee;
