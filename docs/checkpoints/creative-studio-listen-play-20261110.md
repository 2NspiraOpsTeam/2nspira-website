# Creative Studio order correction and Services label

Owner direction: retain Listen and Play; categories must appear in the order Watch, Listen, Read, Play, Shop. Explore Creative Studio stays above the categories. Header label changes from Our Services to Services on desktop and mobile; destinations remain unchanged.

Production source verified before edits: main `ddba47d731891c4cc667becf9f3bc92e36bbd908`. Remote Creative Studio content table read-only check returned no saved row: production uses `initialStudio()` defaults. Therefore the minimal change updates the legacy/unversioned default link construction, not a new schema migration or remote database write. Existing `navigationVersion: 2` saved Admin configurations (custom labels/destinations/order/visibility) are returned unchanged and explicitly regression-tested.

Desktop/mobile/footer/landing all consume the shared published order. Listen has published ambience/music; Play has published coloring/activity/printable/art content. Retired Breadcrumb remains draft and is not promoted. Existing routes and latest advisory-service changes are preserved.

Target menu: Explore Creative Studio `/studio`; Watch `/studio/watch`; Listen `/studio/listen`; Read `/studio/read`; Play `/studio/play`; Shop `/shop`.

Validation: isolated handler/default/customization tests and six-link four-width browser suite; full clean pushed-branch release gate; exact-SHA noindex preview; protected GitHub merge and actual Cloudflare production check/live marker verification. Production authorization remains Jeffrey's explicit Push to prod plus scoped corrections. No repeat permission required.
