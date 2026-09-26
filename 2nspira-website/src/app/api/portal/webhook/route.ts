import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:3000";

const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: "2025-01-27.acacia" as Stripe.LatestApiVersion,
  typescript: true,
});

// Detect whether we have a real Stripe key (not just a placeholder)
const hasRealKey =
  STRIPE_KEY &&
  (STRIPE_KEY.startsWith("sk_live_") || STRIPE_KEY.startsWith("sk_test_")) &&
  STRIPE_KEY !== "sk_test...placeholder_use_real_key" &&
  STRIPE_WEBHOOK_SECRET &&
  STRIPE_WEBHOOK_SECRET !== "whsec...placeholder_use_real_webhook_secret";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  // Without a real Stripe key, proxy to the downstream portal
  // (which has the full stripe SDK + lib/auth + lib/db)
  if (!hasRealKey) {
    const res = await fetch(`${PORTAL_URL}/api/stripe/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": signature,
      },
      body,
    });
    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: { "content-type": "application/json" },
    });
  }

  // Real Stripe key: verify webhook signature and handle events via SDK
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook signature verification failed", details: (err as Error).message },
      { status: 400 }
    );
  }

  // Handle Stripe events
  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // Update payment status in downstream portal
        await fetch(`${PORTAL_URL}/api/stripe/webhook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "payment_intent.succeeded",
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: "succeeded",
            metadata: paymentIntent.metadata,
          }),
        });
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await fetch(`${PORTAL_URL}/api/stripe/webhook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "payment_intent.payment_failed",
            paymentIntentId: paymentIntent.id,
            error: (paymentIntent.last_payment_error || { message: "Unknown error" }).message,
            metadata: paymentIntent.metadata,
          }),
        });
        break;
      }

      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge;
        await fetch(`${PORTAL_URL}/api/stripe/webhook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "charge.succeeded",
            chargeId: charge.id,
            paymentIntentId: charge.payment_intent as string | null,
            amount: charge.amount,
            metadata: charge.metadata,
          }),
        });
        break;
      }

      default:
        // Unknown event type — still acknowledge to Stripe
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook handler failed", details: (err as Error).message },
      { status: 500 }
    );
  }
}
