import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import EmailVerification from "../../../component/signup/EmailVerification";


describe("EmailVerification", () => {
  const mockSetStep = jest.fn();
  const mockSetRequestTime = jest.fn();
  function component() {
    return (
      <EmailVerification
        email={""}
        limitSec={3 * 60}
        requestTime={new Date()}
        setRequestTime={mockSetRequestTime}
        setStep={mockSetStep}
      />
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should be rendered", () => {
    render(component());
    expect(screen.getByText("재전송")).toBeInTheDocument();
  });

  it("should call setStep with status code 204", async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 204 });
    render(component());
    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(mockSetStep).toBeCalled();
    });
  });

  it("should alert with axios error", async () => {
    window.alert = jest.fn();
    axios.post = jest.fn().mockRejectedValue({});
    render(component());
    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(window.alert).toBeCalled();
    });
  });

  it("should handle resend button click", async () => {
    axios.post = jest.fn();
    render(component());
    const resendButton = screen.getByText("재전송");
    fireEvent.click(resendButton);
    expect(mockSetRequestTime).toBeCalled();
    await waitFor(() => {
      expect(axios.post).toBeCalled();
    });
  });
});
