import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render, screen } from "@testing-library/react";
import { getDefaultMockStore } from "../test-utils/mocks";
import PitapatList from "./PitapatList";


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

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  ThemeProvider: () => <div></div>,
  Tabs: () => <div></div>,
  Tab: () => <div></div>,
}));

jest.mock("../component/AppBar", () => () => <div>appbar</div>);
jest.mock("../component/Profile", () => () => <div></div>);
jest.mock("../component/NavigationBar", () => () => <div></div>);
jest.mock("../component/pitapat/PitapatReceived", () => () => <div></div>);
jest.mock("../component/pitapat/PitapatSent", () => () => <div></div>);


describe("PitapatList", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<PitapatList/>}/>
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
});