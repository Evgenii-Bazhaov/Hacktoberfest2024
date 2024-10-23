import React from "react";
import { BrowserLocation, InputLocation } from "../index";
import { useSelector } from "react-redux";

// UserLocation component displays the BrowserLocation and InputLocation components side by side.
const UserLocation = () => {
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
      <div className="w-[90%] md:w-[50%] flex justify-center items-center">
        <BrowserLocation />
      </div>
      <div
        className={`border-2 ${
          darkMode ? "border-white" : "border-gray-300"
        } md:h-[30vh] w-[50vw] md:w-0 mt-[-5vh] md:mt-0`}
      ></div>
      <div className="w-[90%] md:w-[50%] h-full flex justify-center items-center">
        <InputLocation />
      </div>
    </div>
  );
};

export default UserLocation;
