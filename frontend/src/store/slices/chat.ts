import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Chat, Chatroom } from "../../types";
import { dateToString } from "../../util/date";
import { RootState } from "../index";


export const userUrl = "/user";
export const chatroomUrl = "/chatroom";
export const chatroomSocketUrl = "ws://localhost:8000/ws/chat";
export const getChatroomSocketUrl = (chatroomKey: number): string => `${chatroomSocketUrl}/${chatroomKey}/`;

export type RawChatroom = {
  chatroom: number;
  name: string;
  image_path: string;
  last_chat?: string;
}

export const rawChatroomToChatroom = (rawData: RawChatroom): Chatroom => {
  const chats: Chat[] = [];
  if (rawData.last_chat) {
    const lastChat: Chat = {
      key: -1,
      chatroomKey: -1,
      author: -1,
      content: rawData.last_chat,
      regDt: dateToString(new Date()),
    };
    chats.push(lastChat);
  }
  return {
    key: rawData.chatroom,
    name: rawData.name,
    imagePath: rawData.image_path,
    chats,
  };
};

export interface ChatState {
  chatrooms: Chatroom[];
  chatSockets: WebSocket[];
}

const initialState: ChatState = {
  chatrooms: [],
  chatSockets: [],
};

export const getChatrooms = createAsyncThunk(
  "chatroom/get-all-by-user",
  async (userKey: number): Promise<Chatroom[]> => {
    const response = await axios.get(`${userUrl}/${userKey}${chatroomUrl}/`);
    if (response.status === 200) {
      return (response.data as RawChatroom[]).map(rawChatroomToChatroom);
    }
    else {
      return [];
    }
  }
);


const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<number>) => {
      const chatroomKey = action.payload;
      state.chatSockets = [ ...state.chatSockets, new WebSocket(getChatroomSocketUrl(chatroomKey)) ];
    },
    setChatroomChats: (state, action: PayloadAction<{ chatroomKey: number; chats: Chat[] }>) => {
      const chatroom = state.chatrooms.find((r) => r.key === action.payload.chatroomKey);
      if (chatroom) {
        const newChatroom: Chatroom = { ...chatroom, chats: action.payload.chats };
        state.chatrooms = state.chatrooms.map((r) => r.key === newChatroom.key ? newChatroom : r);
      }
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      const newChat = action.payload;
      const chatroom = state.chatrooms.find((r) => r.key === newChat.chatroomKey);
      if (chatroom) {
        const newChatroom: Chatroom = { ...chatroom, chats: [ ...chatroom.chats, newChat ] };
        state.chatrooms = state.chatrooms.map((r) => r.key === newChatroom.key ? newChatroom : r);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getChatrooms.fulfilled,
      (state, action) => {
        const existingKeys = state.chatrooms.map((r) => r.key);
        const newChatrooms: Chatroom[] = [ ...state.chatrooms ];
        action.payload.forEach((chatroom) => {
          if (existingKeys.indexOf(chatroom.key) < 0) {
            newChatrooms.push(chatroom);
          }
        });
        state.chatrooms = newChatrooms;
      }
    );
  }
});

export const selectChat = (state: RootState) => state.chat;
export const chatAction = chatSlice.actions;
const chatReducer = chatSlice.reducer;
export default chatReducer;
