import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import style from "../styles/Username.module.css";
import Cookie from "js-cookie";

const UserName = ({ username }) => {
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    Cookie.remove("id");
    Cookie.remove("username");

    setTimeout(() => {
      <Navigate replace to="/" />;
    }, 3000);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <div className={style.container}>
      {/* {loading ? (
        <Loader type="ThreeDots" color="#fff" height="50" width="50" />
      ) : ( */}
      <div>
        <p className={style.p}>{username}</p>
        <p className={style.logout} onClick={logout}>
          Sign Out
        </p>
      </div>
      {/* )} */}
    </div>
  );
};

export default UserName;
