# Static Site Audit Tool

A small, dependency-free Python script that audits a static website folder on disk.

## What it does

`scripts/audit_snapshot.py` inventories the local HTML, CSS, JavaScript, image, media and font files in a folder, then reports local references that do not resolve. It only reads files on your machine; it never fetches anything from the network.

## Usage

```bash
python3 scripts/audit_snapshot.py /path/to/site-root
```

## Notes

- Requires Python 3.8+ and nothing else.
- Keep third-party or client files out of this repository unless you have the rights to store them.
