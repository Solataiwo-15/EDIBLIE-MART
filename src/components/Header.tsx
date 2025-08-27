// src/components/Header.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          EDIBLE MART
        </h1>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-4">
          <a href="#order" className="text-gray-700 hover:text-gray-900">
            Order Now
          </a>
          <a href="/admin-login" className="text-gray-700 hover:text-gray-900">
            Admin
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-max-h duration-300 ease-in-out ${
          menuOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="bg-white border-b px-4 py-2 flex flex-col space-y-2">
          <a
            href="/"
            className="py-2 px-3 rounded hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(false)}
          >
            Order Now
          </a>
          <a
            href="/admin-login"
            className="py-2 px-3 rounded hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
