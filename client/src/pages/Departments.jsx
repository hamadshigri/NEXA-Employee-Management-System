import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import toast from "react-hot-toast";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const fetchDepartments = async () => {
    try {
      const { data } = await API.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createDepartment = async (e) => {
    e.preventDefault();

    try {
      await API.post("/departments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Department created");

      setShowModal(false);

      fetchDepartments();

      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await API.delete(`/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Department deleted");

      fetchDepartments();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Departments
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg"
        >
          Add Department
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Department</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr
                key={department._id}
                className="border-t"
              >
                <td className="p-4 font-medium">
                  {department.name}
                </td>

                <td className="p-4 text-gray-600">
                  {department.description}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      deleteDepartment(department._id)
                    }
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Add Department
              </h2>

              <button
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={createDepartment}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Department Name"
                className="w-full border p-3 rounded-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Description"
                className="w-full border p-3 rounded-lg"
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-lg">
                Create Department
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Departments;