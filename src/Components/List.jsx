import React, { useState, useEffect } from "react";
import movieStyles from "../styles/List.module.css";
import Poster from "./Poster";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieList = ({ movies, title, id, type }) => {
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  let length = 1780;

  const slideRight = () => {
    const element = document.getElementById(`${id}`);
    const ttl = element.scrollWidth - element.clientWidth;

    element.scrollTo({
      top: 0,
      left: (element.scrollLeft += length),
      behavior: "smooth",
    });

    if (element.scrollLeft == ttl) {
      setRightEnd(true);
    } else {
      setRightEnd(false);
      setLeftEnd(false);
    }
  };

  const slideLeft = () => {
    const element = document.getElementById(`${id}`);

    element.scrollTo({
      top: 0,
      left: (element.scrollLeft -= length),
      behavior: "smooth",
    });

    if (element.scrollLeft == 0) {
      setLeftEnd(true);
    } else {
      setLeftEnd(false);
      setRightEnd(false);
    }
  };

  useEffect(() => {
    const resetSlider = () => {
      const element = document.getElementById(`${id}`);

      element.scrollTo({
        top: 0,
        left: element.scrollLeft == 1000,
        behavior: "smooth",
      });

      setLeftEnd(true);
      setRightEnd(false);
    };

    resetSlider();
  }, [movies]);

  return (
    <>
      <div className={movieStyles.row}>
        <h2 className={movieStyles.title}>{title}</h2>

        <div
          className={` ${movieStyles.left_arrow} ${
            leftEnd ? movieStyles.hide : movieStyles.show
          } ${title === "Recommended" && movieStyles.move_left_arrow}`}
        >
          {
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className={movieStyles.left_arrow_icon}
              onClick={() => slideLeft({ id })}
            />
          }
        </div>
        <div id={`${id}`} className={movieStyles.row_posters}>
          {movies.map((movie) => (
            <Poster key={movie.id} type={type} item={movie} />
          ))}
        </div>

        <div
          className={` ${movieStyles.right_arrow} ${
            rightEnd ? movieStyles.hide : movieStyles.show
          } ${title === "Recommended" && movieStyles.move_right_arrow}`}
        >
          {
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              className={movieStyles.right_arrow_icon}
              onClick={() => slideRight({ id })}
            />
          }
        </div>
      </div>
    </>
  );
};

export default MovieList;
