import React from "react";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllFilters,
  handleFilterChange,
  toggleMode,
} from "../../features/filters/filtersSlice";
import { useTranslation } from "react-i18next";

// AddFilters component is a modal that allows users to apply filters to the list of gas stations.
const AddFilters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { filters } = useSelector((state) => state.filters);
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  const handleApplyFilter = () => {
    // Close the modal after applying filters
    dispatch(toggleMode());
    console.log("Filters Applied", filters);
  };
  return (
    <div
      className={`fixed top-32 md:w-[30vw] md:h-[50vh] border-2 border-black ${
        darkMode ? "bg-gray-700" : "bg-white"
      } p-4 z-20`}
    >
      <div
        className="flex w-full justify-end cursor-pointer"
        onClick={() => dispatch(toggleMode())}
      >
        <img src="./icons/cross.svg" alt="modal close" width="30" height="30" />
      </div>
      <div
        className={`text-2xl font-semibold ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {t("chooseFilters")}
      </div>
      <div className="flex flex-row gap-10 justify-between items-center mt-6">
        <div
          className={`flex flex-col gap-3 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          <div>{t("open24")}</div>
          <div>{t("convenienceStore")}</div>
          <div>{t("hotFood")}</div>
          <div>{t("bpFuelCards")}</div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <input
              data-testid="open24"
              type="checkbox"
              checked={filters.open24}
              onChange={() => dispatch(handleFilterChange({ type: "open24" }))}
            />
          </div>
          <div>
            <input
              data-testid="convenienceStore"
              type="checkbox"
              checked={filters.convinienceStore}
              onChange={() =>
                dispatch(handleFilterChange({ type: "convinienceStore" }))
              }
            />
          </div>
          <div>
            <input
              data-testid="hotFood"
              type="checkbox"
              disabled={!filters.convinienceStore}
              checked={filters.convinienceStore && filters.hotFood}
              onChange={() => dispatch(handleFilterChange({ type: "hotFood" }))}
            />
          </div>
          <div>
            <input
              data-testid="bpFuelCards"
              type="checkbox"
              checked={filters.bpFuelCards}
              onChange={() =>
                dispatch(handleFilterChange({ type: "bpFuelCards" }))
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div
          onClick={() => dispatch(clearAllFilters())}
          className={`cursor-pointer font-thin ${
            darkMode ? "text-white" : "text-black"
          } mb-2`}
        >
          {t("clearAllFilters")}
        </div>
        <Button onClick={() => handleApplyFilter()}>{t("applyFilters")}</Button>
      </div>
    </div>
  );
};

export default AddFilters;
