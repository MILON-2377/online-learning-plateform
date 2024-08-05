"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stribePromise = loadStripe(process.env.NEXT_PUBLIC_STRIBE_PUBLISH_KEY);

function CheckoutForm() {
  const stribe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stribe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    setProcessing(true);

    const { error, paymentIntent } = await stribe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.userName,
            email: user?.email,
          },
        },
      }
    );

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("payment succeed");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-5 ">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <button
        type="submit"
        disabled={processing || !stribe}
        className="px-4 py-3 text-white bg-blue-500 rounded-md font-semibold transition-all duration-200 hover:bg-indigo-500 active:scale-95 "
      >
        Pay
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default function CheckOut() {
  return (
    <Elements stripe={stribePromise}>
      <CheckoutForm />
    </Elements>
  );
}
