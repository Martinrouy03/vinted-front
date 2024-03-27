import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isDownloading, setIsDownloading] = useState(true);
  const url = "https://lereacteur-vinted-api.herokuapp.com/offer/" + id;
  const fetchData = async () => {
    const response = await axios.get(url);
    setOffer(response.data);
    setIsDownloading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(offer);
  return (
    <>
      {isDownloading ? (
        <div>En cours de téléchargement</div>
      ) : (
        <div className="offer-page">
          <div className="container">
            <img src={offer.product_pictures[0].url} alt="photo" />
            <div className="right-panel">
              <span>{offer.product_price} €</span>
              <section className="product-details">
                {offer.product_details.map((property) => {
                  return (
                    <div>
                      <div className="key">{Object.keys(property)}</div>
                      <div className="value">
                        {property[Object.keys(property)]}
                      </div>
                    </div>
                  );
                })}
              </section>
              <div className="description">
                <h2>{offer.product_name}</h2>
                <p>{offer.product_description}</p>
                <div className="owner2">
                  {Object.keys(offer.owner.account).includes("avatar") && (
                    <img src={offer.owner.account.avatar.url} alt="avatar" />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
              </div>
              <button className="green">Acheter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Offer;
