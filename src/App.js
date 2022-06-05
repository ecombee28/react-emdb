import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "../src/Components/Movie";
import Home from "./Components/Home";
import Nav from "../src/Components/Nav";
import Search from "../src/Components/Search";
import Collections from "../src/Components/Collections";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
