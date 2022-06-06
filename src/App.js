import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "../src/Components/Movie";
import Home from "./Components/Home";
import Nav from "../src/Components/Nav";
import Search from "../src/Components/Search";
import Collections from "../src/Components/Collections";
import Watchlist from "../src/Components/Watchlist";
import LoginIndex from "./utils/LoginIndex";
import Person from "../src/Components/Person";
import { UserContext } from "./utils/UserContext";
import Cookie from "js-cookie";

function App() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(Cookie.get("username"));
  }, [value]);

  return (
    <div>
      <UserContext.Provider value={{ value, setValue }}>
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
      </UserContext.Provider>
    </div>
  );
}

export default App;
