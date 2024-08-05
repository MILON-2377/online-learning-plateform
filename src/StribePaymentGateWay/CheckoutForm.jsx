"use client";

import { useAuth } from "@/AuthProvider/AuthProvider";
import axiosSecureApi from "@/Hooks/ApiRelatedHooks/AxiosSecureApi";
import { addPayment } from "@/redux/reduxReducer/AddCourses/allCoursesSlicer";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const stribePromise = loadStripe(process.env.NEXT_PUBLIC_STRIBE_PUBLISH_KEY);

function CheckoutForm() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const stribe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const price = useSelector((state) => state.courseReducer.totalPrice);

  // handle client secret
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecureApi.post("/create-payment-intent", {
          price,
        });
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [price]);

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
            name: user?.userName || "anynonimus",
            email: user?.email || "anyonimus@gmail.com",
          },
        },
      }
    );

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      dispatch(addPayment(true));
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-5 ">
      <label>
        <span className="text-xl font-semibold text-cyan-500 ">
          Card Number
        </span>
        <span className="text-xl font-semibold text-cyan-500 "></span>
      </label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "black",
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

      {processing ? (
        <>
          <div className="px-4 py-3 bg-blue-500 justify-center flex items-center gap-1 rounded-md text-white ">
            <span className="text-white">Procceessing</span>
            <span className="loading loading-spinner text-secondary"></span>
          </div>
        </>
      ) : (
        <button
          type="submit"
          disabled={processing || !stribe}
          className="px-4 py-3 text-white bg-blue-500 rounded-md font-semibold transition-all duration-200 hover:bg-indigo-500 active:scale-95 "
        >Pay</button>
      )}

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
