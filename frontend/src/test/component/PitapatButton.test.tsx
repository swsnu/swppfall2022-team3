import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import PitapatButton from "../../component/PitapatButton";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("PitapatButton", () => {
  const mockStore = getDefaultMockStore(true);
  const myKey = 1;
  const senderKey = 2;
  const receiverKey = 3;
  const otherUserKey = 4;

  function getElement(
    store: ToolkitStore,
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
    const { container } = render(getElement(mockStore, true, true));
    expect(container).toBeTruthy();
  });

  it("prints ♡ when not logged in", () => {
    const mockLogoutStore = getDefaultMockStore(false);
    render(getElement(mockLogoutStore, true, true));
    const heart = screen.getByText("♡");
    fireEvent.click(heart);
    expect(heart).toBeInTheDocument();
    expect(mockDispatch).not.toBeCalled();
  });

  it("prints X when isAccept is false", () => {
    render(getElement(mockStore, false, true));
    const scissor = screen.getByText("X");
    expect(scissor).toBeInTheDocument();
  });

  it("prints 두근 when status is NONE", () => {
    render(getElement(mockStore, true, true));
    const text = screen.getByText("두근");
    expect(text).toBeInTheDocument();
  });

  it("prints 두근 for receiving pitapat to another user", () => {
    render(
      <Provider store={mockStore}>
        <PitapatButton
          from={otherUserKey}
          to={myKey}
          isAccept={true}
          isListView={true}
        />
      </Provider>
    );
    const text = screen.getByText("두근");
    expect(text).toBeInTheDocument();
  });

  it("prints 수락 when status is RECEIVED", () => {
    render(
      <Provider store={mockStore}>
        <PitapatButton
          from={senderKey}
          to={myKey}
          isAccept={true}
          isListView={true}
        />
      </Provider>
    );
    const text = screen.getByText("수락");
    expect(text).toBeInTheDocument();
  });

  it("prints 취소 when status is RECEIVED", () => {
    render(
      <Provider store={mockStore}>
        <PitapatButton
          from={myKey}
          to={receiverKey}
          isAccept={true}
          isListView={true}
        />
      </Provider>
    );
    const text = screen.getByText("취소");
    expect(text).toBeInTheDocument();
  });

  it("toggles pitapat status when clicks isAccept button", async () => {
    axios.post = jest.fn().mockResolvedValue({});
    render(
      <Provider store={mockStore}>
        <PitapatButton
          from={myKey}
          to={otherUserKey}
          isAccept={true}
          isListView={true}
        />
      </Provider>
    );
    const button = screen.getByText("두근");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
  });

  it("deletes received pitapat", async () => {
    axios.delete = jest.fn().mockResolvedValue({});
    render(
      <Provider store={mockStore}>
        <PitapatButton
          from={senderKey}
          to={myKey}
          isAccept={false}
          isListView={true}
        />
      </Provider>
    );
    const button = screen.getByText("거절");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
  });

  it("deletes sent pitapat", async () => {
    axios.delete = jest.fn().mockResolvedValue({});
    render(
      <Provider store={mockStore}>
        <PitapatButton
          from={myKey}
          to={receiverKey}
          isAccept={true}
          isListView={true}
        />
      </Provider>
    );
    const button = screen.getByText("취소");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
  });

  it("has flex-none style in list view", () => {
    render(getElement(mockStore, true, true));
    const button = screen.getByText("두근");
    expect(button).toHaveStyle("flex: flex-none");
  });

  it("has pink border in when isAccept", () => {
    render(getElement(mockStore, true, false));
    const button = screen.getByText("두근");
    expect(button).toHaveStyle("border-color: rgb(219 39 119)");
  });
});
