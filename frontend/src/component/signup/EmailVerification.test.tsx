import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EmailVerification from "./EmailVerification";


const mockSendVerificationCode = jest.fn().mockResolvedValue({
  status: 200,
  text: "OK",
});
jest.mock("../../util/email", () => ({
  sendVerificationCode: () => mockSendVerificationCode,
}));

jest.mock("../../util/verification", () => ({
  getCode: () => jest.fn(() => "ABCDEF"),
}));

const mockSetVerificationCode = jest.fn();
const mockSetStep = jest.fn();

describe("EmailVerification", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it("should be rendered", () => {
    render(
      <EmailVerification
        email={""}
        verificationCode={"abcdef"}
        setVerificationCode={mockSetVerificationCode}
        setStep={mockSetStep}
      />
    );
  });

  it("should alert with invalid code", () => {
    const spyAlert = jest.spyOn(window, "alert").mockImplementation(() => true);

    render(
      <EmailVerification
        email={""}
        verificationCode={"abcdef"}
        setVerificationCode={mockSetVerificationCode}
        setStep={mockSetStep}
      />
    );

    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    expect(spyAlert).toBeCalled();
  });

  it("should update code if resend button is clicked", async () => {
    const spyAlert = jest.spyOn(window, "alert").mockImplementation(() => true);

    render(
      <EmailVerification
        email={""}
        verificationCode={"ABCDEF"}
        setVerificationCode={mockSetVerificationCode}
        setStep={mockSetStep}
      />
    );

    const resendButton = screen.getByText("재전송");
    const confirmButton = screen.getByText("확인");
    const userInput = screen.getByRole("textbox");

    fireEvent.click(resendButton);
    fireEvent.change(userInput, { target: { value: "ABCDEF" } });
    fireEvent.click(confirmButton);

    expect(spyAlert).not.toBeCalled();
    await waitFor(() => expect(mockSetStep).toHaveBeenCalled());
  });

  /*
  it("should set proper time interval", async () => {
    const spyAlert = jest.spyOn(window, "alert").mockImplementation(() => true);
    jest.useFakeTimers();

    render(
      <EmailVerification
        email={""}
        verificationCode={"ABCDEF"}
        setVerificationCode={mockSetVerificationCode}
        setStep={mockSetStep}
      />
    );

    act(() => {
      jest.advanceTimersByTime(3 * 60 * 1000 + 1);
    });



    await waitFor(() => expect(spyAlert).toHaveBeenCalled());
  });
   */
});
