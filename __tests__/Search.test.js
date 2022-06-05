import { render, screen, waitFor } from "@testing-library/react";
import Search from "../pages/search";
import userEvent from "@testing-library/user-event";

const searchText = [
  { name: "The Batman" },
  { name: "Rocky" },
  { name: "Shooter" },
  { name: "Iron Man" },
];

describe("Test the default search title", () => {
  test("if title is there", () => {
    render(<Search />);

    const title = screen.getByText("Explore");
    expect(title).toBeInTheDocument();

    const searchBar = screen.getByTestId("search-input");
    expect(searchBar).toBeInTheDocument();
  });
});

describe("Type in search bar", () => {
  test.each("check if the search is displaying the correct text", async () => {
    render(<Search />);

    const searchBar = screen.getByTestId("search-input");
    const mainTitle = screen.getByText(
      `Search Results for: ${searchText.name}`
    );

    await waitFor(() => {
      userEvent.type(searchBar, searchText.name);
      expect(mainTitle).toHaveValue(searchText.name);
      const searchBarResults = screen.getByTestId("search-input");
      expect(searchBarResults).toHaveValue(searchText.name);
    });
  });
});
