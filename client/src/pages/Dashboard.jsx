import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import EmployeeChart from "../components/EmployeeChart";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get("/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Employees
          </h2>

          <p className="text-3xl font-bold">
            {employees.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Active Employees
          </h2>

          <p className="text-3xl font-bold text-green-600">
            {activeEmployees}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Inactive Employees
          </h2>

          <p className="text-3xl font-bold text-red-500">
            {inactiveEmployees}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Departments
          </h2>

          <p className="text-3xl font-bold">
            {
              [
                ...new Set(
                  employees.map(
                    (emp) => emp.department
                  )
                ),
              ].length
            }
          </p>
        </div>
      </div>

      <EmployeeChart employees={employees} />
    </DashboardLayout>
  );
};

export default Dashboard;