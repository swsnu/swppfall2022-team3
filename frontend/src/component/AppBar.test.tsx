import * as React from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import AppBar from "./AppBar";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
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

describe("AppBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: { pathname: "/" },
      writable: true,
    });
  });

  it("renders AppBar", () => {
    const { container } = render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<AppBar/>}/>
        </Routes>
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it("redirects to previous page when clicks back button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/setting" },
      writable: true,
    });
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<AppBar/>}/>
        </Routes>
      </MemoryRouter>
    );
    const backButton = screen.getByText("back");
    fireEvent.click(backButton);
    expect(mockNavigate).toBeCalled();
  });

  it("redirects to setting page when clicks setting button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/search" },
      writable: true,
    });
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<AppBar/>}/>
        </Routes>
      </MemoryRouter>
    );
    const backButton = screen.getByText("setting");
    fireEvent.click(backButton);
    expect(mockNavigate).toBeCalled();
  });

  it("prints pink title text when default title", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<AppBar title="test"/>}/>
        </Routes>
      </MemoryRouter>
    );
    const title = screen.getByText("test");
    expect(title).toHaveStyle("color: rgb(0 0 0)");
  });
});
