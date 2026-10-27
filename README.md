# Kite Studio — Original Static Website

A self-contained, responsive portfolio/landing page for a fictional independent digital studio. This is an original implementation with custom copy, CSS, JavaScript, and locally authored SVG illustrations.

## Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── mark.svg
│   ├── project-orbit.svg
│   ├── project-field.svg
│   └── project-form.svg
├── vercel.json
├── robots.txt
├── package.json
└── README.md
```

## Run locally

No build step or third-party package is required.

- Python: `python -m http.server 8080`
- Node.js: `npx serve .` (optional; requires the package runner to download/use a static server)

Then open `http://localhost:8080`.

## Deploy to Vercel

1. Import this repository in Vercel.
2. Set the project root directory to the repository root.
3. Choose **Other** / static site if a framework preset is requested.
4. Leave the build command empty and use `.` as the output directory, or let Vercel detect the root `index.html`.
5. Deploy the `main` branch.

The repository includes a root-level Vercel configuration with clean URLs and baseline security headers. The site uses same-origin local assets and does not need external image/font/CDN dependencies.

## Functionality

- Responsive mobile navigation with keyboard Escape support
- Smooth section navigation and reveal transitions
- Reduced-motion preference support
- Accessible inquiry form with browser validation
- Inquiry brief copy-to-clipboard interaction

The inquiry form is deliberately front-end-only. It copies a project brief for the visitor to paste into their preferred messaging app; it does not submit personal information to a server. Add a real contact backend only when one is selected and configured.

## Before publishing

- Replace the fictional studio name and concept-project copy if needed.
- Review metadata and contact workflow for your actual use.
- Run `npm run check` and test desktop/mobile in a browser.

## License

No third-party packages or external brand assets are included. The site is provided as a project starter; add a license only if you intend to grant reuse rights.
