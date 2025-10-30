import { Suspense } from "react";
import PaymentSuccessPage from "@/components/3daylp/payment/success/page";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
}


