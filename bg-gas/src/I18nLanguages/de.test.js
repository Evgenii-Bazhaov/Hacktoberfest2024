import { germanTranslation } from "./de";
import { describe, test, expect } from "@jest/globals";
describe("German Translation Tests", () => {
  test("should have correct translation for chooseFilters", () => {
    expect(germanTranslation.chooseFilters).toBe("Wähle Filter :");
  });

  test("should have correct translation for title", () => {
    expect(germanTranslation.title).toBe("Finde BP");
  });

  test("should have correct translation for open24", () => {
    expect(germanTranslation.open24).toBe("24 Stunden geöffnet");
  });

  test("should have correct translation for convenienceStore", () => {
    expect(germanTranslation.convenienceStore).toBe(
      "Convenience Store verfügbar"
    );
  });

  test("should have correct translation for hotFood", () => {
    expect(germanTranslation.hotFood).toBe(
      "Geschäft bereitet und serviert warmes Essen"
    );
  });

  test("should have correct translation for bpFuelCards", () => {
    expect(germanTranslation.bpFuelCards).toBe("Akzeptiere bp-Tankkarten");
  });

  test("should have correct translation for clearAllFilters", () => {
    expect(germanTranslation.clearAllFilters).toBe("Alle Filter löschen");
  });

  test("should have correct translation for applyFilters", () => {
    expect(germanTranslation.applyFilters).toBe("Filter anwenden");
  });

  test("should have correct translation for appliedFilters", () => {
    expect(germanTranslation.appliedFilters).toBe("Angewendete Filter :");
  });

  test("should have correct translation for noFiltersApplied", () => {
    expect(germanTranslation.noFiltersApplied).toBe("Keine Filter angewendet.");
  });

  test("should have correct translation for clickToApply", () => {
    expect(germanTranslation.clickToApply).toBe("Klicken Sie zum Anwenden");
  });

  test("should have correct translation for fetchingStations", () => {
    expect(germanTranslation.fetchingStations).toBe("Stationen abrufen...");
  });

  test("should have correct translation for noStationsFound", () => {
    expect(germanTranslation.noStationsFound).toBe("Keine Stationen gefunden");
  });

  test("should have correct translation for errorFetchingAddress", () => {
    expect(germanTranslation.errorFetchingAddress).toBe(
      "Fehler beim Abrufen der Adresse"
    );
  });

  test("should have correct translation for geoLoacationNotSupported", () => {
    expect(germanTranslation.geoLoacationNotSupported).toBe(
      "Geolocation wird von diesem Browser nicht unterstützt."
    );
  });

  test("should have correct translation for fetchingLocation", () => {
    expect(germanTranslation.fetchingLocation).toBe("Standort abrufen");
  });

  test("should have correct translation for currentLocation", () => {
    expect(germanTranslation.currentLocation).toBe("Aktueller Standort");
  });

  test("should have correct translation for copyRight", () => {
    expect(germanTranslation.copyRight).toBe("Urheberrecht © 1996-2024");
  });

  test("should have correct translation for privacyStatement", () => {
    expect(germanTranslation.privacyStatement).toBe("Datenschutzerklärung");
  });

  test("should have correct translation for legalNotice", () => {
    expect(germanTranslation.legalNotice).toBe("Rechtlicher Hinweis");
  });

  test("should have correct translation for conatctUs", () => {
    expect(germanTranslation.conatctUs).toBe("Kontaktiere uns");
  });

  test("should have correct translation for radius", () => {
    expect(germanTranslation.radius).toBe("Radius");
  });

  test("should have correct translation for inMiles", () => {
    expect(germanTranslation.inMiles).toBe("in Meilen");
  });

  test("should have correct translation for editFilters", () => {
    expect(germanTranslation.editFilters).toBe("Filter bearbeiten");
  });

  test("should have correct translation for moreFilters", () => {
    expect(germanTranslation.moreFilters).toBe("Mehr Filter");
  });

  test("should have correct translation for startSearch", () => {
    expect(germanTranslation.startSearch).toBe("Suche starten");
  });

  test("should have correct translation for enterManually", () => {
    expect(germanTranslation.enterManually).toBe(
      "ODER Geben Sie eine Adresse ein, um Vorschläge zu erhalten"
    );
  });

  test("should have correct translation for distance", () => {
    expect(germanTranslation.distance).toBe("Entfernung");
  });

  test("should have correct translation for rating", () => {
    expect(germanTranslation.rating).toBe("Bewertung");
  });

  test("should have correct translation for contact", () => {
    expect(germanTranslation.contact).toBe("Kontakt");
  });

  test("should have correct translation for address", () => {
    expect(germanTranslation.address).toBe("Adresse");
  });
});
