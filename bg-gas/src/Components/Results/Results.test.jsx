import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Results from "./Results";
import { allRoutes } from "../../constants/allRoutes";
import { favoriteBPStations } from "../../constants/localStorage";
import { describe, it, expect, beforeEach } from "@jest/globals";
import "../../i18nForTests";
import { stationDataList } from "../../constants/db";

const mockStore = configureStore([]);

describe("Results Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filters: { filterUpdatedCount: 0 },
      path: { path: "/" },
      darkMode: { isDarkMode: false },
      stationData: { stationDataList: [] },
    });
  });

  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );
  });

  it("should apply dark mode class when dark mode is enabled", () => {
    store = mockStore({
      filters: { filterUpdatedCount: 0 },
      path: { path: "/" },
      darkMode: { isDarkMode: true },
      stationData: { stationDataList: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(container.firstChild).toHaveClass("bg-gray-800");
  });

  it("should apply light mode class when dark mode is disabled", () => {
    const { container } = render(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    expect(container.firstChild).toHaveClass("bg-white");
  });

  it("should update station list when current path is favorite", () => {
    const favoriteStations = stationDataList[0];
    localStorage.setItem(favoriteBPStations, JSON.stringify(favoriteStations));

    store = mockStore({
      filters: { filterUpdatedCount: 0 },
      path: { path: allRoutes.fav },
      darkMode: { isDarkMode: false },
      stationData: { stationDataList: stationDataList },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Results />
      </Provider>
    );
    waitFor(() => expect(getByText("Mumbai BP")).toBeInTheDocument());
  });
});
