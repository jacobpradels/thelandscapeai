"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";
import { Camera } from "lucide-react"

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({
  priceId,
  isFeatured,
  mode = "payment",
  init = true,
}: {
  priceId: string;
  isFeatured: boolean;
  mode?: "payment" | "subscription";
  init?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-checkout",
        {
          priceId,
          successUrl: window.location.href,
          cancelUrl: window.location.href,
          mode,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <button
      className={`btn btn-primary btn-block group ${isFeatured ? "animated-gradient-background": ""}`}
      onClick={() => handlePayment()}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
       <Camera className="w-4 h-4"/>
      )}
      {init ? `Get ${config?.appName}` : "Add credits"}
    </button>
  );
};

export default ButtonCheckout;
