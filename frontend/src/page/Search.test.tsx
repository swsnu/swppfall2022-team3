import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render, screen } from "@testing-library/react";
import { getDefaultMockStore, getNoPhotoMockStore } from "../test-utils/mocks";
import Search from "./Search";


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

jest.mock("../component/AppBar", () => () => <div>appbar</div>);
jest.mock("../component/Profile", () =>
  ({photo}: {photo: string}) => <div data-testid="profile">{photo}</div>
);
jest.mock("../component/NavigationBar", () => () => <div></div>);

describe("Search", () => {
  const mockStore = getDefaultMockStore(true);
  const noPhotoMockStore = getNoPhotoMockStore(true);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Search/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be rendered", () => {
    render(getElement(mockStore));
    const appBar = screen.getByText("appbar");
    expect(appBar).toBeInTheDocument();
  });

  it("should redirect to SignIn page when not logged in", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore));
    expect(mockNavigate).toBeCalled();
  });

  it("should deliver empty string to Profile when no photo", () => {
    render(getElement(noPhotoMockStore));
    const profiles = screen.getAllByTestId("profile");
    profiles.forEach((profile) => {
      expect(profile).toContainHTML("");
    });
  });
});
