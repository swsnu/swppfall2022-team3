import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { users } from "../dummyData";
import { getDefaultMockStore } from "../test-utils/mocks";
import ChatList from "./ChatList";


const mockStore = getDefaultMockStore();
const mockStoreNoLoginUser = getDefaultMockStore(false);

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ChatList", () => {
  const user2 = users[1];
  const user3 = users[2];

  it("should be rendered", () => {
    render(
      <Provider store={mockStore}>
        <ChatList/>
      </Provider>
    );

    const user2NameArticle = screen.getByText(user2.username);
    const user3NameArticle = screen.getByText(user3.username);

    expect(user2NameArticle).toBeInTheDocument();
    expect(user3NameArticle).toBeInTheDocument();
  })

  it("should not render chat rooms if there is no login user and redirect to other page", () => {
    render(
      <Provider store={mockStoreNoLoginUser}>
        <ChatList/>
      </Provider>
    );

    expect(mockNavigate).toBeCalled();
    expect(() => { screen.getByRole("img")}).toThrowError();
  })
})
