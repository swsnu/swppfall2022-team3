import React from "react";
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
  function getElement(title?: string) {
    return (
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<AppBar title={title}/>}/>
        </Routes>
      </MemoryRouter>
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

  it("renders AppBar", () => {
    const { container } = render(getElement());
    expect(container).toBeTruthy();
  });

  it("redirects to previous page when clicks back button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/setting" },
      writable: true,
    });
    render(getElement());
    const backButton = screen.getByText("back");
    fireEvent.click(backButton);
    expect(mockNavigate).toBeCalled();
  });

  it("redirects to setting page when clicks setting button", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/search" },
      writable: true,
    });
    render(getElement());
    const backButton = screen.getByText("setting");
    fireEvent.click(backButton);
    expect(mockNavigate).toBeCalled();
  });

  it("prints pink title text when default title", () => {
    render(getElement("test"));
    const title = screen.getByText("test");
    expect(title).toHaveStyle("color: rgb(0 0 0)");
  });
});
