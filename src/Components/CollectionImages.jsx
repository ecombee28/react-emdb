import React from "react";
import { Link } from "react-router-dom";
import collectionStyle from "../styles/Collections.module.css";
import ImagePath from "../lib/ImagePaths";

const CollectionImages = ({ movies }) => {
  return (
    <>
      <Link to={`/movie/${movies.id}`}>
        <img
          src={`${ImagePath.w500}${movies.poster_path}`}
          className={collectionStyle.posters}
          key={movies.id}
          alt=""
        />
      </Link>
    </>
  );
};

export default CollectionImages;
