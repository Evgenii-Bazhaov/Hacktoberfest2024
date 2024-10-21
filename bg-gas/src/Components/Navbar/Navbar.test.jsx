import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";
import Navbar from "./Navbar";
import { toggleMode } from "../../features/darkMode/darkModeSlice";
import { setpath } from "../../features/path/pathSlice";
import { allRoutes } from "../../constants/allRoutes";
import { describe, test, beforeEach, expect, jest } from "@jest/globals";
const mockStore = configureStore([]);

describe("Navbar Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      darkMode: { isDarkMode: false },
      path: { path: "/" },
    });

    store.dispatch = jest.fn();
  });

  test("renders Navbar component", () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Navbar />
        </I18nextProvider>
      </Provider>
    );

    expect(screen.getByAltText("BP Logo")).toBeInTheDocument();
    expect(screen.getByText(i18n.t("title"))).toBeInTheDocument();
  });

  test("toggles dark mode", () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Navbar />
        </I18nextProvider>
      </Provider>
    );

    const toggleButton = screen.getByAltText("Theme Mode");
    fireEvent.click(toggleButton);

    expect(store.dispatch).toHaveBeenCalledWith(toggleMode());
  });

  test("changes language", () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Navbar />
        </I18nextProvider>
      </Provider>
    );

    const select = screen.getByTestId("de");
    fireEvent.click(select);

  });

  test("sets path to favorites", () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Navbar />
        </I18nextProvider>
      </Provider>
    );

    const favButton = screen.getByAltText("Fav");
    fireEvent.click(favButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      setpath({ path: allRoutes.fav })
    );
  });
});
