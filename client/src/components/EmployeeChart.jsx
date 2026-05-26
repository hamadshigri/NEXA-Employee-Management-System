import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EmployeeChart = ({ employees }) => {
  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  const data = [
    { name: "Active", value: activeEmployees },
    { name: "Inactive", value: inactiveEmployees },
  ];

  const COLORS = ["#2563eb", "#ef4444"];

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition duration-300">
      <h2 className="text-lg font-semibold mb-4">
        Employee Status Analytics
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
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
  );
};

export default EmployeeChart;