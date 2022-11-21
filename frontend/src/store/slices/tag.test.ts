import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { tags } from "../../dummyData";
import { Tag } from "../../types";
import tagReducer, { getTags } from "./tag";


describe("tag reducer", () => {
  const testTag = tags[0];
  let store: EnhancedStore<
    { tag: { tags: Tag[] } },
    AnyAction,
    [ThunkMiddleware<{ tag: { tags: Tag[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { tag: tagReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().tag.tags).toEqual([]);
  });

  it("should handle getTags", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [testTag], status: 200 });
    await store.dispatch(getTags());
    expect(store.getState().tag.tags).toEqual([testTag]);
  });

  it("should handle 500 getTags", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [], status: 500 });
    await store.dispatch(getTags());
    expect(store.getState().tag.tags).toEqual([]);
  });
});
