import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { chatrooms } from "../../../dummyData";
import chatReducer, { RawChatroom, getChatrooms, ChatState, chatAction } from "../../../store/slices/chat";
// import { getUsers } from "../../../store/slices/user";
import { Chatroom } from "../../../types";


export const chatroomToRawChatroom = (chatroom: Chatroom): RawChatroom => (
  {
    chatroom: chatroom.key,
    name: chatroom.name,
    image_path: chatroom.imagePath,
    last_chat: chatroom.chats.length === 0 ? undefined : chatroom.chats[chatroom.chats.length - 1].content,
  }
);

describe("chat reducer", () => {
  const testChatroom = chatrooms[0];
  const testRawChatroom = chatroomToRawChatroom(testChatroom);


  let store: EnhancedStore<
    { chat: ChatState },
    AnyAction,
    [ThunkMiddleware<{ chat: ChatState }>]
  >;

  beforeEach(() => {
    store = configureStore({ reducer: { chat: chatReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().chat.chatrooms).toEqual([]);
  });

  it("should set chatroom empty", () => {
    store.dispatch(chatAction.setChatroomEmpty());
    expect(store.getState().chat.chatrooms).toEqual([]);
    expect(store.getState().chat.chatSockets).toEqual([]);
  });

  it("should get chatrooms and set chats properly", async () => {
    const noChatChatroom = chatroomToRawChatroom({
      key: 2,
      name: "두 번째 채팅방",
      imagePath: "",
      chats: [],
    });
    axios.get = jest.fn().mockResolvedValue({
      data: [
        testRawChatroom,
        noChatChatroom,
      ],
      status: 200
    });

    await store.dispatch(getChatrooms(1));
    expect(store.getState().chat.chatrooms.map((r) => r.key))
      .toEqual([testChatroom.key, noChatChatroom.chatroom]);
    // this is for the coverage. nothing should be changed
    await store.dispatch(getChatrooms(1));
    expect(store.getState().chat.chatrooms.map((r) => r.key))
      .toEqual([testChatroom.key, noChatChatroom.chatroom]);
    expect(store.getState().chat.chatrooms[0].chats[0].content)
      .toEqual(testChatroom.chats[testChatroom.chats.length - 1].content);


    store.dispatch(chatAction.setChatroomChats({ chatroomKey: testChatroom.key, chats: testChatroom.chats }));
    store.dispatch(chatAction.addChat(testChatroom.chats[0]));
    // this is for the coverage exceptional case
    store.dispatch(chatAction.setChatroomChats({ chatroomKey: -1, chats: [] }));
    // this is for the coverage exceptional case
    store.dispatch(chatAction.addChat({ ...testChatroom.chats[0], chatroomKey: -1 }));
    expect(store.getState().chat.chatrooms[0].chats.length).toEqual(testChatroom.chats.length + 1);
  });

  it("should not get chatrooms", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [], status: 500 });

    await store.dispatch(getChatrooms(1));
    expect(store.getState().chat.chatrooms.length).toBe(0);
  });

  // it("should not get users", async () => {
  //   axios.get = jest.fn().mockResolvedValue({ data: null, status: 500 });

  //   await store.dispatch(getUsers());
  // });
});
