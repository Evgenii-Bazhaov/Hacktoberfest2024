import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import { fetchCurrentLocationWeather, fetchCityWeather } from '../redux/weatherSlice';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const weatherIcons = {
  Clear: <WiDaySunny className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />,
  Clouds: <WiCloudy className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />,
  Rain: <WiRain className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />,
  Snow: <WiSnow className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />,
  Thunderstorm: <WiThunderstorm className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />,
};

const DayForecast = ({ searchCity }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route
  const { currentLocationWeather, cityWeather, loading, error, unit } = useSelector((state) => state.weather);

   
  // route based api calling based on useLocation()
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
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else if (location.pathname === '/search_cities' && searchCity) {
      // Fetch city weather based on the searched city
      dispatch(fetchCityWeather(searchCity));
    }
  }, [dispatch, location.pathname, unit, searchCity]); // Refetch data when unit, route, or searchCity changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Determine whether to show current location weather or city weather
  const weatherData = location.pathname === '/' ? currentLocationWeather : cityWeather;
  const weatherCondition = weatherData?.weather[0].main;

  return (
    <div className="text-white flex flex-col items-center md:flex-row md:justify-between p-4 md:p-8 md:pb-1">
      {weatherData ? (
        <>
          <div className="text-center md:text-left mb-6 md:mb-0 md:w-1/2">
            <h1 className="font-bold text-3xl md:text-5xl mb-2">{weatherData.name}</h1>
            <p className="text-sm md:text-sm mb-2 capitalize">{weatherData.weather[0].description}</p>
            <p className="font-semibold text-2xl md:text-4xl">
              {unit === 'metric' ? `${weatherData.main.temp}°C` : `${weatherData.main.temp}°F`}
            </p>
          </div>
          <div className="flex justify-center md:justify-end md:w-1/2">
            {weatherIcons[weatherCondition] || <WiDaySunny className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />}
          </div>
        </>
      ) : (
        <p className="text-center flex justify-center items-center">No weather data available, Give location access or Search For a city</p>
      )}
    </div>
  );
};

export default DayForecast;
