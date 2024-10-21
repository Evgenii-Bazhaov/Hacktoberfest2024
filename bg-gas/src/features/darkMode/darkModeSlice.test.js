import darkModeReducer, { toggleMode } from "./darkModeSlice";
import { describe, it, expect } from "@jest/globals";

describe("darkModeSlice", () => {
  const initialState = {
    isDarkMode: false,
  };

  it("should return the initial state", () => {
    expect(darkModeReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle toggleMode", () => {
    const previousState = { isDarkMode: false };
    expect(darkModeReducer(previousState, toggleMode())).toEqual({
      isDarkMode: true,
    });

    const nextState = { isDarkMode: true };
    expect(darkModeReducer(nextState, toggleMode())).toEqual({
      isDarkMode: false,
    });
  });
});
