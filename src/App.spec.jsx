import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

jest.mock("./Login", () => ({ HomeWithConnect: () => <div>Home content</div> }));
jest.mock("./Map", () => ({ Map: () => <div>Map content</div> }));
jest.mock("./Profile", () => ({
  ProfileWithConnect: () => <div>Profile content</div>,
}));

describe("App", () => {
  it("renders correctly", () => {
    const mockStore = {
      getState: () => {},
      subscribe: () => {},
      dispatch: () => {},
    };
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <App />
        </Provider>
      </Router>
    );
    expect(container.innerHTML).toMatch("Home content");
  });

  describe("when clicked on navigation buttons", () => {
    it("opens the corresponding page", () => {
      const mockStore = {
        getState: () => ({ auth: { isLoggedIn: true } }),
        subscribe: () => {},
        dispatch: () => {},
      };
      const history = createMemoryHistory();
      const { container, getByText } = render(
        <Router history={history}>
          <Provider store={mockStore}>
            <App />
          </Provider>
        </Router>
      );
      expect(container.innerHTML).toMatch("Home content");
      fireEvent.click(getByText("Map"));
      expect(container.innerHTML).toMatch("Map content");
      fireEvent.click(getByText("Profile"));
      expect(container.innerHTML).toMatch("Profile content");
    });
  });
});
