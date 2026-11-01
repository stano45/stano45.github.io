"""Writes markers/*.svg, the Slovak trail markers the site uses for its headings, the nav and the legend in the footer.
Run from the repo root: python -I scripts/markers.py

The drawings are the ones on the OpenStreetMap wiki that WikiProject Slovakia uses for the marker symbols of Slovak
hiking routes (https://wiki.openstreetmap.org/wiki/WikiProject_Slovakia/Hiking_routes), public domain as simple
shapes (PD-shape). This keeps their shapes as they are, drops the editor clutter, and paints them in the site's trail
colours: the white of the marker stays white, the outlines take the colour of the edge around the markers. The
drawings are downloaded into a folder in the system temp directory the first time (or into $MARKER_DRAWINGS)."""
import os, re, sys, tempfile, time, urllib.parse, urllib.request

sys.dont_write_bytecode = True  # no __pycache__ in the repo

RED, BLUE, GREEN, YELLOW, WHITE, EDGE = "#b0463f", "#3d6898", "#4b7a4f", "#d6a01c", "#fff", "#cdbba2"  # as in style.css
# the drawing on the wiki and the colour the site paints it in
MARKERS = {
    "major-red": ("Kct-major-red.svg", RED),  # work, the main ridge
    "ruin-blue": ("Kct-ruin-blue.svg", BLUE),  # projects
    "spring-yellow": ("Kct-spring-yellow.svg", YELLOW),  # the blog
    "learning-green": ("Kct-learning-green.svg", GREEN),  # education
    "shelter-red": ("KST-shelter-red.svg", RED),  # contact
    "peak-red": ("Kct-peak-red.svg", RED),  # highlights
    "interesting_object-red": ("Kct-interesting_object-red.svg", RED),  # quick facts
    "roundtrip-green": ("KST-roundtrip-green.svg", GREEN),  # outside work
}

folder = os.environ.get("MARKER_DRAWINGS") or os.path.join(tempfile.gettempdir(), "kosorin-markers")
os.makedirs(folder, exist_ok=True)
os.makedirs("markers", exist_ok=True)


def drawing(name):
    path = os.path.join(folder, name)
    if not os.path.exists(path):
        url = "https://wiki.openstreetmap.org/wiki/Special:FilePath/" + urllib.parse.quote(name)
        req = urllib.request.Request(url, headers={"User-Agent": "kosorin.com marker build (github.com/stano45)"})
        open(path, "wb").write(urllib.request.urlopen(req).read())
        time.sleep(1)
    return open(path, encoding="utf-8", errors="replace").read()


def paint(colour, fill):
    fill = fill.lower()
    return WHITE if fill in ("#fff", "#ffffff") else "none" if fill == "none" else colour


for out, (name, colour) in MARKERS.items():
    src = drawing(name)
    size = re.search(r'<svg\b[^>]*?\bwidth="([\d.]+)"[^>]*?\bheight="([\d.]+)"', src, re.S)
    shapes = []
    for tag, attrs in re.findall(r"<(path|rect)\b([^>]*)/>", src, re.S):
        get = lambda key: (re.search(rf'\s{key}="([^"]*)"', attrs) or [None, None])[1]
        style = dict(kv.split(":", 1) for kv in (get("style") or "").split(";") if ":" in kv)
        keep = {k: get(k) for k in ("d", "x", "y", "width", "height", "transform") if get(k)}
        keep["fill"] = paint(colour, style.get("fill", "#000"))
        if style.get("fill-rule"):
            keep["fill-rule"] = style["fill-rule"]
        if style.get("stroke", "none") != "none":
            keep["stroke"], keep["stroke-width"] = EDGE, f'{float(style.get("stroke-width", 1)):.2f}'
        if keep.get("d"):
            keep["d"] = re.sub(r"(\d\.\d{2})\d+", r"\1", re.sub(r"\s+", " ", keep["d"]).strip())
        shapes.append(f"<{tag} " + " ".join(f'{k}="{v}"' for k, v in keep.items()) + "/>")
    w, h = (f"{float(v):.2f}" for v in size.groups())
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">\n'
           f"<!-- {name} from the OpenStreetMap wiki (public domain), in the site's colours; drawn by scripts/markers.py -->\n"
           + "\n".join(shapes) + "\n</svg>\n")
    open(f"markers/{out}.svg", "w", encoding="utf-8", newline="\n").write(svg)
    print(out, len(svg))
