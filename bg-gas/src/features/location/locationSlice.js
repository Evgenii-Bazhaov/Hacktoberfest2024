import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: 0,
  longitude: 0,
};

// locationSlice is a slice of the Redux store that contains the location state and actions to update the location.
export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    clearAllLocation: (state) => {
      state.latitude = 0;
      state.longitude = 0;
    },
  },
});

export const { setLocation, clearAllLocation } = locationSlice.actions;

export default locationSlice.reducer;
