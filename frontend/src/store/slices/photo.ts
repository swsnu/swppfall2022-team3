import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../../types";
import DummyData from "../../DummyData";
import { RootState } from "../index";


const storeKey = "photo";

const getInitialState = (): Photo[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    localStorage.setItem(storeKey, JSON.stringify(DummyData.photos));
    savedValue = localStorage.getItem(storeKey);
  }
  return JSON.parse(savedValue!) as Photo[];
};

const photoSlice = createSlice({
  name: "photo",
  initialState: { photos: getInitialState() },
  reducers: {
    add: (state, action: PayloadAction<Photo>) => {
      const newPhotos = [...state.photos, action.payload];
      localStorage.setItem(storeKey, JSON.stringify(newPhotos));
      state.photos = newPhotos;
    },
  },
})

export const selectPhoto = (state: RootState) => state.photo;
const photoReducer = photoSlice.reducer;
export default photoReducer;
