import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const ModalLogin = ({ setVisibility, setConnexion }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="modal-root">
      <form
        className="modal"
        onSubmit={(e) => {
          e.preventDefault();
          const sendLoginInfo = async () => {
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                login
              );
              setConnexion(true);
              Cookies.set("token", response.data.token, 7);
            } catch (error) {
              console.log(error);
            }
          };
          sendLoginInfo();
          setVisibility([false, false]);
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
