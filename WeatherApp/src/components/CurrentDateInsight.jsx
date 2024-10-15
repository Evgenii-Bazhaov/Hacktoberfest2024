import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { fetchCurrentLocationWeather, fetchCityWeather } from '../redux/weatherSlice'; 
import { FaThermometerHalf, FaWind, FaTachometerAlt } from 'react-icons/fa'; 

const CurrentDateInsight = ({ searchCity }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route
  const { currentLocationWeather, cityWeather, loading, error, unit } = useSelector((state) => state.weather);

  useEffect(() => {
    if (location.pathname === '/') {
      // Fetch current location weather when on home page
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(fetchCurrentLocationWeather({ lat: latitude, lon: longitude }));
          },
          (error) => {
            console.error('Geolocation error:', error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else if (location.pathname === '/search_cities' && searchCity) {
      // Fetching city weather based on the searched city
      dispatch(fetchCityWeather(searchCity));
    }
  }, [dispatch, location.pathname, searchCity, unit]); // Refetch data when unit, route, or searchCity changes

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-white">Error: {error.message}</div>;

  // Determine whether to show current location weather or city weather
  const weatherData = location.pathname === '/' ? currentLocationWeather : cityWeather;

  if (!weatherData) return <div className="text-center text-white">No data available</div>;

  const { main, wind } = weatherData;
  let maxTemp = main.temp_max;
  let minTemp = main.temp_min;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const windDirection = wind.deg;

  // Convert temperatures if the unit is Fahrenheit
  if (unit === 'imperial') {
    maxTemp = (maxTemp * 9/5) + 32;
    minTemp = (minTemp * 9/5) + 32;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg text-white font-semibold mb-4">Today's Insights</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-800 text-white shadow-md justify-evenly border-blue-500 border-2 rounded-lg p-4 flex items-center space-x-4">
          <FaThermometerHalf className="text-3xl" />
          <div>
            <h3 className="text-sm text-center font-semibold">Max Temperature</h3>
            <p className="text-xl text-center">{Math.round(maxTemp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          </div>
        </div>
        <div className="bg-gray-800 text-white shadow-md justify-evenly border-blue-500 border-2 rounded-lg p-4 flex items-center space-x-4">
          <FaThermometerHalf className="text-3xl" />
          <div>
            <h3 className="text-sm text-center font-semibold">Min Temperature</h3>
            <p className="text-xl text-center">{Math.round(minTemp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          </div>
        </div>
        <div className="bg-gray-800 text-white shadow-md justify-evenly border-blue-500 border-2 rounded-lg p-4 flex items-center space-x-4">
          <FaTachometerAlt className="text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Humidity</h3>
            <p className="text-xl">{humidity}%</p>
          </div>
        </div>
        <div className="bg-gray-800 text-white shadow-md justify-evenly border-blue-500 border-2 rounded-lg p-4 flex items-center space-x-4">
          <FaWind className="text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Wind Speed</h3>
            <p className="text-xl">{windSpeed} m/s</p>
            <p className="text-sm">Direction: {windDirection}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDateInsight;
