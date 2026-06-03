import { Suspense } from "react";
import PaymentSuccessPage from "@/components/payment/success/page";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <PaymentSuccessPage />
    </Suspense>
  );
}


