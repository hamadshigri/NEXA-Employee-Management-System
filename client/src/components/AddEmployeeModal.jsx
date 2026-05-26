import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const AddEmployeeModal = ({ closeModal, fetchEmployees }) => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    status: "Active",
    joiningDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Employee added successfully");

      fetchEmployees();

      closeModal();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Add Employee
          </h2>

          <button
            onClick={closeModal}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="status"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input
            type="date"
            name="joiningDate"
            className="border p-3 rounded-lg col-span-2"
            onChange={handleChange}
          />

          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-lg col-span-2 hover:bg-blue-700 transition">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;