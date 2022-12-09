import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { Server } from "mock-socket";
import ChatDetail from "../../page/ChatDetail";
import { getDefaultMockStore, fakeUrl, getWebSocketMockStore } from "../../test-utils/mocks";
import encryptor from "../../util/encryptor";


const mockStore = getDefaultMockStore();
const mockStoreNoLoginUser = getDefaultMockStore(false);

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
  const chatroomName = "chatroom";
  const parameterData = {
    chatroomKey: 1,
    chatroomName,
  };
  const encrypted = encryptor.encrypt(parameterData);

  function getComponent(store: ToolkitStore, param: string) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/chat/${param}`]}>
          <Routes>
            <Route path="/chat/:encrypted" element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  const socket_url = process.env.REACT_APP_SOCKET_URL;
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  let mockServer: Server;

  beforeAll(() => {
    mockServer = new Server(fakeUrl);
    process.env.REACT_APP_SOCKET_URL = fakeUrl;
  });

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env.REACT_APP_SOCKET_URL = socket_url;
  });

  it("should be rendered", () => {
    render(getComponent(mockStore, encrypted));
    expect(screen.getByText("전송")).toBeInTheDocument();
    expect(screen.getByText(chatroomName)).toBeInTheDocument();
  });

  it("should redirect to other page when not logged in", () => {
    render(getComponent(mockStoreNoLoginUser, encrypted));
    expect(mockNavigate).toBeCalled();
  });

  it("should redirect when the data are invalid format", () => {
    render(getComponent(mockStore, "1234"));
    expect(mockNavigate).toBeCalled();
  });

  it("should redirect when the data are invalid value", () => {
    const invalidParameterData = {
      chatroomKey: undefined,
      chatroomName: undefined,
    };
    const encryptedInvalidData = encryptor.encrypt(invalidParameterData);
    render(getComponent(mockStore, encryptedInvalidData));
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

  it("should redirect when corresponding chatroom does not exist", () => {
    const invalidChatroomData = {
      chatroomKey: 100,
      chatroomName: "chatroom",
    };
    const encryptedInvalidData = encryptor.encrypt(invalidChatroomData);
    render(getComponent(getWebSocketMockStore(100), encryptedInvalidData));
    expect(mockNavigate).toBeCalled();
  });

  it("should empty input after sending input", () => {
    render(getComponent(getWebSocketMockStore(1), encrypted));
    const chatInput = screen.getByRole("textbox");
    const sendButton = screen.getByText("전송");
    fireEvent.change(chatInput, { target: { value: "test" } });
    fireEvent.click(sendButton);
    expect(chatInput).toHaveTextContent("");
  });
});
