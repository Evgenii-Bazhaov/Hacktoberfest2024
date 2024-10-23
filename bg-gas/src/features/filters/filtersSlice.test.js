import { describe, it, expect } from "@jest/globals";
import filtersReducer, {
  clearAllFilters,
  toggleMode,
  handleFilterChange,
  changeRadius,
  toggleFilterUpdated,
} from "./filtersSlice";

describe("filtersSlice", () => {
  const initialState = {
    showModal: false,
    filters: {
      open24: false,
      convinienceStore: false,
      hotFood: false,
      bpFuelCards: false,
    },
    radius: 0.5,
    filterUpdatedCount: 0,
  };

  it("should return the initial state", () => {
    expect(filtersReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle clearAllFilters", () => {
    const previousState = {
      ...initialState,
      filters: {
        open24: true,
        convinienceStore: true,
        hotFood: true,
        bpFuelCards: true,
      },
    };
    expect(filtersReducer(previousState, clearAllFilters())).toEqual(
      initialState
    );
  });

  it("should handle toggleMode", () => {
    const previousState = { ...initialState, showModal: false };
    expect(filtersReducer(previousState, toggleMode())).toEqual({
      ...initialState,
      showModal: true,
    });
  });

  it("should handle handleFilterChange", () => {
    const previousState = {
      ...initialState,
      filters: { ...initialState.filters, open24: false },
    };
    expect(
      filtersReducer(previousState, handleFilterChange({ type: "open24" }))
    ).toEqual({
      ...initialState,
      filters: { ...initialState.filters, open24: true },
    });
  });

  it("should handle changeRadius", () => {
    const previousState = { ...initialState, radius: 0.5 };
    expect(filtersReducer(previousState, changeRadius(1.0))).toEqual({
      ...initialState,
      radius: 1.0,
    });
  });

  it("should handle toggleFilterUpdated", () => {
    const previousState = { ...initialState, filterUpdatedCount: 0 };
    expect(filtersReducer(previousState, toggleFilterUpdated())).toEqual({
      ...initialState,
      filterUpdatedCount: 1,
    });
  });
});
