import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SignIn(
  setLoading,
  userNameInput,
  password,
  setError,
  setPassword
) {
  const navigate = useNavigate();
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
}
