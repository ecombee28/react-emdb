import { render, screen } from "@testing-library/react";
import Trailer from "../Components/Trailer";
import { BrowserRouter as Router } from "react-router-dom";
import { trailerObj } from "../__mock__/mockFetch";

describe("test the trailer component", () => {
  const setShowTrailer = jest.fn();
  test("should display the trailer", () => {
    render(
      <Router>
        <Trailer
          trailer={trailerObj}
          showTrailer={true}
          setShowTrailer={setShowTrailer}
        />
      </Router>
    );

    const iframe = screen.getByTitle("trailer");
    expect(iframe).toBeInTheDocument();
  });

  test("the correct url", () => {
    render(
      <Router>
        <Trailer
          trailer={trailerObj}
          showTrailer={true}
          setShowTrailer={setShowTrailer}
        />
      </Router>
    );

    const iframe = screen.getByTitle("trailer");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/oMzCG2Xa7rY"
    );
  });
});
