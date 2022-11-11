import React, { Dispatch, SetStateAction } from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { universities, colleges, majors } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import { College, Gender, Major, Tag, University } from "../types";
import SignUp from "./SignUp";


const mockUniversity = universities[0];
const mockCollege = colleges[0];
const mockMajor = majors[0];

interface CProps {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}

interface EProps {
  email: string;
  verificationCode: string;
  setVerificationCode: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

interface ImgProps {
  uploadedPhotos: File[];
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}

interface IntProps {
  introduction: string;
  setIntroduction: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

interface PProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  birthday: Date;
  setBirthday: Dispatch<SetStateAction<Date>>;
  college: College | null;
  setCollege: Dispatch<SetStateAction<College | null>>;
  major: Major | null;
  setMajor: Dispatch<SetStateAction<Major | null>>;
  gender: Gender;
  setGender: Dispatch<SetStateAction<Gender>>;
  targetGender: Gender;
  setTargetGender: Dispatch<SetStateAction<Gender>>;
  setStep: Dispatch<SetStateAction<number>>;
}

interface UProps {
  university: University | null;
  setUniversity: Dispatch<SetStateAction<University | null>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setVerificationCode: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../component/signup/CreateTag", () => (props: CProps) => (
  <div data-testid="spyCreateTag">
    <button onClick={() => (props.setStep(4))}>
      next
    </button>
  </div>
));
jest.mock("../component/signup/EmailVerification", () => (props: EProps) => (
  <div data-testid="spyEmailVerification">
    <button onClick={() => (props.setStep(2))}>
      next
    </button>
  </div>
));
jest.mock("../component/signup/ImageUpload", () => (props: ImgProps) => (
  <div data-testid="spyImageUpload">
    <button onClick={() => (props.setStep(6))}>
      next
    </button>
  </div>
));
jest.mock("../component/signup/Introduction", () => (props: IntProps) => (
  <div data-testid="spyIntroduction">
    <button onClick={() => (props.setStep(5))}>
      next
    </button>
  </div>
));
jest.mock("../component/signup/PersonalInformation", () => (props: PProps) => (
  <div data-testid="spyPersonalInformation">
    <button onClick={() => {
      props.setStep(3);
      props.setCollege(mockCollege);
      props.setMajor(mockMajor);
    }}>
      next
    </button>
  </div>
));
jest.mock("../component/signup/UniversityCheck", () => (props: UProps) => (
  <div data-testid="spyUniversityCheck">
    <button onClick={() => {
      props.setStep(1);
      props.setUniversity(mockUniversity);
    }}>
      next
    </button>
    <button onClick={() => (props.setStep(7))}>
      default
    </button>
    <button onClick={() => (props.setStep(6))}>
      last
    </button>
  </div>
));

describe("SignUp", () => {
  const mockStore = getDefaultMockStore(false);

  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SignUp", () => {
    const { container } = render(getElement(mockStore));
    expect(container).toBeTruthy();
  });

  it("redirects to Search page when logged in", () => {
    const mockLoginStore = getDefaultMockStore(true);
    render(getElement(mockLoginStore));
    expect(mockNavigate).toBeCalled();
  });

  it("should render correct component for the step", () => {
    render(getElement(mockStore));
    screen.getByTestId("spyUniversityCheck");
    let nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyEmailVerification");
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyPersonalInformation");
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyCreateTag");
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyIntroduction");
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyImageUpload");
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
  });

  it("render empty component for the default step", () => {
    render(getElement(mockStore));
    const defaultButton = screen.getByText("default");
    fireEvent.click(defaultButton);
  });
  it("shouldn't redirect to SignIn page when clicks confirm button with unproper input", () => {
    render(getElement(mockStore));
    const lastButton = screen.getByText("last");
    fireEvent.click(lastButton);
    const confirmButton = screen.getByText("완료");
    fireEvent.click(confirmButton);
    expect(mockNavigate).not.toBeCalled();
    expect(mockDispatch).not.toBeCalled();
  });
  it("should redirect to SignIn page when clicks confirm button with proper input", () => {
    render(getElement(mockStore));
    let nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    const confirmButton = screen.getByText("완료");
    fireEvent.click(confirmButton);
    expect(mockNavigate).toBeCalled();
    expect(mockDispatch).toBeCalled();
  });
});
