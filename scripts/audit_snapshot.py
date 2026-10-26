#!/usr/bin/env python3
"""Audit a downloaded static website snapshot without fetching remote resources.

Usage:
  python3 scripts/audit_snapshot.py /path/to/extracted/site-root

This script inventories local HTML, CSS, JavaScript, media and font files,
then reports common local references that do not resolve. It does not bypass
access controls or download third-party resources.
"""
from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import unquote, urlparse

ASSET_SUFFIXES = {
    ".html", ".htm", ".css", ".js", ".mjs", ".png", ".jpg", ".jpeg",
    ".webp", ".gif", ".svg", ".avif", ".mp4", ".webm", ".mov", ".woff",
    ".woff2", ".ttf", ".otf", ".eot"
}
ATTR_RE = re.compile(r'''(?:src|href|poster)=["']([^"']+)["']''', re.I)
CSS_URL_RE = re.compile(r'''url\(\s*["']?([^"')]+)''', re.I)
EXT_RE = re.compile(r"\.[A-Za-z0-9]{1,8}(?:\?[^\s\"']*)?$")


def is_external_or_special(url: str) -> bool:
    parsed = urlparse(url.strip())
    return bool(parsed.scheme or parsed.netloc) or url.startswith(("#", "data:", "blob:", "javascript:"))


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python3 scripts/audit_snapshot.py <site-root>", file=sys.stderr)
        return 2
    root = Path(sys.argv[1]).expanduser().resolve()
    if not root.is_dir():
        print(f"Not a directory: {root}", file=sys.stderr)
        return 2

    paths = [p for p in root.rglob("*") if p.is_file()]
    extensions = Counter(p.suffix.lower() or "[no extension]" for p in paths)
    refs = []
    external = []
    missing = []

    for file in paths:
        if file.suffix.lower() not in {".html", ".htm", ".css"}:
            continue
        try:
            text = file.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        candidates = ATTR_RE.findall(text) if file.suffix.lower() in {".html", ".htm"} else []
        if file.suffix.lower() == ".css":
            candidates.extend(CSS_URL_RE.findall(text))
        for raw in candidates:
            raw = raw.strip()
            if not raw or is_external_or_special(raw):
                if raw.startswith(("http://", "https://", "//")):
                    external.append({"file": str(file.relative_to(root)), "url": raw})
                continue
            path_part = unquote(urlparse(raw).path)
            if not path_part:
                continue
            target = (file.parent / path_part).resolve() if not path_part.startswith("/") else (root / path_part.lstrip("/")).resolve()
            # Treat query-string filenames and extensionless links conservatively.
            target_inside = target == root or root in target.parents
            if not target_inside:
                missing.append({"file": str(file.relative_to(root)), "reference": raw, "reason": "path escapes root"})
                continue
            alternatives = [target]
            if not target.suffix:
                alternatives.extend([target / "index.html", target.with_suffix(".html")])
            if not any(p.is_file() for p in alternatives):
                missing.append({"file": str(file.relative_to(root)), "reference": raw, "resolved_path": str(target.relative_to(root))})

    report = {
        "root": str(root),
        "file_count": len(paths),
        "total_bytes": sum(p.stat().st_size for p in paths),
        "extensions": dict(extensions.most_common()),
        "local_references_missing": len(missing),
        "external_references": len(external),
        "missing_examples": missing[:100],
        "external_examples": external[:100],
        "notes": [
            "This is a heuristic local-reference audit; it is not a browser runtime test.",
            "JavaScript-created requests, srcset, dynamic imports, API calls, and runtime-only resources may not be detected.",
            "Review rights and licenses before redistributing captured third-party content."
        ]
    }
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
