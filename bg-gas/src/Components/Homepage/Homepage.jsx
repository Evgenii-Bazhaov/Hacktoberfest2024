import React from "react";
import Button from "../Button/Button";
import UserLocation from "../UserLocation/UserLocation";
import { useSelector, useDispatch } from "react-redux";
import AddFilters from "../AddFilters/AddFilters";
import { toggleMode, changeRadius } from "../../features/filters/filtersSlice";
import { setpath } from "../../features/path/pathSlice";
import { allRoutes } from "../../constants/allRoutes";
import { useTranslation } from "react-i18next";

// Homepage component is the main component that displays the user's location and allows them to apply filters and search for gas stations.
const Homepage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    showModal: addMoreFilters,
    radius,
    filters,
  } = useSelector((state) => state.filters);
  const { latitude, longitude } = useSelector((state) => state.location);
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  return (
    <div
      className={`min-h-[72vh] md:min-h-[73vh] flex justify-center items-center flex-col gap-10 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className={`${addMoreFilters && "opacity-50"}`}>
        <UserLocation />
      </div>
      {addMoreFilters && <AddFilters />}
      <div className={`${addMoreFilters && "opacity-50"}`}>
        {/* Choose radius from given options */}
        <div className="flex flex-col gap-2 justify-start items-start">
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className={`${darkMode && "text-white"}`}>
              {t("radius")} ({t("inMiles")}) :{" "}
            </div>
            <div className="flex flex-row gap-5">
              <div
                className={`${radius === 0.5 && "bg-[#007F00] text-white "} ${
                  darkMode && "text-white"
                } rounded-md p-2 cursor-pointer`}
                onClick={() => dispatch(changeRadius(0.5))}
              >
                0.5
              </div>
              <div
                className={`${radius === 1 && "bg-[#007F00] text-white"} ${
                  darkMode && "text-white"
                } rounded-md p-2 cursor-pointer`}
                onClick={() => dispatch(changeRadius(1))}
              >
                1
              </div>
              <div
                className={`${radius === 5 && "bg-[#007F00] text-white"} ${
                  darkMode && "text-white"
                } rounded-md p-2 cursor-pointer`}
                onClick={() => dispatch(changeRadius(5))}
              >
                5
              </div>
            </div>
          </div>

          <Button onClick={() => dispatch(toggleMode())}>
            {/* Show appropriate button text based on applied filter */}
            {filters.open24 ||
            filters.hotFood ||
            filters.convinienceStore ||
            filters.bpFuelCards
              ? t("editFilters")
              : t("moreFilters")}
          </Button>
        </div>
        <div className="my-10">
          <Button
            darkMode={darkMode}
            disabled={!latitude || !longitude}
            onClick={() => dispatch(setpath({ path: allRoutes.results }))}
          >
            {t("startSearch")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
