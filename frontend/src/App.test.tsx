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

jest.mock(
  "./page/SignIn",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/SignUp",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/Search",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/ProfileDetail",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/ChatList",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/ChatDetail",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/PitapatList",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/Setting",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

jest.mock(
  "./page/ProfileUpdate",
  // eslint-disable-next-line react/display-name
  () => () => <div></div>,
);

test("renders App", () => {
  const { container } = render(
    <Provider store={mockStore}>
      <App/>
    </Provider>
  );
  expect(container).toBeTruthy();
});
