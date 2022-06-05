import React, { useState, useEffect } from "react";
import movieInfoStyle from "../styles/MovieInfo.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingsLogo from "./RatingsLogo";
import Cast from "./Cast";
import Trailer from "./Trailer";
import ImagePaths from "../lib/ImagePaths";
import AddMovie from "./AddMovies";
import Cookies from "js-cookie";
import Recommended from "./List";
import { getGenre, getYear } from "../test";
import { useParams } from "react-router-dom";
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
  const [count, setCount] = useState(0);
  const [recommended, setRecommend] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const userId = Cookies.get("id");
  const movieId = useParams().movieId;

  useEffect(() => {
    const callMovies = async () => {
      const movieData = await getMovieDetails({ movieId });
      const countNumber = await getMovieCount(userId, { movieId });
      const trailer = await getTrailer("movie", { movieId });
      const rec = await getRecommended("movie", { movieId });
      const castData = await getCredits("movie", { movieId });

      await setMovies(movieData);
      await setCount(countNumber);
      await setTrailer(trailer);
      await setRecommend(rec);
      await setCast(castData);
      setLoading(false);
    };
    callMovies();
  }, [movieId]);

  console.log(movie);
  return (
    <div>
      <>
        {/* <Head>
        <title>{`${movie.title}/EMDB`}</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head> */}

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {showTrailer && (
              <div
                className={`${movieInfoStyle.trailer} ${
                  !showTrailer && movieInfoStyle.hide
                }`}
              >
                <span
                  id="closeVideo"
                  className={movieInfoStyle.close}
                  onClick={() => setShowTrailer(!showTrailer)}
                >
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className={movieInfoStyle.close}
                  />
                </span>
                <Trailer trailer={trailer} />
              </div>
            )}

            <div className={movieInfoStyle.backdrop}>
              <img
                src={`${ImagePaths.original}${movie.backdrop_path}`}
                className={movieInfoStyle.img}
                alt="backdrop"
              />
            </div>

            <div className={movieInfoStyle.movie_info_wrapper}>
              <h1 className={movieInfoStyle.title}>{movie.title}</h1>
              <div className={movieInfoStyle.trailer_wrapper}>
                <button
                  className={movieInfoStyle.trailer_button}
                  onClick={() => setShowTrailer(!showTrailer)}
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={movieInfoStyle.icon}
                  />
                  Trailer
                </button>
                {userId && (
                  <div className={movieInfoStyle.add_movie}>
                    <AddMovie
                      movie_id={movie.id}
                      media_type={"movie"}
                      name={movie.title}
                      count={count}
                      imagePath={movie.backdrop_path}
                    />
                  </div>
                )}
              </div>

              <div className={movieInfoStyle.movie_info}>
                {movie.Rated && (
                  <li className={movieInfoStyle.rated}>{movie.Rated}</li>
                )}

                <li className={movieInfoStyle.year}>{getYear(movie)}</li>
                <li
                  className={movieInfoStyle.runtime}
                >{`${movie.runtime} minutes`}</li>
                <li className={movieInfoStyle.genre}>{getGenre(movie)}</li>
              </div>
              <div className={movieInfoStyle.movie_ratings_wrapper}>
                {movie.Response !== "False" &&
                  movie.Ratings.map((logo, i) => (
                    <RatingsLogo
                      key={i}
                      source={logo.Source}
                      value={logo.Value}
                    />
                  ))}
              </div>

              <div className={`${movieInfoStyle.plot_wrapper}`}>
                <p className={movieInfoStyle.plot}> {movie.overview}</p>
              </div>

              <div className={movieInfoStyle.cast_wrapper}>
                {cast.map((list, i) => (
                  <Cast key={i} castMember={list} />
                ))}
              </div>

              <div className={movieInfoStyle.recommended}>
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
      </>
    </div>
  );
}

export default Movie;