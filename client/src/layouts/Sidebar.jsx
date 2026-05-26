import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { X } from "lucide-react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64 bg-[#0F172A] border-r border-white/10 p-6
          transform transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-wide">
            NEXA
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition duration-300"
            to="/"
          >
            Dashboard
          </Link>

          <Link
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition duration-300"
            to="/employees"
          >
            Employees
          </Link>

          <Link
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition duration-300"
            to="/departments"
          >
            Departments
          </Link>

          <Link
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition duration-300"
            to="/analytics"
          >
            Analytics
          </Link>

          <Link
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition duration-300"
            to="/settings"
          >
            Settings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;