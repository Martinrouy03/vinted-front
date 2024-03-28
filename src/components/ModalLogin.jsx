import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const ModalLogin = ({ setVisibility, setConnexion }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [finishLogin, setFinishLogin] = useState(false);
  return (
    <div className="modal-root">
      <form
        className="modal"
        onSubmit={() => {
          useEffect(() => {
            const sendLoginInfo = async () => {
              const token = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                login
              );
              setFinishLogin(true);
              setConnexion(true);
              Cookies.set("token", token, 7);
            };
            sendLoginInfo();
          });
          finishSending && setVisibility([false, false]);
        }}
      >
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(str) => {
            const newLogin = { ...login };
            newLogin.email = str;
            setLogin(newLogin);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(str) => {
            const newLogin = { ...login };
            newLogin.password = str;
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
