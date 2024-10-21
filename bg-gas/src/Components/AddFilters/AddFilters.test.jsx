import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddFilters from "./AddFilters";
import "../../i18nForTests";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import "../../i18nForTests";

const mockStore = configureStore([]);

describe("AddFilters Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filters: {
        filters: {
          open24: false,
          convinienceStore: false,
          hotFood: false,
          bpFuelCards: false,
        },
      },
      darkMode: {
        isDarkMode: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders AddFilters component", () => {
    render(
      <Provider store={store}>
        <AddFilters />
      </Provider>
    );

    expect(screen.getByText("Choose Filters :")).toBeInTheDocument();
    expect(screen.getByText("Open 24 hours")).toBeInTheDocument();
    expect(screen.getByText("Convenience Store available")).toBeInTheDocument();
    expect(
      screen.getByText("Store prepared and serve hot food")
    ).toBeInTheDocument();
    expect(screen.getByText("Accept bp fuel cards")).toBeInTheDocument();
  });

  it("toggles dark mode on close button click", () => {
    render(
      <Provider store={store}>
        <AddFilters />
      </Provider>
    );

    fireEvent.click(screen.getByAltText("modal close"));
    expect(store.dispatch).toHaveBeenCalledWith({ type: "filters/toggleMode" });
  });

  it("dispatches handleFilterChange on checkbox change", () => {
    render(
      <Provider store={store}>
        <AddFilters />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("bpFuelCards"));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "filters/handleFilterChange",
      payload: { type: "bpFuelCards" },
    });
  });

  it("dispatches clearAllFilters on clear all filters click", () => {
    render(
      <Provider store={store}>
        <AddFilters />
      </Provider>
    );

    fireEvent.click(screen.getByText("Clear All Filters"));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "filters/clearAllFilters",
    });
  });

  it("dispatches toggleMode and logs filters on apply filters button click", () => {
    console.log = jest.fn();

    render(
      <Provider store={store}>
        <AddFilters />
      </Provider>
    );

    fireEvent.click(screen.getByText("Apply Filters"));
    expect(store.dispatch).toHaveBeenCalled();
  });
});
