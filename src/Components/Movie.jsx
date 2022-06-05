import React, { useEffect, useState } from "react";
import { getGenre, getYear } from "../test";
import { getMovieDetails } from "../utils/api";
import { useParams } from "react-router-dom";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = useParams().movieId;

  useEffect(() => {
    const callMovies = async () => {
      const movieData = await getMovieDetails({ id });
      await setMovies(movieData);
      setLoading(false);
    };
    callMovies();
  }, [id]);
  return (
    <div>
      {!loading && (
        <div>
          <h1>{movies.original_title}</h1>
          <h2>{getGenre(movies)}</h2>
          <h2>{getYear(movies)}</h2>
          <p>{movies.overview}</p>
          <p>{movies.Rated}</p>
        </div>
      )}
    </div>
  );
}

export default Movie;
