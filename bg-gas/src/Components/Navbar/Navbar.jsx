import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../features/darkMode/darkModeSlice";
import { setpath } from "../../features/path/pathSlice";
import { allRoutes } from "../../constants/allRoutes";

// Navbar component displays the navigation bar with options to change theme, language, and view favorites.
const Navbar = () => {
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lang) => {
    // Change the language using i18n
    i18n.changeLanguage(lang);
  };
  return (
    <div
      className={`p-2 md:p-4 flex flex-row justify-between items-center ${
        darkMode ? "bg-black" : "bg-slate-200"
      } `}
    >
      <div className="flex flex-row items-center w-[60%] md:w-[30%]">
        <div>
          <a href="/" className="text-inherit no-underline">
            <img src="./bp-logo.svg" alt="BP Logo" width="50" height="50" />
          </a>
        </div>

        <div
          className={`text-lg md:text-2xl ml-4 md:ml-6 font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          <a href="/" className="text-inherit no-underline">
            {t("title")}
          </a>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 md:gap-6">
        <div
          className="cursor-pointer"
          onClick={() => dispatch(setpath({ path: allRoutes.fav }))}
        >
          <img
            src={!darkMode ? "./icons/heart.svg" : "./icons/heartred.svg"}
            alt="Fav"
            width="28"
            height="28"
          />
        </div>
        <div className="cursor-pointer" onClick={() => dispatch(toggleMode())}>
          <img
            src={!darkMode ? "./icons/moon.svg" : "./icons/sun.svg"}
            alt="Theme Mode"
            width="30"
            height="30"
          />
        </div>
        <div className="flex flex-row">
          <div className={`${darkMode && "whitesvg"}`}>
            <img
              src="./icons/lang.svg"
              alt="Change language"
              width="30"
              height="30"
            />
          </div>
          <div>
            <select
              defaultValue={currentLanguage}
              className={`border-none outline-none cursor-pointer ml-2 ${
                darkMode ? "bg-black text-white" : "bg-slate-200 text-black"
              }`}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option
                data-testid="en"
                value="en"
                className={`${
                  darkMode ? "bg-black text-white" : "bg-slate-200 text-black"
                }`}
              >
                English
              </option>
              <option
                value="de"
                className="bg-slate-200 text-black"
                data-testid="de"
              >
                German
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
