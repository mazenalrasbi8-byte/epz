/* Gate Rush — the one map of version 1: "Sunrise Fort Run".
   A sandstone fort course in EPZ teal and gold, about 820 units long (a clean run takes around 90 seconds; a real race 2.5–3 minutes).
   Coordinates: x = left/right (track is 10 wide, -5..5), f = distance along the course, y = height (decks are at y = 0).
   To add more maps later: create another file that registers GR.maps.<id> with a build(B) function. The engine does not change. */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  var SAND = "#E8C98F", SAND2 = "#CFA96B", STONE = "#D9C7A3", TEAL = "#27C3C3", TEALD = "#0B7A63", GOLD = "#F2B632", WOOD = "#B07A45", ORANGE = "#FFB454";

  GR.maps.fort = { id: "fort", name: "Sunrise Fort Run", length: 818, gates: 8, build: function (B) {
    function deck(f0, f1, color, rails) {
      B.slab(-5, 5, f0, f1, 0, 3, color || SAND);
      B.block(-5, 5, f0, f1, -3.01, -3, SAND2, true);
      B.deco(-5.05, -4.6, f0, f1, -3, 0.02, TEAL); B.deco(4.6, 5.05, f0, f1, -3, 0.02, TEAL);   // teal edge trim
      if (rails) { B.block(-5.6, -5, f0, f1, 0, 1.15, "#C79B5A"); B.block(5, 5.6, f0, f1, 0, 1.15, "#C79B5A"); for (var f = f0 + 1; f < f1 - 1; f += 4) { B.deco(-5.6, -5, f, f + 1.4, 1.15, 1.7, "#C79B5A"); B.deco(5, 5.6, f, f + 1.4, 1.15, 1.7, "#C79B5A"); } }
      for (var p = Math.ceil(f0 / 24) * 24; p < f1; p += 24) { B.deco(-5, -3.8, p, p + 1.4, -14, -3, STONE); B.deco(3.8, 5, p, p + 1.4, -14, -3, STONE); }
    }
    function coinRow(f0, f1, n, x, y) { B.coinLine(x, y === undefined ? 1.1 : y, f0, x, y === undefined ? 1.1 : y, f1, n); }
    function islands() {
      for (var f = -10; f < 840; f += 30) [-1, 1].forEach(function (k) {
        var x = k * (11 + (f * 7 % 5)), w = 3 + (f * 3 % 3);
        B.deco(x - w, x + w, f, f + 2 * w, -9, -1.5, SAND2); B.deco(x - w, x + w, f, f + 2 * w, -1.5, 0, "#4CAF50");
        B.palm(x, 0, f + w);
      });
    }

    /* ---------------------------------------------------- A  START  (f -6 .. 62) */
    B.start(0, 0, 2); deck(-6, 62, SAND, true);
    // start arch + banners
    B.deco(-5.6, -4.4, 21, 23, 0, 9, STONE); B.deco(4.4, 5.6, 21, 23, 0, 9, STONE); B.deco(-5.6, 5.6, 21, 23, 8.2, 9.4, GOLD);
    for (var s = -4; s <= 4; s += 2) B.deco(s - 0.5, s + 0.5, 21, 23, 9.4, 10.1, STONE);
    B.flag(-7, 0, 2, TEALD); B.flag(7, 0, 2, TEAL); B.lamp(-5.2, 0, 14); B.lamp(5.2, 0, 14); B.lamp(-5.2, 0, 30); B.lamp(5.2, 0, 30);
    B.checkpoint(4, 0, 0); coinRow(12, 32, 6, 0); coinRow(14, 30, 5, -3);
    B.gate(40, 0); B.checkpoint(45, 0, 0);
    coinRow(48, 60, 4, 2.5);

    /* ---------------------------------------------------- B  BRIDGES & MOVING PLATFORMS  (f 62 .. 136) */
    B.slab(-0.95, 0.95, 62, 86, 0, 1, WOOD); for (var q = 64; q < 86; q += 5) { B.deco(-1.15, -0.95, q, q + 0.5, -1.4, 0.4, "#5A3A22"); B.deco(0.95, 1.15, q, q + 0.5, -1.4, 0.4, "#5A3A22"); }
    coinRow(66, 84, 7, 0, 1.2);
    // sliding platforms: wide, slow and close together so the jumps are fair (5.05 x 6.6, gaps about 0.9-1.2)
    B.mover({ x: 0, y: 0, f: 90.5, w: 5.05, d: 6.6, th: 1, color: TEAL, fn: function (t) { return [2.0 * Math.sin(t * 0.8), 90.5]; } });   // 6.6 deep: a full-speed jump from the edge lands on it
    B.mover({ x: 0, y: 0, f: 98, w: 5.05, d: 6.6, th: 1, color: TEAL, fn: function (t) { return [2.0 * Math.sin(t * 0.8 + 3.14), 98]; } });
    B.coin(0, 2.4, 86.75); B.coin(0, 2.9, 94.25); B.coin(0, 2.4, 101.75);
    deck(102.5, 128, STONE, true); B.checkpoint(104, 0, 0); coinRow(106, 122, 5, -2.5); coinRow(106, 122, 5, 2.5);
    B.pad({ x: 0, y: 0, f: 126, w: 3.6, d: 2.4 }); B.coin(0, 5, 130.5); B.coin(0, 5.6, 132.5); B.coin(0, 5, 134.5);
    /* ---------------------------------------------------- landing deck + gate 2 */
    deck(135, 192, SAND, true); B.gate(166, 0); B.checkpoint(172, 0, 0); coinRow(140, 160, 5, 0); coinRow(176, 188, 4, 0);

    /* ---------------------------------------------------- C  SWEEPERS & HAMMERS  (f 192 .. 292) */
    deck(192, 296, STONE, true);
    B.sweeper({ x: 0, y: 0, f: 210, len: 4.6, speed: 1.7, phase: 0 });
    B.sweeper({ x: 0, y: 0, f: 230, len: 4.6, speed: -2.0, phase: 1.2 });
    B.hammer({ x: 0, y: 0, f: 250, piv: 6.8, len: 5.4, amp: 1.0, speed: 1.9, phase: 0 });
    B.hammer({ x: 0, y: 0, f: 264, piv: 6.8, len: 5.4, amp: 1.0, speed: 1.9, phase: 3.14 });
    B.coin(-3.8, 1.1, 218); B.coin(3.8, 1.1, 240); B.coin(0, 1.1, 257); coinRow(200, 206, 3, 3.5); coinRow(270, 276, 3, 0);
    B.gate(284, 0); B.checkpoint(290, 0, 0);

    /* ---------------------------------------------------- D  DISAPPEARING FLOOR  (f 296 .. 354) */
    var rows = 11, cols = [-3.6, -1.2, 1.2, 3.6];
    for (var r = 0; r < rows; r++) cols.forEach(function (x, c) {
      B.tiles({ x: x, y: 0, f: 301 + r * 4.6, w: 2.2, d: 2.6, th: 0.8, color: r % 2 ? "#7FD6E6" : "#9BE3EE", period: 4.8, on: 3.1, phase: (r * 1.3 + c * 1.9) % 4.8 });
    });
    B.slab(-5, 5, 293, 298.5, 0, 3, SAND); B.coin(0, 1.6, 305); B.coin(-2.4, 1.6, 314); B.coin(2.4, 1.6, 323); B.coin(0, 1.6, 332); B.coin(-2.4, 1.6, 341);
    deck(352, 420, SAND, true); B.gate(382, 0); B.checkpoint(390, 0, 0); coinRow(358, 374, 5, 0);

    /* ---------------------------------------------------- E  ROLLING BOULDERS  (f 420 .. 500) */
    deck(420, 506, STONE, true);
    B.ball({ x: -3.3, y: 0, f0: 428, f1: 500, r: 1, speed: 8, phase: 0.0 });
    B.ball({ x: 0.2, y: 0, f0: 428, f1: 500, r: 1, speed: 8, phase: 0.34 });
    B.ball({ x: 3.5, y: 0, f0: 428, f1: 500, r: 1, speed: 8, phase: 0.67 });
    B.ball({ x: -1.6, y: 0, f0: 428, f1: 500, r: 1, speed: 10.5, phase: 0.15 });
    B.ball({ x: 2.0, y: 0, f0: 428, f1: 500, r: 1, speed: 10.5, phase: 0.8 });
    coinRow(436, 480, 10, 0); coinRow(444, 470, 6, -4); coinRow(444, 470, 6, 4);
    B.gate(496, 0); B.checkpoint(502, 0, 0);

    /* ---------------------------------------------------- F  MOVING WALLS & SWAYING BRIDGE  (f 506 .. 650) */
    deck(506, 580, SAND, true);
    B.slider({ cx: 0, amp: 3.3, w: 3.6, h: 3.2, y: 0, f: 524, speed: 1.3, phase: 0, color: "#7C5CFA" });
    B.slider({ cx: 0, amp: 3.3, w: 3.6, h: 3.2, y: 0, f: 524, speed: 1.3, phase: 3.14, color: "#7C5CFA" });
    B.slider({ cx: 0, amp: 2.4, w: 5.5, h: 0.9, y: 0, f: 540, speed: 2.1, phase: 0, color: "#E5484D" });
    B.slider({ cx: 0, amp: 3.6, w: 3.0, h: 3.2, y: 0, f: 556, speed: 1.6, phase: 1.0, color: "#7C5CFA" });
    B.slider({ cx: 0, amp: 3.6, w: 3.0, h: 3.2, y: 0, f: 556, speed: 1.6, phase: 4.1, color: "#7C5CFA" });
    B.slider({ cx: 0, amp: 2.4, w: 5.5, h: 0.9, y: 0, f: 568, speed: 2.1, phase: 1.6, color: "#E5484D" });
    coinRow(510, 520, 4, 0); coinRow(574, 578, 2, 0);
    B.slab(-0.95, 0.95, 580, 618, 0, 1, WOOD); for (var w = 582; w < 618; w += 5) { B.deco(-1.15, -0.95, w, w + 0.5, -1.4, 0.4, "#5A3A22"); B.deco(0.95, 1.15, w, w + 0.5, -1.4, 0.4, "#5A3A22"); }
    B.hammer({ x: 0, y: 0, f: 600, piv: 6.8, len: 5.4, amp: 0.8, speed: 2.1, phase: 0.5 });
    coinRow(584, 616, 9, 0, 1.2);
    deck(618, 650, STONE, true); B.gate(634, 0); B.checkpoint(641, 0, 0);

    /* ---------------------------------------------------- G  FALLING PLATFORMS  (f 650 .. 740) */
    // falling platforms: 5.5 deep with 1.5 gaps, so an edge jump at full speed always lands on the next one
    [[657.25, 0], [664.25, -1.6], [671.25, 1.6], [678.25, 0], [685.25, -1.6], [692.25, 1.6]].forEach(function (a) { B.faller({ x: a[1], y: 0, f: a[0], w: 4, d: 5.5, th: 0.9, color: ORANGE }); });
    B.slab(-5, 5, 650, 653, 0, 3, SAND);
    B.mover({ x: 0, y: 0, f: 699.5, w: 5.05, d: 6.6, th: 1, color: TEAL, fn: function (t) { return [2.0 * Math.sin(t * 1.0), 699.5]; } });
    B.mover({ x: 0, y: 0, f: 707, w: 5.05, d: 6.6, th: 1, color: TEAL, fn: function (t) { return [2.0 * Math.sin(t * 1.0 + 3), 707]; } });
    coinRow(657, 692, 6, 0, 1.6); B.coin(0, 2.2, 695.75); B.coin(0, 2.2, 703.25); B.coin(0, 2.2, 710.75);
    deck(711.5, 760, SAND, true);
    B.sweeper({ x: 0, y: 0, f: 722, len: 4.6, speed: 2.3, phase: 0.6 }); B.coin(-3.8, 1.1, 733); B.coin(3.8, 1.1, 733);
    B.gate(746, 0); B.checkpoint(752, 0, 0);

    /* ---------------------------------------------------- H  FINAL SECTION  (f 760 .. 860) */
    deck(760, 860, "#F5D27A", true);
    B.hammer({ x: 0, y: 0, f: 772, piv: 6.8, len: 5.4, amp: 1.05, speed: 2.2, phase: 0 });
    B.hammer({ x: 0, y: 0, f: 784, piv: 6.8, len: 5.4, amp: 1.05, speed: 2.2, phase: 3.14 });
    B.slider({ cx: 0, amp: 2.5, w: 5.5, h: 0.9, y: 0, f: 796, speed: 2.4, phase: 0, color: "#E5484D" });
    B.sweeper({ x: 0, y: 0, f: 808, len: 4.6, speed: 2.4, phase: 0 });
    coinRow(764, 800, 8, 0); coinRow(810, 826, 6, -3); coinRow(810, 826, 6, 3);
    B.gate(836, 0); B.checkpoint(842, 0, 0);
    // finish arch + checkered line
    var fin = 868;
    B.slab(-5, 5, 860, 892, 0, 3, "#F5D27A"); B.deco(-5.05, -4.6, 860, 892, -3, 0.02, TEAL); B.deco(4.6, 5.05, 860, 892, -3, 0.02, TEAL);
    for (var cx = -5; cx < 5; cx++) for (var cz = 0; cz < 2; cz++) B.deco(cx, cx + 1, fin + cz, fin + cz + 1, 0, 0.04, (cx + cz) % 2 ? "#13232F" : "#FFFFFF");
    B.deco(-5.8, -4.6, fin - 1, fin + 1, 0, 10, TEALD); B.deco(4.6, 5.8, fin - 1, fin + 1, 0, 10, TEALD); B.deco(-5.8, 5.8, fin - 1, fin + 1, 9, 10.6, GOLD);
    for (var k = -5; k < 5; k++) B.deco(k, k + 1, fin - 1.1, fin - 0.9, 7.2, 8.8, (k % 2) ? "#FFFFFF" : "#13232F");
    B.flag(-8, 0, fin, GOLD); B.flag(8, 0, fin, TEAL); B.lamp(-5.2, 0, fin + 10); B.lamp(5.2, 0, fin + 10);
    B.finish(fin, 0);
    islands();
  } };
})();
