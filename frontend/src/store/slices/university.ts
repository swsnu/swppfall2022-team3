import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { University } from "../../types";
import { RootState } from "../index";
import { universityUrl } from "../urls";


export type RawUniversity = {
  key: number;
  name: string;
  email_domain: string;
}

const rawDataToUniversity = (rawData: RawUniversity): University => ({
  key: rawData.key,
  name: rawData.name,
  domain: rawData.email_domain,
});

export interface UniversityState {
  universities: University[];
}

const initialState: UniversityState = {
  universities: [],
};

export const getUniversities = createAsyncThunk(
  "university/get-all",
  async (): Promise<University[] | null> => {
    const response = await axios.get(`${universityUrl}/`);
    if (response.status === 200) {
      const rawData: RawUniversity[] = response.data;
      return rawData.map(rawDataToUniversity);
    }
    return null;
  }
);

const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUniversities.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.universities = action.payload;
          state.universities = state.universities.filter((u) => u.name !== "admin");
        }
      }
    );
  }
});

export const selectUniversity = (state: RootState) => state.university;
const universityReducer = universitySlice.reducer;
export default universityReducer;
