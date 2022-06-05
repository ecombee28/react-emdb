import { render, screen } from "@testing-library/react";
import Nav from "../components/Nav";

// include as many test cases as you want here
const links = [
  { text: "Home", location: "/" },
  { text: "Search", location: "/search" },
  { text: "Watch List", location: "/watchlist" },
  { text: "Sign In/Sign Up", location: "/login" },
];

describe("testing to nav bar", () => {
  it("has all the links in the nav bar", () => {
    render(<Nav />);

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  test.each(links)("each link name is correct", (link) => {
    render(<Nav />);

    const linkName = screen.getByText(link.text);
    expect(linkName).toBeInTheDocument();
  });

  // test.each(links)("each link has the correct href", (link) => {
  //   render(<Nav />);

  //   const linkName = screen.getByText(link.text);
  //   expect(linkName).toHaveAttribute("href", link.location);
  // });
});
