import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import AppBar from "../../component/AppBar";
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

jest.mock("@heroicons/react/20/solid", () => ({
  ...jest.requireActual("@heroicons/react/20/solid"),
  ArrowUturnLeftIcon: (props: {onClick: () => void}) => (
    <button onClick={props.onClick}>back</button>
  ),
  UserCircleIcon: (props: {onClick: () => void}) => (
    <button onClick={props.onClick}>setting</button>
  ),
}));

jest.mock("@mui/icons-material", () => ({
  ...jest.requireActual("@mui/icons-material"),
  MoreHorizIcon: () => <div/>,
  TuneOutlinedIcon: () => <div/>,
}));

const mockStore = getDefaultMockStore();

describe("AppBar", () => {
  const saveYPosition = jest.fn();
  const setIsModalOpen = jest.fn();
  function getComponent(title?: string) {
    return (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              element={<AppBar
                title={title}
                saveYPosition={saveYPosition}
                setIsModalOpen={setIsModalOpen}
              />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: { pathname: "/" },
      writable: true,
    });
  });

  it("should be rendered", () => {
    const { container } = render(getComponent());
    expect(container).toBeTruthy();
  });

  it("should print black title text when not default title", () => {
    render(getComponent("test"));
    const title = screen.getByText("test");
    expect(title).toHaveStyle("color: rgb(0 0 0)");
  });

  it("should redirect to previous page when clicks back button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/setting" },
      writable: true,
    });
    render(getComponent());
    const backButton = screen.getByText("back");
    fireEvent.click(backButton);
    expect(mockNavigate).toBeCalled();
  });

  it("should save Y position and redirect to setting page when clicks setting button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/pitapat" },
      writable: true,
    });
    render(getComponent());
    const backButton = screen.getByText("setting");
    fireEvent.click(backButton);
    expect(saveYPosition).toBeCalled();
    expect(mockNavigate).toBeCalled();
  });

  it("should set modal when clicks filter button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/search" },
      writable: true,
    });
    render(getComponent());
    const filterButton = screen.getByTestId("filter");
    fireEvent.click(filterButton);
    expect(setIsModalOpen).toBeCalled();
  });

  it("should display user block modal when clicks block box", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/profile" },
      writable: true,
    });
    render(getComponent());
    const moreButton = screen.getByTestId("more");
    fireEvent.click(moreButton);
    const box = screen.getByText("유저 차단");
    fireEvent.click(box);
    const warning = screen.getByTestId("warning");
    expect(warning).toBeInTheDocument();
  });

  it("should call dispatch when click block confirm button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/profile" },
      writable: true,
    });
    axios.post = jest.fn();
    render(getComponent());
    const moreButton = screen.getByTestId("more");
    fireEvent.click(moreButton);
    const box = screen.getByText("유저 차단");
    fireEvent.click(box);
    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    expect(axios.post).toBeCalled();
  });

  it("should close modal when click block cancel button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/profile" },
      writable: true,
    });
    axios.post = jest.fn();
    render(getComponent());
    const moreButton = screen.getByTestId("more");
    fireEvent.click(moreButton);
    const box = screen.getByText("유저 차단");
    fireEvent.click(box);
    const cancelButton = screen.getByText("취소");
    fireEvent.click(cancelButton);
    expect(() => screen.getByTestId("warning")).toThrowError();
  });
});
