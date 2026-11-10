# Who We Serve client carousel — 2026-11-10

Owner supplied the client list and requested publication as clients. No scope, results, testimonials, certification or endorsement claims are added. No contact with clients is authorized or performed.

Reuse the shipped carousel rather than introducing another dependency. Platform defaults remain unchanged; client-specific labels are passed as props.

## Official assets

- Columbia University: https://toolkit.library.columbia.edu/v3/img/cu-blue-logo.svg → `/images/clients/columbia.svg`
- Bank Street College of Education: https://www.bankstreet.edu/wp-content/themes/bank-street-theme/images/bank-street-text-coe.svg → `/images/clients/bankstreet.svg`
- Dwight School: https://www.dwight.edu/uploaded/themes/default_22/images/logo-ny-color.svg → `/images/clients/dwight.svg`
- Rainforest Alliance: https://www.rainforest-alliance.org/wp-content/themes/rainforest-replant/dist/img/ra_logo.svg → `/images/clients/rainforest.svg`
- Wildlife Conservation Society: https://www.wcs.org/assets/wcsorg/logos/green-blue-bright-5d771b2f607411694529229adaab63679ef4acc34bf6db6d840b5f38908ac4fa.svg → `/images/clients/wcs.svg`
- Teams Management LLC: https://www.teamsmanagement.com/photo-variants/b478a2b2e82d9d3bbea28662197c06990e96d0fecda62fbfae68721d0735805e.webp → `/images/clients/teams.webp`
- CorkHill Manufacturing: https://www.corkhillmfg.com/pw/wp-content/uploads/2015/10/logo.png → `/images/clients/corkhill.png`
- The New York Society Library: https://www.nysoclib.org/sites/default/files/nysl-logo.svg → `/images/clients/nysoclib.svg`
- H&R Block: https://publicsitecms-media.hrblock.ca/assets/hr_block_logo_21f10239a6.svg → `/images/clients/hrblock.svg`
- The Learning Experience: https://thelearningexperience.com/wp-content/uploads/2023/09/TLE-Logo.svg → `/images/clients/tle.svg`
- NYC Parks: https://www.nycgovparks.org/css/global.css?v=27 → `/images/clients/nycparks.gif`
- New York Hall of Science: https://nysci.org/media/Logo.png → `/images/clients/nysci.png`

NYC Parks: exact base64 GIF from official `#logo_block` background, not a recreated mark. Teams: official homepage header image resized without altering the mark. H&R Block: official Canadian site global wordmark, not a franchise badge.

## Pending identity/asset checks

- T.ology: owner website needed.
- Delizia Restaurant: Delizia 73 candidate found; identity confirmation requested. Candidate asset staged but not displayed.
- Citi Field: venue logo requested for confirmation; do not substitute Mets or Citi bank logo.
- Amur Capital: Canadian mortgage-investment company candidate found; owner website needed.

## Verification

Local canonical build and smoke checks passed. TypeScript, scoped ESLint and diff whitespace checks passed. 22 isolated audience handler/D1 checks passed. 77 rendered client/page checks passed at 1440, 768, 390 and 320px: decoded logos, no overflow, disclosures mouse/keyboard/default refresh state, motion/pause/focus/keyboard scroll, reduced motion, no-JS fallback and unchanged platform-carousel labels. Desktop/mobile screenshots inspected. Rainforest white official artwork has a dark backing for contrast; Bank Street uses the official text wordmark. No schema or production data changes.

Page refresh uses native disclosures to reduce visible text, industry anchor chips, existing optional CatalogEffects, hover feedback without card movement, and a shorter closing invitation. Existing Admin-managed industry wording and destinations are preserved.

Hosted/production verification pending.

- Compass: https://www.compass.com/ucfe-assets/public-media/compass_logo.svg

- Cushman & Wakefield: https://assets.cushmanwakefield.com/-/media/cw/global/about-us/logo.svg?rev=d52513d3e0584ffea7b4077ca0c8611c

## Owner-requested refinement
Bank Street horizontal PNG supplied by Jeffrey on 2026-11-10 replaces the sourced SVG. Client captions are visually hidden (screen-reader names retained); technology carousel defaults unchanged.
