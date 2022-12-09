import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import ImageUpload from "../../../component/signup/ImageUpload";
import { IProps as PhotoProps } from "../../../component/signup/ImageUploadIcon";
import { getDefaultMockStore } from "../../../test-utils/mocks";


const mockSetUploadedPhotoes = jest.fn();
const mockSetStep = jest.fn();
URL.createObjectURL = jest.fn().mockReturnValue("photo_src");
const mockFile = new File(["test"], "test.jpeg");

jest.mock("../../../component/signup/ImageUploadIcon", () => (props: PhotoProps) => (
  <div data-testid="spyImageUploadIcon">
    {props.src}
    <button onClick={() => props.setIthPhoto(props.index, mockFile)}>
      {`${props.index}set`}
    </button>
    <button onClick={() => props.removeIthPhoto(props.index)}>
      {`${props.index}remove`}
    </button>
  </div>
));

describe("ImageUpload", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement() {
    return (
      <Provider store={mockStore}>
        <ImageUpload
          setUploadedPhotos={mockSetUploadedPhotoes}
          setStep={mockSetStep}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ImageUpload", () => {
    const { container } = render(getElement());
    expect(container).toBeTruthy();
  });

  it("should set IthPhoto", () => {
    render(getElement());
    const set0thPhotoButton = screen.getByText("0set");
    fireEvent.click(set0thPhotoButton);

    const remove1thPhotoButton = screen.getByText("1remove");
    fireEvent.click(remove1thPhotoButton);
  });

  it("should remove IthPhoto", () => {
    render(getElement());
    const setIthPhotoButton = screen.getByText("0set");
    fireEvent.click(setIthPhotoButton);

    const remove1thPhotoButton = screen.getByText("1remove");
    fireEvent.click(remove1thPhotoButton);
    const remove0thPhotoButton = screen.getByText("0remove");
    fireEvent.click(remove0thPhotoButton);
  });

  it("should setStep", () => {
    render(getElement());
    const set0thPhotoButton = screen.getByText("0set");
    fireEvent.click(set0thPhotoButton);

    const confirmButton = screen.getByText("완료");
    fireEvent.click(confirmButton);
    expect(mockSetUploadedPhotoes).toBeCalled();
    expect(mockSetStep).toBeCalled();
  });

  it("should be move to the previous step when clicked back button", () => {
    render(getElement());
    const backmButton = screen.getByText("뒤로 가기");
    fireEvent.click(backmButton);
    expect(mockSetStep).toBeCalled();
  });
});
