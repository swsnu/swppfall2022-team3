import * as React from "react";
import { Provider } from "react-redux";
import {MemoryRouter, Route, Routes} from "react-router";
import {fireEvent, render, screen} from "@testing-library/react";
import { getDefaultMockStore } from "../test-utils/mocks";
import { PitapatStatus } from "../types";
import Profile from "./Profile";


interface IProps {
  myKey: number;
  userKey: number;
  username: string;
  koreanAge: number;
  photo: string;
  showRejectButton: boolean;
  isLastElement: boolean;
  status: PitapatStatus;
}

const mockIProps: IProps = {
  myKey: 1,
  userKey: 2,
  username: "test_name",
  koreanAge: 20,
  photo: "/photo1.jpeg",
  showRejectButton: false,
  isLastElement: false,
  status: PitapatStatus.MATCHED
};

const mockIPropsLastAndReject: IProps = {
  myKey: 1,
  userKey: 2,
  username: "test_name",
  koreanAge: 20,
  photo: "/photo1.jpeg",
  showRejectButton: true,
  isLastElement: true,
  status: PitapatStatus.MATCHED
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
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Profile
              {...props}
            />}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without error(no reject button & not last element) and should navigate", () => {
    const { container } = render(getElement(mockIProps));
    expect(container).toBeTruthy();
    const profilePicture = document.getElementsByClassName("w-full z-0");
    fireEvent.click(profilePicture[0]);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should render without error(reject button & last element)", () => {
    const { container } = render(getElement(mockIPropsLastAndReject));
    expect(container).toBeTruthy();
  });
});
