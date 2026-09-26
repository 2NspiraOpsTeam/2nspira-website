import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:3000";

const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: "2025-01-27.acacia" as Stripe.LatestApiVersion,
  typescript: true,
});

// Detect whether we have a real Stripe key (not just a placeholder)
const hasRealKey =
  STRIPE_KEY &&
  (STRIPE_KEY.startsWith("sk_live_") || STRIPE_KEY.startsWith("sk_test_")) &&
  STRIPE_KEY !== "sk_test...placeholder_use_real_key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      invoiceId,
      amount,
      currency = "usd",
      customerEmail,
      customerName,
      metadata = {},
    }: {
      invoiceId?: string;
      amount: number;
      currency?: string;
      customerEmail: string;
      customerName?: string;
      metadata?: Record<string, string>;
    } = body;

    // Without a real Stripe key, proxy to the downstream portal
    // (which has the full stripe SDK + lib/auth + lib/db)
    if (!hasRealKey) {
      const res = await fetch(`${PORTAL_URL}/api/stripe/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }

    // Real Stripe key: create PaymentIntent directly via SDK
    let customerId: string | undefined;

    // Create or retrieve Stripe customer
    try {
      const existingCustomers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });
      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName || "",
          metadata: { ...(invoiceId ? { invoiceId } : {}), ...(metadata || {}) },
        });
        customerId = customer.id;
      }
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to create Stripe customer", details: (err as Error).message },
        { status: 500 }
      );
    }

    // Create PaymentIntent
    try {
      const intent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        customer: customerId!,
        metadata: { invoiceId: invoiceId || "", ...(metadata || {}) },
        automatic_payment_methods: { enabled: true },
      });

      return NextResponse.json({
        clientSecret: intent.client_secret,
        paymentIntentId: intent.id,
        status: intent.status,
        amount: intent.amount,
        currency: intent.currency,
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to create PaymentIntent", details: (err as Error).message },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
