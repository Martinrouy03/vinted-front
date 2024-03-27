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
      <nav className="container">
        <ul>
          <li>Femmes</li>
          <li>Hommes</li>
          <li>Enfants</li>
          <li>Maison</li>
          <li>Divertissement</li>
          <li>Animaux</li>
          <li>A propos</li>
          <li>Notre plateforme</li>
        </ul>
      </nav>
      <div className="hero">
        <img
          src="https://lereacteur-vinted.netlify.app/static/media/hero.2c66d85a1335550c4518.jpg"
          alt=""
        />
        <div className="container">
          <div className="start-div">
            <h2>Prêts à faire du tri dans vos placards?</h2>
            <button className="green">Commencer à vendre</button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
