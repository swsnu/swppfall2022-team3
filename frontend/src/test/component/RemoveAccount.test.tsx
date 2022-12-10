import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import RemoveAccount from "../../component/RemoveAccount";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockStore = getDefaultMockStore();
const mockOnModalClose = jest.fn();
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  Navigate: () => <div>navigate</div>,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));


describe("RemoveAccount", () => {
  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <RemoveAccount onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const removeButton = screen.getByText("계정 삭제");
    const cancelButton = screen.getByText("취소");

    expect(removeButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("should handle remove button onClick", async () => {
    axios.delete = jest.fn().mockResolvedValue({});

    render(
      <Provider store={mockStore}>
        <RemoveAccount onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const removeButton = screen.getByText("계정 삭제");

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(axios.delete).toBeCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
    await waitFor(() => {
      expect(mockNavigate).toBeCalled();
    });
  });

  it("should do nothing when there is no login user", async () => {
    axios.delete = jest.fn().mockResolvedValue({});

    render(
      <Provider store={getDefaultMockStore(false)}>
        <RemoveAccount onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const removeButton = screen.getByText("계정 삭제");

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(axios.delete).not.toBeCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).not.toBeCalled();
    });
    await waitFor(() => {
      expect(mockNavigate).not.toBeCalled();
    });
  });

  it("should handle cancel button onClick", () => {
    render(
      <Provider store={mockStore}>
        <RemoveAccount onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const cancelButton = screen.getByText("취소");

    fireEvent.click(cancelButton);

    expect(mockOnModalClose).toBeCalled();
  });
});
