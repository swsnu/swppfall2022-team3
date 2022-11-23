import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { users } from "../../dummyData";
import SignIn from "../../page/SignIn";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  useDispatch: () => async() => ({payload: null}),
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

  it("should handle on loginOnClick when using an email that has completed signup", async () => {
    render(signin(mockStore));
    window.alert = jest.fn();
    const emailField = screen.getByPlaceholderText("이메일");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    const signInButton = screen.getByText("로그인");
    fireEvent.change(emailField, { target: { value: users[0].email } });
    fireEvent.change(passwordField, { target: { value: "password" } });
    fireEvent.click(signInButton);
    await expect(window.alert).toHaveBeenCalledWith("로그인에 실패했습니다. 이메일이나 비밀번호를 확인해주세요");
  });
});


