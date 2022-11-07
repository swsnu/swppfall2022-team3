import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { photos } from "../../dummyData";
import { Photo } from "../../types";
import { RootState } from "../index";


const storeKey = "photo";

const getInitialState = (): Photo[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    const dummy = JSON.stringify(photos);
    localStorage.setItem(storeKey, dummy);
    savedValue = dummy;
  }
  return JSON.parse(savedValue) as Photo[];
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
});

export const selectPhoto = (state: RootState) => state.photo;
const photoReducer = photoSlice.reducer;
export default photoReducer;
