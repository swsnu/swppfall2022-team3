import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Profile, { IProps } from "../../component/Profile";
import { users } from "../../dummyData";
import { getDefaultMockStore } from "../../test-utils/mocks";


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
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Profile", () => {
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

  it("should render without error(no reject button & not last element) and should navigate", async () => {
    const { container } = render(getElement(mockIProps));
    expect(container).toBeTruthy();
    const profilePictures = screen.getAllByRole("img");
    profilePictures.forEach((picture) => {
      fireEvent.click(picture);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(profilePictures.length);
    })

  });

  it("should render without error(reject button & last element)", () => {
    const { container } = render(getElement(mockIPropsLastAndReject));
    expect(container).toBeTruthy();
  });
});
