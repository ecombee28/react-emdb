import React, { useState, useEffect } from "react";
import style from "../styles/Movie.module.css";
import Cast from "./Cast";
import Trailer from "./Trailer";
import Cookies from "js-cookie";
import Recommended from "./List";
import ImageBackdrop from "./ImageBackdrop";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { centerLoadingStyle } from "../lib/getLoadingStyles";
import TvInfo from "./TvInfo";
import TitleComponent from "./TitleComponent";
import { Helmet } from "react-helmet";

import {
  getTvDetails,
  getTrailer,
  getRecommended,
  getCredits,
  getMovieCount,
} from "../utils/api";

function Movie() {
  const [movie, setMovies] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [count, setCount] = useState(null);
  const [recommended, setRecommend] = useState([]);
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const userId = Cookies.get("id");
  const movieId = useParams().movieId;

  useEffect(() => {
    const callMovies = async () => {
      const movieData = await getTvDetails(movieId);
      //const countNumber = await getMovieCount(userId, movieId);
      const trailer = await getTrailer("tv", movieId);
      const rec = await getRecommended("tv", movieId);
      const castData = await getCredits("tv", movieId);

      setMovies(movieData);
      setCount(1);
      setTrailer(trailer);
      setRecommend(rec);
      setCast(castData);
      setLoading(false);
    };
    callMovies();
  }, [movieId, userId]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading style={centerLoadingStyle} />
        ) : (
          <div>
            <Helmet>
              <title>{`${movie.name} | EMDB`}</title>
            </Helmet>
            {showTrailer && (
              <Trailer
                trailer={trailer}
                showTrailer={showTrailer}
                setShowTrailer={setShowTrailer}
              />
            )}

            <ImageBackdrop movie={movie} />
            <div className={style.movie_info_wrapper}>
              <TitleComponent
                movie={movie}
                setShowTrailer={setShowTrailer}
                showTrailer={showTrailer}
                count={count[0].count}
                name={movie.name}
              />
              <TvInfo movie={movie} />
              {cast && <Cast castMembers={cast} />}

              <div className={style.recommended}>
                {recommended.total_results > 0 && (
                  <Recommended
                    key={recommended.results.id}
                    movies={recommended.results}
                    title="Recommended"
                    id={1}
                    type="tv"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movie;
