import { Suspense } from "react";
import PaymentSuccessPage from "@/components/jee_foundation_masterclass/payment/success/page";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
}
