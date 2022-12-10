import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import Setting from "../../page/Setting";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../component/AppBar", () => () => <div></div>);

describe("Setting", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <Setting/>
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be rendered", () => {
    render(getElement(mockStore));
    const editButton = screen.getByText("프로필 수정");
    expect(editButton).toBeInTheDocument();
  });

  it("should redirect to SignIn page when not logged in", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore));
    expect(mockNavigate).toBeCalled();
  });

  it("should redirect to ProfileEdit page when clicks edit button", () => {
    render(getElement(mockStore));
    const editButton = screen.getByText("프로필 수정");
    fireEvent.click(editButton);
    expect(mockNavigate).toBeCalled();
  });

  it("should be signed out when clicks logout button", () => {
    render(getElement(mockStore));
    const logoutButton = screen.getByText("로그아웃");
    fireEvent.click(logoutButton);
    expect(mockDispatch).toBeCalled();
  });

  it("should handle user blocking onClick", () => {
    render(getElement(mockStore));
    const userBlockArticle = screen.getByText("차단 유저 관리");
    fireEvent.click(userBlockArticle);
    expect(mockDispatch).toBeCalled();
  });

  it("should handle user information update onClick", () => {
    render(getElement(mockStore));
    const userBlockArticle = screen.getByText("회원정보 변경");
    fireEvent.click(userBlockArticle);
    expect(mockDispatch).toBeCalled();
  });
});
