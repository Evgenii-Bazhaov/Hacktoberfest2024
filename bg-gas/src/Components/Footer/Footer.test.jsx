import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import Footer from "./Footer";
import { describe, it, beforeEach, expect } from "@jest/globals";
const mockStore = configureStore([]);

describe("Footer Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      darkMode: { isDarkMode: false },
    });

    i18n.init({
      lng: "en",
      resources: {
        en: {
          translation: {
            copyRight: "© 2023 BP p.l.c.",
            privacyStatement: "Privacy Statement",
            legalNotice: "Legal Notice",
            conatctUs: "Contact Us",
          },
        },
      },
    });
  });

  it("should render Footer component", () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Footer />
        </I18nextProvider>
      </Provider>
    );

    expect(getByAltText("BP Logo")).toBeInTheDocument();
    expect(getByText("© 2023 BP p.l.c.")).toBeInTheDocument();
    expect(getByText("Privacy Statement")).toBeInTheDocument();
    expect(getByText("Legal Notice")).toBeInTheDocument();
    expect(getByText("Contact Us")).toBeInTheDocument();
  });

  it("should apply dark mode styles when darkMode is true", () => {
    store = mockStore({
      darkMode: { isDarkMode: true },
    });

    const { container } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Footer />
        </I18nextProvider>
      </Provider>
    );

    expect(container.firstChild).toHaveClass("bg-black");
    expect(container.querySelector(".text-slate-400")).toBeInTheDocument();
    expect(container.querySelector(".text-white")).toBeInTheDocument();
  });

  it("should apply light mode styles when darkMode is false", () => {
    const { container } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Footer />
        </I18nextProvider>
      </Provider>
    );

    expect(container.firstChild).toHaveClass("bg-slate-200");
    expect(container.querySelector(".text-gray-500")).toBeInTheDocument();
    expect(container.querySelector(".text-black")).toBeInTheDocument();
  });
});
