import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SignInModal from "../../../component/signup/SignInModal";


const mockSetModalOpen = jest.fn();

describe("InformationInput", () => {
  function getElement() {
    return (
      <SignInModal
        description={
          <p>
            test
          </p>
        }
        modalOpen={true}
        setModalOpen={mockSetModalOpen}
      />
    );
  }

  it("renders InformationInput", () => {
    render(getElement());
    const confirmButton = screen.getByRole("확인");
    fireEvent.click(confirmButton);
    expect(mockSetModalOpen).toBeCalled();
  });
});
