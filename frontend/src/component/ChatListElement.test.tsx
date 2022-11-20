import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { chatrooms, users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import ChatListElement from "./ChatListElement";


const mockStore = getDefaultMockStore();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ChatListElement", () => {
  const defaultLastChat = "대화를 시작해보세요!!";
  const user2 = users[1];
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

  it("should navigate to chat room page when user name is clicked", () => {
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

    const userNameArticle = screen.getByText(user2.nickname);

    fireEvent.click(userNameArticle);

    expect(mockNavigate).toBeCalled();
  });

  it("should navigate to chat room page when last chat is clicked", () => {
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

    const lastChatArticle = screen.getByText(defaultLastChat);

    fireEvent.click(lastChatArticle);

    expect(mockNavigate).toBeCalled();
  });
});
