import { createSlice } from "@reduxjs/toolkit";
import { universities } from "../../dummyData";
import { University } from "../../types";
import { RootState } from "../index";


const storeKey = "university";

const getInitialState = (): University[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    const dummy = JSON.stringify(universities);
    localStorage.setItem(storeKey, dummy);
    savedValue = dummy;
  }
  return JSON.parse(savedValue) as University[];
};

const universitySlice = createSlice({
  name: "university",
  initialState: { universities: getInitialState() },
  reducers: {},
});

export const selectUniversity = (state: RootState) => state.university;
const universityReducer = universitySlice.reducer;
export default universityReducer;
