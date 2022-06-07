import React, { useState, useEffect } from "react";
import navStyles from "../styles/Nav.module.css";
import { Link } from "react-router-dom";
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Username from "./UserName";
import { useName, useNameUpdate } from "../utils/UserContext";

export default function Nav() {
  const [show, setShow] = useState(false);
  const userName = useName();
  const setUserName = useNameUpdate();

  useEffect(() => {
    setUserName();
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [setUserName]);

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
              <p className={navStyles.nav_text}>
                {<FontAwesomeIcon icon={faHome} className={navStyles.icons} />}
                Home
              </p>
            </Link>
          </li>

          <li className={navStyles.nav_links}>
            <Link to="/search">
              <p className={navStyles.nav_text}>
                {
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={navStyles.icons}
                  />
                }
                Search
              </p>
            </Link>
          </li>

          <li className={navStyles.nav_links}>
            <Link to="/watchlist">
              <p className={navStyles.nav_text}>
                {<FontAwesomeIcon icon={faPlus} className={navStyles.icons} />}
                Watch List
              </p>
            </Link>
          </li>

          {userName ? (
            <Username username={userName} />
          ) : (
            <li className={navStyles.nav_links}>
              <Link to="/login">
                <p className={navStyles.nav_text}>Sign In/Sign Up</p>
              </Link>
            </li>
          )}
        </nav>
      </header>
    </div>
  );
}
