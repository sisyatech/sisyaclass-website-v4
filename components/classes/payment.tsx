import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Image from "next/image";
import LoginModal from "../LoginModal";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";
import { useUser } from "@/components/UserContext";

interface BigCourseData {
  id: number;
  courseDemoPrice: number;
  webLabel: string;
  bigCourse: {
    name: string;
    startDate: string;
    price: number;
    currentPrice: number;
    partialPrice: number;
  };
}

interface NewSectionProps {
  gradeNumber?: number;
}

const NewSection = ({ gradeNumber }: NewSectionProps) => {
  const searchParams = useSearchParams();
  const { user, isLoggedIn } = useUser();
  const [courseData, setCourseData] = useState<BigCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "part">("full");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!gradeNumber) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_BIG_COURSE_BY_GRADE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grade: gradeNumber.toString(),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const desiredLabel = (searchParams?.get('course') || '').toLowerCase();
            let picked = data[0];
            if (desiredLabel) {
              const exact = data.find((d:any)=>String(d?.webLabel||'').toLowerCase() === desiredLabel);
              const partial = exact || data.find((d:any)=>String(d?.webLabel||'').toLowerCase().includes(desiredLabel));
              if (partial) picked = partial;
            }
            setCourseData(picked);
          }
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [gradeNumber, searchParams]);

  const handleMakePayment = () => {
    console.log("Make Payment clicked for grade:", gradeNumber, "Payment method:", paymentMethod);

    if (isLoggedIn && user) {
      // User is logged in, proceed with actual payment
      console.log("User is logged in, proceeding with payment:", user.name);
      processPayment();
    } else {
      // User is not logged in, show login modal
      console.log("User not logged in, showing login modal");
      setShowLoginModal(true);
    }
  };

  const processPayment = async () => {
    try {
      console.log("[PAYMENT] Starting flow (Course Payment)", { gradeNumber, selectedPrice });
      const contactFromUser = (user as any)?.phone || (user as any)?.mobile || "";
      const contactFromStorage = typeof window !== 'undefined' ? (localStorage.getItem("mobileNumber") || "") : "";
      const contact = contactFromUser || contactFromStorage;

      // 1) Create registration lead
      try {
        const leadRes = await fetch("https://sisyaclass.xyz/student/new_reg_lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: (user as any)?.name || "SISYA Course Payment",
            phone: contact,
            class: gradeNumber ? String(gradeNumber) : "course",
            status: "initiated",
          }),
        });
      const leadJson = await leadRes.json();
      console.log("[PAYMENT] Lead response", leadJson);
        if (leadJson?.success && leadJson?.lead?.id) {
          localStorage.setItem("leadId", leadJson.lead.id);
        console.log("[PAYMENT] Lead stored", { leadId: leadJson.lead.id });
        } else {
          console.warn("[Course Payment] Lead creation failed", leadJson);
        }
      } catch (e) {
        console.warn("[Course Payment] Lead request error", e);
      }

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedPrice, currency: "INR", description: `Course Payment - Class ${gradeNumber} (${paymentMethod})`, contact }),
      });
      const orderJson = await orderRes.json();
      console.log("[PAYMENT] Order API response", orderJson);
      if (!orderJson?.success) {
        alert("Failed to initialize payment. Please try again.");
        return;
      }

      const payload = orderJson.data ? orderJson.data : {
        order_id: orderJson.order?.id,
        amount: orderJson.order?.amount,
        currency: orderJson.order?.currency,
        key_id: orderJson.keyId,
        name: "Sisya Class",
        description: `Course Payment - Class ${gradeNumber} (${paymentMethod})`,
        prefill: { contact },
      };

      const options: any = {
        key: payload.key_id,
        amount: payload.amount,
        currency: payload.currency,
        name: payload.name,
        description: payload.description,
        order_id: payload.order_id,
        prefill: payload.prefill,
        handler: function (response: any) {
          const amountLabel = `₹${selectedPrice}`;
          window.location.href = `/payment/success?transactionId=${encodeURIComponent(
            response.razorpay_payment_id || ""
          )}&amount=${encodeURIComponent(amountLabel)}&returnUrl=${encodeURIComponent(gradeNumber ? `/class-${gradeNumber}` : '/')}`;
        },
        modal: {
          ondismiss: function () {
            window.location.href = `/payment/failed?transactionId=${encodeURIComponent(
              `DISMISSED_${Date.now()}`
            )}&returnUrl=${encodeURIComponent(gradeNumber ? `/class-${gradeNumber}` : '/')}`;
          },
        },
      };

      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      console.log("[PAYMENT] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      console.error("[Course Payment] Payment error", err);
      alert("Network error. Please try again.");
    } finally {
      console.log("[PAYMENT] Flow ended");
    }
  };

  const handleLoginSuccess = (userData: any) => {
    console.log("Payment: Login successful, user data:", userData);
    setShowLoginModal(false);
    // Proceed with payment after successful login
    setTimeout(() => {
      processPayment();
    }, 500);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-auto min-h-[600px] w-full items-center justify-center bg-[#DDDEFE80] py-20">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#0595CE]"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  // Don't render if no course data
  if (!courseData) {
    return null;
  }

  // Calculate payment details based on selected payment method
  const fullPrice = courseData.bigCourse.currentPrice;
  const partPrice = courseData.bigCourse.partialPrice;
  const selectedPrice = paymentMethod === "full" ? fullPrice : partPrice;

  const gstRate = 0.18;
  const priceWithoutGST = (selectedPrice / (1 + gstRate)).toFixed(2);
  const gstAmount = (selectedPrice - parseFloat(priceWithoutGST)).toFixed(2);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 -mt-1 flex h-auto min-h-[600px] w-full flex-col items-center justify-center bg-[#DDDEFE80] px-2 py-8 opacity-100 delay-1000 duration-700 sm:-mt-12 sm:min-h-[700px] sm:px-4 sm:py-12 md:-mt-16 md:min-h-[800px] md:px-6 md:py-16 lg:-mt-19 lg:min-h-[700px] lg:px-8 xl:min-h-[809px]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      {/* Course Details Title - Outside container on mobile/tablet, inside on desktop */}
      <h1 className="animate-in fade-in slide-in-from-top-4 mb-4 block text-xl font-bold text-gray-800 delay-1100 duration-500 sm:mb-6 sm:text-2xl md:text-3xl lg:hidden">
        Course Details
      </h1>

      {/* Inner Container */}
      <div className="animate-in fade-in zoom-in-95 relative mt-4 h-auto min-h-[500px] w-full max-w-[95vw] rounded-[16px] bg-white p-3 opacity-100 shadow-[2px_2px_10px_0px_rgba(0,0,0,0.25)] delay-1200 duration-700 sm:mt-6 sm:min-h-[550px] sm:max-w-[90vw] sm:rounded-[20px] sm:p-4 md:mt-8 md:min-h-[600px] md:max-w-[1136px] md:p-6 lg:mt-30 lg:min-h-[551px] lg:rounded-[22px] lg:p-8">
        {/* Course Details Title - Inside container on desktop only */}
        <h1 className="animate-in fade-in slide-in-from-left-4 -mt-16 mb-4 hidden text-xl font-bold text-gray-800 delay-1300 duration-500 sm:-mt-18 sm:mb-6 sm:text-2xl md:-mt-20 md:text-3xl lg:block">
          Course Details
        </h1>

        {/* Two Column Layout */}
        <div className="relative mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-4 md:mt-8 md:gap-6 lg:mt-18 lg:grid-cols-2 lg:gap-8">
          {/* Vertical Divider Line - Hidden on mobile and tablet */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 transform bg-[#E8E8E8] lg:block"></div>

          {/* Left Column - Features and Batch Details */}
          <div className="animate-in fade-in slide-in-from-left-6 space-y-3 delay-1400 duration-700 sm:space-y-4 md:space-y-5 lg:space-y-6">
            {/* Batch Start Date */}

            <div className="flex h-auto w-full items-center justify-center rounded-[8px] border-[1.5px] border-dashed border-[#0595CE] bg-[#EAF4F9] px-3 py-1 opacity-100 sm:rounded-[10px] sm:border-[1.7px] sm:px-4">
              {" "}
              {/* Added flex items-center justify-center, removed min-h */}
              <span className="text-xs font-medium text-[#0595CE] sm:text-sm md:text-base">
                Batch Start date: {formatDate(courseData.bigCourse.startDate)}
              </span>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="mb-2 text-base font-bold text-[#575CFB] sm:mb-3 sm:text-lg md:mb-4 md:text-xl lg:text-2xl">
                Features
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">
                    In Class doubt-Solving
                  </span>
                </div>
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">1-1 Mentorship</span>
                </div>
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] bg-[#EDEEFE80] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">
                    Live Classes by IIT/NIT Educators
                  </span>
                </div>
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] bg-[#EDEEFE80] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">
                    Motivational Classes
                  </span>
                </div>
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">
                    Class Materials
                  </span>
                </div>
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">
                    Study Materials
                  </span>
                </div>
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] bg-[#EDEEFE80] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">Assignments</span>
                </div>
                <div className="flex items-center space-x-2 rounded border-2 border-[#E8E8E8] bg-[#EDEEFE80] p-2">
                  <Image
                    src="/grades/verify.svg"
                    alt="Check"
                    width={22}
                    height={22}
                    className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                  />
                  <span className="text-xs text-black sm:text-sm md:text-base">
                    Access to SISYA AI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Information */}
          <div className="animate-in fade-in slide-in-from-right-6 space-y-3 delay-1400 duration-700 sm:space-y-4 md:space-y-5 lg:space-y-6">
            {/* Choose Payment Method */}
            <div>
              <h3 className="font-montserrat mb-2 text-xs leading-none font-medium tracking-[0.01em] text-[#ABABAB] sm:mb-3 sm:text-[13.41px]">
                Choose payment method
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={() => setPaymentMethod("full")}
                  className="flex w-full items-center space-x-2 text-left sm:space-x-3"
                >
                  <div
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-[1.34px] border-[#ABABAB] sm:h-5 sm:w-5 ${paymentMethod === "full" ? "bg-[#0595CE]" : ""}`}
                  >
                    {paymentMethod === "full" && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2"></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 sm:text-base">
                    Full payment (₹{fullPrice})
                  </span>
                  <span className="flex-shrink-0 rounded border border-red-300 bg-red-100 px-1.5 py-0.5 text-xs text-red-600 sm:px-2 sm:py-1">
                    Recommended
                  </span>
                </button>
                <button
                  onClick={() => setPaymentMethod("part")}
                  className="flex w-full items-center space-x-2 text-left sm:space-x-3"
                >
                  <div
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-[1.34px] border-[#ABABAB] sm:h-5 sm:w-5 ${paymentMethod === "part" ? "bg-[#0595CE]" : ""}`}
                  >
                    {paymentMethod === "part" && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2"></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 sm:text-base">
                    Part payment (₹{partPrice})
                  </span>
                </button>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="font-montserrat mb-2 text-xs leading-none font-medium tracking-[0.01em] text-[#ABABAB] sm:mb-3 sm:text-[13.41px]">
                Payment details
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between">
                  <span className="font-montserrat flex-1 pr-2 text-xs leading-tight font-normal tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    Course price (excluding GST)
                  </span>
                  <span className="font-montserrat flex-shrink-0 text-right text-xs leading-none font-semibold tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    ₹ {priceWithoutGST}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-montserrat flex-1 pr-2 text-xs leading-tight font-semibold tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    Coupon applied
                  </span>
                  <span className="font-montserrat flex-shrink-0 text-right text-xs leading-none font-semibold tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    - ₹0
                  </span>
                </div>
                {/* Divider line between Coupon applied and Final amount */}
                <div className="my-3 border-t border-gray-300 sm:my-4"></div>
                <div className="flex items-start justify-between">
                  <span className="font-montserrat flex-1 pr-2 text-xs leading-tight font-semibold tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    Final amount
                  </span>
                  <span className="font-montserrat flex-shrink-0 text-right text-xs leading-none font-semibold tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    ₹ {priceWithoutGST}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-montserrat flex-1 pr-2 text-xs leading-tight font-normal tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    GST (18%)
                  </span>
                  <span className="font-montserrat flex-shrink-0 text-right text-xs leading-none font-semibold tracking-[0.01em] text-[#1F1F39] sm:text-sm md:text-[16.1px]">
                    ₹{gstAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="border-t pt-3 sm:pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-[#0595CE] sm:text-xl">Total Amount</span>
                <span className="text-lg font-bold text-[#0595CE] sm:text-xl">
                  ₹{selectedPrice}
                </span>
              </div>
            </div>

            {/* Make Payment Button */}
            <div className="flex justify-center pt-2 sm:pt-4 lg:justify-start">
              <button
                onClick={handleMakePayment}
                className="font-roboto h-[40px] w-full max-w-[200px] cursor-pointer rounded-[25px] bg-[#0595CE] text-center text-sm leading-none font-medium tracking-normal text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#047aa8] sm:h-[45px] sm:max-w-[220px] sm:rounded-[30px] sm:text-base md:h-[52px] md:max-w-[233px] lg:ml-34 lg:h-[59px] xl:ml-40"
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLoginSuccess={handleLoginSuccess}
        selectedClass={gradeNumber}
      />
    </div>
  );
};

export default NewSection;
