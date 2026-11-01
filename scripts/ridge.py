"""Writes ridge.svg, the mountain line under the header, and the peaks of its hover easter egg in index.html.
Run from the repo root: python -I scripts/ridge.py

The line is the real skyline of the High Tatras, worked out from the elevation data in terrain.py as seen from Kozie
chrbty, the ridge between Liptov and the Poprad basin, from where the six named summits all stand on the skyline.
Left to right across the 640x120 viewBox goes by compass bearing, at the scale of the map below (map.py), Kriváň to
Kežmarský across 286 units, with the mountain in the middle. Up goes the angle you see the skyline at, then the line
is scaled along its length so every named summit stands at its real height (see BASE below); the far ends ease down
into a flat line like a drawing would, and the line keeps only the tops that matter at this size.
The easter egg in index.html is 128 thin strips; the strips nearest each of the best known summits (LABELLED) are
grouped into a <b> that carries its name and height, and where its top is in the viewBox (--x across, --y down). style.css puts a dot on that top and the name in the middle of the mountain."""
import math, os, re, sys

sys.dont_write_bytecode = True  # no __pycache__ in the repo
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from terrain import PEAKS, Terrain, merc

W, H, STRIPS = 640, 120, 128
VIEW = (49.025, 20.15)  # on Kozie chrbty, the ridge between Liptov and the Poprad basin
R = 6371000 / (1 - .13)  # the earth's radius, with the usual allowance for light bending over the curve

terrain = Terrain(range(1136, 1141), range(701, 704), blur=1)
lat0, lon0 = VIEW
eye = terrain.at(lat0, lon0) + 2
kx = 111320 * math.cos(math.radians(lat0))


def summit(lat, lon):
    return max((terrain.at(lat + a * .0005, lon + b * .00075), lat + a * .0005, lon + b * .00075)
               for a in range(-6, 7) for b in range(-6, 7))


def bearing_angle(h, lat, lon):
    dx, dy = (lon - lon0) * kx, (lat - lat0) * 111200
    d = math.hypot(dx, dy)
    return math.atan2(dx, dy), math.atan2(h - eye - d * d / (2 * R), d)


def skyline(az, step=60):
    """The highest angle above the eye along one bearing, as far as the terrain goes."""
    best, d = -1, 300
    while True:
        lat, lon = lat0 + d * math.cos(az) / 111200, lon0 + d * math.sin(az) / kx
        if not terrain.inside(*merc(lat, lon)):
            return best
        best = max(best, math.atan2(terrain.at(lat, lon) - eye - d * d / (2 * R), d))
        d += step


def simplify(pts, eps):
    if len(pts) < 3:
        return pts
    (x0, y0), (x1, y1) = pts[0], pts[-1]
    dx, dy = x1 - x0, y1 - y0
    norm = math.hypot(dx, dy)
    far, idx = max((abs(dy * (x - x0) - dx * (y - y0)) / norm, i) for i, (x, y) in enumerate(pts))
    return simplify(pts[:idx + 1], eps)[:-1] + simplify(pts[idx:], eps) if far > eps else [pts[0], pts[-1]]


