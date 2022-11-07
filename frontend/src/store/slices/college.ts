import { createSlice } from "@reduxjs/toolkit";
import { College } from "../../types";
import { colleges } from "../../dummyData";
import { RootState } from "../index";


const storeKey = "college";

const getInitialState = (): College[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    const dummy = JSON.stringify(colleges);
    localStorage.setItem(storeKey, dummy);
    savedValue = dummy;
  }
  return JSON.parse(savedValue) as College[];
};

const collegeSlice = createSlice({
  name: "college",
  initialState: { colleges: getInitialState() },
  reducers: {},
});

export const selectCollege = (state: RootState) => state.college;
const collegeReducer = collegeSlice.reducer;
export default collegeReducer;
