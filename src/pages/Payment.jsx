import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: Number((location.state.price * 100).toFixed(0)),
    // Devise de la transaction
    currency: "eur",
    title: location.state.title,
  };
  //   console.log(options);
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm price={location.state.price} title={location.state.title} />
    </Elements>
  );
};
export default Payment;
