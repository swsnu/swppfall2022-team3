import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import PitapatButton from "../../component/PitapatButton";
import { getDefaultMockStore } from "../../test-utils/mocks";
import { PitapatStatus } from "../../types";


const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("PitapatButton", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement(
    store: ToolkitStore,
    status: PitapatStatus,
    isAccept: boolean,
    isListView: boolean,
  ) {
    return (
      <Provider store={store}>
        <PitapatButton
          from={1}
          to={2}
          isAccept={isAccept}
          isListView={isListView}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders PitapatButton", () => {
    const { container } = render(getElement(mockStore, PitapatStatus.NONE, true, true));
    expect(container).toBeTruthy();
  });

  it("prints ♡ when not logged in", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore, PitapatStatus.NONE, true, true));
    const heart = screen.getByText("♡");
    expect(heart).toBeInTheDocument();
  });

  it("prints X when isAccept is false", () => {
    render(getElement(mockStore, PitapatStatus.NONE, false, true));
    const scissor = screen.getByText("X");
    expect(scissor).toBeInTheDocument();
  });

  it("prints 두근 when status is NONE", () => {
    render(getElement(mockStore, PitapatStatus.NONE, true, true));
    const text = screen.getByText("두근");
    expect(text).toBeInTheDocument();
  });

  it("prints 수락 when status is RECEIVED", () => {
    render(getElement(mockStore, PitapatStatus.TO_ME, true, true));
    const text = screen.getByText("수락");
    expect(text).toBeInTheDocument();
  });

  it("prints 취소 when status is RECEIVED", () => {
    render(getElement(mockStore, PitapatStatus.FROM_ME, true, true));
    const text = screen.getByText("취소");
    expect(text).toBeInTheDocument();
  });

  it("toggles pitapat status when clicks isAccept button", () => {
    render(getElement(mockStore, PitapatStatus.NONE, true, true));
    const button = screen.getByText("두근");
    fireEvent.click(button);
    expect(mockDispatch).toBeCalled();
  });

  it("deletes received pitapat when clicks not isAccept button", () => {
    render(getElement(mockStore, PitapatStatus.NONE, false, true));
    const button = screen.getByText("거절");
    fireEvent.click(button);
    expect(mockDispatch).toBeCalled();
  });

  it("has flex-none style in list view", () => {
    render(getElement(mockStore, PitapatStatus.NONE, true, true));
    const button = screen.getByText("두근");
    expect(button).toHaveStyle("flex: flex-none");
  });

  it("has pink border in when isAccept", () => {
    render(getElement(mockStore, PitapatStatus.NONE, true, false));
    const button = screen.getByText("두근");
    expect(button).toHaveStyle("border-color: rgb(219 39 119)");
  });
});
