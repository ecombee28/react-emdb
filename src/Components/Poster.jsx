import { Link } from "react-router-dom";
import style from "../styles/List.module.css";
import imagePaths from "../lib/ImagePaths";

const MoviePoster = ({ type, item }) => {
  return (
    <div className={style.poster_container}>
      <Link to={`/${type}/${item.id}`}>
        <div className={style.poster_container}>
          <img
            src={`${imagePaths.w500}${item.poster_path}`}
            alt=""
            className={style.posters}
          />
        </div>
      </Link>
    </div>
  );
};

export default MoviePoster;
