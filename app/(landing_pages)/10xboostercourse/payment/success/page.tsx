import { Suspense } from "react";
import SuccessComponent from "@/components/10xboostercourse/payment/success/page";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <SuccessComponent />
    </Suspense>
  );
}


