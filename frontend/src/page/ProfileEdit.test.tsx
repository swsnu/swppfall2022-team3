import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render, screen } from "@testing-library/react";
import { tags, users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import ProfileEdit from "./ProfileEdit";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../component/AppBar", () => () => <div>appbar</div>);
jest.mock("../component/PhotoSlider", () => () => <div></div>);

describe("ProfileEdit", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <ProfileEdit/>
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

  it("should show tags", () => {
    render(getElement(mockStore));
    users[0].tags.forEach((t) => {
      let element: HTMLElement = document.createElement("div");
      const tag = tags.find((tag) => tag.key === t);
      if (tag) { element = screen.getByText(tag.name); }
      expect(element).toBeInTheDocument();
    });
  });
});
