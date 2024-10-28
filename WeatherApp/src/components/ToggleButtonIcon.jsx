import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToggleButton from 'react-toggle-button';
import { toggleUnit } from '../redux/weatherSlice';

const ToggleButtonIcon = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.weather.unit);
  const isCelsius = unit === 'metric';

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <div className="flex items-center">
      <ToggleButton
        value={isCelsius}
        onToggle={handleToggle}
        inactiveLabel={'°C'}
        activeLabel={'°F'}
        colors={{
          activeThumb: {
            base: 'rgb(255, 255, 255)', 
          },
          inactiveThumb: {
            base: 'rgb(255, 215, 0)', 
          },
          active: {
            base: 'rgb(0, 123, 255)', 
            hover: 'rgb(0, 105, 217)', 
          },
          inactive: {
            base: 'rgb(128, 128, 128)', 
            hover: 'rgb(105, 105, 105)', 
          },
        }}
      />
    </div>
  );
};

export default ToggleButtonIcon;
