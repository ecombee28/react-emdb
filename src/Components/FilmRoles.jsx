import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/FilmRoles.module.css";

const FilmRoles = ({ movie }) => {
  const getYear = () => {
    let year;

    if (movie.media_type === "tv") {
      year = movie.first_air_date;
    } else {
      year = movie.release_date;
    }

    return year.substr(0, 4);
  };
  return (
    <div className={style.main_wrapper}>
      <div>
        <Link to={`/${movie.media_type}/${movie.id}`}>
          <p className={style.movie_link}>
            {movie.media_type === "tv"
              ? movie.original_name
              : movie.original_title}
          </p>
        </Link>
        <p className={style.character}>{movie.character}</p>
      </div>

      <p className={style.year}>{getYear()}</p>
    </div>
  );
};

export default FilmRoles;
