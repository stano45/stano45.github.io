"""Writes map.svg: a small hiking map of the High Tatras behind the career path on the home page. 640x300 viewBox.
Run from the repo root: python -I scripts/map.py [output]

The ground is real: contours traced from the elevation data in terrain.py.
The map spans the same peaks as the mountain line in the header, at the same scale (Kriváň at x 132 and Kežmarský at
x 418; up there it is slid along so the mountain is in the middle). The trail is a hrebeňovka over five of them, one stop
each: Kriváň (TU Berlin), Rysy (PTX), Gerlach (Cresta), Slavkovský (AWS) and Lomnický (Forgent), where I'm standing
now. No marked trail crosses all five, so the route is the
highest way between them over the real ground (cheapest path when every step below the summits costs more), and from
Lomnický it carries on east over Kežmarský and off the sheet: the route continues on the next sheet. It is drawn
like a marked trail on a hiking map, in red: the colour of the main ridge trail, and of work on the rest of the site.
The waypoints are drawn by style.css from the .path list in index.html, and this writes where they go on it: the
stop (--x, --y) and where its label sits. Every label is the same distance from its stop, on whichever of the eight
sides keeps it off the trail, the other labels and stops, and the writing on the map."""
import heapq, itertools, math, os, re, sys

sys.dont_write_bytecode = True  # no __pycache__ in the repo
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from terrain import CREDIT, PEAKS, Terrain, merc

W, H = 640, 300
NAMED = {name: (official, lat, lon) for name, official, lat, lon in PEAKS}
# the summits with a stop on them, in the order the trail walks them; each is moved onto the highest ground nearby
STOP_PEAKS = ["Kriváň", "Rysy", "Gerlachovský štít", "Slavkovský štít", "Lomnický štít"]
EDGE = "Kežmarský štít"  # the next peak along, where the route goes on past the last stop
CENTER_LAT = 49.18
terrain = Terrain(range(1137, 1141), range(701, 703), blur=2)
# the sheet: Kriváň at x 132 and Kežmarský at x 418 of 640, the scale of the header line
(kx, _), (zx, _) = merc(*NAMED[STOP_PEAKS[0]][1:]), merc(*NAMED[EDGE][1:])
scale = (zx - kx) / (418 - 132)  # mosaic pixels per map unit
left, top = kx - 132 * scale, merc(CENTER_LAT, 0)[1] - H / 2 * scale  # global pixel of the top left corner
assert terrain.inside(left, top) and terrain.inside(left + W * scale, top + H * scale)


def height(x, y):
    """Metres above sea at a map point."""
    return terrain.at_px(left + x * scale, top + y * scale)


def to_map(lat, lon):
    gx, gy = merc(lat, lon)
    return (gx - left) / scale, (gy - top) / scale


# routing grid
STEP = 2
NX, NY = W // STEP + 1, H // STEP + 1
grid = [[height(i * STEP, j * STEP) for i in range(NX)] for j in range(NY)]


def summit(lat, lon, reach=8):
    """The highest grid node within reach (map units) of a point."""
    x, y = to_map(lat, lon)
    r = reach // STEP
    ci, cj = round(x / STEP), round(y / STEP)
    return max(((grid[j][i], i, j) for i in range(ci - r, ci + r + 1) for j in range(cj - r, cj + r + 1)
                if (i - ci) ** 2 + (j - cj) ** 2 <= r * r), key=lambda t: t[0])


def route(start, goal, ceiling, avoid={}):
    """Cheapest way from node start to node goal (or to the east edge when goal is None); a step costs more the further
    it is below the ceiling, so the way keeps to the ridges, and avoid maps nodes to how many times more they cost."""
    best, prev, todo = {start: 0}, {}, [(0, start)]
    while todo:
        cost, node = heapq.heappop(todo)
        if node == goal or (goal is None and node[0] == NX - 1):
            break
        if cost > best[node]:
            continue
        i, j = node
        for di in (-1, 0, 1):
            for dj in (-1, 0, 1):
                n = (i + di, j + dj)
                if (di or dj) and 0 <= n[0] < NX and 0 <= n[1] < NY:
                    c = cost + math.hypot(di, dj) * math.exp((ceiling - grid[n[1]][n[0]]) / 110) * avoid.get(n, 1)
                    if c < best.get(n, 1e300):
                        best[n], prev[n] = c, node
                        heapq.heappush(todo, (c, n))
    way = [node]
    while way[-1] != start:
        way.append(prev[way[-1]])
    return [(i * STEP, j * STEP) for i, j in reversed(way)]


