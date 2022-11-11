import React from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import {fireEvent, render, screen} from "@testing-library/react";
import NavigationBar from "./NavigationBar";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

// jest.mock("@mui/material", () => ({
//   ...jest.requireActual("@mui/material"),
//   Paper: () => <div></div>,
//   BottomNavigation: () => <div></div>,
//   BottomNavigationAction: () => <div></div>,
// }));

jest.mock("@mui/icons-material/ChatBubbleOutlined", () => () => <div>chat</div>);
jest.mock("@mui/icons-material/FavoriteOutlined", () => () => <div>favorite</div>);
jest.mock("@mui/icons-material/GroupOutlined", () => () => <div>group</div>);

describe("NavigationBar", () => {
  function getElement() {
    return (
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<NavigationBar/>}/>
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

  it("renders NavigationBar", () => {
    const { container } = render(getElement());
    expect(container).toBeTruthy();
  });

  it("activates search tab", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/search" },
      writable: true,
    });
    render(getElement());
    const group = screen.getByText("group");
    expect(group).toBeInTheDocument();
  });

  it("activates pitapat tab", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/pitapat" },
      writable: true,
    });
    render(getElement());
    const favorite = screen.getByText("favorite");
    expect(favorite).toBeInTheDocument();
  });

  it("activates chat tab", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/chat" },
      writable: true,
    });
    render(getElement());
    const chat = screen.getByText("chat");
    expect(chat).toBeInTheDocument();
  });

  it("should move to other page", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/search" },
      writable: true,
    });
    render(getElement());
    const pitapatButton = screen.getByText("두근");
    fireEvent.click(pitapatButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
