import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../../types";
import DummyData from "../../DummyData";
import { RootState } from "../index";


const storeKey = "chat";

const getInitialState = (): Chat[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    localStorage.setItem(storeKey, JSON.stringify(DummyData.chats));
    savedValue = localStorage.getItem(storeKey);
  }
  return JSON.parse(savedValue!) as Chat[];
};

const chatSlice = createSlice({
  name: "chat",
  initialState: { chats: getInitialState() },
  reducers: {
    add: (state, action: PayloadAction<Chat>) => {
      const newChats = [...state.chats, action.payload];
      localStorage.setItem(storeKey, JSON.stringify(newChats));
      state.chats = newChats;
    },
  },
})

export const selectChat = (state: RootState) => state.chat;
export const chatAction = chatSlice.actions;
const chatReducer = chatSlice.reducer;
export default chatReducer;
