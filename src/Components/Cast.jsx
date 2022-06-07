import React from "react";
import style from "../styles/Cast.module.css";
import { Link } from "react-router-dom";
import ImagePaths from "../lib/ImagePaths";
import BlankImage from "../assets/blank-profile-picture.png";

const Cast = ({ castMember }) => {
  const castImage = ImagePaths.w500 + castMember.profile_path;

  return (
    <Link to={`/person/${castMember.id}`}>
      <div className={style.cast_node_wrapper}>
        <div className={style.image_wrapper}>
          <img
            className={style.cast__img}
            src={castMember.profile_path === null ? BlankImage : castImage}
            alt="no-profile"
          />
        </div>
        <div className={style.info_wrapper}>
          <p className={style.actor_name}>{castMember.name}</p>
          <p className={style.character_name}>{castMember.character}</p>
        </div>
      </div>
    </Link>
  );
};

export default Cast;
