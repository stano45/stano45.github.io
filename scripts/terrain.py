"""Real elevation for the drawings of the High Tatras (map.py, ridge.py): the Terrain Tiles on AWS Open Data, terrarium
encoding at zoom 11 (about 50 m a pixel), which come from SRTM (NASA, public domain) and EU-DEM (produced using
Copernicus data and information funded by the European Union, EU-DEM layers).
The tiles are downloaded into a folder in the system temp directory the first time (or into $TERRAIN_TILES)."""
import math, os, struct, tempfile, urllib.request, zlib

Z = 11
CREDIT = "terrain: SRTM, EU-DEM via Terrain Tiles"
# the named summits both drawings use, west to east: (name, height in metres, lat, lon). names, heights and places are
# OpenStreetMap's (© OpenStreetMap contributors, ODbL), the summits nearest each top the header line shows from Kozie
# chrbty, plus Rysy for the map
PEAKS = [
    ("Smrečiny", 2068, 49.2042, 19.8839),
    ("Kriváň", 2494, 49.1628, 20.0000),
    ("Krátka", 2375, 49.1633, 20.0134),
    ("Ostrá", 2351, 49.1639, 20.0218),
    ("Veľké Solisko", 2412, 49.1627, 20.0320),
    ("Štrbský štít", 2381, 49.1707, 20.0413),
    ("Satan", 2421, 49.1632, 20.0528),
    ("Kôprovský štít", 2367, 49.1824, 20.0482),
    ("Hincova veža", 2372, 49.1809, 20.0690),
    ("Rysy", 2503, 49.1793, 20.0885),
    ("Vysoká", 2547, 49.1732, 20.0935),
    ("Končistá", 2536, 49.1573, 20.1141),
    ("Batizovský štít", 2448, 49.1654, 20.1241),
    ("Gerlachovský štít", 2655, 49.1640, 20.1341),
    ("Bradavica", 2489, 49.1713, 20.1557),
    ("Východná Slavkovská veža", 2354, 49.1703, 20.1662),
    ("Malý Ľadový štít", 2602, 49.1964, 20.1826),
    ("Slavkovský štít", 2452, 49.1661, 20.1846),
    ("Lomnický štít", 2633, 49.1951, 20.2130),
    ("Kežmarský štít", 2556, 49.1992, 20.2195),
]


def merc(lat, lon):
    """Global pixel at zoom Z (web mercator, 256 px tiles)."""
    n = 2 ** Z * 256
    return (lon + 180) / 360 * n, (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n


def png_rgb(data):
    """Decodes an 8-bit RGB, non-interlaced PNG into rows of r, g, b bytes."""
    assert data[:8] == b"\x89PNG\r\n\x1a\n"
    pos, idat = 8, b""
    while pos < len(data):
        size, kind = struct.unpack(">I4s", data[pos:pos + 8])
        body = data[pos + 8:pos + 8 + size]
        if kind == b"IHDR":
            w, h, depth, color, _, _, interlace = struct.unpack(">IIBBBBB", body)
            assert depth == 8 and color == 2 and not interlace
        elif kind == b"IDAT":
            idat += body
        pos += 12 + size
    raw, stride, rows, prev = zlib.decompress(idat), w * 3, [], bytearray(w * 3)
    for y in range(h):
        f, line = raw[y * (stride + 1)], bytearray(raw[y * (stride + 1) + 1:(y + 1) * (stride + 1)])
        for i in range(stride):
            a = line[i - 3] if i >= 3 else 0
            b, c = prev[i], prev[i - 3] if i >= 3 else 0
            if f == 1:
                line[i] = (line[i] + a) & 255
            elif f == 2:
                line[i] = (line[i] + b) & 255
            elif f == 3:
                line[i] = (line[i] + (a + b) // 2) & 255
            elif f == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                line[i] = (line[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(line)
        prev = line
    return rows


class Terrain:
    """Elevation in metres over a block of tiles, averaged over (2 * blur + 1) pixels square to take out the noise."""

    def __init__(self, tiles_x, tiles_y, blur=1):
        folder = os.environ.get("TERRAIN_TILES") or os.path.join(tempfile.gettempdir(), "kosorin-terrain")
        os.makedirs(folder, exist_ok=True)
        self.x0, self.y0 = tiles_x[0] * 256, tiles_y[0] * 256
        mosaic = [[0.0] * (256 * len(tiles_x)) for _ in range(256 * len(tiles_y))]
        for ti, tx in enumerate(tiles_x):
            for tj, ty in enumerate(tiles_y):
                path = os.path.join(folder, f"{Z}_{tx}_{ty}.png")
                if not os.path.exists(path):
                    urllib.request.urlretrieve(f"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{Z}/{tx}/{ty}.png", path)
                for y, row in enumerate(png_rgb(open(path, "rb").read())):
                    for x in range(256):
                        r, g, b = row[3 * x:3 * x + 3]
                        mosaic[tj * 256 + y][ti * 256 + x] = r * 256 + g + b / 256 - 32768
        h, w, near = len(mosaic), len(mosaic[0]), range(-blur, blur + 1)
        rows = [[sum(row[min(w - 1, max(0, x + i))] for i in near) / len(near) for x in range(w)] for row in mosaic]
        self.grid = [[sum(rows[min(h - 1, max(0, y + j))][x] for j in near) / len(near) for x in range(w)] for y in range(h)]
        self.w, self.h = w, h

    def inside(self, gx, gy):
        return 0 <= gx - self.x0 < self.w - 1 and 0 <= gy - self.y0 < self.h - 1

    def at_px(self, gx, gy):
        """Elevation at a global pixel, bilinear between the terrain pixels."""
        px, py = gx - self.x0, gy - self.y0
        i, j = int(px), int(py)
        fx, fy = px - i, py - j
        r0, r1 = self.grid[j], self.grid[j + 1]
        return (r0[i] * (1 - fx) + r0[i + 1] * fx) * (1 - fy) + (r1[i] * (1 - fx) + r1[i + 1] * fx) * fy

    def at(self, lat, lon):
        return self.at_px(*merc(lat, lon))
