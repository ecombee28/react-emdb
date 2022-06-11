import React from "react";
import style from "../styles/MovieInfo.module.css";
import { getGenre, getYear } from "../test";
import RatingsLogo from "./RatingsLogo";

const MovieInfo = ({ movie }) => {
  return (
    <>
      <div className={style.movie_info}>
        {movie.Rated && <li className={style.rated}>{movie.Rated}</li>}

        <li className={style.year}>{getYear(movie)}</li>
        <li className={style.runtime}>{`${movie.runtime} minutes`}</li>
        <li className={style.genre}>{getGenre(movie)}</li>
      </div>
      <div className={style.movie_ratings_wrapper}>
        {movie.Response !== "False" &&
          movie.Ratings.map((logo, i) => (
            <RatingsLogo key={i} source={logo.Source} value={logo.Value} />
          ))}
      </div>

      <div className={`${style.plot_wrapper}`}>
        <p className={style.plot}> {movie.overview}</p>
      </div>
    </>
  );
};

export default MovieInfo;
