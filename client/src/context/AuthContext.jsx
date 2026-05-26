import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
  try {
    const { data } = await API.post(
      "/auth/login",
      formData
    );

    localStorage.setItem("token", data.token);

    setUser(data);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const register = async (formData) => {
  try {
    const { data } = await API.post(
      "/auth/register",
      formData
    );

    localStorage.setItem("token", data.token);

    setUser(data);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};