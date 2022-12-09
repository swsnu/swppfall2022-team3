import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { IProps as TagProps } from "../../../component/signup/TagElement";
import TagSelect from "../../../component/signup/TagSelect";
import { tags } from "../../../dummyData";
import { getDefaultMockStore } from "../../../test-utils/mocks";
import { Tag } from "../../../types";


jest.mock("@mui/icons-material/AddCircle", () => () => <div>add</div>);

const mockTags = [tags[0]];
const mockSetTags = jest.fn();
const mockSetStep = jest.fn();

jest.mock("../../../component/signup/TagElement", () => (props: TagProps) => (
  <div data-testid="spyTagElement">
    <button onClick={() => {
      if(props.onDelete){
        props.onDelete();
      }
    }}>
      delete
    </button>
  </div>
));

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

  it("should delete tag when delete button clicked", () => {
    render(getElement(mockTags));
    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);
    expect(mockSetTags).toBeCalled();
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

  it("should be move to the previous step when clicked back button", () => {
    render(getElement([]));
    const backmButton = screen.getByText("뒤로 가기");
    fireEvent.click(backmButton);
    expect(mockSetStep).toBeCalled();
  });
});
