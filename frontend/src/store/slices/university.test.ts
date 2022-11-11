import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { universities } from "../../dummyData";
import { University } from "../../types";
import universityReducer from "./university";


describe("university reducer", () => {
  let store: EnhancedStore<
    { university: { universities: University[] } },
    AnyAction,
    [ThunkMiddleware<{ university: { universities: University[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { university: universityReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().university.universities).toEqual(universities);
  });
});
