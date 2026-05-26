import DashboardLayout from "../layouts/DashboardLayout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Settings = () => {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">
          Settings
        </h1>

        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-center gap-6 mb-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="w-24 h-24 rounded-full"
            />

            <div>
              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-500">
                {user?.email}
              </p>

              <span className="inline-block mt-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm">
                Administrator
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                value={user?.name}
                readOnly
                className="w-full border p-3 rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full border p-3 rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Role
              </label>

              <input
                type="text"
                value="Admin"
                readOnly
                className="w-full border p-3 rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Company
              </label>

              <input
                type="text"
                value="NEXA Enterprise"
                readOnly
                className="w-full border p-3 rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;