import React from "react";
import { render } from "@testing-library/react";
import TagElement from "../../../component/signup/TagElement";


const mockOnDelete = jest.fn();

describe("TagElement", () => {
  function getElement(
    name: string,
    included?: boolean,
  ){
    return (
      <TagElement
        name={name}
        included={included}
        onDelete={mockOnDelete}
      />
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be rendered", () => {
    const { container } = render(getElement(""));
    expect(container).toBeTruthy();
  });

  it("should be rendered when included is true", () => {
    const { container } = render(getElement("a", true));
    expect(container).toBeTruthy();
  });

  it("should be rendered when included is false", () => {
    const { container } = render(getElement("a", false));
    expect(container).toBeTruthy();
  });

  it("should be rendered when onDelete is null", () => {
    const { container } = render(
      <TagElement
        name={"a"}
        onDelete={null}
      />
    );
    expect(container).toBeTruthy();
  });
});
