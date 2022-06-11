import { render, screen } from "@testing-library/react";
import TitleComponent from "../Components/TitleComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { movieInfo } from "../__mock__/mockFetch";
import userEvent from "@testing-library/user-event";

describe("test the TitleComponent", () => {
  test("title name and trailer button", async () => {
    const setShowTrailer = jest.fn();

    render(
      <Router>
        <TitleComponent
          movie={movieInfo}
          name={"Jurassic World Dominion"}
          count={0}
          showTrailer={false}
          setShowTrailer={setShowTrailer}
        />
      </Router>
    );

    const title = screen.getByText("Jurassic World Dominion");
    const button = screen.getByRole("button", { name: "Trailer" });

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(setShowTrailer).toHaveBeenCalledTimes(1);
  });
});
