import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import EditButton from "../../../component/profile-edit/EditButton";
import { getDefaultMockStore } from "../../../test-utils/mocks";


const mockStore = getDefaultMockStore();
const mockSetOption = jest.fn();
jest.mock("@mui/icons-material/ModeEditOutlineOutlined", () => () => (<div data-testid={"mui-icon"}/>));

describe("EditButton", () => {
  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <EditButton setOption={mockSetOption}/>
      </Provider>
    );

    expect(screen.getByTestId("mui-icon")).toBeInTheDocument();
  });

  it("should handle onClick", () => {
    render(
      <Provider store={mockStore}>
        <EditButton setOption={mockSetOption}/>
      </Provider>
    );

    const editButton = screen.getByRole("button");

    fireEvent.click(editButton);

    expect(mockSetOption).toBeCalled();
  });
});
