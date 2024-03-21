import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../styles/WatchList.module.css";
import Cookies from "js-cookie";
import WatchListMovies from "./WatchListMovies";
// import { getUsersMovies } from "../utils/api";

export default function Watchlist() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = Cookies.get("id");

  // useEffect(() => {
  //   setLoading(true);
  //   const getMovies = async () => {
  //     await getUsersMovies(userId, setMovies, setLoading);
  //   };
  //   getMovies();
  // }, [userId]);

  return (
    <div className={style.main_container}>
      <h1 className={style.header}>My list</h1>

      {userId ? (
        loading ? (
          <h1>Loading...</h1>
        ) : (
          <WatchListMovies movie={movies} />
        )
      ) : (
        <div>
          <h1 className={style.empty_list}>
            <span>
              You have to be signed in to see your WatchList.
              <br />
              <Link to="/login" className={style.link}>
                Sign In
              </Link>
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}
