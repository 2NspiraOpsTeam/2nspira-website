# 2Nspira Campus showcase identity — 18 November 2026

Jeffrey selected **2Nspira Campus** and requested an original, meaningful logo.
The vector book/doorway/path/spark identity and **Learning opens possibilities.**
line are shared with the education demo repository. Learning Grove Academy
remains the fictional school. No trademark-registration, security-certification,
production-readiness, client-result, or feature-parity claim is made.

## Changes

Education metadata/schema, dedicated showcase hero, demos collection title,
matching vector logo and mark, and an actual screenshot from the newly branded
administrator hub. Administrator launches now enter School hub; Curriculum,
School calendar, School announcements and hub module links point to working
role/section routes. One-unit planning is correctly labeled a working simulation,
not a read-only preview. Other industry demos and original client systems unchanged.

## Local validation

Clean install; lint passes with only four existing ai-team image warnings;
canonical build:ci including built-Worker 200 route smoke and unknown-route 404;
strict TypeScript; npm audit zero findings. Built Worker localhost:3057:
36 rendered checks across desktop/tablet/mobile covering logo/image loads,
metadata, four module links and role/section parameters, planning status,
JSON-LD parsing, no overflow or page errors, and Campus card in /demos.
Hero screenshots inspected separately; no static HTML-only visual PASS.

## Release ownership

Main marketing Worker deploys through Cloudflare Workers Builds on main, not a
local production deploy. Preview must be route-less/noindex with no production
D1 bindings. Record immutable preview head, merged commit, matching production
marker and rendered customer-entrance checks in the task release record.
The standalone demo has its own independent deployment owner and marker.
