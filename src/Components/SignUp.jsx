import React, { useState } from "react";
import style from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HandleSignUpValidation } from "../lib/HandleSignUpValidation";
import { SignUpUser } from "../utils/api";
import { loginUser, setUserId, setMovies } from "../slices/userSlice";

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
  const [apiData, setApiData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addUser = (id, username) => {
    dispatch(setUserId(id));
    dispatch(loginUser(username));

    // if (movies) {
    //   movies.map((m) => dispatch(setMovies(m)));
    // }
  };

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

      const userResponse = await SignUpUser(
        userNameInput,
        password,
        setLoading,
        navigate
      );

      if (userResponse.status === "success") {
        addUser(userResponse.id, userResponse.user);

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

  // const signIn = () => {
  //   setLoading(true);

  //   // axios
  //   //   .post(`https://combeecreations.com/emdbapi/public/api/adduser`, {
  //   //     username: userNameInput,
  //   //     password: password,
  //   //   })
  //   //   .then((response) => {
  //   //     if (response.data.status === "success") {
  //   //       axios
  //   //         .post(`https://combeecreations.com/emdbapi/public/api/movies`, {
  //   //           userId: response.data.id,
  //   //         })
  //   //         .then((res) => {
  //   //           addUser(response.data.id, response.data.user, res.data.Movies);

  //   //           navigate("/");
  //   //           setLoading(false);
  //   //         });
  //   //     } else {
  //   //       localStorage.setItem(
  //   //         "error_message",
  //   //         JSON.stringify(response.data.error_message)
  //   //       );
  //   //       setError(true);
  //   //       setPassword("");
  //   //       setConfirmPassword("");
  //   //       setLoading(false);
  //   //     }
  //   //   });

  //   // const addUser = (id, username, movies) => {
  //   //   dispatch(setUserId(id));
  //   //   dispatch(loginUser(username));

  //   //   if (movies) {
  //   //     movies.map((m) => dispatch(setMovies(m)));
  //   //   }
  //   // };
  // };

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
