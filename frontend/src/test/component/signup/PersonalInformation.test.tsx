import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import PersonalInformation from "../../../component/signup/PersonalInformation";
import { colleges, majors, universities } from "../../../dummyData";
import { getDefaultMockStore, getNoCollegeMajorMockStore } from "../../../test-utils/mocks";
import { College, Gender, Major, University } from "../../../types";


const testUniversity = universities[0];
const testCollege = colleges[0];
const testMajor = majors[0];
const mockSetUsername = jest.fn();
const mockSetPassword = jest.fn();
const mockSetBirthday = jest.fn();
const mockSetCollege = jest.fn();
const mockSetMajor = jest.fn();
const mockSetGender = jest.fn();
const mockSettargetGender = jest.fn();
const mockSetStep = jest.fn();
window.alert = jest.fn();

describe("InformationInput", () => {
  const mockStore = getDefaultMockStore(false);

  function getElement(
    nickname: string,
    password: string,
    university: University | null,
    college: College | null,
    major: Major | null,
  ) {
    return (
      <Provider store={mockStore}>
        <PersonalInformation
          nickname={nickname}
          setNickname={mockSetUsername}
          password={password}
          setPassword={mockSetPassword}
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
    const { container } = render(getElement("test_nickname", "test_password", testUniversity, null, null));
    expect(container).toBeTruthy();
  });

  it("shouldn't setStep when nickname check is invalid", () => {
    render(getElement("", "test_password", testUniversity, testCollege, testMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });

  it("shouldn't setStep when some university is empty", () => {
    render(getElement("test_nickname", "test_password", null, testCollege, testMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });

  it("shouldn't setStep when some college is empty", () => {
    render(getElement("test_nickname", "", testUniversity, null, testMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });

  it("shouldn't setStep when some major is empty", () => {
    render(getElement("test_nickname", "", testUniversity, testCollege, null));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });

  it("should setStep when all information is proper", () => {
    render(getElement("test_nickname", "", testUniversity, testCollege, testMajor));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).toBeCalled();
  });

  it("should be move to the previous step when clicked back button", () => {
    render(getElement("test_nickname", "test_password", testUniversity, testCollege, testMajor));
    const backmButton = screen.getByText("뒤로 가기");
    fireEvent.click(backmButton);
    expect(mockSetStep).toBeCalled();
  });

  it("shouldv be move to the previous step when clicked back button", () => {
    render(
      <Provider store={getNoCollegeMajorMockStore()}>
        <PersonalInformation
          nickname={"test_user"}
          setNickname={mockSetUsername}
          password={""}
          setPassword={mockSetPassword}
          birthday={new Date()}
          setBirthday={mockSetBirthday}
          university={testUniversity}
          college={testCollege}
          setCollege={mockSetCollege}
          major={testMajor}
          setMajor={mockSetMajor}
          gender={Gender.MALE}
          setGender={mockSetGender}
          targetGender={Gender.FEMALE}
          setTargetGender={mockSettargetGender}
          setStep={mockSetStep}
        />
      </Provider>
    );
  });
});
