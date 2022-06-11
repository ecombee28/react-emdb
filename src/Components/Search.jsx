import React, { useState, useEffect } from "react";
import SearchPosters from "./SearchPosters";
import searchStyles from "../styles/Search.module.css";
import disneyText from "../assets/pixar.png";
import marvelText from "../assets/marvel.png";
import dcText from "../assets/dc.png";
import starWarsText from "../assets/starwars.png";
import { getSearchResults } from "../utils/api";
import CollectionComponent from "./CollectionComponents";
import { Helmet } from "react-helmet";

import {
  disneyObj,
  marvelObj,
  dcObj,
  starwarsObj,
} from "../lib/CollectionObjects";

const Search = () => {
  const [movies, setMovies] = useState(false);
  const [searchComponent, setSearchComponent] = useState(false);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("Explore");

  useEffect(() => {
    const updateSearch = async () => {
      if (query.length >= 2) {
        setTitle(query);

        try {
          const res = await getSearchResults(query);
          await setMovies(res);
        } catch (err) {
          console.log(err);
        }

        setSearchComponent(true);
      } else {
        setTitle("Explore");
        setSearchComponent(false);
      }
    };

    updateSearch();
  }, [query]);

  return (
    <div>
      <Helmet>
        <title>Search-EMDB</title>
      </Helmet>
      <div className={searchStyles.search_bar}>
        <input
          type="text"
          id="input"
          data-testid="search-input"
          placeholder="Search by movie or show title"
          className={searchStyles.input}
          onKeyUp={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      {searchComponent ? (
        <>
          <h1
            id="search_title"
            data-testid="search-result-title"
            className={`${searchStyles.title} ${searchStyles.title_container}`}
          >
            {`Search Results for: ${title}`}
          </h1>

          <main id="search_results" className={searchStyles.search_results}>
            <SearchPosters movies={movies} title={title} />
          </main>
        </>
      ) : (
        <>
          <h1
            id="title"
            data-testid="main-title"
            className={`${searchStyles.title} ${searchStyles.title_container}`}
          >
            {title}
          </h1>
          <main id="explore" className={searchStyles.explore_results}>
            <CollectionComponent
              dataObj={disneyObj}
              image={disneyText}
              backColor={searchStyles.disney}
              alt="disney"
            />
            <CollectionComponent
              dataObj={marvelObj}
              image={marvelText}
              backColor={searchStyles.marvel}
              alt="marvel"
            />
            <CollectionComponent
              dataObj={dcObj}
              image={dcText}
              backColor={searchStyles.dc}
              alt="dc"
            />
            <CollectionComponent
              dataObj={starwarsObj}
              image={starWarsText}
              backColor={searchStyles.starwars}
              alt="starwars"
            />
          </main>
        </>
      )}
    </div>
  );
};

export default Search;
