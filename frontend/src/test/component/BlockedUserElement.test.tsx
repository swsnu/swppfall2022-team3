import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import BlockedUserElement from "../../component/BlockedUserElement";


const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("BlockedUserElement", () => {
  function getElement() {
    return (
      <BlockedUserElement
        fromUserKey={1}
        toUserKey={2}
        userName={"test-user"}
        imagePath={"test-path"}
      />
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render BlockedUserElement", () => {
    const { container } = render(getElement());
    expect(container).toBeTruthy();
  });

  it("should delete block", () => {
    axios.delete = jest.fn();
    render(getElement());
    const deleteButton = screen.getByText("차단 풀기");
    fireEvent.click(deleteButton);
  });
});
