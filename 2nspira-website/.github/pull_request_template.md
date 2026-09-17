## Release checks

- [ ] Changes were developed on a feature branch.
- [ ] `npm run verify:release` passes on a clean, pushed, up-to-date branch.
- [ ] The Cloudflare preview deployment passed.
- [ ] Targeted browser QA was completed on the preview URL.
- [ ] The preview contains no production route or custom-domain binding.

Merging to `main` is the only production promotion mechanism.
