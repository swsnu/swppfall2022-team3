import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { users } from "../../dummyData";
import SignIn from "../../page/SignIn";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => async () => Promise.resolve({ type: "user/signin/fulfilled", payload: null, meta: {} }),
}));

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

  it("should handle keyup in email and password field", async () => {
    render(signin(mockStore));
    const emailField = screen.getByPlaceholderText("이메일");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    fireEvent.keyUp(emailField, { key: "Enter" });
    fireEvent.keyUp(passwordField, { key: "Enter" });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      /* empty */
    });
  });

  it("should handle on loginOnClick when using an email that has completed signup", async () => {
    render(signin(mockStore));
    const emailField = screen.getByPlaceholderText("이메일");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    const signInButton = screen.getByText("로그인");
    fireEvent.change(emailField, { target: { value: users[0].email } });
    fireEvent.keyUp(emailField);
    fireEvent.change(passwordField, { target: { value: "password" } });
    fireEvent.keyUp(passwordField);
    fireEvent.click(signInButton);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      /* empty */
    });
  });
});
