import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchFiveDayForecast, fetchCityForecast } from '../redux/weatherSlice';
import { FaCloudSun, FaCloudRain, FaSnowflake, FaCloudShowersHeavy } from 'react-icons/fa';

// Function to get the correct weather icon based on the weather code From Api
const getWeatherIcon = (weatherCode) => {
  switch (weatherCode) {
    case '01d':
      return <FaCloudSun className="text-yellow-500 text-2xl" />;
    case '02d':
      return <FaCloudSun className="text-yellow-500 text-2xl" />;
    case '03d':
    case '04d':
      return <FaCloudSun className="text-white text-2xl" />;
    case '09d':
    case '10d':
      return <FaCloudShowersHeavy className="text-blue-500 text-2xl" />;
    case '11d':
      return <FaCloudRain className="text-white text-2xl" />;
    case '13d':
      return <FaSnowflake className="text-white text-2xl" />;
    case '50d':
      return <FaCloudSun className="text-white text-2xl" />;
    default:
      return <FaCloudSun className="text-gray-500 text-2xl" />;
  }
};

const FiveDayForecast = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cityFiveDayForecast, coordinateFiveDayForecast, loading, error, unit } = useSelector((state) => state.weather);

  // Route based API calling
  useEffect(() => {
    if (location.pathname === '/') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(fetchFiveDayForecast({ lat: latitude, lon: longitude }));
          },
          (error) => {
            console.error('Geolocation error:', error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else if (location.pathname === '/search_cities') {
      const queryParams = new URLSearchParams(location.search);
      const searchCity = queryParams.get('city');
      if (searchCity) {
        dispatch(fetchCityForecast(searchCity));
      }
    }
  }, [dispatch, location.pathname, location.search, unit]);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-white">Error: {error.message}</div>;

  const forecastData = location.pathname === '/search_cities' ? cityFiveDayForecast : coordinateFiveDayForecast;

  if (!forecastData) return <div className="text-center text-white">No data available</div>;

  // Filter forecasts for daily intervals at 12:00:00
  const dailyForecasts = forecastData.list.filter((item) => item.dt_txt.includes('12:00:00'));

  // Function to convert temperature from Celsius to Fahrenheit
  const convertToFahrenheit = (tempCelsius) => (tempCelsius * 9/5) + 32;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg border-2 border-blue-500">
      <h1 className="text-xl font-bold mb-4">5-Day Forecast</h1>
      <div className="space-y-4">
        {dailyForecasts.map((forecast) => {
          const { dt_txt, main, weather } = forecast;
          const date = new Date(dt_txt).toLocaleDateString(undefined, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          });

          // Calculate average temperature and converting it
          const avgTemp = unit === 'metric'
            ? ((main.temp_max + main.temp_min) / 2).toFixed(1)
            : ((convertToFahrenheit(main.temp_max) + convertToFahrenheit(main.temp_min)) / 2).toFixed(1);

          const weatherDescription = weather[0].description;
          const weatherIcon = getWeatherIcon(weather[0].icon);

          return (
            <div key={dt_txt} className="flex justify-between items-center p-4 border-b-2 border-gray-400">
              <div className="flex items-center space-x-2">
                {weatherIcon}
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex flex-col items-end">
                <span>{avgTemp}°{unit === 'metric' ? 'C' : 'F'}</span>
                <span className="text-gray-400 text-sm capitalize">{weatherDescription}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiveDayForecast;
