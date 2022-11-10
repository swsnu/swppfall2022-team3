import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render, screen } from "@testing-library/react";
import { tags, users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import ProfileDetail from "./ProfileDetail";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../component/AppBar", () => () => <div></div>);
jest.mock("../component/PhotoSlider", () => () => <div></div>);
jest.mock("../component/PitapatButton", () => () => <div></div>);

describe("ProfileDetail", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/profile/1"]}>
          <Routes>
            <Route path="/profile/:id" element={<ProfileDetail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ProfileDetail", () => {
    const { container } = render(getElement(mockStore));
    expect(container).toBeTruthy();
  });

  it("redirects to SignIn page when not logged in", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore));
    expect(mockNavigate).toBeCalled();
  });

  it("shows tags", () => {
    render(getElement(mockStore));
    users[0].tags.forEach((t) => {
      let element: HTMLElement = document.createElement("div");
      const tag = tags.find((tag) => tag.key === t);
      if (tag) { element = screen.getByText(tag.name); }
      expect(element).toBeInTheDocument();
    });
  });
});
