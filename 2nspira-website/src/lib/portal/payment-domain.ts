export type NormalizedPaymentState = "scheduled" | "notified" | "authorized" | "submitted" | "processing" | "settled" | "failed" | "returned" | "canceled";

export function managedAchFeeCents(configured: unknown) {
  const fee = Number(configured ?? 0);
  if (!Number.isInteger(fee) || fee < 0) throw new Error("MANAGED_ACH_FEE_CENTS must be a non-negative integer");
  return fee;
}

export function cardFeeCents(invoiceAmountCents: number, configuredBasisPoints: unknown) {
  const basisPoints = Number(configuredBasisPoints ?? 0);
  if (!Number.isInteger(basisPoints) || basisPoints < 0) throw new Error("CARD_FEE_BPS must be a non-negative integer");
  return Math.round(invoiceAmountCents * basisPoints / 10_000);
}

export function normalizedStripeState(eventType: string, current: string, failureReason = ""): NormalizedPaymentState {
  if (eventType === "payment_intent.succeeded") return "settled";
  if (eventType === "payment_intent.processing") return "processing";
  if (eventType === "payment_intent.canceled") return "canceled";
  if (eventType === "payment_intent.payment_failed" && (current === "processing" || /return|ach|bank|account/i.test(failureReason))) return "returned";
  if (eventType === "payment_intent.payment_failed" || eventType === "charge.failed") return current === "returned" ? "returned" : "failed";
  return (current as NormalizedPaymentState) || "submitted";
}
