import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { Tag } from "../../types";
import tagReducer from "./tag";
import { tags } from "../../dummyData";


describe("tag reducer", () => {
  let store: EnhancedStore<
    { tag: { tags: Tag[] } },
    AnyAction,
    [ThunkMiddleware<{ tag: { tags: Tag[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { tag: tagReducer } });
  })

  it("should have initial state", () => {
    expect(store.getState().tag.tags).toEqual(tags);
  });
})
