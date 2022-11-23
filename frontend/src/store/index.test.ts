import { store } from ".";


describe("RootStore", () => {
  it("contains states", () => {
    expect(store.getState()).toHaveProperty("university");
    expect(store.getState()).toHaveProperty("college");
    expect(store.getState()).toHaveProperty("major");
    expect(store.getState()).toHaveProperty("user");
    expect(store.getState()).toHaveProperty("tag");
    expect(store.getState()).toHaveProperty("chat");
  });
});
