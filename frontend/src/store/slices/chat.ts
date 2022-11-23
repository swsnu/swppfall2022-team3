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

export const getChats = createAsyncThunk(
  "chat/get-all-by-chatroom",
  async (chatroomKey: number): Promise<Chat[] | null> => {
    return null;
  }
);

export const addChat = createAsyncThunk(
  "chat/add-chat-to-chatroom",
  async (chat: {chatroomKey: number; from: number; content: string}): Promise<Chat> => {
    return {
      ...chat,
      key: 1,
      regDt: (new Date()).toString(),
    };
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
    builder.addCase(
      getChats.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.chats = action.payload;
        }
      }
    );
    builder.addCase(
      addChat.fulfilled,
      (state, action) => {
        state.chats.push(action.payload);
      }
    );
  }
});

export const selectChat = (state: RootState) => state.chat;
export const chatAction = chatSlice.actions;
const chatReducer = chatSlice.reducer;
export default chatReducer;
