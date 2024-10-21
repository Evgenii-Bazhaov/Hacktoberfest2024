import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkMode/darkModeSlice";
import filtersReducer from "./features/filters/filtersSlice";
import locationReducer from "./features/location/locationSlice";
import pathReducer from "./features/path/pathSlice";
import stationDataReducer from "./features/stationData/stationDataSlice";

// store is the Redux store that contains the reducers for dark mode, filters, location, path, and station data.
export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    filters: filtersReducer,
    location: locationReducer,
    path: pathReducer,
    stationData: stationDataReducer,
  },
});
