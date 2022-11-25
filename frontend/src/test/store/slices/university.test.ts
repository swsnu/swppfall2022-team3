import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { universities } from "../../../dummyData";
import universityReducer, { getUniversities, RawUniversity } from "../../../store/slices/university";
import { University } from "../../../types";


const universityToRawData = (university: University): RawUniversity => ({
  key: university.key,
  name: university.name,
  email_domain: university.domain,
});

describe("university reducer", () => {
  const testUniversity = universities[0];
  const testRawUniversity = universityToRawData(testUniversity);

  let store: EnhancedStore<
    { university: { universities: University[] } },
    AnyAction,
    [ThunkMiddleware<{ university: { universities: University[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { university: universityReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().university.universities).toEqual([]);
  });

  it("should handle getUniversities", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [testRawUniversity], status: 200 });
    await store.dispatch(getUniversities());
    expect(store.getState().university.universities).toEqual([testUniversity]);
  });

  it("should handle 500 getUniversities", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [], status: 500 });
    await store.dispatch(getUniversities());
    expect(store.getState().university.universities).toEqual([]);
  });
});
