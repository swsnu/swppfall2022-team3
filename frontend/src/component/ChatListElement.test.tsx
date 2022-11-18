import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { users } from "../dummyData";
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
  const user1 = users[0];
  const user2 = users[1];

  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          myUser={user1}
          otherUser={user2}
          lastChat={null}
        />
      </Provider>
    );
  });

  it("should be rendered with no lastChat", () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          myUser={user1}
          otherUser={user2}
          lastChat={null}
        />
      </Provider>
    );
    const lastChatArticle = screen.getByText(defaultLastChat);
    const userImage = screen.getByRole("img");

    expect(lastChatArticle).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
  });

  it("should be rendered with a lastChat", () => {
    const lastChat = "this is last chat example";
    render(
      <Provider store={mockStore}>
        <ChatListElement
          myUser={user1}
          otherUser={user2}
          lastChat={lastChat}
        />
      </Provider>
    );

    const lastChatArticle = screen.getByText(lastChat);
    const userImage = screen.getByRole("img");

    expect(lastChatArticle).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
    expect(() => screen.getByText(defaultLastChat)).toThrowError();
  });

  it("should navigate to profile detail page when user image is clicked", () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          myUser={user1}
          otherUser={user2}
          lastChat={null}
        />
      </Provider>
    );

    const userImage = screen.getByRole("img");

    fireEvent.click(userImage);

    expect(mockNavigate).toBeCalled();
  });

  it("should navigate to chat room page when user name is clicked", () => {
    render(
      <Provider store={mockStore}>
        <ChatListElement
          myUser={user1}
          otherUser={user2}
          lastChat={null}
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
          myUser={user1}
          otherUser={user2}
          lastChat={null}
        />
      </Provider>
    );

    const lastChatArticle = screen.getByText(defaultLastChat);

    fireEvent.click(lastChatArticle);

    expect(mockNavigate).toBeCalled();
  });
});
