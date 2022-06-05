import React, { useState } from "react";
import style from "../styles/Login.module.css";
import { HandleLoginValidation } from "../lib/HandleLoginValidation";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import { useDispatch } from "react-redux";
import { loginUser, setUserId, setMovies } from "../slices/userSlice";

export default function Login({ changeView }) {
  const [userNameInput, setUserNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [userInput, setUserInput] = useState(true);
  const [passInput, setPassInput] = useState(false);
  const [error, setError] = useState(false);
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addUser = (id, username, movies) => {
    dispatch(setUserId(id));
    dispatch(loginUser(username));

    if (movies) {
      movies.map((m) => dispatch(setMovies(m)));
    }
  };
  const handleValidation = async () => {
    const handleRes = HandleLoginValidation(
      userNameInput,
      password,
      setUserInput,
      setUserError,
      setPassInput,
      setPassError
    );

    if (handleRes) {
      setLoading(true);

      const userResponse = await login(userNameInput, password);

      if (userResponse.status === "success") {
        addUser(userResponse.id, userResponse.user, userResponse.movies);
        navigate("/");
        setLoading(false);
      } else {
        setError(true);
        setPassword("");
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <div className={style.main_container}> </div>

      <div className={style.login_container}>
        <div className={style.login_wrapper}>
          <h2 className={style.title}>Sign In</h2>
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
          <p data-testid="pass-error-txt" className={style.error}>
            {!passInput ? passError : null}
          </p>
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
          <label className={`${style.invalid_login}`}>
            {error ? JSON.parse(localStorage.getItem("error_message")) : null}
          </label>
          <button
            name="submit-btn"
            className={style.submit_btn}
            onClick={handleValidation}
          >
            Sign In
            {loading && (
              <img src="/loading.gif" alt="" className={style.loader} />
            )}
          </button>
          <div className={style.signup_wrapper}>
            <p className={style.signup_txt}>New to EMDB?</p>
            <p
              data-testid="signup-text"
              className={style.signup}
              onClick={() => changeView("signup")}
            >
              Sign Up Now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
