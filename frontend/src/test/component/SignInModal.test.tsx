import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SignInModal from "../../component/SignInModal";


const mockSetModalOpen = jest.fn();

describe("SignInModal", () => {
  function getElement() {
    return (
      <SignInModal
        description={"test"}
        modalOpen={true}
        setModalOpen={mockSetModalOpen}
      />
    );
  }

  it("renders InformationInput", () => {
    render(getElement());
    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);
    expect(mockSetModalOpen).toBeCalled();
  });
});
