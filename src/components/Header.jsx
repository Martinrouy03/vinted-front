import logo from "../assets/vinted_logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="bandeau">
        <div className="container">
          <Link to="/">
            <img src={logo} alt="vinted_logo" />
          </Link>
          <div className="search-bar">
            <select name="search-type" id="">
              <option value="articles">Articles</option>
              <option value="membres">Membres</option>
              <option value="aide">Centre d'aide</option>
            </select>

            <div className="search-input">
              <input type="text" placeholder="Rechercher des articles" />
            </div>
          </div>
          <div className="buttons">
            <button>S'inscrire | Se connecter</button>
            <button className="green">Vends tes articles</button>
            <button>?</button>
          </div>
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
