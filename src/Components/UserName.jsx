import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/Username.module.css";
import Cookie from "js-cookie";
import { UserContext } from "../utils/UserContext";

const UserName = ({ username }) => {
  const [loading, setLoading] = useState(false);
  const { setValue } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    setLoading(true);
    Cookie.remove("id");
    Cookie.remove("username");
    localStorage.removeItem("id");
    localStorage.removeItem("username");

    setTimeout(() => {
      setValue(null);
      navigate("/");
    }, 3000);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <div className={style.container}>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          <p className={style.p}>{username}</p>
          <p className={style.logout} onClick={logout}>
            Sign Out
          </p>
        </div>
      )}
    </div>
  );
};

export default UserName;
