import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(formData);

    if (success) {
      toast.success("Login successful");

      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-[#7C3AED] opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white tracking-wide">
            NEXA
          </h1>

          <p className="text-slate-400 mt-2">
            Enterprise Workforce Platform
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#7C3AED]"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#7C3AED]"
              onChange={handleChange}
              required
            />
          </div>

          <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-4 rounded-xl font-semibold transition duration-300">
            Sign In
          </button>
        </form>

        <p className="text-slate-400 text-center mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#A78BFA] hover:text-white"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;