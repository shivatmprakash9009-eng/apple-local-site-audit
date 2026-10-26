# Apple Local Site Audit — Static Snapshot

This repository is for documenting and auditing a locally captured frontend snapshot for learning and compatibility testing.

## Status

- A local HTML snapshot was captured and rendered through a local Python HTTP server.
- The supplied archive contains one main HTML document and related static assets (CSS, JavaScript, fonts, images).
- The local page was observed rendering major homepage sections; this does **not** prove the entire Apple website, all routes, or every interaction was captured.
- Some links can still navigate to Apple's live domain. External routes and API-backed functionality are not part of a static snapshot unless separately captured and authorized.

## Important rights note

Apple is a third party. This repository must not be used to redistribute Apple's proprietary assets, branding, or copied website content without appropriate permission. Before adding any captured assets, verify that you have the rights to publish them. Prefer keeping the raw archive local and committing only your own audit scripts, notes, and original code. Remove proprietary assets or replace them with licensed/original assets before making a public release.

## Local serving

Extract the archive locally, then serve the extracted folder:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Open the local path matching the extraction directory, for example:

`http://127.0.0.1:8080/www.apple.com/index.html`

Relative path layouts may require symlinks or path adjustments; do not assume one symlink fixes all paths.

## Suggested audit checklist

- [ ] Inventory all HTML pages and routes
- [ ] Inventory CSS, JavaScript, fonts, image, and video assets
- [ ] Flag references that point to external domains
- [ ] Check missing local resources
- [ ] Test major links and buttons, recording when a route leaves localhost
- [ ] Test mobile and desktop layouts
- [ ] Verify asset licenses/provenance before redistribution
- [ ] Replace third-party assets and brand elements with original or authorized assets for client delivery

## Scope

This is a static frontend snapshot audit, not Apple's original development repository. It does not include private backend code, server-side logic, or a guarantee of complete source recovery.
