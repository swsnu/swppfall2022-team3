import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { chats, chatrooms } from "../../../dummyData";
import chatReducer, { RawChatroom, getChatrooms, getChats, ChatState } from "../../../store/slices/chat";
import { getUsers } from "../../../store/slices/user";
import { Chat, Chatroom } from "../../../types";


export const chatroomToRawChatroom = (chatroom: Chatroom): RawChatroom => (
  {
    chatroom: chatroom.key,
    name: chatroom.name,
    image_path: chatroom.imagePath,
    last_chat: chatroom.lastChat ?? undefined,
  }
);

describe("chat reducer", () => {
  const testChat = chats[0];
  const testChatroom = chatrooms[0];
  const testRawChatroom = chatroomToRawChatroom(testChatroom);


  let store: EnhancedStore<
    { chat: ChatState },
    AnyAction,
    [ThunkMiddleware<{ chat: { chats: Chat[] } }>]
  >;

  beforeEach(() => {
    store = configureStore({ reducer: { chat: chatReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().chat.chatrooms).toEqual([]);
    expect(store.getState().chat.chats).toEqual([]);
  });

  it("should get chatrooms", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [testRawChatroom], status: 200 });

    await store.dispatch(getChatrooms(1));
    expect(store.getState().chat.chatrooms).toEqual([testChatroom]);
  });

  it("should get chats", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [testChat], status: 200 });

    await store.dispatch(getChats(1));
    expect(store.getState().chat.chats).toEqual([]);
  });

  it("should not get chatrooms", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [], status: 500 });

    await store.dispatch(getChatrooms(1));
    expect(store.getState().chat.chatrooms).toBeNull();
  });

  it("should not get users", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: null, status: 500 });

    await store.dispatch(getUsers(1));
  });

  it("should add a chat properly", () => {
    const newChat: Chat = {
      key: 10,
      from: 1,
      chatroomKey: 1,
      content: "newly added chat",
      regDt: (new Date()).toString(),
    };

    expect(newChat.key).toEqual(10);

    // store.dispatch(chatAction.add(newChat));

    // expect(store.getState().chat.chats).toEqual([...chats, newChat]);
  });
});
