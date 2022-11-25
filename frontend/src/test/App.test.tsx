import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "../App";
import { getDefaultMockStore } from "../test-utils/mocks";


const mockStore = getDefaultMockStore();

jest.mock("../page/SignIn", () => () => <div/>);
jest.mock("../page/SignUp", () => () => <div/>);
jest.mock("../page/Search", () => () => <div/>);
jest.mock("../page/ProfileDetail", () => () => <div/>);
jest.mock("../page/ChatList", () => () => <div/>);
jest.mock("../page/ChatDetail", () => () => <div/>);
jest.mock("../page/PitapatList", () => () => <div/>);
jest.mock("../page/Setting", () => () => <div/>);
jest.mock("../page/ProfileEdit", () => () => <div/>);

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
