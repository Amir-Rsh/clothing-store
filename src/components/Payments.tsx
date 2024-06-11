import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

export default function Payments() {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.get("https://be-e-commerce.onrender.com/config").then((response) => {
      const publishableKey = response.data.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    axios
      .post("https://be-e-commerce.onrender.com/create-payment-intent", {})
      .then((result) => {
        const clientSecret = result.data.clientSecret;

        setClientSecret(clientSecret);
      });
  }, []);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
