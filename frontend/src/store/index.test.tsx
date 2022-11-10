import { store } from ".";


describe("RootStore", () => {
  it("contains states", () => {
    expect(store.getState()).toHaveProperty("university");
  });
});
