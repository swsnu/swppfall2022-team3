import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import UserFilter from "../../component/UserFilter";
import { chatrooms, colleges, majors, tags, universities, users } from "../../dummyData";
import { getDefaultMockStore, getMockStore } from "../../test-utils/mocks";
import { Gender } from "../../types";


const mockStore = getDefaultMockStore();
const mockOnModalClose = jest.fn();
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("UserFilter", () => {
  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <UserFilter onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const applyButton = screen.getByText("적용");

    expect(applyButton).toBeInTheDocument();

    fireEvent.click(applyButton);

    expect(mockDispatch).toBeCalled();
    expect(mockOnModalClose).toBeCalled();
  });

  it("should render saved filter", () => {
    const mockStoreWithFilter =  getMockStore({
      university: { universities: universities },
      college: { colleges: colleges },
      major: { majors: majors },
      user: {
        loginUser: users[0],
        users: users,
        filter: {
          gender: Gender.FEMALE,
          minAge: 23,
          maxAge: 29,
          includedColleges: [1, 2],
          excludedColleges: [3, 4],
          includedMajors: [1, 2],
          excludedMajors: [3, 4],
          includedTags: [1, 2],
          excludedTags: [3, 4],
        },
        nextPageUrl: null,
        searchPageIndex: 1,
        interestingUser: users[3],
        pitapat: {
          senders: [users[1]],
          receivers: [users[2]],
        },
        blocked: [],
        chat: {
          participants: [],
        },
        pitapatListTabIndex: 0,
      },
      tag: { tags: tags },
      chat: {
        chatrooms,
        chatSockets: [],
      },
    });

    render(
      <Provider store={mockStoreWithFilter}>
        <UserFilter onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const applyButton = screen.getByText("적용");

    expect(applyButton).toBeInTheDocument();

    fireEvent.click(applyButton);

    expect(mockDispatch).toBeCalled();
    expect(mockOnModalClose).toBeCalled();
  });

  it("should handle exceptional cases", () => {
    const mockExceptionalStore = getMockStore({
      university: { universities: universities },
      college: { colleges: [] },
      major: { majors: [] },
      user: {
        loginUser: users[0],
        users: users,
        filter: {
          gender: Gender.FEMALE,
          minAge: 23,
          maxAge: 29,
          includedColleges: [-1, -2],
          excludedColleges: [-3, -4],
          includedMajors: [-1, -2],
          excludedMajors: [-3, -4],
          includedTags: [-1, -2],
          excludedTags: [-3, -4],
        },
        nextPageUrl: null,
        searchPageIndex: 1,
        interestingUser: users[3],
        pitapat: {
          senders: [users[1]],
          receivers: [users[2]],
        },
        blocked: [],
        chat: {
          participants: [],
        },
        pitapatListTabIndex: 0,
      },
      tag: { tags: [] },
      chat: {
        chatrooms,
        chatSockets: [],
      },
    });

    render(
      <Provider store={mockExceptionalStore}>
        <UserFilter onModalClose={mockOnModalClose}/>
      </Provider>
    );

    expect(mockDispatch).toBeCalled();
  });

  it("should do nothing when there is no login user", () => {
    render(
      <Provider store={getDefaultMockStore(false)}>
        <UserFilter onModalClose={mockOnModalClose}/>
      </Provider>
    );

    const applyButton = screen.getByText("적용");

    fireEvent.click(applyButton);

    expect(mockDispatch).not.toBeCalled();
  });
});
