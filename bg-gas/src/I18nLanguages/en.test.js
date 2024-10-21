import { englishTranslation } from "./en";
import { describe, it, expect } from "@jest/globals";
describe("englishTranslation", () => {
  it("should have the correct translation for chooseFilters", () => {
    expect(englishTranslation.chooseFilters).toBe("Choose Filters :");
  });

  it("should have the correct translation for title", () => {
    expect(englishTranslation.title).toBe("Find BP");
  });

  it("should have the correct translation for open24", () => {
    expect(englishTranslation.open24).toBe("Open 24 hours");
  });

  it("should have the correct translation for convenienceStore", () => {
    expect(englishTranslation.convenienceStore).toBe(
      "Convenience Store available"
    );
  });

  it("should have the correct translation for hotFood", () => {
    expect(englishTranslation.hotFood).toBe(
      "Store prepared and serve hot food"
    );
  });

  it("should have the correct translation for bpFuelCards", () => {
    expect(englishTranslation.bpFuelCards).toBe("Accept bp fuel cards");
  });

  it("should have the correct translation for clearAllFilters", () => {
    expect(englishTranslation.clearAllFilters).toBe("Clear All Filters");
  });

  it("should have the correct translation for applyFilters", () => {
    expect(englishTranslation.applyFilters).toBe("Apply Filters");
  });

  it("should have the correct translation for appliedFilters", () => {
    expect(englishTranslation.appliedFilters).toBe("Applied Filters :");
  });

  it("should have the correct translation for noFiltersApplied", () => {
    expect(englishTranslation.noFiltersApplied).toBe("No filters applied.");
  });

  it("should have the correct translation for clickToApply", () => {
    expect(englishTranslation.clickToApply).toBe("Click to Apply");
  });

  it("should have the correct translation for fetchingStations", () => {
    expect(englishTranslation.fetchingStations).toBe("Fetching Stations...");
  });

  it("should have the correct translation for noStationsFound", () => {
    expect(englishTranslation.noStationsFound).toBe("No Stations Found");
  });

  it("should have the correct translation for errorFetchingAddress", () => {
    expect(englishTranslation.errorFetchingAddress).toBe(
      "Error fetching address"
    );
  });

  it("should have the correct translation for geoLoacationNotSupported", () => {
    expect(englishTranslation.geoLoacationNotSupported).toBe(
      "Geolocation is not supported by this browser."
    );
  });

  it("should have the correct translation for fetchingLocation", () => {
    expect(englishTranslation.fetchingLocation).toBe("Fetching location");
  });

  it("should have the correct translation for currentLocation", () => {
    expect(englishTranslation.currentLocation).toBe("Current Location");
  });

  it("should have the correct translation for copyRight", () => {
    expect(englishTranslation.copyRight).toBe("Copyright © 1996-2024");
  });

  it("should have the correct translation for privacyStatement", () => {
    expect(englishTranslation.privacyStatement).toBe("Privacy statement");
  });

  it("should have the correct translation for legalNotice", () => {
    expect(englishTranslation.legalNotice).toBe("Legal notice");
  });

  it("should have the correct translation for conatctUs", () => {
    expect(englishTranslation.conatctUs).toBe("Contact us");
  });

  it("should have the correct translation for radius", () => {
    expect(englishTranslation.radius).toBe("Radius");
  });

  it("should have the correct translation for inMiles", () => {
    expect(englishTranslation.inMiles).toBe("in miles");
  });

  it("should have the correct translation for editFilters", () => {
    expect(englishTranslation.editFilters).toBe("Edit Filters");
  });

  it("should have the correct translation for moreFilters", () => {
    expect(englishTranslation.moreFilters).toBe("More Filters");
  });

  it("should have the correct translation for startSearch", () => {
    expect(englishTranslation.startSearch).toBe("Start Search");
  });

  it("should have the correct translation for enterManually", () => {
    expect(englishTranslation.enterManually).toBe(
      "OR Enter an address to get suggestions"
    );
  });

  it("should have the correct translation for distance", () => {
    expect(englishTranslation.distance).toBe("Distance");
  });

  it("should have the correct translation for rating", () => {
    expect(englishTranslation.rating).toBe("Rating");
  });

  it("should have the correct translation for contact", () => {
    expect(englishTranslation.contact).toBe("Contact");
  });

  it("should have the correct translation for address", () => {
    expect(englishTranslation.address).toBe("Address");
  });
});
