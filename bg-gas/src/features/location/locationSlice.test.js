import locationReducer, {
  setLocation,
  clearAllLocation,
} from "./locationSlice";
import { describe, it, expect } from "@jest/globals";

describe("locationSlice reducer", () => {
  const initialState = {
    latitude: 0,
    longitude: 0,
  };

  it("should handle initial state", () => {
    expect(locationReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setLocation", () => {
    const action = {
      payload: {
        latitude: 10,
        longitude: 20,
      },
    };
    const expectedState = {
      latitude: 10,
      longitude: 20,
    };
    expect(locationReducer(initialState, setLocation(action.payload))).toEqual(
      expectedState
    );
  });

  it("should handle clearAllLocation", () => {
    const modifiedState = {
      latitude: 10,
      longitude: 20,
    };
    expect(locationReducer(modifiedState, clearAllLocation())).toEqual(
      initialState
    );
  });
});
