import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import EmailVerification from "../../../component/signup/EmailVerification";


const mockSetStep = jest.fn();

describe("EmailVerification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    axios.post = jest.fn().mockImplementation(async (url: string) => {
      if (url === "/auth/email/") {
        return { status: 200 };
      } else if (url === "/auth/verify") {
        return { status: 204 };
      } else {
        return null;
      }
    });
  });

  it("should be rendered", () => {
    render(
      <EmailVerification
        email={""}
        limitSec={3 * 60}
        requestTime={new Date()}
        setRequestTime={jest.fn()}
        setStep={mockSetStep}
      />
    );
  });

  it("should set proper time interval", async () => {
    jest.useFakeTimers();

    render(
      <EmailVerification
        email={""}
        limitSec={30}
        requestTime={new Date()}
        setRequestTime={jest.fn()}
        setStep={mockSetStep}
      />
    );

    // jest.advanceTimersByTime(30 * 1000 + 1);
  });
});
