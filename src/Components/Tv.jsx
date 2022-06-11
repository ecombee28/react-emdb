import React, { useState, useEffect } from "react";
import movieInfoStyle from "../styles/Movie.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cast from "./Cast";
import Trailer from "./Trailer";
import ImagePaths from "../lib/ImagePaths";
import AddMovies from "./AddMovies";
import Cookies from "js-cookie";
import Recommended from "./List";
import CircularProgress from "@mui/material/CircularProgress";
import { getGenre } from "../test";
import { useParams } from "react-router-dom";
import {
  getTvDetails,
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
  const inProduction = movie.in_production;
  const firstYear = new Date(movie.first_air_date).getFullYear();
  const lastYear = new Date(movie.last_air_date).getFullYear();

  const userId = Cookies.get("id");
  const movieId = useParams().movieId;

  useEffect(() => {
    const callMovies = async () => {
      const movieData = await getTvDetails(movieId);
      const countNumber = await getMovieCount(userId, movieId);
      const trailer = await getTrailer("tv", movieId);
      const rec = await getRecommended("tv", movieId);
      const castData = await getCredits("tv", movieId);

      setMovies(movieData);
      setCount(countNumber);
      setTrailer(trailer);
      setRecommend(rec);
      setCast(castData);
      setLoading(false);
    };
    callMovies();
  }, [movieId, userId]);

  function setLoadingVisible() {
    if (loading) return "visible";
    else return "hidden";
  }

  return (
    <div>
      <div>
        {loading ? (
          <CircularProgress
            size={100}
            thickness={8}
            sx={{
              color: "white",
              position: "absolute",
              right: "40%",
              top: "40%",
              visibility: setLoadingVisible(),
            }}
          />
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
                alt=""
              />
            </div>
            <div className={movieInfoStyle.movie_info_wrapper}>
              <h1 className={movieInfoStyle.title}>{movie.name}</h1>
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
                    <AddMovies
                      movie_id={movie.id}
                      media_type={"tv"}
                      name={movie.name}
                      count={count}
                      imagePath={movie.backdrop_path}
                    />
                  </div>
                )}
              </div>
              <div className={movieInfoStyle.movie_info}>
                <li className={movieInfoStyle.year}>
                  {inProduction
                    ? firstYear + "-"
                    : firstYear === lastYear
                    ? firstYear
                    : firstYear + "-" + lastYear}
                </li>
                <li
                  className={movieInfoStyle.episodes}
                >{`${movie.number_of_episodes} episodes`}</li>
                <li className={movieInfoStyle.genre}>{getGenre(movie)}</li>
              </div>
              <div className={movieInfoStyle.movie_ratings_wrapper}>
                {inProduction ? (
                  <div>
                    <p className={movieInfoStyle.logo_text}>Streaming on: </p>
                    <a href={movie.homepage} target={`_blank`}>
                      <img
                        className={`${movieInfoStyle.logo}  ${
                          movie.networks[0].name === "Netflix" ||
                          movie.networks[0].name === "The CW"
                            ? movieInfoStyle.non_filter
                            : ""
                        }`}
                        src={`${ImagePaths.w500}${movie.networks[0].logo_path}`}
                        alt=""
                      ></img>
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className={`${movieInfoStyle.plot_wrapper}`}>
                <p className={movieInfoStyle.plot}> {movie.overview}</p>
              </div>

              <div className={movieInfoStyle.cast_wrapper}>
                {cast.slice(0, 6).map((list) => (
                  <Cast castMember={list} />
                ))}
              </div>

              <div className={movieInfoStyle.recommended}>
                {recommended.total_results > 0 && (
                  <Recommended
                    movies={recommended.results}
                    title="Recommended"
                    id={1}
                    type="tv"
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
