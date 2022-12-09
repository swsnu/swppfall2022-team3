import React, { ChangeEventHandler } from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TagsEdit from "../../../component/profile-edit/TagsEdit";
import { getDefaultMockStore, getNoTagMockStore } from "../../../test-utils/mocks";


window.alert = jest.fn();
const mockStore = getDefaultMockStore();
const mockOnModalClose = jest.fn();
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock(
  "@mui/material",
  () => ({
    MenuItem: ({ value, key }: { value: (string | number); key: (string | number) }) => <option key={key} value={value}/>,
    Select: ({ value, onChange }: { value: number; onChange: ChangeEventHandler<HTMLSelectElement> }) => (
      <select
        value={value}
        onChange={onChange}
      />
    ),
    FormControl: () => (<div/>),
    InputLabel: () => (<div/>),
  })
);

describe("TagsEdit", () => {
  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <TagsEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const confirmButton = screen.getByText("정보 수정");
    const cancelButton = screen.getByText("취소");

    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("should handle confirm button onClick and adding tag", async () => {
    axios.post = jest.fn().mockResolvedValue(() => ({ status: 200 }));
    axios.delete = jest.fn().mockResolvedValue(() => ({ status: 200 }));

    render(
      <Provider store={mockStore}>
        <TagsEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const confirmButton = screen.getByText("정보 수정");

    fireEvent.click(confirmButton);
    expect(window.alert).toBeCalled();

    const buttons = screen.getAllByRole("button");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const addTagButton = buttons.find((button) => button.className.includes("add-tag-button"))!;

    fireEvent.click(addTagButton);
    fireEvent.click(addTagButton);
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(axios.post).toBeCalled();
    });
    await waitFor(() => {
      expect(axios.delete).toBeCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
    await waitFor(() => {
      expect(mockOnModalClose).toBeCalled();
    });
  });

  it("should handle cancel button onClick", () => {
    render(
      <Provider store={mockStore}>
        <TagsEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const cancelButton = screen.getByText("취소");

    fireEvent.click(cancelButton);
    expect(mockOnModalClose).toBeCalled();
  });

  it("should handle delete tag", () => {
    render(
      <Provider store={mockStore}>
        <TagsEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const addTagButton = buttons.find((button) => button.className.includes("add-tag-button"))!;

    fireEvent.click(addTagButton);

    const addedButtons = screen.getAllByRole("button").filter((b) => buttons.indexOf(b) < 0);
    expect(addedButtons.length).toBeGreaterThan(0);
    const tagDeleteButton = screen.getAllByRole("button").filter((b) => buttons.indexOf(b) < 0)[0];

    fireEvent.click(tagDeleteButton);

    expect(buttons).toEqual(screen.getAllByRole("button"));
  });

  it("should do nothing when there is an exceptional cases, such as no tag or no login user", () => {
    render(
      <Provider store={getNoTagMockStore()}>
        <TagsEdit onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const addTagButton = buttons.find((button) => button.className.includes("add-tag-button"))!;
    const confirmButton = screen.getByText("정보 수정");

    fireEvent.click(addTagButton);
    fireEvent.click(addTagButton);

    const addedButtons = screen.getAllByRole("button").filter((b) => buttons.indexOf(b) < 0);
    expect(addedButtons.length).toBe(0);

    fireEvent.click(confirmButton);
    expect(mockDispatch).not.toBeCalled();
  });
});
