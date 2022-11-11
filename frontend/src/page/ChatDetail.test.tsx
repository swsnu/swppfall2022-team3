import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { chats, users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import urlParamEncryptor from "../util/urlParamEncryptor";
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


describe("ChatDetail", () => {
  const user1 = users[0];
  const user2 = users[1];
  const parameterData = {
    from: user1.key,
    to: user2.key,
    photoPath: "photo",
  };
  const encrypted = urlParamEncryptor.encrypt(parameterData);

  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/chat/${encrypted}`]}>
          <Routes>
            <Route path={"/chat/:encrypted"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    chats
      .filter((chat) => (
        ((chat.to === user1.key) && (chat.from === user2.key)) ||
        ((chat.to === user2.key) && (chat.from === user1.key))
      ))
      .forEach((chat) => {
        const chatContentArticle = screen.getByText(chat.content);

        expect(chatContentArticle).toBeInTheDocument();
      });
  });

  it("should not render chat boxes if there is no login user and redirect to other page", () => {
    render(
      <Provider store={mockStoreNoLoginUser}>
        <MemoryRouter initialEntries={[`/chat/${encrypted}`]}>
          <Routes>
            <Route path={"/chat/:encrypted"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toBeCalled();
    chats
      .filter((chat) => (
        ((chat.to === user1.key) && (chat.from === user2.key)) ||
        ((chat.to === user2.key) && (chat.from === user1.key))
      ))
      .forEach((chat) => {
        expect(() => screen.getByText(chat.content)).toThrowError();
      });
  });

  it("should redirect to user detail page when other user's photo is clicked", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/chat/${encrypted}`]}>
          <Routes>
            <Route path={"/chat/:encrypted"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const userImage = screen.getByRole("img");

    fireEvent.click(userImage);

    expect(mockNavigate).toBeCalled();
  });

  it("should send a chat only if user gives proper input", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`/chat/${encrypted}`]}>
          <Routes>
            <Route path={"/chat/:encrypted"} element={<ChatDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

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
    const encryptedInvalidData = urlParamEncryptor.encrypt(invalidParameterData);

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
    const encryptedData = urlParamEncryptor.encrypt(differentLoginUserData);

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
