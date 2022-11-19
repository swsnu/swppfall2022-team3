import React from "react";
import { render } from "@testing-library/react";
import { photos, users } from "../dummyData";
import PhotoSlider from "./PhotoSlider";


jest.mock("react-slick", () => () => <div/>);

describe("PhotoSlider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders PhotoSlider", () => {
    const { container } = render(
      <PhotoSlider user={users[0]}/>
    );
    expect(container).toBeTruthy();
  });
});
