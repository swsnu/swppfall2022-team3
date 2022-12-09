import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserFilterElement from "../../component/UserFilterElement";
import { Tag } from "../../types";


jest.mock("@mui/icons-material", () => ({
  ...jest.requireActual("@mui/icons-material"),
  AddCircle: () => <div/>,
  RemoveCircle: () => <div/>,
}));

jest.mock("../../component/signup/InformationInput", () =>
  (props: {options: Tag[]}) =>
    <div>{props.options.map((tag) => <div key={tag.key}>{tag.name}</div>)}</div>
);
jest.mock("../../component/signup/TagElement", () =>
  (props: {onDelete: () => void}) =>
    <button onClick={props.onDelete}>delete</button>
);

describe("UserFilterElement", () => {
  const mockSetValue = jest.fn();
  const mockSetIncludedValues = jest.fn();
  const mockSetExcludedValues = jest.fn();

  function getComponent(value: number | "", values: Tag[], includedValues: Tag[], excludedValues: Tag[]) {
    return (
      <UserFilterElement<Tag>
        title={"title"}
        value={value}
        values={values}
        includedValues={includedValues}
        excludedValues={excludedValues}
        setValue={mockSetValue}
        setIncludedValues={mockSetIncludedValues}
        setExcludedValues={mockSetExcludedValues}
      />
    );
  }

  it("should be rendered", () => {
    const { container } = render(getComponent("", [], [], []));
    expect(container).toBeTruthy();
  });

  it("should add to includedValues when clicks plus button", () => {
    render(getComponent(1, [], [], []));
    const plusButton = screen.getByTestId("plus");
    fireEvent.click(plusButton);
    expect(mockSetIncludedValues).toBeCalled();
  });

  it("should add to excludedValues when clicks minus button", () => {
    render(getComponent(1, [], [], []));
    const minusButton = screen.getByTestId("minus");
    fireEvent.click(minusButton);
    expect(mockSetExcludedValues).toBeCalled();
  });

  it("should delete in includedValues when clicks delete button", () => {
    render(getComponent(1, [], [{ key: 1, name: "test", type: "test" }], []));
    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);
    expect(mockSetIncludedValues).toBeCalled();
  });

  it("should delete in excludedValues when clicks delete button", () => {
    render(getComponent(1, [], [], [{ key: 1, name: "test", type: "test" }]));
    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);
    expect(mockSetExcludedValues).toBeCalled();
  });

  it("should deliver values to InformationInput", () => {
    render(getComponent(1, [{ key: 1, name: "test", type: "test" }], [], []));
    const tag = screen.getByText("test");
    expect(tag).toBeInTheDocument();
  });
});
