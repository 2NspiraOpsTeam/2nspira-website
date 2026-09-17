# Production deployment

## Source of truth

- **Repository:** `2NspiraOpsTeam/2nspira-website`
- **Production branch:** `main`
- **Platform:** Cloudflare Workers (not Pages)
- **Production Worker:** `2nspira-website`
- **Production domains:** `2nspira.com/*`, `www.2nspira.com/*`
- **Build root:** `2nspira-website/`
- **Build command:** `npm run build:ci`
- **Output:** `dist/` (`dist/server` Worker bundle, `dist/client` assets)
- **Production deploy command:** `npm run deploy:production`
- **Preview deploy command:** `npm run deploy:preview`
- **Preview Worker:** `2nspira-website-preview` with no routes and `workers_dev` enabled

`deploy:production` hard-fails unless it is running in Cloudflare Workers Builds,
the source branch is exactly `main`, and the built artifact contains the same full
commit SHA supplied by Cloudflare. Local production deployment is intentionally
unsupported.

## Promotion flow

1. Create a feature branch from current `origin/main`.
2. Commit and push the feature branch.
3. Run `npm run verify:release`. It requires a clean working tree, a pushed branch,
   and `origin/main` to be an ancestor; then it runs lint, the vinext build, and TypeScript.
4. Review the Cloudflare preview URL. Check the changed paths in desktop and mobile
   browsers and confirm the preview response has `X-Robots-Tag: noindex, nofollow`.
5. Merge the reviewed pull request to `main`.
6. Cloudflare Workers Builds builds and deploys `main` automatically.
7. Verify production:

   ```bash
   EXPECTED_SHA="$(git rev-parse origin/main)"
   LIVE_SHA="$(curl -fsS https://2nspira.com/deployment.json | jq -r .commit)"
   test "$LIVE_SHA" = "$EXPECTED_SHA"
   curl -fsSI https://2nspira.com/ | rg "^x-deployment-commit: $EXPECTED_SHA$"
   ```

Any mismatch between live and `origin/main` is a deployment incident. Stop releases,
record the Cloudflare deployment/version IDs, and determine who or what deployed it.

## Rollback

1. Identify the previous known-good version in Cloudflare **Workers & Pages →
   2nspira-website → Deployments** or with:

   ```bash
   npx wrangler deployments list --name 2nspira-website
   ```

2. Roll back that exact version in Cloudflare. This is the only permitted emergency
   exception to the normal Git promotion flow:

   ```bash
   npx wrangler rollback PREVIOUS_VERSION_ID --name 2nspira-website
   ```

3. Immediately revert the bad commit on `main` through a pull request. The merge
   creates a normal Git-driven production deployment so live and `main` converge.
4. Confirm `/deployment.json`, `X-Deployment-Commit`, the apex 200 response, and the
   single `www` → apex 301. Record the incident and both version IDs.

Do not rebuild an old local checkout and deploy it as a rollback.
