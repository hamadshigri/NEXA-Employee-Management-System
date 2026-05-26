import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const EditEmployeeModal = ({
  employee,
  closeModal,
  fetchEmployees,
}) => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: employee.name || "",
    email: employee.email || "",
    phone: employee.phone || "",
    department: employee.department || "",
    designation: employee.designation || "",
    status: employee.status || "Active",
    joiningDate: employee.joiningDate || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/employees/${employee._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Employee updated");

      fetchEmployees();

      closeModal();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Edit Employee
          </h2>

          <button
            onClick={closeModal}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="border p-3 rounded-lg col-span-2"
          />

          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-lg col-span-2">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;