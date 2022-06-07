import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "../Components/Search";
import userEvent from "@testing-library/user-event";

describe("Test the default search title", () => {
  test("if title and search bar is there", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const title = screen.getByText("Explore");
    expect(title).toBeInTheDocument();

    const searchBar = screen.getByTestId("search-input");
    expect(searchBar).toBeInTheDocument();
  });

  test("check if the search is displaying the correct text", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const searchBar = screen.getByTestId("search-input");

    userEvent.type(searchBar, "The Batman");
    await waitFor(() => {
      expect(
        screen.getByText("Search Results for: The Batman")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      const searchBarResults = screen.getByTestId("search-input");
      expect(searchBarResults).toHaveValue("The Batman");
    });
  });
});
