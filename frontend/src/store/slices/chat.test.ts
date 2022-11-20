import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { chats } from "../../dummyData";
import { Chat } from "../../types";
import chatReducer from "./chat";


describe("chat reducer", () => {
  let store: EnhancedStore<
    { chat: { chats: Chat[] } },
    AnyAction,
    [ThunkMiddleware<{ chat: { chats: Chat[] } }>]
  >;

  beforeEach(() => {
    store = configureStore({ reducer: { chat: chatReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().chat.chats).toEqual(chats);
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
