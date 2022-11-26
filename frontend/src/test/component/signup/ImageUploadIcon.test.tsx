/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import ImageUploadIcon from "../../../component/signup/ImageUploadIcon";
import { getDefaultMockStore } from "../../../test-utils/mocks";


URL.createObjectURL = jest.fn().mockReturnValue("photo_src");
const mockPhotos = [new File([""], "a.jpeg")];

describe("ImageUploadIcon", () => {
  const mockStore = getDefaultMockStore(false);

  function getElement() {
    return (
      <Provider store={mockStore}>
        <ImageUploadIcon
          index={0}
          src={"plus.jpeg"}
          setIthPhoto={() => {}}
          removeIthPhoto={() => {}}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ImageUploadIcon", () => {
    const { container } = render(getElement());
    expect(container).toBeTruthy();
  });


  it("should set photo when file is uploaded", () => {
    render(getElement());
    const file = screen.getByPlaceholderText("photo");
    fireEvent.change(file, { target: { files: mockPhotos } });
  });

  it("shouldn't set photo when file is not uploaded", () => {
    render(getElement());
    const file = screen.getByPlaceholderText("photo");
    fireEvent.change(file, { target: { files: null } });
  });

  it("should change Ref", () => {
    render(getElement());
    const imageButton = screen.getByRole("button");
    fireEvent.click(imageButton);
  });

});
