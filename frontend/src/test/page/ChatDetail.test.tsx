import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import ChatDetail, { IDecrypted } from "../../page/ChatDetail";
import { getDefaultMockStore } from "../../test-utils/mocks";
import encryptor from "../../util/encryptor";


const mockStore = getDefaultMockStore();
const mockStoreNoLoginUser = getDefaultMockStore(false);

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
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

describe("ChatDetail", () => {
  const chatroomName = "chatroom name";
  const parameterData: IDecrypted = {
    chatroomKey: 1,
    chatroomName,
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
    expect(screen.getByText(chatroomName)).toBeInTheDocument();
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
    // fireEvent.change(userInput, {target: {value: "user's input" } });
    // fireEvent.click(sendButton);
    // fireEvent.change(userInput, {target: {value: "user's second input" } });
    fireEvent.keyUp(userInput, { key: "k" });
    fireEvent.keyUp(userInput, { key: "Enter" });
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
