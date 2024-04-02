import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CheckoutForm = ({ price, title }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let total = (price + 0.4 + 0.8).toFixed(1);

  // Récupération du contenu des inputs:
  const elements = useElements();
  // Pour faire la requête à Stripe:
  const stripe = useStripe();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (elements == null) {
      return;
    }
    // Vérification des inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log(submitError);
      //   setErrorMessage(submitError.message);
      return;
    }

    // Demande de création de paiment
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
      {
        amount: Number((price * 100).toFixed(0)),
        currency: "eur",
        description: title,
      }
    );
    console.log(response.data);
    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    try {
      const stripeResp = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });
      // Si erreur pendant confirmation
      if (stripeResp.error) {
        // On la montre au client
        setErrorMessage(stripeResp.error.message);
      }
      if (stripeResp.paymentIntent.status === "succeeded") {
        setIsCompleted(true);
      }
      // Chargement terminé:
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  return isCompleted ? (
    <>
      <br />
      <h1>Paiement effectué!</h1>
      <br />
      <br />
      <br />
      <Link to="/" style={{ color: "blue" }}>
        <h1>Continuez vos achats, par ici!</h1>
      </Link>
    </>
  ) : (
    <div className="payment-page">
      <div className="payment-container">
        <form onSubmit={handleSubmit}>
          <p>Résumé de la commande</p>
          <div className="price-details">
            <div className="price-line">
              <p>Commande</p>
              <span>{price} €</span>
            </div>
            <div className="price-line">
              <p>Frais protection acheteurs</p>
              <span>0.40 €</span>
            </div>
            <div className="price-line">
              <p>Frais de port</p>
              <span>0.80 €</span>
            </div>
          </div>
          <div className="payment-details">
            <div className="total-line">
              <h3>Total</h3>
              <em>{total} €</em>
            </div>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <em>{title}</em>. Vous allez payer <em>{total} €</em> (frais de
              protection et frais de port inclus).
            </p>
          </div>
          <PaymentElement></PaymentElement>
          <button type="submit" disabled={!stripe || !elements || isLoading}>
            Payer
          </button>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};
export default CheckoutForm;
