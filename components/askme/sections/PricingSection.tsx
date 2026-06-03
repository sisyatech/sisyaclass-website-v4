"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";
import LoginModal from "@/components/LoginModal";
import { useUser } from "@/components/UserContext";

type DoubtPackage = {
    id: number;
    name: string;
    description: string;
    doubtCount: number;
    price: string;
    discountedPrice: string | null;
    isActive: boolean;
    sortOrder: number;
};

export default function PricingSection() {
    const router = useRouter();
    const [packages, setPackages] = useState<DoubtPackage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [processingPackageId, setProcessingPackageId] = useState<number | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<DoubtPackage | null>(null);
    const [statusPopup, setStatusPopup] = useState<null | { type: "success" | "error"; message: string }>(null);

    const { user, isLoggedIn } = useUser();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_DOUBT_PACKAGES}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    //console.error("Failed to fetch doubt packages. Status:", res.status);
                    return;
                }

                const json = await res.json();

                if (json?.success && Array.isArray(json.data)) {
                    setPackages(json.data);
                } else {
                    //console.error("Unexpected response from getDoubtPackages:", json);
                }
            } catch (err) {
                //console.error("Error fetching doubt packages:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const createDoubtLead = async (pkg: DoubtPackage, currentUser: any, amount: number, status: string) => {
        try {
            const token = (currentUser as any)?.token;
            const leadPayload = {
                name: currentUser?.name || currentUser?.fullName || "",
                studentClass: currentUser?.grade || currentUser?.studentClass || "",
                email: currentUser?.email || "",
                phone: currentUser?.phone || currentUser?.mobile || "",
                doubtPackageId: pkg.id,
                amount: amount,
                source: "landing_page",
                status: status
            };

            const leadRes = await fetch(`${API_BASE_URL}/student/create_doubt_lead`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(leadPayload),
            });

            const leadJson = await leadRes.json();
            if (leadRes.ok && leadJson?.success && leadJson?.data?.id) {
                // Store leadId in localStorage
                localStorage.setItem("doubtLeadId", leadJson.data.id.toString());
                return leadJson.data.id;
            } else {
                //console.error("[DoubtLead] Failed to create doubt lead:", leadJson);
                return null;
            }
        } catch (err) {
            //console.error("[DoubtLead] Error creating doubt lead:", err);
            return null;
        }
    };

    const updateDoubtLead = async (leadId: string, status: string, failureReason?: string) => {
        try {
            const token = (user as any)?.token;
            const updatePayload: any = {
                leadId: leadId,
                status: status
            };

            if (failureReason) {
                updatePayload.failureReason = failureReason;
            }

            const updateRes = await fetch(`${API_BASE_URL}/student/update_doubt_lead`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(updatePayload),
            });

            const updateJson = await updateRes.json();
            if (!updateRes.ok || !updateJson?.success) {
                //console.error("[DoubtLead] Failed to update doubt lead:", updateJson);
            }
        } catch (err) {
            //console.error("[DoubtLead] Error updating doubt lead:", err);
        } finally {
            // Clear leadId from localStorage after update
            localStorage.removeItem("doubtLeadId");
        }
    };

    const startPayment = async (pkg: DoubtPackage, currentUser: any) => {
        if (typeof window === "undefined") return;

        let doubtLeadId: string | null = null;
        const amountNumber = Number(
            pkg.discountedPrice && pkg.discountedPrice !== "0" ? pkg.discountedPrice : pkg.price
        );

        try {
            setProcessingPackageId(pkg.id);

            const contact =
                (currentUser && (currentUser.phone || currentUser.mobile)) ||
                (typeof window !== "undefined" ? localStorage.getItem("mobileNumber") || "" : "");



            // Create doubt lead before starting payment
            doubtLeadId = await createDoubtLead(pkg, currentUser, amountNumber, "INITIATED");

            const orderRes = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amountNumber,
                    currency: "INR",
                    description: `Doubt Package - ${pkg.name}`,
                    contact,
                }),
            });

            const orderJson = await orderRes.json();
            if (!orderJson?.success) {
                //console.error("[DoubtPayment] Failed to initialize payment:", orderJson);
                setStatusPopup({
                    type: "error",
                    message: "Failed to start payment. Please try again.",
                });
                return;
            }

            const payload = orderJson.data
                ? orderJson.data
                : {
                    order_id: orderJson.order?.id,
                    amount: orderJson.order?.amount,
                    currency: orderJson.order?.currency,
                    key_id: orderJson.keyId,
                    name: "Sisya Class",
                    description: `Doubt Package - ${pkg.name}`,
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
                handler: async function (response: any) {
                    try {
                        const token = (currentUser as any)?.token;
                        //console.log("[DoubtPayment] Using auth token for purchase_doubt_package:", token);
                        if (!currentUser || !currentUser.id) {
                            //console.error("[DoubtPayment] Missing user data for purchaseDoubtPackage");
                            // Update lead status to FAILED
                            if (doubtLeadId) {
                                await updateDoubtLead(doubtLeadId, "FAILED", "Missing user data");
                            }
                            setStatusPopup({
                                type: "error",
                                message: "Could not verify your account. Please log in again.",
                            });
                            return;
                        }

                        const purchaseRes = await fetch(
                            `${API_BASE_URL}/student/purchase_doubt_package`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                                },
                                body: JSON.stringify({
                                    userId: currentUser.id,
                                    packageId: pkg.id,
                                    orderID: response.razorpay_payment_id || payload.order_id || null,
                                    source: "landing_page",
                                }),
                            }
                        );

                        const purchaseJson = await purchaseRes.json();
                        if (purchaseRes.ok && purchaseJson?.success) {
                            // Update lead status to SUCCESS
                            if (doubtLeadId) {
                                await updateDoubtLead(doubtLeadId, "SUCCESS");
                            }
                            router.push(`/askme/payment/success.php?transactionId=${response.razorpay_payment_id}&amount=₹${amountNumber}`);
                        } else {
                            //console.error(
                            //     "[DoubtPayment] purchase_doubt_package failed",
                            //     purchaseJson
                            // );
                            // Update lead status to FAILED
                            if (doubtLeadId) {
                                await updateDoubtLead(doubtLeadId, "FAILED", purchaseJson?.error || "Purchase failed");
                            }
                            router.push(`/askme/payment/failed.php?transactionId=${response.razorpay_payment_id || payload.order_id || 'N/A'}&amount=₹${amountNumber}`);
                        }
                    } catch (err) {
                        //console.error("[DoubtPayment] Error completing purchase:", err);
                        // Update lead status to FAILED
                        if (doubtLeadId) {
                            await updateDoubtLead(doubtLeadId, "FAILED", "Error completing purchase");
                        }
                        router.push(`/askme/payment/failed.php?transactionId=${response?.razorpay_payment_id || payload?.order_id || 'N/A'}&amount=₹${amountNumber}`);
                    } finally {
                        setProcessingPackageId(null);
                    }
                },
                modal: {
                    ondismiss: async function () {
                        //console.warn("[DoubtPayment] Payment modal dismissed by user");
                        // Update lead status to FAILED
                        if (doubtLeadId) {
                            await updateDoubtLead(doubtLeadId, "FAILED", "Payment cancelled by user");
                        }
                        setProcessingPackageId(null);
                        router.push(`/askme/payment/failed.php?transactionId=CANCELLED&amount=₹${amountNumber}`);
                    },
                },
            };

            // @ts-ignore
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err) {
            //console.error("[DoubtPayment] Payment error:", err);
            // Update lead status to FAILED
            if (doubtLeadId) {
                await updateDoubtLead(doubtLeadId, "FAILED", "Payment processing error");
            }
            router.push(`/askme/payment/failed.php?transactionId=ERROR&amount=₹${amountNumber}`);
            setProcessingPackageId(null);
        }
    };

    const handleBuyClick = (pkg: DoubtPackage) => {
        setSelectedPackage(pkg);
        if (!isLoggedIn || !user) {
            setShowLoginModal(true);
        } else {
            startPayment(pkg, user);
        }
    };

    const handleLoginSuccess = (userData: any) => {
        setShowLoginModal(false);
        if (!selectedPackage) return;
        // Give context a moment to update user state
        setTimeout(() => {
            startPayment(selectedPackage, userData || user);
        }, 500);
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <style jsx>{`
                @keyframes tick-draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                .animate-tick-draw {
                    animation: tick-draw 2s ease-out infinite;
                }
                .pricing-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .pricing-card:hover {
                    transform: scale(1.05);
                }
                @media (max-width: 640px) {
                    .mobile-pricing-title {
                        font-size: 20px !important;
                        white-space: nowrap !important;
                    }
                }
            `}</style>
            <section id="pricing" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p
                            className="w-full max-w-[347px] mx-auto"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 600,
                                fontSize: 'clamp(16px, 2.5vw, 19px)',
                                lineHeight: '1.2',
                                letterSpacing: '0px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                textTransform: 'uppercase',
                                color: 'rgba(5, 149, 206, 1)',
                                margin: '0 auto 8px'
                            }}
                        >
                            PRICING
                        </p>
                        <h2
                            className="w-full max-w-[655px] mx-auto mobile-pricing-title"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(28px, 6vw, 49.52px)',
                                lineHeight: '1.2',
                                letterSpacing: '0px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                color: 'rgba(0, 0, 0, 1)',
                                margin: '0 auto 8px'
                            }}
                        >
                            Choose Your Path to Success
                        </h2>
                        <p
                            className="w-full max-w-[395px] mx-auto"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                fontSize: 'clamp(14px, 2vw, 16px)',
                                lineHeight: '1.5',
                                letterSpacing: '0px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                color: 'rgba(96, 118, 141, 1)',
                                margin: '0 auto'
                            }}
                        >
                            Expert mentorship for less than the price of a snack.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6">
                        {packages.map((plan, index) => {
                            const isBestSeller = index === 1;
                            const primaryPrice = plan.discountedPrice && plan.discountedPrice !== "0" ? plan.discountedPrice : plan.price;
                            const originalPrice = plan.discountedPrice && plan.discountedPrice !== "0" ? plan.price : null;

                            // Simple color palette based on index (can be adjusted)
                            const colorPalettes = [
                                {
                                    priceColor: "rgba(233, 139, 139, 1)",
                                    borderColor: "rgba(222, 128, 125, 1)",
                                    buttonBg: "rgba(233, 139, 139, 1)",
                                    checkmarkColor: "rgba(233, 139, 139, 1)",
                                },
                                {
                                    priceColor: "rgba(0, 151, 211, 1)",
                                    borderColor: "rgba(0, 152, 211, 1)",
                                    buttonBg: "rgba(0, 151, 211, 1)",
                                    checkmarkColor: "rgba(0, 151, 211, 1)",
                                },
                                {
                                    priceColor: "rgba(139, 153, 233, 1)",
                                    borderColor: "rgba(114, 120, 215, 1)",
                                    buttonBg: "rgba(139, 153, 233, 1)",
                                    checkmarkColor: "rgba(139, 153, 233, 1)",
                                },
                            ];

                            const palette = colorPalettes[index % colorPalettes.length];

                            const features = [
                                `${plan.doubtCount} Doubts`,
                                plan.description || "Get expert help from mentors",
                                "Valid until used",
                            ];

                            return (
                                <div
                                    key={index}
                                    className="relative bg-white shadow-lg pricing-card w-full max-w-[344px]"
                                    style={{
                                        minHeight: '419px',
                                        border: `3px solid ${palette.borderColor}`,
                                        borderRadius: '40px',
                                        padding: '24px',
                                        paddingTop: isBestSeller ? '36px' : '32px',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    {/* Best Seller Banner */}
                                    {isBestSeller && (
                                        <div
                                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                background: 'rgba(0, 151, 211, 1)',
                                                padding: '6px 20px',
                                                borderRadius: '20px',
                                                zIndex: 10
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 700,
                                                    fontSize: '12px',
                                                    lineHeight: '16px',
                                                    letterSpacing: '0.5px',
                                                    color: 'rgba(255, 255, 255, 1)',
                                                    textTransform: 'uppercase'
                                                }}
                                            >
                                                BEST SELLER
                                            </span>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '24px',
                                            lineHeight: '32px',
                                            letterSpacing: '0px',
                                            color: 'rgba(0, 0, 0, 1)',
                                            marginBottom: '8px',
                                            marginTop: isBestSeller ? '12px' : '0'
                                        }}
                                    >
                                        {plan.name}
                                    </h3>

                                    {/* Subtitle */}
                                    <p
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 400,
                                            fontSize: '13px',
                                            lineHeight: '18px',
                                            letterSpacing: '0px',
                                            color: 'rgba(144, 165, 186, 1)',
                                            marginBottom: '20px',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {plan.doubtCount === 1
                                            ? "PERFECT FOR A QUICK FIX"
                                            : plan.doubtCount <= 10
                                                ? "THE CHOICE OF TOP SCORERS"
                                                : "THE ULTIMATE LEARNING EDGE"}
                                    </p>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <span
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 700,
                                                fontSize: '48px',
                                                lineHeight: '56px',
                                                letterSpacing: '0px',
                                                color: palette.priceColor
                                            }}
                                        >
                                            ₹{primaryPrice}
                                        </span>
                                        {originalPrice && (
                                            <span
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    letterSpacing: '0px',
                                                    color: 'rgba(144, 165, 186, 1)',
                                                    marginLeft: '8px',
                                                    textDecoration: 'line-through',
                                                }}
                                            >
                                                ₹{originalPrice}
                                            </span>
                                        )}
                                        <span
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 400,
                                                fontSize: '16px',
                                                lineHeight: '24px',
                                                letterSpacing: '0px',
                                                color: 'rgba(144, 165, 186, 1)',
                                                marginLeft: '4px'
                                            }}
                                        >
                                            / pack
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <ul className="mb-6 space-y-3 flex-grow">
                                        {features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <div
                                                    className="flex-shrink-0 rounded-full flex items-center justify-center mt-1"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        background: 'rgba(232, 244, 252, 1)',
                                                        marginRight: '12px'
                                                    }}
                                                >
                                                    <svg
                                                        className="animate-tick-draw"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        style={{
                                                            width: '16px',
                                                            height: '12px',
                                                            strokeDasharray: '20',
                                                            strokeDashoffset: '20',
                                                            color: palette.checkmarkColor
                                                        }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span
                                                    style={{
                                                        fontFamily: 'Roboto, sans-serif',
                                                        fontWeight: 400,
                                                        fontSize: '16px',
                                                        lineHeight: '24px',
                                                        letterSpacing: '0px',
                                                        color: 'rgba(0, 0, 0, 1)'
                                                    }}
                                                >
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => handleBuyClick(plan)}
                                        disabled={processingPackageId === plan.id}
                                        className="w-full text-white font-semibold rounded-lg transition-opacity hover:opacity-90 mt-auto disabled:opacity-60 disabled:cursor-not-allowed"
                                        style={{
                                            background: palette.buttonBg,
                                            padding: '12px 24px',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            letterSpacing: '0px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {processingPackageId === plan.id ? "Processing..." : "Buy Now"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Login Modal for authentication before purchase */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />

            {/* Status Popup */}
            {
                statusPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                        <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 sm:p-7">
                            {/* Close button */}
                            <button
                                onClick={() => setStatusPopup(null)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-lg"
                                aria-label="Close"
                            >
                                ×
                            </button>

                            {/* Icon */}
                            <div
                                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${statusPopup.type === "success" ? "bg-emerald-50" : "bg-red-50"
                                    }`}
                            >
                                {statusPopup.type === "success" ? (
                                    <span className="text-emerald-500 text-2xl">✓</span>
                                ) : (
                                    <span className="text-red-500 text-2xl">!</span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-1.5">
                                {statusPopup.type === "success"
                                    ? "Purchase Successful"
                                    : "Something went wrong"}
                            </h3>

                            {/* Message */}
                            <p className="text-sm text-gray-600 text-center mb-4">
                                {statusPopup.message}
                            </p>

                            {/* CTA */}
                            <button
                                onClick={() => setStatusPopup(null)}
                                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    );
}

