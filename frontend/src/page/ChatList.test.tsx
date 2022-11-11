import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { getDefaultMockStore } from "../test-utils/mocks";
import ChatList from "./ChatList";


const mockStore = getDefaultMockStore();
const mockStoreNoLoginUser = getDefaultMockStore(false);

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../component/AppBar", () => () => <div></div>);
jest.mock("../component/NavigationBar", () => () => <div></div>);
jest.mock("../component/ChatListElement", () => () => <div>element</div>);

describe("ChatList", () => {
  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <ChatList/>
      </Provider>
    );
    const elements = screen.getAllByText("element");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("should redirect if there is no login user", () => {
    render(
      <Provider store={mockStoreNoLoginUser}>
        <ChatList/>
      </Provider>
    );
    expect(mockNavigate).toBeCalled();
  });
});
