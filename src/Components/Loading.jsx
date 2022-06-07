import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import style from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={style.main_wrapper}>
      <div className={style.spinner_wrapper}>
        <p className={style.title}>Loading</p>
        {/* <Loader
          type="ThreeDots"
          color="#fff"
          height="70"
          width="70"
          className={style.loader}
        /> */}
      </div>
    </div>
  );
};

export default Loading;
