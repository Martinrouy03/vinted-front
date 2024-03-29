import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const ModalSignUp = ({ setVisibility, setConnexion }) => {
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });
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
          const sendData = async () => {
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                signup
              );
              setConnexion(true);
              Cookies.set("token", response.data.token, { expires: 7 });
            } catch (error) {
              console.log(error);
            }
          };
          sendData();
          setVisibility([false, false]);
        }}
      >
        <h1>S'incrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            const newLogin = { ...signup };
            newLogin.username = event.target.value;
            setSignup(newLogin);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            const newLogin = { ...signup };
            newLogin.email = event.target.value;
            setSignup(newLogin);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            const newLogin = { ...signup };
            newLogin.password = event.target.value;
            setSignup(newLogin);
          }}
        />
        <div
          className="newsletter"
          onClick={() => {
            const newLogin = { ...signup };
            newLogin.newsletter = !newLogin.newsletter;
            setSignup(newLogin);
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
        <button
          onClick={() => {
            setVisibility([false, true]);
          }}
        >
          Tu as déjà un compte? Connecte-toi!
        </button>
      </form>
    </div>
  );
};
export default ModalSignUp;
