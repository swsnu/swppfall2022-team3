import React, { Dispatch, SetStateAction } from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import CollegeMajorEdit from "../../../component/profile-edit/CollegeMajorEdit";
import { getDefaultMockStore, getNoCollegeMajorMockStore } from "../../../test-utils/mocks";


const mockStore = getDefaultMockStore();
const mockSetSelectedCollegeKey = jest.fn();
const mockOnModalClose = jest.fn();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../../component/signup/InformationInput", () => (
  props: {
    options: { name: string; value: string | number }[];
    value: string | number;
    setValue: Dispatch<SetStateAction<string | number>>;
  }
) => (
  <select
    onChange={(e) => props.setValue(e.target.value)}
    value={props.value}
  >
    {
      props.options.map((o) => (
        <option
          key={o.value}
          value={o.value}
        >
          {o.name}
        </option>
      ))
    }
  </select>
));

describe("CollegeMajorEdt", () => {
  const getElement = () => (
    <Provider store={mockStore}>
      <CollegeMajorEdit
        onModalClose={mockOnModalClose}
        setSelectedCollegeKey={mockSetSelectedCollegeKey}
        selectedCollegeKey={1}
      />
    </Provider>
  );

  it("should be rendered", () => {
    render(getElement());
  });

  it("should handle cancel button onClick", () => {
    render(getElement());

    const cancelButton = screen.getByText("취소");

    fireEvent.click(cancelButton);

    expect(mockOnModalClose).toBeCalled();
  });

  it("should handle confirm button onClick", async () => {
    axios.put = jest.fn().mockResolvedValue({ status: 200 });


    render(getElement());

    const confirmButton = screen.getByText("정보 수정");

    fireEvent.click(confirmButton);

    expect(axios.put).toBeCalled();
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
    await waitFor(() => {
      expect(mockOnModalClose).toBeCalled();
    });
  });

  it("should do nothing when there is no login user", async () => {
    axios.put = jest.fn().mockResolvedValue({ status: 200 });


    render(
      <Provider store={getNoCollegeMajorMockStore()}>
        <CollegeMajorEdit
          onModalClose={mockOnModalClose}
          setSelectedCollegeKey={mockSetSelectedCollegeKey}
          selectedCollegeKey={1}
        />
      </Provider>
    );

    const confirmButton = screen.getByText("정보 수정");

    fireEvent.click(confirmButton);

    expect(axios.put).not.toBeCalled();
    await waitFor(() => {
      expect(mockDispatch).not.toBeCalled();
    });
    await waitFor(() => {
      expect(mockOnModalClose).not.toBeCalled();
    });
  });
});
