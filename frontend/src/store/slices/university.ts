import { createSlice } from "@reduxjs/toolkit";
import { University } from "../../types";
import { universities } from "../../dummyData";
import { RootState } from "../index";


const storeKey = "university";

const getInitialState = (): University[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    localStorage.setItem(storeKey, JSON.stringify(universities));
    savedValue = localStorage.getItem(storeKey);
  }
  return JSON.parse(savedValue!) as University[];
};

const universitySlice = createSlice({
  name: "university",
  initialState: { universities: getInitialState() },
  reducers: {},
});

export const selectUniversity = (state: RootState) => state.university;
const universityReducer = universitySlice.reducer;
export default universityReducer;
