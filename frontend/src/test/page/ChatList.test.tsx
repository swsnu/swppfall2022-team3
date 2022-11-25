import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render, screen } from "@testing-library/react";
import ChatList from "../../page/ChatList";
import { getDefaultMockStore } from "../../test-utils/mocks";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../component/AppBar", () => () => <div></div>);
jest.mock("../../component/NavigationBar", () => () => <div></div>);
jest.mock("../../component/ChatListElement", () => () => <div>element</div>);

describe("ChatList", () => {
  function getElement(store: ToolkitStore) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<ChatList />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }


  it("should be rendered", () => {
    render(getElement(getDefaultMockStore()));
    const elements = screen.getAllByText("element");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("should redirect if there is no login user", async () => {
    render(getElement(getDefaultMockStore(false)));
  });
});
