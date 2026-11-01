"""Regenerate the machine-readable copies of the site from its HTML.

Run before committing whenever a page changes:  python scripts/machine-files.py
Writes: <page>.md for every page, llms-full.txt, sitemap.xml, feed.xml.
llms.txt and robots.txt are hand-written. Standard library only.
"""
import html, pathlib, re
from html.parser import HTMLParser

SITE = "https://kosorin.com"
ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP = {"404.html"}


class ToMarkdown(HTMLParser):
    """Converts the contents of <main> to Markdown; covers the tags this site uses."""
    BLOCK = {"p", "h1", "h2", "h3", "h4", "ul", "ol", "pre", "address", "article", "dl"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.depth, self.lists, self.href = [], 0, [], []
        self.in_main = self.in_pre = False
        self.skip = 0

    def emit(self, s):
        if self.in_main and not self.skip:
            self.out.append(s)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "main":
            self.in_main = True
        if tag in ("script", "style", "source"):
            self.skip += tag != "source"
            return
        if tag in self.BLOCK:
            self.emit("\n\n")
        if tag in ("h1", "h2", "h3", "h4"):
            self.emit("#" * int(tag[1]) + " ")
        elif tag in ("ul", "ol"):
            self.lists.append([tag, 0])
        elif tag == "li":
            kind = self.lists[-1] if self.lists else ["ul", 0]
            kind[1] += 1
            bullet = f"{kind[1]}." if kind[0] == "ol" else "-"
            self.emit("\n" + "  " * (len(self.lists) - 1) + bullet + " ")
        elif tag in ("strong", "b"):
            self.emit("**")
        elif tag in ("em", "i"):
            self.emit("_")
        elif tag == "code" and not self.in_pre:
            self.emit("`")
        elif tag == "pre":
            self.in_pre = True
            self.emit("```\n")
        elif tag == "br":
            self.emit("  \n")
        elif tag == "a":
            self.href.append(a.get("href", ""))
            self.emit("[")
        elif tag == "img":
            src = a.get("src", "")
            self.emit(f"![{a.get('alt', '')}]({SITE + src if src.startswith('/') else src})")
        elif tag == "dt":
            self.emit("\n- **")
        elif tag == "dd":
            self.emit(" ")

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False
        if tag in ("script", "style"):
            self.skip -= 1
        elif tag in ("strong", "b"):
            self.emit("**")
        elif tag in ("em", "i"):
            self.emit("_")
        elif tag == "code" and not self.in_pre:
            self.emit("`")
        elif tag == "pre":
            self.in_pre = False
            self.emit("\n```")
        elif tag == "a":
            href = self.href.pop() if self.href else ""
            self.emit(f"]({SITE + href if href.startswith('/') else href})")
        elif tag == "dt":
            self.emit("**")
        elif tag in ("ul", "ol"):
            self.lists.pop()
        if tag in self.BLOCK:
            self.emit("\n\n")

    def handle_data(self, data):
        self.emit(data if self.in_pre else re.sub(r"\s+", " ", data))

    def markdown(self):
        text = "".join(self.out)
        text = re.sub(r"[ \t]+\n", "\n", text)
        text = re.sub(r"\n(?!\s*[-\d])[ \t]+", "\n", text)
        return re.sub(r"\n{3,}", "\n\n", text).strip() + "\n"


def meta(page, name):
    m = re.search(rf'<meta (?:name|property)="{name}" content="([^"]*)"', page)
    return html.unescape(m.group(1)) if m else ""


def pages():
    files = [ROOT / "index.html", *sorted(ROOT.glob("*.html")), *sorted(ROOT.glob("blog/*.html"))]
    seen = set()
    for f in files:
        if f.name in SKIP or f.name.startswith("_") or f in seen:
            continue
        seen.add(f)
        rel = f.relative_to(ROOT).with_suffix("").as_posix()
        url = SITE + "/" if rel == "index" else f"{SITE}/{rel}"
        yield f, rel, url, f.read_text(encoding="utf-8")


def main():
    docs, entries, urls = [], [], []
    for f, rel, url, page in pages():
        title = html.unescape(re.search(r"<title>(.*?)</title>", page).group(1))
        desc, date = meta(page, "description"), meta(page, "article:published_time")
        conv = ToMarkdown()
        conv.feed(page)
        body = conv.markdown()
        header = f"---\ntitle: {title}\ndescription: {desc}\nurl: {url}\n" + (f"date: {date}\n" if date else "") + "---\n\n"
        f.with_suffix(".md").write_text(header + body, encoding="utf-8", newline="\n")
        docs.append(f"<page url=\"{url}\">\n{body}</page>\n")
        modified = re.search(r'"dateModified": "([^"]+)"', page)
        urls.append((url, date or (modified.group(1) if modified else "")))
        if date:
            entries.append((date, title, url, desc))
        print("wrote", f.with_suffix(".md").relative_to(ROOT).as_posix())

    llms = (ROOT / "llms.txt").read_text(encoding="utf-8")
    (ROOT / "llms-full.txt").write_text(llms + "\n\n# Full content\n\n" + "\n".join(docs), encoding="utf-8", newline="\n")

    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"<url><loc>{u}</loc>" + (f"<lastmod>{d}</lastmod>" if d else "") + "</url>" for u, d in urls]
    (ROOT / "sitemap.xml").write_text("\n".join(sm + ["</urlset>"]) + "\n", encoding="utf-8", newline="\n")

    entries.sort(reverse=True)
    esc = lambda s: html.escape(s, quote=True)
    feed = ['<?xml version="1.0" encoding="utf-8"?>', '<feed xmlns="http://www.w3.org/2005/Atom">',
            "<title>Stanislav Kosorin – Blog</title>", f'<link href="{SITE}/blog"/>',
            f'<link rel="self" href="{SITE}/feed.xml"/>', f"<id>{SITE}/</id>",
            f"<updated>{entries[0][0]}T00:00:00Z</updated>", "<author><name>Stanislav Kosorin</name></author>"]
    for date, title, url, desc in entries:
        feed += ["<entry>", f"<title>{esc(title)}</title>", f'<link href="{url}"/>',
                 f'<link rel="alternate" type="text/markdown" href="{url}.md"/>', f"<id>{url}</id>",
                 f"<published>{date}T00:00:00Z</published>", f"<updated>{date}T00:00:00Z</updated>",
                 f"<summary>{esc(desc)}</summary>", "</entry>"]
    (ROOT / "feed.xml").write_text("\n".join(feed + ["</feed>"]) + "\n", encoding="utf-8", newline="\n")
    print("wrote llms-full.txt, sitemap.xml, feed.xml")


if __name__ == "__main__":
    main()
