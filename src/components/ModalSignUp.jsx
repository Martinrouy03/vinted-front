import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const ModalSignUp = ({ setVisibility }) => {
  const [login, setLogin] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const [finishSending, setFinishSending] = useState(false);
  return (
    <div className="modal-root">
      <form
        className="modal"
        onSubmit={() => {
          useEffect(() => {
            const sendData = async () => {
              const token = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                login
              );
              setFinishSending(true);
              Cookies.set("token", token);
            };
            sendData();
          });
          finishSending && setVisibility([false, false]);
        }}
      >
        <h1>S'incrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(str) => {
            const newLogin = { ...login };
            newLogin.username = str;
            setLogin(newLogin);
          }}
        />
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
        <div
          className="newsletter"
          onClick={() => {
            const newLogin = { ...login };
            newLogin.newsletter = !newLogin.newsletter;
            setLogin(newLogin);
          }}
        >
          <input type="checkbox" />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <p>
          En s'inscrivant je confirme ne jamais lire les Termes & Conditions et
          Politique de Confidentialité de Vinted, dont je me contrefous comme de
          l'an 40. Je confirme avoir au moins 18 ans, bah oui.
        </p>
        <input
          type="submit"
          className="green"
          value="S'inscrire"
          //   onClick={}
        />
        <Link
          to="/login"
          onClick={() => {
            setVisibility([false, true]);
          }}
        >
          Tu as déjà un compte? Connecte-toi!
        </Link>
      </form>
    </div>
  );
};
export default ModalSignUp;
