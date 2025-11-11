"use client";

import { useEffect } from "react";
import PaymentSuccessPage from "@/components/3worksheet/payment/success/page";

export default function SuccessPageRoute() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("transactionId");
    const amount = params.get("amount");
    if (!transactionId || !amount) {
      window.location.replace("/3worksheet");
    }
  }, []);

  return <PaymentSuccessPage />;
}