import { createSlice } from "@reduxjs/toolkit";
import { College } from "../../types";
import dummyData from "../../dummyData";
import { RootState } from "../index";


const storageKey = "college";

const getInitialState = (): College[] => {
  let savedValue = localStorage.getItem(storageKey);
  if (savedValue === null) {
    localStorage.setItem(storageKey, JSON.stringify(dummyData.colleges));
    savedValue = localStorage.getItem(storageKey);
  }
  return JSON.parse(savedValue!) as College[];
};

const collegeSlice = createSlice({
  name: "college",
  initialState: { colleges: getInitialState() },
  reducers: {},
})

export const selectCollege = (state: RootState) => state.college;
const collegeReducer = collegeSlice.reducer;
export default collegeReducer;