sys.stdout.reconfigure(encoding="utf-8")  # the peak names, on a Windows console too
tops = [summit(*NAMED[name][1:]) for name in STOP_PEAKS]
for name, (h, i, j) in zip(STOP_PEAKS, tops):
    print(f"{name}: {h:.0f} m at x {i * STEP}, y {j * STEP}")


# Slavkovský sits at the end of a side ridge, and the cheapest way on from it walks back out alongside the way in. so
# the ground near the trail walked so far costs more, a lot more the nearer it is (10 000 times on the trail, nothing
# from 24 units off): a leg leaves a stop straight away from the way in and takes its own way, even off the ridges
CLEAR = 12  # nodes
walked = {}  # node: distance to the trail so far, in nodes, for the nodes nearer than CLEAR


def walk(leg):
    for i, j in leg:
        i, j = i // STEP, j // STEP
        for a in range(-CLEAR, CLEAR + 1):
            for b in range(-CLEAR, CLEAR + 1):
                d = math.hypot(a, b)
                if d < CLEAR and d < walked.get((i + a, j + b), CLEAR):
                    walked[i + a, j + b] = d


def penalty():
    return {n: 1e4 ** ((CLEAR - d) / CLEAR) for n, d in walked.items()}


legs = []
for (h0, i0, j0), (h1, i1, j1) in zip(tops, tops[1:]):
    legs.append(route((i0, j0), (i1, j1), max(h0, h1), penalty()))
    walk(legs[-1])
TRAIL = [p for leg in legs for p in leg]
AHEAD = route(tops[-1][1:], None, tops[-1][0], penalty())
AHEAD = [p for k, p in enumerate(AHEAD) if sum(math.dist(a, b) for a, b in zip(AHEAD[:k], AHEAD[1:k + 1])) < 70]
STOPS = [(i * STEP, j * STEP) for _, i, j in tops]


def contours(levels, step=3):
    nx, ny = W // step + 1, H // step + 1
    g = [[height(i * step, j * step) for i in range(nx)] for j in range(ny)]
    out = []
    for lv in levels:
        cross = {}  # one point per grid edge, so neighbouring cells share it exactly and the pieces join up

        def point(c0, c1):
            key = (min(c0, c1), max(c0, c1))
            if key not in cross:
                (a0, b0), (a1, b1) = key
                v0, v1 = g[b0][a0], g[b1][a1]
                t = (lv - v0) / (v1 - v0)
                cross[key] = ((a0 + t * (a1 - a0)) * step, (b0 + t * (b1 - b0)) * step)
            return cross[key]
        segs = []
        for j in range(ny - 1):
            for i in range(nx - 1):
                corners = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
                vals = [g[b][a] for a, b in corners]
                pts = [point(corners[k], corners[(k + 1) % 4]) for k in range(4)
                       if (vals[k] < lv) != (vals[(k + 1) % 4] < lv)]
                if len(pts) == 2:
                    segs.append((pts[0], pts[1]))
                elif len(pts) == 4:
                    segs += [(pts[0], pts[1]), (pts[2], pts[3])]
        out.append(chain(segs))
    return out


def chain(segs):
    """Joins segments that share endpoints into polylines; a closed ring ends on the point it starts on."""
    ends = {}
    for s in segs:
        for p in s:
            ends.setdefault(p, []).append(s)
    used, lines = set(), []
    for s in segs:
        if id(s) in used:
            continue
        used.add(id(s))
        line = list(s)
        for grow_front in (False, True):
            while True:
                tip = line[0] if grow_front else line[-1]
                nxt = next((t for t in ends.get(tip, []) if id(t) not in used), None)
                if not nxt:
                    break
                used.add(id(nxt))
                q = nxt[1] if nxt[0] == tip else nxt[0]
                line.insert(0, q) if grow_front else line.append(q)
        lines.append(simplify(line, 1.5))
    return lines


def simplify(pts, eps):
    if len(pts) < 3:
        return pts
    (x0, y0), (x1, y1) = pts[0], pts[-1]
    dx, dy = x1 - x0, y1 - y0
    norm = math.hypot(dx, dy)
    # a closed ring starts and ends on the same point, so measure from that point instead of from a line
    dist = (lambda x, y: abs(dy * (x - x0) - dx * (y - y0)) / norm) if norm else (lambda x, y: math.hypot(x - x0, y - y0))
    far, idx = max((dist(x, y), i) for i, (x, y) in enumerate(pts))
    return simplify(pts[:idx + 1], eps)[:-1] + simplify(pts[idx:], eps) if far > eps else [pts[0], pts[-1]]


