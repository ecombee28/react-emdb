import style from "../styles/TitleComponent.module.css";
import AddMovies from "./AddMovies";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useName } from "../utils/UserContext";

export default function TitleComponent({
  movie,
  setShowTrailer,
  showTrailer,
  count,
  name,
}) {
  const userName = useName();
  return (
    <>
      <div className={style.movie_info_wrapper}>
        <h1 className={style.title}>{name}</h1>
        <div className={style.trailer_wrapper}>
          <button
            className={style.trailer_button}
            onClick={() => setShowTrailer(!showTrailer)}
          >
            <FontAwesomeIcon icon={faPlay} className={style.icon} />
            Trailer
          </button>
          {userName && (
            <div className={style.add_movie}>
              <AddMovies
                movie_id={movie.id}
                media_type={"movie"}
                name={movie.title}
                count={count}
                imagePath={movie.backdrop_path}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
