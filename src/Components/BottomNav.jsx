import React, { useState, useEffect } from "react";
import {
  faHome,
  faSearch,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import style from "../styles/Bottom.module.css";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = Cookie.get("id");
    const user = Cookie.get("username");

    setId(id);
    setUsername(user);
  });

  const logout = () => {
    Cookie.remove("id");
    Cookie.remove("username");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      <nav className={style.nav}>
        <Link to="/">
          <div className={style.nav_link_container}>
            <FontAwesomeIcon icon={faHome} className={style.icons} />
            <li className={style.nav_links}>Home</li>
          </div>
        </Link>
        <Link to="/search">
          <div className={style.nav_link_container}>
            <FontAwesomeIcon icon={faSearch} className={style.icons} />
            <li className={style.nav_links}>Search</li>
          </div>
        </Link>
        <Link to="/watchlist">
          <div className={style.nav_link_container}>
            <FontAwesomeIcon icon={faPlus} className={style.icons} />
            <li className={style.nav_links}>Watch List</li>
          </div>
        </Link>
        <div className={style.nav_link_container}>
          <FontAwesomeIcon icon={faUser} className={style.icons} />
          {id ? (
            <li className={style.username} onClick={logout}>
              {username}
            </li>
          ) : (
            <Link to="/login">
              <li className={style.nav_links}>Sign In</li>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
