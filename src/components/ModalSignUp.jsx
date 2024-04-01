import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const ModalSignUp = ({ setVisibility, setConnexion }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const sendData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        signup
      );
      setConnexion(true);
      setVisibility([false, false]);
      Cookies.set("token", response.data.token, { expires: 7 });
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <div
      className="modal-root"
      onMouseDown={() => {
        setVisibility([false, false]);
      }}
    >
      <form
        className="modal"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
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
        {errorMessage && (
          <p style={{ fontSize: "14px", color: "red" }}>{errorMessage}</p>
        )}
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
