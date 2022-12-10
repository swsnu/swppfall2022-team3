import React from "react";
import { Provider } from "react-redux";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import LoginInfoChanger from "../../component/LoginInfoChanger";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockStore = getDefaultMockStore(true);

describe("LoginInfoChanger", () => {
  const mockOnModalClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn((message: string) => message);
  });

  function getComponent() {
    return (
      <Provider store={mockStore}>
        <LoginInfoChanger onModalClose={mockOnModalClose}/>
      </Provider>
    );
  }

  it("should be rendered", () => {
    const { container } = render(getComponent());
    expect(container).toBeTruthy();
  });

  it("should alert with empty fields", () => {
    render(getComponent());
    const confirmButton = screen.getByText("적용");
    fireEvent.click(confirmButton);
    expect(window.alert).toReturnWith("닉네임과 비밀번호를 입력해야 합니다.");
  });

  it("should alert with different password values", () => {
    render(getComponent());
    const nicknameField = screen.getByPlaceholderText("닉네임");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    const passwordConfirmField = screen.getByPlaceholderText("비밀번호 확인");
    const confirmButton = screen.getByText("적용");
    fireEvent.change(nicknameField, { target: { value: "test" } });
    fireEvent.change(passwordField, { target: { value: "test1" } });
    fireEvent.change(passwordConfirmField, { target: { value: "test2" } });
    fireEvent.click(confirmButton);
    expect(window.alert).toReturnWith("비밀번호가 일치하지 않습니다.");
  });

  it("should alert with too easy password", async () => {
    axios.post = jest.fn().mockRejectedValue("");
    axios.put = jest.fn();
    render(getComponent());
    const nicknameField = screen.getByPlaceholderText("닉네임");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    const passwordConfirmField = screen.getByPlaceholderText("비밀번호 확인");
    const confirmButton = screen.getByText("적용");
    fireEvent.change(nicknameField, { target: { value: "test" } });
    fireEvent.change(passwordField, { target: { value: "test" } });
    fireEvent.change(passwordConfirmField, { target: { value: "test" } });
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(axios.post).toBeCalled();
    });
    await waitFor(() => {
      expect(window.alert).toBeCalled();
    });
  });

  it("should call api with appropriate input values", async () => {
    axios.post = jest.fn();
    axios.put = jest.fn();
    render(getComponent());
    const nicknameField = screen.getByPlaceholderText("닉네임");
    const passwordField = screen.getByPlaceholderText("비밀번호");
    const passwordConfirmField = screen.getByPlaceholderText("비밀번호 확인");
    const confirmButton = screen.getByText("적용");
    fireEvent.change(nicknameField, { target: { value: "test" } });
    fireEvent.change(passwordField, { target: { value: "test" } });
    fireEvent.change(passwordConfirmField, { target: { value: "test" } });
    fireEvent.click(confirmButton);
    await act(async () => {
      await expect(axios.post).toBeCalled();
      await expect(axios.put).toBeCalled();
    });
  });

  it("should call onModalClose when clicks cancel button", () => {
    render(getComponent());
    const cancelButton = screen.getByText("취소");
    fireEvent.click(cancelButton);
    expect(mockOnModalClose).toBeCalled();
  });
});
