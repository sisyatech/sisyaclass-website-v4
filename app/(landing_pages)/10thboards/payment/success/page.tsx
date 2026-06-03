"use client";

import { Suspense, useEffect } from "react";
import PaymentSuccessPage from "@/components/board/payment/success/page";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("transactionId");
    const amount = params.get("amount");
    if (!transactionId || !amount) {
      window.location.replace("/10thboards");
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f5f8ff] text-[#01327a]">
          Loading payment details...
        </div>
      }
    >
      <PaymentSuccessPage />
    </Suspense>
  );
}

