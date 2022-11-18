import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { College } from "../../types";
import { RootState } from "../index";


const collegeUrl = "/colleges/";

export interface CollegeState {
  colleges: College[];
}

const initialState: CollegeState = {
  colleges: [],
};

export const getColleges = createAsyncThunk(
  "college/get-all-by-university",
  async (universityKey: number): Promise<College[] | null> => {
    const response = await axios.get(`${collegeUrl}university/${universityKey}/`);
    if (response.status === 200) {
      return response.data as College[];
    }
    return null;
  }
);


const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getColleges.fulfilled,
      (state,action) => {
        if (action.payload) {
          state.colleges = action.payload;
        }
      }
    );
  }
});

export const selectCollege = (state: RootState) => state.college;
const collegeReducer = collegeSlice.reducer;
export default collegeReducer;
