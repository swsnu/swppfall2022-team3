import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { colleges, majors } from "../../dummyData";
import { getDefaultMockStore } from "../../test-utils/mocks";
import { College, Gender, Major } from "../../types";
import PersonalInformation from "./PersonalInformation";


const mockCollege = colleges[0];
const mockMajor = majors[0];
const mockSetUsername = jest.fn();
const mockSetPassword = jest.fn();
const mockSetBirthday = jest.fn();
const mockSetCollege = jest.fn();
const mockSetMajor = jest.fn();
const mockSetGender = jest.fn();
const mockSettargetGender = jest.fn();
const mockSetStep = jest.fn();

describe("InformationInput", () => {
  const mockStore = getDefaultMockStore(false);

  function getElement(
    college: College | null,
    major: Major | null
  ) {
    return (
      <Provider store={mockStore}>
        <PersonalInformation
          username={"test_user"}
          setUsername={mockSetUsername}
          password={"test_password"}
          setPassword={mockSetPassword}
          birthday={new Date()}
          setBirthday={mockSetBirthday}
          college={college}
          setCollege={mockSetCollege}
          major={major}
          setMajor={mockSetMajor}
          gender={Gender.MALE}
          setGender={mockSetGender}
          targetGender={Gender.FEMALE}
          setTargetGender={mockSettargetGender}
          setStep={mockSetStep}
        />
      </Provider>
    );
  }
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders InformationInput", () => {
    const { container } = render(getElement(null, null));
    expect(container).toBeTruthy();
  });

  it("should setStep when all information is set", () => {
    render(getElement(mockCollege, mockMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).toBeCalled();
  });

  it("shouldn't setStep when some college is empty", () => {
    render(getElement(null, mockMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });
  it("shouldn't setStep when some major is empty", () => {
    render(getElement(mockCollege, null));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });


});