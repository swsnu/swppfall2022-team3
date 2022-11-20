import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import Profile, { IProps } from "./Profile";


const mockIProps: IProps = {
  user: users[2],
  showRejectButton: false,
  isLastElement: false,
};

const mockIPropsLastAndReject: IProps = {
  ...mockIProps,
  showRejectButton: true,
  isLastElement: true,
};

const mockStore = getDefaultMockStore();
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<Profile />", () => {
  function getElement(props: IProps) {
    return (
      <Provider store={mockStore}>
        <Profile
          {...props}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without error(no reject button & not last element) and should navigate", () => {
    const { container } = render(getElement(mockIProps));
    expect(container).toBeTruthy();
    const profilePictures = screen.getAllByRole("img");
    profilePictures.forEach((picture) => {
      fireEvent.click(picture);
    });
    expect(mockNavigate).toHaveBeenCalledTimes(profilePictures.length);
  });

  it("should render without error(reject button & last element)", () => {
    const { container } = render(getElement(mockIPropsLastAndReject));
    expect(container).toBeTruthy();
  });
});
