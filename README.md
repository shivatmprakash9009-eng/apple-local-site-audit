# LEONYX website

Static, dependency-free site for LEONYX. Plain HTML, CSS and a little JavaScript, deployed on Vercel.

## Pages

| URL | File |
|---|---|
| `/` | `index.html` |
| `/solutions` | `solutions.html` |
| `/work` | `work.html` |
| `/about` | `about.html` |
| `/contact` | `contact.html` |
| any other URL | `404.html` |

Shared styles are in `assets/styles.css`, behaviour in `assets/site.js`, the logo in `assets/logo.svg`.

## Contact form

Set `CONTACT_EMAIL` at the top of `assets/site.js`. Until it is set, the form copies the message to the visitor's clipboard instead of sending.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`. Pages without `.html` (such as `/solutions`) work on Vercel through `cleanUrls`; locally, open `/solutions.html`.

## Utility

`scripts/audit_snapshot.py` is a small local tool that lists files in a static site folder and reports references that do not resolve.
