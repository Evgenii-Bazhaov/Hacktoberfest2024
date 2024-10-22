import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "Landing",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setCurrentPage: (state, actions) => {
      state.currentPage = actions.payload.currentPage;
    },
  },
});


export const { setCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;
