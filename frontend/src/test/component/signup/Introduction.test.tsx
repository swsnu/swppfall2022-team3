import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Introduction from "../../../component/signup/Introduction";


const mockSetIntroduction = jest.fn();
const mockSetStep = jest.fn();

describe("Introduction", () => {
  function introduction(text: string) {
    return (
      <Introduction
        introduction={text}
        setIntroduction={mockSetIntroduction}
        setStep={mockSetStep}
      />
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be rendered", () => {
    render(introduction(""));
    const textArea = screen.getByPlaceholderText("소개글을 작성해주세요!");
    expect(textArea).toBeInTheDocument();
  });

  it("should not receive empty input", () => {
    render(introduction(""));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    const warningArticle = screen.getByText("필수 작성 항목입니다.");
    expect(warningArticle).toBeInTheDocument();
  });

  it("should receive valid input", () => {
    render(introduction("intro content"));
    const textArea = screen.getByPlaceholderText("소개글을 작성해주세요!");
    const confirmButton = screen.getByText("다음");
    fireEvent.change(textArea, { target: { value: "it is mocked so it will not be changed" } });
    fireEvent.click(confirmButton);
    expect(mockSetStep).toBeCalled();
    expect(mockSetIntroduction).toBeCalled();
  });

  it("should be move to the previous step when clicked back button", () => {
    render(introduction(""));
    const backmButton = screen.getByText("뒤로 가기");
    fireEvent.click(backmButton);
    expect(mockSetStep).toBeCalled();
  });
});
