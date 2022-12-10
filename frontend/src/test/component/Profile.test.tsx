import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Profile from "../../component/Profile";
import { users } from "../../dummyData";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockStore = getDefaultMockStore();
const logoutMockStore = getDefaultMockStore(false);

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  Navigate: () => <div>navigate</div>,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../../component/PitapatButton", () => () => <div>pitapat</div>);

describe("Profile", () => {
  function getComponent(login: boolean, reject=false, last=true) {
    return (
      <Provider store={login ? mockStore : logoutMockStore}>
        <Profile
          user={users[2]}
          showRejectButton={reject}
          isLastElement={last}
        />
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    const { container } = render(getComponent(true));
    expect(container).toBeTruthy();
  });

  it("should navigate to user detail page when clicked", async () => {
    render(getComponent(true));
    const profileButton = screen.getByRole("button");
    fireEvent.click(profileButton);
    await waitFor(() => {
      expect(mockNavigate).toBeCalled();
    });
  });

  it("should show 2 PitapatButton when showRejectButton is true", () => {
    render(getComponent(true, true));
    const reject = screen.getAllByText("pitapat");
    expect(reject.length).toBe(2);
  });

  it("should have margin in not last profile element", () => {
    render(getComponent(true, false, false));
    const profile = screen.getByTestId("profile");
    expect(profile).toHaveClass("mb-2");
  });

  it("should navigate to signin page when not logged in", () => {
    render(getComponent(false));
    const navigate = screen.getByText("navigate");
    expect(navigate).toBeInTheDocument();
  });
});
