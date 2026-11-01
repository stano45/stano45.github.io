"""Writes favicon.svg, favicon.ico and apple-touch-icon.png: the red main trail marker (Pásová, the band of colour
between two white ones, see markers.py) painted on a tree, in the site's colours.
Run from the repo root: python -I scripts/favicon.py

The drawing is a 16x16 grid, so at 16, 32 and 48 px every edge falls on a whole pixel. The PNGs are drawn here
pixel by pixel (4x4 samples a pixel for the rounded corners), with no image library."""
import struct, sys, zlib

sys.dont_write_bytecode = True  # no __pycache__ in the repo

BARK, WHITE, RED = "#8a5d3f", "#fff", "#b0463f"  # --warm, --blaze and --t-red in style.css
RADIUS = 3  # corners of the bark, in grid units
# the marker on the bark: x, y, width, height and colour, in grid units
SHAPES = [(2, 2, 12, 12, WHITE), (2, 6, 12, 4, RED)]

svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">\n'
       "<!-- the red main trail marker on a tree; drawn by scripts/favicon.py -->\n"
       f'<rect width="16" height="16" rx="{RADIUS}" fill="{BARK}"/>\n'
       + "".join(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"/>\n' for x, y, w, h, c in SHAPES)
       + "</svg>\n")
open("favicon.svg", "w", encoding="utf-8", newline="\n").write(svg)


def rgb(hex_):
    hex_ = hex_.lstrip("#")
    hex_ = "".join(ch * 2 for ch in hex_) if len(hex_) == 3 else hex_
    return tuple(int(hex_[i:i + 2], 16) for i in (0, 2, 4))


def colour_at(u, v, radius):
    """The colour at (u, v) on the 16x16 grid, or None outside the bark."""
    cu, cv = min(max(u, radius), 16 - radius), min(max(v, radius), 16 - radius)
    if (u - cu) ** 2 + (v - cv) ** 2 > radius ** 2:
        return None
    for x, y, w, h, c in reversed(SHAPES):
        if x <= u < x + w and y <= v < y + h:
            return rgb(c)
    return rgb(BARK)


def png(size, radius=RADIUS):
    rows = b""
    for py in range(size):
        row = b"\0"
        for px in range(size):
            hits = [colour_at((px + (i + .5) / 4) * 16 / size, (py + (j + .5) / 4) * 16 / size, radius)
                    for i in range(4) for j in range(4)]
            inside = [c for c in hits if c]
            alpha = round(255 * len(inside) / len(hits))
            r, g, b = (round(sum(c[k] for c in inside) / len(inside)) for k in range(3)) if inside else (0, 0, 0)
            row += bytes((r, g, b, alpha))
        rows += row
    chunk = lambda kind, data: struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data))
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(rows, 9)) + chunk(b"IEND", b""))


# the .ico holds PNGs, which every browser that still asks for one understands
images = [(n, png(n)) for n in (16, 32, 48)]
ico = struct.pack("<HHH", 0, 1, len(images))
offset = len(ico) + 16 * len(images)
for n, data in images:
    ico += struct.pack("<BBBBHHII", n, n, 0, 0, 1, 32, len(data), offset)
    offset += len(data)
open("favicon.ico", "wb").write(ico + b"".join(data for _, data in images))
# iOS rounds the corners itself and puts black behind anything see-through, so the bark fills the square there
open("apple-touch-icon.png", "wb").write(png(180, radius=0))
print(len(svg), offset, "bytes")
