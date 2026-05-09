import { Suspense } from "react";
import PaymentFailedPage from "@/components/vadic-maths/payment/failed/page";

export const dynamic = "force-dynamic";

export default function FailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentFailedPage />
    </Suspense>
  );
}
