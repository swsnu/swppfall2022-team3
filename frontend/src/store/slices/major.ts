import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Major } from "../../types";
import { RootState } from "../index";


const majorUrl = "/majors/";

export interface MajorState {
  majors: Major[];
}

const initialState: MajorState = {
  majors: [],
};

export const getMajors = createAsyncThunk(
  "major/get-all-by-college",
  async (collegeKey: number): Promise<Major[] | null> => {
    const response = await axios.get(`${majorUrl}college/${collegeKey}/`);
    if (response.status === 200) {
      return response.data as Major[];
    }
    return null;
  }
);

const majorSlice = createSlice({
  name: "major",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMajors.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.majors = action.payload;
        }
      }
    );
  }
});

export const selectMajor = (state: RootState) => state.major;
const majorReducer = majorSlice.reducer;
export default majorReducer;
