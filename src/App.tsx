import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";

const App: React.FC = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  return (
    <Router>
      <div
        className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100
max-w-xl mx-auto px-4 sm:px-6 lg:max-w-3xl lg:px-8 py-6"
      >
        {/* Header */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin login */}
          <Route
            path="/admin-login"
            element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
          />

          {/* Admin dashboard - protected */}
          <Route
            path="/admin/dashboard"
            element={
              isAdminLoggedIn ? (
                <AdminDashboard setIsAdminLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
