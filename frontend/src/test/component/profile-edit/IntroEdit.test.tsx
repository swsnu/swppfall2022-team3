import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import IntroEdit from "../../../component/profile-edit/IntroEdit";
import { getDefaultMockStore } from "../../../test-utils/mocks";


const mockStore = getDefaultMockStore();
const mockOnModalClose = jest.fn();
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("IntroEdit", () => {
  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <IntroEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );
  });

  it("should handle confirm button onClick", () => {
    render(
      <Provider store={mockStore}>
        <IntroEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const confirmButton = screen.getByText("정보 수정");
    const cancelButton = screen.getByText("취소");
    const textInput = screen.getByPlaceholderText("소개글을 작성해주세요!");

    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
  });

  it("should handle cancel button onClick", () => {
    render(
      <Provider store={mockStore}>
        <IntroEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const cancelButton = screen.getByText("취소");

    fireEvent.click(cancelButton);

    expect(mockOnModalClose).toBeCalled();
  });

  it("should handle confirm button onClick when user input is valid", async () => {
    axios.put = jest.fn().mockResolvedValue(() => ({ status: 200 }));

    render(
      <Provider store={mockStore}>
        <IntroEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const confirmButton = screen.getByText("정보 수정");
    const textInput = screen.getByPlaceholderText("소개글을 작성해주세요!");
    const userInput = "new introduction";

    fireEvent.change(textInput, { target: { value: userInput } });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(axios.put).toBeCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
    await waitFor(() => {
      expect(mockOnModalClose).toBeCalled();
    });
  });

  it("should handle confirm button onClick when user input is invalid", async () => {
    axios.put = jest.fn().mockResolvedValue(() => ({ status: 200 }));

    render(
      <Provider store={mockStore}>
        <IntroEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const confirmButton = screen.getByText("정보 수정");
    const textInput = screen.getByPlaceholderText("소개글을 작성해주세요!");
    const userInput = "";

    fireEvent.change(textInput, { target: { value: userInput } });
    fireEvent.click(confirmButton);

    expect(screen.getByText("필수 작성 항목입니다.")).toBeInTheDocument();
  });

  it("should do nothing when there is no login user", async () => {
    axios.put = jest.fn().mockResolvedValue(() => ({ status: 200 }));

    render(
      <Provider store={getDefaultMockStore(false)}>
        <IntroEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const confirmButton = screen.getByText("정보 수정");
    const textInput = screen.getByPlaceholderText("소개글을 작성해주세요!");
    const userInput = "this should not be work";

    fireEvent.change(textInput, { target: { value: userInput } });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(axios.put).not.toBeCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).not.toBeCalled();
    });
    await waitFor(() => {
      expect(mockOnModalClose).not.toBeCalled();
    });
  });
});
