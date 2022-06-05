export const HandleValidation = (
  userName,
  Password,
  setUserInput,
  setUserError,
  setPassInput,
  setPassError
) => {
  const uLen = userName.length;
  const pLen = Password.length;
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
    return true;
  }
};
