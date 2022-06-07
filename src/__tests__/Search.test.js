import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "../Components/Search";
import userEvent from "@testing-library/user-event";

describe("Test the default search title", () => {
  const movies = [
    { name: "The Batman" },
    { name: "The Mask" },
    { name: "A.I." },
    { name: "Superman" },
  ];

  test.each(movies)(
    "check if the search is displaying the correct text",
    async (movie) => {
      render(
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      );

      const searchBar = screen.getByTestId("search-input");

      userEvent.type(searchBar, movie.name);
      await waitFor(() => {
        expect(
          screen.getByText(`Search Results for: ${movie.name}`)
        ).toBeInTheDocument();
      });

      await waitFor(() => {
        const searchBarResults = screen.getByTestId("search-input");
        expect(searchBarResults).toHaveValue(movie.name);
      });
    }
  );
});
