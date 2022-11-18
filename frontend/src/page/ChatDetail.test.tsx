import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import encryptor from "../util/encryptor";
import ChatDetail from "./ChatDetail";


const mockStore = getDefaultMockStore();
const mockStoreNoLoginUser = getDefaultMockStore(false);

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("@heroicons/react/20/solid", () => ({
  ...jest.requireActual("@heroicons/react/20/solid"),
  ArrowUturnLeftIcon: (props: { onClick: () => void }) => (
    <button onClick={props.onClick}>back</button>
  ),
  UserCircleIcon: (props: { onClick: () => void }) => (
    <button onClick={props.onClick}>setting</button>
  ),
}));

jest.mock("../component/AppBar", () => () => <div>appbar</div>);
jest.mock("../component/ChatBox", () => () => <div></div>);

describe("ChatDetail", () => {
  const user1 = users[0];
  const user2 = users[1];
  const parameterData = {
    from: user1.key,
    to: user2.key,
    photoPath: "photo",
  };
  const encrypted = encryptor.encrypt(parameterData);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/chat/${encrypted}`]}>
          <Routes>
            <Route path="/chat/:encrypted" element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  it("should be rendered", () => {
    render(getElement(mockStore));
    expect(screen.getByText("전송")).toBeInTheDocument();
  });

  it("should redirect to other page when not logged in", () => {
    render(getElement(mockStoreNoLoginUser));
    expect(mockNavigate).toBeCalled();
  });

  it("should send a chat only if user gives proper input", () => {
    render(getElement(mockStore));

    const userInput = screen.getByPlaceholderText("메세지를 입력하세요") as HTMLInputElement;
    const sendButton = screen.getByText("전송");

    fireEvent.click(sendButton);
    expect(mockDispatch).not.toBeCalled();
    fireEvent.change(userInput, {target: {value: "user's input" } });
    fireEvent.click(sendButton);
    expect(mockDispatch).toBeCalled();
    fireEvent.change(userInput, {target: {value: "user's second input" } });
    fireEvent.keyUp(userInput, { key: "k" });
    expect(mockDispatch).toBeCalledTimes(1);
    fireEvent.keyUp(userInput, { key: "Enter" });
    expect(mockDispatch).toBeCalledTimes(2);
  });

  it("should redirect when the data are invalid format", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/chat/1212"]}>
          <Routes>
            <Route path={"/chat/:encrypted"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toBeCalled();
  });

  it("should redirect when the data are invalid value", () => {
    const invalidParameterData = {
      from: 0,
      to: undefined,
      photoPath: null,
    };
    const encryptedInvalidData = encryptor.encrypt(invalidParameterData);

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/chat/${encryptedInvalidData}`]}>
          <Routes>
            <Route path={"/chat/:encrypted"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toBeCalled();
  });

  it("should redirect when login-user and from-user is different", () => {
    const differentLoginUserData = {
      from: 2,
      to: 1,
      photoPath: "photo",
    };
    const encryptedData = encryptor.encrypt(differentLoginUserData);

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/chat/${encryptedData}`]}>
          <Routes>
            <Route path={"/chat/:encrypted"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toBeCalled();
  });

  it("should redirect when router doesn't have encrypted", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/chat/${encrypted}`]}>
          <Routes>
            <Route path={"/chat/:encrypted_"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toBeCalled();
  });
});
