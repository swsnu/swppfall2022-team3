import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { majors} from "../../dummyData";
import { Major } from "../../types";
import majorReducer, { getMajors } from "./major";


describe("major reducer", () => {
  const testMajor = majors[0];
  let store: EnhancedStore<
    { major: { majors: Major[] } },
    AnyAction,
    [ThunkMiddleware<{ major: { majors: Major[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { major: majorReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().major.majors).toEqual([]);
  });
  it("should handle getMajors", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [testMajor], status: 200 });
    await store.dispatch(getMajors(3));
    expect(store.getState().major.majors).toEqual([testMajor]);
  });
  it("should handle 500 getMajors", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [], status: 500 });
    await store.dispatch(getMajors(3));
    expect(store.getState().major.majors).toEqual([]);
  });
});
