import React from "react";
import Navbar from "../components/Navbar";
import DayForecast from "../components/DayForecast";
import TemperatureDetails from "../components/TemperatureDetails";
import CurrentDateInsight from "../components/CurrentDateInsight";
import FiveDayForecast from "../components/FiveDayForecast";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-900 min-h-screen">
      {/* Main Content Section */}
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <header className="mb-4">
          {/* Pass the handleCitySearch function to Navbar */}
          <Navbar />
        </header>

        <section className="space-y-4">
          {/* Pass the cityName to DayForecast */}
          <DayForecast />
          <TemperatureDetails />
          <CurrentDateInsight />
        </section>
      </main>
      {/* Sidebar or additional section */}
      <aside className="md:w-1/4 lg:w-1/5 bg-gray-800 p-4 border-r border-gray-700 flex justify-center items-center">
        <FiveDayForecast />
      </aside>
    </div>
  );
};

export default HomePage;
