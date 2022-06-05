import React, { useState } from "react";
import style from "../styles/Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

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

  const updateName = (e) => {
    setUserNameInput(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleValidation = () => {
    const uLen = userNameInput.length;
    const pLen = password.length;
    let userValPass = false;
    let passValPass = false;

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
      passValPass = true;
      setPassInput(true);
    } else {
      passValPass = false;
      setPassInput(false);
      if (pLen >= 0 && pLen <= 5) {
        setPassError("Password must be at least 5 characters");
      }
    }

    if (userValPass && passValPass) {
      signIn();
    }
  };

  const signIn = () => {
    setLoading(true);

    axios
      .post(`https://combeecreations.com/emdbapi/public/api/login`, {
        username: userNameInput,
        password: password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          Cookie.set("id", response.data.id, { expires: 1 });
          Cookie.set("username", response.data.user, { expires: 1 });

          navigate("/");
          setLoading(false);
        } else {
          localStorage.setItem(
            "error_message",
            JSON.stringify(response.data.error_message)
          );
          setError(true);
          setPassword("");
          setLoading(false);

          setTimeout(() => {
            setError(false);
          }, 6000);
        }
      });
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
              name="username"
              required
              value={password}
              className={style.input}
              onChange={updatePassword}
            />
          </div>
          <label className={`${style.invalid_login}`}>
            {error ? JSON.parse(localStorage.getItem("error_message")) : null}
          </label>
          <button className={style.submit_btn} onClick={handleValidation}>
            Sign In
            {loading && (
              <img src="/loading.gif" alt="" className={style.loader} />
            )}
          </button>
          <div className={style.signup_wrapper}>
            <p className={style.signup_txt}>New to EMDB?</p>
            <p className={style.signup} onClick={() => changeView("signup")}>
              Sign Up Now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
