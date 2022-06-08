import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Watchlist from "../Components/Watchlist";

describe("testing Watch list", () => {
  test("check if the Sign In link has the correct path", () => {
    render(
      <BrowserRouter>
        <Watchlist />
      </BrowserRouter>
    );

    const linkDom = screen.getByText("Sign In");
    expect(linkDom).toHaveAttribute("href", "/login");
  });
});
