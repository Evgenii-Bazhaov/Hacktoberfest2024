import i18n from "./i18n";
import { englishTranslation, germanTranslation } from "./I18nLanguages";
import { describe, it, expect } from "@jest/globals";
describe("i18n configuration", () => {
  it("should initialize with English as the default language", () => {
    expect(i18n.language).toBe("en");
  });

  it("should have English translations", () => {
    expect(i18n.getResourceBundle("en", "translation")).toEqual(
      englishTranslation
    );
  });

  it("should have German translations", () => {
    expect(i18n.getResourceBundle("de", "translation")).toEqual(
      germanTranslation
    );
  });

  it("should fallback to English if the language is not available", () => {
    i18n.changeLanguage("fr");
    expect(i18n.language).toBe("fr");
    expect(i18n.t("someKey")).toBe(i18n.t("someKey", { lng: "en" }));
  });

  it("should not escape values during interpolation", () => {
    const unsafeString = '<script>alert("XSS")</script>';
    const translationKey = "testKey";
    i18n.addResource("en", "translation", translationKey, unsafeString);
    expect(i18n.t(translationKey)).toBe(unsafeString);
  });
});
