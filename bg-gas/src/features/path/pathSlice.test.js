import pathReducer, { setpath, resetPath } from "./pathSlice";
import { allRoutes } from "../../constants/allRoutes";
import { describe, it, expect } from "@jest/globals";
describe("pathSlice reducer", () => {
  const initialState = {
    path: allRoutes.homepage,
  };

  it("should return the initial state", () => {
    expect(pathReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setpath", () => {
    const newPath = allRoutes.dashboard;
    const action = {
      type: setpath.type,
      payload: { path: newPath },
    };
    const expectedState = {
      path: newPath,
    };
    expect(pathReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle resetPath", () => {
    const modifiedState = {
      path: allRoutes.dashboard,
    };
    const action = {
      type: resetPath.type,
    };
    expect(pathReducer(modifiedState, action)).toEqual(initialState);
  });
});
