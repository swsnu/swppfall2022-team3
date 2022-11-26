import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChatListElement from "../../component/ChatListElement";
import { chatrooms } from "../../dummyData";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockStore = getDefaultMockStore();

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn().mockResolvedValue(() => {});
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("ChatListElement", () => {
  const defaultLastChat = "대화를 시작해보세요!!";
  const chatroom = chatrooms[0];

  const getChatroomElement = (isLastChatNull = false) => (
    <ChatListElement
      chatroomKey={chatroom.key}
      chatroomName={chatroom.name}
      imagePath={chatroom.imagePath}
      lastChat={isLastChatNull ? null : chatroom.chats[chatroom.chats.length - 1].content}
    />
  );

  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>{
        getChatroomElement()
      }</Provider>
    );
  });

  it("should be rendered with no lastChat", () => {
    render(
      <Provider store={mockStore}>{
        getChatroomElement(true)
      }</Provider>
    );
    const lastChatArticle = screen.getByText(defaultLastChat);
    const userImage = screen.getByRole("img");

    expect(lastChatArticle).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
  });

  it("should navigate to chat room page when user name is clicked", async () => {
    render(
      <Provider store={mockStore}>{
        getChatroomElement()
      }</Provider>
    );
    const chatroomName = screen.getByText(chatroom.name);
    fireEvent.click(chatroomName);
    await waitFor(() => {
      expect(mockNavigate).toBeCalled();
    });
  });

  it("should navigate to chat room page when last chat is clicked", async () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          chatroomKey={chatroom.key}
          chatroomName={chatroom.name}
          imagePath={chatroom.imagePath}
          lastChat={chatroom.chats.length === 0 ? null : chatroom.chats[chatroom.chats.length - 1].content}
        />
      </Provider>
    );
    const lastChatroomName = screen.getByText(chatroom.name);
    fireEvent.click(lastChatroomName);
    await waitFor(() => {
      expect(mockNavigate).toBeCalled();
    });
  });
});
