import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ limit, state, sort, setLimit, str }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?limit=${limit}&page=${page}&title=${str}&priceMin=${state.values[0]}&priceMax=${state.values[1]}&sort=${sort}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [str, state, sort, page]);

  const pageNbLoop = (nb) => {
    let pageDivs = [];
    for (let i = 1; i <= nb; i++) {
      pageDivs.push(
        <button
          key={i}
          onClick={() => {
            setPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return pageDivs;
  };
  let pageNb = Math.ceil(data.count / limit);
  return isLoading ? (
    <div>En cours de chargment</div>
  ) : (
    <>
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
      <div className="pages-nav container">
        <label htmlFor="nb-max">Nombre d'articles par page: </label>
        <select
          name="nb-max"
          onChange={(e) => {
            setLimit(e.target.value);
          }}
        >
          <option value={data.count}>Tous</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        {limit < data.count && (
          <div className="page-buttons">
            <p>Aller à la page: </p>
            {pageNbLoop(pageNb)}
          </div>
        )}
      </div>
      <main className="container">
        {data.count === 0 ? (
          <p>Désolé, aucune article ne correspond à votre recherche...</p>
        ) : (
          data.offers.map((offer) => {
            return (
              <Link
                to={"/offer/" + offer._id}
                key={offer._id}
                className="offer"
              >
                <div className="owner">
                  {Object.keys(offer.owner.account).includes("avatar") && (
                    <img src={offer.owner.account.avatar.url} alt="avatar" />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <img src={offer.product_pictures[0].url} alt="photo" />
                <div className="bottom">
                  <div className="price-and-likes">
                    <p>{offer.product_price.toFixed(2)} €</p>
                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                  </div>
                  <div className="total-price">
                    <p>{(offer.product_price + 2).toFixed(2)} € incl.</p>
                    <span>logo</span>
                  </div>
                  <span>{offer.product_details[1].TAILLE}</span>
                  <span>{offer.product_details[0].MARQUE}</span>
                </div>
              </Link>
            );
          })
        )}
      </main>
    </>
  );
};
export default Home;
