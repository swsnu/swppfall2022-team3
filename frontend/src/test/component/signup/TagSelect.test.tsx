import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, within } from "@testing-library/react";
import TagSelect from "../../../component/signup/TagSelect";
import { tags } from "../../../dummyData";
import { getDefaultMockStore } from "../../../test-utils/mocks";
import { Tag } from "../../../types";


jest.mock("@mui/icons-material/AddCircle", () => () => <div>add</div>);

const mockTags = [tags[0]];
const mockSetTags = jest.fn();
const mockSetStep = jest.fn();

describe("TagSelect", () => {
  const mockStore = getDefaultMockStore(false);

  function getElement(tags: Tag[],) {
    return (
      <Provider store={mockStore}>
        <TagSelect
          tags={tags}
          setTags={mockSetTags}
          setStep={mockSetStep}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders CreateTag", () => {
    const { container } = render(getElement(mockTags));
    expect(container).toBeTruthy();
  });

  it("should not add tag when add button clicked with null tag", () => {
    render(getElement(mockTags));
    const addButton = screen.getByText("add");
    fireEvent.click(addButton);

    expect(mockSetTags).not.toHaveBeenCalled();
  });

  it("should add tag when click add button with proper tag", () => {
    render(getElement(mockTags));
    fireEvent.mouseDown(screen.getAllByRole("button")[0]);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("코딩"));
    const addButton = screen.getByText("add");
    fireEvent.click(addButton);
    expect(mockSetTags).toBeCalled();
  });

  it("shouldn't add tag when click add button  with existed tag", () => {
    render(getElement(mockTags));
    fireEvent.mouseDown(screen.getAllByRole("button")[0]);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("여행"));
    const addButton = screen.getByText("add");
    fireEvent.click(addButton);
  });

  it("should setStep when tag is not null", () => {
    render(getElement(mockTags));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).toBeCalled();
  });

  it("shouldn't setStep when tag is null", () => {
    render(getElement([]));
    const confirmButton = screen.getByText("다음");
    fireEvent.click(confirmButton);
    expect(mockSetStep).not.toBeCalled();
  });
});
