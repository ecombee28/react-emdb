import React, { useState } from "react";
import style from "../styles/Login.module.css";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import { useName } from "./UserContext";

const LoginIndex = () => {
  const [signUp, setSignUp] = useState(false);
  const userName = useName();

  const changeModule = (model) => {
    model === "login" ? setSignUp(false) : setSignUp(true);
  };

  return (
    <div>
      <div className={style.main_container}>
        {userName ? (
          <div className={style.loginIn_error_container}>
            <h1>{`You are already signed in ${userName}`} </h1>
          </div>
        ) : !signUp ? (
          <Login changeView={changeModule} />
        ) : (
          <SignUp changeView={changeModule} />
        )}
      </div>
    </div>
  );
};

export default LoginIndex;
