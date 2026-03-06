import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const amount = Number(body?.amount ?? 0);
    const currency = (body?.currency as string) || "INR";
    const receipt = (body?.receipt as string) || `rcpt_${Date.now()}`;
    const contact = (body?.contact as string) || "";
    //console.log("[API] Create order request", { amount, currency, receipt, hasContact: Boolean(contact) });

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
    }

    // Force rupees -> paise conversion and minimum ₹1
    const amountPaise = Math.max(100, Math.round(amount * 100));

    // Use provided defaults but allow env override
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_live_VA7aMe5xs6OpFd";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "zOvVoWMBzg3dCvy7mV1FGj4b";

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency,
        receipt,
        payment_capture: 1,
      }),
      // Razorpay API is fast; keep default timeout
    });

    if (!res.ok) {
      const text = await res.text();
      //console.error("[API] Create order failed", text);
      return NextResponse.json({ success: false, message: text || "Failed to create order" }, { status: 500 });
    }

    const data = await res.json();
    //console.log("[API] Order created", { id: data?.id, amount: data?.amount, currency: data?.currency });

    // Mirror PHP shape from trialPayment.php for easier client reuse
    const responseData = {
      success: true,
      data: {
        order_id: data.id,
        amount: data.amount,
        currency: data.currency,
        key_id: keyId,
        name: "Sisya Class",
        description: body?.description || "Long Term Math Course",
        prefill: {
          contact,
        },
      },
      // Maintain previous shape for backward compatibility
      order: data,
      keyId,
    };

    return NextResponse.json(responseData);
  } catch (err: any) {
    //console.error("[API] Unexpected error", err);
    return NextResponse.json({ success: false, message: err?.message || "Unknown error" }, { status: 500 });
  }
}


