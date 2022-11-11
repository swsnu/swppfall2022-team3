import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { Major } from "../../types";
import majorReducer from "./major";
import { majors } from "../../dummyData";


describe("major reducer", () => {
  let store: EnhancedStore<
    { major: { majors: Major[] } },
    AnyAction,
    [ThunkMiddleware<{ major: { majors: Major[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { major: majorReducer } });
  })

  it("should have initial state", () => {
    expect(store.getState().major.majors).toEqual(majors);
  });
})