def smooth(points):
    """Catmull-Rom through the points, as cubic beziers; a closed ring wraps around so it has no corner where it starts."""
    closed = len(points) > 3 and points[0] == points[-1]
    p = [points[-2]] + points + [points[1]] if closed else [points[0]] + points + [points[-1]]
    d = f"M{points[0][0]:.0f} {points[0][1]:.0f}"
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.0f} {c1[1]:.0f} {c2[0]:.0f} {c2[1]:.0f} {p2[0]:.0f} {p2[1]:.0f}"
    return d + ("Z" if closed else "")


def trail_path(points):
    """The routed way, straightened a little where it zigzags between grid nodes, but still through every summit."""
    keep = sorted({0, len(points) - 1} | {k for k, p in enumerate(points) if p in STOPS})
    out = []
    for a, b in zip(keep, keep[1:]):
        out += simplify(points[a:b + 1], 2)[len(out) and 1:]
    return smooth(out)


# the labels. sizes in px as the page draws them (measured in the browser: name and years, and "you are here" on the
# last stop; on hover the role shows in the corner, not in the label), turned into map units where the map is
# smallest (36rem window: 536 px across), where they take up the most of it; anywhere bigger everything shrinks
# towards its stop, so what is clear here stays clear
PX = W / 536
LABELS = [(78.4, 42.2), (85, 42.2), (85, 42.2), (39, 42.2), (82.8, 54.2)]  # in STOP_PEAKS order: TU Berlin .. Forgent
GAP = 9  # px from a stop to the nearest edge or corner of its label: 3 px clear of the dot, highlighted or not
OWN = 28  # every other stop at least this far (map units) from a label, so it is plain which stop it belongs to
SIDES = [(1, 0), (-1, 0), (1, -1), (1, 1), (-1, -1), (-1, 1), (0, -1), (0, 1)]  # right first, left, the corners, then above, below
end_x, end_y = AHEAD[-1]
font = 'font-family="Bahnschrift Condensed, Bahnschrift, Arial Narrow, sans-serif"'
# continues, the credit, and the bottom left corner, where the role of a hovered stop shows (10 px in, a line high)
writing = [(end_x + 6, end_y - 6, end_x + 72, end_y + 5), (634 - 4 * len(CREDIT), 287, 634, 296),
           (0, H - 34 * PX, 240 * PX, H)]
way = TRAIL + AHEAD


def box(stop, size, side):
    """The label of a stop on one side of it: left, top, right, bottom in map units."""
    (x, y), (w, h), (ux, uy) = stop, size, side
    n = math.hypot(ux, uy)
    ax, ay = x + GAP * PX * ux / n, y + GAP * PX * uy / n  # the point of the label nearest the stop
    left, top = ax - (1 - ux) / 2 * w * PX, ay - (1 - uy) / 2 * h * PX
    return left, top, left + w * PX, top + h * PX


def apart(p, b):
    """How far a point is from a box (0 inside it)."""
    return math.hypot(max(b[0] - p[0], 0, p[0] - b[2]), max(b[1] - p[1], 0, p[1] - b[3]))


def clear(b):
    """How far a label is from the trail, or None where it is in the way of something it must not touch."""
    if b[0] < 3 or b[1] < 3 or b[2] > W - 3 or b[3] > H - 3:
        return None
    if any(b[0] < w[2] + 3 and w[0] - 3 < b[2] and b[1] < w[3] + 3 and w[1] - 3 < b[3] for w in writing):
        return None
    room = min(apart(p, b) for p in way)
    return room if room > 1.8 else None  # more than half the red line's width (2.6): the trail never runs into a label


options = []
for k, (stop, size) in enumerate(zip(STOPS, LABELS)):
    others = [s for s in STOPS if s != stop]
    options.append([(side, b, room) for side in SIDES for b in [box(stop, size, side)] if (room := clear(b)) is not None
                    and all(apart(s, b) > OWN for s in others)])
    assert options[-1], f"{STOP_PEAKS[k]}: no side is clear"
