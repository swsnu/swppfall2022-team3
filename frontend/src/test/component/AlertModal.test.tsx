import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AlertModal from "../../component/AlertModal";


const mockSetModalOpen = jest.fn();

describe("AlertModal", () => {
  function getElement() {
    return (
      <AlertModal
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
