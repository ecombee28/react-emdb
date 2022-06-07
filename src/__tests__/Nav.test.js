import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nav from "../Components/Nav";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

describe("testing the nav bar", function () {
  const links = [
    { text: "Home", location: "/" },
    { text: "Search", location: "/search" },
    { text: "Watch List", location: "/watchlist" },
    { text: "Sign In/Sign Up", location: "/login" },
  ];

  test.each(links)("Check if Nav Bar have %s link.", (link) => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    //Ensure the text is in the dom, will throw error it can't find
    const linkDom = screen.getByText(link.text);

    //use jest assertion to verify the link property
    expect(linkDom).toHaveAttribute("href", link.location);
  });
});

// const history = createMemoryHistory();

// render(
//   <BrowserRouter history={history}>
//     <Nav />
//   </BrowserRouter>
// );
