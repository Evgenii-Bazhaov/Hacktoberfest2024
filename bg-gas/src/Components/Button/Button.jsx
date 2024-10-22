/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";

// Button component is a reusable button component that can be used throughout the application.
const Button = ({ children, disabled = false, outline, onClick }) => {
  // Get the dark mode state from the store
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "text-white border-white" : "text-white border-black"
      } ${outline ? "" : "bg-[#007F00]"} p-2 rounded-lg ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } border-2 flex justify-center`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
