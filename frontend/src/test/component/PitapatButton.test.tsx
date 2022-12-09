import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import PitapatButton from "../../component/PitapatButton";
import { getDefaultMockStore, getLoginUserFromMockStore, getLoginUserToMockStore } from "../../test-utils/mocks";
import { PitapatStatus } from "../../types";


const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("PitapatButton", () => {
  const mockStore = getDefaultMockStore(true);
  const mockLoginFromStore = getLoginUserFromMockStore();
  const mockLoginToStore = getLoginUserToMockStore();

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
    render(getElement(mockLoginToStore, PitapatStatus.TO_ME, true, true));
    const text = screen.getByText("수락");
    expect(text).toBeInTheDocument();
  });

  it("prints 취소 when status is RECEIVED", () => {
    render(getElement(mockLoginFromStore, PitapatStatus.FROM_ME, true, true));
    const text = screen.getByText("취소");
    expect(text).toBeInTheDocument();
  });

  it("prints 두근 when senderKey doesn't have from user's key", () => {
    render(
      <Provider store={mockLoginToStore}>
        <PitapatButton
          from={3}
          to={2}
          isAccept={true}
          isListView={false}
        />
      </Provider>
    );
    const text = screen.getByText("두근");
    expect(text).toBeInTheDocument();
  });

  it("should do nothing when loginuser is null", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore, PitapatStatus.NONE, false, false));
    const button = screen.getByRole("button");
    fireEvent.click(button);
  });

  it("should delete pitapat when clicks 거절 button", async () => {
    axios.delete = jest.fn();
    render(getElement(mockStore, PitapatStatus.NONE, false, false));
    const button = screen.getByText("거절");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it("should delete sended pitapat when clicks 취소 button", async () => {
    axios.delete = jest.fn();
    render(getElement(mockLoginFromStore, PitapatStatus.FROM_ME, true, true));
    const button = screen.getByText("취소");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it("should send pitapat when clicks 두근 button", async () => {
    axios.post = jest.fn();
    render(getElement(mockStore, PitapatStatus.FROM_ME, true, true));
    const button = screen.getByText("두근");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
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
