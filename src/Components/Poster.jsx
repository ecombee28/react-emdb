import { Link } from "react-router-dom";
import style from "../styles/Movie.module.css";

const MoviePoster = ({ type, item }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={style.poster_container}>
      <Link to={`/${type}/${item.id}`}>
        <div className={style.poster_container}>
          <img
            src={`${imagePath}${item.poster_path}`}
            alt=""
            className={style.posters}
          />
        </div>
      </Link>
    </div>
  );
};

export default MoviePoster;
