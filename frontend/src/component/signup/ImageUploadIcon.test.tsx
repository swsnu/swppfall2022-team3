import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { getDefaultMockStore } from "../../test-utils/mocks";
import ImageUploadIcon from "./ImageUploadIcon";


const mockSetUploadedPhotose = jest.fn();
const mockPhotos = [new File([""], "a.jpeg")];

describe("ImageUploadIcon", () => {
  const mockStore = getDefaultMockStore(false);

  function getElement(disabled: boolean) {
    return (
      <Provider store={mockStore}>
        <ImageUploadIcon
          src={"plus.jpeg"}
          disabled={disabled}
          uploadedPhotos={[]}
          setUploadedPhotos={mockSetUploadedPhotose}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ImageUploadIcon", () => {
    const { container } = render(getElement(false));
    expect(container).toBeTruthy();
  });


  it("should set photo when file is uploaded", () => {
    render(getElement(false));
    const file = screen.getByPlaceholderText("photo");
    fireEvent.change(file, { target: { files: mockPhotos } });
  });

  it("shouldn't set photo when file is not uploaded", () => {
    render(getElement(false));
    const file = screen.getByPlaceholderText("photo");
    fireEvent.change(file, { target: { files: null } });
  });

  it("should change Ref", () => {
    render(getElement(false));
    const imageButton = screen.getByRole("button");
    fireEvent.click(imageButton);
  });

});