import React, { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa'; 
import { BiSearch } from 'react-icons/bi'; 
import ToggleButtonIcon from './ToggleButtonIcon'; 
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onCitySearch }) => {
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onCitySearch(inputValue); // Passing the search input to the parent component
  };

  return (
    <div className="flex justify-evenly items-center p-4">
      <div className="flex items-center text-white">
        <Link to="/">
          <FaLocationArrow size={20} className="ml-1" />
        </Link>
      </div>

      {location.pathname === '/search_cities' ? (
        <form onSubmit={handleSearchSubmit} className="flex items-center mr-2 w-1/2 md:w-1/2">
          <BiSearch size={15} className="text-gray-400 absolute ml-3" />
          <input
            type="text"
            placeholder="Find cities"
            className="w-full pl-10 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={handleSearchChange}
          />
        </form>
      ) : (
        <div className="flex items-center">
          <Link to="/search_cities">
            <button className="bg-gray-700 font-semibold text-white px-4 py-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-blue-500">
              SEARCH FOR A CITY
            </button>
          </Link>
        </div>
      )}

      <div className="flex items-center">
        <ToggleButtonIcon />
      </div>
    </div>
  );
};

export default Navbar;
