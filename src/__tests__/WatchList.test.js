import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Watchlist from "../pages/watchlist";
import userEvent from "@testing-library/user-event";

describe("testing watch list", () => {
  test("has the correct text if the user is not signed on", async () => {
    render(<Watchlist />);

    await waitFor(() => {
      const text = screen.getByText(
        "You have to be signed in to see your WatchList."
      );
      expect(text).toBeInTheDocument();
    });
  });

  test("if clicking on Sign in takes to user to the sign page", async () => {
    render(<Watchlist />);

    await waitFor(() => {
      const signInBtn = screen.getByTestId("signin-btn");
      userEvent.click(signInBtn);
    });
  });
});
