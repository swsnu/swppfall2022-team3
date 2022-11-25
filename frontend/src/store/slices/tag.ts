import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Tag } from "../../types";
import { RootState } from "../index";


const tagUrl = "/tag";

export interface TagState {
  tags: Tag[];
}

const initialState: TagState = {
  tags: [],
};

export const getTags = createAsyncThunk(
  "tag/get-all",
  async (): Promise<Tag[] | null> => {
    const response = await axios.get(`${tagUrl}/`);
    if (response.status === 200) {
      return response.data as Tag[];
    }
    return null;
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTags.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.tags = action.payload;
        }
      }
    );
  }
});

export const selectTag = (state: RootState) => state.tag;
const tagReducer = tagSlice.reducer;
export default tagReducer;
