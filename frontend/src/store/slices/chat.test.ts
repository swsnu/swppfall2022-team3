import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { chats } from "../../dummyData";
import { Chat } from "../../types";
import chatReducer, { chatAction } from "./chat";


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
      to: 2,
      content: "newly added chat",
      regDt: new Date(),
    };
    store.dispatch(chatAction.add(newChat));

    expect(store.getState().chat.chats).toEqual([...chats, newChat]);
  });
});
