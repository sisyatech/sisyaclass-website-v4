import { Suspense } from "react";
import PaymentFailedPage from "@/components/3daylp/payment/failed/page";

export default function FailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentFailedPage />
    </Suspense>
  );
}


