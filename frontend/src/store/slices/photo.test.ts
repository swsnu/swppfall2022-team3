import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { Photo } from "../../types";
import photoReducer, { photoActions } from "./photo";
import { photos } from "../../dummyData";


describe("photo reducer", () => {
  let store: EnhancedStore<
    { photo: { photos: Photo[] } },
    AnyAction,
    [ThunkMiddleware<{ photo: { photos: Photo[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { photo: photoReducer } });
  })

  it("should add a photo properly", () => {
    const newPhoto: Photo = {
      key: 100,
      path: "photo",
      index: 1,
    }

    store.dispatch(photoActions.add(newPhoto));
    expect(store.getState().photo.photos).toEqual([...photos, newPhoto]);
  });
})
