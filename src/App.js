import { Route, Routes } from "react-router-dom";
import Movie from "../src/Components/Movie";
import Home from "./Components/Home";
import Nav from "../src/Components/Nav";
import Search from "../src/Components/Search";
import Collections from "../src/Components/Collections";
import Watchlist from "../src/Components/Watchlist";
import LoginIndex from "./utils/LoginIndex";
import Person from "../src/Components/Person";
import Tv from "../src/Components/Tv";
import { UserProvider } from "../src/utils/UserContext";
import AlwaysScrollToTop from "./Components/AlwaysScrollToTop";
import BottomNav from "./Components/BottomNav";

function App() {
  return (
    <div>
      <UserProvider>
        <AlwaysScrollToTop />
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movie/:movieId" element={<Movie />} />
          <Route exact path="/tv/:movieId" element={<Tv />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/search/collections" element={<Collections />} />
          <Route exact path="/watchlist" element={<Watchlist />} />
          <Route exact path="/login" element={<LoginIndex />} />
          <Route exact path="/person/:personId" element={<Person />} />
        </Routes>
        <BottomNav />
      </UserProvider>
    </div>
  );
}

export default App;
