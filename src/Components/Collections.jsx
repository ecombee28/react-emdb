import React, { useState, useEffect } from "react";
import collectionStyle from "../styles/Collections.module.css";
import CollectionImages from "./CollectionImages";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { getCollections, getStarWarsMovies } from "../utils/api";

export default function Collections() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCrt, setPageCrt] = useState(1);
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const data = location.state?.data;

  const goRight = () => {
    if (page + 1 === pageCrt) {
      setPage(page + 1);
      setRightEnd(true);
      setLeftEnd(false);
    } else {
      setPage(page + 1);
      setRightEnd(false);
      setLeftEnd(false);
    }
  };
  const goLeft = () => {
    if (page - 1 !== 1) {
      setPage(page - 1);
      setLeftEnd(false);
      setRightEnd(false);
    } else {
      setPage(1);
      setLeftEnd(true);
      setRightEnd(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (data.name === "Star Wars") {
        const res = await getStarWarsMovies();
        setMovies(res);
        setLoading(false);
        setLeftEnd(true);
        setRightEnd(true);
      } else {
        const res = await getCollections(page, data.company);
        setMovies(res.results);
        setPageCrt(res.total_pages);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div>
      {loading ? (
        <h1>loading......</h1>
      ) : (
        <div>
          <div className={collectionStyle.video_wrapper}>
            <img src={data.image} className={collectionStyle.image} alt="" />
          </div>
          <div className={collectionStyle.wrapper}>
            <div className={collectionStyle.arrow_wrapper}>
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className={`${collectionStyle.left_arrow} ${
                  leftEnd ? collectionStyle.hide : collectionStyle.show
                }`}
                onClick={goLeft}
              />
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                className={`${collectionStyle.right_arrow} ${
                  rightEnd ? collectionStyle.hide : collectionStyle.show
                }`}
                onClick={goRight}
              />
            </div>
            <div className={collectionStyle.collection_wrapper}>
              {movies.map((m, i) => (
                <CollectionImages movies={m} key={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
