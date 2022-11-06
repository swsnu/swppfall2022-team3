import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
import App from "./App";
// import { getMockStore } from "./test-utils/mocks";


// const mockStore = getMockStore({});

test("renders App", () => {
  const { container } = render(
    // <Provider store={mockStore}>
      <App />
    // </Provider>
  );
  expect(container).toBeTruthy();
});
