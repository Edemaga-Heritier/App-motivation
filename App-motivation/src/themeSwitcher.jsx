// src/ThemeToggle.js
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center p-2 rounded-full focus:outline-none"
      >
        {theme === "light" ? <FaMoon className="text-gray-800" /> : <FaSun className="text-yellow-500" />}
      </button>
    </div>
  );
};

export default ThemeToggle;
