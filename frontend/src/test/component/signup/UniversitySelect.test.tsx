import React from "react";
import { Provider } from "react-redux";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import UniversitySelect from "../../../component/signup/UniversitySelect";
import { universities } from "../../../dummyData";
import { getDefaultMockStore } from "../../../test-utils/mocks";
import { University } from "../../../types";


const mockStore = getDefaultMockStore();
const mockSetUniversity = jest.fn();
const mockSetEmail = jest.fn();
const mockSetStep = jest.fn();
const mockSetIsOpenTimeoutModal = jest.fn();
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const university: University = universities[0];


describe("UniversitySelect", () => {
  function getElement(
    university: University | null,
  ) {
    return (
      <Provider store={mockStore}>
        <UniversitySelect
          university={university}
          requestTime={new Date()}
          email={""}
          isOpenTimeoutModal={false}
          setUniversity={mockSetUniversity}
          setEmail={mockSetEmail}
          setStep={mockSetStep}
          setIsOpenTimeoutModal={mockSetIsOpenTimeoutModal}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be rendered", () => {
    const { container } = render(getElement(university));
    expect(container).toBeTruthy();
  });

  it("should set email null", () => {
    const { container } = render(getElement(null));
    expect(container).toBeTruthy();
  });

  it("should render modal when email is exist", async () => {
    render(getElement(university));
    axios.get = jest.fn().mockResolvedValue({ data: { "exists": "true" } });
    axios.post = jest.fn();

    const emailField = screen.getByPlaceholderText("이메일");
    const confirmButton = screen.getByText("확인");
    fireEvent.change(emailField, { target: { value: "user@snu.ac.kr" } });
    fireEvent.click(confirmButton);
    await act( async () => {
      await expect(axios.post).not.toBeCalled();
    });

  });

  it("should proceed to the next step when email is not exist", async () => {
    render(getElement(university));
    axios.get = jest.fn().mockResolvedValue({ data: [] });
    axios.post = jest.fn();

    const emailField = screen.getByPlaceholderText("이메일");
    const confirmButton = screen.getByText("확인");
    fireEvent.change(emailField, { target: { value: "user@snu.ac.kr" } });
    fireEvent.click(confirmButton);
  });

  it("should be move to the previous step when clicked back button", () => {
    render(getElement(university));
    const backButton = screen.getByText("뒤로 가기");
    fireEvent.click(backButton);
    expect(mockNavigate).toBeCalled();
  });
});
