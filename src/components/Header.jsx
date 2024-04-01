import logo from "../assets/vinted_logo.svg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Range } from "react-range";

const Header = ({
  visibility,
  setVisibility,
  isConnected,
  setConnexion,
  str,
  state,
  sort,
  setStr,
  setState,
  setSort,
  setIsPublishing,
}) => {
  const navigate = useNavigate();
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
              <div className="search-input">
                <button type="submit">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </button>
                <input
                  type="text"
                  value={str}
                  placeholder="Rechercher des articles"
                  onChange={(event) => {
                    setStr(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="price-range-container">
              <select
                name="priceOrder"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="">Trier par prix:</option>
                <option value="price-asc">croissant</option>
                <option value="price-desc">décroissant</option>
              </select>
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
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
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
                navigate("/");
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
            </div>
          )}

          <button
            className="green"
            id="sell"
            onClick={() => {
              if (isConnected) {
                navigate("/publish");
              } else {
                setIsPublishing(true);
                setVisibility([false, true]);
              }
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
