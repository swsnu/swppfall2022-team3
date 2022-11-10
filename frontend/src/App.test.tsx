import * as React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";
import { chats, colleges, majors, photos, pitapats, tags, universities, users } from "./dummyData";
import { getMockStore } from "./test-utils/mocks";


const mockStore = getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: { users: users, loginUser: null },
  photo: { photos: photos },
  tag: { tags: tags },
  pitapat: { pitapats: pitapats },
  chat: { chats: chats },
});

jest.mock("./page/SignIn", () => () => <div></div>);
jest.mock("./page/SignUp", () => () => <div></div>);
jest.mock("./page/Search", () => () => <div></div>);
jest.mock("./page/ProfileDetail", () => () => <div></div>);
jest.mock("./page/ChatList", () => () => <div></div>);
jest.mock("./page/ChatDetail", () => () => <div></div>);
jest.mock("./page/PitapatList", () => () => <div></div>);
jest.mock("./page/Setting", () => () => <div></div>);
jest.mock("./page/ProfileEdit", () => () => <div></div>);

describe("App", () => {
  it("renders App", () => {
    const { container } = render(
      <Provider store={mockStore}>
        <App/>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});
