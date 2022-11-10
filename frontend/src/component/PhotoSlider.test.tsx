import * as React from "react";
import { render } from "@testing-library/react";
import { photos, users } from "../dummyData";
import PhotoSlider from "./PhotoSlider";


jest.mock("react-slick", () => () => <div></div>);


describe("PhotoSlider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders PhotoSlider", () => {
    const { container } = render(
      <PhotoSlider user={users[0]} photos={photos}/>
    );
    expect(container).toBeTruthy();
  });
});
