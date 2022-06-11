import style from "../styles/MovieInfo.module.css";
import { getGenre } from "../lib/getMovieInfo";
import ImagePaths from "../lib/ImagePaths";

const TvInfo = ({ movie }) => {
  const inProduction = movie.in_production;
  const firstYear = new Date(movie.first_air_date).getFullYear();
  const lastYear = new Date(movie.last_air_date).getFullYear();

  return (
    <>
      <div className={style.movie_info}>
        <li className={style.year}>
          {inProduction
            ? firstYear + "-"
            : firstYear === lastYear
            ? firstYear
            : firstYear + "-" + lastYear}
        </li>
        <li
          className={style.episodes}
        >{`${movie.number_of_episodes} episodes`}</li>
        <li className={style.genre}>{getGenre(movie)}</li>
      </div>

      <div className={style.movie_ratings_wrapper}>
        {inProduction && (
          <div>
            <p className={style.logo_text}>Streaming on: </p>
            <a href={movie.homepage} target={`_blank`}>
              <img
                className={`${style.logo}  ${
                  movie.networks[0].name === "Netflix" ||
                  movie.networks[0].name === "The CW"
                    ? style.non_filter
                    : ""
                }`}
                src={`${ImagePaths.w500}${movie.networks[0].logo_path}`}
                alt=""
              ></img>
            </a>
          </div>
        )}
      </div>

      <div className={`${style.plot_wrapper}`}>
        <p className={style.plot}> {movie.overview}</p>
      </div>
    </>
  );
};

export default TvInfo;
