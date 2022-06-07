import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nav from "../Components/Nav";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

describe("testing the nav bar", function () {
  afterEach(cleanup);
  test("testing each link to make sure that the pathname is correct", function () {
    const history = createMemoryHistory();

    render(
      <BrowserRouter history={history}>
        <Nav />
      </BrowserRouter>
    );
    userEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(history.location.pathname).toEqual("/");
  });
});
