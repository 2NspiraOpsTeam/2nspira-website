declare module "cloudflare:workers" {
  export const env: {
    PORTAL_DB: D1Database;
    BETTER_AUTH_SECRET?: string;
    BETTER_AUTH_URL?: string;
    [key: string]: unknown;
  };
}
