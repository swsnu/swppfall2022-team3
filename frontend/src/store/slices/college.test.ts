import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { colleges } from "../../dummyData";
import { College } from "../../types";
import collegeReducer from "./college";


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
});
