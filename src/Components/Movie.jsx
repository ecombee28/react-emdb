import React, { useState, useEffect } from "react";
import style from "../styles/Movie.module.css";
import Cast from "./Cast";
import Trailer from "./Trailer";
import Cookies from "js-cookie";
import Recommended from "./List";
import ImageBackdrop from "./ImageBackdrop";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { centerLoadingStyle } from "../lib/getLoadingStyles";
import MovieInfo from "./MovieInfo";
import TitleComponent from "./TitleComponent";
import {
  getMovieDetails,
  getTrailer,
  getRecommended,
  getCredits,
  getMovieCount,
} from "../utils/api";

function Movie() {
  const [movie, setMovies] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [count, setCount] = useState(null);
  const [recommended, setRecommend] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const userId = Cookies.get("id");
  const movieId = useParams().movieId;

  useEffect(() => {
    const callMovies = async () => {
      const movieData = await getMovieDetails(movieId);
      const countNumber = await getMovieCount(userId, movieId);
      const trailer = await getTrailer("movie", movieId);
      const rec = await getRecommended("movie", movieId);
      const castData = await getCredits("movie", movieId);

      setMovies(movieData);
      setCount(countNumber);
      setTrailer(trailer);
      setRecommend(rec);
      setCast(castData);
      setLoading(false);
    };
    callMovies();
  }, [movieId, userId]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading style={centerLoadingStyle} />
        ) : (
          <div>
            {showTrailer && (
              <Trailer
                trailer={trailer}
                showTrailer={showTrailer}
                setShowTrailer={setShowTrailer}
              />
            )}

            <ImageBackdrop movie={movie} />
            <div className={style.movie_info_wrapper}>
              <TitleComponent
                movie={movie}
                setShowTrailer={setShowTrailer}
                showTrailer={showTrailer}
                count={count[0].count}
              />
              <MovieInfo movie={movie} />
              <Cast castMembers={cast} />

              <div className={style.recommended}>
                {recommended.total_results > 0 && (
                  <Recommended
                    key={recommended.results.id}
                    movies={recommended.results}
                    title="Recommended"
                    id={1}
                    type="movie"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movie;
