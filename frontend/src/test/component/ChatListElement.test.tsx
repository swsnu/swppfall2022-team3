import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChatListElement from "../../component/ChatListElement";
import { chatrooms } from "../../dummyData";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockStore = getDefaultMockStore();

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ChatListElement", () => {
  const defaultLastChat = "대화를 시작해보세요!!";
  const chatroom = chatrooms[0];

  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          chatroomKey={chatroom.key}
          chatroomName={chatroom.name}
          imagePath={chatroom.imagePath}
          lastChat={chatroom.lastChat}
        />
      </Provider>
    );
  });

  it("should be rendered with no lastChat", () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          chatroomKey={chatroom.key}
          chatroomName={chatroom.name}
          imagePath={chatroom.imagePath}
          lastChat={null}
        />
      </Provider>
    );
    const lastChatArticle = screen.getByText(defaultLastChat);
    const userImage = screen.getByRole("img");

    expect(lastChatArticle).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
  });

  it("should navigate to chat room page when user name is clicked", async () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          chatroomKey={chatroom.key}
          chatroomName={chatroom.name}
          imagePath={chatroom.imagePath}
          lastChat={chatroom.lastChat}
        />
      </Provider>
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
          lastChat={chatroom.lastChat}
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
