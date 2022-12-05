import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("should also be rendered.. for higher coverage", () => {
    jest.useFakeTimers();
    render(
      <EmailVerification
        email={""}
        limitSec={59}
        requestTime={new Date()}
        setRequestTime={mockSetRequestTime}
        setStep={mockSetStep}
      />
    );

    act(() => {
      jest.advanceTimersByTime(60 * 1000 + 1);
    });

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

  it("should not call setStep when the status code is not 204", async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 500 });
    render(component());
    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(mockSetStep).not.toBeCalled();
    });
  });

  it ("should alert when the time is over", async () => {
    const spyAlert = jest.spyOn(window, "alert").mockImplementation(() => true);
    axios.post = jest.fn().mockResolvedValue({ status: 204 });
    jest.useFakeTimers();

    render(
      <EmailVerification
        email={""}
        limitSec={0}
        requestTime={new Date()}
        setRequestTime={mockSetRequestTime}
        setStep={mockSetStep}
      />
    );

    act(() => {
      jest.advanceTimersByTime(3 * 60 * 1000 + 1);
    });
    expect(spyAlert).toBeCalled();
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
