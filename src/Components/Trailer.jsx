import React, { useState, useEffect } from "react";
import movieInfoStyle from "../styles/MovieInfo.module.css";
import Iframe from "react-iframe";

const Trailer = ({ trailer }) => {
  const [showMe, setShowMe] = useState(true);
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
    <div className={movieInfoStyle.iframe_wrapper}>
      <Iframe
        url={trailerUrl}
        width="100%"
        height="100%"
        id="ytVideo"
        display="initial"
        allow="encrypted-media"
        frameBorder="0"
      />
    </div>
  );
};

export default Trailer;
