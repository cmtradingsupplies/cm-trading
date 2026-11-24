"""Prepare static assets using the actual URL supplied by GitHub Pages."""

import os
from html import escape
from pathlib import Path
import re
import shutil
from urllib.parse import urlsplit

root = Path(__file__).resolve().parent.parent
source = root / "public"
output = root / "_site"
site_url = os.environ.get("SITE_URL", "").strip().rstrip("/") + "/"
parsed = urlsplit(site_url)
if parsed.scheme != "https" or not parsed.netloc or parsed.query or parsed.fragment:
    raise SystemExit("SITE_URL must be the full HTTPS website address, including its repository path.")

shutil.copytree(source, output, dirs_exist_ok=True)
index = output / "index.html"
html = index.read_text(encoding="utf-8-sig")
html = re.sub(r'<link\s+rel="canonical"[^>]*>\s*', "", html)
html = html.replace("</head>", f'<link rel="canonical" href="{escape(site_url, quote=True)}">\n</head>', 1)
index.write_text(html, encoding="utf-8")
(output / "robots.txt").write_text(
    f"User-agent: *\nAllow: /\nSitemap: {site_url}sitemap.xml\n", encoding="utf-8"
)
(output / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    f'  <url><loc>{escape(site_url)}</loc></url>\n</urlset>\n', encoding="utf-8"
)
(output / ".nojekyll").touch()
print(f"Website prepared for {site_url}")
