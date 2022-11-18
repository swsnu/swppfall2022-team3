import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { colleges } from "../../dummyData";
import { College } from "../../types";
import InformationInput from "./InformationInput";


const mockSetValue = jest.fn();

describe("InformationInput", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders InformationInput", () => {
    render(
      <InformationInput
        label={""}
        value={""}
        setValue={mockSetValue}
        type={"select"}
      />
    );
  });


  it("should change value when type is select", () => {
    render(
      <InformationInput
        label={"test"}
        value={"test"}
        setValue={mockSetValue}
        type={"select"}
        options={
          ([{ key: 0, name: "" }] as College[])
            .concat(colleges)
            .map((col) => ({ name: col.name, value: col.key }))
        }
      />
    );

    fireEvent.mouseDown(screen.getByRole("button"));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("공과대학"));
    expect(mockSetValue).toBeCalled();
  });

  it("should change value when type is date", () => {
    render(
      <InformationInput
        label={"test"}
        value={new Date()}
        setValue={mockSetValue}
        type={"date"}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), { target: { value: new Date() } });
  });
});
