import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {render, screen, waitFor} from "@testing-library/react";
import ProfileDetail from "../../page/ProfileDetail";
import { getDefaultMockStore, getNointerestingUserMockStore } from "../../test-utils/mocks";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  "Navigate": (props: { to: string }) => {
    mockNavigate(props.to);
    return null;
  },
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../component/AppBar", () => () => <div>appbar</div>);
jest.mock("../../component/PhotoSlider", () => () => <div></div>);
jest.mock("../../component/PitapatButton", () => () => <div></div>);

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

  it("should be rendered", () => {
    render(getElement(mockStore));
    const appBar = screen.getByText("appbar");
    expect(appBar).toBeInTheDocument();
  });

  it("should redirect to Search page with no interesting user", async () => {
    const mockLogoutStore = getNointerestingUserMockStore();
    render(getElement(mockLogoutStore));
    await waitFor(() => expect(mockNavigate).toBeCalled());
  });

  it("should redirect to SignIn page when not logged in", async () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore));
    await waitFor(() => expect(mockNavigate).toBeCalled());
  });

  // it("should show tags", () => {
  //   render(getElement(mockStore));
  //   users[0].tags.forEach((t) => {
  //     let element: HTMLElement = document.createElement("div");
  //     const tag = tags.find((tag) => tag.key === t);
  //     if (tag) { element = screen.getByText(tag.name); }
  //     expect(element).toBeInTheDocument();
  //   });
  // });
});
