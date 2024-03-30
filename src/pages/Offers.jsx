import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offers = ({ query, state }) => {
  const [filteredOffers, setFilteredOffers] = useState({});
  const [isDownloading, setIsDownloading] = useState(true);
  let url =
    "https://lereacteur-vinted-api.herokuapp.com/offers?priceMin=" +
    state.values[0] +
    "&priceMax=" +
    state.values[1];
  const fetchFilteredData = async () => {
    url = query ? url + "&title=" + query : url;
    const response = await axios.get(url);
    setFilteredOffers(response.data);
    setIsDownloading(false);
  };
  useEffect(() => {
    fetchFilteredData();
  }, [query, state]);
  return (
    <>
      {isDownloading ? (
        <div>En cours de téléchargement</div>
      ) : (
        <main className="container">
          {filteredOffers.offers.map((offer) => {
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
          })}
        </main>
      )}
    </>
  );
};
export default Offers;
