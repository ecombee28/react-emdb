export const HandleSignUpValidation = (
  setError,
  userNameInput,
  password,
  confirmPassword,
  setUserInput,
  setUserError,
  setPassInput,
  setPassError
) => {
  setError(false);
  const uLen = userNameInput.length;
  const pLen = password.length;
  const conPLen = confirmPassword.length;
  let userValPass = false;
  let passValPass = false;
  let conPassValPass = false;

  if (uLen > 3 && uLen <= 12) {
    userValPass = true;
    setUserInput(true);
  } else {
    userValPass = false;
    setUserInput(false);
    setUserError("Username must be between 4 and 12 characters long");
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
    return true;
  }
};
