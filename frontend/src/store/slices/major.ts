import { createSlice } from "@reduxjs/toolkit";
import { Major } from "../../types";
import { majors } from "../../dummyData";
import { RootState } from "../index";


const storeKey = "major";

const getInitialState = (): Major[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    localStorage.setItem(storeKey, JSON.stringify(majors));
    savedValue = localStorage.getItem(storeKey);
  }
  return JSON.parse(savedValue!) as Major[];
};

const majorSlice = createSlice({
  name: "major",
  initialState: { majors: getInitialState() },
  reducers: {},
});

export const selectMajor = (state: RootState) => state.major;
const majorReducer = majorSlice.reducer;
export default majorReducer;
