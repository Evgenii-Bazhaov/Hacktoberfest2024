import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCityForecast, fetchFiveDayForecast } from '../redux/weatherSlice';
import { WiCloudy, WiRain, WiDaySunny } from 'react-icons/wi';

// Define weather icons based on weather condition
const weatherIcons = {
  Clear: <WiDaySunny size={30} />,
  Clouds: <WiCloudy size={30} />,
  Rain: <WiRain size={30} />,
};

const TemperatureDetails = ({ searchCity }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cityFiveDayForecast, coordinateFiveDayForecast, cityWeather, loading, error, unit } = useSelector((state) => state.weather);
 
  // Route Based Api Fetching
  useEffect(() => {
    if (location.pathname === '/' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchFiveDayForecast({ lat: latitude, lon: longitude }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else if (location.pathname === '/search_cities' && searchCity) {
      dispatch(fetchCityForecast(searchCity));
    }
  }, [dispatch, location.pathname, searchCity, unit]); // Refetch data when unit, route, or searchCity changes

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white">Error: {error.message}</div>;
  }

  // Determine the appropriate data source based on location.pathname
  const forecastData = location.pathname === '/search_cities' ? cityFiveDayForecast : coordinateFiveDayForecast;

  // Filter for today's forecast
  const todayDate = new Date().toISOString().split('T')[0];
  const todayForecast = forecastData?.list?.filter((forecast) => forecast.dt_txt.startsWith(todayDate)) || [];

  return (
    <div className="text-white p-4 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-lg font-semibold mb-4 text-center md:text-left">Today's Forecast</h1>
      {todayForecast.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {todayForecast.map((forecast) => {
            const weatherMain = forecast.weather[0].main;
            const weatherIcon = weatherIcons[weatherMain] || <WiDaySunny size={30} />;

            return (
              <div key={forecast.dt_txt} className="flex flex-col items-center bg-gray-700 border-blue-500 border-2 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-sm md:text-base mb-2">
                  {new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="mb-2">
                  {weatherIcon}
                </div>
                <p className="text-sm md:text-sm capitalize mb-2 text-center">
                  {forecast.weather[0].description}
                </p>
                <p className="text-lg md:text-xl">
                  {Math.round(forecast.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">No forecast data available for today</p>
      )}
    </div>
  );
};

export default TemperatureDetails;
