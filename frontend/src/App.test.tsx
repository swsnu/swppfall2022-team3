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
  user: { users: users, loginUser: users[0] },
  photo: { photos: photos },
  tag: { tags: tags },
  pitapat: { pitapats: pitapats },
  chat: { chats: chats },
});

// eslint-disable-next-line react/display-name
const mockElement = () => () => <div></div>;

jest.mock("./page/SignIn", mockElement);
jest.mock("./page/SignUp", mockElement);
jest.mock("./page/Search", mockElement);
jest.mock("./page/ProfileDetail", mockElement);
jest.mock("./page/ChatList", mockElement);
jest.mock("./page/ChatDetail", mockElement);
jest.mock("./page/PitapatList", mockElement);
jest.mock("./page/Setting", mockElement);
jest.mock("./page/ProfileUpdate", mockElement);

test("renders App", () => {
  const { container } = render(
    <Provider store={mockStore}>
      <App/>
    </Provider>
  );
  expect(container).toBeTruthy();
});
