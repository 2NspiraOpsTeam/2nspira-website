# Stripe test-mode proof checklist

1. Create **Demo Property Management Client** through `/dev/payments-pilot`.
2. Save Stripe test card `4242 4242 4242 4242` using Payment Element; verify only `cus_`, `pm_`, brand, last four, and expiry are stored.
3. Execute the schedule twice for the same cycle; verify only one PaymentIntent/idempotency key exists.
4. Use Stripe's decline test card to verify `FAILED` and sanitized failure handling.
5. Link a test bank account through Financial Connections/Payment Element; verify only `cus_`, `pm_`, bank name, and last four are stored.
6. Initiate a saved-bank PaymentIntent; expect `PROCESSING`, not immediate settlement.
7. Deliver signed `payment_intent.processing`, `payment_intent.succeeded`, and failure events; verify normalized state and original event type.
8. Redeliver the same event ID; verify it is ignored.
9. Revoke an autopay schedule and verify execution is rejected.
10. Set a charge date three days ahead and run `/api/notices/run` twice; verify one notice record.

Do not use live keys or real card/bank/client data.
