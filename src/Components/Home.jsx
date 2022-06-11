import React, { useEffect, useState } from "react";
import LandingImage from "./LandingImage";
import MovieList from "./List";
import TvList from "./List";
import style from "../styles/MainPage.module.css";
import Loading from "./Loading";
import { centerLoadingStyle } from "../lib/getLoadingStyles";
import { Helmet } from "react-helmet";

import {
  getTrending,
  getPopular,
  getTrendingOnNetflix,
  getPopularTv,
  getActionMovies,
  getComedyMovies,
  getRomanceMovies,
  getTopRatedMovies,
} from "../utils/api";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trendingOnNetflix, setTrendingOnNetflix] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [romance, setRomance] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callMovies = async () => {
      const trending = await getTrending();
      const popular = await getPopular();
      const netflix = await getTrendingOnNetflix();
      const popularTv = await getPopularTv();
      const action = await getActionMovies();
      const comedy = await getComedyMovies();
      const romance = await getRomanceMovies();
      const topRated = await getTopRatedMovies();

      setTrending(trending);
      setPopular(popular);
      setTrendingOnNetflix(netflix);
      setPopularTv(popularTv);
      setAction(action);
      setComedy(comedy);
      setRomance(romance);
      setTopRated(topRated);

      setLoading(false);
    };
    callMovies();
  }, []);

  const randomMovie = trending[Math.floor(Math.random() * trending.length - 1)];

  return (
    <div>
      <Helmet>
        <title>EMDB</title>
      </Helmet>
      {loading ? (
        <Loading style={centerLoadingStyle} />
      ) : (
        <div>
          <LandingImage movie={randomMovie} />
          <section className={style.main_container}>
            <MovieList movies={trending} title="Trending" id={1} type="movie" />
            <TvList
              movies={popularTv}
              title="Trending Tv Shows"
              id={2}
              type="tv"
            />
            <MovieList movies={popular} title="Popular" id={3} type="movie" />
            <TvList
              movies={trendingOnNetflix}
              title="Trending on Netflix"
              id={4}
              type="tv"
            />
            <MovieList movies={action} title="Action" id={5} type="movie" />
            <MovieList movies={comedy} title="Comedies" id={6} type="movie" />
            <MovieList movies={romance} title="Romance" id={7} type="movie" />
            <MovieList
              movies={topRated}
              title="Top Rated Movies"
              id={8}
              type="movie"
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
