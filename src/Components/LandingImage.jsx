import landingStyles from "../styles/LandingImage.module.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ImagePaths from "../lib/ImagePaths";

const LandingImage = ({ movie }) => {
  return (
    <>
      <div className={landingStyles.wrapper}>
        <img
          src={`${ImagePaths.original}${movie.backdrop_path}`}
          className={landingStyles.image}
          alt="landing-img"
        />
      </div>
      <div className={landingStyles.blackout}>
        <div className={landingStyles.movie_info}>
          <p className={landingStyles.title}>{movie.title}</p>

          <Link to={`/movie/${movie.id}`}>
            <button className={landingStyles.btn_more_info}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                className={landingStyles.icon}
              />
              More Info
            </button>
          </Link>

          <div
            className={`${landingStyles.plot_wrapper} ${landingStyles.wrap}`}
          >
            <p className={landingStyles.plot}>{movie.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingImage;
