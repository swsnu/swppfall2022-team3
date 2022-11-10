import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import { chats, colleges, majors, photos, pitapats, tags, universities, users } from "../dummyData";
import { getMockStore } from "../test-utils/mocks";
import Setting from "./Setting";


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

const mockState = {
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: { users: users, loginUser: users[0] },
  photo: { photos: photos },
  tag: { tags: tags },
  pitapat: { pitapats: pitapats },
  chat: { chats: chats },
};
const mockStore = getMockStore(mockState);

jest.mock("../component/AppBar", () => () => <div></div>);

describe("Setting", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Setting", () => {
    const { container } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Setting/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });

  it("redirects to SignIn page when not logged in", () => {
    const logoutState = {
      ...mockState,
      user: { users: users, loginUser: null },
    };
    const mockLogoutStore = getMockStore(logoutState);
    render(
      <Provider store={mockLogoutStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Setting/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(mockNavigate).toBeCalled();
  });

  it("redirects to ProfileEdit page when clicks edit button", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Setting/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const editButton = screen.getByText("프로필 수정");
    fireEvent.click(editButton);
    expect(mockNavigate).toBeCalled();
  });

  it("signs out when clicks logout button", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Setting/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const logoutButton = screen.getByText("로그아웃");
    fireEvent.click(logoutButton);
    expect(mockDispatch).toBeCalled();
  });
});
