import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "../src/Components/Movie";
import Home from "./Components/Home";
import Nav from "../src/Components/Nav";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
