import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DayForecast from '../components/DayForecast';
import TemperatureDetails from '../components/TemperatureDetails';
import CurrentDateInsight from '../components/CurrentDateInsight';
import FiveDayForecast from '../components/FiveDayForecast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityForecast } from '../redux/weatherSlice';

const CityPage = () => {
  // State to store the city name from the search bar
  const [cityName, setCityName] = useState(''); 
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.weather);

  useEffect(() => {
    if (cityName) {
      dispatch(fetchCityForecast(cityName));
    }
  }, [cityName, dispatch]);

  const handleCitySearch = (city) => {
    setCityName(city);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 min-h-screen">
      {/* Main Content Section */}
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <header className="mb-4">
          {/* Pass the handleCitySearch function to Navbar */}
          <Navbar onCitySearch={handleCitySearch} />
        </header>

        {cityName ? (
          <section className="space-y-4">
            {/* Pass the cityName to components */}
            {error ? (
              <div className="text-center text-red-500">
                <p className="text-lg font-bold">Entered City not exists or Wrong city name entered</p>
              </div>
            ) : (
              <>
                <DayForecast searchCity={cityName} />
                <TemperatureDetails searchCity={cityName} />
                <CurrentDateInsight searchCity={cityName} />
              </>
            )}
          </section>
        ) : (
          <div className="flex justify-center items-center h-full text-white">
            <p className="text-lg font-bold">SEARCH FOR A CITY TO GET IT'S WEATHER DETAILS</p>
          </div>
        )}
      </main>

      {/* Sidebar or additional section */}
      <aside className="md:w-1/4 lg:w-1/4 bg-gray-800 p-4 border-r border-gray-700 flex justify-center items-center">
        {cityName && !error ? <FiveDayForecast searchCity={cityName} /> : null}
      </aside>
    </div>
  );
};

export default CityPage;
