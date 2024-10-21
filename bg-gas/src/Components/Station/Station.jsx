/* eslint-disable react/prop-types */
import React from "react";
import { useTranslation } from "react-i18next";

// Station component displays the details of a gas station.
const Station = ({ stationData, index, darkMode, handleFav, isFav }) => {
  const { t } = useTranslation();
  const {
    stationId,
    title,
    distance,
    rating,
    contact,
    address,
    latitude,
    longitude,
  } = stationData;

  // Calculate the number of full stars and half stars
  let full_star = 0;
  let half_star = 0;
  if (`${rating}`.split(".").length === 2) {
    full_star = parseInt(`${rating}`.split(".")[0]);
    half_star = 1;
  } else {
    full_star = parseInt(rating);
  }

  return (
    <div
      key={index}
      className={`flex flex-col border-2 ${
        darkMode
          ? "border-slate-400 bg-gray-600 text-white hover:bg-gray-500"
          : "border-gray-400 hover:bg-slate-200"
      } rounded-md shadow-lg p-2 gap-4 `}
    >
      <div className="flex flex-row gap-20 items-center justify-between">
        <div
          className={`font-semibold text-2xl bg-[#007F00] p-2 rounded-md text-white cursor-pointer`}
        >
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            target="_blank"
            rel="noreferrer"
            className="text-inherit no-underline"
          >
            {title}
          </a>
        </div>
        <div className="flex flex-row justify-center items-center gap-5">
          <div
            data-testid="favIcon"
            className={`cursor-pointer ${darkMode && "whitesvg"}`}
            onClick={() => handleFav(stationId)}
          >
            {isFav ? (
              <img
                src="./icons/save_filled.svg"
                alt="save"
                width="20"
                height="20"
              />
            ) : (
              <img
                src="./icons/save_outline.svg"
                alt="save"
                width="20"
                height="20"
              />
            )}
          </div>
          <div className={`cursor-pointer ${darkMode && "whitesvg"}`}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
              target="_blank"
              rel="noreferrer"
              className="text-inherit no-underline"
            >
              <img
                src="./icons/navigation.svg"
                alt="save"
                width="17"
                height="17"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between px-2 italic">
        <div>{t("distance")}</div>
        <div>
          {distance} {t("inMiles")}
        </div>
      </div>
      <div className="flex flex-row justify-between px-2 italic">
        <div>{t("rating")}</div>
        <div className={`flex flex-row ${darkMode && "whitesvg"}`}>
          {[...Array(full_star)].map((_, index) => (
            <img
              key={index}
              src="./icons/star_filled.svg"
              alt="star"
              width="20"
              height="20"
            />
          ))}
          {[...Array(half_star)].map((_, index) => (
            <img
              key={index}
              src="./icons/star_half_filled.svg"
              alt="star"
              width="20"
              height="20"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between px-2 italic">
        <div>{t("contact")}</div>
        <div className="font-medium">{contact}</div>
      </div>
      <div className="flex flex-row justify-between px-2 italic">
        <div>{t("address")}</div>
        <div className="font-medium">{address}</div>
      </div>
    </div>
  );
};

export default Station;
