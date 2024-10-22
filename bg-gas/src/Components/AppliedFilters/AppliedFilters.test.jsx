import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AppliedFilters from "./AppliedFilters";
import { allRoutes } from "../../constants/allRoutes";
import { favoriteBPStations } from "../../constants/localStorage";

import {
  toggleMode,
  handleFilterChange,
  toggleFilterUpdated,
} from "../../features/filters/filtersSlice";
import "../../i18nForTests";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";

const mockStore = configureStore([]);

describe("AppliedFilters Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filters: {
        showModal: false,
        filters: {},
      },
      path: {
        path: allRoutes.results,
      },
      darkMode: {
        isDarkMode: false,
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders loading spinner when loading", () => {
    render(
      <Provider store={store}>
        <AppliedFilters stationDataList={[]} />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders no stations found message when no stations are available", async () => {
    render(
      <Provider store={store}>
        <AppliedFilters stationDataList={[]} />
      </Provider>
    );

    // Wait for loading to finish
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });
    waitFor(() => {
      expect(screen.getByText("No Stations Found")).toBeInTheDocument();
    });
  });

  it("renders stations when station data is available", async () => {
    const stationDataList = [
      {
        stationId: 1,
        title: "Station 1",
        distance: "5 km",
        rating: 4.5,
        contact: "1234567890",
        address: "Address 1",
      },
    ];

    render(
      <Provider store={store}>
        <AppliedFilters stationDataList={stationDataList} />
      </Provider>
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    expect(screen.getByText("Station 1")).toBeInTheDocument();
  });

  it("handles favorite station toggle", async () => {
    const stationDataList = [
      {
        stationId: 1,
        title: "Station 1",
        distance: "5 km",
        rating: 4.5,
        contact: "1234567890",
        address: "Address 1",
      },
    ];

    render(
      <Provider store={store}>
        <AppliedFilters stationDataList={stationDataList} />
      </Provider>
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    const stationElement = screen.getByTestId("favIcon");
    fireEvent.click(stationElement);

    expect(store.dispatch).toHaveBeenCalledWith(toggleFilterUpdated());
  });

  it("renders applied filters", () => {
    store = mockStore({
      filters: {
        showModal: false,
        filters: { filter1: true, filter2: false },
      },
      path: {
        path: allRoutes.results,
      },
      darkMode: {
        isDarkMode: false,
      },
    });

    render(
      <Provider store={store}>
        <AppliedFilters stationDataList={[]} />
      </Provider>
    );

    expect(screen.getByText("Applied Filters :")).toBeInTheDocument();
    expect(screen.getByText("filter1")).toBeInTheDocument();
  });

  it("handles filter change", () => {
    let store;
    store = mockStore({
      filters: {
        showModal: false,
        filters: { filter1: true, filter2: false },
      },
      path: {
        path: allRoutes.results,
      },
      darkMode: {
        isDarkMode: false,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <AppliedFilters stationDataList={[]} />
      </Provider>
    );

    const filterElement = screen.getByTestId("filter1-cross");
    fireEvent.click(filterElement);

    expect(store.dispatch).toHaveBeenCalledWith(
      handleFilterChange({ type: "filter1" })
    );
  });

  it("toggles mode when clicking to apply filters", () => {
    render(
      <Provider store={store}>
        <AppliedFilters stationDataList={[]} />
      </Provider>
    );

    const clickToApplyElement = screen.getByText("Click to Apply");
    fireEvent.click(clickToApplyElement);

    expect(store.dispatch).toHaveBeenCalledWith(toggleMode());
  });
});
