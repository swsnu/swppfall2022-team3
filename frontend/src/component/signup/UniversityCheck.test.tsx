import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { universities, users } from "../../dummyData";
import { getDefaultMockStore } from "../../test-utils/mocks";
import { University } from "../../types";
import UniversityCheck from "./UniversityCheck";


const mockStore = getDefaultMockStore();

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

const mockSetUniversity = jest.fn();
const mockSetEmail = jest.fn();
const mockSetVerificationCode = jest.fn();
const mockSetStep = jest.fn();

const university: University = universities[0];


describe("UniversityCheck", () => {
  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <UniversityCheck
          university={university}
          setUniversity={mockSetUniversity}
          email={""}
          setEmail={mockSetEmail}
          setVerificationCode={mockSetVerificationCode}
          setStep={mockSetStep}
        />
      </Provider>
    );
  });

  it("should be render university's email domain", () => {
    render(
      <Provider store={mockStore}>
        <UniversityCheck
          university={university}
          setUniversity={mockSetUniversity}
          email={""}
          setEmail={mockSetEmail}
          setVerificationCode={mockSetVerificationCode}
          setStep={mockSetStep}
        />
      </Provider>
    );

    const universityDomain = screen.getByText(`@${university.domain}`);

    expect(universityDomain).toBeInTheDocument();
  });

  it("should be render a default domain when there is no university", () => {
    render(
      <Provider store={mockStore}>
        <UniversityCheck
          university={null}
          setUniversity={mockSetUniversity}
          email={""}
          setEmail={mockSetEmail}
          setVerificationCode={mockSetVerificationCode}
          setStep={mockSetStep}
        />
      </Provider>
    );

    const defaultDomain = screen.getByText("@pitapat.com");

    expect(defaultDomain).toBeInTheDocument();
  });

  it("should update the value when a user enters an email", () => {
    render(
      <Provider store={mockStore}>
        <UniversityCheck
          university={university}
          setUniversity={mockSetUniversity}
          email={""}
          setEmail={mockSetEmail}
          setVerificationCode={mockSetVerificationCode}
          setStep={mockSetStep}
        />
      </Provider>
    );

    const emailInput = screen.getByRole("textbox");

    fireEvent.change(emailInput, { target: { value: "email_input" } } );
    expect(mockSetEmail).toBeCalled();
  });

  it("should send code when confirm button is clicked and inputs are not empty", async () => {
    render(
      <Provider store={mockStore}>
        <UniversityCheck
          university={university}
          setUniversity={mockSetUniversity}
          email={"test"}
          setEmail={mockSetEmail}
          setVerificationCode={mockSetVerificationCode}
          setStep={mockSetStep}
        />
      </Provider>
    );

    const confirmButton = screen.getByText("확인");

    fireEvent.click(confirmButton);
    await waitFor(() => expect(mockSetStep).toHaveBeenCalled());
    await waitFor(() => expect(mockSetVerificationCode).toHaveBeenCalled());
  });

  it("should not send a code when confirm button is clicked but duplicated email", () => {
    const spyAlert = jest.spyOn(window, "alert").mockImplementation(() => true);

    render(
      <Provider store={mockStore}>
        <UniversityCheck
          university={university}
          setUniversity={mockSetUniversity}
          email={users[0].email}
          setEmail={mockSetEmail}
          setVerificationCode={mockSetVerificationCode}
          setStep={mockSetStep}
        />
      </Provider>
    );

    const confirmButton = screen.getByText("확인");

    fireEvent.click(confirmButton);
    expect(spyAlert).toBeCalled();
  });
});
