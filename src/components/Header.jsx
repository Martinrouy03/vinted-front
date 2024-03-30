import logo from "../assets/vinted_logo.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Range } from "react-range";
import { useState } from "react";
const Header = ({
  visibility,
  setVisibility,
  isConnected,
  setConnexion,
  setQuery,
  state,
  setState,
}) => {
  const navigate = useNavigate();
  const [str, setStr] = useState("");
  const valueMin = String(state.values[0] * 2 - 10) + "px";
  const valueMax = String(state.values[1] * 2) + "px";
  return (
    <header>
      <div className="bandeau">
        <div className="container">
          <Link to="/">
            <img src={logo} alt="vinted_logo" />
          </Link>

          <div className="queries">
            <div className="search-bar">
              <form
                className="search-input"
                onSubmit={(event) => {
                  event.preventDefault();
                  setQuery(str);
                  setStr("");
                  navigate("/offers");
                }}
              >
                <button type="submit">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </button>
                <input
                  type="text"
                  value={str}
                  placeholder="Rechercher des articles"
                  onChange={(event) => {
                    setStr(event.target.value);
                    navigate("/offers");
                  }}
                />
              </form>
            </div>
            <div className="price-range-container">
              <span>Prix entre: </span>
              <div className="price-range">
                <div className="labels">
                  <output
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: valueMin,
                      padding: "2px",
                      borderRadius: "5px",
                      backgroundColor: "#09b1ba",
                      color: "white",
                      fontSize: "12px",
                    }}
                    id="output"
                  >
                    {Math.ceil(state.values[0])} €
                  </output>
                  <output
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: valueMax,
                      padding: "2px",
                      borderRadius: "5px",
                      backgroundColor: "#09b1ba",
                      color: "white",
                      fontSize: "12px",
                    }}
                    id="output"
                  >
                    {Math.ceil(state.values[1])} €
                  </output>
                </div>
                <Range
                  step={0.1}
                  min={0}
                  max={100}
                  values={state.values}
                  onChange={(values) => {
                    setState({ values });
                    navigate("/offers");
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      ref={props.ref}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        backgroundColor: "#09b1ba",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          {isConnected ? (
            <button
              id="deconnexion"
              onClick={() => {
                setConnexion(false);
                Cookies.remove("token");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <div className="buttons">
              <button
                className="green"
                onClick={() => {
                  const newVals = [...visibility];
                  newVals[0] = true;
                  setVisibility(newVals);
                }}
              >
                S'inscrire
              </button>
              <button
                className="green"
                onClick={() => {
                  const newVals = [...visibility];
                  newVals[1] = true;
                  setVisibility(newVals);
                }}
              >
                Se connecter
              </button>
              {/* <button className="green">Vends tes articles</button>
            <button>?</button> */}
            </div>
          )}
          <select name="language" id="">
            <option value="French">FR</option>
            <option value="English">EN</option>
            <option value="Spanish">SP</option>
            <option value="Dutch">DE</option>
          </select>
        </div>
      </div>
    </header>
  );
};
export default Header;
