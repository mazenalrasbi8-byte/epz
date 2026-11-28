/* Gate Rush — the course builder shared by every topic map (epz-patch:maps).
   A map is a short list of steps: C.start(), C.gate(), C.belt(30), C.spins(3)… The builder keeps a cursor (f = distance along the
   course, y = height of the floor) and places floors, obstacles, coins, checkpoints and the six question gates in order.
   Jump limits it respects: a full-speed jump covers about 6.8 units forward and 2.2 up, so gaps stay at 3.2 or less (2.7 in Easy).
   Easy mode (o.easy): platforms 15% bigger, moving obstacles 15% slower, gaps a little shorter. */
(function () {
  var GR = (window.GR = window.GR || {}); GR.kits = GR.kits || {};
  GR.course = function (B, o, kit, pal) {
    var E = o && o.easy ? 1.15 : 1, SP = 1 / E, GP = o && o.easy ? 0.85 : 1;
    var P = Object.assign({ deck: "#E8C98F", deck2: "#CFA96B", under: "#9C7A4A", trim: "#27C3C3", rail: "#C79B5A", plat: "#27C3C3", plat2: "#FFB454", tile: ["#9BE3EE", "#7FD6E6"], wall: "#7C5CFA", low: "#E5484D", belt: "#3B4252", stripe: "#F2B632", gate: null }, pal || {});
    var C = { f: -6, y: 0, gates: 0, B: B, P: P, kit: kit || {}, easy: E > 1 };
    function coinRow(f0, f1, n, x, y) { B.coinLine(x, (y === undefined ? C.y : y) + 1.1, f0, x, (y === undefined ? C.y : y) + 1.1, f1, n); }
    C.coins = coinRow;
    // a plain floor from the cursor forward; rails keep you on it; decorations from the kit along both sides
    C.deck = function (len, d) {
      d = d || {}; var f0 = C.f, f1 = C.f + len, w = (d.w || 10) / 2, top = C.y, col = d.color || P.deck;
      B.slab(-w, w, f0, f1, top, 3, col); B.block(-w, w, f0, f1, top - 3.01, top - 3, P.under, true);
      B.deco(-w - .05, -w + .4, f0, f1, top - 3, top + .02, P.trim); B.deco(w - .4, w + .05, f0, f1, top - 3, top + .02, P.trim);
      if (d.rails !== false && w >= 4) { B.block(-w - .6, -w, f0, f1, top, top + 1.15, P.rail); B.block(w, w + .6, f0, f1, top, top + 1.15, P.rail); }
      for (var p = Math.ceil(f0 / 24) * 24; p < f1; p += 24) { B.deco(-w, -w + 1.2, p, p + 1.4, top - 14, top - 3, P.deck2); B.deco(w - 1.2, w, p, p + 1.4, top - 14, top - 3, P.deck2); }
      if (C.kit.side && d.decor !== false) C.kit.side(B, f0, f1, top, w, P);
      C.f = f1; return f0;
    };
    C.gap = function (len) { C.f += len * GP; };
    C.cp = function (at) { B.checkpoint(at === undefined ? C.f + 2 : at, 0, C.y); };
    C.start = function () {
      B.start(0, C.y, -2); var f0 = C.deck(34); B.checkpoint(f0 + 4, 0, C.y);
      if (C.kit.arch) C.kit.arch(B, f0 + 20, C.y, P); coinRow(f0 + 8, f0 + 30, 6, 0);
    };
    // a question gate on its own floor, with a checkpoint just after it
    C.gate = function () { var f0 = C.deck(22); B.gate(f0 + 9, C.y); B.checkpoint(f0 + 14, 0, C.y); C.gates++; coinRow(f0 + 15, f0 + 20, 2, 2.5); };
    C.finish = function () {
      var f0 = C.deck(14), fin = f0 + 8, y = C.y; C.f = f0; C.deck(34, { decor: false });
      for (var cx = -5; cx < 5; cx++) for (var cz = 0; cz < 2; cz++) B.deco(cx, cx + 1, fin + cz, fin + cz + 1, y, y + .04, (cx + cz) % 2 ? "#13232F" : "#FFFFFF");
      B.deco(-5.8, -4.6, fin - 1, fin + 1, y, y + 10, P.trim); B.deco(4.6, 5.8, fin - 1, fin + 1, y, y + 10, P.trim); B.deco(-5.8, 5.8, fin - 1, fin + 1, y + 9, y + 10.6, "#F2B632");
      for (var k = -5; k < 5; k++) B.deco(k, k + 1, fin - 1.1, fin - .9, y + 7.2, y + 8.8, (k % 2) ? "#FFFFFF" : "#13232F");
      B.flag(-8, y, fin, "#F2B632"); B.flag(8, y, fin, P.trim); B.finish(fin, y);
    };
    /* ---------------- obstacles over a gap (the next step starts with a floor) ---------------- */
    C.movers = function (n, d) {   // platforms sliding left and right
      d = d || {}; C.gap(1.2); var dd = 6.6 * E, ww = 5.05 * E, amp = d.amp || 2, sp = (d.speed || .8) * SP;
      for (var i = 0; i < n; i++) { (function (fc, ph) { B.mover({ x: 0, y: C.y, f: fc, w: ww, d: dd, th: 1, color: d.color || P.plat, fn: function (t) { return [amp * Math.sin(t * sp + ph), fc]; } }); })(C.f + dd / 2, i * 3.14); B.coin(0, C.y + 2.2, C.f + dd / 2); C.f += dd + (i < n - 1 ? .9 * GP : 0); }
      C.gap(1.2);
    };
    C.tiles = function (rows, d) {   // blinking tiles: each row always keeps at least two tiles on
      d = d || {}; C.gap(1.4); var tw = 3 * E, td = 3.2 * E, cols = [-3.3, 0, 3.3], step = td + 1.4 * GP;
      for (var r = 0; r < rows; r++) cols.forEach(function (x, c) { B.tiles({ x: x, y: C.y, f: C.f + td / 2 + r * step, w: tw, d: td, th: .8, color: P.tile[r % 2], period: 4.8, on: 3.6 + (E > 1 ? .4 : 0), phase: (r * 1.3 + c * 1.6) % 4.8 }); });
      C.f += rows * step - 1.4 * GP; C.gap(d.last || 2.2);
    };
    C.fallers = function (n, d) {   // platforms that drop shortly after you land
      d = d || {}; C.gap(1.5); var dd = 5.5 * E;
      for (var i = 0; i < n; i++) { B.faller({ x: [0, -1.6, 1.6][i % 3], y: C.y, f: C.f + dd / 2, w: 4 * E, d: dd, th: .9, color: d.color || P.plat2 }); B.coin([0, -1.6, 1.6][i % 3], C.y + 1.6, C.f + dd / 2); C.f += dd + (i < n - 1 ? 1.5 * GP : 0); }
      C.gap(1.5);
    };
    C.spins = function (n, d) {   // spinning discs with short gaps between them
      d = d || {}; C.gap(1.4); var r = 3.2 * E;
      for (var i = 0; i < n; i++) { B.spin({ x: 0, f: C.f + r, y: C.y, r: r, w: (d.w || 1.1) * SP * (i % 2 ? -1 : 1), color: d.color || P.plat, stripe: d.stripe || "#FFFFFF" }); B.coin(0, C.y + 1.3, C.f + r); C.f += 2 * r + (i < n - 1 ? 1.6 * GP : 0); }
      C.gap(1.4);
    };
    C.pillars = function (n, d) {   // pillars rising and sinking out of step; jump on while they are high
      d = d || {}; C.gap(1.3); var s = 3.4 * E, sp = (d.speed || 1.2) * SP, base = C.y;
      for (var i = 0; i < n; i++) { (function (fc, ph, x) { B.mover({ x: x, y: base, f: fc, w: s, d: s, th: 6, color: i % 2 ? P.plat2 : P.plat, fn: function (t) { return [x, fc, base - .3 + Math.sin(t * sp + ph) * .6]; } }); })(C.f + s / 2, i * 1.3, d.zig ? [0, -1.8, 1.8][i % 3] : 0); C.f += s + (i < n - 1 ? 1.3 * GP : 0); }
      C.gap(1.3);
    };
    C.seesaws = function (n, d) {   // two halves that rock up and down against each other
      d = d || {}; C.gap(1.2); var hd = 3.4 * E, sp = (d.speed || 1.3) * SP, base = C.y;
      for (var i = 0; i < n; i++) { [0, 1].forEach(function (k) { (function (fc, ph) { B.mover({ x: 0, y: base, f: fc, w: 5 * E, d: hd, th: 1, color: k ? P.plat2 : P.plat, fn: function (t) { return [0, fc, base + Math.sin(t * sp + ph) * .7]; } }); })(C.f + hd / 2 + k * hd, k * Math.PI + i); }); B.deco(-.3, .3, C.f + hd - .3, C.f + hd + .3, base - 6, base - .8, "#2A2F36"); C.f += hd * 2 + (i < n - 1 ? 1.4 * GP : 0); }
      C.gap(1.2);
    };
    C.pad = function (d) {   // a jump pad that throws you over a long gap (optionally up to a higher floor)
      d = d || {}; C.deck(8, { decor: false }); var pd = B.pad({ x: 0, y: C.y + .08, f: C.f - 2.5, w: 5 * E, d: 2.4 }); pd.walk = true; C.f += 6;
      for (var i = 0; i < 3; i++) B.coin(0, C.y + 5 + (i === 1 ? .8 : 0), C.f - 5 + i * 2); C.y += d.up || 0;
    };
    C.lift = function (dy, d) {   // a lift that carries you up to the next floor
      d = d || {}; var base = C.y, top = C.y + dy, sp = (d.speed || .55) * SP, fc = C.f + 3;
      B.mover({ x: 0, y: base, f: fc, w: 5 * E, d: 5.6, th: 1, color: d.color || P.plat2, fn: function (t) { var k = (Math.sin(t * sp) + 1) / 2; k = k * k * (3 - 2 * k); return [0, fc, base + k * dy]; } });
      B.deco(-3.2, -2.7, fc - 2.8, fc + 2.8, base - 3, top + 1.2, "#2A2F36"); B.deco(2.7, 3.2, fc - 2.8, fc + 2.8, base - 3, top + 1.2, "#2A2F36");
      C.f += 6; C.y = top; B.coin(0, top + 1.4, fc);
    };
    C.stairs = function (steps, rise) {   // steps up (rise 0.4 walks up, 1.0 needs a jump)
      rise = rise || .4; for (var i = 0; i < steps; i++) { C.y += rise; C.deck(2.4, { rails: false, decor: false }); } C.deck(4);
    };
    C.drop = function (dy) { C.y -= dy; };
    C.plank = function (len, d) {   // a narrow bridge, sometimes with a swinging hammer
      d = d || {}; var f0 = C.f, w = (d.w || 1.9) * E; B.slab(-w / 2, w / 2, f0, f0 + len, C.y, 1, d.color || "#B07A45");
      for (var q = f0 + 2; q < f0 + len; q += 5) { B.deco(-w / 2 - .2, -w / 2, q, q + .5, C.y - 1.4, C.y + .4, "#5A3A22"); B.deco(w / 2, w / 2 + .2, q, q + .5, C.y - 1.4, C.y + .4, "#5A3A22"); }
      (d.hammers || []).forEach(function (h, i) { B.hammer({ x: 0, y: C.y, f: f0 + len * (i + 1) / ((d.hammers.length) + 1), piv: 6.8, len: 5.4, amp: .8, speed: h * SP, phase: i * 1.7 }); });
      coinRow(f0 + 2, f0 + len - 2, Math.max(2, Math.round(len / 5)), 0); C.f = f0 + len;
    };
    C.fork = function (len, d) {   // the path splits: a quick narrow lane with sweepers, or a wider lane of blinking tiles
      d = d || {}; var f0 = C.f, w = 2.6 * E;
      B.slab(-4.8, -4.8 + w, f0, f0 + len, C.y, 1, d.color || "#B07A45");
      for (var s = f0 + 7; s < f0 + len - 4; s += 11) B.sweeper({ x: -4.8 + w / 2, y: C.y, f: s, len: 2.2, speed: 1.5 * SP, phase: s });
      var rows = Math.floor((len - 2) / 4.6);
      for (var r = 0; r < rows; r++) B.tiles({ x: 2.6, y: C.y, f: f0 + 2 + r * 4.6, w: 4.2 * E, d: 3.2 * E, th: .8, color: P.tile[r % 2], period: 4.8, on: 3.6, phase: (r * 1.7) % 4.8 });
      coinRow(f0 + 3, f0 + len - 3, 5, -4.8 + w / 2); C.f = f0 + len;
    };
    /* ---------------- obstacles on a floor ---------------- */
    C.belt = function (len, d) {   // a conveyor: vf < 0 pushes you back, vx pushes sideways
      d = d || {}; var f0 = C.f; B.belt({ x0: -5, x1: 5, f0: f0, f1: f0 + len, top: C.y, th: 3, vf: (d.vf === undefined ? -3 : d.vf) * SP, vx: (d.vx || 0) * SP, color: P.belt, stripe: P.stripe });
      B.block(-5.6, -5, f0, f0 + len, C.y, C.y + 1.15, P.rail); B.block(5, 5.6, f0, f0 + len, C.y, C.y + 1.15, P.rail);
      if (C.kit.side) C.kit.side(B, f0, f0 + len, C.y, 5, P);
      (d.lows || []).forEach(function (k) { B.slider({ cx: 0, amp: 2.4, w: 5.5, h: .9, y: C.y, f: f0 + len * k, speed: 2 * SP, phase: k * 6, color: P.low }); });
      coinRow(f0 + 3, f0 + len - 3, Math.round(len / 5), d.vx ? (d.vx > 0 ? -3 : 3) : 0); C.f = f0 + len;
    };
    C.ice = function (len) { var f0 = C.f; B.ice(-5, 5, f0, f0 + len, C.y, 3); B.block(-5.6, -5, f0, f0 + len, C.y, C.y + 1.15, P.rail); B.block(5, 5.6, f0, f0 + len, C.y, C.y + 1.15, P.rail); if (C.kit.side) C.kit.side(B, f0, f0 + len, C.y, 5, P); coinRow(f0 + 3, f0 + len - 3, Math.round(len / 6), 0); C.f = f0 + len; };
    C.sweepers = function (speeds, d) { var f0 = C.deck(16 * speeds.length + 4, d); speeds.forEach(function (s, i) { B.sweeper({ x: 0, y: C.y, f: f0 + 10 + i * 16, len: 4.6, speed: s * SP, phase: i * 1.3 }); B.coin(i % 2 ? 3.8 : -3.8, C.y + 1.1, f0 + 10 + i * 16 + 6); }); };
    C.hammers = function (n, d) { d = d || {}; var f0 = C.deck(14 * n + 6, d); for (var i = 0; i < n; i++) B.hammer({ x: 0, y: C.y, f: f0 + 9 + i * 14, piv: 6.8, len: 5.4, amp: 1, speed: (d.speed || 1.9) * SP, phase: i * 3.14 }); coinRow(f0 + 5, f0 + 14 * n, n + 2, 0); };
    C.balls = function (len, d) {
      d = d || {}; var f0 = C.deck(len + 8, d), lanes = d.lanes || [[-3.3, 8, 0], [.2, 8, .34], [3.5, 8, .67], [-1.6, 10.5, .15], [2, 10.5, .8]];
      lanes.forEach(function (l) { B.ball({ x: l[0], y: C.y, f0: f0 + 6, f1: f0 + len, r: d.r || 1, speed: l[1] * SP, phase: l[2] }); }); coinRow(f0 + 8, f0 + len - 4, 6, 0);
    };
    C.walls = function (d) {   // walls sliding across the floor; red low walls you jump over
      d = d || {}; var n = d.n || 2, f0 = C.deck(15 * n + 6, d);
      for (var i = 0; i < n; i++) {
        var f = f0 + 9 + i * 15;
        if ((d.low || []).indexOf(i) > -1) B.slider({ cx: 0, amp: 2.4, w: 5.5, h: .9, y: C.y, f: f, speed: 2.1 * SP, phase: i, color: P.low });
        else { B.slider({ cx: 0, amp: 3.3, w: 3.6, h: 3.2, y: C.y, f: f, speed: 1.3 * SP, phase: i, color: P.wall }); B.slider({ cx: 0, amp: 3.3, w: 3.6, h: 3.2, y: C.y, f: f, speed: 1.3 * SP, phase: i + 3.14, color: P.wall }); }
      }
      coinRow(f0 + 3, f0 + 6, 2, 0);
    };
    C.shutters = function (n, d) {   // shutters across the floor that lift open and drop shut in turn
      d = d || {}; var f0 = C.deck(13 * n + 6, d), base = C.y;
      for (var i = 0; i < n; i++) (function (f, ph) {
        var per = 3.6 * E, open = 2.2 * E;
        B.mover({ x: 0, y: base, f: f, w: 10, d: .8, th: 3, color: d.color || P.wall, fn: function (t) { var k = ((t + ph) % per) / per, u = k < open / per ? 1 : 0, sm = k < .08 ? k / .08 : k > open / per - .08 && k < open / per ? (open / per - k) / .08 : u; return [0, f, base + 3 + Math.max(0, Math.min(1, sm)) * 3.3]; } });
        B.deco(-5.6, -5, f - .6, f + .6, base, base + 7.2, "#2A2F36"); B.deco(5, 5.6, f - .6, f + .6, base, base + 7.2, "#2A2F36"); B.deco(-5.6, 5.6, f - .6, f + .6, base + 6.6, base + 7.2, "#2A2F36");
      })(f0 + 8 + i * 13, i * 1.2);
      coinRow(f0 + 3, f0 + 13 * n, n + 2, 0);
    };
    C.wind = function (len, d) {   // a narrow floor without rails while a fan pushes you sideways
      d = d || {}; var f0 = C.f, w = (d.w || 7) * E / 2, fx = (d.fx || 3) * SP, per = d.gust ? 5 : 0;
      B.slab(-w, w, f0, f0 + len, C.y, 3, P.deck); B.deco(-w - .05, -w + .4, f0, f0 + len, C.y - 3, C.y + .02, P.trim); B.deco(w - .4, w + .05, f0, f0 + len, C.y - 3, C.y + .02, P.trim);
      B.wind({ x0: -w - 2, x1: w + 2, f0: f0 + 1, f1: f0 + len - 1, y0: C.y - 2, y1: C.y + 6, fx: fx, on: per ? function (t) { return (t % per) < 3; } : null, color: d.color });
      coinRow(f0 + 3, f0 + len - 3, Math.round(len / 5), fx > 0 ? -1.5 : 1.5); C.f = f0 + len;
    };
    C.lows = function (n, d) { d = d || {}; var f0 = C.deck(10 * n + 6, d); for (var i = 0; i < n; i++) B.slider({ cx: 0, amp: 2.4, w: 5.5, h: .9, y: C.y, f: f0 + 7 + i * 10, speed: 2 * SP, phase: i * 1.7, color: P.low }); coinRow(f0 + 4, f0 + 10 * n, n, 0); };
    return C;
  };
})();
