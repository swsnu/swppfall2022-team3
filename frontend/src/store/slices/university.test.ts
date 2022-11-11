import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { University } from "../../types";
import universityReducer from "./university";
import { universities } from "../../dummyData";


describe("university reducer", () => {
  let store: EnhancedStore<
    { university: { universities: University[] } },
    AnyAction,
    [ThunkMiddleware<{ university: { universities: University[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { university: universityReducer } });
  })

  it("should have initial state", () => {
    expect(store.getState().university.universities).toEqual(universities);
  });
})
