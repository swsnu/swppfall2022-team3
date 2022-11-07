import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chats } from "../../dummyData";
import { Chat } from "../../types";
import { RootState } from "../index";


const storeKey = "chat";

const getInitialState = (): Chat[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    const dummy = JSON.stringify(chats);
    localStorage.setItem(storeKey, dummy);
    savedValue = dummy;
  }
  return (JSON.parse(savedValue) as Chat[]).map((chat) =>
    ({...chat, regDt: new Date(chat.regDt)})
  );
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
});

export const selectChat = (state: RootState) => state.chat;
export const chatAction = chatSlice.actions;
const chatReducer = chatSlice.reducer;
export default chatReducer;
