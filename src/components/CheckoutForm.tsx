import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/completion` },
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("payment status: " + paymentIntent.status);
      navigate("/completion");
    } else {
      setMessage("unexpected state");
    }
    setIsProcessing(false);
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={isProcessing} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
      </form>
    </>
  );
}
