import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu } from "lucide-react";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 md:px-6 py-4 flex justify-between items-center">
      
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden"
      >
        <Menu size={28} />
      </button>
      
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-gray-600 hidden md:block">
          {user?.name || "Admin"}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;