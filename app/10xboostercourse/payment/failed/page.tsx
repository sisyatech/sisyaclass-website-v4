import { Suspense } from "react";
import FailedComponent from "@/components/10xboostercourse/payment/failed/page";

export default function FailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <FailedComponent />
    </Suspense>
  );
}


