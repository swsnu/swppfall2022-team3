import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Introduction from "./Introduction";


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

  it("should be rendered", () => {
    render(introduction(""));
    const textArea = screen.getByPlaceholderText("소개글을 작성해주세요!");
    expect(textArea).toBeInTheDocument();
  });

  it("should not receive empty input", () => {
    render(introduction(""));
    const confirmButton = screen.getByRole("button");
    fireEvent.click(confirmButton);
    const warningArticle = screen.getByText("필수 작성 항목입니다.");
    expect(warningArticle).toBeInTheDocument();
  });

  it("should receive valid input", () => {
    render(introduction("intro content"));
    const textArea = screen.getByPlaceholderText("소개글을 작성해주세요!");
    const confirmButton = screen.getByRole("button");
    fireEvent.change(textArea, { target: { value: "it is mocked so it will not be changed" } });
    fireEvent.click(confirmButton);
    expect(mockSetStep).toBeCalled();
    expect(mockSetIntroduction).toBeCalled();
  });
});
