import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Introduction from "./Introduction";


const mockSetIntroduction = jest.fn();
const mockSetStep = jest.fn();

describe("Introduction", () => {
  it("should be rendered", () => {
    render(
      <Introduction
        introduction={""}
        setIntroduction={mockSetIntroduction}
        setStep={mockSetStep}
      />
    );

    const textArea = screen.getByPlaceholderText("소개글을 작성해주세요!");
    expect(textArea).toBeInTheDocument();
  });

  it("should not receive empty input", () => {
    render(
      <Introduction
        introduction={""}
        setIntroduction={mockSetIntroduction}
        setStep={mockSetStep}
      />
    );

    const confirmButton = screen.getByRole("button");
    fireEvent.click(confirmButton);
    const warningArticle = screen.getByText("필수 작성 항목입니다.");
    expect(warningArticle).toBeInTheDocument();
  });

  it("should receive valid input", () => {
    render(
      <Introduction
        introduction={"intro content"}
        setIntroduction={mockSetIntroduction}
        setStep={mockSetStep}
      />
    );

    const textArea = screen.getByPlaceholderText("소개글을 작성해주세요!");
    const confirmButton = screen.getByRole("button");

    fireEvent.change(textArea, { target: { value: "it is mocked so it will not be changed" } });
    fireEvent.click(confirmButton);

    expect(mockSetStep).toBeCalled();
    expect(mockSetIntroduction).toBeCalled();
  });
});