overlap = lambda a, b: a[0] < b[2] + 3 and b[0] - 3 < a[2] and a[1] < b[3] + 3 and b[1] - 3 < a[3]
# of the ways to put all of them where none overlaps, the one that leaves the trail the most room (each label up to 15
# units counts), on the side earliest in SIDES when that is a tie
best = max((pick for pick in itertools.product(*options)
            if not any(overlap(a[1], b[1]) for a, b in itertools.combinations(pick, 2))),
           key=lambda pick: (sum(min(room, 15) for _, _, room in pick), -sum(SIDES.index(side) for side, _, _ in pick)))
placed = [b for _, b, _ in best] + writing[2:]
items = []
for name, (x, y), (side, _, room) in zip(STOP_PEAKS, STOPS, best):
    (ux, uy), n = side, math.hypot(*side)
    align = ["start", "center", "end"][1 - ux]  # the text lines up on the side nearest its stop
    items.append(f"--x:{x};--y:{y};--ox:{GAP * ux / n:.1f};--oy:{GAP * uy / n:.1f};--ax:{(1 - ux) / 2:g};--ay:{(1 - uy) / 2:g};--al:{align}")
    print(f"{name}: label {side}, {room:.0f} units from the trail")
page = open("index.html", encoding="utf-8").read()
lis = re.findall(r'<li style="[^"]*">', page.split('<ol class="path"', 1)[1].split("</ol>", 1)[0])
assert len(lis) == len(items)
head, rest = page.split('<ol class="path"', 1)
body, tail = rest.split("</ol>", 1)
for li, style in zip(lis, reversed(items)):  # the list starts at the last stop
    body = body.replace(li, f'<li style="{style}">', 1)
open("index.html", "w", encoding="utf-8", newline="\n").write(head + '<ol class="path"' + body + "</ol>" + tail)

levels = list(range(800, 2700, 200))
rings, heights = [], []
near_trail = TRAIL[::4] + AHEAD[::4]
for lv, lines in zip(levels, contours(levels)):
    lines = [line for line in lines if len(line) > 2]
    index = lv % 1000 == 0
    rings.append(f'<path d="{" ".join(smooth(line) for line in lines)}" stroke-width="{1 if index else .6}" '
                 f'opacity="{.75 if index else .45}"/>')
    if not index:
        continue
    # like a printed map: the height on each index contour, upright along the line, well away from the trail
    spots = [(min(math.hypot(x - sx, y - sy) for sx, sy in near_trail), x, y, line[i + 1])
             for line in lines for i, (x, y) in enumerate(line[:-1]) if 24 < x < W - 24 and 14 < y < H - 20
             and all(apart((x, y), b) > 18 for b in placed)]
    if spots:
        clear, x, y, (x2, y2) = max(spots)
        if clear > 30:
            angle = math.degrees(math.atan2(y2 - y, x2 - x))
            angle = angle - 180 if angle > 90 else angle + 180 if angle < -90 else angle
            heights.append(f'<text transform="translate({x:.0f} {y:.0f}) rotate({angle:.0f})" dy="3">{lv}</text>')
trail = " ".join(trail_path(leg) for leg in legs)
ahead = smooth(simplify(AHEAD, 2))
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">
<!-- career path on a map of the High Tatras; the waypoints are drawn by style.css from the list in index.html.
     elevation: Terrain Tiles on AWS Open Data (Mapzen), from SRTM (NASA, public domain) and EU-DEM
     (produced using Copernicus data and information funded by the European Union, EU-DEM layers) -->
<g fill="none" stroke="#c8b393" stroke-linejoin="round">{"".join(rings)}</g>
<g {font} font-size="8" letter-spacing=".4" fill="#b3a593" stroke="#fbf6ee" stroke-width="3" paint-order="stroke" text-anchor="middle">{"".join(heights)}</g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="{trail} {ahead}" stroke="#fbf6ee" stroke-width="6"/>
<path d="{trail}" stroke="#b0463f" stroke-width="2.6"/>
<path d="{ahead}" stroke="#b0463f" stroke-width="2.2" stroke-dasharray="5 4"/>
</g>
<g {font} fill="#82725f" stroke="#fbf6ee" paint-order="stroke">
<text x="{end_x + 6}" y="{end_y + 3}" font-size="10" letter-spacing=".8" stroke-width="4">CONTINUES &#8594;</text>
<text x="634" y="294" font-size="7" letter-spacing=".3" fill="#b3a593" stroke-width="3" text-anchor="end">{CREDIT}</text>
</g>
</svg>
'''
open(sys.argv[1] if len(sys.argv) > 1 else "map.svg", "w", encoding="utf-8", newline="\n").write(svg)
print(len(svg))
