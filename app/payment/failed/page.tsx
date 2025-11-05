import { Suspense } from "react";
import PaymentFailedPage from "@/components/payment/failed/page";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <PaymentFailedPage />
    </Suspense>
  );
}


