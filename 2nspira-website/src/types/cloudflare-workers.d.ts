declare module "cloudflare:workers" {
  export const env: {
    PORTAL_DB: D1Database;
    BETTER_AUTH_SECRET?: string;
    BETTER_AUTH_URL?: string;
    STRIPE_SECRET_KEY?: string;
    STRIPE_PUBLISHABLE_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    MANUAL_ACH_INSTRUCTIONS?: string;
    ZELLE_INSTRUCTIONS?: string;
    PAYMENT_JOB_SECRET?: string;
    MANAGED_ACH_FEE_CENTS?: string;
    CARD_FEE_BPS?: string;
    [key: string]: unknown;
  };
}
