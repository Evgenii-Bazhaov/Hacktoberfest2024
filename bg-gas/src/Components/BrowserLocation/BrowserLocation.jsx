import axios from "axios";
import React, { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { fetchAddressFromGoogle } from "../../constants/endpoints";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../features/location/locationSlice";
import { useTranslation } from "react-i18next";

// BrowserLocation component fetches the user's current location using the browser's geolocation API.
const BrowserLocation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const fetchAddress = async (latitude, longitude) => {
    try {
      // Fetch address using Google Geocoding API
      const fetchAddressURL = fetchAddressFromGoogle(latitude, longitude);
      const response = await axios.get(fetchAddressURL);
      const data = response.data;
      if (data.status === "OK") {
        // Set the address in the state
        setAddress(data.results[0].formatted_address);
        setLoading(false);
        setErrorMsg(null);
      } else {
        // Handle error
        setLoading(false);
        setErrorMsg(t("errorFetchingAddress"));
        console.error("Geocoding error ", data.status);
      }
    } catch (error) {
      // Handle error
      setErrorMsg(t("errorFetchingAddress"));
      setLoading(false);
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    // Fetch user's location using the browser's geolocation API
    const fetchLocation = () => {
      if (navigator.geolocation) {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Set the location in the state
            const { latitude, longitude } = position.coords;
            console.log("Coordinates:", { latitude, longitude });
            dispatch(setLocation({ latitude, longitude }));
            fetchAddress(latitude, longitude);
          },
          (error) => {
            // Handle error
            setLoading(false);
            console.error("Error getting location:", error);
            setErrorMsg(error.message);
          }
        );
      } else {
        // Handle error
        setLoading(false);
        console.error("Geolocation is not supported by this browser.");
        setErrorMsg(t("geoLoacationNotSupported"));
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="flex justify-center items-center p-12">
      {loading && (
        // Display loading spinner while fetching location
        <div className="flex flex-col gap-5 justify-center items-center">
          <MoonLoader
            color={`${darkMode ? "ffffff" : "#06402B"}`}
            loading={loading}
            size={50}
            speedMultiplier={1}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className={`${darkMode ? "text-white" : "text-black"}`}>
            {t("fetchingLocation")}
          </div>
        </div>
      )}
      {!loading && errorMsg && (
        // Display error message if location fetching fails
        <div className="flex flex-col gap-5 justify-center items-center">
          <div>
            <img
              src="./icons/erroralert.svg"
              alt="Error"
              width="60"
              height="60"
            />
          </div>
          <div className={`${darkMode ? "text-white" : "text-black"}`}>
            {errorMsg}
          </div>
        </div>
      )}
      {!loading && !errorMsg && address && (
        // Display user's current location
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="flex flex-row justify-start items-start gap-5 w-full">
            <div>
              <img src="./icons/pin.svg" alt="Error" width="30" height="30" />
            </div>
            <div
              className={`font-semibold text-xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {t("currentLocation")}
            </div>
          </div>
          <div
            className={`flex flex-row justify-center items-center gap-5 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {address}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowserLocation;
