import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { getDefaultMockStore } from "../test-utils/mocks";
import SignIn from "./SignIn";


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

window.alert = jest.fn();

describe("Signin", () => {
  const mockStore = getDefaultMockStore(false);

  function signin(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SignIn", () => {
    const { container } = render(signin(mockStore));
    expect(container).toBeTruthy();
  });

  it("redirects to Search page when logged in", () => {
    const mockLogoutStore = getDefaultMockStore(true);
    render(signin(mockLogoutStore));
    expect(mockNavigate).toBeCalled();
  });

  it("redirects to SignUp page when clicks signup button", () => {
    render(signin(mockStore));
    const signUpButton = screen.getByText("회원가입");
    fireEvent.click(signUpButton);
    expect(mockNavigate).toBeCalled();
  });

  it("should handle on loginOnClick when using an email that has completed signup", () => {
    render(signin(mockStore));
    const emailField = screen.getByPlaceholderText("이메일");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    const signInButton = screen.getByText("로그인");
    fireEvent.change(emailField, { target: { value: "user@snu.ac.kr" } });
    fireEvent.change(passwordField, { target: { value: "qwe123" } });
    fireEvent.click(signInButton);
    expect(mockNavigate).toBeCalled();
    expect(mockDispatch).toBeCalled();
  });

  it("should handle on loginOnClick when using an email that has not completed signup", () => {
    render(signin(mockStore));
    const emailField = screen.getByPlaceholderText("이메일");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    const signInButton = screen.getByText("로그인");
    fireEvent.change(emailField, { target: { value: "userrrrr@snu.ac.kr" } });
    fireEvent.change(passwordField, { target: { value: "qwe123" } });
    fireEvent.click(signInButton);
    expect(window.alert).toBeCalled();
  });
});
