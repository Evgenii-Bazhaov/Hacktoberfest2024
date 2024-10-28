import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { englishTranslation, germanTranslation } from "./I18nLanguages";

// Initialize i18n with the translations
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: { ...englishTranslation },
    },
    de: {
      translation: { ...germanTranslation },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
