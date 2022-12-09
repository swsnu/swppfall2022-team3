import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import BlockedUserList from "../../component/BlockedUserList";
import { getBlockedMockStore, getDefaultMockStore } from "../../test-utils/mocks";


jest.mock("@heroicons/react/20/solid", () => ({
  ...jest.requireActual("@heroicons/react/20/solid"),
  ArrowUturnLeftIcon: (props: {onClick: () => void}) => (
    <button onClick={props.onClick}>back</button>
  ),
}));

jest.mock("../../component/BlockedUserElement.tsx", () =>
  (props: {fromUserKey: number}) => <div data-testid="user">{props.fromUserKey}</div>
);

const mockStore = getDefaultMockStore(true);
const blockedMockStore = getBlockedMockStore();

describe("BlockedUserList", () => {
  const mockSetBlockEdit = jest.fn();
  function getComponent(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <BlockedUserList setBlockedEdit={mockSetBlockEdit}/>
      </Provider>
    );
  }

  it("should be rendered", () => {
    const { container } = render(getComponent(mockStore));
    expect(container).toBeTruthy();
  });

  it("should show notice string with no blocked user", () => {
    render(getComponent(mockStore));
    const notice = screen.getByText("차단한 사람이 없어요");
    expect(notice).toBeInTheDocument();
  });

  it("should call setBlockEdit when clicked back button", () => {
    render(getComponent(mockStore));
    const backButton = screen.getByText("back");
    fireEvent.click(backButton);
    expect(mockSetBlockEdit).toBeCalled();
  });

  it("should render BlockedUserElement for each blocked user", () => {
    render(getComponent(blockedMockStore));
    const element = screen.getByTestId("user");
    expect(element).toBeInTheDocument();
  });

  it("should set fromUserKey 0 with no loginUser", () => {
    render(getComponent(getBlockedMockStore(false)));
    const element = screen.getByText(0);
    expect(element).toBeInTheDocument();
  });
});
