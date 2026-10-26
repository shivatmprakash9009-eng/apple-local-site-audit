# Termux local snapshot test

## Start the server

From the directory where the extracted snapshot is stored, run:

```bash
cd ~/apple
python3 -m http.server 8080
```

Keep Termux running while viewing the page. Open the path that matches the actual extracted folder structure, for example:

```text
http://127.0.0.1:8080/www.apple.com/index.html
```

If the archive was extracted so that `index.html` is directly under `~/apple/www.apple.com/`, the command below serves that directory as the root:

```bash
cd ~/apple/www.apple.com
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8080/index.html
```

## Common errors

- `Address already in use`: a server already owns that port. Reuse that server or choose another port, such as 8081.
- `404 File not found`: the requested URL path does not match the server's current working directory. Check `pwd` and `find . -name index.html`.
- Missing CSS/images: inspect relative paths and external references. A successful HTTP response for HTML does not prove that all dependencies are local.
- A local page redirecting to the live site: some links remain external. Note the domain after each click.

## Rights and privacy

Do not commit or redistribute the raw third-party site snapshot unless you have permission and have verified the licenses for its assets and code. This repository intentionally ignores the raw archive and captured host folders.
