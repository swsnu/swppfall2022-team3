import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Chat, Chatroom } from "../../types";
import { RootState } from "../index";


export const userUrl = "/user";

export type RawChatroom = {
  chatroom: number;
  name: string;
  image_path: string;
  last_chat?: string;
}

export const rawChatroomToChatroom = (rawData: RawChatroom): Chatroom => (
  {
    key: rawData.chatroom,
    name: rawData.name,
    imagePath: rawData.image_path,
    lastChat: rawData.last_chat ?? null,
  }
);

export interface ChatState {
  chatrooms: Chatroom[];
  chats: Chat[];
}

const initialState: ChatState = {
  chatrooms: [],
  chats: [],
};

export const getChatrooms = createAsyncThunk(
  "chatroom/get-all-by-user",
  async (userKey: number): Promise<Chatroom[] | null> => {
    const response = await axios.get(`${userUrl}/${userKey}/chatroom/`);
    if (response.status === 200) {
      return (response.data as RawChatroom[]).map(rawChatroomToChatroom);
    }
    else {
      return null;
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getChatrooms.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.chatrooms = action.payload;
        }
      }
    );
  }
});

export const selectChat = (state: RootState) => state.chat;
export const chatAction = chatSlice.actions;
const chatReducer = chatSlice.reducer;
export default chatReducer;
