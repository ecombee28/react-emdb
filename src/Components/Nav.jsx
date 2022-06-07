import React, { useState, useEffect } from "react";
import navStyles from "../styles/Nav.module.css";
import { Link } from "react-router-dom";
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Username from "./UserName";
import { useName } from "../utils/UserContext";

export default function Nav() {
  const [show, setShow] = useState(false);
  const userName = useName();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [userName]);

  return (
    <div>
      <p className={navStyles.mobile_logo}>EMDB</p>
      <header
        className={`${navStyles.header} ${show && navStyles.header_black}`}
      >
        <nav className={navStyles.nav_list}>
          <Link to="/">
            <li className={navStyles.logo}>EMDB</li>
          </Link>

          <li className={navStyles.nav_links}>
            <Link to="/">
              {<FontAwesomeIcon icon={faHome} className={navStyles.icons} />}
              Home
            </Link>
          </li>

          <li className={navStyles.nav_links}>
            <Link to="/search" data-testid="search_link">
              <FontAwesomeIcon icon={faSearch} className={navStyles.icons} />
              Search
            </Link>
          </li>

          <li className={navStyles.nav_links}>
            <Link to="/watchlist">
              {<FontAwesomeIcon icon={faPlus} className={navStyles.icons} />}
              Watch List
            </Link>
          </li>

          {userName ? (
            <Username username={userName} />
          ) : (
            <li className={navStyles.nav_links}>
              <Link to="/login">Sign In/Sign Up</Link>
            </li>
          )}
        </nav>
      </header>
    </div>
  );
}
