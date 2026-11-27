/* Gate Rush — the one map of version 1: "Sunrise Fort Run".
   A sandstone fort course in EPZ teal and gold, about 490 units long with 6 question gates
   (a clean run takes around 60 seconds; a real race about 2 minutes).
   Coordinates: x = left/right (track is 10 wide, -5..5), f = distance along the course, y = height (decks are at y = 0).
   To add more maps later: create another file that registers GR.maps.<id> with a build(B) function. The engine does not change. */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  var SAND = "#E8C98F", SAND2 = "#CFA96B", STONE = "#D9C7A3", TEAL = "#27C3C3", TEALD = "#0B7A63", GOLD = "#F2B632", WOOD = "#B07A45", ORANGE = "#FFB454";

  GR.maps.fort = { id: "fort", name: "Sunrise Fort Run", length: 490, gates: 6, build: function (B) {
    function deck(f0, f1, color, rails) {
      B.slab(-5, 5, f0, f1, 0, 3, color || SAND);
      B.block(-5, 5, f0, f1, -3.01, -3, SAND2, true);
      B.deco(-5.05, -4.6, f0, f1, -3, 0.02, TEAL); B.deco(4.6, 5.05, f0, f1, -3, 0.02, TEAL);   // teal edge trim
      if (rails) { B.block(-5.6, -5, f0, f1, 0, 1.15, "#C79B5A"); B.block(5, 5.6, f0, f1, 0, 1.15, "#C79B5A"); for (var f = f0 + 1; f < f1 - 1; f += 4) { B.deco(-5.6, -5, f, f + 1.4, 1.15, 1.7, "#C79B5A"); B.deco(5, 5.6, f, f + 1.4, 1.15, 1.7, "#C79B5A"); } }
      for (var p = Math.ceil(f0 / 24) * 24; p < f1; p += 24) { B.deco(-5, -3.8, p, p + 1.4, -14, -3, STONE); B.deco(3.8, 5, p, p + 1.4, -14, -3, STONE); }
    }
    function coinRow(f0, f1, n, x, y) { B.coinLine(x, y === undefined ? 1.1 : y, f0, x, y === undefined ? 1.1 : y, f1, n); }
    function islands() {
      for (var f = -10; f < 520; f += 30) [-1, 1].forEach(function (k) {
        var x = k * (11 + (f * 7 % 5)), w = 3 + (f * 3 % 3);
        B.deco(x - w, x + w, f, f + 2 * w, -9, -1.5, SAND2); B.deco(x - w, x + w, f, f + 2 * w, -1.5, 0, "#4CAF50");
        B.palm(x, 0, f + w);
      });
    }

    /* ---------------------------------------------------- A  START  (f -6 .. 46) */
    B.start(0, 0, 2); deck(-6, 46, SAND, true);
    // start arch + banners
    B.deco(-5.6, -4.4, 21, 23, 0, 9, STONE); B.deco(4.4, 5.6, 21, 23, 0, 9, STONE); B.deco(-5.6, 5.6, 21, 23, 8.2, 9.4, GOLD);
    for (var s = -4; s <= 4; s += 2) B.deco(s - 0.5, s + 0.5, 21, 23, 9.4, 10.1, STONE);
    B.flag(-7, 0, 2, TEALD); B.flag(7, 0, 2, TEAL); B.lamp(-5.2, 0, 14); B.lamp(5.2, 0, 14);
    B.checkpoint(4, 0, 0); coinRow(10, 28, 6, 0); coinRow(12, 26, 5, -3);
    B.gate(34, 0); B.checkpoint(39, 0, 0);
    coinRow(40, 45, 2, 2.5);

    /* ---------------------------------------------------- B  BRIDGE, SLIDING PLATFORMS, JUMP PAD  (f 46 .. 140) */
    B.slab(-0.95, 0.95, 46, 64, 0, 1, WOOD); for (var q = 48; q < 64; q += 5) { B.deco(-1.15, -0.95, q, q + 0.5, -1.4, 0.4, "#5A3A22"); B.deco(0.95, 1.15, q, q + 0.5, -1.4, 0.4, "#5A3A22"); }
    coinRow(49, 62, 5, 0, 1.2);
    // sliding platforms: wide, slow and close together so the jumps are fair (5.05 x 6.6, gaps about 0.9-1.2)
    B.mover({ x: 0, y: 0, f: 68.5, w: 5.05, d: 6.6, th: 1, color: TEAL, fn: function (t) { return [2.0 * Math.sin(t * 0.8), 68.5]; } });   // 6.6 deep: a full-speed jump from the edge lands on it
    B.mover({ x: 0, y: 0, f: 76, w: 5.05, d: 6.6, th: 1, color: TEAL, fn: function (t) { return [2.0 * Math.sin(t * 0.8 + 3.14), 76]; } });
    B.coin(0, 2.4, 64.75); B.coin(0, 2.9, 72.25); B.coin(0, 2.4, 79.75);
    deck(80.5, 106, STONE, true); B.checkpoint(82, 0, 0); coinRow(84, 100, 5, -2.5); coinRow(84, 100, 5, 2.5);
    B.pad({ x: 0, y: 0, f: 104, w: 3.6, d: 2.4 }); B.coin(0, 5, 108.5); B.coin(0, 5.6, 110.5); B.coin(0, 5, 112.5);
    /* ---------------------------------------------------- landing deck + gate 2 */
    deck(113, 140, SAND, true); B.gate(128, 0); B.checkpoint(134, 0, 0); coinRow(116, 122, 3, 0);

    /* ---------------------------------------------------- C  SWEEPER & HAMMERS  (f 140 .. 204.5) */
    deck(140, 204.5, STONE, true);
    B.sweeper({ x: 0, y: 0, f: 152, len: 4.6, speed: 1.7, phase: 0 });
    B.hammer({ x: 0, y: 0, f: 166, piv: 6.8, len: 5.4, amp: 1.0, speed: 1.9, phase: 0 });
    B.hammer({ x: 0, y: 0, f: 180, piv: 6.8, len: 5.4, amp: 1.0, speed: 1.9, phase: 3.14 });
    B.coin(-3.8, 1.1, 158); B.coin(0, 1.1, 173); coinRow(143, 148, 3, 3.5); coinRow(185, 188, 2, 0);
    B.gate(194, 0); B.checkpoint(199, 0, 0);

    /* ---------------------------------------------------- D  BLINKING TILES  (f 204.5 .. 236) */
    // 6 rows of 3 tiles (3.0 x 3.2, gaps about 1.4). Each tile is off 1.2 s of every 4.8 s and the three columns take turns,
    // so every row always has at least two tiles to land on. The last jump to the landing deck is longer (3.5): jump or dive.
    var cols = [-3.3, 0, 3.3];
    for (var r = 0; r < 6; r++) cols.forEach(function (x, c) {
      B.tiles({ x: x, y: 0, f: 207.5 + r * 4.6, w: 3.0, d: 3.2, th: 0.8, color: r % 2 ? "#7FD6E6" : "#9BE3EE", period: 4.8, on: 3.6, phase: (r * 1.3 + c * 1.6) % 4.8 });
    });
    B.coin(0, 1.6, 210); B.coin(-3.3, 1.6, 219); B.coin(3.3, 1.6, 228); B.coin(0, 2.2, 233.8);

    /* ---------------------------------------------------- E  ROLLING BOULDERS  (f 235.6 .. 306) */
    deck(235.6, 306, SAND, true); B.checkpoint(238, 0, 0);
    B.ball({ x: -3.3, y: 0, f0: 244, f1: 290, r: 1, speed: 8, phase: 0.0 });
    B.ball({ x: 0.2, y: 0, f0: 244, f1: 290, r: 1, speed: 8, phase: 0.34 });
    B.ball({ x: 3.5, y: 0, f0: 244, f1: 290, r: 1, speed: 8, phase: 0.67 });
    B.ball({ x: -1.6, y: 0, f0: 244, f1: 290, r: 1, speed: 10.5, phase: 0.15 });
    B.ball({ x: 2.0, y: 0, f0: 244, f1: 290, r: 1, speed: 10.5, phase: 0.8 });
    coinRow(248, 280, 7, 0); coinRow(254, 274, 4, -4); coinRow(254, 274, 4, 4);
    B.gate(296, 0); B.checkpoint(301, 0, 0);

    /* ---------------------------------------------------- F  MOVING WALLS & SWAYING BRIDGE  (f 306 .. 396) */
    deck(306, 346, STONE, true);
    B.slider({ cx: 0, amp: 3.3, w: 3.6, h: 3.2, y: 0, f: 318, speed: 1.3, phase: 0, color: "#7C5CFA" });
    B.slider({ cx: 0, amp: 3.3, w: 3.6, h: 3.2, y: 0, f: 318, speed: 1.3, phase: 3.14, color: "#7C5CFA" });
    B.slider({ cx: 0, amp: 2.4, w: 5.5, h: 0.9, y: 0, f: 333, speed: 2.1, phase: 0, color: "#E5484D" });
    coinRow(309, 314, 2, 0); coinRow(340, 344, 2, 0);
    B.slab(-0.95, 0.95, 346, 372, 0, 1, WOOD); for (var w = 348; w < 372; w += 5) { B.deco(-1.15, -0.95, w, w + 0.5, -1.4, 0.4, "#5A3A22"); B.deco(0.95, 1.15, w, w + 0.5, -1.4, 0.4, "#5A3A22"); }
    B.hammer({ x: 0, y: 0, f: 359, piv: 6.8, len: 5.4, amp: 0.8, speed: 2.1, phase: 0.5 });
    coinRow(349, 370, 6, 0, 1.2);
    deck(372, 396, SAND, true); B.gate(384, 0); B.checkpoint(389, 0, 0);

    /* ---------------------------------------------------- G  FALLING PLATFORMS  (f 396 .. 462) */
    // falling platforms: 5.5 deep with 1.5 gaps, so an edge jump at full speed always lands on the next one
    [[403.25, 0], [410.25, -1.6], [417.25, 1.6], [424.25, 0], [431.25, -1.6]].forEach(function (a) { B.faller({ x: a[1], y: 0, f: a[0], w: 4, d: 5.5, th: 0.9, color: ORANGE }); });
    B.slab(-5, 5, 396, 399, 0, 3, SAND);
    coinRow(403, 431, 5, 0, 1.6);
    deck(435.5, 462, STONE, true); B.gate(448, 0); B.checkpoint(454, 0, 0);

    /* ---------------------------------------------------- H  FINAL STRETCH  (f 462 .. 514) */
    deck(462, 482, "#F5D27A", true);
    B.sweeper({ x: 0, y: 0, f: 471, len: 4.6, speed: 2.3, phase: 0.6 }); B.coin(-3.8, 1.1, 477); B.coin(3.8, 1.1, 477); coinRow(463, 466, 2, 0);
    // finish arch + checkered line
    var fin = 490;
    B.slab(-5, 5, 482, 514, 0, 3, "#F5D27A"); B.deco(-5.05, -4.6, 482, 514, -3, 0.02, TEAL); B.deco(4.6, 5.05, 482, 514, -3, 0.02, TEAL);
    for (var cx = -5; cx < 5; cx++) for (var cz = 0; cz < 2; cz++) B.deco(cx, cx + 1, fin + cz, fin + cz + 1, 0, 0.04, (cx + cz) % 2 ? "#13232F" : "#FFFFFF");
    B.deco(-5.8, -4.6, fin - 1, fin + 1, 0, 10, TEALD); B.deco(4.6, 5.8, fin - 1, fin + 1, 0, 10, TEALD); B.deco(-5.8, 5.8, fin - 1, fin + 1, 9, 10.6, GOLD);
    for (var k = -5; k < 5; k++) B.deco(k, k + 1, fin - 1.1, fin - 0.9, 7.2, 8.8, (k % 2) ? "#FFFFFF" : "#13232F");
    B.flag(-8, 0, fin, GOLD); B.flag(8, 0, fin, TEAL); B.lamp(-5.2, 0, fin + 10); B.lamp(5.2, 0, fin + 10);
    B.finish(fin, 0);
    islands();
  } };
})();
