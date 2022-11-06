import { createSlice } from "@reduxjs/toolkit";
import { Tag } from "../../types";
import { tags } from "../../dummyData";
import { RootState } from "../index";


const storeKey = "tag";

const getInitialState = (): Tag[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    localStorage.setItem(storeKey, JSON.stringify(tags));
    savedValue = localStorage.getItem(storeKey);
  }
  return JSON.parse(savedValue!) as Tag[];
};

const tagSlice = createSlice({
  name: "tag",
  initialState: { tags: getInitialState() },
  reducers: {},
});

export const selectTag = (state: RootState) => state.tag;
const tagReducer = tagSlice.reducer;
export default tagReducer;
