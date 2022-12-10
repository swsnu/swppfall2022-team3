import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import ChatBox, { IProps } from "../../component/ChatBox";
import { users } from "../../dummyData";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => async () => Promise.resolve({ type: "user/getuser/fulfilled", payload: null, meta: {} }),
}));

const mockIPropsReceived: IProps = {
  sender: users[3],
  content: "hi",
};

const mockIPropsSent: IProps = {
  sender: users[0],
  content: "hi",
};

const mockStore = getDefaultMockStore();

describe("ChatBox", () => {

  function getElement(props: IProps) {
    return (
      <Provider store={mockStore}>
        <ChatBox
          content={props.content}
          sender={props.sender}
        />
      </Provider>
    );
  }
  it("should be rendered when received", () => {
    render(getElement(mockIPropsReceived));
    const chatBox = screen.getByText(mockIPropsReceived.content);
    expect(chatBox).toBeInTheDocument();
  });

  it("should be rendered when sent", () => {
    render(getElement(mockIPropsSent));
    const chatBox = screen.getByText(mockIPropsSent.content);
    expect(chatBox).toBeInTheDocument();
  });

  it("should have image when it is not mine", () => {
    render(getElement(mockIPropsReceived));
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("should redirect profile page when profile button clicked", () => {
    render(getElement(mockIPropsReceived));
    const profileButton = screen.getByRole("button");
    fireEvent.click(profileButton);
  });
});
