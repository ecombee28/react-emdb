import React, { useState } from "react";
import style from "../styles/Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { setUserId } from "../slices/userSlice";
import { setMovies } from "../slices/userSlice";
import Head from "next/head";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateName = (e) => {
    setUserNameInput(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleValidation = () => {
    setError(false);
    const uLen = userNameInput.length;
    const pLen = password.length;
    const conPLen = confirmPassword.length;
    let userValPass = false;
    let passValPass = false;
    let conPassValPass = false;

    if (uLen > 12) {
      userValPass = false;
      setUserInput(false);
      setUserError("Username can't exceed 12 characters");
    } else if (uLen > 3 && uLen <= 12) {
      userValPass = true;
      setUserInput(true);
    } else {
      userValPass = false;
      setUserInput(false);
      if (uLen >= 0 && uLen <= 3) {
        setUserError("Username must be at least 4 characters");
      }
    }
    if (pLen > 5) {
      if (password !== confirmPassword) {
        passValPass = false;
        conPassValPass = false;
        setPassInput(false);
        setPassError("Passwords do not match");
      } else {
        passValPass = true;
        conPassValPass = true;
        setPassInput(true);
      }
    } else {
      passValPass = false;
      setPassInput(false);
      if ((pLen >= 0 && pLen <= 5) || (conPLen >= 0 && conPLen <= 5)) {
        setPassError("Password must be at least 5 characters");
      }
    }

    if (userValPass && passValPass && conPassValPass) {
      signIn();
    }
  };

  const signIn = () => {
    setLoading(true);
    axios
      .post(`https://combeecreations.com/emdbapi/public/api/adduser`, {
        username: userNameInput,
        password: password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          axios
            .post(`https://combeecreations.com/emdbapi/public/api/movies`, {
              userId: response.data.id,
            })
            .then((res) => {
              addUser(response.data.id, response.data.user, res.data.Movies);

              navigate("/");
              setLoading(false);
            });
        } else {
          localStorage.setItem(
            "error_message",
            JSON.stringify(response.data.error_message)
          );
          setError(true);
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
        }
      });

    const addUser = (id, username, avatar, movies) => {
      dispatch(setUserId(id));
      dispatch(loginUser(username));

      if (movies) {
        movies.map((m) => dispatch(setMovies(m)));
      }
    };
  };

  const inputErrorStyle = {
    top: "55%",
  };

  return (
    <div>
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
              onChange={updateName}
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
              onChange={updatePassword}
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
              onChange={updateConfirmPassword}
            />
          </div>
          <label className={`${style.invalid_login}`} style={inputErrorStyle}>
            {error ? JSON.parse(localStorage.getItem("error_message")) : null}
          </label>
          <button className={style.submit_btn} onClick={handleValidation}>
            Sign Up
            {loading && (
              <img src="/loading.gif" alt="" className={style.loader} />
            )}
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
