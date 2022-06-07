import React, { useState, useEffect } from "react";
import style from "../styles/AddMovie.module.css";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addMovieToWatchList, removeMovieFromWatchList } from "../utils/api";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddMovies({
  movie_id,
  media_type,
  name,
  count,
  imagePath,
}) {
  const [selected, setSelected] = useState(false);
  const [movieCount, setMovieCount] = useState(count);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(faPlus);
  const userId = Cookies.get("id");

  useEffect(() => {
    if (movieCount === 1) {
      setIcon(faCheck);
      setSelected(true);
    } else {
      setIcon(faPlus);
      setSelected(false);
    }
  }, [movie_id, movieCount]);

  const handleMovie = async () => {
    setLoading(true);
    if (!selected) {
      await addMovieToWatchList(userId, movie_id, media_type, name, imagePath);

      setLoading(false);
      setIcon(faCheck);
      setSelected(true);
      setMovieCount(1);
    } else {
      await removeMovieFromWatchList(movie_id, userId);

      setTimeout(() => {
        setLoading(false);
        setIcon(faPlus);
        setSelected(false);
        setMovieCount(0);
      }, 2000);
    }
  };

  function setLoadingVisible() {
    if (loading) return "visible";
    else return "hidden";
  }

  return (
    <div>
      <div className={style.movie_container}>
        {loading ? (
          <CircularProgress
            size={20}
            thickness={4}
            sx={{
              color: "red",
              visibility: setLoadingVisible(),
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={icon}
            className={style.icons}
            onClick={handleMovie}
          />
        )}
        <span className={style.tooltiptext}>{`${
          selected ? "Remove from list" : `Add to watch list`
        }`}</span>
      </div>
    </div>
  );
}
