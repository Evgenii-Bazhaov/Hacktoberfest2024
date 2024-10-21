/* eslint-disable react/prop-types */
import React from "react";
import Pills from "../Pills/Pills";
import { useSelector, useDispatch } from "react-redux";
import AddFilters from "../AddFilters/AddFilters";
import MoonLoader from "react-spinners/MoonLoader";
import {
  toggleMode,
  handleFilterChange,
} from "../../features/filters/filtersSlice";
import { useEffect, useState } from "react";
import { favoriteBPStations } from "../../constants/localStorage";
import { allRoutes } from "../../constants/allRoutes";
import Station from "../Station/Station";
import { toggleFilterUpdated } from "../../features/filters/filtersSlice";
import { useTranslation } from "react-i18next";

// AppliedFilters component displays the list of gas stations based on the applied filters.
const AppliedFilters = ({ stationDataList }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [stationData, setStationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showModal: addMoreFilters, filters } = useSelector(
    (state) => state.filters
  );
  const { path } = useSelector((state) => state.path);
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulating API call to fetch station data
      setStationData(stationDataList);
      setIsLoading(false);
    }, 1000);
    // fetchStations();
  }, [stationDataList]);
  const handleFav = (id) => {
    // Toggle favorite station
    if (path === allRoutes.fav) {
      // Remove from favorites
      const existingFavorites =
        JSON.parse(localStorage.getItem(favoriteBPStations)) || [];
      const newFavorites = existingFavorites.filter(
        (fav) => fav.stationId !== id
      );
      localStorage.setItem(favoriteBPStations, JSON.stringify(newFavorites));
    } else {
      // Add to favorites
      const existingFavorites =
        JSON.parse(localStorage.getItem(favoriteBPStations)) || [];
      const isFav = existingFavorites.find((fav) => fav.stationId === id);
      if (isFav) {
        // Remove from favorites
        const newFavorites = existingFavorites.filter(
          (fav) => fav.stationId !== id
        );
        localStorage.setItem(favoriteBPStations, JSON.stringify(newFavorites));
      } else {
        // Add to favorites
        const { title, distance, rating, contact, address, stationId } =
          stationDataList.find((station) => station.stationId === id);
        existingFavorites.push({
          stationId,
          title,
          distance,
          rating,
          contact,
          address,
        });
        localStorage.setItem(
          favoriteBPStations,
          JSON.stringify(existingFavorites)
        );
      }
    }
    dispatch(toggleFilterUpdated());
  };

  const isStationFav = (id) => {
    // Check if the station is favorite
    const existingFavorites =
      JSON.parse(localStorage.getItem(favoriteBPStations)) || [];
    return existingFavorites.find((fav) => fav.stationId === id);
  };
  const filtersData =
    filters && Object.keys(filters).filter((key) => filters[key]);
  return (
    <div className="min-h-[73vh]">
      {path === allRoutes.results && (
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center bg-[#007F00] p-2 text-white">
          {addMoreFilters && <AddFilters />}
          <div className="font-bold text-xl">{t("appliedFilters")} </div>
          <div className="flex flex-wrap flex-row gap-5 md:justify-center md:items-center">
            {filtersData.length === 0 && (
              <div className="italic">
                {t("noFiltersApplied")}{" "}
                <span
                  className="italic underline cursor-pointer"
                  onClick={() => dispatch(toggleMode())}
                >
                  {t("clickToApply")}
                </span>
              </div>
            )}
            {filtersData.map((filter, index) => (
              <Pills
                text={filter}
                key={index}
                onClick={() => dispatch(handleFilterChange({ type: filter }))}
              />
            ))}
          </div>
        </div>
      )}
      <div
        className={`min-h-[65vh] p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        {isLoading && (
          // Display loading spinner while fetching data
          <div className="flex flex-col gap-5 justify-center items-center min-h-[62vh]">
            <MoonLoader
              color={`${darkMode ? "white" : "#007F00"}`}
              loading={isLoading}
              size={50}
              speedMultiplier={1}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className={`${darkMode ? "text-white" : "text-black"}`}>
              {t("fetchingStations")}
            </div>
          </div>
        )}
        {!isLoading && stationData.length === 0 && (
          // Display message when no stations are found
          <div
            className={`${
              darkMode && "text-white"
            } flex justify-center items-center min-h-[62vh]`}
          >
            {t("noStationsFound")}
          </div>
        )}
        {!isLoading && stationData.length > 0 && (
          // Display list of stations
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-5">
            {stationData.map((station, index) => (
              <Station
                key={index}
                index={index}
                stationData={station}
                darkMode={darkMode}
                handleFav={handleFav}
                isFav={isStationFav(station.stationId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedFilters;
