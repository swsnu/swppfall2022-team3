import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { IProps as EmailProps } from "../../component/signup/EmailVerification";
import { IProps as ImageProps } from "../../component/signup/ImageUpload";
import { IProps as IntroProps } from "../../component/signup/Introduction";
import { IProps as InfoProps } from "../../component/signup/PersonalInformation";
import { IProps as TagProps } from "../../component/signup/TagSelect";
import { IProps as UnivProps } from "../../component/signup/UniversitySelect";
import { universities, colleges, majors, tags } from "../../dummyData";
import SignUp from "../../page/SignUp";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockUniversity = universities[0];
const mockCollege = colleges[0];
const mockMajor = majors[0];
const mockTag = [tags[0]];

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

jest.mock("../../component/signup/UniversitySelect", () => (props: UnivProps) => (
  <div data-testid="spyUniversitySelect">
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

jest.mock("../../component/signup/EmailVerification", () => (props: EmailProps) => (
  <div data-testid="spyEmailVerification">
    <button onClick={() => (props.setStep(2))}>
      next
    </button>
  </div>
));

jest.mock("../../component/signup/PersonalInformation", () => (props: InfoProps) => (
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

jest.mock("../../component/signup/TagSelect", () => (props: TagProps) => (
  <div data-testid="spyTagSelect">
    <button onClick={() => {
      props.setStep(4);
      props.setTags(mockTag);
    }}>
      next
    </button>
  </div>
));

jest.mock("../../component/signup/Introduction", () => (props: IntroProps) => (
  <div data-testid="spyIntroduction">
    <button onClick={() => (props.setStep(5))}>
      next
    </button>
  </div>
));

jest.mock("../../component/signup/ImageUpload", () => (props: ImageProps) => (
  <div data-testid="spyImageUpload">
    <button onClick={() => (props.setStep(6))}>
      next
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
    screen.getByTestId("spyUniversitySelect");
    let nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyEmailVerification");
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyPersonalInformation");
    nextButton = screen.getByText("next");
    fireEvent.click(nextButton);
    screen.getByTestId("spyTagSelect");
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

  // it("should redirect to SignIn page when clicks confirm button with proper input", () => {
  //   axios.post = jest.fn().mockResolvedValue({data: {key: 1}});

  //   render(getElement(mockStore));
  //   let nextButton = screen.getByText("next");
  //   fireEvent.click(nextButton);
  //   nextButton = screen.getByText("next");
  //   fireEvent.click(nextButton);
  //   nextButton = screen.getByText("next");
  //   fireEvent.click(nextButton);
  //   nextButton = screen.getByText("next");
  //   fireEvent.click(nextButton);
  //   nextButton = screen.getByText("next");
  //   fireEvent.click(nextButton);
  //   nextButton = screen.getByText("next");
  //   fireEvent.click(nextButton);
  //   const confirmButton = screen.getByText("완료");
  //   fireEvent.click(confirmButton);
  //   expect(mockNavigate).toBeCalled();
  //   expect(mockDispatch).toBeCalled();
  // });
});
