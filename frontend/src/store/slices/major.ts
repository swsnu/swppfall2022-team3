import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Major } from "../../types";
import { RootState } from "../index";
import { majorUrl } from "../urls";


export interface MajorState {
  majors: Major[];
}

const initialState: MajorState = {
  majors: [],
};

export const getMajorsByCollege = createAsyncThunk(
  "major/get-all-by-college",
  async (collegeKey: number): Promise<Major[] | null> => {
    try {
      const response = await axios.get(`${majorUrl}college/${collegeKey}/`);
      if (response.status === 200) {
        return response.data as Major[];
      } else {
        return null;
      }
    } catch (_) {
      return null;
    }
  }
);

export const getMajorsByUniversity = createAsyncThunk(
  "major/get-all-by-university",
  async (universityKey: number): Promise<Major[] | null> => {
    try {
      const response = await axios.get(`${majorUrl}university/${universityKey}/`);
      if (response.status === 200) {
        return response.data as Major[];
      } else {
        return null;
      }
    } catch (_) {
      return null;
    }
  }
);

const majorSlice = createSlice({
  name: "major",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMajorsByCollege.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.majors = action.payload;
        }
      }
    );
    builder.addCase(
      getMajorsByUniversity.fulfilled,
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
