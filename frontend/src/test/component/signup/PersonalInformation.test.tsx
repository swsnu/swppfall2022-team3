import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import PersonalInformation from "../../../component/signup/PersonalInformation";
import { colleges, majors, universities } from "../../../dummyData";
import { getDefaultMockStore } from "../../../test-utils/mocks";
import { College, Gender, Major, University } from "../../../types";


const testUniversity = universities[0];
const testCollege = colleges[0];
const testMajor = majors[0];
const mockSetUsername = jest.fn();
const mockSetPassword = jest.fn();
const mockSetPhone = jest.fn();
const mockSetBirthday = jest.fn();
const mockSetCollege = jest.fn();
const mockSetMajor = jest.fn();
const mockSetGender = jest.fn();
const mockSettargetGender = jest.fn();
const mockSetStep = jest.fn();

describe("InformationInput", () => {
  const mockStore = getDefaultMockStore(false);

  function getElement(
    university: University | null,
    college: College | null,
    major: Major | null,
  ) {
    return (
      <Provider store={mockStore}>
        <PersonalInformation
          nickname={"test_user"}
          setNickname={mockSetUsername}
          password={"test_password"}
          setPassword={mockSetPassword}
          phone={"123"}
          setPhone={mockSetPhone}
          birthday={new Date()}
          setBirthday={mockSetBirthday}
          university={university}
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
    const { container } = render(getElement(testUniversity, null, null));
    expect(container).toBeTruthy();
  });

  it("should setStep when all information is set", () => {
    render(getElement(testUniversity, testCollege, testMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).toBeCalled();
  });

  it("shouldn't setStep when some college is empty", () => {
    render(getElement(testUniversity, null, testMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });
  it("shouldn't setStep when some major is empty", () => {
    render(getElement(testUniversity, testCollege, null));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });


});
