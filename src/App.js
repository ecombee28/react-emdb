import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "../src/Components/Movie";
import Home from "./Components/Home";
import Nav from "../src/Components/Nav";
import Search from "../src/Components/Search";
import Collections from "../src/Components/Collections";
import Watchlist from "../src/Components/Watchlist";
import LoginIndex from "./utils/LoginIndex";

function App() {
  //search/collections/disney
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/collections" element={<Collections />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/login" element={<LoginIndex />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
