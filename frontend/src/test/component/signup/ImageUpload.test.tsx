import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import ImageUpload from "../../../component/signup/ImageUpload";
import { getDefaultMockStore } from "../../../test-utils/mocks";


interface IProps {
  src: string;
  disabled: boolean;
  uploadedPhotos: File[];
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>;
}

const mockSetUploadedPhotose = jest.fn();
const mockSetStep = jest.fn();

jest.mock("../../../component/signup/ImageUploadIcon", () => (props: IProps) => (
  <div data-testid="spyImageUploadIcon">
    {props.src}
  </div>
));

describe("ImageUpload", () => {
  const mockStore = getDefaultMockStore(true);

  function getElement() {
    return (
      <Provider store={mockStore}>
        <ImageUpload
          setUploadedPhotos={mockSetUploadedPhotose}
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



  it("should setStep", () => {
    render(getElement());
    const confirmButton = screen.getByText("완료");
    fireEvent.click(confirmButton);
    expect(mockSetStep).toBeCalled();
  });

});
