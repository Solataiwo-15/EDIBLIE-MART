// src/components/Header.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm">
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          EDIBLE MART
        </h1>

        <ul className="hidden sm:flex space-x-4 gap-6 m-0 p-0 list-none ">
          <li>
            <NavLink
              to="/"
              className="py-2 px-3 rounded hover:bg-gray-100 transition"
            >
              {" "}
              Order Now
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-login"
              className="py-2 px-3 rounded hover:bg-gray-100 transition"
            >
              {" "}
              Admin Dashboard
            </NavLink>
          </li>
        </ul>

        <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </nav>

      <div
        className={`sm:hidden overflow-hidden transition-max-h duration-300 ease-in-out ${
          menuOpen ? "max-h-50" : "max-h-0"
        }`}
      >
        <nav className="bg-white border-b px-4 py-2 flex flex-row space-y-5">
          <ul className=" flex flex-col gap-[15px] m-0 p-0 list-none">
            <li>
              <NavLink
                to="/"
                className="text-gray-700 hover:text-gray-900 no-underline font-semibold text-base"
                onClick={() => setMenuOpen(false)}
              >
                Order Now
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-login"
                className="text-gray-700 hover:text-gray-900 no-underline font-semibold text-base"
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
