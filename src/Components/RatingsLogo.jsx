import React from "react";
import style from "../styles/MovieInfo.module.css";
import imdbImage from "../assets/imdb.png";
import goodRottemImage from "../assets/good-rotton.png";
import badRottemImage from "../assets/bad-rotton.png";
import metacriticImage from "../assets/Metacritic.svg";

const RatingsLogo = ({ source, value }) => {
  const getRating = () => {
    let rating;

    value.length === 4
      ? (rating = value.substring(0, 3))
      : (rating = value.substring(0, 2));

    if (rating > 50) {
      return goodRottemImage;
    } else {
      return badRottemImage;
    }
  };

  const getRatingImage = () => {
    if (source === "Internet Movie Database") return imdbImage;
    else if (source === "Rotten Tomatoes") return getRating();
    else return metacriticImage;
  };
  return (
    <div className={style.wrap}>
      <img src={getRatingImage()} className={style.rating_logo} alt="rating" />
      <p className={style.rating}>{value}</p>
    </div>
  );
};

export default RatingsLogo;
