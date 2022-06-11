import React, { useState, useEffect } from "react";
import style from "../styles/Trailer.module.css";
import Iframe from "react-iframe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const Trailer = ({ trailer, showTrailer, setShowTrailer }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const getTrailerUrl = () => {
      if (trailer.length === 0) {
        setTrailerUrl("");
      } else {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer[0].key}`);
      }
    };

    getTrailerUrl();
  }, [trailer]);

  return (
    <div className={`${style.trailer} ${!showTrailer && style.hide}`}>
      <span
        id="closeVideo"
        data-testid="close-iframe"
        className={style.close}
        onClick={() => setShowTrailer(false)}
      >
        <FontAwesomeIcon icon={faTimesCircle} className={style.close} />
      </span>
      <div className={style.iframe_wrapper}>
        <Iframe
          title={"trailer"}
          url={trailerUrl}
          width="100%"
          height="100%"
          id="ytVideo"
          display="initial"
          allow="encrypted-media"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default Trailer;
