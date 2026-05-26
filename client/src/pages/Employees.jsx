import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EditEmployeeModal from "../components/EditEmployeeModal";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [employeeToDelete, setEmployeeToDelete] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const employeesPerPage = 5;

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        "/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Employee deleted");

      fetchEmployees();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.department
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const indexOfLastEmployee =
    currentPage * employeesPerPage;

  const indexOfFirstEmployee =
    indexOfLastEmployee - employeesPerPage;

  const currentEmployees =
    filteredEmployees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    );

  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Employee Management
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full md:w-96 border p-3 rounded-xl bg-white"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <p className="text-gray-500">
            Loading employees...
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Designation</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentEmployees.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-10 text-gray-500"
                    >
                      No employees found
                    </td>
                  </tr>
                ) : (
                  currentEmployees.map((employee) => (
                    <tr
                      key={employee._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">
                        {employee.name}
                      </td>

                      <td className="p-4">
                        {employee.email}
                      </td>

                      <td className="p-4">
                        {employee.department}
                      </td>

                      <td className="p-4">
                        {employee.designation}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            employee.status ===
                            "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>

                      <td className="p-4 flex gap-4">
                        {/* EDIT */}
                        <button
                          onClick={() => {
                            setSelectedEmployee(
                              employee
                            );
                            setShowEditModal(
                              true
                            );
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => {
                            setEmployeeToDelete(
                              employee._id
                            );

                            setShowDeleteModal(
                              true
                            );
                          }}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-6 flex-wrap">
              {[...Array(totalPages)].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`px-4 py-2 rounded-lg ${
                      currentPage ===
                      index + 1
                        ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                        : "bg-white border"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}

      {showModal && (
        <AddEmployeeModal
          closeModal={() =>
            setShowModal(false)
          }
          fetchEmployees={fetchEmployees}
        />
      )}

      {showEditModal && (
        <EditEmployeeModal
          employee={selectedEmployee}
          closeModal={() =>
            setShowEditModal(false)
          }
          fetchEmployees={fetchEmployees}
        />
      )}

      {showDeleteModal && (
        <ConfirmModal
          title="Delete Employee"
          message="Are you sure you want to delete this employee?"
          onCancel={() =>
            setShowDeleteModal(false)
          }
          onConfirm={() => {
            deleteEmployee(employeeToDelete);
            setShowDeleteModal(false);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default Employees;