import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { College } from "../../types";
import collegeReducer from "./college";
import { colleges } from "../../dummyData";


describe("college reducer", () => {
  let store: EnhancedStore<
    { college: { colleges: College[] } },
    AnyAction,
    [ThunkMiddleware<{ college: { colleges: College[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { college: collegeReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().college.colleges).toEqual(colleges);
  });
})