# the named summits where OpenStreetMap has them (moving them onto the highest ground nearby would pull the smaller ones
# onto the slopes of their big neighbours)
tops = [bearing_angle(terrain.at(lat, lon), lat, lon) for _, _, lat, lon in PEAKS]
NAMES = [name for name, *_ in PEAKS]
left_az, right_az = tops[NAMES.index("Kriváň")][0], tops[NAMES.index("Kežmarský štít")][0]
# the map's scale, Kriváň to Kežmarský across 286 units, slid along so the mountain stands in the middle of the box,
# its feet (where it leaves the flat line) as far from either end
shift = 0
to_x = lambda az: 132 + shift + (az - left_az) / (right_az - left_az) * (418 - 132)
to_az = lambda x: left_az + (x - 132 - shift) / (418 - 132) * (right_az - left_az)
xs = [i / 2 for i in range(2 * W + 1)]
sky = [skyline(to_az(x)) for x in xs]
peak, floor = max(sky), sorted(sky)[len(sky) // 5]  # the lowest fifth of the view is the flat line


def ease(x, a=30, b=100, c=455, e=560):
    """1 across the range, easing to 0 towards the ends, so the far hills slope down into the flat line (x on the
    terrain, before the line is slid along)."""
    t = 0 if x <= a or x >= e else 1 if b <= x <= c else (x - a) / (b - a) if x < b else (e - x) / (e - c)
    return t * t * (3 - 2 * t)


to_y = lambda a, x: round(116 - max(0, (a - floor) / (peak - floor)) * 102 * ease(x - shift), 1)
feet = [x for x, a in zip(xs, sky) if to_y(a, x) < 115.5]
shift = W / 2 - (feet[0] + feet[-1]) / 2
sky = [skyline(to_az(x)) for x in xs]
pts = [(x, to_y(a, x)) for x, a in zip(xs, sky)]
# the tops of the line: points higher than everything within a unit either side, that stand at least 2 units above
# the lowest point on the way to higher ground on both sides (or the end), so they are tops you can see
def drop(i, way):
    low = pts[i][1]
    for j in way:
        if pts[j][1] < pts[i][1]:
            break
        low = max(low, pts[j][1])
    return low - pts[i][1]


line_tops = [i for i in range(2, len(pts) - 2) if pts[i][1] < pts[i - 1][1] and pts[i][1] <= min(p[1] for p in pts[i - 2:i + 3])
             and min(drop(i, range(i - 1, -1, -1)), drop(i, range(i + 1, len(pts)))) >= 2]
# each named summit gets the top nearest to where it stands, within 5 units, closest pairs first; the line keeps these
# points exactly, so the dots sit on them
sys.stdout.reconfigure(encoding="utf-8")
at, kept = {}, set()
for gap, k, i in sorted((abs(xs[i] - to_x(az)), k, i) for k, (az, _) in enumerate(tops) for i in line_tops):
    if gap <= 5 and k not in at and i not in kept:
        at[k] = i
        kept.add(i)
for k, (name, *_) in enumerate(PEAKS):
    if k not in at:
        print(f"{name}: no top of its own on the line")
# from a single spot the nearer summits look taller than they are. so the line is scaled up and down along its length
# until every named top stands at its real height, on one straight scale from BASE at the flat line to Gerlach, the
# scale blended from one top to the next, so the shape between them stays the shape of the view. the blend is flat at
# each top (it eases in and out), so the ground right beside a top never gets lifted above it
BASE, top_h = 1500, max(official for _, official, *_ in PEAKS)
marks = sorted((pts[i][0], (official - BASE) / (top_h - BASE) * 102 / (116 - pts[i][1]))
               for k, i in at.items() for official in [PEAKS[k][1]])


def scale(x):
    if x <= marks[0][0]:
        return marks[0][1]
    for (x0, f0), (x1, f1) in zip(marks, marks[1:]):
        if x <= x1:
            s = (x - x0) / (x1 - x0)
            return f0 + (f1 - f0) * s * s * (3 - 2 * s)
    return marks[-1][1]


pts = [(x, round(116 - (116 - y) * scale(x), 1)) for x, y in pts]
# where two tops close together need very different scales, the ground beside the smaller one can still come out
# higher than it; so from each top out to the lowest point on either side, nothing may stand above the top
order = sorted(at.values())
bounds = [0] + [max(range(a + 1, b), key=lambda i: pts[i][1]) for a, b in zip(order, order[1:])] + [len(pts) - 1]
for i, lo, hi in zip(order, bounds, bounds[1:]):
    tx, ty = pts[i]
    for j in range(lo, hi + 1):
        if j != i:
            pts[j] = (pts[j][0], round(max(pts[j][1], ty + .3 * abs(pts[j][0] - tx)), 1))
spots = {k: pts[i] for k, i in at.items()}
# and the lowest point between each two of them, so every named top keeps its dip either side however small
tops_at = sorted(kept)
dips = {max(range(a + 1, b), key=lambda i: pts[i][1]) for a, b in zip(tops_at, tops_at[1:])}
cuts = sorted(kept | dips | {0, len(pts) - 1})
line = [pts[0]]
for a, b in zip(cuts, cuts[1:]):
    line += simplify(pts[a:b + 1], 2)[1:]
d = "M" + " L".join(f"{x:g} {y:g}" for x, y in line)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">
<!-- the real skyline of the High Tatras from Kozie chrbty, Kriváň to Kežmarský; drawn by scripts/ridge.py
     from SRTM and EU-DEM elevation data (Terrain Tiles on AWS Open Data) -->
<path d="{d}"
  fill="none" stroke="#000" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
'''
open("ridge.svg", "w", encoding="utf-8", newline="\n").write(svg)

# the easter egg names only the best known of them (all of them still set the heights above): every strip goes to the
# nearest of those, so anywhere along the line shows one. a top sits on the line on the point of the line that is its
# top. Rysy and Kežmarský would belong here too, but from Kozie chrbty they hide behind Vysoká and Lomnický
LABELLED = {"Kriváň", "Kôprovský štít", "Satan", "Vysoká", "Gerlachovský štít", "Slavkovský štít", "Lomnický štít"}
spots = {k: p for k, p in spots.items() if PEAKS[k][0] in LABELLED}
width = W / STRIPS
owner = [min(spots, key=lambda p: abs(spots[p][0] - (k + .5) * width)) for k in range(STRIPS)]
html, k = "", 0
while k < STRIPS:
    n = 1
    while k + n < STRIPS and owner[k + n] == owner[k]:
        n += 1
    name, official, _, _ = PEAKS[owner[k]]
    x, y = spots[owner[k]]
    html += (f'<b data-peak="{name}" data-h="{official} m" style="flex:{n};--x:{x:g};--y:{y:g}">'
             + "<i></i>" * n + "</b>")
    print(f"{name}: x {x:.0f}, y {y:.0f}")
    k += n
page = open("index.html", encoding="utf-8").read()
page, found = re.subn(r'(<div class="ridge" aria-hidden="true">).*?(</div>)', lambda m: m.group(1) + html + m.group(2), page)
assert found == 1
open("index.html", "w", encoding="utf-8", newline="\n").write(page)
print(len(svg))
