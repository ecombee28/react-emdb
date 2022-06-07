import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "../src/Components/Movie";
import Home from "./Components/Home";
import Nav from "../src/Components/Nav";
import Search from "../src/Components/Search";
import Collections from "../src/Components/Collections";
import Watchlist from "../src/Components/Watchlist";
import LoginIndex from "./utils/LoginIndex";
import Person from "../src/Components/Person";
import { UserProvider } from "../src/utils/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/movie/:movieId" element={<Movie />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/search/collections" element={<Collections />} />
            <Route exact path="/watchlist" element={<Watchlist />} />
            <Route exact path="/login" element={<LoginIndex />} />
            <Route exact path="/person/:personId" element={<Person />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
