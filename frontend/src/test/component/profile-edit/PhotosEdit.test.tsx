import React from "react";
import { Provider } from "react-redux";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import PhotosEdit from "../../../component/profile-edit/PhotosEdit";
import { IProps as PhotoProps } from "../../../component/signup/ImageUploadIcon";
import { getDefaultMockStore } from "../../../test-utils/mocks";


const mockStore = getDefaultMockStore();
const mockSetPhotoEdit = jest.fn();
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));
URL.createObjectURL = jest.fn().mockReturnValue("photo_src");
const mockFile = new File(["test"], "test.jpeg");
jest.mock("../../../component/signup/ImageUploadIcon", () => (props: PhotoProps) => (
  <div data-testid={"spyImageUploadIcon"}>
    {props.src}
    <button onClick={() => props.setIthPhoto(props.index, mockFile)}>
      {`${props.index}set`}
    </button>
    <button onClick={() => props.removeIthPhoto(props.index)}>
      {`${props.index}remove`}
    </button>
  </div>
));

describe("PhotosEdit", () => {
  it("should get user's photo from the server", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: [{ key: 1, name: "photo_example.jpg" }]
    });
    render(
      <Provider store={mockStore}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).toBeCalled();
    });

    expect(screen.getByText("photo_example.jpg")).toBeInTheDocument();
  });

  it("should handle when there is no login user", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 400,
    });
    axios.delete = jest.fn();
    render(
      <Provider store={getDefaultMockStore(false)}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).not.toBeCalled();
    });

    const confirmButton = screen.getByText("완료");
    fireEvent.click(confirmButton);


    expect(axios.delete).not.toBeCalled();
  });

  it("should handle exceptional cases when cannot get user's photo", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 400,
    });
    render(
      <Provider store={mockStore}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).toBeCalled();
    });

    expect(screen.getAllByTestId("spyImageUploadIcon").length).toBe(1);
  });
  it("should handle exceptional cases when user have too much photos", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: [
        { key: 1, name: "photo_example1.jpg" },
        { key: 2, name: "photo_example2.jpg" },
        { key: 3, name: "photo_example3.jpg" },
        { key: 4, name: "photo_example4.jpg" },
        { key: 5, name: "photo_example5.jpg" },
        { key: 6, name: "photo_example6.jpg" },
        { key: 7, name: "photo_example7.jpg" },
        { key: 8, name: "photo_example8.jpg" },
        { key: 9, name: "photo_example9.jpg" },
        { key: 10, name: "photo_example10.jpg" },
        { key: 11, name: "photo_example11.jpg" },
        { key: 12, name: "photo_example12.jpg" },
      ]
    });
    render(
      <Provider store={mockStore}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).toBeCalled();
    });
    expect(screen.getAllByTestId("spyImageUploadIcon").length).toBe(9);
  });

  it("should handle uploading photo", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: [{ key: 1, name: "photo_example.jpg" }]
    });
    render(
      <Provider store={mockStore}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).toBeCalled();
    });

    const photoSettingButton = screen.getByText("1set");
    fireEvent.click(photoSettingButton);
    expect(screen.getAllByTestId("spyImageUploadIcon").length).toBe(3);
  });

  it("should handle delete photo", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: [{ key: 1, name: "photo_example.jpg" }]
    });
    render(
      <Provider store={mockStore}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).toBeCalled();
    });

    const photoSettingButton1 = screen.getByText("1set");
    const photoDeleteButton1 = screen.getByText("1remove");
    fireEvent.click(photoSettingButton1);
    fireEvent.click(photoDeleteButton1);
    expect(screen.getAllByTestId("spyImageUploadIcon").length).toBe(2);

    const photoDeleteButton0 = screen.getByText("0remove");
    fireEvent.click(photoDeleteButton0);
    expect(screen.getAllByTestId("spyImageUploadIcon").length).toBe(1);
  });

  it("should handle confirm button onClick", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: [{ key: 1, name: "photo_example.jpg" }]
    });
    axios.post = jest.fn();
    axios.delete = jest.fn();
    render(
      <Provider store={mockStore}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).toBeCalled();
    });

    const photoDeleteButton0 = screen.getByText("0remove");
    const photoSettingButton1 = screen.getByText("1set");
    const confirmButton = screen.getByText("완료");

    fireEvent.click(photoSettingButton1);
    fireEvent.click(photoDeleteButton0);
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(axios.post).toBeCalled();
    });

    await waitFor(() => {
      expect(axios.delete).toBeCalled();
    });

    expect(mockDispatch).toBeCalled();
  });

  it("should handle back button onClick", async () => {
    axios.get = jest.fn().mockResolvedValue({
      status: 200,
      data: [{ key: 1, name: "photo_example.jpg" }]
    });
    render(
      <Provider store={mockStore}>
        <PhotosEdit setPhotoEdit={mockSetPhotoEdit}/>
      </Provider>
    );

    await act(async () => {
      await expect(axios.get).toBeCalled();
    });

    const backButton = screen.getByText("뒤로 가기");

    fireEvent.click(backButton);

    expect(mockSetPhotoEdit).toBeCalled();
  });
});
