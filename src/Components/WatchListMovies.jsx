import { Link } from "react-router-dom";
import style from "../styles/MovieComponent.module.css";
import ImagePath from "../lib/ImagePaths";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WatchListMovies = ({ movie }) => {
  const image = ImagePath.w500;

  return (
    <div className={style.movie_container}>
      {movie.length > 0 ? (
        movie.map((m) => (
          <Link to={`/${m.media_type}/${m.movie_id}`} key={m.movie_id}>
            <div className={style.image_container}>
              <img
                key={m.id}
                src={`${image}${m.image_path}`}
                alt="d"
                className={style.img}
              />
              <div className={style.name_container}>{m.name}</div>
            </div>
          </Link>
        ))
      ) : (
        <div className={style.empty_list}>
          <FontAwesomeIcon icon={faPlus} className={style.icons} />
          You haven't added any titles to your list yet
          <br />
          Add your favorite movies or tv shows to your WatchList
        </div>
      )}
    </div>
  );
};

export default WatchListMovies;
