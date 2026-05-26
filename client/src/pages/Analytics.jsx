import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Analytics = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const employeeRes = await API.get("/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const departmentRes = await API.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(employeeRes.data);
      setDepartments(departmentRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  const pieData = [
    {
      name: "Active",
      value: activeEmployees,
    },
    {
      name: "Inactive",
      value: inactiveEmployees,
    },
  ];

  const departmentData = departments.map((dept) => ({
    name: dept.name,
    employees: employees.filter(
      (emp) => emp.department === dept.name
    ).length,
  }));

  const COLORS = ["#2563eb", "#ef4444"];

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 mb-2">
            Total Employees
          </h2>

          <p className="text-3xl font-bold">
            {employees.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 mb-2">
            Active Employees
          </h2>

          <p className="text-3xl font-bold text-green-600">
            {activeEmployees}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 mb-2">
            Inactive Employees
          </h2>

          <p className="text-3xl font-bold text-red-500">
            {inactiveEmployees}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 mb-2">
            Departments
          </h2>

          <p className="text-3xl font-bold">
            {departments.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Employee Status
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Employees Per Department
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="employees"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;