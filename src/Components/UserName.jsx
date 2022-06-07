import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/Username.module.css";
import Cookie from "js-cookie";
import { useNameUpdate } from "../utils/UserContext";
import CircularProgress from "@mui/material/CircularProgress";

const UserName = ({ username }) => {
  const [loading, setLoading] = useState(false);
  const setUserName = useNameUpdate();
  const navigate = useNavigate();

  const logout = () => {
    setLoading(true);
    Cookie.remove("id");
    Cookie.remove("username");
    localStorage.removeItem("id");
    localStorage.removeItem("username");

    setTimeout(() => {
      setUserName();
      navigate("/");
    }, 3000);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <div className={style.container}>
      {loading ? (
        <CircularProgress size={30} thickness={7} sx={{ color: "red" }} />
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
