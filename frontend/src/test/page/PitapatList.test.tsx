import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import PitapatList from "../../page/PitapatList";
import { getDefaultMockStore } from "../../test-utils/mocks";


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

jest.mock("../../component/AppBar", () => () => <div>appbar</div>);
jest.mock("../../component/Profile", () => () => <div></div>);
jest.mock("../../component/NavigationBar", () => () => <div></div>);
jest.mock("../../component/pitapat/PitapatReceived", () => () => <div></div>);
jest.mock("../../component/pitapat/PitapatSent", () => () => <div></div>);


describe("PitapatList", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <PitapatList/>
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

  it("should change tab when clicks tab button", () => {
    render(getElement(mockStore));
    const sended = screen.getByText("보낸 두근");
    fireEvent.click(sended);
    expect(sended).toHaveAttribute("aria-selected", "true");
  });
});
