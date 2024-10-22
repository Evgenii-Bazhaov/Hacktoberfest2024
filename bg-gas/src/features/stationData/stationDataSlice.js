import { createSlice } from "@reduxjs/toolkit";
import { stationDataList } from "../../constants/db";
const initialState = {
  stationDataList: stationDataList,
};

// stationDataSlice is a slice of the Redux store that contains the stationData state and actions to update the stationData.
export const stationDataSlice = createSlice({
  name: "stationData",
  initialState,
  reducers: {
    setStationData: (state, action) => {
      state.stationData = action.payload.stationData;
    },
    resetStationData: (state) => {
      state.stationData = [];
    },
  },
});

export const { setStationData, resetStationData } = stationDataSlice.actions;

export default stationDataSlice.reducer;
