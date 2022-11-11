import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render } from "@testing-library/react";
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

jest.mock("../component/AppBar", () => () => <div></div>);
jest.mock("../component/Profile", () => () => <div></div>);


describe("Search", () => {
  const mockStore = getDefaultMockStore(true);
  const mockStore2 = getNoPhotoMockStore(true);

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

  it("renders Search", () => {
    const { container } = render(getElement(mockStore));
    expect(container).toBeTruthy();
  });

  it("redirects to SignIn page when not logged in", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore));
    expect(mockNavigate).toBeCalled();
  });

  it("when there is no photo of the user", () => {
    const { container } = render(getElement(mockStore2));
    expect(container).toBeTruthy();
  });
});
