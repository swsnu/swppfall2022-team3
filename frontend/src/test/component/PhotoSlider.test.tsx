import React from "react";
import { render } from "@testing-library/react";
import PhotoSlider from "../../component/PhotoSlider";
import { users } from "../../dummyData";


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
