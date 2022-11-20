import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import ChatBox from "./ChatBox";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = getDefaultMockStore();

describe("ChatBox", () => {
  it("should be rendered", () => {
    const chatContent = "test chat from me";
    render(
      <Provider store={mockStore}>
        <ChatBox
          content={chatContent}
          sender={users[0]}
        />
      </Provider>
    );

    const chatBox = screen.getByText(chatContent);

    expect(chatBox).toBeInTheDocument();
  });

  it("should have image when it is not mine", () => {
    const chatContent = "test chat from the other";
    render(
      <ChatBox
        content={chatContent}
        sender={users[1]}
      />
    );

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("should navigate to other user's detail page when image is clicked", () => {
    const chatContent = "test chat from the other";
    render(
      <ChatBox
        content={chatContent}
        sender={users[1]}
      />
    );

    const image = screen.getByRole("img");

    fireEvent.click(image);

    expect(mockNavigate).toBeCalled();
  });
});
