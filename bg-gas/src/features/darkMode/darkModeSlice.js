import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
};

// darkModeSlice is a slice of the Redux store that contains the dark mode state and the toggleMode action.
export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
