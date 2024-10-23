import { store } from "./store";
import { describe, it, expect } from "@jest/globals";
describe("Redux Store", () => {
  it("should have darkMode reducer", () => {
    const state = store.getState();
    expect(state.darkMode).toBeDefined();
  });

  it("should have filters reducer", () => {
    const state = store.getState();
    expect(state.filters).toBeDefined();
  });

  it("should have location reducer", () => {
    const state = store.getState();
    expect(state.location).toBeDefined();
  });

  it("should have path reducer", () => {
    const state = store.getState();
    expect(state.path).toBeDefined();
  });

  it("should have stationData reducer", () => {
    const state = store.getState();
    expect(state.stationData).toBeDefined();
  });
});
