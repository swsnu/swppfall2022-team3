import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {fireEvent, screen, render} from "@testing-library/react";
import { getDefaultMockStore, getNoPhotoMockStore } from "../test-utils/mocks";
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

jest.mock("../component/AppBar", () => () => <div></div>);
jest.mock("../component/Profile", () => () => <div></div>);


describe("PitapatList", () => {
  const mockStore = getDefaultMockStore(true);
  const mockStore2 = getNoPhotoMockStore(true);

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

  it("renders PitapatList", () => {
    const { container } = render(getElement(mockStore));
    expect(container).toBeTruthy();
    const sentPitapat = screen.getByText("보낸 두근");
    fireEvent.click(sentPitapat);
    expect(container).toBeTruthy();
  });

  it("redirects to SignIn page when not logged in", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore));
    expect(mockNavigate).toBeCalled();
  });
});
