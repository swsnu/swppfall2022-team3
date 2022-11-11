import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ChatBox from "./ChatBox";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ChatBox", () => {
  it("should be rendered", () => {
    const chatContent = "test chat from me";
    render(
      <ChatBox
        content={chatContent}
        sender={1}
        isMine={true}
        photoPath={""}
      />
    );

    const chatBox = screen.getByText(chatContent);

    expect(chatBox).toBeInTheDocument();
  });

  it("should have image when it is not mine", () => {
    const chatContent = "test chat from the other";
    render(
      <ChatBox
        content={chatContent}
        sender={2}
        isMine={false}
        photoPath={""}
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
        sender={2}
        isMine={false}
        photoPath={""}
      />
    );

    const image = screen.getByRole("img");

    fireEvent.click(image);

    expect(mockNavigate).toBeCalled();
  });
});
