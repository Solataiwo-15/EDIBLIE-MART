// src/pages/AdminLogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminLogin: React.FC<Props> = ({ setIsAdminLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsAdminLoggedIn(true);
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-[93vh] px-4 ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
