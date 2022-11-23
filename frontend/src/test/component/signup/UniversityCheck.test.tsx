import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import UniversityCheck from "../../../component/signup/UniversityCheck";
import { universities } from "../../../dummyData";
import { getDefaultMockStore } from "../../../test-utils/mocks";
import { University } from "../../../types";


const mockStore = getDefaultMockStore();
const mockSetUniversity = jest.fn();
const mockSetEmail = jest.fn();
const mockSetStep = jest.fn();

const university: University = universities[0];


describe("UniversityCheck", () => {
  function getElement(
    university: University | null,
  ) {
    return (
      <Provider store={mockStore}>
        <UniversityCheck
          university={university}
          requestTime={new Date()}
          email={""}
          setUniversity={mockSetUniversity}
          setEmail={mockSetEmail}
          setStep={mockSetStep}
        />
      </Provider>
    );
  }

  it("should be rendered", () => {
    const { container } = render(getElement(university));
    expect(container).toBeTruthy();
  });

  it("should check email", () => {
    render(getElement(university));
    const emailField = screen.getByPlaceholderText("이메일");
    const confirmButton = screen.getByText("확인");
    fireEvent.change(emailField, { target: { value: "user@snu.ac.kr" } });
    fireEvent.click(confirmButton);
  });
});
