import { describe, expect, it } from "vitest";
import { cardFeeCents, managedAchFeeCents, normalizedStripeState } from "../src/lib/portal/payment-domain";

describe("payment fee policy", () => {
  it("uses the configured managed ACH fee and accepts zero for manual ACH", () => {
    expect(managedAchFeeCents("2000")).toBe(2000);
    expect(managedAchFeeCents(undefined)).toBe(0);
    expect(cardFeeCents(10_000, "300")).toBe(300);
  });
  it("rejects invalid fee configuration", () => {
    expect(() => managedAchFeeCents("20.5")).toThrow();
    expect(() => managedAchFeeCents("-1")).toThrow();
  });
});

describe("Stripe state normalization", () => {
  it("does not settle ACH when Stripe merely accepts processing", () => {
    expect(normalizedStripeState("payment_intent.processing", "submitted")).toBe("processing");
  });
  it("settles only from the signed success event", () => {
    expect(normalizedStripeState("payment_intent.succeeded", "processing")).toBe("settled");
  });
  it("preserves a return over a later generic failure", () => {
    expect(normalizedStripeState("payment_intent.payment_failed", "processing", "bank account closed")).toBe("returned");
    expect(normalizedStripeState("charge.failed", "returned")).toBe("returned");
  });
});
