
import React, { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/employees/employeesInfo");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      const simplifiedData = data.map((employee) => ({
        employeeID: employee.employeeID,
        firstName: employee.firstName,
        lastName: employee.lastName,
        currentWage: employee.currentWage,
        defaultTasks: employee.defaultTasks,
        isActive: employee.isActive,
        activeTask: employee.activeTask,
      }));
      setAllEmployees(simplifiedData);
    } catch (error) {
      console.error("Error fetching employees:", error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ allEmployees, loading, fetchEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};
