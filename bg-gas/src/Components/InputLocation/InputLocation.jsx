import React, { useState } from "react";
import axios from "axios";
import {
  fetchInputAddressFromGoogle,
  fetchPlaceIdDetail,
} from "../../constants/endpoints";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../features/location/locationSlice";
import { useTranslation } from "react-i18next";

// InputLocation component allows users to enter an address manually and fetch the location details.
const InputLocation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isDarkMode: darkMode } = useSelector((state) => state.darkMode);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    // Fetch address suggestions using Google Places API
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      // Fetch address suggestions using Google Places API
      const response = await axios.post(import.meta.env.VITE_PROXY_URL, {
        url: fetchInputAddressFromGoogle(query),
      });

      if (response.data.status === "OK") {
        // Set the suggestions in the state
        setSuggestions(response.data.predictions);
      } else {
        // Handle error
        console.error("Error fetching suggestions:", response.data.status);
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching suggestions:", error);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    // Fetch place details using Google Places API
    try {
      const response = await axios.post(import.meta.env.VITE_PROXY_URL, {
        url: fetchPlaceIdDetail(placeId),
      });

      if (response.data.status === "OK") {
        // Set the location in the state
        const { lat, lng } = response.data.result.geometry.location;
        dispatch(setLocation({ latitude: lat, longitude: lng }));
        console.log("Coordinates:", { lat, lng });
      } else {
        // Handle error
        console.error("Error fetching place details:", response.data.status);
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching place details:", error);
    }
  };

  const handleSelect = (suggestion) => {
    // Set the selected suggestion in the input field
    setInput(suggestion.description);
    setSuggestions([]);
    fetchPlaceDetails(suggestion.place_id);
  };

  return (
    <div className=" max-h-[65vh]">
      <div className="md:w-[30vw] flex flex-col gap-5">
        <div className={`${darkMode ? "text-white" : "text-black"}`}>
          {t("enterManually")}
        </div>
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            placeholder="Enter an address"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:w-full"
          />
        </div>
      </div>
      <div>
        {suggestions.length > 0 && (
          <ul className="mt-2 border border-gray-300 rounded-md shadow-lg bg-white">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelect(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputLocation;
