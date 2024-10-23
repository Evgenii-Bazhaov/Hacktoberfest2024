import stationDataReducer, {
  setStationData,
  resetStationData,
} from "./stationDataSlice";
import { stationDataList } from "../../constants/db";
import { describe, it, expect } from "@jest/globals";
describe("stationDataSlice", () => {
  const initialState = {
    stationDataList: stationDataList,
  };

  it("should return the initial state", () => {
    expect(stationDataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setStationData", () => {
    const previousState = { ...initialState, stationData: [] };
    const newStationData = [
      { id: 1, name: "Station 1" },
      { id: 2, name: "Station 2" },
    ];
    const action = setStationData({ stationData: newStationData });
    const expectedState = { ...initialState, stationData: newStationData };

    expect(stationDataReducer(previousState, action)).toEqual(expectedState);
  });

  it("should handle resetStationData", () => {
    const previousState = {
      ...initialState,
      stationData: [{ id: 1, name: "Station 1" }],
    };
    const action = resetStationData();
    const expectedState = { ...initialState, stationData: [] };

    expect(stationDataReducer(previousState, action)).toEqual(expectedState);
  });
});
