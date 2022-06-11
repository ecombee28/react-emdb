import React, { useState } from "react";
import style from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { HandleSignUpValidation } from "../lib/HandleSignUpValidation";
import { SignUpUser } from "../utils/api";
import { useNameUpdate } from "../utils/UserContext";
import Cookie from "js-cookie";
import Loading from "./Loading";
import { loginLoadingStyle } from "../lib/getLoadingStyles";
import { Helmet } from "react-helmet";

export default function SignUp({ changeView }) {
  const [userNameInput, setUserNameInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userInput, setUserInput] = useState(true);
  const [passInput, setPassInput] = useState(false);
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const setUserName = useNameUpdate();

  const navigate = useNavigate();

  const handleValidation = async () => {
    const handleRes = HandleSignUpValidation(
      setError,
      userNameInput,
      password,
      confirmPassword,
      setUserInput,
      setUserError,
      setPassInput,
      setPassError
    );

    if (handleRes) {
      setLoading(true);

      const userResponse = await SignUpUser(userNameInput, password);

      if (userResponse.status === "success") {
        Cookie.set("id", userResponse.id, {
          expires: 1,
        });
        Cookie.set("username", userResponse.user, {
          expires: 1,
        });
        setUserName();
        navigate("/");
        setLoading(false);
      } else {
        setError(true);
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
      }
    }
  };
  const inputErrorStyle = {
    top: "55%",
  };

  return (
    <div>
      <Helmet>
        <title>Sign Up | EMDB</title>
      </Helmet>
      <div className={style.main_container}> </div>
      <div className={style.signup_container}>
        <div className={style.login_wrapper}>
          <h2 className={style.title}>Sign Up</h2>
          <p className={style.error}>{!userInput ? userError : ""}</p>
          <div className={style.input_wrapper}>
            <span>
              <label>Username</label>
              <label className={style.error}></label>
            </span>
            <input
              type="text"
              name="username"
              data-testid="userName-input"
              value={userNameInput}
              required
              className={style.input}
              onChange={(e) => setUserNameInput(e.target.value)}
            />
          </div>
          <p className={style.error}>{!passInput ? passError : null}</p>
          <div className={style.input_wrapper}>
            <span>
              <label>Password</label>
              <label className={style.error}></label>
            </span>
            <input
              type="password"
              name="password"
              data-testid="password-input"
              required
              value={password}
              className={style.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.input_wrapper}>
            <span>
              <label>Confirm Password</label>
              <label className={style.error}></label>
            </span>
            <input
              type="password"
              name="cPassword"
              data-testid="confirm-password-input"
              required
              value={confirmPassword}
              className={style.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <label className={`${style.invalid_login}`} style={inputErrorStyle}>
            {error ? JSON.parse(localStorage.getItem("error_message")) : null}
          </label>
          <button className={style.submit_btn} onClick={handleValidation}>
            Sign Up
            {loading && <Loading style={loginLoadingStyle} />}
          </button>
          <div className={style.signup_wrapper}>
            <p className={style.signup_txt}>All ready a member?</p>
            <p
              data-testid="signin-text"
              className={style.signup}
              onClick={() => changeView("login")}
            >
              Sign In
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
