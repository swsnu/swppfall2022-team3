import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import InformationInput from "../../../component/signup/InformationInput";
import { colleges } from "../../../dummyData";
import { College } from "../../../types";


const mockSetValue = jest.fn();

describe("InformationInput", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const textInformationInput = (
    <InformationInput
      label={""}
      value={""}
      setValue={mockSetValue}
      type={"text"}
      required={true}
    />
  );
  const selectInformationInput = (
    <InformationInput
      label={"test"}
      value={"test"}
      setValue={mockSetValue}
      type={"select"}
      required={true}
      options={
        ([{ key: 0, name: "" }] as College[])
          .concat(colleges)
          .map((col) => ({ name: col.name, value: col.key }))
      }
    />
  );
  const dateInformationInput = (
    <InformationInput
      label={"test"}
      value={new Date()}
      setValue={mockSetValue}
      type={"date"}
      required={true}
    />
  );

  it("should render and handle onChange when the type is text", () => {
    render(textInformationInput);

    const userInput = "user's input";
    fireEvent.change(screen.getByRole("textbox"), { target: { value: userInput } });
  });


  it("should render and handle onChange when the type is select", () => {
    render(selectInformationInput);

    fireEvent.mouseDown(screen.getByRole("button"));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("공과대학"));
    expect(mockSetValue).toBeCalled();
  });

  it("should render and handle onChange when the type is date", () => {
    render(dateInformationInput);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: new Date("2020/10/11") } });
  });
});
