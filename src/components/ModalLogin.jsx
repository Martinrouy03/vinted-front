import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalLogin = ({
  setVisibility,
  setConnexion,
  isPublishing,
  setIsPublishing,
}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const sendLoginInfo = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        login
      );
      setConnexion(true);
      setVisibility([false, false]);
      console.log(isPublishing);
      if (isPublishing) {
        setIsPublishing(false);
        navigate("/publish");
      }
      Cookies.set("token", response.data.token, 7);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisibility([false, false]);
      }}
    >
      <form
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          sendLoginInfo();
        }}
      >
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            const newLogin = { ...login };
            newLogin.email = event.target.value;
            setLogin(newLogin);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            const newLogin = { ...login };
            newLogin.password = event.target.value;
            setLogin(newLogin);
          }}
        />
        {errorMessage && (
          <p style={{ fontSize: "14px", color: "red" }}>{errorMessage}</p>
        )}
        <input type="submit" className="green" value="Se connecter" />
        <button
          onClick={() => {
            setVisibility([true, false]);
          }}
        >
          Pas encore de compte? Inscris-toi!
        </button>
      </form>
    </div>
  );
};
export default ModalLogin;
