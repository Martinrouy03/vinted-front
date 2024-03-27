import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data.offers);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="container">
      {data.map((offer) => {
        return (
          <Link to={"/offer/" + offer._id} key={offer._id} className="offer">
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
                <div className="likes">coeur</div>
              </div>
              <div className="total-price">
                <a href="">{(offer.product_price + 2).toFixed(2)} € incl.</a>
                <span>logo</span>
              </div>
              <span>{offer.product_details[1].TAILLE}</span>
              <span>{offer.product_details[0].MARQUE}</span>
            </div>
          </Link>
        );
      })}
    </main>
  );
};
export default Home;
