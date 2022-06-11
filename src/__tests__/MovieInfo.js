import { render, screen } from "@testing-library/react";
import MovieInfo from "../Components/MovieInfo";
import { BrowserRouter as Router } from "react-router-dom";
import { movieInfo } from "../__mock__/mockFetch";

describe("test the MovieInfo component", () => {
  test("display the correct year, minutes, and genre", async () => {
    render(
      <Router>
        <MovieInfo movie={movieInfo} />
      </Router>
    );

    const year = screen.getByText("2022");
    const minutes = screen.getByText("147 minutes");
    const genre = screen.getByText("Action, Adventure, Science Fiction");

    expect(year).toBeInTheDocument();
    expect(minutes).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
  });
});
