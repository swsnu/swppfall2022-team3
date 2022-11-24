import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render, screen } from "@testing-library/react";
import PitapatReceived from "../../../component/pitapat/PitapatReceived";
import { IProps } from "../../../component/Profile";
import { getDefaultMockStore } from "../../../test-utils/mocks";


jest.mock(
  "../../../component/Profile",
  () => (props: IProps) => (
    <div data-testid="profile">
    </div>
  ),
);

describe("PitapatReceived", () => {
  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <PitapatReceived/>
      </Provider>
    );
  }

  it("should be rendered", () => {
    render(getElement(getDefaultMockStore(true)));
    const profiles = screen.getAllByTestId("profile");
    profiles.forEach((profile) => {
      expect(profile).toBeInTheDocument();
    });
  });

  it("should not be rendered if pitapat sender does not exist", () => {
    render(getElement(getDefaultMockStore(false)));
    expect(() => screen.getByTestId("profile")).toThrowError();
  });
});
