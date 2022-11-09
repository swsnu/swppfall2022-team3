import { createSlice } from "@reduxjs/toolkit";
import { majors } from "../../dummyData";
import { Major } from "../../types";
import { RootState } from "../index";


const storeKey = "major";

const getInitialState = (): Major[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    const dummy = JSON.stringify(majors);
    localStorage.setItem(storeKey, dummy);
    savedValue = dummy;
  }
  return JSON.parse(savedValue) as Major[];
};

const majorSlice = createSlice({
  name: "major",
  initialState: { majors: getInitialState() },
  reducers: {},
});

export const selectMajor = (state: RootState) => state.major;
const majorReducer = majorSlice.reducer;
export default majorReducer;
