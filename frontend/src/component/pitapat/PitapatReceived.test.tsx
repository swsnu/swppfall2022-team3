import React from "react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render, screen } from "@testing-library/react";
import { pitapats } from "../../dummyData";
import { getDefaultMockStore, getNoPhotoMockStore } from "../../test-utils/mocks";
import { Pitapat } from "../../types";
import PitapatReceived from "./PitapatReceived";


jest.mock(
  "../Profile",
  () => ({myKey, photo}: {myKey: number; photo: string}) => (
    <div data-testid="profile">
      <div data-testid="myKey">{myKey}</div>
      <div data-testid="photo">{photo}</div>
    </div>
  ),
);

describe("PitapatReceived", () => {
  function getElement(store: ToolkitStore, pitapats: Pitapat[]) {
    return (
      <Provider store={store}>
        <PitapatReceived pitapats={pitapats}/>
      </Provider>
    );
  }

  it("should be rendered", () => {
    render(getElement(getDefaultMockStore(true), pitapats));
    const profiles = screen.getAllByTestId("profile");
    profiles.forEach((profile) => {
      expect(profile).toBeInTheDocument();
    });
  });

  it("should not be rendered if pitapat sender does not exist", () => {
    render(getElement(getDefaultMockStore(true), [{ from: 20, to: 1 }]));
    expect(() => screen.getByTestId("profile")).toThrowError();
  });

  it("should deliver myKey as -1 if not logged in", () => {
    render(getElement(getDefaultMockStore(false), pitapats));
    const myKeys = screen.getAllByTestId("myKey");
    myKeys.forEach((myKey) => {
      expect(myKey).toContainHTML("-1");
    });
  });

  it("should deliver empty photo path if photo is not found", () => {
    render(getElement(getNoPhotoMockStore(), pitapats));
    const photos = screen.getAllByTestId("photo");
    photos.forEach((photo) => {
      expect(photo).toContainHTML("");
    });
  });
});
