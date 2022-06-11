import React from "react";
import style from "../styles/Cast.module.css";
import { Link } from "react-router-dom";
import ImagePaths from "../lib/ImagePaths";
import BlankImage from "../assets/blank-profile-picture.png";

const Cast = ({ castMembers }) => {
  return (
    <>
      <h1 className={style.title}>Cast </h1>
      <div className={style.cast_wrapper}>
        {castMembers.map((cast) => (
          <Link to={`/person/${cast.id}`}>
            <div className={style.cast_node_wrapper}>
              <div className={style.image_wrapper}>
                <img
                  className={style.cast__img}
                  src={
                    cast.profile_path === null
                      ? BlankImage
                      : ImagePaths.w500 + cast.profile_path
                  }
                  alt="no-profile"
                />
              </div>
              <div className={style.info_wrapper}>
                <p className={style.actor_name}>{cast.name}</p>
                <p className={style.character_name}>{cast.character}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cast;
