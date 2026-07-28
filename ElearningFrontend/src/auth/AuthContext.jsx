import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      console.error("Auth check failed:", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (data) => {
    try {
      await api.post("/auth/login", data);
      await fetchMe();
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
      throw err;
    }
  };

  const signup = async (data) => {
    try {
      await api.post("/auth/signup", data);
      await fetchMe();
      toast.success("Account created successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout").catch(() => {});
    } finally {
      setUser(null);
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/login", { replace: true }), 200);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
