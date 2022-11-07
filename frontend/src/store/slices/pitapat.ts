import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pitapats } from "../../dummyData";
import { Pitapat } from "../../types";
import { RootState } from "../index";


const storeKey = "pitapat";

const getInitialState = (): Pitapat[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    const dummy = JSON.stringify(pitapats);
    localStorage.setItem(storeKey, dummy);
    savedValue = dummy;
  }
  return JSON.parse(savedValue) as Pitapat[];
};

const pitapatSlice = createSlice({
  name: "pitapat",
  initialState: { pitapats: getInitialState() },
  reducers: {
    toggle: (state, action: PayloadAction<Pitapat>) => {
      if (state.pitapats.filter((p) => p.from === (action.payload.from) && (p.to === action.payload.to)).length === 0) {
        const newPitapats = [...state.pitapats, action.payload];
        localStorage.setItem(storeKey, JSON.stringify(newPitapats));
        state.pitapats = newPitapats;
      } else {
        const newPitapats = state.pitapats.filter((p) => (p.from !== action.payload.from) || (p.to !== action.payload.to));
        localStorage.setItem(storeKey, JSON.stringify(newPitapats));
        state.pitapats = newPitapats;
      }
    },
    add: (state, action: PayloadAction<Pitapat>) => {
      const newPitapats = [...state.pitapats, action.payload];
      localStorage.setItem(storeKey, JSON.stringify(newPitapats));
      state.pitapats = newPitapats;
    },
    delete: (state, action: PayloadAction<Pitapat>) => {
      const newPitapats = state.pitapats.filter((p) => (p.from !== action.payload.from) || (p.to !== action.payload.to));
      localStorage.setItem(storeKey, JSON.stringify(newPitapats));
      state.pitapats = newPitapats;
    },
  },
});

export const selectPitapat = (state: RootState) => state.pitapat;
export const pitapatAction = pitapatSlice.actions;
const pitapatReducer = pitapatSlice.reducer;
export default pitapatReducer;
