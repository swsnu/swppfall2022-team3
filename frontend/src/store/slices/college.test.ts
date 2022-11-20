import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { colleges } from "../../dummyData";
import { College } from "../../types";
import collegeReducer, { getColleges } from "./college";


describe("college reducer", () => {
  const testCollege = colleges[0];
  let store: EnhancedStore<
    { college: { colleges: College[] } },
    AnyAction,
    [ThunkMiddleware<{ college: { colleges: College[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { college: collegeReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().college.colleges).toEqual([]);
  });
  it("should handle getColleges", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [testCollege], status: 200 });
    await store.dispatch(getColleges(3));
    expect(store.getState().college.colleges).toEqual([testCollege]);
  });
  it("should handle 500 getColleges", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [], status: 500 });
    await store.dispatch(getColleges(3));
    expect(store.getState().college.colleges).toEqual([]);
  });
});
